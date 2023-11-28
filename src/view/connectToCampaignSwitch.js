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
    let obj = this.props.obj;
    let styles = state.styles;

    return (
      <div className='hover-container' style={{width:"300px", display:"flex", flexDirection:"row", justifyContent:"center"}}>
        
        {obj.getJson().campaignId!=="" && 
        obj.getJson().campaignId!==undefined?
        (<ConnectToCampaignLink app={app} obj = {obj}/>)
        :
        (<ConnectToCampaignButton app={app} obj={obj}/>)}

        <div className='hover-div' style={{width:"220px", position:"absolute", zIndex:"-20"}}>
      <div style={{width:"8px", height:"2px", background:"linear-gradient(#ffffff, "+styles.colors.color1+")"}}>
      </div>
        </div>
      </div>

    )
  }
}
