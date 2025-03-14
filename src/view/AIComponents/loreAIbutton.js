import React, { Component } from "react";

class LoreAIButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSaved: false,
    };
  }

  render() {
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles = state.styles;

    let obj = this.props?.obj;

    return (
      <div
        className="hover-btn"
        style={{
          display: "flex",
          flexDirection: "row",
          justifySelf: "flex-end",
          cursor: this.state.showSaved ? "progress" : "auto",
          width: "fit-content",
          marginRight: this.props.marginRight ? this.props.marginRight : "0px",
        }}
      >
        <div
          style={{
            backgroundColor: styles.colors.color3 + "88",
            height: "fit-content",
            borderRadius: "11px",
            padding: "2px",
            pointerEvents: this.state.showSaved ? "none" : "all",
          }}
        >
          <div
            style={{
              ...styles.buttons.buttonClear,
              transition: "all",
              cursor: "pointer",
              width: "fit-content",
              color: styles.colors.colorWhite,
              padding: "2px 12px",
              fontSize: styles.fonts.fontSmall,
              borderRadius: "11px",
            }}
          >
            {this.props.text ? this.props.text : "Generate Lore"}
          </div>
        </div>
      </div>
    );
  }
}

export default LoreAIButton;
