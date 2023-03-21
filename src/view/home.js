import { Component } from 'react';
import "../App.css"
import CardPractice from './CardPrac';


export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }



  render() {
    let app = this.props.app;


    return (
      <div style={{backgroundColor: "lightblue", color: 'orange' }}><h1>Home</h1>

      

      </div>

    )
  }
}

