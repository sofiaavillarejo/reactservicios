import React, { Component } from 'react';
import axios from 'axios';
import Global from '../Global';

export default class BuscadorCustomer extends Component {
  urlApi = Global.urlApiCustomers;
  //buscamos por caja de texto
  cajaId = React.createRef();
  state = {
    customer: null
  }

  buscarCustomer = (e) =>{
    e.preventDefault();
    //recuperamos el valor del input 
    let idCustomer = this.cajaId.current.value;
    let request = "customers/" + idCustomer + ".json";

    axios.get(this.urlApi + request).then(response => {
      console.log("Leyendo servicio");
      this.setState({
        customer: response.data.customer
      })
    })
  }
  
  render() {
    return (
      <div>
        <h1>Buscado API Customer</h1>
        <form onSubmit={this.buscarCustomer}>
          <label>ID Customer: </label>
          <input type='text' ref={this.cajaId}></input>
          <button>Buscar Customer</button>
        </form>
        {
          //si el estado de customer no es null, pintalo
          this.state.customer && 
          (<ul>
            <li>Cliente: {this.state.customer.contactName}</li>
            <li>Empresa: {this.state.customer.companyName}</li>
            <li>Puesto: {this.state.customer.contactTitle}</li>
            <li>Ciudad: {this.state.customer.city}</li>
          </ul>)
        }
      </div>
    )
  }
}
