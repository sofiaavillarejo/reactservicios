import React, { Component } from 'react';
import Global from '../Global';
import axios from 'axios';

export default class BuscadorCoches extends Component {
  urlCoches = Global.urlCoches;
  cajaModeloCoche = React.createRef();

  //!HACER EL EJERCICIO CON LA CARGA DE COCHES FUERA DEL STATE, PORQUE NO HACE FALTA DIBUJARLOS TODO EL RATO
  state = {
    coches: [],
    cochesFiltro: [],
    // estamosFiltrando: false -> cree esta variable para saber si estaba filtrando o no, entonces en el condicional, si estamos buscando salia la tabla y sino, la lista
  }

  loadCoches = () => {
    console.log("antes del servicio");
    axios.get(this.urlCoches).then(response => {
      // console.log(response.data);
      this.setState({
        coches: response.data,
        // cochesFiltro: response.data //inicialmente le pasamos los datos de todos los coches
      })
    })
  }

  componentDidMount =() => {
    console.log("pagina cargada");
    this.loadCoches();
  }

  buscarPorCoche = () =>{
    console.log("Buscando");
    //pongo 
    let marcaCoche = this.cajaModeloCoche.current.value.toLowerCase();//cogemos el valor del input
    console.log(marcaCoche);
    //guardamos en una variable filtrando por "marcaCoche"
    //de cada coche, filtra en la marca en minusculas y saca lo que incluya el valor de "marcaCoche"
    //array.filter(objetoDelArray => objetodelArray.propiedad == valor)
    // todo: var cochesFiltrados = this.state.coches.filter(coche => coche.marca == marca)
    var cochesFiltrados = this.state.coches.filter(coche =>
      coche.marca.toLowerCase().includes(marcaCoche)
    )
    
    this.setState({
      cochesFiltro: cochesFiltrados, estamosFiltrando: true //actualizo el estado de si estamos filtrando para mostrar la lista de coches o la tabla si hemos filtrado
    })
    

  }

  render() {
    return (
      <div>
        <h1>Buscador de Coches</h1>
        <label>Introduzca marca </label>
        <input type='text' ref={this.cajaModeloCoche}></input>
        <button onClick={this.buscarPorCoche}>Buscar coche</button>
        <ul>
          {this.state.cochesFiltro.length > 0 && (
            <table border="1" className='table table-primary'>
              <thead>
                <tr>
                  <th>Coche</th>
                  <th>Marca</th>
                  <th>Conductor</th>
                  <th>Imagen</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.cochesFiltro.map((coche, index) => {
                    return(
                      <tr key={index}>
                        <td>{coche.modelo}</td>
                        <td>{coche.marca}</td>
                        <td>{coche.conductor}</td>
                        <td><img src={coche.imagen} style={{width: "150px"}}></img></td>
                      </tr>
                    )
                  })

                }
              </tbody>
            </table>
          )}

          { !this.state.estamosFiltrando && (
            this.state.coches.map((coche, index) =>{
              return(
                <li key={index}>Id: {coche.idcoche}, marca: {coche.marca}, modelo: {coche.modelo}</li>
              )
            })
          )}
        </ul>
      </div>
    )
  }
}

//CORRECCIÓN PROFE
/*
LET MARCA = THIS.CAJAmARCA.CURRENT.VALUE
var cochesFiltrados = []
for (var car of this.state.coches){
  if(marca == car.marca){
  cochesFiltrados.push(car)
  }
}
  this.setstate({
    coches:cochesFiltrados
  })

  !DE ESTA FORMA, LO QUE PASA ES QUE SE SUSTITUTE EL PRIMER ARRAY QUE CONTIENE TODOS LOS COCHES, POR LOS FILTRADOS
  !ENTONCES SI VOLVEMOS A BUSCAR OTRO, NO VA A SALIR NADA POR ESA SUSTITUTCION
*/