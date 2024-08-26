import { Component } from 'react';
import compassImage from '../pics/Compass_Final.png';
import bannerImage from '../pics/Warbanner_Final.png';
import imageImage from '../pics/Image_Final.png';
import arrowGif from '../pics/downArrowGif.gif'
import { Link, } from 'react-router-dom';

export default class LoreItemWithNotation extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  getWordCount(str) {
    return str.split(/\s/).filter(Boolean).length;
  }

  handleDragOver = (event, lore) => {
    event.preventDefault(); // Prevent default to allow drop
    let targetId = lore.getJson()._id;
    this.setState({ dragOverTarget: targetId });
  };



  render() {
    let obj = this.props.obj;
    let app = this.props.app;
    let state = app.state;
    let styles = state.styles;
    let dispatch = app.dispatch;
    let currentState = app.state;
    let componentList = currentState.componentList;

    obj = obj.getJson().reference ? componentList.getComponent("lore", obj.getJson().ogId, "_id") : obj;


    let objName = obj.getJson().name.length > 33 ? obj.getJson().name.substring(0, 33) + "..." : obj.getJson().name;
    let mapList = componentList.getList("map", obj.getJson()._id, "loreId");
    let encounterList = componentList.getList("encounter", obj.getJson()._id, "loreId");
    let imageList = componentList.getList("image", obj.getJson()._id, "loreId");

    let listTerm = state.currentLore ? "parentId" : "campaignId";



    let allColors = obj.getJson().colors ? obj.getJson().colors : ["#000000"];
    let colorList = Object.values(allColors);
    const choiceColor = obj.getJson().colors ? colorList[2] : "#000000";
    const choiceColor2 = obj.getJson().colors ? colorList[3] : "#ffffff";

    let desc = obj.getJson().desc;
    let wordCount = this.getWordCount(desc);
    let wordCountIs = this.getWordCount(desc) > 4 ? "Word Count: " + wordCount : "";

    let objParent = obj.getJson().parentId;

    let parentName = Object.values(objParent)[0] ? Object.values(objParent)[0] : '';

    let allList = mapList.length + encounterList.length + imageList.length;

    let isEmpty = allList === 0;

    let isNewEmpty = objName.includes(this.props.newLoreName) && isEmpty;

    let isGrab = this.props.isGrabbing === obj;
    let anim = isGrab ? 'flash-off 1.5s 10' : "";
    let backColor = isGrab ? choiceColor + "1D" : choiceColor + "0D";


    let href = window.location.href;
    let splitURL = href.split("/");
    let id = splitURL[splitURL.length - 1];
    let newLink = "";

    if (id.includes("-")) {
      let idList = id.split('-');
      let ogId = obj.getJson().reference ? obj.getJson().ogId : obj.getJson()._id
      newLink = idList[0] + "-" + ogId;
    } else {
      newLink = id + "-" + obj.getJson()._id;
    }



    let sendLink = state.popupSwitch !== "popupLore" ? "../campaign/" + newLink : "";

    let insert = <>
      {(this.props.isGrabbing !== "" && this.props.isGrabbing !== obj) && state.popupSwitch !== "popupLore" &&
        <div className='hover-div'

          style={{
            opacity: ".5", borderRadius: "18px", alignmentSelf: "center",
            zIndex: "-10",
            width: "448px", border: "2px dashed green", height: "72px", position: "absolute", top: -5, left: -4,
            textDecoration: "none",
          }} >
          {/* <img src={arrowGif} style={{width:"32px", height:"32px", marginTop:"-11px" }}/> */}

        </div>
      }

      {isNewEmpty &&
        <div style={{
          width: "100%", height: "100%", position: "absolute",
          border: "1.5px solid" + styles.colors.color3 + "e1",
          animation: isNewEmpty ? 'flash-off 1s 3' : "",
          borderRadius: "18px"
        }}></div>}


      <div style={{
        color: this.props.isGrabbing === obj ? styles.colors.color9 : styles.colors.colorWhite,
        fontSize: this.props.isGrabbing === obj ? styles.fonts.fontSmall : styles.fonts.fontNormal, 
        marginTop: "16px", width: "100%", height: "100%", textDecoration:"none",
      }}>
        {objName}
      </div>



      {/* {this.props.isGrabbing===obj && state.popupSwitch!=="popupLore" &&
(
<div style={{color:'styles.colors.color8', fontSize:".59rem"}}>Dropping into Lore</div>
)}

{(this.props.isGrabbing!==obj && this.props.isGrabbing!=="") &&
(
<div style={{color:styles.colors.color8+'88', fontSize:".59rem",}}>
{state.popupSwitch==="popupLore"?"Connect to this Lore":
"Accepting Lore"}

</div>
)} */}

      {(this.props.isGrabbing !== "" && this.props.isGrabbing !== obj) &&
        <div className='hover-div'
          style={{
            color: styles.colors.colorWhite + "65",
            marginLeft: "6px", marginTop: "47px",
            fontSize: styles.fonts.fontSmallest
          }}>
          {((parentName !== "undefined") && (parentName !== "") && parentName ? parentName : "")}
        </div>}


      <div style={{
        flexDirection: "row", display: "flex", width: "fit-content", position: "absolute", top: -5, right: 2,
        alignItems: "center", justifyContent: "flex-end", verticalAlign: "center", textAlign: "center",
        opacity: this.props.isGrabbing !== obj ? "1" : "0", transition: "all 1s ease",
        justifyItems: "flex-end", textDecoration:"none"
      }}>
        {/* ICONS */}




        {mapList.length >= 1 &&
          <img src={compassImage} title={mapList.length + " Connected Maps"}
            style={{ width: "26px", height: "26px", }} />
        }

        {encounterList.length >= 1 &&
          <img src={bannerImage} title={encounterList.length + " Connected Encounters"}
            style={{ width: "24px", height: "26px", marginLeft: "5px" }} />
        }

        {imageList.length >= 1 &&
          <img src={imageImage} title={imageList.length + " Images in Gallery"}
            style={{ width: "26px", height: "25px", marginLeft: "5px" }} />
        }
      </div>

      {this.props.isGrabbing === obj &&
        <div style={{ position: "absolute", animation: anim, display: "flex", flexDirection: "column", justifyContent: "center", justifyItems: "center" }}>
          <div style={{ height: "3px", background: styles.colors.colorWhite + "55", width: "200px", marginTop: "78px", borderRadius: "4px", alignSelf: "center" }}></div>
          <div style={{ height: "2px", background: styles.colors.colorWhite + "55", width: "100px", marginTop: "3px", borderRadius: "4px", alignSelf: "center" }}></div>
          <div style={{ height: "1px", background: styles.colors.colorWhite + "55", width: "50px", marginTop: "3px", borderRadius: "4px", alignSelf: "center" }}></div>
        </div>
      }
    </>;


    return (
      <>
        {this.props.link ? (<>{obj.getJson().pdfURL ? <a target='_blank' 
        className='none'
        style={{
          textDecoration: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          color: "#ffdead",
          backgroundColor: backColor,
          padding: "3px 4px",
          cursor: "pointer",
          border: this.props.isGrabbing === obj ? "1.8px solid " + styles.colors.color5 + "33" : "1px solid " + choiceColor2 + "22",
          textAlign: "center",
          minWidth: this.props.isGrabbing === obj ? "250px" : "440px",
          margin: this.props.isGrabbing === obj ? "8px 99px" : "8px 4px",
          minHeight: "64px",
          borderRadius: "18px",
          height: "64px",
          transition: "all 1s",
        }} href={obj.getJson().pdfURL}>{insert}
          {/* go to */}
        </a> :
          <Link to={obj.getJson().pdfURL || sendLink} className='hover-container' onDragEnter={(e) => {
            this.handleDragEnter(e, obj)
          }}
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              color: "#ffdead",
              backgroundColor: backColor,
              padding: "3px 4px",
              cursor: "pointer",
              border: this.props.isGrabbing === obj ? "1.8px solid " + styles.colors.color5 + "33" : "1px solid " + choiceColor2 + "22",
              textAlign: "center",
              minWidth: this.props.isGrabbing === obj ? "250px" : "440px",
              margin: this.props.isGrabbing === obj ? "8px 99px" : "8px 4px",
              minHeight: "64px",
              borderRadius: "18px",
              height: "64px",
              transition: "all 1s",
            }}>
            {insert}
          </Link>}</>
        ) : (
          <div className='hover-container' onDragEnter={(e) => {
            this.handleDragEnter(e, obj)
          }}
            style={{
              textDecoration: "none",
              display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", color: "#ffdead",
              backgroundColor: backColor,
              padding: "3px 4px", cursor: "pointer",
              border: this.props.isGrabbing === obj ? "1.8px solid " + styles.colors.color5 + "33" : "1px solid " + choiceColor2 + "22",
              textAlign: "center",
              minWidth: this.props.isGrabbing === obj ? "250px" : "440px", margin: this.props.isGrabbing === obj ? "8px 99px" : "8px 4px", minHeight: "64px", borderRadius: "18px", height: "64px", transition: "all 1s"
            }}>
            {insert}
          </div>

        )}
      </>
    )
  }
}

