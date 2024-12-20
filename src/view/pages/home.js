import { Component } from 'react';
import App from '../../App';
import HomeCard from './homeCard';





export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }
  // async componentDidMount(){
    // let app = this.props.app;
    // let state = app.state;
    // let componentList = state.componentList;
    // let campaigns = componentList.getList('campaign');
    // for(let campaign of campaigns){
    //   await auth.firebaseGetter(campaign.getJson()._id, componentList, "parent")
    // }
  // }
//   async componentDidMount(){
//     let app = this.props.app;
//     let state = app.state;
//     let list =  await auth.firebaseGetter("jaredmichaeldavidson@gmail.com", state.componentList, "owner","lore");
//   list = await state.componentList.getComponents().filter(comp=>comp.getJson().type!=="user");
// state.opps.cleanPrepareRun({del:list});
//   }



  render() {
    let app = this.props.app;
    let state = app.state;
    let styles =state.styles;
   

    return (
      <div style={{height:"100%", marginBottom:"14vmin", display:"flex", flexDirection:"column", justifyContent:"center", width:"100%"}} >

      <HomeCard app={app} type="cardWithTab" options={{tabType:"bigCardBorderless", cardType:undefined}}/>
      <div 
          style={{display:"flex", position:"relative", flexDirection:"column", justifyContent:"flex-end",
          alignContent:"center", width:"100%", userSelect:"none", marginTop:"-22px",
        fontSize:styles.fonts.fontHeader4, marginTop:"3vmin", color:styles.colors.colorWhite}}>
       
        
    </div>
    
      </div>

    )
  }
}

