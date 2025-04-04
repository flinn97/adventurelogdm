import React, { Component } from 'react';

import LoreItemWithNotation from './loreItemwithNotation';
import toolService from '../services/toolService';
import idService from '../componentListNPM/idService';

import dateSort from '../pics/dateSort.png';
import nameSort from '../pics/abSort.png';
import dropIn from '../pics/dropIn.png';

import Draggable from 'react-draggable';
import { Link } from 'react-router-dom';
import loreIndexService from '../services/loreIndexService';
import IndexLoreHierarchy from './indexLoreHierarchy';
import auth from '../services/auth';

import arrow from '../pics/priorityIcon.png';
import PdfUploader from './uploadLorePdf';



export default class LoreSearch extends Component {
  constructor(props) {
    super(props);
    this.dropTargetRef = React.createRef();
    this.getId = this.getId.bind(this);
    this.state = {
      searchTerm: "",
      sortTerm: "mysort",
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
  async componentDidMount() {
    let app = this.props.app;
    let state = app.state;
    let styles = state.styles;
    let dispatch = app.dispatch;
    let currentState = app.state;
    let componentList = currentState.componentList;
    let listTerm = state.currentLore ? "parentId" : "parentId";
    let id = this.getId();

    let loreList = componentList.getList("lore", id, listTerm)
    await loreIndexService.reOrganizeLore(loreList, state.opps);
    await loreIndexService.sortComponentList(componentList);
  }

  handleStop = (loreItem) => {
    let id = loreItem.getJson()._id;

    const droppedOntoId = this.state.dragOverTarget;
    const droppedOntoLoreItemId = this.dropTargetRef.current;


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
  checkToShowRef(obj) {
    let reference = obj.getJson().reference;
    let firstReference = obj.getJson().firstReference;
    let bool = false;
    if (!reference) {
      bool = true;
    }
    if (firstReference) {
      bool = true;
    }
    return bool


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


    let campId = toolService.getIdFromURL(true, 0);



    let loreList = componentList.getList("lore", id, listTerm).filter(loreItem => loreItem.getJson().name && loreItem.getJson().name !== "")
      .filter(lore => !lore.getJson().parentLore).filter((obj) => { return this.checkToShowRef(obj) })
      .filter(loreItem => {
        const name = loreItem?.getJson()?.name;
        if (this.state.searchTerm === "mysort") {
          return name && name !== "";
        }
        return name && name !== "" && name.toLowerCase().includes(this.state.searchTerm.toLowerCase());
      }).sort((a, b) => a.getJson().index - b.getJson().index)

    let loreListAB = this.state.sortTerm === "name" ? loreList.sort((a, b) => {
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
    }) : loreList;


    let loreListTotal = componentList.getList("lore", id, listTerm).filter(loreItem => loreItem.getJson().name && loreItem.getJson().name !== "")
      .filter(lore => !lore.getJson().parentLore);
    let loreListTotalLength = loreListTotal.length;


    let beginName = this.props.app.state.currentLore ? ": " + this.props.app.state.currentLore.getJson().name : "";
    let newLoreName = "New Lore";

    let sortImage = this.state.sortTerm === "name" ? dateSort : nameSort;

    let placeholderT = '';

    return (
      <div style={{ width: "100%", minHeight: "200px", maxHeight: "fit-content", marginTop: (state.currentLore?.getJson()?.hideMap && state.currentLore?.getJson()?.hideLore ) ? "12px" : "90px", }}>

        <div style={{ flexDirection: "row", display: "flex" }}>
          <div style={{ color: styles.colors.colorWhite + "55", fontSize: styles.fonts.fontSmall, marginRight: "8px", minWidth: "fit-content" }}> {"Connected Lore:"}

          </div> {state.currentLore &&
            <div style={{ overflowY: "hidden", maxWidth: "100%", }} 
            className={(state.currentLore?.getJson()?.hideMap && state.currentLore?.getJson()?.hideLore ) ? "collapse" :"scroller2"}>
              <IndexLoreHierarchy app={app} currentLore={state.currentLore} count={1} color={styles.colors.color4} />
            </div>
          }
        </div>
        {/* <hr style={{height:"2px", display:"flex", width:"610px", mixBlendMode:"luminosity", opacity:".22"}}></hr> */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", justifyItems: "center", marginBottom: "60px", }}>
          
        <div style={{display: "flex", flexDirection: "row", marginTop:"2px"}}><div
            title={"New Lore, opens in a new Tab"}

            className="hover-btn" style={{
              ...styles.buttons.buttonAdd, marginTop: "15px", backgroundColor: styles.colors.colorBlack + "99",
              paddingLeft: "29px", paddingRight: "29px", alignSelf: "flex-start", justifyItems: "center", height: "36px",
              borderRadius: "9px", fontSize: "21px", width: "200px", marginRight:"21px"
            }}
            onClick={async () => {
              if (state.user.getJson().role !== "GM") {
                dispatch({ popupSwitch: "goPremium" });
                return
              }
              const newName = this.props.app.state.currentLore ? this.props.app.state.currentLore.getJson().name : "";
              // if(loreListTotalLength > 8){
              // this.setState({searchTerm:newLoreName});}
              let idS = idService.createId();


              let id = toolService.getIdFromURL(true, state.currentLore !== undefined ? 1 : 0);

              let otherChildren = componentList.getList("lore", id, "parentId");

              await state.opps.cleanJsonPrepare({
                addlore: {
                  parentId: { [id]: newName + " " }, _id: idS, index: 0,
                  type: "lore", name: newName + " " + newLoreName, campaignId: campId
                }
              })
              let l = state.opps.getUpdater("add")[0];
              await state.opps.run();
              await loreIndexService.insertAtBeginning(l, otherChildren);


            }}
          >+ Create Lore</div>


          <div
            title={"New Lore, opens in a new Tab"}

            className="hover-btn" style={{
              ...styles.buttons.buttonAdd, marginTop: "15px", backgroundColor: styles.colors.colorBlack + "99",
              paddingLeft: "29px", paddingRight: "29px", alignSelf: "flex-start", justifyItems: "center", height: "36px",
              borderRadius: "9px", fontSize: "21px", cursor: "pointer", minWidth: "138px", marginRight:"21px"
            }}
            onClick={async () => {
              
              if (state.user.getJson().role !== "GM") {
                dispatch({ popupSwitch: "goPremium" });
                return
              }
              const newId = state.currentLore ? state.currentLore.getJson()._id : state.currentCampaign.getJson()._id;
              let href = window.location.href;
              let splitURL = href.split("/");
              let id = splitURL[splitURL.length - 1];

              let otherChildren = componentList.getList("lore", id.includes("-") ? state.currentLore.getJson()._id : state.currentCampaign?.getJson()._id, "parentId");
              await state.opps.cleanJsonPrepare({
                addlore: {
                  campaignId: state.currentCampaign?.getJson()._id, index: otherChildren.length,
                  parentId:
                    { [newId]: "Unnamed" }
                }
              });
              let lore = await state.opps.getUpdater("add")[0]
              dispatch({
                popupSwitch: "popupLoreWithoutPin",
                currentComponent: lore

              })

              // dispatch({popupSwitch:'popupLore', operate:"addlore", operation:"cleanPrepare"})


            }}
          >+ Connect Lore</div>

          <div onClick={() => {
            if (state.user.getJson().role !== "GM") {
              dispatch({ popupSwitch: "goPremium" });
              return
            }
          }}
            title={"Add PDF"}
            className="hover-btn"
            style={{
              marginTop: "15px",
            }}
          >
            <PdfUploader app={app} />
          </div>
          </div>

          {loreListTotalLength > 8 &&
            <div style={{
              display: "flex", justifyContent: "flex-end",
              position: "relative", marginTop: "-36px", height: "36px",
              width: "fit-content", alignSelf: "flex-end",
            }}>


              <input app={app}

                type="input"
                placeholder={"Search Among " + loreListTotalLength + " Lore Connections..."}
                value={this.state.searchTerm}
                onChange={this.handleSearchChange}
                style={{
                  backgroundColor: styles.colors.color1 + "ee",
                  color: styles.colors.colorWhite,
                  borderRadius: "11px",
                  width: "420px",
                  padding: '8px',
                  marginRight: "115px",
                  fontSize: '16px',
                }}
              />
              {/* <div style={{
                display: "flex", flexDirection: "column", justifyContent: "center", justifyContent: "flex-end",
                width: "100px", alignItems: "center", marginLeft: "8px", marginBottom: "-22px", marginRight: "8px"
              }}
              >
                <div style={{
                  width: "100px", fontSize: styles.fonts.fontSmallest, justifyContent: "center", textAlign: "center",
                  color: styles.colors.colorWhite + "99",
                  marginTop: "22px"
                }}>
                  {this.state.sortTerm === "name" ? "My Order" : "Sort by Name"}
                </div>
                <div onClick={() => {
                  let s = this.state.sortTerm;
                  let term = s === "name" ? "mysort" : "name";
                  this.setState({ sortTerm: term })
                }}>
                  <img className='hover-btn-highlight'
                    src={sortImage} style={{ width: "39px", padding: "4px", cursor: "pointer" }} />
                </div>
              </div> */}
            </div>}



          <div style={{
            alignContent: "flex-start", alignItems: "center", alignSelf: "center",
            justifyContent: "space-evenly", borderRadius: "11px",
            width: "92%", minHeight: "200px", maxHeight: "fit-content",
            marginTop: "38px", display: 'flex', flexDirection: 'row', flexWrap: 'wrap'
          }}>
            {
              loreList
                .map((loreItem, index) => {
                  const loreItemId = loreItem?.getJson()._id;
                  const position = this.state.positions[loreItemId] || { x: 0, y: 0 };
                  let linkId = (loreItem?.getJson().ogId !== undefined && loreItem?.getJson().ogId !== "") ? loreItem?.getJson().ogId : loreItem?.getJson()._id;

                  return (
                    //   <Draggable

                    //     key={index}
                    //     position={position}
                    //     defaultPosition={{ x: 0, y: 0 }}
                    //     bounds={{ top: -480, left: -1100, right: 1100, bottom: 480 }}
                    //     handle='.hand'
                    //     onDrag={(event, data) => {
                    //       this.setState(prevState => ({
                    //         dragPosition: { x: event.clientX, y: event.clientY },
                    //         positions: {
                    //           ...prevState.positions,
                    //           [loreItemId]: { x: data.x, y: data.y },
                    //         },
                    //       }));
                    //     }}
                    //     onStart={(event, data,) => {
                    //       //
                    //       this.setState({ isGrabbing: true, grabItem: loreItem });
                    //     }}
                    //     onStop={() => this.handleStop(loreItem)}
                    //   >
                    <div className='hover-container' key={loreItem.getJson()._id}
                      style={{ width: "fit-content", height: "fit-content", transition: !this.state.isGrabbing ? 'transform 1.2s cubic-bezier(0.22, 1, 0.36, 1)' : "", }}>

                      {(!this.state.isGrabbing && this.state.sortTerm !== "name") &&

                        <div
                          // className='hand' 
                          style={{
                            color: "white", width: "fit-content", zIndex: "20", background: styles.colors.color1,
                            fontSize: styles.fonts.fontSmallest, userSelect: "none", marginBottom: "-8px", display: "flex", flexDirection: "row",
                            cursor: this.state.isGrabbing ? "grabbing" : "grab"
                          }}>

                          {/* left ARRRo */}
                          <div title={"Reorder Lore Left"} onClick={async (e) => {
                            e.stopPropagation();

                            let loreList = componentList.getList("lore", id, listTerm);
                            await loreIndexService.reOrganizeLore(loreList, state.opps);
                            await loreIndexService.moveDown(loreItem, loreList, state.opps);
                            await loreIndexService.sortComponentList(state.componentList);
                            dispatch({})
                          }} className='hover-div' style={{

                            cursor: "pointer",
                            borderTop: '11px solid transparent',
                            borderBottom: '11px solid transparent',
                            borderRight: '11px solid #D1BB0A',
                          }}>

                            {/* right ARRRo */}
                            <div className='hover-div' title={"Reorder Lore Right"} onClick={async (e) => {

                              e.stopPropagation();
                              let loreList = await componentList.getList("lore", id, listTerm);
                              await loreIndexService.reOrganizeLore(loreList, state.opps);

                              let list = await loreIndexService.moveUp(loreItem, loreList, state.opps);

                              await loreIndexService.sortComponentList(state.componentList);
                              dispatch({})
                            }} style={{
                              marginTop: "-11px",
                              cursor: "pointer",
                              marginLeft: "18px",
                              borderTop: '11px solid transparent',
                              borderBottom: '11px solid transparent',
                              borderLeft: '11px solid #D1BB0A',
                            }}></div>


                          </div>

                        </div>}

                      <div draggable="false" style={{ zIndex: "20", userSelect: "none", width: "fit-content", height: "fit-content" }}
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent event propagation
                          // this.navigateToLink(loreItem);
                        }}
                      >

                        {loreItem.getJson().pdfURL ? 
                        <LoreItemWithNotation
                              link={true}
                              externalLink={loreItem.getJson().pdfURL}
                              app={app}
                              obj={loreItem}
                              index={index}
                              newLoreName={newLoreName}
                              isGrabbing={this.state.grabItem}
                            /> :
                          <div>
                          <Link to={loreItem.getJson().pdfURL || "/campaign/" + toolService.getIdFromURL(true, 0) + "-" + linkId} style={{ textDecoration: "none" }}>
                            <div><LoreItemWithNotation
                              link={true}
                              app={app}
                              obj={loreItem}
                              index={index}
                              newLoreName={newLoreName}
                              isGrabbing={this.state.grabItem}

                            /></div>
                          </Link></div>}

                      </div>


                    </div>

                    // </Draggable>

                  )
                })}

          </div>



        </div>
      </div >

    )
  }
}

