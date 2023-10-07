import { Component } from 'react';
import "../App.css"
import Roll from './Roll';
import TokenImage from './tokenImage';
import bookCursor from '../pics/bookmarklet.png';
import ParentFormComponent from '../componentListNPM/componentForms/parentFormComponent';
import ac from '../pics/ac.png';
import d20 from '../pics/d20.png';
import conditionGear from '../pics/conditionGear.png';

export default class MonsterMapItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      obj: undefined,
      pic: undefined,
      runEncounter: undefined,
      //colors: props.colors || [],
      encounterId: undefined,
      // turnNumber: props.turnNumber,
      roundCount: 0,
    };}

    convertToLink = (statBlockLink) => {
    
      if (statBlockLink && !statBlockLink.startsWith('http')) {
        return 'https://' + statBlockLink;
      }
      return statBlockLink;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.colors !== this.props.colors) {
      // Update state if prop changes
      this.setState({ colors: this.props.colors });
    }
  }


  render() {
    
    let app = this.props.app;
    let dispatch = app.dispatch;
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
              const roundCount = this.state.roundCount;


              let animateGradient  =   state.currentTurn === lastInitAsNumber ?"linear-gradient(90deg, "+styles.colors.color2+"00, "+styles.colors.color7+"22, "+styles.colors.color2+"00)":""
              
              const otherWord =( 
              
              <ParentFormComponent 
              obj={this.props.obj} name="condition" prepareRun={true} maxLength={22} placeholder={"Add you own"}
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

    return (
     
      <div style={{overflow:"visible",}}>
      <div className={state.currentTurn === lastInitAsNumber ? "gradient-animation" : ""}
      style={{
        minWidth: "100%", borderRadius:"22px", 
        height:"fit-content", marginRight:"20px",
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
      justifyContent:"left",  position:"absolute",
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
                                        
                                        }}/></div>


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
                          textShadow:"1px 1px 0 "+styles.colors.colorBlack, 
                          width:"390px", alignSelf:"center",  marginLeft:"-11px",
                          alignItems:"center", justifyContent:"center", fontSize:fontSize[0],
                         }}>
                           <ParentFormComponent obj={this.props.obj} name="name"
                            prepareRun={true} maxLength={30}
                            //placeholder={obj?.getJson().hp}
                              inputStyle={{minWidth:"390px", padding:"4px 9px", color:styles.colors.colorWhite, height:"1.7rem", rows:"1", 
                              fontSize:fontSize[0],
                              borderRadius:"4px",background:"#aaaaaa00", borderWidth:"0px", alignItems:"center",textAlign:"center",justifyContent:"center",
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
                              flexDirection: "column",
                              textAlign: "center",
                            }}
                          >
                            
                            <img style={{ alignSelf: "center", width: fontSize[0], marginBottom:"2px" }} src={ac} draggable="false"/>

                            <ParentFormComponent obj={this.props.obj} name="ac"
                            prepareRun={true} maxLength={2}
                            //placeholder={obj?.getJson().hp}
                              inputStyle={{width:"2.45rem", padding:"4px 9px", color:styles.colors.colorWhite, height:"1.7rem", rows:"1", fontSize:fontSize[0],
                              borderRadius:"4px",background:"#aaaaaa00", borderWidth:"0px", alignItems:"center",textAlign:"center",justifyContent:"center",
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
                              flexDirection: "column",
                              textAlign: "center",
                            }}
                          >
                            <div style={{ alignSelf: "center", fontSize: fontSize[0], }}>HP</div>

                            <ParentFormComponent obj={this.props.obj} name="hp"
                          prepareRun={true} maxLength={4}
                          //placeholder={obj?.getJson().hp}
                             inputStyle={{width:"3.4rem", padding:"4px 9px", color:styles.colors.colorWhite, 
                             height:"1.7rem", rows:"1", fontSize:fontSize[0],
                             borderRadius:"4px",background:"#aaaaaa00", borderWidth:"0px", alignItems:"center",
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
                              alignItems: "center",
                              justifyContent: "center",
                              flexDirection: "column",
                              textAlign: "center",
                              marginRight:"1vw",
                            }}
                          >
                            <div  style={{ alignSelf: "flex-start", 
                            fontSize: fontSize[0], marginLeft:"1vw", marginTop:"-6px",
                            }}>Notes</div>

                            <ParentFormComponent obj={this.props.obj} name="notes"
                          prepareRun={true} maxLength={200} 
                          
                          //placeholder={obj?.getJson().hp}
                             inputStyle={{
                             padding: "3px 3px",
                             color: styles.colors.colorWhite,
                             marginLeft: "1vw", 
                             height: "1.7rem",
                             maxHeight:"20px",
                             fontSize: fontSize[2],
                             borderRadius: "4px",
                             background: "#aaaaaa00",
                             borderWidth: "0px",
                             textAlign: "flex-start",
                             justifyContent: "center",
                             whiteSpace: "normal",
                            
                             resize: "both"}}
                            />

                          </div>


                          <div style={{color:styles.colors.colorWhite, fontSize:styles.fonts.fontSmallest, 
                      width:"500px", marginLeft:".2vw"}}>

{/* CONDITION */}
        <div className="hover-container"
          style={{ width:"fit-content",}}
        > 
        <div style={{...styles.buttons.buttonAdd, padding:"2px 8px",}}>
          <img src={conditionGear}
          style={{width:"35px", }}/>
        </div>
          <div className="hover-div" style={{display: 'flex', flexWrap: 'wrap', position:"absolute", maxWidth:"fit-content"}}>
            <div 
            style={{ display: 'flex', flexWrap: 'wrap',  width:"40vw", left:"-20vw", top:"-.99vh", borderRadius:"22px",
            position:"absolute", background:styles.colors.color1, padding:"4px 8px", justifyContent:"space-evenly" }}>
              {conList.map((word, index) => (
                <div className="hover-bubble" key={index} style={{
                  display: 'flex', maxHeight:"30px", 
                  padding: '6px', width:"fit-content",
                  marginLeft: (word=="Dead"?"1vw":"2px"), 
                  marginTop:"3px",
                  borderRadius: '12px', 
                  fontSize:styles.fonts.fontSmallest,
                  color:styles.colors.colorWhite,
                  fontWeight: (word=="Dead"?"600":"300"),
                  backgroundColor: (word=="Dead"?styles.colors.color6+"e4":styles.colors.color2),
                  boxShadow: '0 1px 1px '+styles.colors.colorBlack,
                  alignSelfSelf: (word=="Dead"?"flex-end":"")
                }}>
                  {word}
                </div>
              ))}
            </div>
          </div>
        </div>
                                  
                          </div>
                                         

                </div>
                
        </div>
        </div>

        </div></div>
    )
  }
  }


