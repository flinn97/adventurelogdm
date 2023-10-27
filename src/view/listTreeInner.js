import { Component } from 'react';
import "../App.css"

import MapComponent from '../componentListNPM/mapTech/mapComponent';

import ExpandTreeArrow from './expandTreeArrow';
import ListTree from './listTree';

export default class ListTreeInner extends Component {
  constructor(props) {
    
    super(props);
    this.state = {
      obj: undefined,
      pic: undefined,
      usage: 0,
    }
    
  }

  render() {
    let app = this.props.app;
    let dispatch = app.dispatch
    let state = app.state;

    let styles = state.styles;
    let id = this.props.obj.getJson()._id;

    return (<div style={{display:"flex",flexDirection:"column",alignItems:"center"}} >
       {state.currentExpanse?.includes(id)
       &&
       <div >
       <ListTree app={app} name={"lore"} attribute={"parentId"} _id={id}/>
       </div>
       }
        </div>
        
    )
  }
}


