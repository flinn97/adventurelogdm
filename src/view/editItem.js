import { Component } from 'react';
import "../App.css"

import ParentFormComponent from '../componentListNPM/componentForms/parentFormComponent';
import Upload from './upload';

import { MapComponent } from '../mapTech/mapComponentInterface';
import Initiative from '../EncounterLibrary/encounterstuff/view/initiativeRoll';
import Name from '../EncounterLibrary/encounterstuff/view/name';
import trash from "../pics/delSkull.png";


export default class EditItem extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }


  render() {
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let styles = state.styles;
    let compendium = state?.currentCampaign;
    const attrKeys = ["attr1", "attr2", "attr3", "attr4", "attr5"];

    return (
      <div>



        <ParentFormComponent checkUser={true} app={app} name="name"
          wrapperStyle={{
            margin: "5px", color: styles.colors.colorWhite, display: "flex", flexDirection: "column",
            marginBottom: "31px", marginTop: "51px"
          }}
          theme={"adventureLog"} rows={1}
          maxLength={app.state.maxLengthShort}
          labelStyle={{ marginBottom: "8px" }}
          placeholder={"Item name..."}
          inputStyle={{
            width: "100%", minWidth: "100%", padding: "4px 9px", color: styles.colors.color3, height: "fit-content",
            borderRadius: "4px", background: styles.colors.colorWhite + "00", borderWidth: "0px", height: "100%",
            border: "solid 1px " + styles.colors.colorWhite + "22",
            textWrap: "wrap", fontSize: styles.fonts.fontSubheader1
          }} />
        {!this.state.completedPic &&
          (<Upload
            checkUser={true}
            //ADD THIS TO ALL UPLOADS//
            changePic={(pic) => { this.setState({ pic: pic }) }}
            obj={app.state.currentComponent} text="Upload Image" style={{
              display: "flex",
              zIndex: "1", borderRadius: ".1vmin", background: "",
            }}
            update={true} skipUpdate={true}
            updateMap={(obj) => {
              this.setState({
                completedPic: obj.getJson().picURL,
                // usage: obj.getJson().usage +1
              })
            }} app={app} />) || (<div style={{ width: "180px", justifyContent: "center", display: "flex", flexDirection: "column", alignItems: "center" }}><img src={this.state.completedPic} style={{ width: "74px", marginLeft: "8px" }} /><div style={{ color: styles.colors.color8, fontSize: "13px", marginLeft: "8px" }}>You can change this later</div></div>)}

        <div style={{ display: "flex", flexDirection: "column", width: "100%", marginTop: "32px" }}>
          {attrKeys.map((attr) => {
            if (compendium?.getJson()[attr])
              return (
                <ParentFormComponent
                  key={attr}
                  app={app}
                  name={`${attr}Value`}
                  label={compendium?.getJson()[attr]}
                  checkUser={true}
                  wrapperStyle={{
                    margin: "5px",
                    color: styles.colors.colorWhite,
                    display: "flex",
                    flexDirection: "column",
                  }}
                  theme={"adventureLog"}
                  rows={1}
                  maxLength={app.state.maxLengthShort}
                  labelStyle={{ marginBottom: "11px", fontSize: "1.4rem", color: styles.colors.color8 }}
                  inputStyle={{
                    width: "83%", marginLeft: "9px",
                    padding: "4px 9px", fontSize: "1.2rem",
                    color: styles.colors.colorWhite,
                    height: "1.7rem",
                    rows: "1",
                    borderRadius: "4px",
                    background: styles.colors.colorWhite + "11",
                    borderWidth: "0px",
                  }}
                />
              ); return null;
          })
          }
        </div>

        {compendium?.getJson().format === "Statblock 5e" &&
        <div style={{display:"flex", flexDirection:"row", width:"83%", marginTop:"24px", backgroundColor:styles.colors.color9+"0a", 
        padding:"12px", borderRadius:"12px", borderBottomLeftRadius:"0", borderBottomRightRadius:"0"}}>
          <ParentFormComponent
                  
                  app={app}
                  name='initiativeBonus'
                  label={"Initiative Bonus"}
                  checkUser={true}
                  wrapperStyle={{
                    margin: "5px",
                    color: styles.colors.colorWhite,
                    display: "flex",
                    flexDirection: "column",
                  }}
                  theme={"adventureLog"}
                  rows={1}
                  maxLength={app.state.maxLengthShort}
                  labelStyle={{ marginBottom: "11px", fontSize: "1.4rem", color: styles.colors.color4 }}
                  inputStyle={{
                    width: "52%", marginLeft: "9px",
                    padding: "4px 9px", fontSize: "1.2rem",
                    color: styles.colors.colorWhite,
                    height: "1.7rem",
                    rows: "1",
                    borderRadius: "4px",
                    background: styles.colors.colorWhite + "11",
                    borderWidth: "0px",
                  }}
                />
                <ParentFormComponent
                  
                  app={app}
                  name='armor'
                  label={"Armor Class"}
                  checkUser={true}
                  wrapperStyle={{
                    margin: "5px",
                    color: styles.colors.colorWhite,
                    display: "flex",
                    flexDirection: "column",
                  }}
                  theme={"adventureLog"}
                  rows={1}
                  maxLength={app.state.maxLengthShort}
                  labelStyle={{ marginBottom: "11px", fontSize: "1.4rem", color: styles.colors.color4 }}
                  inputStyle={{
                    width: "52%", marginLeft: "9px",
                    padding: "4px 9px", fontSize: "1.2rem",
                    color: styles.colors.colorWhite,
                    height: "1.7rem",
                    rows: "1",
                    borderRadius: "4px",
                    background: styles.colors.colorWhite + "11",
                    borderWidth: "0px",
                  }}
                />
                <ParentFormComponent
                  
                  app={app}
                  name='hitPoints'
                  label={"HP"}
                  checkUser={true}
                  wrapperStyle={{
                    margin: "5px",
                    color: styles.colors.colorWhite,
                    display: "flex",
                    flexDirection: "column",
                  }}
                  theme={"adventureLog"}
                  rows={1}
                  maxLength={app.state.maxLengthShort}
                  labelStyle={{ marginBottom: "11px", fontSize: "1.4rem", color: styles.colors.color4 }}
                  inputStyle={{
                    width: "52%", marginLeft: "9px",
                    padding: "4px 9px", fontSize: "1.2rem",
                    color: styles.colors.colorWhite,
                    height: "1.7rem",
                    rows: "1",
                    borderRadius: "4px",
                    background: styles.colors.colorWhite + "11",
                    borderWidth: "0px",
                  }}
                />
                </div>

        }
{compendium?.getJson().format === "Statblock 5e" &&
        <div style={{backgroundColor:styles.colors.color9+"0a", padding:"12px", borderRadius:"12px", width:"83%", borderTopLeftRadius:"0", borderTopRightRadius:"0"}}>
        <ParentFormComponent
                 
                  app={app}
                  name={'statBlockLink'}
                  label={'Link to Statblock'}
                  checkUser={true}
                  wrapperStyle={{
                    margin: "5px",
                    color: styles.colors.colorWhite,
                    display: "flex",
                    flexDirection: "column",
                  }}
                  theme={"adventureLog"}
                  rows={1}
                  maxLength={app.state.maxLengthShort}
                  labelStyle={{ marginBottom: "11px", fontSize: "1.4rem", color: styles.colors.color8 }}
                  inputStyle={{
                    width: "83%", marginLeft: "9px",
                    padding: "4px 9px", fontSize: "1.2rem",
                    color: styles.colors.colorWhite,
                    height: "1.7rem",
                    rows: "1",
                    borderRadius: "4px",
                    background: styles.colors.colorWhite + "11",
                    borderWidth: "0px",
                  }}
                />
        </div>}

        <div style={{ color: styles.colors.color3 + "f5", marginBottom: "26px", marginTop: "42px", fontSize: styles.fonts.fontSmall, }}> Data:

          <ParentFormComponent app={app} name="desc"
            theme={"adventureLog"}
            rows={5} connectLore={false}
            type={"quill"} checkUser={true} onPaste={this.handlePaste}
          /></div> <img src={this.state.completedPic} />






        <div style={{ display: "flex", justifyContent: "center", flexDirection: "row", justifyItems: "center" }}>
          <div style={{ display: "flex", justifyContent: "center", justifyItems: "center", marginTop: "8px", marginLeft: "22px" }}>

          </div>
        </div>


        <div className="hover-btn"
          style={{
            display: "flex", width: "92px", background: "red", borderRadius: '12px',
            alignSelf: "flex-end", bottom: '8px', alignItems: "flex-end", right: "10px",
            position: "absolute", marginTop: "8.24vh", marginBottom: "1vh",
          }}>

          <div style={{
            ...styles.buttons.buttonAdd, border: "",
            width: "100%", backgroundColor: styles.colors.color2 + "99",
          }}

            onClick={() => {
              state.opps.run()
              dispatch({
                popupSwitch: "", currentDelObj: undefined,
                currentComponent: undefined, currentPin: undefined,
                loreType: ""
              });
              state.opps.clearUpdater();

            }}>Save</div>
        </div>
      </div>
    )

  }
}


