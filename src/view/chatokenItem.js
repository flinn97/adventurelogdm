import { Component } from 'react';
import "../App.css";
import LoreLogComponent from './pages/LogComponents/loreLogComponent';
import ImageLogComponent from './pages/LogComponents/imageLogComponent';
import MessageLogComponent from './pages/LogComponents/messageLogComponent';
import RollLogComponent from './pages/LogComponents/rollLogComponent';
import InitiativeLogComponent from './pages/LogComponents/initLogComponent';
import DelButton from '../componentListNPM/componentForms/buttons/deleteButton';
import TokenImage from './tokenImage';
import placeholderGM from '../pics/GM.png';
import trash from '../pics/trash.gif';
import trashStill from '../pics/trashStill.png';



export default class ChatTokenComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      obj: this.props.obj,
      user: "", user2: ""
    }
  }


  render() {
    let app = this.props.app;
    let dispatch = app.dispatch
    let state = app.state;
    let styles = state.styles;
    let char = this.props.char ? this.props.char : this.props.obj;
    let isYou = this.props.isYou;
    let obj = this.props.obj;
    let userRole = obj.getJson().sender;

    let phone = window.innerWidth < 800?true:false;
    let isYourPost = obj.getJson().characterId === char.getJson()._id ? true : false;

    return (

      <div>


        {(state.user.getJson().role === "GM" && !state.currentCharacter) &&
          <div className={phone?'':'hover-container'} style={{ display: "flex", flexDirection: "row", position: "absolute", right:phone?-26 : 0, 
          zIndex: phone?100:8100, top:"", cursor: "pointer", width: "32px" }}>
            <img className={phone?'':'hover-div'} src={phone?trashStill:trash} title='Delete this post'
              onClick={async () => {

                await state.opps.cleanPrepareRun({ del: obj });

              }}
              style={{ width: phone?"21px":"30px", marginLeft: "0px", background: styles.colors.color1 + "99", borderRadius: "50%", opacity:"95%"}} />
          </div>}


        {/* {ALIGN to RIGHT SIDE} */}
        {isYourPost &&
          <div style={{ display: "flex", flexDirection: "row", position: "absolute", right: phone?0:-45, zIndex: phone?100:8100, top: phone?0:-15 }}>
            <div style={{
              display: "flex",

            }}>


              {userRole === "player" && (
                <div style={{}}
                  title={obj?.getJson().name ? obj?.getJson().name + " sent this." : "GM sent this."}
                >
{!phone &&
                  <TokenImage app={app} pic={obj.getJson().userPic} width={32} colors={obj?.getJson().colors} />
  }
{phone &&
                  <div style={{fontSize:styles.fonts.fontSmallest, color:styles.colors.color8}}>
                    {obj?.getJson().name}
                    </div>
  }


                </div>
              )}




            </div>
          </div>}



        {/* {ALIGN to Left SIDE} */}
        {!isYourPost &&
          <div style={{ display: "flex", flexDirection: "row", position: "absolute", left: phone?0:-39, zIndex: 800, top: phone?0:-15 }}>
            <div style={{
              display: "flex",

            }}>

              {userRole === "player" && (
                <div style={{}}
                  title={obj?.getJson().name ? obj?.getJson().name + " sent this." : "GM sent this."}
                >
{!phone && state.currentCharacter &&
                  <TokenImage app={app} pic={obj.getJson().userPic} width={32} colors={obj?.getJson().colors} />
}
{phone &&
                  <div style={{fontSize:styles.fonts.fontSmallest, color:styles.colors.color8}}>
                    {obj?.getJson().name}
                    </div>
  }

                </div>
              ) || (
                  <div style={{}}
                    title={"GM sent this."}
                  >
                    {state.user.getJson().role !== "GM" && !state.currentCharacter &&
                      <img src={placeholderGM} style={{ width: phone?"12px":"32px", marginLeft: phone?"6px":"40px", background: styles.colors.color1 + "99", borderRadius: "50%" }} />
                    }

                  </div>
                )

              }




            </div>
          </div>}

      </div>



    )

  }
}