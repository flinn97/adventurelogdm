import React, { Component } from 'react'; 
import "../App.css"

import ParentFormComponent from '../componentListNPM/componentForms/parentFormComponent';
import { async } from '@firebase/util';

export default class InteractiveMapItem extends Component {
  constructor(props) {
    super(props);
     
    this.state = {
      update: true
    }
  }
  componentDidMount(){
    
    this.setState({update:false, obj:this.props.obj})
  }
 async componentDidUpdate(){
 if(this.props.state[this.props.obj.getJson()._id + "update"]){
  await this.props.finishUpdate(this.props.obj.getJson()._id + "update");
  this.setState({update: true})
  }
 }

  render() {
   let app = this.props.app
   let state = app.state
   let dispatch = app.dispatch


    return (
      <div  id="mapItem" style={{width: "fit-content", height: "fit-content", border: "1px solid black", position:"absolute", zIndex: 500, top:this.props.top, left:this.props.left}}>
        {this.state.update?(
        <div style={{width:"200px", height:"300px", background:"teal",}}>
        <ParentFormComponent obj={this.props.obj} name="title"/>
        <div onClick={()=>{this.setState({update: false})}}>X</div>
        <ParentFormComponent style={{height:"200px", border:"1px solid black"}} obj={this.props.obj} name="description" type="textArea"  app={app}/>
        <div onClick={async()=>{
           await this.props.finishUpdate(this.props.obj.getJson()._id + "update")
          state.opps.cleanPrepareRun({del: this.props.obj})
          this.setState({update: false})}
          }>Delete</div>

        <div onClick={async()=>{
          await state.opps.prepareRun({update: this.props.obj});
          this.setState({update: false})
        }
        }>Save</div>
        
     </div>):(<div style={{ width: "200px", height: "100px"}}onClick={(e)=>{
      this.setState({update: true})
      
     }}>{this.props.obj.getJson().title}</div>)}
      
      </div>

    )
  }
}

