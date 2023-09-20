import React from "react";
import CloseIcon from '@mui/icons-material/Close';

const AgregarAdmin = ({open, onClose, inputValues, handleInputChange, handleSubmit}) => {
    if(!open) return null
    return (
        <div className="overlay">
            <div className="modalContainer"> 
            <CloseIcon onClick={onClose} className='closeIcon'/>
            <h1>Agregar Nueva Usuario</h1>

            <label htmlFor="nombre">Nombre:</label>
            <input 
              type="text" 
              id="nombre" 
              value={inputValues.nombre} 
              onChange={handleInputChange} 
              name="nombre" />

            <label htmlFor="usuario">Usuario:</label>
            <input 
              type="text" 
              id="usuario"
              value={inputValues.usuario} 
              onChange={handleInputChange} 
              name="usuario" />

            <label htmlFor="contrasena">Contraseña:</label>
            <input 
              type="password" 
              id="contrasena" 
              value={inputValues.contrasena} 
              onChange={handleInputChange}
              name="contrasena" />

            <button className="saveBtn" onClick={handleSubmit}>Guardar</button>
        </div>
        </div>
        
    )
}

export default AgregarAdmin;