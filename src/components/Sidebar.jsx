import React, { useState } from 'react';
import { SidebarData } from '../data/SidebarData';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import CloseIcon from '@mui/icons-material/Close';



const Sidebar = () => {
  const [isNavOpen, setIsNavOpen] = useState(true);

  function toggleSidebar(){
    setIsNavOpen(!isNavOpen);
    console.log("Toggle Sidebar clicked");
  }
  

  return (
    <div className={`div ${isNavOpen ? 'Sidebar' : 'sidebar-closed'}`}>
      
      <div className={`div ${isNavOpen ? 'Sidebar__Menu' : 'sidebar-closed-menu'}`}>
        {isNavOpen ? (
          <CloseIcon onClick={toggleSidebar} />
        ) : (
          <MenuOutlinedIcon onClick={toggleSidebar} />
        )}
      </div>
      <div>
        <img src="./images/logo-unah-blanco.png" className={`img ${isNavOpen ? 'Sidebar__logo' : 'sidebar-closed-logo'}`}/>
          <ul className={`ul ${isNavOpen ? 'Sidebar__list' : 'sidebar-closed-list'}`}>
            {SidebarData.map((val,key) =>{
              return (
                <li 
                  key={key} 
                  className={`row ${val.isTitle ? 'title' : ''}`}
                  id={window.location.pathname == val.link ? "active" : ""}
                  onClick={() => {window.location.pathname = val.link} }
                >
                  <div id="icon">
                    {val.icon}
                  </div>
                  <div id="title">
                    {val.title}
                  </div>
                </li>
              )
            })}
          </ul>
      </div>
        
    </div>
  )
}

export default Sidebar