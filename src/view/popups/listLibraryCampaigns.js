import { Component } from 'react';
import "../../App.css";


export default class ListLibraryCampaigns extends Component {
  constructor(props) {
    super(props);
    this.addSearch = this.addSearch.bind(this);
    this.state = {
      search: '',
      selectedCampaign: ''
    }
  }

  async componentDidMount() {
    let app = this.props.app;
    let dispatch = app.dispatch;
    this.setState({selectedCampaign:'', search:''});
    dispatch({selectedCampaign:''});
  }


  async addSearch(id) {
    

    this.setState({ search: id });

    const idString = `_${id}`; // Format ID with underscores
    let updatedSelectedCampaign = this.state.selectedCampaign || "";

    if (updatedSelectedCampaign.includes(idString)) {
      // If ID is already included, remove it
      updatedSelectedCampaign = updatedSelectedCampaign.replace(idString, '');
    } else {
      // Otherwise, add the ID
      updatedSelectedCampaign += idString;
    }

    // Remove trailing underscore if it's the only underscore left
    updatedSelectedCampaign = updatedSelectedCampaign.replace(/^_$/, '');
    

    // Update the state to trigger the dispatch
    this.setState({ selectedCampaign: updatedSelectedCampaign, }, () => {
      this.props.app.dispatch({ selectedCampaign: updatedSelectedCampaign });
    });
  }


  render() {

    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let camps = this.props.campaignsList
    let styles = state.styles;

    let campsAll = state.selectedCampaign?state.selectedCampaign:"";

    return (
      <div>


        <div className="menu-grid" style={{
          display: "flex", justifyContent: "center",
          flexDirection: "row", justifyItems: "space-around", flexWrap: "wrap", marginTop: "11px", marginBottom: "11px",
        }}>

          {
            camps
              .map((camp, index) => (

                <div className="hover-img" key={index} draggable="false"
                  onClick={async () => {
                    
                    let id = camp.getJson()._id;
                    if(camp.getJson().type==="mpItem"){
                      id = camp.getJson().campaignId
                    }
                    this.addSearch(id)
                  }}
                  style={{
                    background: "linear-gradient(0.25turn, " + styles.colors.colorBlack + ", " + styles.colors.color2 + ", " + styles.colors.color1 + ")",
                    borderRadius: "10px", margin: "6px", 
                    boxShadow: campsAll.includes((camp.getJson().type==="mpItem"?camp.getJson().campaignId:camp.getJson()._id)) ?"2px 4px 2px 0px"+styles.colors.color4+"82" :" 2px 4px 2px 1px black", cursor: "pointer", 
                    border: campsAll.includes((camp.getJson().type==="mpItem"?camp.getJson().campaignId:camp.getJson()._id)) ? "1px solid " + styles.colors.color3 : "1px solid white", minWidth: "280px", maxHeight: "35px", height:"34px",
                  }}>
                  <img src={camp.getJson().picURL ? camp.getJson().picURL : ""}
                    style={{
                      objectFit: "cover", opacity: campsAll.includes((camp.getJson().type==="mpItem"?camp.getJson().campaignId:camp.getJson()._id)) ? ".45" : ".15", mixBlendMode: campsAll.includes(camp.getJson()._id) ? "hard-light" : "luminosity",
                      height: "35px", borderRadius: "10px", width: "100%",height:"34px",
                    }}
                    alt={`img-${index}`} />

                  <div style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "fit-content",
                    mixBlendMode: "normal",
                    fontSize: "1rem",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    maxHeight: "35px",
                    position: "absolute",
                    top: "15%", fontWeight: "400",
                    paddingLeft: "5px",
                    color: campsAll.includes((camp.getJson().type==="mpItem"?camp.getJson().campaignId:camp.getJson()._id)) ? styles.colors.colorWhite : styles.colors.color3,
                    
                    textShadow: campsAll.includes((camp.getJson().type==="mpItem"?camp.getJson().campaignId:camp.getJson()._id)) ? "2px 2px 2px black, -2px -2px 3px black" : "1px 2px 2px black",
                  }}>
                    {camp.getJson().title ? camp.getJson().title.substring(0, 29) : "Untitled"}
                  </div>

                </div>

              ))
          }
        </div>
      </div>
    );
  }
}