import React, { Component } from 'react'
import HospitalesMultiple from './HospitalesMultiple'
import Global from '../Global';
import axios from 'axios';

export default class TrabajadoresV2 extends Component {
  state = {
    trabajadores: [],
    mensaje: "",
    incremento: 0
  }

  cajaIncremento = React.createRef();

  loadTrabajadores = () =>{
    //RECUPERAR TODOS LOS IDS DE HOSPITAl
    let idHospitalesSelect = this.props.idhospitales;
    if(idHospitalesSelect.length != 0){
      //construir url para la peticion -> idhospital=17&idhospital=22&idhospital=14
      let data = "";
      for(var id of idHospitalesSelect){
        data += "idhospital=" + id + "&"; //creamos url con los id recuperados
      }
      //eliminar la ultimo & del string 
      data = data.substring(0, data.length - 1);
      this.setState({
        mensaje: data
      })
      //realizamos la peticion
      var request = "api/trabajadores/trabajadoreshospitales?" + data;
      var url = Global.urlEjemplos + request;
      axios.get(url).then(response => {
        this.setState({
          trabajadores: response.data
        })
        console.log(this.state.trabajadores);
      })
      
    }
  }

  componentDidMount = () =>{
    this.loadTrabajadores();
  }

  componentDidUpdate = (oldprops) => {
    if(this.props.idhospitales != oldprops.idhospitales){
      this.loadTrabajadores();
    }
  }

  incrementarSalarioTrabajador = (e) =>{
    e.preventDefault();
    //api/trabajadores/UpdateSalarioTrabajadoresHospitales?incremento=1&idhospital=17&idhospital=22
    let idHospitalesSelect = this.props.idhospitales;
    let incremento = parseInt(this.cajaIncremento.current.value);
    if(idHospitalesSelect.length != 0){
      //construir url para la peticion -> idhospital=17&idhospital=22&idhospital=14
      let data = "";
      for(var id of idHospitalesSelect){
        data += "idhospital=" + id + "&" ; //creamos url con los id recuperados
      }
      //eliminar la ultimo & del string 
      data = data.substring(0, data.length - 1);
      data = "incremento=" + incremento + "&" + data;
      this.setState({
        mensaje: data,
      })
      //realizamos la peticion
      var request = "api/trabajadores/UpdateSalarioTrabajadoresHospitales?" + data;
      var url = Global.urlEjemplos + request;
      axios.put(url).then(response => {
        console.log(response);
        //todo: VUELVO A CARGAR LOS TRABAJADORES PARA QUE ME PINTE EL INCREMENTO DEL SALARIO EN LA TABLA 
        this.loadTrabajadores();
      })
      console.log(incremento);
    }
  }
  render() {
    return (
      <div>
        <h1 style={{color:"red"}}>Trabajadores</h1>
        {/* comprobar la url que hemos formado con los id de los hospitales y los & */}
        <h2 style={{color:"blue"}}>{this.state.mensaje}</h2>
        {/* comprobar que el hijo recibe los props con los id de los hospitales seleccionados en el select multiple */}
        <form>
          <label>Introduce el importe de salario a incrementar</label>
          <input type='text' ref={this.cajaIncremento}/>
          <button className='btn btn-danger' onClick={this.incrementarSalarioTrabajador}>Incrementar</button>
        </form>
        <table className='table table-hover'>
          <thead>
            <tr>
              <th>Trabajador</th>
              <th>Salario</th>
              <th>Hospital</th>
            </tr>
          </thead>
          <tbody>
            { this.state.trabajadores.map((trabajador,index)=> {
                return(
                  <tr key={index}>
                    <td>{trabajador.apellido}</td>
                    <td>{trabajador.salario}</td>
                    <td>{this.props.idhospitales}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
        {
          this.state.trabajadores.length == 0 && (
            (<h1>No hay trabajadores</h1>)
          )
        }
      </div>
    )
  }
}
