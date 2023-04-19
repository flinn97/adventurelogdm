import React, { Component } from 'react';
import "../App.css"
import MapComponent from '../componentListNPM/mapTech/mapComponent';


export default class Card extends Component {
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

      smallestCard: <SmallestCard app={app} />,
      smallestCardColorTab: <SmallestCardColorTab app={app} />,
      smallestCardColorTab1: <SmallestCardColorTab1 app={app} />,
      smallestCardColorTab2: <SmallestCardColorTab2 app={app} />,
      smallestCardColorTab3: <SmallestCardColorTab3 app={app} />,
      smallestCardColorTab4: <SmallestCardColorTab4 app={app} />,
      smallestCardColorTab5: <SmallestCardColorTab5 app={app} />,
      smallestCardColorTab6: <SmallestCardColorTab6 app={app} />,
      smallestCardColorTab7: <SmallestCardColorTab7 app={app} />,
      smallestCardColorTab8: <SmallestCardColorTab8 app={app} />,
      smallestCardColorTab9: <SmallestCardColorTab9 app={app} />,
      smallestCardColorTab10: <SmallestCardColorTab10 app={app} />,
      smallestCardColorTab11: <SmallestCardColorTab11 app={app} />,
      smallestCardColorTab12: <SmallestCardColorTab12 app={app} />,
      smallestCardColorTab13: <SmallestCardColorTab13 app={app} />,
      smallestCardColorTabWhite: <SmallestCardColorTabWhite app={app} />,
      smallestCardColorTabBlack: <SmallestCardColorTabBlack app={app} />,
      smallestCardBorderless: <SmallestCardBorderless app={app} />,
      smallestCardBorderlessTab: <SmallestCardBorderlessTab app={app} />,


      smallerCard: <SmallerCard app={app} />,
      smallerCardColorTab: <SmallerCardColorTab app={app} />,
      smallerCardColorTab1: <SmallerCardColorTab1 app={app} />,
      smallerCardColorTab2: <SmallerCardColorTab2 app={app} />,
      smallerCardColorTab3: <SmallerCardColorTab3 app={app} />,
      smallerCardColorTab4: <SmallerCardColorTab4 app={app} />,
      smallerCardColorTab5: <SmallerCardColorTab5 app={app} />,
      smallerCardColorTab6: <SmallerCardColorTab6 app={app} />,
      smallerCardColorTab7: <SmallerCardColorTab7 app={app} />,
      smallerCardColorTab8: <SmallerCardColorTab8 app={app} />,
      smallerCardColorTab9: <SmallerCardColorTab9 app={app} />,
      smallerCardColorTab10: <SmallerCardColorTab10 app={app} />,
      smallerCardColorTab11: <SmallerCardColorTab11 app={app} />,
      smallerCardColorTab12: <SmallerCardColorTab12 app={app} />,
      smallerCardColorTab13: <SmallerCardColorTab13 app={app} />,
      smallerCardColorTabWhite: <SmallerCardColorTabWhite app={app} />,
      smallerCardColorTabBlack: <SmallerCardColorTabBlack app={app} />,
      smallerCardBorderless: <SmallerCardBorderless app={app} />,
      smallerCardBorderlessTab: <SmallerCardBorderlessTab app={app} />,

      smallCard: <SmallCard app={app} />,
      smallCardColorTab: <SmallCardColorTab app={app} />,
      smallCardColorTab1: <SmallCardColorTab1 app={app} />,
      smallCardColorTab2: <SmallCardColorTab2 app={app} />,
      smallCardColorTab3: <SmallCardColorTab3 app={app} />,
      smallCardColorTab4: <SmallCardColorTab4 app={app} />,
      smallCardColorTab5: <SmallCardColorTab5 app={app} />,
      smallCardColorTab6: <SmallCardColorTab6 app={app} />,
      smallCardColorTab7: <SmallCardColorTab7 app={app} />,
      smallCardColorTab8: <SmallCardColorTab8 app={app} />,
      smallCardColorTab9: <SmallCardColorTab9 app={app} />,
      smallCardColorTab10: <SmallCardColorTab10 app={app} />,
      smallCardColorTab11: <SmallCardColorTab11 app={app} />,
      smallCardColorTab12: <SmallCardColorTab12 app={app} />,
      smallCardColorTab13: <SmallCardColorTab13 app={app} />,
      smallCardColorTabWhite: <SmallCardColorTabWhite app={app} />,
      smallCardColorTabBlack: <SmallCardColorTabBlack app={app} />,
      smallCardBorderless: <SmallCardBorderless app={app} />,
      smallCardBorderlessTab: <SmallCardBorderlessTab app={app} />,

      bigCard: <BigCard app={app} />,
      bigCardColorTab: <BigCardColorTab app={app} />,
      bigCardColorTab1: <BigCardColorTab1 app={app} />,
      bigCardColorTab2: <BigCardColorTab2 app={app} />,
      bigCardColorTab3: <BigCardColorTab3 app={app} />,
      bigCardColorTab4: <BigCardColorTab4 app={app} />,
      bigCardColorTab5: <BigCardColorTab5 app={app} />,
      bigCardColorTab6: <BigCardColorTab6 app={app} />,
      bigCardColorTab7: <BigCardColorTab7 app={app} />,
      bigCardColorTab8: <BigCardColorTab8 app={app} />,
      bigCardColorTab9: <BigCardColorTab9 app={app} />,
      bigCardColorTab10: <BigCardColorTab10 app={app} />,
      bigCardColorTab11: <BigCardColorTab11 app={app} />,
      bigCardColorTab12: <BigCardColorTab12 app={app} />,
      bigCardColorTab13: <BigCardColorTab13 app={app} />,
      bigCardColorTabWhite: <BigCardColorTabWhite app={app} />,
      bigCardColorTabBlack: <BigCardColorTabBlack app={app} />,
      bigCardBorderless: <BigCardBorderless app={app} />,
      bigCardBorderlessTab: <BigCardBorderlessTab app={app} />,

