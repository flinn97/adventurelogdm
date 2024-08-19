import { Component } from "react";
import rollService from "../services/rollService";
import ParentFormComponent from "../../../componentListNPM/componentForms/parentFormComponent";
import d20 from '../pics/d20.png';
import MathService from "../services/mathService";
export default class Initiative extends Component {
  constructor(props) {
    super(props);
    this.handleKeyDown=this.handleKeyDown.bind(this);

    this.state = {
      start: false,
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
      
      if(e.key==="Enter"&&this.state.val!==undefined ){
        
        await this.setState({reRender:false})
        let obj = this.state.obj;
        let math = await MathService.doMath(this.state.val).toString();
        
        await obj.setCompState({initiative:math});
        await this.props.app.state.opps.cleanPrepareRun({update:obj});
        await this.setState({reRender:true,val:undefined,obj:undefined})

      }
    }

  render() {
    let app = this.props.app
    return (
      <div style={{width: "4vw", marginLeft:"8px", marginRight:"13px"}}>
      <div style={{ width:"fit-content", height: "160px", justifyContent: "center", display: "flex", alignContent: "center",
      alignItems: "center", flexDirection: "column" }}>
        {!this.props.obj.getJson().rollState ? (
          <div
            title="Roll Initiative"
            onClick={() => {
              let i = rollService.rollDice(20, this.props.obj.getJson().initiativeBonus);
              this.props.obj.setCompState({ initiative: i, rollState: true });
         
              this.props.app.state.opps.cleanPrepareRun({ update: this.props.obj });
            }}
          >
            <img className="roll-button" src={d20} alt="Roll Initiative" />
          </div>
        ) : (
          <div style={{  width:"fit-content", marginTop:"28px", height: "160px", justifyContent: "center", display: "flex", alignContent: "center", alignItems: "center", flexDirection: "column" }}>
            <div 
            title="Edit Initiative"
            style={{ margin: "0", display: "flex", flexDirection: "column", alignItems: "center" }}>
              {this.state.reRender&&
              <ParentFormComponent 
                app={this.props.app}
                obj={this.props.obj}
                func={(obj, e) => {
          
                  let val =e.target.value;
                const operatorPattern = /[+\-*/]/;
                if(operatorPattern.test(val)){
                  
                  this.setState({obj:obj[0],val:val, });
        
                }
                else{
                  obj[0].setCompState({initiative:val});
                  app.state.opps.cleanPrepareRun({update:obj[0]})
                }
        
                }}
                name="initiative"
                class="text-form text-small"
                inputStyle={{marginLeft:"0px", fontSize:"1.25rem"}}
              />}
              <div title="Clear Initiative" className="Close-Button btn-hightlight" style={{ width: "fit-content", fontSize: "1.14rem", marginTop: "11px", zIndex:"2", background:"none", }}
                onClick={() => {
                  this.props.obj.setCompState({ initiative: "", rollState: false });
                  this.props.app.state.opps.cleanPrepareRun({ update: this.props.obj });
                }}
              >
                X
               
              </div>
              <img className="roll-button" src={d20} alt="Roll Initiative" style={{display:"block", position:"relative", zIndex:"1", top:-18, left:-2,
              opacity:"11%",}} />
            </div>
          </div>
        )}
      </div></div>
    )
  }
}
