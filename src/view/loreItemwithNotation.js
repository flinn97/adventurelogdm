import { Component } from 'react';
import compassImage from '../pics/Compass_Final.png';
import bannerImage from '../pics/Warbanner_Final.png';
import imageImage from '../pics/Image_Final.png';

export default class LoreItemWithNotation extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
    }
  }

  getWordCount(str) {
     return str.split(/\s/).filter(Boolean).length;
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
    let imageList = componentList.getList("image", obj.getJson()._id, "loreId");

    

    let desc = obj.getJson().desc;
    let wordCount = this.getWordCount(desc);
    
    
    

    return (
      <div className='hover-container'
      style={{
         display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column",
        backgroundColor:"#00000055", padding:"3px 4px", cursor:"pointer", border:"1px solid "+"#ffffff22", textAlign:"center",
      minWidth:"440px", margin:"6px 2px", minHeight:"64px", borderRadius:"8px", height:"64px",}}>

                <div style={{color:styles.colors.colorWhite, fontSize:styles.fonts.fontNormal, marginTop:"11px" }}>
                                                        {objName}
                </div>

                                            <div  className='hover-div' 
                                            style={{color:styles.colors.colorWhite+"65",
                                            marginLeft:"6px", marginTop:"4px",
                                            fontSize:styles.fonts.fontSmallest}}>
                                                          {"Word Count: "+wordCount}
                                                          </div> 

<div style={{flexDirection:"row", display:"flex", width:"fit-content", position:"absolute", top:-5, right:2,
alignItems:"center", justifyContent:"flex-end", verticalAlign:"center", textAlign:"center",
justifyItems:"flex-end"}}>
  {/* ICONS */}
                                                       
                                                        
                                                          

                                                        {mapList.length >= 1 &&
                                                        <img src={compassImage} title={mapList.length+" Connected Maps"} 
                                                        style={{width:"26px", height:"26px",}}/>
                                                           }

                                                        {encounterList.length >= 1 &&
                                                        <img src={bannerImage} title={encounterList.length+" Connected Encounters"}
                                                        style={{width:"24px", height:"26px", marginLeft:"5px"}}/>
                                                          }

                                                        {imageList.length >= 1 &&
                                                        <img src={imageImage} title={imageList.length+" Images in Gallery"}
                                                        style={{width:"26px",  height:"25px", marginLeft:"5px"}}/>
                                                          }
</div>
      </div>

    )
  }
}

