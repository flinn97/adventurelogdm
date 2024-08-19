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
    async componentDidUpdate(){
        if(this.props.app.state.keepPOrder){
            await this.props.app.dispatch({keepPOrder:false})
            let app = this.props.app;
        let state = app.state;
        let componentList=state.componentList
            let list = componentList.getList("participant");
            for(let obj of list){
              if(obj.getJson().initiative==="" || obj.getJson().initiative===undefined){
                obj.setCompState({initiative:999});
              }
            }
            list = list.sort((a, b) => {
              return parseInt(a.getJson().initiative) - parseInt(b.getJson().initiative); // Both are valid, compare numerically
          }).reverse();
          componentList.setSelectedList("participant", list);
          app.dispatch({})
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