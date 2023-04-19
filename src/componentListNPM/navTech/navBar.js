import React, { Component } from 'react';
// import auth from '../services/auth';
import "../App.css";
import Legato from './legatoNavBar.js';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import NavThemeFactory from '../navThemes/navThemeFactory';
import DefaultNav from './defaultNavBar.js'
import FlinnApps from './flinnAppsNavBar.js';
import Minimal from './minimalNavBar.js';
import { LegatoPhone, FlinnAppsPhone, PhoneBottomNav } from './phoneUIComponents';
export default class NavBar extends Component {
  constructor(props){
    super(props);

  }
  
  render(){
    let app = this.props.app;
    let state = app.state;
    let styles = state.styles;
    
    let switchCase = app.state.switchCase;
    let dispatch = app.dispatch;
    let phoneUI = {
      legato : <LegatoPhone app={app} alignment={this.props.options?.phoneUIAlignment? this.props.options?.phoneUIAlignment: this.props.alignment} phoneUITheme={this.props.options?.phoneUITheme?this.props.options?.phoneUITheme: this.props.template } theme={this.props.iphoneStyleTheme? this.props.iphoneStyleTheme: this.props.theme? this.props.theme: "legato"} obj = {this.props.obj} template={this.props.template} options={this.props.options}/>,
      legatoDark: <LegatoPhone app={app} alignment={this.props.options?.phoneUIAlignment? this.props.options?.phoneUIAlignment: this.props.alignment} phoneUITheme={this.props.options?.phoneUITheme?this.props.options?.phoneUITheme: this.props.template }theme={this.props.theme? this.props.theme: "legatoDark"} obj = {this.props.obj} template={this.props.template} options={this.props.options}/>,
      flinnApps :  <FlinnAppsPhone app={app} alignment={this.props.options.phoneUITheme? this.props.options?.phoneUIAlignment? this.props.options?.phoneUIAlignment: this.props.alignment: "top"} phoneUITheme={this.props.options.phoneUITheme?this.props.options.phoneUITheme:  this.props.template } theme={this.props.theme? this.props.theme: "flinnApps"} obj = {this.props.obj} template={this.props.template} options={this.props.options}/>,
      minimal :  <Minimal app={app} alignment={this.props.options?.phoneUIAlignment? this.props.options?.phoneUIAlignment: this.props.alignment} theme={this.props.theme? this.props.theme: "minimal"} obj = {this.props.obj} template={this.props.template} options={this.props.options}/>,
      default :  <PhoneBottomNav app={app} alignment={this.props.options.phoneUITheme? this.props.options?.phoneUIAlignment? this.props.options?.phoneUIAlignment: this.props.alignment: "top"} phoneUITheme={this.props.options.phoneUITheme?this.props.options.phoneUITheme: "default" } theme={this.props.theme? this.props.theme: "default"} obj = {this.props.obj} template={this.props.template} options={this.props.options}/>,
    }
    let IpadUI = {
      legato : <LegatoPhone app={app} alignment={this.props.options?.ipadUIAlignment? this.props.options?.ipadUIAlignment: this.props.alignment} phoneUITheme={this.props.options.ipadUITheme?this.props.options.ipadUITheme: this.props.template } theme={this.props.theme? this.props.theme: "legato"} obj = {this.props.obj} template={this.props.template} options={this.props.options}/>,
      legatoDark: <LegatoPhone app={app} alignment={this.props.options?.ipadUIAlignment? this.props.options?.ipadUIAlignment: this.props.alignment} phoneUITheme={this.props.options.ipadUITheme?this.props.options.ipadUITheme: this.props.template }theme={this.props.theme? this.props.theme: "legatoDark"} obj = {this.props.obj} template={this.props.template} options={this.props.options}/>,
      flinnApps :  <FlinnAppsPhone app={app} alignment={this.props.options.ipadUIAlignment? this.props.options?.ipadUIAlignment? this.props.options?.ipadUIAlignment: this.props.alignment: "top"} phoneUITheme={this.props.options.phoneUITheme?this.props.options.phoneUITheme:  this.props.template } theme={this.props.theme? this.props.theme: "flinnApps"} obj = {this.props.obj} template={this.props.template} options={this.props.options}/>,
      minimal :  <Minimal app={app} alignment={this.props.options?.ipadUIAlignment? this.props.options?.ipadUIAlignment: this.props.alignment} theme={this.props.theme? this.props.theme: "minimal"} obj = {this.props.obj} template={this.props.template} options={this.props.options}/>,
      default :  <PhoneBottomNav app={app} alignment={this.props.options.phoneUITheme? this.props.options?.ipadUIAlignment? this.props.options?.ipadUIAlignment: this.props.alignment: "top"} phoneUITheme={this.props.options.phoneUITheme?this.props.options.phoneUITheme: "default" } theme={this.props.theme? this.props.theme: "default"} obj = {this.props.obj} template={this.props.template} options={this.props.options}/>,
    }
    let template = {
      legato : window.innerWidth<state.phoneUIChange? this.props.options.phoneUI? phoneUI[this.props.options.phoneUI]: phoneUI.legato :window.innerWidth<state.ipadUIChange? this.props.options.IpadUI? IpadUI[this.props.options.IpadUI]: IpadUI.minimal : <Legato app={app} alignment={this.props.alignment} theme={this.props.theme? this.props.theme: "legato"} obj = {this.props.obj} template={this.props.template} options={this.props.options}/>,
      legatoDark:  window.innerWidth<state.phoneUIChange? this.props.options.phoneUI? phoneUI[this.props.options.phoneUI]: phoneUI.legatoDark : window.innerWidth<state.ipadUIChange? this.props.options.IpadUI? IpadUI[this.props.options.IpadUI]: IpadUI.minimal :<Legato app={app} alignment={this.props.alignment} theme={this.props.theme? this.props.theme: "legatoDark"} obj = {this.props.obj} template={this.props.template} options={this.props.options}/>,
      flinnApps :   window.innerWidth<state.phoneUIChange? this.props.options.phoneUI? phoneUI[this.props.options.phoneUI]: phoneUI.flinnApps : window.innerWidth<state.ipadUIChange? this.props.options.IpadUI? IpadUI[this.props.options.IpadUI]: IpadUI.minimal : <FlinnApps app={app} alignment={this.props.alignment} theme={this.props.theme? this.props.theme: "flinnApps"} obj = {this.props.obj} template={this.props.template} options={this.props.options}/>,
      minimal :  window.innerWidth<state.phoneUIChange? this.props.options.phoneUI? phoneUI[this.props.options.phoneUI]: phoneUI.minimal : window.innerWidth<state.ipadUIChange? this.props.options.IpadUI? IpadUI[this.props.options.IpadUI]: IpadUI.minimal : <Minimal app={app} alignment={this.props.alignment} theme={this.props.theme? this.props.theme: "minimal"} obj = {this.props.obj} template={this.props.template} options={this.props.options}/>,
      default :   window.innerWidth<state.phoneUIChange? this.props.options.phoneUI? phoneUI[this.props.options.phoneUI]: phoneUI.default : window.innerWidth<state.ipadUIChange? this.props.options.IpadUI? IpadUI[this.props.options.IpadUI]: IpadUI.minimal :  <DefaultNav app={app} alignment={this.props.alignment} theme={this.props.theme? this.props.theme:state.defaultTheme?state.defaultTheme: "default"} obj = {this.props.obj} template={this.props.template} options={this.props.options}/>,
    }
    let f = NavThemeFactory?.getNavThemeFactory();
    let theme = this.props.theme?f[this.props.theme]:this.props.template?f[this.props.template]: state.defaultTheme?f[state.defaultTheme]:f.default;
    
    let alignment=this.props.alignment
    if(window.innerWidth<state.phoneUIChange){
      this.props.options.navContainerTheme = this.props.options?.phoneUI
      if(this.props.options?.phoneUIAlignment){
        alignment=this.props.options?.phoneUIAlignment
      }
      else if(this.props.template==="default"){
        alignment="top"
      }
    }
    let container = theme[alignment];
  return (
    <div ref={this.wrapperRef} style={
      this.props.options?.navContainerStyle?{...this.props.options?.navContainerStyle}:
      this.props.options?.navContainerTheme?f[this.props.options?.navContainerTheme][alignment].navContainer:
      container.navContainer}>
        
      {this.props.template?(<>{template[this.props.template]}</>):(<> {template.default}</>)}
    </div>
        
  )}
}

      //  logo={this.props.logo}  navContainerStyle={this.props.navContainerStyle} navContainerTheme={this.props.navContainerTheme} sectionsContainerTheme={this.props.sectionsContainerTheme} sectionsContainerStyle={this.props.sectionsContainerStyle} sectionOneStyle={this.props.sectionOneStyle} sectionOneTheme={this.props.sectionOneTheme} logoWrapperStyle={this.props.logoWrapperStyle} logoWrapperTheme={this.props.logoWrapperTheme} logoTheme={this.props.logoTheme} logoImageStyle={this.props.logoImageStyle} logoImageTheme={this.props.logoImageTheme} navItemStyle={this.props.navItemStyle} navItemTheme={this.props.navItemTheme} linksWrapperStyle={this.props.linksWrapperStyle} linksWrapperTheme={this.props.linksWrapperTheme} linksTheme={this.props.linksTheme} 
