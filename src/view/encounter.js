import { Component } from 'react';
import MapComponent from '../componentListNPM/mapTech/mapComponent';
import AddParticipant from './AddParticipant';
import Roll from './Roll';
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

    this.state = {

    }
  }
 
  async componentDidMount(){
    await this.props.app.state.opps.run()
    let href = window.location.href;
    let splitURL = href.split("/")
    let id = splitURL[splitURL.length-1]
    let component = this.props.app.state.componentList.getComponent("encounter", id)
  this.setState({obj: component})
  }
  
  
  convertToLink = (audio) => {
    if (audio && !audio.startsWith('htt')) {
      return 'https://' + audio;
    }
    return audio;
  }

    
  getEncounterId() {
    const path = window.location.pathname;
    const parts = path.split('/');
    const id = parts.pop();
    return id;
  }

  render() {

    let app = this.props.app;
    let state = app.state;
    let dispatch = app.dispatch;
    let componentList = state.componentList;
    let styles =state.styles;
    
    let audioLink = this.convertToLink(state.obj?.getJson().audio);


    return (
      <div>
            <div style={{color: styles.colors.colorWhite,
              ...styles.backgroundContent,
              backgroundImage: 'url('+(this.state.obj?.getJson().picURL||placeholder)+')',
          }}>
          <div style={{...styles.popupSmall, fontSize:styles.fonts.fontSubheader2, fontFamily:"serif",
                        color: styles.colors.colorWhite,
        }}>
         {this.state.obj?.getJson().name}

{/* <div>

            {(state.currentComponent?.getJson().type === "encounter" && state.popUpSwitchcase === "updateEncounter") && <AddEncounter app = {app}/>}
                {state.popUpSwitchcase != "updateEncounter" && <>
                      
                      <div style={{... styles.buttons.buttonAdd,  borderRadius:"1rem", width:"fit-content", fontSize:styles.fonts.fontSmall, 
                      padding:"5px", backgroundColor:styles.colors.color1+"ee", position:"relative",
                      justifyContent:"center"}} 
                        onClick={()=>{dispatch({operate: "update", operation: "cleanPrepare", object: this.state.obj, popUpSwitchcase: "updateEncounter"})}}>
                          Edit Campaign</div>
                     
              </>}
              
</div> */}

          

         <div style={{fontSize:styles.fonts.fontBody, color:styles.colors.colorWhite, marginTop:"2vh"}}>

                  <div style={{fontSize:styles.fonts.fontSmall,}}>
                  {this.state.obj?.getJson().description}
                  </div>

{ (this.state.obj?.getJson().audio !== "") &&
      <div style={{display:"flex", marginTop:"5px", fontSize:styles.fonts.fontSmall,
        flexDirection:"row"}}>
        <img src={speaker}
         style={{fontSize:styles.fonts.fontSmall, width:styles.fonts.fontSmall, marginRight:"12px", objectFit:"cover"}}/>
                  <a style={{fontSize:styles.fonts.fontSmall, marginBottom:"2px"}}
                  href={audioLink} target="_blank" rel="noopener noreferrer">
                {this.state.obj?.getJson().audio}
                  </a>
      </div>}


</div>


<div style={{width:"100%", display:"flex", flexDirection:"row", justifyContent:"right"}}>
<div style={{...styles.buttons.buttonAdd, background:styles.colors.color2,
paddingTop:"3px", paddingBottom:"3px", fontSize:styles.fonts.fontSmall,}} 
            onClick={()=>{
            dispatch({operate: "addmonster", operation: "cleanJsonPrepare", 
            popUpSwitchcase: "addMonster",  object: {encounterId: this.state.obj?.getJson()._id},
        })
            }}>
          Add New Creature to this Encounter
              </div>
              </div>
        </div>
          </div>

<div style={{color:styles.colors.colorWhite}}>
            {(state.currentComponent?.getJson().type === "monster" && state.popUpSwitchcase === "addMonster") 
            && 
            <div style={{padding:"22px"}}>
              
              <AddParticipant app={app}/></div>}
            
            <MapComponent 
             filter={{search: this.state.obj?.getJson()._id, attribute: "encounterId"}}
             app={app} name={"monster"}
            cells={[
              {custom:MonsterMapItem, props:{app:app}}, "delete",
              {custom:ToggleItem, props:{items:["copy","delete",], app:app}}
              ]} 
            theme={"selectByImageSmall"}
            />
</div>        
      </div>

    )
  }
}

