import { Component } from 'react';
// import auth from '../services/auth';
import "../App.css";

// import '../fonts/Inter/Inter-VariableFont.ttf';

import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import NavThemeFactory from '../navThemes/navThemeFactory';

export default class NavItems extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let app = this.props.app;
    let state = app.state;
    let styles = state.styles;

    let switchCase = app.state.switchCase;
    let dispatch = app.dispatch;
    let theme = {
      legato: <LegatoNavItems app={app} alignment={this.props.alignment} theme={this.props.theme} obj={this.props.obj} options={this.props.options}
        navItemStyle={this.props.options?.navItemStyle}
        navItemTheme={this.props.options?.navItemTheme}
        singleLinkWrapperTheme={this.props.options?.singleLinkWrapperTheme}
        singleLinkWrapperStyle={this.props.options?.singleLinkWrapperStyle}
        linkIconStyle={this.props.options?.linkIconStyle}
        linkIconTheme={this.props.options?.linkIconTheme}
        notifyStyle={this.props.options?.notifyStyle}
        notifyTheme={this.props.options?.notifyTheme}
        activeSingleLinkWrapperStyle={this.props.options?.activeSingleLinkWrapperStyle}
        activeSingleLinkWrapperTheme={this.props.options?.activeSingleLinkWrapperTheme}
        activeNavItemTheme={this.props.options?.activeNavItemTheme}
        activeNavItemStyle={this.props.options?.activeNavItemStyle}
      />,

      legatoDark: <LegatoNavItems app={app} alignment={this.props.alignment} theme={this.props.theme} obj={this.props.obj} options={this.props.options}
        navItemStyle={this.props.options?.navItemStyle}
        navItemTheme={this.props.options?.navItemTheme}
        singleLinkWrapperTheme={this.props.options?.singleLinkWrapperTheme}
        singleLinkWrapperStyle={this.props.options?.singleLinkWrapperStyle}
        linkIconStyle={this.props.options?.linkIconStyle}
        linkIconTheme={this.props.options?.linkIconTheme}
        notifyStyle={this.props.options?.notifyStyle}
        notifyTheme={this.props.options?.notifyTheme}
        activeSingleLinkWrapperStyle={this.props.options?.activeSingleLinkWrapperStyle}
        activeSingleLinkWrapperTheme={this.props.options?.activeSingleLinkWrapperTheme}
        activeNavItemTheme={this.props.options?.activeNavItemTheme}
        activeNavItemStyle={this.props.options?.activeNavItemStyle}
      />,

      flinnApps: <FlinnAppsNavItems app={app} alignment={this.props.alignment} theme={this.props.theme} obj={this.props.obj} options={this.props.options}
        navItemStyle={this.props.options?.navItemStyle}
        navItemTheme={this.props.options?.navItemTheme}
        singleLinkWrapperTheme={this.props.options?.singleLinkWrapperTheme}
        singleLinkWrapperStyle={this.props.options?.singleLinkWrapperStyle}
        linkIconStyle={this.props.options?.linkIconStyle}
        linkIconTheme={this.props.options?.linkIconTheme}
        notifyStyle={this.props.options?.notifyStyle}
        notifyTheme={this.props.options?.notifyTheme}
        activeSingleLinkWrapperStyle={this.props.options?.activeSingleLinkWrapperStyle}
        activeSingleLinkWrapperTheme={this.props.options?.activeSingleLinkWrapperTheme}
        activeNavItemTheme={this.props.options?.activeNavItemTheme}
        activeNavItemStyle={this.props.options?.activeNavItemStyle}
      />,

      minimal: <MinimalNavItems app={app} alignment={this.props.alignment} theme={this.props.theme} obj={this.props.obj} options={this.props.options}
        navItemStyle={this.props.options?.navItemStyle}
        navItemTheme={this.props.options?.navItemTheme}
        singleLinkWrapperTheme={this.props.options?.singleLinkWrapperTheme}
        singleLinkWrapperStyle={this.props.options?.singleLinkWrapperStyle}
        linkIconStyle={this.props.options?.linkIconStyle}
        linkIconTheme={this.props.options?.linkIconTheme}
        notifyStyle={this.props.options?.notifyStyle}
        notifyTheme={this.props.options?.notifyTheme}
        activeSingleLinkWrapperStyle={this.props.options?.activeSingleLinkWrapperStyle}
        activeSingleLinkWrapperTheme={this.props.options?.activeSingleLinkWrapperTheme}
        activeNavItemTheme={this.props.options?.activeNavItemTheme}
        activeNavItemStyle={this.props.options?.activeNavItemStyle}
      />,

      default: <DefaultNavItems app={app} alignment={this.props.alignment} theme={this.props.theme} obj={this.props.obj} options={this.props.options}
        navItemStyle={this.props.options?.navItemStyle}
        navItemTheme={this.props.options?.navItemTheme}
        singleLinkWrapperTheme={this.props.options?.singleLinkWrapperTheme}
        singleLinkWrapperStyle={this.props.options?.singleLinkWrapperStyle}
        activeSingleLinkWrapperStyle={this.props.options?.activeSingleLinkWrapperStyle}
        activeSingleLinkWrapperTheme={this.props.options?.activeSingleLinkWrapperTheme}
        activeNavItemTheme={this.props.options?.activeNavItemTheme}
        activeNavItemStyle={this.props.options?.activeNavItemStyle}
      />,
    }
    let f = NavThemeFactory?.getNavThemeFactory();
    let style = this.props.theme ? f[this.props.theme] : state.theme ? f[state.theme] : f.default;
    let wrapper = style[this.props.alignment];
    return (
      <div style={this.props.options?.linksWrapperStyle ? { ...this.props.options?.linksWrapperStyle } : this.props.options?.linksWrapperTheme ? { ...f[this.props.options?.linksWrapperTheme][this.props.alignment].linksWrapper } : { ...wrapper?.linksWrapper }}>
        
        {this.props.options?.linksTheme ? theme[this.props.options?.linksTheme] : this.props.theme ? theme[this.props.theme] : theme.default}
      </div>
    )
  }
}
class DefaultNavItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: undefined
    }
  }
  async componentDidUpdate() {
    let app = this.props.app;
    let state = app.state;
    let dispatch = app.dispatch;
    if (state.linkChange) {
      let linkChange = state.linkChange;
      await dispatch({
        linkChange: undefined
      })

      await this.setState({
        active: linkChange
      })

    }
  }

  render() {
    let app = this.props.app;
    let state = app.state;
    let styles = state.styles;

    let switchCase = app.state.switchCase;
    let dispatch = app.dispatch;

    let f = NavThemeFactory?.getNavThemeFactory();
    let style = this.props.theme ? f[this.props.theme] : state.theme ? f[state.theme] : f.default;
    let item = style[this.props.alignment];
    return (
      <>
        {switchCase.map((obj, index) =>
          <div style={
            //active
            obj.name === this.state.active ? this.props.activeSingleLinkWrapperStyle ? { ...this.props.activeSingleLinkWrapperStyle } :
              obj.activeSingleLinkWrapperStyle ? { ...obj.activeSingleLinkWrapperStyle } :
                obj.activeSingleLinkWrapperTheme ? { ...f[obj.activeSingleLinkWrapperTheme][this.props.alignment].activeSingleLinkWrapper } :
                  this.props.activeSingleLinkWrapperTheme ? { ...f[this.props.activeSingleLinkWrapperTheme][this.props.alignment].activeSingleLinkWrapper } :
                    { ...item.activeSingleLinkWrapper } :
              //none active
              this.props.singleLinkWrapperStyle ? { ...this.props.singleLinkWrapperStyle } :
                obj.singleLinkWrapperStyle ? { ...obj.singleLinkWrapperStyle } :
                  obj.singleLinkWrapperTheme ? { ...f[obj.singleLinkWrapperTheme][this.props.alignment].singleLinkWrapper } :
                    this.props.singleLinkWrapperTheme ? { ...f[this.props.singleLinkWrapperTheme][this.props.alignment].singleLinkWrapper } :
                      { ...item.singleLinkWrapper }}>

            <Link style={
              //active
              this.state.active === obj.name ?
                this.props.activeNavItemStyle ? { ...this.props.activeNavItemStyle } :
                  obj.activeNavItemStyle ? { ...obj.activeNavItemStyle } :
                    obj.activeNavItemTheme ? { ...f[obj.activeNavItemTheme][this.props.alignment].activeNavItem } :
                      this.props.activeNavItemTheme ? { ...f[this.props.activeNavItemTheme][this.props.alignment].activeNavItem } :
                        { ...item.activeNavItem } :
                //non active
                this.props.navItemStyle ? { ...this.props.navItemStyle } :
                  obj.navItemStyle ? { ...obj.navItemStyle } :
                    obj.navItemTheme ? { ...f[obj.navItemTheme][this.props.alignment].navItem } :
                      this.props.navItemTheme ? { ...f[this.props.navItemTheme][this.props.alignment].navItem } :
                        { ...item.navItem }} to={obj.path}>{obj.name}</Link>


          </div>


        )}
      </>

    )
  }
}

