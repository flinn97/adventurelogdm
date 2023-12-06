import { Component } from 'react';
import "../../../App.css"
import _ from 'lodash';
import TokenImage from '../../tokenImage';

export default class MonsterMapItemSimplified extends Component {
  constructor(props) {
    super(props);
    this.roundUpdated = false;
    this.state = {
      obj: undefined,
      pic: undefined,
      runEncounter: undefined,
      encounterId: undefined,
      showConditions: true
      
    };
    }

    

  render() {
    
    let app = this.props.app;
    // let dispatch = app.dispatch;
    let state = app.state;
    let length = app.state.maxLengthShort;
    let styles = state.styles;
   
    let obj = this.props.obj;
    let allColors = obj.getJson().colors;
    let colors = Object.values(allColors); // ["#000000", "#ffffff", "#44fead"]
       
    let name = obj?.getJson().name;
    let maxLengthName = 22;

    let objName = name.length > maxLengthName ? name.substring(0, maxLengthName) + "..." : name;
    
    
    return (
     
      <div style={{
        width:this.props.w,
        minWidth:this.props.w, fontSize:styles.fonts.fontSmall,
        minHeight:obj?.getJson().lastInit?"40px":"0px", 
        padding:obj?.getJson().lastInit?"4px 8px":"0px",
        maxHeight:"fit-content", background:styles.colors.colorWhite+"11",
      position: "relative", borderRadius:"22px", 
      alignSelf:"center", justifyContent:"center", }}>
  
{obj?.getJson().lastInit &&
  <div style={{display:"flex", flexDirection:"row", fontSize:styles.fonts.fontSmall,
   width:this.props.w, height:"48px", justifyContent:"center", 
  color:styles.colors.colorWhite,}}>

  <div style={{marginRight:"20px", width:"84px", textAlign:"right", marginTop:"10px", fontSize:styles.fonts.fontSmall}}>
      {obj?.getJson().lastInit}
      </div>

      <div style={{marginTop:"6px", textAlign:"center",}}>
  <TokenImage pic={obj?.getJson().picURL} width={35} app={app} colors={colors}/>
     </div>

    <div style={{width:"320px", color:styles.colors.color8, textAlign:"left",marginTop:"10px", fontSize:styles.fonts.fontSmall }}>
      {objName}
      </div>

  </div>
   }

</div>
)

};
};
