import { Component } from 'react';
import MapComponent from '../componentListNPM/mapTech/mapComponent';
import AddParticipant from './AddParticipant';
import placeholder from '../pics/placeholderEncounter.JPG';
import speaker from '../pics/speaker.png';
import { Link } from 'react-router-dom';
import MonsterMapItem from './monsterMapItem';
import TokenImage from './tokenImage';
import AddEncounter from './AddEncounter';
import ToggleItem from './toggleItem';
import Draggable from 'react-draggable';
import sortImg from '../pics/sortInit.png';
import pause from '../pics/pauseInit.png';
import back from '../pics/backArrow.webp'
import forward from '../pics/forward.png'
import toolService from '../services/toolService';
import PostLogButton from '../componentListNPM/componentForms/buttons/postLogButton';
import backarrow from '../pics/backArrow.webp';
import auth from '../services/auth';
import trash from '../pics/delSkull.png';
import { update } from 'lodash';

export default class Encounter extends Component {
  constructor(props) {
    super(props);
    this.lastClicked = Date.now();
   
    this.state = {
      
      showMonsterMap: true,
      isRunning: false,
      currentTurn: "99999",
      justUpdatedInitiative: false,
    }
    this.currentIndex = "-1";
  }

  //TAYLOR. this component refuses to refresh correctly (for me)
  ///
 
  async componentDidMount(){
    let componentList = this.props.app.state.componentList;
        this.setState({showMonsterMap: false});
    await componentList.sortSelectedList("monster","lastInit",true);
        this.setState({showMonsterMap: true})
    await this.props.app.state.opps.run()
    let href = window.location.href;
    let splitURL = href.split("/")
    let id = splitURL[splitURL.length-1]
    let component = this.props.app.state.componentList.getComponent("encounter", id);
    await this.setState({obj: component, currentTurn: component?.getJson().currentTurn, isRunning:component?.getJson().isRunning,
      currentIndex: component?.getJson().currentIndex,});
     toolService.rerenderTimeout(this.props.app.dispatch, 1);
    
    
    let dispatch = this.props.app.dispatch;
    dispatch({popUpSwitchcase: "", });
    
  }
  
    
  getEncounterId() {
    const path = window.location.pathname;
    const parts = path.split('/');
    const id = parts.pop();
    const newId = "E"+id;
    return newId;
  }

async updateMonster(obj, update){
  let app = this.props.app;
    let state = app.state;
    let opps = state.opps;

  await obj?.setCompState({...update});
  await opps.cleanPrepareRun({update:obj});
}

