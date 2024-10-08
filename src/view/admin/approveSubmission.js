import { Component } from 'react';
import "../../App.css"

import { doc, setDoc, serverTimestamp} from "firebase/firestore";
import idService from '../../componentListNPM/idService';
import { db, storage, auth } from '../../firbase.config.js';
import authservice from '../../services/auth.js';


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
      <div className="hover-btn-highlight" style={{marginLeft:"100px", color:"black",  fontWeight:"600",  cursor:"pointer", background:"#81818122", padding:"4px 8px", borderRadius:"10px"}} onClick={async()=>{
        
        let approval = this.props.obj;
        
        let encCount = await authservice.getCountByCampaingId(approval.getJson().campaignId, "encounter");
        let loreCount = await authservice.getCountByCampaingId(approval.getJson().campaignId, "lore");
        let imgCount = await authservice.getCountByCampaingId(approval.getJson().campaignId, "image");
        let mapCount = await authservice.getCountByCampaingId(approval.getJson().campaignId, "map");

        let mpItem = {...approval.getJson(), _id:idService.createId(), type:approval.getJson().mptype, encCount: encCount, imageCount:imgCount, loreCount:loreCount, mapCount:mapCount}

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
    <div className="hover-btn-highlight" style={{color:"red", fontWeight:"600", cursor:"pointer", background:"#81818122", padding:"4px 8px", borderRadius:"10px"}} onClick={()=>{state.opps.cleanPrepareRun({del:this.props.obj})}} >no</div>
    </div>

    )
  }
}

