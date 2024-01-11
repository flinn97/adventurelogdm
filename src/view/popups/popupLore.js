import React, { Component } from 'react';
import "../../App.css"
import ParentFormComponent from '../../componentListNPM/componentForms/parentFormComponent';
import RunButton from '../../componentListNPM/componentForms/buttons/runButton';
import EncounterCard from '../pages/encounterCard';
import AddEncounter from '../AddEncounter';
import MapComponent from '../../componentListNPM/mapTech/mapComponent';
import EncounterMapItem from '../encounterMapItem';
import backarrow from '../../pics/backArrow.webp';

import q from '../../pics/question.png';
import newWindow from '../../pics/newWindow.png';
import Upload from '../upload';
import LoreItemWithNotation from '../loreItemwithNotation';
import PostLogButton from '../../componentListNPM/componentForms/buttons/postLogButton';
import { Link } from 'react-router-dom';
import IconChange from '../iconChange';
import loreIndexService from '../../services/loreIndexService';
import idService from '../../componentListNPM/idService';

export default class PopupLore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refrence: false,

    }
  }



  render() {
    let app = { ...this.props.app };
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles = state.styles;


    if (this.props.theme) {
      if (Object.prototype.toString.call(this.props.theme) === "[object String]") {
        styles = state.themeFactory.getThemeFactory()[this.props.theme];
      }
      else {
        styles = this.props.theme;
      }
    }
    app.state.styles = styles

    //********CARD ASSIGN********/

    let cards = {

      card: <Card app={{ ...app, state: { ...app.state, styles: styles } }} options={this.props.options} type={this.props.type} />,
      cardWithTab: <CardWithTab app={{ ...app, state: { ...app.state, styles: styles } }} options={this.props.options} type={this.props.type} />,
      popup: <Popup app={{ ...app, state: { ...app.state, styles: styles } }} handleClose={this.props.handleClose} options={this.props.options} type={this.props.type} delClick={this.props.delClick} />,
      popupWithTab: <PopupWithTab app={{ ...app, state: { ...app.state, styles: styles } }} handleClose={this.props.handleClose} options={this.props.options} type={this.props.type} delClick={this.props.delClick} />
      //popupType={this.props.popupType} popupTab={this.props.popupTab}

    }

    //*********CARD ASSIGN********/

    return (
      <div >

        {cards[this.props.type ? this.props.type : "card"]}
      </div>

    )
  }
}



