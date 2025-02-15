import { Component } from 'react';

import auth from '../../services/auth';
import CompendiumCard from '../compendiumCard';

export default class Compendium extends Component {
  constructor(props) {
    super(props);

    this.state = {
     
    }
  }
  async componentDidMount(){
    
    let app = this.props.app;
    let dispatch = app.dispatch
    let state = app.state;
  await auth.getAllofTypeByUser(state.componentList,state.user.getJson()._id,"compendium")
  this.setState({start:true})
  dispatch({currentCampaign:undefined})
    
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
                          
        <CompendiumCard app={app} type="cardWithTab" options={{tabType:"borderlessTab", cardType:"biggestCardBorderless"}}/>
        <hr></hr>

      </div>

    )
  }
}


