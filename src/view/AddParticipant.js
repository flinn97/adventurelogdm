import { Component } from 'react';
import "../App.css"
import RunButton from '../componentListNPM/componentForms/buttons/runButton';
import ParentFormComponent from '../componentListNPM/componentForms/parentFormComponent';
import CardPractice from './CardPrac';
import Upload from './upload';
import placeholder from '../pics/dragon.jpg';
import ColorThief from 'colorthief';
import TokenImage from './tokenImage';
import colorService from '../services/colorService';
import ConditionService from '../services/conditionService';
import idService from '../componentListNPM/idService';
import randomTextService from '../services/randomTextService';


export default class AddParticipant extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pic: undefined,
      colors: [],
      copyCount: 1,
      name:'',
    };
    this.colorThief = new ColorThief();

  }

  getEncounterId() {
    const path = window.location.pathname;
    const parts = path.split('/');
    const id = parts.pop();
    this.setState({ encounterId: id, parentId: id, });
    return id;
  }

  render() {

    let app = this.props.app;
    let state = app.state;
    let dispatch = app.dispatch;
    let componentList = state.componentList;
    let styles =state.styles;
    
    let randomInit = (Math.floor(Math.random() * 9)).toString();
    let randomAC = (Math.floor(Math.random() * 12) + 10).toString();
    let randomHP = randomTextService.pickHPNotation();

    const { colors } = this.state;
    

const divStyle = colors?.length
                        ? {
                          background: `linear-gradient(45deg, ${colors[0]},  ${colors[1]}, ${colors[2]})`,
                          // transition: "background ease-out 4s",
                          ...styles.backgroundContent,
                          transitionDelay:"0ms", transition: "all",
                            transitionDuration:"9000ms"
                        }
                        : { 
                          ...styles.backgroundContent,
                          // transition: "background ease-out 4s",
                          transitionDelay:"0ms", transition: "all",
                            transitionDuration:"9000ms"
                        };

  function randomFourDigitNumber() {
      let num = Math.floor(Math.random() * 9000) + 1000;
      while(num < 1000 || num > 9999) {
          num = Math.floor(Math.random() * 9000) + 1000;
      }
      return num;
  }
  const currentDate = new Date();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const num = randomFourDigitNumber();
    
    function getEncounterId() {
      const path = window.location.pathname;
      const parts = path.split('/');
      const id = parts.pop();
      return id;
    }
    

    function pickLink () {
      
      let links =["www.dndbeyond.com/monsters/16765-adult-blue-dragon", "www.dndbeyond.com/monsters/17093-pteranodon", "app.spawnrpg.com", "app.spawnrpg.com/statblocks",];
      let randomNumber2 = Math.floor(Math.random() * (links.length));
      let chosenLink = links[randomNumber2];

      return chosenLink;
    }

    function pickNote () {
      
      let notes =[
        "This monster is hiding in a barrel.", "The giant slug attacks on round 3.", "His ferocious pet monkey arrives on round 4.",
         "You can put little reminders for the monster here, you can edit them later.",
          "You can put little reminders for the monster here, you can edit them later.",
           "Doesn't roll initiative. Doesn't arrive until round 4.",];

      return randomTextService.pickFromArray(notes);
    }

let creature = randomTextService.pickName();
let linkExample = pickLink();
let noteExample = pickNote();

const getColors = app.state.currentComponent.getColorList();

let countPlus = this.state.copyCount;
let RunText = countPlus===1?"Add to Encounter":"Add to Encounter (x"+countPlus.toString()+')';

    return (
     
     
        <div style={{...styles.backgroundContent, 
      }}>
   <div style={divStyle}>     
 <div style={{display: "flex", width:"100%", flexDirection:"column", padding:"22px", justifyContent:"right",...styles.popupSmall,
background:styles.colors.color1+"bb", borderWidth:"3px",

borderColor:this.state.colors?.length?colors[1]: styles.popupSmall.border,
transitionDelay:"0ms", transition: "all",
transitionDuration:"9000ms"
}}>

<div style={{display: "flex", width:"100%", flexDirection:"row", justifyContent:"right"}}>
      <div onClick={()=>{dispatch({popUpSwitchcase: ""})}}
       style={{...styles.buttons.buttonClose, position:""}}>X</div>
</div>

<div style={{ display: "flex", width:"45%", flexDirection:"row", alignItems:"center", }}>

    <TokenImage pic={this.state.pic} app={app} width={110} colors={colors}/>

              <Upload
            text={"Choose an image"}
            update={true}
            obj={app.state.currentComponent}
            skipUpdate={true}
            colors={this.state.colors}
            changePic={async (pic) => {
              await this.setState({ pic: pic });
              
              let colors = colorService.updateColors(pic, (palette) => {
                this.setState({ colors: palette }, () => {
                                  
                  let con = palette;
                  app.state.currentComponent.setCompState({colors: con})
                  this.setState({colors: con})

                });
                
              });
            }}
            
            updateMap={async (obj) => {
              const pic = obj?.getJson().pic;
              await this.setState({ completedPic: pic });
              await colorService.updateColors(pic, palette => {
                this.setState({ colors: palette }, () => {

                  let con = palette;
                  app.state.currentComponent.setCompState({colors: con})
                  this.setState({colors: con})
                  
          obj.setCompState({color:con, colors: con});
                });
              });
            }}
            app={app}
          />
       
</div>
      <ParentFormComponent app={app} name="name" label="Name" value={this.state.name} 
              wrapperStyle={{margin: "5px", color:styles.colors.colorWhite, display:"flex",flexDirection:"column"}}
              theme={"adventureLog"} rows={1}
              maxLength={110}
              labelStyle={{marginBottom:"8px",}}
              inputStyle={{width:"58.1rem", padding:"4px 9px", color:styles.colors.colorBlack, height:"1.7rem", rows:"1",
              borderRadius:"4px",background:styles.colors.colorWhite+"9c", borderWidth:"0px",
              }}
              placeholder={"ie: "+creature}/>

<div style={{display:"flex",flexDirection:"row", width:"58.1rem", justifyContent:"space-around", marginBottom:"20px"}}>

      <ParentFormComponent app={app} name="initiative" label="Initiative Bonus" wrapperStyle={{margin: "5px", color:styles.colors.colorWhite, display:"flex",flexDirection:"column"}}
              theme={"adventureLog"} rows={1}
              maxLength={2}
              labelStyle={{marginBottom:"8px",}}
              inputStyle={{width:"6.8rem", padding:"4px 9px", color:styles.colors.colorBlack, height:"1.7rem", rows:"1",
              borderRadius:"4px",background:styles.colors.colorWhite+"9c", borderWidth:"0px",
              }}
              placeholder={"ie: "+randomInit}/>

      <ParentFormComponent app={app} name="armor" label="Armor Class" 
      wrapperStyle={{margin: "5px", color:styles.colors.colorWhite, display:"flex",flexDirection:"column"}}
              theme={"adventureLog"} rows={1}
              maxLength={2}
              labelStyle={{marginBottom:"8px",}}
              inputStyle={{width:"7.2rem", padding:"4px 9px", color:styles.colors.colorBlack, height:"1.7rem", rows:"1",
              borderRadius:"4px",background:styles.colors.colorWhite+"9c", borderWidth:"0px",
              }}
              placeholder={"ie: "+randomAC}/> 

      <ParentFormComponent app={app} name="hitPoints" label="HP" 
            wrapperStyle={{margin: "5px", color:styles.colors.colorWhite, display:"flex", flexDirection:"column"}}
                    theme={"adventureLog"} rows={1}
                    maxLength={10}
                    labelStyle={{marginBottom:"8px",}}
                    inputStyle={{width:"7.2rem", padding:"4px 9px", color:styles.colors.colorBlack, height:"1.7rem", rows:"1",
                    borderRadius:"4px",background:styles.colors.colorWhite+"9c", borderWidth:"0px",
                    }}
                    placeholder={"ie: "+randomHP}/> 
</div>
      <ParentFormComponent app={app} name="statBlockLink" label="Stat Block Link" 
      wrapperStyle={{margin: "5px", color:styles.colors.colorWhite, display:"flex",flexDirection:"column"}}
              theme={"adventureLog"} rows={1}
              maxLength={200}
              labelStyle={{marginBottom:"8px",}}
              inputStyle={{width:"58.1rem", padding:"4px 9px", color:styles.colors.colorBlack, height:"1.7rem", rows:"1",
              borderRadius:"4px",background:styles.colors.colorWhite+"9c", borderWidth:"0px",
              }}
              placeholder={"ie: "+linkExample}/> 
<div style={{marginBottom:"2vh"}}>
      <ParentFormComponent app={app} name="notes" label="Notes"
      wrapperStyle={{margin: "5px", color:styles.colors.colorWhite, display:"flex",flexDirection:"column"}}
      theme={"adventureLog"} rows={2}
      maxLength={200}
      labelStyle={{marginBottom:"8px",}}
      inputStyle={{width:"58.1rem", padding:"4px 9px", color:styles.colors.colorBlack, height:"3.7rem", rows:"1",
      borderRadius:"4px",background:styles.colors.colorWhite+"9c", borderWidth:"0px",
      }}
      placeholder={"ie: "+noteExample}/> 
</div>
<div style={{display:"flex", flexDirection:"row", justifyContent:"space-evenly", width:"58.1rem",}}>
  <div title={"This will create # number of characters in this encounter"}>
  Number to Create:
  <input style={{width:"65px", padding:"4px 9px", color:styles.colors.colorBlack, height:"1.7rem", rows:"1", marginTop:"11px",
              borderRadius:"4px",background:styles.colors.colorWhite+"9c", borderWidth:"0px", marginLeft:"22px", marginBottom:"11px",
              }}
    type="number" value={this.state.copyCount} min="1" max="20" step="1"  inputmode="numeric"
              onChange={(e) =>{
                let val = Math.floor(e.target.value)

          this.setState({copyCount: val})
              }}             
  />
  
</div>


  {/* ADD TO ENCOUNTER */}
  <RunButton className="hover-btn"
              app={app} 
              text={RunText} 
              wrapperStyle={{...styles.buttons.buttonAdd, width:"600px" }}
              callBack={ async (arr) => {
                let count = Math.floor(this.state.copyCount)-1;
                if(count>0){

                let conditions = ConditionService.getConditions();
                let id = await arr[0].getJson()?._id;
                let ogMon = arr[0];
                let maxHp = ogMon.getJson()?.hp
                
                await ogMon.setCompState({maxHp:maxHp, campaignId:state.currentCampaign.getJson()._id});

                for(let i = 0; i < count; i++){
                  let copyJson = {...ogMon.getJson(), _id:undefined};
                  await state.opps.jsonPrepare({addmonster: copyJson});
                  let newCopyMon = state.opps.getUpdater('add')[state.opps.getUpdater('add').length-1];
                  arr.push(newCopyMon);
                }
                

                for (let mon of arr){
                  
                      for(let condition of conditions)
                      {
                        condition={...condition}
                        condition.monsterId = await mon.getJson()._id;
                        condition.roundsActive = "0";
                        condition.campaignId = await mon.getJson()?.campaignId;
                        condition._id = await mon.getJson()?._id+"c"+ await idService.createId();
                        await state.opps.jsonPrepare({addcondition: condition});
                      }

                  }
                
                
                  
                
              }
              await state.opps.run();
                await dispatch({
                  popUpSwitchcase: "",
                  currentComponent: undefined,
                });
              
              }}
               
            />
</div>
         
              
          </div>
          </div></div>

    )
  }
}

