import { Component } from 'react';
import "../App.css"
import placeholder from '../pics/placeholderEncounter.JPG';
import Encounter from './encounter';
import ColorThief from 'colorthief';
import Roll from './Roll';
import TokenImage from './tokenImage';
import bookCursor from '../pics/bookmarklet.png';
import ParentFormComponent from '../componentListNPM/componentForms/parentFormComponent';
import ac from '../pics/ac.png';


export default class MonsterMapItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      obj: undefined,
      pic: undefined,
      runEncounter: undefined,
      colors: props.colors || [],
      encounterId: undefined,
    };}

    convertToLink = (statBlockLink) => {
    
      if (statBlockLink && !statBlockLink.startsWith('http')) {
        return 'https://' + statBlockLink;
      }
      return statBlockLink;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.colors !== this.props.colors) {
      // Update state if prop changes
      this.setState({ colors: this.props.colors });
    }
  }

  render() {
    
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let length = app.state.maxLengthShort;
    let styles = state.styles;
   
    let obj = this.props.obj;
    const { colors } = this.state;
    
    let stat = this.convertToLink(obj?.getJson().statBlockLink);
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
              let fontSizeRemSm=fontSizePx / 19;
              let fontSize =[fontSizeRem + "rem", fontSizeRemSm+"rem"]

        
    return (
     
      <div>
        
      <div
      // to={"/encounter/" + obj?.getJson()._id} 
      style={{ color: styles.colors.colorWhite, 
        textDecoration: "none", userSelect:"none",
        height: "fit-content",
        width: "fit-content"}}
      > 

      <div style={{display: "flex", flexDirection: 'column', 
      borderRadius:styles.popupSmall.borderRadius,
      border:"",
      justifyContent:"left",  position:"absolute",
      zIndex:"0",
      height: 'fit-content', 
      width: 'fit-content',
      ...styles.backgroundContent,
      }}>     
                        <div style={{
                        ...styles.popupSmall, display: "flex", flexDirection: "row", justifyContent:"space-evenly", 
                        height: "fit-content", border:"", background:"",
                         width:"1000px",}}>


<div style={{display: "flex", height:"fit-content", fontWeight:"bold", fontFamily:"serif", 
                          textShadow:"1px 1px 0 "+styles.colors.colorBlack,
                          width:"fit-content", alignSelf:"center",
                          alignItems:"center", justifyContent:"center", fontSize:fontSize[0],}}>

                                        <Roll app={app} obj={this.props.obj} fontSize={fontSize}
                                        style={{  display: "flex",
                                        height: "fit-content",
                                        alignSelf: "center",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexDirection: "column",
                                        textAlign: "center", fontSize:fontSize[0],
                                        
                                        }}/></div>


<a target="_blank" rel="noopener noreferrer" href={stat} style={{cursor: "pointer"}} title={obj?.getJson().statBlockLink}>
          <img src={bookCursor}  style={{width:"22px", height:"22px", objectFit:"scale-down", position:"absolute", margin:"-4px",}}
          />
          <TokenImage pic={obj?.getJson().picURL} width={88} app={app} colors={this.state.colors}/>
</a>

                          <div
                          
                          style={{display: "flex", height:"fit-content", width:"fit-content", fontWeight:"bold", fontFamily:"serif", 
                          textDecoration: styles.colors.colorWhite+"22 underline", textDecorationThickness: "1px", textUnderlineOffset: "4px",
                          textShadow:"1px 1px 0 "+styles.colors.colorBlack,
                          width:"485px", alignSelf:"center", 
                          alignItems:"center", justifyContent:"center", fontSize:fontSize[0],
                          overflowWrap:"break-word"}}>
                           {obj?.getJson().name}
                          </div>
                          
                          <div
                            style={{
                              display: "flex",
                              height: "fit-content",
                              width: "fit-content",
                              alignSelf: "center",
                              alignItems: "center",
                              justifyContent: "center",
                              flexDirection: "column",
                              textAlign: "center",
                            }}
                          >
                            <img style={{ alignSelf: "center", width: fontSize[0], }} src={ac}/>
                            <div style={{ alignSelf: "center", fontSize: fontSize[0], }}>{obj?.getJson().ac}</div>
                          </div>

                          <div
                            style={{
                              display: "flex",
                              height: "fit-content",
                              width: "fit-content",
                              alignSelf: "center",
                              alignItems: "center",
                              justifyContent: "center",
                              flexDirection: "column",
                              textAlign: "center",
                            }}
                          >
                            <div style={{ alignSelf: "center", fontSize: fontSize[0], }}>HP</div>
                            <div style={{ alignSelf: "center", fontSize: fontSize[0], }}>{obj?.getJson().hp}</div>
                          </div>


{/* <div style={{display: "flex", height:"fit-content", width:"fit-content", fontWeight:"bold", fontFamily:"serif", 
                          textShadow:"1px 1px 0 "+styles.colors.colorBlack,
                          width:"fit-content", alignSelf:"center",
                          alignItems:"center", justifyContent:"center", fontSize:fontSize[0],}}>

                                        <Roll app={app} obj={this.props.obj} fontSize={fontSize}
                                        style={{  display: "flex",
                                        height: "fit-content",
                                        width: "fit-content",
                                        alignSelf: "center",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexDirection: "column",
                                        textAlign: "center", fontSize:fontSize[0],
                                        
                                        }}/></div> */}
                </div>
        </div>
        </div>

        </div>
    )
  }
  }


