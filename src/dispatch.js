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
import ViewPlayerList from './view/popups/viewPlayerList';
import Register from './view/register';
import logo from "./pics/logoava2.png"
import AdventureLogPageWrapper from './view/pages/adventurePageWrapper';
import SplashScreen from './view/pages/splashScreen';
import LibraryForGalleryPopup from './view/popups/libraryForGalleryPopup';
import auth from './services/auth';
import AfterPayment from './view/afterPayment';
import PaymentFailed from './view/paymentFailed';
import PlayerRegister from './view/playerRegister';

//model
export default class Dispatch extends Component {
  constructor(props){
    super(props);
    this.state={
    }
  }

  componentDidUpdate(){
    let R = this.props.app.state.rerender;
    if (R ==="true"){
      this.props.app.dispatch({
        rerender:"false",
      })
      
    }
  }


  render(){
    let app = this.props.app;
    let state = app.state;
    let styles =state.styles;
    let RR = state.rerender;
    

  return (
    
<BrowserRouter>
    {/*      === */}
  {(state.user!==undefined &&  state.user?.getJson()?.paidCustomer) &&(
    
    
    <div>
      {(state.popupSwitch === "splashScreen") &&
    <div style={{background:styles.colors.color2, zIndex:55000, width:"100vw", height:"100vh"}}>
        <SplashScreen
        options={{cardType:"bigCardBorderless"}} app={app} 
        containerStyle={{background:styles.colors.color2, zIndex:55000,}}
        
      />
    </div>
    }
    {(state.popupSwitch !== "splashScreen") &&
    <div  className='scroller2' style={{ width:"100%", overflow:"scroll",
      minWidth:"100%", userSelect:"none", height:"100vh",
       display:"flex", flexDirection:"column",
      }}>
          
<div style={{display:'flex', zIndex:2000, marginRight:"210px",  }}>
          <Nav app={app} theme="legatoDark" template="legatoDark" type="sideBarNav" options={
            {logo: logo}
          }
          />
          </div>
        {/* WITHIN */}
<div  style={{display:'flex', flexDirection:'row',  width:"100%", paddingLeft:"210px", }}>
        
     <div   style={{ width:'100%', minHeight:"fit-content", padding:"28px", display: "flex", height:"100%",
justifyContent: "center",}}>

            
        

        {(state.popupSwitch === "popupDelete"  && state.currentDelObj !== undefined) && 
        <PopupDelete 
          type="popup" options={{cardType:"popupSmallest"}} app={app} containerStyle={{background:styles.colors.color2}}
          handleClose={()=>{app.dispatch({popupSwitch:"", currentDelObj:undefined})}}
          delClick={state.handlePopupClose?state.handlePopupClose:()=>{app.dispatch({popupSwitch:"", currentDelObj:undefined})}}
        />}
         {(state.popupSwitch === "seeLibrary") && 
        <LibraryForGalleryPopup 
          type="popup" options={{cardType:"popupMedium"}} app={app} containerStyle={{background:styles.colors.color2}}
          handleClose={()=>{app.dispatch({popupSwitch:"", currentDelObj:undefined})}}
          
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

            {state.popupSwitch === "viewPlayers" &&

            <ViewPlayerList

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
                currentComponent:undefined, currentPin:undefined});
                state.opps.clearUpdater();
              }}
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
                
                <Route path="/connecttoadventure/:id" element={<AdventureLog app={app} type="cardWithTab" options={{tabType:"bigCardBorderless", cardType:undefined}} />}/> 
                <Route path="/login/" element={<Login app={app} />}/>
                <Route path="/register/" element={<Register app={app} />}/>

                
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
        <Route path="/encounter/:id" element={<Encounter app={app} players={state?.campaignPlayers}/>}/>

        {/* <Route path="/log/:id" element={<AdventureLogPage app={app} />}/>  */}
        <Route path="/log/:id" element={<AdventureLog app={app} />}/> 

        
      
</Routes>)}

</div>
</div>
     </div>}
     </div>)}
     {(state.user!==undefined &&  !state.user?.getJson()?.paidCustomer && state.user?.getJson().role==="GM") &&(
      <div style={{width:"100%", height:"100%", position:"absolute", left:"0", top:"0", background:'black'}}>
        <PaymentFailed app = {app} />
      </div>
     )}
     <Routes>
     <Route path="/register/" element={<Register app={app} />}/>
     <Route path="/playerregister/" element={<PlayerRegister app={app} />}/>
     <Route path="/login/" element={<Login app={app} />}/>
     <Route path="/" element={<Login app={app} />}/>
     <Route path="/paymentprocessing/" element={<AfterPayment app={app} />}/>
     </Routes>
     </BrowserRouter>
  )}
}