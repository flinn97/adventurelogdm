import { Component } from 'react';
import App from '../../App';
import HomeCard from '../pages/homeCard';
import CampaignCard from '../pages/campaignCard';
import NoteCard from '../pages/noteCard';
import MarketCard from '../pages/marketCard';
import LibraryCard from '../libraryCard';
import MapComponent from '../../componentListNPM/mapTech/mapComponent';
import auth from '../../services/auth';
import treeService from '../../services/treeService';


export default class ApproveSubmission extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }



  render() {
    let app = this.props.app;
    let state = app.state;
    let styles =state.styles;
   

    return (
     
      <div style={{marginLeft:"100px"}} onClick={async()=>{
        debugger
        let approval = this.props.obj
        let campaignId = approval.getJson().campaignId
        let campaign = await state.componentList.getComponent("campaign", campaignId, "_id")

        if(!campaign){
        campaign = await auth.firebaseGetter(campaignId, state.componentList, "_id", "campaign")
        campaign = campaign[0]
        }
        await auth.firebaseGetter(campaignId, state.componentList, "campaignId", "campaign")
        await approval.operationsFactory.cleanPrepareRun({del:approval})
        treeService.convertToMarketplace(campaign,state.componentList, "campaign")
        
      }}>
        yes
    </div>
    

    )
  }
}

