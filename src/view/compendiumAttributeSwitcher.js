import { Component } from 'react';
import "../App.css";
import ParentFormComponent from '../componentListNPM/componentForms/parentFormComponent';

export default class CompendiumAttributeSwitcher extends Component {
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
    let format = this.props.format;


    return (
      <div>

        {/* {     CUSTOM     } */}
        {format === "Custom" &&
          <div style={{ marginBottom: "12px", marginTop: "-18px", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <div style={{ fontSize: "14px", display: "flex", opacity: ".8", width: "100%", position: "absolute", left: "170px", marginTop: "5px" }}>
              (ie. Level, School, Damage, etc)</div>
            <ParentFormComponent
              app={app}
              name="attr1"
              label={`Attributes:`}
              wrapperStyle={{
                margin: "5px",
                color: styles.colors.colorWhite,
                display: "flex",
                flexDirection: "column",
              }}
              theme={"adventureLog"}
              rows={1}
              maxLength={app.state.maxLengthShort}
              placeholder={"Primary Attribute"}
              labelStyle={{ marginBottom: "11px", fontSize: "16px" }}
              inputStyle={{
                maxWidth: "19.8rem",
                width:"100%",
                padding: "4px 9px",
                color: styles.colors.colorBlack,
                height: "1.7rem",
                rows: "1",
                borderRadius: "4px",
                background: styles.colors.colorWhite + "aa",
                borderWidth: "0px",
              }}
            />

            <ParentFormComponent
              app={app}
              name="attr2"
              wrapperStyle={{
                margin: "5px",
                color: styles.colors.colorWhite,
                display: "flex", marginTop: "33px",
                flexDirection: "column",
              }}
              theme={"adventureLog"}
              maxLength={app.state.maxLengthShort}
              placeholder={"Attribute 2"}
              inputStyle={{
                maxWidth: "19.8rem",
                width:"100%",
                padding: "4px 9px",
                color: styles.colors.colorBlack,
                height: "1.7rem",
                rows: "1",
                borderRadius: "4px",
                background: styles.colors.colorWhite + "aa",
                borderWidth: "0px",
              }}
            />

            <ParentFormComponent
              app={app}
              name="attr3"
              wrapperStyle={{
                margin: "5px",
                color: styles.colors.colorWhite,
                display: "flex", marginTop: "33px",
                flexDirection: "column",
              }}
              theme={"adventureLog"}
              maxLength={app.state.maxLengthShort}
              placeholder={"Attribute 3"}
              inputStyle={{
                maxWidth: "19.8rem",
                width:"100%",
                padding: "4px 9px",
                color: styles.colors.colorBlack,
                height: "1.7rem",
                rows: "1",
                borderRadius: "4px",
                background: styles.colors.colorWhite + "aa",
                borderWidth: "0px",
              }}
            />

            <ParentFormComponent
              app={app}
              name="attr4"
              wrapperStyle={{
                margin: "5px",
                color: styles.colors.colorWhite,
                display: "flex", marginTop: "33px",
                flexDirection: "column",
              }}
              theme={"adventureLog"}
              maxLength={app.state.maxLengthShort}
              placeholder={"Attribute 4"}
              inputStyle={{
                maxWidth: "19.8rem",
                width:"100%",
                padding: "4px 9px",
                color: styles.colors.colorBlack,
                height: "1.7rem",
                rows: "1",
                borderRadius: "4px",
                background: styles.colors.colorWhite + "aa",
                borderWidth: "0px",
              }}
            />

            <ParentFormComponent
              app={app}
              name="attr5"
              wrapperStyle={{
                margin: "5px",
                color: styles.colors.colorWhite,
                display: "flex", marginTop: "33px",
                flexDirection: "column",
              }}
              theme={"adventureLog"}
              maxLength={app.state.maxLengthShort}
              placeholder={"Attribute 5"}
              inputStyle={{
                maxWidth: "19.8rem",
                width:"100%",
                padding: "4px 9px",
                color: styles.colors.colorBlack,
                height: "1.7rem",
                rows: "1",
                borderRadius: "4px",
                background: styles.colors.colorWhite + "aa",
                borderWidth: "0px",
              }}
            />

          </div>}




        {/* {     Statblock 5e     } */}
        {format === "Statblock 5e" &&
          <div style={{ marginBottom: "12px", marginTop: "-18px", display: "flex", flexDirection: "row", justifyContent: "space-evenly", 
          pointerEvents: "none" }}>

            <ParentFormComponent
              app={app}
              name="attr1"
              placeholder="CR"
              label={`Preset Attributes:`}
              wrapperStyle={{
                margin: "5px",
                color: styles.colors.colorWhite,
                display: "flex",
                flexDirection: "column",
              }}
              theme={"adventureLog"}
              rows={1}
              labelStyle={{ marginBottom: "11px", fontSize: "16px" }}
              inputStyle={{
                maxWidth: "13.8rem",
                width:"100%",
                padding: "4px 9px",
                color: styles.colors.colorRed,
                height: "1.7rem",
                rows: "1",
                borderRadius: "4px",
                background: styles.colors.colorWhite + "aa",
                borderWidth: "2px",
                borderColor:"#AA4A44"
              }}
              type="text"
              obj={[
                {
                  getJson: () => ({ attr1: "CR" }),
                  setJson: () => { },
                  // getOperationsFactory: () => ({
                  //   cleanPrepareRun: () => { },
                  //   prepareRun: () => { }
                  // })
                }
              ]}
            />

            <ParentFormComponent
              app={app}
              name="attr2"
              placeholder="Size"
              wrapperStyle={{
                margin: "5px",
                color: styles.colors.colorWhite,
                display: "flex", marginTop: "33px",
                flexDirection: "column",
              }}
              theme={"adventureLog"}
              inputStyle={{
                maxWidth: "13.8rem",
                width:"100%",
                padding: "4px 9px",
                color: styles.colors.colorBlack,
                height: "1.7rem",
                rows: "1",
                borderRadius: "4px",
                background: styles.colors.colorWhite + "aa",
                borderWidth: "2px",
                borderColor:"#AA4A44"
              }}
              type="text"
              obj={[
                {
                  getJson: () => ({ attr2: "Size" }),
                  setJson: () => { },
                  // getOperationsFactory: () => ({
                  //   cleanPrepareRun: () => { },
                  //   prepareRun: () => { }
                  // })
                }
              ]}
            />

            <ParentFormComponent
              app={app}
              name="attr3"
              placeholder="Type"
              wrapperStyle={{
                margin: "5px",
                color: styles.colors.colorWhite,
                display: "flex", marginTop: "33px",
                flexDirection: "column",
              }}
              theme={"adventureLog"}
              maxLength={app.state.maxLengthShort}
              inputStyle={{
                maxWidth: "13.8rem",
                width:"100%",
                padding: "4px 9px",
                color: styles.colors.colorBlack,
                height: "1.7rem",
                rows: "1",
                borderRadius: "4px",
                background: styles.colors.colorWhite + "aa",
                borderWidth: "2px",
                borderColor:"#AA4A44"
              }}
              type="text"
              obj={[
                {
                  getJson: () => ({ attr3: "Type" }),
                  setJson: () => { },
                  // getOperationsFactory: () => ({
                  //   cleanPrepareRun: () => { },
                  //   prepareRun: () => { }
                  // })
                }
              ]}
            />

            <ParentFormComponent
              app={app}
              name="attr4"
              placeholder="Alignment"
              wrapperStyle={{
                margin: "5px",
                color: styles.colors.colorWhite,
                display: "flex", marginTop: "33px",
                flexDirection: "column",
              }}
              theme={"adventureLog"}
              maxLength={app.state.maxLengthShort}
              // placeholder={"Attribute 4"}
              inputStyle={{
                maxWidth: "13.8rem",
                width:"100%",
                padding: "4px 9px",
                color: styles.colors.colorBlack,
                height: "1.7rem",
                rows: "1",
                borderRadius: "4px",
                background: styles.colors.colorWhite + "aa",
                borderWidth: "2px",
                borderColor:"#AA4A44"
              }}
              type="text"
              obj={[
                {
                  getJson: () => ({ attr4: "Alignment" }),
                  setJson: () => { },
                  // getOperationsFactory: () => ({
                  //   cleanPrepareRun: () => { },
                  //   prepareRun: () => { }
                  // })
                }
              ]}
            />

            <ParentFormComponent
              app={app}
              name="attr5"
              placeholder="Environment"
              wrapperStyle={{
                margin: "5px",
                color: styles.colors.colorWhite,
                display: "flex", marginTop: "33px",
                flexDirection: "column",
              }}
              theme={"adventureLog"}
              maxLength={app.state.maxLengthShort}
              // placeholder={"Attribute 5"}
              inputStyle={{
                width: "13.8rem",
                padding: "4px 9px",
                color: styles.colors.colorBlack,
                height: "1.7rem",
                rows: "1",
                borderRadius: "4px",
                background: styles.colors.colorWhite + "aa",
                borderWidth: "2px",
                borderColor:"#AA4A44"
              }}
              type="text"
              obj={[
                {
                  getJson: () => ({ attr5: "Environment" }),
                  setJson: () => { },
                  // getOperationsFactory: () => ({
                  //   cleanPrepareRun: () => { },
                  //   prepareRun: () => { }
                  // })
                }
              ]}
            />

          </div>}
      </div>
    )

  }
}