  getNextHighestInitiative = async (participantList, dispatch) => {
    let app = this.props.app;
    let state = app.state;
    let opps = state.opps;
    
    const now = Date.now();
    if (now - this.lastClicked < 90) {
      return;
    }
    this.lastClicked = now;
    let obj = this.state.obj;
    let highestLastInit = 0;

    if (obj?.getJson().currentTurn === undefined) {
      await this.updateMonster(obj, { currentTurn: this.state.currentTurn } )
    }
  
    const sortedList = await [...participantList].sort((a, b) => {
      return parseInt(b.getJson().lastInit, 10) - parseInt(a.getJson().lastInit, 10);
    });
  
    //  If currentTurn is '99999', set it to the highest initiative in the list.
    if (obj?.getJson().currentTurn === "99999") {
      highestLastInit = parseInt(sortedList[0].getJson().lastInit, 10);
    
      await this.updateMonster(obj, { currentTurn: highestLastInit });
      await this.setState({ currentTurn: highestLastInit });
    
      // Set currentTurn for each participant and find the participant with the highest initiative
      let highestInitiativeParticipant = null;
      for (const participant of participantList) {
        await this.updateMonster(participant, { currentTurn: highestLastInit });
        if (parseInt(participant.getJson().lastInit, 10) === highestLastInit) {
          highestInitiativeParticipant = participant;
        }
      }
    
      await this.updateMonster(obj, { currentIndex: 0, isRunning: true });
      this.currentIndex = 0; // Set to the first index
    
      // Update conditions for the participant with the highest initiative
      if (highestInitiativeParticipant) {
        const conditionList = await this.props.app.state.componentList.getList("condition", highestInitiativeParticipant.getJson()._id, "monsterId");
        for (const condition of conditionList) {
          if (condition.getJson().isActive === true) {
            let number = parseInt(condition.getJson().roundsActive, 10) + 1;
            condition.setCompState({ roundsActive: number.toString() });
            await this.props.app.dispatch({
              operate: "update", operation: "cleanPrepareRun", object: condition
            });
          }
        }
      }
    
      return;
    }
    
  
    this.currentIndex = (this.currentIndex + 1) % sortedList.length;

    if (this.currentIndex >= 0) {
        const nextHighestLastInit = parseInt(sortedList[this.currentIndex]?.getJson().lastInit, 10);

        await this.setState({ currentTurn: nextHighestLastInit });
        await this.updateMonster(obj, { currentTurn: nextHighestLastInit });

        let p = undefined;
        for (const participant of participantList) {
            await this.updateMonster(participant, { currentTurn: nextHighestLastInit });
            if (parseInt(participant.getJson().lastInit, 10) === nextHighestLastInit) {
                p = participant;
            }
        }

        if (p) {
            const conditionList = [...this.props.app.state.componentList.getList("condition", p?.getJson()._id, "monsterId")];
            for (const condition of conditionList) {
                if (condition.getJson().isActive === true) {
                    let number = parseInt(condition.getJson().roundsActive, 10) + 1;
                    condition.setCompState({ roundsActive: number.toString(), encounterId: toolService.getIdFromURL() });
                    dispatch({
                        operate: "update", operation: "cleanPrepareRun", object: condition
                    });
                }
            }
        }
        await this.setState({ justUpdatedInitiative: true });
    }
};
  

stopInitiative = async (participantList, dispatch) => {
  let obj = this.state.obj;
  let high = "99999";

  // Resetting the encounter object
  await this.updateMonster(obj, { currentTurn: high, currentIndex: -1 });
  this.currentIndex = -1; // Set to the first index
  await this.setState({ currentTurn: high, currentIndex: -1 });

  // Resetting each participant's currentTurn
  for (const participant of participantList) {
    await this.updateMonster(participant, { currentTurn: high });
  }

  // Resetting conditions
  let eid = toolService.getIdFromURL();
  const conditionList = await this.props.app.state.componentList.getList("condition", eid, "encounterId");
  for (const condition of conditionList) {
    condition.setCompState({ roundsActive: "0" });
    dispatch({
      operate: "update", operation: "cleanPrepareRun", object: condition
    });
  }
};


  handleKeyDown = async (e) => {
    let app = this.props.app;
    let state = app.state;
    let dispatch = app.dispatch;
    let obj = this.state.obj;
    const participantList = [...state.componentList.getList("monster", this.state.obj?.getJson()._id, "encounterId")];
    if (e.key === 'Enter') {
      e.preventDefault(); 
      if (obj?.getJson().isRunning){
        this.getNextHighestInitiative(participantList, dispatch);
         }
    }
  };


