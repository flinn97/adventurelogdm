import React, { Component } from 'react';
import "../App.css"
import AddCampaign from './AddCampaign';
import { MapComponent } from '../mapTech/mapComponentInterface';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
// https://www.npmjs.com/package/react-lazyload;
import placeholder from '../pics/placeholderEncounter.JPG';
import backarrow from '../pics/backArrow.webp';
import ParentFormComponent from '../componentListNPM/componentForms/parentFormComponent';
import auth from '../services/auth';
import toolService from '../services/toolService';
import { URLcheck } from './campaignEditorURLCheck';
import { LinkStateChecker } from './linkStateChecker';
import SplashScreen from './pages/splashScreen';
import loreIndexService from '../services/loreIndexService';
import Upload from './upload';



export default class CompendiumItem extends Component {
  constructor(props) {
    super(props);
    this.startRef = React.createRef();
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
    let checkCampaign
    if (!campId) {
      if (id.includes('-')) {
        campId = id.split('-')[0];
      }
      else {
        checkCampaign = state.componentList.getComponent("compendium", id, "_id")
        campId = id;
        if (!checkCampaign) {
          await auth.firebaseGetter(id, state.componentList, "_id", "compendium");
          let c = state.componentList.getComponent("compendium", id, "_id")
          await dispatch({ currentCampaign: c })
        }

      }
    }



    let list = await state.componentList.getList("lore", campId, "campaignId");
    if (list.length > 0) {
      // auth.firebaseGetter(campId, state.componentList, "campaignId", "lore", dispatch);

    }
    else {
      await auth.firebaseGetter(campId, state.componentList, "campaignId", "lore", undefined, { attribute: "type", value: "condition" })

    }


    await dispatch({ currentLore: undefined })
    if (id.includes("-")) {
      let loreSplit = id.split('-');
      id = loreSplit[0];
      loreId = loreSplit[1];
      let lore = state.componentList.getComponent("lore", loreId, "_id");
      if (!lore) {
        lore = await auth.firebaseGetter(loreId, state.componentList, "_id", "lore", undefined, { attribute: "type", value: "condition" });
        lore = lore[0]
      }
      await dispatch({ currentLore: lore });
    }

    let component = this.props.app.state.componentList.getComponent("compendium", id);


    if (component) {
      this.setState({ obj: component, start: true, showList: true, });
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
  getId() {
    const path = window.location.pathname;
    const parts = path.split('/');
    const idSegment = parts.pop();
    const idParts = idSegment.split('-');

    return idParts.length > 1 ? idParts[1] : idParts[0]
  }

  render() {
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let styles = state.styles;
    let id = this.getId();

    return (
      <div style={{ display: "flex", flexDirection: "row", maxWidth: "100%", }}>

        {this.state.start ? (
          <div style={{
            display: "flex", flexDirection: "column",
            width: "100%", minWidth: "fit-content", height: "100%",
          }}>
            <div ref={this.startRef} />

            {/* BACK BUTTON */}
            {(state.popUpSwitchcase !== "updateCompendium" && state.currentLore == undefined) &&
              (<Link className="hover-btn-highlight"
                to={"/compendium"}
                style={{
                  ...styles.buttons.buttonAdd, textDecoration: "none", fontStyle: "italic", background: "", padding: "8px 8px",
                  color: styles.colors.color3 + "e6", boxShadow: "", fontSize: ".95rem",
                  fontWeight: "bold", letterSpacing: ".05rem", marginBottom: "10px", border: ""
                }}
              >
                <img style={{ width: ".9rem", opacity: "98%", marginRight: "8px" }}
                  src={backarrow}
                />
                To Compendium List
              </Link>)
              ||
              (<Link className="hover-btn"
                to={"/compendium/" + toolService.getIdFromURL(true, [0])}
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
                'url(' + (state.currentLore?.getJson().picURL || this.state.obj?.getJson().picURL || placeholder) + ')'
            }}>

              <div style={{ ...styles.popupSmall, padding: "1rem", minHeight: "fit-content", width: "100%", }}>

                <div>
                  {(state.currentComponent?.getJson().type === "compendium" && state.popUpSwitchcase === "updateCompendium") &&
                    <AddCampaign app={app} />
                  }</div>

                {(state.currentLore == undefined && state.popUpSwitchcase !== "updateCompendium") &&
                  <div style={{ fontSize: styles.fonts.fontHeader2, color: styles.colors.colorWhite, width: "80%", marginBottom: "25px", }}>{this.state.obj?.getJson().title}</div>
                }



                {state.currentLore !== undefined && <div style={{ display: "flex", flexDirection: "column" }}>
                  {/* Taylor lets get this upload and tags working alan wants a full search and sort function on this. Sort by alphabetical etc, 
                this uploader is not working, it is impermanent saves, after refresh they vanish, so I think it is just uploading blobs :(
          */}
                  <Upload app={app} text={state.currentLore.getJson().picURL ? "Replace Image" : "Upload Image"}
                    changePic={(pic) => {
                      this.setState({ pic: pic });
                      state.currentLore.setCompState({ picURL: pic, img: pic });
                      app.dispatch({})
                    }}
                    obj={state.currentLore} style={{
                      display: "flex",
                      zIndex: "1", borderRadius: ".1vmin", background: "",
                    }}
                    update={true}
                    updateMap={(obj) => { this.setState({ completedPic: state.currentLore.getJson().picURL }); }}
                  />
                  <div className='hover-btn'
                    style={{
                      ...styles.buttons.buttonClose, borderRadius: "11px", fontSize: styles.fonts.fontSmall,
                      padding: "4px 10px", pointer: "cursor", color: styles.colors.color5,
                      height: "fit-content", zIndex: "200", alignSelf: "flex-end",
                      background: styles.colors.colorBlack + "5b", marginTop: "-4px", marginBottom: "30px"
                      // backgroundColor:"white",
                    }}

                    onClick={() => {
                      if (state.user.getJson().role !== "GM") {
                        dispatch({ popupSwitch: "goPremium" });
                        return
                      }
                      //get parent lore of item to delete
                      let parentItem = Object.keys(state.currentLore.getJson().parentId)[0];
                      parentItem = state.componentList.getComponent("lore", parentItem, "_id");
                      this.deleteLore(parentItem);
                    }
                    }>
                    Delete This Item

                  </div>

                  <div
                    style={{
                      width: "fit-content", alignSelf: "flex-start", color: styles.colors.color3,
                      padding: "5px 6px", marginTop: "-22px"
                    }}>
                    {/* <div
                      style={{ fontSize: styles.fonts.fontSmall, color: styles.colors.colorWhite + "69", }}>
                      {this.state.obj?.getJson().title + ": "}{warning}

                    </div> */}
                  </div>
                  <ParentFormComponent checkUser={true} app={app} name="name" obj={state.currentLore}
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
                      borderRadius: "4px", background: styles.colors.colorBlack + "22", marginBottom: "20px",
                      border: "solid 1px " + styles.colors.colorWhite + "22", fontSize: styles.fonts.fontSubheader1
                    }}
                    wrapperStyle={{
                      margin: "1px", color: styles.colors.colorWhite, display: "flex", marginBottom: "0px",
                      flexDirection: "column", justifyItems: "space-between",
                    }} />


                </div>
                }

                {state.popUpSwitchcase !== "updateCompendium" && <>
                  <div style={{ display: "flex", alignContent: "center", position: "absolute", right: "24px", justifyContent: "space-between" }}>
                    {state.currentLore === undefined &&
                      <div className="hover-btn" style={{
                        ...styles.buttons.buttonAdd, borderRadius: "12px", width: "fit-content",
                        fontSize: styles.fonts.fontSmall, padding: "4px 9px",
                        backgroundColor: styles.colors.color1 + "ee", position: "relative", height: "fit-content",
                        justifyContent: "center"
                      }}
                        onClick={async () => {
                          await this.props.app.state.opps.clearUpdater();
                          await dispatch({ currentComponent: undefined });
                          dispatch({ operate: "update", operation: "cleanPrepare", object: this.state.obj, popUpSwitchcase: "updateCompendium" })
                        }}>
                        Edit
                      </div>}
                  </div>
                </>}
              </div>
            </div>
            {state.currentLore !== undefined &&
              <div style={{ display: "flex", flexDirection: "row", marginTop: "4px" }}>
                <ParentFormComponent app={app} name="desc" obj={state.currentLore}
                  theme={"adventureLog"}
                  wrapperStyle={{ width: "100%", marginRight: "11px", }}
                  type={"quill"} checkUser={true} onPaste={this.handlePaste}
                />

                <img src={state.currentLore?.getJson()?.picURL}
                  style={{ maxWidth: "49%", height: "fit-content", borderRadius: "11px", objectFit: "cover", marginLeft: "1%" }} />

              </div>}

            {state.currentLore == undefined &&
              <div
                title={"New Item, opens in a new Tab"}

                className="hover-btn" style={{
                  ...styles.buttons.buttonAdd, marginTop: "15px", backgroundColor: styles.colors.colorBlack + "99",
                  paddingLeft: "29px", paddingRight: "29px", alignSelf: "flex-start", justifyItems: "center", height: "36px",
                  borderRadius: "9px", fontSize: "21px", cursor: "pointer", minWidth: "138px", marginRight: "21px"
                }}
                onClick={async () => {
                  if (state.user.getJson().role !== "GM") {
                    dispatch({ popupSwitch: "goPremium" });
                    return
                  }
                  const newId = state.currentLore ? state.currentLore.getJson()._id : state.currentCampaign.getJson()._id;
                  let href = window.location.href;
                  let splitURL = href.split("/");
                  let id = splitURL[splitURL.length - 1];

                  let otherChildren = state.componentList.getList("lore", id.includes("-") ? state.currentLore.getJson()._id : state.currentCampaign?.getJson()._id, "parentId");
                  await state.opps.cleanJsonPrepare({
                    addlore: {
                      campaignId: state.currentCampaign?.getJson()._id, index: otherChildren.length,
                      parentId:
                        { [newId]: "Unnamed" }
                    }
                  });
                  let lore = await state.opps.getUpdater("add")[0]
                  dispatch({
                    popupSwitch: "popupLoreWithoutPin",
                    currentComponent: lore,
                    loreType: "compendium"

                  })

                  // dispatch({popupSwitch:'popupLore', operate:"addlore", operation:"cleanPrepare"})

                }}
              >+ Compendium Item</div>}


            <MapComponent reverse={true} app={app} name="lore" theme="compendiumRow"
              filters={[
                { type: "textObject", attribute: "parentId", search: id },
                { type: "bool", attribute: "topLevel", search: false }
              ]}
              cells={[
                // { name:"Download",  class: "DR-hover-shimmer Button-Type2", func: (obj) => { this.download(obj) } },
                {
                  type: "img", class: "Img-Midsize", hasLink: true, to: "/compendium/", linkClass: "CR-Link", exactIdFunc: (obj) => {
                    let str = obj.getJson().campaignId + "-" + obj.getJson()._id;
                    return str
                  }
                },
                {
                  type: "attribute", name: "name", class: "Bold-Title CR-Attribute-Item",

                },

              ]} />


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

