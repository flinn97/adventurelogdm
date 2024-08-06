import { Component } from 'react';
import PlayerHomeHomeCard from './playerHomeCard';
import auth from '../../services/auth';


export default class PlayerHome extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }
  async componentDidMount(){
    let app = this.props.app;
    let state = app.state;
    let componentList= state.componentList;
    let user = state.user;
    
    let c = await auth.getAllCharacters(componentList, user.getJson()._id);
    app.dispatch({characters:c})
  }



  render() {
    let app = this.props.app;
    let state = app.state;
    let styles =state.styles;
   

    return (
      <div  style={{height:"100%", display:"flex", 
      flexDirection: window.innerWidth>800?"column":"row", justifyContent:"center", width:"100%"}} >

      <PlayerHomeHomeCard app={app} type="cardWithTab" options={{tabType:window.innerWidth>800?"bigCardBorderless":"borderless", cardType:undefined}}/>
      
      </div>

    )
  }
}

