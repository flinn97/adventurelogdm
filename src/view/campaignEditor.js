import React, { Component } from 'react';
import "../App.css"
import CardPractice from './CardPrac';
import AddCampaign from './AddCampaign';
import MapComponent from '../componentListNPM/mapTech/mapComponent';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
// https://www.npmjs.com/package/react-lazyload;
import placeholder from '../pics/placeholderEncounter.JPG';
import addPC from '../pics/removePlayer.png';
import backarrow from '../pics/backArrow.webp';
import EncounterMapItem from './encounterMapItem';
import Worldbuilder from './worldBuilder';
import LoreViewer from './loreViewer';
import Upload from './upload';
import GalleryViewer from './galleryViewer';
import ParentFormComponent from '../componentListNPM/componentForms/parentFormComponent';
import LoreSearch from './loreSearch';
import treeService from '../services/treeService';

import loreB from '../pics/illustrations/loreScript.png';
import encounterB from '../pics/illustrations/encounterGiant.png';
import galleryB from '../pics/illustrations/paintingHand.png';
import ImageButton from '../componentListNPM/componentForms/buttons/imageButton';
import auth from '../services/auth';
import TokenImage from './tokenImage';
import DelButton from '../componentListNPM/componentForms/buttons/deleteButton';
import toolService from '../services/toolService';

import { URLcheck } from './campaignEditorURLCheck';
import { LinkStateChecker } from './linkStateChecker';

