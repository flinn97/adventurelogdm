import { Component } from 'react';
import ConnectToCampaignButton from './connectToCampaignbutton';
import ConnectToCampaignLink from './connectToCampaignLink';
import auth from '../services/auth';
import toolService from '../services/toolService';

export default class ConnectToCampaignSwitch extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }


 render()  {
    let app = this.props.app;
    let state = app.state;
    let dispatch= app.dispatch;
    let obj = this.props.obj;
    let styles = state.styles;
    
    let objCampId = obj.getJson().campaignId;

    let comps = state.componentList.getList("campaign", objCampId, "_id")

    return (
      <div  style={{width:"800px", display:"flex", flexDirection:"row", justifyContent:"left", marginLeft:"22px", }}>
        <div>
        {objCampId!=="" && 
        objCampId!==undefined &&
        objCampId.length >= 6
        ?
        (<ConnectToCampaignLink app={app} obj={obj}/>)
        :
        (<ConnectToCampaignButton app={app} obj={obj}/>)}
        </div>

       
        </div>

    )
  }
}
