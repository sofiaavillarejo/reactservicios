import React, { Component } from 'react'
import Global from '../../Global';
import axios from 'axios';

export default class Empleados extends Component {
  state = {
    empleados: [],
    texto: ""
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

  //Al cambiar de option en el select, no se actualiza la tabla porque no una vez montada la practica, no refresca nuestro component
  //es decir, no lee el metodo componentdidmount() porque solo lo lee una vez
  //Tenemos un metodo en el ciclo de vida que nos permite capturar el dibujo de la página cuando es cambiado
  //este método se ejecuta cuando el component ya se ha montado y cuando el render() es ejecutado -> componentDidUpdate()
  componentDidUpdate = (oldProps) => {
    // console.log("Dibujando componente" + this.props.iddepartamento);
    //Si hacemos esto, nos da una excepcion (error) porque estamos cambian el state dentro de componentdidupdate
    //lo que hace es ejecutar el render() y volver a leer el dibujo de forma infinita
    //todo: en componendidupdate podemos recibir props, pero son las anteriores que teniamos antes de cambiar el dibujo
    //recibimos las antiguas props (10)
    //!Si comparamos podemos actualizar el dibujo sol cuando ha cambiado props
    console.log("Old props: " + oldProps.iddepartamento)
    console.log("Current props: " + this.props.iddepartamento);
    //!Si el antiguo prop es distinto al nuevo, actualzia el dibujo
    //todo: PONER SIEMPRE UN IF PORQUE SINO HACEMOS BUCLES INFINITOS
    if (oldProps.iddepartamento != this.props.iddepartamento){
      // this.setState({
      //   texto: "Update: " + this.props.iddepartamento //por lo tanto, actualizamos el valor solo cuando cambie
      // })
        this.loadEmpleados();
    }
    // this.setState({
    //   texto: "Update: " + this.props.iddepartamento })
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