  render() {
    let app = this.props.app;
    let state = app.state;
    let dispatch = app.dispatch;
    let componentList = state.componentList;
    let styles =state.styles;
    let showMonsterMap = this.state.showMonsterMap;
    let obj = this.state.obj;
    let audioLink = toolService.convertStringToLink(this.state.obj?.getJson().audio);

    const playPause = (obj?.getJson().isRunning)?pause:back;
    let participantList = [...state.componentList.getList("monster", this.state.obj?.getJson()._id, "encounterId")];
    let twoParty = participantList.length;
    
    return (
      <div style={{width:"100%", height:"100%", }}>

{obj?.getJson().campaignId &&
<Link className="hover-btn-highlight"
          to={obj?.getJson().loreId?/campaign/+obj?.getJson().campaignId+"-"+obj?.getJson().loreId:/campaign/+obj?.getJson().campaignId} 
          style={{...styles.buttons.buttonAdd, textDecoration:"none", fontStyle:"italic", border:"",
         padding:"8px 8px", cursor:"pointer", background:"", boxShadow:"",
          fontWeight:"bold", letterSpacing:".05rem", marginBottom:"10px", fontSize:".9rem" }}
          >
            <img style={{width:".9rem", opacity:"98%", marginRight:"8px"}}
            src={backarrow}
            />
            Back
          </Link>}

          {/* <RETURN TO LORE BUTTON> */}

            <div style={{color: styles.colors.colorWhite,
              ...styles.backgroundContent,
              backgroundImage: 'url('+(this.state.obj?.getJson().picURL||placeholder)+')',
          }}>


          <div style={{...styles.popupSmall, fontSize:styles.fonts.fontSubheader2, fontFamily:"serif",
                        color: styles.colors.colorWhite,}}>

         {obj?.getJson().name}

         {/* <div style={{position:"absolute", marginTop:"-.8%", opacity:".1", fontSize:styles.fonts.fontSmallest}}>{this.getEncounterId()}</div> */}

         {state.popUpSwitchcase === "updateEnc" && <>
                           <AddEncounter app={app} 
                           //obj={this.state.obj}
                           />
                          </> }

          {state.popUpSwitchcase !== "updateEnc" && <div style={{width:"100%", display:"flex", flexDirection:"row", justifyContent:"right", position:"absolute", top:"4%", right:".25%"}}>
                          <div className="hover-btn" style={{... styles.buttons.buttonAdd,  borderRadius:"1rem", width:"fit-content",
                           fontSize:styles.fonts.fontSmallest, padding:"5px", 
                           backgroundColor:styles.colors.color1+"ee", 
                                        position:"absolute", width:"fit-content",
                                        justifyContent:"center"}}

                                        onClick={ async ()=>{
                                          // console.log(this.state.obj);
                                          await dispatch({
                                            operate: "update", 
                                            operation: "cleanPrepare", 
                                            popUpSwitchcase: "updateEnc", 
                                          object:this.state.obj 
                                        })
                                        ;
                                        
                                        }}
                                        >
                                          Edit Encounter</div>
                              </div>}             

         <div style={{fontSize:styles.fonts.fontBody, color:styles.colors.colorWhite, marginTop:"2vh"}}>

                  <div style={{fontSize:styles.fonts.fontSmall,}}>
                  {this.state.obj?.getJson().description}
                  </div>

{ this.state.obj?.getJson().audio !== "" &&
      <div style={{display:"flex", marginTop:"5px", fontSize:styles.fonts.fontSmall,
        flexDirection:"row"}}>
          <a href={audioLink} target="_blank" rel="noopener noreferrer" 
          style={{fontSize:styles.fonts.fontSmall, marginBottom:"2px", cursor:"pointer",  color:styles.colors.colorWhite}}
                 title={audioLink} >
        <img src={speaker}
         style={{fontSize:styles.fonts.fontSmall, width:"26px", marginRight:"4px", objectFit:"cover",
        }}/>
                  
                {this.state.obj?.getJson().audio}
                  </a>
      </div>}


</div>


<div style={{width:"100%", display:"flex", flexDirection:"row", justifyContent:"right"}}>

{!obj?.getJson().isRunning &&
<div className="hover-btn" style={{...styles.buttons.buttonAdd, background:styles.colors.color2,
paddingTop:"3px", paddingBottom:"3px", fontSize:styles.fonts.fontSmall, cursor:!obj?.getJson().isRunning?"pointer":"wait"}} 
            onClick={ async ()=>{
              // this.setState({showMonsterMap: false});
              if (!obj?.getJson().isRunning){
                          if (!state.currentCampaign){
                          let campId = await obj.getJson().campaignId;
                          
                          await dispatch({
                            currentCampaign: componentList.getComponent("campaign", campId, "_id")
                          })
                        }
                let players = await state.currentCampaign?.getPlayers(state.componentList);
                
                await dispatch({
                             campaignPlayers: players,
                           })
                
                await obj.addCampaignPlayers(state.campaignPlayers, obj.getJson()._id, state);               
                 ;
                 this.setState({showMonsterMap: true})
          }
          await this.setState({showMonsterMap: true})
            }}
            >
          Add All Players
              </div>}


<div className="hover-btn" style={{...styles.buttons.buttonAdd, animation: "gradient-animation 10s ease-in-out infinite",
background:!obj?.getJson().isRunning?styles.colors.color2:"linear-gradient(0deg, "+styles.colors.color6+", "+styles.colors.color1+"88)",
paddingTop:"3px", paddingBottom:"3px", fontSize:styles.fonts.fontSmall, cursor:!obj?.getJson().isRunning?"pointer":"wait"}} 
            onClick={()=>{
              if (!obj?.getJson().isRunning){
            dispatch({operate: "addmonster", operation: "cleanJsonPrepare", 
            popUpSwitchcase: "addMonster",  object: {encounterId: this.state.obj?.getJson()._id, colors:[], 
              campaignId: this.state.obj?.getJson().campaignId},
        })}
            }}>
          {!obj?.getJson().isRunning?"Add New Creature to this Encounter":"Encounter is Running..."}
              </div>
              </div>

        </div>
          </div>

          
<div style={{color:styles.colors.colorWhite, width:"100%", height:"100%", }}>
            {(state.currentComponent?.getJson().type === "monster" && state.popUpSwitchcase === "addMonster") 
            &&  
            <div style={{padding:"22px"}}>
              
              <AddParticipant app={app}/></div>}

{/* HEADER */}
            {showMonsterMap && 
              <div  style={{display:"flex", flexDirection:"row", width:"100%", 
              backgroundColor:styles.colors.color7+"55", height:"60px", paddingTop:"4px", borderRadius:"12px",
              marginTop:"20px",}}>

                
                {twoParty >= 2 && (
                <div 
                title="Sort"
                  style={{ opacity:"87%",  cursor:"pointer", alignItems:"center", display:"flex",
                  marginLeft:"19px",
                   fontSize:styles.fonts.fontSmallest, color:styles.colors.color3}}
                  onClick={ async ()=>{
                    await this.setState({showMonsterMap: false});
                    await componentList.sortSelectedList("monster","lastInit",true)
                    await this.setState({showMonsterMap: true});
                    dispatch({});
                  }
                  }
                >
                  {/* sort */}
                   <img src={sortImg} 
                  style={{
                    width:"25px", 
                    }}/>

               
                </div>
                 )
                 ||
                 (
                  !obj?.getJson().isRunning &&
                 <div style={{ alignItems:"center", display:"flex",
                 marginLeft:"19px", alignSelf:"center", alignContent:"center", textAlign:"center", 
                  fontSize:styles.fonts.fontSmall, color:styles.colors.colorWhite+"2c"}}> 
                  Add more to this encounter to run it. </div>)
                 } 
{/* NEXT     TURN */}

            {obj?.getJson().isRunning &&
                    <div className="indent-on-click" style={{marginLeft:"45px", cursor:"pointer", display:"flex", justifyContent:"space-evenly", 
              textAlign:"center",verticalAlign:"center", height:"fit-content", alignSelf:"center", width:"fit-content",
              border:"1px solid "+styles.colors.color7, borderRadius:"11px", padding:"5px 9px",}}
                    onClick={ async ()=>{
                      if (obj?.getJson().isRunning){
                          this.getNextHighestInitiative(participantList, dispatch);
                           }
                    }}
                    tabIndex={0} // Make the div focusable
                    onKeyDown={(e) => this.handleKeyDown(e)}
                    
                    >
                    <div
                    style={{fontSize:styles.fonts.fontSmallest, width:"fit-content",
                      color:styles.colors.colorWhite, }}>
                      
                     
                    </div> 
                    <div style={{fontSize:styles.fonts.fontSmall, width:"fit-content",
                      color:styles.colors.colorWhite, }}>Next Turn</div>
                    <img 
                      src={forward} style={{width:"30px", height:"30px", marginLeft:"14px", 
                      }} /> 
                    </div>}

              {/* RUN BUTTON */}
              {(twoParty >= 2 || obj?.getJson().isRunning) && (  
              <div className="indent-on-click" style={{marginLeft:obj?.getJson().isRunning?"70%":"40px", cursor:"pointer", display:"flex", justifyContent:"space-evenly", 
              textAlign:"center",verticalAlign:"center", height:"fit-content", alignSelf:"center", position:"relative",
              
              border:obj?.getJson().isRunning?"1px solid "+styles.colors.color5:"1px solid "+styles.colors.color7, borderRadius:"11px", padding:"5px 9px",}}
                        onClick={async () => {
                          this.setState({showMonsterMap: false});
                          let run = obj.getJson().isRunning;
                          this.setState({ isRunning: !run }, async () => {  // Update the component state and wait
                            // console.log(this.state.isRunning)
                            
                            if (this.state.isRunning===true) {
                              this.getNextHighestInitiative(participantList, dispatch);  // Run logic
                              state.opps.run();
                              obj.setCompState({ isRunning: true });
                              
                            } else {
                              this.stopInitiative(participantList, dispatch);
                              obj.setCompState({ isRunning: false });
                              state.opps.cleanPrepareRun({update: obj});
                              this.setState({ isRunning: false });
                             
                            }
                            await componentList.sortSelectedList("monster", "lastInit", true);
                            await this.setState({showMonsterMap: true});
                            dispatch({
                              operate: "update",
                              operation: "cleanPrepareRun",
                              obj: obj
                            });
                          });
                        }}>
                         
                    <div 
                    
                    style={{ 
                    fontSize:styles.fonts.fontSmall, width:"80px",
                      color:styles.colors.color3+"cc", }}>
                      {obj?.getJson().isRunning?"Stop":"Run"}
                     
                    </div>
                    
                    <img 
                      src={playPause} style={{width:"20px", height:"20px", 
                      transform:obj?.getJson().isRunning?"":"rotate(180deg)"}} />
                       
                    </div>)}

                    


                </div>
                }
               
               <div>{obj?.getJson()?.loreId!=="" && obj?.getJson()?.loreId!==undefined &&(
                  <div>
               
                    {/* <img  src = {state.componentList.getComponent("map", obj.getJson().loreId, "loreId")?.getJson()?.picURL} style={{width:"500px", height:"500px"}}/> */}
                    
                  </div>


               )}</div>

                

                {showMonsterMap &&
                <div style={{marginTop:"28px", width:"100%", marginBottom:"24vh", }}>

                  {(twoParty >= 2) &&
                  <div style={{display: "flex",flexDirection: "row",alignContent:"flex-end", justifyContent:"flex-end", width:"220px"}}>
                      <PostLogButton app={app} obj={obj} altText={"initiative"} text={"Log Initiative"}
                              //ENCOUNTER MUST HAVE CAMPAIGN ID 
                              campaignId={this.state.obj?.getJson().campaignId}
                      />
                    </div>         }
                          
            <MapComponent 
             filter={{search: toolService.getIdFromURL(), attribute: "encounterId"}}
             app={app} name={"monster"} 
             delOptions={{picURL:trash, warningMessage:"Delete this character (this is permanent)",
             textStyle:{ fontSize:styles.fonts.fontSmallest,}, 
              style:{width:"35px", height:"35px", padding:"4px 2px",
               display:"flex", flexDirection:"row",
              alignItems:"center", borderRadius:"8px", 
              justifyContent:"center" },}}
             cells={!obj?.getJson().isRunning?[
              {custom:MonsterMapItem, props:{app:app, currentTurn:this.state.currentTurn, }},
              ///TAYLOR THIS NEEDS TO RERENDER THE PAGE??
               "delete",
              //{custom:ToggleItem, props:{items:["copy","delete",], app:app}}
              ]:
            [{custom:MonsterMapItem, props:{app:app, currentTurn:this.state.currentTurn, }} ]
            }
            
            theme={"selectByImageSmall"}
            /></div>}
</div>       


      </div>

    )
  }
}

