import Sidebar from '../components/Sidebar'
import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import Preguntas from '../pages/Preguntas';
import request from "fetch-with-json";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AgregarPendiente from '../components/AgregarPendiente';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export default function Kanban(){

  const [completed, setCompleted] = useState([]);
  const [incomplete, setIncomplete] = useState([]);

  const [openAgregarPendiente, setOpenAgregarPendiente] = useState(false);

  const [alert, setAlert] = useState(null);

    const closeAlert = () => {
      setAlert(null);
    };

  const [openVer, setOpenVer] = useState(false);

  const [inputValues, setInputValues] = useState ({
    nombre: '',
    descripcion: ''
  });

  //llama datos de la bd
  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:4000/api/pendiente/get");
            const data = await response.json();
            setIncomplete(data.pendientes.filter(p => p.tpEstado === '0')); //'0' significa "por hacer"
            setCompleted(data.pendientes.filter(p => p.tpEstado === '1')); //'1' significa "completadas"
            
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    fetchData();
}, []);

useEffect(() => {
  console.log("incomplete:", incomplete);
  console.log("completed:", completed);
}, [incomplete, completed]);

const handleInputChange = (event) => {
  const { name, value } = event.target;
  setInputValues((prevInputValues) => ({
    ...prevInputValues,
    [name]: value,
  }));
};

//agregar nueva tarea
const handleSubmit = () => {
  try {
    request({
      method: "POST",
      url: "http://localhost:4000/api/pendiente/nuevo",
      json: {
        nombre: inputValues.nombre,
        descripcion: inputValues.descripcion
      },
    }).then((res) => {
      if (res.ok) {
       
        setAlert(
          <Alert severity="success">
            <AlertTitle>Correcto</AlertTitle>
            Se ha agregado la tarea correctamente. —{' '}
            <strong>Exitos!</strong>
          </Alert>
        );

        // muestra alerta despues de un delay
        setTimeout(() => {
          window.location.reload();
        }, 4000); // 2000 millisegundos = 2 segundos

        console.log('agregado')
      } else {
        setAlert(
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            No se ha podido agregar.
          </Alert>
        );
        console.log('error')
      }
    });
  } catch {
    setAlert(
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        No se ha podido ingresar.
      </Alert>
    );
    // Refesca la página despues de un delay
    setTimeout(() => {
      window.location.reload();
    }, 2000); // 2000 millisegundos = 2 segundos
  }
}

// Funcion para ctualizar estado de tarea
const markAsCompleted = (taskId) => {
  try {
    // actualiza el estado de la tarea
    request({
      method: "PUT",
      url: `http://localhost:4000/api/pendiente/update/?id=${taskId}`,
    }).then((res) => {
      if (res.ok) {
        // filtrar fuera del array de por hacer
        const updatedIncomplete = incomplete.filter(task => task._id !== taskId);
        // agregar tareas al array de completados
        const updatedCompleted = completed.map(task => {
          if (task._id === taskId) {
            return { ...task, tpEstado: '1' };
          }
          return task;
        });  
        setIncomplete(updatedIncomplete);
        setCompleted(updatedCompleted);
        console.log('Tarea actualizó su estado');
        window.location.reload();
      }
    });
  } catch (error) {
    console.error("Error marking task as completed:", error);
  }
};
 
  return (
    <div className="Kanban__page">
      <AgregarPendiente open={openAgregarPendiente} onClose={() => setOpenAgregarPendiente(false)}
                        inputValues={inputValues}
                        handleInputChange={handleInputChange}
                        handleSubmit={handleSubmit}
      />
    <Sidebar />
    <div className="Administracion__div">
      <div className="alert-container">
        {alert}
      </div>
      
        <h2 className="Administracion__h1">LISTA DE PENDIENTES</h2>
          <div className='addTask'>
            <h2>Agregar Tarea</h2><AddCircleOutlineIcon fontSize="large" onClick={() => setOpenAgregarPendiente(true)}/>
          </div>
        <div className="Kanban__div">
          <Column title="POR HACER" tasks={incomplete} markAsCompleted={markAsCompleted}  />
          <Column title="COMPLETADAS" tasks={completed} markAsCompleted={markAsCompleted} />
          <Column title="ELIMINAR" tasks={[]} markAsCompleted={markAsCompleted} />
        </div>
      
      <div className="Preguntas">
        <h2 className="Administracion__h1">PREGUNTAS</h2>
        <div>
           <Preguntas />
        </div>
      </div>
    </div>
  </div>
  );
}
