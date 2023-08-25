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
    let _id = this.props._id;
    let name = this.props.name;
    let attribute = this.props.attribute;

    return (<div >
      
             <div style={{flexDirection:"row", display:"flex"}} >
             
             <div style={{flexDirection:"column", display:"flex",
             alignItems:"center", justifyItems:"center", justifyContent:"space-between", width:"18.2vw"}} >

              
                      <div style={{...styles.buttons.buttonAdd, marginBottom:"2vh", marginTop:"2vh"}}
                      onClick={()=>{
                        dispatch(
                          {operate:"addlore", operation:"cleanJsonPrepareRun",
                          object:{ parentId:_id, type:"lore", name:_id,}}
                        )
                      }}
                      >+ Create Lore</div>

                        <MapComponent app={app}  theme={"selectByImage"} 
                        iCellStyle={{justifyContent:"center", width:"100%",}} 
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


