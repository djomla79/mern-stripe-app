import { createContext, useCallback, useState } from 'react';
import { useToken } from '../hooks/index';

export const AuthContext = createContext({
  users: [],
  token: null,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  setUsersData: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [id, setId] = useState('');
  const [users, setUsers] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { setToken, removeToken } = useToken();

  const login = useCallback(
    (id, accessToken) => {
      setId(id);
      setToken(accessToken);
      setIsLoggedIn(true);
    },
    [setToken]
  );

  const logout = useCallback(() => {
    setId('');
    removeToken();
    setIsLoggedIn(false);
  }, [removeToken]);

  const setUsersData = useCallback((data) => {
    setUsers(data);
  }, []);

  const value = {
    id,
    users,
    isLoggedIn,
    login,
    logout,
    setUsersData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
