import React, { Component } from 'react';
import "../../App.css"
import DelButton from '../../componentListNPM/componentForms/buttons/deleteButton';
import toolService from '../../services/toolService';
import PostLogButton from '../../componentListNPM/componentForms/buttons/postLogButton';
import ParentFormComponent from '../../componentListNPM/componentForms/parentFormComponent';



/**
 * condensed version of the cards.
 * Works with themes.
 * props
 * theme
 * type
 * app
 * options
 * options can include cardType, cardContent, tabType, 
 */
export default class ViewPic extends Component {
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
    let mW = "200px";

    let isLog = toolService.checkURLforString("/log/");

    return(
      <div style={{
        display:"flex", width:"100%", height:"100%", flexDirection:"column", justifyContent:"space-between",
        
        paddingTop:"28px", fontFamily:"serif", fontSize:styles.fonts.fontSubheader1,}}>

          {!isLog &&
          <div style={{display: "flex", marginTop:"11px",flexDirection: "row",alignContent:"flex-end", justifyContent:"flex-end"}}>
        <PostLogButton app={app} obj={state.currentPic} text={"Log Image"}/>
          </div>}
          {!isLog &&
          <div style={{display:"flex", flexDirection:"row", minWidth:"100%", width:"100%", marginTop:"22px", }}>
           <div style={{color:styles.colors.colorWhite+"d9", marginTop:"8px", marginBottom:"18px", fontSize:styles.fonts.fontSmall, width:"235px"}}>Source / Add Text:</div>
         <ParentFormComponent app={app} name="src" obj={state.currentPic}
                      theme={"adventureLog"} 
                        rows={5}
                        prepareRun={true}
                        maxLength={100}
                      inputStyle={{width:"100%", padding:"2px 5px", color:styles.colors.colorWhite+"d9", height:"fit-content",
                      borderRadius:"4px",background:styles.colors.colorWhite+"00", cursor:"text",
                      border:"solid 1px "+styles.colors.colorWhite+"22", fontSize:styles.fonts.fontSmall }}
                      
                      wrapperStyle={{margin:"5px", width:"100%",color:styles.colors.colorWhite, display:"flex", marginLeft:"8px",
                      flexDirection:"column", justifyItems:"space-between"}}/></div>}

    <div className='scroller2' style={{  maxHeight:"100%", maxWidth:"100%",
      display:"flex", flexDirection:"row", textAlign:"center", padding:"4px", justifyContent:"center" }}> 
    <img src={state.currentPic?.getJson().picURL} 
            style={{minWidth:mW, minWeight:mW, objectFit:"fill",
            width:"fit-content", height:"fit-content",
            
            }}/>
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
