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
// import DeletePopup from './view/deletePopup';
// import KeepDel from './view/keepDelete';


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
    <div style={{
      width:"100%", 
      height:"100%",
          }}>
        {/* WITHIN */}
<div style={{display:'flex', flexDirection:'row',}}>
        <div style={{display:'flex', marginRight:"210px"}}>
          <Nav app={app} theme="legatoDark" template="legatoDark" type="sideBarNav"/>
          </div>
     <div style={{ width:'100%', height:"100%", padding:"4.5vmin"}}>
     <Routes>
      {state.switchCase?.map((obj, index)=>
                <Route path={obj.path} element={<obj.comp app={app}/>} />
              )}
        <Route path="/campaign/:id" element={<CampaignEditor app={app} />}/> 
        <Route path="/worldbuilder/:id" element={<Worldbuilder app={app} />}/> 
        <Route path="/encountermanager/:id" element={<EncounterManager app={app}/>}/>
        <Route path="/addencountermanager/:id" element={<AddEncounter app={app} />}/> 
        <Route path="/encounter/:id" element={<Encounter app={app} />}/> 
</Routes>
</div>
</div>
     </div>

     
     </BrowserRouter>
  )}
}