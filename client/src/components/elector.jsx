export function Elector({ elector }) {
  return (
    <div className="elector">
      <h2>Consulta de Elector</h2>
      <p>
        <strong>Cédula: </strong>
        {elector.nacionalidad}
        {elector.cedula}
      </p>
      <p>
        <strong>Primer Apellido:</strong> {elector.papellido}
      </p>
      <p>
        <strong>Segundo Apellido:</strong> {elector.sapellido}
      </p>
      <p>
        <strong>Primer Nombre:</strong> {elector.pnombre}
      </p>
      <p>
        <strong>Segundo Nombre:</strong> {elector.snombre}
      </p>
      <p>
        <strong>Centro de Votación:</strong> {elector.cv}
      </p>
      <p>
        <strong>Municipio:</strong> {elector.municipio}
      </p>
      <p>
        <strong>Parroquia:</strong> {elector.parroquia}
      </p>
    </div>
  );
}
