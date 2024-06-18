import { Component } from "react";

export default class Duplicate extends Component {
    constructor(props){
      super(props);
  
  
    }
  
  
    render(){
      let app= this.props.app
      let state= app.state
      return(
      <div 
      className="button Header-Edit"
      onClick={()=>{
        debugger
        let json = this.props.obj.getJson();
        state.opps.cleanJsonPrepareRun({"addparticipant": {...json, _id: undefined, }})
        
      }}>
       Duplicate
        </div>
        )
      }
  }
  