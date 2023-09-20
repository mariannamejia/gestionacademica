import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import DataTable from 'react-data-table-component';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ModeIcon from '@mui/icons-material/Mode';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import Agregar from '../components/Agregar';
import request from "fetch-with-json";
import VerGestiones from "../components/VerGestiones";
import Editar from '../components/EditarGestiones';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import ToggleOnOutlinedIcon from '@mui/icons-material/ToggleOnOutlined';

const Seminariosvirtuales = () => {

  const columns = [
    {
      name: "Nombre",
      selector: 'nombre',
      sortable: true
    },
    {
      name: "Ubicación",
      selector: 'ubicacion',
      sortable: true
    },
    {
      name: "Fecha",
      selector: 'fecha',
      sortable: true
    },
    {
      name: "Hora",
      selector: 'hora',
      sortable: true
    },
    {
      name: "Administrador",
      selector: 'administrador',
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
      ubicacion: [],
      fecha: [],
      hora: [],
      imagen: [],
      instructor: [],
      tpgestion: [],
      certificado: [],
      administrador: [],
      link: [],
      activo: []
    }
  ]

  const [selectedData, setSelectedData] = React.useState();

  const [openAgregar, setOpenAgregar] = useState(false);

  const [alert, setAlert] = useState(null);

  const closeAlert = () => {
    setAlert(null);
  };

  //Abrir modal de ver y editar
  const [openVer, setOpenVer] = useState(false);
  const [openVerEdit, setOpenVerEdit] = useState(false);

  const [selectedRow, setSelectedRow] = useState(null);

  const [datos, setDatos] = useState({
    
    ids: [],
    nombres: [],
    ubicacion: [],
    fecha: [],
    hora: [],
    imagen: [],
    instructor: [],
    tpgestion: [],
    certificado: [],
    administrador: [],
    link: [],
    activo: []
  })

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
    ubicacion: datos.ubicacion[index],
    fecha: datos.fecha[index],
    hora: datos.hora[index],
    imagen: datos.imagen[index],
    instructor: datos.instructor[index],
    tpgestion: datos.tpgestion[index],
    certificado: datos.certificado[index],
    administrador: datos.administrador[index],
    link: datos.link[index],
    activo: getStatusIcon(datos.activo[index]),
  }));

  const filteredData = transformedData.filter((row) => row.tpgestion === "Seminario Virtual");

  const [inputValues, setInputValues] = useState ({
    nombre: '',
    ubicacion: '',
    fecha: '',
    hora: '',
    imagen: '',
    instructor: '',
    tpgestion: '',
    certificado: '',
    administrador: '',
    link: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/gestion/get");
        const data = await response.json();
        const gestiones = data.gestiones;
  
        setDatos((prevDatos) => ({
          ...prevDatos,
          ids: gestiones.map((data) => data._id),
          nombres: gestiones.map((data) => data.nombre),
          ubicacion: gestiones.map((data) => data.ubicacion),
          fecha: gestiones.map((data) => data.fecha),
          hora: gestiones.map((data) => data.hora),
          imagen: gestiones.map((data) => data.imagen),
          instructor: gestiones.map((data) => data.instuctor),
          tpgestion: gestiones.map((data) => data.tpgestion),
          certificado: gestiones.map((data) => data.certificado),
          administrador: gestiones.map((data) => data.administrador),
          link: gestiones.map((data) => data.link),
          activo: gestiones.map((data) => data.activo)
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

    if (name === "adminName") {
      setInputValues((prevInputValues) => ({
        ...prevInputValues,
        administrador: value, // Actualizar "administrador"
      }));
    }else {
      setInputValues((prevInputValues) => ({
        ...prevInputValues,
        [name]: value,
      }));
    }
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
  
  const handleSubmit = () => {
    try {
      request({
        method: "POST",
        url: "http://localhost:4000/api/gestion/nuevo",
        json: {
          nombre: inputValues.nombre,
          ubicacion: inputValues.ubicacion,
          fecha: inputValues.fecha,
          hora: inputValues.hora,
          imagen: inputValues.imagen,
          instructor: inputValues.instructor,
          tpgestion: inputValues.tpgestion,
          certificado: inputValues.certificado,
          administrador: inputValues.administrador,
          link: inputValues.link
        },
      }).then((res) => {
        if (res.ok) {
          console.log('agregado');

          setInputValues({
            nombre: "",
            ubicacion: "",
            fecha: "",
            hora: "",
            imagen: "",
            instructor: "",
            tpgestion: "",
            certificado: "",
            administrador: "",
            link: "",
          });
  
          setAlert(
            <Alert severity="success">
              <AlertTitle>Correcto</AlertTitle>
              Se ha agregado la gestión correctamente. —{' '}
              <strong>Exitos!</strong>
            </Alert>
          );
  
          setTimeout(() => {
            window.location.reload();
          }, 5000); // 2000 milliseconds = 2 seconds

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
      alert("No se ha podido ingresar");
    }
  }

  function handleSubmitEdit(){
    try {
      request({
        method: "PUT",
        url: "http://localhost:4000/api/gestion/editar?id="+selectedRow.id,
        json: {
          nombre: selectedRow.nombre,
          ubicacion: selectedRow.ubicacion,
          fecha: selectedRow.fecha,
          hora: selectedRow.hora,
          imagen: selectedRow.imagen,
          instructor: selectedRow.instructor,
          tpgestion: selectedRow.tpgestion,
          certificado: selectedRow.certificado,
          administrador: selectedRow.administrador,
          link: selectedRow.link
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
        url: "http://localhost:4000/api/gestion/cambiarEstado?id="+row.id,
      }).then((res) => {
        if (res.ok) {
          setAlert(
            <Alert severity="info">
              <AlertTitle>Alerta Cambio</AlertTitle>
              Se ha cambiado el estado de esta Gestion —{' '}
              <strong>Favor informar al Administrador</strong>
            </Alert>
          );
  
        // Refresh the page after a delay
        setTimeout(() => {
          window.location.reload();
        }, 5000); // 2000 milliseconds = 2 seconds
  
          console.log('estado cambiado');
  
          window.location.reload();
        }
      });
    } catch {
      alert("No se ha podido cambiar el estado");
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
    <div className="SeminariosV__Page">
        <Agregar open={openAgregar} onClose={() => setOpenAgregar(false)} 
                  inputValues={inputValues} 
                  handleInputChange={handleInputChange} 
                  handleSubmit={handleSubmit}
        />
        <VerGestiones 
        open={openVer} 
        onClose={() => setOpenVer(false)} 
        selectedRow={selectedRow} 
        handleViewChange={handleViewChange}
      />
      <Editar 
        open={openVerEdit}  
        onClose={() => setOpenVerEdit(false)} 
        selectedRow={selectedRow} 
        handleViewChange={handleEditChange}
        handleSubmitEdit={handleSubmitEdit}
      />
      <Sidebar />
      <div className="Administracion__div">
      <h1 className="Administracion__h1">Administración de Seminarios Virtuales</h1>
      <div className="Admin">
              <div className="Admin__Icons">
              <h2>Agregar</h2><AddCircleOutlineIcon fontSize="large" onClick={() => setOpenAgregar(true)}/>
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
            data={filteredData}
            selectableRows
            onSelectedRowsChange={handleSelect}
            fixedHeader
            pagination
            className="Data_Tbl"
            customStyles={customStyles}
          ></DataTable>
        </div>
        </div>
    </div>
  )
}

export default Seminariosvirtuales