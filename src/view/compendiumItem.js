import React, { Component } from 'react';
import "../App.css"
import AddCampaign from './AddCampaign';
import { MapComponent, SearchMapComponent } from '../mapTech/mapComponentInterface';
import { Link } from 'react-router-dom';
// https://www.npmjs.com/package/react-lazyload;
import placeholder from '../pics/placeholderEncounter.JPG';
import backarrow from '../pics/backArrow.webp';
import ParentFormComponent from '../componentListNPM/componentForms/parentFormComponent';
import auth from '../services/auth';
import toolService from '../services/toolService';
import { URLcheck } from './campaignEditorURLCheck';
import { LinkStateChecker } from './linkStateChecker';
import SplashScreen from './pages/splashScreen';
import Upload from './upload';
import SortCompItem from './sortCompItem';
import searchPng from '../pics/search.png';
import sortLines from '../pics/sortNone.png';
import leftArr from '../pics/fullLeftArrow.png';
import circ from '../pics/openCircleGrey.png';




export default class CompendiumItem extends Component {
  constructor(props) {
    super(props);
    this.startRef = React.createRef();
    this.delLoreForce = this.delLoreForce.bind(this);
    this.getPrevNextIds = this.getPrevNextIds.bind(this);
    this.state = {
      obj: undefined,
      pic: undefined,
      showList: true,
      start: false,
      splash: true,
      update: false,
      reverse: true,
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

    if (!component) {
      component = await auth.firebaseGetter(id, state.componentList, "_id", "compendium",)
      component = component[0]

    }


    if (component) {

      this.setState({ obj: component, start: true, showList: true, });
      dispatch({ currentCampaign: component })

    }
    this.scrollTo(this.startRef, "smooth")

    // await state.componentList.sortSelectedList("lore", "attr1Value");
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
      window.history.pushState({}, "Compendium", "/compendium/" + campaignId);
    } else {
      window.history.pushState({}, "Compendium", "/compendium/" + campaignId + "-" + pId);
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

  getPrevNextIds(idArray, currentLore, componentList) {

    if (!currentLore || !idArray || !idArray.length) {
      return { prevId: null, nextId: null, prevLore: null, nextLore: null };
    }

    const currentId = currentLore.getJson()._id;
    const index = idArray.indexOf(currentId);


    if (index === -1) {
      return { prevId: null, nextId: null, prevLore: null, nextLore: null };
    }

    const length = idArray.length;
    // Circular logic
    const prevIndex = index === 0 ? length - 1 : index - 1;
    const nextIndex = index === length - 1 ? 0 : index + 1;

    // The previous & next IDs
    const prevId = idArray[prevIndex];
    const nextId = idArray[nextIndex];

    // Try to fetch the corresponding lore components
    const prevLore = prevId ? componentList.getComponent("lore", prevId, "_id") : null;
    const nextLore = nextId ? componentList.getComponent("lore", nextId, "_id") : null;

    return { prevId, nextId, prevLore, nextLore };
  }


  render() {
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let styles = state.styles;
    let id = this.getId();
    const attrKeys = ["attr1", "attr2", "attr3", "attr4", "attr5"];


    const { prevId, nextId, prevLore, nextLore } = this.getPrevNextIds(
      app.state.idArray,
      state?.currentLore,
      state.componentList,
    );

    let prevStats = prevLore ? prevLore?.getJson().name + "   -   " + state?.currentCampaign.getJson()?.attr1 + " " + prevLore?.getJson().attr1Value : "";
    let nextStats = nextLore ? nextLore?.getJson().name + "   -   " + state?.currentCampaign.getJson()?.attr1 + " " + nextLore?.getJson().attr1Value : "";

    function truncateName(name) {
      if (!name) return "";
      if (name.length <= 24) return name;
      return name.slice(0, 24) + "...";
    }

    let prevName = truncateName(prevLore?.getJson().name);
    let nextName = truncateName(nextLore?.getJson().name);



    function arraysAreEqual(a, b) {
      if (a.length !== b.length) return false;
      for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
      }
      return true;
    }

    function parseCR(valueRaw) {
      // If it's directly parseable as a number (e.g., "2", "5.5"), use that
      let num = Number(valueRaw);
      if (!Number.isNaN(num)) {
        return num;
      }

      // Otherwise, check if it's of form "x/y" for a fraction
      if (typeof valueRaw === 'string' && valueRaw.includes('/')) {
        let [numStr, denStr] = valueRaw.split('/');
        let numerator = Number(numStr);
        let denominator = Number(denStr);

        if (!Number.isNaN(numerator) && !Number.isNaN(denominator) && denominator !== 0) {
          return numerator / denominator;
        }
      }

      return NaN;
    }

    return (

      <div style={{ display: "flex", flexDirection: "row", maxWidth: "100%", }}>

        {this.state.start ? (
          <div
            // className='hide-on-print' 
            // ISAAC COME BACK TO THIS IDEA
            style={{
              display: "flex", flexDirection: "column",
              width: "100%", minWidth: "fit-content", height: "100%",
            }}>
            <div ref={this.startRef} />

            {/* BACK BUTTON */}
            {(state.popUpSwitchcase !== "updateCompendium" && state.currentLore === undefined) &&
              (<Link className="hover-btn-highlight hide-on-print" draggable="false"
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
              (
                <div className="hide-on-print" style={{ marginTop: "2px", display: "flex", justifyContent: "space-between", alignItems: "center", userSelect: "none" }}>
                  <Link className="hover-btn"
                    to={"/compendium/" + toolService.getIdFromURL(true, [0])}
                    style={{
                      ...styles.buttons.buttonAdd, textDecoration: "none", fontStyle: "italic", background: "", padding: "8px 8px",
                      color: styles.colors.color3 + "e6", boxShadow: "", fontSize: ".95rem",
                      fontWeight: "bold", letterSpacing: ".05rem", marginBottom: "10px", border: ""
                    }}
                  >
                    <img draggable="false" alt="no image" style={{ width: ".9rem", opacity: "98%", marginRight: "8px" }}
                      src={backarrow}
                    />
                    {this.state.obj?.getJson().title}
                  </Link>

                  {(prevId !== null || nextId !== null) && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: "11px",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {/* PREV ARROW & HOVER TEXT */}
                        <div className="arrow-container hover-i3" style={{ marginRight: "12px" }}>
                          <Link to={"/compendium/" + toolService.getIdFromURL(true, [0]) + "-" + prevId}>
                            <img
                              draggable="false"
                              src={leftArr}
                              title={prevStats}
                              alt={prevLore?.getJson().name}
                              className="arrow-left arrow-fade"
                              style={{ width: "80px" }}
                            />
                          </Link>
                          <div className="hover-text" style={{ fontSize: ".6rem", width: "90px", textAlign: "center" }}>
                            {prevName}
                          </div>
                        </div>

                        <img
                          draggable="false"
                          src={circ}
                          style={{ width: "18px", height: "18px", marginRight: "12px" }}
                        />

                        {/* NEXT ARROW & HOVER TEXT */}
                        <div className="arrow-container hover-i3">
                          <Link to={"/compendium/" + toolService.getIdFromURL(true, [0]) + "-" + nextId}>
                            <img
                              draggable="false"
                              src={leftArr}
                              title={nextStats}
                              alt={nextLore?.getJson().name}
                              className="arrow-right arrow-fade"
                              style={{ width: "80px", transform: "scaleX(-1)" }}
                            />
                          </Link>
                          <div className="hover-text" style={{ fontSize: ".6rem", width: "90px", textAlign: "center" }}>
                            {nextName}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                </div>)
            }




            <div style={{
              ...styles.backgroundContent, position: "relative", minWidth: "83vw",
              backgroundImage:
                'url(' + (state.currentCampaign?.getJson().picURL || state.currentLore?.getJson().picURL || placeholder) + ')'
            }}>

              <div style={{ ...styles.popupSmall, padding: "1rem", minHeight: "fit-content", width: "100%", }}>

                <div>
                  {(state.currentComponent?.getJson().type === "compendium" && state.popUpSwitchcase === "updateCompendium") &&
                    <AddCampaign app={app} />
                  }</div>

                {(state.currentLore === undefined && state.popUpSwitchcase !== "updateCompendium") &&
                  <div style={{ fontSize: styles.fonts.fontHeader2, color: styles.colors.colorWhite, width: "80%", marginBottom: "25px", }}>{this.state.obj?.getJson().title}</div>
                }



                {state.currentLore !== undefined && <div style={{ display: "flex", flexDirection: "column" }}>


                  <div className='hover-btn hide-on-print'
                    style={{
                      ...styles.buttons.buttonClose, borderRadius: "11px", fontSize: styles.fonts.fontSmall,
                      padding: "4px 10px", pointer: "cursor", color: styles.colors.color5,
                      height: "fit-content", zIndex: "200", alignSelf: "flex-end",
                      background: styles.colors.colorBlack + "5b", marginTop: "24px", marginBottom: "40px"
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
                    prepareRun={true}
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



            {state.currentLore !== undefined && <div>
              <div style={{ display: "flex", flexDirection: "row", marginTop: "24px", marginBottom: "35px" }}>
                <div style={{ display: "flex", flexDirection: "column", width: "44%", marginTop: "10px" }}>
                  {attrKeys.map((attr) => {
                    if (state.currentCampaign?.getJson()[attr])
                      return (
                        <ParentFormComponent
                          key={attr}
                          prepareRun={true}
                          app={app} obj={state.currentLore}
                          name={`${attr}Value`}
                          label={state.currentCampaign?.getJson()[attr]}
                          checkUser={true}
                          wrapperStyle={{
                            margin: "5px",
                            color: styles.colors.colorWhite,
                            display: "flex",
                            flexDirection: "column",
                          }}
                          theme={"adventureLog"}
                          rows={1}
                          labelStyle={{ marginBottom: "11px", fontSize: "1.4rem", color: styles.colors.color8 }}
                          inputStyle={{
                            width: "89%", marginLeft: "9px",
                            padding: "4px 9px", fontSize: "1.2rem",
                            color: styles.colors.colorWhite,
                            height: "1.7rem",
                            rows: "1",
                            borderRadius: "4px",
                            background: styles.colors.colorWhite + "11",
                            borderWidth: "0px",
                          }}
                        />
                      ); return null;
                  })
                  }

                  {state.currentCampaign?.getJson().format === "Statblock 5e" &&
                    <div style={{
                      display: "flex", flexDirection: "row", marginTop: "24px", backgroundColor: styles.colors.color9 + "0a",
                      padding: "10px", borderRadius: "12px", borderBottomLeftRadius: "0", borderBottomRightRadius: "0", width: "90%",
                    }}>
                      <ParentFormComponent
                        key={"initiativeBonus"}
                        prepareRun={true} obj={state.currentLore}
                        app={app}
                        name="initiativeBonus"
                        label={"Initiative Bonus"}
                        checkUser={true}
                        wrapperStyle={{
                          margin: "5px",
                          color: styles.colors.colorWhite,
                          display: "flex",
                          flexDirection: "column",
                        }}
                        theme={"adventureLog"}
                        rows={1}

                        labelStyle={{ marginBottom: "11px", fontSize: "1.2rem", color: styles.colors.color4 }}
                        inputStyle={{
                          width: "60%", marginLeft: "9px",
                          padding: "4px 9px", fontSize: "1.2rem",
                          color: styles.colors.colorWhite,
                          height: "1.7rem",
                          rows: "1",
                          borderRadius: "4px",
                          background: styles.colors.colorWhite + "11",
                          borderWidth: "0px",
                        }}
                      />
                      <ParentFormComponent
                        prepareRun={true}
                        key={"armor"} obj={state.currentLore}
                        app={app}
                        name="armor"
                        label={"Armor Class"}
                        checkUser={true}
                        wrapperStyle={{
                          margin: "5px",
                          color: styles.colors.colorWhite,
                          display: "flex",
                          flexDirection: "column",
                        }}
                        theme={"adventureLog"}
                        rows={1}

                        labelStyle={{ marginBottom: "11px", fontSize: "1.2rem", color: styles.colors.color4 }}
                        inputStyle={{
                          width: "60%", marginLeft: "9px",
                          padding: "4px 9px", fontSize: "1.2rem",
                          color: styles.colors.colorWhite,
                          height: "1.7rem",
                          rows: "1",
                          borderRadius: "4px",
                          background: styles.colors.colorWhite + "11",
                          borderWidth: "0px",
                        }}
                      />
                      <ParentFormComponent
                        key={"hitPoints"}
                        prepareRun={true}
                        app={app} obj={state.currentLore}
                        name="hitPoints"
                        label={"HP"}
                        checkUser={true}
                        wrapperStyle={{
                          margin: "5px",
                          color: styles.colors.colorWhite,
                          display: "flex",
                          flexDirection: "column",
                        }}
                        theme={"adventureLog"}
                        rows={1}

                        labelStyle={{ marginBottom: "11px", fontSize: "1.2rem", color: styles.colors.color4 }}
                        inputStyle={{
                          width: "60%", marginLeft: "9px",
                          padding: "4px 9px", fontSize: "1.2rem",
                          color: styles.colors.colorWhite,
                          height: "1.7rem",
                          rows: "1",
                          borderRadius: "4px",
                          background: styles.colors.colorWhite + "11",
                          borderWidth: "0px",
                        }}
                      />
                    </div>

                  }
                  {state.currentCampaign?.getJson().format === "Statblock 5e" &&
                    <div style={{
                      backgroundColor: styles.colors.color9 + "0a", width: "90%",
                      padding: "12px", borderRadius: "12px", borderTopLeftRadius: "0", borderTopRightRadius: "0"
                    }}>
                      <ParentFormComponent
                        prepareRun={true}
                        app={app} obj={state.currentLore}
                        name="statBlockLink"
                        label={'Link to Statblock'}
                        checkUser={true}
                        wrapperStyle={{
                          margin: "5px",
                          color: styles.colors.colorWhite,
                          display: "flex",
                          flexDirection: "column",
                        }}
                        theme={"adventureLog"}
                        rows={1}

                        labelStyle={{ marginBottom: "11px", fontSize: "1.4rem", color: styles.colors.color8 }}
                        inputStyle={{
                          width: "88%", marginLeft: "9px",
                          padding: "4px 9px", fontSize: "1.2rem",
                          color: styles.colors.colorWhite,
                          height: "1.7rem",
                          rows: "1",
                          borderRadius: "4px",
                          background: styles.colors.colorWhite + "11",
                          borderWidth: "0px",
                        }}
                      />
                    </div>}
                  {state.currentLore &&
                    <div style={{ margin: "5px", marginTop: "18px", width: "fit-content", height: "fit-content", display: "flex", alignSelf: "flex-end", marginRight: "8%" }}>
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
                    </div>}

                </div>

                <img alt="no image" src={state.currentLore?.getJson()?.picURL}
                  style={{ maxWidth: "55%", maxHeight: state.currentCampaign?.getJson().format === "Statblock 5e"?"700px":"504px", borderRadius: "11px", objectFit: "scale-down", marginLeft: "1%", marginTop: "21px" }} />

              </div>




              <ParentFormComponent app={app} name="desc" obj={state.currentLore}
                theme={"adventureLog"}
                prepareRun={true} connectLore={false}
                wrapperStyle={{ width: "99.81%", marginRight: "11px", maxWidth: "99.81%" }}
                type={"quill"} checkUser={true} onPaste={this.handlePaste}
              /></div>
            }



            {state.currentLore === undefined && <>
              <div
                title={"New Item, opens in a new Tab"}

                className="hover-btn" style={{
                  ...styles.buttons.buttonAdd, marginTop: "26px", backgroundColor: styles.colors.colorBlack + "99",
                  paddingLeft: "29px", paddingRight: "29px", alignSelf: "flex-start", justifyItems: "center", height: "36px",
                  borderRadius: "9px", fontSize: "21px", cursor: "pointer", minWidth: "138px", marginRight: "21px", padding: "22px 29px",
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
              >+ Compendium Item</div>


              <div style={{
                display: "flex", flexDirection: "row", marginBottom: "22px",
                // position: "sticky", top: 20, background:"#101114",
                paddingTop: "29px", justifyContent: "space-evenly", zIndex: state.popupSwitch ? "" : 9999,
              }}>

                <SearchMapComponent app={app} attribute="componentFliter" imgLeft={searchPng} imgLeftStyle={{ width: "1rem", height: "1rem", marginLeft: "-.5rem", marginTop: window.innerWidth > 700 ? ".5rem" : ".32rem", }}
                  style={{
                    borderRadius: "50px", background: "#ffdead05", width: "52vw", color: "white", border: "1px solid gray",
                    height: window.innerWidth > 700 ? "2rem" : "1.7rem",
                    fontSize: window.innerWidth > 700 ? "1.2rem" : ".9rem",
                    paddingLeft: window.innerWidth > 700 ? "50px" : "52px", paddingRight: "1rem", marginRight: window.innerWidth > 700 ? "29px" : "-20px"
                  }}
                  onTextChange={(e) => {
                    let { name, value } = e.target
                    dispatch({ [name]: value })
                  }} />

                {/* Sort Ascending Descending */}
                <div style={{ display: "flex", flexDirection: "row", maxWidth: "200px", width: "100%", justifyContent: "center", verticalAlign: "center", marginTop: "-8px" }}>

                  <SortCompItem
                    app={app} text={state.currentCampaign.getJson().attr1} text2="A-Z" reverse={this.state.reverse}
                    hasImg={false}
                    textStyle={{ fontSize: "1.15rem", fontWeight: "600", height: "fit-content", width: "fit-content", color: styles.colors.colorWhite }} />


                  <div className="hover-img" style={{ marginLeft: "12px", cursor: "pointer", borderRadius: "11px", padding: "6px 9px" }}
                    title={"Ascending or descending"}
                    onClick={() => {
                      this.setState({ reverse: !this.state.reverse });
                    }}>

                    <img src={sortLines} style={{
                      transform: this.state.reverse ? "none" : "scaleY(-1)", filter: "saturate(.8) hue-rotate(160deg)",
                      width: "30px", marginTop: "2px", marginLeft: "22px"
                    }} />

                  </div>
                </div>

              </div>

            </>}

            <MapComponent reverse={this.state.reverse} app={app} name="lore" theme="compendiumRow"
              filters={[
                { type: "textObject", attribute: "parentId", search: id },
                { type: "bool", attribute: "topLevel", search: false },
                {
                  type: "textAttributeList", attributeList: ["name", "attr1Value", "attr2Value", "attr3Value", "attr4Value", "attr5Value", "desc"], search: state.componentFliter,
                  callBackFilterFunc: (list) => {
                    list = list.sort(function (a, b) {
                      // 1) Parse each value using parseCR
                      let aVal = parseCR(a.getJson()[state.sortText === "A-Z" ? "name" : "attr1Value"]);
                      let bVal = parseCR(b.getJson()[state.sortText === "A-Z" ? "name" : "attr1Value"]);

                      // 2) If both are numbers, compare numerically
                      let bothAreNumbers = !Number.isNaN(aVal) && !Number.isNaN(bVal);
                      if (bothAreNumbers) {
                        // For descending order, do bVal - aVal
                        return bVal - aVal;
                      }

                      // 3) Otherwise, fallback to string comparison of the raw fields
                      let aString = '' + a.getJson()[state.sortText === "A-Z" ? "name" : "attr1Value"];
                      let bString = '' + b.getJson()[state.sortText === "A-Z" ? "name" : "attr1Value"];
                      return bString.localeCompare(aString);
                    });

                    const idArray = list.map(item => item.getJson()._id);
                    if (!state.currentLore && list.length > 0) {
                      let oldIds = state.idArray || [];
                      if (!arraysAreEqual(idArray, oldIds)) {
                        dispatch({ idArray });
                      }
                    }
                    return list;
                  }
                }
              ]}

              cells={[
                {
                  type: "img", class: "Img-Midsize", placeholder: state.currentCampaign?.getJson().picURL,
                  hasLink: true, to: "/compendium/", linkClass: "CR-Link", exactIdFunc: (obj) => {
                    let str = obj.getJson().campaignId + "-" + obj.getJson()._id;
                    return str
                  }
                },
                {
                  type: "attribute", name: "name", class: "Bold-Title CR-Attribute-Item",

                },

                {
                  type: "attribute",

                  name: "attr1Value",

                  preText: state.currentCampaign?.getJson()?.attr1 + " ",

                  class: "CR-Attribute-Box",
                  preStyle: { marginRight: ".4rem", color: "#e8e6b7" }
                },

              ]} />


          </div>
        ) : (<div style={{ background: styles.colors.color2, zIndex: 55000, width: "100vw", height: "100vh", position: "absolute", left: "0px", top: "0px" }}>
          <SplashScreen
            options={{ cardType: "bigCardBorderless" }} app={app}
            containerStyle={{ background: styles.colors.color2, zIndex: 55000, }}

          />
        </div>)
        }
        <URLcheck onChange={async () => {

          await this.setState({ start: false });

          this.componentDidMount();
          // this.setState({start:true})
        }} />
        {/* <div onClick={()=>{auth.deleteAllConditoins(state.componentList, state.user.getJson().email);}} style={{color:"wheat"}}>del conditions</div> */}
        <LinkStateChecker dispatch={(obj) => { this.setState(obj) }} />
      </div >
    )
  }
}

