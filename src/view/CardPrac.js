import { Component } from 'react';
import "../App.css"
import MapComponent from '../view/mapComponent';


export default class Card extends Component {
  constructor(props) {
    super(props);
    

  }

  /**
   * 
   * OPTIONS
   * BIGGESTCARD
   * BIGGERCARD
   * BIGCARD
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
    
    
    let cards={

      smallestCard: <SmallestCard app={app} />,
      smallestCardColorTab: <SmallestCardColorTab app={app} />,

      smallerCard: <SmallerCard app={app} />,
      smallerCardColorTab: <SmallerCardColorTab app={app} />,

      smallCard: <SmallCard app={app} />,
      smallCardColorTab: <SmallCardColorTab app={app} />,

      bigCard: <BigCard app={app} />,
      bigCardColorTab: <BigCardColorTab app ={app} />,

      biggerCard: <BiggerCard app={app} />,
      biggerCardColorTab: <BiggerCardColorTab app ={app} />,

      biggestCard: <BiggestCard app={app} />,
      biggestCardColorTab: <BiggestCardColorTab app ={app} />,

      tallCard: <TallCard app={app} />,
      tallCardColorTab: <TallCardColorTab app={app} />,

      tallerCard: <TallCard app={app} />,
      tallerCardColorTab: <TallCardColorTab app={app} />,

      tallestCard: <TallCard app={app} />,
      tallestCardColorTab: <TallCardColorTab app={app} />,

      popupLarge: <PopupLarge app={app} handleClose={this.props.handleClose} />


    
    }

    return (
      <div >
        
        {cards[this.props.type? this.props.type: "biggestCardColorTab"]}
        </div>

    )
  }
}




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
    <div>Hello World, muthafuqa</div>
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
    <div></div>
    )
  }
}




class SmallestCard extends Component{
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
      <div className='scroller'  style={{...styles?.smallestCard}}>   
            <MainContent app={app} />
  
      </div>
    )
  }
}

class SmallestCardColorTab extends Component{
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
      <div  style={{...styles?.smallestCard}}>   
      <div style={{...styles?.colorTab}}> <TabContent app={app} /></div>   
      <div className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}




class SmallerCard extends Component{
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
      <div className='scroller'  style={{...styles?.smallerCard}}>   
            <MainContent app={app} />
  
      </div>
    )
  }
}

class SmallerCardColorTab extends Component{
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
      <div  style={{...styles?.smallerCard}}>   
      <div style={{...styles?.colorTab}}> <TabContent app={app} /></div>   
      <div className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}




class SmallCard extends Component{
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
      <div className='scroller'  style={{...styles?.smallCard}}>   
            <MainContent app={app} />
  
      </div>
    )
  }
}

class SmallCardColorTab extends Component{
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
      <div  style={{...styles?.smallCard}}>   
      <div style={{...styles?.colorTab}}> <TabContent app={app} /></div>   
      <div className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}




class BigCard extends Component{
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
      <div className='scroller'  style={{...styles?.bigCard}}>   
            <MainContent app={app} />
  
      </div>
    )
  }
}

class BigCardColorTab extends Component{
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
      <div  style={{...styles?.bigCard}}>   
      <div style={{...styles?.colorTab}}> <TabContent app={app} /></div>   
      <div className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}




class BiggerCard extends Component{
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
      <div className='scroller'  style={{...styles?.biggerCard}}>      
            <MainContent app={app} />

      </div>
    )
  }
}
  
class BiggerCardColorTab extends Component{
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
    <div  style={{...styles?.biggerCard}}>   
    <div style={{width:"100%", height:"100px", background:"green", borderRadius:"23px 23px 0px 0px"}}><TabContent app={app} /></div>   
    <div className='scroller'>
      <MainContent app={app} />
      </div>
      </div>
    )
  }
}




class BiggestCard extends Component{
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
    <div className='scroller' style={{...styles?.biggestCard}}>      
      <MainContent app={app} />
      </div>
    )
  }
}

class BiggestCardColorTab extends Component{
  constructor(props) {
    super(props);
  }
  render(){
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles =state.styles;
    console.log(styles?.biggestCard);

    return(
    <div  style={{...styles?.biggestCard}}>   
    <div style={{width:"100%", height:"100px", background:"green", borderRadius:"23px 23px 0px 0px"}}><TabContent app={app} /></div>   
    <div className='scroller'>
      <MainContent app={app} />
      </div>
      </div>
    )
  }
}




class TallCard extends Component{
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
      <div className='scroller'  style={{...styles?.tallCard}}>   
            <MainContent app={app} />

      </div>
    )
  }
}

class TallCardColorTab extends Component{
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
      <div  style={{...styles?.tallCard}}>   
      <div style={{...styles?.colorTab}}> <TabContent app={app} /></div>   
      <div className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}




class TallerCard extends Component{
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
      <div className='scroller'  style={{...styles?.tallerCard}}>   
            <MainContent app={app} />

      </div>
    )
  }
}

class TallerCardColorTab extends Component{
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
      <div  style={{...styles?.tallerCard}}>   
      <div style={{...styles?.colorTab}}> <TabContent app={app} /></div>   
      <div className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}




class TallestCard extends Component{
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
      <div className='scroller'  style={{...styles?.tallestCard}}>   
            <MainContent app={app} />

      </div>
    )
  }
}

class TallestCardColorTab extends Component{
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
      <div  style={{...styles?.tallestCard}}>   
      <div style={{...styles?.colorTab}}> <TabContent app={app} /></div>   
      <div className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}




class PopupLarge extends Component{
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
      <div className="popup-box" style={{ zIndex: "1010" }}>
      <div ref={this.wrapperRef}  className="popupCard" style={{ zIndex: "1010", ...styles.popupLarge }}>
      <div style={ ///EXIT BUTTON
                      styles.buttons.closeicon
                  } onClick={this.props.handleClose}>x</div>
          

        
      <div style={{display:"flex", flexDirection:"column", justifyContent:"center", display:"flex", alignItems:"center"}}>

      <MainContent app ={app} />
          

      </div>
      </div>



      </div>
    )
  }
}
  