      biggerCard: <BiggerCard app={app} />,
      biggerCardColorTab: <BiggerCardColorTab app={app} />,
      biggerCardColorTab1: <BiggerCardColorTab1 app={app} />,
      biggerCardColorTab2: <BiggerCardColorTab2 app={app} />,
      biggerCardColorTab3: <BiggerCardColorTab3 app={app} />,
      biggerCardColorTab4: <BiggerCardColorTab4 app={app} />,
      biggerCardColorTab5: <BiggerCardColorTab5 app={app} />,
      biggerCardColorTab6: <BiggerCardColorTab6 app={app} />,
      biggerCardColorTab7: <BiggerCardColorTab7 app={app} />,
      biggerCardColorTab8: <BiggerCardColorTab8 app={app} />,
      biggerCardColorTab9: <BiggerCardColorTab9 app={app} />,
      biggerCardColorTab10: <BiggerCardColorTab10 app={app} />,
      biggerCardColorTab11: <BiggerCardColorTab11 app={app} />,
      biggerCardColorTab12: <BiggerCardColorTab12 app={app} />,
      biggerCardColorTab13: <BiggerCardColorTab13 app={app} />,
      biggerCardColorTabWhite: <BiggerCardColorTabWhite app={app} />,
      biggerCardColorTabBlack: <BiggerCardColorTabBlack app={app} />,
      biggerCardBorderless: <BiggerCardBorderless app={app} />,
      biggerCardBorderlessTab: <BiggerCardBorderlessTab app={app} />,

      biggestCard: <BiggestCard app={app} />,
      biggestCardColorTab: <BiggestCardColorTab app={app} />,
      biggestCardColorTab1: <BiggestCardColorTab1 app={app} />,
      biggestCardColorTab2: <BiggestCardColorTab2 app={app} />,
      biggestCardColorTab3: <BiggestCardColorTab3 app={app} />,
      biggestCardColorTab4: <BiggestCardColorTab4 app={app} />,
      biggestCardColorTab5: <BiggestCardColorTab5 app={app} />,
      biggestCardColorTab6: <BiggestCardColorTab6 app={app} />,
      biggestCardColorTab7: <BiggestCardColorTab7 app={app} />,
      biggestCardColorTab8: <BiggestCardColorTab8 app={app} />,
      biggestCardColorTab9: <BiggestCardColorTab9 app={app} />,
      biggestCardColorTab10: <BiggestCardColorTab10 app={app} />,
      biggestCardColorTab11: <BiggestCardColorTab11 app={app} />,
      biggestCardColorTab12: <BiggestCardColorTab12 app={app} />,
      biggestCardColorTab13: <BiggestCardColorTab13 app={app} />,
      biggestCardColorTabWhite: <BiggestCardColorTabWhite app={app} />,
      biggestCardColorTabBlack: <BiggestCardColorTabBlack app={app} />,
      biggestCardBorderless: <BiggestCardBorderless app={app} />,
      biggestCardBorderlessTab: <BiggestCardBorderlessTab app={app} />,

      tallCard: <TallCard app={app} />,
      tallCardColorTab: <TallCardColorTab app={app} />,
      tallCardColorTab1: <TallCardColorTab1 app={app} />,
      tallCardColorTab2: <TallCardColorTab2 app={app} />,
      tallCardColorTab3: <TallCardColorTab3 app={app} />,
      tallCardColorTab4: <TallCardColorTab4 app={app} />,
      tallCardColorTab5: <TallCardColorTab5 app={app} />,
      tallCardColorTab6: <TallCardColorTab6 app={app} />,
      tallCardColorTab7: <TallCardColorTab7 app={app} />,
      tallCardColorTab8: <TallCardColorTab8 app={app} />,
      tallCardColorTab9: <TallCardColorTab9 app={app} />,
      tallCardColorTab10: <TallCardColorTab10 app={app} />,
      tallCardColorTab11: <TallCardColorTab11 app={app} />,
      tallCardColorTab12: <TallCardColorTab12 app={app} />,
      tallCardColorTab13: <TallCardColorTab13 app={app} />,
      tallCardColorTabWhite: <TallCardColorTabWhite app={app} />,
      tallCardColorTabBlack: <TallCardColorTabBlack app={app} />,
      tallCardBorderless: <TallCardBorderless app={app} />,
      tallCardBorderlessTab: <TallCardBorderlessTab app={app} />,

      tallerCard: <TallerCard app={app} />,
      tallerCardColorTab: <TallerCardColorTab app={app} />,
      tallerCardColorTab1: <TallerCardColorTab1 app={app} />,
      tallerCardColorTab2: <TallerCardColorTab2 app={app} />,
      tallerCardColorTab3: <TallerCardColorTab3 app={app} />,
      tallerCardColorTab4: <TallerCardColorTab4 app={app} />,
      tallerCardColorTab5: <TallerCardColorTab5 app={app} />,
      tallerCardColorTab6: <TallerCardColorTab6 app={app} />,
      tallerCardColorTab7: <TallerCardColorTab7 app={app} />,
      tallerCardColorTab8: <TallerCardColorTab8 app={app} />,
      tallerCardColorTab9: <TallerCardColorTab9 app={app} />,
      tallerCardColorTab10: <TallerCardColorTab10 app={app} />,
      tallerCardColorTab11: <TallerCardColorTab11 app={app} />,
      tallerCardColorTab12: <TallerCardColorTab12 app={app} />,
      tallerCardColorTab13: <TallerCardColorTab13 app={app} />,
      tallerCardColorTabWhite: <TallerCardColorTabWhite app={app} />,
      tallerCardColorTabBlack: <TallerCardColorTabBlack app={app} />,
      tallerCardBorderless: <TallerCardBorderless app={app} />,
      tallerCardBorderlessTab: <TallerCardBorderlessTab app={app} />,

