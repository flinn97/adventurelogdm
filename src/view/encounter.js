import { Component } from 'react';
import "../App.css"
import CardPractice from './CardPrac';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import MapComponent from './mapComponent';
import AddParticipant from './AddParticipant';
import Roll from './Roll';

export default class Encounter extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }
 
  async componentDidMount(){
    await this.props.app.state.opps.run()
    let href = window.location.href;
    let splitURL = href.split("/")
    let id = splitURL[splitURL.length-1]
    let component = this.props.app.state.componentList.getComponent("encounter", id)
  this.setState({obj: component})
  }

  render() {
    let app = this.props.app;
    let state = app.state;
    let dispatch = app.dispatch;

    return (
      <div><h1>Encounter</h1>
        {this.state.obj?.getJson().name}
        {this.state.obj?.getJson().description}
        {this.state.obj?.getJson().audio}
        <img src={this.state.obj?.getJson().picURL}/>
        {(state.currentComponent?.getJson().type === "monster" && state.popUpSwitchcase === "addParticipant") && <AddParticipant app = {app}/>}
        <div style={{color: "red"}} onClick={()=>{dispatch({operate: "addmonster", operation: "cleanPrepare", popUpSwitchcase: "addParticipant"})}}>Add Monster</div>
        <MapComponent app={app} name={"monster"} cells={["name", {custom: Roll, props: this.props},"ac","statBlockLink","notes"]}  />
        Encounter Manager
        <MapComponent app={app} name={"encounterList"} cells={["name"]} />
      </div>

    )
  }
}

