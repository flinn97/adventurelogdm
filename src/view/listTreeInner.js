import { Component } from 'react';
import "../App.css"

import MapComponent from '../componentListNPM/mapTech/mapComponent';

import ExpandTreeArrow from './expandTreeArrow';
import ListTree from './listTree';

export default class ListTreeInner extends Component {
  constructor(props) {
    
    super(props);
    this.showList=0;

    this.state = {
      obj: undefined,
      pic: undefined,
      usage: 0,
    }
    
  }

  render() {
    let app = this.props.app;
  let dispatch = app.dispatch;
    let state = app.state; 
    let styles = state.styles;
    let bool = true;
    if(state.currentExpanse?.indexOf(this.props.obj.getJson()._id)===state.currentExpanse?.length-1){
      debugger
      this.showList= 1;
    }

    console.log(this.props.obj.getJson()._id)
    console.log(this.showList)
    

    
    let id = this.props.obj.getJson().reference? this.props.obj.getJson().ogId:this.props.obj.getJson()._id;
    // console.log(this.props.obj, id)
    return (<div style={{display:"flex",flexDirection:"column",alignItems:"center", paddingLeft:"11%", textDecoration:"none", 
    }} >
       {state.currentExpanse?.includes(this.props.obj.getJson()._id)
       && (this.showList===1 ) &&
       <div className='hover-stacked' style={{backgroundColor:styles.colors.color2+"7b", textDecoration:"none", }}>
        {/* {!this.props.obj.getJson().reference&& */}
       <ListTree app={app} name={"lore"} attribute={"parentId"} _id={id} count={this.props.props.c + 1} />
      {/* } */}
       </div>
       }
        </div>
        
    )
  }
}


