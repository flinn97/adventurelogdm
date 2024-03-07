import { Component } from 'react';
import toolService from '../../services/toolService';
import ApprovalProposalCard from './approvalProposalCard';
import "../../App.css"
import Upload from '../upload';


export default class ApprovalProposal extends Component {
  constructor(props) {
    super(props);

    this.state = {
     
    }
  }
 
  async componentDidMount(){
    debugger
    let app = this.props.app;
    let dispatch = app.dispatch;
    let componentList = app.state.componentList
    let _id = toolService.getIdFromURL(false, 0)
    let comp = componentList.getComponent("campaign",_id, "_id");
    let approval = await app.state.opps.cleanJsonPrepareRun({addapproval:{...comp.getJson(), _id:undefined, type:"approval", campaignId: _id, date:undefined, readyForDistribution:false, picURLs: ""}});
    approval = componentList.getComponent("approval", _id, "campaignId");
    await dispatch({currentCampaign:comp,currentApproval: approval});

    this.setState({start:true})
  }

  render() {
    let app = this.props.app;
    let dispatch = app.dispatch
    let state = app.state;
    return (
      <div style={{width:"100%"}}>           
        {this.state.start && <ApprovalProposalCard app={app} type="cardWithTab" options={{tabType:"borderlessTab", cardType:"biggestCardBorderless"}}/>}
        
      </div>

    )
  }
}