//********CONTENTS********/
class MainContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddEncounter: false,
      showFindEncounter: false,
      showFindImage: false,
      showSaved: false,
      searchTerm: "",
      imagesToShow: 5,
      hasChoice: "",
      start: false,
      showIcon: false,
      loreToShow: 6,
    };
    this.moveLore = this.moveLore.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.linkLore = this.linkLore.bind(this);
  }

  handleSearchChange = (e) => {
    this.setState({ searchTerm: e.target.value });
  }

  async copyLore(lore) {
    let app = this.props.app;
    let state = app.state;
    let newId = idService.createId();
    let loreJson = { ...lore.getJson(), _id: newId };

    if (lore !== state.currentPin) {
      await state.opps.cleanJsonPrepareRun({ addlore: loreJson, });
    }

    if (state.currentPin) {
      await state.opps.cleanJsonPrepareRun({
        "addpin": {
          ...state.currentPin.getJson(), loreId: newId, x: 80, y: 110 + this.state.imagesToShow,
        },
      })
    }
  }

  async linkLore(item, l, lore, pin) {
    //debugger
    let app = this.props.app;
    let state = app.state;
    let componentList = state.componentList;
    let firstReference = false;
    if (l.getJson()._id !== Object.keys(item.getJson().parentId)[0]) {
      let checkList = componentList.getList("lore", l.getJson()._id, "parentId");
      let findFirstRef = checkList.find(obj => obj.getJson().ogId === item.getJson()._id);
      if (!findFirstRef) {
        firstReference = true;
      }
    }

    let loreJson = { ...item.getJson(), ...lore.getJson(), name: item.getJson().name, reference: true, firstReference: firstReference, ogId: item.getJson()._id, parentId: { [l.getJson()._id]: l.getJson().name ? l.getJson().name : l.getJson().title } }
    await lore.setCompState({ ...loreJson });

    if (pin) {

      let loreName = lore.getJson().name
      await pin.setCompState({
        name: loreName,
        loreId: lore.getJson()._id,
        referencePin: true,
      });

    }
    await state.opps.cleanPrepareRun({ addlore: lore, update: pin });
  }

  async moveLore(item) {

    let app = this.props.app;
    let state = app.state;
    let componentList = state.componentList;

    await state.opps.clearUpdater();
    let lore = state.currentLore;
    if (!lore) {
      lore = state.currentCampaign
    }
    if (lore.getJson().reference) {
      lore = componentList.getComponent('lore', lore.getJson().ogId, "_id");

    }

    let id = lore.getJson()._id;
    await item.setCompState({ parentId: {} });
    await item.updateObjInsideJson("parentId", { [id]: lore.getJson().name ? lore.getJson().name : lore.getJson().title });


    let href = window.location.href;
    let splitURL = href.split("/");
    let splitid = splitURL[splitURL.length - 1];

    let otherChildren = state.componentList.getList("lore", splitid.includes("-") ? state.currentLore.getJson()._id : state.currentCampaign?.getJson()._id, "parentId");
    let index = otherChildren.length;
    await lore.setCompState({ index: index })
    let pin = state.currentPin;
    let oldPins = componentList.getList("pin", item.getJson()._id, "loreId")

    if (state.currentPin) {

      let loreName = item.getJson().name
      await pin.setCompState({
        name: loreName,
        loreId: item.getJson()._id,
      });

    }

    let updateList = pin ? [item, pin] : [item]


    await state.opps.prepareRun({ update: updateList, del: oldPins });
    // let oldPin = componentList.getComponent("pin", item.getJson()._id, "loreId");
    // if (oldPin) {
    //   state.opps.cleanPrepareRun({ del: oldPin })
    // }
  }

  async componentDidMount() {

    let state = this.props.app.state;

    let loreName = await state.currentComponent.getJson().name;

    if (state.currentComponent.getJson().reference) {
      let lore = await state.componentList.getComponent('lore', state.currentComponent.getJson().ogId, "_id");

      await this.props.app.dispatch({ currentComponent: lore })
      await state.opps.cleanPrepare({ update: lore })
    }


    this.setState({ start: true })
    if (loreName == "" || loreName == undefined) {
      this.setState({ hasChoice: "" })
    } else {
      this.setState({ hasChoice: "New" })
    }
  }

  render() {
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles = state.styles;
    let href = window.location.href;
    let splitURL = href.split("/");
    let id = splitURL[splitURL.length - 1];
    let newLink = "";
    let refid = state.currentComponent.getJson().reference ? state.currentComponent.getJson().ogId : state.currentComponent.getJson()._id;
    let imageList = state.componentList.getList("image", refid, "loreId");

    let idList = id.split('-');

    let lore = state.currentComponent;
    if (lore.getJson().reference) {
      lore = componentList.getComponent('lore', lore.getJson().ogId, "_id");

    }

    let placeholder = state.currentPin?.getJson().name;
    let loreId = lore.getJson()._id

    let pin = state.currentPin;

    if (id.includes("-")) {
      let newArr = [...splitURL];
      newArr.pop()

      let str = newArr.join(',');
      str = str.replace(/,/g, '/');

      let newId = idList[0] + "-" + loreId
      newLink = str + "/" + newId;

    }
    else {
      newLink = href + "-" + loreId;
    };

    const quote = <div style={{ color: styles.colors.color8 + "d5", fontSize: styles.fonts.fontSmall, opacity: ".5", width: "1%" }}>
      "</div>;


    const filteredList = componentList.getList("encounter", idList[0], "campaignId")
      .filter(encounter => {
        const name = encounter?.getJson()?.name || "";
        return name.toLowerCase().includes(this.state.searchTerm.toLowerCase());
      })
      .sort((a, b) => {
        const nameA = a?.getJson()?.name || "";
        const nameB = b?.getJson()?.name || "";
        return nameA.localeCompare(nameB);
      });


      let pageLore = componentList.getList("lore", state.currentLore? state.currentLore.getJson()._id: state.currentCampaign.getJson()._id, 'parentId');
    let filteredLore = componentList.getList("lore", idList[0], "campaignId").filter(l => !pageLore.includes(l));
    filteredLore = filteredLore.sort(function(a, b){
      //
      //THIS MIGHT MAKE ORDER SWITCHING WEIRD
      let aD = a.getJson().date||a.getJson().date!==""?a.getJson().date?.seconds: new Date(0);
      let bD = b.getJson().date||b.getJson().date!==""?b.getJson().date?.seconds: new Date(0);
      return aD - bD;});
      filteredLore=[...pageLore, ...filteredLore].filter(item => {
        const name = item?.getJson()?.name;
        return  name.toLowerCase().includes(this.state.searchTerm.toLowerCase());
      }).sort((a, b) => {
        const nameA = a?.getJson()?.name;
        const nameB = b?.getJson()?.name;
        return nameA.localeCompare(nameB);
      });


    return (
      <div style={{
        display: "flex", width: "57vw", flexDirection: "column", height: "fit-content", alignContent: "center",

        paddingTop: "40px", fontFamily: "serif", fontSize: styles.fonts.fontSubheader1, marginBottom: "2%",
      }}>

        {/* ICON */}
        {state.popupSwitch !== "popupLoreWithoutPin" &&
          <div style={{ marginTop: "-30px", display: "flex", flexDirection: "", width: "fit-content" }}>
            {(this.state.showIcon) &&

              <div className="indent-on-click"
                onClick={() => {
                  this.setState({ showIcon: false, })
                }}
                style={{
                  ...styles.buttons.buttonAdd, textDecoration: "none", fontStyle: "italic", background: styles.colors.color7 + "aa",
                  fontWeight: "bold", letterSpacing: ".05rem", marginBottom: "2vh", padding: "2px 8px"
                }}

              >
                <img style={{ width: ".9rem", opacity: "98%", marginRight: ".75rem", }}
                  src={backarrow}
                />
                Back
              </div>}

            {/* ICON */}
            {(!this.state.showIcon) && <>
              <div title="Change icon" className='hover-img'
                style={{
                  display: "flex", flexDirection: "column", alignContent: "center", alignItems: "center", borderRadius: "11px", cursor: "pointer",
                  background: styles.colors.color8 + "04", marginBottom: "14px",
                  justifyContent: "center", border: "1px solid " + styles.colors.color8, padding: "4px 8px",
                  color: styles.colors.color3, fontSize: styles.fonts.fontSmallest,
                }} onClick={() => {
                  this.setState({ showFindEncounter: false, showFindImage: false, showIcon: true, })
                }}>
                Change

                <div title="Change icon" className='hover-btn'
                  onClick={() => {
                    this.setState({ showFindEncounter: false, showFindImage: false, showIcon: true, })
                  }}
                  style={{ borderRadius: "50%", marginTop: "6px", background: pin?.getJson().colorOverlay, width: "39px", height: "39px", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                  <div style={{
                    borderRadius: "50%", width: "36px", background: styles.colors.color1, height: "36px", display: "flex", marginTop: ".5px",
                    flexDirection: "row", justifyContent: "center", alignItems: "center"
                  }}>
                    <img src={pin?.getJson().iconImage}

                      style={{
                        margin: "2px", height: '32px', filter: pin?.getJson().colorFilter ? pin?.getJson().colorFilter : "",
                        width: "32px", position: "relative", cursor: "pointer", marginTop: "1px",
                        borderRadius: "50%"
                      }} /></div> </div>
              </div>
            </>}

            {(this.state.showIcon) && <>
              <IconChange app={app} pin={pin} />
            </>}
          </div>}

        {(this.state.start && !this.state.showIcon) && <>

          {this.state.hasChoice === "New" &&
            <div style={{
              display: "flex", width: "57vw", flexDirection: "column", height: "fit-content", alignContent: "center",

              paddingTop: "40px", fontFamily: "serif", fontSize: styles.fonts.fontSubheader1, marginBottom: "2%",
            }}>
              {(this.state.showFindEncounter || this.state.showFindImage) &&
                <div className="indent-on-click"
                  onClick={() => {
                    this.setState({ showFindEncounter: false, showFindImage: false })
                  }}
                  style={{
                    ...styles.buttons.buttonAdd, textDecoration: "none", fontStyle: "italic", background: styles.colors.color7 + "aa",
                    fontWeight: "bold", letterSpacing: ".05rem", marginBottom: "2vh", padding: "2px 8px"
                  }}

                >
                  <img style={{ width: ".9rem", opacity: "98%", marginRight: ".75rem" }}
                    src={backarrow}
                  />
                  Back
                </div>}
              {/* IMAGE TOKEN */}
              <div style={{ backgroundImage: `url(.${state.currentPin?.getJson().picURL})`, width: "44px", height: "44px", position: "absolute", top: 11, left: 11 }}></div>

              {/* OTHER STUFF */}
              {!this.state.showFindEncounter && !this.state.showFindImage &&
                <div style={{ flexDirection: "column", display: "flex", alignSelf: "center", marginTop: "-24px", }}>

                  <ParentFormComponent app={app} name="name"

                    placeholder={placeholder}
                    inputStyle={{
                      maxWidth: "55.5vw", width: "55.5vw", padding: "4px 9px", color: styles.colors.color3, height: "fit-content",
                      borderRadius: "4px", background: styles.colors.colorWhite + "00", borderWidth: "0px", height: "100%",
                      border: "solid 1px " + styles.colors.colorWhite + "22",
                      textWrap: "wrap", fontSize: styles.fonts.fontSubheader1
                    }} />


                  {(lore?.getJson().name !== "" && lore?.getJson().name !== undefined && this.state.saveClicked) &&
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: "pointer",
                      color: styles.colors.colorWhite,
                      fontSize: styles.fonts.fontSmallest,
                      marginTop: "11px",
                      textDecoration: "underline 1px",
                      textDecorationColor: "#ffdead22",
                      alignSelf: "flex-end"
                    }}
                      onClick={() =>

                        (window.open(newLink, '_blank'))

                      }
                    >
                      Open in new tab

                      <img className="indent-on-click" style={{ width: "19px", marginLeft: "8px" }} src={newWindow} />

                    </div>}

                  {(lore?.getJson().name === "" || lore?.getJson().name === undefined) &&
                    <div style={{
                      cursor: "progress",
                      color: styles.colors.colorWhite + "88", fontSize: styles.fonts.fontSmallest, marginTop: "11px", textDecorationColor: "#ffdead22", alignSelf: "flex-end"
                    }}
                    >
                    </div>}


                  <hr></hr>


                  <div style={{ color: styles.colors.color3 + "f5",  marginBottom: "32px" }}> Lore:
                    <div style={{
                      display: "flex", flexDirection: "row", alignContent: "flex-end",
                      justifyContent: "flex-end", fontSize: styles.fonts.fontNormal, color: styles.colors.color8 + "88",

                    }}>
                      <PostLogButton app={app} obj={lore} altText={"description"} val={lore.getJson().desc} />
                    </div>
                    <ParentFormComponent app={app} name="desc" obj={lore}
                      theme={"adventureLog"}
                      rows={5} linkLore={true}
                      // prepareRun={true}
                      type={"richEditor"} onPaste={this.handlePaste}
                      inputStyle={{
                        maxWidth: "100%", padding: "2px 5px", color: styles.colors.colorWhite, height: "fit-content",
                        borderRadius: "4px", background: styles.colors.colorWhite + "00",
                        border: "solid 1px " + styles.colors.colorWhite + "22", 
                      }}
                      wrapperStyle={{
                        margin: "5px", color: styles.colors.colorWhite, display: "flex", marginBottom: "1px",
                        flexDirection: "column", justifyItems: "space-between"
                      }} /></div>




                  <div
                    style={{
                      color: styles.colors.color3 + "f5", fontSize: styles.fonts.fontSmall,
                      marginTop: "12px", marginBottom: "32px"
                    }}> Handout:
                    <div style={{
                      display: "flex", flexDirection: "row", alignContent: "flex-end",
                      justifyContent: "flex-end", fontSize: styles.fonts.fontNormal, color: styles.colors.color8 + "88",

                    }}>
                      <PostLogButton app={app} obj={lore} altText={"read text"} val={lore.getJson().handoutText} forceValue={true} />
                    </div>
                    <div style={{ display: "flex", flexDirection: "row", minWidth: "100%", width: "100%", maxWidth: "100px" }}>
                      {quote} <ParentFormComponent app={app} name="handoutText" obj={lore}
                        theme={"adventureLog"}
                        rows={5}
                        // prepareRun={true}
                        type={"richEditor"} onPaste={this.handlePaste}
                        inputStyle={{
                          minWidth: "100%", padding: "2px 5px", color: styles.colors.colorWhite + "d9", height: "fit-content",
                          borderRadius: "4px", background: styles.colors.colorWhite + "00",
                          border: "solid 1px " + styles.colors.colorWhite + "22", 
                        }}

                        wrapperStyle={{
                          margin: "5px", color: styles.colors.colorWhite, display: "flex", width: "99%", marginLeft: "-2px",
                          flexDirection: "column", justifyItems: "space-between"
                        }} />{quote}</div></div>
                </div>}

              <div>
                {/* ENCOUNTER */}
                {!this.state.showFindEncounter && !this.state.showFindImage && <div> <hr></hr>
                  <div style={{ marginTop: "-18px", color: styles.colors.colorWhite + "77", fontSize: styles.fonts.fontSmall, }}>Encounters</div>

                  <div style={{ marginTop: "2vh", marginBottom: "1vh", }}>
                    <MapComponent app={app} name={"encounter"} cells={[{ custom: EncounterMapItem, props: { app: app } }]}
                      filter={{ search: state.currentComponent.getJson()._id, attribute: "loreId" }}
                      theme={"selectByImageSmall"}
                    />

                  </div>
                </div>}


                {!this.state.showFindEncounter && !this.state.showFindImage &&
                  <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>

                    {/* ///MINI EDITOR */}

                    <div className="indent-on-click" style={{
                      ...styles.buttons.buttonAdd, fontSize: styles.fonts.fontSmall, marginBottom: "2vh",
                      marginTop: "1vh", alignSelf: "center", padding: "1%"
                    }}
                      title="Find an existing encounter to add to this lore.
            This will create a COPY."
                      onClick={() => {
                        this.setState({ showFindEncounter: true })
                      }}>
                      Find Encounter
                    </div>
                  </div>}

                {/* { this.state.showAddEncounter &&
            <AddEncounter app={app} />
          } */}
              </div>

              {!this.state.showFindEncounter && !this.state.showFindImage &&
                <div>
                  <hr></hr>
                  <div style={{ marginTop: "-18px", color: styles.colors.colorWhite + "77", fontSize: styles.fonts.fontSmall, }}>Gallery</div>
                </div>}

              {this.state.showFindEncounter &&
                <div>
                  <div style={{ display: "flex", justifyContent: "flex-end", }}>

                    <input app={app}

                      type="input"
                      placeholder={"Search..."}
                      value={this.state.searchTerm}
                      onChange={this.handleSearchChange}
                      style={{
                        backgroundColor: styles.colors.color1 + "ee",
                        color: styles.colors.colorWhite,
                        borderRadius: "11px",
                        width: "420px",
                        padding: '8px',
                        fontSize: '16px',
                      }}
                    />
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-around", marginTop: "3vh", }}>


                    {

                      filteredList.map((encounter, index) =>
                        <div

                          onClick={async () => {
                            {
                              await this.setState({ showFindEncounter: false });
                              let enc = encounter.copyEncounter(componentList, state.currentComponent.getJson()._id);
                              if (enc) {
                                state.currentComponent.assign(enc);
                              }
                            }
                          }}

                          style={{
                            color: styles.colors.colorWhite,
                            textDecoration: "none", userSelect: "none",
                            height: "fit-content", cursor: "pointer",
                            width: "fit-content"
                          }}>
                          <div style={{
                            display: "flex", flexDirection: 'column',
                            borderRadius: styles.popupSmall.borderRadius,
                            justifyContent: "space-evenly",
                            zIndex: "0",
                            height: 'fit-content',
                            width: 'fit-content',
                            backgroundImage: 'url(' + (encounter?.getJson().picURL || placeholder) + ')',
                            ...styles.backgroundContent
                          }}>

                            <div style={{
                              ...styles.popupSmall, display: "flex", flexDirection: "row", justifyContent: "space-between", flexDirection: 'column',
                              height: "fit-content",
                              width: "fit-content"
                            }}>

                              <div

                                style={{
                                  display: "flex", height: "fit-content", width: "fit-content", fontWeight: "bold", fontFamily: "serif",
                                  textDecoration: styles.colors.colorWhite + "22 underline", textDecorationThickness: "1px", textUnderlineOffset: "4px",
                                  textShadow: "1px 1px 0 " + styles.colors.colorBlack, textShadow: "-1px -1px 0 " + styles.colors.colorBlack,

                                  alignItems: "center", justifyContent: "center", fontSize: styles.fonts.fontSmallest,
                                }}>
                                {encounter?.getJson().name}
                              </div>
                            </div>
                          </div>
                        </div>

                      )}

                  </div>
                </div>}

              {/* GALLERY GALLERY  GALLERY GALLERY  GALLERY GALLERY  GALLERY GALLERY  GALLERY GALLERY */}

              {!this.state.showFindImage && !this.state.showFindEncounter &&
                <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", justifyItems: "center" }}>

                  <div className="image-grid" style={{
                    display: "flex", justifyContent: "center",
                    flexDirection: "row", justifyItems: "space-around", flexWrap: "wrap",
                  }}>
                    {
                      imageList
                        .slice(0, this.state.imagesToShow)
                        .map((img, index) => (
                          <div className="hover-img" key={index}>

                            <img
                              onClick={() => {

                                dispatch({ currentPic: img, popupSwitch: "viewPic" })
                              }}
                              draggable="false" src={img.getJson().picURL}
                              style={{
                                maxWidth: "180px", minWidth: "100px", height: "fit-content",
                                margin: "9px", cursor: "pointer", borderRadius: "10px"
                              }}
                              alt={`img-${index}`} />
                          </div>
                        ))
                    }
                    {
                      imageList.length > this.state.imagesToShow &&
                      <div className="hover-img"
                        onClick={() =>
                          this.setState(prevState => ({ imagesToShow: prevState.imagesToShow + 5 }))}
                        style={{
                          maxHeight: "150px", cursor: "pointer", textAlign: "center", padding: "8px",
                          maxWidth: "150px", display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: "24px", borderRadius: "20px", marginBottom: "3vh",
                          color: styles.colors.colorWhite, border: "" + styles.colors.colorWhite + "55 solid"
                        }}>
                        <div
                          style={{ display: "flex", position: "relative", }}>
                          +{imageList.length - this.state.imagesToShow} more
                        </div>
                        <div style={{
                          display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center',
                        }}>
                          {
                            imageList
                              .slice(this.state.imagesToShow, this.state.imagesToShow + 9)
                              .map((img, index) => (
                                <div>
                                  <img draggable="false" key={index} src={img.getJson().picURL}
                                    style={{
                                      maxWidth: "20px", margin: "2px", opacity: "40%"
                                    }}
                                    alt={``} />
                                </div>
                              ))
                          }
                        </div>
                      </div>
                    }
                  </div>


                  <div style={{ display: "flex", justifyContent: "center", flexDirection: "row", justifyItems: "center" }}>
                    <div style={{ display: "flex", justifyContent: "center", justifyItems: "center", marginTop: "8px", }}>

                      <Upload text="+ Upload"

                        prepareOnChange={{
                          name: "image", json: {
                            loreId: state.currentComponent.getJson()._id,
                            campaignId: id
                          }
                        }}


                        obj={state.currentComponent}
                        update={true} skipUpdate={true}

                        app={app}
                        className="indent-on-click"

                      />

                    </div>

                    {/* <div className="indent-on-click" 
        title="Find an existing image to add to this lore." 
        style={{...styles.buttons.buttonAdd, fontSize:styles.fonts.fontSmall,marginBottom:"2vh",
        marginTop:"1vh", alignSelf:"center", padding:"1%"}}
          onClick={() => {
            this.setState({showFindImage: true })
        }}>
          Find Image
        </div> */}

                  </div>

                  {/* <div onClick={()=>{dispatch({popupSwitch:"seeLibrary"})}} 
                  style={{...styles.buttons.buttonAdd, fontSize:styles.fonts.fontSmall,}}
                >
                  + From Library</div> */}
                </div>
              }


              <div style={{ display: 'flex', width: "100%", flexDirection: "row", position: "relative", marginTop: "70px", marginBottom: "30px" }}>

                <div className="hover-btn"
                  title='Deletes the Lore, all Referenced Lore, and the Pin!'
                  style={{

                    display: "flex", width: "210px", background: styles.colors.color6, borderRadius: '3vh', fontSize:styles.fonts.fontSmallest,
                    alignSelf: "flex-end", alignItems: "center",  marginRight:"22px", border:"1px solid white", paddingTop:"5px",paddingBottom:"5px",
                    marginTop: "8.24vh", marginBottom: "1vh", color:"white", justifyContent:"center", cursor:"pointer"
                  }} onClick={async ()=>{       

                    //current pin
                    let pin = state.currentPin;
                    //if current pin exists and is a reference pin go get the reference lore obj. else just user the currentComponent lore
                    lore = pin?.getJson().referencePin ? componentList.getComponent("lore", lore.getJson()._id, "ogId") : lore;
                    //essentially get a list of all the reference lore items. It will return empty if the lore object is a reference item.
                    let referenceList = componentList.getList("lore", lore.getJson()._id, "ogId");
                    let pins = [];
                    //For every lore in the reference list go get the pin that is
                    for (let l of referenceList) {
                      let p = componentList.getComponent("pin", l.getJson()._id, "loreId");
                      if (p) {
                        pins.push(p);

                      }
                    }
                    let delList = [lore, pin, ...referenceList, ...pins];
                    delList = delList.filter(comp => comp !== undefined);
                    await state.opps.cleanPrepareRun({ del: delList });


                    // }}>Delete {state.currentPin?.getJson().referencePin? "Reference":"Lore"} Pin</div>
                  }}>Delete All Connected Lore</div>

                <div className="hover-btn"
                  title='Deletes the Pin'
                  style={{
                    display: "flex", width: "210px", background: styles.colors.color6, borderRadius: '3vh', fontSize: styles.fonts.fontNormal,
                    alignSelf: "flex-end", alignItems: "center", marginRight: "22px", border: "1px solid white",
                    marginTop: "8.24vh", marginBottom: "1vh", color: "white", justifyContent: "center", cursor: "pointer"
                  }} onClick={async () => {

                    let pin1 = state.currentPin;

                    await state.opps.cleanPrepareRun({ del: pin1 });

                    await dispatch({ popupSwitch: "" })

                    // }}>Delete {state.currentPin?.getJson().referencePin? "Reference":"Lore"} Pin</div>
                  }}>Delete Pin Only</div>

                <div className="hover-btn" title='Create an exact copy plus an additional lore point.'
                  style={{
                    display: "flex", width: "288px", background: styles.colors.color8 + '55', borderRadius: '3vh', fontSize: styles.fonts.fontNormal,
                    alignSelf: "flex-end", bottom: '0px', alignItems: "center", right: "170px", border: "1px solid #172808", marginRight: "22px",
                    marginTop: "8.24vh", marginBottom: "1vh", color: styles.colors.colorWhite, justifyContent: "center", cursor: "pointer"
                  }} onClick={async () => {

                    this.copyLore(lore);
                    dispatch({ popupSwitch: "" })

                  }}>Clone Lore To Map</div>

                <div className="hover-btn" title='Create an exact copy plus an additional lore point.'
                  style={{
                    display: "flex", width: "258px", background: styles.colors.color8 + '55', borderRadius: '3vh', fontSize: styles.fonts.fontNormal,
                    alignSelf: "flex-end", bottom: '0px', alignItems: "center", right: "170px", border: "1px solid #172808",
                    marginTop: "8.24vh", marginBottom: "1vh", color: styles.colors.colorWhite, justifyContent: "center", cursor: "pointer"
                  }} onClick={async () => {

                    this.copyLore(state.currentPin);
                    dispatch({ popupSwitch: "" })

                  }}>Clone Pin Only</div>

              </div>

              {/* this.copyLore(lore);

                  }}>Copy Lore</div></div> */}


              <div className="indent-on-click"
                style={{
                  display: "flex", width: "92px", background: "red", borderRadius: '3vh',
                  alignSelf: "flex-end", bottom: '0px', alignItems: "flex-end", right: "10px",
                  position: "absolute", marginTop: "8.24vh", marginBottom: "1vh",
                }}>
                <RunButton app={app} text="Save"

                  runFunc={async (arr) => {

                    let lore = arr[0];
                    let check;
                    if (state.currentPin) {
                      //debugger
                      let pin = state.currentPin;

                      if (lore.getJson().name === "" || lore.getJson().name === undefined) {
                        lore.setCompState({ name: pin.getJson().name });
                      }


                      pin.setCompState({
                        loreId: lore.getJson()._id,
                        name: lore.getJson().name,
                      });

                      let reg = state.opps.getUpdater("add");
                      check = componentList.getComponent("lore", lore.getJson()._id, "_id");

                      await state.opps.cleanPrepare({ [check ? "update" : "addlore"]: lore });

                      await state.opps.prepareRun({ update: pin });
                    } else {

                      check = componentList.getComponent("lore", lore.getJson()._id, "_id");

                      await state.opps.cleanPrepareRun({ [check ? "update" : "addlore"]: lore });
                    }

                    if (lore) {
                      //debugger
                      let parentId = Object.keys(lore.getJson().parentId,)[0];
                      let otherChildren = state.componentList.getList("lore", parentId, "parentId");
                      if (!check) {
                        await loreIndexService.insertAtBeginning(lore, otherChildren);

                      }
                    }


                    this.setState({ showSaved: true });
                    setTimeout(() => this.setState({ showSaved: false }), 2000);  // hide after 2.6 seconds
                    this.setState({saveClicked:true})
                  }} />

                {this.state.showSaved && (
                  <div className="saved-animation" style={{
                    color: styles.colors.color9,
                    alignSelf: "flex-end", position: "absolute", marginBottom: "69px", marginLeft: "-72px",
                    fontSize: styles.fonts.fontSmallest
                  }}> Saved! </div>)}

              </div>

            </div>}

          {/* <div>New Lore</div>

          <div>Existing Lore</div> */}

          {(this.state.hasChoice === "") &&
            <div>

              <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center", marginTop: "15%", height: "100%" }}>
                <div className='hover-btn'
                  title={"Create Lore connected to this Lore"}
                  style={{ ...styles.buttons.buttonAdd, margin: "8px" }}
                  onClick={() => {
                    this.setState({ hasChoice: "New" })
                  }}
                >
                  Create New Lore
                </div>

                <div className='hover-btn'
                  onClick={async () => {
                    this.setState({ hasChoice: "Connect" });
                    state.opps.clearUpdater();
                  }}
                  title={"Find pre-made Lore to connect it to this Lore"}
                  style={{ ...styles.buttons.buttonAdd, margin: "8px" }}>
                  Move or Connect Existing Lore
                </div>
              </div>

            </div>
          }

          {(this.state.hasChoice === "Connect") &&
            <div>
              <div className="hover-btn"
                onClick={() => {
                  this.setState({ hasChoice: "" })
                }}
                style={{
                  ...styles.buttons.buttonAdd, textDecoration: "none", fontStyle: "italic", background: styles.colors.color7 + "aa",
                  fontWeight: "bold", letterSpacing: ".05rem", marginBottom: "2vh", padding: "2px 8px"
                }}

              >
                <img style={{ width: ".9rem", opacity: "98%", marginRight: ".75rem" }}
                  src={backarrow}
                />
                Back
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "-40px", marginBottom: "25px", }}>

                <input app={app}

                  type="input"
                  placeholder={"Search Lore..."}
                  value={this.state.searchTerm}
                  onChange={this.handleSearchChange}
                  style={{
                    backgroundColor: styles.colors.color1 + "ee",
                    color: styles.colors.colorWhite,
                    borderRadius: "11px",
                    width: "420px",
                    padding: '8px',
                    fontSize: '16px',
                  }}
                />
              </div>

              <div style={{
                display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center",
                alignItems: "center", height: "100%", width: "100%",
              }}>


                <div style={{ display: "flex", flexDirection: "row", alignSelf: "flex-end", marginRight: "82px", marginTop: "8px", marginBottom: "8px" }}>
                  <div
                    title={"Click the check box to add a reference to the original lore object. This will not move the lore from its original location"}
                    style={{ color: styles.colors.color8, width: "fit-content", fontSize: "1.1rem", justifyContent: "center", marginTop: "5px", fontSize: styles.fonts.fontNormal }}>
                    Link to this Lore

                  </div>

                  <ParentFormComponent
                    obj={lore} name="refrence"

                    title={"Click the check box to add a reference to the original lore object."}
                    type={"checkbox"}
                    func={(obj, value) => {
                      this.setState({ refrence: value })
                    }}
                    wrapperStyle={{ width: "fit-content", alignSelf: "flex-end" }}
                    labelStyle={{ background: styles.colors.color2, border: "1px solid " + styles.colors.color3, }}
                    inputStyle={{
                      padding: "2px 4px", color: styles.colors.colorWhite,
                      color: styles.colors.colorBlack,
                    }}
                  />
                  <div className='hover-container' style={{ cursor: "help", marginTop: "-9px", marginLeft: "-3px", height: "18px" }}>
                    <img src={q} style={{ width: "18px" }} />
                    <div className='hover-div'
                      style={{
                        background: styles.colors.color2, width: "640", height: "fit-content", position: "absolute",
                        padding: "12px 9px", borderRadius: "11px", left: -600, top: -10, border: "1px solid grey", boxShadow: "4px 8px 9px black",
                        fontSize: styles.fonts.fontSmall, color: styles.colors.colorWhite + "d9"
                      }}>

                      Click the check box to add a reference to the original lore object. This will not move the lore from its original location and you will be editing the original
                      <div style={{ marginTop: "8px" }}></div>
                      If the check box is not checked, the lore you select will move to this new location.
                    </div>
                  </div>
                </div>

                <div
                  className='scroller2'
                  style={{
                    display: "flex", flexDirection: "row", width: "100%",
                    alignContent: "center", justifyContent: "center",
                    margin: "8px", height: "fit-content", flexWrap: "wrap"
                  }}

                >

                  {
                    filteredLore.filter(obj => obj.getJson().topLevel === false).filter(obj => obj.getJson().reference === false)
                      .filter((obj) => {
                        let l = state.currentLore;
                        if (!l) {
                          l = state.currentCampaign
                        }
                        if (l.getJson().parentId) {
                          return !Object.keys(l.getJson().parentId).includes(obj.getJson()._id)
                        }
                        else {
                          return true
                        }

                      })
                      .slice(0, this.state.loreToShow)
                      .map((item, index) => (
                        <div>
                          {(item.getJson().name !== "" && item.getJson().name !== undefined && item.getJson()._id !== idList[1]) &&


                            <div className="hover-img" key={index}
                              onClick={async () => {

                                let pin = state.currentPin;
                                if (!this.state.refrence) {
                                  await this.moveLore(item);



                                }
                                else {
                                  let l = state.currentLore;
                                  if (!l) {
                                    l = state.currentCampaign
                                  }
                                  await this.linkLore(item, l, lore, pin)



                                }

                                this.setState({ hasChoice: "New" });
                                this.props.app.dispatch({ currentComponent: lore, popupSwitch: "" });


                              }}
                              style={{ cursor: "pointer", }}>

                              <LoreItemWithNotation app={app} obj={item} index={index} />

                            </div>
                          }
                        </div>
                      ))
                  }
                  {
                    filteredLore.length > this.state.loreToShow &&
                    <div className="hover-btn-highlight"
                      onClick={() =>
                        this.setState(prevState => ({ loreToShow: prevState.loreToShow + (filteredLore.length - this.state.loreToShow) }))}
                      style={{
                        maxHeight: "210px", cursor: "pointer", textAlign: "center", padding: "8px",
                        minWidth: "408px", display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: styles.fonts.fontSmall, borderRadius: "20px", marginBottom: "3vh",
                        color: styles.colors.colorWhite, border: "" + styles.colors.color3+ "f2 solid",
                      }}>
                      <div
                        style={{ display: "flex", position: "relative", }}>

                        Show {filteredLore.length - this.state.loreToShow} more

                      </div>
                      <div style={{
                        display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center',
                      }}>

                      </div>
                    </div>
                  }
                </div>



              </div>

            </div>
          }
        </>}
      </div>
    )



  }
}

