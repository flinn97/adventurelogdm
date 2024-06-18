import React, { Component } from "react";
import ParentFormComponent from "../../../componentListNPM/componentForms/parentFormComponent";
import ac from "../pics/ac.png";
import MathService from "../services/mathService";

export default class Armor extends Component {
    constructor(props){
      super(props);
      this.formRef = React.createRef();
      this.handleKeyDown=this.handleKeyDown.bind(this);

      this.state={
        reRender:true
      }
  
  
    }
    componentDidMount(){
      document.addEventListener('keyup', this.handleKeyDown);
      }
      componentWillUnmount(){
        document.removeEventListener('keyup', this.handleKeyDown);

      }

      async handleKeyDown(e){
        debugger
        if(e.key==="Enter"&&this.state.val!==undefined ){
          
          await this.setState({reRender:false})
          let obj = this.state.obj;
          let math = await MathService.doMath(this.state.val).toString();
          
          await obj.setCompState({armor:math});
          await this.props.app.state.opps.cleanPrepareRun({update:obj});
          await this.setState({reRender:true,val:undefined,obj:undefined})

        }
      }
      
      
    


    
  
  
    render(){
      let app= this.props.app
      return(
      <div>
        <img src={ac} style={{width:"1rem", marginLeft:"32.25px"}}/>
        {this.state.reRender&&
        <ParentFormComponent ref = {this.formRef} func ={(obj, e)=>{
          
          let val =e.target.value;
        const operatorPattern = /[+\-*/]/;
        if(operatorPattern.test(val)){
          
          this.setState({obj:obj[0],val:val, });

        }
        else{
          obj[0].setCompState({armor:val});
          app.state.opps.cleanPrepareRun({update:obj[0]})
        }

        }} app={app}  obj={this.props.obj} name="armor" cleanPrepareRun={true} 
        wrapperStyle={{display:"flex", flexDirection:"column"}}
        class="text-form text-small" inputStyle={{width:"55px"}} />}
        </div>
        )
      }
  }
  