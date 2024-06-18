import { Component } from "react";
import ParentFormComponent from "../../../componentListNPM/componentForms/parentFormComponent";

export default class Name extends Component {
    constructor(props){
      super(props);
  
  
    }
  
  
    render(){
      let app= this.props.app;
      let obj= this.props.obj;
      return(
      <div>
        <ParentFormComponent app={app} obj={this.props.obj} name="name" cleanPrepareRun={true} class="text-form" 
        inputStyle={{width:"21vw", marginLeft:"-0.1vw", border:"1px solid #ffffff09"}}/>
        </div>
        )
      }
  }
  