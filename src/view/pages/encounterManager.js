import { Component } from 'react';
import "../../App.css";
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import MapComponent from '../../componentListNPM/mapTech/mapComponent';
import EncounterCard from './encounterCard';

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
      <div style={{background:"#33333311"}}>
        <img 
          src={this.state.obj?.getJson().picURL} 
          style={{display:'flex', zIndex:"-1", position:"fixed",
          width: "84.4%", height:"88px", objectPosition:"50% 50%", objectFit:"cover", 
          opacity:"12%" }} />        
            <div style={{marginBottom:"70px"}}>Encounter Manager</div>
            <EncounterCard app={app} type="card" options={{cardType:"cardContent"}}/>
            
      </div>

    )
  }
}

