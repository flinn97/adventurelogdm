import './App.css';
import { Component } from 'react';
import Dispatch from './dispatch.js';
import { forFactory } from './models/myComponents';
import Background from './pics/back1.png'
import ComponentListInterface from './componentListNPM/componentListInterface';
import auth from './services/auth.js';
import ThemeFactory from './componentListNPM/themes/themeFactory';
import Home from './view/pages/home';
import Campaign from './view/pages/campaign';
import Note from './view/pages/note';
import Market from './view/pages/market';
import EncounterManager from './view/pages/encounterManager';



// import NavThemeFactory from './componentListNPM/navThemes/navThemeFactory';

//fonts


//model
export default class App extends Component {
  constructor(props){
    super(props);
        this.handleChange=this.handleChange.bind(this);
        this.dispatch=this.dispatch.bind(this);

    this.state={
      maxLengthShort: 72,


      start: false,
      styles: undefined,
      loginPage: true,
      registerPage:false,
      user: undefined,
      componentListInterface: new ComponentListInterface(this.dispatch),
      componentList: undefined,
      currentCharacter: undefined,
      opps: undefined,
      themeFactory: new ThemeFactory(),
      // navFactory: new NavThemeFactory(),
      navType: "topBar",
      
      // switchcase: "home",
      
      login : true,
      
      
      operate: undefined,
      operation: "cleanJsonPrepare",
      object: undefined,
      currentComponent: undefined,
      backend: false,
      backendUpdate: undefined,
      currentComponents: [],
      backendUpdate:[],
      backend: false,
      myswitch: "home",
      defaultTheme: "adventure",
      globalTheme: "",

      //THIS IS THE NAV MENU
      switchCase:[
        {path:"/", comp:Home, name: "Home" },
        {path: "/campaign", comp:Campaign, name: "Campaigns"},
        ///Added Notes
        {path: "/notes", comp:Note, name: "Notes"},
        ///Added Marketplace
        {path: "/market", comp:Market, name: "Marketplace"},
        ///
       
      ]

    }
  }

  /**
   * component did update
   * @param {*} props 
   * @param {*} state 
   */
  async componentDidUpdate(props, state){
    if(this.state.backend){
     await this.setState({backend: false});
     auth.dispatch(this.state.backendUpdate, this.state.email);
    }
    
    if(this.state.operate!==undefined){
      
      let operate = this.state.operate;
      let operation= this.state.operation;
      let object= this.state.object;
      await this.setState({operate:undefined, object:undefined, operation:"cleanJsonPrepare"});

      
      let currentComponent = await this.state.componentListInterface.getOperationsFactory().operationsFactoryListener({operate: operate, object:object, operation: operation});
      
      
      let key = await this.state.componentListInterface.getOperationsFactory().getSplice(operate);
      
      if(currentComponent!==undefined){
        this.setState({currentComponent: currentComponent[key][0]});
      }
    }
  }

  async dispatch(obj){

    await this.setState(obj)
}

handleChange = (event) => {
    const { name, value } = event.target
    this.setState({
        [name]: value,
    })
}

  async componentDidMount(){
    // if(this.state.navFactory){
    //   let f = this.statedasdfnavFactory.getNavThemeFactory();
    //   let styles = f["defaultSideNav"];
      
    //   this.setState({navStyles:styles, linkStyleDefault: styles.link});

    // }
  
    if(this.state.themeFactory){
      
      let f = await this.state.themeFactory.getThemeFactory();
      let style = this.state.globalTheme!==""? this.state.globalTheme: this.state.defaultTheme!==""? this.state.defaultTheme: "adventure"
      let styles = f[style];
      
      this.setState({styles:styles, start:true});
    }
    let list;
    if(this.state.componentListInterface && this.state.componentList===undefined){
        list= await this.state.componentListInterface.createComponentList();
        await this.setState({
          componentList:list,
          opps: list.getOperationsFactory()
        })
        
        
        let obj = await forFactory();
        for(const key in obj){
          
         await this.state.componentListInterface.getFactory().registerComponents({name:key, component:obj[key]});
        }
        
    }
    let user = await auth.getCurrentUser();
    if(user){
      user = JSON.parse(user);
      await auth.getuser(user.email, list, this.dispatch);
     
      
    
      
    }
    
    
    
  }

  //ENTIRE view
  render(){
    let styles = this.state.styles;
  return (
    
    <div className= "*" style={{
      letterSpacing:".05rem",
      width:"100vw", 
      height:"100vh", 
      display:"flex", 
      zIndex:"100",
            minHeight:"fit-content",
            backgroundColor:styles?.backgrounds?.backgroundColor,
            backgroundImage: "url("+Background+")",
            backgroundBlendMode:styles?.backgrounds?.backgroundBlend,
            backgroundRepeat:"repeat",
      flexDirection:"column"}}>
        
      
      {this.state.start && <Dispatch app={{run:this.run, state:this.state, handlechange:this.handleChange, dispatch:this.dispatch, factory:this.factory}} />}
    </div>
  )}
}
