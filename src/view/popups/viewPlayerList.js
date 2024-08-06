import React, { Component } from 'react';
import "../../App.css"
import DelButton from '../../componentListNPM/componentForms/buttons/deleteButton';
import toolService from '../../services/toolService';
import PostLogButton from '../../componentListNPM/componentForms/buttons/postLogButton';
import PlayerCharacterMapItem from '../playerMapItem';
import MapComponent from '../../componentListNPM/mapTech/mapComponent';
import YourPlayersMapItem from '../yourPlayersMapItem';


export default class ViewPlayerList extends Component {
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
      showSaved: false, 
      pListLength: 0,
      showList: true,
    }; 
  }
  
  render(){
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles =state.styles;

    let c = state.currentCampaign;
    
    let campName = (c!==""||c!==undefined)?"in "+c.getJson().title:"";
    let id = (c!==""||c!==undefined)?c.getJson()._id:"";

    

    return(
      <div style={{ 
        display:"flex", width:"100%", height:"100%", flexDirection:"column", justifyContent:"space-between",
        
        paddingTop:"8px", fontFamily:"serif", fontSize:styles.fonts.fontNormal,}}>

        <div style={{color:styles.colors.colorWhite+"99", fontSize:styles.fonts.fontNormal, }}> 
  {"Player Characters "+campName}

  <div style={{position:"absolute"}}>
          {this.state.showSaved && (
                          <div className="saved-animation" style={{color:styles.colors.color9, position:"relative",marginTop:"25",
                          fontSize:styles.fonts.fontSmallest}}> Copied to clipboard! </div>)||
                          <div style={{color:styles.colors.color9, position:"relative", opacity:"0", marginTop:"25px",
                          fontSize:styles.fonts.fontSmallest}}>
                            Copied
                            </div>}</div>

<div style={{display:"flex", flexDirection:"row", width:"100%", alignItems:"flex-end", marginTop:"20px", marginLeft:"22px"}}>
        
  <div className='hover-btn-highlight' style={{display:"flex", flexDirection:"row", fontSize:styles.fonts.fontNormal, 
  color:styles.colors.color3, cursor:"copy", padding:"3px 8px", borderRadius:"11px",}}
      onClick={()=>{
        navigator.clipboard.writeText(id)
        
        .then(() => {
          console.log('Content copied to clipboard');
        })
        .catch(err => {
          console.error('Failed to copy: ', err);
        });
        this.setState({ showSaved: true });
        setTimeout(() => this.setState({ showSaved: false }), 3000);  // hide after 3 seconds
      }}
  >
    {id}
  </div>

  <div style={{display:"flex", flexDirection:"row", color:styles.colors.color8, marginLeft:"8px", fontSize:".8rem", padding:"3px 8px", borderRadius:"11px",}}>
    {"(Share this code with your players.)"}
  </div>
  </div>



  
      <MapComponent app={app} name={"participant"} filter={{search: "player", attribute: "role"}}
      cells={[{custom:YourPlayersMapItem, props:{app:app}},]}
      theme={"selectByImageSmall"}
      filterFunc={(char)=>char.getJson().campaignId===state.currentCampaign.getJson()._id}
      />

      </div>
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
      <div style={{...styles[this.props.options?.cardContent? this.props.options.cardContent: "cardContent"]}}>
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
      <div style={{ ...styles[this.props.options?.cardType?this.props.options?.cardType:"biggestCard"] }}>   
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
      <div style={{...styles[this.props.options?.cardContent? this.props.options.cardContent: "cardContent"]}}>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
