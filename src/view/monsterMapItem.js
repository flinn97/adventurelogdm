import { Component } from 'react';
import "../App.css"
import Roll from './Roll';
import TokenImage from './tokenImage';
import bookCursor from '../pics/bookmarklet.png';
import ParentFormComponent from '../componentListNPM/componentForms/parentFormComponent';
import ac from '../pics/ac.png';
// import d20 from '../pics/d20.png';
import conditionGear from '../pics/conditionGear.png';

export default class MonsterMapItem extends Component {
  constructor(props) {
    super(props);
    this.roundUpdated = false;
    this.state = {
      obj: undefined,
      pic: undefined,
      runEncounter: undefined,
      encounterId: undefined,
      showConditions: true
      
    };
    }

    convertToLink = (statBlockLink) => {
    
      if (statBlockLink && !statBlockLink.startsWith('http')) {
        return 'https://' + statBlockLink;
      }
      return statBlockLink;
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.colors !== this.props.colors) {
      // Update state if prop changes
      this.setState({ colors: this.props.colors });
    };

    const currentTurn = this.props.app.state.currentTurn;
    const lastInitAsNumber = parseFloat(this.props.obj.getJson().lastInit);

    if (this.props.obj && this.props.obj.getJson().conditions && this.props.obj.getJson().conditions[0] === "") {
      let jsonObj =  await this.props.obj.getJson();
      jsonObj.otherRounds = 0;
      this.props.obj.setJson(jsonObj);
    }

