import React, { Component } from 'react';
import "../../App.css"
import SplashScreen from '../pages/splashScreen';
import splash from '../../pics/ava logo empty.png'

export default class PopupApprovalSubmitted extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refrence: false,

    }
  }



  render() {
    let app = { ...this.props.app };
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles = state.styles;


    if (this.props.theme) {
      if (Object.prototype.toString.call(this.props.theme) === "[object String]") {
        styles = state.themeFactory.getThemeFactory()[this.props.theme];
      }
      else {
        styles = this.props.theme;
      }
    }
    app.state.styles = styles

    //********CARD ASSIGN********/

    let cards = {

      card: <Card app={{ ...app, state: { ...app.state, styles: styles } }} options={this.props.options} type={this.props.type} />,
      cardWithTab: <CardWithTab app={{ ...app, state: { ...app.state, styles: styles } }} options={this.props.options} type={this.props.type} />,
      popup: <Popup app={{ ...app, state: { ...app.state, styles: styles } }} handleClose={this.props.handleClose} options={this.props.options} type={this.props.type} delClick={this.props.delClick} />,
      popupWithTab: <PopupWithTab app={{ ...app, state: { ...app.state, styles: styles } }} handleClose={this.props.handleClose} options={this.props.options} type={this.props.type} delClick={this.props.delClick} />
      //popupType={this.props.popupType} popupTab={this.props.popupTab}

    }

    //*********CARD ASSIGN********/

    return (
      <div >

        {cards[this.props.type ? this.props.type : "card"]}
      </div>

    )
  }
}



//********CONTENTS********/
class MainContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: [],
      imagesToShow: 15,
    };
  }

  async createMapFromObj(obj) {

    let app = this.props.app;
    let state = app.state;
    let dispatch = app.dispatch;
    let lore = state.currentLore;
    let map = { picURL: obj.getJson().picURL, loreId: lore.getJson()._id, campaignId: state.currentCampaign.getJson()._id, type: 'map' };
    await state.opps.cleanJsonPrepare({ addmap: map });
    map = await state.opps.getUpdater("add")[0];
    await state.opps.run();
    await dispatch({ viewMap: map, popupSwitch: "" });


  }



  async componentDidMount() {
    let state = this.props.app.state;
  }

  render() {
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles = state.styles;

    return (
      <div style={{
        display: "flex", flexDirection: "column", height: "100%",
         color:styles.colors.colorWhite, height:"20vh",
        paddingTop: "40px", fontFamily: "serif", fontSize: styles.fonts.fontSubheader1,
      }}>
        
        <div style={{
          display: "flex", flexDirection: "column", position: 'relative', width:"fit-content",
          height: "fit-content", maxWidth: "100%",width:"100%",  textAlign:"center",
        }}>
          Approval Submitted for Review!
          <img src={splash} style={{width:"20vw", opacity:".103"}}/>
        </div>
      </div>
    )



  }
}

class TabContent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles = state.styles;

    return (
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>

        <div style={{ ...styles.buttons.buttonClose }}
          onClick={this.props.handleClose}
        >
          X
        </div>
      </div>
    )
  }
}

/**Popups */
class Popup extends Component {
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

  render() {
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles = state.styles;

    return (
      <div className="popup-box" style={{ zIndex: "1010" }}>
        <div ref={this.wrapperRef} className="popupCard"
          style={{ zIndex: "1010", ...styles[this.props.options?.cardType ? this.props.options?.cardType : "biggestCard"] }}>



          <div style={{ ...styles.buttons.buttonClose, position: "absolute", right: 32 }}
            onClick={this.props.handleClose}>X</div>

          <div style={{ ...styles[this.props.options?.cardContent ? this.props.options.cardContent : "cardContent"] }}>
            <MainContent app={app} delClick={this.props.delClick} />
          </div>


        </div>



      </div>
    )
  }
}
class PopupWithTab extends Component {
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
  render() {
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles = state.styles;

    return (
      <div className="popup-box" style={{ zIndex: "1010" }}>
        <div ref={this.wrapperRef} className="popupCard" style={{ zIndex: "1010", ...styles[this.props.options?.cardType ? this.props.options?.cardType : "biggestCard"] }}>

          <div style={{ ...styles[this.props.options?.tabType ? this.props.options?.tabType : "colorTab1"] }}>

            <TabContent app={app} handleClose={this.props.handleClose} delClick={this.props.delClick} /> <div style={ ///EXIT BUTTON
              styles.buttons.closeicon
            } onClick={this.props.handleClose}>x</div></div>
          <div style={{ ...styles[this.props.options?.cardContent ? this.props.options.cardContent : "cardContent"] }}>
            <MainContent app={app} handleClose={this.props.handleClose} delClick={this.props.delClick} />
          </div>
        </div>




      </div>
    )
  }
}





//********CARDs********/
class Card extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles = state.styles;

    return (
      <div style={{ ...styles[this.props.options?.cardType ? this.props.options?.cardType : "biggestCard"] }}>
        <div style={{ ...styles[this.props.options?.cardContent ? this.props.options.cardContent : "cardContent"] }}>
          <MainContent app={app} />
        </div>
      </div>
    )
  }
}

class CardWithTab extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles = state.styles;

    return (
      <div style={{ ...styles[this.props.type ? this.props.type : "biggestCard"] }}>
        <div style={{ ...styles[this.props.options?.tabType ? this.props.options?.tabType : "colorTab1"] }}> <TabContent app={app} /></div>
        <div style={{ ...styles[this.props.options?.cardContent ? this.props.options.cardContent : "cardContent"] }} >
          <MainContent app={app} />
        </div>
      </div>
    )
  }
}
