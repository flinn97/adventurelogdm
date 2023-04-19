import { Component } from 'react';
//what do I change the below imports to again? Do I need to pass down the actual font import to each component or just the container?
import defaultProfilePic from './fakePortrait.png';
import arrowIcon from './downArrow.svg';
// import '../fonts/Inter/Inter-ExtraBold.ttf';
// import auth from '../services/auth';
import "../App.css";

import { BrowserRouter, Link, redirect, Route, Routes } from 'react-router-dom';
import NavThemeFactory from '../navThemes/navThemeFactory';
export default class ProfilePic extends Component {
  constructor(props){
    super(props);
  }

  render(){
    let app = this.props.app;
    let state = app.state;
    let styles = state.styles;
    
    let switchcase = app.state.switchcase;
    let dispatch = app.dispatch;
    let theme = {
      legato: <LegatoProfilePic app={app} alignment={this.props.alignment} theme={this.props.theme}  obj={this.props.obj} options={this.props.options}
      profilePicInnerWrapperTheme={this.props.options?.profilePicInnerWrapperTheme}
      profilePicInnerWrapperStyle={this.props.options?.profilePicInnerWrapperStyle}
      profilePicImageStyle={this.props.options?.profilePicImageStyle}
      profilePicImageTheme={this.props.options?.profilePicImageTheme}
      />,
      legatoDark: <LegatoProfilePic app={app} alignment={this.props.alignment} theme={this.props.theme}  obj={this.props.obj} options={this.props.options}
      profilePicInnerWrapperTheme={this.props.options?.profilePicInnerWrapperTheme}
      profilePicInnerWrapperStyle={this.props.options?.profilePicInnerWrapperStyle}
      profilePicImageStyle={this.props.options?.profilePicImageStyle}
      profilePicImageTheme={this.props.options?.profilePicImageTheme}
      />,
      flinnApps: <FlinnAppsProfilePic app={app} alignment={this.props.alignment} theme={this.props.theme}  obj={this.props.obj} options={this.props.options}/>,
      minimal: <MinimalProfilePic app={app} alignment={this.props.alignment} theme={this.props.theme}  obj={this.props.obj} options={this.props.options}
      profilePicInnerWrapperTheme={this.props.options?.profilePicInnerWrapperTheme}
      profilePicInnerWrapperStyle={this.props.options?.profilePicInnerWrapperStyle}
      profilePicImageStyle={this.props.options?.profilePicImageStyle}
      profilePicImageTheme={this.props.options?.profilePicImageTheme}
      />,
      default: <DefaultProfilePic app={app} alignment={this.props.alignment} theme={this.props.theme}  obj={this.props.obj} options={this.props.options}/>,
    }
    let f = NavThemeFactory?.getNavThemeFactory();
    let style = this.props.theme?f[this.props.theme]:state.theme?f[state.theme]:f.default;
    let wrapper = style[this.props.alignment];
  return (
    <div style={this.props.options?.profilePicWrapperStyle?{...this.props.options?.profilePicWrapperStyle}:this.props.options?.profilePicWrapperTheme?{...f[this.props.options?.profilePicWrapperTheme][this.props.alignment].profilePicWrapper}:{...wrapper?.profilePicWrapper}}>
      {this.props.options?.profilePicTheme?theme[this.props.options?.profilePicTheme]:this.props.theme?theme[this.props.theme]:theme.default}
    </div>
  )}
}

class LegatoProfilePic extends Component {
  constructor(props){
    super(props);
    this.logout=this.logout.bind(this);
  }
  logout(){

  }

  render(){
    let app = this.props.app;
    let state = app.state;
    let styles = state.styles;
    
    let switchcase = app.state.switchcase;
    let dispatch = app.dispatch;

    let f = NavThemeFactory?.getNavThemeFactory();
    let style = this.props.theme?f[this.props.theme]:state.theme?f[state.theme]:f.default;
    let item = style[this.props.alignment];
  return (
    <>
      <div
       style={this.props.profilePicInnerWrapperStyle?{...this.props.profilePicInnerWrapperStyle}:
       this.props.profilePicInnerWrapperTheme?{...f[this.props.profilePicInnerWrapperTheme][this.props.alignment].profilePicInnerWrapper}:
       {...item.profilePicInnerWrapper}}
      > 
        <img src={this.props.obj?.getJson()?.picURL!==undefined?this.props.obj?.getJson().picURL:defaultProfilePic}  style={this.props.profilePicImageStyle?{...this.props.profilePicImageStyle}:
       this.props.profilePicImageTheme?{...f[this.props.profilePicImageTheme][this.props.alignment].profilePicImage}:
       {...item.profilePicImage}}/>
        <div style={{...item.profilePicStyles?.innerWrapper}}>
          <div style={{...item.profilePicStyles?.nameWrapper}}>
            {/* <div style={{...item.profilePicStyles?.name }}>{this.props.obj?.getJson()?.firstName} {this.props.obj?.getJson()?.lastName}</div> */}
            {/* Hardcoded the bottom line to test CSS styling. The line below should be replaced with the commented line above this one */}
            <div style={{...item.profilePicStyles?.name }}>Sam Sabin</div>
            <div style={{...item.profilePicStyles?.arrowWrapper}}><img src={arrowIcon} style={{...item.profilePicImage.arrow}}/></div>
          </div>
          <div  style={{...item.profilePicStyles.logout}} onClick={this.props.options?.logoutFunc?this.props.options?.logoutFunc():this.logout}>log out</div>
        </div>
      </div>
    </>
        
  )}
}

