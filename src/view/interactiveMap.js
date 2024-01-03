import React, { Component } from 'react'; 
import "../App.css"

import InteractiveMapItem from './interactiveMapItem';
import Upload from './upload';
import MapComponent from '../componentListNPM/mapTech/mapComponent';
import ParentFormComponent from '../componentListNPM/componentForms/parentFormComponent';

export default class InteractiveMap extends Component {
  constructor(props) {
    super(props);
      this.currentMap = React.createRef();
      this.printref = this.printref.bind(this);
      this.pin = this.pin.bind(this);
      this.updateMap = this.updateMap.bind(this);
      this.finishUpdate = this.finishUpdate.bind(this);
    this.state = {
      arr: [],
      map: undefined
    }
  }
  updateMap(component){
    this.setState({map: component, change: true})
  }
  componentDidUpdate(){
    if(this.state.change){
      this.setState({change:false})
      let el = document.getElementById("map");
      if(el){
        el.addEventListener("mousedown", this.pin)
      }
  
      
      this.setState({width: this.currentMap?.current?.width, height: this.currentMap?.current?.height,})
    }
  }

  async componentDidMount(){
    
    let map = await this.props.app.state.opps.cleanPrepare({addinteractiveMap: 1})
    map = map.add[0]
    let el = document.getElementById("map");
    if(el){
      el.addEventListener("mousedown", this.pin)
    }

    
    this.setState({width: this.currentMap?.current?.width, height: this.currentMap?.current?.height, map:map})
    
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.printref);

}
  pin(event){
    
    // console.log(event)
    let target = event.target
    let params = target.getBoundingClientRect()
    let x =  (event.x - params.left)
    let y =  (event.y - params.top)
    // console.log(params)
    if(target.id==="map"){
    let obj= {
      title: "new pin",
      left:x,
      top: y,
    };
    
    //console.log(x)
    //console.log(y)
    this.props.app.dispatch({operation: "jsonPrepareRun", operate: "addpin", object: obj})
    
  }
}
  printref(event){
    //
    if (this.currentMap && this.currentMap.current.contains(event.target)) {
      //console.log(this.currentMap);
    
}
  }
  finishUpdate(update){
    this.setState({[update]:false})
  }

  render() {
    let app = this.props.app;
    let state = app.state;
    let componentList = state.componentList;
    let styles =state.styles;

    return (
     
      <div style={{positon:"absolute", display: "flex", flexDirection: "row", width: "80vw", justifyContent: "space-between", marginBottom:"2vh", 
      height:"fit-content", objectFit:"scale-down" }}>
      {this.state.map &&( <>{this.state.map.getJson().picURL===""
      ?(
      <div>
          <ParentFormComponent app={app} name="mapTitle" label="Map Name" 
        wrapperStyle={{margin: "5px", color:styles.colors.colorWhite, display:"flex",flexDirection:"column", marginTop:"2vh"}}
        theme={"adventureLog"} rows={1}
        maxLength={110}
        labelStyle={{marginBottom:"8px"}}
        inputStyle={{width:"58.1rem", padding:"4px 9px", color:styles.colors.colorBlack, height:"1.7rem", rows:"1",
        borderRadius:"4px",background:styles.colors.colorWhite+"aa", borderWidth:"0px",
        }}/>
        <Upload obj={this.state.map} app={app} //ADD THIS TO ALL UPLOADS//
              changePic={(pic)=>{this.setState({pic:pic})}} 
              text="Set Background" style={{display:"flex",
              zIndex:"1", borderRadius:".1vmin", background:"", }} 
              update={true} skipUpdate={true} 
              updateMap={(obj)=>{this.setState({completedPic: obj.getJson().picURL})}}/>
    
      </div>
      
      
      ):(
        
      <div  style={{position: "relative", height: "100%", width:"100%"}}>
        <div  style={{position: "relative", height: "fit-content", width:"100%"}}></div>

        <div style={{display:"flex", height: "fit-content", width:"fit-content",  objectFit:"scale-down" }}>
          <img id="map" ref={this.currentMap} src={this.state.map.getJson().picURL} draggable="false"
          style={{display: "flex", flexDirection: "row", justifyContent:"space-between",borderRadius:"2vw", objectFit:"scale-down" , 
          userSelect:"none",
          width:"85vw",
          }}/>

          {componentList.getList("pin",).map((mark,index )=>

          <InteractiveMapItem top={mark.getJson().top } left={mark.getJson().left} obj={mark} app={app} 
          finishUpdate={this.finishUpdate} state={this.state}  ref = {this.currentMap} src={this.state.map.getJson().picURL} />)}
        </div>
        
       
      </div>)}</>)}
      <div style={{width: "100px"}}>
      <MapComponent app={app} name={"pin"} cells={["title"]}  functions={{cells:[0 ], functions: [(obj)=>{
                
                this.setState({[obj.getJson()._id +"update"]:true});
                        
               }]}}/></div>
    </div>) 
  }
}

