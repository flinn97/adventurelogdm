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

export default class Encounter extends Component {
  constructor(props) {
    super(props);
    this.convertToLink = this.convertToLink.bind(this);  
    this.state = {

    }
  }
 
  async componentDidMount(){
    
    await this.props.app.state.opps.run()
    let href = window.location.href;
    let splitURL = href.split("/")
    let id = splitURL[splitURL.length-1]
    let component = this.props.app.state.componentList.getComponent("encounter", id)
  this.setState({obj: component});
  let dispatch = this.props.app.dispatch;
  dispatch({popUpSwitchcase: "",});
  }
  
  
  convertToLink = (audio) => {
    if (audio) {
      if (!audio.startsWith('http://') && !audio.startsWith('https://')) {
        return 'https://' + audio;
      } else {
        return audio;
      }
    }
    return audio;
  }

    
  getEncounterId() {
    const path = window.location.pathname;
    const parts = path.split('/');
    const id = parts.pop();
    const newId = "E"+id;
    return newId;
  }

  render() {
    let app = this.props.app;
    let state = app.state;
    let dispatch = app.dispatch;
    let componentList = state.componentList;
    let styles =state.styles;
   
    let audioLink = this.convertToLink(this.state.obj?.getJson().audio);

    return (
      <div style={{width:"100%",}}>
            <div style={{color: styles.colors.colorWhite,
              ...styles.backgroundContent, 
              backgroundImage: 'url('+(this.state.obj?.getJson().picURL||placeholder)+')',
          }}>



          <div style={{...styles.popupSmall, fontSize:styles.fonts.fontSubheader2, fontFamily:"serif",
                        color: styles.colors.colorWhite,}}>

         {this.state.obj?.getJson().name}

         {/* <div style={{position:"absolute", marginTop:"-.8%", opacity:".1", fontSize:styles.fonts.fontSmallest}}>{this.getEncounterId()}</div> */}

         {state.popUpSwitchcase === "updateEnc" && <>
                           <AddEncounter app={app} 
                           //obj={this.state.obj}
                           />
                          </> }

          {state.popUpSwitchcase !== "updateEnc" && <div style={{width:"100%", display:"flex", flexDirection:"row", justifyContent:"right", position:"absolute", top:"4%", right:".25%"}}>
                          <div style={{... styles.buttons.buttonAdd,  borderRadius:"1rem", width:"fit-content",
                           fontSize:styles.fonts.fontSmallest, padding:"5px", 
                           backgroundColor:styles.colors.color1+"ee", 
                                        position:"absolute", width:"fit-content",
                                        justifyContent:"center"}}

                                        onClick={ async ()=>{
                                          console.log(this.state.obj);
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

<div style={{...styles.buttons.buttonAdd, background:styles.colors.color2,
paddingTop:"3px", paddingBottom:"3px", fontSize:styles.fonts.fontSmall,}} 
            onClick={()=>{
            dispatch({operate: "addmonster", operation: "cleanJsonPrepare", 
            popUpSwitchcase: "addMonster",  object: {encounterId: this.state.obj?.getJson()._id, colors:[],},
        })
            }}>
          Add New Creature to this Encounter
              </div>
              </div>
        </div>
          </div>

          
          
<div style={{color:styles.colors.colorWhite, width:"100%",}}>
            {(state.currentComponent?.getJson().type === "monster" && state.popUpSwitchcase === "addMonster") 
            &&  
            <div style={{padding:"22px"}}>
              
              <AddParticipant app={app}/></div>}
            
            
            <MapComponent 
             filter={{search: this.state.obj?.getJson()._id, attribute: "encounterId"}}
             app={app} name={"monster"}
            cells={[
              {custom:MonsterMapItem, props:{app:app, colors:[]}}, "delete",
              //{custom:ToggleItem, props:{items:["copy","delete",], app:app}}
              ]} 
            theme={"selectByImageSmall"}
            />
</div>       


      </div>

    )
  }
}

