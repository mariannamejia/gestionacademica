import React, { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import DataTable from 'react-data-table-component';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import request from "fetch-with-json";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import ToggleOnOutlinedIcon from '@mui/icons-material/ToggleOnOutlined';
import AgregarInst from '../components/AgregarInst';
import VerInst from '../components/VerInst';
import EditarInstructores from '../components/EditarInstructores';
import ModeIcon from '@mui/icons-material/Mode';

const Instructores = () => {

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
          name: "Estado",
          selector: 'estado',
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
          correo: [],
          estado: []
        }
      ]

      const [selectedData, setSelectedData] = useState();

      const [openAgregarInst, setOpenAgregarInst] = useState(false);

    const [alert, setAlert] = useState(null);

    const closeAlert = () => {
      setAlert(null);
    };

    //Abrir modal de ver
    const [openVer, setOpenVer] = useState(false);
    const [openVerEdit, setOpenVerEdit] = useState(false);

    const [selectedRow, setSelectedRow] = useState(null);

    const [datos, setDatos] = useState({
    
        ids: [],
        nombres: [],
        correo: [],
        estado: []
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
        correo: datos.correos[index],
        estado: getStatusIcon(datos.estado[index]), // Add a new field for the icon
      }));

      const [inputValues, setInputValues] = useState ({
        nombre: '',
        correo: ''
      });

     //trae datos de la bd
     useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch("http://localhost:4000/api/instructor/get");
            const data = await response.json();
            const instructores = data.instructores;
      
            setDatos((prevDatos) => ({
              ...prevDatos,
              ids: instructores.map((data) => data._id),
              nombres: instructores.map((data) => data.nombre),
              correos: instructores.map((data) => data.correo),
              estado: instructores.map((data) => data.estado)
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

      const handleEditChange = (field, value) => {
        setSelectedRow(prevRow => ({
          ...prevRow,
          [field]: value
        }));
      };
      
      //agregar instructor
      const handleSubmit = () => {
        try {
          request({
            method: "POST",
            url: "http://localhost:4000/api/instructor/nuevo",
            json: {
              nombre: inputValues.nombre,
              correo: inputValues.correo
            },
          }).then((res) => {
            if (res.ok) {
             
              setAlert(
                <Alert severity="success">
                  <AlertTitle>Correcto</AlertTitle>
                  Se ha agregado el instructor correctamente. —{' '}
                  <strong>Exitos!</strong>
                </Alert>
              );

              // muestra alerta despues de delay
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
          // refresca página despues de delay
          setTimeout(() => {
            window.location.reload();
          }, 5000); // 2000 milliseconds = 2 seconds
        }
      }
      
      function handleSubmitEdit(){
        try {
          request({
            method: "PUT",
            url: "http://localhost:4000/api/instructor/editar?id="+selectedRow.id,
            json: {
              nombre: selectedRow.nombre,
              correo: selectedRow.correo
            },
          }).then((res) => {
            if (res.ok) {
              setAlert(
                <Alert severity="success">
                  <AlertTitle>Correcto</AlertTitle>
                  Se ha editado la gestión correctamente. —{' '}
                  <strong>Exitos!</strong>
                </Alert>
              );
      
              setTimeout(() => {
                window.location.reload();
              }, 3000); // 2000 milliseconds = 2 seconds
      
              console.log('editado');
            }
          });
        } catch {
          setAlert(
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              No se ha podido editar.
            </Alert>
          );
        }
      }

      const handleEstado = row => {
        try {
          request({
            method: "PUT",
            url: "http://localhost:4000/api/instructor/cambiarEstadoInstructor?id="+row.id,
          }).then((res) => {
            if (res.ok) {
              
                  setAlert(
                    <Alert severity="info">
                      <AlertTitle>Alerta Cambio</AlertTitle>
                      Se ha cambiado el estado de este usaurio —{' '}
                      <strong>Favor informar al usaurio</strong>
                    </Alert>
                  );
  
                // refresca página despues de delay
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
    
      const handleEditar = row => {
        setSelectedRow(row);
        setOpenVerEdit(true);
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
    <div className="Instructor__Page">
        <AgregarInst open={openAgregarInst} onClose={() => setOpenAgregarInst(false)}
                        inputValues={inputValues}
                        handleInputChange={handleInputChange}
                        handleSubmit={handleSubmit}
        />
        <VerInst 
            open={openVer} 
            onClose={() => setOpenVer(false)} 
            selectedRow={selectedRow} 
            handleViewChange={handleViewChange}
        />
        <EditarInstructores 
        open={openVerEdit}  
        onClose={() => setOpenVerEdit(false)} 
        selectedRow={selectedRow} 
        handleViewChange={handleEditChange}
        handleSubmitEdit={handleSubmitEdit}
      />
       <Sidebar /> 
       <div className="Administracion__div">
        <h1 className="Administracion__h1">Instructores</h1>
        <div className="Admin">
            <div className='Admin__Icons'>
                <h2>Agregar</h2><AddCircleOutlineIcon fontSize="large" onClick={() => setOpenAgregarInst(true)}/>
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
                          <ModeIcon fontSize="large" onClick={() => handleEditar(row)}/>
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

export default Instructores