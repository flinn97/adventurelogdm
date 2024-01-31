import React, { Component } from 'react';
import image1 from '../pics/iconTest.png';
import image2 from '../pics/iconCapitol.png';
import image4 from '../pics/iconCave.png';
import image5 from '../pics/iconSkull.png';
import image6 from '../pics/iconTavern.png';
import image7 from '../pics/iconKeep.png';
import image8 from '../pics/iconMask.png';
import image9 from '../pics/iconKnight.png';
import image10 from '../pics/iconSheep.png';
import image11 from '../pics/iconTree.png';
import image12 from '../pics/iconWall.png';
import image13 from '../pics/iconChest.png';
import image14 from '../pics/iconGarg.png';
import image15 from '../pics/iconSword.png';

import image1a from "../pics/iconCrown.png";
import image2a from "../pics/iconHood.png";
import image3a from "../pics/iconAngel.png";
import imageS from "../pics/iconStar.png";
import imageM from "../pics/iconMoon.png";
import iconCh from "../pics/iconChev.png";
import iconR from "../pics/iconRune.png";

import image17x from '../pics/iconXWhite.png';
import image18x from '../pics/iconXRed.png';
import image17y from '../pics/iconCheckWhite.png';
import image18y from '../pics/iconCheckGreen.png';
import image17null from '../pics/iconXnon.png';

import locA from '../pics/loc/A.png';
import locB from '../pics/loc/B.png';
import locC from '../pics/loc/C.png';
import locD from '../pics/loc/D.png';
import locE from '../pics/loc/E.png';
import locF from '../pics/loc/F.png';
import locG from '../pics/loc/G.png';
import locH from '../pics/loc/H.png';
import lockey from '../pics/iconKeyhole.png';
import locSec from '../pics/loc/Secret.png';
import locTrap from '../pics/loc/trap.png';
import locaa from '../pics/loc/a lower.png';
import locbb from '../pics/loc/b_lower.png';
import loccc from '../pics/loc/c_lower.png';

import num0 from '../pics/loc/0n.png';
import num1 from '../pics/loc/1n.png';
import num2 from '../pics/loc/2n.png';
import num3 from '../pics/loc/3n.png';
import num4 from '../pics/loc/4n.png';
import num5 from '../pics/loc/5n.png';
import num6 from '../pics/loc/6n.png';
import num7 from '../pics/loc/7n.png';
import num8 from '../pics/loc/8n.png';
import num9 from '../pics/loc/9n.png';
import num10 from '../pics/loc/10n.png';

import imageQ from '../pics/iconQ.png';
import imageP from '../pics/iconEpoint.png'

import image16 from '../pics/iconAddIcon.png';
import Upload from './upload';
import toolService from '../services/toolService';



export default class IconChange extends Component {
  constructor(props) {
    super(props);
    this.getDegree = this.getDegree.bind(this);
    this.getBrightness = this.getBrightness.bind(this);
    this.state = {
      ind: null,
    }
  }

  getDegree() {
    // Returns a random number between 0 and 360
    return Math.random() * 360;
  }

  getBrightness() {
    // Returns a random number between 80 and 110
    return 80 + Math.random() * 30;
  }



