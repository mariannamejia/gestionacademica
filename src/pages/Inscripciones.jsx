import React, {useState, useEffect} from 'react'
import Sidebar from '../components/Sidebar'
import DataTable from 'react-data-table-component';
import Papa from "papaparse";
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import request from "fetch-with-json";

const Inscripciones = () => {
  const [csvData, setCSVData] = useState([]);

  const [alert, setAlert] = useState(null);

    const closeAlert = () => {
      setAlert(null);
    };

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
      name: "Gestión",
      selector: 'gestion',
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
      gestion: []
    }
  ]

  const data2 = [
    {
      id: [],
      nombre: [],
      correo: [],
      gestion: []
    }
  ]

  const [datos, setDatos] = useState({
    
    ids: [],
    nombre: [],
    correo: [],
    gestion: []
  }); 

  const [datos2, setDatos2] = useState({
    
    ids: [],
    nombre: [],
    correo: [],
    gestion: []
  }); 

  //Data transformada a formato legible por la tabla
  const transformedData = datos.ids.map((id, index) => ({
    id: id,
    nombre: datos.nombres[index],
    correo: datos.correos[index],
    gestion: datos.gestiones[index]
  }));

  //Data transformada a formato legible por la tabla
  const transformedData2 = datos2.ids.map((id, index) => ({
    id: id,
    nombre: datos2.nombres[index],
    correo: datos2.correos[index],
    gestion: datos2.gestiones[index]
  }));

  //trae datos de inscripciones de la bd
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/inscripcion/get");
        const data = await response.json();
        const inscripciones = data.inscripciones;
  
        setDatos((prevDatos) => ({
          ...prevDatos,
          ids: inscripciones.map((data) => data._id),
          nombres: inscripciones.map((data) => data.nombre),
          correos: inscripciones.map((data) => data.correo),
          gestiones: inscripciones.map((data) => data.gestion)
        }));
        console.log(datos);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);
  
  //trae datos de participantes de la bd
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/participante/get");
        const data = await response.json();
        const participantes = data.participantes;
  
        setDatos2((prevDatos2) => ({
          ...prevDatos2,
          ids: participantes.map((data) => data._id),
          nombres: participantes.map((data) => data.nombre),
          correos: participantes.map((data) => data.correo),
          gestiones: participantes.map((data) => data.gestion)
        }));
        console.log(datos2);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);

  //Subir archivo en formato .csv
  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: (result) => {
        // result.data es un array representando filas de CSV
        console.log(result.data);
        setCSVData(result.data);
      },
      error: (error) => {
        console.error("CSV Parsing Error:", error.message);
      },
    });
  };

  const handleSave = async () => {

    if (csvData.length === 0) {
      console.error('CSV data is empty');
      return;
    }
    
    for (const entry of csvData) {
      const {Nombre, Correo, Gestión} = entry;
     //Agregar a base de datos lista de inscripciones
  try {
    request({
      method: "POST",
      url: "http://localhost:4000/api/inscripcion/nuevo",
      json: {
        nombre: Nombre,
        correo: Correo,
        gestion: Gestión
      },
    }).then((res) => {
      if (res.ok) {
        console.log('agregado');

        setAlert(
          <Alert severity="success">
            <AlertTitle>Correcto</AlertTitle>
            Se ha agregado la gestión correctamente. —{' '}
            <strong>Exitos!</strong>
          </Alert>
        );
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
  };
    }
  };


  return (
    <div className="Inscripcion__Page">
      <Sidebar />
      <div className="Administracion__div">
            <div className="alert-container">
              {alert}
            </div>
            <h1 className="Administracion__h1">Gestión de Personas</h1>
            <div className="file__upload">
              <p>Subir documento en formato .CSV de la lista de las inscripciones</p>
              <input type="file" accept=".csv" onChange={handleFileUpload} />
              <button onClick={handleSave} className='download__btn'>Guardar Listado</button>
            </div>
        <div className="Personas__Page">
        <div className="Administracion__div">       
          <h1 className="Administracion__h1">Inscripciones</h1>
          <div className="Administracion__table">
                <DataTable
                  columns={[
                    ...columns
                  ]}
                  data={transformedData}
                  selectableRows
                  fixedHeader
                  pagination
                  customStyles={customStyles}
                ></DataTable>
                </div>
        </div>
        <div className="Administracion__div">
          <h1 className="Administracion__h1">Participantes</h1>
          <div className="Administracion__table">
                <DataTable
                  columns={[
                    ...columns
                  ]}
                  data={transformedData2}
                  selectableRows
                  fixedHeader
                  pagination
                  customStyles={customStyles}
                ></DataTable>
                </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Inscripciones