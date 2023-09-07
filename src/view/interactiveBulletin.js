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
    this.parentRef = React.createRef();
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
    let remainderH = 1240-[headerH]-11;


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
    let x = (e.clientX - Math.floor(rect.left)).toString();
    let y = (e.clientY - Math.floor(rect.top)).toString();

    state.opps.cleanJsonPrepareRun({addpin:
      {type:"pin", iconImage: iconTest, loreId:"", mapId:"", x:x, y:y,}
    });



  }}
  >
    + pin
  </div>
</div>



<div ref={this.parentRef} style={{width:"100%", height:remainderH, position:"relative",}}>

  {state.componentList.getList("pin").map((pin,index)=>
  <Draggable 
  defaultPosition={{x: parseInt(pin.getJson().x, 10), y: parseInt(pin.getJson().y, 10)}}
   grid={[1,1]}
  bounds="parent"
  handle=".draghere"


  onStop={(item, data)=>{
    // let pinId = item.target.attributes.pinId?.value;

    let parentRect = this.parentRef.current.getBoundingClientRect();
    let x = Math.min(Math.max(data.x, 1), parentRect.width - 1);
    let y = Math.min(Math.max(data.y, 1), parentRect.height - 1);

    let comp = pin;
    // state.componentList.getComponent("pin",pinId);

    comp.setCompState({
      x: x.toString(), 
      y: y.toString()
    });
   
      state.opps.cleanPrepareRun({update:comp});
  }}


  >
    
      <div 
      style={{
        display:"flex", flexDirection:"column", alignItems:"center",
        position:"absolute",
    }} 
    
      pinId={pin.getJson()._id} >
        {/* pin.getJson()._id */}
        <img onClick={()=>{dispatch({
        popupSwitch:"popupLore",
      })}} draggable="false" src={pin.getJson().iconImage} style={{width:"30px"}}></img>
          <div className="draghere" style={{
        color:styles.colors.colorWhite,textOverflow:"",
        fontSize:"11px", border:"1px dotted #ffdead33", padding:"3px"}}
        >x{pin.getJson().x}y{pin.getJson().y}</div>
      </div>

  </Draggable>
  )}</div>

      </div>
      ) 
  }
}

