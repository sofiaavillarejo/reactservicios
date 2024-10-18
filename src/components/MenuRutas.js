import React, { Component } from 'react'

export default class MenuRutas extends Component {
  render() {
    return (
      <div>
        <ul id='menurutas'>
          <li><a href='/'>Home</a></li>
          <li><a href='/tablamultiplicar/21'>Tabla multiplicar 21</a></li>
          <li><a href='/tablamultiplicar/66'>Tabla multiplicar 66 </a></li>
          <li><a href='/tablamultiplicar/55'>Tabla multiplicar 55</a></li>
          <li><a href='/noexisto'>Sin ruta</a></li>
        </ul>
      </div>
    )
  }
}
