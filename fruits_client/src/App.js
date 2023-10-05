import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const url = "http://localhost:8085/fruits/";

class App extends Component {
  state = {
    data: [],
    modalDelete: false,
    form: {
      _id: '',
      id: '',
      name: '',
      amount: 0,
      weight: 0.00,
      unitPrice: 0.00,
      distributor: '',
      expiration: ''
    }
  }

  peticionGet = () => {
    axios.get(url).then(response => {
      this.setState({ data: response.data });
    }).catch(error => {
      console.log(error.message);
    })
  }

  peticionDelete = () => {
    axios.delete(url + 'delete/' + this.state.form.id).then(response => {
      this.setState({ modalDelete: false });
      this.peticionGet();
    })
  }

  selectFruit = (fruit) => {
    this.setState({
      typeModal: 'Update',
      form: {
        _id: fruit._id,
        id: fruit.id,
        name: fruit.name,
        amount: fruit.amount,
        weight: fruit.weight,
        unitPrice: fruit.unitPrice,
        distributor: fruit.distributor,
        expiration: fruit.expiration
      }
    })
  }

  handleChange = async e => {
    e.persist();
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    });
    console.log(this.state.form);
  }

  componentDidMount() {
    this.peticionGet();
  }


  render() {
    const { form } = this.state;
    return (
      <div className="App container py-3">
        <h2 className="display-2">Frutas</h2>
        <table className="table ">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Peso</th>
              <th>Cantidad</th>
              <th>Precio Unitario</th>
              <th>Distribuidor</th>
              <th>Fecha de <br/>expiración</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map(fruit => {
              return (
                <tr>
                  <td>{fruit.id}</td>
                  <td>{fruit.name}</td>
                  <td>{fruit.weight}</td>
                  <td>{fruit.amount}</td>
                  <td>{fruit.unitPrice}</td>
                  <td>{fruit.distributor}</td>
                  <td>{fruit.expiration}</td>
                  <td>
                    <button className="btn btn-danger" onClick={() => { this.selectFruit(fruit); this.setState({ modalDelete: true }) }}>Delete</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        <Modal isOpen={this.state.modalDelete}>
          <ModalBody>
            ¿Está seguro que quiere eliminar este registro?
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-danger" onClick={() => this.peticionDelete()}>Eliminar</button>
            <button className="btn btn-secundary" onClick={() => this.setState({ modalDelete: false })}>Cancelar</button>
          </ModalFooter>
        </Modal>
      </div>



    );
  }
}
export default App;