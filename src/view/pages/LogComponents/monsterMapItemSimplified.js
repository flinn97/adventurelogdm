import { Component } from 'react';
import "../../../App.css"
import _ from 'lodash';
import TokenImage from '../../tokenImage';
import ParentFormComponent from '../../../componentListNPM/componentForms/parentFormComponent';
import CheckBox from '../../../componentListNPM/componentForms/singleForms/checkComponent';
import toolService from '../../../services/toolService';

export default class MonsterMapItemSimplified extends Component {
  constructor(props) {
    super(props);
    this.roundUpdated = false;
    this.state = {
      obj: undefined,
      pic: undefined,
      runEncounter: undefined,
      encounterId: undefined,
      showConditions: true,
      show:true,
    };
    }

    
  render() {
    
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let length = app.state.maxLengthShort;
    let styles = state.styles;
    let phone = window.innerWidth > 800?false:true;
    let obj = this.props.obj;
    let allColors = obj.getJson().colors;
    let colors = Object.values(allColors); // ["#000000", "#ffffff", "#44fead"]
       let uRole = state.user.getJson().role;
    let name = obj?.getJson().name;
    let maxLengthName = phone?18:22;

    let objName = name.length > maxLengthName ? name.substring(0, maxLengthName) + "..." : name;

    let isHiddenforPlayers = (obj?.getJson().hideFromInitiative && state.user.getJson().role!=="GM" && state.currentCharacter);
    
    
    return (
     
      <div style={{
        width:phone?this.props.w:580, margin:phone?"":".5px 2px", 
        minWidth:phone?"89vw":this.props.w, fontSize:styles.fonts.fontSmall,
        minHeight:(obj?.getJson().initiative && !isHiddenforPlayers)?"40px":"0px",
        maxWidth:phone?"310px":"",
        height:(obj?.getJson().initiative && !isHiddenforPlayers)?"50px":"0px", 
        padding:(obj?.getJson().initiative && !isHiddenforPlayers)?"4px 8px":"0px",
        maxHeight:"fit-content", background:(obj?.getJson().initiative && !isHiddenforPlayers)?styles.colors.colorWhite+"11":"",
      position: "relative", borderRadius:phone?"11px":"22px", 
      alignSelf:"center", justifyContent:phone?"flex-start":"center", }}>
        


  
{(obj?.getJson().initiative && this.state.show) &&
  <div style={{display:"flex", flexDirection:"row", fontSize:styles.fonts.fontSmall, 
   width:phone?"80vw":this.props.w, height:"48px", justifyContent:phone?"flex-start":"center", marginLeft:phone?"0px":"0px",
  color:styles.colors.colorWhite,}}> 



  <div style={{marginRight:phone?"11px":"20px", width:phone?"2rem":"84px",
 textAlign:phone?"center":"right", marginTop:phone?"16px":"10px", fontSize:phone?"1rem":styles.fonts.fontSmall}}>
      {isHiddenforPlayers?"":obj?.getJson().initiative}
      </div>

      {!isHiddenforPlayers &&
      <div style={{marginTop:"6px", textAlign:"center",}}>
  <TokenImage pic={obj?.getJson().picURL} width={phone?35:35} app={app} colors={colors}/>
     </div>}

    <div style={{width:phone?"48%":"320px", color:styles.colors.color8, textAlign:"left",marginTop:phone?"16px":"10px", fontSize:phone?"1rem":styles.fonts.fontSmall }}>
      {isHiddenforPlayers?"":objName}
      </div>

      {uRole === "GM" && !state.currentCharacter &&
<div style={{flexDirection:"column", width:phone?"1rem":"130px", marginLeft:phone?"2rem":"-45px", justifyContent:"center", alignItems:"center", 
textAlign:"center", background:styles.colors.color1+"33",
verticalAlign:"center", height:"100%",marginTop:"-4px",
borderRadius:"11px" }}>
        <ParentFormComponent obj={this.props.obj} name="hideFromInitiative" dispatch={dispatch}
                                  prepareRun={true} 
                                  wrapperStyle={{ width:"fit-content",
                                  height:"fit-content",alignContent:"center", justifyContent:"center", alignContent:"center", 
                                  alignItems:"center", alignText:"center",}}
                                    type={"checkbox"} 
                                    ///TAYLOR 
                                    ///THIS NEEDS TO RERENDER the whole object
                                    inputStyle={{color:styles.colors.colorWhite,
                                    color:styles.colors.colorBlack,  fontSize: ".5rem",
                                    }}
                                    tickClass={"xFix"}
                                  />
                 {!phone &&             
        <div style={{fontSize:".5rem", marginTop:"-10px", maxWidth:"fit-content", marginLeft:"9px",}}>{obj.getJson().hideFromInitiative?"Hidden":"Hide from Players "}</div>
                 }
                 {phone &&             
        <div style={{fontSize:".8rem", marginTop:"-2px", maxWidth:"fit-content", marginLeft:"12px",}}>{obj.getJson().hideFromInitiative?"Hidden":"Hide"}</div>
                 }
</div>
        }
  </div>
  
   }

</div>
)

};
};
