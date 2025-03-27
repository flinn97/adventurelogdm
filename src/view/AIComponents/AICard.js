import React, { Component, useDebugValue } from "react";
import { MapComponent } from "../../mapTech/mapComponentInterface";
import auth from "../../services/auth";
import { Link } from "react-router-dom";
import gear from "../../pics/conditionGear.png";
import AIConvo from "./AIConvoMapComponent";
import history from "../../pics/historyGear.png";
import cancel from "../../pics/iconXWhite.png";

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
      if (
        Object.prototype.toString.call(this.props.theme) === "[object String]"
      ) {
        styles = state.themeFactory.getThemeFactory()[this.props.theme];
      } else {
        styles = this.props.theme;
      }
    }
    app.state.styles = styles;

    //********CARD ASSIGN********/

    let cards = {
      card: (
        <Card
          app={{ ...app, state: { ...app.state, styles: styles } }}
          options={this.props.options}
          type={this.props.type}
        />
      ),
      cardWithTab: (
        <CardWithTab
          app={{ ...app, state: { ...app.state, styles: styles } }}
          options={this.props.options}
          type={this.props.type}
        />
      ),
      popup: (
        <Popup
          app={{ ...app, state: { ...app.state, styles: styles } }}
          handleClose={this.props.handleClose}
          options={this.props.options}
          type={this.props.type}
        />
      ),
      popupWithTab: (
        <PopupWithTab
          app={{ ...app, state: { ...app.state, styles: styles } }}
          handleClose={this.props.handleClose}
          options={this.props.options}
          type={this.props.type}
        />
      ),
      //popupType={this.props.popupType} popupTab={this.props.popupTab}
    };

    //*********CARD ASSIGN********/

    return <div>{cards[this.props.type ? this.props.type : "card"]}</div>;
  }
}

//********CONTENTS********/
class MainContent extends Component {
  constructor(props) {
    super(props);
    this.startRef = React.createRef();
    this.startRef2 = React.createRef();
    this.state = {
      content: "",
      messageList: [],
      prevGens: [],
      showHistory: false,
    };
    this.sendMessage = this.sendMessage.bind(this);
    this.scrollTo = this.scrollTo.bind(this);
  }

  scrollTo = (ref, behavior) => {
    if (ref?.current) {
      ref?.current?.scrollIntoView({
        behavior: behavior || "smooth",
        block: "start",
      });
    }
  };

  async componentDidMount() {
    if (this.ranonce) {
      return;
    }
    this.ranonce = true;
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let opps = state.opps;
    let a;

    if (!state.currentAssistant) {
      // Create a new Assistant
      let assistant = await opps.cleanJsonPrepare({
        addchatAssistant: {
          owner: state.user.getJson().owner,
          type: "chatAssistant",
        },
      });
      assistant = assistant.add[0];
      await dispatch({ currentAssistant: assistant });

      // Fetch previous messages
      a = assistant;
      if (a?.getJson()?._id) {
        await auth.firebaseGetter(
          a.getJson()._id,
          componentList,
          "assistantId",
          "aiMessage"
        );
        let messages = await componentList.getList(
          "aiMessage",
          a.getJson()._id,
          "assistantId"
        );

        // Debugging check
        if (!messages || messages.length === 0) {
          console.warn("No messages found on mount.");
        }

        this.setState({ messageList: messages });
      } else {
        console.error("Error: assistant _id is undefined");
      }
    }

    // Ensure sorted messages are displayed
    await componentList.sortSelectedList("aiMessage", "position");

    let assistants = await componentList.getList(
      "chatAssistant",
      state.user.getJson().owner,
      "owner"
    );
    this.setState({ prevGens: assistants.reverse() });
  }

  sendMessage = async (state, dispatch) => {
    if (this.state.content.trim() !== "") {
      let message = this.state.content.trim();
      let assistantId = state.currentAssistant?.getJson()?._id;

      if (!assistantId) {
        console.error("Error: Assistant ID is undefined.");
        return;
      }

      let newUserMessage = {
        role: "user",
        content: message,
        assistantId: assistantId,
        type: "aiMessage",
        position: this.state.messageList.length + 1,
        visible: true,
        getJson: function () {
          return this;
        }, // Ensures getJson() method exists
      };

      let thinkingMessage = {
        role: "assistant",
        content: "Thinking... give me a minute.",
        assistantId: assistantId,
        type: "aiMessage",
        position: this.state.messageList.length + 2,
        visible: true,
        getJson: function () {
          return this;
        }, // Ensures getJson() method exists
      };

      this.setState(
        (prevState) => ({
          content: "",
          messageList: [...prevState.messageList, newUserMessage],
        }),
        async () => {
          this.setState((prevState) => ({
            messageList: [...prevState.messageList, thinkingMessage],
          }));

          if (!this.props._id) {
            await state.currentAssistant.chat(message, state.componentList);
          } else {
            await state.currentAssistant.chat(message, state.componentList, {
              campaignId: this.props._id,
            });
          }

          let messages = await state.componentList.getList(
            "aiMessage",
            assistantId,
            "assistantId"
          );
          let visibleMessages = messages.filter(
            (msg) => msg.getJson().visible !== false
          );

          this.setState({ messageList: visibleMessages }, () => {
            console.log("Updated messageList:", this.state.messageList);
          });
        }
      );
    }
  };

