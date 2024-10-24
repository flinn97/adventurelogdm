import { Component } from 'react';
import CampaignCard from './campaignCard';
import MapComponent from '../../componentListNPM/mapTech/mapComponent';
import auth from '../../services/auth';
import toolService from '../../services/toolService';
import "./viewer.css"

export default class CampaignViewer extends Component {
  constructor(props) {
    super(props);

    this.state = {
     
    }
  }
  async componentDidMount(){
    
    let app = this.props.app;
    let dispatch = app.dispatch
    let state = app.state;
    let componentList =state.componentList
    let id = toolService.getIdFromURL(false);
    let obj = componentList.getComponent("viewer", id);
    if(!obj){
        await auth.firebaseGetter(id, componentList, "_id", "viewer");
        obj = componentList.getComponent("viewer", id);

    }
    await dispatch({currentViewer:obj});



  }
 


  render() {
    let app = this.props.app;
    let dispatch = app.dispatch
    let state = app.state;
    let styles =state.styles;
    let html;
    if(state.currentViewer){
        html = state.currentViewer.getJson().html
    }

    return (
      <div style={{width:"100%", height:"100%"}}>   hi does this show up?


                       {state.currentViewer&&
                       <div
                       dangerouslySetInnerHTML={{ __html: html }} // Inject the HTML here
                     />
                       }
                          
        
        <hr></hr>

      </div>

    )
  }
}


