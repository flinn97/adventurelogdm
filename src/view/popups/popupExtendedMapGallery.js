import React, { Component } from 'react';
import "../../App.css"
import arr from '../../pics/backArrow.webp'
import MapUploader from '../uploadMap';
import colorService from '../../services/colorService';
import { MapComponent } from '../../mapTech/mapComponentInterface';
import auth from '../../services/auth';
import ListLibraryCampaigns from './listLibraryCampaigns';

export default class PopupExtendedMapSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refrence: false,

    }
  }



  render() {
    let app = { ...this.props.app };
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles = state.styles;


    if (this.props.theme) {
      if (Object.prototype.toString.call(this.props.theme) === "[object String]") {
        styles = state.themeFactory.getThemeFactory()[this.props.theme];
      }
      else {
        styles = this.props.theme;
      }
    }
    app.state.styles = styles

    //********CARD ASSIGN********/

    let cards = {

      card: <Card app={{ ...app, state: { ...app.state, styles: styles } }} options={this.props.options} type={this.props.type} />,
      cardWithTab: <CardWithTab app={{ ...app, state: { ...app.state, styles: styles } }} options={this.props.options} type={this.props.type} />,
      popup: <Popup app={{ ...app, state: { ...app.state, styles: styles } }} handleClose={this.props.handleClose} options={this.props.options} type={this.props.type} delClick={this.props.delClick} />,
      popupWithTab: <PopupWithTab app={{ ...app, state: { ...app.state, styles: styles } }} handleClose={this.props.handleClose} options={this.props.options} type={this.props.type} delClick={this.props.delClick} />
      //popupType={this.props.popupType} popupTab={this.props.popupTab}

    }

    //*********CARD ASSIGN********/

    return (
      <div >

        {cards[this.props.type ? this.props.type : "card"]}
      </div>

    )
  }
}



