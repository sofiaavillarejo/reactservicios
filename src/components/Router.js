import React, { Component } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import TablaMultiplicar from './TablaMultiplicar'
import NotFound from './NotFound'
import Home from './Home'

//todo: importamos useParams
import { useParams } from 'react-router-dom';

export default class Router extends Component {
  render() {
    function TablaMultiplicarElement(){
      //esta funcion no sirve para capturar los parametros en una ruta
      //para separar props de params, llamamos a nuestro parametro en ruta minumero
      var { minumero } = useParams();
      //devolvemos el component con sus props de la variable numero
      return <TablaMultiplicar numero ={minumero}/>
    }
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/tablamultiplicar/:minumero' element={<TablaMultiplicarElement/>}></Route>
          {/* PARA LAS RUTAS QUE NO EXISTE, DEBEMOS UTILIZAR UN * DENTRO DEL PATH Y DEBE SER LA ÚLTIMA ETIQUETA DE <Routes/> */}
          <Route path='*' element={<NotFound/>} />
        </Routes>
      </BrowserRouter>
    )
  }
}
