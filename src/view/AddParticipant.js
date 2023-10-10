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


export default class AddParticipant extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pic: undefined,
      colors: [],
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
    let randomHP = (Math.floor(Math.random() * 50) + Math.floor(Math.random() * 100)).toString();

    const { colors } = this.state;
    

const divStyle = colors?.length
  ? {
      background: `linear-gradient(45deg, rgb(${colors[0].join(',')}), rgb(${colors[1].join(',')}), rgb(${colors[2].join(',')}))`,
      ...styles.backgroundContent, bordierRadius:"3vw",
     
    }
  : { 
      ...styles.backgroundContent, 
      transition:"none",
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
    

    function pickName() {
      // Array of names
      let names =["Adult Blue Dragon", "Pterodactyl", "Slothking Druid", "Anxious Warrior", "Barbalang", "Violinist Devil", "Hedgehog Demon", "Sir Dante Rabbitlord", "Duke Dean", "Clifford the Floofy Giant"];
      let randomNumber = Math.floor(Math.random() * (names.length));
      let chosenName = names[randomNumber];

      return chosenName;

    }

    function pickLink () {
      
      let links =["www.dndbeyond.com/monsters/16765-adult-blue-dragon", "www.dndbeyond.com/monsters/17093-pteranodon", "app.spawnrpg.com", "app.spawnrpg.com/statblocks",];
      let randomNumber2 = Math.floor(Math.random() * (links.length));
      let chosenLink = links[randomNumber2];

      return chosenLink;
    }

let creature = pickName();
let linkExample = pickLink();

    return (
     
     
        <div style={{...styles.backgroundContent,
      }}>
   <div style={divStyle}>     
 <div style={{display: "flex", width:"100%", flexDirection:"column", padding:"22px", justifyContent:"right",...styles.popupSmall,
background:styles.colors.color1+"bb", borderWidth:"3px",

borderColor:colors?.length?`rgb(${colors[1].join(',')})`: styles.popupSmall.border,
transitionDelay:"0ms", transition: "all",
transitionDuration:"9000ms"
}}>

<div style={{display: "flex", width:"100%", flexDirection:"row", justifyContent:"right"}}>
      <div onClick={()=>{dispatch({popUpSwitchcase: ""})}}
       style={{...styles.buttons.buttonClose, position:""}}>X</div>
</div>

<div style={{ display: "flex", width:"45%", flexDirection:"row", alignItems:"center", }}>

    <TokenImage pic={this.state.pic} app={app} width={110} colors={this.state.colors}/>

      <Upload text={"Choose an image"} 
        update={true} obj={app.state.currentComponent} 
        skipUpdate={true}  colors={this.state.colors}
        changePic={ async (pic) => {
          await this.setState({pic:pic});
          let colors = colorService.updateColors(pic, (palette) => {
            this.setState({colors: palette});
        });
        }} 
        updateMap={ async (obj) => {
          const pic = obj?.getJson().pic;
          await this.setState({completedPic: pic});
          let colors = await colorService.updateColors(pic, (palette) => {
          this.setState({colors: palette});
        });
        }} 
        app={app}/>
       
</div>
      <ParentFormComponent app={app} name="name" label="Name"  
              wrapperStyle={{margin: "5px", color:styles.colors.colorWhite, display:"flex",flexDirection:"column"}}
              theme={"adventureLog"} rows={1}
              maxLength={110}
              labelStyle={{marginBottom:"8px",}}
              inputStyle={{width:"58.1rem", padding:"4px 9px", color:styles.colors.colorBlack, height:"1.7rem", rows:"1",
              borderRadius:"4px",background:styles.colors.colorWhite+"aa", borderWidth:"0px",
              }}
              placeholder={"ie: "+creature}/>

<div style={{display:"flex",flexDirection:"row", width:"58.1rem", justifyContent:"space-around", marginBottom:"20px"}}>

      <ParentFormComponent app={app} name="initiative" label="Initiative Bonus" wrapperStyle={{margin: "5px", color:styles.colors.colorWhite, display:"flex",flexDirection:"column"}}
              theme={"adventureLog"} rows={1}
              maxLength={2}
              labelStyle={{marginBottom:"8px",}}
              inputStyle={{width:"7.1rem", padding:"4px 9px", color:styles.colors.colorBlack, height:"1.7rem", rows:"1",
              borderRadius:"4px",background:styles.colors.colorWhite+"aa", borderWidth:"0px",
              }}
              placeholder={"ie: "+randomInit}/>

      <ParentFormComponent app={app} name="ac" label="Armor Class" 
      wrapperStyle={{margin: "5px", color:styles.colors.colorWhite, display:"flex",flexDirection:"column"}}
              theme={"adventureLog"} rows={1}
              maxLength={2}
              labelStyle={{marginBottom:"8px",}}
              inputStyle={{width:"7.1rem", padding:"4px 9px", color:styles.colors.colorBlack, height:"1.7rem", rows:"1",
              borderRadius:"4px",background:styles.colors.colorWhite+"aa", borderWidth:"0px",
              }}
              placeholder={"ie: "+randomAC}/> 

      <ParentFormComponent app={app} name="hp" label="HP" 
            wrapperStyle={{margin: "5px", color:styles.colors.colorWhite, display:"flex",flexDirection:"column"}}
                    theme={"adventureLog"} rows={1}
                    maxLength={5}
                    labelStyle={{marginBottom:"8px",}}
                    inputStyle={{width:"7.1rem", padding:"4px 9px", color:styles.colors.colorBlack, height:"1.7rem", rows:"1",
                    borderRadius:"4px",background:styles.colors.colorWhite+"aa", borderWidth:"0px",
                    }}
                    placeholder={"ie: "+randomHP}/> 
</div>
      <ParentFormComponent app={app} name="statBlockLink" label="Stat Block Link" 
      wrapperStyle={{margin: "5px", color:styles.colors.colorWhite, display:"flex",flexDirection:"column"}}
              theme={"adventureLog"} rows={1}
              maxLength={200}
              labelStyle={{marginBottom:"8px",}}
              inputStyle={{width:"58.1rem", padding:"4px 9px", color:styles.colors.colorBlack, height:"1.7rem", rows:"1",
              borderRadius:"4px",background:styles.colors.colorWhite+"aa", borderWidth:"0px",
              }}
              placeholder={"ie: "+linkExample}/> 
<div style={{marginBottom:"2vh"}}>
      <ParentFormComponent app={app} name="notes" label="Notes"
      wrapperStyle={{margin: "5px", color:styles.colors.colorWhite, display:"flex",flexDirection:"column"}}
      theme={"adventureLog"} rows={2}
      maxLength={200}
      labelStyle={{marginBottom:"8px",}}
      inputStyle={{width:"58.1rem", padding:"4px 9px", color:styles.colors.colorBlack, height:"3.7rem", rows:"1",
      borderRadius:"4px",background:styles.colors.colorWhite+"aa", borderWidth:"0px",
      }}
      placeholder={"ie: The monster is hiding in a barrel"}/> 
</div>
         {/* ADD TO ENCOUNTER */}
         <RunButton
              app={app} 
              text={"Add to Encounter"} 
              wrapperStyle={{...styles.buttons.buttonAdd, width:"600px" }}
              callBack={ async (obj) => {
                await dispatch({
                  popUpSwitchcase: "",
                  currentComponent: undefined,
                });
              }}
               // Pass colors as a prop
            />
              
          </div>
          </div></div>

    )
  }
}

