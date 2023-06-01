import { Component } from 'react';
import MapComponent from '../componentListNPM/mapTech/mapComponent';
import AddParticipant from './AddParticipant';
import Roll from './Roll';
import placeholder from '../pics/placeholderEncounter.JPG';

export default class Encounter extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }
 
  async componentDidMount(){
    await this.props.app.state.opps.run()
    let href = window.location.href;
    let splitURL = href.split("/")
    let id = splitURL[splitURL.length-1]
    let component = this.props.app.state.componentList.getComponent("encounter", id)
  this.setState({obj: component})
  }

  render() {
    let app = this.props.app;
    let state = app.state;
    let dispatch = app.dispatch;
    let radius = "2vmin";

    return (
      <div>
            <div style={{
              marginTop:"3vmin", flexDirection: 'row', justifyContent:"space-evenly", 
              width: '100%', height: '100%',  borderRadius:"2vmin", borderRadius:radius,
              backgroundRepeat: "no-repeat",  backgroundPosition: "50% 50%",  backgroundSize:"cover",
              backgroundImage: 'url('+(this.state.obj?.getJson().picURL||placeholder)+')',
          }}>
          <div style={{fontSize:"22px", flexDirection: 'row', justifyContent:"space-evenly", 
              width: '100%', height: '100%',  borderRadius:"2vmin", borderRadius:radius,
              backgroundColor: "#ffffff55", padding:"2vmin"}}>
          Encounter {this.state.obj?.getJson().name}</div>
          </div>
            
            {this.state.obj?.getJson().description}
            {this.state.obj?.getJson().audio}
            
            {(state.currentComponent?.getJson().type === "monster" && state.popUpSwitchcase === "addParticipant") && <AddParticipant app = {app}/>}
            <div style={{color: "red"}} onClick={()=>{dispatch({operate: "addmonster", operation: "cleanPrepare", popUpSwitchcase: "addParticipant"})}}>Add Monster</div>
            <MapComponent app={app} name={"monster"} cells={["name", {custom: Roll, props: this.props},"ac","statBlockLink","notes"]}  />
            Encounter Manager
            <MapComponent app={app} name={"encounterList"} cells={["name"]} />
      </div>

    )
  }
}

