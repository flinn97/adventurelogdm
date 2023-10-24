import { Component } from 'react';
import "../App.css"


import { Link, } from 'react-router-dom';

export default class ListTreeLink extends Component {
  constructor(props) {
    
    super(props);
    this.state = {

    }
    
  }
  
  render() {
    let app = this.props.app;
    let dispatch = app.dispatch
    let state = app.state;

    let styles = state.styles;
    let obj = this.props.obj;
    let name = this.props.props.name
    let href = window.location.href;
    let splitURL = href.split("/");
    let id = splitURL[splitURL.length-1];
    let newLink = "";
    if(id.includes("-")){
     
     let idList = id.split('-');
     newLink = idList[0] + "-" + obj.getJson()._id
    }
    
    else{
      newLink = id + "-" + obj.getJson()._id
    }
    if(obj.getJson().parentLore===true){
      
     let idList = id.split('-');
     newLink= idList[0];
    }
    return (<Link target='_blank' to={"../campaign/"+newLink}>{obj.getJson()[name]}</Link>
        
    )
  }
}



