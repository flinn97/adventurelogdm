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

import PlayerHome from './view/pages/playerHome.js';
import SplashScreen from './view/pages/splashScreen.js';

// import NavThemeFactory from './componentListNPM/navThemes/navThemeFactory';
//New comment
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
      showPinMap:true,
      
      
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
        {path:"/", comp:Campaign, name: "Campaign" },
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
     await this.state.componentList.sortSelectedList("lore", "index");
     this.setState({});
     auth.dispatch(this.state.backendUpdate, this.state.email, this.dispatch, this.state.backendReloader);
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
      
      this.setState({styles:styles, });
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
    try{
    let user = await auth.getCurrentUser();
    debugger
    if(user){
      
      user = JSON.parse(user);
      
      await auth.getuser(user.email, list, this.dispatch);
      
      
      this.setState({popupSwitch:""})
      await this.setState({start:true});



    
      
    }
  }
  catch(e){
    console.log(e)
  }
    this.setState({start:true});
    
    
  }

  //ENTIRE view
  render(){
    let styles = this.state.styles;
  return (
    
    <div  className= "*" style={{overflow:"hidden",
      letterSpacing:".05rem",
      width:"100%", 
      height:"100%", 
      display:"flex", 
      zIndex:"100",
            minHeight:"100%",
            backgroundColor:styles?.backgrounds?.backgroundColor,
            backgroundImage: "url("+Background+")", 
            backgroundBlendMode:styles?.backgrounds?.backgroundBlend,
            backgroundRepeat:"repeat",
      flexDirection:"column"}}>
        
      
      {this.state.start ? (<Dispatch app={{run:this.run, state:this.state, handlechange:this.handleChange, dispatch:this.dispatch, factory:this.factory}} /> ):
      (<div style={{background:styles?.colors?.color2, zIndex:55000, width:"100vw", height:"100vh"}}>{styles&&
      <SplashScreen
      options={{cardType:"bigCardBorderless"}} app={{run:this.run, state:this.state, handlechange:this.handleChange, dispatch:this.dispatch, factory:this.factory}}
      containerStyle={{background:styles?.colors?.color2, zIndex:55000,}}
      
    />}
  </div>)}
    </div>
  )}
}
