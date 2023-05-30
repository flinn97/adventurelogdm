import { Component } from 'react';
import "../App.css"
import CardPractice from './CardPrac';
import AddCampaign from './AddCampaign';
import MapComponent from '../componentListNPM/mapTech/mapComponent';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Upload from './upload';

export default class CampaignEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      obj: undefined,
      pic: undefined
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
      <div style={{display: "flex", flexDirection: "row", justifyContent:"space-between"}}>
        <h1>{this.state.obj?.getJson().title}</h1>
      
      {state.popUpSwitchcase !== "updateCampaign" && <>
      <img src={this.state.obj?.getJson().picURL} style={{width: "100px"}}/>
      
      {this.state.obj?.getJson().description}
      {this.state.obj?.getJson().session}
      <div onClick={()=>{dispatch({operate: "update", operation: "cleanPrepare", object: this.state.obj, popUpSwitchcase: "updateCampaign"})}}>edit</div>
      </>}
        {(state.currentComponent?.getJson().type === "campaign" && state.popUpSwitchcase === "updateCampaign") && <AddCampaign app = {app}/>}
        <Link to= {"/worldbuilder/" + this.state.obj?.getJson()._id}>World Builder</Link>
        <Link to= {"/encountermanager/" + this.state.obj?.getJson()._id}>Encounter Manager</Link>
      </div>
      
    )
  }
}


