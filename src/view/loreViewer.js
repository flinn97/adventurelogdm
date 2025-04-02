import { Component } from 'react';
import "../App.css"

import MapComponent from '../componentListNPM/mapTech/mapComponent';

import React, { useState, useRef } from 'react';

import backarrow from '../pics/backArrow.webp';
import placeholder from '../pics/placeholderEncounter.JPG';

import LoreListCard from './pages/loreListCard';
import MapUploader from './uploadMap.js';
import MapGallery from './mapGallery';
import GalleryViewer from './galleryViewer';
import ParentFormComponent from '../componentListNPM/componentForms/parentFormComponent';
import LoreSearch from './loreSearch';
import EncounterMapItem from './encounterMapItem';
import colorService from '../services/colorService';
import PostLogButton from '../componentListNPM/componentForms/buttons/postLogButton.js';
import QuillComponent from '../componentListNPM/componentForms/singleForms/quillComponent.js';
import auth from '../services/auth.js';
import toolService from '../services/toolService.js';
import LoreAIButton from './AIComponents/loreAIbutton.js';


export default class LoreViewer extends Component {



  constructor(props) {
    super(props);
    this.encRef = React.createRef();
    this.loreRef = React.createRef();
    this.galRef = React.createRef();
    this.startRef = React.createRef();
    this.state = {
      obj: undefined,
      draggableItems: [{}], // Initialize the draggable items array
      isSideBarVisible: false,
      showAddEncounter: false,
      showFindEncounter: false,
      showSaved: false,
      searchTerm: "",
      imagesToShow: 5,
      isFullEnc: false,
    }
    this.addDraggableItem = this.addDraggableItem.bind(this);
    this.updateSize = this.updateSize.bind(this)
    this.eventLogger = this.eventLogger.bind(this); // bind eventLogger method
    this.scrollTo = this.scrollTo.bind(this);
  }

  handleSearchChange = (e) => {
    this.setState({ searchTerm: e.target.value });
  }

  //eventLogger method definition
  eventLogger(e, data) {
  }

  addDraggableItem() {
    this.setState(prevState => ({
      draggableItems: [...prevState.draggableItems, {}],
    }));
  }

  async componentDidMount() {
    let app = this.props.app;
    let state = app.state;
    let id = this.props._id;
    let component = this.props.app.state.componentList.getComponent("campaign", id);

    let currentLore = this.props.app.state.currentLore;



    let map = currentLore === undefined ? undefined : this.props.app.state.componentList.getComponent("map", currentLore.getJson()._id, "loreId");
    if (!map) {
      map = await auth.firebaseGetter(currentLore.getJson()._id, this.props.app.state.componentList, "loreId", "map", undefined);
      map = map[0]
    }
    await this.props.app.state.componentList.sortSelectedList("lore", "index");

    // this.scrollTo(this.startRef,"smooth");

    this.setState({ obj: component, lore: currentLore, map: map, isSideBarVisible: false });
    app.dispatch({ isSideBarVisible: app.state.isSideBarVisible ? app.state.isSideBarVisible : false })
  }

  async componentDidUpdate(prevProps, prevState) {
    if (this.props.app.state.currentLore !== prevProps.app.state.currentLore) {
      await this.loadComponentData();
    }
  
    if (this.props.app.state.viewMap !== prevProps.app.state.viewMap && this.props.app.state.viewMap !== undefined) {
      this.setState({ map: this.props.app.state.viewMap, currentMap: this.props.app.state.viewMap });
    }
  
    if (this.props.app.state.reloadMaps && this.props.app.state.reloadMaps !== prevProps.app.state.reloadMaps) {
      await this.loadComponentData();
      this.props.app.dispatch({ reloadMaps: false });
    }
  }
  
  async loadComponentData() {
    let app = this.props.app;
    let state = app.state;
    let id = this.props._id;
    let component = state.componentList.getComponent("campaign", id);
    let currentLore = state.currentLore;
    let map = currentLore ? await state.componentList.getComponent("map", currentLore.getJson()._id, "loreId") : undefined;
  
    if (!map && currentLore) {
      map = (await auth.firebaseGetter(currentLore.getJson()._id, state.componentList, "loreId", "map"))[0];
    }
    await state.componentList.sortSelectedList("lore", "index");
    this.setState({ obj: component, lore: currentLore, map: map, isSideBarVisible: false });
  }

