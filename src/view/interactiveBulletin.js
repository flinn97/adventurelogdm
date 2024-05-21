import React, { Component } from 'react';
import "../App.css"
import Upload from './upload';
import Draggable from 'react-draggable';
import iconTest from '../pics/iconTest.png';
import movePin from '../pics/movePin.png';
import editPin from '../pics/editPin.png';

import image1 from '../pics/iconTest.png';
import image2 from '../pics/iconCapitol.png';
import image4 from '../pics/iconHood.png';
import image5 from '../pics/iconSkull.png';
import image6 from '../pics/iconTavern.png';
import image7 from '../pics/iconKeep.png';
import image8 from '../pics/iconMask.png';
import image9 from '../pics/iconKnight.png';
import image10 from '../pics/iconSheep.png';
import image11 from '../pics/iconTree.png';
import image12 from '../pics/iconWall.png';
import image13 from '../pics/iconChest.png';
import image14 from '../pics/iconGarg.png';
import image15 from '../pics/iconSword.png';

import image16 from '../pics/trash.gif';

import ParentFormComponent from '../componentListNPM/componentForms/parentFormComponent';
import backarrow from '../pics/backArrow.webp';
import auth from '../services/auth';
import toolService from '../services/toolService';
import trash from '../pics/trashStill.png';

export default class InteractiveBulletin extends Component {
  constructor(props) {
    super(props);
    this.parentRef = React.createRef();
    this.imgRef = React.createRef();
    this.divRef = React.createRef();
    this.startX = 0;
    this.startY = 0;
    this.isPanning = false;
    
    this.state = {
      pins: [],
      isGrabbing: false,
      mapHeight: "1200px",
      mapWidth: "1400px",
      start: false,
      isLoading: true,
      hide: false,
      highestZIndex: 1000,
      bounds: { left: 0, top: 0, right: 1400, bottom: 1200 },
    }
  }

  async componentDidMount() {
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    this.divRef.current.addEventListener('contextmenu', this.preventContextMenu);
    this.divRef.current.addEventListener('mousedown', this.startPanning);
    this.divRef.current.addEventListener('mouseup', this.stopPanning);
    this.divRef.current.addEventListener('mousemove', this.pan);

    const delay = ms => new Promise(res => setTimeout(res, ms));
    await delay(1000);
    let mapHeight = this.imgRef?.current?.clientHeight;
    let mapWidth = this.imgRef.current?.clientWidth;
    this.setState({
      mapHeight: mapHeight,
      mapWidth: mapWidth,
      bounds: {
        left: 0,
        top: 0,
        right: mapWidth,
        bottom: mapHeight,
      },
    }, () => this.forceUpdate())
    if (mapWidth < 1500 && mapWidth > 300) {
      this.props.updateSize(mapWidth, mapHeight);

    }
    ///assign pins to current mapId

    this.setState({ isLoading: false, start: true });
    if (this.imgRef?.current) {
      this.setState({ imgRef: this.imgRef.current })
    }


  };

  async componentDidUpdate(prevProps, prevState) {
    if(prevProps.obj!==this.props.obj){
      let mapHeight = this.imgRef?.current?.clientHeight;
      let mapWidth = this.imgRef?.current?.clientWidth;
      this.setState({
          bounds: {
            left: 0,
            top: 0,
            right: mapWidth,
            bottom: mapHeight,
          },
        })
    }
   


    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    if (state.showPinMap === false) {
     
      dispatch({ showPinMap: true })

    }
    if (this.imgRef?.current !== prevState.imgRef) {
      //prevProps.imgRef?.current
      const delay = ms => new Promise(res => setTimeout(res, ms));
      await delay(1000);
      let mapHeight = this.imgRef?.current?.clientHeight;
      let mapWidth = this.imgRef?.current?.clientWidth;
      let img = this.imgRef?.current;
      this.setState({
        mapHeight: mapHeight,
        mapWidth: mapWidth,
        imgRef: this.imgRef.current,
          bounds: {
            left: 0,
            top: 0,
            right: mapWidth,
            bottom: mapHeight,
          },
      }, () => this.forceUpdate());
      if (mapWidth < 1500 && mapWidth > 300) {
        this.props.updateSize(mapWidth, mapHeight);

      }
      

    }


  }

  componentWillUnmount() {
    this.divRef.current.removeEventListener('contextmenu', this.preventContextMenu);
    this.divRef.current.removeEventListener('mousedown', this.startPanning);
    this.divRef.current.removeEventListener('mouseup', this.stopPanning);
    this.divRef.current.removeEventListener('mousemove', this.pan);
  }

  preventContextMenu = (e) => {
    e.preventDefault();
  }

