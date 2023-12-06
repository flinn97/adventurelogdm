import { Component } from 'react';
import '../../../App.css';
import ParentFormComponent from '../../../componentListNPM/componentForms/parentFormComponent';



export default class LoreLogComponent extends Component {
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
        <div  style={{display:"flex", cursor:"default",pointerEvents: "none", flexDirection:"column", textAlign:'justify' }}>

                      {this.props.isYou &&
                        <div title="Only you can see this"
                        style={{fontSize:styles.fonts.fontSmallest, color:styles.colors.color9+"55", 
                        pointerEvents:"all", marginRight:"-20px", marginTop:"1px", marginRight:"4px"}}>
                          {obj.getJson().name}
                          </div>
                      }
                
                <ParentFormComponent app={app} name="desc" obj={obj}
                      theme={"adventureLog"} 
                      
                      inputStyle={{ color:styles.colors.colorWhite+"f6", height:"fit-content", 
                      borderRadius:"4px", padding:"4px 4px", minWidth:"550px", maxWidth:"550px",
                      fontSize:styles.fonts.fontSmall,pointerEvents: "none", 
                      // letterSpacing:".15rem",
                      userSelect:"none", cursor:"", textDecoration:"underline 1px"+styles.colors.color7, textUnderlineOffset:"4px",               
                    }}
                      type={"richEditor"}
                      />
        </div>
          
      </div>
      
    )
  }
}


