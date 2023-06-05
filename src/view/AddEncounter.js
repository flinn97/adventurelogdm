import { Component } from 'react';
import "../App.css"
import RunButton from '../componentListNPM/componentForms/buttons/runButton';
import ParentFormComponent from '../componentListNPM/componentForms/parentFormComponent';
import CardPractice from './CardPrac';
import Upload from './upload';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import placeholder from '../pics/placeholderEncounter.JPG';

export default class AddEncounter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      eid: 10,
    }
  }
async componentDidMount(){
 
  await this.props.app.dispatch({currentComponent: undefined});
  const currentDate = new Date();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const day = currentDate.getDate().toString().padStart(2, '0');
  await this.props.app.dispatch({operate: "addencounter", operation: "cleanJsonPrepare", object: {_id: Math.floor(Math.random() * 10000).toString()+"E"+month+day}});
  this.setState({start:true})
}




  render() {
    let app = this.props.app;
    let dispatch = app.dispatch;
    let radius = "2vmin";
    let state = app.state;
    let componentList = state.componentList;
    let styles =state.styles;

    return (
      <div style={{display: "flex", flexDirection: "row", justifyContent:"space-between", 
      backgroundImage: 'url('+(this.state.pic||placeholder)+')', borderRadius:radius,
      backgroundRepeat: "no-repeat",  backgroundPosition: "50% 50%",  backgroundSize:"cover"}}>
            <div style={{display: "flex", flexDirection: "row", justifyContent:"space-between", 
          backgroundColor:"#ffffff55"}}>
            {this.state.start&& app.state.currentComponent&& (<>
          <div onClick={()=>{dispatch({popUpSwitchcase:""})}}>X</div>
          <Upload  update={true} skipUpdate={true} updateMap={(obj)=>{this.setState({pic: obj.getJson().picURL})}} obj={app.state.currentComponent} app={app}/>
          

          <ParentFormComponent app={app} name="name" label="Encounter Name"/> 
          <ParentFormComponent app={app} name="description" label="Situation Description"/>
          <ParentFormComponent app={app} name="audio" label="Audio Link"/> 
          <Link to= {"/encounter/" + app.state.currentComponent.getJson()._id}>Save</Link>
          </>)}</div>
      </div>

    )
  }
}


