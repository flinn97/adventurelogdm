import React, { Component } from 'react';

export default class HelpVideoCardCard extends Component {
  constructor(props) {
    super(props);

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
        scrollTo={this.scrollTo} video={this.props.videoURL} title={this.props.title} helpText={this.props.helpText}/>,
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
      start: false,
    }
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
        padding: "22px", color: styles.colors.color8,
      }}>
        {this.props.helpText}
        <div style={{
          marginTop: "14px",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          flexDirection: "row",
          width: "100%",
          background: `linear-gradient(to left, #00000000, ${styles.colors.colorBlack}, #00000000)`,
        }}>
          {/* <iframe style={{borderRadius:"10px"}}
            width="840px" 
            height="472.5px"
            src="https://www.loom.com/share/1b90682880e446a394c585e1a417764b?sid=6f92aefb-18cf-4064-8f89-51e90a122ec3"
            
          >
          </iframe> */}
          {window.innerWidth > 800 &&
          (<iframe 
          width="1008px" 
            height="567px"
          src={this.props.video} 
          frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>)
          ||
          (<iframe 
          width="504px" 
            height="283.5px"
          src={this.props.video}  
          frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>)
          }

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
      <div style={{
        display: "flex", fontFamily: "serif", color: styles.colors.colorWhite, flexDirection: "row",
        userSelect: "none", verticalAlign: "center",
        fontSize: "1.4rem"
      }}>
        {this.props.title}
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

    console.log(this.props.video)
    return (
      //Whole card content
      <div style={{ ...styles[this.props.options?.cardType ? this.props.options?.cardType : "biggestCardBorderless"], backgroundColor: styles.colors.color2 + "4e", borderRadius: "1.2vw" }}>
        {/* //Tab content  */}
        <div style={{ ...styles[this.props.options?.tabType ? this.props.options?.tabType : "colorTab1"], marginTop: "48px" }}><hr></hr> <TabContent
          helpRef={this.props.helpRef} title={this.props.title} helpText={this.props.helpText}
          scrollTo={this.props.scrollTo} app={app} /></div>
        {/* //Main card content  */}
        <div style={{ ...styles[this.props.options?.cardContent ? this.props.options.cardContent : "cardContent"] }}>
          <MainContent app={app} video={this.props.video} title={this.props.title} helpText={this.props.helpText}
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
    this.wrapperRef = React.createRef();
    this.setWrapperRef = this.setWrapperRef;

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

    console.log(this.props.app)

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
