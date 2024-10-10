import React, { Component } from 'react';
import AddCampaign from '../AddCampaign';
import MapComponent from '../../componentListNPM/mapTech/mapComponent';
import placeholder from '../../pics/placeholderCampaign.JPG';
import CampaignMapItem from '../campaignMapItem';
import HelpVideoCardCard from './helpVideoCard';
import { Link } from 'react-router-dom';

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
export default class CampaignCard extends Component {
  constructor(props) {
    super(props);


  }

  /**
   * 
   * OPTIONS
   */


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
  }
  render() {
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles = state.styles;


    return (
      <div style={{
        display: "flex", position: "relative", flexDirection: "column", justifyContent: "flex-end",
        alignContent: "center", width: "100%", userSelect: "none", marginTop: "-22px", overflow: "hidden"
      }}>


        <div style={{ minHeight: window.innerWidth > 800 ? "400px" : "100px", }}>
          <MapComponent app={app} name={"campaign"} cells={[{ custom: CampaignMapItem, props: { app: app } },]}
            filter={{ search: "campaign", attribute: "type" }}
            filterFunc={(obj) => {

              if (obj.getJson().owner !== state.user.getJson().owner) {
                return false;
              }
              let returnVal = obj.getJson().mptype;
              if (!returnVal) {
                return true;
              }
              if (returnVal === "") {
                return true;
              }
              if (returnVal === "mpCampaign") {
                return true;
              }

              return false

            }}
            theme={"selectByImage"}
          //Sort by last clicked?
          />
        </div>
        {state.user.getJson().role !== "GM" &&
          <div style={{display:"flex", flexDirection:"column"}}>
            <div style={{ background: styles.colors.colorBlack, borderRadius: "11px", padding: "11px", fontFamily: "inria", 
              fontSize: "1.15rem", width:"fit-content", justifySelf:"center", alignSelf:"center", padding:"12px 6vw", border:"5px double "+styles.colors.color8+22}}>
              To create and edit your Campaigns:
              <div style={{
                color: styles.colors.color9, fontWeight: "200", marginLeft:"22px",
                textDecoration: "underline", cursor: "pointer", fontSize: "1.2rem", marginTop: "11px", marginBottom:"11px",
              }} onClick={()=>{
                window.open('https://buy.stripe.com/3csdTd12T5LB2Ck7ss', '_blank');
             }}>
              Go Premium
              </div>
              With a Premium Account you can:
              <div style={{marginLeft:"14px", display:"flex", flexDirection:"column", marginTop:"22px", fontSize:"17px", color:styles.colors.color8}}>
                <div>- Create, edit, and rearrange Lore</div>
                <div>- Upload and manage images and Maps</div>
                <div>- Customize and manipulate mapped Lore-Points</div>
                <div>- Create and customize Encounters</div>
                </div>
            </div>
            <div style={{ minWidth: "80vw" }}>
              {/* <Link to={"https://marketplace.arcanevaultassembly.com"} style={{
                  ...styles.buttons.buttonAdd, alignSelf: "flex-end", paddingLeft: "11px", paddingRight: "11px", marginTop: "8px", height: "29px",
                  fontWeight: "200", fontSize: styles.fonts.fontBody, width: "fit-content",
                }}>

                  Find a Campaign
                </Link> */}
              <HelpVideoCardCard app={app}
                type="cardWithTab" options={{ tabType: "borderlessTab", cardType: "" }}
                helpText={"This video demonstrates how to add a campaign from the marketplace while you have a free account."}
                videoURL={"https://www.loom.com/embed/6ac65717cbc6456c980a4525459e1654?sid=a8fa45d1-66e5-4d16-a808-8e1380b53c2a"}
                title={"Free Accounts — Adding Campaigns"}
              />

            </div>
          </div>}
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
    let addCampaign = (state.popUpSwitchcase === "addCampaign");
    let updateCampaign = (state.popUpSwitchcase != "addCampaign");

    return (
      <div style={{
        display: "flex", justifyContent: "space-between", fontFamily: "serif", color: styles.colors.colorWhite, flexDirection: "column",
        userSelect: "none", verticalAlign: "center", fontWeight: "600", marginTop: "0px", minWidth: window.innerWidth > 800 ? "710px" : "100%",
        fontSize: styles.fonts.fontSubheader1
      }}>
        Current Campaigns
        <div>
          {updateCampaign && state.user.getJson().role === "GM" &&
            <div style={{
              ...styles.buttons.buttonAdd, alignSelf: "flex-end", paddingLeft: "11px", paddingRight: "11px", marginTop: "8px", height: "29px",
              fontWeight: "200", fontSize: styles.fonts.fontBody, width: "fit-content",
            }}
              onClick={() => {
                //                  add > campaign          clear it > prepare not run           switchcase
                if (state.user.getJson().role !== "GM") {
                  dispatch({ popupSwitch: "goPremium" });
                  return
                }
                dispatch({ operate: "addcampaign", operation: "cleanJsonPrepare", object: { owner: state.user.getJson()._id }, popUpSwitchcase: "addCampaign" })

              }}>
              + New Campaign</div>
          }





          {(state.currentComponent?.getJson().type === "campaign" && addCampaign) && <AddCampaign app={app} />}
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
      //Whole card content
      <div style={{ ...styles[this.props.options?.cardType ? this.props.options?.cardType : "biggestCardBorderless"], backgroundColor: styles.colors.color2 + "1e", borderRadius: "1.2vw" }}>
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
        <div ref={this.wrapperRef} className="popupCard"
          style={{ zIndex: "1010", ...styles[this.props.options?.cardType ? this.props.options?.cardType : "biggestCard"] }}>

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
      <div className='scroller' style={{ ...styles[this.props.options?.cardType ? this.props.options?.cardType : "biggestCard"] }}>
        <div style={{ ...styles[this.props.options?.cardContent ? this.props.options.cardContent : "cardContent"] }}>
          <MainContent app={app} />
        </div>
      </div>
    )
  }
}
