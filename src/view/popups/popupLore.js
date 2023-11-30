import React, { Component } from 'react';
import "../../App.css"
import ParentFormComponent from '../../componentListNPM/componentForms/parentFormComponent';
import RunButton from '../../componentListNPM/componentForms/buttons/runButton';
import EncounterCard from '../pages/encounterCard';
import AddEncounter from '../AddEncounter';
import MapComponent from '../../componentListNPM/mapTech/mapComponent';
import EncounterMapItem from '../encounterMapItem';
import backarrow from '../../pics/backArrow.webp';
import placeholder from '../../pics/placeholderEncounter.JPG';
import newWindow from '../../pics/newWindow.png';
import Upload from '../upload';
import LoreItemWithNotation from '../loreItemwithNotation';
import PostLogButton from '../../componentListNPM/componentForms/buttons/postLogButton';

export default class PopupLore extends Component {
  constructor(props) {
    super(props);

  }

  

  render() {
    let app = {...this.props.app};
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles =state.styles;
    
    
    if(this.props.theme){
      if(Object.prototype.toString.call(this.props.theme) === "[object String]"){
        styles = state.themeFactory.getThemeFactory()[this.props.theme];
      }
      else{
        styles= this.props.theme;
      }
    }
    app.state.styles=styles
    
    //********CARD ASSIGN********/

    let cards={

      card: <Card app={{...app, state:{...app.state, styles:styles} }} options={this.props.options} type={this.props.type}/>,
      cardWithTab: <CardWithTab app={{...app, state:{...app.state, styles:styles}}} options={this.props.options} type={this.props.type}/>,
      popup: <Popup app={{...app, state:{...app.state, styles:styles} }} handleClose={this.props.handleClose}  options={this.props.options} type={this.props.type} delClick={this.props.delClick}/>,
      popupWithTab: <PopupWithTab app={{...app, state:{...app.state, styles:styles}}} handleClose={this.props.handleClose} options={this.props.options} type={this.props.type}  delClick={this.props.delClick}/>
//popupType={this.props.popupType} popupTab={this.props.popupTab}
    
    }
    
    //*********CARD ASSIGN********/

    return (
      <div >
        
        {cards[this.props.type? this.props.type: "card"]}
        </div>

    )
  }
}



//********CONTENTS********/
class MainContent extends Component{
  constructor(props) {
    super(props);
    this.state = {
      showAddEncounter: false,
      showFindEncounter: false,
      showFindImage: false,
      showSaved: false, 
      searchTerm: "",
      imagesToShow: 5,
      hasChoice: "",
    };
  }

  handleSearchChange = (e) => {
    this.setState({ searchTerm: e.target.value });
  }

  async setConnectedLore(lore){
    let path = window.location.pathname;
    let parts = path.split('/');
    let idSegment = parts.pop();
    let idParts = idSegment.split('-');
    let parentId = idParts.length >= 2? idParts[1]:idParts[0];
    let state = this.props.app.state;
    
    let type = idParts.length >= 2?"lore":"campaign";
    let parent = state.componentList?.getComponent(type, parentId, "_id");
    let parentName = type === "campaign"? "title":"name";
    
    await state.opps.clearUpdater();
    
    await lore.updateObjInsideJson("parentId", {[parentId]:parent.getJson()[parentName]});
    
    
    if(state.currentPin)
        {
          let pin = state.currentPin;
          let id = lore.getJson()._id;
          let loreName =lore.getJson().name
          pin.setCompState({ 
            name: loreName,
            loreId: id,
          });
          await state.opps.prepare({update:pin});
        }
        
        
        await state.opps.prepareRun({update: lore});
        await this.props.app.dispatch({ currentComponent: lore});
  }

  async componentDidMount(){
    let state = this.props.app.state;
    let loreName = await state.currentComponent.getJson().name;
 console.log(loreName);
    if(loreName==""||loreName==undefined){
      this.setState({hasChoice:""})
    }else{
      this.setState({hasChoice:"New"})
    }
  }

