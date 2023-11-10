import { Component } from 'react';
import '../../../App.css';
import ParentFormComponent from '../../../componentListNPM/componentForms/parentFormComponent';
import die from '../../../pics/d20.png';

export default class RollLogComponent extends Component {
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
      <div 
      title={obj.getJson()?.desc}
      style={{ 
                  display: "flex",
                  flexDirection: "row",
                  maxWidth: w,
                  fontSize: styles.fonts.fontNormal,
                  // alignSelf: "flex-end", justifySelf:"flex-end",             
      }}>
        <div title={obj.getJson()?.desc} style={{display:"flex", cursor:"default",pointerEvents: "none", textAlign:"center", flexDirection:"column", 
                      wordWrap: "break-word",
                      whiteSpace: "normal",
                      overflowWrap: "break-word" }}>

                
                <img title={obj.getJson()?.desc} src={die} style={{width:"25px", zIndex:"10", filter:"contrast(0%)", marginLeft:"-17px", marginTop:"15px",
                height:"25px", marginBottom:"-25px"}}/>
                
                <div style={{color:styles.colors.colorWhite+"55", fontSize:styles.fonts.fontSmallest, marginTop:"-10px",
                display:"flex", cursor:"default",pointerEvents: "none", textAlign:"center", flexDirection:"column", 
                minWidth:"550px", maxWidth:"550px", height:"45px",  verticalAlign:"center", justifyContent:"center",
                textAlign:"center", textAlign:"center"}}>
                  Rolled a
                  <div style={{height:"fit-content",width:"550px",color:styles.colors.colorWhite+"f2", zIndex:"20"}}>
                  {obj.getJson()?.message}
                  </div>
                  
                </div>
                    
        </div>
          
      </div>
      
    )
  }
}