  render() {
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles = state.styles;

    let empty = this.state.content === "";
    let chatHistory = this.state.prevGens.filter(
      (item) =>
        item._id !==
        (this.state.currentAssistant
          ? this.state.currentAssistant.getJson()._id
          : null)
    );

    let messagesInThisChat = this.state.messageList.length;

    return (
      <> {state.sideBarType!=="ai" &&
        (<div
          ref={this.startRef}
          style={{
            display: "flex",
            position: "relative",
            flexDirection: "column",
            justifyContent: "flex-end",
            background: styles.colors.color2,
            padding: "12px 18px",
            borderRadius: "11px",
            alignContent: "center",
            width: "85vw",
            userSelect: "none",
            marginTop: "-22px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: "fit-content",
              transition: "all .8s ease",
              right: 11,
              top: 11,
              position: "absolute",
              display: "flex",
              flexDirection: "row",
              gap: "11px",
              marginBottom: "2vh",
            }}
          >
            {chatHistory.length > 0 && (
              <div
                onClick={() =>
                  this.setState({ showHistory: !this.state.showHistory })
                }
                title="AI History"
                className="hover-btn"
                to={"ruleset/"}
                style={{
                  ...styles.buttons.buttonAdd,
                  textDecoration: "none",
                  fontStyle: "italic",
                  display: "flex",
                  flexDirection: "column",
                  fontWeight: "bold",
                  letterSpacing: ".05rem",
                  padding: this.state.showHistory ? "3px .8vw" : "3px 8px",
                  fontSize: "1vw",
                  transition: "all .8s ease",
                  border: this.state.showHistory
                    ? "1px solid rgb(192, 189, 11)"
                    : styles.buttons.buttonAdd.border,
                  background: this.state.showHistory
                    ? styles.colors.color8 + "22"
                    : styles.colors.color7 + "aa",
                }}
              >
                <img
                  src={history}
                  draggable={false}
                  style={{
                    transition: "all .8s ease",
                    width: this.state.showHistory ? "0px" : "1.5vw",
                    opacity: this.state.showHistory ? "0" : "1",
                  }}
                />
                <img
                  src={cancel}
                  draggable={false}
                  style={{
                    transition: "all .8s ease",
                    width: this.state.showHistory ? "1.5vw" : "0px",
                    opacity: this.state.showHistory ? "1" : "0",
                  }}
                />
              </div>
            )}

            <Link
              draggable={false}
              title="AI Settings"
              className="hover-btn"
              to={"ruleset/"}
              style={{
                ...styles.buttons.buttonAdd,
                textDecoration: "none",
                fontStyle: "italic",
                background: styles.colors.color7 + "aa",
                display: "flex",
                flexDirection: "column",
                fontWeight: "bold",
                letterSpacing: ".05rem",
                padding: this.state.showHistory ? "" : "3px 8px",
                fontSize: "1vw",
                transition: "all .8s ease",
                opacity: this.state.showHistory ? "0" : "1",
                pointerEvents: this.state.showHistory ? "none" : "",
              }}
            >
              <img
                draggable={false}
                src={gear}
                style={{
                  width: this.state.showHistory ? "5px" : "1.5vw",
                  opacity: this.state.showHistory ? "0" : "1",
                  transition: "all .8s ease",
                }}
              />
            </Link>
          </div>

          {/* {Old Convos} */}
          {chatHistory.length > 0 && (
            <div
              style={{
                width: "81.5vw",
                height: this.state.showHistory ? "" : "0px",
                transition: "all .8s ease",
                overflow: "hidden",
                marginLeft: "22px",
                marginRight: "22px",
                background: styles.colors.color8 + "22",
                padding: this.state.showHistory ? "24px 28px" : "",
                borderRadius: "11px",
                marginTop: this.state.showHistory ? "-1px" : "40px",
                pointerEvents: this.state.showHistory ? "" : "none",
              }}
            >
              <div style={{ display: "flex", flexDirection: "row" }}>
                <img
                  draggable={false}
                  src={history}
                  style={{
                    width: this.state.showHistory ? "1.33vw" : "1vw",
                    height: "1.33vw",
                    transition: "all .8s ease",
                    marginRight: "29px",
                  }}
                />
                <div
                  style={{
                    color: styles.colors.color3,
                    fontSize: this.state.showHistory ? "1.33vw" : "1vw",
                    transition: "all .8s ease",
                  }}
                >
                  Previous Generations
                </div>
              </div>

              <MapComponent
                app={app}
                list={chatHistory}
                reverse={true}
                cells={[
                  {
                    type: "attribute",
                    name: "name",
                    class: "hover-text-highlight-blue",
                    style: {
                      opacity: this.state.showHistory ? "1" : "0",
                      transition: "opacity .3s ease-in",
                      color: "white",
                      fontSize: "1vw",
                      paddingLeft: "22px",
                      overflow: "hidden",
                      marginLeft: "22px",
                      textDecoration: "1px underline " + styles.colors.color8,
                      textUnderlineOffset: "2px",
                      maxHeight: "1vw",
                    },
                    func: async (obj) => {
                      await dispatch({ currentAssistant: obj });
                      await auth.firebaseGetter(
                        obj.getJson()._id,
                        componentList,
                        "assistantId",
                        "aiMessage"
                      );
                      let messages = await componentList.getList(
                        "aiMessage",
                        obj?.getJson()?._id,
                        "assistantId"
                      );

                      await this.setState({ messageList: messages });
                      await dispatch({});
                    },
                  },
                  {
                    //  Taylor
                    // I forget how we use these mapComponents to update UI, the button works but UI doesnt change
                    type: "delIcon",
                    title: "Delete this conversation",
                    style: {
                      cursor: "pointer",
                      filter: "brightness(88%)",
                      width: "31px",
                      marginLeft: "2vh",
                      marginBottom: "-4px",
                      padding: "1px 4px",
                    },
                    class: "hover-btn-highlight",
                  },
                ]}
              />
            </div>
          )}

          {/* {New Convo} */}
          {state.currentAssistant && (
            <div style={{ userSelect: "text" }}>
              <MapComponent
                app={app}
                list={this.state.messageList}
                cells={[
                  { custom: AIConvo, type: "custom", class: "hover-img" },
                ]}
              />
            </div>
          )}

          {/* SEND COMPONENT */}
          <div style={{ marginLeft: "22px", marginTop: "2px" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: "4vh",
                marginBottom: "12px",
                justifyContent: "space-between",
                paddingRight: "2vw",
              }}
            >
              <textarea
                className="textareafixed"
                value={this.state.content}
                placeholder={
                  messagesInThisChat > 0
                    ? "Continue conversation..."
                    : "Start a new conversation..."
                }
                style={{
                  width: "72vw",
                  borderRadius: "8px",
                  background: styles.colors.color8 + "22",
                  color: "white",
                  padding: "3px 8px",
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
              {this.state.messageList.length >= 9 && (
                <div
                  className="hover-img"
                  style={{
                    ...styles.buttons.buttonAdd,
                    cursor: "pointer",
                    paddingLeft: "8px",
                    paddingRight: "8px",
                    alignSelf: "end",
                    justifySelf: "flex-end",
                    marginTop: "4vh",
                    fontSize: "1vw",
                  }}
                  onClick={() => this.scrollTo(this.startRef, "smooth")}
                >
                  Back to Top
                </div>
              )}
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div
                className={empty ? "" : "hover-btn"}
                style={{
                  ...styles.buttons.buttonAdd,
                  opacity: empty ? "80%" : "",
                  mixBlendMode: empty ? "luminosity" : "",
                  cursor: empty ? "" : "pointer",
                }}
                onClick={() => this.sendMessage(state, dispatch)}
              >
                Send
              </div>
            </div>
          </div>
        </div>)
        ||
        // SIDEBAR
        (
          <div
          style={{
            display: "flex",
            position: "relative",
            flexDirection: "column",
            justifyContent: "flex-end",
            background: styles.colors.color2+"11",
            padding: "1px 1px",
            borderRadius: "11px",
            alignContent: "center",
            width: "100%",
            userSelect: "none",
            marginTop: "-12px",
            overflowX: "hidden",
            maxHeight:"80vh",
            minHeight:"20vh",
            paddingBottom:"12px",
            overflowY: "auto",
          }}
        >

          {/* {New Convo} */}
          {state.currentAssistant && (
            <div style={{ userSelect: "text", overflowY: "scroll", maxHeight:"60vh", height:"fit-content", }}>
              <MapComponent
                app={app}
                list={this.state.messageList}
                cells={[
                  { custom: AIConvo, type: "custom", class: "hover-img" },
                ]}
              />
            </div>
          )}

          {/* SEND COMPONENT */}
          <div style={{ marginLeft: "22px", marginTop: "2px" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: "3.2vh",
                marginBottom: "12px",
              }}
            >
              <textarea
                className="textareafixed"
                value={this.state.content}
                placeholder={
                  messagesInThisChat > 0
                    ? "Continue conversation..."
                    : "Start a new conversation..."
                }
                style={{
                  width: "72vw",
                  borderRadius: "8px",
                  background: styles.colors.color8 + "22",
                  color: "white",
                  padding: "3px 8px",
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
              
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div
                className={empty ? "" : "hover-btn"}
                style={{
                  ...styles.buttons.buttonAdd,
                  opacity: empty ? "80%" : "",
                  mixBlendMode: empty ? "luminosity" : "",
                  cursor: empty ? "" : "pointer",
                }}
                onClick={() => this.sendMessage(state, dispatch)}
              >
                Send
              </div>
            </div>
          </div>
        </div>
        )}
      </>
    );
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
    let addCampaign = state.popUpSwitchcase === "addCampaign";
    let updateCampaign = state.popUpSwitchcase != "addCampaign";

    return <div></div>;
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
      <div
        style={{
          ...styles[
            this.props.options?.cardType
              ? this.props.options?.cardType
              : "biggestCardBorderless"
          ],
          backgroundColor: styles.colors.color2 + "1e",
          borderRadius: "1.2vw",
        }}
      >
        {/* //Tab content  */}
        <div
          style={{
            ...styles[
              this.props.options?.tabType
                ? this.props.options?.tabType
                : "colorTab1"
            ],
          }}
        >
          {" "}
          <TabContent app={app} />
        </div>
        {/* //Main card content  */}
        <div
          style={{
            ...styles[
              this.props.options?.cardContent
                ? this.props.options.cardContent
                : "cardContent"
            ],
          }}
        >
          <MainContent app={app} />
        </div>
      </div>
    );
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
    document.addEventListener("mousedown", this.handleClickOutside);
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
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
        <div
          ref={this.wrapperRef}
          className="popupCard"
          style={{
            zIndex: "1010",
            ...styles[
              this.props.options?.cardType
                ? this.props.options?.cardType
                : "biggestCard"
            ],
          }}
        >
          <div
            style={
              ///EXIT BUTTON
              styles.buttons.closeicon
            }
            onClick={this.props.handleClose}
          >
            x
          </div>

          <div
            className="scroller"
            style={{
              ...styles[
                this.props.options?.cardContent
                  ? this.props.options.cardContent
                  : "cardContent"
              ],
            }}
          >
            <MainContent app={app} />
          </div>
        </div>
      </div>
    );
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
    document.addEventListener("mousedown", this.handleClickOutside);
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
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
        <div
          ref={this.wrapperRef}
          className="popupCard"
          style={{
            zIndex: "1010",
            ...styles[
              this.props.options?.cardType
                ? this.props.options?.cardType
                : "biggestCard"
            ],
          }}
        >
          <div
            style={{
              ...styles[
                this.props.options?.tabType
                  ? this.props.options?.tabType
                  : "colorTab1"
              ],
            }}
          >
            {" "}
            <TabContent app={app} />{" "}
            <div
              style={
                ///EXIT BUTTON
                styles.buttons.closeicon
              }
              onClick={this.props.handleClose}
            >
              X
            </div>
          </div>
          <div
            className="scroller"
            style={{
              ...styles[
                this.props.options?.cardContent
                  ? this.props.options.cardContent
                  : "cardContent"
              ],
            }}
          >
            <MainContent app={app} />
          </div>
        </div>
      </div>
    );
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
      <div
        className="scroller"
        style={{
          ...styles[
            this.props.options?.cardType
              ? this.props.options?.cardType
              : "biggestCard"
          ],
        }}
      >
        <div
          style={{
            ...styles[
              this.props.options?.cardContent
                ? this.props.options.cardContent
                : "cardContent"
            ],
          }}
        >
          <MainContent app={app} />
        </div>
      </div>
    );
  }
}
