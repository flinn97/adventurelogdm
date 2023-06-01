import { Component } from 'react';
import MarketCard from './marketCard';


export default class Market extends Component {
  constructor(props) {
    super(props);

    this.state = {
     
    }
  }
 
  updateImage(component){
    this.setState({campaignImage: component, change: true})
  }

  render() {
    let app = this.props.app;
    let dispatch = app.dispatch
    let state = app.state;
    return (
      <div>     
      
      <MarketCard app={app} type="cardWithTab" options={{tabType:"borderlessTab", cardType:""}}/>
      </div>

    )
  }
}


