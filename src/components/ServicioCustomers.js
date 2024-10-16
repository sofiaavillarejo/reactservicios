import React, { Component } from 'react'
//importar axios
import axios from 'axios';
import Global from '../Global';

export default class ServicioCustomers extends Component {
  urlCustomers = Global.urlApiCustomers; //url traida de forma global

  //variable state para almacenar los clientes
  state = {
    customers: []
  }
  //necesitamos recuperar los clientes con axios
  loadCustomers = () => {
    console.log("antes del servicio");
    let request = "customers.json";

    axios.get(this.urlCustomers + request).then(response =>{
      console.log("Leyendo el servicio");
      console.log(response.data.results); //accedo a los datos del array de customers
      //almaceno en el array los datos que me trae axios
      this.setState({
        customers: response.data.results
      })
    })
    console.log("Despues del servicio");
  }

  //cargamos los datos en el metodo inicial de la página
  //lo hacemos solo una vez, que sera al iniciar el component
  componentDidMount = () =>{
    console.log("Creando component");
    this.loadCustomers();
  }

  render() {
    return (
      <div>
        <h1>Servicio API Customers</h1>
        {/* Al poner el metodo componentDidMount(), esto ya no hace falta */}
        {/* <button onClick={this.loadCustomers}>Cargar clientes API</button> */}
        {
          this.state.customers.map((customer,index) => {
            return (
              <h3 style={{color: "blue"}} key={index}>{customer.contactName}</h3>
            )
          })
        }
      </div>
    )
  }
}
