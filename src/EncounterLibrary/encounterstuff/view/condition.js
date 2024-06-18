import { Component } from "react";
import { MapComponent } from "../../../mapTech/mapComponentInterface";
import conditionGear from '../pics/conditionGear.png';

export default class Condition extends Component {
  constructor(props) {
    super(props);


  }


  render() {

    let app = this.props.app;
    let state = app.state;
    let obj = this.props.obj;
    let currentEncounter = state.currentEncounter;
    let componentList = state.componentList;
    let rulesetName = currentEncounter.getJson().ruleset;
    let ruleset = componentList.getComponent("ruleset", rulesetName, "name");
    let conditionList = ruleset.getJson().conditionList.split(",");
    let activeConditionList = ruleset.getJson().conditionList.split(",");

    conditionList = conditionList.map(str => {
      let o = {
        type: "condition",
        name: str,
        component: obj,
        func: (participant) => {
          debugger
          if (participant.getJson()[str] !== undefined && participant.getJson()[str] !== "") {
            participant.setCompState({ [str]: undefined });
          }
          else {
            participant.setCompState({ [str]: 0 });
          }
          state.opps.cleanPrepareRun({ update: participant });
        }
      }

      return {
        name: o.name,
        component: o.component,
        class: ((obj.getJson()[o.name] !== undefined) && (obj.getJson()[o.name] >= 0)) ? "condition-selected" : "condition",
        style: (str === "Dead") ? { color: "#fd5259", opacity: "100%" } : {},
        theme: "encounterRow",
        func: o.func
      };
    });

    activeConditionList = activeConditionList.map(str => {
      let act = {
        type: "condition", name: str, component: obj,
      }
      return {
        name: act.name,
        value: obj.getJson()[act.name],
        component: act.component,
        class: "condition-active",
        theme: "Condition-Column",
      };
    });

    let activeConditions = activeConditionList.filter(act => {
      let participantState = obj.getJson();
      return (participantState[act.name] !== undefined) && (participantState[act.name] !== "") && (participantState[act.name] >= 0);
    }).map(act => {
      return {
        ...act,
        value: obj.getJson()[act.name]
      };
    }).sort((a, b) => b.value - a.value); // Sort by value in descending order

    return (
      <div style={{ display: "flex", flexDirection: "row", height: "160px", width: "35vw" }}>

        <div className="hover-container" style={{ alignContent: "center", height: "155px", }}>
          <img src={conditionGear} className="hover-container condition-gear" alt="Condition Gear Icon" />
          <div className="hover-div" style={{ display: "flex", flexDirection: "row", width: "35vw", marginTop: "57px", }}>
            <MapComponent
              mapSectionClass="Condition-Section"
              mapContainerClass="Condition-Container"
              app={app}
              list={[obj]}
              cells={conditionList}
            />
          </div>

        </div>

        <div className="Condition-Column">
          {activeConditions.map((act, index) => (
            <div title={act.value !== 1 ? act.value + " rounds of " + act.name : act.value + " round of " + act.name}
              key={index} className="condition-active"
              style={{
                color: act.name === "Dead" ? "#fd5259" : ""
              }}
            >
              {act.name} ({act.value})
            </div>
          ))}</div>
      </div>
    )
  }
}
