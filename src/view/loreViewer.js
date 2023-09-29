import { Component } from 'react';
import "../App.css"
import CardPractice from './CardPrac';
import AddCampaign from './AddCampaign';
import MapComponent from '../componentListNPM/mapTech/mapComponent';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import iconTest from '../pics/iconTest.svg';
import movePin from '../pics/movePin.png';
import Draggable from 'react-draggable';
import React from 'react';
import ReactDOM from 'react-dom';
import backarrow from '../pics/backArrow.webp';
import placeholder from '../pics/placeholderEncounter.JPG';
import InteractiveBulletin from './interactiveBulletin';
import LoreListCard from './pages/loreListCard';
import MapUploader from './uploadMap.js';
import MapGallery from './mapGallery';

export default class LoreViewer extends Component {


  
  constructor(props) {
    super(props);

    this.state = {
      obj: undefined,
      draggableItems: [{}], // Initialize the draggable items array
      isSideBarVisible: false,
    }
    this.addDraggableItem = this.addDraggableItem.bind(this);
    this.eventLogger = this.eventLogger.bind(this); // bind eventLogger method
    }

     //eventLogger method definition
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

  let id = this.props._id;
  let component = this.props.app.state.componentList.getComponent("campaign", id);
  
  let currentLore = this.props.app.state.currentLore;
  
  let map = currentLore===undefined? undefined:  this.props.app.state.componentList.getComponent("map", currentLore.getJson()._id, "loreId");
  this.setState({obj: component, lore:currentLore, map: map});
  
}

componentDidUpdate(props, state){
  if(this.props.app.state.currentLore!==props.app.state.currentLore){
    this.componentDidMount();
  }
}

toggleSidebar = () => {
  this.setState({ isSidebarVisible: !this.state.isSidebarVisible });
};

  render() {
    let obj = this.props.obj;
    let app = this.props.app;
    let state = app.state;
    let styles =state.styles;
    let dispatch = app.dispatch;
    let currentState = app.state;
      let componentList = currentState.componentList;
       //type , value to search,   filter key
       let mapList = componentList.getList("encounter", obj.getJson()._id, "parentId");
    const dragHandlers = {onStart: this.onStart, onStop: this.onStop};
    const {deltaPosition, controlledPosition} = this.state;


    return (
      
      <div style={{display:"flex", flexDirection:"column", position: 'relative', overflow:'clip', padding: '0',
      height:"fit-content", maxWidth:"100%", 
      }}>

       
<MapUploader 
              //ADD THIS TO ALL UPLOADS//
              changePic={async (pic, path)=>{
                

                let map = {picURL: pic, loreId: this.state.lore.getJson()._id, campaignId: this.state.obj.getJson()._id, type:'map'};
                await state.opps.cleanJsonPrepare({addmap: map});
                map = await state.opps.getUpdater("add")[0];
                await map.getPicSrc(path);
                
                state.opps.run();
                this.setState({map:map})

              
              }} 
               text="Add Map" style={{display:"flex",
              zIndex:"1", borderRadius:".1vmin", background:"",}} 
              update={true} skipUpdate={true}
               app={app}/>
{/* <div style={{...styles.buttons.buttonAdd, marginBottom:"1vh", }} onClick={()=>{dispatch({})}}>Add Map</div> */}

          {/* </div>
          </div> */}
{this.state.lore?.getJson()._id !== this.props.app.state.componentList.getComponent("campaign", this.props._id) &&
          <div style={{color:styles.colors.colorWhite}}>{this.state.lore?.getJson().name}</div>}
      
        {(this.state.map) && 
       
       <div style={{height:"1310px", width:"100%"}}>
        <MapGallery app={app} obj={this.state.lore}/>
        
        </div>}

        <div onClick={this.toggleSidebar} style={{...styles.buttons.buttonAdd, fontSize:styles.fonts.fontSmall, 
          padding:"2px", border:"none", zIndex:"9000", position:"fixed", right:"2%", top:"1vh", backgroundColor:styles.colors.color1+"dd",
          }}>
        {this.state.isSidebarVisible ? "Hide Lore >" : "Show Lore <"}
      </div>

        {this.state.isSidebarVisible && (<div style={{position:"fixed", zIndex:"8000", right:"1%", top:"3vh", }}>
        {/* SIDEBAR */}    
                  <div style={{display:"flex", width:"fit-content",}}>
                       <LoreListCard app={app} type="card" options={{cardType:"tallestCard"}}/>
                  </div>
                  </div>)}

      </div>
      
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