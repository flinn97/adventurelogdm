import React, { Component } from 'react';
import MapComponent from '../../componentListNPM/mapTech/mapComponent';
import { Link } from 'react-router-dom';
import "../../App.css";
import AddEncounter from '../AddEncounter';
import EncounterMapItem from '../encounterMapItem';
import trash from '../../pics/trashStill.png';
import auth from '../../services/auth';
import sort from '../../pics/abSort.png';


export default class EncounterCard extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  componentDidMount() {
    let href = window.location.href;
    let splitURL = href.split("/")
    let id = splitURL[splitURL.length - 1]
    let component = this.props.app.state.componentList.getComponent("campaign", id)
    this.setState({ obj: component })
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
      popup: <Popup app={{ ...app, state: { ...app.state, styles: styles } }} handleClose={this.props.handleClose} options={this.props.options} type={this.props.type} />,
      popupWithTab: <PopupWithTab app={{ ...app, state: { ...app.state, styles: styles } }} handleClose={this.props.handleClose} options={this.props.options} type={this.props.type} />
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
      start: false

    }
  }
  async componentDidMount() {
    let href = window.location.href;
    let splitURL = href.split("/")
    let id = splitURL[splitURL.length - 1];

    let component = this.props.app.state.componentList.getComponent("campaign", id);
    await auth.firebaseGetter(id, this.props.app.state.componentList, "campaignId", "lore", this.props.app.dispatch);

    this.setState({ obj: component, start: true })
  }

  async deleteEncounter() {
    let dispatch = this.props.app.dispatch;
    dispatch({ popupSwitch: "", currentDelObj: undefined });
    //OK DONT DO THIS
    const delay = ms => new Promise(res => setTimeout(res, ms));
    await delay(1500);
    window.location.href = "/encountermanager/";
  }


  render() {
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles = state.styles;


    return (


      <div>
        {this.state.start && <>
          
          {state.popUpSwitchcase != "addEncounter" && (
            <div style={{ width: "100%", display: "flex", flexDirection: "row", marginTop: "2vh", marginBottom: "2vh", justifyContent: "space-between" }}>
              <div style={{ ...styles.buttons.buttonAdd, }}
                onClick={() => {
                  if(state.user.getJson().role!=="GM"){
                    dispatch({ popupSwitch: "goPremium"});
                    return
                  }
                  //                  add > campaign          clear it > prepare not run           switchcase
                  dispatch({ operate: "addencounter", operation: "cleanJsonPrepare", popUpSwitchcase: "addEncounter", })
                }}>
                {/* // to={"/addencountermanager/" + this.state.obj?.getJson()._id} */}

                + Create Encounter
              </div>

              <div className='hover-container' style={{marginRight: "28px", padding: "3px 11px", }} title='Sort by Name'>
              
                <img src={sort} style={{ width: "41px", cursor: "pointer", }} />

                <div style={{color:styles.colors.color5, fontSize:".98rem",
                  background:styles.colors.color1, transform:"rotate(-10deg)", width:"162px", marginLeft:"-50px", marginTop:"10px"}} className='hover-div'> (Sort Coming Soon) </div>
              </div>

            </div>)
            ||
            <AddEncounter app={app} />
          }

          {state.popUpSwitchcase != "addEncounter" &&
            <div style={{
              display: "flex", position: "relative", flexDirection: "column", justifyContent: "flex-end",
              alignContent: "center", width: "100%", userSelect: "none", marginTop: "-22px",
            }}>


            </div>}

          <div style={{
            width: "100%", flexDirection: "row", display: "flex", justifyContent: "center", alignContent: "center", paddingLeft: "8%", paddingRight: "8%",
            background: styles.colors.color2 + "22", marginTop: "34px", borderRadius: "22px", paddingBottom: "34px"
          }}>
            <MapComponent
              checkUser={true}

              delOptions={{
                picURL: trash, warningMessage: "Delete this encounter (this is permanent)",
                textStyle: { fontSize: styles.fonts.fontSmallest, },
                style: {
                  width: "35px", height: "35px", padding: "4px 2px",
                  display: "flex", flexDirection: "row", marginBottom: "13px",
                  alignItems: "center", borderRadius: "8px",
                  justifyContent: "center"
                },
              }}
              app={app} name={"encounter"} cells={[{ custom: EncounterMapItem, props: { app: app } }, "delete"]}
              filter={{ search: this.state.obj?.getJson()._id, attribute: "campaignId" }}
              theme={"selectByImageSmall"}
            /></div>
        </>}
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
      <div>

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
      //Whole card content
      <div style={{ ...styles[this.props.options?.cardType ? this.props.options?.cardType : "biggestCardBorderless"], }}>
        {/* //Tab content  */}
        <div style={{ ...styles[this.props.options?.tabType ? this.props.options?.tabType : "colorTab1"] }}> <TabContent app={app} /></div>
        {/* //Main card content  */}
        <div style={{ ...styles[this.props.options?.cardContent ? this.props.options.cardContent : "cardContent"] }}>
          <MainContent app={app} />
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
        <div ref={this.wrapperRef} className="popupCard" style={{ zIndex: "1010", ...styles[this.props.options?.cardType ? this.props.options?.cardType : "biggestCard"] }}>
          <div style={ ///EXIT BUTTON
            styles.buttons.closeicon
          } onClick={this.props.handleClose}>x</div>

          <div className='scroller' style={{ ...styles[this.props.options?.cardContent ? this.props.options.cardContent : "cardContent"] }}>
            <MainContent app={app} />
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

          <div style={{ ...styles[this.props.options?.tabType ? this.props.options?.tabType : "colorTab1"] }}> <TabContent app={app} /> <div style={ ///EXIT BUTTON
            styles.buttons.closeicon
          } onClick={this.props.handleClose}>X</div></div>
          <div className='scroller' style={{ ...styles[this.props.options?.cardContent ? this.props.options.cardContent : "cardContent"] }}>
            <MainContent app={app} />
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
      <div className='scroller' style={{ ...styles[this.props.options?.cardType ? this.props.options?.cardType : "biggestCard"], }}>
        <div style={{ ...styles[this.props.options?.cardContent ? this.props.options.cardContent : "cardContent"] }}>
          <MainContent app={app} />
        </div>
      </div>
    )
  }
}
