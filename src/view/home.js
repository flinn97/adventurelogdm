import { Component } from 'react';
import "../App.css"
import CardPractice from './CardPrac';
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
      <div style={{backgroundColor: "#59788E88"}}>
      <HomeCard app={app} type="cardWithTab" options={{tabType:"borderlessTab", cardType:""}}/>
      </div>
      
      <div style={{background:"pink"}} >
        
      <CampaignCard app={app} type="cardWithTab" options={{tabType:"borderlessTab", cardType:""}}/>
      </div>

      <div style={{background:"gold"}} >
        {/* EVENTUALLY THIS WILL BE CURRENT NOTES or something */}
      <NoteCard app={app} type="cardWithTab" options={{tabType:"borderlessTab", cardType:""}}/>
      </div>

      <div style={{background:"#7dFF0077"}}>
       
      <MarketCard app={app} type="cardWithTab" options={{tabType:"borderlessTab", cardType:""}}/>
      </div>

      </div>

    )
  }
}

