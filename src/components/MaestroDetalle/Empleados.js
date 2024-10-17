import React, { Component } from 'react'
import Global from '../../Global';
import axios from 'axios';

export default class Empleados extends Component {
  state = {
    empleados: []
  }

  loadEmpleados = () => {
    let idDpto = this.props.iddepartamento; //recuperamos el id que nos pasa el padre
    var request = "api/empleados/empleadosdepartamento/" + idDpto;
    var url = Global.urlApiEmpleados + request;
    axios.get(url).then(response => {
      console.log(response.data);

      this.setState({
        empleados: response.data
      })
    })
  }

  //al cargar el componente, llamamos al metodo
  componentDidMount = () => {
    this.loadEmpleados();
  }

  render() {
    return (
      <div>
        <h1>Empleados Component</h1>
        <table border="1" style={{borderCollapse: "collapse"}}>
          <thead>
            <tr>
              <th>Apellido</th>
              <th>Oficio</th>
              <th>Departamento</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.empleados.map((empleado, index) => {
                return (
                  <tr key={index}>
                    <td>{empleado.apellido}</td>
                    <td>{empleado.oficio}</td>
                    <td>{empleado.departamento}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    )
  }
}
