import { Component } from 'react';
import "../App.css"
import RunButton from '../componentListNPM/componentForms/buttons/runButton';
import ParentFormComponent from '../componentListNPM/componentForms/parentFormComponent';
import CardPractice from './CardPrac';
import Upload from './upload';
import placeholder from '../pics/placeholderCampaign.JPG';
import RichTextComponent from '../componentListNPM/componentForms/singleForms/RichTextComponent';
import React from 'react';
import treeService from '../services/treeService';

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
export default class ApprovalPopup extends Component {
  constructor(props) {
    super(props);
    

  }

  /**
   * 
   * OPTIONS
   */


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
  }
  render(){
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles =state.styles;
    

    return(
    <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",}}>
      <ParentFormComponent app={app} name="title" label="Title"/>
      <ParentFormComponent app={app} name="description" label="Description"/>
      <ParentFormComponent app={app} name="promotional" label="Promotional"/>
      <ParentFormComponent app={app} name="price" label="Price"/>
      <RunButton app={app} text="Submit" callBack={()=>{
        
        dispatch({popupSwitch:"", currentComponent: undefined})}}/>
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
      
      <div style={{...styles[this.props.options?.tabType?this.props.options?.tabType: "colorTab1"]}}> 
        <TabContent app={app} handleClose={this.props.handleClose} /> <div style={ ///EXIT BUTTON
                      styles.buttons.closeicon
                  } onClick={this.props.handleClose}>x</div></div>   
      <div className='scroller' style={{...styles[this.props.options?.cardContent? this.props.options.cardContent: "cardContent"]}}>
        <MainContent app={app} handleClose={this.props.handleClose}/>
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


