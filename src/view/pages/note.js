import { Component } from 'react';
import NoteCard from './noteCard';
import MapComponent from '../../componentListNPM/mapTech/mapComponent';


export default class Note extends Component {
  constructor(props) {
    super(props);

    this.state = {
     
    }
  }
 
  updateImage(component){
    this.setState({campaignImage: component, change: true})
  }

  componentDidMount(){
    
  }

  // COMPONENT DID MOUNT CHECK IF THERE ARE NOTES
  // IF THERE IS A NOTE , pick the first note, and dispatch it as the currentNote
  // dispatch currentNote is the class of the note

  render() {
    let app = this.props.app;
    let dispatch = app.dispatch
    let state = app.state;
    let styles =state.styles;
    return (

      
      <div style={{width:"100%", display:"flex",flexDirection:"row", backgroundColor:"#22aaee11", justifyContent:"left"}}>
         {/* 
      2 pages:
      MapComponent custom item, inside do a function for each that is mapped out
      dispatch change global stat
      dispatch the currentNote
      on mount
      */}
      
        <NoteCard app={app} type="card" options={{tabType:"borderlessTab", cardType:"biggestCardBorderless"}}/>

        <div style={{backgroundColor:styles.colors.color4, width:"1.5px", height:"100vh",marginRight:"1px"}}></div>

        <div style={{width:"15.7vmax",height:"fit-content",  display:"flex",flexDirection:"column", padding:"2px"}} >     
      
      <div style={{}}>
              <div onClick={() => {
                  const newNote = {text: "New Note",
                      title: "New Note",};
                      //Taylor
                  dispatch({operate: "addnewNote",operation: "cleanJsonPrepare",object: newNote.text,}); //Taylor
                  this.setState({currentNote: newNote._id});
              }}//Taylor
                    style={{...styles.buttons.buttonAdd, width:"fit-content", fontSize:styles.fonts.fontSmall,padding:"2px", display:"flex", marginBottom:"2vmin", }} >
                    + Note
              </div></div>
      
      <div style={{userSelect:"text", fontSize:styles.fonts.fontSmall, width:"100%", color:styles.colors.colorWhite, 
      height:"fit-content", background:"#ffdead11", marginTop:"2vmin", maxHeight:"100%"}}>
      
      <MapComponent app={app} name={"newNote"} cells={["title","text"]}/>
      {/* RENDERS LIST OF NOTES
        MAP custom COMPONENT, scrolling list of Notes
        ADD NOTE button sets blank note as currentNote */}
    
      </div>
    </div>
      </div >
    )
  }
}


