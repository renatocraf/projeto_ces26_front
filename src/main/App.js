import React from 'react';
import { BrowserRouter } from 'react-router-dom'
//import logo from './logo.svg';


//estilos
//import 'bootstrap/dist/css/bootstrap.min.css'
//import 'font-awesome/css/font-awesome.min.css'
import './App.css';

import Header from '../components/template/Header'
import Routes from './Routes'

function App() {
  return (
    <BrowserRouter>    
      <div className="App">
        <Header />
        <Routes />
      </div>
    </BrowserRouter>
  );
}

export default App;
