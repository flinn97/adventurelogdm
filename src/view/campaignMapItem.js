import { Component } from 'react';
import "../App.css"
import AddCampaign from './AddCampaign';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import placeholder from '../pics/placeholderEncounter.JPG';

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
    const newLink = 
    // loreItem?("/campaign/"+obj?.getJson()._id+"-"+newId):
    ("/campaign/"+obj?.getJson()._id);
    console.log(newLink);

    return (
      <Link to={newLink} style={{ color: styles.colors.colorWhite, 
        textDecoration: "none", userSelect:"none",
        height: "fit-content",
        width: "fit-content"}}
     
      >

      <div style={{display: "flex", flexDirection: 'column', 
      borderRadius:radius,
      justifyContent:"space-evenly", 
      zIndex:"0",
      width: '100%', 
      backgroundImage: 'url('+(obj?.getJson().picURL||placeholder)+')',
      backgroundRepeat: "no-repeat",  backgroundPosition: "50% 50%",  backgroundSize:"cover", }}>
                        
                        <div style={{
                        ...styles.popupSmall, display: "flex", flexDirection: "row", justifyContent:"space-between", flexDirection: 'column',borderRadius:radius,
                        height: "fit-content", 
                         width: "fit-content"}}>
                          
                          <div 
                          
                          style={{display: "flex", height:"220px", width:"78vmax", fontWeight:"bold", fontFamily:"serif", 
                          textDecoration: styles.colors.colorWhite+"22 underline", textDecorationThickness: "1px", textUnderlineOffset: "4px",
                          textShadow:"1px 1px 0 "+styles.colors.colorBlack, textShadow:"-1px -1px 0 "+styles.colors.colorBlack,
                          alignItems:"center", justifyContent:"center", fontSize:styles.fonts.fontHeader2,}}>
                            {obj?.getJson().title}
                          </div>
                </div>
        </div>
        </Link>
      
    )
  }
}


