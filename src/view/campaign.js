import { Component } from 'react';
import "../App.css"
import CardPractice from './CardPrac';
import AddCampaign from './AddCampaign';
import MapComponent from '../componentListNPM/mapTech/mapComponent';
import Upload from './upload';

export default class Campaign extends Component {
  constructor(props) {
    super(props);

    this.state = {
     
    }
  }
 
  updateImage(component){
    this.setState({campaignImage: component, change: true})
  }

  render() {
    let app = this.props.app;
    let dispatch = app.dispatch
    let state = app.state;
    return (
      <div style={{color: "blue"}}><h1>Campaign</h1>
      
      
      <div style={{color: "red"}} onClick={()=>{dispatch({operate: "addcampaign", operation: "cleanPrepare", popUpSwitchcase: "addCampaign"})}}>Add Campaign</div>
        {(state.currentComponent?.getJson().type === "campaign" && state.popUpSwitchcase === "addCampaign") && <AddCampaign app = {app}/>}
        <MapComponent app={app} name={"campaign"} linkOptions={{cells:[0,1,2], path:["/campaign/"]}} cells={["title", "description","session"]}  />
      </div>

    )
  }
}


