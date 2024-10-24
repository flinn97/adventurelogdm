import { Component } from 'react';
import CampaignCard from './campaignCard';
import MapComponent from '../../componentListNPM/mapTech/mapComponent';
import auth from '../../services/auth';
import toolService from '../../services/toolService';
import "./viewer.css";
import backarrow from '../../pics/backArrow.webp';
import { Link } from 'react-router-dom';

export default class CampaignViewer extends Component {
  constructor(props) {
    super(props);

    this.state = {

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
      <div style={{ width: "100%", height: "100%", background: "" }}>
        <Link to={"../campaign/" + state?.currentViewer?.getJson().campaignId} style={{ display: "flex", flexDirection: "row", marginBottom: "11px", textDecoration: "none" }}>
          <img src={backarrow} style={{ height: "16px", marginLeft: "18px", marginRight: "11px" }} />
          <div style={{
            width: "", borderRadius: "11px", cursor: "pointer",
            textDecoration: "1px underline " + styles.colors.color3, color: styles.colors.color3, textUnderlineOffset: "2px"
          }}>Back</div>
        </Link>
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


