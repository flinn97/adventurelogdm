import { Component } from "react";
import ParentFormComponent from "../../../componentListNPM/componentForms/parentFormComponent";
import colorService from "../../../services/colorService";
import PlainDisplay from "../../../mapTech/plainDisplay";

export default class CompendiumMonsterItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parent: undefined,
      colors: [],
      value: 0,
    }

  }



  render() {
    let app = this.props.app;
    let obj = this.props.obj;

    let state = app.state;
    let dispatch = app.dispatch;
    let styles = state.styles;
    let compList = state.componentList;

    let campaign = compList?.getComponent("compendium", obj.getJson().campaignId, "_id");

    const jsonData = obj.getJson();
    const jsonKeys = Object.keys(jsonData);
    const titleMappings = {
      name: "Name",
      armor: "AC",
      hitPoints: "HP",
      initiativeBonus: "Initiative Bonus",
      attr1Value: campaign?.getJson().attr1,
      attr2Value: campaign?.getJson().attr2,
      attr3Value: campaign?.getJson().attr3,
      attr4Value: campaign?.getJson().attr4,
      attr5Value: campaign?.getJson().attr5,
    };

    const title = jsonKeys
      .filter(key => titleMappings[key]) // Only include mapped keys
      .map(key => `${titleMappings[key]}:  ${jsonData[key]}`) // Map to formatted string
      .join("\n"); // Join into a newline-separated string


    return (
      // <div style={{display:"flex", flexDirection:"column"}}>
        <div title={title} style={{
          color: styles.colors.colorWhite,
          cursor: "pointer",
          height: "fit-content", width: "100%"
        }}

          onClick={async () => {
            const pic = obj?.getJson().pic;
            await this.setState({ picURL: pic });
            colorService.updateColors(pic, (colorObject) => {
              this.setState({ colors: colorObject }, () => {
                console.log('Updated colors in state:', this.state.colors); // Debugging line
                app.state.currentComponent.setCompState({ colors: colorObject, picURL: pic });
              });
            });
            await state.currentComponent.setCompState({ ...obj.getJson(), _id: undefined, type: "participant" })

            let json = state.currentComponent.getJson()
            // maybe add "value" amounts later
            for (let i = 1; i < parseInt(this.state.value); i++) {
              await state.opps.jsonPrepare({ "addparticipant": { ...json, _id: undefined, type: "participant" } })
            }
            dispatch({ popUpSwitch: "", currentComponent: undefined });
            state.opps.run()
          }}

        >
          <div style={{
            display: "flex", flexDirection: 'row',

            justifyContent: "space-evenly",
            zIndex: "0",

            backgroundImage: 'url(' + (obj?.getJson().picURL || campaign?.getJson().picURL) + ')',
            ...styles.backgroundContent,
            marginTop: "", width: "100%"
          }}>

            <div style={{
              ...styles.popupSmall, display: "flex", flexDirection: "row", justifyContent: "center", flexDirection: 'column',

              height: "fit-content", minWidth: "100%",
              width: "fit-content"
            }}>

              <div

                style={{
                  display: "flex", height: "fit-content", width: "fit-content", fontWeight: "bold", fontFamily: "serif", width: "fit-content",

                  textShadow: "1px 1px 0 " + styles.colors.colorBlack, textShadow: "-1px -1px 0 " + styles.colors.colorBlack,
                  textAlign: "center", justifyItems: "center", justifySelf: "center", padding: "4px 8px",
                  alignSelf: "center", margin: "-4px", color: "white",
                  alignItems: "center", justifyContent: "center", fontSize: '1.4rem',
                }}>
                {obj?.getJson().name} 
                
                <div style={{position:"absolute", right:8, top:5, fontSize:".95rem", color:styles.colors.color3}}>{campaign?.getJson().attr1} {obj?.getJson().attr1Value}</div>

              </div>

              <div style={{ backgroundColor: styles.colors.colorBlack + "44", width: "80px", height: "22px", filter: "blur(8px)", position: "absolute", alignSelf: "center" }}></div>
            </div>
          </div>

        {/* </div> */}
        {/* <div className="label">
          #:</div> */}
        {/* <input className="text-form text-wide" 
        placeholder="How many to add?"
        style={{ marginBottom: "21px" }} onChange={(e) => {
          let value = e.target.value;
          this.setState({ value: value })
          // console.log(e)
        }}></input> */}
      </div>
    )
  }
}
