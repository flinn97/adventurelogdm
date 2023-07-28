import { Component } from 'react';
import NoteCard from './noteCard';
import MapComponent from '../../componentListNPM/mapTech/mapComponent';
import NoteMapItem from '../noteMapItem';


export default class Note extends Component {
  constructor(props) {
    super(props);

    this.state = {
     
    }
  }
 
  updateImage(component){
    this.setState({campaignImage: component, change: true})
  }

  async componentDidMount(){
    let app = this.props.app;
    let dispatch = app.dispatch
    let state = app.state;
    if (state.componentList.componentsList?.newNote.length <= 0) {
      await dispatch({operate: "addnewNote", operation: "cleanPrepareRun", object:1})
    }
  }

  render() {
    let app = this.props.app;
    let dispatch = app.dispatch
    let state = app.state;
    let styles =state.styles;
    return (

      
      <div style={{width:"100%", display:"flex",flexDirection:"row", justifyContent:"left"}}>

      
        <NoteCard app={app} type="card" options={{tabType:"borderlessTab", cardType:"biggestCardBorderless"}}/>

          {/* hr */}
          <div style={{backgroundColor:styles.colors.color4, width:"1.5px", height:"100vh",marginRight:"1px"}}></div>

        <div style={{width:"100%",height:"fit-content",  display:"flex",flexDirection:"column", padding:"2px",}} >     
      
      <div>
              <div onClick={() => {                      
                  dispatch({operate: "addnewNote", operation: "cleanPrepareRun",}); 
                  
              }}
                    style={{...styles.buttons.buttonAdd, width:"fit-content", fontSize:styles.fonts.fontSmall,padding:"2px", 
                    display:"flex", marginBottom:"2vmin", }} >
                    + Note
              </div></div>
      
      <div style={{userSelect:"text", fontSize:styles.fonts.fontSmall, color:styles.colors.colorWhite, 
      height:"fit-content",  marginTop:"2vmin", maxHeight:"100%"}}>
      
      <MapComponent app={app} name="newNote" 
      cells={[{custom:NoteMapItem, props:{app:app}},]} 
      cellStyle={{justifyContent:"center", width:"100%",}}/>
    
      </div>
    </div>
      </div >
    )
  }
}


