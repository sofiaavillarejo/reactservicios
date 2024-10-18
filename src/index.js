import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ServicioCustomers from './components/ServicioCustomers';
import BuscadorCustomer from './components/BuscadorCustomer';
import BuscadorCoches from './components/BuscadorCoches';
import BuscadorDptoEmpleados from './components/BuscadorDptoEmpleados';
import BuscadorEmpleadosOficio from './components/BuscadorEmpleadosOficio';
import Departamentos from './components/MaestroDetalle/Departamentos';
import TablaMultiplicar from './components/TablaMultiplicar';

//!TENER CUIDADO PORQUE SIEMPRE COGE EL REACT-ROUTER.DOM
import Router from './components/Router';
import MenuRutas from './components/MenuRutas';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <ServicioCustomers/>
  // <BuscadorCustomer/>
  // <BuscadorCoches/>
  // <BuscadorDptoEmpleados/>
  // <BuscadorEmpleadosOficio/>
  // <Departamentos/>
  // <div>
  //   <TablaMultiplicar numero="7"/>
  //   <TablaMultiplicar numero="9"/>
  // </div>
  <div>
    <MenuRutas/>
    <Router/>
  </div>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
