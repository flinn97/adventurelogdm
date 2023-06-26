import { Component } from 'react';
import "../App.css"
import CardPractice from './CardPrac';
import AddCampaign from './AddCampaign';
import MapComponent from '../componentListNPM/mapTech/mapComponent';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';


// https://www.npmjs.com/package/react-lazyload


import placeholder from '../pics/placeholderEncounter.JPG';
import backarrow from '../pics/backArrow.webp';
import EncounterMapItem from './encounterMapItem';
import EncounterCard from './pages/encounterCard';
import EncounterManager from './pages/encounterManager';


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
      <div >

        {/* BACK BUTTON */}
{state.popUpSwitchcase != "updateCampaign" &&
        <Link to={"/campaign/"} style={{...styles.buttons.buttonAdd, textDecoration:"none", fontStyle:"italic", background:styles.colors.color7+"aa",
        fontWeight:"bold", letterSpacing:".05rem", marginBottom:"2vh"}}
        >
          <img style={{width:".9rem", opacity:"98%", marginRight:".75rem"}}
          src={backarrow}
          />
          Campaigns
        </Link>}

      <div style={{...styles.backgroundContent, position:"relative",
      backgroundImage: 'url('+(this.state.obj?.getJson().picURL||placeholder)+')', }}>
            <div style={{...styles.popupSmall, padding:"1rem", minHeight:"13rem", width:"100%"}}>

            {(state.currentComponent?.getJson().type === "campaign" && state.popUpSwitchcase === "updateCampaign") && <AddCampaign app = {app}/>}
                <div style={{fontSize:styles.fonts.fontHeader2, color:styles.colors.colorWhite}}>{this.state.obj?.getJson().title}</div>
                {state.popUpSwitchcase !== "updateCampaign" && <>
                      <div style={{display:"flex", alignContent:"center", position:"absolute", right:"3%"}}>
                      
                      <div style={{... styles.buttons.buttonAdd,  borderRadius:"1rem", width:"fit-content", fontSize:styles.fonts.fontSmall, 
                      padding:"5px", backgroundColor:styles.colors.color1+"ee", position:"relative",
                      justifyContent:"center"}} 
                        onClick={()=>{dispatch({operate: "update", operation: "cleanPrepare", object: this.state.obj, popUpSwitchcase: "updateCampaign"})}}>
                          Edit Campaign</div>
                      </div>
                      {/* I dont think we are doing sessions */}
              {/* <div style={{color:styles.colors.colorWhite}}>Session {this.state.obj?.getJson().session}</div> */}
              {/* /Description/ */}
              <div id= "campaignDesc" 
              style={{width:"100%", height:"100%", userSelect:"text"}}>
                </div>
              
              
              </>}
              
                </div>
                
                
        </div>

        <hr></hr>
        
                <div style={{display:"flex", flexDirection:"column", width:"100%", padding:".75%", justifyContent:"space-between",}}>
                        
                        <Link to= {"/worldbuilder/" + this.state.obj?.getJson()._id} 
                        style={{...styles.buttons.buttonAdd, display:"flex", cursor:"pointer", background:styles.colors.color7+"88"}}>
                             <div>+ World Map</div>
                             </Link>

                             <hr></hr>

                          <Link to= {"/encountermanager/"  + this.state.obj?.getJson()._id} 
                        style={{...styles.buttons.buttonAdd, display:"flex", cursor:"pointer", background:styles.colors.color7+"88"}}>
                             <div>Manage Encounters</div>
                             </Link>

                             <div style={{}}>
            <MapComponent app={app} name={"encounters"} cells={[{custom:EncounterMapItem, props:{app:app}},]} 
            theme={"selectByImage"}

           

            />
          </div>
        
                </div>
        </div>
      
    )
  }
}


