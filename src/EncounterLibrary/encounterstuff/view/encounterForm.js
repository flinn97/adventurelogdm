import { Component } from "react";
import ParentFormComponent from "../../../componentListNPM/componentForms/parentFormComponent";


export default class EncounterForm extends Component {
    constructor(props){
      super(props);
  
  
    }
  
  
    render(){
      let app = this.props.app;
      return(
      <div style={{paddingLeft:"11px", width:"100%"}}>
        <ParentFormComponent obj = {app.state.currentEncounter} app={app} name="name" label="Encounter Name" prepareRun ={true} type="text"
        labelClass="label" class="text-form text-wide"/>  
        <ParentFormComponent obj = {app.state.currentEncounter} app={app} name="description" label="Situation Description" prepareRun ={true}
        labelClass="label" class="text-form text-wide"/>  
        <ParentFormComponent obj = {app.state.currentEncounter} app={app} name="audioLink" label="Audio Link" prepareRun ={true}
        labelClass="label" class="text-form text-wide"/>  
        </div>)
      
      }
  }
  