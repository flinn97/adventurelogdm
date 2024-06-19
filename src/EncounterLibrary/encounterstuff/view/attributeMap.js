import { Component } from "react";
import Armor from "./armor";
import HitPoints from "./hitPoints";
import ParticipantNotes from "./participantNotes";

export default class AttributeMap extends Component {
    constructor(props){
      super(props);
  
  
    }
  
  
    render(){
      let app = this.props.app
      let obj = this.props.obj;
      return( 
      <div style={{display:"flex", flexDirection:"row", marginTop:"-24px"}}>
        <Armor app={app} obj={obj}/>
        <HitPoints app={app} obj={obj}/>
        <ParticipantNotes app={app} obj={obj}/>
        
        
        </div>
        )
      }
  }
  