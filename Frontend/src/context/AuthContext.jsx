import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { jwtDecode } from 'jwt-decode'; // Cambiar aquí

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userFirstName, setUserFirstName] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token); // Esto debería funcionar ahora
      setUserFirstName(decodedToken.name); // Asegúrate de que 'name' sea el claim correcto
      setUserRole(decodedToken.role)
      setIsAuthenticated(true);
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    const decodedToken = jwtDecode(token);
    setUserFirstName(decodedToken.name);
    setUserRole(decodedToken.role); // Aca guardamos el rol man
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUserRole(null); // Limpia el rol al cerrar sesion
    setUserFirstName(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userFirstName, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
