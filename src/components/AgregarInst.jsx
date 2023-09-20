import React from "react";
import CloseIcon from '@mui/icons-material/Close';

const AgregarInst = ({open, onClose, inputValues, handleInputChange, handleSubmit}) => {
    if(!open) return null
    return (
        <div className="overlay">
            <div className="modalContainer"> 
            <CloseIcon onClick={onClose} className='closeIcon'/>
            <h1>Agregar Nuevo Instructor</h1>

            <label htmlFor="nombre">Nombre:</label>
            <input 
              type="text" 
              id="nombre" 
              value={inputValues.nombre} 
              onChange={handleInputChange} 
              name="nombre" />

            <label htmlFor="correo">Correo:</label>
            <input 
              type="email" 
              id="correo"
              value={inputValues.correo} 
              onChange={handleInputChange} 
              name="correo" />

            <button className="saveBtn" onClick={handleSubmit}>Guardar</button>
        </div>
        </div>
        
    )
}

export default AgregarInst;