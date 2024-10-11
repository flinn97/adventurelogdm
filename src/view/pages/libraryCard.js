import React, { Component } from 'react';
import { MapComponent } from '../../mapTech/mapComponentInterface';
import auth from '../../services/auth';
import FilterByTypeComponent from '../sortComponents/filterByTypeComponent';
import q from '../../pics/question.png';
import HelpVideoCardCard from './helpVideoCard';

export default class LibraryCard extends Component {
  constructor(props) {
    super(props);
    this.helpRef = React.createRef();

  }

  scrollTo(ref, behavior) {
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: behavior || "smooth", block: "start" });
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

      card: <Card app={{ ...app, state: { ...app.state, styles: styles } }} options={this.props.options} type={this.props.type} helpRef={this.helpRef}
        scrollTo={this.scrollTo} />,
      cardWithTab: <CardWithTab app={{ ...app, state: { ...app.state, styles: styles } }} options={this.props.options} type={this.props.type} helpRef={this.helpRef}
        scrollTo={this.scrollTo} />,
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
    this.openMPItem = this.openMPItem.bind(this)
    this.helpRef = React.createRef();
    this.state = {
      start: false,
    }
  }


  openMPItem(mpItem) {

    let app = this.props.app
    let state = app.state
    let componentList = state.componentList

    let campaignId = mpItem.getJson().campaignId
    let campaign = componentList.getComponent("campaign", campaignId, "ogRef")
    if (campaign) {
      window.location.href = "./campaign/" + campaign.getJson()._id
    }
  }



  async download(mpItem) {

    let campaign = await auth.firebaseGetter(mpItem.getJson().campaignId, this.props.app.state.componentList, "_id", "campaign", false);

    await campaign[0].setCompState({ mptype: mpItem.getJson().mptype })
    let requestBody = {
      email: this.props.app.state.user.getJson()._id,
      lore: { ...campaign[0].getJson(), }
    };
    requestBody = await JSON.stringify(requestBody)

    // Replace "YOUR_CLOUD_FUNCTION_URL" with the actual URL of your Cloud Function
    const cloudFunctionUrl = "https://convertmarketplaceitem-x5obmgu23q-uc.a.run.app";

    // Make a POST request to the Cloud Function
    fetch(cloudFunctionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: requestBody,
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch(error => {
        console.error('Error:', error);
      });

    let app = this.props.app;
    let dispatch = app.dispatch;
    dispatch({ popupSwitch: "downloadLibrary" })
  }


  async componentDidMount() {

    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    await auth.getMPItems(componentList, state.user.getJson()._id);
    let mpItems = componentList.getList("mpItem");
    mpItems = mpItems.reverse();
    componentList.setSelectedList("mpItem", mpItems)
    this.setState({ start: true })

  }


  render() {
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles = state.styles;

    // let dButton = componentList.getComponents("mpItem");

    return (
      <div style={{
        width: "100%", display: "flex", flexDirection: "column", minHeight: "71vh", minWidth: "71vw",
        padding: "22px",
      }}>
        {/* <div style={{color:styles.colors.color3, width:"800px", textAlign:"center"}}>~ Coming Soon ~ </div> */}



        <div style={{
          width: "fit-content", display: "flex", flexDirection: "column",
          position: "relative", alignSelf: "center", paddingRight: "3vw"
        }}>
          <FilterByTypeComponent app={app} />

          <div style={{ width: "99.9%", background: styles.colors.color8 + "55", height: "2px", }}></div>
        </div>



        {this.state.start &&
          <MapComponent app={app} name="mpItem" theme="defaultRow"
            filters={[
              { type: "text", attribute: "mptype", search: state.filter },
            ]}
            //FIX RESIZING
            cells={[
//obj.mpType==="campaign"?"Download":"View",
              { name:"Download",  class: "DR-hover-shimmer Button-Type2", func: (obj) => { this.download(obj) } },
              { type: "img", class: "Img-Midsize", func: (obj) => { this.openMPItem(obj) } },
              { type: "attribute", name: "publisher", class: "DR-Attribute-Item Publisher", },
              {
                type: "attribute", name: "title", class: "Bold-Title DR-Attribute-Item",
                func: (obj) => { this.openMPItem(obj) }
              },
              { type: "richReader", name: "promotional", class: "DR-Attribute-Item library-text" },

              { name: "Inspect", class: "DR-Attribute-Item Button-Type1 a ", },

            ]} />
        }

        
      <HelpVideoCardCard app={app} title={"Using the Library"} 
      helpText={"This video demonstrates how content from the AVA Marketplace is kept and used in the GMS Library."}
      type="cardWithTab" options={{tabType:"borderlessTab", cardType:""}} 
      videoURL={"https://www.loom.com/embed/1b90682880e446a394c585e1a417764b?sid=b76c817e-7ab0-44b0-9c5a-5723061ec6c0"}/>
        <div ref={this.props.helpRef} />
         
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
      <div style={{
        display: "flex", fontFamily: "serif", color: styles.colors.colorWhite, flexDirection: "row",
        userSelect: "none", verticalAlign: "center", fontWeight: "600",
        fontSize: styles.fonts.fontSubheader1
      }}>
        Library

        <div onClick={() => this.props.scrollTo(this.props.helpRef, "smooth")}
          style={{
            cursor: "help", marginTop: "-7px", display: "flex", flexDirection: "row",
            marginLeft: "15px", height: "18px",
          }}>
          <img src={q} style={{ width: "18px", }} />
          <div style={{ color: styles.colors.color8, fontSize: ".85rem", marginLeft: "8px" }}>How-To</div>

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
      <div style={{ ...styles[this.props.options?.cardType ? this.props.options?.cardType : "biggestCardBorderless"], backgroundColor: styles.colors.color2 + "4e", borderRadius: "1.2vw" }}>
        {/* //Tab content  */}
        <div style={{ ...styles[this.props.options?.tabType ? this.props.options?.tabType : "colorTab1"] }}> <TabContent
          helpRef={this.props.helpRef}
          scrollTo={this.props.scrollTo} app={app} /></div>
        {/* //Main card content  */}
        <div style={{ ...styles[this.props.options?.cardContent ? this.props.options.cardContent : "cardContent"] }}>
          <MainContent app={app}
            helpRef={this.props.helpRef}
            scrollTo={this.props.scrollTo} />
        </div>
      </div>
    )
  }
}

/**Popups */
class Popup extends Component {
  constructor(props) {
    super(props);
    this.helpRef = React.createRef();
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
    this.helpRef = React.createRef();
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