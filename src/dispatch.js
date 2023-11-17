import './App.css';
import { Component } from 'react';
// import Home from './view/home';
// import Login from './view/login';
// import Register from './view/register';
import './index.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import CampaignEditor from './view/campaignEditor';
import Worldbuilder from './view/worldBuilder';
import EncounterManager from './view/pages/encounterManager';
import AddEncounter from './view/AddEncounter';
import Encounter from './view/encounter';
import Nav from './componentListNPM/navTech/nav';
import Background from './pics/back1.png'
import Login from './view/login';
import PopupDelete from './view/popups/popupDelete';
import PopupLore from './view/popups/popupLore';
import ViewPic from './view/popups/viewPic';
import AdventureLogPage from './view/pages/adventureLogPage';
import ConnectToCampaign from './view/popups/connectToCampaign';
import AdventureLog from './view/pages/adventureLog';
import AddParticipant from './view/AddParticipant';
import AddPlayerCharacter from './view/popups/addPlayerCharacter';


//model
export default class Dispatch extends Component {
  constructor(props){
    super(props);
  
  }


  render(){
    let app = this.props.app;
    let state = app.state;
    let styles =state.styles;
  return (
    
<BrowserRouter>
    {/*      === */}
  {state.user===undefined?(<Login app={app}/>):(
    <div className='scroller2' style={{ width:"100%",
      minWidth:"100%", userSelect:"none",
      overflow:"auto", display:"flex", flexDirection:"column",
      }}>
<div style={{display:'flex', zIndex:2000, marginRight:"210px"}}>
          <Nav app={app} theme="legatoDark" template="legatoDark" type="sideBarNav"
          />
          </div>
        {/* WITHIN */}
<div style={{display:'flex', flexDirection:'row',  width:"100%", paddingLeft:"210px", }}>
        
     <div style={{ width:'100%', minHeight:"100px", padding:"28px", display: "flex",
justifyContent: "center",

      }}>
        

        {state.popupSwitch === "popupDelete" && state.currentDelObj != undefined && 
        <PopupDelete 
        
          type="popup" options={{cardType:"popupSmallest"}} app={app} containerStyle={{background:styles.colors.color2+"88"}}
          handleClose={()=>{app.dispatch({popupSwitch:"", currentDelObj:undefined})}}
          delClick={state.handlePopupClose?state.handlePopupClose:()=>{app.dispatch({popupSwitch:"", currentDelObj:undefined})}}
        />}

    {state.popupSwitch === "viewPic" && state.currentPic!==undefined && 
            <ViewPic 
            
              type="popup" options={{cardType:"popupLarge"}} app={app} 
              handleClose={()=>{app.dispatch({popupSwitch:"", currentComponent:undefined})}}
            
            />}

          {state.popupSwitch === "connectPlayer" && state.currentComponent?.getJson()?.type==="monster"  && 
                  <ConnectToCampaign 
                  
                    type="popup" options={{cardType:"popupSmall"}} app={app} containerStyle={{background:styles.colors.color2}}
                    handleClose={()=>{app.dispatch({popupSwitch:"", currentComponent:undefined})}}
                  
                  />}

          {state.popupSwitch === "addCharacter" && state.currentComponent?.getJson()?.type==="monster" &&

                    <AddPlayerCharacter
                  
                  type="popup" options={{cardType:"popupCreate"}} app={app}
                    handleClose={()=>{app.dispatch({popupSwitch:"", currentComponent:undefined})}}
                  
                  />
                  }

              {state.popupSwitch === "popupLore" 
              && (state.currentComponent?.getJson().type === "lore") 
              &&
              <PopupLore
              
                type="popup" options={{cardType:"popupMedium"}} app={app} 
                containerStyle={{backgroundColor:styles.colors.color1+"55",}}
                handleClose={()=>{app.dispatch({popupSwitch:"", currentDelObj:undefined, 
                currentComponent:undefined, currentPin:undefined})}}
                delClick={state.handlePopupClose?state.handlePopupClose:()=>{app.dispatch({popupSwitch:"", 
                currentDelObj:undefined,})}}
              />}
          
     {state.user.getJson().role!=="GM"?(
        <Routes>
        {state.switchCase?.map((obj, index)=>
        <>{obj._id!==undefined?(
          <Route path={obj.path+"/:id"} element={<obj.comp app={app}/>} />
        ):(
                  <Route path={obj.path} element={<obj.comp app={app}/>} />
                  
                  )}</>
                )}
                
                <Route path="/connecttoadventure/:id" element={<AdventureLog app={app} />}/> 
  
  </Routes>
     ):(
     <Routes>
      {state.switchCase?.map((obj, index)=>
                <Route path={obj.path} element={<obj.comp app={app}/>} />
              )}
        <Route path="/campaign/:id" element={<CampaignEditor app={app} />}/> 
        <Route path="/worldbuilder/:id" element={<Worldbuilder app={app} />}/> 
        <Route path="/encountermanager/:id" element={<EncounterManager app={app}/>}/>
        {/* <Route path="/addencountermanager/:id" element={<AddEncounter app={app} />}/>  */}
        <Route path="/encounter/:id" element={<Encounter app={app} />}/>

        <Route path="/log/:id" element={<AdventureLogPage app={app} />}/> 

        {/* <Route path="/login/" element={<Login app={app} />}/> 
        <Route path="/register/" element={<Register app={app} />}/> */}

</Routes>)}
</div>
</div>
     </div>
     )}

     
     </BrowserRouter>
  )}
}