//added styles:
//navItemStyle, navItemTheme, linksWrapperStyle, linksWrapperTheme, linksTheme

class LegatoNavItems extends Component {
  constructor(props) {
    super(props);
    this.changeActiveLink=this.changeActiveLink.bind(this);
    this.state = {
      active: undefined
    }
  }
  async changeActiveLink(){
    if (this.props.app.state.linkChange) {
      let app = this.props.app;
      let state = app.state;
      let dispatch = app.dispatch;
      let linkChange = state.linkChange;
      await dispatch({
        linkChange: undefined,
        changeActiveLink: false
      })
      await this.setState({
        active: linkChange
      })
     
    }
  }
  async componentDidMount(){
    this.changeActiveLink();
  }
  async componentDidUpdate(props, state) {
    
    if (this.props.app.state.linkChange !==props.app.state.linkChange) {
      this.changeActiveLink();
    }
  }

  render() {
    let app = this.props.app;
    let state = app.state;
    let styles = state.styles;

    let switchCase = app.state.switchCase;
    let dispatch = app.dispatch;

    let f = NavThemeFactory?.getNavThemeFactory();
    let style = this.props.theme ? f[this.props.theme] : state.theme ? f[state.theme] : f.default;
    let item = style[this.props.alignment];

    return (
      <>
        {switchCase.map((obj, index) =>
          <Link to={obj.path} style={{textDecoration: "none"}}>
          <div style={
            //active
            obj.name === this.state.active ? this.props.activeSingleLinkWrapperStyle ? { ...this.props.activeSingleLinkWrapperStyle } :
              obj.activeSingleLinkWrapperStyle ? { ...obj.activeSingleLinkWrapperStyle } :
                obj.activeSingleLinkWrapperTheme ? { ...f[obj.activeSingleLinkWrapperTheme][this.props.alignment].activeSingleLinkWrapper } :
                  this.props.activeSingleLinkWrapperTheme ? { ...f[this.props.activeSingleLinkWrapperTheme][this.props.alignment].activeSingleLinkWrapper } :
                    { ...item.activeSingleLinkWrapper } :
              //none active
              this.props.singleLinkWrapperStyle ? { ...this.props.singleLinkWrapperStyle } :
                obj.singleLinkWrapperStyle ? { ...obj.singleLinkWrapperStyle } :
                  obj.singleLinkWrapperTheme ? { ...f[obj.singleLinkWrapperTheme][this.props.alignment].singleLinkWrapper } :
                    this.props.singleLinkWrapperTheme ? { ...f[this.props.singleLinkWrapperTheme][this.props.alignment].singleLinkWrapper } :
                      { ...item.singleLinkWrapper }}>

            {obj.linkIcon && (
              <img style={

                this.props.linkIconStyle ? { ...this.props.linkIconStyle } :
                  obj.linkIconStyle ? { ...obj.linkIconStyle } :
                    obj.linkIconTheme ? { ...f[obj.linkIconTheme][this.props.alignment].linkIcon } :
                      this.props.linkIconTheme ? { ...f[this.props.linkIconTheme][this.props.alignment].linkIcon } :
                        { ...item.linkIcon }} src={obj.linkIcon} />
            )}
            <div style={
              //active
              this.state.active === obj.name ?
                this.props.activeNavItemStyle ? { ...this.props.activeNavItemStyle } :
                  obj.activeNavItemStyle ? { ...obj.activeNavItemStyle } :
                    obj.activeNavItemTheme ? { ...f[obj.activeNavItemTheme][this.props.alignment].activeNavItem } :
                      this.props.activeNavItemTheme ? { ...f[this.props.activeNavItemTheme][this.props.alignment].activeNavItem } :
                        { ...item.activeNavItem } :
                //non active
                this.props.navItemStyle ? { ...this.props.navItemStyle } :
                  obj.navItemStyle ? { ...obj.navItemStyle } :
                    obj.navItemTheme ? { ...f[obj.navItemTheme][this.props.alignment].navItem } :
                      this.props.navItemTheme ? { ...f[this.props.navItemTheme][this.props.alignment].navItem } :
                        { ...item.navItem }}>{obj.name}</div>

            {obj.notification && (
              <div style={
                this.props.notifyStyle ? { ...this.props.notifyStyle } :
                  obj.notifyStyle ? { ...obj.notifyStyle } :
                    obj.notifyTheme ? { ...f[obj.notifyTheme][this.props.alignment].notify } :
                      this.props.notifyTheme ? { ...f[this.props.notifyTheme][this.props.alignment].notify } :
                        { ...item.notify }}>
                {obj.notification}
              </div>)}

          </div>
          </Link>

        )}
      </>

    )
  }
}

