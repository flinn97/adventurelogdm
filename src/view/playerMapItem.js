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

export default class PlayerCharacterMapItem extends Component {
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
        operate:"update", operation:"cleanPrepareRun", object: targetCondition
  })}
    

    if (targetActiveCondition){
      let conditionJson = targetActiveCondition.getJson();
      conditionJson.roundsActive =  "0"
      // let currentR = parseInt(conditionJson.roundsActive, 10);
      // let newR = currentR + parseInt(iValue)
      // conditionJson.roundsActive =  iValue.toString();
      
      ///TAYLOR 
      // WHY DOES THIS NOT SET A NEW CONDITION ON AN ACTIVE MONSTER to 1???
      
      
      targetCondition.setCompState(conditionJson.roundsActive);
      this.props.app.dispatch({
        operate:"update", operation:"cleanPrepareRun", object: targetActiveCondition
  })}
    
  
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
    let colors = obj.getJson().colors?Object.values(allColors):[styles.colors.color1, styles.colors.color2, styles.colors.color8];
       
    const width = 108;
    
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
              let fontSizeRem = fontSizePx / 12;
              let fontSizeRemSm=fontSizePx / 14;
              let fontSizeRemTiny=fontSizePx / 17;
              let fontSize =[fontSizeRem + "rem", fontSizeRemSm+"rem", fontSizeRemTiny+"rem"]
    
              const lastInitAsNumber = parseFloat(this.props.obj.getJson().lastInit);
              // const roundCount = this.state.roundCount;
          
              const currentTurn = this.props.obj.getJson()?.currentTurn;

              let borderGradient = currentTurn === lastInitAsNumber ?
              `solid 1px ${colors[5]}66` : "";
              
              const otherWord =( 
              
              <ParentFormComponent 
              obj={this.props.obj} 
              isPropArray={true} name="conditions" 
              // prepareRun={true} 
              
              maxLength={22} 
              placeholder={"Add your own"}
              
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
                            const conListNames = conList.map(item => item.getJson().name);
                            const activeConList = Array.isArray(conList) 
                              ? conList.filter(cond => cond.getJson().isActive === true).sort(sortConditionsOpp)
                              : [];

              const maxCon = conList.length===""?13:12;
                const iValue = (currentTurn == lastInitAsNumber?"1":"0")

    return (
     
      <div style={{width: "100%", overflowX:"visible", marginTop:"1vh",
      position: "relative", borderRadius:"22px", minWidth:"1300px",
      alignSelf:"flex-start", justifySelf:"flex-start", }}>
      <div className='scroller2'
      style={{
        width: "100%", borderRadius:"22px",
        height:"fit-content",overflowX:"visible",
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
      width:"100%", background: "linear-gradient(90deg, "+colors[4]+"55, #45526e27, "+colors[2]+"22)",
      ...styles.backgroundContent,
      }}>     
                        <div 
                        
                        style={{ 
                        display: "flex", flexDirection: "row", justifyContent:"space-between", borderRadius:"22px",
                        height: "fit-content", alignContent:"center", alignItems:"center", padding:"8px 12px",
                        
                         }}>

        {stat &&
        (<div  title={stat} style={{justifyContent:"center", display:"flex", marginLeft:"11px", flexDirection:"column",alignContent:"center", alignItems:"center", }}>
        <a href={stat} target='_blank'>
          <img className='hover-img' src={bookCursor} style={{width:"50px", opacity:""}}/>
          
        </a><ParentFormComponent obj={this.props.obj} name="statBlockLink"
        prepareRun={true} maxLength={30}

          inputStyle={{width:"151px", padding:"2px 4px",color:styles.colors.colorWhite, marginTop:"8px",
          color:styles.colors.colorBlack, height:"1.7rem", rows:"1",  fontSize: fontSize[2], cursor:"text",
          borderRadius:"4px",background:styles.colors.colorWhite+"9c", borderWidth:"0px",
          }}
          
        /></div>)||
        ( <div title={stat} style={{justifyContent:"center", display:"flex",  marginLeft:"11px",flexDirection:"column",alignContent:"center", alignItems:"center", }}>
        <div  className='hover-btn'>
          <img src={bookCursor} style={{width:"50px", opacity:"0%"}}/>
          
        </div><ParentFormComponent obj={this.props.obj} name="statBlockLink"
        prepareRun={true} maxLength={30}
          placeholder={"Link to Sheet"}
          inputStyle={{width:"151px", padding:"2px 4px",color:styles.colors.colorWhite, marginTop:"8px",
          color:styles.colors.colorBlack, height:"1.7rem", rows:"1",  fontSize: fontSize[2],
          borderRadius:"4px",background:styles.colors.colorWhite+"9c", borderWidth:"0px", cursor:"text",
          }}
          
        /></div>)
        }


  <div className='hover-container' style={{marginLeft:"-11px"}}>
    {obj?.getJson().isToken===true &&
              (<TokenImage pic={obj?.getJson().picURL} width={width-8} app={app} colors={colors}/>)
              ||
              
              (<div>
                <img src={obj?.getJson().picURL} style={{minWidth:width+"px", minHeight:width+"px", maxWidth:width+"px", maxHeight:width+"px",
              marginLeft:"2vw", display:"flex", alignItems:"center", justifyContent:"center", objectFit:"contain",
              marginRight:"30px", }}/>
              
              
              <img src={obj?.getJson().picURL} style={{minWidth:width+"px", minHeight:width+"px", maxWidth:width+"px", maxHeight:width+"px",
              marginLeft:"2vw", display:"flex", alignItems:"center", justifyContent:"center", position:"absolute", top:5, objectFit:"contain",
              mixBlendMode:"multiply", opacity:"44%", zIndex:"-10",
              filter:"contrast(5%) brightness(0%) blur(2px)",
              marginRight:"30px", }}/>
              </div> )
    }
                            <div className='hover-div' style={{ position: "absolute", 
                            display: "flex", 
                            flexDirection: "row",
                            justifyContent: "center", 
                            alignItems: "center", 
                            padding: "8px", 
                            borderRadius: "11px",
                            width: "190px", 
                            background: styles.colors.colorBlack, 
                            left: 0, 
                            top: -5 
                            }}>
                              <div style={{fontSize:styles.fonts.fontSmallest,  color:styles.colors.colorWhite, width:"fit-content"}}>Show Token Border?</div>
                                <ParentFormComponent obj={this.props.obj} name="isToken"
                                  prepareRun={true} wrapperStyle={{ width:"fit-content", height:"fit-content",alignContent:"center", justifyContent:"center", alignContent:"center", alignItems:"center", alignText:"center",}}
                                    type={"checkbox"} 
                                    inputStyle={{padding:"2px 4px",color:styles.colors.colorWhite,
                                    color:styles.colors.colorBlack,  fontSize: fontSize[0],
                                    }}
                                    
                                  /></div> 
</div>



                          <div    className='hover-btn'     title="Name"         
                          style={{display: "flex", height:"fit-content", width:"fit-content", fontWeight:"bold", fontFamily:"serif", 
                          textDecoration: styles.colors.colorWhite+"88 underline", textDecorationThickness: "1px", textUnderlineOffset: "4px",
                          textShadow:"1px 1px 0 "+styles.colors.colorBlack,  marginRight:".5vw", border: borderGradient,
                          alignSelf:"center", borderRadius:"11px",
                          alignItems:"center", justifyContent:"center", fontSize:fontSize[0],
                         }}>
                           <ParentFormComponent obj={this.props.obj} name="name"
                            prepareRun={true} maxLength={30}
                            
                              inputStyle={{width:"520px", padding:"4px 9px", color:styles.colors.colorWhite, height:"1.7rem", rows:"1", 
                              fontSize:fontSize[0],  cursor:"text",
                              borderRadius:"11px", 
                              background: "linear-gradient(90deg, "+styles.colors.colorBlack+"5c, "+colors[0]+"11,"+styles.colors.colorBlack+"5c)", borderWidth:"0px", alignItems:"center",textAlign:"center",justifyContent:"center",
                              }}
                              
                           />
                          </div>

                          <div title="Initiative Bonus" className='hover-btn'
                            style={{
                              display: "flex",
                              background:styles.colors.colorBlack,
                             padding:"11px", borderRadius:"11px",
                              alignSelf: "center",
                              alignItems: "center",
                              justifyContent: "center",
                              flexDirection: "column", 
                              textAlign: "center",marginRight:"5px",
                            }}
                          >
                            <div style={{ alignSelf: "center", fontSize: fontSize[1], }}>Initiative Bonus</div>

                            <ParentFormComponent obj={this.props.obj} name="initiative"
                          prepareRun={true} maxLength={4} label={"+"}
                          //placeholder={obj?.getJson().hp}
                             inputStyle={{width:"3.4rem", padding:"4px 9px",color:styles.colors.colorWhite, marginTop:"8px",
                             color:styles.colors.colorBlack, height:"1.7rem", rows:"1", fontSize: styles.fonts.fontNormal,
                             borderRadius:"4px",background:styles.colors.colorWhite+"9c", borderWidth:"0px", cursor:"text",}}
                            />

                          </div>
                          
                          <div title="AC" className='hover-btn'
                            style={{
                              display: "flex",
                              background:styles.colors.colorBlack,
                             padding:"11px", borderRadius:"11px",
                              alignSelf: "center",
                              alignItems: "center",
                              justifyContent: "center",
                              flexDirection: "column", 
                              textAlign: "center",marginRight:"5px",
                            }}
                          >
                            
                            <div style={{ alignSelf: "center", fontSize: fontSize[1], }}>AC</div>

                            <ParentFormComponent obj={this.props.obj} name="ac"
                            prepareRun={true} maxLength={2}
                            
                              inputStyle={{width:"3.4rem", padding:"4px 9px", color:styles.colors.colorWhite, marginTop:"8px",
                              color:styles.colors.colorBlack, height:"1.7rem", rows:"1", fontSize: styles.fonts.fontNormal,
                              borderRadius:"4px",background:styles.colors.colorWhite+"9c", borderWidth:"0px", cursor:"text",
                              }}
                           style={{ alignSelf: "center", fontSize: fontSize[1], }}/>

                          </div>

                          <div title="Max HP" className='hover-btn'
                            style={{
                              display: "flex",
                              background:styles.colors.colorBlack,
                             padding:"11px", borderRadius:"11px",
                              alignSelf: "center",
                              alignItems: "center",
                              justifyContent: "center",
                              flexDirection: "column", 
                              textAlign: "center",marginRight:"5px",
                            }}
                          >
                            <div style={{ alignSelf: "center", fontSize: fontSize[1], }}>Max HP</div>

                            <ParentFormComponent obj={this.props.obj} name="hp" 
                          prepareRun={true} maxLength={4}
                             inputStyle={{width:"3.4rem", padding:"4px 9px", color:styles.colors.colorWhite, marginTop:"8px",
                             color:styles.colors.colorBlack, height:"1.7rem", rows:"1", fontSize: styles.fonts.fontNormal, cursor:"text",
                             borderRadius:"4px",background:styles.colors.colorWhite+"9c", borderWidth:"0px",}}/>

                           
                          </div>

                         
                        {/* {{ACTIVE CONDITIONS}} */}
                        
                        {/* {activeConList &&
                        <div style={{display: 'flex', flexWrap: 'wrap',  width:"fit-content", opacity:"79%", 
                        alignContent:"flex-start", marginLeft:"3px",
                        color:styles.colors.colorWhite, flexDirection:"column", width:"100%",
                        maxHeight:"112px",
                        padding:"0px 4px",}}>
                        {activeConList.slice(0, maxCon).map((word, index) => {
                                  
                                  return (
                          <div style={{display: 'flex', flexDirection:"row", justifyContent:"flex-start", alignSelf:"flex-start", maxWidth:"240px",}}>
                            {word.getJson().name && word.getJson().name!=="" &&
                            <div  key={index}
                            style={{
                              fontSize:fontSize[1], textAlign:"flex-start",
                              width:"fit-content", padding:word.getJson().name==="Dead"?"2px 8px":"2px", 
                              alignSelf:"flex-end", alignSelf:"flex-end",
                              color:word.getJson().name==="Dead"?styles.colors.color5:styles.colors.colorWhite,
                              fontWeight: word.getJson().name==="Dead"?600:200,
                              borderRadius:"11px",
                              border:  word.getJson().name==="Dead"?"1px solid "+styles.colors.color6:"",
                              
                               }}>
                              {word.getJson().name}
                            </div>}
                            
                              <div style={{
                              fontSize:fontSize[2], alignSelf:"center",
                              
                            width:"fit-content", marginRight:"32px", marginLeft:"4px", opacity:word.getJson().name==="Dead"?"0%":"70%",
                              }}>
                               {"("+word.getJson().roundsActive+")"}
                          
                            
                              </div>
                              
                            </div>)
  })}
                          </div>   }       */}
        </div>
        <div style={{width:"100%", display:"flex", flexDirection:"row", marginBottom:"11px",
       justifyContent:"flex-start"}}>
        <ConnectToCampaignSwitch app={app} {...this.props} />
        </div>                       

                </div>
                
        </div>
        
        </div>

        

        </div>
    )
  }
  }


