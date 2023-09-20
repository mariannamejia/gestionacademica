import React, { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import 'moment/locale/es';

moment.locale('es');
const localizer = momentLocalizer(moment);
const CustomToolbar = ({ label }) => (
  <div style={{ textAlign: 'center', margin: '10px' }}>
    <div
      className="rbc-toolbar-label"
      style={{
        fontSize: '24px', 
        fontWeight: 'bold', 
      }}
    >
      {label}
    </div>
  </div>
);

const Planeacion = () => {

  const [events, setEvents] = useState([]);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/gestion/get");
        const data = await response.json();
        const gestiones = data.gestiones;
  
        setEvents(gestiones.map((gestion) => ({
          title: gestion.nombre,
          start: gestion.fecha,
          end: gestion.fecha,
          tpgestion: gestion.tpgestion,
        })));
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: '',
      borderRadius: '5px',
      opacity: 1,
      color: 'white',
      border: '1px solid transparent',
    };

    // Estilos basados on tpgestion
    if (event.tpgestion === 'Capacitación') {
      style.backgroundColor = '#00303F'; 
    } else if (event.tpgestion === 'Evento') {
      style.backgroundColor = '#DCAE1D'; 
    } else if (event.tpgestion === 'Seminario Virtual') {
      style.backgroundColor = '#7A9D96'; 
    }

    return {
      style,
    };
  };

  return (
    <div className="planeacion__div">
        <Sidebar />

        <div className="Calendar">
        <Calendar 
            localizer={localizer} 
            events={events}
            eventPropGetter={eventStyleGetter} 
            views={['month', 'week', 'day']}
            defaultView="month"
            components={{
              toolbar: CustomToolbar,
            }}
          />
      </div>

    </div>
  );
};

export default Planeacion
