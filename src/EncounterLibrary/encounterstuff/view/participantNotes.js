import { Component } from "react";
import ParentFormComponent from "../../../componentListNPM/componentForms/parentFormComponent";

export default class ParticipantNotes extends Component {
    constructor(props){
      super(props);
  
  
    }
  
  
    render(){
      let app= this.props.app
      
      return(
      <div title={this.props.obj.getJson().note}>
        <ParentFormComponent app={app}  obj={this.props.obj} name="note" label="Notes" cleanPrepareRun={true} class="text-form" 
        inputStyle={{fontSize:"1rem", height:"2rem", width:"12vw"}} 
        wrapperStyle={{display:"flex", flexDirection:"column"}} labelStyle={{fontFamily:"inria", fontSize:"1.1rem", marginLeft:"1rem",}}/>
        </div>
        )
      }
  }
  