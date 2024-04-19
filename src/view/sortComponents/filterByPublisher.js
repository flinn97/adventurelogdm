import React, { useState, useEffect, Component } from "react";
import placeholder from "../../pics/loreFeather.png";
import { displayName } from "react-quill";
import userIco from "../../pics/doubleUserIcon.png";


export default class FilterByPublisher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSel: this.props.app.state?.searchState
    };

  }

  render() {
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let styles = state.styles;
    let obj = this.props.obj;
    let list = this.props.list;
  

    return (
      <div className='hover-container' style={{ width: "fit-content", fontSize:"1rem", color: styles.colors.colorWhite + "99", 
      cursor:"pointer", userSelect: "none", textDecoration:"underline", marginBottom:"-13px",
      alignContent:"center", justifySelf:"center", alignSelf:"center" }}>
<img src={userIco} alt={"ava"} className="hover-img" style={{width:"34px",}}/>
    <div className="hover-div" style={{marginTop:"18px"}}>

    
    
    <div className="menu-bubble" style={{ width: "fit-content", flexDirection:"column", display:"flex", marginLeft:"1px"}}>
      listlist
      {/* List of Partners */}
      {/* TAYLOR LIST OF PUBLISHER CHECKBOXES, add to a string, you can have multiple checked and see all checked */}
      <div className="tail" style={{left:11}}></div>
    </div>
    </div>
        
      </div>
    );
  }
}