class FlinnAppsProfilePic extends Component {
  constructor(props){
    super(props);
    this.logout=this.logout.bind(this);
  }
  logout(){
    
  }

  render(){
    let app = this.props.app;
    let state = app.state;
    let styles = state.styles;
    
    let switchcase = app.state.switchcase;
    let dispatch = app.dispatch;

    let f = NavThemeFactory?.getNavThemeFactory();
    let style = this.props.theme?f[this.props.theme]:state.theme?f[state.theme]:f.default;
    let item = style[this.props.alignment];
  return (
    <>
    <div
     style={this.props.profilePicInnerWrapperStyle?{...this.props.profilePicInnerWrapperStyle}:
     this.props.profilePicInnerWrapperTheme?{...f[this.props.profilePicInnerWrapperTheme][this.props.alignment].profilePicInnerWrapper}:
     {...item.profilePicInnerWrapper}}
    > 
      <img src={this.props.obj?.getJson()?.picURL!==undefined?this.props.obj?.getJson().picURL:defaultProfilePic}  style={this.props.profilePicImageStyle?{...this.props.profilePicImageStyle}:
     this.props.profilePicImageTheme?{...f[this.props.profilePicImageTheme][this.props.alignment].profilePicImage}:
     {...item.profilePicImage}}/>
      <div style={{...item.profilePicStyles?.innerWrapper}}>
        <div style={{...item.profilePicStyles?.nameWrapper}}>
          <div style={{...item.profilePicStyles?.name }}>{this.props.obj?.getJson()?.firstName} {this.props.obj?.getJson()?.lastName}</div>
          <div style={{...item.profilePicStyles?.arrowWrapper}}><img src={arrowIcon} style={{...item.profilePicImage.arrow}}/></div>
        </div>
        <div  style={{...item.profilePicStyles.logout}} onClick={this.props.options?.logoutFunc?this.props.options?.logoutFunc():this.logout} >log out</div>
      </div>
    </div>
  </>
        
  )}
}

class MinimalProfilePic extends Component {
  constructor(props){
    super(props);
    this.logout=this.logout.bind(this);
  }
  logout(){
    
  }

  render(){
    let app = this.props.app;
    let state = app.state;
    let styles = state.styles;
    
    let switchcase = app.state.switchcase;
    let dispatch = app.dispatch;

    let f = NavThemeFactory?.getNavThemeFactory();
    let style = this.props.theme?f[this.props.theme]:state.theme?f[state.theme]:f.default;
    let item = style[this.props.alignment];
  return (
    <>
    <div
     style={this.props.profilePicInnerWrapperStyle?{...this.props.profilePicInnerWrapperStyle}:
     this.props.profilePicInnerWrapperTheme?{...f[this.props.profilePicInnerWrapperTheme][this.props.alignment].profilePicInnerWrapper}:
     {...item.profilePicInnerWrapper}}
    > 
      <img src={this.props.obj?.getJson()?.picURL!==undefined?this.props.obj?.getJson().picURL:defaultProfilePic}  style={this.props.profilePicImageStyle?{...this.props.profilePicImageStyle}:
     this.props.profilePicImageTheme?{...f[this.props.profilePicImageTheme][this.props.alignment].profilePicImage}:
     {...item.profilePicImage}}/>
    </div>
  </>
        
  )}
}

class DefaultProfilePic extends Component {
  constructor(props){
    super(props);
    this.logout=this.logout.bind(this);
  }
  logout(){

  }

  render(){
    let app = this.props.app;
    let state = app.state;
    let styles = state.styles;
    
    let switchcase = app.state.switchcase;
    let dispatch = app.dispatch;

    let f = NavThemeFactory?.getNavThemeFactory();
    let style = this.props.theme?f[this.props.theme]:state.theme?f[state.theme]:f.default;
    let item = style[this.props.alignment];
  return (
   
        <img src={this.props.obj?.getJson()?.picURL!==undefined?this.props.obj?.getJson().picURL:defaultProfilePic} style={this.props.profilePicImageStyle?{...this.props.profilePicImageStyle}:
        this.props.profilePicImageTheme?{...f[this.props.profilePicImageTheme][this.props.alignment].profilePicImage}:
        {...item.profilePicImage}}/>
       
        
  )}
}