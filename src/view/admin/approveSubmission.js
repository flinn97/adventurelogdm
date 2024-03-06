import { Component } from 'react';
// import App from '../../App';
// import HomeCard from '../pages/homeCard';
// import CampaignCard from '../pages/campaignCard';
// import NoteCard from '../pages/noteCard';
// import MarketCard from '../pages/marketCard';
// import LibraryCard from '../libraryCard';
// import MapComponent from '../../componentListNPM/mapTech/mapComponent';
// import auth from '../../services/auth';
// import treeService from '../../services/treeService';
import { doc, setDoc, serverTimestamp} from "firebase/firestore";
import idService from '../../componentListNPM/idService';
import { db, storage, auth } from '../../firbase.config.js';


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
     <div style={{display:"flex", flexDirection:'row', width:'200px', justifyContent:"space-between"}}>
      <div style={{marginLeft:"100px"}} onClick={async()=>{
        debugger
        let approval = this.props.obj
        let mpItem = {...approval.getJson(), _id:idService.createId(), type:approval.getJson().mytype}

        mpItem.date = await serverTimestamp();
      await setDoc(doc(db, "MPusers", "MPAPP", "components", mpItem._id), mpItem);
      // await approval.operationsFactory.cleanPrepareRun({del:approval});

        // 
        // let campaignId = approval.getJson().campaignId
        // let campaign = await state.componentList.getComponent("campaign", campaignId, "_id")

        // if(!campaign){
        // campaign = await auth.firebaseGetter(campaignId, state.componentList, "_id", "campaign")
        // campaign = campaign[0]
        // }
        // await auth.firebaseGetter(campaignId, state.componentList, "campaignId", "campaign")
        // 
        // treeService.convertToMarketplace(campaign,state.componentList, "campaign")
        
      }}>
        yes
    </div>
    <div onClick={()=>{state.opps.cleanPrepareRun({del:this.props.obj})}} >no</div>
    </div>

    )
  }
}

