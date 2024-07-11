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
import { convertToMarketplace2 } from '../services/conversionService';
import { URLcheck } from './campaignEditorURLCheck';
import { LinkStateChecker } from './linkStateChecker';
import SplashScreen from './pages/splashScreen';


export default class CampaignEditor extends Component {
  constructor(props) {

    super(props);
    this.encRef = React.createRef();
    this.startRef = React.createRef();
    this.loreRef = React.createRef();
    this.galRef = React.createRef();
    this.delLoreForce = this.delLoreForce.bind(this);
    this.state = {
      obj: undefined,
      pic: undefined,
      showList: true,
      start: false,
      splash: true,
      update: false
    }

  }


  async componentDidMount() {
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;


    let href = window.location.href;
    let splitURL = href.split("/");
    let id = splitURL[splitURL.length - 1];
    let loreId;
    let campId = state.currentCampaign?.getJson()._id;
    if (!campId) {
      if (id.includes('-')) {
        campId = id.split('-')[0];
      }
      else {
        campId = id
      }
    }

    let list = await state.componentList.getList("lore", campId, "campaignId");
    if (list.length > 0) {
      // auth.firebaseGetter(campId, state.componentList, "campaignId", "lore", dispatch);

    }
    else {
      await auth.firebaseGetter(campId, state.componentList, "campaignId", "lore", undefined, {attribute:"type", value:"condition"} )

    }

    
    await dispatch({ currentLore: undefined })
    if (id.includes("-")) {
      let loreSplit = id.split('-');
      id = loreSplit[0];
      loreId = loreSplit[1];
      let lore = state.componentList.getComponent("lore", loreId, "_id");
      if (!lore) {
        lore = await auth.firebaseGetter(loreId, state.componentList, "_id", "lore", undefined, {attribute:"type", value:"condition"});
        lore = lore[0]
      }
      await dispatch({ currentLore: lore });
    }

    let component = this.props.app.state.componentList.getComponent("campaign", id);
    component.getPlayers(state.componentList, dispatch);

    if (component) {


      this.setState({ obj: component, start: true, showList: true });
      dispatch({ currentCampaign: component })


    }
    this.scrollTo(this.startRef, "smooth")

    await state.componentList.sortSelectedList("lore", "index");
    dispatch({});
    this.scrollTo(this.startRef, "smooth");

  }


  scrollTo = (ref, behavior) => {
    if (ref?.current) {
      ref?.current?.scrollIntoView({ behavior: behavior || "smooth", block: "start" });
    }
  }

  openPlayers(dispatch) {
    dispatch({
      popupSwitch: "viewPlayers"
    })
  };

  async deleteLore(parentLore) {
    let state = this.props.app.state;
    let dispatch = this.props.app.dispatch;
    let compList = state.componentList;


    let lore = this.state.ref ? compList.getComponent("lore", this.state.ref, "_id") : state.currentLore;
    let pin = compList.getComponent("pin", lore.getJson()._id, "loreId");
    let referenceList = compList.getList("lore", lore.getJson()._id, "ogId");
    let pins = [];

    for (let l of referenceList) {
      let p = compList.getComponent("pin", l.getJson()._id, "loreId");
      if (p) {
        pins.push(p);

      }
    }
    let pId = parentLore ? parentLore.getJson()._id : undefined;
    let delList = [lore, pin, ...referenceList, ...pins];
    delList = delList.filter(comp => comp !== undefined);
    let campaignId = toolService.getIdFromURL(true);
    if (!pId) {
      window.history.pushState({}, "Campaign", "/campaign/" + campaignId);
    } else {
      window.history.pushState({}, "Campaign", "/campaign/" + campaignId + "-" + pId);
    }

    await this.setState({ start: false });
    await dispatch({ popupSwitch: "splashScreen" })
    this.delLoreForce(delList)




  }
  async delLoreForce(loreList) {
    let state = this.props.app.state;
    await this.props.app.dispatch({ backendReloader: true })
    await state.opps.cleanPrepareRun({ del: loreList });
    let itt = true;

    const delay = ms => new Promise(res => setTimeout(res, ms));
    await delay(1000);

    while (itt) {

      let bool = false;
      for (let item of loreList) {
        let i = state.componentList.getComponent(item.getJson().type, item.getJson()._id, "_id");
        if (i) {
          bool = true;
          break;
        }

      }

      if (!bool) {
        itt = false;

      }




    }


  }

