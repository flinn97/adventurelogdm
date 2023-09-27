import React, { Component } from 'react'; 
import "../App.css"
import Upload from './upload';

import backarrow from '../pics/backArrow.webp';
import InteractiveBulletin from './interactiveBulletin';

export default class MapGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
     mapList:[],
     lore: this.props.obj,
     currentMap:""
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
      this.setState({mapList:mapList, currentMap:currentMap});
    }
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

  
  render() {
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles = state.styles;
    let index = this.state.mapList?.indexOf(this.state.currentMap);


    return (
                      //ALWAYS 100% 100% DONT CHANGE THIS, change the PARENT div
      <div style={{width:"100%", display:"flex", position:"absolute"}}>
        {this.state.mapList?.indexOf(this.state.currentMap)!==0 &&
        <div style={{...styles.buttons.buttonAdd, padding:"0px", paddingRight:"10px", borderColor:styles.colors.color3, 
        backgroundColor:styles.colors.colorBlack+"dd", color:styles.colors.colorWhite+"dd", marginRight:"-930px", }}>
          
          <img src={backarrow} style={{width:"40px", height:"40px", marginRight:"15px", marginLeft:"10px", marginTop:"1px",padding:"5px", }}></img>
          Prev Map
          </div>}

          {this.state.mapList?.indexOf(this.state.currentMap)!==(this.state?.mapList.length-1) &&
        <div style={{...styles.buttons.buttonAdd, padding:"0px", paddingLeft:"10px", borderColor:styles.colors.color3, 
        backgroundColor:styles.colors.colorBlack+"dd", color:styles.colors.colorWhite+"dd", marginRight:"30px", }}>
          Next Map
          <img src={backarrow} style={{width:"40px", height:"40px", marginLeft:"15px", marginRight:"10px", marginTop:"1px",padding:"5px", transform:'rotate(180deg)' }}></img>
          </div>}
<div style={{width:"100%", display:"flex", position:"absolute",}}>
      <InteractiveBulletin app={app} obj = {this.state.currentMap}/>
        {/* backgroundIMAGE */}
</div>
      </div>
      ) 
  }
}