//********CONTENTS********/
class MainContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: [],
      imagesToShow: 15,
      appear: true,
    };
  }


  async createMapFromObj(obj) {

    let app = this.props.app;
    let state = app.state;
    let dispatch = app.dispatch;
    let lore = state.currentLore;
    let map = { picURL: obj.getJson().picURL, loreId: lore.getJson()._id, campaignId: state.currentCampaign.getJson()._id, type: 'map' };
    await state.opps.cleanJsonPrepare({ addmap: map });
    map = await state.opps.getUpdater("add")[0];
    await state.opps.run();
    await dispatch({ viewMap: map, popupSwitch: "" });


  }



  async componentDidMount() {
    let state = this.props.app.state;
    this.setState({ selectedCampaign: state.selectedCampaign })
  }

  filterItemsBySelectedCampaigns = (item) => {
    let state = this.props.app.state
    let selectedIds = state.selectedCampaign ? state.selectedCampaign.split('_').filter(Boolean) : [];
    console.log(selectedIds)
    return selectedIds.includes(item.getJson().campaignId);
    
  };

  render() {
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles = state.styles;

    let iL = componentList.getList("image");
    
    let mL = componentList.getList("map");
    
    let imageList = [... mL, ... iL];
    
    let list = [];
    let filteredImgList = []
    let campaignIdList = new Set();  // Using a Set to avoid duplicates

    // Assuming `selectedCampaign` is like "_1234_5678_9012_"
    let selectedIds = state.selectedCampaign ? state.selectedCampaign.split('_').filter(Boolean) : [];
    

    for (let image of imageList) {
      if (!list.includes(image.getJson().picURL) && !list.includes(image.getJson().isDuplicate)) {

        list.push(image.getJson().picURL);
        filteredImgList.push(image);
        if (image.getJson().campaignId) {
          campaignIdList.add(image.getJson().campaignId); // Collect campaign IDs
        }
      }
      ///PREVENTS FROM SEEING DUPs
    }
    if (selectedIds.length > 0) {
      imageList = filteredImgList.filter(image =>
        selectedIds.includes(image.getJson().campaignId)
      );
    } else { imageList = filteredImgList }
    

    let allCampaigns = componentList.getList("campaign");
    let filteredCampaigns = allCampaigns.filter(campaign =>
      campaignIdList.has(campaign.getJson()._id));


    return (
      <div className='scroller2' style={{
        display: "flex", width: "100%", flexDirection: "column", height: "100%", alignContent: "center",
        justifyContent: "space-between",
        paddingTop: "35px", fontFamily: "serif", fontSize: styles.fonts.fontSubheader1,
      }}>
        <div style={{
          display: "flex", flexDirection: "row", position: 'relative',
         maxWidth: "100%",
        }}>
          {/* THIS ISN't WORKING? */}

          <MapUploader
            //TAYLOR //
            //Why is this not working//
            changePic={async (pic, path) => {

              let lore = state.currentLore;
              let map = { picURL: pic, loreId: lore.getJson()._id, campaignId: state.currentCampaign.getJson()._id, type: 'map' };
              await state.opps.cleanJsonPrepare({ addmap: map });
              map = await state.opps.getUpdater("add")[0];
              await map.getPicSrc(path);
              await state.opps.run();

              let colors = colorService.updateColors(pic, (palette) => {
                this.setState({ colors: palette }, async () => {
                  let con = this.state.colors;
                  let list = Object.values(con);
                  await this.setState({ colors: list });

                  // Update lore colors
                  let allColors = await lore.getJson().colors || [];  // Initialize to empty array if undefined
                  let newAllColors = allColors.concat(list);
                  await lore.setCompState({ colors: newAllColors });
                  await state.opp.cleanPrepareRun({ update: lore });


                });
              });


              await dispatch({ viewMap: map, popupSwitch: "" });
              this.setState({ map: map, currentMap: map });

            }}
            title="Large maps will take some time to load."
            text="Upload a Map" style={{
              display: "flex", marginBottom: "20px",
              zIndex: "1", background: "", cursor: "pointer"
            }}
            update={true} skipUpdate={true}
            app={app} />

          
          {/* <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-end", width: "fit-content", height: "fit-content" }}>
            <div style={{ color: styles.colors.color8, marginTop: "0px", fontSize: ".65rem", }}>or</div>
            <div style={{ color: styles.colors.colorWhite, marginTop: "0px", marginLeft: "8px", fontSize: ".82rem" }}>Choose from Library:</div>
          </div> */}
        


        <div className='hover-btn' style={{
            ...styles.buttons.buttonAdd, fontSize: styles.fonts.fontSmall, marginBottom: "12px", cursor: "pointer", zIndex: 200,
            marginTop:"", alignSelf: "center", padding: "11px", color: styles.colors.color9, alignSelf:"start", justifySelf:"flex-start",
            pointerEvents: this.state.appear ? "all" : "none", mixBlendMode: this.state.appear ? "normal" : "luminosity"
          }} onClick={async () => {
            this.setState({ appear: false })
            let images = await auth.getAllofTypeByUser(state.componentList, state.user.getJson()._id, "image");
            let maps = await auth.getAllofTypeByUser(state.componentList, state.user.getJson()._id, "map")
            dispatch({});


          }}>Import Library</div></div>




        <div style={{ height: "fit-content",  justifyContent: "center" }}>

          

          <div style={{
            display: "flex",
            flexDirection: "column", color: styles.colors.color3,
            position: "sticky", width: "99%",
            top: -35, border: this.state.showCamps ? "1px solid " + styles.colors.color8 + "55" : "1px solid " + styles.colors.color8 + "00", padding: "5px",
            zIndex: "100", borderRadius: "12px", transition: "border .5s ease-in-out",
            background: styles.colors.color1,
          }}>
            <div className="hover-btn"
              onClick={() => {
                this.setState({ showCamps: !this.state.showCamps })
              }}
              style={{
                width: "fit-content", textUnderlineOffset: "3px", cursor: "pointer", padding: "3px 8px", marginBottom: "11px",
                textDecoration: "underline .5px", textDecorationColor: styles.colors.color7, background: styles.colors.color1
              }}>
              Sort by Source
              <img src={arr} alt=">" style={{
                width: "12px", marginLeft: "11px", transform: this.state.showCamps ? "rotate(270deg)" : "rotate(180deg)",
                transition: "transform 0.3s ease-out"
              }}></img>
            </div>
            <div style={{
              overflow: 'hidden', opacity: this.state.showCamps ? '1' : '0.2',
              transition: 'max-height 0.5s ease-in-out, opacity 0.6s ease-in-out',
              maxHeight: this.state.showCamps ? '80vh' : '0',
              // height: this.state.showCamps ? "500px":"0"
            }}>
              <ListLibraryCampaigns app={app} campaignsList={filteredCampaigns} />
            </div>


          </div>


          <div style={{ flexDirection:"column", display:"flex",color: styles.colors.color3, marginTop: "-8px",paddingLeft:"100px",
           width:"fit-content", }}>
          <hr></hr>
            Add a Map:
            <MapComponent theme="defaultRowWrap" class='image-grid' app={app} 
            filters={selectedIds.length > 0?[this.filterItemsBySelectedCampaigns]:[]}
              cells={[{ type: "img", class: "Image-Item", func: (obj) => { this.createMapFromObj(obj) } }]} name="map" />


            <hr></hr>
            Add an Image as a Map:


            <MapComponent theme="defaultRowWrap" app={app}  filters={selectedIds.length > 0?[this.filterItemsBySelectedCampaigns]:[]}
              cells={[{ type: "img", class: "Image-Item", func: (obj) => { this.createMapFromObj(obj) } }]} name="image" />
          </div>
        </div>
      </div>
    )



  }
}

