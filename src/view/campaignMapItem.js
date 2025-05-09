import { Component } from 'react';
import "../App.css"
import AddCampaign from './AddCampaign';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import placeholder from '../pics/placeholderEncounter.JPG';
import placeholder2 from '../pics/placeholderCompendium2.jpg';

export default class CampaignMapItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      obj: undefined,
      pic: undefined,
      usage: this.props.obj?.getJson().usage,
    }
  }
 

  render() {
    let app = this.props.app;
    let dispatch = app.dispatch
    let state = app.state;
    let radius = "2vmin";
    let styles = state.styles;
    let obj = this.props.obj;

    let isLore = state.componentList.getList("lore", this.props.obj.getJson().title, "name");
    let loreItem = isLore[0];
    const newId = loreItem?loreItem.getJson()._id:obj?.getJson()._id;
    let type = obj.getJson().type === "campaign"? "Campaign": "Compendium";
    let imgPlace = (type ==="Campaign")? placeholder : placeholder2;

    const newLink = 
   
    // loreItem?("/campaign/"+obj?.getJson()._id+"-"+newId):
    (`/${type.toLowerCase()}/`+obj?.getJson()._id);

    return (
      <Link to={newLink} className="hover-img" style={{ color: styles.colors.colorWhite, 
        textDecoration: "none", userSelect:"none",
        height: "fit-content",
        width: "fit-content",
      }}
      >


      <div style={{display: "flex", flexDirection: 'column', 
      borderRadius:radius,
      justifyContent:"space-evenly", 
      zIndex:"0",
      width:'100%', 
      backgroundImage: 'url('+(obj?.getJson().picURL||imgPlace)+')',
      backgroundRepeat: "no-repeat",  backgroundPosition: "50% 50%",  backgroundSize:"cover", }}>
                        
                        <div style={{
                        ...styles.popupSmall, display: "flex", flexDirection: "row", justifyContent:"space-between", flexDirection: 'column',borderRadius:radius,
                        height: "fit-content", border: type==="Compendium"? "1px solid #b07b1e85" : "1px solid "+styles.colors.color9+"85", 
                         width:"fit-content"}}>
                          
                          <div 
                          
                          style={{display: "flex", height:window.innerWidth > 800?"220px":"100px", 
                          width:window.innerWidth > 800?"78vmax":"90vw", fontWeight:"bold", fontFamily:"serif", 
                          textDecorationThickness: "0px", textUnderlineOffset: "4px", color: styles.colors.colorWhite,
                          textShadow:"1px 1px 0 "+styles.colors.colorBlack, textShadow:"-1.5px -1.5px 0 "+styles.colors.colorBlack, textAlign:"center", justifyItems:"center",
                          alignItems:"center", justifyContent:"center", fontSize:window.innerWidth > 800?styles.fonts.fontHeader2:"2rem",}}>
                            {obj?.getJson().title||"Unnamed "+type}
                          </div>
                          {state.user.getJson()._id==="admin@arcanevaultassembly.com" &&<div className="hover-btn" onClick={(e)=>{
                            e.preventDefault();
                            app.dispatch({popupSwitch:"sendCampaign", campToSend:obj})}} style={{...styles.buttons.buttonAdd, color:"white"}}>Send {type}</div>}

                </div>

        </div>
        </Link>
      
    )
  }
}


