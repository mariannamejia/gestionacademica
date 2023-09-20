import 'devextreme/dist/css/dx.light.css';
import React, {useEffect, useState} from 'react';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './home/home';
import LogIn from './login/login';
import Planeacion from './planeacion/planeacion';
import Calendario from './calendario/Calendario';
import Kanban from './kanban/Kanban';
import Capacitaciones from './pages/Capacitaciones';
import CapacitacionesCont from './pages/CapacitacionesCont';
import Inscripciones from './pages/Inscripciones';
import Eventos from './pages/Eventos';
import EventosCont from './pages/EventosCont';
import EventosInst from './pages/EventosInst';
import Seminariosvirtuales from './pages/Seminariosvirtuales';
import SeminariosVirtualesInst from './pages/SeminariosVirtualesInst';
import SeminariosvirtualesCont from './pages/SeminariosvirtualesCont';
import Certificaciones from './pages/Certificaciones';
import Administracion from './pages/Administracion';
import Auditoria from './pages/Auditoria';
import Instructores from './pages/Instructores';
//import AuthRoute from './AuthRoute';
//import axios from 'axios';



function App() {
  
  
  
  
  return (
    <BrowserRouter> 
      <Routes>

        <Route path="*" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
          <Route path="/planeacion/*" element={<Planeacion/>} />
          <Route path="/calendario/*" element={<Calendario/>} />
          <Route path="/kanban/*" element={<Kanban/>}  />
          <Route path="/capacitaciones/*" element={<Capacitaciones/>} />
          <Route path="/capacitacionescont/*" element={<CapacitacionesCont/>} />
          <Route path="/inscripciones/*" element={<Inscripciones/>} />
          <Route path="/eventos/*" element={<Eventos/>} />
          <Route path="/eventoscont/*" element={<EventosCont/>}/>
          <Route path="/eventosinst/*" element={<EventosInst/>}/>
          <Route path="/seminariosvirtuales/*" element={<Seminariosvirtuales/>}/>
          <Route path="/seminariosvirtualescont/*" element={<SeminariosvirtualesCont/>} />
          <Route path="/seminariosvirtualesinst/*" element={<SeminariosVirtualesInst/>}/>
          <Route path="/certificaciones/*" element={<Certificaciones/>} />
          <Route path="/admin/*" element={<Administracion/>} />
          <Route path="/auditoria/*" element={<Auditoria/>} />
          <Route path="/instructores/*" element={<Instructores/>} />
      
      </Routes>
    </BrowserRouter >
  );
}

export default App;
