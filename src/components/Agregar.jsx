import React, { useState, useEffect } from 'react'
import CloseIcon from '@mui/icons-material/Close';

const Agregar = ({ open, onClose, inputValues, handleInputChange, handleSubmit }) => {

  const [datos, setDatos] = useState({

    ids: [],
    nombres: [],
    usuario: [],
    contrasena: [],
    activo: []
  })

  const [datos2, setDatos2] = useState({
    ids: [],
    nombres: [],
    correo: [],
    estado: []
  })

  

  //Trae Datos de Administradores
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/admin/get");
        const data = await response.json();
        const admins = data.admins;

        setDatos((prevDatos) => ({
          ...prevDatos,
          ids: admins.map((data) => data._id),
          nombres: admins.map((data) => data.nombre),
          usuarios: admins.map((data) => data.usuario),
          fecha: admins.map((data) => data.contrasena),
          activo: admins.map((data) => data.activo)
        }));
        console.log(datos);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  //Trae Datos de Instructores
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/instructor/get");
        const data = await response.json();
        const instructores = data.instructores;

        setDatos2((prevDatos2) => ({
          ...prevDatos2,
          ids: instructores.map((data) => data._id),
          nombres: instructores.map((data) => data.nombre),
          correos: instructores.map((data) => data.correo),
          estado: instructores.map((data) => data.estado)
        }));
        console.log(datos2);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!open) return null


  return (
    <div className='overlay'>
      <div className="modalContainer">
        <CloseIcon onClick={onClose} className='closeIcon' />
        <h1>Agregar Nueva Gestión</h1>

        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          value={inputValues.nombre}
          onChange={handleInputChange}
          name="nombre" />

        <label htmlFor="ubicacion">Ubicación:</label>
        <input
          type="text"
          id="ubicacion"
          value={inputValues.ubicacion}
          onChange={handleInputChange}
          name="ubicacion" />

        <label htmlFor="fecha">Fecha:</label>
        <input
          type="Date"
          id="fecha"
          value={inputValues.fecha}
          onChange={handleInputChange}
          name="fecha" />

        <label htmlFor="hora">Hora:</label>
        <input
          type="Time"
          id="hora"
          value={inputValues.hora}
          onChange={handleInputChange}
          name="hora" />

        <label htmlFor="imagen">Imagen:</label>
        <input
          type="text"
          id="imagen"
          value={inputValues.imagen}
          onChange={handleInputChange}
          name="imagen" />

        {/**dropdown menu para instructor */}
        <label htmlFor="instructor">Seleccione un instructor:</label>
        <select
          id="instructor" name="instructor"
          value={inputValues.instructor}
          onChange={handleInputChange}
           
        >
          <option value="">Seleccionar</option> {/* Espacio default en blanco */}
          {datos2.nombres.map((nombre, index) => (
            <option key={datos.ids[index]} value={nombre}>
              {nombre}
            </option>
          ))}
        </select>
    
        {/**dropdown menu para tpgestion */}
        <label htmlFor="tpgestion">Tipo de Géstion:</label>
        <select
          id="tpgestion"
          value={inputValues.tpgestion}
          onChange={handleInputChange}
          name="tpgestion"
        >
          <option value="">Selecciona una opción</option>
          <option value="Capacitación">Capacitación</option>
          <option value="Evento">Evento</option>
          <option value="Seminario Virtual">Seminario Virtual</option>
        </select>

        <label htmlFor="certificado">Certificado:</label>
        <input
          type="text"
          id="certificado"
          value={inputValues.certificado}
          onChange={handleInputChange}
          name="certificado" />

        {/**dropdown menu para Administradores */}
        <label htmlFor="adminName">Seleccione un administrador:</label>
        <select id="adminName" name="adminName" 
                value={inputValues.adminName} onChange={handleInputChange}>
          <option value="">Seleccionar</option> {/* Add a default empty option */}
          {datos.nombres.map((nombre, index) => (
            <option key={datos.ids[index]} value={nombre}>
              {nombre}
            </option>
          ))}
        </select>

        <label htmlFor="link">Link de Inscripción:</label>
        <input
          type="text"
          id="link"
          value={inputValues.link}
          onChange={handleInputChange}
          name="link" />

        <button className="saveBtn" onClick={handleSubmit}>Guardar</button>
      </div>
    </div>
  )
}

export default Agregar