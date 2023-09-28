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

  componentDidMount(){
    // let component = this.props.app.state.componentList.getComponent("newNote");
    // let bodyText = document.getElementById("bodyText");
    // bodyText.innerHTML = component.getJson().text;
   
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

    let body = this.props.obj.getJson().text.substring(0, 115)+'...'
   
//console.log(this.props.obj.getJson().text.length) 

    return (
      <div style={{width:"100%", height:"3.5em",}} onClick={()=>{
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

              <div
              style={{ marginBottom: "2px", 
              fontSize: styles.fonts.fontSmallest, 
              color: styles.colors.colorWhite, lineHeight:"1em", maxHeight:"3.5em",
              width: "17vw", wordWrap:"break-word",
              overflow:"hidden"
                }}>
          {body}
                </div>
               
        </div>
        
        </div>
        {state.currentComponent === this.props.obj && <hr style={{marginTop:"0px",}}></hr>}
        </div>
    )
  }
}


