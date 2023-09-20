import React, {useState} from 'react'
import CloseIcon from '@mui/icons-material/Close';

const Editar = ({open, onClose, selectedRow, handleViewChange, handleSubmitEdit}) => {

    if(!open) return null
  return (
    <div className='overlay'>
        <div className="modalContainer"> 
            <CloseIcon onClick={onClose} className='closeIcon'/>
            <h1>Editar Gestión</h1>

            <label htmlFor="nombre">Nombre:</label>
            <input 
                type="text" 
                id="nombre" 
                onChange={event => handleViewChange('nombre', event.target.value)}
                value={selectedRow.nombre}
                name="nombre" />

            <label htmlFor="ubicacion">Ubicación:</label>
            <input 
              type="text" 
              id="ubicacion"
              onChange={event => handleViewChange('ubicacion', event.target.value)}
              value={selectedRow.ubicacion}  
              name="ubicacion" />

            <label htmlFor="fecha">Fecha:</label>
            <input 
              type="text" 
              id="fecha" 
              onChange={event => handleViewChange('fecha', event.target.value)}
              value={selectedRow.fecha} 
              name="fecha" />

            <label htmlFor="hora">Hora:</label>
            <input 
              type="text" 
              id="hora" 
              onChange={event => handleViewChange('hora', event.target.value)}
              value={selectedRow.hora} 
              name="hora" />

            <label htmlFor="imagen">Imagen:</label>
            <input 
              type="text" 
              id="imagen"
              onChange={event => handleViewChange('imagen', event.target.value)}
              value={selectedRow.imagen}  
              name="imagen" />

            <label htmlFor="instructor">Instructor:</label>
            <input 
              type="text" 
              id="instructor"
              onChange={event => handleViewChange('instructor', event.target.value)}
              value={selectedRow.instructor}  
              name="instructor" />
              
            <label htmlFor="tpgestion">Tipo de Géstion:</label> 
            <input 
              type="text" 
              id="tpgestion"
              onChange={event => handleViewChange('tpgestion', event.target.value)} 
              value={selectedRow.tpgestion} 
              name="tpgestion" />

            <label htmlFor="certificado">Certificado:</label>
            <input 
              type="text" 
              id="certificado" 
              onChange={event => handleViewChange('certificado', event.target.value)}
              value={selectedRow.certificado} 
              name="certificado" />

            <label htmlFor="administrador">Administrador:</label>
            <input 
              type="text" 
              id="administrador"
              onChange={event => handleViewChange('administrador', event.target.value)} 
              value={selectedRow.administrador} 
              name="administrador" />

            <label htmlFor="link">Link de Inscripción:</label>
            <input 
              type="text" 
              id="link" 
              onChange={event => handleViewChange('link', event.target.value)}
              value={selectedRow.link} 
              name="link" />

            <button className="saveBtn" onClick={handleSubmitEdit}>Guardar</button>
        </div>
    </div>
  )
}

export default Editar