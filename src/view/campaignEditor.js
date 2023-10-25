import { Component } from 'react';
import "../App.css"
import CardPractice from './CardPrac';
import AddCampaign from './AddCampaign';
import MapComponent from '../componentListNPM/mapTech/mapComponent';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
// https://www.npmjs.com/package/react-lazyload;
import placeholder from '../pics/placeholderEncounter.JPG';
import backarrow from '../pics/backArrow.webp';
import EncounterMapItem from './encounterMapItem';
import LoreListCard from './pages/loreListCard';
import Worldbuilder from './worldBuilder';
import LoreViewer from './loreViewer';
import Upload from './upload';
import GalleryViewer from './galleryViewer';
import ParentFormComponent from '../componentListNPM/componentForms/parentFormComponent';
import LoreSearch from './loreSearch';



export default class CampaignEditor extends Component {
  constructor(props) {
    
    super(props);
    this.state = {
      obj: undefined,
      pic: undefined,
     
    }
    
  }

 
async componentDidMount(){
  let app = this.props.app;
  let dispatch = app.dispatch;
  let state = app.state;
  let href = window.location.href;
  let splitURL = href.split("/");
  let id = splitURL[splitURL.length-1];
  let loreId;
  await dispatch({currentLore:undefined})
  if(id.includes("-")){
    let loreSplit = id.split('-');
    id = loreSplit[0];
    loreId = loreSplit[1];
    let lore = state.componentList.getComponent("lore", loreId, "_id");
    await dispatch({currentLore:lore});
  }
  let component = this.props.app.state.componentList.getComponent("campaign", id);
  this.setState({obj: component,  start:true});
  dispatch({currentCampaign: component})
  //RICH TEXT READ
  // let campaignDesc = document.getElementById("campaignDesc");
  // campaignDesc.innerHTML = component.getJson().description;

  // this.setState((prevState) => ({
  //   usage: prevState.usage + 1,
  // }));
}


