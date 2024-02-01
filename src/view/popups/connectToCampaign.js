import React, { Component } from 'react';
import "../../App.css"
import DelButton from '../../componentListNPM/componentForms/buttons/deleteButton';
import ParentFormComponent from '../../componentListNPM/componentForms/parentFormComponent';
import RunButton from '../../componentListNPM/componentForms/buttons/runButton';



export default class ConnectToCampaign extends Component {
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
  }
  render(){
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles =state.styles;

    let obj = this.props.obj;
    let id = obj?.getJson()?.campaignId;
    

    let colorWarn = (id && id.length>6)?styles.colors.color3:styles.colors.color3;

    return(
      <div style={{
        display:"flex", width:"100%", flexDirection:"column", justifyContent:"center", height:"fit-content", 
        paddingTop:"35%", fontFamily:"serif", fontSize:styles.fonts.fontSubheader1,}}>
    <div style={{ display:"flex", flexDirection:"column", textAlign:"center", paddingBottom:"42px", alignContent:"center", justifyContent:"center" }}> 
    <ParentFormComponent app={app} name="campaignId"
              placeholder={"Enter Campaign Code"}  maxLength={11} 
              inputStyle={{maxWidth:(window.innerWidth > 800)?"55.5vw":"100%", width:(window.innerWidth > 800)?"400px":"100%", 
              padding:"4px 9px", color:colorWarn, height:"fit-content",
              borderRadius:"4px",background:styles.colors.colorWhite+"02", borderWidth:"0px", height:"100%", cursor:"text",
              border:"solid 1px "+styles.colors.colorWhite+"22",
              textWrap:"wrap", fontSize:(window.innerWidth > 800)?styles.fonts.fontSmall:"1.5rem"}}/>
         <div style={{color:styles.colors.color8, marginTop:"11px"}}>{"(Your GM has this)"}</div>     
     </div>
     <div className='hover-btn'  
     style={{width:(window.innerWidth > 800)?"400px":"fit-content", alignSelf:"center",  justifyContent:"center", display:'flex', flexDirection:"row",}}>
     <RunButton app={app} text="Enroll" callBack={(obj)=>{dispatch({popupSwitch:"", currentComponent:undefined})}}/>

     </div>
     <div style={{
      width:(window.innerWidth > 800)?"300px":"128vw", height:(window.innerWidth > 800)?"128vh":window.innerWidth, background:styles.colors.colorBlack, zIndex:"-9", 
     position:"absolute", alignSelf:"center", top:"22px", filter:"blur(33px)"}}>

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
          
          <div className={(window.innerWidth > 800)?'scroller':''} style={{...styles[this.props.options?.cardContent? this.props.options.cardContent: "cardContent"]}}>
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
        <TabContent app={app} handleClose={this.props.handleClose}  delClick={this.props.delClick}/> 
        <div style={ ///EXIT BUTTON
                      styles.buttons.closeicon
                  } onClick={this.props.handleClose}>x</div>
                  
                  </div>   
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
