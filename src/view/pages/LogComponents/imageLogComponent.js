import { Component } from 'react';
import '../../../App.css';



export default class ImageLogComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      obj: this.props.obj,
    }

  }
 
 componentDidMount(){
  let app = this.props.app;
    let dispatch = app.dispatch
  let obj = this.props.obj;
  let colors = obj.getJson()?.colors;
  if (!colors || colors.length === 0){
     
           obj?.setCompState({ colors: [this.props.colors] })
          dispatch({
            operate:"update", operation:"cleanPrepareRun", object: obj
          })
  }
 }

  render() {
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let styles = state.styles;
    let obj = this.props.obj;
    let index = this.props.index;

    let src = obj?.getJson().picURL;
    
    let colors = obj.getJson()?.colors?obj.getJson()?.colors:[styles.colors.colorWhite+"22"];
    let colorList = colors.length>1?obj.getJson()?.colors:[styles.colors.colorWhite+"22"];
    let colorN = colors.length>1?2:0;
    
    let srcT = obj.getJson().src?obj.getJson().src:""

    return (
      <div className="hover-img" title={"The GM sent this. "+srcT} style={{ justifyContent:"center",  maxHeight:"650px",
      display:"flex", flexDirection:"center", padding:"12px", width:"100%", cursor:"pointer",
                  flexDirection:"column",
      }}>
          <img
          onClick={()=>{
            dispatch({currentPic:obj, popupSwitch:"viewPic"})
                  }}  

           draggable="false"  alt={``}  src={src} style={{ objectFit:"cover",
            width:this.props.w, border:"3px solid "+colorList[colorN], maxHeight:this.props.w,
           maxWidth:"100%", borderRadius:"12px"}}/>

           {obj.getJson().src &&
           <div style={{maxWidth:"100%", height:"100%", textAlign:"right",color:styles.colors.color8,fontSize:".85rem", overflow:"clip", marginTop:"4px"}}
           title={"The GM sent this. "+srcT}
           >{srcT}
                  </div>
           }
      </div>
      
    )
  }
}


