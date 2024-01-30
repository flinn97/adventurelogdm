import { Component } from 'react';
import CampaignCard from './campaignCard';
import MapComponent from '../../componentListNPM/mapTech/mapComponent';
import LibraryCard from '../libraryCard';
import auth from '../../services/auth';

export default class Campaign extends Component {
  constructor(props) {
    super(props);

    this.state = {
     
    }
  }
  async componentDidMount(){
    this.props.app.dispatch({currentCampaign: undefined})
  //     let app = this.props.app;
  //     let state = app.state;
  //     let list =  await auth.firebaseGetter("jaredmichaeldavidson@gmail.com", state.componentList, "owner","lore");
  //   list = await state.componentList.getComponents().filter(comp=>comp.getJson().type!=="user");
  // state.opps.cleanPrepareRun({del:list});
    
  }
 
  updateImage(component){
    this.setState({campaignImage: component, change: true})
  }

  render() {
    let app = this.props.app;
    let dispatch = app.dispatch
    let state = app.state;
    return (
      <div style={{}}>           
        <CampaignCard app={app} type="cardWithTab" options={{tabType:"borderlessTab", cardType:"biggestCardBorderless"}}/>
        <hr></hr>
        <LibraryCard app={app} type="cardWithTab" options={{tabType:"borderlessTab", cardType:"biggestCardBorderless"}}/>  
      </div>

    )
  }
}


