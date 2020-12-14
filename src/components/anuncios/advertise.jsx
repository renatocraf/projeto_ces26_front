import React from 'react';
import axios from 'axios';
//import ImageUploader from 'react-images-upload';
import './advertise.css';

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { baseApiUrl } from '../../global'


class AdvertiseForm extends React.Component {
    constructor(props) {
        super(props);
        this.stateInicial = {
            visible: false,
            username: '',
            product: '',
            product_description: '',
            price: 0.0,
            phone_number: '',
            product_photo: [],
            number: '',
            cep: '',
            city: '',
            uf:'',
            neighborhood: '',
            street:'',
            

        };
        this.state = this.stateInicial;
        this.rua=''
        this.cidade=''
        this.number=''
        this.estado=''
        this.endereco = ''
        this.showForm = this.showForm.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.myChangeHandler = this.myChangeHandler.bind(this);
        this.mySubmitHandler = this.mySubmitHandler.bind(this);
        this.onBlurCep =this.onBlurCep.bind(this);
        this.onBlurNumber = this.onBlurNumber.bind(this)
        this.CalcLatLng = this.CalcLatLng.bind(this)
        //Geocode.setApiKey('1018672477709-66ruqslkhumtbsotal1psldvefohhhi1.apps.googleusercontent.com');
        
    }

    onBlurCep(event) {
        const { value } = event.target;
    
        const cep = value?.replace(/[^0-9]/g, '');
        
        if (cep?.length !== 8) {
          return;
        }
        this.setState({'cep': cep});
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
          .then((res) => res.json())
          .then((data) => {
            this.rua = data.logradouro
            this.estado = data.uf
            
            this.bairro = data.bairro
            this.cidade = data.localidade
            
            this.setState({'street': data.logradouro});
            this.setState({'neighborhood': data.bairro});
            this.setState({'city': data.localidade});
            this.setState({'uf': data.uf});
          });
          
      }

    onBlurNumber(event){
       this.setState({'number': event.target.value})
       this.CalcLatLng()
    }
    
