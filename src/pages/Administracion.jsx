import React, { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import DataTable from 'react-data-table-component';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import AgregarAdmin from '../components/AgregarAdmin';
import request from "fetch-with-json";
import VerAdmin from '../components/VerAdmin';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import ToggleOnOutlinedIcon from '@mui/icons-material/ToggleOnOutlined';


const Administracion = () => {

    const columns = [
        {
          name: "Nombre",
          selector: 'nombre',
          sortable: true
        },
        {
          name: "Usuario",
          selector: 'usuario',
          sortable: true
        },
        {
          name: "Estado",
          selector: 'activo',
          sortable: true
        },
      ];

      const customStyles = {
        headCells: {
          style: {
            backgroundColor: '#00303F', // Set the background color for all column headers
            color: 'white', // Set the text color for all column headers
          },
        },
      };

      const data = [
        {
          id: [],
          nombre: [],
          usuario: [],
          contrasena: [],
          activo: []
        }
      ]

    const [selectedData, setSelectedData] = React.useState();

    const [openAgregarAdmin, setOpenAgregarAdmin] = useState(false);

    const [alert, setAlert] = useState(null);

    const closeAlert = () => {
      setAlert(null);
    };

    //Abrir modal de ver
    const [openVer, setOpenVer] = useState(false);

    const [selectedRow, setSelectedRow] = useState(null);

      const [datos, setDatos] = useState({
    
        ids: [],
        nombres: [],
        usuario: [],
        contrasena: [],
        activo: []
      });  

      const getStatusIcon = (status) => {
        if (status === true) {
          return <CheckCircleIcon style={{color: "green"}}/>;
        } else {
          return <CancelIcon style={{color: "red"}}/>;
        }
      }

      const transformedData = datos.ids.map((id, index) => ({
        id: id,
        nombre: datos.nombres[index],
        usuario: datos.usuarios[index],
        contrasena: datos.contrasena[index],
        activo: getStatusIcon(datos.activo[index]), // Add a new field for the icon
      }));

      const [inputValues, setInputValues] = useState ({
        nombre: '',
        usuario: '',
        contrasena: ''
      });

      //trae datos de la bd
      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch("http://localhost:4000/api/admin/get");
            const data = await response.json();
            const admins = data.admins;
      
            setDatos((prevDatos) => ({
              ...prevDatos,
              ids: admins.map((data) => data._id),
              nombres: admins.map((data) => data.nombre),
              usuarios: admins.map((data) => data.usuario),
              fecha: admins.map((data) => data.contrasena),
              activo: admins.map((data) => data.activo)
            }));
            console.log(datos);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
      
        fetchData();
      }, []);  

      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setInputValues((prevInputValues) => ({
          ...prevInputValues,
          [name]: value,
        }));
      };
      
      const handleViewChange = (field, value) => {
        setSelectedRow(prevRow => ({
          ...prevRow,
          [field]: value
        }));
      };

    const handleSubmit = () => {
        try {
          request({
            method: "POST",
            url: "http://localhost:4000/api/admin/nuevo",
            json: {
              nombre: inputValues.nombre,
              usuario: inputValues.usuario,
              contrasena: inputValues.contrasena
            },
          }).then((res) => {
            if (res.ok) {
             
              setAlert(
                <Alert severity="success">
                  <AlertTitle>Correcto</AlertTitle>
                  Se ha agregado el usuario correctamente. —{' '}
                  <strong>Exitos!</strong>
                </Alert>
              );

              // show alert after a delay
              setTimeout(() => {
                window.location.reload();
              }, 2000); // 2000 milliseconds = 2 seconds

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
          // Refresh the page after a delay
          setTimeout(() => {
            window.location.reload();
          }, 5000); // 2000 milliseconds = 2 seconds
        }
      }

    const handleEstado = row => {
      try {
        request({
          method: "PUT",
          url: "http://localhost:4000/api/admin/cambiarEstadoAdmin?id="+row.id,
        }).then((res) => {
          if (res.ok) {
            
                setAlert(
                  <Alert severity="info">
                    <AlertTitle>Alerta Cambio</AlertTitle>
                    Se ha cambiado el estado de este usaurio —{' '}
                    <strong>Favor informar al usaurio</strong>
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
      }
    }

      const handleVer = row => {
        setSelectedRow(row);
        setOpenVer(true);
      };
      const handleSelect = (state) => {
        setSelectedData(state.selectedRows);
        console.log(selectedData);
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
    <div className="Admin__Page">
        <AgregarAdmin open={openAgregarAdmin} onClose={() => setOpenAgregarAdmin(false)}
                        inputValues={inputValues}
                        handleInputChange={handleInputChange}
                        handleSubmit={handleSubmit}
        />
        <VerAdmin
          open={openVer} 
          onClose={() => setOpenVer(false)} 
          selectedRow={selectedRow} 
          handleViewChange={handleViewChange}
        />
        <Sidebar />
        <div className="Administracion__div">
            <h1 className="Administracion__h1">Usuarios</h1>
            <div className="Admin">
                <div className="Admin__Icons">
                <h2>Agregar</h2><AddCircleOutlineIcon fontSize="large" onClick={() => setOpenAgregarAdmin(true)}/>
                </div>
            </div>
            <div className="Administracion__table">
              <div className="alert-container">
              {alert}
            </div>
              <DataTable
                columns={[
                  ...columns,
                  {
                    name: 'Actions',
                    cell: row => (
                      <div className="acciones-icons">
                          <VisibilityOutlinedIcon fontSize="large" onClick={() => handleVer(row)}/>
                          <ToggleOnOutlinedIcon fontSize="large" onClick={() => handleEstado(row)}/>
                    </div>
                    ),
                  },
                ]}
                data={transformedData}
                selectableRows
                onSelectedRowsChange={handleSelect}
                fixedHeader
                pagination
                customStyles={customStyles}
              ></DataTable>
            </div>
          </div>
        </div>
    
  )
}

export default Administracion