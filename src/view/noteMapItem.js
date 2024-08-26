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

  renderNotes() {
    let body = this.props.obj.getJson().text;

    // Remove all HTML tags for formatting
    body = body.replace(/<[^>]*>/g, '');

    // Replace line breaks and carriage returns with an em dash
    body = body.replace(/\r?\n|\r/g, ' — ');

    // Collapse multiple spaces into a single space
    body = body.replace(/ +/g, ' ');

    // Truncate text to 134 characters
    body = body.substring(0, 130) + '...';

    let bodyText = document.getElementById(this.props.obj.getJson()._id + "textBody");
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
    
    
   

    return (
      <div style={{width:"100%", minHeight:"3.5em", userSelect:"none", cursor:"pointer"}} onClick={async ()=>{
        await dispatch({currentComponent: undefined});
        dispatch({currentComponent: this.props.obj}); 
        }}>
      <div style={{width:"100%", padding:"4px 6px", backgroundColor:highlightBackground,fontSize:styles.fonts.fontSmallest, }}
      >
      <div style={{fontSize:styles.fonts.fontSmallest,}}> 
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
              style={{ marginBottom: "2px", fontSize:styles.fonts.fontSmallest,
              color: styles.colors.colorWhite, lineHeight:"1.2em", 
              width: "17vw", wordWrap:"break-word",
              
                }}>
          
                </div>
               
        </div>
        
        </div>
        {/* {state.currentComponent === this.props.obj &&  */}
        <hr style={{marginTop:"0px",}}></hr>
        {/* } */}
        </div>
    )
  }
}


