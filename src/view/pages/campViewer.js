import { Component } from 'react';
import CampaignCard from './campaignCard';
import MapComponent from '../../componentListNPM/mapTech/mapComponent';
import auth from '../../services/auth';
import toolService from '../../services/toolService';
import "./viewer.css";
import backarrow from '../../pics/backArrow.webp';
import { Link } from 'react-router-dom';
import ParentFormComponent from '../../componentListNPM/componentForms/parentFormComponent';

export default class CampaignViewer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      theme: 'viewer', // Initial theme
    }
  }
  async componentDidMount() {

    let app = this.props.app;
    let dispatch = app.dispatch
    let state = app.state;
    let componentList = state.componentList
    let id = toolService.getIdFromURL(false);
    let obj = componentList.getComponent("viewer", id);
    if (!obj) {
      await auth.firebaseGetter(id, componentList, "_id", "viewer");
      obj = componentList.getComponent("viewer", id);

    }
    await dispatch({ currentViewer: obj });



  }

//   toggleTheme = () => {
//     const newTheme = this.state.theme === 'viewer' ? 'lightviewer' : 'viewer';
//     console.log('Theme toggled to:', newTheme); // Debug log
//     this.setState({ theme: newTheme });
//     // Optional CSS import logic
//     if (newTheme === 'lightviewer') {
//         import('./lightviewer.css');
//     } else {
//         import('./viewer.css');
//     }
//  };
 
  

  render() {
    let app = this.props.app;
    let dispatch = app.dispatch
    let state = app.state;
    let styles = state.styles;
    let html;
    if (state.currentViewer) {
      html = state.currentViewer.getJson().html
    }

    return (
      <div style={{ width: "100%", height: "100%", background: "" }} className={!state.user ? "scroller" : undefined}>
         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "11px" }}>
      {/* Left-aligned Back Arrow Link */}
      <Link to={state.user ? "../campaign/" : "../login"} style={{ display: "flex", flexDirection: "row", textDecoration: "none" }}>
        <img src={backarrow} style={{ height: "16px", marginLeft: "18px", marginRight: "11px" }} />
        <div style={{
          width: "", borderRadius: "11px", cursor: "pointer",
          textDecoration: "1px underline " + styles.colors.color3, color: styles.colors.color3, textUnderlineOffset: "2px"
        }}>{state.user ? "Back" : "To Login"}</div>
      </Link>

      {/* <ParentFormComponent
  type="switch2"
  
  value={this.state.theme === 'lightviewer'} // Pass the switch value (on/off)
  handleChange={this.toggleTheme} // This is the prop expected by SwitchComponent
/> */}

    </div>
        <hr></hr>
        {state.currentViewer &&
          <div 
            dangerouslySetInnerHTML={{ __html: html }} // Inject the HTML here
          />
        }


        <hr></hr>

      </div>

    )
  }
}


