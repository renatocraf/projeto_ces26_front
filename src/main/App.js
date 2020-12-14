import React from 'react';
import { BrowserRouter } from 'react-router-dom'
//import logo from './logo.svg';

import history from './history';
//estilos
//import 'bootstrap/dist/css/bootstrap.min.css'
//import 'font-awesome/css/font-awesome.min.css'
import './App.css';

import { AuthProvider } from '../Context/AuthContext';

import Header from '../components/template/Header'
import Routes from './Routes'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter history={history}>   
    
        <div className="App">
          <Header />
          <Routes />
        </div>
      
      </BrowserRouter>
    </AuthProvider> 
    
  );
}

export default App;
