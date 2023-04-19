import React, { Component } from 'react';
// import auth from '../services/auth';
import "../App.css";

import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import NavBar from './navBar';





export default class Nav extends Component {
  constructor(props){
    super(props);
  }
  
  render(){
    let app = this.props.app;
    let state = app.state;
    let styles = state.styles;
    
    let switchCase = app.state.switchCase;
    let dispatch = app.dispatch;
    //Options
    
     
    let type = {
      topBarNav: <NavBar app={app} alignment="top"
      template={this.props.template}
      obj={this.props.obj}
      options={{...this.props.options}}
      theme={this.props.theme} />,
      sideBarNav: <NavBar  app={app} alignment="left"
      template={this.props.template}
      obj={this.props.obj}
      options={{...this.props.options}}
      theme={this.props.theme}
      />

    }
  return (
    <>
    
      {this.props.type? type[this.props.type]:type.topBarNav}
      </>
  )}
}