      tallestCard: <TallestCard app={app} />,
      tallestCardColorTab: <TallestCardColorTab app={app} />,
      tallestCardColorTab1: <TallestCardColorTab1 app={app} />,
      tallestCardColorTab2: <TallestCardColorTab2 app={app} />,
      tallestCardColorTab3: <TallestCardColorTab3 app={app} />,
      tallestCardColorTab4: <TallestCardColorTab4 app={app} />,
      tallestCardColorTab5: <TallestCardColorTab5 app={app} />,
      tallestCardColorTab6: <TallestCardColorTab6 app={app} />,
      tallestCardColorTab7: <TallestCardColorTab7 app={app} />,
      tallestCardColorTab8: <TallestCardColorTab8 app={app} />,
      tallestCardColorTab9: <TallestCardColorTab9 app={app} />,
      tallestCardColorTab10: <TallestCardColorTab10 app={app} />,
      tallestCardColorTab11: <TallestCardColorTab11 app={app} />,
      tallestCardColorTab12: <TallestCardColorTab12 app={app} />,
      tallestCardColorTab13: <TallestCardColorTab13 app={app} />,
      tallestCardColorTabWhite: <TallestCardColorTabWhite app={app} />,
      tallestCardColorTabBlack: <TallestCardColorTabBlack app={app} />,
      tallestCardBorderless: <TallestCardBorderless app={app} />,
      tallestCardBorderlessTab: <TallestCardBorderlessTab app={app} />,

      popup: <Popup app={{...app, state:{...app.state, styles:styles} }} handleClose={this.props.handleClose}  options={this.props.options} type={this.props.type}/>,
      popupWithTab: <PopupWithTab app={{...app, state:{...app.state, styles:styles}}} handleClose={this.props.handleClose} options={this.props.options} type={this.props.type}/>


    
    }
    
    //*********CARD ASSIGN********/





    return (
      <div >
        
        {cards[this.props.type? this.props.type: "biggestCardColorTab"]}
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
    <div>McHavish is dead and his brother don't know it, his brother is dead and McHavish don't know it. They're both lying dead in the very same bed and neither one knows that the other is dead.
      McHavish is dead and his brother don't know it, his brother is dead and McHavish don't know it. They're both lying dead in the very same bed and neither one knows that the other is dead.
      McHavish is dead and his brother don't know it, his brother is dead and McHavish don't know it. They're both lying dead in the very same bed and neither one knows that the other is dead.
      McHavish is dead and his brother don't know it, his brother is dead and McHavish don't know it. They're both lying dead in the very same bed and neither one knows that the other is dead.
      McHavish is dead and his brother don't know it, his brother is dead and McHavish don't know it. They're both lying dead in the very same bed and neither one knows that the other is dead.
      McHavish is dead and his brother don't know it, his brother is dead and McHavish don't know it. They're both lying dead in the very same bed and neither one knows that the other is dead.
      McHavish is dead and his brother don't know it, his brother is dead and McHavish don't know it. They're both lying dead in the very same bed and neither one knows that the other is dead.
      McHavish is dead and his brother don't know it, his brother is dead and McHavish don't know it. They're both lying dead in the very same bed and neither one knows that the other is dead.
      McHavish is dead and his brother don't know it, his brother is dead and McHavish don't know it. They're both lying dead in the very same bed and neither one knows that the other is dead.
      McHavish is dead and his brother don't know it, his brother is dead and McHavish don't know it. They're both lying dead in the very same bed and neither one knows that the other is dead.
      McHavish is dead and his brother don't know it, his brother is dead and McHavish don't know it. They're both lying dead in the very same bed and neither one knows that the other is dead.
      McHavish is dead and his brother don't know it, his brother is dead and McHavish don't know it. They're both lying dead in the very same bed and neither one knows that the other is dead.
      McHavish is dead and his brother don't know it, his brother is dead and McHavish don't know it. They're both lying dead in the very same bed and neither one knows that the other is dead.
      McHavish is dead and his brother don't know it, his brother is dead and McHavish don't know it. They're both lying dead in the very same bed and neither one knows that the other is dead.
      McHavish is dead and his brother don't know it, his brother is dead and McHavish don't know it. They're both lying dead in the very same bed and neither one knows that the other is dead.
      McHavish is dead and his brother don't know it, his brother is dead and McHavish don't know it. They're both lying dead in the very same bed and neither one knows that the other is dead.
      McHavish is dead and his brother don't know it, his brother is dead and McHavish don't know it. They're both lying dead in the very same bed and neither one knows that the other is dead.
      McHavish is dead and his brother don't know it, his brother is dead and McHavish don't know it. They're both lying dead in the very same bed and neither one knows that the other is dead.
      McHavish is dead and his brother don't know it, his brother is dead and McHavish don't know it. They're both lying dead in the very same bed and neither one knows that the other is dead.
      McHavish is dead and his brother don't know it, his brother is dead and McHavish don't know it. They're both lying dead in the very same bed and neither one knows that the other is dead.
      McHavish is dead and his brother don't know it, his brother is dead and McHavish don't know it. They're both lying dead in the very same bed and neither one knows that the other is dead.
      McHavish is dead and his brother don't know it, his brother is dead and McHavish don't know it. They're both lying dead in the very same bed and neither one knows that the other is dead.
      McHavish is dead and his brother don't know it, his brother is dead and McHavish don't know it. They're both lying dead in the very same bed and neither one knows that the other is dead.

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
    <div>Title</div>
    )
  }
}



