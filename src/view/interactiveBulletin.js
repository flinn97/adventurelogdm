import React, { Component } from 'react'; 
import "../App.css"
import InteractiveMapItem from './interactiveMapItem';
import Upload from './upload';
import MapComponent from '../componentListNPM/mapTech/mapComponent';
import Draggable from 'react-draggable';
import iconTest from '../pics/iconTest.svg';

export default class InteractiveBulletin extends Component {
  constructor(props) {
    super(props);
     
    this.state = {
      pins:[],
      
    }
  }
  componentDidMount(){
    ///assign pins to current mapId
  };

  render() {
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles =state.styles;
    let headerH = 50;
    let remainderH = 900-[headerH]-11;


    return (
                      //ALWAYS 100% 100% DONT CHANGE THIS, change the PARENT div
      <div style={{width:"100%", height:"100%", border:"2px solid white",}}>

<div style={{
  border:"1px solid yellow", display:"flex", flexDirection:"row", justifyContent:"flex-start",
  color:"#ffdead", cursor:"pointer", height:60, width:"100%", alignItems:"center", paddingLeft:"10px" }}>

  <div style={{...styles.buttons.buttonAdd, padding:"1.8%", width:"fit-content", height:"fit-content", 
  borderRadius:"11px", padding:"8px" }}
  onClick={(e)=>{
    let rect = e.target.getBoundingClientRect();
    let x = e.clientX - Math.floor(rect.left);
    let y = e.clientY - Math.floor(rect.top);

    let pins= [...this.state.pins];

    // dispatch({operate: "addpin", operation: "cleanPrepareRun",
    // object: {iconImage: iconTest, loreId:"", x, y}});

    pins.push({x, y, loreId:"11",mapId:"",iconImage:iconTest});

    this.setState({pins:pins});

  }}
  >
    +pin
  </div>
</div>



<div style={{width:"100%", height:remainderH, position:"relative"}}>
  {this.state.pins.map((pin,index)=>
  <Draggable 
  defaultPosition={{x: pin.x, y: pin.y}} grid={[1,1]}
  bounds="parent"

  //onStop={(item)=>{console.log(item.target.attributes._id.value)}}
  onDrag={(e, data) => {
    const updatedPins = [...this.state.pins];
    updatedPins[index].x = data.lastX;
    updatedPins[index].y = data.lastY;
    this.setState({ pins: updatedPins, });
  }}

  >
      <div style={{
        color:styles.colors.colorWhite, width:"fit-content", textOverflow:"",
        position:"absolute", fontSize:"13px", border:"1px dotted #ffdead33", padding:"3px"
    }} 
      pinId={pin._id} >
        
          x{pin.x} y{pin.y}
      </div>

  </Draggable>
  )}</div>

      </div>
      ) 
  }
}

