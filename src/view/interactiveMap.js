import React, { Component } from 'react'; 
import "../App.css"
import CardPractice from './CardPrac';
import map from '../interactiveMap.png';
import InteractiveMapItem from './interactiveMapItem';
import Upload from './upload';
import MapComponent from './mapComponent';

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
    debugger
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
    debugger
    console.log(event)
    let target = event.target
    let params = target.getBoundingClientRect()
    let x =  (event.x - params.left)
    let y =  (event.y - params.top)
    console.log(params)
    if(target.id==="map"){
    let obj= {
      title: "new pin",
      left:x,
      top: y,
    };
    
    console.log(x)
    console.log(y)
    this.props.app.dispatch({operation: "jsonPrepareRun", operate: "addpin", object: obj})
    
  }
}
  printref(event){
    debugger
    if (this.currentMap && this.currentMap.current.contains(event.target)) {
      console.log(this.currentMap);
    
}
  }
  finishUpdate(update){
    this.setState({[update]:false})
  }

  render() {
    let app = this.props.app;
    let state = app.state;
    let componentList = state.componentList;

    return (
     
      <div style={{positon:"absolute", display: "flex", flexDirection: "row", width: "80vw", justifyContent: "space-between"}}>
      {this.state.map &&( <>{this.state.map.getJson().picURL===""?(<Upload obj={this.state.map} updateMap = {this.updateMap}app={app}/>):(
      <div  style={{width: this.state.width,position: "relative", height: this.state.height}}>
        <img id="map" ref = {this.currentMap} src={this.state.map.getJson().picURL} style={{position: "absolute", maxWidth: "70vw"}}/>
        {componentList.getList("pin",).map((mark,index )=>
        <InteractiveMapItem top={mark.getJson().top } left={mark.getJson().left} obj={mark} app={app} finishUpdate={this.finishUpdate} state={this.state}/>)}
        
       

      </div>)}</>)}
      <div style={{width: "100px"}}>
      <MapComponent app={app} name={"pin"} cells={["title"]}  functions={{cells:[0 ], functions: [(obj)=>{
                
                this.setState({[obj.getJson()._id +"update"]:true});
                        
               }]}}/></div>
    </div>) 
  }
}

