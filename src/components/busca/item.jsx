import './item.css'
import React from 'react';
//import MapContainer from './map'
import Mapa from './map'


class Item extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            imageUrl: props.imageUrl,
            anunciante: props.anunciante,
            description: props.description,
            name: props.name,
            preco: props.preco,
            telefone: props.telefone,
            latitude:props.latitude,
            longitude:props.longitude,
            /*
            produto: props.produto,
            valor: props.valor,
            vendedor: props.vendedor,
            telefone: props.telefone,
            descricao_produto: props.descricao_produto,
            */
            ampliado: false,
        };
        this.extend = this.extend.bind(this);
    }

    extend() {

        this.setState({ampliado: !this.state.ampliado});
    }

    render() {
        return(            
            <div className="borda">
                {!this.state.ampliado &&
                <div className="item list-group-item list-group-item-action list-group-item-light" onClick={this.extend}>
                    <div>
                        <img className ="image_item" src={this.state.imageUrl} alt=""/>
                    </div>
                    <div className="info_item">
                        <h3>{this.state.name}</h3>
                        <div className="row">
                            <div className="col-md-9 mb-3">
                                <p>{this.state.description}</p>
                            </div>
                            <h3 className="col-md-3 mb-3 price">
                                <p>R$ {this.state.preco}</p>
                            </h3>
                        </div>                    
                    </div>
                    
                </div>
                }
                {this.state.ampliado &&
                <div className="item2 list-group-item list-group-item-action list-group-item-light ampliada" > 
                    <div className="item" onClick={this.extend}>
                        <div >
                            <img className ="image_item" src={this.state.imageUrl} alt=""/>
                        </div>
                        <div className="info_item">
                            <h3>{this.state.name}</h3>
                            <div className="row">
                                <div className="col-md-9 mb-3">
                                    <p>{this.state.description}</p>
                                </div>
                                <h3 className="col-md-3 mb-3 price">
                                    <p>R$ {this.state.preco}</p>
                                </h3>
                            </div>
                            
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <p>Vendedor: {this.state.anunciante}</p>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <p>Telefone: {this.state.telefone}</p>
                                </div>
                                <br></br>
                                <br></br>
                            </div>
                        </div>
                    </div>
                    
                    <div className="quadrada">                                                  
                        <Mapa latitude = {this.state.latitude} longitude = {this.state.longitude} />                                     
                    </div>
                </div>
                }

            </div>
            
        );
    }
}

export default Item;
    