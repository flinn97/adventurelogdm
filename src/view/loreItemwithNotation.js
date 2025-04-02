import { Component } from 'react';
import compassImage from '../pics/Compass_Final.png';
import bannerImage from '../pics/Warbanner_Final.png';
import imageImage from '../pics/Image_Final.png';
import { Link } from 'react-router-dom';
import toolService from '../services/toolService';

export default class LoreItemWithNotation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getWordCount(str) {
    return str.split(/\s/).filter(Boolean).length;
  }

  handleDragOver = (event, lore) => {
    event.preventDefault();
    let targetId = lore.getJson()._id;
    this.setState({ dragOverTarget: targetId });
  };

  render() {
    const { obj, app, newLoreName, isGrabbing, link, externalLink } = this.props;
    const state = app.state;
    const styles = state.styles;
    const componentList = state.componentList;

    const lore = obj.getJson().reference ? componentList.getComponent("lore", obj.getJson().ogId, "_id") : obj;

    const objName = lore.getJson().name.length > 33 ? lore.getJson().name.substring(0, 33) + "..." : lore.getJson().name;

    const mapList = componentList.getList("map", lore.getJson()._id, "loreId");
    const encounterList = componentList.getList("encounter", lore.getJson()._id, "loreId");
    const imageList = componentList.getList("image", lore.getJson()._id, "loreId");

    const choiceColor = lore.getJson().colors?.[2] || "#000000";
    const choiceColor2 = lore.getJson().colors?.[3] || "#ffffff";

    const backColor = isGrabbing === obj ? choiceColor + "1D" : choiceColor + "0D";

    const sendLink = externalLink || lore.getJson().pdfURL || (`../campaign/${toolService.getIdFromURL(true, 0)}-${lore.getJson()._id}`);

    const insert = (
      <>
        <div style={{
          color: isGrabbing === obj ? styles.colors.color9 : styles.colors.colorWhite,
          fontSize: isGrabbing === obj ? styles.fonts.fontSmall : styles.fonts.fontNormal,
          marginTop: "16px", width: "100%", height: "100%", textDecoration: "none",
        }}>
          {objName}
        </div>

        <div style={{
          flexDirection: "row", display: "flex", position: "absolute", top: -5, right: 2,
          alignItems: "center", opacity: isGrabbing !== obj ? "1" : "0", transition: "all 1s ease",
        }}>
          {mapList.length > 0 && <img src={compassImage} title={`${mapList.length} Connected Maps`} style={{ width: "26px" }} className='hover-btn-highlight2'/>}
          {encounterList.length > 0 && <img src={bannerImage} title={`${encounterList.length} Connected Encounters`} style={{ width: "24px", marginLeft: "5px" }} className='hover-btn-highlight2' />}
          {imageList.length > 0 && <img src={imageImage} title={`${imageList.length} Images in Gallery`} style={{ width: "26px", marginLeft: "5px" }} className='hover-btn-highlight2'/>}
        </div>
      </>
    );

    const containerStyle = {
      textDecoration: "none",
      display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column",
      color: "#ffdead", backgroundColor: backColor,
      padding: "3px 4px", cursor: "pointer",
      border: isGrabbing === obj ? `1.8px solid ${styles.colors.color5}33` : `1px solid ${choiceColor2}22`,
      textAlign: "center", minWidth: isGrabbing === obj ? "250px" : "440px",
      margin: isGrabbing === obj ? "8px 99px" : "8px 4px",
      minHeight: "64px", borderRadius: "18px", height: "64px", transition: "all 1s",
    };

    if (link || externalLink) {
      return externalLink ? (
        <a href={externalLink} target='_blank' style={containerStyle}>{insert}</a>
      ) : (
        <Link to={sendLink} style={containerStyle}>{insert}</Link>
      );
    }

    return (
      <div style={containerStyle} className='hover-container' >{insert}</div>
    );
  }
}
