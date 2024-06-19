import { Component } from "react";
import GeneralInfo from "./generalInfo";
import MonsterForm from "./monsterForm";
import MonsterList from "./monsterList";
import RunEncounter from "./runEncounter";


import './encManager.css';

export default class EncounterPage extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            
        }
    }
   
    render() {
        
        let app = this.props.app;
        let state = app.state;
        let styles = state.styles;
        return (
            <div
            style={{display:"flex", alignItems:"center", flexDirection:"column", 
                paddingBottom:"108px", minHeight:"87vh", maxWidth: "100%",
// REMOVE THIS 
background:"#0f141c1c"
            }}>



                <GeneralInfo app={app}/>
                {state.popUpSwitch === "addMonster" && state.currentComponent?.getJson().type==="participant" && <MonsterForm app={app}/>}

                <MonsterList app={app}/>
                <RunEncounter app={app}/>
            </div>
            
            )

    }

}