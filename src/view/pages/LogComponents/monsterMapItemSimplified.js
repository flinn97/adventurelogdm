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
   
    let obj = this.props.obj;
    let allColors = obj.getJson().colors;
    let colors = Object.values(allColors); // ["#000000", "#ffffff", "#44fead"]
       let uRole = state.user.getJson().role;
    let name = obj?.getJson().name;
    let maxLengthName = 22;

    let objName = name.length > maxLengthName ? name.substring(0, maxLengthName) + "..." : name;

    let isHiddenforPlayers = (obj?.getJson().hideFromInitiative && state.user.getJson().role!=="GM");
    
    
    return (
     
      <div style={{
        width:580, margin:".5px 2px",
        minWidth:this.props.w, fontSize:styles.fonts.fontSmall,
        minHeight:(obj?.getJson().lastInit && !isHiddenforPlayers)?"40px":"0px",
        height:(obj?.getJson().lastInit && !isHiddenforPlayers)?"50px":"0px", 
        padding:(obj?.getJson().lastInit && !isHiddenforPlayers)?"4px 8px":"0px",
        maxHeight:"fit-content", background:(obj?.getJson().lastInit && !isHiddenforPlayers)?styles.colors.colorWhite+"11":"",
      position: "relative", borderRadius:"22px", 
      alignSelf:"center", justifyContent:"center", }}>


  
{(obj?.getJson().lastInit && this.state.show) &&
  <div style={{display:"flex", flexDirection:"row", fontSize:styles.fonts.fontSmall,
   width:this.props.w, height:"48px", justifyContent:"center", 
  color:styles.colors.colorWhite,}}> 



  <div style={{marginRight:"20px", width:"84px", textAlign:"right", marginTop:"10px", fontSize:styles.fonts.fontSmall}}>
      {isHiddenforPlayers?"":obj?.getJson().lastInit}
      </div>

      {!isHiddenforPlayers &&
      <div style={{marginTop:"6px", textAlign:"center",}}>
  <TokenImage pic={obj?.getJson().picURL} width={35} app={app} colors={colors}/>
     </div>}

    <div style={{width:"320px", color:styles.colors.color8, textAlign:"left",marginTop:"10px", fontSize:styles.fonts.fontSmall }}>
      {isHiddenforPlayers?"":objName}
      </div>

      {uRole === "GM" &&
<div style={{flexDirection:"column", width:"130px", marginLeft:"-45px", justifyContent:"center", alignItems:"center", 
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
                                  
        <div style={{fontSize:".5rem", marginTop:"-10px", maxWidth:"fit-content", marginLeft:"9px",}}>{obj.getJson().hideFromInitiative?"Hidden":"Hide from Players "}</div>
        
</div>
        }
  </div>
  
   }

</div>
)

};
};
