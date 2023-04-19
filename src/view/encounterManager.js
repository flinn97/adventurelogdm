import { Component } from 'react';
import "../App.css"
import CardPractice from './CardPrac';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import MapComponent from '../componentListNPM/mapTech/mapComponent';

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
      <div><h1>Encounter Manager</h1>
      <img src={this.state.obj?.getJson().picURL} style={{width: "100px"}}/>
      Encounters:
      
        <MapComponent app={app} name={"encounter"} cells={["name","description"]}/>
        <Link to= {"/addencountermanager/" + this.state.obj?.getJson()._id}>+Create Encounter</Link>
      

      </div>

    )
  }
}

