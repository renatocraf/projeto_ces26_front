import React,{Component} from 'react';
import './search.css'

import Item from './item'
import Categoria from './categoria'
import axios from 'axios';
import { baseApiUrl} from '../../global'

class Search extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            option: ''            
        };
        
        /* Esse this.list deve ser substituido pela funçao que vai fazer a busca no banco de dados*/ 
        this.list = [[],[],[],[],[],[],[]]
        this.getAnnouncements = this.getAnnouncements.bind(this);
        //this.getAnnouncements('1')
        for (let i=1; i<=6; i++){
            this.getAnnouncements(i)
        }
        console.log(this.list)
        
        this.handleClick = this.handleClick.bind(this);
        
    }
    
    getAnnouncements(categoryId){
        const url = `${baseApiUrl}/categories/${categoryId}/announcements`
        axios.get(url).then(res =>{
            this.list[parseInt(categoryId)] = res.data
                       
        })
    }

    handleClick(event) {
        this.getAnnouncements(parseInt(event));
        console.log(this.list[parseInt(event)]);
        if (this.state.option === event ){
            this.setState({option: ''});
        }
        
        else{            
            this.setState({option: event});            
        }
    }

    renderRows(list){
        return list.map(item =>{
            return (
                <div>
                    <div className="item-separator"></div>
                    < Item id={item.id} imageUrl={item.imageUrl} name={item.name} preco={item.preco} anunciante={item.anunciante} telefone={item.telefone} description={item.description} latitude={item.latitude} longitude = {item.longitude}/>
                        
                    <div className="item-separator"></div>
                </div>
            )
        })
    }

    render() {
        return(            
            <div className="iza-container container">               
                
                    
                        <div >
                            <ul className="list-unstyled mb-0 list-inline category-stripe pb-3 category-stripe-margin-bottom">                                
                                < Categoria value="1"  tipo="food" nome="Comida" url="images/food.png" click={this.handleClick}/>
                                < Categoria value="2" tipo="house" nome="Para a sua Casa" url="images/home.png" click={this.handleClick}/>  
                                < Categoria value="3" tipo="electronics" nome="Eletrônicos" url="images/electronics.png" click={this.handleClick}/>  
                                < Categoria value="4" tipo="service" nome="Serviços" url="images/service.png" click={this.handleClick}/>  
                                < Categoria value="5" tipo="sports" nome="Esporte e Lazer" url="images/sports.png" click={this.handleClick}/>  
                                < Categoria value="6" tipo="dressing" nome="Moda e Beleza" url="images/dressing.png" click={this.handleClick}/>                            
                            </ul>
                        </div>
                   
                                          
               

                {this.state.option === '1' && 
                    <div className="my-3 p-3 bg-light rounded shadow-sm">
                        {this.renderRows(this.list[1])}
                    </div>}
                {this.state.option === '2' && 
                    <div className="my-3 p-3 bg-light rounded shadow-sm">
                        {this.renderRows(this.list[2])}
                    </div>}
                {this.state.option === '3' && 
                    <div className="my-3 p-3 bg-light rounded shadow-sm">
                        {this.renderRows(this.list[3])}
                    </div>}
                {this.state.option === '4' && 
                    <div className="my-3 p-3 bg-light rounded shadow-sm">
                        {this.renderRows(this.list[4])}
                    </div>}
                {this.state.option === '5' && 
                    <div className="my-3 p-3 bg-light rounded shadow-sm">
                        {this.renderRows(this.list[5])}
                    </div>}
                {this.state.option === '6' && 
                    <div className="my-3 p-3 bg-light rounded shadow-sm">
                        {this.renderRows(this.list[6])}
                    </div>}
                

            </div>
        );
    }

}

export default Search;