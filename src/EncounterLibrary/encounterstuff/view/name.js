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
        inputStyle={{width:"18.7vw", border:"1px solid #ffffff09", fontSize:"1.2rem"}}/>
        </div>
        )
      }
  }
  