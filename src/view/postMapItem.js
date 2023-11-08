import { Component } from 'react';
import "../App.css"
import LoreLogComponent from './pages/LogComponents/loreLogComponent';
import ImageLogComponent from './pages/LogComponents/imageLogComponent';



export default class PostMapItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      obj: this.props.obj,
    }

    this.componentMap = {
      'image': ImageLogComponent,
      'lore': LoreLogComponent,
      // ... add other mappings ...
    };
  }
 
 whichUser(){
    let app = this.props.app;
    let dispatch = app.dispatch
    let state = app.state;
    let obj = this.props.obj;
    let user =  app.state?.email;
    let user2 =  obj.getJson()?.collection;
        if (user = user2){
          return true
        }else{
          return false
        }
  };


  render() {
    let app = this.props.app;
    let dispatch = app.dispatch
    let state = app.state;
    let styles = state.styles;
    let obj = this.props.obj;
    let index = this.props.index;
    let isYou = this.whichUser();
    const marginUser = isYou?"23%":"0px"
    let pType = obj.getJson().postType;

    let oColors =  obj.getJson().colors ? obj.getJson()?.colors[0]:styles.colors.color9;

    const LogComponent = this.componentMap[pType];

    return (
      <div style={{ display: "flex",
                  flexDirection: "row",
                  maxWidth: "77%", border:"solid 1px "+styles.colors.colorWhite+"22", borderRadius:"11px", padding:"1px 5px",
                  fontSize: styles.fonts.fontNormal,
                  alignSelf: "flex-end", justifySelf:"flex-end",
                  background: styles.colors.colorBlack + "44",                
                  marginLeft: marginUser, 
      }}>
          {LogComponent ? (<LogComponent {...this.props} />) : null}
          {isYou &&
          <div style={{ display:"flex",
            width:"2px", backgroundColor: oColors, marginTop:"2%", marginBottom:"2%", marginLeft:"11px"}}>

            </div>}
      </div>


      
    )
  }
}


