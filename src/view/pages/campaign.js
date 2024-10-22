import { Component } from 'react';
import CampaignCard from './campaignCard';
import MapComponent from '../../componentListNPM/mapTech/mapComponent';
import auth from '../../services/auth';

export default class Campaign extends Component {
  constructor(props) {
    super(props);

    this.state = {
     
    }
  }
  async componentDidMount(){
    

    // await auth.getAllofTypeByUser(this.props.app.state.componentList,this.props.app.state.user.getJson()._id, "campaign")
    this.props.app.dispatch({currentCampaign: undefined, popUpSwitchcase:"", currentComponent:undefined})
    this.props.app.state.opps.clearUpdater();
    if(this.props.app.state.user?.getJson().firstTime){
      await this.props.app.state.user.setCompState({firstTime:false});
      await this.props.app.state.opps.cleanPrepareRun({update:this.props.app.state.user});
      const delay = ms => new Promise(res => setTimeout(res, ms));
      await delay(1000);
      await auth.getAllCampaigns(this.props.app.state.componentList, this.props.app.state.user.getJson()._id);
      this.props.app.dispatch({})

    }
    if(this.props.app.state.justDownloaded){
      const delay = ms => new Promise(res => setTimeout(res, ms));
      await delay(1000);
      await auth.getAllCampaigns(this.props.app.state.componentList, this.props.app.state.user.getJson()._id);
      this.props.app.dispatch({justDownloaded:false});


    }
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
    let styles =state.styles;
    return (
      <div style={{}}>   
      {window.innerWidth < 800 &&
      (<div style={{width:"100%", display:"flex", flexDirection:"row", background:styles.colors.color2, 
      justifyContent:"flex-end", padding:"1rem"}}>
      <div onClick={auth.logout} style={{
                        width: "400px", borderRadius: "11px", cursor: "pointer", alignSelf:"flex-end", width:"fit-content", fontSize:"1.2rem",
                        textDecoration: "1px underline " + styles.colors.color5, color: styles.colors.color5, textUnderlineOffset: "2px", marginRight:"20px"
                      }}>Log Out</div>
                      </div>)
                       }
                          
        <CampaignCard app={app} type="cardWithTab" options={{tabType:"borderlessTab", cardType:"biggestCardBorderless"}}/>
        <hr></hr>

      </div>

    )
  }
}