    CalcLatLng(){
        this.endereco = this.state.number +'+' +this.state.street + ',+' + this.state.neighborhood + ',+'+ this.state.city + ',+'+this.state.uf
        console.log(this.endereco)
        var key = 'AIzaSyD116QAn_lABifYKFDbFLdAYVCD5lw4VSs'
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.endereco}&key=${key}
        `).then((res) => res.json()).then((data) => {
          this.setState({'latitude': data.results[0].geometry.location.lat});
          this.setState({'longitude': data.results[0].geometry.location.lng});
          console.log("state&&&&&&&&&&&&&&&&&&&&&&&&&&&")
        console.log(this.state.longitude)
        });
    }

    showForm() {
        this.setState({ visible: !this.state.visible });
    }

    onDrop(picture) {
        this.setState({ product_photo: this.state.product_photo.concat(picture), });
    }

    mySubmitHandler(event) {
        event.preventDefault();
        
        
        const data = {
            "name": this.state.product,
            "description": this.state.product_description,
            "telefone": this.state.phone_number,
            "categoryId": parseInt(this.state.category),
            "anunciante": this.state.username,
            "preco": this.state.price,
            "imageUrl": this.state.imageUrl,
            "latitude": this.state.latitude,
            "longitude": this.state.longitude
            
        }
        console.log("DATA&&&&&&&&&&&&&&&&&&&&&&&&&&&")
        console.log(data)
        
        axios.post(`${baseApiUrl}/announcements`, data)
            .then(response => console.log(response))
            .catch((err) => console.log(err))

        this.setState(this.stateInicial)
    }

    myChangeHandler(event) {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });
    }

    render() {
        return (
            <div className="position-relative overflow-hidden m-md-3 text-center bg-light posicao">
                <div className="col-md-5 p-lg-5 mx-auto">
                    <h1 className="display-4 font-weight-normal">Anuncie já</h1>
                    <div>
                        <div className="btn btn-outline-secondary" onClick={this.showForm}>
                            {this.state.visible ? 'Fechar formulário' : 'Comece agora!'}
                        </div>
                        <br /><br />                        
                        {this.state.visible &&
                            <div>
                                <h4 className="mb-3">Cadastro de Produto</h4>
                                <form className="needs-validation"  onSubmit={this.mySubmitHandler} autoComplete = "off">
                                    <input type="hidden" name="_csrf" value="{{csrfToken}}" />
                                    <div className="row">
                                        <div className="col-md-8 mb-3">
                                            <label htmlFor="product">Produto</label>
                                            <input type="text" className="form-control" id="product" name="product" onChange={this.myChangeHandler} placeholder="Nome do Produto" required />
                                            <div className="invalid-feedback">
                                                Nome de produto inválido.
                                    </div>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label htmlFor="category">Categoria</label>
                                            <select className="form-control" id="category" name="category" onChange={this.myChangeHandler} required>
                                                <option selected>Escolha...</option>
                                                <option value="1">Comida</option>
                                                <option value="2">Para sua Casa</option>
                                                <option value="3">Eletrônicos</option>
                                                <option value="4">Serviço</option>
                                                <option value="5">Esporte e Lazer</option>
                                                <option value="6">Moda e Beleza</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="row">
                                            <div className="col-md-12 mb-3">
                                                <label htmlFor="price">Preço</label>
                                                <div className="input-group">
                                                    <span className="input-group-text" id="basic-addon1">R$</span>
                                                    
                                                    <input type="number" step="0.01" min="0" className="form-control currency" id="price" name="price" onChange={this.myChangeHandler} placeholder="0.00    " required />
                                                    <div className="invalid-feedback">
                                                        Valor inválido.
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    <div className="row">
                                        <div className="col-md-12 mb-3">
                                            <label htmlFor="username">Seu Nome</label>
                                            <input type="text" className="form-control" id="username" name="username" onChange={this.myChangeHandler} placeholder="Fulano da Silva" required />
                                            <div className="invalid-feedback">
                                                Nome de usuário inválido.
                                            </div>
                                        </div>
                                        

                                    </div>
                                    <div className="row">
                                        <div className="col-md-12 mb-3">
                                            <label htmlFor="phone_number">Telefone</label>
                                            <PhoneInput containerStyle={{marginLeft:'60px'}}
                                            country={'br'}
                                            
                                            
                                            id="phone_number"
                                            onChange={phone_number => this.setState({phone_number})}
                                            required/>
                                            
                                            <div className="invalid-feedback">
                                                Por favor, escreva o seu número de telefone.
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                    <div className="col-md-8 mb-3">
                                         
                                        <label htmlFor="cep">CEP</label>
                                        <input
                                        className="form-control"
                                        id="cep"
                                        type="text"
                                        onBlur={(ev) => this.onBlurCep(ev)}
                                        onChange={(ev) => this.onBlurCep(ev)}
                                        required/>
                                    </div>
                                    <div className="col-md-4 mb-3">
                                            <label htmlFor="number">Número</label>
                                            <input  className="form-control"
                                            type="text" 
                                            id="number" 
                                            name="number" 
                                            onChange={ev => this.onBlurNumber(ev)}
                                            onBlur={ev => this.onBlurNumber(ev)} 
                                            required />
                                            
                                        </div>
                                    </div>
                                    <div className="row">
                                    <div className="col-md-8 mb-3">
                                        <label htmlFor="city">Cidade</label>
                                        <input className="form-control" type="text" value={this.state.city} id="city" disabled />
                                    </div> 
                                    <div className="col-md-4 mb-3">
                                        <label htmlFor="estado">Estado</label>
                                        <input className="form-control" type="text" value={this.state.uf} id="uf" disabled />
                                    </div> 
                                    </div>
                                    <div className="row">
                                    <div className="col-md-8 mb-3">
                                        <label htmlFor="neighborhood">Bairro</label>
                                        <input className="form-control" type="text" value={this.state.neighborhood} id="neighborhood" disabled />
                                    </div> 
                                    <div className="col-md-4 mb-3">
                                        <label htmlFor="street">Rua</label>
                                        <input className="form-control" type="text" value={this.state.street} id="street" disabled />
                                    </div> 
                                    </div>
                                    
                                    <div className="row">
                                        <div className="col-md-12 mb-3">
                                            <label htmlFor="product_description">Descrição do Produto</label>
                                            <textarea rows="4" className="form-control" id="product_description" name="product_description" onChange={this.myChangeHandler} placeholder="Digite aqui a descrição do produto a ser vendido." required>
                                            </textarea>
                                            <div className="invalid-feedback">
                                                Descrição do Produto inválida.
                                    </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-12 mb-3">
                                            <label htmlFor="imageUrl">Url da Imagem</label>
                                            <input type="text" className="form-control" id="imageUrl" name="imageUrl" onChange={this.myChangeHandler} placeholder="Url" required />
                                            <div className="invalid-feedback">
                                                Url inválido.
                                    </div>
                                        </div>
                                    </div>

                                    <button className="btn btn-success btn-lg btn-block bg-success" type="submit">Finalizar Cadastro de Produto</button>
                                    
                                </form>
                            </div>}
                            
                    </div>
                </div>
            </div>
        );
    }
}

export default AdvertiseForm;