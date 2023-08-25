import { Component } from 'react';
import "../App.css"
import MapComponent from '../componentListNPM/mapTech/mapComponent';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import backarrow from '../pics/backArrow.webp';




export default class ExpandTreeArrow extends Component {
  constructor(props) {
    super(props);
    this.state = {  
      expanded:false,
    };
  }

 
render() {
  let app = this.props.app;
  let obj = this.props.obj;
  let fontSize = this.props.fontSize;
  let state = app.state;
  let dispatch = app.dispatch;
  let styles =state.styles;

  return(
    <div style={{cursor:"pointer", }}>
      <img 
      onClick={() => {
        this.setState({ expanded: !this.state.expanded });
        let r = state.currentExpanse ? state.currentExpanse : [];
        const id = obj.getJson()._id;
        
        const index = r.indexOf(id);
        if (index !== -1) {
          r.splice(index, 1);
        } else {
          r.push(id);
        }
      
        dispatch({ currentExpanse: r });
      }}
      src={backarrow} style={{ transition:"all .4s ease-out",
        transform:this.state.expanded?"rotate(270deg)":"rotate(180deg)", filter: "grayscale(100%) contrast(300%) brightness(200%)",
         objectFit:"contain", width:"28px"}}></img>
    </div>
    )
}
}