  render() {
    let obj = this.props.obj;
    let app = this.props.app;
    let state = app.state;
    let styles = state.styles;
    let dispatch = app.dispatch;

    let componentList = state.componentList;

    const images = [image16,
      image1, image2, image2a, image5, image6, image7, image8,
      image9, image10, image11, image12, image13, image14, image15, image4, image1a, image3a, imageM, iconCh, iconR, imageS, imageQ, imageP,
      image17null,
      image17x, image18x,
      image17y, image18y, lockey,
      locSec, locTrap,
      locA, locB, locC, locD, locE, locF, locG, locH,
      locaa, locbb, loccc, num0,
      num1, num2, num3, num4, num5, num6, num7, num8, num9, num10,

      "#C1A71Bbb", "#1E90FFbb", "#5F0C0Cae",
      '#3F612D', '#5F4E38', '#DB8A74', '#F45D01', '#82379D',
      "#e4ddee55", "#FF1B1B", "#0D453088", "#ffffff", "#0f141cf3",

      //special
      // v v v
      "#F4F5F8", '#ffdead', "#4F4F6E",];

    const w = "42px";

    let pin = this.props.pin;


    let iconList = componentList.getList("icon", toolService.getIdFromURL(true, 0), "campaignId");


    return (
      <div style={{ width: "100%", minHeight: "200px", maxHeight: "fit-content", marginTop: "90px", }}>

        {/* LIST OF IMAGE OPTION       */}<div style={{ display: "flex", flexDirection: "row", width: "100%" }}>

          <div style={{
            width: "180px", border: "1px solid " + styles.colors.color8, marginRight: "20px", padding: "20px", borderRadius: "22px", height: "fit-content",
            display: "flex", flexDirection: "row", alignContent: "center", justifyContent: "center"
          }}>
            <div style={{ display:"flex", flexDirection:"column", alignContent:"center", alignItems:"center",
              borderRadius: "50%", justifyContent:"center", verticalAlign:"center",
              height: "74px", width: "74px", backgroundColor: pin.getJson().iconImage !== image16 ? pin.getJson().colorOverlay : "", filter: pin.getJson().iconImage !== image16 ? pin.getJson().colorFilter : "",
            }}>
              <img alt='ico' src={pin.getJson().iconImage} style={{
                height: "72px", width: "72px", position: "relative",
                backgroundColor: pin.getJson().iconImage !== image16 ? pin.getJson().colorOverlay : "",
                filter: pin.getJson().iconImage !== image16 ? pin.getJson().colorFilter : "",
                marginRight: pin.getJson().iconImage === image16 ? "42px" : "",
                borderRadius: "50%"
              }} />
            </div></div>
          <div style={{
            justifyContent: "center", borderRadius: "11px", justifyItems: "center", width: "100%", height: "100%",
            marginLeft: "20px", display: 'flex', flexDirection: 'row', flexWrap: 'wrap'
          }}>



            {images.map((imgSrc, index) => (typeof imgSrc === 'string' && !imgSrc.startsWith('#')) && (
              <div
                index={index} key={imgSrc+index.toString()}
                style={{
                  display: "flex", flexDirection: "row", borderRadius: "1px",
                  height: "fit-content", margin: "2px",
                  border: (imgSrc !== image16 && imgSrc.startsWith('#')) ? "1px solid black" : "1px solid " + styles.colors.color1, borderRadius: "50%",

                }}>

                {imgSrc === image16 &&

                  <Upload
                    buttonStyle={{ ...styles.buttons.buttonAdd, padding: "11px 8px" }}
                    className='hover-divInt' text="Upload"
                    app={app} quality={.3}
                    update={true}
                    // changePic={async (pic, path) => {

                    //   await pin.pushIcon(state, pic)
                    //  }}


                    obj={pin}

                  />
                }

                {(typeof imgSrc === 'string' && !imgSrc.startsWith('#')) && imgSrc !== image16 &&
                  <div style={{ cursor: "pointer" }}>


                    <div style={{
                      background: imgSrc === pin.getJson().iconImage ? styles.colors.colorWhite : "", width: "54px", height: "54px", borderRadius: "50%",
                      alignItems: "center", justifyContent: "center",
                      display: "flex", flexDirection: "row"
                    }}>
                      <div style={{
                        background: imgSrc === pin.getJson().iconImage ? styles.colors.colorBlack : "", width: "50px", height: "50px", borderRadius: "50%",
                        alignItems: "center", justifyContent: "center",
                        display: "flex", flexDirection: "row"
                      }}>

                        {imgSrc !== image16 &&
                          <img title={"Upload your own."} alt='ico'
                            style={{
                              height: w, width: w, position: "relative",
                              backgroundColor: imgSrc !== image16 ? pin.getJson().colorOverlay : "",
                              filter: imgSrc !== image16 ? pin.getJson().colorFilter : "",

                              borderRadius: "50%"
                            }}

                            key={index}
                            src={imgSrc}
                            onClick={(item, data) => {

                              if (imgSrc !== image16) {
                                let comp = pin;
                                comp.setCompState({
                                  iconImage: imgSrc
                                });
                                state.opps.cleanPrepareRun({ update: comp });
                              }
                            }} />}
                      </div></div>
                  </div>}



              </div>
            ))}
            <div style={{ width: "100%", display: "flex", flexDirection: "row-reverse", marginTop: "3px", marginBottom: "-4px" }}>
              <a href={'https://game-icons.net'} target='_blank'
                style={{
                  color: styles.colors.color8, alignSelf: "flex-end",
                  justifySelf: "flex-end", width: "fit-content", fontSize: styles.fonts.fontSmallest, textUnderlineOffset: "2px"
                }}>
                game-icons.net</a></div>
            <hr></hr>


            {/* COLOR */}
            {images.map((imgSrc, index) => (typeof imgSrc === 'string' && imgSrc.startsWith('#')) && (
              <div
              key={imgSrc+index.toString()}
                style={{
                  display: "flex", flexDirection: "row", borderRadius: "1px",
                  height: "fit-content", margin: "2px",
                  border: (imgSrc !== image16 && imgSrc.startsWith('#')) ? "1px solid black" : "1px solid " + styles.colors.color1, borderRadius: "50%",

                }}>


                {(typeof imgSrc === 'string' && imgSrc.startsWith('#')) && (
                  <div style={{
                    width: "50px", height: "50px", borderRadius: "50%",
                    background: this.state.ind === index ? styles.colors.colorWhite : "",
                    alignItems: "center", justifyContent: "center",
                    display: "flex", flexDirection: "row"
                  }}>
                    <div style={{
                      background: imgSrc === pin.getJson().colorNew ? styles.colors.colorBlack : "", width: "49px", height: "49px", borderRadius: "50%",
                      alignItems: "center", justifyContent: "center",
                      display: "flex", flexDirection: "row"
                    }}>
                      <div

                        style={{
                          margin: "2px", height: w, width: w, cursor: "pointer", flexDirection: "row", display: "flex",
                          justifyContent: "center", alignContent: "center", textAlign: "center", marginTop: ".5px",

                          backgroundColor: (imgSrc.startsWith('#0f141cf3')) ? "#00000099" : imgSrc, borderRadius: "50%",
                        }}

                        key={index}
                        onClick={(item, data) => {
                          let comp = pin;
                          let colorNew = imgSrc;
                          let filterNew = "";
                          let deg = this.getDegree();
                          let bri = this.getBrightness();
                          this.setState({ ind: index });

                          if (imgSrc == "#5F0C0C88") {
                            colorNew = "#5F0C0C22";

                          }

                          if (imgSrc == "#F4F5F8") {
                            colorNew = styles.colors.color1 + "e2";
                            filterNew = "invert(99%)";
                          }

                          if (imgSrc == "#ffdead") {
                            colorNew = "#6F280B";
                            filterNew = "sepia(100%)";
                          }

                          if (imgSrc == "#4F4F6E") {
                            colorNew = "#6C711088";
                            filterNew = "invert(90%)";
                          }

                          if (imgSrc == "#FF1B1B") {
                            colorNew = "#FF1B1Be0";

                          }

                          comp.setCompState({
                            colorOverlay: colorNew,
                            colorFilter: filterNew
                          });
                          state.opps.cleanPrepareRun({ update: comp });
                        }}>
                        {imgSrc === "#F4F5F8" &&
                          <div style={{
                            color: styles.colors.color8, fontWeight: "800",
                            fontSize: '.61rem', marginTop: "10px"
                          }}>invert</div>}

                        {imgSrc === "#ffdead" &&
                          <div style={{
                            color: styles.colors.color6, fontWeight: "800",
                            fontSize: '.65rem', marginTop: "10px"
                          }}>sepia</div>}

                        {imgSrc === "#4F4F6E" &&
                          <div style={{
                            color: styles.colors.colorWhite, fontWeight: "800",
                            fontSize: '.65rem', marginTop: "10px"
                          }}>ghost</div>}


                      </div>
                    </div></div>)
                }

              </div>
            ))}

          </div></div>
        <hr></hr>
        <div style={{ color: styles.colors.color8, fontSize: styles.fonts.fontSmall }}>Recent Icons:</div>
        <div
          style={{
            justifyContent: "center", borderRadius: "11px",
            marginLeft: "20px", display: 'flex', flexDirection: 'row', flexWrap: 'wrap'
          }}>

          {iconList.map((ico, index) => (
            <div
            key={ico.getJson()._id}
              style={{
                display: "flex", flexDirection: "row", borderRadius: "1px",
                height: "fit-content", margin: "2px",
                border: styles.colors.color1, borderRadius: "50%",

              }}>
              <div style={{ cursor: "pointer" }}>

                <div style={{
                  background: ico.getJson().picURL === pin.getJson().iconImage ? styles.colors.colorWhite : "", width: "58px", height: "58px", borderRadius: "50%",
                  alignItems: "center", justifyContent: "center",
                  display: "flex", flexDirection: "row"
                }}>
                  <div style={{
                    background: ico.getJson().picURL === pin.getJson().iconImage ? styles.colors.colorBlack : "", width: "54px", height: "54px", borderRadius: "50%",
                    alignItems: "center", justifyContent: "center",
                    display: "flex", flexDirection: "row"
                  }}>


                    <img alt='ico'
                      style={{
                        maxHeight: "50px", maxWidth: "50px", position: "relative", width: "50px", height: "50px",
                        backgroundColor: pin.getJson().colorOverlay,
                        filter: pin.getJson().colorFilter,

                        borderRadius: "50%"
                      }}

                      key={index}
                      src={ico.getJson().picURL}
                      onClick={(item, data) => {

                        if (ico.getJson().picURL) {
                          let comp = pin;
                          comp.setCompState({
                            iconImage: ico.getJson().picURL
                          });
                          state.opps.cleanPrepareRun({ update: comp });
                        }
                      }} />
                  </div></div>
              </div>

            </div>
          ))}
        </div>

      </div >

    )
  }
}

