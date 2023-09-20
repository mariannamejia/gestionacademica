import React, { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import Papa from "papaparse";
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import JSZip from 'jszip';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import request from "fetch-with-json";


const Certificaciones = () => {
  const [csvData, setCSVData] = useState([]);
  const [pdfData, setPdfData] = useState(null);
  const [pdfDataArray, setPdfDataArray] = useState([]);

  const [alert, setAlert] = useState(null);

    const closeAlert = () => {
      setAlert(null);
    };

  const renderCertificate = async () => {

    if (csvData.length === 0) {
      console.error('CSV data is empty');
      return;
    }

    const { Nombre, Certificado, Fecha } = csvData[0];
    const backgroundImageBytes = await fetch('https://png.pngtree.com/thumb_back/fh260/background/20201201/pngtree-yellow-geometric-blue-background-image_503028.jpg').then((response) => response.arrayBuffer());
    const topLeftImageBytes = await fetch('https://upload.wikimedia.org/wikipedia/commons/f/f9/Logo-unah.jpg').then((response) => response.arrayBuffer());
    
    const pdfDataArray = [];
    const newPdfDataArray = [];

    for (const entry of csvData) {
    // Crear un nuevo documento PDF
    const { Nombre, Certificado, Fecha } = entry;
    const pdfDoc = await PDFDocument.create();
    const gothicFont= await pdfDoc.embedFont(StandardFonts.HelveticaBoldOblique)
    const page = pdfDoc.addPage([400, 250]);
    const { width, height } = page.getSize();


    // Imagen de fondo
    const backgroundImage = await pdfDoc.embedJpg(backgroundImageBytes);
    page.drawImage(backgroundImage, {
      x: 0,
      y: 0,
      width: width,
      height: height,
    });

    // Logo
    const topLeftImage = await pdfDoc.embedJpg(topLeftImageBytes);
    page.drawImage(topLeftImage, {
      x: 10,
      y: height - 50, // Ajuste de coordenadas
      width: 40, // Ajuste de width y height
      height: 50,
    });

    // Tipo de texto
    page.drawText('CERTIFICADO', {
      x: 140,
      y: height - 60,
      size: 20,
      color: rgb(0, 0, 0), 
      align: 'center',
    });
    page.drawText('DE RECONOCIMIENTO', {
      x: 110,
      y: height - 90,
      size: 18,
      color: rgb(0, 0, 0), // color
    });
    page.drawText('OTORGADO A:', {
      x: 160,
      y: height - 120,
      size: 14,
      color: rgb(0, 0, 0), // color
    });
    page.drawText(Nombre, {
      x: 155,
      y: height - 150,
      size: 16,
      color: rgb(0, 0, 0), // color
      font: gothicFont,
    });
    page.drawText(`Por haber completado el curso de ${Certificado}`, {
      x: 50,
      y: height - 180,
      size: 12,
      color: rgb(0, 0, 0), // color
    });
    page.drawText(`en la fecha del ${Fecha}.`, {
      x: 140,
      y: height - 190,
      size: 12,
      color: rgb(0, 0, 0), //color
    });

    // PDF a bytes
    const pdfBytes = await pdfDoc.save();
    newPdfDataArray.push(new Blob([pdfBytes], { type: 'application/pdf' }));

     //Agregar a base de datos
  try {
    request({
      method: "POST",
      url: "http://localhost:4000/api/participante/nuevo",
      json: {
        nombre: Nombre,
        gestion: Certificado,
        fecha: Fecha
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
  // Establecer PDF a data array en state
  setPdfDataArray(newPdfDataArray);

 
  };

  //Descargar certificado
  const downloadCertificate = () => {
    const url = URL.createObjectURL(pdfData);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'certificate.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  //Descargar todos los certificados
  const downloadAllCertificates = () => {
    const zip = new JSZip();

    pdfDataArray.forEach((pdfData, index) => {
      zip.file(`certificate_${index + 1}.pdf`, pdfData);
    });

    zip.generateAsync({ type: 'blob' }).then((content) => {
      const url = URL.createObjectURL(content);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'all_certificates.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  };

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


  return (
    <div className="Certificaciones__Page">
        <Sidebar />
        <div className="Administracion__div">
        <h1 className="Administracion__h1">Creación de Certificados</h1>
        <div className="file__upload">
          <p>Subir documento en formato .CSV de la lista de los participantes</p>
          <input type="file" accept=".csv" onChange={handleFileUpload} />
        </div>
        <div className='div__certificado'>
          <button onClick={renderCertificate} className='download__btn'>Generar Certificados</button>
          <button onClick={downloadAllCertificates} className='download__btn'>Descargar todos</button>
        </div>
        
          {pdfDataArray.length > 0 && (
            <div>
              {pdfDataArray.map((pdfData, index) => (
                <div key={index}>
              {/* Render the PDF */}
              <iframe
                title={`Certificate-${index + 1}`}
                src={URL.createObjectURL(pdfData)}
                width="100%"
                height="500px"
              ></iframe>
              {/* Render the Download Button */}
              <button onClick={() => downloadCertificate(pdfData, index)} className='download__btn'>
                Descargar Certificado {index + 1}
              </button>
            </div>
          ))}
        </div>
          )}
    </div>
  </div>
  );
};

export default Certificaciones;