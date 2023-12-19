import { Component } from 'react';
import "../App.css"


export default class NoteMapItem extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      obj: undefined,
      pic: undefined,
      runEncounter: undefined,
     
    }
    
  }

  renderNotes(){
    //debugger
    let body = this.props.obj.getJson().text.substring(0, 100)+'...'
    let index = parseInt(body.indexOf("<br>"))
      body = index!==-1? body.substring(0, index): body; 
    
    
    let bodyText = document.getElementById(this.props.obj.getJson()._id+"textBody");
    bodyText.innerHTML = body;
  }
  componentDidMount(){
    this.renderNotes();
  }

  componentDidUpdate(props){

    if (this.props.obj.getJson().text && this.props.obj.getJson().text.length < 300) {
      this.renderNotes();

         
    }

  }

 

  render() {
    let app = this.props.app;
    let dispatch = app.dispatch
    let state = app.state;
    let length = app.state.maxLengthShort;
    let styles = state.styles;

    let highlightBackground = "";
          if (state.currentComponent === this.props.obj){
              highlightBackground = "#ffdead11"
          }else{
            highlightBackground = ""
          }
    
    
   
//console.log(this.props.obj.getJson().text.length) 

    return (
      <div style={{width:"100%", height:"3.5em",}} onClick={async ()=>{
        await dispatch({currentComponent: undefined});
        dispatch({currentComponent: this.props.obj}); 
        }}>
      <div style={{width:"100%", height:"3.5em",padding:"4px 6px", backgroundColor:highlightBackground, }}
      >
      <div> 
      <div style={{marginTop:"2px",
    fontSize: styles.fonts.fontSmall, 
    color: styles.colors.color3, 
    width: "17vw",
    whiteSpace: "nowrap", 
    overflow: "hidden",   
    textOverflow: "ellipsis"}}>
      {this.props.obj.getJson().title}
        </div>

              <div id={this.props.obj.getJson()._id+"textBody"}
              style={{ marginBottom: "2px", 
              fontSize: styles.fonts.fontSmallest, 
              color: styles.colors.colorWhite, lineHeight:"1em", maxHeight:"3.5em",
              width: "17vw", wordWrap:"break-word",
              overflow:"hidden"
                }}>
          
                </div>
               
        </div>
        
        </div>
        {state.currentComponent === this.props.obj && <hr style={{marginTop:"0px",}}></hr>}
        </div>
    )
  }
}


