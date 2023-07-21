import React, { Component } from 'react';
import hr from '../../pics/hr.webp'
import Notes from '../../componentListNPM/componentForms/fullForms/notes';
import FormWithUpdateAndRun from '../../componentListNPM/componentForms/buttons/formWithUpdateAndRun';
import MapComponent from '../../componentListNPM/mapTech/mapComponent';
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
export default class NoteCard extends Component {
  constructor(props) {
    super(props);
    

  }

  async  componentDidUpdate(){
    if( this.props.app.state.updateRun){
     await this.props.app.dispatch({updateRun: false})
     this.setState({showInput:false})
    }
 }
 
 componentDidUpdate(){
  let component = this.props.app.state.componentList.getComponent("note", note);
  //RICH TEXT READ
  let note = document.getElementById("note");
  note.innerHTML = component.getJson().note;
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
  }
  render(){
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles =state.styles;
    

    return(
<div style={{ display: "flex",
  flexDirection:"row"}}>
      <div style={{userSelect:"text", fontSize:styles.fonts.fontSmall, width:"27.5vmin", color:styles.colors.colorWhite, 
      height:"fit-content", marginRight:"4.5vmin", marginLeft:"-2.5vmin", }}>
      name
      <MapComponent app={app} name={"note"}/>
      {/* 
      2 pages:
      MapComponent custom item, inside do a function for each that is mapped out
      dispatch change global stat
      dispatch the currentNote
      on mount
      */}
      </div>

<div style={{backgroundColor:styles.colors.color4, width:"1.5px", height:"100vh",  position:"absolute", top:0, left:"57vmin"}}></div>

      <div style={{userSelect:"text", fontSize:styles.fonts.fontSmall, width:"100%", height:"fit-content", color:styles.colors.colorWhite,
      padding:"0px 5vmin", marginLeft:"3vmin"
       }}>

      <>
      <ParentFormComponent app={app} obj={this.props.app.state.componentList.getComponent("note")}
                  theme={"adventureLog"} 
                  rows={5}
                  
                  inputStyle={{maxWidth:"100%", padding:"4px 9px", color:styles.colors.colorWhite, height:"fit-content",
                  borderRadius:"4px",background:styles.colors.colorWhite+"00", borderWidth:"0px", marginBottom:"2vh", height:"100%",
                  textWrap:"balance" }}
                  type={"richEditor"}
                  placeholder={"Briefly describe your campaign. 200 Characters Max"}
                  name="note"
                  wrapperStyle={{margin:"5px", color:styles.colors.colorWhite, display:"flex",flexDirection:"column", justifyItems:"space-between"}}
                  prepareRun={true}
                  />
      
      </>

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
      <div onClick={()=>{
      dispatch({operate: "addnote", operation: "cleanJsonPrepareRun", 
      object: {text: "empty"},
  })
      }}
      style={{...styles.buttons.buttonAdd, width:"5vw", fontSize:styles.fonts.fontSmall, padding:"2px",}} >
      + Note
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
      //Whole card content
      <div  style={{ ...styles[this.props.options?.cardType?this.props.options?.cardType:"biggestCardBorderless"], }}>  
          {/* //Tab content  */}
          <div style={{...styles[this.props.options?.tabType?this.props.options?.tabType: "colorTab1"]}}> <TabContent app={app} /></div>
          {/* //Main card content  */}   
          <div style={{...styles[this.props.options?.cardContent? this.props.options.cardContent: "cardContent"]}} className='scroller'>
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
