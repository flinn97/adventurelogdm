import { Component } from 'react';
import "../App.css"
import RunButton from '../componentListNPM/componentForms/buttons/runButton';
import ParentFormComponent from '../componentListNPM/componentForms/parentFormComponent';
import CardPractice from './CardPrac';
import Upload from './upload';

export default class AddParticipant extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }
 


  render() {
    let app = this.props.app;
    let dispatch = app.dispatch;

    return (
      <div style={{display: "flex"}}><h1></h1>
      <div onClick={()=>{dispatch({popUpSwitchcase: ""})}}>X</div>
      <Upload  update={true} skipUpdate={true} updateMap={(obj)=>{this.setState({pic: obj.getJson().picURL})}} obj={app.state.currentComponent} app={app}/>
      <img src={this.state.pic}/>

      <ParentFormComponent app={app} name="name" label="Participant Name" wrapperStyle={{margin:"5px"}}/> 
      <ParentFormComponent app={app} name="initiative" label="Initiative Bonus" wrapperStyle={{margin:"30px"}}/>
      <ParentFormComponent app={app} name="ac" label="Armor Class" wrapperStyle={{margin:"50px"}}/> 
      <ParentFormComponent app={app} name="statBlockLink" label="Stat Block Link" wrapperStyle={{margin:"5px"}}/> 
      <ParentFormComponent app={app} name="notes" label="Notes"/> 
      <RunButton app ={app} callBack ={()=>{dispatch({popUpSwitchcase: "", currentComponent: undefined})}}/>
      
      </div>

    )
  }
}


