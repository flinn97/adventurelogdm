import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import placeholder from '../../pics/dragon.jpg';
import { MapComponent, SearchMapComponent } from '../../mapTech/mapComponentInterface';
import searchPng from '../../pics/search.png';
import CompendiumMonsterItem from '../../EncounterLibrary/encounterstuff/view/compendiumMonsterItem';


export default class CompendiumMonster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      sortTerm: "mysort",
      isGrabbing: false,
      reverse: true,
    }
  }



  render() {
    let obj = this.props.obj;
    let app = this.props.app;
    let state = app.state;
    let styles = state.styles;
    let dispatch = app.dispatch;
    let currentState = app.state;
    let componentList = currentState.componentList;
    let { colors } = this.state;
    let src = app.state.currentComponent?.getJson().picURL ? app.state.currentComponent?.getJson().picURL : placeholder;
    let statblockList = state.statblockList;


    let arrayColors = colors ? Object.values(colors) : "";

    const attrKeys = ["attr1", "attr2", "attr3", "attr4", "attr5"];


    function arraysAreEqual(a, b) {
      if (a.length !== b.length) return false;
      for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
      }
      return true;
    }

    function parseCR(valueRaw) {
      // If it's directly parseable as a number (e.g., "2", "5.5"), use that
      let num = Number(valueRaw);
      if (!Number.isNaN(num)) {
        return num;
      }

      // Otherwise, check if it's of form "x/y" for a fraction
      if (typeof valueRaw === 'string' && valueRaw.includes('/')) {
        let [numStr, denStr] = valueRaw.split('/');
        let numerator = Number(numStr);
        let denominator = Number(denStr);

        if (!Number.isNaN(numerator) && !Number.isNaN(denominator) && denominator !== 0) {
          return numerator / denominator;
        }
      }

      return NaN;
    }

    return (
      <div className='Header-Enc' style={{
        width: "80%", padding: "13px", marginTop: "10px",
        background: colors ? "linear-gradient(-50deg, " + arrayColors[1] + "11, " + arrayColors[2] + "11, " + arrayColors[0] + "11)" : "linear-gradient(-180deg, #0f141c88, #1B1D2422)",
      }}>



        <div className='button Close-Button' onClick={() => (dispatch({ popUpSwitch: "" }))} style={{ alignSelf: "flex-end" }}>X</div>

        <div className="Header-Title" style={{ opacity: "63%", marginTop: "-10px", fontSize: "1.4vw", width: "fit-content", marginBottom: "28px", marginLeft: ".8rem" }}>
          {"My " + state.currentEncounter.getJson().ruleset + " Statblocks"}

          <SearchMapComponent app={app} attribute="componentFilter" imgLeft={searchPng}
            imgLeftStyle={{ width: "1rem", height: "1rem", marginLeft: "4.5rem", marginTop: window.innerWidth > 700 ? ".5rem" : ".32rem", }}
            style={{
              borderRadius: "50px", background: "#ffdead05", width: "32vw", color: "white", border: "1px solid gray",
              height: window.innerWidth > 700 ? "2rem" : "1.7rem",
              fontSize: window.innerWidth > 700 ? "1.2rem" : ".9rem",
              paddingLeft: window.innerWidth > 700 ? "50px" : "52px", paddingRight: "1rem", marginRight: window.innerWidth > 700 ? "29px" : "-20px"
            }}
            onTextChange={(e) => {
              let { name, value } = e.target
              dispatch({ [name]: value })
            }} />
        </div>



        <div style={{ marginBottom: "18px" }}>
          <MapComponent

            type="monsterList" 
            theme="compendiumRow"
            reverse={this.state.reverse} 
            app={app} 
            list={state.statblockList}
            filters={[
              { type: "bool", attribute: "topLevel", search: false },
              {
                type: "textAttributeList", attributeList: ["name", "attr1Value", "attr2Value", "attr3Value", "attr4Value", "attr5Value", "desc"], 
                search: state.componentFilter,
                callBackFilterFunc: (list) => {
                  list = list.sort(function (a, b) {
                    // 1) Parse each value using parseCR
                    let aVal = parseCR(a.getJson()[state.sortText === "A-Z" ? "name" : "attr1Value"]);
                    let bVal = parseCR(b.getJson()[state.sortText === "A-Z" ? "name" : "attr1Value"]);

                    // 2) If both are numbers, compare numerically
                    let bothAreNumbers = !Number.isNaN(aVal) && !Number.isNaN(bVal);
                    if (bothAreNumbers) {
                      // For descending order, do bVal - aVal
                      return bVal - aVal;
                    }

                    // 3) Otherwise, fallback to string comparison of the raw fields
                    let aString = '' + a.getJson()[state.sortText === "A-Z" ? "name" : "attr1Value"];
                    let bString = '' + b.getJson()[state.sortText === "A-Z" ? "name" : "attr1Value"];
                    return bString.localeCompare(aString);
                  });

                  const idArray = list.map(item => item.getJson()._id);
                  if (!state.currentLore && list.length > 0) {
                    let oldIds = state.idArray || [];
                    if (!arraysAreEqual(idArray, oldIds)) {
                      dispatch({ idArray });
                    }
                  }
                  return list;
                }
              }
            ]}
            cells={[
              {
                custom: CompendiumMonsterItem,type: "custom",
              },

            ]}
          />
        </div>
      </div>
    )
  }

}