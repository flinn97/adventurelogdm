import { Component } from 'react';
import PlayerHome from './playerHome';
import Gmlore from './gmLore';
import Note from './note';
import AdventureLogPage from './adventureLogPage';
import ToolService from '../../services/toolService';
import auth from '../../services/auth';
export default class AdventureLog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gotCampaign:false
    }
  }
  async componentDidMount(){
    let app = this.props.app;
    let state = app.state;
    let dispatch = app.dispatch;
    
    
    let id = ToolService.getIdFromURL(false);
    if(ToolService.checkURLforString("connecttoadventure")){
      var stateObj = { adventure: id };
      window.history.pushState(stateObj, "Adventure Log", "/log/"+id);
    }
    dispatch({switchCase:[
      {path:"/", comp:PlayerHome, name: "Home"},
      {path: "/log", comp:AdventureLog, name: "Adventure Log", _id:id },
      ///Added Notes
      {path: "/notes", comp:Note, name: "Notes", _id:id },
      ///Added Marketplace
      {path: "/gmlore", comp:Gmlore, name: "gmlore", _id:id},
      ///
     
    ]})
    let campaign = state.componentList.getComponent("campaign", id, "_id");
    if(!campaign){
      await auth.firebaseGetter(id, state.componentList,"_id")
      

    }
    this.setState({gotCampaign:true})
  }



  render() {
    let app = this.props.app;
    let state = app.state;
    let styles =state.styles;
   

    return (
      <div  style={{minHeight:"100%", display:"flex", flexDirection:"column", justifyContent:"center", width:"100%", }} >
      {this.state.gotCampaign&&(<AdventureLogPage app= {app} type="cardWithTab" options={{tabType:"bigCardBorderless", cardType:undefined}}/>)} 
      <div 
          style={{display:"flex", position:"relative", flexDirection:"column", justifyContent:"flex-start",
          alignContent:"center", width:"100%", userSelect:"none",
        fontSize:styles.fonts.fontHeader4, color:styles.colors.colorWhite}}>
       
        
    </div>
    
      </div>

    )
  }
}

