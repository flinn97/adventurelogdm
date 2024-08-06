import { Component } from 'react';
import "../App.css"
import CardPractice from './CardPrac';
import AddCampaign from './AddCampaign';
import MapComponent from '../componentListNPM/mapTech/mapComponent';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import iconTest from '../pics/iconTest.png';
import movePin from '../pics/movePin.png';
import Draggable from 'react-draggable';
import React from 'react';
import ReactDOM from 'react-dom';
import placeholder from '../pics/placeholderEncounter.JPG';
import InteractiveBulletin from './interactiveBulletin';
import LoreListCard from './pages/loreListCard';
import MapUploader from './uploadMap.js';
import toolService from '../services/toolService.js';
import colorService from '../services/colorService.js';
import backarrow from '../pics/backArrow.webp';
export default class Worldbuilder extends Component {



  constructor(props) {
    super(props);

    this.state = {
      obj: undefined,
      draggableItems: [{}], // Initialize the draggable items array
      isSideBarVisible: false,
    }

    this.addDraggableItem = this.addDraggableItem.bind(this);
    this.updateSize = this.updateSize.bind(this);
    this.eventLogger = this.eventLogger.bind(this); // bind eventLogger method
  }

  updateSize(width, height) {
    this.setState({
      bulletinWidth: width + "px",
      bulletinHeight: height + "px"
    })
  }

  // eventLogger method definition
  eventLogger(e, data) {

    // console.log('Event: ', e);
    // console.log('Data: ', data);
  }

  addDraggableItem() {
    this.setState(prevState => ({
      draggableItems: [...prevState.draggableItems, {}],
    }));
  }

  //onStart and onStop are events provided by react-draggable 
  //and will be triggered when a user starts dragging the element 
  //and stops dragging it, respectively.

  componentDidMount() {
    let obj = this.props.obj;
    let app = this.props.app;
    let opps = this.props.app.state.opps;
    let state = app.state;
    let componentList = state.componentList;

    let id = toolService.getIdFromURL(true, 0);
    let component = this.props.app.state.componentList.getComponent("campaign", id);
    if (component) {

      let lore = state.currentLore;
      if (lore === undefined) {
        let parentLore = this.props.app.state.componentList.getList("lore", id, "campaignId");
        parentLore = parentLore.find(l => l.getJson().parentLore === true)
        lore = parentLore
      }

      let mapList = componentList.getList("map", lore?.getJson()._id, "loreId");


      let map = mapList[0];
      this.setState({ obj: component, lore: lore, map: map, currentMap: map });
      //RICH TEXT READ
      let campaignDesc = document.getElementById("campaignDesc");
      if (campaignDesc) {
        campaignDesc.innerHTML = component.getJson().description;

      }
    }


  }


  async componentDidUpdate(props, state) {
    if (this.props.update) {
      await this.props.dispatch();
      this.setState({ map: undefined })
    }
    //
    let obj = this.props.obj;
    let app = this.props.app;
    let dispatch = app.dispatch;
    let currentState = app.state;
    let componentList = currentState.componentList;
    let lore = state.currentLore;
    if (lore === undefined) {
      let parentLore = this.props.app.state.componentList.getList("lore", app.state.currentCampaign.getJson()._id, "campaignId");
      parentLore = parentLore.find(l => l.getJson().parentLore === true)
      lore = parentLore
    }

    let mapList = componentList.getList("map", lore?.getJson()._id, "loreId");

    if (state.mapList?.length !== mapList?.length) {

      this.setState({ mapList: mapList, currentMap: mapList[mapList.length - 1], })
    };

  }


  toggleSidebar = () => {
    this.props.app.dispatch({isSideBarVisible:!this.props.app.state.isSideBarVisible})
  };

