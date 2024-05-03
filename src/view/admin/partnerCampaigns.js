import { Component } from 'react';
import PartnerCampaignCard from './partnerCampaignCard';
import toolService from '../../services/toolService';


export default class PartnerCampaign extends Component {
  constructor(props) {
    super(props);

    this.state = {
     
    }
  }
 
  async componentDidMount(){
    let app = this.props.app;
    let dispatch = app.dispatch
    let _id = toolService.getIdFromURL(false, 0)
    await dispatch({partnerId:_id})
    this.setState({start:true})
  }

  render() {
    let app = this.props.app;
    let dispatch = app.dispatch
    let state = app.state;
    return (
      <div style={{}}>           
        {this.state.start && <PartnerCampaignCard app={app} type="cardWithTab" options={{tabType:"borderlessTab", cardType:"biggestCardBorderless"}}/>}
        <hr></hr>
        
      </div>

    )
  }
}


