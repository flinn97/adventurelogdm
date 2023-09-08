import React, { Component } from 'react'; 
import "../App.css"
import InteractiveMapItem from './interactiveMapItem';
import Upload from './upload';
import MapComponent from '../componentListNPM/mapTech/mapComponent';
import Draggable from 'react-draggable';
import iconTest from '../pics/iconTest.svg';
import movePin from '../pics/movePin.png';
import editPin from '../pics/editPin.png';
import image1 from '../pics/iconTest.svg';
import image2 from '../pics/iconCapitol.svg';
import image3 from '../pics/iconCastle.svg';
import image4 from '../pics/iconCave.svg';
import image5 from '../pics/iconDiablo.svg';
import image6 from '../pics/iconIsland.svg';
import image7 from '../pics/iconKeep.svg';
import image8 from '../pics/iconMask.svg';
import image9 from '../pics/iconMoai.svg';
import image10 from '../pics/iconSheep.svg';
import image11 from '../pics/iconTree.svg';
import image12 from '../pics/iconWall.svg';
import image13 from '../pics/iconChest.svg';
import image14 from '../pics/iconGarg.svg';
import image15 from '../pics/iconSword.svg';
import image16 from '../pics/iconTavern.svg';
import ParentFormComponent from '../componentListNPM/componentForms/parentFormComponent';

export default class InteractiveBulletin extends Component {
  constructor(props) {
    super(props);
    this.parentRef = React.createRef();
    this.state = {
      pins:[],
      isGrabbing: false,
    }}
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
    let remainderH = 1310-[headerH]-11;

    const images = [image1,image2,image3,image4,image5,image6,image7,image8,image9,image10,image11,image12,image13,image14,image15,image16];
    

    return (
                      //ALWAYS 100% 100% DONT CHANGE THIS, change the PARENT div
      <div style={{width:"100%", height:"100%", border:"2px solid white", cursor: this.state.isGrabbing!==true? "":"grabbing",
      }}>

{/* HEADER */}
      <div style={{
        border:"1px solid yellow", display:"flex", flexDirection:"row", justifyContent:"flex-start",
        color:"#ffdead", cursor:"pointer", height:60, width:"100%", alignItems:"center", paddingLeft:"10px" }}>
      {/* BUTTONS IN HEADER */}
        <div style={{...styles.buttons.buttonAdd, padding:"0px", paddingLeft:"10px" }}
        onClick={(e)=>{
          let rect = e.target.getBoundingClientRect();
          let x = (e.clientX - Math.floor(rect.left)).toString();
          let y = (e.clientY - Math.floor(rect.top)).toString();

          state.opps.cleanJsonPrepareRun({addpin:
            {type:"pin", iconImage: iconTest, loreId:"", mapId:"", x:x, y:y, title:"New Lore",}
          });



        }}
        >
          + Lore Point
          <img src={iconTest} style={{width:"40px", marginLeft:"15px", marginRight:"10px", marginTop:"1px"}}></img>
        </div>
      </div>



<div ref={this.parentRef} style={{width:"100%", height:remainderH, position:"relative",}}>

  {state.componentList.getList("pin").map((pin,index)=>
  <Draggable 
  defaultPosition={{x: parseInt(pin.getJson().x, 10), y: parseInt(pin.getJson().y, 10)}}
   grid={[1,1]}
  bounds="parent"
  handle=".draghere"

  onStart={(data)=>{
    this.setState({ isGrabbing: true });
}}
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
      this.setState({ isGrabbing: false });
  }}


  >
    
      <div className='hover-container'
      style={{
        display:"flex", flexDirection:"column", alignItems:"center",cursor:"pointer",
        position:"absolute",}} 
    
      pinId={pin.getJson()._id} >
        {/* pin.getJson()._id */}

        
          <div onClick={()=>{
            // currentPin:pin;
            // if (currentPin !== pin)
            dispatch({operate:"addlore", operation:"cleanJsonPrepareRun",
                          object:{ parentId:"123154564654", type:"lore", name:"new lore",}})
                        }}

              title="Click to Open">

                  <img
                draggable="false" src={pin.getJson().iconImage} style={{width:"48px"}}></img>
          </div>

          <ParentFormComponent app={app} name="title"
              inputStyle={{width:"fit-content", padding:"0px", color:styles.colors.colorWhite, 
                  borderRadius:"4px",background:styles.colors.colorWhite+"11", borderWidth:"0px", position:"absolute",
                  left:"-3.75vw", textAlign: 'center', alignItems: 'center',
                  justifyContent: 'center',
                  textWrap:"wrap", overflowX:"clip", overflowY:"auto", fontSize:styles.fonts.fontSmallest }}/>

              <div className='hover-div'>
            <img className="draghere" draggable="false" style={{ position:"absolute", marginTop:"31px",marginLeft:"34px",width:"25px",
            objectFit:"fill",

            cursor: this.state.isGrabbing!==true? "grab":"grabbing", overflow:"visible"

          }} src={movePin} title="Move"
            ></img>
            
            {this.state.isGrabbing!==true &&
          <div className="hover-containerInt" style={{ position:"absolute", marginTop:"10px",marginLeft:"34px",width:"22px",
          objectFit:"fill", cursor: "pointer", overflow:"visible",}}
          >
                      <img  draggable="false" 
                      style={{ position:"absolute", width:"22px", marginTop:"-3px",
                        objectFit:"fill",
                        cursor: "pointer", overflow:"visible",
                        
                      }} 
                      src={editPin} title="Change"                        />
                                                 
                        <div className='hover-divInt' 
                        style={{width:"155px",height:"150px", borderRadius:"3px", 
                        justifyContent:"space-between",
                        marginLeft:"20px", padding:"2px", display: 'flex', flexDirection: 'row', flexWrap: 'wrap'  }}>
                        
                        {images.map((imgSrc, index) => (
                          <div style={{display:"flex", flexDirection:"row", backgroundColor:styles.colors.color1+"dd",}}>
                              <img 
                              style={{margin:"3px", width:"25px", position:"relative"}}
                              className='hover-divInt'
                              key={index}
                              src={imgSrc}
                              onClick={(item, data)=>{                                
                                let comp = pin;
                                comp.setCompState({
                                    iconImage: imgSrc
                                });
                                  state.opps.cleanPrepareRun({update:comp});
                              }}></img></div>
                              ))}

                        </div>
                        </div>
                        }
                         
              </div>

             
      </div>

  </Draggable>
  )}</div>

      </div>
      ) 
  }
}

