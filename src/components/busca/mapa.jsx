import React,{Component} from 'react';
import './mapa.css'
import MapContainer from './map'

class Mapa extends Component{
    constructor(props){
        super(props);
        this.state ={
            visible: false,
            lat:props.latitude,
            long:props.longitude

        };
        console.log("44444444444444444444444444444444444")
        console.log(this.state.long)
        this.abrir = this.abrir.bind(this)
    }

    abrir() {
        window.open(`/mapa/${this.state.lat}/${this.state.long}`, 'sharer', 'toolbar=0,status=0,width=548,height=325');
    };

    render() {
        return (<div>
            <button type="button" className="btn btn-success" onClick={this.abrir} >Mapa</button>
        </div>);
    }
}

export default Mapa;

/*export default props =>
    <div class="quadrada">
        <MapContainer
            style={{width: '720px', height: '480px', position: 'relative'}}
        >
            
            </MapContainer> 
    </div>

*/