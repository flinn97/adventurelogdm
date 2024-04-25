import React, { useState, useEffect, Component } from "react";
import placeholder from "../../pics/loreFeather.png";
import encSwords from "../../pics/encounterSwords.png";
import imgSquareIco from "../../pics/imgSquareIco.png";
import campaignBook from "../../pics/campaignBook.png";
import mapPin from "../../pics/mapPin.png";
import loreFeather from "../../pics/loreFeather.png";

export default class FilterByTypeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSel: this.props.app.state?.searchState
    };

  }

  componentDidMount() {
    this.setState({ currentSel: this.props.app.state?.searchState })
  }

  render() {
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let styles = state.styles;
    let obj = this.props.obj;
    let list = this.props.list;

    let searchTypes = ["Campaign", "Map", "Lore", "Encounter", "Image",]

    const styling = {
      width: "104px", padding: "11px 4px", margin: "1px", fontSize: "1rem", alignContent: "center", justifyItems: "center",
      cursor: "pointer", borderRadius: "11px",
      justifyContent: "center", display: "flex", flexDirection: "column",
    }

    const typeIcons = {
      Campaign: campaignBook,
      Map: mapPin,
      Lore: loreFeather,
      Encounter: encSwords,
      Image: imgSquareIco,
      
    };

    return (
      <div style={{ width: "fit-content", color: styles.colors.colorWhite + "99", userSelect: "none" }}>



        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", width: "100%", }}>

          {searchTypes.map((type, index) => <div
            index={index} key={index} className="hover-img"
            onClick={() => {
              this.setState({ currentSel: type + "s" })
              dispatch({ searchState: type !== "Lore" ? type + "s" : "Lore", filter: "mp" + type })
            }} style={{
              ...styling,
              background: (type + "s") === this.state.currentSel ? styles.colors.color4 + "30" : "",
              border: (type + "s") === this.state.currentSel ? "2px solid " + styles.colors.color3 + "44" : "2px solid " + styles.colors.color2 + "1e",
            }}>

            <img src={typeIcons[type] || placeholder} alt={"ico"} style={{ width: "fit-content", alignSelf: "center", justifySelf: "center", width: "32px", marginBottom:"6px" }} />
            <div style={{ fontFamily: "inria", fontSize: "1.02rem", color: styles.colors.colorWhite + "e8", width: "fit-content", alignSelf: "center", justifySelf: "center", }}>{type !== "Lore" ? type + "s" : type}
            </div>
          </div>
          )}
        </div>
      </div>
    );
  }
}