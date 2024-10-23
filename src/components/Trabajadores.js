import React, { Component } from 'react'
import HospitalesMultiple from './HospitalesMultiple'
import Global from '../Global';
import axios from 'axios';

export default class Trabajadores extends Component {
  state = {
    trabajadores: [],
    mensaje: ""
  }

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
  render() {
    return (
      <div>
        <h1 style={{color:"red"}}>Trabajadores</h1>
        {/* comprobar la url que hemos formado con los id de los hospitales y los & */}
        <h2 style={{color:"blue"}}>{this.state.mensaje}</h2>
        {/* comprobar que el hijo recibe los props con los id de los hospitales seleccionados en el select multiple */}
        <ul className='list-group'>
          { this.props.idhospitales.map((id,index)=> {
              return(
                <li className='list-group-item' key={index}>{id}</li>
              )
          })}
        </ul>
        <ul className='list-group'>
          { this.state.trabajadores.map((trabajador,index)=> {
              return(
                <li style={{color: "fuchsia"}} className='list-group-item' key={index}>{trabajador.apellido}</li>
              )
          })}
        </ul>
        {
          this.state.trabajadores.length == 0 && (
            (<h1>No hay trabajadores</h1>)
          )
        }
      </div>
    )
  }
}

