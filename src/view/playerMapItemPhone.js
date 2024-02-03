import { Component } from 'react';
import "../App.css"
import Roll from './Roll';
import TokenImage from './tokenImage';
import bookCursor from '../pics/bookmarklet.png';
import ParentFormComponent from '../componentListNPM/componentForms/parentFormComponent';
import ac from '../pics/ac.png';
// import d20 from '../pics/d20.png';
import conditionGear from '../pics/conditionGear.png';
import _ from 'lodash';
import ConnectToCampaignSwitch from './connectToCampaignSwitch';

export default class PlayerCharacterMapItemPhone extends Component {
  constructor(props) {
    super(props);
    this.roundUpdated = false;
    this.state = {
      obj: undefined,
      pic: undefined,
      runEncounter: undefined,
      encounterId: undefined,
      showConditions: true,
      showMore: false,
    };
  }

  convertToLink = (statBlockLink) => {

    if (statBlockLink && !statBlockLink.startsWith('http')) {
      return 'https://' + statBlockLink;
    }
    return statBlockLink;
  }

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
    let colors = obj.getJson().colors ? Object.values(allColors) : [styles.colors.color1, styles.colors.color2, styles.colors.color8, styles.colors.color1, styles.colors.color2, styles.colors.color8];
    const width = 108;

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
    let fontSizeRem = fontSizePx / 12;
    let fontSizeRemSm = fontSizePx / 14;
    let fontSizeRemTiny = fontSizePx / 17;
    let fontSize = [fontSizeRem + "rem", fontSizeRemSm + "rem", fontSizeRemTiny + "rem"]

    const lastInitAsNumber = parseFloat(this.props.obj.getJson().lastInit);
    // const roundCount = this.state.roundCount;

    const currentTurn = this.props.obj.getJson()?.currentTurn;

    let borderGradient = currentTurn === lastInitAsNumber ?
      `solid 1px ${colors[5]}66` : "";


