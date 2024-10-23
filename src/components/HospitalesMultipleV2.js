import React, { Component } from 'react'
import Trabajadores from './Trabajadores'
import Global from '../Global';
import axios from 'axios';
import { get } from 'jquery';
import TrabajadoresV2 from './TrabajadoresV2';

export default class HospitalesMultipleV2 extends Component {
  selectHospital = React.createRef();

  state = {
    hospitales: [],
    hospitalesSeleccionados: []
  }

  loadHospitales = () =>{
    var request = "api/Hospitales";
    var url = Global.urlEjemplos + request;
    axios.get(url).then(response => {
      console.log(response.data);
      this.setState({
        hospitales: response.data
      })
    })
  }

  componentDidMount = () =>{
    this.loadHospitales();
  }

  getHospitalesSeleccionados = (e) => {
    e.preventDefault();
    let aux = [] //array auxiliar para guardar todos los hospitales cda vez
    let hospitalesSelected = this.selectHospital.current.options;
    for ( var opt of hospitalesSelected){
      if (opt.selected == true){
        aux.push(opt.value); //metemos en aux el valor de cada option
      }
    }
    this.setState({
      hospitalesSeleccionados: aux
    })
  }

  render() {
    return (
      <div>
        <h1>Component HospitalesMultiple V2</h1>
        {/* le pasamos al component Trabajadores el id de los hospitales seleccionados */}
        {
          this.state.hospitalesSeleccionados != 0 && (
            <TrabajadoresV2 idhospitales = {this.state.hospitalesSeleccionados}/>
          )
        }
        <form>
          <select ref={this.selectHospital} className='form-control' size="7" multiple>
            {
              this.state.hospitales.map((hospital, index) => {
                return(
                  <option key={index} value={hospital.idHospital}>{hospital.nombre}</option>
                )
              })
            }
          </select>
          <button onClick={this.getHospitalesSeleccionados} className='btn btn-primary'>Mostrar trabajadores</button>
        </form>
        {/* Lista para comprobar los id que voy seleccionando del select */}
        {/* <ul>
          {this.state.hospitalesSeleccionados.map((id, index)=>{
            return(
              // Saca el value del option que en este caso, le pasamos el id de cada hospital
              <li key={index}>{id}</li>
            )
          })}
        </ul> */}
      </div>
    )
  }
}