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
  let name = obj.getJson().name;
  
  let fontSize = this.props.fontSize;
  let state = app.state;
  let dispatch = app.dispatch;
  let styles =state.styles;

  let id1 = obj.getJson()._id;
  let index1 = state.currentExpanse?.indexOf(id1);
  
  let compList = state.componentList.getList("lore", id1, "parentId")
  let l = compList.length;


  return(
    <div>
      {(name) &&
    <div  className="hover-img" style={{
      cursor: l!==0?"pointer":"", fontSize:"16px", textDecoration:"underline", verticalAlign:"center", textAlign:"auto", 
    alignContent:"stretch",
    marginBottom:l===0?"5px":"11px",}}
    onClick={() => {
      this.setState({ expanded: !this.state.expanded });
      
      let r = state.currentExpanse ? state.currentExpanse : [];
      const id = id1;
      
      const index = r.indexOf(id);
      if (index !== -1) {
        r.splice(index, 1);
      } else {
        r.push(id);
      }
      
      dispatch({ currentExpanse: r });
    }}
    > 
    {/* {this.state.expanded?"hide":"expand"} */}
    
      <img 
      
      src={backarrow} style={{ transition:"all .4s ease-out", marginLeft:"4px", verticalAlign:"center", 
        transform:this.state.expanded?"rotate(270deg)":"rotate(180deg)", 
        filter: "grayscale(100%) contrast(300%) brightness(200%)",
         objectFit:"contain", 
         opacity:l===0?"0%":"100%",
         width:l===0?"2px":"15px"}}></img>
    </div>
     }
      </div>
    )
}
}


