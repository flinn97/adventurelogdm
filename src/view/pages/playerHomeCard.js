import React, { Component } from 'react';
import "../../App.css"
import CampaignCard from './campaignCard';
import NoteCard from './noteCard';
import logo from '../../pics/logo.png'
import MapComponent from '../../componentListNPM/mapTech/mapComponent';
import ConnectToCampaignButton from '../connectToCampaignbutton';
import PlayerCharacterMapItem from '../playerMapItem';
import ConnectToCampaignSwitch from '../connectToCampaignSwitch';
import trash from '../../pics/trashStill.png';
import PlayerCharacterMapItemPhone from '../playerMapItemPhone';

export default class PlayerHomeCard extends Component {
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
          popup: <Popup app={{...app, state:{...app.state, styles:styles} }} handleClose={this.props.handleClose}  options={this.props.options} type={this.props.type}/>,
          popupWithTab: <PopupWithTab app={{...app, state:{...app.state, styles:styles}}} handleClose={this.props.handleClose} options={this.props.options} type={this.props.type}/>
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
     
      }
  }
  render(){
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles =state.styles;
    

    return(
    <div style={{height:"100%", width:"fit-content", }}>

      
      <div style={{display:"flex", flexDirection:"column", justifyContent:"center", fontFamily:"serif", 
      
    fontSize:styles.fonts.fontHeader4,  color:styles.colors.colorWhite}}>

            
                    {window.innerWidth > 800 &&
                  <div title=' You can connect them to an adventure later'
                  style = {{...styles.buttons.buttonAdd, borderRadius:"11px",marginTop:"22px", pointer:"cursor"}} onClick={()=>{
                    //
                   
                    let obj = {name:"", type:"participant", role:"player", isToken:true};

                    // state.opps.cleanJsonPrepareRun({addmonster:obj});
                    dispatch({popupSwitch:"addCharacter", operate:"addparticipant", 
                    operation:"cleanJsonPrepare", object:obj, 
                  })

                  }}>+ Create New Character</div>}
                
  <div className={window.innerWidth > 800?'scroller2':""}  style={{color:styles.colors.colorWhite+"99", marginTop:"45px", overflowX:"scroll"}}> 
  <div style={{width:"100%", justifyContent:"space-between", display:"flex", flexDirection:"row",  }}>
  
  <div style={{width:"fit-content",height:"fit-content"}}>{window.innerWidth > 800?"Your Characters":""}</div>

  {window.innerWidth < 800 &&
                  <div title=' You can connect them to an adventure later'
                  style = {{...styles.buttons.buttonAdd, borderRadius:"11px",pointer:"cursor", }} onClick={()=>{
                    //
                   
                    let obj = {name:"", type:"participant", role:"player", isToken:true};

                    // state.opps.cleanJsonPrepareRun({addmonster:obj});
                    dispatch({popupSwitch:"addCharacter", operate:"addparticipant", 
                    operation:"cleanJsonPrepare", object:obj, 
                  })

                  }}>+ Create New Character</div>}</div>

  {(window.innerWidth > 800) &&
      (<MapComponent 
      delOptions={{
                  picURL: trash, warningMessage: "Delete this character (this is permanent)",
                  textStyle: { fontSize: styles.fonts.fontSmallest, },
                  style: {
                    width: "35px", height: "35px", padding: "4px 2px",
                    display: "flex", flexDirection: "row",
                    alignItems: "center", borderRadius: "8px",
                    justifyContent: "center"
                  },
                }}
      app={app} name={"participant"} filter={{search: "player", attribute: "role"}}
      cells={[{custom:PlayerCharacterMapItem, props:{app:app}}, "delete"]}
      theme={"selectByImageSmall"}
      
      />) || (
<div style={{}}>
<MapComponent 
      delOptions={{
                  picURL: trash, warningMessage: "Delete this character (this is permanent)",
                  textStyle: { fontSize: styles.fonts.fontSmallest, },
                  style: {
                    width: "35px", height: "35px", padding: "4px 2px",
                    display: "flex", flexDirection: "row",
                    alignItems: "center", borderRadius: "8px",
                    justifyContent: "center"
                  },
                }}
      app={app} name={"participant"} filter={{search: "player", attribute: "role"}}
      cells={[{custom:PlayerCharacterMapItemPhone, props:{app:app}},]}
      // theme={"selectByImageSmall"}
      
      />
  </div>
      )
      
      }
      </div>
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
      <div>
      {/* <div style={{display:"flex", flexDirection:"row", justifyContent:"center", fontFamily:"serif",
    fontSize:styles.fonts.fontHeader3,  color:styles.colors.color3}}>
      <img src={logo} style={{width:"480px", background:styles.colors.color4+"a5", borderRadius:"10px"}}/>
      </div>
    <div style={{display:"flex", flexDirection:"row", justifyContent:"center", fontFamily:"serif",
    fontSize:styles.fonts.fontSubheader1,  color:styles.colors.color8}}>
      <div >Game Master Suite</div>

      
      </div>
      <hr></hr> */}
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
      //Whole card content
      <div  style={{ ...styles[this.props.options?.cardType?this.props.options?.cardType:"biggestCardBorderless"],}}>  
          {/* //Tab content  */}
          <div style={{...styles[this.props.options?.tabType?this.props.options?.tabType: "colorTab1"]}}> <TabContent app={app} /></div>
          {/* //Main card content  */}   
          <div style={{...styles[this.props.options?.cardContent? this.props.options.cardContent: "cardContent"]}}>
            <MainContent app={app} />
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
      <div ref={this.wrapperRef}  className="popupCard" style={{ zIndex: "1010", ...styles[this.props.options?.cardType? this.props.options?.cardType:"biggestCard"] }}>
      <div style={ ///EXIT BUTTON
                      styles.buttons.closeicon
                  } onClick={this.props.handleClose}>x</div>
          
          <div className='scroller' style={{...styles[this.props.options?.cardContent? this.props.options.cardContent: "cardContent"]}}>
        <MainContent app={app} />
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
      
      <div style={{...styles[this.props.options?.tabType?this.props.options?.tabType: "colorTab1"]}}> <TabContent app={app} /> <div style={ ///EXIT BUTTON
                      styles.buttons.closeicon
                  } onClick={this.props.handleClose}>X</div></div>   
      <div className='scroller' style={{...styles[this.props.options?.cardContent? this.props.options.cardContent: "cardContent"]}}>
        <MainContent app={app} />
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
