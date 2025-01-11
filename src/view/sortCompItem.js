import React, { Component } from 'react';
import sortLines from '../pics/sortNone.png';

export default class SortCompItem extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }

  }
  componentDidMount() {
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let styles = state.styles;
    if (state.sortText !== this.props.text) {
      dispatch({ sortText: this.props.text })
    }
  }




  render() {
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let styles = state.styles;

    return (<div className="hover-img" title={"Sort by " + this.props.text + " or Alphabetically"}
      onClick={() => {
        let sortText = state.sortText === this.props.text ? this.props.text2 : this.props.text;
        dispatch({ sortText: sortText });
      }}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center", cursor: "pointer",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100px",
          height: "100px",
          color: "white",
          justifyContent: "center",
          alignItems: "center",
          ...this.props.textStyle,
        }}

      >
       Sort: {state.sortText || this.props.text}
      </div>
      {this.props.hasImg &&
        <img
          src={sortLines}
          style={{
            width: "34px", height: "19px",
            transform: !this.props.reverse ? "scaleY(-1)" : "none", ...this.props.imgStyle
          }}
        />}
    </div>
    )
  }
}

