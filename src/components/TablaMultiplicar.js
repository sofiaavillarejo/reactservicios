import React, { Component } from 'react'

export default class TablaMultiplicar extends Component {
  state = {
    tabla: []
  }

  generarTabla = () =>{
    var numero = parseInt(this.props.numero);
    let aux = [];
    console.log(numero);
    for (let i = 0; i <= 10; i++) {
      var operacion = numero * i;
      aux.push(operacion);
    }
    this.setState({
      tabla: aux //cambiamos el estado de tabla a aux con las multiplicaciones hechas para pintarlas
    })
  }

  componentDidMount = () => {
    this.generarTabla();
  }

  componentDidUpdate = (oldProps) => {
    //si ha cambiado el numero, vuelve a dibujar la tabla
    if(oldProps.numero != this.props.numero){
      this.generarTabla();
    }
  }
  render() {
    return (
      <div>
        <h1>Tabla de Multiplicar Rutas</h1>
        <h2 style={{color:"blue"}}>Número: {this.props.numero}</h2>
        <ul>
          {
            this.state.tabla.map ((num, index) => {
              return(
                <li key={index}>{this.props.numero} * {index} = {num}</li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}