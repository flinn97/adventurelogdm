import React, { Component } from "react";
import ParentFormComponent from "../../../componentListNPM/componentForms/parentFormComponent";
import MathService from "../services/mathService";

export default class HitPoints extends Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.handleKeyDown=this.handleKeyDown.bind(this);

    this.state = {reRender:true}


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
        
        let obj = this.state.obj;
        let math = await MathService.doMath(this.state.val).toString();
        await this.setState({reRender:false})

        await obj.setCompState({hitPoints:math});
        await this.props.app.state.opps.cleanPrepareRun({update:obj});
        await this.setState({reRender:true,val:undefined,obj:undefined})

      }
    }


  render() {
    let app = this.props.app
    return (
      <div>
        {this.state.reRender&&
        <ParentFormComponent app={app} obj={this.props.obj} name="hitPoints" label="HP" ref={this.formRef} func={(obj, e) => {
          
          let val =e.target.value;
        const operatorPattern = /[+\-*/]/;
        if(operatorPattern.test(val)){
          
          this.setState({obj:obj[0],val:val, });

        }
        else{
          obj[0].setCompState({hitPoints:val});
          app.state.opps.cleanPrepareRun({update:obj[0]})
        }

        }}
          inputStyle={{ width: "80px" }} wrapperStyle={{ display: "flex", flexDirection: "column" }}
          class="text-form text-small" labelStyle={{ fontFamily: "inria", marginLeft: "42px" }}
        />}
      </div>
    )
  }
}
