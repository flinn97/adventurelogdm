import { Component } from 'react';
import "../App.css"
import CardPractice from './CardPrac';
import HomeCard from './homeCard';


export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }



  render() {
    let app = this.props.app;


    return (
      <div style={{backgroundColor: "lightblue", color:"" }}>
      <div>
      <HomeCard app={app} type="cardWithTab" options={{tabType:"borderlessTab", cardType:""}}/>
      </div>
      
      <div>
        {/* EVENTUALLY THIS WILL BE RECENT CAMPAIGNS or something */}
      <HomeCard app={app} type="cardWithTab" options={{tabType:"borderlessTab", cardType:""}}/>
      </div>

      <div>
        {/* EVENTUALLY THIS WILL BE CURRENT NOTES or something */}
      <HomeCard app={app} type="cardWithTab" options={{tabType:"borderlessTab", cardType:""}}/>
      </div>

      <div>
        {/* EVENTUALLY THIS WILL BE MARKETPLACE SPECIALS or something */}
      <HomeCard app={app} type="cardWithTab" options={{tabType:"borderlessTab", cardType:""}}/>
      </div>

      </div>

    )
  }
}

