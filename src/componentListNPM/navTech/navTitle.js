import { Component } from 'react';
// import auth from '../services/auth';
import "../App.css";

import { BrowserRouter, Link, redirect, Route, Routes } from 'react-router-dom';
import NavThemeFactory from '../navThemes/navThemeFactory';

export default class NavTitle extends Component {
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

      // legato: <LegatoTitle app={app} alignment={this.props.alignment} theme={this.props.theme} obj={this.props.obj} options={this.props.options}
      // navTitleStyle={this.props.options?.navTitleStyle}
      // navTitleTheme={this.props.options?.navTitleTheme} />,

      // legatoDark: <LegatoTitle app={app} alignment={this.props.alignment} theme={this.props.theme} obj={this.props.obj} options={this.props.options}
      // navTitleStyle={this.props.options?.navTitleStyle}
      // navTitleTheme={this.props.options?.navTitleTheme} />,

      flinnApps: <FlinnAppsTitle app={app} alignment={this.props.alignment} theme={this.props.theme} obj={this.props.obj} options={this.props.options}
      navTitleStyle={this.props.options?.navTitleStyle}
      navTitleTheme={this.props.options?.navTitleTheme} />,

      default: <DefaultTitle app={app} alignment={this.props.alignment} theme={this.props.theme} obj={this.props.obj} options={this.props.options}
      navTitleStyle={this.props.options?.navTitleStyle}
      navTitleTheme={this.props.options?.navTitleTheme} />,
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

class DefaultTitle extends Component {
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
    let title = style[this.props.alignment];
  return (
    <div style={{...title.navTitleStyle}}>Test</div>
  )}
}

class FlinnAppsTitle extends Component {
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
    let title = style[this.props.alignment];
  return (
    <div style={{...title.navTitleStyle}}>Test</div>
  )}
}