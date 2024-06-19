import React, { Component } from "react";
import ParentFormComponent from "../../../componentListNPM/componentForms/parentFormComponent";
import ac from "../pics/ac.png";
import MathService from "../services/mathService";

export default class Armor extends Component {
    constructor(props){
      super(props);
      this.formRef = React.createRef();

      this.state={
        reRender:true
      }
  
  
    }
  
      
    


    
  
  
    render(){
      let app= this.props.app
      return(
      <div>
        <img src={ac} style={{width:"1rem", marginLeft:"32.25px"}}/>
        {this.state.reRender&&
        <ParentFormComponent ref = {this.formRef} app={app}  obj={this.props.obj} name="armor" cleanPrepareRun={true} 
        wrapperStyle={{display:"flex", flexDirection:"column"}}
        class="text-form text-small" inputStyle={{width:"55px"}} />}
        </div>
        )
      }
  }
  