    return (

      <div style={{
        width: "100%", overflowX: "visible", marginTop: "18px",
        position: "relative", borderRadius: "22px", minWidth: "100%",
        alignSelf: "flex-start", justifySelf: "flex-start",
      }}>
        <div
          style={{
            width: "100%", borderRadius: "22px", minWidth: "100%",
            height: "fit-content",
          }}>

          <div
            // to={"/encounter/" + obj?.getJson()._id} 
            style={{
              color: styles.colors.colorWhite,
              textDecoration: "none", userSelect: "none",
              height: "fit-content",
            }}
          >

            <div style={{
              display: "flex", flexDirection: 'column',
              borderRadius: styles.popupSmall.borderRadius,
              border: "", verticalAlign: "center",
              justifyContent: "center",
              zIndex: "0",
              height: 'fit-content',
              width: "100%", background: "linear-gradient(90deg, " + colors[4] + "55, #45526e27, " + colors[2] + "22)",
              ...styles.backgroundContent,
            }}>
              <div

                style={{
                  display: "flex", flexDirection: "row", justifyContent: "space-between", borderRadius: "22px",
                  height: "fit-content", alignContent: "center", alignItems: "center", padding: "8px 8px",
                }}

              >
                {/* {this.state.showMore &&
                  <div>
                    {stat &&
                      (<div title={stat} style={{ justifyContent: "center",display: "flex", marginLeft: "11px", flexDirection: "column", alignContent: "center", alignItems: "center", }}>
                        <a href={stat} target='_blank'>

                          <img className='hover-img' src={bookCursor} style={{ width: "50px", opacity: "" }} />

                        </a>

                        <ParentFormComponent obj={this.props.obj} name="statBlockLink"
                          prepareRun={true} maxLength={30}

                          inputStyle={{
                            width: "200px", padding: "2px 4px", color: styles.colors.colorWhite, marginTop: "8px",
                            color: styles.colors.colorBlack, height: "1.7rem", rows: "1", fontSize: fontSize[2], cursor: "text",
                            borderRadius: "4px", background: styles.colors.colorWhite + "9c", borderWidth: "0px",
                          }}

                        />

                      </div>) ||
                      (<div title={stat} style={{ justifyContent: "center", display: "flex", marginLeft: "11px", flexDirection: "column", alignContent: "center", alignItems: "center", }}>
                        
                        <div className='hover-btn'>
                          <img src={bookCursor} style={{ width: "50px", opacity: "0%" }} />

                        </div>
                        {!this.state.showMore &&<ParentFormComponent obj={this.props.obj} name="statBlockLink"
                          prepareRun={true} maxLength={30}
                          placeholder={"Link to Sheet"}
                          inputStyle={{
                            width: "200px", padding: "2px 4px", color: styles.colors.colorWhite, marginTop: "8px",
                            color: styles.colors.colorBlack, height: "1.7rem", rows: "1", fontSize: fontSize[2],
                            borderRadius: "4px", background: styles.colors.colorWhite + "9c", borderWidth: "0px", cursor: "text",
                          }}

                        />}</div>)
                    }
                  </div>} */}






                {!this.state.showMore &&
                <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                  <div className='hover-btn' title="Name"
                    style={{
                      display: "flex", height: "fit-content", width: "100%", fontWeight: "bold", fontFamily: "serif",
                      textDecoration: styles.colors.colorWhite + "88 underline", textDecorationThickness: "1px", textUnderlineOffset: "4px",
                      textShadow: "1px 1px 0 " + styles.colors.colorBlack, border: "1px solid " + styles.colors.color8 + '22',
                      alignSelf: "center", borderRadius: "11px", background: styles.colors.color1 + '55', maxWidth:"61vw",
                      alignItems: "center", justifyContent: "center", fontSize: fontSize[0],
                    }}>
                    <ParentFormComponent obj={this.props.obj} name="name"
                      prepareRun={true} maxLength={30}

                      inputStyle={{
                        width: "100%", padding: "4px 9px", color: styles.colors.colorWhite, height: "1.7rem", rows: "1",
                        fontSize: fontSize[0], cursor: "text",
                        borderRadius: "11px", minWidth:"20",
                        background: "linear-gradient(90deg, " + styles.colors.colorBlack + "5c, " + colors[0] + "11," + styles.colors.colorBlack + "5c)", 
                        borderWidth: "0px", alignItems: "center", textAlign: "center", justifyContent: "center",
                      }}

                    />
                  </div>

               
                  <div className='indent-on-click' style={{ marginLeft: "0px", width: "60px", borderRadius: "50%", height: "60px", padding:"1px", marginRight:"25px" }}
                    onClick={() => {
                      this.setState({ showMore: !this.state.showMore })

                    }}
                  >
                    <TokenImage pic={obj?.getJson().picURL} width={60} app={app} colors={colors} obj={obj} />

                   
                  </div></div>}

                {(this.state.showMore) &&
                  <div title="Initiative Bonus" className='hover-btn'
                    style={{
                      display: "flex",
                      background: styles.colors.colorBlack,
                      padding: "11px", borderRadius: "11px",
                      alignSelf: "center",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                      textAlign: "center", marginRight: "5px",
                    }}
                  >
                    <div style={{ alignSelf: "center", fontSize: fontSize[1], }}>Initiative Bonus</div>

                    <ParentFormComponent obj={this.props.obj} name="initiative"
                      prepareRun={true} maxLength={4} label={"+"}

                      inputStyle={{
                        width: "3.4rem", padding: "4px 9px", color: styles.colors.colorWhite, marginTop: "2px",
                        color: styles.colors.colorBlack, height: "1.7rem", rows: "1", fontSize: styles.fonts.fontNormal,
                        borderRadius: "4px", background: styles.colors.colorWhite + "9c", borderWidth: "0px", cursor: "text",
                      }}
                    />

                  </div>}
                {(this.state.showMore) &&
                  <div title="AC" className='hover-btn'
                    style={{
                      display: "flex",
                      background: styles.colors.colorBlack,
                      padding: "11px", borderRadius: "11px",
                      alignSelf: "center",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                      textAlign: "center", marginRight: "5px",
                    }}
                  >

                    <div style={{ alignSelf: "center", fontSize: fontSize[1], }}>AC</div>

                    <ParentFormComponent obj={this.props.obj} name="ac"
                      prepareRun={true} maxLength={2}

                      inputStyle={{
                        width: "3.4rem", padding: "4px 9px", color: styles.colors.colorWhite, marginTop: "2px",
                        color: styles.colors.colorBlack, height: "1.7rem", rows: "1", fontSize: styles.fonts.fontNormal,
                        borderRadius: "4px", background: styles.colors.colorWhite + "9c", borderWidth: "0px", cursor: "text",
                      }}
                      style={{ alignSelf: "center", fontSize: fontSize[1], }} />

                  </div>}
                {(this.state.showMore) &&
                  <div title="Max HP" className='hover-btn'
                    style={{
                      display: "flex",
                      background: styles.colors.colorBlack,
                      padding: "11px", borderRadius: "11px",
                      alignSelf: "center",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                      textAlign: "center", marginRight: "5px",
                    }}
                  >
                    <div style={{ alignSelf: "center", fontSize: fontSize[1], }}>Max HP</div>

                    <ParentFormComponent obj={this.props.obj} name="hp"
                      prepareRun={true} maxLength={4} doesMath={true}
                      inputStyle={{
                        width: "3.4rem", padding: "4px 9px", color: styles.colors.colorWhite, marginTop: "2px",
                        color: styles.colors.colorBlack, height: "1.7rem", rows: "1", fontSize: styles.fonts.fontNormal, cursor: "text",
                        borderRadius: "4px", background: styles.colors.colorWhite + "9c", borderWidth: "0px",
                      }} />


                  </div>}

                {this.state.showMore && (
                  <div style={{fontSize:"2.1rem", marginLeft:"3px", padding:"8px", color:"red"}}  onClick={() => {
                    this.setState({ showMore: !this.state.showMore })

                  }}>
                    x
                  </div>
                )}

              </div>

              <div style={{
                width: "fit-content", display: "flex", flexDirection: "row", marginBottom: "11px",
                justifyContent: "center", alignSelf: "center", height: "fit-content", marginTop: "11px",
              }}>
                <ConnectToCampaignSwitch app={app} {...this.props} />
              </div>

            </div>

          </div>

        </div>



      </div>
    )
  }
}


