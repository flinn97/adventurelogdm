import { Component } from 'react';
import compassImage from '../pics/Compass_Final.png';
import bannerImage from '../pics/Warbanner_Final.png';

export default class LoreItemWithNotation extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
    }
  }
 
    
  

  render() {
    let obj = this.props.obj;
    let app = this.props.app;
    let state = app.state;
    let styles =state.styles;
    let dispatch = app.dispatch;
    let currentState = app.state;
    let componentList = currentState.componentList;

    let objName = obj.getJson().name.length > 33 ? obj.getJson().name.substring(0, 33) + "..." : obj.getJson().name;
    let mapList = componentList.getList("map", obj.getJson()._id, "loreId");
    let encounterList = componentList.getList("encounter", obj.getJson()._id, "loreId");

    
    

    return (
      <div 
      style={{
         display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column",
        backgroundColor:"#00000055", padding:"3px 4px", cursor:"pointer", border:"1px solid "+"#ffffff22", textAlign:"center",
      minWidth:"410px", margin:"3px 1px", minHeight:"64px", borderRadius:"8px", height:"64px",}}>

                <div style={{color:styles.colors.colorWhite, fontSize:styles.fonts.fontNormal }}>
                                                        {objName}
                </div>
<div style={{flexDirection:"row", display:"flex", width:"fit-content", alignItems:"flex-end", justifyContent:"flex-end", verticalAlign:"center", textAlign:"center",
justifyItems:"flex-end"}}>
  {/* ICONS */}

                                                        {mapList.length >= 1 &&
                                                        <img src={compassImage} style={{width:"29px"}}></img>
                                                          }

                                                        {encounterList.length >= 1 &&
                                                        <img src={bannerImage} style={{width:"29px", marginLeft:"5px"}}></img>
                                                          }
</div>
      </div>

    )
  }
}

