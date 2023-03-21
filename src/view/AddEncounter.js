import { Component } from 'react';
import "../App.css"
import RunButton from '../componentListNPM/componentForms/buttons/runButton';
import ParentFormComponent from '../componentListNPM/componentForms/parentFormComponent';
import CardPractice from './CardPrac';
import Upload from './upload';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

export default class AddEncounter extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }
async componentDidMount(){
 
  await this.props.app.dispatch({currentComponent: undefined})
  await this.props.app.dispatch({operate: "addencounter", operation: "cleanJsonPrepare", object: {_id:Math.floor(Math.random() * 100000).toString()}})
  this.setState({start:true})
}




  render() {
    let app = this.props.app;
    let dispatch = app.dispatch;

    return (
      <div style={{display: "flex"}}><h1></h1>{this.state.start&& app.state.currentComponent&& (<>
      <div onClick={()=>{dispatch({popUpSwitchcase: ""})}}>X</div>
      <Upload  update={true} skipUpdate={true} updateMap={(obj)=>{this.setState({pic: obj.getJson().picURL})}} obj={app.state.currentComponent} app={app}/>
      <img src={this.state.pic}/>

      <ParentFormComponent app={app} name="name" label="Encounter Name"/> 
      <ParentFormComponent app={app} name="description" label="Situation Description"/>
      <ParentFormComponent app={app} name="audio" label="Audio Link"/> 
      <Link to= {"/encounter/" + app.state.currentComponent.getJson()._id}>Save</Link>
      </>)}
      </div>

    )
  }
}


