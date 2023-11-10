import { Component } from 'react';
import '../../../App.css';
import ParentFormComponent from '../../../componentListNPM/componentForms/parentFormComponent';

export default class MessageLogComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      obj: this.props.obj,
    }

  }
 

  render() {
    let app = this.props.app;
    let dispatch = app.dispatch
    let state = app.state;
    let styles = state.styles;
    let obj = this.props.obj;
    let index = this.props.index;
  
    let w = this.props.w;

    return (
      <div style={{ 
                  display: "flex",
                  flexDirection: "row",
                  maxWidth: w,
                  fontSize: styles.fonts.fontNormal,
                  // alignSelf: "flex-end", justifySelf:"flex-end",             
      }}>
        <div  style={{display:"flex", cursor:"default",pointerEvents: "none", textAlign:"center", flexDirection:"column", 
                      wordWrap: "break-word",
                      whiteSpace: "normal",
                      overflowWrap: "break-word" }}>

                <ParentFormComponent app={app} name="message" obj={obj}
                      theme={"adventureLog"} 
                      
                      inputStyle={{ color:styles.colors.colorWhite+"f2", height:"fit-content", 
                      borderRadius:"4px", padding:"4px 4px", minWidth:"550px", maxWidth:"550px",
                      fontSize:styles.fonts.fontSmall,pointerEvents: "none",
                      userSelect:"none", cursor:"", 
                      background:"linear-gradient(to left, transparent, "+styles.colors.colorBlack+","+styles.colors.color7+"44, "+styles.colors.colorBlack+", transparent)", borderRadius:"11px",
                      wordWrap: "break-word",
                      whiteSpace: "normal",
                      overflowWrap: "break-word"
                    }}
                      type={"richEditor"}
                      />
        </div>
          
      </div>
      
    )
  }
}

