import React, {useState} from 'react'
import CloseIcon from '@mui/icons-material/Close';

const VerAdmin = ({open, onClose, selectedRow, handleViewChange}) => {

    if(!open) return null
  return (
    <div className='overlay'>
        <div className="modalContainer"> 
            <CloseIcon onClick={onClose} className='closeIcon'/>
            <h1>Ver Administradores</h1>

            <label htmlFor="nombre">Nombre:</label>
            <input 
              type="text" 
              id="nombre" 
              onChange={event => handleViewChange('nombre', event.target.value)}
              value={selectedRow.nombre}
              name="nombre" />

            <label htmlFor="usuario">Usuario:</label>
            <input 
              type="text" 
              id="usuario" 
              onChange={event => handleViewChange('usuario', event.target.value)} 
              value={selectedRow.usuario}
              name="usuario" />

        </div>
    </div>
  )
}

export default VerAdmin 