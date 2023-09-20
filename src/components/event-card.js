import React, { useState, useEffect } from 'react'

export default function Card({evento}){

  const formattedDate = new Date(evento.fecha).toLocaleDateString();

  return (
    <div className="card">
      <div className="card__body">
        <img src={evento.imagen} className="card__img" alt={evento.nombre} />
        <h2 className="card__title">{evento.nombre}</h2>
        <p className="card__fecha">{formattedDate}</p>
      </div>
      <a href={evento.link} target="_blank" rel="noopener noreferrer" className="card__btn">
        Inscribirme
      </a>
    </div>
  );
}