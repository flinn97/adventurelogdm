import { Component } from 'react';
import App from '../../App';
import HomeCard from './homeCard';
import CampaignCard from './campaignCard';
import NoteCard from './noteCard';
import MarketCard from './marketCard';


export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }



  render() {
    let app = this.props.app;


    return (
      <div>
      
      <HomeCard app={app} type="cardWithTab" options={{tabType:"borderlessTab", cardType:undefined}}/>
        
      <CampaignCard app={app} type="cardWithTab" options={{tabType:"borderlessTab", cardType:undefined}}/>

      <NoteCard app={app} type="cardWithTab" options={{tabType:"borderlessTab", cardType:undefined}}/>

      <MarketCard app={app} type="cardWithTab" options={{tabType:"borderlessTab", cardType:undefined}}/>
      
      </div>

    )
  }
}

