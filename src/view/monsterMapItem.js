import { Component } from 'react';
import "../App.css"
import AddCampaign from './AddCampaign';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import placeholder from '../pics/placeholderEncounter.JPG';
import Encounter from './encounter';
import ColorThief from 'colorthief';
import Roll from './Roll';
import TokenImage from './tokenImage';
import colorService from '../services/colorService';

export default class MonsterMapItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      obj: undefined,
      pic: undefined,
      runEncounter: undefined,
      colors: undefined,
      encounterId: undefined,
    };}


  render() {
    
    let app = this.props.app;
    let dispatch = app.dispatch;
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

              
              // console.log(obj.getJson().encounterId)
    return (
      <div style={{}}>
            {/* //app          //which pic */}

      <div
      // to={"/encounter/" + obj?.getJson()._id} 
      style={{ color: styles.colors.colorWhite, 
        textDecoration: "none", userSelect:"none",
        height: "fit-content",
        
        width: "fit-content"}}
      > 

      <div style={{display: "flex", flexDirection: 'column', 
      borderRadius:styles.popupSmall.borderRadius,
      
      justifyContent:"space-evenly", 
      zIndex:"0",
      height: 'fit-content', 
      width: 'fit-content', 
      // backgroundImage: 'url('+(obj?.getJson().picURL||placeholder)+')',
      
      ...styles.backgroundContent,
      }}>
       
                        
                        <div style={{
                        ...styles.popupSmall, display: "flex", flexDirection: "row", justifyContent:"space-between", 
                        height: "fit-content", 
                         width:"40vw",}}>
<div>
<TokenImage pic={obj?.getJson().picURL} width={88} app={app}/>
</div>

                          <div
                          
                          style={{display: "flex", height:"fit-content", width:"fit-content", fontWeight:"bold", fontFamily:"serif", 
                          textDecoration: styles.colors.colorWhite+"22 underline", textDecorationThickness: "1px", textUnderlineOffset: "4px",
                          textShadow:"1px 1px 0 "+styles.colors.colorBlack,
                          width:"fit-content", alignSelf:"center",
                          alignItems:"center", justifyContent:"center", fontSize:fontSize,}}>
                            {obj?.getJson().name}
                          </div>
                          
                          <div 
                          style={{display: "flex", height:"fit-content", width:"fit-content", fontWeight:"bold", fontFamily:"serif", 
                          textShadow:"1px 1px 0 "+styles.colors.colorBlack,
                          width:"fit-content", alignSelf:"center",
                          alignItems:"center", justifyContent:"center", fontSize:fontSize,}}>
                            AC: {obj?.getJson().ac}
                          </div>


<div style={{display: "flex", height:"fit-content", width:"fit-content", fontWeight:"bold", fontFamily:"serif", 
                          textShadow:"1px 1px 0 "+styles.colors.colorBlack,
                          width:"fit-content", alignSelf:"center",
                          alignItems:"center", justifyContent:"center", fontSize:fontSize,}}>
                                        <Roll app={app} obj={this.props.obj} fontsize={fontSize}
                                        style={{display: "flex", height:"fit-content", width:"fit-content", fontWeight:"bold", fontFamily:"serif", 
                                        textShadow:"1px 1px 0 "+styles.colors.colorBlack,
                                        width:"fit-content", alignSelf:"center",
                                        alignItems:"center", justifyContent:"center", fontSize:fontSize,
                                        
                                        }}/>




                          </div>
                </div>
        </div>
        </div>

        </div>
    )
  }
  }


