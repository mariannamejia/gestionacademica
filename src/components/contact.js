"use client"
import React, { useState, useEffect } from 'react';
import request from "fetch-with-json";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';


const Contact = () => {
  const initialFormData = {
    nombre: '',
    correo: '',
    mensaje: '',
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [alert, setAlert] = useState(null);

  const closeAlert = () => {
    setAlert(null);
  };

  const resetForm = () => {
    setFormData(initialFormData);
  };

  const handleSubmit = () => {
     try {
    request({
      method: "POST",
      url: "http://localhost:4000/api/consulta/nuevo",
      json: {
        nombre: formData.nombre,
        correo: formData.correo,
        mensaje: formData.mensaje
      },
    }).then((res) => {
      resetForm();
      if (res.ok) {
        setAlert(
          <Alert severity="success">
            <AlertTitle>Correcto</AlertTitle>
            Se ha enviado su mensaje correctamente. —{' '}
            <strong>Un administrador se pondrá en contacto vía correo electrónico.</strong>
          </Alert>
        );
        console.log('agregado')
      } else {
        setAlert(
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            No se ha podido ingresar.
          </Alert>
        );
        console.log('error')
      }
    });
  } catch {
    alert("No se ha podido ingresar");
  }
  };

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        closeAlert();
      }, 5000); // 5000 milliseconds = 5 seconds

      // Clear the timer when the component unmounts
      return () => clearTimeout(timer);
    }
  }, [alert]);

  return (
    <div className="contact-form-container">
      <div className="contact-info">
        <h2 className="contact__title">Contáctanos</h2>
        <br/>
        <p>Universidad Nacional Autónoma de Honduras</p>
        <br/>
        <p><b>Tel:</b> 2216-6100, 2216-5100, 2216-3000, 2216-7000</p>
        <br/>
        <p><b>Dirección:</b> Bulevar Suyapa, Tegucigalpa, M.D.C, Honduras, Centroamérica </p>
      </div>
      <div className="form-container">
        <h2 className="contact__h2">¿Tienes más preguntas?</h2>
        <form onSubmit={handleSubmit} className="contact__form">
          <div>
            <label htmlFor="nombre">Nombre:</label>
            <input className='contact__input'
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="correo">Correo:</label>
            <input className='contact__input'
              type="email"
              id="correo"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="mensaje">Mensaje:</label>
            <textarea className='contact_txtarea'
              id="mensaje"
              name="mensaje"
              value={formData.mensaje}
              onChange={handleChange}
              required
            />
          </div>
          <div className="alert-container">
            {alert}
          </div>  
          <button type="submit" className="contact__btn" >Enviar</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;