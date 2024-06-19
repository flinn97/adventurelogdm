import React, { Component } from "react";
import { MapComponent } from "../../../mapTech/mapComponentInterface";
import Condition from "./condition";
import Initiative from "./initiativeRoll";
import ProfilePic from "./profilePic";
import AttributeMap from "./attributeMap";
import Name from "./name";
// import Duplicate from "./duplicate";
import trash from "../pics/delSkull.png";

export default class MonsterList extends Component {
  constructor(props) {
    super(props);


  }
  // 

  render() {
    let app = this.props.app;
    let state = app.state;
   
    return (
      <div style={{ marginTop: "8px", padding:"18px" }}>
        <MapComponent
        // delOptions={{
        //   picURL: trash, warningMessage: "Delete",
        //   textStyle: { fontSize: "1rem" },
          
        // }}
          type="monsterList" theme="encounterRow"
          app={app} name="participant"
          cells={[
            { custom: Initiative, type: "custom" },
            { custom: ProfilePic, type: "custom" },
            { custom: Name, type: "custom" },
            { custom: AttributeMap, type: "custom" },
            { custom: Condition, type: "custom" },
            {imgSrc:trash, style: {
              width: "2rem", height: "2rem", padding: "4px 2px",
              display: "flex", flexDirection: "row",
              alignItems: "center", borderRadius: "8px",
              justifyContent: "center", cursor:"pointer"
            }, type:"delIcon", class:"hover-btn-highlight"}
            // { custom: Duplicate, type: "custom" },
            //  "del"
            // custom component or?
            ]}
          filter={{ search: state.currentEncounter?.getJson()._id, attribute: "encounterId" }} />

      </div>)

  }

}
