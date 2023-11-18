import React, { Component } from 'react';
import "../App.css"
import CardPractice from './CardPrac';
import AddCampaign from './AddCampaign';
import MapComponent from '../componentListNPM/mapTech/mapComponent';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
// https://www.npmjs.com/package/react-lazyload;
import placeholder from '../pics/placeholderEncounter.JPG';
import addPC from '../pics/addPlayer.png';
import backarrow from '../pics/backArrow.webp';
import EncounterMapItem from './encounterMapItem';
import Worldbuilder from './worldBuilder';
import LoreViewer from './loreViewer';
import Upload from './upload';
import GalleryViewer from './galleryViewer';
import ParentFormComponent from '../componentListNPM/componentForms/parentFormComponent';
import LoreSearch from './loreSearch';



export default class CampaignEditor extends Component {
  constructor(props) {
    
    super(props);
    this.encRef = React.createRef();
    this.loreRef = React.createRef();
    this.galRef = React.createRef();
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

scrollTo = (ref, behavior) => {
  if (ref.current) {
    ref.current.scrollIntoView({ behavior: behavior || "smooth", block: "start" });
  }
}

  render() {
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    
    let styles = state.styles;
    let players = state.componentList.getList("character", this.state.obj?.getJson()._id, "campaignId");
    let pCount = players.length;

    const advLogText = "Go to "+this.state.obj?.getJson().title+"'s Adventure Log";
    const advLogLink = this.state.obj?.getJson()._id;
    const newLink = ("/log/"+advLogLink);

    return (<div style={{display:"flex", flexDirection:"row", maxWidth:"100%",}}>
      {/* HOMEPAGE */}
      {this.state.start&&(
      <div style={{ display:"flex", flexDirection:"column",
      width:"100%", minWidth:"fit-content", height:"100%",  }}>

        {/* BACK BUTTON */}
      {(state.popUpSwitchcase != "updateCampaign" && state.currentLore==undefined) &&
          (<Link className="hover-btn"
          to={"/campaign/"} 
          style={{...styles.buttons.buttonAdd, textDecoration:"none", fontStyle:"italic", background:styles.colors.color7+"aa", padding:"8px 8px", 
          fontWeight:"bold", letterSpacing:".05rem", marginBottom:"10px", }}
          >
            <img style={{width:".9rem", opacity:"98%", marginRight:"8px"}}
            src={backarrow}
            />
            Campaigns
          </Link>)
          ||
          (<a className="hover-btn"
          href={window.location.href.split("-")[0]} 
          style={{...styles.buttons.buttonAdd, textDecoration:"none", fontStyle:"italic", 
         
          background:styles.colors.color7+"aa", padding:"8px 8px",
          fontWeight:"bold", letterSpacing:".05rem", marginBottom:"10px", fontSize:".9rem" }}
          >
            <img style={{width:".9rem", opacity:"98%", marginRight:"8px"}}
            src={backarrow}
            />
            {this.state.obj?.getJson().title}
          </a>)
          }

            

      <div style={{...styles.backgroundContent, position:"relative", minWidth:"83vw",
          backgroundImage:
          'url('+(this.state.obj?.getJson().picURL||placeholder)+')'
      }}>
        
            <div style={{...styles.popupSmall, padding:"1rem", minHeight:"fit-content", width:"100%"}}>

            {(state.currentComponent?.getJson().type === "campaign" && state.popUpSwitchcase === "updateCampaign") && 
              <AddCampaign app = {app}/>
            }

    {(state.currentLore==undefined && state.popUpSwitchcase !== "updateCampaign") &&
                <div style={{fontSize:styles.fonts.fontHeader2, color:styles.colors.colorWhite, width:"80%",}}>{this.state.obj?.getJson().title}</div>
    }

      <Link to={newLink} className='hover-btn' title={advLogText} target="_blank"
                style={{...styles.buttons.buttonAdd, padding:"2px 14px", borderRadius:"11px", borderColor:"black",
                color:"#57a6f2"+'d2', backgroundColor:styles.colors.colorBlack+"b8", 
                marginBottom:"-10px",
                marginTop:"10px", fontWeight:"600"}}>
                  
                Adventure Log
            </Link>

    {state.currentLore!==undefined && <div style={{display:"flex",flexDirection:"column"}}>

    <a href={window.location.href.split("-")[0]} className='hover-btn-highlight' title={"Go Back to "+this.state.obj?.getJson().title} 
    style={{width:"fit-content", alignSelf:"flex-end", cursor:"pointer", color:styles.colors.color3, textDecoration:"underline 1px", textUnderlineOffset:"2px", padding: "5px 6px" }}>
                <div className='hover-container'
                style={{fontSize:styles.fonts.fontSmall, color:styles.colors.colorWhite+"99", textDecoration:"underline 1px", textUnderlineOffset:"4px" }}>
                  Campaign: {this.state.obj?.getJson().title}
                  <div className='hover-div' style={{marginLeft:"-22px", position:"absolute", }}>{"<"}</div>
                  </div>
          </a>       
                 <ParentFormComponent app={app} name="name" obj={state.currentLore}
             theme={"adventureLog"} 
              rows={5}
             prepareRun={true}
             inputStyle={{width:"100%", padding:"2px 5px", color:styles.colors.colorWhite, height:"fit-content",
             borderRadius:"4px",background:styles.colors.colorWhite+"00", 
             border:"solid 1px "+styles.colors.colorWhite+"22", fontSize:styles.fonts.fontSubheader1}}
             
             wrapperStyle={{margin:"1px", color:styles.colors.colorWhite, display:"flex", marginBottom:"1px", 
             flexDirection:"column", justifyItems:"space-between", }}/>
                </div>
    }

                {state.popUpSwitchcase !== "updateCampaign" && <>
                      <div style={{display:"flex", alignContent:"center", position:"absolute", right:"24px", justifyContent:"space-between"}}>

                      {state.currentLore==undefined &&
                        <div className="hover-btn" style={{... styles.buttons.buttonAdd,  borderRadius:"12px", width:"fit-content", 
                        fontSize:styles.fonts.fontSmall, padding:"4px 9px", 
                        backgroundColor:styles.colors.color1+"ee", position:"relative", height:"fit-content",
                        justifyContent:"center"}} 
                          onClick={()=>{dispatch({operate: "update", operation: "cleanPrepare", object: this.state.obj, popUpSwitchcase: "updateCampaign"})}}>
                        Edit 
                        </div>}
                        
                      </div>

                      {/* I dont think we are doing sessions */}
              {/* <div style={{color:styles.colors.colorWhite}}>Session {this.state.obj?.getJson().session}</div> */}
              {/* /Description/ */}
              <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", minWidth:"100%", }}>
                          <div id= "campaignDesc" 
                      style={{width:"1px", height:"1px", userSelect:"none", opacity:"0%", }}>
                          </div>
                          {state.currentLore==undefined &&
                          <div>
                          <div 
                                style={{ 
                                  color: styles.colors.colorWhite + "b4", 
                                  borderRadius: "11px", 
                                  padding: "6px 8px", 
                                  alignItems: "flex-end", 
                                  background: styles.colors.colorBlack + "3b", 
                                  fontSize: styles.fonts.fontSmallest, 
                                  marginBottom: "8px",
                                  width: "fit-content", 
                                  height: "25px", 
                                  userSelect: "text", 
                                  marginTop: "1px" // Changed "01px" to "1px" to keep it standard
                                }}
                              >
                                {(pCount === 0 || pCount >= 2) ? `${pCount} active characters in this campaign` : `${pCount} active character in this campaign`}
                        </div>
                        <div style={{ minWidth:"100%",
                                      display: "flex", marginTop:"10px", height:"fit-content", 
                                      borderRadius: "12px", 
                                      flexDirection: "row",
                                      alignItems: "center", // This should be alignItems instead of alignContent
                                      justifyContent: "flex-end", // Add this if you want to align the items to the end of the container
                                      height: "22px"
                                    }}>
                                            <div className='hover-btn' title={"Add or remove player characters from this campaign"}
                                              style={{ 
                                                ...styles.buttons.buttonAdd, 
                                                fontSize: styles.fonts.fontSmall, 
                                                padding: "4px 8px", 
                                                paddingTop:"7px",
                                                display: "flex", 
                                                alignItems: "start", 
                                                justifyContent: "center" 
                                              }}
                                            >
                                                  <img src={addPC} style={{ width: "22px", marginRight: "8px" }} alt="Add or remove"  ></img>
                                                    Add or 
                                                          <div style={{ color:styles.colors.color5,
                                                          fontSize: styles.fonts.fontSmall,marginLeft:"6px",         
                                                          }}>
                                                    Remove
                                                          </div>
                                            </div>
                                            
                                    </div></div>}

              </div>
              
              </>}
              
                </div>
                
                
        </div>


        {(state.currentLore==undefined &&
        <div style={{width:"100%",display:"flex", flexDirection:"row", justifyContent:"space-evenly", marginTop:"20px"}}>

                <div onClick={() => this.scrollTo(this.loreRef, "smooth")} 
                style={{...styles.buttons.buttonAdd, textAlign:"center", verticalAlign:"center",
                  cursor:"pointer", padding:"4px", borderRadius:"12px",
                  height:"95px", width:"340px", backgroundColor:styles.colors.color2}}>
                    Lore
                  </div>

                  <div onClick={() => this.scrollTo(this.encRef, "smooth")} 
                style={{ ...styles.buttons.buttonAdd, textAlign:"center", verticalAlign:"center",
                  cursor:"pointer", padding:"4px",borderRadius:"12px",
                  height:"95px", width:"340px", backgroundColor:styles.colors.color2}}>
                    Encounters
                  </div>

                  <div onClick={() => this.scrollTo(this.galRef, "smooth")} 
                  style={{...styles.buttons.buttonAdd, textAlign:"center", verticalAlign:"center",
                  cursor:"pointer", padding:"4px",borderRadius:"12px",
                  height:"95px", width:"340px", backgroundColor:styles.colors.color2}}>
                    Gallery
                  </div>

                  </div>)}



                 
        {state.currentLore===undefined &&
        <div style={{color:styles.colors.color3+"f5", fontSize:styles.fonts.fontSmall, marginTop:"22px", marginBottom:"22px"}}>
           {/* {this.state.obj.getJson().title}  */}
           Lore:  
          <ParentFormComponent app={app} name="description" obj={this.state.obj}
                      theme={"adventureLog"} 
                        rows={5}
                        prepareRun={true}
                      
                      inputStyle={{maxWidth:"100%", padding:"2px 5px", color:styles.colors.colorWhite, height:"fit-content",
                      borderRadius:"4px",background:styles.colors.colorWhite+"00", 
                      border:"solid 1px "+styles.colors.colorWhite+"22", fontSize:styles.fonts.fontSmall }}
                      type={"richEditor"}
                      wrapperStyle={{margin:"5px", color:styles.colors.colorWhite, display:"flex",
                      flexDirection:"column", justifyItems:"space-between"}}/>
                      </div>}

                   
        {state.currentLore!==undefined ? (<div style={{minWidth:"100%", height:"100%"}}>
        <LoreViewer app={app} type ="card" _id = {this.state.obj.getJson()._id}/>        
        </div>):(
        <>
                <div style={{display:"flex", flexDirection:"column", width:"100%", padding:".75%", justifyContent:"space-between",}}>
                        
                        
                             <Worldbuilder app={app} type="card"/>
                </div>
                <div ref={this.loreRef}/> 
                <LoreSearch app={app} type="card" options={{tabType:"bigCardBorderless", cardType:undefined}}
                />
        <hr></hr>

        <div 
                        style={{ display:"flex", justifyContent:"", width:"100%", flexDirection:"column", 
                        color:styles.colors.color4}}>
                            <div  style={{ display:"flex", width:"100%", justifyContent:"flex-start",}}> Encounters
                             
                             </div>

                             <div style={{display:"flex", flexDirection:"row",justifyItems:"center", width:"fit-content", marginTop:"11px"
                      }}>
                         
                          <Link to= {"/encountermanager/"  + this.state.obj?.getJson()._id} 
                        className="hover-btn" style={{...styles.buttons.buttonAdd, marginTop:"5px", backgroundColor:styles.colors.colorBlack+"99",
                        paddingLeft:"29px",  paddingRight:"29px", alignSelf:"flex-start", justifyItems:"center",  height:"36px",
                        borderRadius:"9px", fontSize:"21px", 
                      }}>
                                  Manage Encounters
                             </Link></div>
        </div>

        <div ref={this.encRef}/>
                             <div style={{marginBottom:"18px"}}>
            <MapComponent app={app} name={"encounter"} cells={[{custom:EncounterMapItem, props:{app:app}},]} 
            filter={{search: this.state.obj?.getJson()._id, attribute: "campaignId"}}
            theme={"selectByImageSmall"}
            />
          </div>

          <hr></hr>
          <div style={{display:"flex", flexDirection:"column", width:"100%", padding:".75%", justifyContent:"space-between",}}>
          <div ref={this.galRef}/> 
                        <div 
                        style={{ display:"flex", cursor:"pointer", background:"", border:"", cursor:"", color:styles.colors.color4, flexDirection:"column"}}>
                             Gallery
                             <div style={{display:"flex", justifyContent:"center", justifyItems:"center", marginTop:"8px",}}>

                             
                <GalleryViewer app={app} type="card" options={{tabType:"bigCardBorderless", cardType:undefined}}
                />                 
                            </div>
                      </div>
                </div>


                </>)}
        </div>

)}

        </div>
    )
  }
}


