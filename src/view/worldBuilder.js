import { Component } from 'react';
import "../App.css"
import CardPractice from './CardPrac';
import AddCampaign from './AddCampaign';
import MapComponent from './mapComponent';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import InteractiveMap from './interactiveMap';

export default class Worldbuilder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      obj: undefined
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
    let dispatch = app.dispatch
    let state = app.state;
    return (
      <div style={{color: "green"}}><h1>World Builder</h1>
     
      {this.state.obj?.getJson().title}
      {this.state.obj?.getJson().description}
      <div onClick={()=>{dispatch({popUpSwitchcase: "addMap" })}}>Add Map</div>
        {(state.popUpSwitchcase === "addMap") && <InteractiveMap app = {app}/>}
        
      </div>
      
    )
  }
}