  startPanning = (e) => {
    if (e.button === 2) { // Right mouse button
      this.isPanning = true;
      this.startX = e.clientX;
      this.startY = e.clientY;
      this.setState({ isGrabbing: true })
    }
  }

  stopPanning = () => {
    this.isPanning = false;
    // console.clear();
    this.setState({ isGrabbing: false })
  }

  pan = (e) => {
    if (this.isPanning) {
      const dx = e.clientX - this.startX;
      const dy = e.clientY - this.startY;
      this.divRef.current.scrollLeft -= dx;
      this.divRef.current.scrollTop -= dy;
      this.startX = e.clientX;
      this.startY = e.clientY;
    }
  }


  render() {
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles = state.styles;
    let headerH = 60;
    let remainderH = 1310 - [headerH] - 11;

    const images = [
      image1, image2, image4, image5, image6, image7, image8,
      image9, image10, image11, image12, image13, image14, image15, image16,
      "#F4F5F8",
      "#C1A71Bbb", "#0f141cf3", "#1E90FFbb", "#5F0C0Cae"];

    const heightY = this.state.mapHeight;

    // if (this.state.isLoading) {


    return (
      //ALWAYS 100% 100% DONT CHANGE THIS, change the PARENT div
      <div className='scroller2'
        ref={this.divRef}
        style={{
          width: "100%", minHeight: "100%", maxHeight: "100%",
          cursor: this.state.isGrabbing !== true ? "" : "grabbing",
          overflow: 'auto', borderRadius: "11px",
        }}>


        {/* HEADER */}
        <div style={{
          // border:"1px solid yellow", 
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          color: "#ffdead",
          height: "0px",
          width: "100%",
          alignItems: "center",
          paddingLeft: "10px",
          position: "sticky",
          top: 30, left: 10,
          zIndex: 99, // to ensure it stays on top
        }}>

          {/* BUTTONS IN HEADER */}

          <div className="hover-btn" style={{
            ...styles.buttons.buttonAdd, padding: "0px", paddingLeft: "10px", borderColor: styles.colors.color3,
            backgroundColor: styles.colors.colorBlack + "dd", color: styles.colors.colorWhite + "dd", transition: "all",
          }}
            onClick={async (e) => {
              let scrollLeft = this.divRef.current.scrollLeft;
              let scrollTop = this.divRef.current.scrollTop;
              let x = (scrollLeft + 80).toString();
              let y = (scrollTop + 80).toString();

              await state.opps.cleanJsonPrepareRun({
                "addpin": {
                  type: "pin",
                  iconImage: iconTest,
                  loreId: "",
                  mapId: this.props.obj?.getJson()._id,
                  x: x,
                  y: y,
                  name: "New Lore",
                  campaignId: this.props.obj?.getJson().campaignId,
                },
              });
              dispatch({});


            }}
          >
            {state.componentList.getList("pin", this.props.obj?.getJson()._id, "mapId").length === 0 ? "+ Lore Point" : "+"}
            <img src={iconTest} alt='ico' style={{ width: "40px", height: "40px", marginLeft: state.componentList.getList("pin", this.props.obj?.getJson()._id, "mapId").length === 0 ? "15px" : "10px", marginRight: "10px", marginTop: "1px", }}></img>
          </div>



        </div>

        {this.props.obj &&
          ///DELETE MAP
          <div className='hover-btn-highlight' title={"Permanently Delete this Map"}
            style={{
              color: 'red', width: "80px", textAlign: "center", cursor: "pointer",
              height: "40px", background: "", boxShadow: "",
              // border: "1px solid " + styles.colors.color6,
              right: 8, position: "absolute", top: 12,
              padding: "2px 4px", zIndex: 900,


            }}
            onClick={async () => {

              await state.opps.cleanPrepareRun({ del: this.props.obj });
              await dispatch({reloadMaps:true})
              // this.setState({ map: undefined, obj:undefined });
            }}>
            <img src={trash} style={{ width: "34px", cursor: "pointer", zIndex: 991 }} />
          </div>
        }
        <div style={{ position: "relative", width: "100%", height: "100%", }}>


          {this.state.mapWidth && (this.state.mapWidth !== "") &&

            <img ref={this.imgRef} alt='map'
              onLoad={this.handleImageLoaded}
              src={this.props.obj?.getJson().picURL}
              style={{ position: "absolute", top: 0, left: 0, borderRadius: "17px", maxWidth: "3700px", maxHeight: "2630px", marginTop: "40px", }} />}


          {/* {this.state.start && */}

          {/* IMAGE BACKGROUND */}{this.props.obj && state.showPinMap &&
            <div ref={this.parentRef}
              style={{
                position: "absolute", top: 0, left: 0,
                width: this.state.mapWidth,
                height: this.state.mapHeight
              }}>



              {/* PINS PINS PINS */}

              {state.componentList.getList("pin", this.props.obj?.getJson()._id, "mapId").map((pin, index) =>
                <Draggable key={pin.getJson()._id}
                  defaultPosition={{ x: parseInt(pin.getJson().x, 10), y: parseInt(pin.getJson().y, 10) }}
                  grid={[1, 1]}
                  bounds={this.state.bounds}
                  handle=".draghere"
                  onStart={(data) => {
                    this.setState({ isGrabbing: true });
                  }}
                  onStop={async (item, data) => {

                    let comp = pin;
                    // state.componentList.getComponent("pin",pinId);

                    let parentRect = this.parentRef?.current?.getBoundingClientRect();
                    
                    let x = Math.min(Math.max(data.x, 1), parentRect.width - 1);
                    let y = Math.min(Math.max(data.y, 1), parentRect.height - 1);

                    await comp.setCompState({
                      x: x.toString(),
                      y: y.toString()
                    });

                    await state.opps.cleanPrepareRun({ update: comp });
                    this.setState({ isGrabbing: false });

                  }}


                >

                  <div className='hover-container'

                    style={{
                      display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer",
                      // backgroundColor:pin.getJson().colorOverlay,
                      position: "absolute",

                      borderRadius: "50%",

                    }}

                    pinId={pin.getJson()._id} >
                    {/* pin.getJson()._id */}


                    <div className="indent-on-click" style={{
                      borderRadius: "50%", width: "46px", height: "46px", paddingTop: "0px", zIndex: 100,

                      background: styles.colors.colorBlack + "88",
                    }}

                      onClick={async () => {
                        //
                        let l = componentList.getComponent("lore", pin.getJson().loreId, "_id");

                        if (pin.getJson().loreId !== "" && pin.getJson().loreId !== undefined && l !== undefined) {
                          await dispatch({ currentComponent: undefined });

                          dispatch({ operate: 'update', operation: "cleanPrepare", object: l, popupSwitch: "popupLore", currentPin: pin, })
                        }

                        else {

                          const newId = state.currentLore ? state.currentLore.getJson()._id : this.props.obj?.getJson().campaignId;
                          let href = window.location.href;
                          let splitURL = href.split("/");
                          let id = splitURL[splitURL.length - 1];

                          let otherChildren = componentList.getList("lore", id.includes("-") ? state.currentLore.getJson()._id : state.currentCampaign?.getJson()._id, "parentId");
                          await state.opps.cleanJsonPrepare({
                            addlore: {
                              index: 0,
                              campaignId: this.props.obj?.getJson().campaignId, index: otherChildren.length,
                              parentId:
                                { [newId]: "Unnamed" }
                            }
                          });
                          let lore = state.opps.getUpdater("add")[0]
                          dispatch({
                            currentPin: pin,
                            popupSwitch: "popupLore",
                            currentComponent: lore

                          })
                        }
                      }}

                      title="Click to Open">
                      <img
                        draggable="false" src={pin.getJson().iconImage} alt='ico'

                        style={{
                          width: "46px", height: "46px", justifySelf: "center",
                          alignSelf: "center", verticalAlign: "center",
                          borderRadius: "50%",
                          padding: "1px",
                          backgroundColor: pin.getJson().colorOverlay,
                          filter: pin.getJson().colorFilter,
                        }}></img>

                    </div>


                    <div
                      className='hover-div' style={{ zIndex: 101, width: "20px", height: "fit-content", position: "absolute", marginLeft: "35px", marginTop: "-8px" }}>

                      <img className="draghere" draggable="false" style={{
                        position: "absolute", marginTop: "35px", marginLeft: "0px", width: "25px",
                        objectFit: "fill",

                        cursor: this.state.isGrabbing !== true ? "grab" : "grabbing", overflow: "visible"

                      }} src={movePin} title="Move"
                      ></img>

                      {this.state.isGrabbing !== true &&
                        <>
                          <div className="hover-containerInt" style={{
                            position: "absolute", marginTop: "10px", marginLeft: "0px", width: "fit-content",
                            objectFit: "fill", cursor: "pointer", overflow: "visible",
                          }}
                          >
                            <img draggable="false"
                              style={{
                                width: "22px", marginTop: "-3px",
                                objectFit: "fill",
                                cursor: "pointer", overflow: "visible",

                              }}
                              src={editPin} title="Change" />

                            {/* LIST OF IMAGE OPTION       */}
                            <div className='hover-divInt'
                              style={{
                                width: "160px", height: "150px",
                                justifyContent: "space-between", borderRadius: "11px",
                                marginLeft: "20px", marginTop: "-122px", display: 'flex', flexDirection: 'row', flexWrap: 'wrap'
                              }}>

                              {images.map((imgSrc, index) => (
                                <div key={imgSrc + index.toString()} style={{ display: "flex", flexDirection: "row", backgroundColor: styles.colors.color1 + "7d", position: "sticky", zIndex: "50", borderRadius: "1px" }}>

                                  {(typeof imgSrc === 'string' && !imgSrc.startsWith('#')) &&
                                    <div style={{ cursor: "pointer" }}>
                                      <img title={imgSrc === image16 ? "DELETE" : "Change Icon"}
                                        style={{
                                          margin: "2px", height: '28px', width: "28px", position: "relative",
                                          backgroundColor: imgSrc !== image16 ? pin.getJson().colorOverlay : "#000000e3",
                                          filter: imgSrc !== image16 ? pin.getJson().colorFilter : "",
                                          // transform:imgSrc===image16&& "rotate(4.5deg)",
                                          borderRadius: "50%"
                                        }}
                                        className='hover-divInt'
                                        key={index}
                                        src={imgSrc}
                                        onClick={async (item, data) => {


                                          if (imgSrc !== image16) {
                                            //
                                            let comp = pin;
                                            await comp.setCompState({
                                              iconImage: imgSrc
                                            });
                                            state.opps.cleanPrepareRun({ update: comp });
                                            // pin.pushIcon(state, imgSrc);
                                          }
                                          else {

                                            let pin1 = pin;
                                            if (pin1.getJson().referencePin) {
                                              let l1 = componentList.getComponent("lore", pin1.getJson().loreId, "_id");
                                              await state.opps.cleanPrepare({ del: l1 });
                                            }

                                            await state.opps.prepareRun({ del: pin1 });

                                            await dispatch({ popupSwitch: "", showPinMap: false })
                                          }
                                        }} />
                                      {/* {imgSrc === image16 &&
                                        <Upload
                                          className='hover-divInt'
                                          app={app} buttonStyle={{ width: "28px", }}
                                          difWidth={"14.33px"}
                                          update={true} quality={.3}

                                          text=" "
                                          obj={pin}

                                          // changePic={async (pic, path) => {
                
                                          //  await pin.pushIcon(state, pic);
                                          // }}
                                          

                                        />
                                      } */}
                                    </div>}

                                  {(typeof imgSrc === 'string' && imgSrc.startsWith('#')) &&
                                    <div
                                      title={imgSrc === "#F4F5F8" ? "Invert" : "Change Color"}
                                      style={{ margin: "2px", height: '28px', width: "28px", position: "relative", backgroundColor: imgSrc, borderRadius: "50%", }}
                                      className='hover-divInt'
                                      key={index}
                                      onClick={(item, data) => {
                                        let comp = pin;
                                        let colorNew = imgSrc;
                                        let filterNew = ""

                                        if (imgSrc == "#5F0C0C88") {
                                          colorNew = "#5F0C0C22";

                                        }

                                        if (imgSrc == "#F4F5F8") {
                                          colorNew = styles.colors.color1 + "e2";
                                          filterNew = "invert(99%)"
                                        }

                                        comp.setCompState({
                                          colorOverlay: colorNew,
                                          colorFilter: filterNew
                                        });
                                        state.opps.cleanPrepareRun({ update: comp });
                                      }}>
                                      {imgSrc === "#F4F5F8" &&
                                        <div style={{ marginLeft: "3.5px", color: styles.colors.color8, fontWeight: "800", fontSize: styles.fonts.fontSmallest, marginTop: "5px" }}>inv</div>}
                                    </div>}

                                </div>
                              ))}

                            </div>



                          </div>
                          <div style={{
                            display: "flex", direction: "column",
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
                            marginTop: "51px",
                            marginLeft: "-110px",
                            width: "200px", verticalAlign: "center",
                            zIndex: "20", borderRadius: "4px",
                            background: styles.colors.color1 + "31",
                            height: "fit-content",

                          }}>
                            <ParentFormComponent
                              app={app}
                              name="name"
                              prepareRun={true}
                              obj={pin}
                              inputStyle={{
                                cursor: "text",
                                padding: "2px",
                                color: styles.colors.colorWhite,
                                borderRadius: "4px",
                                background: styles.colors.colorBlack + "88",
                                borderWidth: "0px",
                                textAlign: 'center',
                                width: "200px",
                                overflowX: "clip",
                                overflowY: "auto",
                                fontSize: styles.fonts.fontSmallest
                              }}
                            />
                          </div></>
                      }

                    </div>


                  </div>

                </Draggable>
              )}
            </div>}

          {/* } */}
        </div>

      </div>
    )
    // }else{
    //   return (
    //     <div>Loading...</div>
    //   )
    // }
  }
}

