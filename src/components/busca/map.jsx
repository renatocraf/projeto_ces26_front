import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
//import axios from 'axios';
//import { baseApiUrl } from '../../global'
import './mapa.css'

class MapContainer extends Component {

    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
          latitude: props.latitude, 
          longitude: props.longitude,
          local: 'quadrado',
          
        }      
        
        
      }

      

      displayMarkers = () => {
        
          return <Marker position={{
            lat: this.state.latitude,
            lng: this.state.longitude
            }}
            name = {this.state.local}        
          />
        
      }
    
      render() {
        return (
    
          <Map
            google={this.props.google}
            style={{width: '100%', height: '50%', position: 'relative'}}
            zoom={16.5}
            initialCenter={{ lat: this.state.latitude, lng: this.state.longitude }}
          >           
    
            {this.displayMarkers()}
          </Map>
    
        );
      }

}

export default GoogleApiWrapper(
    (props) => ({
      apiKey:  'AIzaSyD116QAn_lABifYKFDbFLdAYVCD5lw4VSs',
    }
    ))(MapContainer)