import React, { Component } from 'react'
import Global from '../Global';
import axios from 'axios';

export default class BuscadorDptoEmpleados extends Component {
  urlDptos = Global.urlApiDptosEmpleados;
  urlApiEmple = Global.urlApiEmpleados;
  requestDptos = "api/departamentos";
  requestEmplexDptos = "api/Empleados/EmpleadosDepartamento/";

  selectDpto = React.createRef();

  buscarEmpleados = (e) =>{
    e.preventDefault();
    //sacar el value del option seleccionado del select (sacamos el numero de dpto)
    let idDptoSelected = this.selectDpto.current.value;
    let url = this.urlApiEmple + this.requestEmplexDptos + idDptoSelected;
    axios.get(url).then(response => {
      console.log(response);
      this.setState({
        empleados: response.data
      })
    })
  }

  state = {
    empleados: [],
    departamentos: []//no son del todo necesarios aqui, porque solo los voy a usar cuando cargue la pagina
  }
  loadDptos = () =>{
    axios.get(this.urlDptos + this.requestDptos).then(response =>{
      console.log(response.data);
      this.setState({
        departamentos: response.data
      })
    })
  }
  componentDidMount = () =>{
    this.loadDptos();
  }
  render() {
    return (
      <div>
        <h1 style={{textAlign:"center"}}>Buscador de dptos y empleados</h1>
        <form>
          <label>Seleccione un departamento: </label>
          <select ref={this.selectDpto}>
            {
              this.state.departamentos.map((dpto, index) => {
                return(
                  // metemos el nº de dpto en el option para que se guarde
                  <option key={index} value={dpto.Numero}>{dpto.Nombre}</option>
                )
              })
            }
          </select>
          <button onClick={this.buscarEmpleados}>Buscar empleado</button>
        </form>
        <ul>
            {
              this.state.empleados.map((empleado, index) => {
                return(
                  <li key={index}>{empleado.apellido}, Nombre: {empleado.oficio}</li>
                )
              })
            }
        </ul>
      </div>
    )
  }
}
