import React, { Component } from "react";

import ListTree from "../listTree";
import AISideBar from "../AIComponents/AISideBar.js";

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
export default class LoreListCard extends Component {
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
    return <div>{cards[this.props.type ? this.props.type : "card"]}</div>;
  }
}

//********CONTENTS********/
class MainContent extends Component {
  constructor(props) {
    super(props);
    this.getCampId = this.getCampId.bind(this);
    this.state = {
      isVisible: this.props.isVisible ? this.props.isVisible : true,
    };
  }

  getCampId() {
    let href = window.location.href;
    let splitURL = href.split("/");
    let id = splitURL[splitURL.length - 1];
    return id;
  }


  toggleSidebar(type){
    this.props.app.dispatch({       
      sideBarType: type })
  };

  render() {
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles = state.styles;

    let type = state.sideBarType;
    let isVisible = state.isSideBarVisible;
    let expand = state.widthLoreBar ? state.widthLoreBar : "";
    let addW = expand.length * 10;
    let w = addW + 290;
    let width = (type === "loreTree") ? w.toString() + "px" : "45vw"; // Default to 45vw for AISideBar
    let minW = (type === "loreTree") ? "490px" : "45.2vw";

    return (
      <div
        style={{
          display: "flex",
          position: "relative",
          flexDirection: "row",
          height: "fit-content",
          maxHeight: "fit-content",
          alignContent: "left",
          userSelect: "none",
          color: styles.colors.colorWhite,
          overflowX: "hidden",
          overflowY: "hidden",
          transition: "all .45s ease-out",
          background: styles.colors.color1,
          marginTop: !isVisible ? "-3vh" : "",
        }}
      >
        <div style={{position:"absolute", gap:".5vw", width:"fit-content",
        // background:"#ffdead",
          display:"flex", flexDirection:"row"}}>
          <div
            onClick={()=>{this.toggleSidebar("ai")}}
            className="hover-btn"
            style={{
              ...styles.buttons.buttonAdd,
              padding: "8px",
              background: type === "ai" ? styles.colors.color8+"55" : "transparent",
            }}
          >
            Lore AI
          </div>

          <div
            className="hover-btn"
            onClick={()=>{this.toggleSidebar("loreTree")}}
            style={{
              ...styles.buttons.buttonAdd,
              padding: "8px",
              background: type === "loreTree" ? styles.colors.color8+"55" : "transparent",
            }}
          >
            Lore Tree
          </div>
        </div>

        <div
          style={{
            minWidth: isVisible ? minW : "0",
            maxWidth: minW,
            width: isVisible ? width : "0",
            transition:
              "width .45s ease-out, min-width .45s ease-out, max-width .45s ease-out, opacity .45s ease-out", // Specify properties
            overflowY: isVisible ? "" : "hidden",
            opacity: isVisible ? "1" : ".028",
            overflowX: "hidden",
            display: "flex",
            flexDirection: "row",
            marginTop: "5.9vh",
            height: "fit-content",
            position: "relative",
          }}
        >
          {type === "ai" && (
            <AISideBar _id={state.currentCampaign?.getJson()._id} app={app} />
          )}
          {type === "loreTree" && (
            <ListTree
              style={{}}
              app={app}
              name={"lore"}
              _id={state.currentCampaign?.getJson()._id}
              count={0}
              attribute={"parentId"}
            />
          )}
        </div>
      </div>
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
        className=""
        style={{
          ...styles[
            this.props.options?.cardType
              ? this.props.options?.cardType
              : "biggestCard"
          ],
          marginLeft: "-2vh",
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
