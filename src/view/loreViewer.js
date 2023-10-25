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
import GalleryViewer from './galleryViewer';
import ParentFormComponent from '../componentListNPM/componentForms/parentFormComponent';
import LoreSearch from './loreSearch';

export default class LoreViewer extends Component {


  
  constructor(props) {
    super(props);

    this.state = {
      obj: undefined,
      draggableItems: [{}], // Initialize the draggable items array
      isSideBarVisible: false,
      showAddEncounter: false,
      showFindEncounter: false,
      showSaved: false, 
      searchTerm: "",
      imagesToShow: 5,
    }
    this.addDraggableItem = this.addDraggableItem.bind(this);
    this.eventLogger = this.eventLogger.bind(this); // bind eventLogger method
    }

    handleSearchChange = (e) => {
      this.setState({ searchTerm: e.target.value });
    }

     //eventLogger method definition
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
 
async componentDidMount(){

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
      let id = this.state.obj?.getJson()._id;
       //type , value to search,   filter key
    // let mapList = componentList.getList("encounter", obj.getJson()._id, "parentId");
    let lore = this.props.app.state.currentLore;

    const dragHandlers = {onStart: this.onStart, onStop: this.onStop};
    const {deltaPosition, controlledPosition} = this.state;

    const filteredList = componentList.getList("encounter", id, "campaignId")
    .filter(encounter => {
      const name = encounter?.getJson()?.name || "";
      return name.toLowerCase().includes(this.state.searchTerm.toLowerCase());
    })
    .sort((a, b) => {
      const nameA = a?.getJson()?.name || "";
      const nameB = b?.getJson()?.name || "";
      return nameA.localeCompare(nameB);
    });



    return (
      <div>
          <div style={{color:styles.colors.colorWhite+"55", fontSize:styles.fonts.fontSmall}}> Description:
          <ParentFormComponent app={app} name="desc" obj={lore}
                      theme={"adventureLog"} 
                        rows={5}
                        prepareRun={true}
                      
                      inputStyle={{maxWidth:"100%", padding:"2px 5px", color:styles.colors.colorWhite, height:"fit-content",
                      borderRadius:"4px",background:styles.colors.colorWhite+"00", 
                      border:"solid 1px "+styles.colors.colorWhite+"22", fontSize:styles.fonts.fontSmall }}
                      type={"richEditor"}
                      wrapperStyle={{margin:"5px", color:styles.colors.colorWhite, display:"flex",
                      flexDirection:"column", justifyItems:"space-between"}}/></div>

      <div style={{display:"flex", flexDirection:"column", position: 'relative', overflow:'clip', padding: '0',
      height:"fit-content", maxWidth:"100%", marginTop:"20px",
      }}>

       <div>
       <hr></hr>
<MapUploader 
              //ADD THIS TO ALL UPLOADS//
              changePic={async (pic, path)=>{
                
                
                let map = {picURL: pic, loreId: this.state.lore.getJson()._id, campaignId: id, type:'map'};
                await state.opps.cleanJsonPrepare({addmap: map});
                map = await state.opps.getUpdater("add")[0];
                await map.getPicSrc(path);
                
                state.opps.run();
                this.setState({map:map})

              
              }} 
               text="Add Map" style={{display:"flex", marginBottom:"20px",
              zIndex:"1", borderRadius:".1vmin", background:"",}} 
              update={true} skipUpdate={true}
               app={app}/>
{/* <div style={{...styles.buttons.buttonAdd, marginBottom:"1vh", }} onClick={()=>{dispatch({})}}>Add Map</div> */}

          {/* </div>
          </div> */}
{this.state.lore?.getJson()._id !== this.props.app.state.componentList.getComponent("campaign", this.props._id) &&

          <div style={{color:styles.colors.colorWhite}}>
            {/* {this.state.lore?.getJson().name} */}
            </div>}
      
        {(this.state.map) && 
       
       <div style={{height:"1310px", width:"100%"}}>
        <MapGallery app={app} obj={this.state.lore}/>
        
        </div>}

          



        </div>

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

      {/* ENCOUNTER ENCOUNTER ENCOUNTER */}
      <hr></hr>
      
        <div style={{marginTop:"-10px", color:styles.colors.colorWhite+"55", fontSize:styles.fonts.fontSmall}}>{lore.getJson().name} Encounters</div>
        {!this.state.showFindEncounter && !this.state.showFindImage &&
            <div style={{display:"flex", justifyContent:"center", flexDirection:"column"}}> 
                        <div className="indent-on-click" style={{...styles.buttons.buttonAdd, 
                        fontSize:styles.fonts.fontSmall,
                        marginTop:"1vh", alignSelf:"center", padding:"1%"}}
                        title="Create a new encounter, you can edit it by clicking on it." 
                          onClick={() => {
                        state.opps.cleanJsonPrepareRun({
                          "addencounter":{loreId: lore.getJson()._id, 
                            name:"New Encounter", campaignId: this.state.obj.getJson()._id}})

                        // window.open("/encounter/" + state.currentComponent.getJson()._id, "_blank")
                        this.setState({ showAddEncounter: true });
                        }}>
                          + Create New Encounter
                        </div>


                        <div className="indent-on-click" style={{...styles.buttons.buttonAdd, fontSize:styles.fonts.fontSmall,marginBottom:"2vh",
                        marginTop:"1vh", alignSelf:"center", padding:"1%"}}
                        title="Find an existing encounter to add to this lore.
                        This will create a COPY." 
                          onClick={() => {
                            this.setState({showFindEncounter: true })
                        }}>
                          Find Encounter
                        </div>
                        </div>
          }

          {(this.state.showFindEncounter || this.state.showFindImage) && 

          <div className="indent-on-click"  
          onClick={() => {
            this.setState({showFindEncounter: false, showFindImage: false })
          }}
          style={{...styles.buttons.buttonAdd, textDecoration:"none", fontStyle:"italic", background:styles.colors.color7+"aa", marginTop:"4px",
          fontWeight:"bold", letterSpacing:".05rem", padding:".1%"}}
          
          >
            <img style={{width:".9rem", opacity:"98%", marginRight:".75rem"}}
            src={backarrow}
            />
            Back
          </div>}

          {this.state.showFindEncounter &&
        <div>
<div style={{ display:"flex", justifyContent:"flex-end", }}>

        <input app={app}
        
        type="input" 
        placeholder="Search..." 
        value={this.state.searchTerm} 
        onChange={this.handleSearchChange}
        style={{ backgroundColor: styles.colors.color1+"ee",  
        color: styles.colors.colorWhite,  
        borderRadius:"11px",
        width:"420px", 
        padding: '8px',  
        fontSize: '16px', }}
      />

</div>
        <div style={{display:"flex", justifyContent:"space-around", marginTop:"3vh",}}>


          {
          
          filteredList.map((encounter, index) => 
          <div 

         onClick={async () => {{
            let enc = await encounter.copyEncounter(componentList);
            if (enc){
            state.currentComponent.assign(enc);}
            this.setState({showFindEncounter: false })
          }}}

          style={{color: styles.colors.colorWhite, 
            textDecoration: "none", userSelect:"none",
            height: "fit-content", cursor:"pointer",
            width: "fit-content"}}>
            <div style={{display: "flex", flexDirection: 'column', 
                          borderRadius:styles.popupSmall.borderRadius,
                          justifyContent:"space-evenly", 
                          zIndex:"0", 
                          height: 'fit-content', 
                          width: 'fit-content', 
                          backgroundImage: 'url('+(encounter?.getJson().picURL||placeholder)+')',
                          ...styles.backgroundContent}}>
                        
                        <div style={{
                        ...styles.popupSmall, display: "flex", flexDirection: "row", justifyContent:"space-between", flexDirection: 'column',
                        height: "fit-content", 
                         width: "fit-content"}}>
                          
                          <div 
                          
                          style={{display: "flex", height:"fit-content", width:"fit-content", fontWeight:"bold", fontFamily:"serif", 
                          textDecoration: styles.colors.colorWhite+"22 underline", textDecorationThickness: "1px", textUnderlineOffset: "4px",
                          textShadow:"1px 1px 0 "+styles.colors.colorBlack, textShadow:"-1px -1px 0 "+styles.colors.colorBlack,
                          
                          alignItems:"center", justifyContent:"center", fontSize:styles.fonts.fontSmallest,}}>
                            {encounter?.getJson().name}
                          </div>
                </div>
        </div>
          </div>
          
          )}

        </div>
        </div>}
       
       {/* GALLERY GALLERY GALLERY */}
          <hr></hr>
                  <div style={{marginTop:"-10px", color:styles.colors.colorWhite+"55", fontSize:styles.fonts.fontSmall}}>{lore.getJson().name} Gallery</div>
                  <GalleryViewer app={app} type="card" options={{tabType:"bigCardBorderless", cardType:undefined}}
                      />   

<hr></hr>
                <LoreSearch app={app} type="card" options={{tabType:"bigCardBorderless", cardType:undefined}}
                                />
                                    
                            

            </div>

          
      
    )
  }
}