class TabContent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles = state.styles;

    return (
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>

        <div style={{ ...styles.buttons.buttonClose }}
          onClick={this.props.handleClose}
        >
          X
        </div>
      </div>
    )
  }
}

/**Popups */
class Popup extends Component {
  constructor(props) {
    super(props);
    this.wrapperRef = React.createRef();
    this.setWrapperRef = this.setWrapperRef;
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      this.props.handleClose();
    }
  }

  render() {
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles = state.styles;

    return (
      <div className="popup-box" style={{ zIndex: "1010" }}>
        <div ref={this.wrapperRef} className="popupCard"
          style={{ zIndex: "1010", ...styles[this.props.options?.cardType ? this.props.options?.cardType : "biggestCard"] }}>



          <div style={{ ...styles.buttons.buttonClose, position: "absolute", right: 32 }}
            onClick={this.props.handleClose}>X</div>

          <div style={{ ...styles[this.props.options?.cardContent ? this.props.options.cardContent : "cardContent"] }}>
            <MainContent app={app} delClick={this.props.delClick} />
          </div>


        </div>



      </div>
    )
  }
}
class PopupWithTab extends Component {
  constructor(props) {
    super(props);
    this.wrapperRef = React.createRef();
    this.setWrapperRef = this.setWrapperRef;
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      this.props.handleClose();
    }
  }
  render() {
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles = state.styles;

    return (
      <div className="popup-box" style={{ zIndex: "1010" }}>
        <div ref={this.wrapperRef} className="popupCard" style={{ zIndex: "1010", ...styles[this.props.options?.cardType ? this.props.options?.cardType : "biggestCard"] }}>

          <div style={{ ...styles[this.props.options?.tabType ? this.props.options?.tabType : "colorTab1"] }}>

            <TabContent app={app} handleClose={this.props.handleClose} delClick={this.props.delClick} /> <div style={ ///EXIT BUTTON
              styles.buttons.closeicon
            } onClick={this.props.handleClose}>x</div></div>
          <div style={{ ...styles[this.props.options?.cardContent ? this.props.options.cardContent : "cardContent"] }}>
            <MainContent app={app} handleClose={this.props.handleClose} delClick={this.props.delClick} />
          </div>
        </div>




      </div>
    )
  }
}





//********CARDs********/
class Card extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles = state.styles;

    return (
      <div style={{ ...styles[this.props.options?.cardType ? this.props.options?.cardType : "biggestCard"] }}>
        <div style={{ ...styles[this.props.options?.cardContent ? this.props.options.cardContent : "cardContent"] }}>
          <MainContent app={app} />
        </div>
      </div>
    )
  }
}

class CardWithTab extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles = state.styles;

    return (
      <div style={{ ...styles[this.props.type ? this.props.type : "biggestCard"] }}>
        <div style={{ ...styles[this.props.options?.tabType ? this.props.options?.tabType : "colorTab1"] }}> <TabContent app={app} /></div>
        <div style={{ ...styles[this.props.options?.cardContent ? this.props.options.cardContent : "cardContent"] }} >
          <MainContent app={app} />
        </div>
      </div>
    )
  }
}
