import { Component } from 'react';

import React from 'react';
import AdventureLogPage from './adventureLogPage';

export default class AdventureLogPageWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      start:false

    }
  }

// FIREBASE LISTENER add here

  async componentDidMount(){
   
  }

  render() {
    let app = this.props.app;
    let dispatch = app.dispatch
    let state = app.state;
    let styles =state.styles;
    
    let compList = state.componentList;
    let path = window.location.pathname;
    let parts = path.split('/');
    let idSegment = parts.pop();
    let campaigns = compList.getList("campaign", idSegment, "_id" )
    let currentCampId = campaigns?campaigns[0].getJson()._id:"";
    

//USE user role to determine what is passed into message
    let userRole = state.user.getJson().role;
    
    let sortedLogItems = compList.getList("post", currentCampId, "campaignId");

    let sLL = sortedLogItems.length;
    let newAmount = sortedLogItems.length - 100;
    
    let cleanedItems = sortedLogItems
    .slice(newAmount, sLL);

    
    return (
      <div style={{
        width:"100%", height:"100%", display:"flex",flexDirection:"column",  
         alignItems:"center", alignSelf:"center", justifySelf:"center",}}>
         
      </div >
    )
  }
}


// {this.state.start&&(
//   <AdventureLogPage app={app} />
//   )}