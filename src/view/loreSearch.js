import React, { Component } from 'react';

import LoreItemWithNotation from './loreItemwithNotation';
import toolService from '../services/toolService';
import idService from '../componentListNPM/idService';

import dateSort from '../pics/dateSort.png';
import nameSort from '../pics/abSort.png';
import dropIn from '../pics/dropIn.png';

import Draggable from 'react-draggable';
import { Link } from 'react-router-dom';



export default class LoreSearch extends Component {
  constructor(props) {
    super(props);
    this.dropTargetRef = React.createRef();
    this.getId = this.getId.bind(this);
    this.state = {
      searchTerm: "",
      sortTerm: "date",
      isGrabbing: false,
      dragPosition: { x: 0, y: 0 },
      grabItem: "",
      positions: {},
    }
  }


  getId() {
    const path = window.location.pathname;
    const parts = path.split('/');
    const idSegment = parts.pop();
    const idParts = idSegment.split('-');

    return idParts.length > 1 ? idParts[1] : idParts[0]
  }

  handleSearchChange = (e) => {
    this.setState({ searchTerm: e.target.value });
  }

  navigateToLink = (obj) => {
    let href = window.location.href;
    let splitURL = href.split("/");
    let id = splitURL[splitURL.length - 1];
    let newLink = "";

    if (id.includes("-")) {
      let idList = id.split('-');
      newLink = idList[0] + "-" + obj.getJson()._id;
    } else {
      newLink = id + "-" + obj.getJson()._id;
    }


    toolService.navigateToLink("../campaign/" + newLink, true);
  }

  handleStop = (loreItem) => {
    let id = loreItem.getJson()._id;

    const droppedOntoId = this.state.dragOverTarget;
    const droppedOntoLoreItemId = this.dropTargetRef.current;
    console.log(`Dropped ${id} onto ${droppedOntoLoreItemId}`);


    this.setState(prevState => ({
      isGrabbing: false,
      grabItem: "",
      positions: {
        ...prevState.positions,
        [id]: { x: 0, y: 0 },
      },
      dragOverTarget: null,
    }));
  }



