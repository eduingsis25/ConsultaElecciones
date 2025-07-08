// src/components/Censo.jsx
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { registrarCenso } from "../api/consulta.api";

export function Censo({ elector }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nacionalidad: elector?.nacionalidad || "",
      cedula: elector?.cedula || "",
      papellido: elector?.papellido || "",
      sapellido: elector?.sapellido || "",
      pnombre: elector?.pnombre || "",
      snombre: elector?.snombre || "",
      cv: elector?.cv || "",
      municipio: elector?.municipio || "",
      parroquia: elector?.parroquia || "",
      secres: "",
      encargado: "",
    },
  });

  useEffect(() => {
    if (elector) {
      reset({
        nacionalidad: elector.nacionalidad || "",
        cedula: elector.cedula || "",
        papellido: elector.papellido || "",
        sapellido: elector.sapellido || "",
        pnombre: elector.pnombre || "",
        snombre: elector.snombre || "",
        cv: elector.cv || "",
        municipio: elector.municipio || "",
        parroquia: elector.parroquia || "",
        secres: elector.secres || "",
        encargado: elector.encargado || "",
      });
    }
  }, [elector, reset]);

  const onSubmit = handleSubmit(async (data) => {
    console.log("Datos a enviar para registrar censo:", data);
    try {
      const resul = await registrarCenso(data);
      console.log("Censo registrado exitosamente:", resul.data);
      alert("Censo registrado exitosamente!");
      // reset(); // Si quieres limpiar el formulario después de registrar
    } catch (error) {
      console.error(
        "Error al registrar el censo:",
        error.response ? error.response.data : error.message
      );
      alert(
        "Error al registrar censo: " +
          (error.response?.data?.detail ||
            JSON.stringify(error.response?.data) ||
            "Ocurrió un error inesperado.")
      );
    }
  });

  return (
    <div className="form-container">
      {" "}
      {/* Contenedor principal para este formulario */}
      <form onSubmit={onSubmit}>
        <h1>Registrar Censo</h1>

        <div className="form-group">
          <label htmlFor="cedula">Nacionalidad:</label>
          <input
            type="text"
            id="nacionalidad"
            name="nacionalidad"
            className="form-input"
            {...register("nacionalidad")}
          />
        </div>

        <div className="form-group">
          <label htmlFor="cedula">Cédula:</label>
          <input
            type="text"
            id="cedula"
            name="cedula"
            className="form-input"
            {...register("cedula")}
          />
        </div>

        <div className="form-group">
          <label htmlFor="papellido">Primer Apellido:</label>
          <input
            type="text"
            id="papellido"
            name="papellido"
            className="form-input"
            {...register("papellido")}
          />
        </div>

        <div className="form-group">
          <label htmlFor="sapellido">Segundo Apellido:</label>
          <input
            type="text"
            id="sapellido"
            name="sapellido"
            placeholder="Segundo Apellido"
            className="form-input"
            {...register("sapellido")}
          />
        </div>

        <div className="form-group">
          <label htmlFor="pnombre">Primer Nombre:</label>
          <input
            type="text"
            id="pnombre"
            name="pnombre"
            className="form-input"
            {...register("pnombre")}
          />
        </div>

        <div className="form-group">
          <label htmlFor="snombre">Segundo Nombre:</label>
          <input
            type="text"
            id="snombre"
            name="snombre"
            placeholder="Segundo Nombre"
            className="form-input"
            {...register("snombre")}
          />
        </div>

        <div className="form-group">
          <label htmlFor="cv">Centro de Votación:</label>
          <input
            type="text"
            name="cv"
            id="cv"
            className="form-input"
            {...register("cv")}
          />
        </div>

        <div className="form-group">
          <label htmlFor="municipio">Municipio:</label>
          <input
            type="text"
            id="municipio"
            name="municipio"
            className="form-input"
            {...register("municipio")}
          />
        </div>

        <div className="form-group">
          <label htmlFor="parroquia">Parroquia:</label>
          <input
            type="text"
            id="parroquia"
            name="parroquia"
            className="form-input"
            {...register("parroquia")}
          />
        </div>

        <div className="form-group">
          <label htmlFor="secres">Sector de Residencia:</label>
          <select
            id="secres"
            name="secres"
            className="form-select"
            {...register("secres", { required: "El sector es obligatorio." })}
          >
            <option value="Tomás Delgado">Tomás Delgado</option>
            <option value="El Silencio">El Silencio</option>
            <option value="Casco Central">Casco Central</option>
            <option value="San Miguel">San Miguel</option>
          </select>
          {errors.secres && (
            <span className="error-message">{errors.secres.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="encargado">Encargado Voto:</label>
          <select
            id="encargado"
            name="encargado"
            className="form-select"
            {...register("encargado", {
              required: "El encargado es obligatorio.",
            })}
          >
            <option value="Alcalde">Alcalde</option>
            <option value="Carlos Peña">Carlos Peña</option>
            <option value="Yoseiran Ledo">Yoseiran Ledo</option>
            <option value="Carolina Gonzalez">Carolina Gonzalez</option>
          </select>
          {errors.encargado && (
            <span className="error-message">{errors.encargado.message}</span>
          )}
        </div>

        <button type="submit" className="form-button">
          Censar
        </button>
      </form>
    </div>
  );
}
