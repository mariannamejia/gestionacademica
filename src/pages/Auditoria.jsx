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

const Auditoria = () => {

  const columns = [
    {
      name: "Usuario",
      selector: 'user',
      sortable: true
    },
    {
      name: "Fecha",
      selector: 'fecha',
      sortable: true
    },
    {
      name: "Detalles",
      selector: 'detalles',
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
      user: [],
      fecha: [],
      detalles: []
    }
  ]

  const [datos, setDatos] = useState({
    
    ids: [],
    users: [],
    fecha: [],
    detalles: []
  }); 

  const transformedData = datos.ids.map((id, index) => ({
    id: id,
    user: datos.users[index],
    fecha: datos.fecha[index],
    detalles: datos.detalles[index],
  }));

   //trae datos de la bd
   useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/auditoria/get");
        const data = await response.json();
        const auditorias = data.auditorias;
  
        setDatos((prevDatos) => ({
          ...prevDatos,
          ids: auditorias.map((data) => data._id),
          users: auditorias.map((data) => data.user),
          fecha: auditorias.map((data) => data.fecha),
          detalles: auditorias.map((data) => data.detalles)
        }));
        console.log(datos);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);   


  return (
    <div className="Auditoria__Page">
      <Sidebar />
      <div className="Administracion__div">
        <h1 className="Administracion__h1">Bitácora</h1>
        <div className="Administracion__table">
        <DataTable
                columns={[
                  ...columns
                ]}
                data={transformedData}
                selectableRows
                //onSelectedRowsChange={handleSelect}
                fixedHeader
                pagination
                customStyles={customStyles}
              ></DataTable>
        </div>
      </div>
    </div>
  )
}

export default Auditoria