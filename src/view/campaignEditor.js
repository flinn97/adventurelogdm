import { Component } from 'react';
import "../App.css"
import CardPractice from './CardPrac';
import AddCampaign from './AddCampaign';
import MapComponent from '../componentListNPM/mapTech/mapComponent';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

// https://www.npmjs.com/package/react-lazyload


import placeholder from '../pics/placeholderEncounter.JPG';



export default class CampaignEditor extends Component {
  constructor(props) {
    
    super(props);
    this.state = {
      obj: undefined,
      pic: undefined
      
    }
    
  }

 
componentDidMount(){
  let href = window.location.href;
  let splitURL = href.split("/");
  let id = splitURL[splitURL.length-1];
  let component = this.props.app.state.componentList.getComponent("campaign", id);
  this.setState({obj: component});
  //RICH TEXT READ
  let campaignDesc = document.getElementById("campaignDesc");
  campaignDesc.innerHTML = component.getJson().description;
}


  render() {
    let app = this.props.app;
    let dispatch = app.dispatch
    let state = app.state;
    let radius = "3vmin";
    let styles = state.styles;
    return (
      <div>
      <div style={{display: "flex", flexDirection: "row", justifyContent:"space-between",  
      backgroundImage: 'url('+(this.state.obj?.getJson().picURL||placeholder)+')', borderRadius:radius,
      backgroundRepeat: "no-repeat",  backgroundPosition: "50% 50%",  backgroundSize:"cover" }}>
            <div style={{...styles.popupSmall, padding:"1rem", minHeight:"13rem", width:"100%"}}>

            {(state.currentComponent?.getJson().type === "campaign" && state.popUpSwitchcase === "updateCampaign") && <AddCampaign app = {app}/>}
                <div style={{fontSize:styles.fonts.fontHeader2, color:styles.colors.colorWhite}}>{this.state.obj?.getJson().title}</div>
                {state.popUpSwitchcase !== "updateCampaign" && <>
                      <div style={{display:"flex", alignContent:"center", position:"absolute", right:"3%"}}>
                      <div style={{...styles.buttons.buttonClose, borderRadius:"1rem", width:"10rem", fontSize:styles.fonts.fontSubheader1, display:"flex",justifyContent:"center"}} 
                        onClick={()=>{dispatch({operate: "update", operation: "cleanPrepare", object: this.state.obj, popUpSwitchcase: "updateCampaign"})}}>
                          Edit Campaign</div>
                      </div>
                      {/* I dont think we are doing sessions */}
              {/* <div style={{color:styles.colors.colorWhite}}>Session {this.state.obj?.getJson().session}</div> */}
              <div id= "campaignDesc"
              style={{width:"100%", height:"100%", userSelect:"none"}}>
                </div>
              
              
              </>}
              
                </div>
                {/* /Description/ */}
                
        </div>
                <div style={{display:"flex", direction:"column", width:"100%", padding:".75%", justifyContent:"space-between",}}>
                        
                        <Link to= {"/worldbuilder/" + this.state.obj?.getJson()._id} 
                        style={{...styles.buttons.buttonAdd, display:"flex", cursor:"pointer", background:styles.colors.color2+"88"}}>
                             <div>World Map</div>
                             </Link>
                        
                          <Link to= {"/encountermanager/"  + this.state.obj?.getJson()._id} 
                        style={{...styles.buttons.buttonAdd, display:"flex", cursor:"pointer", background:styles.colors.color2+"88"}}>
                             <div>Encounters</div>
                             </Link>
                </div>
        </div>
      
    )
  }
}


