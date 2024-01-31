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


    let isYourPost = obj.getJson().characterId === char.getJson()._id ? true : false;

    return (

      <div>


        {(state.user.getJson().role === "GM") &&
          <div className='hover-container' style={{ display: "flex", flexDirection: "row", position: "absolute", right: 0, zIndex: 8100, top: -15, cursor: "pointer", width: "32px" }}>
            <img className='hover-div' src={trash} title='Delete this post'
              onClick={async () => {

                await state.opps.cleanPrepareRun({ del: obj });

              }}
              style={{ width: "30px", marginLeft: "0px", background: styles.colors.color1 + "99", borderRadius: "50%", opacity:"95%"}} />
          </div>}


        {/* {ALIGN to RIGHT SIDE} */}
        {isYourPost &&
          <div style={{ display: "flex", flexDirection: "row", position: "absolute", right: -45, zIndex: 8100, top: -15 }}>
            <div style={{
              display: "flex",

            }}>


              {userRole === "player" && (
                <div style={{}}
                  title={obj?.getJson().name ? obj?.getJson().name + " sent this." : "GM sent this."}
                >

                  <TokenImage app={app} pic={obj.getJson().userPic} width={32} colors={obj?.getJson().colors} />




                </div>
              )}




            </div>
          </div>}



        {/* {ALIGN to Left SIDE} */}
        {!isYourPost &&
          <div style={{ display: "flex", flexDirection: "row", position: "absolute", left: -39, zIndex: 800, top: -15 }}>
            <div style={{
              display: "flex",

            }}>

              {userRole === "player" && (
                <div style={{}}
                  title={obj?.getJson().name ? obj?.getJson().name + " sent this." : "GM sent this."}
                >

                  <TokenImage app={app} pic={obj.getJson().userPic} width={32} colors={obj?.getJson().colors} />


                </div>
              ) || (
                  <div style={{}}
                    title={"GM sent this."}
                  >
                    {state.user.getJson().role !== "GM" &&
                      <img src={placeholderGM} style={{ width: "32px", marginLeft: "40px", background: styles.colors.color1 + "99", borderRadius: "50%" }} />
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