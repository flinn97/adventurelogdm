import { Component } from 'react';
import ConnectToCampaignButton from './connectToCampaignbutton';
import ConnectToCampaignLink from './connectToCampaignLink';

export default class ConnectToCampaignSwitch extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }
 


  render() {
    let app = this.props.app;
    let state = app.state;
    let dispatch= app.dispatch;
    let obj = this.props.obj


    return (
      <div>
        
        {obj.getJson().campaignId!=="" && obj.getJson().campaignId!==undefined?(<ConnectToCampaignLink app={app} obj = {obj}/>):(<ConnectToCampaignButton app={app} obj={obj}/>)}
      </div>

    )
  }
}
