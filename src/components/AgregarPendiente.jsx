import React from "react";
import CloseIcon from '@mui/icons-material/Close';

const AgregarPendiente = ({open, onClose, inputValues, handleInputChange, handleSubmit}) => {
    if(!open) return null
    return (
        <div className="overlay">
            <div className="modalContainer"> 
            <CloseIcon onClick={onClose} className='closeIcon'/>
            <h1>Agregar Nueva Tarea</h1>

            <label htmlFor="nombre">Nombre:</label>
            <input 
              type="text" 
              id="nombre" 
              value={inputValues.nombre} 
              onChange={handleInputChange} 
              name="nombre" />

            <label htmlFor="usuario">Descripción:</label>
            <input 
              type="text" 
              id="descripcion"
              value={inputValues.descripcion} 
              onChange={handleInputChange} 
              name="descripcion" />

            <button className="saveBtn" onClick={handleSubmit}>Guardar</button>
        </div>
        </div>
        
    )
}

export default AgregarPendiente;