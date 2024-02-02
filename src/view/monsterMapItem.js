import React, { Component } from 'react';
import "../App.css"
import Roll from './Roll';
import TokenImage from './tokenImage';
import bookCursor from '../pics/bookmarklet.png';
import ParentFormComponent from '../componentListNPM/componentForms/parentFormComponent';
import ac from '../pics/ac.png';
// import d20 from '../pics/d20.png';
import conditionGear from '../pics/conditionGear.png';
import _ from 'lodash';
import diceService from '../services/diceService';
import conditionService from '../services/conditionService';
import idService from '../componentListNPM/idService';

export default class MonsterMapItem extends Component {
  constructor(props) {
    super(props);
    this.Ref = React.createRef();
    this.scrollTo = this.scrollTo.bind(this);
    this.roundUpdated = false;
    this.state = {
      obj: undefined,
      pic: undefined,
      runEncounter: undefined,
      encounterId: undefined,
      showConditions: true

    };
  }

  scrollTo = (ref, behavior) => {
    if (ref?.current) {
      ref?.current?.scrollIntoView({ behavior: behavior || "smooth", block: "start" });
    }
  }


  convertToLink = (statBlockLink) => {

    if (statBlockLink && !statBlockLink.startsWith('http')) {
      return 'https://' + statBlockLink;
    }
    return statBlockLink;
  }

  async componentDidMount() {
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let obj = this.props.obj;
    if (obj.getJson().hp) {
      let hp = obj.getJson().hp;
      // Check if hp contains the letter 'd' followed by a number and only appears once
      const diceNotationRegex = /^\d*d\d+(\+\d+)?$/;
      if (diceNotationRegex.test(hp)) {
        hp = "/r " + hp;
        let newHp = await diceService.rollDice(hp);
        await obj.setCompState({ hp: newHp });
        this.props.app.state.opps.run();
      }

    }
    const conList = state.componentList.getList("condition", this.props.obj.getJson()._id, "monsterId").sort((reverse = false) => (a, b) => {
      const orderA = parseInt(a.getJson().order, 10);
      const orderB = parseInt(b.getJson().order, 10);
      return reverse ? orderB - orderA : orderA - orderB;
    });
    let conListNames = conList.map(item => item.getJson().name);
    let conditionNames = conditionService.getConditions().map(item => item.name);
    let missingConditions = conditionNames.filter(condition => !conListNames.includes(condition));

    let conditions = conditionService.getConditions().filter(item => missingConditions.includes(item.name));

      for (let condition of conditions) {
        condition = { ...condition };
        condition.monsterId = this.props.obj.getJson()._id;
        condition.roundsActive = "0";
        condition.campaignId = this.props.obj.getJson().campaignId;
        condition._id = this.props.obj.getJson()._id + "c" + idService.createId();
        await state.opps.jsonPrepare({ addcondition: condition });
        await state.opps.run();

      let componentList = this.props.app.state.componentList;
        await componentList.sortSelectedList("monster", "lastInit", true);
    }

  }

  // componentDidUpdate(){
  //   let lastInitAsNumber = parseFloat(this.props.obj.getJson().lastInit);
  //    let currentTurn = this.props.obj.getJson()?.currentTurn;
  //    if (lastInitAsNumber = currentTurn){
  //   this.scrollTo(this.Ref,"smooth");}
  // }

