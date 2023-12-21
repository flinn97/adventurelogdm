import { Component } from 'react';
import "../App.css"
import compassImage from '../pics/Compass_Final.png';
import bannerImage from '../pics/Warbanner_Final.png';
import imageImage from '../pics/Image_Final.png';


import { Link, } from 'react-router-dom';

export default class ListTreeLink extends Component {
  constructor(props) {
    
    super(props);
    this.state = {

    }
    
  }
  
  render() {
    let app = this.props.app;
    let dispatch = app.dispatch
    let state = app.state;

    let styles = state.styles;
    let obj = this.props.obj;
    let name = this.props.props.name;
    let currentState = app.state;
    let componentList = currentState.componentList;

    let objId = obj.getJson().reference? obj.getJson().ogId: obj.getJson()._id;
    let mapList = componentList.getList("map", objId, "loreId");
    let encounterList = componentList.getList("encounter", objId, "loreId");
    let imageList = componentList.getList("image", objId, "loreId");


    let href = window.location.href;
    let splitURL = href.split("/");
    let id = splitURL[splitURL.length-1];
    let newLink = "";
    
    if(id.includes("-")){
     
     let idList = id.split('-');
     newLink = idList[0] + "-" + objId
    }
    
    else{
      newLink = id + "-" + objId
    }
    if(obj.getJson().parentLore===true){
      
     let idList = id.split('-');
     newLink= idList[0];
    }

    let maxLengthName = 22;

    let objName = obj.getJson()[name];
    if(obj.getJson().reference){
      let ogComp = componentList.getComponent('lore', obj.getJson().ogId, "_id");
      objName = ogComp.getJson()[name]
    }
      objName = objName.length > maxLengthName ? objName.substring(0, maxLengthName) + "..." : objName;
    
    return ( <div 
     
      className='hover-container' style={{cursor:"pointer", 
    height:"fit-content",
    display: "flex"}}>
      {name !=="" && name !==undefined &&
      <Link to={"../campaign/" + newLink} state = {obj.getJson().reference? {ref: obj.getJson()._id} : undefined}
      // onClick={() => 
      //   window.open("../campaign/" + newLink, "_blank")
      // } 
      style={{display:"flex", flexDirection:"column", alignItems:"center", textDecorationColor:styles.colors.color3, textDecorationThickness:"1px",
        justifyContent:"center", alignContent:"center"}}>
    <div title={"Open "+objName+" in a new tab."} className='hover-img'
    style={{color:styles.colors.colorWhite+"df", textDecoration:"none", fontSize:"1rem", }}
    >
      
      {objName}

    </div>
    <div 
    className='hover-div' title={"Open "+objName+" in a new tab."}
     style={{ zIndex:"88",
      backgroundColor:styles.colors.color3+"22", height:"10px", width:"100%", 
      filter: "blur(10px)",
      position:"absolute", top:"0", right:"50%"}}></div>

<div style={{flexDirection:"row", display:"flex", width:"fit-content", zIndex:"105",
                            alignItems:"center", justifyContent:"flex-end", verticalAlign:"center", textAlign:"center",
                            justifyItems:"flex-end"}}>
                              {/* ICONS */}
                                                                                   

                               {mapList.length >= 1 &&
                                 <img src={compassImage} title={mapList.length+" Connected Maps"} 
                                  style={{width:"20px", height:"20px",}}/>
                                   }

                                     {encounterList.length >= 1 &&
                                     <img src={bannerImage} title={encounterList.length+" Connected Encounters"}
                                      style={{width:"18px", height:"20px", marginLeft:"5px"}}/>
                                      }

                                       {imageList.length >= 1 &&
                                        <img src={imageImage} title={imageList.length+" Images in Gallery"}
                                         style={{width:"20px",  height:"20px", marginLeft:"5px"}}/>
                                        }
                            </div>

    

    </Link>

   
    }
    </div>
    )
  }
}



