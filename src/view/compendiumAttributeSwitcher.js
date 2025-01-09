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
          <div style={{ marginBottom: "12px", marginTop: "-18px", display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
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
                width: "14rem",
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
                width: "13.8rem",
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
                width: "13.8rem",
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
                width: "13.8rem",
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
                width: "13.8rem",
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
          <div style={{ marginBottom: "12px", marginTop: "-18px", display: "flex", flexDirection: "row", justifyContent: "space-evenly", pointerEvents: "none" }}>

            <ParentFormComponent
              app={app}
              name="attr1"
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
                width: "14rem",
                padding: "4px 9px",
                color: styles.colors.colorRed,
                height: "1.7rem",
                rows: "1",
                borderRadius: "4px",
                background: styles.colors.colorWhite + "aa",
                borderWidth: "0px",
              }}
              type="text"
              obj={[
                {
                  getJson: () => ({ attr1: "CR" }),
                  setJson: () => { },
                  getOperationsFactory: () => ({
                    cleanPrepareRun: () => { },
                    prepareRun: () => { }
                  })
                }
              ]}
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
              inputStyle={{
                width: "13.8rem",
                padding: "4px 9px",
                color: styles.colors.colorBlack,
                height: "1.7rem",
                rows: "1",
                borderRadius: "4px",
                background: styles.colors.colorWhite + "aa",
                borderWidth: "0px",
              }}
              type="text"
              obj={[
                {
                  getJson: () => ({ attr2: "Size" }),
                  setJson: () => { },
                  getOperationsFactory: () => ({
                    cleanPrepareRun: () => { },
                    prepareRun: () => { }
                  })
                }
              ]}
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
              inputStyle={{
                width: "13.8rem",
                padding: "4px 9px",
                color: styles.colors.colorBlack,
                height: "1.7rem",
                rows: "1",
                borderRadius: "4px",
                background: styles.colors.colorWhite + "aa",
                borderWidth: "0px",
              }}
              type="text"
              obj={[
                {
                  getJson: () => ({ attr3: "Type" }),
                  setJson: () => { },
                  getOperationsFactory: () => ({
                    cleanPrepareRun: () => { },
                    prepareRun: () => { }
                  })
                }
              ]}
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
                width: "13.8rem",
                padding: "4px 9px",
                color: styles.colors.colorBlack,
                height: "1.7rem",
                rows: "1",
                borderRadius: "4px",
                background: styles.colors.colorWhite + "aa",
                borderWidth: "0px",
              }}
              type="text"
              obj={[
                {
                  getJson: () => ({ attr4: "Alignment" }),
                  setJson: () => { },
                  getOperationsFactory: () => ({
                    cleanPrepareRun: () => { },
                    prepareRun: () => { }
                  })
                }
              ]}
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
                width: "13.8rem",
                padding: "4px 9px",
                color: styles.colors.colorBlack,
                height: "1.7rem",
                rows: "1",
                borderRadius: "4px",
                background: styles.colors.colorWhite + "aa",
                borderWidth: "0px",
              }}
              type="text"
              // Provide an array with one object, whose .getJson() returns { attr1: 'CR' }
              obj={[
                {
                  getJson: () => ({ attr5: "Environment" }),
                  setJson: () => { },
                  getOperationsFactory: () => ({
                    cleanPrepareRun: () => { },
                    prepareRun: () => { }
                  })
                }
              ]}
            />

          </div>}
      </div>
    )

  }
}


