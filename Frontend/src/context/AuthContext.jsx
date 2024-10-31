import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userFirstName, setUserFirstName] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserFirstName(decodedToken.name);
        setUserRole(decodedToken.role);
        setUserId(decodedToken.sub);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Token no válido", error);
        logout(); // Cerrar sesión si el token no es válido
      }
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    try {
      const decodedToken = jwtDecode(token);
      setUserFirstName(decodedToken.name);
      setUserRole(decodedToken.role);
      setUserId(decodedToken.sub);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error al decodificar el token", error);
      // Manejo de error aquí, si es necesario
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUserRole(null);
    setUserFirstName(null);
    setUserId(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userFirstName, userRole, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
