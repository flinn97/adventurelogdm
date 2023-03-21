import { Component } from 'react';
// import auth from '../services/auth';
import "../App.css";

import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';




export default class Nav extends Component {
  constructor(props){
    super(props);
    this.changePic=this.changePic.bind(this);
  }
  changePic(type){
    let app = this.props.app;
    //debugger
    let comp = app.state.componentList.getComponent(type);
    app.dispatch({switchcase: type, myswitch:"feed", picChange:true, pic: comp, index: 0})
  }

  render(){
    let app = this.props.app;
    let state = app.state;
    // let styles =state.styles;
    
    let switchcase = app.state.switchcase;
    let dispatch= app.dispatch;
  return (
    <div style={{position:"absolute", top:"0", left:"0", display:"flex", flexDirection:"row", }}>
      {state.switchCase.map((obj, index)=> 
      <Link to={obj.path} >{obj.name}</Link>
      )}
    {/* <Link to={'/'} >home</Link>
        <Link to={'/adventure'} >adventure</Link> */}
        </div>
        
  )}
}
//           {/* <Gallery state = {this.props.state} handlechange = {this.props.handlechange} /> */}
// /*<div style={{
//                       display:"flex",
//                      userSelect: "none",
//                      flexDirection:"row",
//                      fontSize: styles.fonts.fontSubheader2,
//                      background: styles.colors.White1,
//                      boxShadow: styles.shadows.sideShadow,
//                      width: styles.menu.menuW,
//                      position: styles.menu.position, 
//                      top: styles.menu.top,
//                      left : styles.menu.left,
//                      height:"10vh",
//                      zIndex:"0",
//                     //  minHeight: styles.logoTop.stripRemainder,
//                      fontFamily: styles.fonts.fontNormal,
//                      fontWeight: styles.fonts.fontweightMenu,
//                      }}>

// {/* <div style={{
//          alignSelf:"center", marginTop:styles.margins.marginMediumH, marginBottom: "-1.8vh"}}> <img src={state.user.getJson().picURL} style={{width:"auto", height:"8vh", borderRadius:"50%", objectFit:"scale-down"}}/> </div> */}

// {/* MENU ITEMS WHOLE */}
// <div style={{ display: "flex",
// flexDirection: "row",
// // marginLeft: styles.menu.marginLeft,
// // marginRight: styles.menu.marginLeft,
// // marginTop: styles.menu.marginTop,  
// alignContent: "space", 
// // width: styles.menu.menuInnerW, 
             
// }}>



// {/* KEEP */}
// {app.state.login && (<div onClick={app.dispatch.bind(this, { myswitch:"home", })} 
// style={{ 
// cursor:"pointer", 
// display: "flex", 
// flexDirection: "row", 
// alignItems: "center",
// // marginBottom: styles.menu.marginBottom,
// fontFamily: "inherit",
// }}>
// <div style={{cursor:"pointer", display: "flex", flexDirection: "row", alignItems: "center",}}>

// <div>


// </div>
// <div style={{
// // marginLeft: state.myswitch==="keep" ? styles.menu.marginLeft:"",
// fontFamily: styles.fonts.fontNormal,
// letterSpacing: ".01rem", 
// }}>
// Home </div>
// </div>
// </div>)}

// {/* SPAWNS */}
// {app.state.login && (<div 
// onClick={app.dispatch.bind(this, {myswitch: "adventure", })} 
// style={{ 
// cursor:"pointer", 
// display: "flex", 
// flexDirection: "row", 
// alignItems: "center",
// height: styles.logoTop.stripRemainder,
// marginBottom: styles.menu.marginBottom,

// }}>


// <div style={{cursor:"pointer", display: "flex", flexDirection: "row", alignItems: "center",}}>

// <div>


// </div>
// <div style={{
// marginLeft: state.switchcase==="spawn" ? styles.menu.marginLeft:"",
// fontFamily: styles.fonts.fontNormal,
//   letterSpacing: styles.menu.menuSpacing,
// }}>
// Adventure Log
// </div></div>
// </div>)}

// {!app.state.login && (<div onClick={app.dispatch.bind(this, {loginPage:true})} 
// style={{cursor:"pointer", 
// marginBottom: styles.menu.marginBottom, 
// }}>Login</div>)}


// {/* WITHOUT SYMBOL               */}
// <div style={{
// marginLeft: "2.24vw", display:"flex", flexDirection:"row",

// }}>
// <div onClick={app.dispatch.bind(this, {myswitch: "journal", })} style={{cursor:"pointer", display: "flex", flexDirection: "row", alignItems: "center",

// marginBottom: styles.menu.marginBottom,
// height: styles.menu.menuListh,
// }}>
// <div style={{
// marginLeft:  state.switchcase==="monsters" ? styles.menu.marginLeft:"",
// fontFamily: styles.fonts.fontNormal,
//   letterSpacing: styles.menu.menuSpacing,
// }}>
// Character Journal
// </div></div>

// <div onClick={app.dispatch.bind(this, {myswitch: "lore", })} style={{cursor:"pointer", display: "flex", flexDirection: "row", alignItems: "center",
// marginBottom: styles.menu.marginBottom,
// height: styles.menu.menuListh,
// }}>
// <div style={{
// marginLeft: state.switchcase==="heroes" ? styles.menu.marginLeft:"",
// fontFamily: styles.fonts.fontNormal,
//   letterSpacing: styles.menu.menuSpacing,
// }}>
// GM Lore
// </div></div> 

// <div onClick={app.dispatch.bind(this, {myswitch: "strategy", })} style={{cursor:"pointer", display: "flex", flexDirection: "row", alignItems: "center",

// marginBottom: styles.menu.marginBottom,
// height: styles.menu.menuListh,
// }}>
// <div style={{
// marginLeft: state.switchcase==="maps" ? styles.menu.marginLeft:"",
// fontFamily: styles.fonts.fontNormal,
//   letterSpacing: styles.menu.menuSpacing,
// }}>
// Character Strategy
// </div></div>


// </div>


// {/* LOGOUT FUNCTION */}
// <div style={{
// marginTop: "40.1vh",
// marginBottom: styles.margins.marginSmallH,
// height: styles.menu.menuListh,
// }}>
// {/* /LOG OUT PERMANENT */}
// {/* <div onClick={auth.logout} style={{
    
//     cursor:"pointer",
//     color: styles.colors.Red2,
//     marginTop: "",
//     alignContent: "center",
//     fontFamily: styles.fonts.fontNormal,
//     marginLeft: styles.menu.marginLeft,

// }}>
// Logout</div> */}
// </div>

// </div>
// </div>

