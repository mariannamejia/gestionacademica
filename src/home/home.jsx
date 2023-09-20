
import Header from '../components/header'
import React, {useEffect, useState} from 'react'
import Inicio from '../components/inicio'
import './home.css'
import axios from 'axios';


export default function Home() {
  
  
  return (
    <>
    <main className="main__home">
      <Header />
      <div className="home__div">
          <img src="/images/UNAH-2.jpg" className="home__img"/>
      </div>
        <Inicio />
    </main>
    </>
    
  )
}
