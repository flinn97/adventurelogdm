import { Component } from 'react';
import '../../../App.css';
import ParentFormComponent from '../../../componentListNPM/componentForms/parentFormComponent';
import die from '../../../pics/d20.png';
import diceService from '../../../services/diceService';

export default class RollLogComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      obj: this.props.obj,
      showMessage: false,
      randomN: "",
      switchN: [100,205,355,545,750,925]
    }

  }

  componentDidMount() {
    let app = this.props.app;
    let state = app.state;
    let obj = this.props.obj;
    let dispatch = app.dispatch;
    let m = obj?.getJson().message;
    let messageAsInteger = m ? parseInt(m, 10) : 20;
    let tMod = 1.2;
    if (isNaN(messageAsInteger)) {
      messageAsInteger = 20; // Default value or any other fallback
  }
   
      if (obj?.getJson().showMessage === undefined && obj?.getJson().showMessage !== true ){
        this.state.switchN.forEach((delay, index) => {
          setTimeout(() => {
              let randomNum = diceService.rollDice("/r "+obj?.getJson().desc);
              this.setState({ randomN: randomNum });
          }, delay/tMod);
          });
        setTimeout(() => {
          this.setState({ showMessage: true, randomN:"" });
          obj?.setCompState({ showMessage: true });
          dispatch({
            operate:"update", operation:"cleanPrepareRun", object: obj
          })
        }, 1150);
      }else{
      this.setState({ showMessage: true });}
  }
 

  render() {
    let app = this.props.app;
    let dispatch = app.dispatch
    let state = app.state;
    let styles = state.styles;
    let obj = this.props.obj;
    let index = this.props.index;
    let phone = window.innerWidth > 800?false:true;
    let w = this.props.w;
    
    const b1 = <div style={{color:styles.colors.colorWhite+"11", marginRight:"8px"}}>{"[ "}</div>
    const b2 = <div style={{color:styles.colors.colorWhite+"11", marginLeft:"8px"}}>{"  ]"}</div>
    let n1 = <div>{obj.getJson()?.message}</div>

    return (
      <div 
      title={obj.getJson()?.desc}
      style={{ 
                  display: "flex",
                  flexDirection: "row",
                  maxWidth: w,
                  fontSize: styles.fonts.fontNormal,
                  // alignSelf: "flex-end", justifySelf:"flex-end",             
      }}>
        <div title={obj.getJson()?.desc} style={{display:"flex", cursor:"default",pointerEvents: "none", textAlign:"center", flexDirection:"column", 
                      wordWrap: "break-word", paddingTop:"2px", paddingBottom:"2px",
                      whiteSpace: "normal",
                      overflowWrap: "break-word" }}>

{!phone &&
                <img title={obj.getJson()?.desc} src={die} style={{
                  opacity: this.state.randomN === ""?1:0,
                  width:phone?"14px":"25px", zIndex:"10", filter:"contrast(0%)", marginLeft:phone?"":"-17px", marginTop:phone?"11px":"15px", 
                  verticalAlign:"center",
                height:phone?"14px":"25px", marginBottom:"-25px"}}/>}
                
                <div style={{
                  color:this.state.randomN === ""?styles.colors.colorWhite+"55":styles.colors.color5+"55", fontSize:phone?styles.fonts.fontSmall:styles.fonts.fontSmallest, marginTop:phone?"0%":"-10px",
                display:"flex", cursor:"default",pointerEvents: "none", textAlign:"center", flexDirection:"column", 
                minWidth:phone?"90%":"550px", maxWidth:"550px", height:"45px",  verticalAlign:"center", justifyContent:"center",
                textAlign:"center", textAlign:"center"}}>
                  Rolled
                  
                  <div style={{height:"fit-content",width:phone?"90%":"550px",
                   opacity: this.state.showMessage ? "1" : ".02", transition: "opacity 1s ease-out", marginBottom:"8px",
                   display:"flex", flexDirection:"row", alignContent:"center", justifyContent:"center", 
                   
                  color:styles.colors.colorWhite+"f2", zIndex:"20"}}>
                 {b1}{n1}{b2}
                  </div>

          {this.state.randomN !== "" &&(
                  <div style={{height:"fit-content",width:phone?"90%":"550px", marginTop:phone?"0px":"-35px",
                  color:styles.colors.color3+"88", zIndex:"20"}}>
                  {this.state.randomN}
                  </div>)}

                  
                </div>
                    
        </div>
          
      </div>
      
    )
  }
}


