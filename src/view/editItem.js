import { Component } from 'react';
import "../App.css"

import ParentFormComponent from '../componentListNPM/componentForms/parentFormComponent';
import Upload from './upload';

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
    

    return (
      <div>
        
        <ParentFormComponent checkUser={true} app={app} name="name"
          wrapperStyle={{
            margin: "5px", color: styles.colors.colorWhite, display: "flex", flexDirection: "column",
            marginBottom: "31px",  marginTop:"51px"
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
          {/* Taylor lets get this upload and tags working alan wants a full search and sort function on this. Sort by alphabetical etc, */}
{/* <Upload app={app} text="Upload image"/> */}
        <div style={{ color: styles.colors.color3 + "f5", marginBottom: "26px", marginTop: "42px", fontSize: styles.fonts.fontSmall, }}> Data:

          <ParentFormComponent app={app} name="desc"
            theme={"adventureLog"}
            rows={5} linkLore={true}

            type={"quill"} checkUser={true} onPaste={this.handlePaste} connectLore={true}
          /></div>


<div style={{ display: "flex", justifyContent: "center", flexDirection: "row", justifyItems: "center" }}>
                        <div style={{ display: "flex", justifyContent: "center", justifyItems: "center", marginTop: "8px", marginLeft: "22px" }}>

                          {/* <Upload checkUser={true} text="+ Upload"
                            updateMap={async () => {
                              let lore = state.currentComponent;
                              let check;
                              if (state.currentPin) {
                                //
                                let pin = state.currentPin;

                                if (lore.getJson().name === "" || lore.getJson().name === undefined) {
                                  lore.setCompState({ name: pin.getJson().name });
                                }


                                pin.setCompState({
                                  loreId: lore.getJson()._id,
                                  name: lore.getJson().name,
                                });

                                let reg = state.opps.getUpdater("add");
                                check = componentList.getComponent("lore", lore.getJson()._id, "_id");

                                await state.opps.cleanPrepare({ [check ? "update" : "addlore"]: lore });

                                await state.opps.prepareRun({ update: pin });
                              } else {

                                check = componentList.getComponent("lore", lore.getJson()._id, "_id");

                                await state.opps.cleanPrepareRun({ [check ? "update" : "addlore"]: lore });
                              }

                              if (lore) {
                                //
                                let parentId = Object.keys(lore.getJson().parentId,)[0];
                                let otherChildren = state.componentList.getList("lore", parentId, "parentId");
                                if (!check) {
                                  await loreIndexService.insertAtBeginning(lore, otherChildren);

                                }
                              }
                              if (check) {
                                let L1 = lore;
                                let referenceList = state.componentList.getList("lore", L1.getJson()._id, "ogId");
                                referenceList = referenceList.map(obj => obj.getJson()._id);
                                let pinList = state.componentList.getList("pin");
                                pinList = pinList.filter(pin => referenceList.includes(pin.getJson().loreId));
                                for (let p of pinList) {
                                  p.setCompState({ name: L1.getJson().name })
                                }
                                state.opps.cleanPrepareRun({ update: [L1, ...pinList] })
                              }



                              this.setState({ showSaved: true });
                              setTimeout(() => this.setState({ showSaved: false }), 2000);  // hide after 2.6 seconds
                              this.setState({ saveClicked: true })
                            }}
                            prepareOnChange={{
                              name: "image", json: {
                                loreId: state.currentComponent.getJson()._id,
                                campaignId: id
                              }
                            }}


                            obj={state.currentComponent}
                            update={true} skipUpdate={true}

                            app={app}
                            className="indent-on-click"

                          /> */}

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


