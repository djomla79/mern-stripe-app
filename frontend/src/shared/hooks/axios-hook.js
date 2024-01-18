import { useEffect, useContext } from 'react';
import axios from 'axios';
import { apiTypes } from '../constants';
import { AuthContext } from '../context/auth-context';
import { useToken } from '../hooks/index';

const axiosInstance = axios.create({
  baseURL: apiTypes.URL_MAIN,
  withCredentials: true,
});

const useAxios = () => {
  const { id } = useContext(AuthContext);
  const { setToken } = useToken();

  useEffect(() => {
    // const requestIntercept = axiosInstance.interceptors.request.use((req) => {
    // const user = jwt_decode(authTokens.access)
    // const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    // if(!isExpired) return req

    // const response = await axios.post(`${baseURL}/api/token/refresh/`, {
    //     refresh: authTokens.refresh
    //   });

    // setToken(response.data);

    // setAuthTokens(response.data)
    // setUser(jwt_decode(response.data.access))

    // req.headers.Authorization = `Bearer ${response.data.access}`
    //   return req;
    // });

    const responseIntercept = axiosInstance.interceptors.response.use(
      undefined,
      async (error) => {
        const errorResponse = error?.response;
        const prevRequest = error?.config;
        if (
          errorResponse?.status === 403 &&
          errorResponse?.data.message === 'TokenExpiredError: jwt expired'
        ) {
          prevRequest.sent = true;
          try {
            const { data: newAccessToken } = await axiosInstance.post(
              `${apiTypes.API_USERS_ROUTE}/refreshtoken`,
              { id: id },
              {
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
              }
            );
            prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
            setToken(newAccessToken);
          } catch (err) {}
          return axiosInstance(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      // axiosInstance.interceptors.request.eject(requestIntercept);
      axiosInstance.interceptors.response.eject(responseIntercept);
    };
  }, [id, setToken]);

  return { axiosInstance };
};

export default useAxios;
