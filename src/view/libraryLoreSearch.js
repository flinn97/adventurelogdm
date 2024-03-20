import React, { Component } from 'react';

import LoreItemWithNotation from './loreItemwithNotation';
import toolService from '../services/toolService';
import auth from '../services/auth';

export default class LibraryLoreSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loreToShow: 48,
    };
  }

  async componentDidMount() {
    let app = { ...this.props.app };
    let dispatch = app.dispatch;
    let state = app.state;
    let lore = await auth.getAllofTypeByUser(state.componentList, state.user.getJson()._id, "lore");
    if (lore) {
      dispatch({})
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
    let campId = toolService.getIdFromURL(true, 0);

    let searchTerm = this.props.search?.toLowerCase() || "";

    let lore = componentList.getList("lore");

    let filteredLore = lore
    .filter(obj => {
      // Ensure obj.getJson() is defined and then perform checks
      const json = obj.getJson();
      const name = json?.name?.toLowerCase() || ""; // Default to an empty string if name is undefined
      return json.topLevel === false && json.reference === false && name.includes(searchTerm) && json.campaignId !== campId;
    })
    .filter(obj => {
      let l = state.currentLore || state.currentCampaign;
      if (l.getJson().parentId) {
        return !Object.keys(l.getJson().parentId).includes(obj.getJson()._id);
      }
      return true;
    })
    .sort((a, b) => {
      const nameA = a.getJson()?.name?.toLowerCase() || "";
      const nameB = b.getJson()?.name?.toLowerCase() || "";
      return nameA.localeCompare(nameB);
    })
    .slice(0, this.state.loreToShow);

    return (
      <div style={{ width: "100%", minHeight: "200px", maxHeight: "fit-content", marginTop: "90px", }}>
        <div
          style={{
            display: "flex", flexDirection: "row", width: "100%",
            alignContent: "center", justifyContent: "center",
            margin: "8px", height: "fit-content", flexWrap: "wrap"
          }}

        >

          {
            filteredLore.filter(obj => obj.getJson().topLevel === false).filter(obj => obj.getJson().reference === false)
              .filter((obj) => {
                let l = state.currentLore;
                if (!l) {
                  l = state.currentCampaign
                }
                if (l.getJson().parentId) {
                  return !Object.keys(l.getJson().parentId).includes(obj.getJson()._id)
                }
                else {
                  return true
                }

              })
              .slice(0, this.state.loreToShow)
              .map((item, index) => (
                <div key={index}>
                  {(item.getJson().name !== "" && item.getJson().name !== undefined && item.getJson().campaignId !== campId) &&

                    <div className="hover-img" key={index}
                      onClick={async () => {

                       
                        //TAYLOR what do we want to do here? Copy lore or Connect Existing??
                        //will this edit the library if we connect here? should we copy the lore instead?
                        // we can pull in a lore but we need the MAPS, ENCOUNTERS, and other  connected LORE pulled in as well.

                      }}
                      style={{ cursor: "pointer", }}>

                      <LoreItemWithNotation app={app} obj={item} index={index} />

                    </div>
                  }
                </div>
              ))
          }
          {
            filteredLore.filter(obj => obj.getJson().topLevel === false).filter(obj => obj.getJson().reference === false).length > this.state.loreToShow &&
            <div className="hover-btn-highlight"
              onClick={() =>
                this.setState(prevState => ({ loreToShow: prevState.loreToShow + (filteredLore.length - this.state.loreToShow) }))}
              style={{
                maxHeight: "210px", cursor: "pointer", textAlign: "center", padding: "8px",
                minWidth: "808px", display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: styles.fonts.fontSmall, borderRadius: "20px", marginBottom: "3vh",
                color: styles.colors.colorWhite, border: "1px" + styles.colors.color3 + "f2 solid",
              }}>
              <div
                style={{ display: "flex", position: "relative", }}>

                Show {filteredLore.filter(obj => obj.getJson().topLevel === false).filter(obj => obj.getJson().reference === false).length - this.state.loreToShow} more

              </div>
              <div style={{
                display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center',
              }}>

              </div>
            </div>
          }
        </div>

      </div >

    )
  }
}

