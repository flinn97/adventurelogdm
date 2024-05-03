import './App.css';
import { Component } from 'react';
// import Home from './view/home';
// import Login from './view/login';
// import Register from './view/register';
import './index.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import CampaignEditor from './view/campaignEditor';
import Worldbuilder from './view/worldBuilder';
import EncounterManager from './view/pages/encounterManager';
import Encounter from './view/encounter';
import Nav from './componentListNPM/navTech/nav';
import Login from './view/login';
import PopupDelete from './view/popups/popupDelete';
import PopupLore from './view/popups/popupLore';
import ViewPic from './view/popups/viewPic';
import ConnectToCampaign from './view/popups/connectToCampaign';
import AdventureLog from './view/pages/adventureLog';
import AddPlayerCharacter from './view/popups/addPlayerCharacter';
import ViewPlayerList from './view/popups/viewPlayerList';
import Register from './view/register';
import Campaign from './view/pages/campaign';
import AdminUser from './view/admin/adminUser';
import AdminPartner from './view/admin/adminPartner';
import AdminRequests from './view/admin/adminRequests';
import AdminSubmission from './view/admin/adminSubmissions';
import logo from "./pics/logoava2.png"
import SplashScreen from './view/pages/splashScreen';
import LibraryForGalleryPopup from './view/popups/libraryForGalleryPopup';
import AfterPayment from './view/afterPayment';
import PaymentFailed from './view/paymentFailed';
import PlayerRegister from './view/playerRegister';
import PartnerCampaign from './view/admin/partnerCampaigns';

import backarrow from '../src/pics/backArrow.webp'
import ApprovalProposal from './view/admin/approvalProposal';
import PopupExtendedMapSelector from './view/popups/popupExtendedMapGallery';
import PopupExtendedLibrary from './view/popups/popupExtendedLibrary';
import PopupApprovalSubmitted from './view/popups/popupApprovalSubmitted';

