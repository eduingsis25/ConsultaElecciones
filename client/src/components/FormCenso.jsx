import { useState } from "react";
import { useForm } from "react-hook-form";
import { consultaCV } from "../api/consulta.api";
import { Censo } from "./censo"; // Asegúrate de que 'censo.jsx' esté en el mismo directorio o el path correcto

export function FormCenso() {
  // Puedes renombrarlo a FormConsulta si quieres mayor claridad
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      cedula: "", // Inicializa el campo de cédula para el formulario de consulta
    },
  });

  // Cambiado a 'null' porque 'electorData' será un objeto (un solo elector), no un array.
  const [electorData, setElectorData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true); // Indica que la consulta está cargando
    setErrorMessage(""); // Limpia mensajes de error previos
    setElectorData(null); // Limpia datos de elector previos

    console.log("Consultando cédula:", data.cedula); // Para depuración

    try {
      const res = await consultaCV(data.cedula); // Usa 'res' para la respuesta
      console.log("Respuesta de consultaCV:", res.data); // Para depuración

      if (res.data) {
        // Asumiendo que res.data es el objeto del elector
        setElectorData(res.data); // Guarda los datos del elector encontrado
      } else {
        // Esto se ejecutaría si la API devuelve un 200 OK pero con datos vacíos o nulos
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
        // Si el backend envía un mensaje de error específico
        setErrorMessage(error.response.data.detail);
      } else {
        setErrorMessage(
          "Ocurrió un error al consultar la cédula. Intenta más tarde."
        );
      }
      setElectorData(null); // Limpia los datos del elector en caso de error
    } finally {
      setIsLoading(false); // Finaliza el estado de carga
    }
  });

  return (
    <div className="form-container">
      {" "}
      {/* Aplica el estilo de contenedor de formulario principal */}
      <form onSubmit={onSubmit}>
        <h1>Consulta de Votantes</h1>
        <p>Ingrese su número de cédula para censar</p>

        <div className="form-group">
          {" "}
          {/* Agrupa label e input */}
          <label htmlFor="cedulaInput" className="form-label">
            Número de Cédula:
          </label>
          <input
            type="text"
            id="cedulaInput"
            placeholder="Número de cédula"
            className="form-input"
            {...register("cedula", { required: "La cédula es obligatoria." })}
          />
          {/* Muestra errores de validación de react-hook-form */}
          {errors.cedula && (
            <span className="error-message">{errors.cedula.message}</span>
          )}
        </div>

        <button type="submit" className="form-button" disabled={isLoading}>
          {" "}
          {/* Aplica el estilo de botón */}
          {isLoading ? "Consultando..." : "Consultar"}
        </button>
      </form>
      {/* ¡IMPORTANTE!: El componente <Censo /> se renderiza AQUI AFUERA del formulario de consulta.
        Solo se mostrará si hay datos de elector (electorData no es null) Y no hay un mensaje de error.
        Esto resuelve el problema de anidación de formularios.
      */}
      <div className="consulta">
        {" "}
        {/* Aplica el estilo para la sección de resultados */}
        {isLoading && <p>Cargando datos del elector...</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {electorData && !errorMessage && <Censo elector={electorData} />}
      </div>
    </div>
  );
}
