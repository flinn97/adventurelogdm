import React, { useState, useEffect, Component } from "react";
import placeholder from "../../pics/loreFeather.png";
import ParentFormComponent from "../../componentListNPM/componentForms/parentFormComponent";


export default class FilterByTimePopularity extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

  }

  render() {
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let styles = state.styles;
    let obj = this.props.obj;
    let list = this.props.list;

    const cStyle = { width: "20px", height: "20px" };

    return (
      <div className='hover-container' style={{
        width: "fit-content", color: styles.colors.colorWhite + "99", userSelect: "none", textUnderlineOffset: "3px",
        textDecoration: "underline", cursor: "pointer", fontSize:"1rem",marginBottom:"-13px", marginLeft:"29px",
        alignContent: "center", justifySelf: "center", alignSelf: "center"
      }}>
        Display Order
        <div
          className="hover-div" 
          style={{ marginTop: "10px" }}>



          <div className="menu-bubble" style={{ width: "230px", flexDirection: "column", display: "flex", textDecoration:"none"  }}>

            <div style={{ display: "flex", flexDirection: "row", justifyContent:"left", alignItems:"center"}}>
              <ParentFormComponent app={app} type="checkbox" label={"Sort by Most Popular"} labelStyle={cStyle} />
              <div>Sort by Most Popular</div>
            </div>
            <div style={{ display: "flex", flexDirection: "row",justifyContent:"left", alignItems:"center" }}>
              <ParentFormComponent app={app} type="checkbox" label={"Sort by Newest"} labelStyle={cStyle} />
              <div>Sort by Newest</div>
            </div>
            <div style={{ display: "flex", flexDirection: "row",justifyContent:"left", alignItems:"center" }}>
              <ParentFormComponent app={app} type="checkbox" label={"Sort by Oldest"} labelStyle={cStyle} />
              <div>Sort by Oldest</div>
            </div>

            <div className="tail" style={{ left: 44 }}></div>
          </div>
        </div>

      </div>
    );
  }
}