import { Component } from 'react';
// import auth from '../services/auth';
import "../App.css";

import { BrowserRouter, Link, redirect, Route, Routes } from 'react-router-dom';
import NavThemeFactory from '../navThemes/navThemeFactory';

export default class Logo extends Component {
  constructor(props){
    super(props);
    this.state={
      f: NavThemeFactory?.getNavThemeFactory()
    }
  }

  render(){
    let app = this.props.app;
    let state = app.state;
    let styles = state.styles;
    
    let switchCase = app.state.switchCase;
    let dispatch = app.dispatch;
    let theme = {

      legato: <LegatoLogo logo={this.props.logo} app={app} alignment={this.props.alignment} theme={this.props.theme} obj={this.props.obj} options={this.props.options}
      logoImageStyle={this.props.options?.logoImageStyle} 
      logoImageTheme={this.props.options?.logoImageTheme} />,

      legatoDark: <LegatoLogo logo={this.props.logo} app={app} alignment={this.props.alignment} theme={this.props.theme} obj={this.props.obj} options={this.props.options}
      logoImageStyle={this.props.options?.logoImageStyle} 
      logoImageTheme={this.props.options?.logoImageTheme} />,

      flinnApps:<FlinnAppsLogo logo={this.props.logo} app={app} alignment={this.props.alignment} theme={this.props.theme} obj={this.props.obj} options={this.props.options}
      logoImageStyle={this.props.options?.logoImageStyle} 
      logoImageTheme={this.props.options?.logoImageTheme} />,

      minimal:<MinimalLogo logo={this.props.logo} app={app} alignment={this.props.alignment} theme={this.props.theme} obj={this.props.obj} options={this.props.options}
      logoImageStyle={this.props.options?.logoImageStyle} 
      logoImageTheme={this.props.options?.logoImageTheme} />,

      default:<DefaultLogo logo={this.props.logo} app={app} alignment={this.props.alignment} theme={this.props.theme} obj={this.props.obj} options={this.props.options}
      logoImageStyle={this.props.options?.logoImageStyle} 
      logoImageTheme={this.props.options?.logoImageTheme} />,
    }
    let f = NavThemeFactory?.getNavThemeFactory();
    let style = this.props.theme?f[this.props.theme]:state.theme?f[state.theme]:f.default;
    let wrapper = style[this.props.alignment];
  return (
    <div style={this.props.options?.logoWrapperStyle?{...this.props.options?.logoWrapperStyle}:this.props.options?.logoWrapperTheme?{...f[this.props.options?.logoWrapperTheme][this.props.alignment].logoWrapper}:{...wrapper?.logoWrapper}}>
      
      {this.props.logoTheme?theme[this.props.logoTheme]:this.props.theme?theme[this.props.theme]:theme.default}
    </div>
        
  )}
}

class DefaultLogo extends Component {
  constructor(props){
    super(props);
  }

  render(){
    let app = this.props.app;
    let state = app.state;
    let styles = state.styles;
    
    let switchCase = app.state.switchCase;
    let dispatch = app.dispatch;
    let f = NavThemeFactory?.getNavThemeFactory();
    let style = this.props.theme?f[this.props.theme]:state.theme?f[state.theme]:f.default;
    let logo = style[this.props.alignment];
  return (
      <img src={this.props.logo} style={this.props.logoImageStyle?{...this.props.logoImageStyle}:this.props.logoImageTheme?{...f[this.props.logoImageTheme][this.props.alignment].logoStyle}:{...logo.logoStyle}} />
  )}
}


class FlinnAppsLogo extends Component {
  constructor(props){
    super(props);
  }

  render(){
    let app = this.props.app;
    let state = app.state;
    let styles = state.styles;
    
    let switchCase = app.state.switchCase;
    let dispatch = app.dispatch;
    let f = NavThemeFactory?.getNavThemeFactory();
    let style = this.props.theme?f[this.props.theme]:state.theme?f[state.theme]:f.default;
    let logo = style[this.props.alignment];
  return (
      <img src={this.props.logo} style={this.props.logoImageStyle?{...this.props.logoImageStyle}:this.props.logoImageTheme?{...f[this.props.logoImageTheme][this.props.alignment].logoStyle}:{...logo.logoStyle}} />
  )}
}

class LegatoLogo extends Component {
  constructor(props){
    super(props);
  }

  render(){
    let app = this.props.app;
    let state = app.state;
    let styles = state.styles;
    
    let switchCase = app.state.switchCase;
    let dispatch = app.dispatch;
    let f = NavThemeFactory?.getNavThemeFactory();
    let style = this.props.theme?f[this.props.theme]:state.theme?f[state.theme]:f.default;
    let logo = style[this.props.alignment];
  return (
      <img src={this.props.logo} style={this.props.logoImageStyle?{...this.props.logoImageStyle}:this.props.logoImageTheme?{...f[this.props.logoImageTheme][this.props.alignment].logoStyle}:{...logo.logoStyle}} />
  )}
}

class MinimalLogo extends Component {
  constructor(props){
    super(props);
  }

  render(){
    let app = this.props.app;
    let state = app.state;
    let styles = state.styles;
    
    let switchCase = app.state.switchCase;
    let dispatch = app.dispatch;
    let f = NavThemeFactory?.getNavThemeFactory();
    let style = this.props.theme?f[this.props.theme]:state.theme?f[state.theme]:f.default;
    let logo = style[this.props.alignment];
  return (
      <img src={this.props.logo} style={this.props.logoImageStyle?{...this.props.logoImageStyle}:this.props.logoImageTheme?{...f[this.props.logoImageTheme][this.props.alignment].logoStyle}:{...logo.logoStyle}} />
  )}
}