  render() {
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;

    let styles = state.styles;
    let checkPCount = this.state.obj?.getJson().type === "lore" ? this.state.obj?.getJson().campaignId : this.state.obj?.getJson()._id;

    let players = state.campaignPlayers?.filter(obj => obj.getJson().campaignId === checkPCount);
    let pCount = players?.length;

    const advLogText = "Go to " + this.state.obj?.getJson().title + "'s Adventure Log";
    const advLogLink = this.state.obj?.getJson()._id;
    const newLink = ("/log/" + advLogLink);

    let hWidth = pCount ? (24 * pCount) : 24;
    let highlightWidth = hWidth.toString() + "px";
    let topLore = state.componentList.getList("lore", advLogLink, "campaignId").filter(lore => lore.getJson().parentLore)[0];

    let parent = state.currentLore?.getJson().parentId;
    let pId = parent ? Object.keys(parent)[0] : "";
    let parentItem = state.componentList.getComponent("lore", pId, "_id");
    let loreList = state.currentLore ? state.componentList.getList("lore", state.currentLore.getJson().name, "name") : "";
    let hasName = ((state.currentLore) && (state?.currentLore?.getJson().name != undefined) && (state?.currentLore?.getJson().name != "")) ? true : false;
    let warning = ((loreList.length > 1) && (state.currentLore) && (hasName)) ? <div style={{ color: styles.colors.color5, background: styles.colors.color2, padding: "3px 8px", borderRadius: "8px", fontSize: styles.fonts.fontSmall, position: "absolute", top: 15 }}>
      {"You already have another lore named " + state?.currentLore?.getJson().name}</div> : ""
    
    let encList = state.componentList.getList("encounter", this.state.obj?.getJson()._id, "campaignId");
    // Filter out objects where the name contains "Copy of"
    encList = encList.filter(enc => !enc.getJson().name.includes("Copy of"));
    
    return (
      <div style={{ display: "flex", flexDirection: "row", maxWidth: "100%", }}>
        {/* <div style={{color:"white"}} onClick={()=>{
        convertToMarketplace2(state.currentCampaign.getJson(), "jaredmichaeldavidson@gmail.com");
      }}>Campaign Editor</div> */}
        {/* HOMEPAGE */}
        {this.state.start ? (
          <div style={{
            display: "flex", flexDirection: "column",
            width: "100%", minWidth: "fit-content", height: "100%",
          }}>
            <div ref={this.startRef} />

            {state.user.getJson().partner && (
              <Link style={{ textDecoration: "none", width: "250px" }} to={"../sendtomarketplace/" + state.currentCampaign.getJson()._id} target="_blank"><div className='hover-btn-highlight' style={{ color: "red", cursor: "pointer", borderRadius: "11px", width: "fit-content", padding: "2px 8px", marginBottom: "8px" }} >Send to Marketplace</div></Link>
            )}
            {/* BACK BUTTON */}
            {(state.popUpSwitchcase != "updateCampaign" && state.currentLore == undefined) &&
              (<Link className="hover-btn-highlight"
                to={"/"}
                style={{
                  ...styles.buttons.buttonAdd, textDecoration: "none", fontStyle: "italic", background: "", padding: "8px 8px",
                  color: styles.colors.color3 + "e6", boxShadow: "", fontSize: ".95rem",
                  fontWeight: "bold", letterSpacing: ".05rem", marginBottom: "10px", border: ""
                }}
              >
                <img style={{ width: ".9rem", opacity: "98%", marginRight: "8px" }}
                  src={backarrow}
                />
                Home
              </Link>)
              ||
              (<Link className="hover-btn"
                to={"/campaign/" + toolService.getIdFromURL(true, [0])}
                style={{
                  ...styles.buttons.buttonAdd, textDecoration: "none", fontStyle: "italic", background: "", padding: "8px 8px",
                  color: styles.colors.color3 + "e6", boxShadow: "", fontSize: ".95rem",
                  fontWeight: "bold", letterSpacing: ".05rem", marginBottom: "10px", border: ""
                }}
              >
                <img style={{ width: ".9rem", opacity: "98%", marginRight: "8px" }}
                  src={backarrow}
                />
                {this.state.obj?.getJson().title}
              </Link>)
            }




            <div style={{
              ...styles.backgroundContent, position: "relative", minWidth: "83vw",
              backgroundImage:
                'url(' + (this.state.obj?.getJson().picURL || placeholder) + ')'
            }}>

              <div style={{ ...styles.popupSmall, padding: "1rem", minHeight: "fit-content", width: "100%", }}>

                <div>
                  {(state.currentComponent?.getJson().type === "campaign" && state.popUpSwitchcase === "updateCampaign") &&
                    <AddCampaign app={app} />
                  }</div>

                {(state.currentLore == undefined && state.popUpSwitchcase !== "updateCampaign") &&
                  <div style={{ fontSize: styles.fonts.fontHeader2, color: styles.colors.colorWhite, width: "80%", marginBottom: "25px", }}>{this.state.obj?.getJson().title}</div>
                }



                {state.currentLore !== undefined && <div style={{ display: "flex", flexDirection: "column" }}>
                  <div className='hover-btn'
                    style={{
                      ...styles.buttons.buttonClose, borderRadius: "11px", fontSize: styles.fonts.fontSmall,
                      padding: "4px 10px", pointer: "cursor", color: styles.colors.color5,
                      height: "fit-content", zIndex: "200", alignSelf: "flex-end",
                      background: styles.colors.colorBlack + "5b", marginTop: "-4px",
                      // backgroundColor:"white",
                    }}

                    onClick={() => {
                      //get parent lore of item to delete
                      let parentItem = Object.keys(state.currentLore.getJson().parentId)[0];
                      parentItem = state.componentList.getComponent("lore", parentItem, "_id");
                      this.deleteLore(parentItem);
                    }
                    }>
                    Delete This Lore

                  </div>

                  <div
                    style={{ width: "fit-content", alignSelf: "flex-start", color: styles.colors.color3, 
                    padding: "5px 6px", marginTop:"-22px" }}>
                    {/* <div
                      style={{ fontSize: styles.fonts.fontSmall, color: styles.colors.colorWhite + "69", }}>
                      {this.state.obj?.getJson().title + ": "}{warning}

                    </div> */}
                  </div>

                  <ParentFormComponent app={app} name="name" obj={state.currentLore}
                    theme={"adventureLog"}
                    callbackFunc={(arr) => {

                      let L1 = arr[0];
                      let referenceList = state.componentList.getList("lore", L1.getJson()._id, "ogId");
                      referenceList = referenceList.map(obj => obj.getJson()._id);
                      let pinList = state.componentList.getList("pin");
                      pinList = pinList.filter(pin => referenceList.includes(pin.getJson().loreId));
                      let lPin = state.componentList.getComponent("pin", L1.getJson()._id, "loreId");
                      if (lPin) {
                        pinList.push(lPin)
                      }
                      for (let p of pinList) {
                        p.setCompState({ name: L1.getJson().name })
                      }
                      state.opps.cleanPrepareRun({ update: [L1, ...pinList] })

                    }}
                    rows={5}
                    // prepareRun={true}
                    inputStyle={{
                      width: "100%", padding: "2px 5px", color: styles.colors.colorWhite, height: "fit-content",
                      borderRadius: "4px", background: styles.colors.colorWhite + "00",
                      border: "solid 1px " + styles.colors.colorWhite + "22", fontSize: styles.fonts.fontSubheader1
                    }}

                    wrapperStyle={{
                      margin: "1px", color: styles.colors.colorWhite, display: "flex", marginBottom: "0px",
                      flexDirection: "column", justifyItems: "space-between",
                    }} />


                </div>
                }


                {state.popUpSwitchcase !== "updateCampaign" && <>
                  <div style={{ display: "flex", alignContent: "center", position: "absolute", right: "24px", justifyContent: "space-between" }}>

                    {state.currentLore === undefined &&
                      <div className="hover-btn" style={{
                        ...styles.buttons.buttonAdd, borderRadius: "12px", width: "fit-content",
                        fontSize: styles.fonts.fontSmall, padding: "4px 9px",
                        backgroundColor: styles.colors.color1 + "ee", position: "relative", height: "fit-content",
                        justifyContent: "center"
                      }}
                        onClick={() => { dispatch({ operate: "update", operation: "cleanPrepare", object: this.state.obj, popUpSwitchcase: "updateCampaign" }) }}>
                        Edit
                      </div>}

                  </div>

                  <Link to={newLink} target='_blank' className='hover-btn' title={advLogText}
                    style={{
                      ...styles.buttons.buttonAdd, padding: "2px 14px", borderRadius: "11px",
                      borderColor: "#00000000", boxShadow: "",
                      color: styles.colors.color9, position: "absolute", bottom: 17,
                      backgroundColor: styles.colors.colorBlack + "b8",
                      fontWeight: "600"
                    }}>

                    Adventure Log
                  </Link>

                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", minWidth: "100%", }}>
                    <div id="campaignDesc"
                      style={{ width: "1px", height: "1px", userSelect: "none", opacity: "0%", }}>
                    </div>


                    <div style={{
                      display: "flex", flexDirection: "column", alignItems: "flex-end",
                      justifyContent: "flex-end"
                    }}>




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



                      <div onClick={async () => {
                        this.openPlayers(dispatch)
                      }}
                        style={{
                          minWidth: "100%", width: "800px",
                          display: "flex", marginTop: "10px", height: "fit-content",
                          borderRadius: "12px",
                          flexDirection: "row",
                          alignItems: "flex-end", // This should be alignItems instead of alignContent
                          justifyContent: "flex-end", // Add this if you want to align the items to the end of the container
                          height: "22px"
                        }}>
                        {players?.length > 0 &&
                          (<div className='hover-img' style={{
                            display: "flex", width: highlightWidth, alignItems: "flex-end", marginBottom: "-4px", justifyContent: "flex-end",
                            marginRight: "54px", cursor: "pointer",
                            padding: "3px", borderRadius: "11px"
                          }}>
                            {players.map((p, index) => (
                              <div key={index}
                                style={{
                                  marginRight: "-8px",
                                }}>
                                {p?.getJson().picURL && (
                                  <div style={{
                                    display: "flex",
                                    flexDirection: "row", zIndex: (10) + index,
                                    position: "relative",
                                    filter: `blur(` + (.3 / (index + 1)).toFixed(2) + `px) saturation(` + (.73 / (index + 1)) + `)`,
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
                          onClick={async () => {
                            this.openPlayers(dispatch)
                          }}
                          style={{
                            ...styles.buttons.buttonAdd,

                            padding: "4px 8px", width: "220px",
                            paddingTop: "7px",
                            display: "flex",
                            alignItems: "start", textAlign: "center", alignContent: "center",
                            justifyContent: "center"
                          }}
                        >
                          <img src={addPC} style={{ width: "22px", marginRight: "8px", marginTop: "-5px" }} alt="Manage Players"  ></img>

                          <div style={{
                            color: styles.colors.color5, textAlign: "end", verticalAlign: "flex-end",
                            fontSize: styles.fonts.fontSmall, fontSize: ".8rem",
                          }}>
                            Manage Players
                          </div>
                        </div>

                      </div>
                    </div>

                  </div>

                </>}

              </div>


            </div>


            {(state.currentLore == undefined &&
              <div style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-evenly", marginTop: "20px" }}>

                <div className="hover-btn">
                  <ImageButton
                    onClick={() => this.scrollTo(this.loreRef, "smooth")}
                    app={app} image={loreB} text={"Lore"} wrapperStyle={{
                      ...styles.buttons.buttonAdd, position: 'relative', cursor: "pointer", borderRadius: "12px",
                      minHeight: "90px", padding: "4px", borderRadius: "12px",
                      width: "270px", minHeight: "95px", backgroundColor: styles.colors.color2 + 'de',
                      overflow: 'hidden'
                    }}
                    buttonTextStyle={{
                      position: "absolute", top: "50%", left: "50%",
                      transform: 'translate(-50%, -50%)', opacity: ".77",
                      color: styles.colors.color3,
                      zIndex: 2
                    }} />
                </div>

                <div className="hover-btn">
                  <ImageButton
                    onClick={() => this.scrollTo(this.encRef, "smooth")}
                    app={app}
                    image={encounterB}
                    text={"Encounters"}
                    wrapperStyle={{
                      ...styles.buttons.buttonAdd, position: 'relative', cursor: "pointer", borderRadius: "12px",
                      minHeight: "90px", padding: "4px", borderRadius: "12px",
                      width: "270px", minHeight: "95px", backgroundColor: styles.colors.color2 + 'de',
                      overflow: 'hidden'
                    }}
                    buttonTextStyle={{
                      position: "absolute", top: "50%", left: "50%",
                      transform: 'translate(-50%, -50%)', opacity: ".77",
                      color: styles.colors.color3,
                      zIndex: 2
                    }} /></div>

                <div className="hover-btn">
                  <ImageButton onClick={() => this.scrollTo(this.galRef, "smooth")}
                    app={app}
                    image={galleryB}
                    text={"Gallery"}
                    wrapperStyle={{
                      ...styles.buttons.buttonAdd, position: 'relative', cursor: "pointer", borderRadius: "12px",
                      minHeight: "90px", padding: "4px", borderRadius: "12px",
                      width: "270px", minHeight: "95px", backgroundColor: styles.colors.color2 + 'de',
                      overflow: 'hidden'
                    }}
                    buttonTextStyle={{
                      position: "absolute", top: "50%", left: "50%",
                      transform: 'translate(-50%, -50%)', opacity: ".77",
                      color: styles.colors.color3,
                      zIndex: 2
                    }} /></div>


              </div>)
            }



            {state.currentLore === undefined &&
              <div style={{ color: styles.colors.color3 + "f5", fontSize: styles.fonts.fontSmall, marginTop: "22px", marginBottom: "22px" }}>
                {/* {this.state.obj.getJson().title}  */}
                Lore:
                <ParentFormComponent app={app} name="description" obj={this.state.obj}
                  theme={"adventureLog"}
                  rows={5}
                  prepareRun={true}

                  inputStyle={{
                    maxWidth: "100%", padding: "2px 5px", color: styles.colors.colorWhite, height: "fit-content",
                    borderRadius: "4px", background: styles.colors.colorWhite + "00",
                    border: "solid 1px " + styles.colors.colorWhite + "22", fontSize: styles.fonts.fontSmall
                  }}
                  type={"quill"} onPaste={this.handlePaste} connectLore={true}
                  wrapperStyle={{
                    margin: "5px", color: styles.colors.colorWhite, display: "flex",
                    flexDirection: "column", justifyItems: "space-between"
                  }} />
              </div>}


            {state.currentLore !== undefined ? (<div style={{ minWidth: "100%", height: "100%" }}>
              <LoreViewer app={app} type="card" _id={this.state.obj.getJson()._id} />
            </div>) : (
              <>
                <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "fit-content", padding: ".75%", justifyContent: "space-between", }}>

                  {/* {state.componentList.getComponent("map",topLore?.getJson()._id, "loreId") &&<div style={{...styles.buttons.buttonAdd, color:'red', width:"fit-content",
          marginBottom:"8px", alignSelf:"flex-end"}}  onClick={async ()=>{
   
    let map = state.componentList.getComponent("map",topLore.getJson()._id, "loreId")
    state.opps.clearUpdater();
  await state.opps.cleanPrepareRun({del:map});
  this.setState({update:true})
 }}>Delete Map</div>} */}
                  <Worldbuilder app={app} type="card" dispatch={() => { this.setState({ update: false }) }} update={this.state.update} topLore={topLore} />
                </div>
                <div ref={this.loreRef} />
                <LoreSearch app={app} type="card" options={{ tabType: "bigCardBorderless", cardType: undefined }}
                />
                <hr></hr>
                <div style={{ minHeight: "324px", }}>
                  <div
                    style={{
                      display: "flex", justifyContent: "", width: "100%", flexDirection: "column",
                      color: styles.colors.color4
                    }}>
                    <div style={{ display: "flex", width: "100%", justifyContent: "flex-start", }}> Encounters

                    </div>

                    <div style={{
                      display: "flex", flexDirection: "row", justifyItems: "center", width: "fit-content", marginTop: "11px",
                    }}>

                      <Link to={"/encountermanager/" + this.state.obj?.getJson()._id}
                        className="hover-btn" style={{
                          ...styles.buttons.buttonAdd, marginTop: "5px", backgroundColor: styles.colors.colorBlack + "99",
                          paddingLeft: "29px", paddingRight: "29px", alignSelf: "flex-start", justifyItems: "center", height: "36px",
                          borderRadius: "9px", fontSize: "21px",
                        }}>
                        Manage Encounters
                      </Link></div>
                  </div>

                  <div ref={this.encRef} />
                  <div style={{ marginBottom: "18px" }}>
                    <MapComponent  app={app} name={"encounter"} cells={[{ custom: EncounterMapItem, props: { app: app } },]}
                      filter={{ search: this.state.obj?.getJson()._id, attribute: "campaignId" }}
                      theme={"selectByImageSmall"} filterFunc={(comp)=>{return !comp.getJson().name.includes("Copy of")}}
                    />
                  </div></div>

                <hr></hr>
                <div style={{ display: "flex", flexDirection: "column", width: "100%", padding: ".75%", justifyContent: "space-between", }}>
                  <div ref={this.galRef} />
                  <div
                    style={{ display: "flex", cursor: "pointer", background: "", border: "", cursor: "", color: styles.colors.color4, flexDirection: "column" }}>
                    Gallery
                    <div style={{ display: "flex", justifyContent: "center", justifyItems: "center", marginTop: "8px", }}>


                      <GalleryViewer app={app} type="card" options={{ tabType: "bigCardBorderless", cardType: undefined }}
                      />
                    </div>
                  </div>
                </div>


              </>)}
          </div>

        ) : (<div style={{ background: styles.colors.color2, zIndex: 55000, width: "100vw", height: "100vh", position: "absolute", left: "0px", top: "0px" }}>
          <SplashScreen
            options={{ cardType: "bigCardBorderless" }} app={app}
            containerStyle={{ background: styles.colors.color2, zIndex: 55000, }}

          />
        </div>)}
        <URLcheck onChange={async () => {

          await this.setState({ start: false });

          this.componentDidMount();
          // this.setState({start:true})
        }} />
        {/* <div onClick={()=>{auth.deleteAllConditoins(state.componentList, state.user.getJson().email);}} style={{color:"wheat"}}>del conditions</div> */}
        <LinkStateChecker dispatch={(obj) => { this.setState(obj) }} />
      </div>
    )
  }
}