  render() {
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    
    let styles = state.styles;
    

    return (<div style={{display:"flex", flexDirection:"row", maxWidth:"100%",}}>
      {/* HOMEPAGE */}
      {this.state.start&&(
      <div style={{ display:"flex", flexDirection:"column",
      width:"100%", minWidth:"fit-content", height:"100%",}}>

        {/* BACK BUTTON */}
{(state.popUpSwitchcase != "updateCampaign" && state.currentLore==undefined) &&
        <Link 
        to={"/campaign/"} 
        style={{...styles.buttons.buttonAdd, textDecoration:"none", fontStyle:"italic", background:styles.colors.color7+"aa",
        fontWeight:"bold", letterSpacing:".05rem", marginBottom:"2vh"}}
        >
          <img style={{width:".9rem", opacity:"98%", marginRight:".75rem"}}
          src={backarrow}
          />
          Campaigns
        </Link>}

      <div style={{...styles.backgroundContent, position:"relative",
      backgroundImage: 'url('+(this.state.obj?.getJson().picURL||placeholder)+')', }}>
            <div style={{...styles.popupSmall, padding:"1rem", minHeight:"fit-content", width:"100%"}}>

            {(state.currentComponent?.getJson().type === "campaign" && state.popUpSwitchcase === "updateCampaign") && <AddCampaign app = {app}/>}

    {state.currentLore==undefined &&
                <div style={{fontSize:styles.fonts.fontHeader2, color:styles.colors.colorWhite, width:"80%",}}>{this.state.obj?.getJson().title}</div>
    }
    {state.currentLore!==undefined && <div style={{display:"flex",flexDirection:"column"}}>
                <div style={{fontSize:styles.fonts.fontSmall, color:styles.colors.colorWhite+"55", width:"fit-content", alignSelf:"flex-end"}}>Campaign: {this.state.obj?.getJson().title}</div>
                <ParentFormComponent app={app} name="name" obj={state.currentLore}
             theme={"adventureLog"} 
              rows={5}
             prepareRun={true}
             inputStyle={{width:"100%", padding:"2px 5px", color:styles.colors.colorWhite, height:"fit-content",
             borderRadius:"4px",background:styles.colors.colorWhite+"00", 
             border:"solid 1px "+styles.colors.colorWhite+"22", fontSize:styles.fonts.fontSubheader1}}
             
             wrapperStyle={{margin:"5px", color:styles.colors.colorWhite, display:"flex", marginBottom:"-22px",
             flexDirection:"column", justifyItems:"space-between"}}/>
                </div>
    }

                {state.popUpSwitchcase !== "updateCampaign" && <>
                      <div style={{display:"flex", alignContent:"center", position:"absolute", right:"3%", justifyContent:"space-between"}}>

                      {state.currentLore==undefined &&
                        <div style={{... styles.buttons.buttonAdd,  borderRadius:"1rem", width:"fit-content", fontSize:styles.fonts.fontSmall, padding:"4px",
                        paddingRight:"9px", paddingLeft:"9px", backgroundColor:styles.colors.color1+"ee", position:"relative",
                        justifyContent:"center"}} 
                          onClick={()=>{dispatch({operate: "update", operation: "cleanPrepare", object: this.state.obj, popUpSwitchcase: "updateCampaign"})}}>
                        Edit 
                        </div>}
                        
                      </div>

                      {/* I dont think we are doing sessions */}
              {/* <div style={{color:styles.colors.colorWhite}}>Session {this.state.obj?.getJson().session}</div> */}
              {/* /Description/ */}
              
              <div id= "campaignDesc" 
              style={{width:"100%", height:"100%", userSelect:"text", marginTop:"11px"}}>
                </div>
              
              
              </>}
              
                </div>
                
                
        </div>

        <hr></hr>
        {state.currentLore!==undefined ? (<div style={{width:"100%", height:"100%"}}>
        <LoreViewer app={app} type ="card" _id = {this.state.obj.getJson()._id}/>        
        </div>):(
        <>
                <div style={{display:"flex", flexDirection:"column", width:"100%", padding:".75%", justifyContent:"space-between",}}>
                        
                        {/* <Link to= {"/worldbuilder/" + this.state.obj?.getJson()._id} 
                        style={{...styles.buttons.buttonAdd, display:"flex", cursor:"pointer", background:styles.colors.color7+"88"}}>
                             <div>+ World Map</div>
                             </Link> */}
                             <Worldbuilder app={app} type="card"/>
                </div>
        <hr></hr>
        <div 
                        style={{ display:"flex", justifyContent:"", width:"100%", flexDirection:"row", 
                        color:styles.colors.color4}}>
                            <div  style={{ display:"flex", width:"100%", justifyContent:"space-between",}}> Encounters
                             
                      <div style={{display:"flex", flexDirection:"row", width:"fit-content", 
                      padding:".75%", justifyItems:"flex-end",
                      }}>
                         
                          <Link to= {"/encountermanager/"  + this.state.obj?.getJson()._id} 
                        style={{...styles.buttons.buttonAdd, display:"flex", cursor:"pointer",
                        fontSize:styles.fonts.fontSmall, paddingTop:".2%", paddingBottom:".2%",
                        background:styles.colors.color7+"88", marginTop:"-.5rem"}}>
                                  Manage Encounters
                             </Link></div>

                             </div>
        </div>
                             <div style={{}}>
            <MapComponent app={app} name={"encounter"} cells={[{custom:EncounterMapItem, props:{app:app}},]} 
            filter={{search: this.state.obj?.getJson()._id, attribute: "campaignId"}}
            theme={"selectByImageSmall"}
            />
          </div>

          <hr></hr>
          <div style={{display:"flex", flexDirection:"column", width:"100%", padding:".75%", justifyContent:"space-between",}}>
                        
                        <div 
                        style={{ display:"flex", cursor:"pointer", background:"", border:"", cursor:"", color:styles.colors.color4, flexDirection:"column"}}>
                             Gallery
                             <div style={{display:"flex", justifyContent:"center", justifyItems:"center", marginTop:"8px",}}>

                             
                <GalleryViewer app={app} type="card" options={{tabType:"bigCardBorderless", cardType:undefined}}
                />                 
                            </div>
                      </div>
                </div>
<hr></hr>
                <LoreSearch app={app} type="card" options={{tabType:"bigCardBorderless", cardType:undefined}}
                />

                </>)}
        </div>

)}

        </div>
    )
  }
}