class FlinnAppsNavItems extends Component {
  constructor(props) {
    super(props);
    this.changeActiveLink=this.changeActiveLink.bind(this);
    this.state = {
      active: undefined
    }
  }
  async changeActiveLink(){
    if (this.props.app.state.linkChange) {
      let app = this.props.app;
      let state = app.state;
      let dispatch = app.dispatch;
      let linkChange = state.linkChange;
      await dispatch({
        linkChange: undefined,
        changeActiveLink: false
      })
      await this.setState({
        active: linkChange
      })
     
    }
  }
  async componentDidMount(){
    this.changeActiveLink();
  }
  async componentDidUpdate(props, state) {
    
    if (this.props.app.state.linkChange !==props.app.state.linkChange) {
      this.changeActiveLink();
    }
  }

  render() {
    let app = this.props.app;
    let state = app.state;
    let styles = state.styles;

    let switchCase = app.state.switchCase;
    let dispatch = app.dispatch;

    let f = NavThemeFactory?.getNavThemeFactory();
    let style = this.props.theme ? f[this.props.theme] : state.theme ? f[state.theme] : f.default;
    let item = style[this.props.alignment];

    return (
      <>
        {switchCase.filter(obj => obj.linkSection === this.props.options.linkSection).map((obj, index) =>
          <Link to={obj.path} style={{textDecoration: "none"}}>
          <div style={
            //active
            obj.name === this.state.active ? this.props.activeSingleLinkWrapperStyle ? { ...this.props.activeSingleLinkWrapperStyle } :
              obj.activeSingleLinkWrapperStyle ? { ...obj.activeSingleLinkWrapperStyle } :
                obj.activeSingleLinkWrapperTheme ? { ...f[obj.activeSingleLinkWrapperTheme][this.props.alignment].activeSingleLinkWrapper } :
                  this.props.activeSingleLinkWrapperTheme ? { ...f[this.props.activeSingleLinkWrapperTheme][this.props.alignment].activeSingleLinkWrapper } :
                    { ...item.activeSingleLinkWrapper } :
              //none active
              this.props.singleLinkWrapperStyle ? { ...this.props.singleLinkWrapperStyle } :
                obj.singleLinkWrapperStyle ? { ...obj.singleLinkWrapperStyle } :
                  obj.singleLinkWrapperTheme ? { ...f[obj.singleLinkWrapperTheme][this.props.alignment].singleLinkWrapper } :
                    this.props.singleLinkWrapperTheme ? { ...f[this.props.singleLinkWrapperTheme][this.props.alignment].singleLinkWrapper } :
                      { ...item.singleLinkWrapper }}>
            <div style={
              //active
              this.state.active === obj.name ?
                this.props.activeNavItemStyle ? { ...this.props.activeNavItemStyle } :
                  obj.activeNavItemStyle ? { ...obj.activeNavItemStyle } :
                    obj.activeNavItemTheme ? { ...f[obj.activeNavItemTheme][this.props.alignment].activeNavItem } :
                      this.props.activeNavItemTheme ? { ...f[this.props.activeNavItemTheme][this.props.alignment].activeNavItem } :
                        { ...item.activeNavItem } :
                //non active
                this.props.navItemStyle ? { ...this.props.navItemStyle } :
                  obj.navItemStyle ? { ...obj.navItemStyle } :
                    obj.navItemTheme ? { ...f[obj.navItemTheme][this.props.alignment].navItem } :
                      this.props.navItemTheme ? { ...f[this.props.navItemTheme][this.props.alignment].navItem } :
                        { ...item.navItem }}>{obj.name}</div>
                        
            {obj.linkIcon && (
              <img style={

                this.props.linkIconStyle ? { ...this.props.linkIconStyle } :
                  obj.linkIconStyle ? { ...obj.linkIconStyle } :
                    obj.linkIconTheme ? { ...f[obj.linkIconTheme][this.props.alignment].linkIcon } :
                      this.props.linkIconTheme ? { ...f[this.props.linkIconTheme][this.props.alignment].linkIcon } :
                        { ...item.linkIcon }} src={obj.linkIcon} />
            )}

            {obj.notification && (
              <div style={
                this.props.notifyStyle ? { ...this.props.notifyStyle } :
                  obj.notifyStyle ? { ...obj.notifyStyle } :
                    obj.notifyTheme ? { ...f[obj.notifyTheme][this.props.alignment].notify } :
                      this.props.notifyTheme ? { ...f[this.props.notifyTheme][this.props.alignment].notify } :
                        { ...item.notify }}>
                {obj.notification}
              </div>)}

          </div>
          </Link>

        )}
      </>

    )
  }
}

