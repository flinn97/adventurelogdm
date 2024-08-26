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

export default class YourPlayersMapItem extends Component {
  constructor(props) {
    super(props);
    this.roundUpdated = false;
    this.state = {
      obj: undefined,
      pic: undefined,
      runEncounter: undefined,
      encounterId: undefined,
      showConditions: true,
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
    let dispatch = app.dispatch;
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
    
              const lastInitAsNumber = parseFloat(this.props.obj.getJson().initiative);
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
      position: "relative", borderRadius:"22px", minWidth:"800px",
      alignSelf:"flex-start", justifySelf:"flex-start", }}>
      <div className={window.innerWidth > 800?'scroller2':""}
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
        (<div  title={stat} style={{justifyContent:"center", display:"flex", marginLeft:"11px", width:"59px", textAlign:"center",
        flexDirection:"column",alignContent:"center", alignItems:"center", }}>
        <a href={stat} target='_blank'>
        <div style={{fontSize:styles.fonts.fontSmallest, opacity:".5", color:"white", marginBottom:"13px"}}>Character Sheet</div>
          <img className='hover-img' src={bookCursor} style={{width:"45px", opacity:""}}/>
          
        </a></div>)||
        ( <div title={stat} style={{justifyContent:"center", display:"flex",  width:"59px", textAlign:"center",
        marginLeft:"11px",flexDirection:"column",alignContent:"center", alignItems:"center", }}>
        <div  className='hover-btn' style={{fontSize:styles.fonts.fontSmallest, opacity:".5"}}>
        <div style={{fontSize:styles.fonts.fontSmallest, opacity:".5"}}>Character Sheet</div>
          <img src={bookCursor} style={{width:"45px", opacity:"0%", color:"white"}}/>N/A
          
        </div></div>)
        }


  <div style={{marginLeft:"-12px",}}>
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
                           
</div>



                          <div    className='hover-btn'     title="Name"         
                          style={{display: "flex", height:"fit-content", width:"fit-content", fontWeight:"bold", fontFamily:"serif", 
                          textShadow:"1px 1px 0 "+styles.colors.colorBlack,  marginRight:".5vw", border: borderGradient,
                          alignSelf:"center", borderRadius:"11px",
                          alignItems:"center", justifyContent:"center", fontSize:fontSize[0],
                         }}>
                           <div
                              style={{width:"430px", padding:"4px 9px", color:styles.colors.colorWhite, height:"1.7rem", rows:"1", 
                              fontSize:fontSize[1],  cursor:"auto",
                              borderRadius:"11px", 
                              background: "linear-gradient(90deg, "+styles.colors.colorBlack+"5c, "+colors[0]+"11,"+styles.colors.colorBlack+"5c)", 
                              borderWidth:"0px", alignItems:"center",textAlign:"center",justifyContent:"center",
                              }}
                              
                           >{obj?.getJson().name}</div>
                          </div>

                          <div title="Initiative Bonus" className='hover-btn'
                            style={{
                              display: "flex",
                              background:styles.colors.color2,
                             padding:"11px", borderRadius:"11px",
                              alignSelf: "center", height:"80px",
                              alignItems: "center",
                              justifyContent: "center",
                              flexDirection: "column", 
                              textAlign: "center",marginRight:"4px",
                            }}
                          >
                            <div style={{ alignSelf: "center", fontSize: fontSize[2],color:styles.colors.color8, }}>Initiative</div>
                            {obj?.getJson().initiative>=0?("+"+obj?.getJson().initiative):("-"+obj?.getJson().initiative)} </div>

                            <div title="Armor Class" className='hover-btn'
                            style={{
                              display: "flex",
                              background:styles.colors.color2,
                             padding:"11px", borderRadius:"11px",
                              alignSelf: "center", height:"80px",
                              alignItems: "center",
                              justifyContent: "center",
                              flexDirection: "column", 
                              textAlign: "center",marginRight:"4px",
                            }}
                          >
                            <div style={{ alignSelf: "center", fontSize: fontSize[2],color:styles.colors.color8, }}>AC</div>
                            {obj?.getJson().ac} </div>

                            <div title="Max Hit Points" className='hover-btn'
                            style={{ 
                              display: "flex",
                              background:styles.colors.color2,
                             padding:"11px", borderRadius:"11px",
                              alignSelf: "center", 
                              alignItems: "center",
                              justifyContent: "center", height:"80px",
                              flexDirection: "column", 
                              textAlign: "center",marginRight:"4px",
                            }}
                          >
                            <div style={{ alignSelf: "center", fontSize: fontSize[2],color:styles.colors.color8, }}>Max HP</div>
                            {obj?.getJson().hp} </div>
                          
                          

                            <div 
                            class='hover-btn'
                            title={"Remove from this campaign"} style={{...styles.buttons.buttonAdd, fontSize:fontSize[2], padding:"4px 11px", 
                            color:styles.colors.color5, background:styles.colors.color1+"e5", border:".5px dashed grey",
                            alignContent:"center", textAlign:"center", marginRight:"18px", marginLeft:"18px"}}
                             onClick={ async () => 
                            {
                              let component = this.props.app.state.componentList.getComponent("campaign", obj.getJson().campaignId);

                              await obj.setCompState({
                                campaignId:"",
                              })
                              
                              await dispatch({
                                operate:"update", operation:"cleanPrepareRun", object: obj, popupSwitch: "",
                              })
                              
                              let players = await component.getPlayers(state.componentList);
                              await dispatch({
                                campaignPlayers: players, popupSwitch: "viewPlayers",
                              })
                            }
                            }

                            >       
                       Remove
        </div></div></div>
        

        </div>
        
        </div>
        
        </div>
    )
  }
  }


