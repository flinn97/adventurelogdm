import { Component } from 'react';
import "../App.css"
import CardPractice from './CardPrac';
import AddCampaign from './AddCampaign';
import MapComponent from '../componentListNPM/mapTech/mapComponent';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import InteractiveMap from './interactiveMap';
import iconTest from '../pics/iconTest.svg';
import Draggable from 'react-draggable';
import React from 'react';
import ReactDOM from 'react-dom';


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
}



  render() {
    let app = this.props.app;
    let dispatch = app.dispatch
    let state = app.state;
    let styles =state.styles;

    const dragHandlers = {onStart: this.onStart, onStop: this.onStop};
    const {deltaPosition, controlledPosition} = this.state;

    return (
      <div style={{display:"flex", flexDirection:"column", position: 'relative', overflow:'clip', padding: '0',
      color: "green", background:"black", height:"900px", maxWidth:"1100px", }}>
        <h1>World Builder</h1>
      
             
                
      {this.state.obj?.getJson().title}
      {this.state.obj?.getJson().description}
      <div style={{...styles.buttons.buttonAdd}} onClick={()=>{dispatch({popUpSwitchcase: "addMap" })}}>Add Map</div>
        {(state.popUpSwitchcase === "addMap") && <InteractiveMap app = {app}/>}
 
              {/* Button to add a new draggable item */}
              <div style={{...styles.buttons.buttonAdd, padding:".55%"}} onClick={this.addDraggableItem}>Add Icon</div>
        {/* Loop over the draggableItems array and create a Draggable for each */}
        {this.state.draggableItems.map((item, index) => (
                <Draggable key={index} bounds="parent" 
                onStart={this.eventLogger} // Call eventLogger on start of dragging
                onStop={this.eventLogger}  // Call eventLogger on stop of dragging
                grid={[1,1]}>

                    <img src={iconTest} draggable="false" style={{
                      background:"#00000000", cursor:"grab", position:"absolute",
                      objectFit:"fill", display:"unset",
                      width: "55px", height:"55px",
                      borderRadius: "50%",
                      userSelect: "none",
                      top: "290px", // Starting top position
                      left: "102px", // Starting left position
                      }}>
                    </img>
                    
                </Draggable>
              ))}

      </div>
      
    )
  }
}


