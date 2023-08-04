import { Component } from 'react';
import "../App.css"
import CardPractice from './CardPrac';
import AddCampaign from './AddCampaign';
import MapComponent from '../componentListNPM/mapTech/mapComponent';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import InteractiveMap from './interactiveMap';
import iconTest from '../pics/iconTest.svg';
import movePin from '../pics/movePin.png';
import Draggable from 'react-draggable';
import React from 'react';
import ReactDOM from 'react-dom';
import backarrow from '../pics/backArrow.webp';
import placeholder from '../pics/placeholderEncounter.JPG';


export default class Worldbuilder extends Component {


  
  constructor(props) {
    super(props);

    this.state = {
      obj: undefined,
      draggableItems: [{}], // Initialize the draggable items array
    }
    this.addDraggableItem = this.addDraggableItem.bind(this);
    this.eventLogger = this.eventLogger.bind(this); // bind eventLogger method
    }

     // eventLogger method definition
  eventLogger(e, data) {
    console.log('Event: ', e);
    console.log('Data: ', data);
  }

   addDraggableItem() {
      this.setState(prevState => ({
        draggableItems: [...prevState.draggableItems, {}],
      }));
    }

    //onStart and onStop are events provided by react-draggable 
    //and will be triggered when a user starts dragging the element 
    //and stops dragging it, respectively.
 
componentDidMount(){
  let href = window.location.href;
  let splitURL = href.split("/")
  let id = splitURL[splitURL.length-1]
  let component = this.props.app.state.componentList.getComponent("campaign", id)
  this.setState({obj: component})
  
  //RICH TEXT READ
  let campaignDesc = document.getElementById("campaignDesc");
  campaignDesc.innerHTML = component.getJson().description;
}



  render() {
    let app = this.props.app;
    let dispatch = app.dispatch
    let state = app.state;
    let radius = "3vmin";
    let styles =state.styles;
    
    const dragHandlers = {onStart: this.onStart, onStop: this.onStop};
    const {deltaPosition, controlledPosition} = this.state;

    return (
      
      <div style={{display:"flex", flexDirection:"column", position: 'relative', overflow:'clip', padding: '0',
      height:"fit-content", maxWidth:"100%", 
      }}>

            {state.popUpSwitchcase != "worldbuilder" &&
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
                </div>
<div style={{...styles.buttons.buttonAdd, }} onClick={()=>{dispatch({popUpSwitchcase: "addMap" })}}>Add Map</div>
          </div>
          </div>

      
        {(state.popUpSwitchcase === "addMap") && <InteractiveMap app = {app}/>}
 
              {/* Button to add a new draggable item */}
              <div style={{...styles.buttons.buttonAdd, padding:".55%"}} onClick={this.addDraggableItem}>Add Icon</div>
        {/* Loop over the draggableItems array and create a Draggable for each */}
        {this.state.draggableItems.map((item, index) => (
                <Draggable key={index} 
                //bounds="parent"
                handle=".handle" style={{marginLeft:"22px", userSelect: "none"}}
                onStart={this.eventLogger} 
                onStop={this.eventLogger} 
                grid={[1,1]}>

                  <pin style={{width:"fit-content", height:"fit-content",
                    }}>
                   <img className="handle" draggable="false"
                   src={movePin} 
                   style={{width: "18px", height:"18px", cursor:"grab", objectFit:"fill", display:"unset",
                   borderRadius: "50%", right:'-58px', bottom:"-15px", zIndex:40,

                  //  position:'absolute'
                   }}
                   />
                    <img src={iconTest} draggable="false" style={{
                      background:"#00000000",  cursor:"pointer",
                      objectFit:"fill", display:"unset",
                      width: "55px", height:"55px",
                      borderRadius: "50%",
                     
                      // position:"absolute",
                      }}>
                    </img>
                  </pin>

                </Draggable>
              ))}

      </div>
      
    )
  }
}


