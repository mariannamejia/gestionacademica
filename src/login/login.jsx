
import React, { useState, useEffect } from 'react';
import Header from '../components/header';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function LogIn(){

  const [errorMessage, setErrorMessage] = useState('');

  const [alert, setAlert] = useState(null);

  const closeAlert = () => {
    setAlert(null);
  };

//verifica el usuario y contraseña 
const handleLogin = async () => {
  const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
      const response = await fetch('http://localhost:4000/api/admin/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          usuario: username,
          contrasena: password
        })
      });
      
      const data = await response.json();
      
      if (data.ok) {
        // Login correcto

            //auditoria
            const details = 'Ingresó al sistema'; 

            const auditData = {
              user: username,
              detalles: details,
            };
            // HTTP POST request auditoria
            axios.post('http://localhost:4000/api/auditoria/nuevo', auditData)
              .then(response => {
                
              })
              .catch(error => {
                console.error('Error creando auditoria:', error);
              });

      // Redirigir a siguiente página
       window.location.href = '/planeacion';
        
      } else {
        // Error
        setAlert(
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
              Usuario o contraseña incorrecta.
          </Alert>
        );
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Error en el servidor');
    }
  };

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        closeAlert();
      }, 5000); // 5000 millisegundos = 5 segundos

      // Vaciar el temporizador
      return () => clearTimeout(timer);
    }
  }, [alert]);

    return (
        <>
      <Header />
      <div className="loginPage">
        <div className="alert-container">
            {alert}
          </div>  
      <div className="loginForm">
        <h2>Iniciar Sesión</h2>
        <form className="login__form">
          <div className="formGroup">
            <label htmlFor="username">Usuario:</label>
            <input type="text" id="username" name="username" />
          </div>
          <div className="formGroup">
            <label htmlFor="password">Contraseña:</label>
            <input type="password" id="password" name="password" />
          </div>
          <a className="login__btn" onClick={handleLogin}>
                Ingresar 
              </a>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
      </div>
      <div className="loginImage">
        <img src="/images/alama-mater.jpg" alt="Login Image" /> 
      </div>
    </div>
    </>
    )
}