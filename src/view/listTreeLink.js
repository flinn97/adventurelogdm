import { Component } from 'react';
import "../App.css"
import compassImage from '../pics/Compass_Final.png';
import bannerImage from '../pics/Warbanner_Final.png';
import imageImage from '../pics/Image_Final.png';


import { Link, } from 'react-router-dom';

export default class ListTreeLink extends Component {
  constructor(props) {

    super(props);
    this.state = {

    }

  }

  render() {
    let app = this.props.app;
    let dispatch = app.dispatch
    let state = app.state;

    let styles = state.styles;
    let obj = this.props.obj;
    let name = this.props.props.name;
    let currentState = app.state;
    let componentList = currentState.componentList;

    let objId = obj.getJson().reference ? obj.getJson().ogId : obj.getJson()._id;
    let mapList = componentList.getList("map", objId, "loreId");
    let encounterList = componentList.getList("encounter", objId, "loreId");
    let imageList = componentList.getList("image", objId, "loreId");


    let href = window.location.href;
    let splitURL = href.split("/");
    let id = splitURL[splitURL.length - 1];
    let newLink = "";

    if (id.includes("-")) {

      let idList = id.split('-');
      newLink = idList[0] + "-" + objId
    }

    else {
      newLink = id + "-" + objId
    }
    if (obj.getJson().parentLore === true) {

      let idList = id.split('-');
      newLink = idList[0];
    }

    let maxLengthName = 42 - ((this.props.props.c * 1.78) - (this.props.props.c - 1.5));
    if (maxLengthName <= 15) {
      maxLengthName = 34
    };



    let objName = obj.getJson()[name];
    if (obj.getJson().reference) {
      let ogComp = componentList.getComponent('lore', obj.getJson().ogId, "_id");
      objName = ogComp.getJson()[name];

    }
    objName = objName.length > maxLengthName ? objName.substring(0, maxLengthName) + "..." : objName;


    let bord = "solid 1px " + styles.colors.color3 + "54";
    let bord1 = (this.props.props.c === 0) ? bord : "";
    let lengthsAll = mapList.length + encounterList.length + imageList.length;
 
 let listTreeObserver = this.props.props.listTreeObserver;

 // Ensure listTreeObserver and list exist before accessing length
 let listLength = listTreeObserver && listTreeObserver.list ? listTreeObserver.list.length : 0;
 console.log(this.props.obj.getJson().name+" "+listLength);

 let fontListSize;

if (listLength >= 5) {
  fontListSize = "1rem";
} else if (listLength === 4) {
  fontListSize = ".92rem";
} else if (listLength === 3) {
  fontListSize = ".85rem";
} else {
  // For listLength <= 2
  fontListSize = ".80rem";
}

    return (<div
      className='hover-container'
      style={{
        cursor: "pointer",
        // borderTop:bord1,
        borderTopRightRadius: "4px",
        borderTopLeftRadius: "4px",
        // borderLeft:bord1,
        // borderRight:bord1,
        height: "fit-content",
        display: "flex"
      }}>
      {name !== "" && name !== undefined &&
      <>
      {obj.getJson().pdfURL?
        <a target='_blank' href={obj.getJson().pdfURL}

          style={{
            display: "flex",
            flexDirection: "row",
            textDecoration: "none",
            marginTop: "4px",
            width: "100%", // Use 100% to fill the parent container
            alignItems: "flex-start", // Align items to the start (left)
            justifyContent: "flex-start", // Align content to the start (left)
            textDecorationColor: styles.colors.color3,
            textDecorationThickness: "1px",

          }}>

          <div title={"Open " + objName}
            className='hover-img2'
            style={{
              color: styles.colors.colorWhite + "df", textDecoration: "none", fontSize: fontListSize, textAlign: "left", width: "100%", textOverflow: "ellipsis", overflowWrap: "break-word",
              marginLeft: "11px"
            }}
          >

            {objName}

          </div>

          {lengthsAll >= 1 &&
            (<div style={{
              flexDirection: "row", display: "flex", width: "fit-content", zIndex: "105", textDecoration: "none", marginLeft: "11px", height: "fit-content",
              backgroundColor: styles.colors.color8 + '17', padding: "4px",
              borderRadius: "11px", alignSelf: "flex-start",
              alignItems: 'flex-start', verticalAlign: "flex-start", textAlign: "flex-start", marginTop: "-3px"

            }}>
              {/* ICONS */}


              {mapList.length >= 1 &&
                <img className='hover-hide' src={compassImage} title={mapList.length + " Connected Maps"}
                  style={{ width: "20px", height: "20px", marginRight: imageList.length + encounterList.length >= 1 ? "5px" : "" }} />
              }

              {encounterList.length >= 1 &&
                <img className='hover-hide' src={bannerImage} title={encounterList.length + " Connected Encounters"}
                  style={{ width: "18px", height: "20px", marginRight: imageList.length >= 1 ? "5px" : "" }} />
              }

              {imageList.length >= 1 &&
                <img className='hover-hide' src={imageImage} title={imageList.length + " Images in Gallery"}
                  style={{ width: "20px", height: "20px", }} />
              }
            </div>)}

          {lengthsAll === 0 && <div style={{
            flexDirection: "row", display: "flex", width: "fit-content", zIndex: "105", textDecoration: "none", marginLeft: "8px",
            marginTop: "-8px", borderRadius: "11px", color: styles.colors.color8 + '27', alignSelf: "flex-end",
            alignItems: 'flex-start', justifyContent: "flex-end", verticalAlign: "flex-start", textAlign: "flex-start",
          }}>-</div>}



</a>
        :
        <Link to={"../campaign/" + newLink} state={obj.getJson().reference ? { ref: obj.getJson()._id } : undefined}

style={{
  display: "flex",
  flexDirection: "row",
  textDecoration: "none",
  marginTop: "4px",
  width: "100%", // Use 100% to fill the parent container
  alignItems: "flex-start", // Align items to the start (left)
  justifyContent: "flex-start", // Align content to the start (left)
  textDecorationColor: styles.colors.color3,
  textDecorationThickness: "1px",

}}>

<div title={"Open " + objName}
  className='hover-img2'
  style={{
    color: styles.colors.colorWhite + "df", textDecoration: "none", fontSize: fontListSize, textAlign: "left", width: "100%", textOverflow: "ellipsis", overflowWrap: "break-word",
    marginLeft: "11px"
  }}
>

  {objName}

</div>

{lengthsAll >= 1 &&
  (<div style={{
    flexDirection: "row", display: "flex", width: "fit-content", zIndex: "105", textDecoration: "none", marginLeft: "11px", height: "fit-content",
    backgroundColor: styles.colors.color8 + '17', padding: "4px",
    borderRadius: "11px", alignSelf: "flex-start",
    alignItems: 'flex-start', verticalAlign: "flex-start", textAlign: "flex-start", marginTop: "-3px"

  }}>
    {/* ICONS */}


    {mapList.length >= 1 &&
      <img className='hover-hide' src={compassImage} title={mapList.length + " Connected Maps"}
        style={{ width: "20px", height: "20px", marginRight: imageList.length + encounterList.length >= 1 ? "5px" : "" }} />
    }

    {encounterList.length >= 1 &&
      <img className='hover-hide' src={bannerImage} title={encounterList.length + " Connected Encounters"}
        style={{ width: "18px", height: "20px", marginRight: imageList.length >= 1 ? "5px" : "" }} />
    }

    {imageList.length >= 1 &&
      <img className='hover-hide' src={imageImage} title={imageList.length + " Images in Gallery"}
        style={{ width: "20px", height: "20px", }} />
    }
  </div>)}

{lengthsAll === 0 && <div style={{
  flexDirection: "row", display: "flex", width: "fit-content", zIndex: "105", textDecoration: "none", marginLeft: "8px",
  marginTop: "-8px", borderRadius: "11px", color: styles.colors.color8 + '27', alignSelf: "flex-end",
  alignItems: 'flex-start', justifyContent: "flex-end", verticalAlign: "flex-start", textAlign: "flex-start",
}}>-</div>}



</Link>}
        </>


      }
    </div>
    )
  }
}



