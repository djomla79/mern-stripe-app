import { useState, useCallback } from 'react';
import { useAxios, useModal } from './index';

const useHttpRequest = () => {
  const [error, setError] = useState('');
  const { axiosInstance } = useAxios();
  const { isLoading, setLoading, openModal, setModal, closeModal } = useModal();

  const sendRequest = useCallback(
    async (url, method = 'GET', headers = {}, body = null) => {
      try {
        setLoading(true);

        const dataRequest = async (value, urlData, data, headersData) => {
          switch (value) {
            case 'GET':
              return await axiosInstance.get(urlData);
            case 'POST':
              return await axiosInstance.post(urlData, data, headersData);
            case 'PATCH':
              return await axiosInstance.patch(urlData, data, headersData);
            case 'DELETE':
              return await axiosInstance.delete(urlData, headersData);
            default:
              return;
          }
        };
        const { data } = await dataRequest(method, url, body, headers);

        if (data.message) {
          setError(data.message);
          setModal(true);
          throw new Error(data.message);
        }

        setLoading(false);
        return data;
      } catch (err) {
        setError(err.message);
        setModal(true);
        setLoading(false);
        throw err;
      }
    },
    [axiosInstance, setLoading, setModal]
  );

  return { sendRequest, isLoading, openModal, error, closeModal };
};

export default useHttpRequest;
