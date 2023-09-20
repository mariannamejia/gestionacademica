import React from "react";

const Header = () => {

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact-section');
    contactSection.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="header">
      <div className="logo">
        <img src= "/images/logo-unah-blanco.png" alt="Logo"/>
      </div>
      <h1 className="header--title">Gestión Académica </h1>
      <br/>
      <nav className="nav">
        <ul>
          <li>
            <a href="*">
              Inicio
            </a>
            </li>
            <li> 
              <a href="/login">
                Iniciar Sesión
              </a>
            </li> 
            <li>
              <a href="#contact-section" onClick={scrollToContact}>
                Contáctanos
              </a>
            </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;