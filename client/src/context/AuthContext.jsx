/// src/context/AuthContext.js

import React, { createContext, useContext, useState, useEffect } from "react";
import { electorApi } from "../api/consulta.api"; // O la instancia de Axios que uses para el login

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // useEffect para verificar el token al cargar la aplicación
  useEffect(() => {
    const checkAuth = async () => {
      const authToken = localStorage.getItem("authToken"); // Ajusta a tu clave de token
      if (authToken) {
        // Opcional: Puedes hacer una solicitud a un endpoint protegido para verificar el token
        // y obtener los datos del usuario. Por ejemplo, un endpoint /api/profile/
        try {
          // Si tienes un endpoint para validar el token y obtener datos del usuario
          const response = await electorApi.get("profile/"); // Asegúrate que tu DRF tiene este endpoint
          setUser(response.data); // Asume que el endpoint devuelve los datos del usuario
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Token inválido o expirado. Limpiando sesión.", error);
          localStorage.removeItem("authToken");
          setUser(null);
          setIsAuthenticated(false);
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  // Función de login que se expondrá a través del contexto
  const login = async (username, password) => {
    setLoading(true); // Opcional: Mostrar carga durante el login
    try {
      // Usa la instancia de Axios que ya tiene el baseURL configurado
      const response = await electorApi.post("login/", {
        // Asegúrate que esta es la URL correcta para tu login de DRF
        username,
        password,
      });

      const token = response.data.token; // Ajusta a cómo tu backend devuelve el token (ej. 'token' o 'access')
      localStorage.setItem("authToken", token); // Guarda el token

      // Opcional: Obtener datos del usuario después del login
      // Podrías tener un endpoint /api/profile/ que devuelva los datos del usuario
      // para establecer 'user' en el contexto.
      // const profileResponse = await electorApi.get('profile/');
      // setUser(profileResponse.data);

      setIsAuthenticated(true);
      setUser({ username: username }); // O un objeto de usuario más completo si lo obtuviste
      return true; // Indica login exitoso
    } catch (error) {
      console.error(
        "Error durante el login en AuthContext:",
        error.response ? error.response.data : error.message
      );
      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem("authToken"); // Limpia cualquier token si el login falla
      return false; // Indica login fallido
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
    setIsAuthenticated(false);
    // Opcional: Redirigir al usuario a la página de login después de cerrar sesión
    // navigate('/login'); // Si usas navigate aquí, AuthProvider también necesitaría acceso a useNavigate
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
