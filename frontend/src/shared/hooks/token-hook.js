import { useCallback } from 'react';

const useToken = () => {
  const setToken = useCallback((token) => {
    localStorage.setItem('token', JSON.stringify(token));
  }, []);

  const getToken = useCallback(() => {
    return JSON.parse(localStorage.getItem('token'));
  }, []);

  const removeToken = useCallback(() => {
    localStorage.removeItem('token');
  }, []);

  return { setToken, getToken, removeToken };
};

export default useToken;
