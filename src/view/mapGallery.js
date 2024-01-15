import React, { Component } from 'react'; 
import "../App.css"
import backarrow from '../pics/backArrow.webp';
import InteractiveBulletin from './interactiveBulletin';

export default class MapGallery extends Component {
  constructor(props) {
    super(props);
    this.updateSize=this.updateSize.bind(this);
    this.state = {
     mapList:[],
     lore: this.props.obj,
     currentMap:"",
     showMap:false,
    }}

    componentDidMount(){
      let obj = this.props.obj;
      let app = this.props.app;
      let dispatch = app.dispatch;
      let state = app.state;
      let componentList = state.componentList;
                                        //type , value to search,   filter key
      let mapList = componentList.getList("map", obj.getJson()._id, "loreId");
      let currentMap = mapList[0];
      if (mapList.length > 0){
      this.setState({mapList:mapList, currentMap:currentMap, showMap:true});
    }
    }

    updateSize(width, height){
      this.setState({
        bulletinWidth:width+"px",
        bulletinHeight:height+"px"
      })
      this.props.updateSize(width,height)
    }
    
    componentDidUpdate(props, state){
      let obj = this.props.obj;
      let app = this.props.app;
      let dispatch = app.dispatch;
      let currentState = app.state;
      let componentList = currentState.componentList;
      let mapList = componentList.getList("map",obj.getJson()._id,"loreId");
      if (state.mapList.length !== mapList.length)
      {
        this.setState({mapList:mapList, currentMap: mapList[mapList.length-1],})
      };
    }

    handleNextMap = () => {
      this.setState({showMap:false});
      let currentIndex = this.state.mapList.indexOf(this.state.currentMap);
      let nextIndex = currentIndex + 1;
      if (nextIndex < this.state.mapList.length) {
        this.setState({ currentMap: this.state.mapList[nextIndex] , showMap:true} , () => this.forceUpdate());
      }
    };

    handlePrevMap = () => {
      this.setState({showMap:false});
      let currentIndex = this.state.mapList.indexOf(this.state.currentMap);
      let prevIndex = currentIndex - 1;
      if (prevIndex >= 0) {
        this.setState({ currentMap: this.state.mapList[prevIndex], showMap:true } , () => this.forceUpdate());
      }
    };
  
  render() {
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles = state.styles;
    let index = this.state.mapList?.indexOf(this.state.currentMap);


    return (
                      //ALWAYS 100% 100% DONT CHANGE THIS, change the PARENT div
      <div style={{width:"100%", display:"flex", height:"100%",
      position:"absolute", 
      }}>

       

        {this.state.mapList?.indexOf(this.state.currentMap)!==0 && this.state.currentMap &&
        <div className="hover-btn"
        onClick={this.handlePrevMap}
        style={{...styles.buttons.buttonAdd, padding:"0px", paddingRight:"10px", borderColor:styles.colors.color3, cursor:"pointer",
        backgroundColor:styles.colors.colorBlack+"dd", color:styles.colors.colorWhite+"dd",
        position:"absolute", zIndex:"200", top: "-72px", right:"220px" }}>
          
          <img src={backarrow} style={{width:"40px", height:"40px", marginRight:"15px", marginLeft:"10px", marginTop:"1px",padding:"5px", }}></img>
          Prev Map
          </div>}

          {this.state.mapList?.indexOf(this.state.currentMap)!==(this.state?.mapList.length-1) &&
        <div className="hover-btn"
        onClick={this.handleNextMap}
        style={{...styles.buttons.buttonAdd, padding:"0px", paddingLeft:"10px", borderColor:styles.colors.color3, cursor:"pointer",
        backgroundColor:styles.colors.colorBlack+"dd", color:styles.colors.colorWhite+"dd", position:"absolute", zIndex:"200", top: "-72px", right:"20px" }}>
          Next Map
          <img src={backarrow} style={{width:"40px", height:"40px", marginLeft:"15px", marginRight:"10px", marginTop:"1px",padding:"5px", 
          transform:'rotate(180deg)' }}></img>
          </div>}

          
          
          

<div style={{ display:"flex", position:"absolute", height:"100%", width: "100%"}}>



  {this.state.currentMap && this.state.showMap &&
   
      <InteractiveBulletin app={app} obj={this.state.currentMap} color={this.props.color} updateSize = {this.updateSize}/>
      }

        {/* backgroundIMAGE */}
</div>
      </div>
      ) 
  }
}

