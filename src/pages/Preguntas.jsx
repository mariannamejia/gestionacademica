import React, {useState, useEffect} from 'react';
import DataTable from 'react-data-table-component';
import request from "fetch-with-json";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import axios from 'axios';

export default function Preguntas(){
    const columns = [
        {
          name: "Nombre",
          selector: 'nombre',
          sortable: true
        },
        {
          name: "Correo",
          selector: 'correo',
          sortable: true
        },
        {
          name: "Mensaje",
          selector: 'mensaje',
          sortable: true
        },
        {
            name: 'Responder',
            cell: row => (
              <button className="Responder__btn" onClick={() => handleResponderClick(row)}>Responder</button>
            ),
        },
        {
          name: 'Resuelto',
            cell: row => (
              <button className="Responder__btn" onClick={() => handleResueltoClick(row)}>Resuelto </button>
            ),
        }
    ];

    const data = [
        {
            id: [],
          nombre: [],
          correo: [],
          mensaje: []
        }
      ]

    const [datos, setDatos] = useState ({
      id: [],
      nombre: [],
      correo: [],
      mensaje: []
    })

    const transformedData = datos.id.map((id, index) => ({
      id: id,
      nombre: datos.nombre[index],
      correo: datos.correo[index],
      mensaje: datos.mensaje[index]
    }));

    const [alert, setAlert] = useState(null);

    const closeAlert = () => {
      setAlert(null);
    };

    useEffect(() => {
      if (alert) {
        const timer = setTimeout(() => {
          closeAlert();
        }, 5000); // 5000 millisegundos = 5 segundos
  
        // vacia el temporizador
        return () => clearTimeout(timer);
      }
    }, [alert]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch("http://localhost:4000/api/consulta/get");
          const data = await response.json();
          const consultas = data.consultas;

           // Filter the data to only include items with activo: true
          const filteredConsultas = consultas.filter((data) => data.activo);
    
          setDatos((prevDatos) => ({
            ...prevDatos,
            id: filteredConsultas.map((data) => data._id),
            nombre: filteredConsultas.map((data) => data.nombre),
            correo: filteredConsultas.map((data) => data.correo),
            mensaje: filteredConsultas.map((data) => data.mensaje)
          }));
          console.log(datos);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
    
      fetchData();
    }, []);

    function handleResponderClick(row){
      const { correo, nombre, mensaje } = row;

      // Construct el mailto link
      const subject = encodeURIComponent('Preguntas sobre Futuros Eventos');
      const body = encodeURIComponent(`Hola ${nombre}, hemos recibido su mensaje: \n\n${mensaje}`);
      const mailtoLink = `mailto:${correo}?subject=${subject}&body=${body}`;

      // abrir default email del usuario
      window.location.href = mailtoLink;
    }

    const handleResueltoClick = row => {
      try {
        request({
          method: "PUT",
          url: "http://localhost:4000/api/consulta/cambiarEstadoConsulta?id="+row.id,
        }).then((res) => {
          if (res.ok) {
            
                setAlert(
                  <Alert severity="success">
                    <AlertTitle>Correcto</AlertTitle>
                    Se ha resuelto la consulta —{' '}
                    <strong>Gracias por responder!</strong>
                  </Alert>
                );

              // Refresh the page after a delay
              setTimeout(() => {
                window.location.reload();
              }, 2000); // 2000 milliseconds = 2 seconds

            console.log('estado cambiado');
          }
        });
      } catch {
        setAlert(
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            No se ha podido ingresar.
          </Alert>
        );
        // Refresh the page after a delay
        setTimeout(() => {
          window.location.reload();
        }, 2000); // 2000 milliseconds = 2 seconds
      }
    }

    return (
        <div className="Administracion__table">
          <div className="alert-container">
            {alert}
          </div> 
          <DataTable
            columns={columns}
            data={transformedData}
            selectableRows
            fixedHeader
            pagination
            className="Data_Tbl"
          ></DataTable>
        </div>
    );
}