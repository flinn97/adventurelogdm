import { Component } from "react";
import ParentFormComponent from "../../../componentListNPM/componentForms/parentFormComponent";


export default class MonsterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    }

  }


  render() {
    let app = this.props.app
    let state = app.state
    let dispatch = app.dispatch
    return (
      <div className='Header-Enc' style={{ width: "80%", padding: "13px", marginTop: "10px", background: "linear-gradient(-180deg, #0f141c88, #1B1D2422)", }}>

        <div className='button Close-Button' onClick={() => (dispatch({ popUpSwitch: "" }))} style={{ alignSelf: "flex-end" }}>X</div>
        <div className="Header-Title" style={{ opacity: "43%", marginTop: "-33px", fontSize: "1.4rem", width: "fit-content", marginBottom:"4px" }}>{state.currentEncounter.getJson().ruleset}</div>
        <ParentFormComponent app={app} name="name" label="Creature Name" labelClass="label" class="text-form text-wide" />
        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", width:"60%"}}>
          <ParentFormComponent app={app} name="initiativeBonus" label="Initiative Bonus" labelClass="label" class="text-form text-number" />
          <ParentFormComponent app={app} name="armor" label="Armor Class" labelClass="label" class="text-form text-number" />
          <ParentFormComponent app={app} name="hitPoints" label="HP" labelClass="label" class="text-form text-number" />
        </div>
        <ParentFormComponent app={app} name="statBlockLink" label="Stat Block Link" labelClass="label" class="text-form text-wide" />
        <ParentFormComponent app={app} name="note" label="Notes" labelClass="label" class="text-form text-wide" />
        <div className="label">
          Number to create</div>
        <input className="text-form text-wide" style={{ marginBottom: "21px" }} onChange={(e) => {
          let value = e.target.value;

          this.setState({ value: value })
          // console.log(e)
        }}></input>
        <div className="button Add-New-Creature-Button" title="Add to Encounter" onClick={async () => {

          let json = state.currentComponent.getJson()
          for (let i = 1; i < parseInt(this.state.value); i++) {
            await state.opps.jsonPrepare({ "addparticipant": { ...json, _id: undefined } })
          }
          dispatch({ popUpSwitch: "" });
          state.opps.run()
        }}>Create</div>

      </div>
    )

  }
}
