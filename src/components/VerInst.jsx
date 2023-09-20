import React, {useState} from 'react'
import CloseIcon from '@mui/icons-material/Close';

const VerInst = ({open, onClose, selectedRow, handleViewChange}) => {

    if(!open) return null
  return (
    <div className='overlay'>
        <div className="modalContainer"> 
            <CloseIcon onClick={onClose} className='closeIcon'/>
            <h1>Ver Instructores</h1>

            <label htmlFor="nombre">Nombre:</label>
            <input 
              type="text" 
              id="nombre" 
              onChange={event => handleViewChange('nombre', event.target.value)}
              value={selectedRow.nombre}
              name="nombre" />

            <label htmlFor="correo">Correo:</label>
            <input 
              type="text" 
              id="correo" 
              onChange={event => handleViewChange('correo', event.target.value)} 
              value={selectedRow.correo}
              name="correo" />

        </div>
    </div>
  )
}

export default VerInst