export default class CampaignEditor extends Component {
  constructor(props) {
    
    super(props);
    this.encRef = React.createRef();
    this.loreRef = React.createRef();
    this.galRef = React.createRef();
    this.delLoreForce=this.delLoreForce.bind(this);
    this.state = {
      obj: undefined,
      pic: undefined,
      showList: true,
      start: false,
      splash:true,
      update:false
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
  // if(this.state.splash){
  //   await dispatch({popupSwitch:"splashScreen"})
  //   await this.setState({splash:false})

  // }
  await auth.firebaseGetter(id, state.componentList, "campaignId", "lore").then(async ()=>{
  // await dispatch({popupSwitch:""})

  })
  await dispatch({currentLore:undefined})
  if(id.includes("-")){
    let loreSplit = id.split('-');
    id = loreSplit[0];
    loreId = loreSplit[1];
    let lore = state.componentList.getComponent("lore", loreId, "_id");
    await dispatch({currentLore:lore});
  }

  let component = this.props.app.state.componentList.getComponent("campaign", id);
  if(component){

  
  this.setState({obj: component,  start:true, showList:true});
  dispatch({currentCampaign: component})
  
  let players = await component.getPlayers(state.componentList);
  dispatch({
    campaignPlayers: players,
  })
}
this.scrollTo(this.startRef, "smooth")

state.componentList.sortSelectedList("lore", "index");
}


scrollTo = (ref, behavior) => {
  if (ref?.current) {
    ref?.current?.scrollIntoView({ behavior: behavior || "smooth", block: "start" });
  }
}

    openPlayers(dispatch){
      dispatch({
        popupSwitch: "viewPlayers"
      })
    };

    async deleteLore () {
      debugger
      let state =  this.props.app.state;
      let dispatch = this.props.app.dispatch;
      let compList = state.componentList;
      let lore = this.state.ref? state.componentList.getComponent("lore", this.state.ref, "_id"):state.currentLore;
      let referenceList = compList.getList("lore", lore.getJson()._id, "ogId");
      let delList = [lore, ... referenceList];
    let campaignId = toolService.getIdFromURL(true);
      window.history.pushState({}, "Camapaign", "/campaign/"+campaignId);
      await this.setState({start:false});
    await dispatch({popupSwitch: "splashScreen"})
      this.delLoreForce(delList)
      
      
          
      
    }
    async delLoreForce(loreList){
      let state =  this.props.app.state;
      await state.opps.cleanPrepareRun({del:loreList});
      const delay = ms => new Promise(res => setTimeout(res, ms));
                await delay(1000);
     await this.props.app.dispatch({popupSwitch:""});
      await this.componentDidMount();
    }

  render() {
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    
    let styles = state.styles;
    let players = state.campaignPlayers;
    let pCount = players?.length;

    const advLogText = "Go to "+this.state.obj?.getJson().title+"'s Adventure Log";
    const advLogLink = this.state.obj?.getJson()._id;
    const newLink = ("/log/"+advLogLink);

    let hWidth = pCount?(24*pCount):24;
    let highlightWidth = hWidth.toString()+"px";
    let topLore = state.componentList.getList("lore", advLogLink, "campaignId").filter(lore=>lore.getJson().parentLore)[0]

    return (<div style={{display:"flex", flexDirection:"row", maxWidth:"100%",}}>
      {/* HOMEPAGE */}
      {this.state.start&&(
      <div style={{ display:"flex", flexDirection:"column",
      width:"100%", minWidth:"fit-content", height:"100%",  }}>
        <div ref={this.startRef}/> 
<div className='hover-btn-highlight'
style={{color:"red", cursor:"pointer", borderRadius:"11px", width:"fit-content", padding:"2px 8px", marginBottom:"8px"}} onClick={()=>{
  dispatch({popupSwitch:"popupApproval", operation: "cleanJsonPrepare", operate:"addapproval", object:{campaignId:state.currentCampaign.getJson()._id, type:"approval"}})
  //treeService.convertToMarketplace(state.currentCampaign, state.componentList, "campaignId")
  }}>Send to Marketplace</div>
        {/* BACK BUTTON */}
      {(state.popUpSwitchcase != "updateCampaign" && state.currentLore==undefined) &&
          (<Link className="hover-btn-highlight"
          to={"/campaign/"} 
          style={{...styles.buttons.buttonAdd, textDecoration:"none", fontStyle:"italic", background:"", padding:"8px 8px", 
          color:styles.colors.color3+"e6", boxShadow:"", fontSize:".95rem",
          fontWeight:"bold", letterSpacing:".05rem", marginBottom:"10px", border:"" }}
          >
            <img style={{width:".9rem", opacity:"98%", marginRight:"8px"}}
            src={backarrow}
            />
            Campaigns
          </Link>)
          ||
          (<Link className="hover-btn"
          to={"/campaign/"+toolService.getIdFromURL(true,[0])} 
          style={{...styles.buttons.buttonAdd, textDecoration:"none", fontStyle:"italic", background:"", padding:"8px 8px", 
          color:styles.colors.color3+"e6", boxShadow:"", fontSize:".95rem",
          fontWeight:"bold", letterSpacing:".05rem", marginBottom:"10px", border:""}}
          >
            <img style={{width:".9rem", opacity:"98%", marginRight:"8px"}}
            src={backarrow}
            />
            {this.state.obj?.getJson().title}
          </Link>)
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

      

    {state.currentLore!==undefined && <div style={{display:"flex",flexDirection:"column"}}>
    <div className='hover-btn'
                      style={{...styles.buttons.buttonClose,  borderRadius:"2vmin", fontSize:styles.fonts.fontSmall,
                    padding:"4px 10px",  pointer:"cursor", height:"fit-content", zIndex:"200", alignSelf:"flex-end",
                    background:styles.colors.colorBlack+"5b",marginTop:"-4px",
                    // backgroundColor:"white",
                  }}
                    
                    onClick={ ()=>{
                       
                       this.deleteLore();
                      }
                    }>
                      Delete This Lore
                     
                    </div>
    <div
    style={{width:"fit-content", alignSelf:"flex-start",color:styles.colors.color3,  padding: "5px 6px" }}>
                <div
                style={{fontSize:styles.fonts.fontSmall, color:styles.colors.colorWhite+"69",}}>
                  {this.state.obj?.getJson().title+":"}
                  
                  </div>
          </div>       
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
<Link to={newLink} className='hover-btn' title={advLogText}
    style={{...styles.buttons.buttonAdd, padding:"2px 14px", borderRadius:"11px", borderColor:"black",
    color:"#57a6f2"+'d2', backgroundColor:styles.colors.colorBlack+"b8", 
    marginTop:"20px", fontWeight:"600"}}>
      
    Adventure Log
</Link>

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
                          <div style={{
                            display:"flex", flexDirection:"column", alignItems:"flex-end",
                            justifyContent:"flex-end"}}>

                                                      


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

                        

                        <div onClick={ async ()=>{
                                                this.openPlayers(dispatch)
                                              }}
                            style={{ minWidth:"100%", width:"800px",
                                      display: "flex", marginTop:"10px", height:"fit-content", 
                                      borderRadius: "12px", 
                                      flexDirection: "row", 
                                      alignItems: "flex-end", // This should be alignItems instead of alignContent
                                      justifyContent: "flex-end", // Add this if you want to align the items to the end of the container
                                      height: "22px"
                                    }}>
                                        {players?.length > 0 &&
                                                    (<div className='hover-img' style={{display: "flex", width: highlightWidth, alignItems: "flex-end", marginBottom:"-4px", justifyContent:"flex-end", 
                                                    marginRight:"54px", cursor:"pointer",
                                                   padding:"3px", borderRadius:"11px"}}>
                                                                            { players.map((p, index) => (
                                                                                    <div key={index} 
                                                                                        style={{   marginRight: "-8px",
                                                                                        }}>
                                                                                        {p?.getJson().picURL && (
                                                                                            <div  style={{ 
                                                                                                display: "flex", 
                                                                                                flexDirection: "row", zIndex: (10)+index,
                                                                                                position: "relative",
                                                                                                filter:`blur(`+(.3 / (index + 1)).toFixed(2)+`px) saturation(`+(.73 / (index + 1))+`)`,                                                                                               
                                                                                                width: "34px",
                                                                                            }}>
                                                                                                
                                                                                                {/* Token Image */}
                                                                                                <TokenImage 
                                                                                                    pic={p?.getJson().picURL} 
                                                                                                    width={38} 
                                                                                                    app={app} 
                                                                                                    colors={p.getJson().colors ? Object.values(p.getJson().colors)
                                                                                                       : 
                                                                                                       [styles.colors.color1, styles.colors.color2, styles.colors.color8]}
                                                                                                    
                                                                                                />
                                                                                            </div>
                                                                                        )}
                                                                                    </div>
                                                                                ))
                                                                            }
                                                      </div>)}

                                            <div className='hover-btn' title={"View/edit player characters from this campaign"}
                                              onClick={ async ()=>{
                                                this.openPlayers(dispatch)
                                              }}
                                              style={{ 
                                                ...styles.buttons.buttonAdd, 
                                                
                                                padding: "4px 8px", width:"220px",
                                                paddingTop:"7px",
                                                display: "flex", 
                                                alignItems: "start", textAlign:"center", alignContent:"center",
                                                justifyContent: "center" 
                                              }}
                                            >
                                                  <img src={addPC} style={{ width: "22px", marginRight: "8px", marginTop:"-5px" }} alt="Manage Players"  ></img>
                                                   
                                                          <div style={{ color:styles.colors.color5, textAlign:"end", verticalAlign:"flex-end",
                                                          fontSize: styles.fonts.fontSmall, fontSize: ".8rem",     
                                                          }}>
                                                    Manage Players
                                                          </div>
                                            </div>
                                            
                                    </div>
                                    </div>}

              </div>
              
              </>}
              
                </div>
                
                
        </div>


        {/* {(state.currentLore==undefined && */}
        <div style={{width:"100%",display:"flex", flexDirection:"row", justifyContent:"space-evenly", marginTop:"20px"}}>

                                            <div className="hover-btn">
          <ImageButton 
          onClick={() => this.scrollTo(this.loreRef, "smooth")} 
          app={app} image={loreB} text={"Lore"} wrapperStyle={{...styles.buttons.buttonAdd,position: 'relative', cursor: "pointer",borderRadius: "12px",
          minHeight: "95px",padding:"4px",borderRadius:"12px",
          width: "300px", minHeight:"95px", width:"300px", backgroundColor:styles.colors.color2+'de',
          overflow: 'hidden' }}
          buttonTextStyle={{position: "absolute",top: "50%", left: "50%",
                                            transform: 'translate(-50%, -50%)', opacity:".77",
                                            color: styles.colors.color3,
                                            zIndex: 2}}/>
                                            </div>
                                
                                            <div className="hover-btn">      
                                <ImageButton 
                                onClick={() => this.scrollTo(this.encRef, "smooth")} 
                              app={app} 
                              image={encounterB} 
                              text={"Encounters"} 
                              wrapperStyle={{...styles.buttons.buttonAdd,position: 'relative', cursor: "pointer",borderRadius: "12px",
                              minHeight: "95px",padding:"4px",borderRadius:"12px",
                              width: "300px", minHeight:"95px", width:"300px", backgroundColor:styles.colors.color2+'de',
                              overflow: 'hidden' }}
                              buttonTextStyle={{position: "absolute",top: "50%", left: "50%",
                                                                transform: 'translate(-50%, -50%)', opacity:".77",
                                                                color: styles.colors.color3,
                                                                zIndex: 2}}/></div>
                                
                                <div className="hover-btn">
                                        <ImageButton onClick={() => this.scrollTo(this.galRef, "smooth")} 
                                       app={app} 
                                      image={galleryB} 
                                      text={"Gallery"} 
                                      wrapperStyle={{...styles.buttons.buttonAdd,position: 'relative', cursor: "pointer",borderRadius: "12px",
                                      minHeight: "95px",padding:"4px",borderRadius:"12px",
                                      width: "300px", minHeight:"95px", width:"300px", backgroundColor:styles.colors.color2+'de',
                                      overflow: 'hidden' }}
                                      buttonTextStyle={{position: "absolute",top: "50%", left: "50%",
                                                                        transform: 'translate(-50%, -50%)', opacity:".77",
                                                                        color: styles.colors.color3,
                                                                        zIndex: 2}}/></div>
                                

                  </div>
                  {/* } */}


             
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
                      type={"richEditor"} onPaste={this.handlePaste}
                      wrapperStyle={{margin:"5px", color:styles.colors.colorWhite, display:"flex",
                      flexDirection:"column", justifyItems:"space-between"}}/>
                      </div>}

                   
        {state.currentLore!==undefined ? (<div style={{minWidth:"100%", height:"100%"}}>
        <LoreViewer app={app} type ="card" _id = {this.state.obj.getJson()._id}/>        
        </div>):(
        <>
                <div style={{display:"flex", flexDirection:"column", width:"100%", height:"fit-content", padding:".75%", justifyContent:"space-between", }}>
                        
                {state.componentList.getComponent("map",topLore?.getJson()._id, "loreId") &&<div style={{color:'white'}}  onClick={async ()=>{
          debugger
          let map = state.componentList.getComponent("map",topLore.getJson()._id, "loreId")
          state.opps.clearUpdater();
        await state.opps.cleanPrepareRun({del:map});
        this.setState({update:true})
       }}>Delete Map</div>}
                             <Worldbuilder app={app} type="card" dispatch ={()=>{this.setState({update:false})}} update={this.state.update} topLore={topLore} />
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
      <URLcheck onChange={async()=>{
  
                await this.setState({start:false});

        this.componentDidMount();
        // this.setState({start:true})
      }}/>
      <LinkStateChecker dispatch={(obj)=>{this.setState(obj)}} />
        </div>
    )
  }
}


