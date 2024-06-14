import React, { useState, useEffect, Component } from "react";
import placeholder from "../../pics/animateSplash.png";
import encSwords from "../../pics/encounterSwords.png";
import encSwords2 from "../../pics/encounterSwords2.png";
import imgSquareIco from "../../pics/imgSquareIco.png";
import imgSquareIco2 from "../../pics/imgSquareIco2.png";
import campaignBook from "../../pics/campaignBook.png";
import campaignBook2 from "../../pics/campaignBook2.png";
import mapPin from "../../pics/mapPin.png";
import mapPin2 from "../../pics/mapPin2.png";
import loreFeather from "../../pics/loreFeather.png";
import loreFeather2 from "../../pics/loreFeather2.png";

export default class FilterByTypeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSel: undefined
    };

  }

  componentDidMount() {
    this.setState({ currentSel: undefined })
  }

  render() {
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let styles = state.styles;
    let obj = this.props.obj;
    let list = this.props.list;

    let searchTypes = ["Campaign", "Map", "Lore", "Encounter", "Artwork",]
    let searchValues=["mpCampaign", "mpMap", "mpLore", "mpEncounter", "mpImage",]

    const styling = {
      width: "104px", padding: "11px 4px", margin: "2px", fontSize: ".94rem", alignContent: "center", justifyItems: "center",
      cursor: "pointer", borderRadius: "11px", 
      justifyContent: "center", display: "flex", flexDirection: "column",
    }

    const typeIcons = {
      Campaign: campaignBook,
      Map: mapPin,
      Lore: loreFeather,
      Encounter: encSwords,
      Artwork: imgSquareIco,
      
    };

    const typeIcons2 = {
      Campaign: campaignBook2,
      Map: mapPin2,
      Lore: loreFeather2,
      Encounter: encSwords2,
      Artwork: imgSquareIco2,
      
    };

    return (
      <div style={{ width: "fit-content", color: styles.colors.colorWhite + "99", userSelect: "none" }}>



        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", width: "100%", }}>

          {searchTypes.map((type, index) => <div
            index={index} key={index} className="hover-img"
            onClick={() => {
              this.setState({ currentSel: type + "s" })
              dispatch({ searchState: type !== "Lore" ? type + "s" : "Lore", filter:searchValues[index] })
            }} style={{
              ...styling, 
              background: (type + "s") === this.state.currentSel ? styles.colors.color4 + "30" : "", 
              border: (type + "s") === this.state.currentSel ? "2px solid " + styles.colors.color3 + "44" : "2px solid " + styles.colors.color2 + "1e",
            }}>

            <img src={(type + "s") === this.state.currentSel ?typeIcons2[type]:typeIcons[type] || placeholder} alt={"ico"} style={{ width: "fit-content", alignSelf: "center", justifySelf: "center", width: "32px", marginBottom:"6px" }} />
            <div style={{ fontFamily: "inria", fontSize: ".98rem", color: styles.colors.colorWhite + "e8", width: "fit-content", alignSelf: "center", justifySelf: "center", }}>{type !== "Lore" ? type + "s" : type}
            </div>
          </div>
          )}
          <div
            className="hover-img"
            onClick={() => {
              this.setState({ currentSel: undefined })
              dispatch({ searchState: "", filter:"" })
            }} style={{
              ...styling,
              background: this.state.currentSel === undefined ? styles.colors.color4 + "30" : "",
              border: this.state.currentSel === undefined ? "2px solid " + styles.colors.color3 + "44" : "2px solid " + styles.colors.color2 + "1e",
            }}>

            <img className={this.state.currentSel === undefined ?"vault-door-handle-fast":"vault-door-handle-stop"} src={placeholder} alt={"ico"} style={{ width: "fit-content", alignSelf: "center", justifySelf: "center", width: "32px", marginBottom:"6px" }} />
            <div style={{ fontFamily: "inria", fontSize: ".98rem", color: styles.colors.colorWhite + "e8", width: "fit-content", alignSelf: "center", justifySelf: "center", }}>All
            </div>
          </div>
        </div>
        
      </div>
    );
  }
}