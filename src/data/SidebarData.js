import React from 'react'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import Seminariosvirtuales from '../pages/Seminariosvirtuales';
import ViewKanbanOutlinedIcon from '@mui/icons-material/ViewKanbanOutlined';
import CastForEducationOutlinedIcon from '@mui/icons-material/CastForEducationOutlined';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import PhonelinkOutlinedIcon from '@mui/icons-material/PhonelinkOutlined';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import DonutLargeOutlinedIcon from '@mui/icons-material/DonutLargeOutlined';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import DoubleArrowOutlinedIcon from '@mui/icons-material/DoubleArrowOutlined';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import Home from '../home/home';
import SettingsIcon from '@mui/icons-material/Settings';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import SchoolIcon from '@mui/icons-material/School';

export const SidebarData = [
    {
       title: "Calendario",
       icon: <CalendarMonthOutlinedIcon />,
       link: "/calendario"
    },
    {
        title:"Lista de Pendientes",
        icon: <ViewKanbanOutlinedIcon />,
        link: "/kanban"
     },
     {
      title:"Usuarios",
      icon: <PersonOutlineOutlinedIcon />,
      link: "/admin"
   },
     {title:"Administración de Gestiones",
      icon: <DoubleArrowOutlinedIcon />,
      link: "/capacitaciones",
      isTitle: true
      },
     {
        title:"Capacitaciones",
        icon: <CastForEducationOutlinedIcon />,
        link: "/capacitaciones"
     },
     {
        title:"Eventos",
        icon: <EventOutlinedIcon />,
        link: "/eventos"
     },
     {
        title:"Seminarios Virtuales",
        icon: <PhonelinkOutlinedIcon />,
        link: "/seminariosvirtuales"
     },
     {
         title:"Certificaciones",
         icon: <TextSnippetIcon />,
         link: "/certificaciones"
      },
      {
         title:"Inscripciones",
         icon: <ChecklistRtlIcon />,
         link: "/inscripciones"
      },
      {
         title:"Instructores",
         icon: <SchoolIcon />,
         link: "/instructores"
      },
     {
         title:"Evaluación de Gestiónes",
         icon: <DoubleArrowOutlinedIcon />,
         link: "/capacitacionescont",
         isTitle: true
      },
     {
        title:"Tablero",
        icon: <InsertChartOutlinedIcon />,
        link: "/capacitacionescont"
     },
     {
      title:"Auditoría",
      icon: <RecentActorsIcon />,
      link: "/auditoria"
   },
     {
      title:"Cerrar Sesión",
      icon: <LogoutOutlinedIcon />,
      link: "/*"
   },
]