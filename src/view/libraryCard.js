import React, { Component } from 'react';

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
export default class LibraryCard extends Component {
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
      <div class="" style={{color:styles.colors.color8,}}>
      ~Coming Soon~

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
    <div style={{display:"flex", justifyContent:"space-between", fontFamily:"serif", color:styles.colors.colorWhite, flexDirection:"row",
    userSelect:"none", verticalAlign:"center", fontWeight:"600",
    fontSize:styles.fonts.fontSubheader1}}>
            Library
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
      <div  style={{ ...styles[this.props.options?.cardType?this.props.options?.cardType:"biggestCardBorderless"],backgroundColor:"#9cd9cf0e", borderRadius:"1.2vw", paddingBottom:"22px"}}>  
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