//********SMALLEST CARD********/
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
            <div style={{...styles?.cardContent}}>
              <MainContent app={app} />
            </div>
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
      <div style={{...styles?.smallestCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class SmallestCardColorTab1 extends Component{
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
      <div style={{...styles?.colorTab1}}> <TabContent app={app} /></div>   
      <div style={{...styles?.smallestCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class SmallestCardColorTab2 extends Component{
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
      <div style={{...styles?.colorTab2}}> <TabContent app={app} /></div>   
      <div style={{...styles?.smallestCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class SmallestCardColorTab3 extends Component{
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
      <div style={{...styles?.colorTab3}}> <TabContent app={app} /></div>   
      <div style={{...styles?.smallestCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class SmallestCardColorTab4 extends Component{
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
      <div style={{...styles?.colorTab4}}> <TabContent app={app} /></div>   
      <div style={{...styles?.smallestCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class SmallestCardColorTab5 extends Component{
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
      <div style={{...styles?.colorTab5}}> <TabContent app={app} /></div>   
      <div style={{...styles?.smallestCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class SmallestCardColorTab6 extends Component{
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
      <div style={{...styles?.colorTab6}}> <TabContent app={app} /></div>   
      <div style={{...styles?.smallestCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class SmallestCardColorTab7 extends Component{
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
      <div style={{...styles?.colorTab7}}> <TabContent app={app} /></div>   
      <div style={{...styles?.smallestCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class SmallestCardColorTab8 extends Component{
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
      <div style={{...styles?.colorTab8}}> <TabContent app={app} /></div>   
      <div style={{...styles?.smallestCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class SmallestCardColorTab9 extends Component{
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
      <div style={{...styles?.colorTab9}}> <TabContent app={app} /></div>   
      <div style={{...styles?.smallestCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class SmallestCardColorTab10 extends Component{
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
      <div style={{...styles?.colorTab10}}> <TabContent app={app} /></div>   
      <div style={{...styles?.smallestCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class SmallestCardColorTab11 extends Component{
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
      <div style={{...styles?.colorTab11}}> <TabContent app={app} /></div>   
      <div style={{...styles?.smallestCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class SmallestCardColorTab12 extends Component{
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
      <div style={{...styles?.colorTab12}}> <TabContent app={app} /></div>   
      <div style={{...styles?.smallestCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class SmallestCardColorTab13 extends Component{
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
      <div style={{...styles?.colorTab13}}> <TabContent app={app} /></div>   
      <div style={{...styles?.smallestCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class SmallestCardColorTabWhite extends Component{
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
      <div style={{...styles?.colorTabWhite}}> <TabContent app={app} /></div>   
      <div style={{...styles?.smallestCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class SmallestCardColorTabBlack extends Component{
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
      <div style={{...styles?.colorTabBlack}}> <TabContent app={app} /></div>   
      <div style={{...styles?.smallestCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class SmallestCardBorderless extends Component{
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
      <div className='scroller'  style={{...styles?.smallestCardBorderless}}>   
            <div style={{...styles?.cardContent}}><MainContent app={app} /></div>
  
      </div>
    )
  }
}
class SmallestCardBorderlessTab extends Component{
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
      <div  style={{...styles?.smallestCardBorderless}}>   
      <div style={{...styles?.borderlessTab}}> <TabContent app={app} /></div>   
      <div style={{...styles?.smallestCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}






//********SMALLER CARD********/
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
      <div  className='scroller'  style={{...styles?.smallerCard}}>   
            <div style={{...styles?.cardContent}}><MainContent app={app} /></div>
  
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
      <div style={{...styles?.smallerCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class SmallerCardColorTab1 extends Component{
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
      <div style={{...styles?.colorTab1}}> <TabContent app={app} /></div>   
      <div style={{...styles?.smallerCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class SmallerCardColorTab2 extends Component{
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
      <div style={{...styles?.colorTab2}}> <TabContent app={app} /></div>   
      <div style={{...styles?.smallerCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class SmallerCardColorTab3 extends Component{
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
      <div style={{...styles?.colorTab3}}> <TabContent app={app} /></div>   
      <div style={{...styles?.smallerCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class SmallerCardColorTab4 extends Component{
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
      <div style={{...styles?.colorTab4}}> <TabContent app={app} /></div>   
      <div style={{...styles?.smallerCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class SmallerCardColorTab5 extends Component{
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
      <div style={{...styles?.colorTab5}}> <TabContent app={app} /></div>   
      <div style={{...styles?.smallerCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class SmallerCardColorTab6 extends Component{
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
      <div style={{...styles?.colorTab6}}> <TabContent app={app} /></div>   
      <div style={{...styles?.smallerCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class SmallerCardColorTab7 extends Component{
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
      <div style={{...styles?.colorTab7}}> <TabContent app={app} /></div>   
      <div style={{...styles?.smallerCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class SmallerCardColorTab8 extends Component{
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
      <div style={{...styles?.colorTab8}}> <TabContent app={app} /></div>   
      <div style={{...styles?.smallerCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class SmallerCardColorTab9 extends Component{
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
      <div style={{...styles?.colorTab9}}> <TabContent app={app} /></div>   
      <div style={{...styles?.smallerCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class SmallerCardColorTab10 extends Component{
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
      <div style={{...styles?.colorTab10}}> <TabContent app={app} /></div>   
      <div style={{...styles?.smallerCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class SmallerCardColorTab11 extends Component{
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
      <div style={{...styles?.colorTab11}}> <TabContent app={app} /></div>   
      <div style={{...styles?.smallerCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class SmallerCardColorTab12 extends Component{
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
      <div style={{...styles?.colorTab12}}> <TabContent app={app} /></div>   
      <div style={{...styles?.smallerCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class SmallerCardColorTab13 extends Component{
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
      <div style={{...styles?.colorTab13}}> <TabContent app={app} /></div>   
      <div style={{...styles?.smallerCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class SmallerCardColorTabWhite extends Component{
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
      <div style={{...styles?.colorTabWhite}}> <TabContent app={app} /></div>   
      <div style={{...styles?.smallerCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class SmallerCardColorTabBlack extends Component{
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
      <div style={{...styles?.colorTabBlack}}> <TabContent app={app} /></div>   
      <div style={{...styles?.smallerCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class SmallerCardBorderless extends Component{
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
      <div className='scroller'  style={{...styles?.smallerCardBorderless}}>   
            <div style={{...styles?.cardContent}}><MainContent app={app} /></div>
  
      </div>
    )
  }
}
class SmallerCardBorderlessTab extends Component{
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
      <div  style={{...styles?.smallerCardBorderless}}>   
      <div style={{...styles?.borderlessTab}}> <TabContent app={app} /></div>   
      <div style={{...styles?.smallerCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}





//********SMALL CARD********/
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
        <div style={{...styles?.cardContent}}><MainContent app={app} /></div>
  
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
      <div style={{...styles?.smallCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class SmallCardColorTab1 extends Component{
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
      <div style={{...styles?.colorTab1}}> <TabContent app={app} /></div>   
      <div style={{...styles?.smallCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class SmallCardColorTab2 extends Component{
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
      <div style={{...styles?.colorTab2}}> <TabContent app={app} /></div>   
      <div style={{...styles?.smallCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class SmallCardColorTab3 extends Component{
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
      <div style={{...styles?.colorTab3}}> <TabContent app={app} /></div>   
      <div style={{...styles?.smallCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class SmallCardColorTab4 extends Component{
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
      <div style={{...styles?.colorTab4}}> <TabContent app={app} /></div>   
      <div style={{...styles?.smallCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class SmallCardColorTab5 extends Component{
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
      <div style={{...styles?.colorTab5}}> <TabContent app={app} /></div>   
      <div style={{...styles?.smallCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class SmallCardColorTab6 extends Component{
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
      <div style={{...styles?.colorTab6}}> <TabContent app={app} /></div>   
      <div style={{...styles?.smallCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class SmallCardColorTab7 extends Component{
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
      <div style={{...styles?.colorTab7}}> <TabContent app={app} /></div>   
      <div style={{...styles?.smallCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class SmallCardColorTab8 extends Component{
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
      <div style={{...styles?.colorTab8}}> <TabContent app={app} /></div>   
      <div style={{...styles?.smallCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class SmallCardColorTab9 extends Component{
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
      <div style={{...styles?.colorTab9}}> <TabContent app={app} /></div>   
      <div style={{...styles?.smallCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class SmallCardColorTab10 extends Component{
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
      <div style={{...styles?.colorTab10}}> <TabContent app={app} /></div>   
      <div style={{...styles?.smallCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class SmallCardColorTab11 extends Component{
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
      <div style={{...styles?.colorTab11}}> <TabContent app={app} /></div>   
      <div style={{...styles?.smallCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class SmallCardColorTab12 extends Component{
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
      <div style={{...styles?.colorTab12}}> <TabContent app={app} /></div>   
      <div style={{...styles?.smallCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class SmallCardColorTab13 extends Component{
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
      <div style={{...styles?.colorTab13}}> <TabContent app={app} /></div>   
      <div style={{...styles?.smallCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class SmallCardColorTabWhite extends Component{
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
      <div style={{...styles?.colorTabWhite}}> <TabContent app={app} /></div>   
      <div style={{...styles?.smallCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class SmallCardColorTabBlack extends Component{
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
      <div style={{...styles?.colorTabBlack}}> <TabContent app={app} /></div>   
      <div style={{...styles?.smallCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class SmallCardBorderless extends Component{
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
      <div className='scroller'  style={{...styles?.smallCardBorderless}}>   
        <div style={{...styles?.cardContent}}><MainContent app={app} /></div>
  
      </div>
    )
  }
}
class SmallCardBorderlessTab extends Component{
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
      <div  style={{...styles?.smallCardBorderless}}>   
      <div style={{...styles?.borderlessTab}}> <TabContent app={app} /></div>   
      <div style={{...styles?.smallCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}





//********BIG CARD********/
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
        <div style={{...styles?.cardContent}}><MainContent app={app} /></div>
  
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
      <div style={{...styles?.bigCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class BigCardColorTab1 extends Component{
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
      <div style={{...styles?.colorTab1}}> <TabContent app={app} /></div>   
      <div style={{...styles?.bigCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class BigCardColorTab2 extends Component{
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
      <div style={{...styles?.colorTab2}}> <TabContent app={app} /></div>   
      <div style={{...styles?.bigCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class BigCardColorTab3 extends Component{
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
      <div style={{...styles?.colorTab3}}> <TabContent app={app} /></div>   
      <div style={{...styles?.bigCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class BigCardColorTab4 extends Component{
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
      <div style={{...styles?.colorTab4}}> <TabContent app={app} /></div>   
      <div style={{...styles?.bigCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class BigCardColorTab5 extends Component{
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
      <div style={{...styles?.colorTab5}}> <TabContent app={app} /></div>   
      <div style={{...styles?.bigCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class BigCardColorTab6 extends Component{
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
      <div style={{...styles?.colorTab6}}> <TabContent app={app} /></div>   
      <div style={{...styles?.bigCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class BigCardColorTab7 extends Component{
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
      <div style={{...styles?.colorTab7}}> <TabContent app={app} /></div>   
      <div style={{...styles?.bigCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class BigCardColorTab8 extends Component{
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
      <div style={{...styles?.colorTab8}}> <TabContent app={app} /></div>   
      <div style={{...styles?.bigCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class BigCardColorTab9 extends Component{
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
      <div style={{...styles?.colorTab9}}> <TabContent app={app} /></div>   
      <div style={{...styles?.bigCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class BigCardColorTab10 extends Component{
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
      <div style={{...styles?.colorTab10}}> <TabContent app={app} /></div>   
      <div style={{...styles?.bigCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class BigCardColorTab11 extends Component{
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
      <div style={{...styles?.colorTab11}}> <TabContent app={app} /></div>   
      <div style={{...styles?.bigCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class BigCardColorTab12 extends Component{
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
      <div style={{...styles?.colorTab12}}> <TabContent app={app} /></div>   
      <div style={{...styles?.bigCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class BigCardColorTab13 extends Component{
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
      <div style={{...styles?.colorTab13}}> <TabContent app={app} /></div>   
      <div style={{...styles?.bigCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class BigCardColorTabWhite extends Component{
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
      <div style={{...styles?.colorTabWhite}}> <TabContent app={app} /></div>   
      <div style={{...styles?.bigCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class BigCardColorTabBlack extends Component{
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
      <div style={{...styles?.colorTabBlack}}> <TabContent app={app} /></div>   
      <div style={{...styles?.bigCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class BigCardBorderless extends Component{
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
      <div className='scroller'  style={{...styles?.bigCardBorderless}}>   
        <div style={{...styles?.cardContent}}><MainContent app={app} /></div>
  
      </div>
    )
  }
}
class BigCardBorderlessTab extends Component{
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
      <div  style={{...styles?.bigCardBorderless}}>   
      <div style={{...styles?.borderlessTab}}> <TabContent app={app} /></div>   
      <div style={{...styles?.bigCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}





//********BIGGERCARD********/
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
        <div style={{...styles?.cardContent}}><MainContent app={app} /></div>

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
      <div style={{...styles?.colorTab}}> <TabContent app={app} /></div>   
      <div style={{...styles?.biggerCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class BiggerCardColorTab1 extends Component{
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
      <div style={{...styles?.colorTab1}}> <TabContent app={app} /></div>   
      <div style={{...styles?.biggerCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class BiggerCardColorTab2 extends Component{
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
      <div style={{...styles?.colorTab2}}> <TabContent app={app} /></div>   
      <div style={{...styles?.biggerCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class BiggerCardColorTab3 extends Component{
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
      <div style={{...styles?.colorTab3}}> <TabContent app={app} /></div>   
      <div style={{...styles?.biggerCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class BiggerCardColorTab4 extends Component{
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
      <div style={{...styles?.colorTab4}}> <TabContent app={app} /></div>   
      <div style={{...styles?.biggerCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class BiggerCardColorTab5 extends Component{
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
      <div style={{...styles?.colorTab5}}> <TabContent app={app} /></div>   
      <div style={{...styles?.biggerCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class BiggerCardColorTab6 extends Component{
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
      <div style={{...styles?.colorTab6}}> <TabContent app={app} /></div>   
      <div style={{...styles?.biggerCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class BiggerCardColorTab7 extends Component{
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
      <div style={{...styles?.colorTab7}}> <TabContent app={app} /></div>   
      <div style={{...styles?.biggerCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class BiggerCardColorTab8 extends Component{
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
      <div style={{...styles?.colorTab8}}> <TabContent app={app} /></div>   
      <div style={{...styles?.biggerCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class BiggerCardColorTab9 extends Component{
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
      <div style={{...styles?.colorTab9}}> <TabContent app={app} /></div>   
      <div style={{...styles?.biggerCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class BiggerCardColorTab10 extends Component{
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
      <div style={{...styles?.colorTab10}}> <TabContent app={app} /></div>   
      <div style={{...styles?.biggerCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class BiggerCardColorTab11 extends Component{
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
      <div style={{...styles?.colorTab11}}> <TabContent app={app} /></div>   
      <div style={{...styles?.biggerCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class BiggerCardColorTab12 extends Component{
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
      <div style={{...styles?.colorTab12}}> <TabContent app={app} /></div>   
      <div style={{...styles?.biggerCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class BiggerCardColorTab13 extends Component{
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
      <div style={{...styles?.colorTab13}}> <TabContent app={app} /></div>   
      <div style={{...styles?.biggerCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class BiggerCardColorTabWhite extends Component{
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
      <div style={{...styles?.colorTabWhite}}> <TabContent app={app} /></div>   
      <div style={{...styles?.biggerCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class BiggerCardColorTabBlack extends Component{
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
      <div style={{...styles?.colorTabBlack}}> <TabContent app={app} /></div>   
      <div style={{...styles?.biggerCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class BiggerCardBorderless extends Component{
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
      <div className='scroller'  style={{...styles?.biggerCardBorderless}}>   
        <div style={{...styles?.cardContent}}><MainContent app={app} /></div>
  
      </div>
    )
  }
}
class BiggerCardBorderlessTab extends Component{
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
      <div  style={{...styles?.biggerCardBorderless}}>   
      <div style={{...styles?.borderlessTab}}> <TabContent app={app} /></div>   
      <div style={{...styles?.biggerCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}





//********BIGGEST CARD********/
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
        <div style={{...styles?.cardContent}}><MainContent app={app} /></div>
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

    return(
      <div  style={{...styles?.biggestCard}}>   
      <div style={{...styles?.colorTab}}> <TabContent app={app} /></div>   
      <div style={{...styles?.biggestCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class BiggestCardColorTab1 extends Component{
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
      <div  style={{...styles?.biggestCard}}>   
      <div style={{...styles?.colorTab1}}> <TabContent app={app} /></div>   
      <div style={{...styles?.biggestCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class BiggestCardColorTab2 extends Component{
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
      <div  style={{...styles?.biggestCard}}>   
      <div style={{...styles?.colorTab2}}> <TabContent app={app} /></div>   
      <div style={{...styles?.biggestCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class BiggestCardColorTab3 extends Component{
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
      <div  style={{...styles?.biggestCard}}>   
      <div style={{...styles?.colorTab3}}> <TabContent app={app} /></div>   
      <div style={{...styles?.biggestCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class BiggestCardColorTab4 extends Component{
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
      <div  style={{...styles?.biggestCard}}>   
      <div style={{...styles?.colorTab4}}> <TabContent app={app} /></div>   
      <div style={{...styles?.biggestCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class BiggestCardColorTab5 extends Component{
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
      <div  style={{...styles?.biggestCard}}>   
      <div style={{...styles?.colorTab5}}> <TabContent app={app} /></div>   
      <div style={{...styles?.biggestCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class BiggestCardColorTab6 extends Component{
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
      <div  style={{...styles?.biggestCard}}>   
      <div style={{...styles?.colorTab6}}> <TabContent app={app} /></div>   
      <div style={{...styles?.biggestCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class BiggestCardColorTab7 extends Component{
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
      <div  style={{...styles?.biggestCard}}>   
      <div style={{...styles?.colorTab7}}> <TabContent app={app} /></div>   
      <div style={{...styles?.biggestCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class BiggestCardColorTab8 extends Component{
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
      <div  style={{...styles?.biggestCard}}>   
      <div style={{...styles?.colorTab8}}> <TabContent app={app} /></div>   
      <div style={{...styles?.biggestCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class BiggestCardColorTab9 extends Component{
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
      <div  style={{...styles?.biggestCard}}>   
      <div style={{...styles?.colorTab9}}> <TabContent app={app} /></div>   
      <div style={{...styles?.biggestCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class BiggestCardColorTab10 extends Component{
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
      <div  style={{...styles?.biggestCard}}>   
      <div style={{...styles?.colorTab10}}> <TabContent app={app} /></div>   
      <div style={{...styles?.biggestCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class BiggestCardColorTab11 extends Component{
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
      <div  style={{...styles?.biggestCard}}>   
      <div style={{...styles?.colorTab11}}> <TabContent app={app} /></div>   
      <div style={{...styles?.biggestCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class BiggestCardColorTab12 extends Component{
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
      <div  style={{...styles?.biggestCard}}>   
      <div style={{...styles?.colorTab12}}> <TabContent app={app} /></div>   
      <div style={{...styles?.biggestCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class BiggestCardColorTab13 extends Component{
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
      <div  style={{...styles?.biggestCard}}>   
      <div style={{...styles?.colorTab13}}> <TabContent app={app} /></div>   
      <div style={{...styles?.biggestCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class BiggestCardColorTabWhite extends Component{
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
      <div  style={{...styles?.biggestCard}}>   
      <div style={{...styles?.colorTabWhite}}> <TabContent app={app} /></div>   
      <div style={{...styles?.biggestCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class BiggestCardColorTabBlack extends Component{
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
      <div  style={{...styles?.biggestCard}}>   
      <div style={{...styles?.colorTabBlack}}> <TabContent app={app} /></div>   
      <div style={{...styles?.biggestCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class BiggestCardBorderless extends Component{
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
      <div className='scroller'  style={{...styles?.biggestCardBorderless}}>   
        <div style={{...styles?.cardContent}}><MainContent app={app} /></div>
  
      </div>
    )
  }
}
class BiggestCardBorderlessTab extends Component{
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
      <div  style={{...styles?.biggestCardBorderless}}>   
      <div style={{...styles?.borderlessTab}}> <TabContent app={app} /></div>   
      <div style={{...styles?.biggestCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}





//**********TALL CARD********/
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
        <div style={{...styles?.cardContent}}><MainContent app={app} /></div>

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
      <div style={{...styles?.tallCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class TallCardColorTab1 extends Component{
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
      <div style={{...styles?.colorTab1}}> <TabContent app={app} /></div>   
      <div style={{...styles?.tallCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class TallCardColorTab2 extends Component{
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
      <div style={{...styles?.colorTab2}}> <TabContent app={app} /></div>   
      <div style={{...styles?.tallCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class TallCardColorTab3 extends Component{
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
      <div style={{...styles?.colorTab3}}> <TabContent app={app} /></div>   
      <div style={{...styles?.tallCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class TallCardColorTab4 extends Component{
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
      <div style={{...styles?.colorTab4}}> <TabContent app={app} /></div>   
      <div style={{...styles?.tallCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class TallCardColorTab5 extends Component{
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
      <div style={{...styles?.colorTab5}}> <TabContent app={app} /></div>   
      <div style={{...styles?.tallCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class TallCardColorTab6 extends Component{
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
      <div style={{...styles?.colorTab6}}> <TabContent app={app} /></div>   
      <div style={{...styles?.tallCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class TallCardColorTab7 extends Component{
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
      <div style={{...styles?.colorTab7}}> <TabContent app={app} /></div>   
      <div style={{...styles?.tallCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class TallCardColorTab8 extends Component{
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
      <div style={{...styles?.colorTab8}}> <TabContent app={app} /></div>   
      <div style={{...styles?.tallCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class TallCardColorTab9 extends Component{
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
      <div style={{...styles?.colorTab9}}> <TabContent app={app} /></div>   
      <div style={{...styles?.tallCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class TallCardColorTab10 extends Component{
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
      <div style={{...styles?.colorTab10}}> <TabContent app={app} /></div>   
      <div style={{...styles?.tallCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class TallCardColorTab11 extends Component{
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
      <div style={{...styles?.colorTab11}}> <TabContent app={app} /></div>   
      <div style={{...styles?.tallCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class TallCardColorTab12 extends Component{
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
      <div style={{...styles?.colorTab12}}> <TabContent app={app} /></div>   
      <div style={{...styles?.tallCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class TallCardColorTab13 extends Component{
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
      <div style={{...styles?.colorTab13}}> <TabContent app={app} /></div>   
      <div style={{...styles?.tallCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class TallCardColorTabWhite extends Component{
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
      <div style={{...styles?.colorTabWhite}}> <TabContent app={app} /></div>   
      <div style={{...styles?.tallCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class TallCardColorTabBlack extends Component{
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
      <div style={{...styles?.colorTabBlack}}> <TabContent app={app} /></div>   
      <div style={{...styles?.tallCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class TallCardBorderless extends Component{
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
      <div className='scroller'  style={{...styles?.tallCardBorderless}}>   
        <div style={{...styles?.cardContent}}><MainContent app={app} /></div>
  
      </div>
    )
  }
}
class TallCardBorderlessTab extends Component{
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
      <div  style={{...styles?.tallCardBorderless}}>   
      <div style={{...styles?.borderlessTab}}> <TabContent app={app} /></div>   
      <div style={{...styles?.tallCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}





//********TALLER CARD********/
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
        <div style={{...styles?.cardContent}}><MainContent app={app} /></div>

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
      <div style={{...styles?.tallerCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class TallerCardColorTab1 extends Component{
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
      <div style={{...styles?.colorTab1}}> <TabContent app={app} /></div>   
      <div style={{...styles?.tallerCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class TallerCardColorTab2 extends Component{
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
      <div style={{...styles?.colorTab2}}> <TabContent app={app} /></div>   
      <div style={{...styles?.tallerCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class TallerCardColorTab3 extends Component{
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
      <div style={{...styles?.colorTab3}}> <TabContent app={app} /></div>   
      <div style={{...styles?.tallerCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class TallerCardColorTab4 extends Component{
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
      <div style={{...styles?.colorTab4}}> <TabContent app={app} /></div>   
      <div style={{...styles?.tallerCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class TallerCardColorTab5 extends Component{
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
      <div style={{...styles?.colorTab5}}> <TabContent app={app} /></div>   
      <div style={{...styles?.tallerCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class TallerCardColorTab6 extends Component{
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
      <div style={{...styles?.colorTab6}}> <TabContent app={app} /></div>   
      <div style={{...styles?.tallerCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class TallerCardColorTab7 extends Component{
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
      <div style={{...styles?.colorTab7}}> <TabContent app={app} /></div>   
      <div style={{...styles?.tallerCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class TallerCardColorTab8 extends Component{
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
      <div style={{...styles?.colorTab8}}> <TabContent app={app} /></div>   
      <div style={{...styles?.tallerCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class TallerCardColorTab9 extends Component{
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
      <div style={{...styles?.colorTab9}}> <TabContent app={app} /></div>   
      <div style={{...styles?.tallerCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class TallerCardColorTab10 extends Component{
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
      <div style={{...styles?.colorTab10}}> <TabContent app={app} /></div>   
      <div style={{...styles?.tallerCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class TallerCardColorTab11 extends Component{
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
      <div style={{...styles?.colorTab11}}> <TabContent app={app} /></div>   
      <div style={{...styles?.tallerCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class TallerCardColorTab12 extends Component{
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
      <div style={{...styles?.colorTab12}}> <TabContent app={app} /></div>   
      <div style={{...styles?.tallerCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class TallerCardColorTab13 extends Component{
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
      <div style={{...styles?.colorTab13}}> <TabContent app={app} /></div>   
      <div style={{...styles?.tallerCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class TallerCardColorTabWhite extends Component{
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
      <div style={{...styles?.colorTabWhite}}> <TabContent app={app} /></div>   
      <div style={{...styles?.tallerCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class TallerCardColorTabBlack extends Component{
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
      <div style={{...styles?.colorTabBlack}}> <TabContent app={app} /></div>   
      <div style={{...styles?.tallerCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class TallerCardBorderless extends Component{
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
      <div className='scroller'  style={{...styles?.tallerCardBorderless}}>   
        <div style={{...styles?.cardContent}}><MainContent app={app} /></div>
  
      </div>
    )
  }
}
class TallerCardBorderlessTab extends Component{
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
      <div  style={{...styles?.tallerCardBorderless}}>   
      <div style={{...styles?.borderlessTab}}> <TabContent app={app} /></div>   
      <div style={{...styles?.tallerCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}





//********TALLEST CARD********/
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
        <div style={{...styles?.cardContent}}><MainContent app={app} /></div>

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
      <div style={{...styles?.tallestCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class TallestCardColorTab1 extends Component{
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
      <div style={{...styles?.colorTab1}}> <TabContent app={app} /></div>   
      <div style={{...styles?.tallestCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class TallestCardColorTab2 extends Component{
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
      <div style={{...styles?.colorTab2}}> <TabContent app={app} /></div>   
      <div style={{...styles?.tallestCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class TallestCardColorTab3 extends Component{
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
      <div style={{...styles?.colorTab3}}> <TabContent app={app} /></div>   
      <div style={{...styles?.tallestCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class TallestCardColorTab4 extends Component{
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
      <div style={{...styles?.colorTab4}}> <TabContent app={app} /></div>   
      <div style={{...styles?.tallestCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class TallestCardColorTab5 extends Component{
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
      <div style={{...styles?.colorTab5}}> <TabContent app={app} /></div>   
      <div style={{...styles?.tallestCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class TallestCardColorTab6 extends Component{
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
      <div style={{...styles?.colorTab6}}> <TabContent app={app} /></div>   
      <div style={{...styles?.tallestCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class TallestCardColorTab7 extends Component{
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
      <div style={{...styles?.colorTab7}}> <TabContent app={app} /></div>   
      <div style={{...styles?.tallestCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class TallestCardColorTab8 extends Component{
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
      <div style={{...styles?.colorTab8}}> <TabContent app={app} /></div>   
      <div style={{...styles?.tallestCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class TallestCardColorTab9 extends Component{
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
      <div style={{...styles?.colorTab9}}> <TabContent app={app} /></div>   
      <div style={{...styles?.tallestCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class TallestCardColorTab10 extends Component{
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
      <div style={{...styles?.colorTab10}}> <TabContent app={app} /></div>   
      <div style={{...styles?.tallestCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class TallestCardColorTab11 extends Component{
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
      <div style={{...styles?.colorTab11}}> <TabContent app={app} /></div>   
      <div style={{...styles?.tallestCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class TallestCardColorTab12 extends Component{
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
      <div style={{...styles?.colorTab12}}> <TabContent app={app} /></div>   
      <div style={{...styles?.tallestCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class TallestCardColorTab13 extends Component{
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
      <div style={{...styles?.colorTab13}}> <TabContent app={app} /></div>   
      <div style={{...styles?.tallestCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class TallestCardColorTabWhite extends Component{
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
      <div style={{...styles?.colorTabWhite}}> <TabContent app={app} /></div>   
      <div style={{...styles?.tallestCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class TallestCardColorTabBlack extends Component{
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
      <div style={{...styles?.colorTabBlack}}> <TabContent app={app} /></div>   
      <div style={{...styles?.tallestCardContentWithTab}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
class TallestCardBorderless extends Component{
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
      <div className='scroller'  style={{...styles?.tallestCardBorderless}}>   
            <div style={{...styles?.cardContent}}><MainContent app={app} /></div>
  
      </div>
    )
  }
}
class TallestCardBorderlessTab extends Component{
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
      <div  style={{...styles?.tallestCardBorderless}}>   
      <div style={{...styles?.borderlessTab}}> <TabContent app={app} /></div>   
      <div style={{...styles?.tallestCardContentWithTab}} className='scroller'>
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
                  } onClick={this.props.handleClose}>x</div></div>   
      <div className='scroller' style={{...styles[this.props.options?.cardContent? this.props.options.cardContent: "cardContent"]}}>
        <MainContent app={app} />
        </div>
        </div>
        



      </div>
    )
  }
}
  


