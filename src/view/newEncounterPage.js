import React, { Component } from 'react';
import EncounterPage from '../EncounterLibrary/encounterstuff/view/encounterPage';
import toolService from '../services/toolService';
import auth from '../services/auth';
import { mapInterface } from '../mapTech/mapComponentInterface';
import MonsterListWrapper from '../EncounterLibrary/encounterstuff/view/monsterListWrapper';
import "./encounterStuff.css"
import { Link } from 'react-router-dom';
import backarrow from '../pics/backArrow.webp';


export default class NewEncounterPage extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }
  async componentDidMount() {
    
    let app = this.props.app;
    let state = { ...app.state, ...this.state };
    let dispatch = app.dispatch;
    let componentList = state.componentList;
    let id = toolService.getIdFromURL(true, 0);
    let encounter = componentList.getComponent("encounter", id);

    if (!encounter) {
      encounter = await auth.firebaseGetter(id, componentList, "_id", "encounter", false);
      encounter = encounter[0]
    }

    if (!state.currentCampaign) {
      let campaign = componentList.getComponent("campaign", encounter.getJson().campaignId, "_id");
      await dispatch({ currentCampaign: campaign });
      auth.firebaseGetter(campaign.getJson()._id, componentList, "campaignId", "lore");

    }
    await auth.firebaseGetter(id, componentList, "encounterId", "participant");
    let monsterList = await auth.firebaseGetter(id, componentList, "encounterId", "monster");
    for (let obj of monsterList) {
      obj.setCompState({ type: "participant" });
    }
    
    let pList = componentList.getList("participant");
    pList=[...pList, ...monsterList];
            for(let obj of pList){
              if(obj.getJson().initiative==="" || obj.getJson().initiative===undefined){
                obj.setCompState({initiative:999});
              }
            }
            pList = pList.sort((a, b) => {
              return parseInt(a.getJson().initiative) - parseInt(b.getJson().initiative); // Both are valid, compare numerically
          }).reverse();
    await componentList.setSelectedList("participant", pList);
    await mapInterface.getFactory().registerComponent("monsterList",MonsterListWrapper)

    await dispatch({ currentEncounter: encounter });
    this.setState({start:true})
  }




  render() {
    
    let app = this.props.app;
    let state = app.state;
    app.state=state;
    let dispatch = app.dispatch;
    let componentList = state.componentList;
    let styles = state.styles;

    let id = toolService.getIdFromURL(true, 0);
    let encounter = componentList?.getComponent("encounter", id);

    let campaign = encounter?.getJson()?.campaignId;



    return (
      <div style={{ height: "100%",maxWidth: "100%", }}>
        <Link className="hover-btn-highlight"
                to={"/campaign/"+campaign}
                style={{
                  ...styles.buttons.buttonAdd, textDecoration: "none", fontStyle: "italic", background: "", padding: "8px 8px",
                  color: styles.colors.color3 + "e6", boxShadow: "", fontSize: ".95rem",
                  fontWeight: "bold", letterSpacing: ".05rem", marginBottom: "10px", border: ""
                }}
              >
                <img style={{ width: ".9rem", opacity: "98%", marginRight: "8px" }}
                  src={backarrow}
                />
                Back
              </Link>

        {this.state.start &&
          <EncounterPage app={{...app}} />
        }
      </div>

    )
  }
}

