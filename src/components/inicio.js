import React, { useState, useEffect } from 'react';
import Card from "./event-card";
import Contact from "./contact";

export default function Inicio(){

  const [datos, setDatos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/gestion/get");
        const data = await response.json();
        const gestiones = data.gestiones;

        setDatos(gestiones);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const today = new Date();
  
  const filteredDatos = datos.filter(evento => {
    const eventDate = new Date(evento.fecha);
    return evento.activo && eventDate >= today;
  });

  return (
    <div className="inicio__div">
      
      <h1 className="inicio__title">Futuros Eventos</h1>
        <div className="wrapper">
        {filteredDatos.map((evento) => (
          <Card key={evento._id} evento={evento} />
        ))}
        </div>
        <div id="contact-section" className="inicio__contact">
            <Contact />
        </div>
    </div>
      
  );
}

    
  
  