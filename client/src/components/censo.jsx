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
            <option value="23 DE ENERO">23 DE ENERO</option>
            <option value="AGUACIL / CURVA EL TIGRE">
              AGUACIL / CURVA EL TIGRE
            </option>
            <option value="EL QUINCE">EL QUINCE</option>
            <option value="LA ALCABALA / SAN ISIDRO">
              LA ALCABALA / SAN ISIDRO
            </option>
            <option value="EL PARAISO">EL PARAISO</option>
            <option value="INREVI">INREVI</option>
            <option value="NEGRA HIPÓLITA">NEGRA HIPÓLITA</option>
            <option value="POCÓ / LA ARGENTINA">POCÓ / LA ARGENTINA </option>
            <option value="INNAVI / CALLE LA LIBERTAD">
              INNAVI / CALLE LA LIBERTAD
            </option>
            <option value="LAS MARGARITAS / LAS HEROINAS / PATRIA NUEVA">
              LAS MARGARITAS / LAS HEROINAS / PATRIA NUEVA
            </option>
            <option value="LA MONTALVEÑA / LAS MORAS">
              LA MONTALVEÑA / LAS MORAS
            </option>
            <option value="TOMÁS DELGADO">TOMÁS DELGADO</option>
            <option value="MAISANTA / IVASOL">MAISANTA / IVASOL</option>
            <option value="EL SILENCIO / ALI PRIMERA">
              EL SILENCIO / ALI PRIMERA
            </option>
            <option value="VILLA PRODUCTIVA">VILLA PRODUCTIVA</option>
            <option value="EL JABILLO / LA FORTALEZA">
              EL JABILLO / LA FORTALEZA
            </option>
            <option value="5 DE JULIO / SAN MIGUEL / FUNDO ZAMORANO">
              5 DE JULIO / SAN MIGUEL / FUNDO ZAMORANO
            </option>
            <option value="NICOLAZA ESPOINOZA">NICOLAZA ESPOINOZA</option>
            <option value="CALLE LAS FLORES / CALLE ALBERTO CABRERA / RIO SECO">
              CALLE LAS FLORES / CALLE ALBERTO CABRERA / RIO SECO
            </option>
            <option value="CASCO CENTRAL">CASCO CENTRAL</option>
            <option value="CARRETERA NEGRA / BENDICION DE DIOS / MONTE SION / SENDEROS DEL SEÑOR">
              CARRETERA NEGRA / BENDICION DE DIOS / MONTE SION / SENDEROS DEL
              SEÑOR
            </option>
            <option value="CLUB COLOMBO / ZAPOTAL">
              CLUB COLOMBO / ZAPOTAL
            </option>
            <option value="LA PEREZA">LA PEREZA</option>
            <option value="LA ARENOSA / LA TIGRA">LA ARENOSA / LA TIGRA</option>
            <option value="EL ALBARICAL / LA SALVADORA">
              EL ALBARICAL / LA SALVADORA
            </option>
            <option value="LOS CARAÑOS / CARTAGENA / EL RUMBO / PUEBLO DE CRISTO">
              LOS CARAÑOS / CARTAGENA / EL RUMBO / PUEBLO DE CRISTO
            </option>
            <option value="EL CERRO / POCOITO / EL PEPEO">
              EL CERRO / POCOITO / EL PEPEO
            </option>
            <option value="MESA BONITA / EL 20">MESA BONITA / EL 20</option>
            <option value="LA FLORIDA / LA CURVA">LA FLORIDA / LA CURVA</option>
            <option value="EL FILO / LA GRANJA">EL FILO / LA GRANJA</option>
            <option value="SAN LORENZO / EL ALTO / LA PUEBLITA / SANTA ROSA">
              SAN LORENZO / EL ALTO / LA PUEBLITA / SANTA ROSA
            </option>
            <option value="EL PUEBLO / EL TENDAL / LA VENADA">
              EL PUEBLO / EL TENDAL / LA VENADA
            </option>
            <option value="SAN RAFAEL / SAN PABLO / LAS MESITAS">
              SAN RAFAEL / SAN PABLO / LAS MESITAS
            </option>
            <option value="LA CUCHILLA / SANTA CRUZ / EL SAI">
              LA CUCHILLA / SANTA CRUZ / EL SAI
            </option>
            <option value="CAPIU / LAS ROSALES">CAPIU / LAS ROSALES</option>
            <option value="EL BRILLANTE / VILLA DOLORES / BOSCAN / HATO BLANCO">
              EL BRILLANTE / VILLA DOLORES / BOSCAN / HATO BLANCO
            </option>
            <option value="CASA AZUL / AGUACIL ZULIA">
              CASA AZUL / AGUACIL ZULIA
            </option>
            <option value="EL CATORCE / SAN RAFAEL / LAS VERITAS / TATUCALES / CAÑO RICO / PUERTO RICO">
              EL CATORCE / SAN RAFAEL / LAS VERITAS / TATUCALES / CAÑO RICO /
              PUERTO RICO
            </option>
            <option value="CASA DE TABLA / VALERANA / EL PUERTO">
              CASA DE TABLA / VALERANA / EL PUERTO
            </option>
            <option value="OTROS FORANEOS">OTROS FORANEOS</option>
          </select>
          {errors.secres && (
            <span className="error-message">{errors.secres.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="encargado">Encargado Voto:</label>
          <input
            type="text"
            id="encargado"
            name="encargado"
            className="form-input"
            {...register("encargado", {
              required: "El encargado es obligatorio.",
            })}
          />
          {errors.encargado && (
            <span className="error-message">{errors.encargado.message}</span>
          )}
        </div>

        <button type="submit" className="form-button">
          CENSAR
        </button>
      </form>
    </div>
  );
}
