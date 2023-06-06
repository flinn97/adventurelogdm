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
    let state = app.state;
    let styles =state.styles;

    return (
      <div style={{height:"100%", marginBottom:"14vmin",}} >
      
      <HomeCard app={app} type="cardWithTab" options={{tabType:"borderlessTab", cardType:undefined}}/>
      <div 
          style={{display:"flex", flexDirection:"row", justifyContent:"center", fontFamily:"cursive",
        fontSize:styles.fonts.fontHeader4, marginTop:"3vmin", color:styles.colors.colorWhite}}>
        Find Something New:
    </div>
      <MarketCard app={app} type="cardWithTab" options={{tabType:"borderlessTab", cardType:undefined}}/>
      </div>

    )
  }
}