  render(){
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles =state.styles;
    let href = window.location.href;
    let splitURL = href.split("/");
    let id = splitURL[splitURL.length-1];
    let newLink = "";
    let imageList = state.componentList.getList("image", state.currentComponent.getJson()._id, "loreId");
    let idList = id.split('-');
    let lore = state.currentComponent;

    let placeholder = state.currentPin?.getJson().name;

    

    if(id.includes("-")){
      let newArr = [...splitURL];
      newArr.pop()
      
      let str = newArr.join(',');
     str = str.replace(/,/g, '/');
     
      let newId = idList[0] + "-" + state.currentComponent.getJson()._id
      newLink=str+"/" +newId;
      
    }
    else{
      newLink = href + "-" + state.currentComponent.getJson()._id;
    };

    

    const filteredList = componentList.getList("encounter", idList[0], "campaignId")
          .filter(encounter => {
            const name = encounter?.getJson()?.name || "";
            return name.toLowerCase().includes(this.state.searchTerm.toLowerCase());
          })
          .sort((a, b) => {
            const nameA = a?.getJson()?.name || "";
            const nameB = b?.getJson()?.name || "";
            return nameA.localeCompare(nameB);
          });

          
    
          const filteredLore = componentList.getList("lore", idList[0], "campaignId")
          .filter(item => {
            const name = item?.getJson()?.name;
            return name && name.toLowerCase().includes(this.state.searchTerm.toLowerCase());
          })
          .sort((a, b) => {
            const nameA = a?.getJson()?.name;
            const nameB = b?.getJson()?.name;
            return nameA.localeCompare(nameB);
          });
        

    return(
      <div style={{
        display:"flex", width:"57vw", flexDirection:"column", height:"fit-content", alignContent:"center",
        
        paddingTop:"40px", fontFamily:"serif", fontSize:styles.fonts.fontSubheader1, marginBottom:"2%",}}>

        

{ this.state.hasChoice === "New" &&
<div style={{
        display:"flex", width:"57vw", flexDirection:"column", height:"fit-content", alignContent:"center",
        
        paddingTop:"40px", fontFamily:"serif", fontSize:styles.fonts.fontSubheader1, marginBottom:"2%",}}>
          {(this.state.showFindEncounter || this.state.showFindImage) && 
          <div className="indent-on-click"  
          onClick={() => {
            this.setState({showFindEncounter: false, showFindImage: false })
          }}
          style={{...styles.buttons.buttonAdd, textDecoration:"none", fontStyle:"italic", background:styles.colors.color7+"aa",
          fontWeight:"bold", letterSpacing:".05rem", marginBottom:"2vh", padding:"1%"}}
          
          >
            <img style={{width:".9rem", opacity:"98%", marginRight:".75rem"}}
            src={backarrow}
            />
            Back
          </div>}
{/* IMAGE TOKEN */}
<div style={{backgroundImage: `url(.${state.currentPin?.getJson().picURL})`, width:"44px", height:"44px", position:"absolute", top:11, left:11}}></div>

{/* OTHER STUFF */}
      {!this.state.showFindEncounter && !this.state.showFindImage &&        
<div style={{flexDirection:"column", display:"flex", alignSelf:"center"}}>

<ParentFormComponent app={app} name="name"
  // prepareRun={true}
              placeholder={placeholder}
              inputStyle={{maxWidth:"55.5vw", width:"55.5vw", padding:"4px 9px", color:styles.colors.color3, height:"fit-content",
              borderRadius:"4px",background:styles.colors.colorWhite+"00", borderWidth:"0px", height:"100%", 
              border:"solid 1px "+styles.colors.colorWhite+"22",
              textWrap:"wrap", fontSize:styles.fonts.fontSubheader1}}/>

  { (lore?.getJson().name!=="" && lore?.getJson().name!==undefined) &&
    <div  style={{ display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  cursor: "pointer", 
                  color: styles.colors.colorWhite, 
                  fontSize: styles.fonts.fontSmallest, 
                  marginTop: "11px", 
                  textDecoration: "underline 1px",
                  textDecorationColor: "#ffdead22", 
                  alignSelf: "flex-end" }} 
    onClick={() => 
      
      (window.open(newLink, '_blank'))
  
  }
    >
      Open in new tab
      
      <img className="indent-on-click" style={{ width: "19px", marginLeft: "8px" }} src={newWindow} />

      </div>}

      { (lore?.getJson().name===""||lore?.getJson().name===undefined) &&
    <div style={{cursor:"progress",
      color:styles.colors.colorWhite+"88", fontSize:styles.fonts.fontSmallest,marginTop:"11px", textDecorationColor:"#ffdead22", alignSelf:"flex-end"}} 
    >
      You must first save this lore to open it.
      </div>}
    
    
<hr></hr>

        <div style={{marginTop:"-12px", display: "flex", flexDirection: "column",}}>   
{/* ///LOG BUTTON */}
          <div style={{display: "flex", flexDirection: "row",alignContent:"flex-end", justifyContent:"flex-end"}}>
        <PostLogButton app={app} obj={lore} altText={"description"}/>
          </div>
            <ParentFormComponent app={app} name="desc"
                        theme={"adventureLog"} 
                          rows={5}
                          // prepareRun={true}
                        inputStyle={{maxWidth:"55.5vw", padding:"2px 5px", color:styles.colors.colorWhite, height:"fit-content",
                        borderRadius:"4px",background:styles.colors.colorWhite+"00", 
                        border:"solid 1px "+styles.colors.colorWhite+"22", fontSize:styles.fonts.fontSmall }}
                        type={"richEditor"}
                        wrapperStyle={{margin:"5px", color:styles.colors.colorWhite, display:"flex",
                        flexDirection:"column", justifyItems:"space-between"}}/>
      </div>
</div>}

<div>
          {/* ENCOUNTER */}
          {!this.state.showFindEncounter && !this.state.showFindImage &&   <div> <hr></hr>
          <div style={{ marginTop:"-18px", color:styles.colors.colorWhite+"77", fontSize:styles.fonts.fontSmall,}}>Encounters</div>

          <div style={{ marginTop:"2vh", marginBottom:"1vh",}}> 
             <MapComponent app={app} name={"encounter"} cells={[{custom:EncounterMapItem, props:{app:app}},"delete"]} 
            filter={{search: state.currentComponent.getJson()._id, attribute: "loreId"}}
            theme={"selectByImageSmall"}
            />
            
            </div>
            </div>}

          
  {!this.state.showFindEncounter && !this.state.showFindImage &&
<div style={{display:"flex", justifyContent:"center", flexDirection:"column"}}> 
            <div className="indent-on-click" style={{...styles.buttons.buttonAdd, 
            fontSize:styles.fonts.fontSmall,
            marginTop:"1vh", alignSelf:"center", padding:"1%"}}
            title="Create a new encounter, you can edit it by clicking on it." 
              onClick={() => {
             state.opps.cleanJsonPrepareRun({
              "addencounter":{loreId: state.currentComponent.getJson()._id, 
                name:"New Encounter", campaignId: id}})

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
            </div>}
          
          {/* { this.state.showAddEncounter &&
            <AddEncounter app={app} />
          } */}
        </div>

        {!this.state.showFindEncounter && !this.state.showFindImage &&
        <div>
        <hr></hr> 
        <div style={{ marginTop:"-18px", color:styles.colors.colorWhite+"77", fontSize:styles.fonts.fontSmall,}}>Gallery</div>
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

{/* GALLERY GALLERY  GALLERY GALLERY  GALLERY GALLERY  GALLERY GALLERY  GALLERY GALLERY */}

        {!this.state.showFindImage && !this.state.showFindEncounter && 
        <div style={{display:"flex", justifyContent:"center", flexDirection:"column", justifyItems:"center"}}>

            <div className="image-grid" style={{display:"flex", justifyContent:"center", 
                  flexDirection:"row", justifyItems:"space-around", flexWrap:"wrap",
                  }}>
              {
                imageList
                .slice(0, this.state.imagesToShow)
                .map((img, index) => (
                  <div className="hover-img" key={index}>
                    
                    <img 
                    onClick={()=>{
                         
                          dispatch({currentPic:img, popupSwitch:"viewPic"})
                        }}
                     draggable="false" src={img.getJson().picURL} 
                    style={{
                      maxWidth: "180px", minWidth:"100px", height:"fit-content",
                       margin:"9px", cursor:"pointer", borderRadius:"10px"
                    }}
                    alt={`img-${index}`} />
                  </div>
                ))
              }
              {
                imageList.length > this.state.imagesToShow &&
                <div className="hover-img" 
                onClick={() =>
                  this.setState(prevState => ({ imagesToShow: prevState.imagesToShow + 5 }))} 
                  style={{maxHeight: "150px", cursor:"pointer", textAlign:"center", padding:"8px",
                    maxWidth: "150px", display:"flex", alignItems:"center", justifyContent:"center",
                     fontSize: "24px", borderRadius:"20px", marginBottom:"3vh",
                    color:styles.colors.colorWhite, border:""+styles.colors.colorWhite+"55 solid"
                  }}>
                    <div 
                    style={{display:"flex", position:"relative",}}>
                  +{imageList.length - this.state.imagesToShow} more
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', 
                  }}>
                    {
                      imageList
                      .slice(this.state.imagesToShow, this.state.imagesToShow+9)
                      .map((img, index) => (
                        <div>
                        <img draggable="false" key={index} src={img.getJson().picURL} 
                        style={{
                          maxWidth: "20px", margin:"2px", opacity:"40%"
                        }}
                        alt={``} />
                        </div>
                      ))
                    }
                  </div>
                </div>
              }
            </div>


          <div style={{display:"flex", justifyContent:"center", flexDirection:"row", justifyItems:"center"}}>
          <div style={{display:"flex", justifyContent:"center", justifyItems:"center", marginTop:"8px",}}>

                <Upload text="+ Upload" 
                //PUT THIS IN CAMPAIGN TOO
                prepareOnChange={{
                  name:"image", json:{
                    loreId: state.currentComponent.getJson()._id,
                    campaignId: id}
                }}

                     
                      obj={app.state.currentComponent}
                      update={true} skipUpdate={true}
                      
                        app={app} 
                        className="indent-on-click"
                
                />
                
        </div>

        {/* <div className="indent-on-click" 
        title="Find an existing image to add to this lore." 
        style={{...styles.buttons.buttonAdd, fontSize:styles.fonts.fontSmall,marginBottom:"2vh",
        marginTop:"1vh", alignSelf:"center", padding:"1%"}}
          onClick={() => {
            this.setState({showFindImage: true })
        }}>
          Find Image
        </div> */}
        
        </div>
        </div>
        }
        

  <div className="indent-on-click" 
        style={{ display:"flex", width:"92px", background:"red", borderRadius:'3vh', 
        alignSelf:"flex-end", bottom:'0px', alignItems:"flex-end",
        position:"sticky", marginTop:"8.24vh", marginBottom:"1vh",
        }}>
                  <RunButton app={app} text="Save" 
                  
                  runFunc={(arr)=>{
                    
                    let lore = arr[0];
                    if(state.currentPin){
                      
                      let pin = state.currentPin;
                      
                      if (lore.getJson().name===""||lore.getJson().name===undefined){
                        lore.setCompState({name:pin.getJson().name});
                      }
                      pin.setCompState({loreId: lore.getJson()._id, 
                        name: lore.getJson().name,
                      });
                      state.opps.prepareRun({update:pin});
                    }
                    else{
                      state.opps.run();
                    }
                    this.setState({ showSaved: true });
                    setTimeout(() => this.setState({ showSaved: false }), 2000);  // hide after 2.6 seconds
                  }}/>

                  {this.state.showSaved && (
                  <div className="saved-animation" style={{color:styles.colors.color9,
                  alignSelf:"flex-end", position:"absolute", marginBottom:"69px", marginLeft:"-72px",
                  fontSize:styles.fonts.fontSmallest}}> Saved! </div>)}

                  </div>
                  
          </div>}

          {/* <div>New Lore</div>

          <div>Existing Lore</div> */}

            {(this.state.hasChoice==="") &&
              <div>
                
<div  style={{display:"flex", flexDirection:"column", justifyContent:"space-between", alignItems:"center", marginTop:"15%", height:"100%"}}>
                <div className='hover-btn'
                title={"Create Lore connected to this Lore"}
                style={{...styles.buttons.buttonAdd, margin:"8px"}}
                onClick={()=>{
                  this.setState({hasChoice: "New"})
                }}
                >
                  Create New Lore
                  </div>

                  <div className='hover-btn'
                  onClick={async ()=>{
                    this.setState({hasChoice: "Connect"});
                    state.opps.clearUpdater();
                  }}
                  title={"Find pre-made Lore to connect it to this Lore"}
                  style={{...styles.buttons.buttonAdd, margin:"8px"}}>
                  Connect an Existing Lore
                  </div>
</div> 

              </div>  
            }

{(this.state.hasChoice==="Connect" ) &&
              <div>
             <div className="hover-btn"  
          onClick={() => {
            this.setState({hasChoice:""})
          }}
          style={{...styles.buttons.buttonAdd, textDecoration:"none", fontStyle:"italic", background:styles.colors.color7+"aa",
          fontWeight:"bold", letterSpacing:".05rem", marginBottom:"2vh", padding:"1%"}}
          
          >
            <img style={{width:".9rem", opacity:"98%", marginRight:".75rem"}}
            src={backarrow}
            />
            Back
          </div>

                <div style={{ display:"flex", justifyContent:"flex-end", marginTop:"-40px", marginBottom:"25px", }}>

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

<div  style={{display:"flex", flexDirection:"column", justifyContent:"center", alignContent:"center",
alignItems:"center", height:"100%", width:"100%", }}>
  
                <div
                
                style={{ display:"flex", flexDirection:"row", width:"100%", 
                 alignContent:"center", justifyContent:"center",
                margin:"8px", height:"fit-content", flexWrap:"wrap"}}
                
                >
                  {
                filteredLore
                .slice(0,8)
                .map((item, index) => (
                  <div>
                        {  (item.getJson().name !== "" && item.getJson().name !== undefined && item.getJson()._id !== idList[1]) &&

                        
                        <div  className="hover-img" key={index}                                                
                          onClick={() => {this.setConnectedLore(item)
                            this.setState({hasChoice:"New"});
                             state.opps.prepareRun({update: item});
                          
                             this.props.app.dispatch({ currentComponent: lore, popupSwitch:""});
                          
                          
                          }} 
                          style={{cursor:"pointer",}}>
                                                    
                           <LoreItemWithNotation app={app} obj={item} index={index}/>
                                                      
                        </div>
                       }
                </div>
                ))
              }
                  </div>
                  
                  <div style={{color:styles.colors.colorWhite+"66", fontSize:styles.fonts.fontSmall, fontWeight:"400", alignSelf:"center", marginTop:"28px"}}>
                    (Once you connect new Lore to this Pin, that Lore will always remain connected to the current Lore)
                  </div>
                 
</div> 

              </div>  
            }

    </div>
    )
        


  }
}

class TabContent extends Component{
  constructor(props) {
    super(props);
  }
  render(){
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles =state.styles;

    return(
    <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
      <div style={{...styles.buttons.buttonClose}}
      onClick={this.props.handleClose}
      >
        X
      </div>
    </div>
    )
  }
}

/**Popups */
class Popup extends Component{
  constructor(props) {
    super(props);
    this.wrapperRef = React.createRef();
    this.setWrapperRef = this.setWrapperRef;
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
}
componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
}
handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
       this.props.handleClose();
    }
}
  
  render(){
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles =state.styles;
    
    return(
      <div className="popup-box" style={{ zIndex: "1010" }}>
      <div ref={this.wrapperRef}  className="popupCard" 
      style={{ zIndex: "1010", ...styles[this.props.options?.cardType? this.props.options?.cardType:"biggestCard"] }}>
      <div style={{...styles.buttons.buttonClose, position:"absolute", right:"1vw"}}
      onClick={this.props.handleClose}>X</div>
          
          <div className='scroller' style={{...styles[this.props.options?.cardContent? this.props.options.cardContent: "cardContent"]}}>
        <MainContent app={app}  delClick={this.props.delClick} />
        </div>
          
      
      </div>



      </div>
    )
  }
}
class PopupWithTab extends Component{
  constructor(props) {
    super(props);
    this.wrapperRef = React.createRef();
    this.setWrapperRef = this.setWrapperRef;
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
}
componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
}
handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
       this.props.handleClose();
    }
}
  render(){
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles =state.styles;
    
    return(
      <div  className="popup-box" style={{ zIndex: "1010" }}>
      <div ref={this.wrapperRef}  className="popupCard" style={{ zIndex: "1010", ...styles[this.props.options?.cardType? this.props.options?.cardType:"biggestCard"]  }}>
      
      <div style={{...styles[this.props.options?.tabType?this.props.options?.tabType: "colorTab1"]}}> 
        <TabContent app={app} handleClose={this.props.handleClose}  delClick={this.props.delClick}/> <div style={ ///EXIT BUTTON
                      styles.buttons.closeicon
                  } onClick={this.props.handleClose}>x</div></div>   
      <div className='scroller' style={{...styles[this.props.options?.cardContent? this.props.options.cardContent: "cardContent"]}}>
        <MainContent app={app} handleClose={this.props.handleClose}  delClick={this.props.delClick}/>
        </div>
        </div>
        



      </div>
    )
  }
}
  




//********CARDs********/
class Card extends Component{
  constructor(props) {
    super(props);
  }
  render(){
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles =state.styles;

    return(
      <div className='scroller'  style={{ ...styles[this.props.options?.cardType?this.props.options?.cardType:"biggestCard"] }}>   
            <div style={{...styles[this.props.options?.cardContent? this.props.options.cardContent: "cardContent"]}}>
              <MainContent app={app} />
            </div>
      </div>
    )
  }
}

class CardWithTab extends Component{
  constructor(props) {
    super(props);
  }
  render(){
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles =state.styles;

    return(
      <div  style={{...styles[this.props.type?this.props.type:"biggestCard"] }}>   
      <div style={{...styles[this.props.options?.tabType?this.props.options?.tabType: "colorTab1"]}}> <TabContent app={app} /></div>   
      <div style={{...styles[this.props.options?.cardContent? this.props.options.cardContent: "cardContent"]}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
