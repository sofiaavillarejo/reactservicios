import React, { Component } from 'react'
import Empleados from './Empleados'
import axios from 'axios';
import Global from '../../Global';

export default class Departamentos extends Component {
  selectDepartamentos = React.createRef();
  state = {
    departamentos: [],
    idDpto: 0
  }

  loadDepartamentos = () => {
    var request = "api/departamentos";
    var url = Global.urlApiDptosEmpleados + request;
    axios.get(url).then(response => {
      console.log(response.data);
      this.setState({
        departamentos: response.data
      })
    })
  }

  componentDidMount = () => {
    this.loadDepartamentos(); 
  }

  buscarEmpleados = (e) => {
    e.preventDefault();
    let idDpto = this.selectDepartamentos.current.value;
    console.log(idDpto);
    this.setState({
      idDpto: idDpto //actualizo el valor del id del departamento para pasarselo al hijo al hacer click en el btn
    })

  }
  render() {
    return (
      <div>
        <h1>Departamentos Component {this.props.iddepartamento}</h1>
        <form>
          <select ref={this.selectDepartamentos}>
            {
              this.state.departamentos.map((departamento, index)=> {
                return (
                  <option key={index} value={departamento.Numero}>{departamento.Nombre}</option>
                )
              })
            }
          </select>
          <button onClick={this.buscarEmpleados}>Buscar empleados</button>
        </form>
        <h2>Id departamento: {this.state.idDpto}</h2>
        {
          this.state.idDpto != 0 && (
            <Empleados iddepartamento={this.state.idDpto}/> //enviamos el id seleccionado al hijo Empleados
          )
        }
      </div>
    )
  }
}
