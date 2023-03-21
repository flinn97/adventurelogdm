import { Component } from 'react';
import "../App.css"
import RunButton from '../componentListNPM/componentForms/buttons/runButton';
import ParentFormComponent from '../componentListNPM/componentForms/parentFormComponent';
import CardPractice from './CardPrac';
import Upload from './upload';

export default class AddCampaign extends Component {
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

      <ParentFormComponent app={app} name="title" label="title" wrapperStyle={{margin:"5px"}}/> 
      <ParentFormComponent app={app} name="description" label="description" wrapperStyle={{margin: "10px"}}/>
      <ParentFormComponent app={app} name="session" label="session#"/> 
      <RunButton app ={app} callBack ={()=>{dispatch({popUpSwitchcase: "", currentComponent: undefined})}}/>
      
      </div>

    )
  }
}


