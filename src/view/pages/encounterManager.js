import { Component } from 'react';
import "../../App.css";
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import MapComponent from '../../componentListNPM/mapTech/mapComponent';
import EncounterCard from './encounterCard';
import placeholder from '../../pics/placeholderEncounter.JPG';
import AddEncounter from '../AddEncounter';

export default class EncounterManager extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }
 
  componentDidMount(){
    let href = window.location.href;
    let splitURL = href.split("/")
    let id = splitURL[splitURL.length-1]
    let component = this.props.app.state.componentList.getComponent("campaign", id)
    this.setState({obj: component})
  }

  render() {
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles =state.styles;

    return (
      <div>
          <div style={{...styles.backgroundContent,
          backgroundImage: 'url('+(this.state.obj?.getJson().picURL||placeholder)+')' }}>
              <div style={{ ...styles.popupSmall,
                }}>
              <div 
                style={{display: "flex", marginTop:"3vmin", flexDirection: 'row', justifyContent:"flex-start", 
              
                width: 'fit-content', height: 'fit-content',  borderRadius:"2vmin",}}>
                      <div style={{marginBottom:"70px", color:styles.colors.colorWhite, fontSize:styles.fonts.fontSubheader2,

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

