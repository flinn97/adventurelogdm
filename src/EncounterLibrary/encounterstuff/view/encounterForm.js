import { Component } from "react";
import ParentFormComponent from "../../../componentListNPM/componentForms/parentFormComponent";
import Upload from "../../../view/upload";


export default class EncounterForm extends Component {
  constructor(props) {
    super(props);


  }


  render() {
    let app = this.props.app;
    return (
      <div style={{ paddingLeft: "11px", width: "100%", display: "flex", flexDirection: "column", transition: "all" }}>
        <div style={{ marginRight: "18%", marginBottom: "-11px", alignSelf: "flex-end" }}>
          <Upload app={app}
            //ADD THIS TO ALL UPLOADS//
            changePic={(pic) => { this.setState({ pic: pic });
             app.state.currentEncounter.setCompState({picURL: pic});
             app.dispatch({})
            }}
            obj={app.state.currentEncounter} text="Set New Backdrop" style={{
              display: "flex",
              zIndex: "1", borderRadius: ".1vmin", background: "",
            }}
            update={true} 
            updateMap={(obj) => { this.setState({ completedPic: obj.getJson().picURL });

          }}
          />
        
        </div>
        <div style={{color:"#ffffff99", marginTop:"35px", marginRight: "19%",alignSelf: "flex-end",marginBottom: "-24px", fontSize:"1rem" }}>
            {"(You will see changes after you save and close)"}
          </div>
        <ParentFormComponent obj={app.state.currentEncounter} app={app} name="name" label="Encounter Name" prepareRun={true} type="text"
          labelClass="label" class="text-form text-wide" />
        <ParentFormComponent obj={app.state.currentEncounter} app={app} name="description" label="Situation Description" prepareRun={true}
          labelClass="label" class="text-form text-wide" />
        <ParentFormComponent obj={app.state.currentEncounter} app={app} name="audioLink" label="Audio Link" prepareRun={true}
          labelClass="label" class="text-form text-wide" />
      </div>)

  }
}
