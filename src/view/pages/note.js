import { Component } from 'react';
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

  // COMPONENT DID MOUNT CHECK IF THERE ARE NOTES
  // IF THERE IS A NOTE , pick the first note, and dispatch it as the currentNote
  // dispatch currentNote is the class of the note

  render() {
    let app = this.props.app;
    let dispatch = app.dispatch
    let state = app.state;
    return (
      <div style={{}} >     
      
      <NoteCard app={app} type="cardWithTab" options={{tabType:"borderlessTab", cardType:""}}/>

      {/* RENDERS LIST OF NOTES */}
        {/* MAP custom COMPONENT, scrolling list of notes */}
        {/* ADD NOTE button sets blank note as currentNote */}


       {/* RENDERS CURRENT NOTE */}
          {/* Renders currentNote*/}
      </div>

    )
  }
}