//model
export default class Dispatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidUpdate() {
    let R = this.props.app.state.rerender;
    if (R === "true") {
      this.props.app.dispatch({
        rerender: "false",
      })

    }
  }


  render() {
    let app = this.props.app;
    let state = app.state;
    let styles = state.styles;
    let RR = state.rerender;

    let user = state.user ? state.user : "";
    let isPlayer = user ? user.getJson().role === "player" : "";

    return (

      <BrowserRouter>
        {/*      === */}
        {(state.user !== undefined && state.user?.getJson()?.paidCustomer) && (


          <div >
            {(state.popupSwitch === "splashScreen") &&
              <div style={{ background: styles.colors.color2, zIndex: 55000, width: "100vw", height: "100vh" }}>
                <SplashScreen
                  options={{ cardType: "bigCardBorderless" }} app={app}
                  containerStyle={{ background: styles.colors.color2, zIndex: 55000, }}

                />


              </div>
            }
            {(state.popupSwitch !== "splashScreen") &&
              <div className={window.innerWidth > 800 ? 'scroller2' : ""} style={{
                width: "100%", overflow: "scroll",
                minWidth: "100%", userSelect: "none", height: "100vh",
                display: "flex", flexDirection: "column",
              }}>


                <div style={{ display: 'flex', zIndex: 2000, marginRight: window.innerWidth > 800 ? "210px" : "", }}>

                  {window.innerWidth > 800 ? (
                    <Nav app={app} theme="legatoDark" template="legatoDark" type="sideBarNav" options={
                      { logo: logo, }}
                    />

                  ) : (
                    <>
                      {window.location.href.includes("log") && (<>
                        <div style={{
                          width: "100vw", height: "52px", background: styles.colors.color2, display: "flex",
                          position: "absolute",
                          justifyContent: "space-between", alignItems: "center", fontSize: "1.1rem",
                        }}>

                          <Link to={"/"} style={{ display: "flex", flexDirection: "row", }}>
                            <img src={backarrow} style={{ height: "16px", marginLeft: "18px", marginRight: "11px" }} />
                            <div style={{
                              width: "", borderRadius: "11px", cursor: "pointer",
                              textDecoration: "1px underline " + styles.colors.color3, color: styles.colors.color3, textUnderlineOffset: "2px"
                            }}>Back</div>
                          </Link>

                        </div>

                      </>)
                      }
                    </>
                  )}
                  {/* </div>)  */}

                  {/* || (
                      <div>
                        {!isPlayer && (<div>
                          <Nav app={app} theme="legatoDark" template="legatoDark" type="sideBarNav" options={
                            { logo: logo, }}
                          />

                        </div>) || (<div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", padding:"22px"}}>

                          <Link to={"/"}
                            style={{ width: "400px", borderRadius: "11px", fontSize: styles.fonts.fontSmallest, cursor:"pointer",
                            textDecoration: "1px underline " + styles.colors.color3, color: styles.colors.color3, textUnderlineOffset: "2px" }}> {"< Home"}
                          </Link>
                          <div onClick={auth.logout} style={{ width: "400px", borderRadius: "11px", fontSize: styles.fonts.fontSmallest, cursor:"pointer",
                            textDecoration: "1px underline " + styles.colors.color5, color: styles.colors.color5, textUnderlineOffset: "2px" }}>Logout</div>
                        </div>)
                        }
                      </div>
                    )
                  } */}
                </div>
                {/* WITHIN */}
                <div style={{ display: 'flex', flexDirection: 'row', width: "100%", paddingLeft: window.innerWidth > 800 ? "210px" : "", }}>

                  <div style={{
                    width: '100%', minHeight: "fit-content", padding: window.innerWidth > 800 ? "28px" : "", display: "flex", height: "100%",
                    justifyContent: "center",
                  }}>


                    {(state.popupSwitch === "popupDelete" && state.currentDelObj !== undefined) &&
                      <PopupDelete
                        type="popup" options={{ cardType: "popupSmallest" }} app={app} containerStyle={{ background: styles.colors.color2 }}
                        handleClose={() => { app.dispatch({ popupSwitch: "", currentDelObj: undefined }) }}
                        delClick={state.handlePopupClose ? state.handlePopupClose : () => { app.dispatch({ popupSwitch: "", currentDelObj: undefined }) }}
                      />}
                    {(state.popupSwitch === "seeLibrary") &&
                      <LibraryForGalleryPopup
                        type="popup" options={{ cardType: "popupLarge" }} app={app}
                        handleClose={() => { app.dispatch({ popupSwitch: "", currentDelObj: undefined, selectedCampaign:"" }) }}

                      />}

                      {state.popupSwitch === "chooseMap"
                      &&
                      <PopupExtendedMapSelector
                        uploader={state.mapUpload}

                        type="popup" options={{ cardType: "popupCreate2" }} app={app}
                        containerStyle={{ backgroundColor: styles.colors.color1 + "55", }}
                        handleClose={() => {
                          app.dispatch({
                            popupSwitch: "", currentDelObj: undefined,selectedCampaign: "",
                            currentComponent: undefined, currentPin: undefined
                          });
                          state.opps.clearUpdater();
                        }}
                        delClick={state.handlePopupClose ? state.handlePopupClose : () => {
                          app.dispatch({
                            popupSwitch: "",
                            currentDelObj: undefined,
                          })
                        }}
                      />}
                    {state.popupSwitch === "viewPic" && state.currentPic !== undefined &&
                      <ViewPic

                        type="popup" options={{ cardType: "popupLarge" }} app={app}
                        handleClose={() => { app.dispatch({ popupSwitch: "", currentComponent: undefined }) }}

                      />}

                    {state.popupSwitch === "connectPlayer" && state.currentComponent?.getJson()?.type === "monster" &&
                      <ConnectToCampaign

                        type="popup" options={{ cardType: (window.innerWidth > 800) ? "popupSmallSolid" : "popupLarge" }} app={app} containerStyle={{ background: styles.colors.color2 }}
                        theme="adventure"
                        handleClose={() => { app.dispatch({ popupSwitch: "", currentComponent: undefined }) }}

                      />}

                    {state.popupSwitch === "addCharacter" && state.currentComponent?.getJson()?.type === "monster" &&

                      <AddPlayerCharacter

                        type="popup" options={{ cardType: (window.innerWidth > 800) ? "popupCreate" : "popupLarge" }} app={app}
                        handleClose={() => { app.dispatch({ popupSwitch: "", currentComponent: undefined }) }}

                      />
                    }

                    {state.popupSwitch === "viewPlayers" &&

                      <ViewPlayerList

                        type="popup" options={{ cardType: "popupCreate" }} app={app}
                        handleClose={() => { app.dispatch({ popupSwitch: "", currentComponent: undefined }) }}

                      />
                    }

                    {state.popupSwitch === "popupLore"
                      && (state.currentComponent?.getJson().type === "lore")
                      &&
                      <PopupLore

                        type="popup" options={{ cardType: "popupMedium" }} app={app}
                        containerStyle={{ backgroundColor: styles.colors.color1 + "55", }}
                        handleClose={() => {
                          app.dispatch({
                            popupSwitch: "", currentDelObj: undefined,
                            currentComponent: undefined, currentPin: undefined
                          });
                          state.opps.clearUpdater();
                        }}
                        delClick={state.handlePopupClose ? state.handlePopupClose : () => {
                          app.dispatch({
                            popupSwitch: "",
                            currentDelObj: undefined,
                          })
                        }}
                      />}
                    {state.popupSwitch === "popupLoreWithoutPin"
                      && (state.currentComponent?.getJson().type === "lore")
                      &&
                      <PopupLore

                        type="popup" options={{ cardType: "popupMedium" }} app={app}
                        containerStyle={{ backgroundColor: styles.colors.color1 + "55", }}
                        handleClose={() => {
                          app.dispatch({
                            popupSwitch: "", currentDelObj: undefined,
                            currentComponent: undefined, currentPin: undefined
                          });
                          state.opps.clearUpdater();
                        }}
                        delClick={state.handlePopupClose ? state.handlePopupClose : () => {
                          app.dispatch({
                            popupSwitch: "",
                            currentDelObj: undefined,
                          })
                        }}
                      />}

                    

                    {state.popupSwitch === "downloadLibrary"
                      &&
                      <PopupExtendedLibrary
                        uploader={state.mapUpload}

                        type="popup" options={{ cardType: "popupMedium" }} app={app}
                        containerStyle={{ backgroundColor: styles.colors.color1 + "55", }}
                        handleClose={() => {
                          app.dispatch({
                            popupSwitch: "", currentDelObj: undefined,
                            currentComponent: undefined, currentPin: undefined
                          });
                          state.opps.clearUpdater();
                        }}
                        delClick={state.handlePopupClose ? state.handlePopupClose : () => {
                          app.dispatch({
                            popupSwitch: "",
                            currentDelObj: undefined,
                          })
                        }}
                      />}

                    {state.popupSwitch === "approvalSubmitted"
                      &&
                      <PopupApprovalSubmitted
                        type="popup" options={{ cardType: "popupMedium" }} app={app}
                        containerStyle={{ backgroundColor: styles.colors.color1 + "55", }}
                        handleClose={() => {
                          app.dispatch({
                            popupSwitch: "", currentDelObj: undefined,
                            currentComponent: undefined, currentPin: undefined
                          });
                          state.opps.clearUpdater();
                        }}
                        delClick={state.handlePopupClose ? state.handlePopupClose : () => {
                          app.dispatch({
                            popupSwitch: "",
                            currentDelObj: undefined,
                          })
                        }}
                      />}

                    {state.user.getJson().role !== "GM" ? (

                      <Routes>
                        {state.switchCase?.map((obj, index) =>
                          <>{obj._id !== undefined ? (
                            <Route path={obj.path + "/:id"} element={<obj.comp app={app} />} />
                          ) : (
                            <Route path={obj.path} element={<obj.comp app={app} />} />

                          )}</>
                        )}

                        <Route path="/connecttoadventure/:id" element={<AdventureLog app={app} type="cardWithTab" options={{ tabType: "bigCardBorderless", cardType: undefined }} />} />
                        <Route path="/log/:id" element={<AdventureLog app={app} />} />
                        <Route path="/login/" element={<Login app={app} />} />
                        <Route path="/register/" element={<Register app={app} />} />


                      </Routes>
                    ) : (
                      <Routes>

                        {state.switchCase?.map((obj, index) =>

                          <Route path={obj.path} element={<obj.comp app={app} />} />
                        )}
                        <Route path="/campaign/" element={<Campaign app={app} />} />

                        <Route path="/campaign/:id" element={<CampaignEditor app={app} />} />
                        {/* <Route path="/library/:id" element={<CampaignEditor app={app} />} /> */}
                        <Route path="/worldbuilder/:id" element={<Worldbuilder app={app} />} />
                        <Route path="/encountermanager/:id" element={<EncounterManager app={app} />} />
                        {/* <Route path="/addencountermanager/:id" element={<AddEncounter app={app} />}/>  */}
                        <Route path="/encounter/:id" element={<Encounter app={app} players={state?.campaignPlayers} />} />

                        {/* <Route path="/log/:id" element={<AdventureLogPage app={app} />}/>  */}
                        <Route path="/log/:id" element={<AdventureLog app={app} />} />

                        <Route path="/admin/users" element={<AdminUser app={app} />} />
                        <Route path="/admin/partners" element={<AdminPartner app={app} />} />
                        <Route path="/admin/requests" element={<AdminRequests app={app} />} />
                        <Route path="/admin/submissions" element={<AdminSubmission app={app} />} />

                        <Route path="/partner/:id" element={<PartnerCampaign app={app} />} />
                        <Route path="/sendtomarketplace/:id" element={<ApprovalProposal app={app} />} />

                      </Routes>)}

                  </div>

                </div>
                {window.innerWidth > 600 && (
                  <div style={{
                    width: "fit-content", color: styles?.colors.color4, fontSize: styles?.fonts.fontSmallest, borderRadius: "11px",
                    alignSelf: "left", marginLeft: "222px", background: styles.colors.color1 + "99", padding: "11px", marginTop: "1vh",
                    marginBottom: "1vh"
                  }}>
                    ©2024 AVA Media & Productions
                  </div>)}

              </div>}

          </div>)}

        <Routes>

          <Route path="/register/" element={<Register app={app} />} />
          <Route path="/playerregister/" element={<PlayerRegister app={app} />} />

          <Route path="/login/" element={<Login app={app} />} />
          <Route path="/" element={<Login app={app} />} />

          <Route path="/paymentprocessing/" element={<AfterPayment app={app} />} />
        </Routes>
        {(state.user !== undefined && !state.user?.getJson()?.paidCustomer && state.user?.getJson().role === "GM") && (!window.location.href.includes("paymentprocessing")) && (
          <div style={{ width: "100%", height: "100%", position: "absolute", left: "0", top: "0", zIndex: 2800, background: "black" }}>
            <PaymentFailed app={app} />
          </div>
        )}


      </BrowserRouter>
    )
  }
}