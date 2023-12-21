import { Component } from 'react';
import "../App.css"

import MapComponent from '../componentListNPM/mapTech/mapComponent';

import React from 'react';

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
    this.updateSize = this.updateSize.bind(this)
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
  debugger
  let map = currentLore===undefined? undefined:  this.props.app.state.componentList.getComponent("map", currentLore.getJson()._id, "loreId");
  if(!map){
    map = await auth.firebaseGetter(currentLore.getJson()._id, this.props.app.state.componentList, "loreId", "map", undefined);
    map = map[0]
  }
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
updateSize(width, height){
  this.setState({
    bulletinWidth:width+"px",
    bulletinHeight:height+"px"
  })
}

  render() {
    let obj = this.props.obj;
    let app = this.props.app;
    let state = app.state;
    let styles =state.styles;
    let dispatch = app.dispatch;
    let currentState = app.state;
      let componentList = currentState.componentList;
      let id = this.state.obj?.getJson()._id;
       
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

    let allColors = lore.getJson().colors?lore.getJson().colors:[styles.colors.color7];
    let colorList = Object.values(allColors);
    const randomColor = this.getUniqueRandomColor(colorList);

    const quote = <div style={{color:styles.colors.color8+"d5",fontSize:styles.fonts.fontSmall, opacity:".5", width:"1%"}}>
    "</div>;
    console.log("loreview rerender")

    return (
      <div style={{minWidth:"100%",}}>
        
              <div style={{display: "flex", flexDirection: "row",alignContent:"flex-end", 
              justifyContent:"flex-end", marginBottom:"12px", fontSize:styles.fonts.fontNormal, color:styles.colors.color8+"88", 
              marginTop:"12px"}}>
            <PostLogButton app={app} obj={lore} altText={"description"} val={lore.getJson().desc} />
              </div>
          <div style={{color:styles.colors.color3+"f5", fontSize:styles.fonts.fontSmall, marginBottom:"32px"}}> Lore:

          {/* < QuillComponent app = {app}/> */}
          <ParentFormComponent app={app} name="desc" obj={lore}
                      theme={"adventureLog"} 
                        rows={5}
                        prepareRun={true}
                        type={"richEditor"} onPaste={this.handlePaste}
                      inputStyle={{maxWidth:"100%", padding:"2px 5px", color:styles.colors.colorWhite, height:"fit-content",
                      borderRadius:"4px",background:styles.colors.colorWhite+"00", 
                      border:"solid 1px "+styles.colors.colorWhite+"22", fontSize:styles.fonts.fontSmall }}
                      wrapperStyle={{margin:"5px", color:styles.colors.colorWhite, display:"flex", marginBottom:"-10px",
                      flexDirection:"column", justifyItems:"space-between"}}/>
                      
                      </div>


<div style={{display: "flex", flexDirection: "row",alignContent:"flex-end", 
justifyContent:"flex-end", marginBottom:"-22px", fontSize:styles.fonts.fontNormal, color:styles.colors.color8+"88", 
marginTop:"22px"}}>
             <PostLogButton app={app} obj={lore} altText={"read text"} val={lore.getJson().handoutText} forceValue={true}/>
              </div>
              
          <div 
          style={{color:styles.colors.color3+"f5", fontSize:styles.fonts.fontSmall,
          marginTop:"12px", marginBottom:"32px"}}> Handout:
          <div style={{display:"flex", flexDirection:"row", minWidth:"100%", width:"100%", maxWidth:"100px"}}>
         {quote} <ParentFormComponent app={app} name="handoutText" obj={lore}
                      theme={"adventureLog"} 
                        rows={5}
                        prepareRun={true}
                        type={"richEditor"} onPaste={this.handlePaste}
                      inputStyle={{minWidth:"100%", padding:"2px 5px", color:styles.colors.colorWhite+"d9", height:"fit-content",
                      borderRadius:"4px",background:styles.colors.colorWhite+"00", 
                      border:"solid 1px "+styles.colors.colorWhite+"22", fontSize:styles.fonts.fontSmall }}
                      
                      wrapperStyle={{margin:"5px", color:styles.colors.colorWhite, display:"flex", width:"99%", marginLeft:"-2px",
                      flexDirection:"column", justifyItems:"space-between"}}/>{quote}</div></div>

                      

      <div style={{display:"flex", flexDirection:"column", position: 'relative',
      height:"100%", maxWidth:"100%", marginTop:"20px",
      }}>
      
       <div>
       <MapUploader 
              //ADD THIS TO ALL UPLOADS//
              changePic={async (pic, path) => {
                // Your existing logic
                let map = {picURL: pic, loreId: this.state.lore.getJson()._id, campaignId: id, type:'map'};
                await state.opps.cleanJsonPrepare({addmap: map});
                map = await state.opps.getUpdater("add")[0];
                await map.getPicSrc(path);

                // Your color updating logic
                let colors = colorService.updateColors(pic, (palette) => {
                  this.setState({ colors: palette }, async () => {
                    let con = this.state.colors;
                    let list = Object.values(con);
                    await this.setState({colors: list});
                    
                    // Update lore colors
                    let allColors = await this.state.lore.getJson().colors || [];  // Initialize to empty array if undefined
                    let newAllColors = allColors.concat(list);
                    await lore.setCompState({ colors: newAllColors });
                    dispatch({
                      operate:"update", operation:"cleanPrepareRun", object: lore
                    })
                    
                   
                  });
                });

                state.opps.run();
                this.setState({map:map});

              }}

               text="Add Map" style={{display:"flex", marginBottom:"20px",
              zIndex:"1", borderRadius:".1vmin", background:"",}} 
              update={true} skipUpdate={true}
               app={app}/>



          {/* </div>
          </div> */}
{this.state.lore?.getJson()._id !== this.props.app.state.componentList.getComponent("campaign", this.props._id) &&

          <div style={{color:styles.colors.colorWhite}}>
            {/* {this.state.lore?.getJson().name} */}
            </div>}
      
        {(this.state.map) && 
       <><div style={{color:'white'}}  onClick={()=>{
        state.opps.cleanPrepareRun({del:this.state.map});
        this.setState({map:undefined});
       }}>delete Map</div>
       <div style={{height:this.state.bulletinHeight?this.state.bulletinHeight:"1310px", width: this.state.bulletinWidth?this.state.bulletinWidth:"100%"}}>
        <MapGallery app={app} obj={this.state.lore} color={randomColor} updateSize = {this.updateSize}/>
        
        </div></>}

          
        
                


        </div>

        <div className="hover-btn" onClick={this.toggleSidebar} style={{...styles.buttons.buttonAdd, 
        fontSize:styles.fonts.fontSmall, display:"flex", flexDirection:"column",
        padding:"4px 8px", border:"none", zIndex:"9000", position:"fixed", right:"2%", top:"1vh", backgroundColor:styles.colors.color1+"dd",
        }}>
      {this.state.isSidebarVisible ? "Hide Lore >" : "Show All Lore <"}
        {!this.state.isSidebarVisible &&
        <div style={{fontSize:".64rem", color:styles.colors.color8}}>Expand and review all Lore</div>
        }
      </div>

        {this.state.isSidebarVisible && (<div style={{position:"fixed", zIndex:"8000", right:"9px", top:"3vh",  }}>
        {/* SIDEBAR */}    
                  <div   style={{display:"flex", width:"fit-content", height:"100%", }}>
                       <LoreListCard app={app} type="card" options={{cardType:"tallestCard"}}/>
                  </div>
                  </div>)}

          

      </div>

      <LoreSearch app={app} type="card" options={{tabType:"bigCardBorderless", cardType:undefined}}
                                />

      {/* ENCOUNTER ENCOUNTER ENCOUNTER */}
      <hr></hr>
      

        <div style={{marginTop:"-10px", color:styles.colors.colorWhite+"55", fontSize:styles.fonts.fontSmall}}>{lore.getJson().name} Encounters</div>
        {!this.state.showFindEncounter && !this.state.showFindImage &&
        <div>

<div  className="hover-btn" style={{...styles.buttons.buttonAdd, marginTop:"15px", backgroundColor:styles.colors.colorBlack+"99",
                                      paddingLeft:"29px",  paddingRight:"29px", alignSelf:"flex-start", justifyItems:"center",  height:"36px",
                                      borderRadius:"9px", fontSize:"21px", 
                                    }}
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


                        <div className="hover-btn" style={{...styles.buttons.buttonAdd, marginTop:"15px", backgroundColor:styles.colors.colorBlack+"99",
                                      paddingLeft:"29px",  paddingRight:"29px", alignSelf:"flex-start", justifyItems:"center",  height:"36px",
                                      borderRadius:"9px", fontSize:"21px", 
                                    }}
                        title="Find an existing encounter to add to this lore.
                        This will create a COPY." 
                          onClick={() => {
                            this.setState({showFindEncounter: true })
                        }}>
                          Find Encounter
                        </div>

            <div style={{display:"flex", justifyContent:"center", flexDirection:"column"}}> 

        <div style={{ marginTop:"2vh", marginBottom:"1vh",}}> 
             <MapComponent app={app} name={"encounter"} cells={[{custom:EncounterMapItem, props:{app:app}},]} 
            filter={{search: lore.getJson()._id, attribute: "loreId"}}
            theme={"selectByImageSmall"}
            />
            
            </div>

                        
                        </div></div>
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


                                    
                            

            </div>

          
      
    )
  }
}

