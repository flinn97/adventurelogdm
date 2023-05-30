import { Component } from 'react';
import "../App.css"
import CardPractice from './CardPrac';
import AddCampaign from './AddCampaign';
import MapComponent from '../componentListNPM/mapTech/mapComponent';
import Upload from './upload';
import NoteCard from './noteCard';


export default class Note extends Component {
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
      <div style={{background:"gold"}} >     
      
      <NoteCard app={app} type="cardWithTab" options={{tabType:"borderlessTab", cardType:""}}/>
      </div>

    )
  }
}


