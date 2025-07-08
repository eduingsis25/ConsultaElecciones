import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Importa el hook useAuth

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // Obtiene la función 'login' del contexto

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Limpiar errores previos

    try {
      const loginSuccessful = await login(username, password);

      if (loginSuccessful) {
        console.log("Login exitoso, redirigiendo a /censo");
        navigate("/censo"); // Redirige después de que el contexto haya actualizado el estado
      } else {
        setError("Credenciales inválidas. Por favor, intenta de nuevo.");
      }
    } catch (err) {
      console.error("Error inesperado en el componente Login:", err);
      // Puedes refinar este mensaje de error si la API devuelve más detalles
      setError("Ocurrió un error inesperado. Por favor, intenta más tarde.");
    }
  };

  return (
    <div className="form-container">
      {" "}
      {/* Aplica el contenedor principal de estilo */}
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          {" "}
          {/* Agrupa la etiqueta y el input */}
          <label htmlFor="usernameInput" className="form-label">
            Usuario:
          </label>{" "}
          {/* Clase para la etiqueta */}
          <input
            type="text"
            id="usernameInput" // Añade un ID para la accesibilidad del label
            className="form-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          {" "}
          {/* Agrupa la etiqueta y el input */}
          <label htmlFor="passwordInput" className="form-label">
            Contraseña:
          </label>{" "}
          {/* Clase para la etiqueta */}
          <input
            type="password"
            id="passwordInput" // Añade un ID para la accesibilidad del label
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}{" "}
        {/* Clase para el mensaje de error */}
        <button type="submit" className="form-button">
          Entrar
        </button>{" "}
        {/* Clase para el botón */}
      </form>
    </div>
  );
}

// Puedes mantener export default si lo deseas, pero asegúrate de que sea consistente
// con cómo lo importas en pages/Login.jsx
// export default Login;