  toggleSidebar(type){
    let newType
    
    if (this.props.app.state.isSideBarVisible){
      newType=this.props.app.state.sideBarType;
    }else{
      newType=type;
    }

    this.props.app.dispatch({ 
      isSideBarVisible: !this.props.app.state.isSideBarVisible, 
      sideBarType:newType })
  };



  getUniqueRandomColor(colorList) {
    // Remove duplicates
    const uniqueColors = [...new Set(colorList)];

    // Get the length of the unique color list
    const length = uniqueColors.length;

    // Generate a random index
    const randomIndex = Math.floor(Math.random() * length);

    // Return a random unique color
    return uniqueColors[randomIndex];
  }
  updateSize(width, height) {
    this.setState({
      bulletinWidth: width + "px",
      bulletinHeight: height + "px"
    })
  };

  scrollTo = (ref, behavior) => {
    if (ref?.current) {
      ref?.current?.scrollIntoView({ behavior: (behavior || "smooth"), block: "start" });
    }
  }

  render() {
    let obj = this.props.obj;
    let app = this.props.app;
    let state = app.state;
    let styles = state.styles;
    let dispatch = app.dispatch;
    let currentState = app.state;
    let componentList = currentState.componentList;
    let id = this.state.obj?.getJson()._id;


    let lore = this.props.app.state.currentLore;

    const dragHandlers = { onStart: this.onStart, onStop: this.onStop };
    const { deltaPosition, controlledPosition } = this.state;

    const filteredList = componentList.getList("encounter")
      .filter(encounter => {
        const name = encounter?.getJson()?.name || "";
        return name.toLowerCase().includes(this.state.searchTerm.toLowerCase());
      })
      .sort((a, b) => {
        const nameA = a?.getJson()?.name || "";
        const nameB = b?.getJson()?.name || "";
        return nameA.localeCompare(nameB);
      });

    let allColors = lore.getJson().colors ? lore.getJson().colors : [styles.colors.color7];
    let colorList = Object.values(allColors);
    const randomColor = this.getUniqueRandomColor(colorList);

    const quote = <div style={{ color: styles.colors.color8 + "d5", fontSize: styles.fonts.fontSmall, opacity: ".5", width: "1%" }}>
      "</div>;

    const mapUpload = <MapUploader
      //Why is this not working//
      changePic={async (pic, path) => {

        let map = { picURL: pic, loreId: this.state.lore?.getJson()._id, campaignId: id, type: 'map' };
        await state.opps.cleanJsonPrepare({ addmap: map });
        map = await state.opps.getUpdater("add")[0];
        await map.getPicSrc(path);


        let colors = colorService.updateColors(pic, (palette) => {
          this.setState({ colors: palette }, async () => {
            let con = this.state.colors;
            let list = Object.values(con);
            await this.setState({ colors: list });

            // Update lore colors
            let allColors = await this.state.lore.getJson().colors || [];  // Initialize to empty array if undefined
            let newAllColors = allColors.concat(list);
            await lore.setCompState({ colors: newAllColors });
            dispatch({
              operate: "update", operation: "cleanPrepareRun", object: lore, popupSwitch: "",
            })


          });
        });

        state.opps.run();
        this.setState({ map: map, currentMap: map });

      }}
      title="Large maps will take some time to load."
      text="Upload a Map" style={{
        display: "flex", marginBottom: "20px",
        zIndex: "1", background: "", cursor: "pointer"
      }}
      update={true} skipUpdate={true}
      app={app} />



    return (
      <div style={{ width: "85.3vw", transition:"width .3s ease"}}><div ref={this.startRef} /> 
      {/* Things were being resized weird, TODO: revisit */}

        {/* {(state.currentLore === undefined &&
          // randomColor===0 &&
          <div style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-evenly", marginTop: "12px" }}>

            <div className="hover-btn">

              <ImageButton
                onClick={() => this.scrollTo(this.loreRef, "smooth")}
                app={app} image={loreB} text={"Lore"} wrapperStyle={{
                  ...styles.buttons.buttonAdd, position: 'relative', cursor: "pointer", borderRadius: "12px",
                  padding: "4px", borderRadius: "12px",
                  width: "270px", minHeight: "80px", backgroundColor: styles.colors.color2 + 'de',
                 
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
                  padding: "4px", borderRadius: "12px",
                  width: "270px", minHeight: "80px",
                  backgroundColor: styles.colors.color2 + 'de',
                  
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
                  padding: "4px", borderRadius: "12px",
                  width: "270px", minHeight: "80px", backgroundColor: styles.colors.color2 + 'de',
                  overflow: 'hidden'
                }}
                buttonTextStyle={{
                  position: "absolute", top: "50%", left: "50%",
                  transform: 'translate(-50%, -50%)', opacity: ".77",
                  color: styles.colors.color3,
                  zIndex: 2
                }} /></div>


          </div>)
        } */}


        {/* <div style={{ overflowY: "hidden", maxWidth: "97%", justifySelf: "flex-start", marginLeft: "-8px", marginTop: "22px", marginBottom:lore?.getJson()?.hideLore?"22px":"12px" }} className='scroller2'>
          <IndexLoreHierarchy app={app} currentLore={state.currentLore} count={1} color={styles.colors.color4} />
        </div> */}

        {/* {*Lore Text Section} */}
        <div className={!lore?.getJson()?.hideLore ? "none" : "collapse"}>
          {/* <CollapseSection app={app} sectionTitle="Lore Text Section"> */}
            



            <div style={{ color: styles.colors.color3 + "f5",fontSize: styles.fonts.fontSmall, }}>

              <div style={{ display: "flex", flexDirection: "row", marginBottom: "0px", marginTop:"28px" }}>
               <div style={{ color: styles.colors.color3 + "f5", marginRight: "18px", fontSize: styles.fonts.fontSmall, }}>Lore:</div>
                {/* Lore Hierarchy was here */}
                
                {!lore?.getJson()?.hideLore&&<div style={{
              display: "flex", flexDirection: "row", alignContent: "flex-end", gap:"18px",
              justifyContent: "flex-start", marginBottom: "-0px", 
              fontSize: styles.fonts.fontNormal, color: styles.colors.color8 + "88",
            }}>

              {lore?.getJson()?.desc && lore?.getJson()?.desc!=="<p><br></p>" && <PostLogButton app={app} obj={lore} altText={"description"} val={lore.getJson().desc} />}
              
              <LoreAIButton app={app} obj={lore}/>

            </div>}
              </div>
              <div style={{width:"1px", background:styles.colors.color9+"77", height:"2vh", marginBottom:"-2vh",marginLeft:"10px"}}></div>


              <ParentFormComponent app={app} name="desc" obj={lore}
                theme={"adventureLog"}
                rows={5}
                prepareRun={true}
                type={"quill"}
                useAI={true}
                checkUser={true} onPaste={this.handlePaste} connectLore={true}
                inputStyle={{
                  maxWidth: "100%", padding: "2px 5px", color: styles.colors.colorWhite + "d9", height: "fit-content",
                  borderRadius: "4px", background: styles.colors.colorWhite + "00",
                  border: "solid 1px " + styles.colors.colorWhite + "22", fontSize: styles.fonts.fontSmall
                }}
                wrapperStyle={{
                 marginLeft: "10px", color: styles.colors.colorWhite, display: "flex", minWidth: "97%", marginTop: "10px",
                  flexDirection: "column", justifyItems: "space-between",
                  
                }}
              /></div>
          {/* </CollapseSection> */}
          </div>

        {/* {*Handout Section} */}

        <div className={!lore?.getJson()?.hideHandout ? "none" : "collapse"}>
          {/* <CollapseSection app={app} sectionTitle="Handout Section"> */}
            {/* <div style={{
              display: "flex", flexDirection: "row", alignContent: "flex-end", gap:"18px",
              justifyContent: "flex-end", marginBottom: "-20px", fontSize: styles.fonts.fontNormal, color: styles.colors.color8 + "88",
              marginTop: "21px"
            }}>
              <PostLogButton app={app} obj={lore} altText={"read text"} val={lore.getJson().handoutText} forceValue={true} />
              {lore?.getJson()?.hideLore &&
              <LoreAIButton app={app} obj={lore} context={lore.getJson()?.handoutText+"&&"+lore.getJson()?.desc}/> }          
            </div> */}

            <div
              style={{
                color: styles.colors.color3 + "f5", fontSize: styles.fonts.fontSmall,
                marginTop: "28px", marginBottom: "8px",
                transition:"margin-left .4s ease", 
                marginLeft:lore?.getJson()?.hideLore?"0%":"2%"
              }}> 
              <div style={{color: styles.colors.color3 + "f5", marginRight: "38px", fontSize: styles.fonts.fontSmall, }}>
                
                {!lore?.getJson()?.hideHandout&&
                <div style={{
                display: "flex", flexDirection: "row", alignContent: "flex-end", gap:"18px",
                justifyContent: "flex-start", fontSize: styles.fonts.fontNormal, color: styles.colors.color3,
               
              }}>Handout: 
                {lore?.getJson()?.handoutText && lore?.getJson()?.handoutText!=="<p><br></p>" &&<PostLogButton app={app} obj={lore} altText={"read text"} val={lore.getJson().handoutText} forceValue={true} />}
                {lore?.getJson()?.hideLore &&
                <LoreAIButton app={app} obj={lore}/> }          
              </div>
              }
              </div>

              <div style={{width:"1px", background:styles.colors.color9+"77", height:"2vh", marginBottom:"-2vh",marginLeft:"10px"}}></div>
              <ParentFormComponent app={app} name="handoutText" obj={lore}
                theme={"adventureLog"}
                rows={5}
                prepareRun={true}
                type={"quill"} checkUser={true} 
                onPaste={this.handlePaste} 
                connectLore={true}
                inputStyle={{
                  maxWidth: "100%", padding: "2px 5px", color: styles.colors.colorWhite + "d9", height: "fit-content",
                  borderRadius: "4px", background: styles.colors.colorWhite + "00",
                  border: "solid 1px " + styles.colors.colorWhite + "22", fontSize: styles.fonts.fontSmall
                }}

                wrapperStyle={{
                  marginLeft: "10px", color: styles.colors.colorWhite, display: "flex", minWidth: "97%", marginTop: "10px",
                  flexDirection: "column", justifyItems: "space-between",
                  
                }} /></div>
                {/* </CollapseSection> */}
                </div>


        {/* {*Map Section} */}

        <div style={{
          display: "flex", flexDirection: "column", position: 'relative',
          height: "100%", maxWidth: "100%",
        }}>


          <div className={!lore?.getJson()?.hideMap ? "none" : "collapse"}>
            {/* <CollapseSection app={app} sectionTitle="Map Section" > */}
              <div> {lore?.getJson()?.hideLore && lore?.getJson()?.hideHandout && !lore?.getJson()?.hideMap && <div 
              style={{display:"flex", marginTop: "2px", justifyItems:"flex-start", }}>
        <LoreAIButton app={app} obj={lore}/>
        </div>} 
                <div className='hover-btn' style={{
                  ...styles.buttons.buttonAdd,
                  display: "inline-block", height: "fit-content",
                  maxWidth: "fit-content", cursor: "pointer", marginTop: "32px",
                  marginRight: "1rem", position: "relative", fontWeight: "600",
                  fontSize: styles.fonts.fontSmall
                }}
                  onClick={() => {
                    if (state.user.getJson().role !== "GM") {
                      dispatch({ popupSwitch: "goPremium" });
                      return
                    }
                    dispatch({ popupSwitch: "chooseMap", mapUpload: mapUpload })
                  }}
                >
                  Add Map
                  </div>

               



                {/* </div>
          </div> */}
                {this.state.lore?.getJson()._id !== this.props.app.state.componentList.getComponent("campaign", this.props._id) &&

                  <div style={{ color: styles.colors.colorWhite }}>
                    {/* {this.state.lore?.getJson().name} */}
                  </div>}

                {(this.state.map) &&
                  <>
                    <div style={{ height: this.state.bulletinHeight ? this.state.bulletinHeight : "1310px", width: this.state.bulletinWidth ? this.state.bulletinWidth : "100%" }}>
                      {state.reloadMaps === false &&
                        <MapGallery app={app} obj={this.state.lore} color={randomColor} updateSize={this.updateSize} delMap={() => {
                          let currentLore = this.props.app.state.currentLore;

                          let map = this.props.app.state.componentList.getComponent("map", currentLore.getJson()._id, "loreId");
                          this.setState({
                            map: map

                          })
                        }} />}

                    </div></>}

              </div>
              {/* </CollapseSection> */}
              </div>

          {(state.popupSwitch === "" || state.popupSwitch === undefined || state.popUpSwitch === "" || state.popUpSwitch === undefined) && 
          (<div className="hover-btn" 
            onClick={()=>{this.toggleSidebar("loreTree")}} 
          title={"All Lore"} style={{
            ...styles.buttons.buttonAdd, overflowX: "hidden",
            overflowY:"hidden",
            justifyContent: "flex-start",
            fontSize: styles.fonts.fontSmall, display: "flex", flexDirection: "column",
            transition: 'all 0.5s ease-in-out',
            height: state.isSideBarVisible ? "28px" : "45px",
            padding: "5px 9px", zIndex: "9000", position: "fixed", 
            right: "2%", top: "1vh", backgroundColor: styles.colors.color1 + "dd",
            border:"1px dashed "+styles.colors.color9+"44",
          }}>
            <div style={{ display: "flex", flexDirection: "row" }}>
              {state.isSideBarVisible ? "Hide" : "Show All Lore"}
              <img src={backarrow} alt=">" style={{
                width: "12px", marginLeft: "11px", marginTop: "6px", height: "11px",
                transform: state.isSideBarVisible ? "rotate(270deg)" : "rotate(180deg)", transition: "transform 0.3s ease-in-out"
              }}></img>
            </div>

            <div style={{ fontSize: ".64rem", color: styles.colors.color8, marginTop:"2px", marginBottom:"4px" }}>Expand and review all Lore</div>

          </div>)}

          <div ref={this.loreRef} />
          {
            // state.isSideBarVisible && 
            (state.popupSwitch === "" || state.popupSwitch === undefined) &&
            (<div style={{ position: "fixed", zIndex: "8000", right: "9px", top: "3vh" }}>
              {/* SIDEBAR */}
              <div style={{ display: "flex", width: "fit-content", height: "100%", }}>
                <LoreListCard app={app} type="card" options={{ cardType: state.isSideBarVisible ? "tallestCard" : "none" }} isVisible={state.isSideBarVisible} />

              </div>
            </div>)}

        </div>
        {lore?.getJson()?.hideLore && lore?.getJson()?.hideHandout && lore?.getJson()?.hideMap &&<div 
              style={{display:"flex", marginTop: "2px", justifyItems:"flex-start", }}>
        <LoreAIButton app={app} obj={lore}/>
        </div>} 

        {/* {*Lore All Section} */}
        <div className={!lore?.getJson()?.hideConnected ? "none" : "collapse"}>
        
          <LoreSearch app={app} type="card" options={{ tabType: "bigCardBorderless", cardType: undefined }}
          /></div>

        {/* {*Encounter Section} */}
        <div className={(lore?.getJson()?.hideConnected && lore?.getJson()?.hideMap && lore?.getJson()?.hideHandout && lore?.getJson()?.hideLore) ? "collapse" : "none"}
          style={{ transition:"margin-top .4s ease",
            marginTop: (lore?.getJson()?.hideConnected && lore?.getJson()?.hideMap && lore?.getJson()?.hideHandout && lore?.getJson()?.hideLore) ? "-10px" : "" }}>
          <hr></hr></div>

        <div ref={this.encRef} />
        <div style={{ marginTop: "10px", color: styles.colors.colorWhite + "55", fontSize: styles.fonts.fontSmall }}>{lore.getJson().name} Encounters</div>
        {!this.state.showFindEncounter && !this.state.showFindImage &&
          <div style={{ minHeight: "120px" }}>
            <div style={{ flexDirection: "row", display: "flex" }}>
              <div className="hover-btn" style={{
                ...styles.buttons.buttonAdd, marginTop: "15px", backgroundColor: styles.colors.colorBlack + "99",
                paddingLeft: "29px", paddingRight: "29px", alignSelf: "flex-start", justifyItems: "center", height: "36px",
                borderRadius: "9px", fontSize: "21px", marginRight: "22px",
              }}
                title="Create a new encounter, you can edit it by clicking on it."
                onClick={() => {
                  if (state.user.getJson().role !== "GM") {
                    dispatch({ popupSwitch: "goPremium" });
                    return
                  }
                  state.opps.cleanJsonPrepareRun({
                    "addencounter": {
                      loreId: lore.getJson()._id,
                      name: "New Encounter", campaignId: this.state.obj.getJson()._id
                    }
                  })

                  this.setState({ showAddEncounter: true });
                }}>
                + Create New Encounter
              </div>


              <div className="hover-btn" style={{
                ...styles.buttons.buttonAdd, marginTop: "15px", backgroundColor: styles.colors.colorBlack + "99",
                paddingLeft: "29px", paddingRight: "29px", alignSelf: "flex-start", justifyItems: "center", height: "36px",
                borderRadius: "9px", fontSize: "21px",
              }}
                title="Find an existing encounter to add to this lore.
                        This will create a COPY."
                onClick={() => {
                  if (state.user.getJson().role !== "GM") {
                    dispatch({ popupSwitch: "goPremium" });
                    return
                  }
                  this.setState({ showFindEncounter: true })
                }}>
                Find Encounter
              </div></div>

            <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>

              <div style={{ marginTop: "2vh", marginBottom: "1vh", }}>
                <MapComponent app={app} name={"encounter"} cells={[{ custom: EncounterMapItem, props: { app: app } },]}
                  filter={{ search: lore.getJson()._id, attribute: "loreId" }}
                  theme={"selectByImageSmall"}
                />

              </div>


            </div></div>
        }

        {(this.state.showFindEncounter || this.state.showFindImage) &&

          <div className="indent-on-click"
            onClick={() => {
              this.setState({ showFindEncounter: false, showFindImage: false })
            }}
            style={{
              ...styles.buttons.buttonAdd, textDecoration: "none", fontStyle: "italic", background: styles.colors.color7 + "aa",
              marginTop: "11px",
              fontWeight: "bold", letterSpacing: ".05rem", padding: ".1%"
            }}

          >
            <img style={{ width: ".9rem", opacity: "98%", marginRight: ".75rem" }}
              src={backarrow}
            />
            Back
          </div>}

        {this.state.showFindEncounter &&
          <div>
            <div style={{ display: "flex", justifyContent: "flex-end", }}>
              {!this.stateisFullEnc &&
                <div style={{
                  ...styles.buttons.buttonAdd, fontSize: styles.fonts.fontSmall, marginRight: "20px",
                  alignSelf: "center", color: styles.colors.color9, padding: "4px 16px"
                }} onClick={async () => {
                  let encounter = await auth.getAllofTypeByUser(state.componentList, state.user.getJson()._id, "encounter");
                  if (encounter) {
                    await dispatch({})
                    await this.setState({ isFullEnc: true })
                  }
                  await auth.getMPItems(state.componentList, state.user.getJson()._id)
                  await auth.getAllMpTypeData(state.componentList);
                  dispatch({})
                }}>Import Library</div>}

              <input app={app}

                type="input"
                placeholder="Search..."
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
            <div style={{ display: "flex", justifyContent: "space-around", marginTop: "3vh", flexWrap: "wrap" }}>


              {

                filteredList.map((encounter, index) =>
                  <div
                    key={encounter.getJson()._id}
                    onClick={async () => {
                      {

                        await this.setState({ showFindEncounter: false });
                        let enc = await encounter.copyEncounter(componentList, toolService.getIdFromURL(true, 1), state.currentCampaign.getJson()._id, state.user.getJson()._id);


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

        {/* {*Gallery Section} */}
        <hr></hr>
        <div style={{ marginTop: "10px", color: styles.colors.colorWhite + "55", fontSize: styles.fonts.fontSmall, marginBottom: "16px" }}>{lore.getJson().name} Gallery</div>
        <GalleryViewer app={app} type="card" options={{ tabType: "bigCardBorderless", cardType: undefined }}

        />  <div ref={this.galRef} />





      </div>



    )
  }
}

