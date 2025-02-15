import { Component } from "react";
import ParentFormComponent from "../../../componentListNPM/componentForms/parentFormComponent";
import Upload from "../../../view/upload";
import colorService from "../../../services/colorService";
import placeholder from '../../../pics/dragon.jpg';
import ColorThief from 'colorthief';
import auth from '../../../services/auth.js'


export default class MonsterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      picURL: null,
      colors: [],
      showCompendium: true,
    };
    this.colorThief = new ColorThief();
  }

  async componentDidMount() {

    let app = this.props.app;
    let dispatch = app.dispatch
    let state = app.state;

    // Fetch all compendiums
    await auth.getAllofTypeByUser(state.componentList, state.user.getJson()._id, "compendium")


    let allLore = await state.componentList.getList("lore", "Statblock 5e", "itemFormat");

    //firebaseGetter does not allow an array of values
    if (allLore.length === 0) {

      //auth.firebaseGetter(loreId, state.componentList, "_id", "lore", undefined, { attribute: "type", value: "condition" })
      await auth.firebaseGetter("Statblock 5e", state.componentList, "itemFormat", "lore", dispatch);
      allLore = await state.componentList.getList("lore", "Statblock 5e", "itemFormat");
    }

    dispatch({ statblockList: allLore });
  }



  render() {
    let app = this.props.app;
    let state = app.state;
    let dispatch = app.dispatch;
    let obj = this.props.obj;
    let { colors } = this.state;
    let src = app.state.currentComponent?.getJson().picURL ? app.state.currentComponent?.getJson().picURL : placeholder;
    let statblockList = state.statblockList;

    let arrayColors = colors ? Object.values(colors) : "";

    return (
      <div className='Header-Enc' style={{
        width: "80%", padding: "13px", marginTop: "10px",
        background: colors ? "linear-gradient(-50deg, " + arrayColors[1] + "11, " + arrayColors[2] + "11, " + arrayColors[0] + "11)" : "linear-gradient(-180deg, #0f141c88, #1B1D2422)",
      }}>



        <div className='button Close-Button' onClick={async () => {
          dispatch({ popUpSwitch: "", })
          this.setState({showCompendium:false})
        }} 
      style={{ alignSelf: "flex-end" }}>X</div>

        <div className="Header-Title" style={{ opacity: "43%", marginTop: "-33px", fontSize: "1.4rem", width: "fit-content", marginBottom: "18px" }}>{state.currentEncounter.getJson().ruleset}</div>
        
        {((statblockList?.length === 0)||!this.state.showCompendium) && (<>
        
          <div style={{ marginBottom: "14px", display: "flex", flexDirection: "row", alignItems: "center", marginLeft:"1.8vw" }}>
            <div style={{
              borderRadius: "50%", display: "flex", height: "100px",
              width: "100px", marginLeft: "22px", marginRight: "22px",
              justifyContent: "center", alignContent: "center", background: arrayColors[2] ? arrayColors[2] : ""
            }}>
              <img
                src={src}
                style={{
                  borderRadius: "50%", width: "96px", height: "96px", marginTop: "2px",
                  objectFit: "fill", border: arrayColors[1] ? "3px solid " + arrayColors[1] : "3px solid black"
                }}
                alt="Profile"
              />
            </div>


            <Upload
              text={"Choose Image"}
              update={true}
              obj={app.state.currentComponent}
              skipUpdate={true}
              colors={this.state.colors}
              changePic={async (pic) => {
                await this.setState({ picURL: pic });

                colorService.updateColors(pic, (colorObject) => {
                  this.setState({ colors: colorObject }, () => {
                    console.log('Updated colors in state:', this.state.colors); // Debugging line
                    app.state.currentComponent.setCompState({ colors: colorObject });
                  });
                });
              }}
              updateMap={async (obj) => {
                const pic = obj?.getJson().pic;
                await this.setState({ picURL: pic });
                colorService.updateColors(pic, (colorObject) => {
                  this.setState({ colors: colorObject }, () => {
                    console.log('Updated colors in state:', this.state.colors); // Debugging line
                    app.state.currentComponent.setCompState({ colors: colorObject, picURL: pic });
                  });
                });
              }}
              app={app}
            />

          </div>
          <div style={{marginLeft:"1.8vw"}}>
          <ParentFormComponent app={app} name="name" label="Creature Name" labelClass="label" class="text-form text-wide" />
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "60%" }}>
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
            dispatch({ popUpSwitch: "", currentComponent: undefined });
            state.opps.run()
          }}>Create</div></div>
        </>) ||

          (
            <>
              <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
                <div className='button Add-New-Creature-Button' style={{marginBottom:"22px", marginTop:"42px"}}
                onClick={()=>{
                  this.setState({showCompendium:false})
                }}
                >Create from Scratch</div>

                <div className='button Add-New-Creature-Button' style={{marginBottom:"42px"}}
                onClick={()=>{
                  dispatch({popUpSwitch:"addCompendiumMonster"})
                }}
                >Add from Compendium</div>


              </div>
            </>
          )

        }

      </div>
    )

  }
}
