import { Component } from 'react';
import App from '../../App';
import HomeCard from './homeCard';
import CampaignCard from './campaignCard';
import NoteCard from './noteCard';
import MarketCard from './marketCard';
import LibraryCard from '../libraryCard';


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
      <div style={{display:"flex", flexDirection:"row", justifyContent:"center", fontFamily:"cursive",
    fontSize:"22px", marginTop:"3vmin"}}>Find Something New:</div>
      <MarketCard app={app} type="cardWithTab" options={{tabType:"borderlessTab", cardType:undefined}}/>
      </div>

    )
  }
}

