import { Component } from 'react';
import "../../App.css";
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import MapComponent from '../../componentListNPM/mapTech/mapComponent';
import EncounterCard from './encounterCard';
import placeholder from '../../pics/placeholderEncounter.JPG';

export default class EncounterManager extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }
 
  componentDidMount(){
    let href = window.location.href;
    let splitURL = href.split("/")
    let id = splitURL[splitURL.length-1]
    let component = this.props.app.state.componentList.getComponent("campaign", id)
    this.setState({obj: component})
  }

  render() {
    let app = this.props.app;
    

    return (
      <div style={{display: "flex", marginTop:"3vmin", flexDirection: 'row', justifyContent:"space-evenly", 
      width: '100%', height: '100%',  borderRadius:"2vmin",
      backgroundImage: 'url('+(this.state.obj?.getJson().picURL||placeholder)+')' }}>
        <img 
          style={{position: 'absolute', minWidth: '100%', minHeight: '100%', 
        maxWidth: 'none', maxHeight: 'none', top: '50%', left: '50%', 
        transform: 'translate(-50%, -50%)', objectFit: 'cover', opacity: 1, zIndex: '-1', borderRadius:"2vmin" }} />        
            <div style={{marginBottom:"70px"}}>Encounter Manager</div>
            <EncounterCard app={app} type="card" options={{cardType:"cardContent"}}/>
            
      </div>

    )
  }
}

