import React, { Component } from 'react'
import Global from '../Global';
import axios from 'axios';

export default class BuscadorEmpleadosOficio extends Component {
  urlEmpleados = Global.urlApiEmpleados;
  selectOficio = React.createRef();
  requestEmpleados = "api/Empleados";

  state = {
    empleados: [],
    empleadosFiltrados: [],
    oficiosDistintos: []
  }

  componentDidMount = () => {
    this.loadEmpleados();
  }

  loadEmpleados = (e) =>{
    var url = this.urlEmpleados + this.requestEmpleados;
    let arrayOficios = []
    axios.get(url).then(response => {
      console.log(response.data);
      for (const empleado of response.data) {
        if(!arrayOficios.includes(empleado.oficio)){
            arrayOficios.push(empleado.oficio)
        }
    }
      this.setState({
        oficiosDistintos: arrayOficios,
      })
    })
  }

  buscarEmpleadosxOficio = (e) => {
    e.preventDefault();
    console.log()
    let oficioSelected = this.selectOficio.current.value;
    console.log(oficioSelected);
    var requestOficios = "api/Empleados/EmpleadosOficio/";
    let url = this.urlEmpleados + requestOficios + oficioSelected;

    axios.get(url).then(response => {
      this.setState({
        empleadosFiltrados: response.data
      })
    })
    console.log(this.state.empleados);
  }

  render() {
    return (
      <div>
        <h1>Buscador de Empleados por Oficio</h1>
        <form>
          <select ref={this.selectOficio}>
            {
              this.state.oficiosDistintos.map((oficio, index) => {
                return(
                  <option key={index} value={oficio}>{oficio}</option>
                )
              })
            }
          </select>
          <button onClick={this.buscarEmpleadosxOficio}>Buscar empleados</button>
        </form>
        <h1>Filtramos por el oficio:</h1>
        <ul>
          {
            this.state.empleadosFiltrados.map((empleado, index) => {
              return ( 
                <li key={index}>{empleado.idEmpleado}, {empleado.apellido}, {empleado.oficio}</li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}