class TabContent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles = state.styles;

    return (
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>

        <div style={{ ...styles.buttons.buttonClose }}
          onClick={this.props.handleClose}
        >
          X
        </div>
      </div>
    )
  }
}

/**Popups */
class Popup extends Component {
  constructor(props) {
    super(props);
    this.wrapperRef = React.createRef();
    this.setWrapperRef = this.setWrapperRef;
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      this.props.handleClose();
    }
  }

  render() {
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles = state.styles;

    return (
      <div className="popup-box" style={{ zIndex: "1010" }}>
        <div ref={this.wrapperRef} className="popupCard"
          style={{ zIndex: "1010", ...styles[this.props.options?.cardType ? this.props.options?.cardType : "biggestCard"] }}>



          <div style={{ ...styles.buttons.buttonClose, position: "absolute", right: "1vw" }}
            onClick={this.props.handleClose}>X</div>

          <div className='scroller' style={{ ...styles[this.props.options?.cardContent ? this.props.options.cardContent : "cardContent"] }}>
            <MainContent app={app} delClick={this.props.delClick} />
          </div>


        </div>



      </div>
    )
  }
}
class PopupWithTab extends Component {
  constructor(props) {
    super(props);
    this.wrapperRef = React.createRef();
    this.setWrapperRef = this.setWrapperRef;
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      this.props.handleClose();
    }
  }
  render() {
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles = state.styles;

    return (
      <div className="popup-box" style={{ zIndex: "1010" }}>
        <div ref={this.wrapperRef} className="popupCard" style={{ zIndex: "1010", ...styles[this.props.options?.cardType ? this.props.options?.cardType : "biggestCard"] }}>

          <div style={{ ...styles[this.props.options?.tabType ? this.props.options?.tabType : "colorTab1"] }}>

            <TabContent app={app} handleClose={this.props.handleClose} delClick={this.props.delClick} /> <div style={ ///EXIT BUTTON
              styles.buttons.closeicon
            } onClick={this.props.handleClose}>x</div></div>
          <div className='scroller' style={{ ...styles[this.props.options?.cardContent ? this.props.options.cardContent : "cardContent"] }}>
            <MainContent app={app} handleClose={this.props.handleClose} delClick={this.props.delClick} />
          </div>
        </div>




      </div>
    )
  }
}





//********CARDs********/
class Card extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles = state.styles;

    return (
      <div className='scroller' style={{ ...styles[this.props.options?.cardType ? this.props.options?.cardType : "biggestCard"] }}>
        <div style={{ ...styles[this.props.options?.cardContent ? this.props.options.cardContent : "cardContent"] }}>
          <MainContent app={app} />
        </div>
      </div>
    )
  }
}

class CardWithTab extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles = state.styles;

    return (
      <div style={{ ...styles[this.props.type ? this.props.type : "biggestCard"] }}>
        <div style={{ ...styles[this.props.options?.tabType ? this.props.options?.tabType : "colorTab1"] }}> <TabContent app={app} /></div>
        <div style={{ ...styles[this.props.options?.cardContent ? this.props.options.cardContent : "cardContent"] }} className='scroller'>
          <MainContent app={app} />
        </div>
      </div>
    )
  }
}
