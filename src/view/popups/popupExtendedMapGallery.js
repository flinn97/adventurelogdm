import React, { Component } from 'react';
import "../../App.css"

import MapUploader from '../uploadMap';
import colorService from '../../services/colorService';
import { MapComponent } from '../../mapTech/mapComponentInterface';
import auth from '../../services/auth';

export default class PopupExtendedMapSelector extends Component {
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
    //TAYLOR add get from getFromUser library backend stuff here
  }

  render() {
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles = state.styles;

    return (
      <div className='scroller2' style={{
        display: "flex", width: "62vw", flexDirection: "column", height: "100%", alignContent: "center",
        justifyContent: "space-between",
        paddingTop: "40px", fontFamily: "serif", fontSize: styles.fonts.fontSubheader1,
      }}>
        <div style={{
          display: "flex", flexDirection: "column", position: 'relative',
          height: "100%", maxWidth: "100%", marginTop: "2px", marginBottom: "-140px"
        }}>
          {/* THIS ISN't WORKING? */}

          <MapUploader
            //TAYLOR //
            //Why is this not working//
            changePic={async (pic, path) => {
              
              let lore = state.currentLore;
              let map = { picURL: pic, loreId: lore.getJson()._id, campaignId: state.currentCampaign.getJson()._id, type: 'map' };
              await state.opps.cleanJsonPrepare({ addmap: map });
              map = await state.opps.getUpdater("add")[0];
              await map.getPicSrc(path);
              await state.opps.run();

              let colors = colorService.updateColors(pic, (palette) => {
                this.setState({ colors: palette }, async () => {
                  let con = this.state.colors;
                  let list = Object.values(con);
                  await this.setState({ colors: list });

                  // Update lore colors
                  let allColors = await lore.getJson().colors || [];  // Initialize to empty array if undefined
                  let newAllColors = allColors.concat(list);
                  await lore.setCompState({ colors: newAllColors });
                  await state.opp.cleanPrepareRun({ update: lore });


                });
              });


              await dispatch({ viewMap: map, popupSwitch: "" });
              this.setState({ map: map, currentMap: map });

            }}
            title="Large maps will take some time to load."
            text="Upload a Map" style={{
              display: "flex", marginBottom: "20px",
              zIndex: "1", background: "", cursor: "pointer"
            }}
            update={true} skipUpdate={true}
            app={app} />

          {/* {state.mapUpload} 
          I am initializing this, and this doesn't work either
          */}
          <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-end", width: "fit-content", height: "fit-content" }}>
            <div style={{ color: styles.colors.color8, marginTop: "12px", fontSize: "1rem", }}>or</div>
            <div style={{ color: styles.colors.colorWhite, marginTop: "12px", marginLeft: "13px", fontSize: "1.2rem" }}>Choose from Library:</div>
          </div>
        </div>




        <div style={{ height: "fit-content", paddingTop: "135px", justifyContent: "flex-start" }}>
          <hr></hr>
          <div className='hover-btn' style={{
            ...styles.buttons.buttonAdd, fontSize: styles.fonts.fontSmall, marginBottom: "12px", cursor: "pointer", zIndex: 200,
            marginTop: "10px", alignSelf: "center", padding: "11px", color: styles.colors.color9
          }} onClick={async () => {

            let images = await auth.getAllofTypeByUser(state.componentList, state.user.getJson()._id, "image");
            let maps = await auth.getAllofTypeByUser(state.componentList, state.user.getJson()._id, "map")
            dispatch({});


          }}>Import Library</div>
          
          <MapComponent theme="defaultRowWrap" app={app}
            cells={[{ type: "img", class: "Image-Item", func: (obj) => { this.createMapFromObj(obj) } }]} name="map" />
          <MapComponent theme="defaultRowWrap" app={app}
            cells={[{ type: "img", class: "Image-Item", func: (obj) => { this.createMapFromObj(obj) } }]} name="image" />

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
