import { Component } from 'react';
import App from '../../App';
import HomeCard from './homeCard';
import CampaignCard from './campaignCard';
import NoteCard from './noteCard';
import MarketCard from './marketCard';
import LibraryCard from '../libraryCard';
import MapComponent from '../../componentListNPM/mapTech/mapComponent';


export default class ApprovalPage extends Component {
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
     
      <div >
     
       <MapComponent app={app} name={"approval"} cells={["title","campaignId"]}/>
        
    </div>
    

    )
  }
}

