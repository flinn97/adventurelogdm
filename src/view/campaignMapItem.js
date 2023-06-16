import { Component } from 'react';
import "../App.css"
import AddCampaign from './AddCampaign';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import placeholder from '../pics/placeholderEncounter.JPG';

export default class CampaignMapItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      obj: undefined,
      pic: undefined
    }
  }
 

  render() {
    let app = this.props.app;
    let dispatch = app.dispatch
    let state = app.state;
   
    let styles = state.styles;
    let obj = this.props.obj;
    return (
      <Link to={"/campaign/"+obj?.getJson()._id} style={{color:styles.colors.colorWhite, textDecoration:"none",}}
     
      >

      <div style={{display: "flex", flexDirection: "row", justifyContent:"space-between",  width:"1000px", height:"200px", 
      backgroundImage: 'url('+(obj?.getJson().picURL||placeholder)+')', borderRadius:"3vmin",
      backgroundRepeat: "no-repeat",  backgroundPosition: "50% 50%",  backgroundSize:"cover" }}>
            
                <div>
                  {obj?.getJson().title}
                </div>
        </div>
        </Link>
      
    )
  }
}