    if (currentTurn === 99999) {
      // Reset all round counters to 0
      let jsonObj =  await this.props.obj.getJson();
      if (jsonObj.conditions) {
        jsonObj.conditions.slice(1).forEach((condition) => {
          const roundKey = `${condition}Rounds`;
          jsonObj[roundKey] = 0;
        });
      }
      jsonObj.otherRounds = 0;
      this.props.obj.setJson(jsonObj);
      this.roundUpdated = false;
    } else if (currentTurn === lastInitAsNumber && !this.roundUpdated) {
      // Increment round counters
      let jsonObj =  await this.props.obj.getJson();
      if (jsonObj.conditions) {
        jsonObj.conditions.slice(1).forEach((condition) => {
          const roundKey = `${condition}Rounds`;
          if (jsonObj[roundKey] !== undefined) {
            jsonObj[roundKey] += 1;
          } else {
            jsonObj[roundKey] = 1; // Initialize if not present
          }
        });
        if (jsonObj.otherRounds !== undefined) {
          jsonObj.otherRounds += 1;
        } else {
          jsonObj.otherRounds = 1; // Initialize if not present
        }
        this.props.obj.setJson(jsonObj);
      }
      this.roundUpdated = true;
    } else if (currentTurn !== lastInitAsNumber) {
      this.roundUpdated = false; // Reset flag
    }
  };

  handleClickWord = (word) => {
    this.setState({ showConditions: false });
    
    let jsonObj = this.props.obj.getJson();
    let conditions = jsonObj.conditions || [];
    const index = conditions.indexOf(word);
    
    if (index === -1) {
      // Word not in array, insert it at position 1 or later
      conditions.splice(1, 0, word);
      jsonObj[`${word}Rounds`] = 0;
    } else {
      // Word already in array, remove it
      conditions.splice(index, 1);
      delete jsonObj[`${word}Rounds`];
    }
    
     // Filter out "<ParentFormComponent />"
     conditions = conditions.filter(item => String(item) !== String(<ParentFormComponent />));

     const lastInitAsNumber = parseFloat(this.props.obj.getJson().lastInit);
     if (this.props.app.state.currentTurn === lastInitAsNumber) {
      jsonObj[`${word}Rounds`] = 0;
     }
      // Update the JSON object
      jsonObj.conditions = conditions;
      this.props.obj.setJson(jsonObj);

      this.setState({ showConditions: true });
      this.props.app.dispatch({});
  };
  

  render() {
    
    let app = this.props.app;
    // let dispatch = app.dispatch;
    let state = app.state;
    let length = app.state.maxLengthShort;
    let styles = state.styles;
   
    let obj = this.props.obj;
    const { colors } = this.state;
   

    
    let stat = this.convertToLink(obj?.getJson().statBlockLink);
          let name = obj?.getJson().name;
          let x = name.length;
          let fontSizePx;

              if(x <= 18) {
                  fontSizePx = 16;
              }
              else if(x >= length) {
                  fontSizePx = 11;
              }
              else {
                  fontSizePx = 16 + (x - 18) * ((11 - 16) / (length - 18));
              }        
              let fontSizeRem = fontSizePx / 16;
              let fontSizeRemSm=fontSizePx / 19;
              let fontSizeRemTiny=fontSizePx / 22;
              let fontSize =[fontSizeRem + "rem", fontSizeRemSm+"rem", fontSizeRemTiny+"rem"]
    
              const lastInitAsNumber = parseFloat(this.props.obj.getJson().lastInit);
              // const roundCount = this.state.roundCount;


              let animateGradient  =   state.currentTurn === lastInitAsNumber ?"linear-gradient(90deg, "+styles.colors.color2+"00, "+styles.colors.color7+"22, "+styles.colors.color2+"00)":""
              
              const otherWord =( 
              
              <ParentFormComponent 
              obj={this.props.obj} isPropArray={true} name="conditions" prepareRun={true} maxLength={22} placeholder={"Add your own"}
              
               inputStyle={{
                width:"250px",
                color: styles.colors.colorWhite,
                fontSize: styles.fonts.fontSmallest,
                borderRadius: "4px", paddingBottom:"3px",paddingTop:"3px", paddingLeft:"4px",
                background: styles.colors.colorWhite+"0e",
                borderWidth: "1px",
                textAlign: "flex-start",
                justifyContent: "center",}}
                wrapperStyle={{justifyContent: "center", marginTop:"-8px"}}
              app={app}/>);
              
              const conList = [
                "Blinded", "Burning",
                "Concentration",
                "Charmed",
                "Deafened",
                "Exhaustion",
                "Frightened",
                "Grappled",
                "Incapacitated",
                "Invisible",
                "Paralyzed",
                "Petrified",
                "Poisoned",
                "Prone",
                "Restrained",
                "Stunned",
                "Unconscious",
                
                otherWord,

                "Dead",
              ];

              const activeConList = [...this.props.obj.getJson().conditions];
              const maxCon = this.props.obj.getJson().conditions[0]===""?13:12;


    return (
     
      <div style={{minWidth: "100%", overflow:"visible", alignSelf:"flex-start", justifySelf:"flex-start", position: "relative", left:0}}>
      <div className={state.currentTurn === lastInitAsNumber ? "gradient-animation" : ""}
      style={{
        minWidth: "100%", borderRadius:"22px", 
        height:"fit-content",
      }}>
        
      <div
      // to={"/encounter/" + obj?.getJson()._id} 
      style={{ color: styles.colors.colorWhite, 
        textDecoration: "none", userSelect:"none",
        height: "fit-content", overflow:"visible", 
       }}
      > 

      <div style={{display: "flex", flexDirection: 'column', 
      borderRadius:styles.popupSmall.borderRadius,
      border:"", verticalAlign:"center",
      justifyContent:"center",  position:"absolute",
      zIndex:"0",
      height: 'fit-content', 
      width: 'fit-content',
      ...styles.backgroundContent,
      }}>     
                        <div 
                        // className={state.currentTurn === lastInitAsNumber ? "gradient-animation" : ""} 
                        style={{
                        ...styles.popupSmall, display: "flex", flexDirection: "row", justifyContent:"space-evenly", 
                        height: "fit-content", border:"", marginTop:"-8px",
                        background:state.currentTurn === lastInitAsNumber ?  "linear-gradient(90deg, "+styles.colors.color2+"55, #45526e27, #282c3400)": "",
                         width:"fit-content",}}>


        
<div  title="Roll Initiative" style={{display: "flex", height:"fit-content", fontWeight:"bold", fontFamily:"serif", 
                          textShadow:"1px 1px 0 "+styles.colors.colorBlack,
                          width:"fit-content", alignSelf:"center", marginRight:"11px",
                          alignItems:"center", justifyContent:"center", fontSize:fontSize[0],}}>

                                        <Roll app={app} obj={this.props.obj} fontSize={fontSize}
                                        style={{  display: "flex",
                                        height: "fit-content",
                                        alignSelf: "center",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexDirection: "column",
                                        textAlign: "center", fontSize:fontSize[0],
                                        
                                        }}/>
                          {/* {state.currentTurn === 9999 &&
                                        <div
                                        style={{alignItems:"center", display:"flex", position:"absolute", marginBottom:"-88px",
                                        marginLeft:"", alignSelf:"center", alignContent:"center", textAlign:"center", 
                                         fontSize:styles.fonts.fontSmallest, color:styles.colors.colorWhite+"1c"}}
                                        >Initiative</div>} */}

                                        </div>


{obj?.getJson().statBlockLink !== "" && obj?.getJson().statBlockLink !== undefined &&
(<a target="_blank" rel="noopener noreferrer" href={stat} style={{cursor: "pointer"}} title={"Link to "+obj?.getJson().statBlockLink} draggable="false">
          <img src={bookCursor} draggable="false" 
          style={{width:"22px", height:"22px", objectFit:"scale-down", marginLeft:"25px",position:"absolute", zIndex:"22"}}
          />
          <TokenImage pic={obj?.getJson().picURL} width={88} app={app} colors={this.props.obj.getJson().colors}/>
</a>)||(
  <div href={stat} style={{cursor: ""}}>
  <img src={bookCursor} draggable="false" style={{width:"22px", height:"22px",  objectFit:"scale-down", position:"absolute", opacity:0}}
  />
  <TokenImage pic={obj?.getJson().picURL} width={88} app={app} colors={this.props.obj.getJson().colors}/>
</div>
)}

                          <div        title="Name"         
                          style={{display: "flex", height:"fit-content", width:"fit-content", fontWeight:"bold", fontFamily:"serif", 
                          textDecoration: styles.colors.colorWhite+"22 underline", textDecorationThickness: "1px", textUnderlineOffset: "4px",
                          textShadow:"1px 1px 0 "+styles.colors.colorBlack,  marginRight:".5vw",
                          width:"300px", alignSelf:"center",  marginLeft:"-11px",
                          alignItems:"center", justifyContent:"center", fontSize:fontSize[0],
                         }}>
                           <ParentFormComponent obj={this.props.obj} name="name"
                            prepareRun={true} maxLength={30}
                            //placeholder={obj?.getJson().hp}
                              inputStyle={{minWidth:"300px", padding:"4px 9px", color:styles.colors.colorWhite, height:"1.7rem", rows:"1", 
                              fontSize:fontSize[0], 
                              borderRadius:"4px", background: styles.colors.color2+"5c", borderWidth:"0px", alignItems:"center",textAlign:"center",justifyContent:"center",
                              }}
                           style={{ alignSelf: "center", fontSize: fontSize[0], }}/>
                          </div>
                          
                          <div title="AC"
                            style={{
                              display: "flex",
                              height: "fit-content",
                              width: "fit-content",
                              alignSelf: "center",
                              alignItems: "center",
                              justifyContent: "center",
                              flexDirection: "column", marginBottom:"20px",
                              textAlign: "center",
                            }}
                          >
                            
                            <img style={{ alignSelf: "center", width: fontSize[0], marginBottom:"2px" }} src={ac} draggable="false"/>

                            <ParentFormComponent obj={this.props.obj} name="ac"
                            prepareRun={true} maxLength={2}
                            //placeholder={obj?.getJson().hp}
                              inputStyle={{width:"2.45rem", padding:"4px 9px", color:styles.colors.colorWhite, height:"1.7rem", rows:"1", fontSize:fontSize[0],
                              borderRadius:"4px", background: styles.colors.color2+"00", borderWidth:"0px", alignItems:"center",textAlign:"center",justifyContent:"center",
                              }}
                           style={{ alignSelf: "center", fontSize: fontSize[0], }}/>

                          </div>

                          <div title="Health"
                            style={{
                              display: "flex",
                              height: "fit-content",
                              width: "fit-content",
                              alignSelf: "center",
                              alignItems: "center",
                              justifyContent: "center",
                              flexDirection: "column", marginBottom:"20px",
                              textAlign: "center",
                            }}
                          >
                            <div style={{ alignSelf: "center", fontSize: fontSize[0], }}>HP</div>

                            <ParentFormComponent obj={this.props.obj} name="hp"
                          prepareRun={true} maxLength={4}
                          //placeholder={obj?.getJson().hp}
                             inputStyle={{width:"3.4rem", padding:"4px 9px", color:styles.colors.colorWhite, 
                             height:"1.7rem", rows:"1", fontSize:fontSize[0],
                             borderRadius:"4px", background: styles.colors.color2+"00", borderWidth:"0px", alignItems:"center",
                             textAlign:"center",justifyContent:"center",}}
                            style={{ alignSelf: "center", fontSize: fontSize[0], }}/>

                              {/* {obj?.getJson().hp}</div> */}
                          </div>

   <div title={obj?.getJson().notes}
                            style={{
                              display: "flex",
                              height: "fit-content",
                              width: "fit-content",
                              alignSelf: "center",
                              alignItems: "center", marginBottom:"20px",
                              justifyContent: "center",
                              flexDirection: "column",
                              textAlign: "center",
                              marginRight:"1vw",
                            }}
                          >
                            <div  style={{ alignSelf: "flex-start", 
                            fontSize: fontSize[0], marginLeft:".5vw", marginTop:"-6px",
                            }}>Notes</div>

                            <ParentFormComponent obj={this.props.obj} name="notes"
                          prepareRun={true} maxLength={200} 
                          
                          //placeholder={obj?.getJson().hp}
                             inputStyle={{
                             padding: "3px 3px",
                             color: styles.colors.colorWhite,
                             marginLeft: "8px", 
                             height: "1.7rem",
                             maxHeight:"25px",
                             fontSize: fontSize[2],
                             borderRadius: "4px",
                             background: styles.colors.color2+"5c",
                             borderWidth: "0px",
                             textAlign: "flex-start",
                             justifyContent: "center",
                             whiteSpace: "normal",
                              minWidth:"260px",
                             resize: "both"}}
                            />

                          </div>


                          <div style={{display:"flex",color:styles.colors.colorWhite, fontSize:styles.fonts.fontSmallest, flexDirection:"row",
                      width:"600px", marginLeft:"-9px"}}>

{/* CONDITION */}
        <div className="hover-container"
          style={{ width:"fit-content", height:"fit-content"}}
        > 
        <div style={{...styles.buttons.buttonAdd, padding:"2px 8px",}}>
          <img src={conditionGear}
          style={{width:"32px", }}/>
        </div>
          <div className="hover-div" style={{display: 'flex', flexWrap: 'wrap', position:"absolute", maxWidth:"fit-content"}}>

            {this.state.showConditions===true &&
            <div 
            style={{ display: 'flex', flexWrap: 'wrap',  width:"40vw", top:"-.99vh", borderRadius:"22px", marginLeft:"-26vw",
            position:"absolute", background:styles.colors.color1, padding:"4px 8px", justifyContent:"space-evenly" }}>
              {conList.map((word, index) => (
                
                <div 
                onClick={() => 
                 
                  this.handleClickWord(word)
                  
                  }
                  
                
                className="hover-bubble" key={index} style={{
                  display: 'flex', maxHeight:"30px", 
                  padding: '6px', width:"fit-content",
                  marginLeft: (word==="Dead"?"1vw":"2px"), 
                  marginTop:"2px",cursor:"pointer",
                  borderRadius: '12px', 
                  fontSize:styles.fonts.fontSmallest,
                  color:styles.colors.colorWhite,
                  textAlign:"center", verticalAlign:"center",
                  border: (this.props.obj.getJson().conditions.includes(word)  ? '1px solid '+styles.colors.color3 : 'none'),

                  fontWeight: (word==="Dead"?"600":"300"),
                  backgroundColor: (word==="Dead"?styles.colors.color6+"e4":styles.colors.color2),
                  boxShadow: '0 1px 1px '+styles.colors.colorBlack,
                  alignSelfSelf: (word==="Dead"?"flex-end":"")
                }}>
                  {word}
                </div>
              ))}
            </div>}

           

          </div>




        </div>
                        {/* {{ACTIVE CONDITIONS}} */}
                        {this.props.obj.getJson().conditions.length >= 1 &&
                        <div style={{display: 'flex', flexWrap: 'wrap',  width:"fit-content", opacity:"79%", 
                        alignContent:"flex-start", marginLeft:"3px",
                        color:styles.colors.colorWhite, flexDirection:"column", width:"100%",
                        maxHeight:"112px",
                        padding:"0px 4px",}}>
                        {activeConList.slice(0, maxCon).map((word, index) => (
                          <div style={{display: 'flex', flexDirection:"row", justifyContent:"flex-start", alignSelf:"flex-start", maxWidth:"240px",}}>
                            {word && word!=="" &&
                            <div  key={index}
                            style={{
                              fontSize:fontSize[1], textAlign:"flex-start",
                              width:"fit-content", padding:word==="Dead"?"2px 8px":"2px", 
                              alignSelf:"flex-end", alignSelf:"flex-end",
                              color:word==="Dead"?styles.colors.color5:styles.colors.colorWhite,
                              fontWeight: word==="Dead"?600:200,
                              borderRadius:"11px",
                              border:  word==="Dead"?"1px solid "+styles.colors.color6:"",
                              
                               }}>
                              {word}
                            </div>}

                              <div style={{
                              fontSize:fontSize[2], alignSelf:"center",
                              
                            width:"fit-content", marginRight:"32px", marginLeft:"8px", opacity:word==="Dead"?"0%":"70%",
                              }}>
                              {word && word !== "" && word !== this.props.obj.getJson().conditions[0] ? "(" + this.props.obj.getJson()[`${word}Rounds`] + ")" : ""}
                                  {word && word !== "" && word === this.props.obj.getJson().conditions[0] ? "(" + this.props.obj.getJson().otherRounds + ")" : ""}
                              </div>

                            </div>))}
                          </div>   }      
        </div>
                                         

                </div>
                
        </div>
        </div>

        </div></div>
    )
  }
  }


