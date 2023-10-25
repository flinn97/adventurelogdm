import { Component } from 'react';
import "../App.css"
import CardPractice from './CardPrac';
import AddCampaign from './AddCampaign';
import MapComponent from '../componentListNPM/mapTech/mapComponent';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
// https://www.npmjs.com/package/react-lazyload;
import placeholder from '../pics/placeholderEncounter.JPG';
import backarrow from '../pics/backArrow.webp';
import EncounterMapItem from './encounterMapItem';
import LoreListCard from './pages/loreListCard';
import ExpandTreeArrow from './expandTreeArrow';
import ListTreeInner from './listTreeInner';
import ListTreeLink from './listTreeLink';



export default class ListTree extends Component {
  constructor(props) {
    
    super(props);
    this.state = {
      obj: undefined,
      pic: undefined,
      usage: 0,
    }
    
  }
  componentDidMount(){
    let app = this.props.app;
    let dispatch = app.dispatch
    let state = app.state;
    let prevUrl = undefined;
setInterval(async() => {
  const currUrl = window.location.href;
  if (currUrl !== prevUrl) {
    if(!currUrl.includes("-")){
      dispatch({currentLore:undefined});
    }
    else{
      let list = currUrl.split("/");
      let id = list[list.length-1].split("-")[1]
      let lore = state.componentList.getComponent("lore", id, "_id");
      await dispatch({currentLore:undefined})
      dispatch({currentLore:lore});
    }
    // URL changed
    prevUrl = currUrl;
    //console.log(`URL changed to : ${currUrl}`);
    
  }
}, 60);
  }

 


  render() {
    let app = this.props.app;
    let dispatch = app.dispatch
    let state = app.state;
    
    let styles = state.styles;
    const _id = this.props._id;
    let name = this.props.name;
    let attribute = this.props.attribute;
    console.log(this.props._id)
    let path = window.location.pathname;
    let parts = path.split('/');
    let idSegment = parts.pop();
    let idParts = idSegment.split('-');
    
    let campId =  idParts[0]


  
    const isHidden = state.currentExpanse && state.currentExpanse.includes(_id);

    return (<div >
      
             <div style={{flexDirection:"row", display:"flex",}} >
             
             <div style={{flexDirection:"column", display:"flex", marginRight:"-20px",
             alignItems:"center"}} >

                    {!isHidden && (
                      <div style={{...styles.buttons.buttonAdd, marginBottom:"15px", marginTop:"5px", paddingLeft:"29px",  paddingRight:"29px", 
                      
                      padding:"4px", borderRadius:"9px", fontSize:"18px", }}
                      onClick={()=>{
                        dispatch(
                          {operate:"addlore", operation:"cleanJsonPrepareRun",
                          //                                      CHANGE NAME later
                          object:{ parentId:_id, type:"lore", name:"New Lore", campaignId:campId}}
                        )
                      }}
                      >+ Create Lore</div>)}

{/* //ADD IMAGE HERE// */}

                        <MapComponent app={app}  theme={"expandingTree"} 
                                             
                        name={name} cells={[
                        {custom: ListTreeLink, props:{app:app, name:"name",}},
                        {custom:ExpandTreeArrow, props:{app:app}},
                        {custom:ListTreeInner, props:{app:app}},
                        
                      ]}
                        filter={{search: _id, attribute: attribute}}  />

              </div>
            </div>
            
            
        </div>
        
    )
  }
}


