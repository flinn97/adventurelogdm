import React, { Component, useDebugValue } from 'react';
import { MapComponent } from '../../mapTech/mapComponentInterface';
import auth from '../../services/auth';
import { Link } from 'react-router-dom';
import gear from '../../pics/conditionGear.png';
import AIConvo from './AIConvoMapComponent';


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
export default class AICard extends Component {
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
      content: "",
      messageList: [],
      prevGens: [],
    }
    this.sendMessage = this.sendMessage.bind(this);
  }
  async componentDidMount() {
    if (this.ranonce) {
      return
    }
    this.ranonce = true;
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let opps = state.opps;
    let a;
    if (!state.currentAssistant) {
      //create a new Assistant
      let assistant = await opps.cleanJsonPrepare({ addchatAssistant: { owner: state.user.getJson().owner, type: "chatAssistant" } });
      assistant = assistant.add[0];
      await dispatch({ currentAssistant: assistant })
      
//Creating a chatAssistant list, but we are never deleting old assistants
      a = assistant;
      if (a?.getJson()?._id) {
        await auth.firebaseGetter(a.getJson()._id, componentList, "assistantId", "aiMessage");
        let messages = await componentList.getList("aiMessage", a?.getJson()?._id, "assistantId" );
        this.setState({messageList:messages});
      } else {
        console.error("Error: assistant _id is undefined");
      }
    }

    await componentList.sortSelectedList("aiMessage", "position");

    let assistants = await componentList.getList("chatAssistant", state.user.getJson().owner, "owner" );
    await this.setState({prevGens:assistants.reverse()});
  }


  sendMessage = async (state, dispatch) => {
    if (this.state.content.trim() !== "") {
      let message = this.state.content.trim(); // Store input value before clearing state

      this.setState({ content: "" }, async () => {
        state.opps.run();
        dispatch({ message });

        await state.currentAssistant.chat(message, state.componentList);
      });

      let messages = await state.componentList.getList("aiMessage", state.currentAssistant?.getJson()?._id, "assistantId" );
      this.setState({messageList:messages})
    }
  };



  render() {
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles = state.styles;

    let empty = this.state.content === "";

    return (
      <div style={{
        display: "flex", position: "relative", flexDirection: "column", justifyContent: "flex-end", background: styles.colors.color2,
        padding: "12px 18px", borderRadius: "11px",
        alignContent: "center", width: "85vw", userSelect: "none", marginTop: "-22px", overflow: "hidden"
      }}>

        <Link 
        title='AI Settings'
        className='hover-btn' to={"ruleset/"} style={{
          ...styles.buttons.buttonAdd, right: 11, top: 11, position: "absolute",
          textDecoration: "none", fontStyle: "italic", background: styles.colors.color7 + "aa", display: "flex", flexDirection: "column",
          fontWeight: "bold", letterSpacing: ".05rem", marginBottom: "2vh", padding: "3px 8px", fontSize: "1vw"
        }}>
          <img src={gear} style={{ width: "1.5vw" }} />
        </Link>



        {/* {New Convo} */}
        {state.currentAssistant && <div style={{ userSelect: "text" }}>
          
          <MapComponent app={app} list={this.state.messageList} cells={[
            { custom: AIConvo, type: "custom", class: 'hover-img' },]} />
        </div>}

        {/* SEND COMPONENT */}
        <div style={{ marginLeft: "22px", marginTop: "22px" }}>
          <textarea className='textareafixed'
            value={this.state.content}
            placeholder='Ask your question...'
            style={{
              width: "72vw", borderRadius: "8px", background: styles.colors.color8 + '22',
              color: "white", padding: "3px 8px", marginTop: "11px", marginBottom: "12px",

            }}
            onChange={(e) => {
              this.setState({ content: e.target.value });
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (e.shiftKey) {
                  // Shift+Enter → Adds a new line
                  e.preventDefault();
                  this.setState({ content: this.state.content + "\n" });
                } else {
                  // Enter → Send Message
                  e.preventDefault();
                  this.sendMessage(state, dispatch);
                }
              }
            }}
          ></textarea>

          <div
            className={empty ? "" : 'hover-btn'}
            style={{
              ...styles.buttons.buttonAdd,
              opacity: empty ? "80%" : "",
              mixBlendMode: empty ? "luminosity" : "",
              cursor: empty ? "" : "pointer"
            }}
            onClick={() => this.sendMessage(state, dispatch)}

          >Send</div>
        </div>

        {/* {Old Convos} */}
        {this.state.prevGens && 
      <div style={{ background: styles.colors.color8 + "22", padding: "4px 8px", borderRadius: "11px", marginTop: "42px" }}>
        <div style={{ color: styles.colors.color3, fontSize: "2vw" }}>Previous Generations</div>
           
          <MapComponent app={app} list={this.state.prevGens}
            reverse={true}
            cells={[{
              type: "attribute",
              name: "_id",
              class: "hover-btn-highlight",
              style: {
                color: "white", fontSize: "1vw", padding: "2px", paddingLeft: "22px",
                textDecoration: "1px underline " + styles.colors.color8, textUnderlineOffset: "2px"
              }, func: async (obj) => {

                await dispatch({ currentAssistant: obj });
                await auth.firebaseGetter(obj.getJson()._id, componentList, "assistantId", "aiMessage");
                let messages = await componentList.getList("aiMessage", obj?.getJson()?._id, "assistantId" );
                this.setState({messageList:messages});
                console.log(messages)
                dispatch({})
              }

            }]} /></div>
            }
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
      <div >


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
