import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { consultaCV } from "../api/consulta.api";
import { Elector } from "./elector"; // Tu componente Elector

export function FormConsulta() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      cedula: "",
    },
  });

  const [electorData, setElectorData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);
    setErrorMessage("");
    setElectorData(null);

    try {
      const res = await consultaCV(data.cedula);
      if (res.data) {
        setElectorData(res.data);
      } else {
        setErrorMessage("No se encontró ningún elector con esa cédula.");
      }
    } catch (error) {
      console.error("Error al consultar la cédula:", error);
      if (error.response && error.response.status === 404) {
        setErrorMessage("Cédula no encontrada.");
      } else if (
        error.response &&
        error.response.data &&
        error.response.data.detail
      ) {
        setErrorMessage(error.response.data.detail);
      } else {
        setErrorMessage("Ocurrió un error al consultar la cédula.");
      }
      setElectorData(null);
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <div className="form-container">
      {" "}
      {/* Contenedor principal del formulario */}
      <form onSubmit={onSubmit}>
        <h1>Consulta de Votantes</h1>
        <p>CONSULTAR CENTRO DE VOTACIÓN</p>

        <div className="form-group">
          {" "}
          {/* Grupo para input y label */}
          <label htmlFor="cedulaInput">Número de Cédula:</label>
          <input
            type="number"
            id="cedulaInput"
            placeholder="Ej: 12345678"
            className="form-input"
            {...register("cedula", { required: "La cédula es obligatoria." })}
          />
          {errors.cedula && (
            <span className="error-message">{errors.cedula.message}</span>
          )}{" "}
          {/* Clase para errores */}
        </div>

        <button type="submit" className="form-button" disabled={isLoading}>
          {" "}
          {/* Clase para botón */}
          {isLoading ? "Consultando..." : "Consultar"}
        </button>
      </form>
      <div className="consulta">
        {" "}
        {/* Contenedor para resultados de consulta */}
        {isLoading && <p>Cargando datos...</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {electorData && !errorMessage && (
          <Elector elector={electorData} /> // Tu componente Elector
        )}
      </div>
    </div>
  );
}
