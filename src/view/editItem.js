import { Component } from 'react';
import "../App.css"
import AddCampaign from './AddCampaign';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import placeholder from '../pics/placeholderEncounter.JPG';
import Encounter from './encounter';

import arms from '../pics/iconKnight.png';
import ParentFormComponent from '../componentListNPM/componentForms/parentFormComponent';

export default class EditItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      
    }
  }
 

  render() {
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let styles = state.styles;
     return(
        <div>
        <ParentFormComponent checkUser={true}  app={app} name="name"

        inputStyle={{
        width: "100%", minWidth: "100%", padding: "4px 9px", color: styles.colors.color3, height: "fit-content",
        borderRadius: "4px", background: styles.colors.colorWhite + "00", borderWidth: "0px", height: "100%",
        border: "solid 1px " + styles.colors.colorWhite + "22",
        textWrap: "wrap", fontSize: styles.fonts.fontSubheader1
        }} />
        <div onClick={()=>{
            state.opps.run()
            dispatch({
                popupSwitch: "", currentDelObj: undefined,
                currentComponent: undefined, currentPin: undefined,
                loreType: ""
              });
              state.opps.clearUpdater();
        }}>save</div>
        </div>
     )
   
  }
}


