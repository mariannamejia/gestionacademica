import React from 'react'
import Sidebar from '../components/Sidebar'
import PowerBIDashboard from '../components/PowerBi'

const EventosInst = () => {
  return (
    <div className="Capacitacion__Page">
      <Sidebar />
      <div className="Administracion__div">
        <h1 className="Administracion__h1">Evaluación de Instructores de Capacitaciónes</h1>
        <div>
          <PowerBIDashboard />
        </div>
      </div>
      </div>

  )
}

export default EventosInst