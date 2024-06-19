import { Component } from "react";
import ParentFormComponent from "../../../componentListNPM/componentForms/parentFormComponent";
import StatBlockLinking from "./statBlockLinking";

export default class ParticipantNotes extends Component {
    constructor(props){
      super(props);
  
  
    }
  
  
    render(){
      let app= this.props.app;
      let obj= this.props.obj;

      
      return(
      <div title={this.props.obj.getJson().note}>
        <ParentFormComponent app={app}  obj={this.props.obj} name="note" label="Notes" cleanPrepareRun={true} class="text-form" 
        inputStyle={{fontSize:".944rem", height:"2rem", width:"11vw"}} 
        wrapperStyle={{display:"flex", flexDirection:"column"}} labelStyle={{fontFamily:"inria", fontSize:"1.1rem", marginLeft:"1vw",}}/>

{
          this.props.obj.getJson().statBlockLink &&
          (
            <StatBlockLinking app={app} obj={obj}/>
          )
        }
        </div>
        )
      }
  }
  