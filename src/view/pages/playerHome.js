import { Component } from 'react';
import PlayerHomeHomeCard from './playerHomeCard';


export default class PlayerHome extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }
componentDidMount(){
  let app = this.props.app;
  app.dispatch({switchCase:[
    {path:"/", comp:PlayerHome, name: "Home"},
   
   
  ]})
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

