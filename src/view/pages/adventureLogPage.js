import { Component } from 'react';
import ico from '../../pics/backArrow.webp';
import sendArr from '../../pics/priorityIcon.png';
import img from '../../pics/Image_Final.png';
import auth from '../../services/auth';
import PostMapItem from '../postMapItem';
import ParentFormComponent from '../../componentListNPM/componentForms/parentFormComponent';
import "../../App.css";
import React from 'react';
import toolService from '../../services/toolService';
import diceService from '../../services/diceService';
import Upload from '../upload';
import colorService from '../../services/colorService';
import { multiFactor } from 'firebase/auth';
import DelButton from '../../componentListNPM/componentForms/buttons/deleteButton';
import { ScrollHelper } from '../adventureLogScrollHelper';
import SplashScreen from './splashScreen';
import TokenImage from '../tokenImage';
export default class AdventureLogPage extends Component {
  constructor(props) {
    super(props);
    this.messagesEndRef = React.createRef();
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.state = {
      toShow: "100",
      textI: "",
      nOfItems: "",
      sortedLogItems: [],
      invalidD: "",
      colors: [],
      showItems: false,
      showPopup: true,
    }
  }

  // FIREBASE LISTENER add here

  async componentDidMount() {
    let app = this.props.app;
    let dispatch = app.dispatch
    let state = app.state;
    let styles = state.styles;
    let compList = state.componentList;
    let idSegment = toolService.getIdFromURL(true);
    let campaigns = compList.getList("campaign", idSegment, "_id");
    let currentCampId = campaigns ? campaigns[0].getJson()._id : "";
    let components = await compList.getComponents();
    
    
//debugger
    await auth.firebaseGetter(currentCampId, compList, "campaignId", false, dispatch);
    

    await this.scrollToBottom();
    await state.componentList.sortSelectedListbyFirebaseDate("post");
    await this.setState({ textI: "",showItems: true, showPopup:false  }); 
    app.dispatch({ rerender: true });
    auth.firebaseGetter(currentCampId, state.componentList, "campaignId", "lore");
    await state.componentList.sortSelectedListbyFirebaseDate("post");
  }


  handleMessageChange = (e) => {
    this.setState({ textI: e.target.value });
  }

  timeOutMessage() {
    setTimeout(() => {
      this.setState({ invalidD: "",  showItems: true}); 
    }, 4000);
  };

  async sendText() {

    let userRole = this.props.app.state.user.getJson().role;
    let m = this.state.textI;
    let mType = "message";
    let newM;
    let d = "";
    if (m.startsWith("/roll ") || m.startsWith("/r ")) {
      m = this.state.textI.toString();

      mType = "diceroll";

      try {
        d = m.replace(/\/(r|roll)\s*/, '').replace(/\s/g, '');
        newM = diceService.rollDice(m);
        m = newM.toString();
        this.setState({ showItems: true })
      } catch (error) {
        this.setState({ invalidD: "*Invalid Dice Notation", textI: "", showItems: true }); 

        this.timeOutMessage();
        return
      };
    }

    let char = this.props.app.state.currentCharacter;
    let cPic = char?char.getJson().picURL:"";
    let cTok = char?char.getJson().isToken:"";
    let cCol = char?char.getJson().colors:"";
    let cName = char?char.getJson().name:"";

    const payload = {
      campaignId: toolService.getIdFromURL(true),
      type: "post", sender: userRole, name:cName,
      message: m, desc: d,
      senderId: this.props.app.state.user.getJson()._id,
      postType: mType,
      userPic: cPic, isToken: cTok, colors: cCol,
    };


    this.props.app.state.opps.cleanJsonPrepareRun({ "addpost": payload });
    this.props.app.dispatch({});

    this.setState({ textI: "",  showItems: true}, () => {
      setTimeout(() => this.scrollToBottom('smooth'), 0);
    }); 
  };