  render() {
    let obj = this.props.obj;
    let app = this.props.app;
    let state = app.state;
    let styles = state.styles;
    let dispatch = app.dispatch;
    let currentState = app.state;
    let componentList = currentState.componentList;

    let id = this.getId();
    let listTerm = state.currentLore ? "parentId" : "parentId";
    //campaign shows ONLY top level lore

    let path = window.location.pathname;
    let parts = path.split('/');
    let idSegment = parts.pop();
    let idParts = idSegment.split('-');
    let campId = idParts[0];



    let loreList = componentList.getList("lore", id, listTerm)
      .filter(loreItem => {
        const name = loreItem?.getJson()?.name;
        if (this.state.searchTerm === "") {
          return name && name !== "";
        }
        return name && name !== "" && name.toLowerCase().includes(this.state.searchTerm.toLowerCase());
      })
      .sort((a, b) => {
        const nameA = a.getJson().name;
        const nameB = b.getJson().name;
        const dA = a.getJson()?.date ? a.getJson().date.toDate() : new Date(0);
        const dB = b.getJson()?.date ? b.getJson().date.toDate() : new Date(0);
        //13 Oct 2023
        if (this.state.sortTerm === "name") {
          return nameA.localeCompare(nameB);
        } else {
          return dA - dB;

        }
      });


    let loreListTotalLength = componentList.getList("lore", id, listTerm).length

    let beginName = this.props.app.state.currentLore ? ": " + this.props.app.state.currentLore.getJson().name : "";
    let newLoreName = "New Lore";

    let sortImage = this.state.sortTerm === "name" ? dateSort : nameSort;

    return (
      <div style={{ width: "100%", minHeight: "200px", maxHeight: "fit-content", marginTop:"85px" }}>
        <div style={{ marginTop: "10px", color: styles.colors.colorWhite + "55", fontSize: styles.fonts.fontSmall }}> {"Connected Lore" + beginName}
          {/* <IndexLoreHeirarchy/> */}
        </div>

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", justifyItems: "center", marginBottom: "70px", }}>
          <div
            title={"New Lore, opens in a new Tab"}

            className="hover-btn" style={{
              ...styles.buttons.buttonAdd, marginTop: "15px", backgroundColor: styles.colors.colorBlack + "99",
              paddingLeft: "29px", paddingRight: "29px", alignSelf: "flex-start", justifyItems: "center", height: "36px",
              borderRadius: "9px", fontSize: "21px",
            }}
            onClick={async () => {

              const newName = this.props.app.state.currentLore ? this.props.app.state.currentLore.getJson().name : "";
              let idS = idService.createId();
              console.log(idS);
              let href = window.location.href;
              let splitURL = href.split("/");
              let id = splitURL[splitURL.length - 1];
              id = id.includes("-")? id.split('-')[1]: id;
                
                let otherChildren = componentList.getList("lore", id, "parentId");

          await dispatch(
          {operate:"addlore", operation:"cleanJsonPrepareRun",
          //                                      CHANGE NAME later
          object:{
            parentId:{[id]:newName+" "+newLoreName}, _id:idS, index:otherChildren.length,
                                            type:"lore", name: newName+" "+newLoreName, campaignId: campId},
                                            }
          );
          
                                       
                                      }}
                                      >+ Create Lore</div>

        {loreListTotalLength > 8 &&
          <div style={{
            display: "flex", justifyContent: "flex-end",
            position: "relative", marginTop: "-36px", height: "36px",
            width: "fit-content", alignSelf: "flex-end",
          }}>

            <input app={app}

              type="input"
              placeholder="Search Lore Connections..."
              value={this.state.searchTerm}
              onChange={this.handleSearchChange}
              style={{
                backgroundColor: styles.colors.color1 + "ee",
                color: styles.colors.colorWhite,
                borderRadius: "11px",
                width: "420px",
                padding: '8px',
                fontSize: '16px',
              }}
            />
            <div style={{
              display: "flex", flexDirection: "column", justifyContent: "center", justifyContent: "flex-end",
              width: "100px", alignItems: "center", marginLeft: "8px", marginBottom: "-22px", marginRight: "8px"
            }}
            >
              <div style={{
                width: "100px", fontSize: styles.fonts.fontSmallest, justifyContent: "center", textAlign: "center",
                color: styles.colors.colorWhite + "99",
                marginTop: "22px"
              }}>
                {this.state.sortTerm === "name" ? "Sort by Date" : "Sort by Name"}
              </div>
              <div onClick={() => {
                let s = this.state.sortTerm;
                let term = s === "name" ? "sort" : "name";
                this.setState({ sortTerm: term })
              }}>
                <img className='hover-btn-highlight'
                  src={sortImage} style={{ width: "39px", padding: "4px", cursor: "pointer" }} />
              </div>
            </div>
          </div>}



        <div style={{
          alignContent: "flex-start", alignItems: "center", alignSelf: "center",
          justifyContent: "space-evenly", borderRadius: "11px",
          width: "92%", minHeight: "200px", maxHeight: "fit-content",
          marginTop: "38px", display: 'flex', flexDirection: 'row', flexWrap: 'wrap'
        }}>
          {
            loreList
              .slice(0, 12)
              .filter(loreItem => loreItem.getJson().name && loreItem.getJson().name !== "")
              .map((loreItem, index) => {
                const loreItemId = loreItem.getJson()._id;
                const position = this.state.positions[loreItemId] || { x: 0, y: 0 };

                return (
                  <Draggable

                    key={index}
                    position={position}
                    defaultPosition={{ x: 0, y: 0 }}
                    bounds={{ top: -480, left: -1100, right: 1100, bottom: 480 }}
                    handle='.hand'
                    onDrag={(event, data) => {
                      this.setState(prevState => ({
                        dragPosition: { x: event.clientX, y: event.clientY },
                        positions: {
                          ...prevState.positions,
                          [loreItemId]: { x: data.x, y: data.y },
                        },
                      }));
                    }}
                    onStart={(event, data,) => {
                      //debugger
                      this.setState({ isGrabbing: true, grabItem: loreItem });
                    }}
                    onStop={() => this.handleStop(loreItem)}
                  >
                    <div className='hover-container'
                      style={{ width: "fit-content", height: "fit-content", transition: !this.state.isGrabbing ? 'transform 1.2s cubic-bezier(0.22, 1, 0.36, 1)' : "", }}>
                      {!this.state.isGrabbing &&
                        <div className='hand' title={"You can drag and drop this lore into other lore items"} style={{
                          color: "white", width: "fit-content", zIndex: "20", padding: "2px",
                          fontSize: styles.fonts.fontSmallest, userSelect: "none", marginBottom: "-10px", marginRight: "-10px",
                          cursor: this.state.isGrabbing ? "grabbing" : "grab"
                        }}>

                          <img className='hover-div' draggable="false" src={dropIn} style={{ width: "20px" }}></img>

                        </div>}

                      <div draggable="false" style={{ zIndex: "20", userSelect: "none", width: "fit-content", height: "fit-content" }}
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent event propagation
                          // this.navigateToLink(loreItem);
                        }}
                      >
                        <Link  to={"/campaign/"+toolService.getIdFromURL(true,0)+"-"+loreItem.getJson()._id} style={{textDecoration:"none"}}> 
                        <LoreItemWithNotation
                          link={true}
                          app={app}
                          obj={loreItem}
                          index={index}
                          newLoreName={newLoreName}
                          isGrabbing={this.state.grabItem}

                        />
                            </Link>

                      </div>


                    </div>

                  </Draggable>

                )
              })}

        </div>



      </div>
      </div >

    )
  }
}