class MinimalNavItems extends Component {
  constructor(props) {
    super(props);
    this.changeActiveLink=this.changeActiveLink.bind(this);
    this.state = {
      active: undefined
    }
  }
  async changeActiveLink(){
    if (this.props.app.state.linkChange) {
      let app = this.props.app;
      let state = app.state;
      let dispatch = app.dispatch;
      let linkChange = state.linkChange;
      await dispatch({
        linkChange: undefined,
        changeActiveLink: false
      })
      await this.setState({
        active: linkChange
      })
     
    }
  }
  async componentDidMount(){
    this.changeActiveLink();
  }
  async componentDidUpdate(props, state) {
    
    if (this.props.app.state.linkChange !==props.app.state.linkChange) {
      this.changeActiveLink();
    }
  }

  render() {
    let app = this.props.app;
    let state = app.state;
    let styles = state.styles;

    let switchCase = app.state.switchCase;
    let dispatch = app.dispatch;

    let f = NavThemeFactory?.getNavThemeFactory();
    let style = this.props.theme ? f[this.props.theme] : state.theme ? f[state.theme] : f.default;
    let item = style[this.props.alignment];

    return (
      <>
        {switchCase.map((obj, index) =>
          <Link to={obj.path} style={{textDecoration: "none"}}>
          <div style={
            //active
            obj.name === this.state.active ? this.props.activeSingleLinkWrapperStyle ? { ...this.props.activeSingleLinkWrapperStyle } :
              obj.activeSingleLinkWrapperStyle ? { ...obj.activeSingleLinkWrapperStyle } :
                obj.activeSingleLinkWrapperTheme ? { ...f[obj.activeSingleLinkWrapperTheme][this.props.alignment].activeSingleLinkWrapper } :
                  this.props.activeSingleLinkWrapperTheme ? { ...f[this.props.activeSingleLinkWrapperTheme][this.props.alignment].activeSingleLinkWrapper } :
                    { ...item.activeSingleLinkWrapper } :
              //none active
              this.props.singleLinkWrapperStyle ? { ...this.props.singleLinkWrapperStyle } :
                obj.singleLinkWrapperStyle ? { ...obj.singleLinkWrapperStyle } :
                  obj.singleLinkWrapperTheme ? { ...f[obj.singleLinkWrapperTheme][this.props.alignment].singleLinkWrapper } :
                    this.props.singleLinkWrapperTheme ? { ...f[this.props.singleLinkWrapperTheme][this.props.alignment].singleLinkWrapper } :
                      { ...item.singleLinkWrapper }}>

            {obj.linkIcon && (
              <img style={

                this.props.linkIconStyle ? { ...this.props.linkIconStyle } :
                  obj.linkIconStyle ? { ...obj.linkIconStyle } :
                    obj.linkIconTheme ? { ...f[obj.linkIconTheme][this.props.alignment].linkIcon } :
                      this.props.linkIconTheme ? { ...f[this.props.linkIconTheme][this.props.alignment].linkIcon } :
                        { ...item.linkIcon }} src={obj.linkIcon} />
            )}

            {obj.notification && (
              <div style={
                this.props.notifyStyle ? { ...this.props.notifyStyle } :
                  obj.notifyStyle ? { ...obj.notifyStyle } :
                    obj.notifyTheme ? { ...f[obj.notifyTheme][this.props.alignment].notify } :
                      this.props.notifyTheme ? { ...f[this.props.notifyTheme][this.props.alignment].notify } :
                        { ...item.notify }}>
              </div>)}

          </div>
          </Link>

        )}
      </>

    )
  }
}