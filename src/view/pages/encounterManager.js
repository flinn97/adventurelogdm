import { Component } from 'react';
import "../../App.css";
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import MapComponent from '../../componentListNPM/mapTech/mapComponent';
import EncounterCard from './encounterCard';
import placeholder from '../../pics/placeholderEncounter.JPG';
import AddEncounter from '../AddEncounter';
import backarrow from '../../pics/backArrow.webp';
import toolService from '../../services/toolService';

export default class EncounterManager extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pic: undefined,
    }
  }


  componentDidMount(){
    let href = window.location.href;
    let splitURL = href.split("/")
    let id = splitURL[splitURL.length-1]
    let component = this.props.app.state.componentList.getComponent("campaign", id)
    this.setState({obj: component}, this.updateBorderColor);
  }



  render() {
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles =state.styles;


    return (
      <div style={{width:"100%",}}>
        <Link className="hover-btn-highlight"
          to={"/campaign/"+toolService.getIdFromURL(false)} 
          style={{...styles.buttons.buttonAdd, textDecoration:"none", fontStyle:"italic", background:"", padding:"8px 8px", 
          color:styles.colors.color3+"e6", boxShadow:"", fontSize:".95rem",
          fontWeight:"bold", letterSpacing:".05rem", marginBottom:"10px", border:"" }}
          >
            <img style={{width:".9rem", opacity:"98%", marginRight:"8px"}}
            src={backarrow}
            />
            Back
          </Link>
          <div style={{...styles.backgroundContent, width:"100%",
          backgroundImage: 'url('+(this.state.obj?.getJson().picURL||placeholder)+')' }}>
              <div style={{ ...styles.popupSmall,
                }}>
              <div 
                style={{display: "flex", marginTop:"20px", flexDirection: 'row', justifyContent:"flex-start", 
              
                width: 'fit-content', height: 'fit-content',  borderRadius:"2vmin",}}>
                      <div style={{marginBottom:"20px", color:styles.colors.colorWhite, fontSize:styles.fonts.fontSubheader2,

                    }}>
                        
                        {this.state.obj?.getJson().title} Encounters</div>
                  </div>        
                  
                 
              </div>    
          </div>
          <div style={{display:"flex", position:"relative", flexDirection:"column", justifyContent:"flex-end",
       alignContent:"center", width:"100%", userSelect:"none", marginTop:"-22px"
       }}>
          <EncounterCard app={app} type="card" options={{cardType:"cardContent"}}/> 
          </div>
      </div>
    )
  }
}

