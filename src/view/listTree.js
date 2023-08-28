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



export default class ListTree extends Component {
  constructor(props) {
    
    super(props);
    this.state = {
      obj: undefined,
      pic: undefined,
      usage: 0,
    }
    
  }

 


  render() {
    let app = this.props.app;
    let dispatch = app.dispatch
    let state = app.state;
    
    let styles = state.styles;
    const _id = this.props._id;
    let name = this.props.name;
    let attribute = this.props.attribute;

  
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
                          object:{ parentId:_id, type:"lore", name:"new lore",}}
                        )
                      }}
                      >+ Create Lore</div>)}

                        <MapComponent app={app}  theme={"expandingTree"} 
                                             
                        name={name} cells={["name", 
                        {custom:ExpandTreeArrow, props:{app:app}},
                        {custom:ListTreeInner, props:{app:app}},
                        
                      ]}
                        filter={{search: _id, attribute: attribute}} />

              </div>
            </div>
            
            
        </div>
        
    )
  }
}