  handleClickWord = (word, iValue) => {
    // Hide conditions temporarily
    this.setState({ showConditions: false });
    // Get the full list of conditions related to this monster
    const conditionList = this.props.app.state.componentList.getList("condition", this.props.obj.getJson()._id, "monsterId");
    // Ensure it's an array before filtering
    const activeConList = Array.isArray(conditionList)
      ? conditionList.filter(cond => cond.getJson().isActive === true)
      : [];
    // Find the condition object that matches the clicked word
    const targetCondition = conditionList.find(cond => cond.getJson().name === word);
    const targetActiveCondition = activeConList.find(cond => cond.getJson().name === word);
    // Toggle its isActive state if found
    if (targetCondition) {
      let conditionJson = targetCondition.getJson();
      conditionJson.isActive = !conditionJson.isActive;
      targetCondition.setCompState(conditionJson.isActive);
      this.props.app.dispatch({
        operate: "update", operation: "cleanPrepareRun", object: targetCondition
      })
    }


    if (targetActiveCondition) {
      let conditionJson = targetActiveCondition.getJson();
      conditionJson.roundsActive = "0"
      // let currentR = parseInt(conditionJson.roundsActive, 10);
      // let newR = currentR + parseInt(iValue)
      // conditionJson.roundsActive =  iValue.toString();

      ///TAYLOR 
      // WHY DOES THIS NOT SET A NEW CONDITION ON AN ACTIVE MONSTER to 1???


      targetCondition.setCompState(conditionJson.roundsActive);
      this.props.app.dispatch({
        operate: "update", operation: "cleanPrepareRun", object: targetActiveCondition
      })
    }


    // Show conditions again and trigger a re-render
    this.setState({ showConditions: true });
    // this.props.app.dispatch({
    //   // operate:"update", operation:"jsonPrepareRun", object:targetCondition
    // });
  };


