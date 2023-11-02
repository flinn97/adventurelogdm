import { Component } from 'react';
import NoteCard from './noteCard';
import MapComponent from '../../componentListNPM/mapTech/mapComponent';
import NoteMapItem from '../noteMapItem';


export default class AdventureLogPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
     toShow: "100"
    }
  }


  render() {
    let app = this.props.app;
    let dispatch = app.dispatch
    let state = app.state;
    let styles =state.styles;

    let compList = state.componentList;
    let path = window.location.pathname;
    let parts = path.split('/');
    let idSegment = parts.pop();
    let campaigns = compList.getList("campaign", idSegment, "_id" )
    let currentCampId = campaigns?campaigns[0].getJson()._id:"";
    
    let logItems = compList.getList("message", currentCampId, "campaignId" )
    let cleanedItems = logItems
    .slice(0, this.state.imagesToShow)
    
    
    return (

      
      <div style={{width:"100%", display:"flex",flexDirection:"column", alignItems:"center", alignSelf:"center", justifySelf:"center"}}>

      {/* ADVENTURE LOG */}
          <div style={{width: "840px", height: "890px", border: "8px solid " + styles.colors.color6 + "55", 
          backgroundColor: styles.colors.color8 + "55",
          borderRadius: "20px", padding: "20px"}}>
                <div>
                  {cleanedItems.length > 0 && cleanedItems.map((item, index) => (
                    <div key={index} style={{color:styles.colors.colorWhite+"a9"}}>
                      {item.getJson().campaignId}
                    </div>
                  ))}
                </div>
          </div>
        
      </div >
    )
  }
}


