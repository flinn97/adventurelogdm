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
import Upload from '../upload';

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
    };
  }

  handleSearchChange = (e) => {
    this.setState({ searchTerm: e.target.value });
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

    if(id.includes("-")){
      let newArr = [...splitURL];
      newArr.pop()
      let str = newArr.join(',');
     str = str.replace(/,/g, '/');
     let idList = id.split('-');
      let newId = idList[0] + "-" + state.currentComponent.getJson()._id
      newLink=str+"/" +newId;
      
    }
    else{
      newLink = href + "-" + state.currentComponent.getJson()._id;
    }

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

    return(
      <div style={{
        display:"flex", width:"57vw", flexDirection:"column", height:"fit-content",
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

          

      {!this.state.showFindEncounter && !this.state.showFindImage &&        
<div style={{flexDirection:"column", display:"flex", alignSelf:"center"}}>

<ParentFormComponent app={app} name="name"
              placeholder={state.currentPin?.getJson().title}
              inputStyle={{maxWidth:"55.5vw", width:"55.5vw", padding:"4px 9px", color:styles.colors.color3, height:"fit-content",
              borderRadius:"4px",background:styles.colors.colorWhite+"00", borderWidth:"0px", height:"100%", 
              border:"solid 1px "+styles.colors.colorWhite+"22",
              textWrap:"wrap", fontSize:styles.fonts.fontSubheader1}}/>
   
    <a style={{color:styles.colors.colorWhite, fontSize:styles.fonts.fontSmallest,marginTop:"11px", textDecorationColor:"#ffdead22", alignSelf:"flex-end"}} 
    href= {newLink} target='_blank'>Open in new tab</a>
    
    
<hr></hr>

<ParentFormComponent app={app} name="desc"
             theme={"adventureLog"} 
              rows={5}
             
             inputStyle={{maxWidth:"55.5vw", padding:"2px 5px", color:styles.colors.colorWhite, height:"fit-content",
             borderRadius:"4px",background:styles.colors.colorWhite+"00", 
             border:"solid 1px "+styles.colors.colorWhite+"22", fontSize:styles.fonts.fontSmall }}
             type={"richEditor"}
             wrapperStyle={{margin:"5px", color:styles.colors.colorWhite, display:"flex",
             flexDirection:"column", justifyItems:"space-between"}}/>

</div>}

<div>
          {/* ENCOUNTER */}
          {!this.state.showFindEncounter && !this.state.showFindImage &&   <div> <hr></hr>
          <div style={{ marginTop:"-18px", color:styles.colors.colorWhite+"77", fontSize:styles.fonts.fontSmall,}}>Encounters</div>

          <div style={{ marginTop:"-8vh", marginBottom:"1vh",}}> 
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
<div style={{ display:"flex", justifyContent:"flex-end",}}>

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
                    <img  draggable="false" src={img.getJson().picURL} 
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

                      //changePic={ async (pic)=>{
                        // await state.opps.cleanJsonPrepareRun({
                        //   "addimage":{
                        //     loreId: state.currentComponent.getJson()._id, 
                        //     picURL: pic,
                        //     campaignId: id}});
                      //       console.log(pic);
                            
                      // }} 
                      obj={app.state.currentComponent}
                      update={true} skipUpdate={true}
                      
                        app={app} 
                        className="indent-on-click"
                //   onClick={() => {
                //  state.opps.cleanJsonPrepareRun({
                //   "addimage":{loreId: state.currentComponent.getJson()._id, 
                //     campaignId: id}})
                // }}
                />
                
        </div>
        <div className="indent-on-click" 
        title="Find an existing image to add to this lore." 
        style={{...styles.buttons.buttonAdd, fontSize:styles.fonts.fontSmall,marginBottom:"2vh",
        marginTop:"1vh", alignSelf:"center", padding:"1%"}}
          onClick={() => {
            this.setState({showFindImage: true })
        }}>
          Find Image
        </div></div>
        </div>
        }
        

  <div className="indent-on-click" style={{ display:"flex", width:"92px", background:"red", borderRadius:'3vh', alignSelf:"flex-end", bottom:'0px', 
  position:"sticky", marginTop:"8.24vh", marginBottom:"1vh"}}>
                  <RunButton app={app} text="Save" 
                  
                  runFunc={(arr)=>{
                    
                    let lore = arr[0];
                    if(state.currentPin){
                      
                      let pin = state.currentPin;
                      
                      if (lore.getJson().title===""||lore.getJson().title===undefined){
                        lore.setCompState({title:pin.getJson().title});
                      }
                      pin.setCompState({loreId: lore.getJson()._id, 
                        title: lore.getJson().title,
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
                  
          {/* <div>New Lore</div>

          <div>Existing Lore</div> */}
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