  render() {
    let app = this.props.app;
    let state = app.state;
    let styles = state.styles;
    let dispatch = app.dispatch;
    let href = window.location.href;
    let splitURL = href.split("/");
    let id = splitURL[splitURL.length - 1];
    const dragHandlers = { onStart: this.onStart, onStop: this.onStop };
    const { deltaPosition, controlledPosition } = this.state;

    let compList = state.componentList.getList("map", id, "campaignId");

    let compListLength = compList ? compList.length : 0;


    let map = state.componentList.getComponent("map", this.props.topLore?.getJson()?._id, "loreId");

    const mapUpload = <MapUploader
      //ADD THIS TO ALL UPLOADS//
      changePic={async (pic, path) => {
        let lore = this.state.lore;

        let map = { picURL: pic, loreId: this.state.lore.getJson()._id, campaignId: this.state.obj.getJson()._id, type: 'map' };
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
              operate: "update", operation: "cleanPrepareRun", object: lore
            })


          });
        });

        state.opps.run();
        this.setState({ map: map, currentMap: map })


      }}
      text="Add Map"
      title="Large maps will take some time to load."
      style={{
        display: "flex", marginBottom: "20px",
        zIndex: "1", background: "", cursor: "pointer"
      }}
      update={true} skipUpdate={true}
      app={app} />;

    return (

      <div style={{
        display: "flex", flexDirection: "column", position: 'relative', overflow: 'clip', padding: '0',
        height: "fit-content", maxWidth: "100%", justifyContent: "space-between", maxHeight: "100%",
      }}>



        {
          (!map) &&
          <div>
            <div className='hover-btn' style={{
              ...styles.buttons.buttonAdd,
              display: "inline-block", height: "fit-content",
              maxWidth: "fit-content", cursor: "pointer", marginTop: "24px",
              marginRight: "1rem", position: "relative", fontWeight: "600",
              fontSize: styles.fonts.fontSmall
            }} onClick={() => {
              if(state.user.getJson().role!=="GM"){
                dispatch({ popupSwitch: "goPremium"});
                return
              }
              dispatch({ popupSwitch: "chooseMap", mapUpload: mapUpload })
            }}>
              Add Map
            </div>


          </div>}

        {/* <div style={{...styles.buttons.buttonAdd, marginBottom:"1vh", }} onClick={()=>{dispatch({})}}>Add Map</div> */}

        {/* </div>
          </div> */}

        {/* <div style={{color:'white'}}>{this.state.lore?.getJson().name}</div> */}

        {(map) &&
          //  frame
          <div style={{
            height: this.state.bulletinHeight ? this.state.bulletinHeight : "1310px", width: this.state.bulletinWidth ? this.state.bulletinWidth : "100%",
          }}>

            <InteractiveBulletin app={app} obj={this.state.currentMap} updateSize={this.updateSize} />
            {/* backgroundIMAGE */}
          </div>}

          {(state.popupSwitch===""||state.popupSwitch===undefined) && (<div
          title={
            "The Lore tree lets you quickly find Lore and their connections"}
          className="hover-btn" onClick={this.toggleSidebar} style={{
            ...styles.buttons.buttonAdd,
            fontSize: styles.fonts.fontSmall, display: "flex", flexDirection: "column",
            padding: "5px 9px", border: "none", zIndex: "9000", position: "fixed", right: "2%", top: "1vh", backgroundColor: styles.colors.color1 + "dd",
          }}>
          <div style={{ display: "flex", flexDirection: "row" }}> {state.isSideBarVisible ? "Hide Lore" : "Show All Lore"}
          <img src={backarrow} alt=">" style={{ width: "12px", marginLeft: "11px", marginTop: "6px",height: "11px", transform: state.isSideBarVisible ? "rotate(270deg)" : "rotate(180deg)", transition: "transform 0.3s ease-in-out" }}></img>
        </div>
        {!state.isSideBarVisible &&
          <div style={{ fontSize: ".64rem", color: styles.colors.color8 }}>Expand and review all Lore</div>
        }
      </div>)}

        {
        // state.isSideBarVisible &&
      (state.popupSwitch===""||state.popupSwitch===undefined) && (<div style={{ position: "fixed", zIndex: "8000", right: "9px", top: "3vh", }}>
        {/* SIDEBAR */}
        <div style={{ display: "flex", width: "fit-content", }}>
        <LoreListCard app={app} type="card" options={{ cardType:state.isSideBarVisible? "tallestCard":"none" }} isVisible={state.isSideBarVisible}/>
        </div>
      </div>)
    }

      </div >

    )
  }
}


/**
 * 
 <div style={{...styles.buttons.buttonAdd, padding:".55%"}} onClick={this.addDraggableItem}>Add Icon</div>
 
 {this.state.draggableItems.map((item, index) => (

         <Draggable key={index} 
         bounds="parent"
         handle=".handle" style={{marginLeft:"22px", userSelect: "none"}}
         
         onStop={this.eventLogger} 
         grid={[1,1]}>

           <pin style={{width:"fit-content", height:"fit-content",
             }}>
            <img className="handle" draggable="false"
            src={movePin} 
            style={{width: "18px", height:"18px", cursor:"grab", objectFit:"fill", display:"unset",
            borderRadius: "50%", right:'-58px', bottom:"-15px", zIndex:40,

          
            }}
            />
             <img src={iconTest} draggable="false" style={{
               background:"#00000000",  cursor:"pointer",
               objectFit:"fill", display:"unset",
               width: "55px", height:"55px",
               borderRadius: "50%",
              
               
               }}>
             </img>
           </pin>

         </Draggable>

       ))}
 */

/* {state.popUpSwitchcase != "worldbuilder" &&
    <Link to={"/campaign/"+(this.state.obj?.getJson()._id)} 
    style={{...styles.buttons.buttonAdd, textDecoration:"none", fontStyle:"italic", background:styles.colors.color7+"aa",
    fontWeight:"bold", letterSpacing:".05rem", marginBottom:"2vh", }}
    >
      <img style={{width:".9rem", opacity:"98%", marginRight:".75rem"}}
      src={backarrow} draggable="false"
      />
      Go Back
    </Link>} 

     <div style={{display: "flex", flexDirection: "row", justifyContent:"space-between",  marginBottom:"2vh", 
backgroundImage: 'url('+(this.state.obj?.getJson().picURL||placeholder)+')', borderRadius:radius,
backgroundRepeat: "no-repeat",  backgroundPosition: "50% 50%",  backgroundSize:"cover", height:"fit-content", width:"100%" }}>
<div style={{...styles.popupSmall, padding:"1rem", minHeight:"fit-content", width:"100%", }}>

<div style={{fontSize:styles.fonts.fontBody, color:styles.colors.colorWhite}}>World Builder: {this.state.obj?.getJson().title}</div>
 
     
        
 
<div id= "campaignDesc"
      style={{width:"100%", height:"100%", userSelect:"text", marginBottom:"2vh",}}>
        </div> */