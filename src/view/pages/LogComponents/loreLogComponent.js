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
    


    return (
      <div style={{ 
                  display: "flex",
                  flexDirection: "row",
                  maxWidth: "fit-content",
                  fontSize: styles.fonts.fontNormal,
                  alignSelf: "flex-end", justifySelf:"flex-end",
                  
                  
      }}>
        <div  style={{color:styles.colors.colorWhite, textAlign:"end", cursor:"default",pointerEvents: "none" }}>
                <ParentFormComponent app={app} name="desc" obj={obj}
                      theme={"adventureLog"} 
                      
                      inputStyle={{maxWidth:"100%", color:styles.colors.colorWhite, height:"fit-content",
                      borderRadius:"4px", padding:"4px 4px", 
                      fontSize:styles.fonts.fontSmall,pointerEvents: "none",
                      userSelect:"none", cursor:""                   
                    }}
                      type={"richEditor"}
                      />
        </div>
          
      </div>
      
    )
  }
}


