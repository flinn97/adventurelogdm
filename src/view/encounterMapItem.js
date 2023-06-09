import { Component } from 'react';
import "../App.css"
import AddCampaign from './AddCampaign';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import placeholder from '../pics/placeholderEncounter.JPG';
import Encounter from './encounter';

export default class EncounterMapItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      obj: undefined,
      pic: undefined,
      runEncounter: undefined,
    }
  }
 

  render() {
    let app = this.props.app;
    let dispatch = app.dispatch
    let state = app.state;
    let length = app.state.maxLengthShort;
    let styles = state.styles;
    
    let obj = this.props.obj;

          let name = obj?.getJson().name;
          let x = name.length;
          let fontSizePx;

              if(x <= 18) {
                  fontSizePx = 16;
              }
              else if(x >= length) {
                  fontSizePx = 11;
              }
              else {
                  fontSizePx = 16 + (x - 18) * ((11 - 16) / (length - 18));
              }        
              let fontSizeRem = fontSizePx / 16;
              let fontSize = fontSizeRem + "rem";

    return (
      <div>

      <Link
      to={"/encounter/" + obj?.getJson()._id} 
      style={{ color: styles.colors.colorWhite, 
        textDecoration: "none", userSelect:"none",
        height: "fit-content", cursor:"pointer",
        width: "fit-content"}}
        
        onClick={()=>{
          this.setState({runEncounter: obj?.getJson()._id});
          }}
      > 

      <div style={{display: "flex", flexDirection: 'column', 
      borderRadius:styles.popupSmall.borderRadius,
      justifyContent:"space-evenly", 
      zIndex:"0",
      height: 'fit-content', 
      width: 'fit-content', 
      backgroundImage: 'url('+(obj?.getJson().picURL||placeholder)+')',
      ...styles.backgroundContent}}>
                        
                        <div style={{
                        ...styles.popupSmall, display: "flex", flexDirection: "row", justifyContent:"space-between", flexDirection: 'column',
                        height: "fit-content", 
                         width: "fit-content"}}>
                          
                          <div 
                          
                          style={{display: "flex", height:"fit-content", width:"fit-content", fontWeight:"bold", fontFamily:"serif", 
                          textDecoration: styles.colors.colorWhite+"22 underline", textDecorationThickness: "1px", textUnderlineOffset: "4px",
                          textShadow:"1px 1px 0 "+styles.colors.colorBlack, textShadow:"-1px -1px 0 "+styles.colors.colorBlack,
                          
                          alignItems:"center", justifyContent:"center", fontSize:fontSize,}}>
                            {obj?.getJson().name}
                          </div>
                </div>
        </div>
        </Link>

        </div>
    )
  }
}