  handleKeyDown = async (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent the default action to avoid submitting the form
      if (this.state.textI !== "") {
        this.setState({ showItems: false });
        this.sendText();
        await this.scrollToBottom();

      }
    }
  };

  scrollToBottom = async (behavior) => {
    //
    const delay = ms => new Promise(res => setTimeout(res, ms));
    await delay(500);
    this.setState({ showItems: true });
    this.props.app.state.componentList.sortSelectedListbyFirebaseDate("post");
    if (this.messagesEndRef.current) {
      // DOESNT RENDER fast ENOUGH
      this.messagesEndRef.current.scrollIntoView({ behavior: behavior ? behavior : "auto", block: 'end' });
    }

  }


  render() {
    let app = this.props.app;
    let dispatch = app.dispatch
    let state = app.state;
    let styles = state.styles;

    let compList = state.componentList;
    
    let idSegment = toolService.getIdFromURL(true,0);
    let campaigns = compList.getList("campaign", idSegment, "_id");
    let currentCampId = campaigns ? campaigns[0]?.getJson()?._id : "";
    const getOpacity = (index, length) => {
      const diffFromEnd = length - index - 1;
      if (index + 3 >= length) return "100%";

      const opacityStep = 2; // Decrease opacity by 2% for each step beyond the third
      const baseOpacity = 100; // Start with 100% opacity
      const opacityDecrement = (diffFromEnd - 2) * opacityStep; // Calculate total decrement

      return `${Math.max(65, baseOpacity - opacityDecrement)}%`; // Ensure a minimum of 65%
    };

    //USE user role to determine what is passed into message
    let userRole = state.user.getJson().role;

    let sortedLogItems = compList.getList("post", currentCampId, "campaignId");

    let sLL = sortedLogItems.length;
    let newAmount = sortedLogItems.length - 100;

    let cleanedItems = sortedLogItems
      .slice(newAmount, sLL);


    return (
      <div style={{
        width: "100%", height: "100%", display: "flex", flexDirection: "column", marginTop: "30px", paddingBottom: "40px",
        alignItems: "center", alignSelf: "center", justifySelf: "center",
      }}>
        
        {!this.state.showItems &&<div style={{ background: styles.colors.color2, zIndex: 55000, width: "100vw", height: "100vh", position: "absolute", left: "0px", top: "0px" }}>
            <SplashScreen
              options={{ cardType: "bigCardBorderless" }} app={app}
              containerStyle={{ background: styles.colors.color2, zIndex: 55000, }}

            />
          </div> }

          <div style={{
            width: "100%", height: "100%", color: styles.colors.color3 + "e9",
            fontWeight: "600", fontSize: styles.fonts.fontSubheader1, marginBottom: "11px"
          }}>
            {campaigns[0]?.getJson().title} Log
          </div>

          {/* ADVENTURE LOG */}
          <div style={{
            display: "flex", flexDirection: "column", width: "fit-content",
            justifyContent: "flex-end", height: "100%",
            width: "840px", minHeight: "860px", maxHeight: "860px", border: "8px solid " + styles.colors.color6 + "55",
            backgroundColor: styles.colors.color7 + "44",
            borderRadius: "20px", padding: "2px"
          }}>

            {/* PUT THIS IN A seperate .js vvvvvvvvvvvvv
            */}
            {/* {this.state.showItems && */}
            <div className='scroller2' style={{
              overflowX: "hidden",
              padding: "3px 6px", width: "100%", overflowY: "scroll",
            }}>
              {cleanedItems.length > 0 && cleanedItems.map((item, index) => (

                <div key={index} title={item.getJson().sender === "GM" ? "The GM sent this" : ""} style={{
                  marginBottom: "24px", opacity: getOpacity(index, cleanedItems.length),
                }}>

                
                  <PostMapItem app={app} obj={item} index={item.getJson().date} colors={this.state.colors} />


                </div>
              ))}
              <div ref={this.messagesEndRef} style={{ height: "2px", width: "2px" }}></div>
            </div>
            {/* } */}

            {/* PUT THIS IN A seperate .js ^^^^^^^^^^
             */}

          </div>
          {/* THIS IS THE MESSAGE STUFF */}
          <div
            style={{
              width: "915px", height: "44px", display: "flex", flexDirection: "row", marginTop: "12px", justifyContent: "center"
            }}>

            <div style={{
              background: styles.colors.color1, position: "absolute",
              zIndex: "-255", filter: "blur(55px)", mixBlendMode: "multiply", opacity: "44%",
              width: "915px", height: "100%", top: "0",
            }}></div>

            {userRole === "GM" &&
              (

                <div
                  style={{ marginRight: "11px", flexDirection: "row", display: "flex", height: "35px", marginTop: "4px", color: styles.colors.color9 + "77", fontSize: styles.fonts.fontNormal, fontWeight: "600" }}>

                  <Upload app={app} text={"imageOnly"} img={img}

                    ///TAYLOR, this needs to be sped up, or something, bigger images do not have time to get sent to firebase

                    changePic={async (pic) => {
                      await this.setState({ pic: pic });

                      let colors = colorService.updateColors(pic, (palette) => {
                        this.setState({ colors: palette }, () => {

                          let con = this.state.colors;
                          let list = Object.values(con);
                          this.setState({ colors: list })
                          this.scrollToBottom("smooth");
                        });

                      });
                      // await state.opps.run();
                    }}

                    updateMap={async (obj) => {
                      const pic = obj?.getJson().pic;
                      await this.setState({ completedPic: pic });
                      await colorService.updateColors(pic, palette => {
                        this.setState({ colors: palette }, () => {

                          let con = this.state.colors;
                          let list = Object.values(con);
                          this.setState({ colors: list })
                          this.scrollToBottom("smooth");
                        });
                      });
                    }}
                    prepareOnChange={
                      {
                        name: "post", json: {
                          type: "post", sender: userRole,
                          senderId: state.user.getJson()._id, postType: "image", colors: this.state?.colors,
                          campaignId: toolService.getIdFromURL(true),
                        }
                      }

                    }

                    obj={app.state.currentComponent}

                    update={true} skipUpdate={true}
                    className="indent-on-click" />
                </div>)}


            <div>
              <input
                app={app}
                placeholder={this.state.invalidD === "" ? "Type a message..." : this.state.invalidD}
                value={this.state.textI}
                onKeyDown={this.handleKeyDown}
                onChange={this.handleMessageChange}
                style={{
                  backgroundColor: styles.colors.color1 + "ee",
                  color: styles.colors.colorWhite,
                  borderRadius: "11px",
                  width: "780px",
                  padding: '8px', height: "42px",
                  fontSize: styles.fonts.fontSmall,
                  cursor: "text",
                  resize: 'none'
                }}
              />
            </div>

            <div style={{ cursor: "pointer" }}

              onClick={() => {
                if (this.state.textI !== "") {
                  this.setState({ showItems: false });
                  this.sendText()
                }
                this.scrollToBottom("smooth");

              }}

            >

              <img src={sendArr} style={{ width: "31px", transform: "rotate(90deg)", objectFit: "scale-down", marginTop: "5px", marginLeft: "11px" }}></img>
            </div>

          </div>
          {/* </>)} */}
          <ScrollHelper scroll={this.scrollToBottom} />  
       
      </div >
    )
  }
}