  render() {

    let app = this.props.app;
    // let dispatch = app.dispatch;
    let state = app.state;
    let length = app.state.maxLengthShort;
    let styles = state.styles;

    let obj = this.props.obj;

    let allColors = obj.getJson().colors;
    let colors = Object.values(allColors); // ["#000000", "#ffffff", "#44fead"]



    let stat = this.convertToLink(obj?.getJson().statBlockLink);
    let name = obj?.getJson().name;
    let x = name.length;
    let fontSizePx;

    if (x <= 18) {
      fontSizePx = 16;
    }
    else if (x >= length) {
      fontSizePx = 11;
    }
    else {
      fontSizePx = 16 + (x - 18) * ((11 - 16) / (length - 18));
    }
    let fontSizeRem = fontSizePx / 16;
    let fontSizeRemSm = fontSizePx / 19;
    let fontSizeRemTiny = fontSizePx / 22;
    let fontSize = [fontSizeRem + "rem", fontSizeRemSm + "rem", fontSizeRemTiny + "rem"]

    const lastInitAsNumber = parseFloat(this.props.obj.getJson().lastInit);
    // const roundCount = this.state.roundCount;

    const currentTurn = this.props.obj.getJson()?.currentTurn;

    let borderGradient = currentTurn === lastInitAsNumber ?
      `solid 1px ${colors[5]}66` : "";

    const otherWord = (

      <ParentFormComponent
        obj={this.props.obj}
        isPropArray={true} name="conditions"
        // prepareRun={true} 

        maxLength={22}
        placeholder={"Add your own"}

        inputStyle={{
          width: "250px",
          color: styles.colors.colorWhite,
          fontSize: styles.fonts.fontSmallest,
          borderRadius: "4px", paddingBottom: "3px", paddingTop: "3px", paddingLeft: "4px",
          background: styles.colors.colorWhite + "0e",
          borderWidth: "1px",

          textAlign: "flex-start",
          justifyContent: "center",
        }}
        wrapperStyle={{ justifyContent: "center", marginTop: "-8px" }}
        app={app} />);

    //DEAD LAST 
    //hahaha
    const createSortConditions = (reverse = false) => (a, b) => {
      const orderA = parseInt(a.getJson().order, 10);
      const orderB = parseInt(b.getJson().order, 10);
      return reverse ? orderB - orderA : orderA - orderB;
    };

    // Using the factory function
    const sortConditions = createSortConditions();
    const sortConditionsOpp = createSortConditions(true);

    // Your original code
    const conList = state.componentList.getList("condition", this.props.obj.getJson()._id, "monsterId").sort(sortConditions);
    let conListNames = Array.from(new Set(conList.map(item => item.getJson().name)));

    const activeConList = Array.isArray(conList)
      ? conList.filter(cond => cond.getJson().isActive === true).sort(sortConditionsOpp)
      : [];

    const maxCon = conList.length === "" ? 13 : 12;
    const iValue = (currentTurn == lastInitAsNumber ? "1" : "0");
    return (

      <div title={obj?.getJson().notes} style={{
        minWidth: "100%", overflow: "visible", border: "1px solid " + styles.colors.color8 + "1e",
        position: "relative", borderRadius: "22px", height: "128px",
        alignSelf: "flex-start", justifySelf: "flex-start",
      }}>

        <div className={currentTurn == lastInitAsNumber ? "gradient-animation" : ""} ref={currentTurn == lastInitAsNumber ? this.startRef : ""}
          style={{
            minWidth: "100%", borderRadius: "22px",
            height: "128px",
          }}>

          <div
            // to={"/encounter/" + obj?.getJson()._id} 
            style={{
              color: styles.colors.colorWhite,
              textDecoration: "none", userSelect: "none",
              height: "fit-content", overflow: "visible",
            }}
          >

            <div style={{
              display: "flex", flexDirection: 'column',
              borderRadius: styles.popupSmall.borderRadius,
              border: "", verticalAlign: "center",
              justifyContent: "center", position: "absolute",
              zIndex: "0",
              height: "128px",
              width: 'fit-content',
              ...styles.backgroundContent,
            }}>
              <div

                style={{
                  ...styles.popupSmall, display: "flex", flexDirection: "row", justifyContent: "space-evenly",
                  height: "fit-content", border: "", marginTop: "-8px", height: "128px",
                  background: currentTurn === lastInitAsNumber ? "linear-gradient(90deg, " + styles.colors.color2 + "55, #45526e27, #282c3400)" : "",
                  width: "fit-content",
                }}>



                <div title="Roll Initiative" style={{
                  display: "flex", height: "fit-content", fontWeight: "bold", fontFamily: "serif",
                  textShadow: "1px 1px 0 " + styles.colors.colorBlack,
                  width: "fit-content", alignSelf: "center", marginRight: "11px",
                  alignItems: "center", justifyContent: "center", fontSize: fontSize[0],
                }}>

                  <Roll app={app} obj={this.props.obj} fontSize={fontSize}
                    style={{
                      display: "flex",
                      height: "fit-content",
                      alignSelf: "center",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                      textAlign: "center", fontSize: fontSize[0],

                    }} />


                </div>


                {obj?.getJson().statBlockLink !== "" && obj?.getJson().statBlockLink !== undefined &&
                  (<a target="_blank" rel="noopener noreferrer" href={stat} style={{ cursor: "pointer" }} title={"Link to " + obj?.getJson().statBlockLink} draggable="false">
                    <img src={bookCursor} draggable="false"
                      style={{ width: "22px", height: "22px", objectFit: "scale-down", marginLeft: "25px", position: "absolute", zIndex: "22", }}
                    />
                    <TokenImage pic={obj?.getJson().picURL} width={88} app={app} colors={colors} />
                  </a>) || (
                    <div href={stat} style={{ cursor: "" }}>
                      <img src={bookCursor} draggable="false" style={{ width: "22px", height: "22px", objectFit: "scale-down", position: "absolute", opacity: "0%" }}
                      />
                      <TokenImage pic={obj?.getJson().picURL} width={88} app={app} colors={colors} />
                    </div>
                  )}

                <div title="Name"
                  style={{
                    display: "flex", height: "fit-content", width: "fit-content", fontWeight: "bold", fontFamily: "serif",
                    textDecoration: styles.colors.colorWhite + "22 underline", textDecorationThickness: "1px", textUnderlineOffset: "4px",
                    textShadow: "1px 1px 0 " + styles.colors.colorBlack, marginRight: ".5vw", border: borderGradient,
                    width: "300px", alignSelf: "center", marginLeft: "-11px", borderRadius: "11px",
                    alignItems: "center", justifyContent: "center", fontSize: fontSize[0],
                  }}>
                  <ParentFormComponent obj={obj} name="name"
                    prepareRun={true} maxLength={30}
                    //placeholder={obj?.getJson().hp}
                    inputStyle={{
                      minWidth: "300px", padding: "4px 9px", color: styles.colors.colorWhite, height: "1.7rem", rows: "1",
                      fontSize: fontSize[0],
                      borderRadius: "4px", background: styles.colors.color2 + "5c", borderWidth: "0px", alignItems: "center", textAlign: "center", justifyContent: "center",
                    }}
                    style={{ alignSelf: "center", fontSize: fontSize[0], }} />
                </div>

                <div title="AC"
                  style={{
                    display: "flex",
                    height: "fit-content",
                    width: "fit-content",
                    alignSelf: "center",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column", marginBottom: "20px",
                    textAlign: "center",
                  }}
                >

                  <img style={{ alignSelf: "center", width: fontSize[0], marginBottom: "2px" }} src={ac} draggable="false" />

                  <ParentFormComponent obj={obj} name="ac"
                    prepareRun={true} maxLength={2}
                    //placeholder={obj?.getJson().hp}
                    inputStyle={{
                      width: "2.45rem", padding: "4px 9px", color: styles.colors.colorWhite, height: "1.7rem", rows: "1", fontSize: fontSize[0],
                      borderRadius: "4px", background: styles.colors.color2 + "00", borderWidth: "0px", alignItems: "center", textAlign: "center", justifyContent: "center",
                    }}
                    style={{ alignSelf: "center", fontSize: fontSize[0], }} />

                </div>

                <div title="Health. Use +x or -x at the end to add or subtract from the current value. 
                          ie: 20-1"
                  style={{
                    display: "flex",
                    height: "fit-content",
                    width: "fit-content",
                    alignSelf: "center",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column", marginBottom: "20px",
                    textAlign: "center",
                  }}
                >
                  <div style={{ alignSelf: "center", fontSize: fontSize[0], }}>HP</div>

                  <ParentFormComponent obj={obj} name="hp"
                    prepareRun={true} maxLength={6}
                    placeholder={obj?.getJson().maxHp ? obj?.getJson().maxHp : obj?.getJson().hp}
                    doesMath={true}
                    inputStyle={{
                      width: "4.4rem", padding: "4px 9px", color: styles.colors.colorWhite,
                      height: "1.7rem", rows: "1", fontSize: fontSize[0],
                      borderRadius: "4px", background: styles.colors.color2 + "00", borderWidth: "0px", alignItems: "center",
                      textAlign: "center", justifyContent: "center",
                    }}
                    style={{ alignSelf: "center", fontSize: fontSize[0], }} />

                  {/* {obj?.getJson().hp}</div> */}
                </div>

                <div title={obj?.getJson().notes}
                  style={{
                    display: "flex",
                    height: "fit-content",
                    width: "fit-content",
                    alignSelf: "center",
                    alignItems: "center", marginBottom: "20px",
                    justifyContent: "center",
                    flexDirection: "column",
                    textAlign: "center",
                    marginRight: "1vw",
                  }}
                >
                  <div style={{
                    alignSelf: "flex-start",
                    fontSize: fontSize[0], marginLeft: ".5vw", marginTop: "-6px",
                  }}>Notes</div>

                  <ParentFormComponent obj={obj} name="notes"
                    prepareRun={true} maxLength={200}

                    //placeholder={obj?.getJson().hp}
                    inputStyle={{
                      padding: "3px 3px",
                      color: styles.colors.colorWhite,
                      marginLeft: "8px",
                      height: "1.7rem",
                      maxHeight: "25px",
                      fontSize: fontSize[2],
                      borderRadius: "4px",
                      background: styles.colors.color2 + "5c",
                      borderWidth: "0px",
                      textAlign: "flex-start",
                      justifyContent: "center",
                      whiteSpace: "normal",
                      minWidth: "260px",
                      resize: "both",
                    }}
                  />

                </div>


                <div style={{
                  display: "flex", color: styles.colors.colorWhite, fontSize: styles.fonts.fontSmallest, flexDirection: "row",
                  width: "600px", marginLeft: "-9px"
                }}>

                  {/* CONDITION */}
                  <div className="hover-container"
                    style={{ width: "fit-content", height: "fit-content" }}
                  >
                    <div style={{ ...styles.buttons.buttonAdd, padding: "2px 8px", }}>
                      <img src={conditionGear}
                        style={{ width: "32px", }} />
                    </div>
                    <div className="hover-div" style={{ display: 'flex', flexWrap: 'wrap', maxWidth: "fit-content", }}>

                      {this.state.showConditions === true &&
                        <div
                          style={{
                            display: 'flex', flexWrap: 'wrap', width: "40vw", top: "-.99vh", borderRadius: "22px",
                            marginLeft: "-26vw", border: "1px solid " + styles.colors.color8 + "33", height: "110px",
                            position: "absolute", background: styles.colors.color1, padding: "4px 8px", justifyContent: "space-evenly"
                          }}>
                          {conListNames.map((word, index) => (

                            <div
                              onClick={() =>

                                this.handleClickWord(word, iValue)

                              }

                              className="hover-bubble" key={word + index} style={{
                                display: 'flex', maxHeight: "30px",
                                padding: '6px', width: "fit-content",
                                marginLeft: (word === "Dead" ? "1vw" : "2px"),
                                marginTop: "2px", cursor: "pointer",
                                borderRadius: '12px',
                                fontSize: styles.fonts.fontSmallest,
                                color: styles.colors.colorWhite,
                                textAlign: "center", verticalAlign: "center",
                                border: (activeConList.map(item => item.getJson().name).includes(word) ? '1px solid ' + styles.colors.color3 : 'none'),

                                fontWeight: (word === "Dead" ? "600" : "300"),
                                backgroundColor: (word === "Dead" ? styles.colors.color6 + "e4" : styles.colors.color2),
                                boxShadow: '0 1px 1px ' + styles.colors.colorBlack,
                                alignSelfSelf: (word === "Dead" ? "flex-end" : "")
                              }}>
                              {word}
                            </div>
                          ))}
                        </div>}



                    </div>




                  </div>
                  {/* {{ACTIVE CONDITIONS}} */}
                  {activeConList &&
                    <div style={{
                      display: 'flex', flexWrap: 'wrap', width: "fit-content", opacity: "79%",
                      alignContent: "flex-start", marginLeft: "3px",
                      color: styles.colors.colorWhite, flexDirection: "column", width: "100%",
                      maxHeight: "112px",
                      padding: "0px 4px",
                    }}>
                      {activeConList.slice(0, maxCon).map((word, index) => {

                        return (
                          <div style={{ display: 'flex', flexDirection: "row", justifyContent: "flex-start", alignSelf: "flex-start", maxWidth: "240px", }}>
                            {word.getJson().name && word.getJson().name !== "" &&
                              <div key={index}
                                style={{
                                  fontSize: fontSize[1], textAlign: "flex-start",
                                  width: "fit-content", padding: word.getJson().name === "Dead" ? "2px 8px" : "2px",
                                  alignSelf: "flex-end", alignSelf: "flex-end",
                                  color: word.getJson().name === "Dead" ? styles.colors.color5 : styles.colors.colorWhite,
                                  fontWeight: word.getJson().name === "Dead" ? 600 : 200,
                                  borderRadius: "11px",
                                  border: word.getJson().name === "Dead" ? "1px solid " + styles.colors.color6 : "",

                                }}>
                                {word.getJson().name}
                              </div>}

                            <div style={{
                              fontSize: fontSize[2], alignSelf: "center",

                              width: "fit-content", marginRight: "32px", marginLeft: "4px", opacity: word.getJson().name === "Dead" ? "0%" : "70%",
                            }}>
                              {"(" + word.getJson().roundsActive + ")"}


                            </div>

                          </div>)
                      })}
                    </div>}
                </div>


              </div>

            </div>
          </div>

        </div></div>
    )
  }
}


