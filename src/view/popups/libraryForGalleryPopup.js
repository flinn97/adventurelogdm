import React, { Component } from 'react';
import "../../App.css"
import auth from '../../services/auth';
import ListLibraryCampaigns from './listLibraryCampaigns';
import arr from '../../pics/backArrow.webp'


export default class LibraryForGalleryPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refrence: true,
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
      appear: true,
      showCamps: false,
    };
  }

  async componentDidMount() {
    let state = this.props.app.state;
    this.setState({selectedCampaign:""})
  }

  render() {
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles = state.styles;

    let imageList = componentList.getList("image")
    let list = [];
    let filteredImgList = []
    let campaignIdList = new Set();  // Using a Set to avoid duplicates

    // Assuming `selectedCampaign` is like "_1234_5678_9012_"
    let selectedIds = state.selectedCampaign?state.selectedCampaign.split('_').filter(Boolean):""; 

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
    if (selectedIds.length>0) {
      imageList = filteredImgList.filter(image =>
        selectedIds.includes(image.getJson().campaignId)
      );
    } else { imageList = filteredImgList }

    console.log(state.selectedCampaign)

    let allCampaigns = componentList.getList("campaign");
    let filteredCampaigns = allCampaigns.filter(campaign =>
      campaignIdList.has(campaign.getJson()._id));


    return (
      <div style={{
        display: "flex", minWidth: "65vw", flexDirection: "column", height: "fit-content", alignContent: "center",
        userSelect: "none", minHeight: "100vh",
        paddingTop: "20px", fontFamily: "serif", fontSize: styles.fonts.fontSubheader1,
        marginBottom: "11px", color: styles.colors.color3
      }}>


        <div style={{ width: "100%", minHeight: "200px", }}>

          <div className='hover-btn' style={{
            ...styles.buttons.buttonAdd, fontSize: styles.fonts.fontSmall, marginBottom: "2vh",
            pointerEvents: this.state.appear ? "all" : "none", mixBlendMode: this.state.appear ? "normal" : "luminosity",
            marginTop: "1vh", alignSelf: "center", padding: "1%", color: styles.colors.color9
          }} onClick={async () => {
            this.setState({ appear: false })
            let images = await auth.getAllofTypeByUser(state.componentList, state.user.getJson()._id, "image");
            if (images) {
              dispatch({});
            }

          }}>Import Library</div>


          <div style={{
            display: "flex",
            flexDirection: "column",
            position: "sticky", width: "99%",
            top: -9, border: this.state.showCamps ?"1px solid " + styles.colors.color8 + "55":"1px solid " + styles.colors.color8 + "00", padding: "5px",
            zIndex: "100", borderRadius: "12px", transition:"border .5s ease-in-out",
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
               {this.state.showCamps ? "Hide Sources": "Sort by Source"}
              <img src={arr} alt=">" style={{
                width: "12px", marginLeft: "11px", transform: this.state.showCamps ? "rotate(90deg)" : "rotate(180deg)",
                transition: "transform 0.3s ease-out"
              }}></img>
            </div>
            <div style={{
              overflow: 'hidden', opacity:this.state.showCamps ? '1' : '0.2',
              transition: 'max-height 0.5s ease-in-out, opacity 0.6s ease-in-out',
              maxHeight: this.state.showCamps ? '80vh' : '0',
              // height: this.state.showCamps ? "500px":"0"
            }}>
              <ListLibraryCampaigns app={app} campaignsList={filteredCampaigns} />
            </div>
          </div>


          <div className="image-grid" style={{
            display: "flex", justifyContent: "center",
            flexDirection: "row", justifyItems: "space-around", flexWrap: "wrap", marginTop: "55px",
          }}>
            {
              imageList
                .map((img, index) => (

                  <div className="hover-img" key={index}>
                    <img onClick={async () => {

                      let campaignId = state.currentCampaign.getJson()._id;
                      let loreId = undefined;
                      if (state.currentLore) {
                        loreId = state.currentLore.getJson()._id
                      }
                      let newJson = await img.copyComponent(["campaignId", "loreId", "isDuplicate"], [campaignId, loreId, true]);
                      await state.opps.cleanJsonPrepareRun({ addimage: newJson });
                      dispatch({ popupSwitch: "" })

                    }} draggable="false" src={img.getJson().picURL}
                      style={{
                        maxWidth: "180px", minWidth: "100px", height: "fit-content",
                        margin: "9px", cursor: "pointer", borderRadius: "10px"
                      }}
                      alt={`img-${index}`} />
                  </div>

                ))
            }

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
      <div className="popup-box" style={{ zIndex: "1010", }}>
        <div ref={this.wrapperRef} className="popupCard"
          style={{ zIndex: "1010", ...styles[this.props.options?.cardType ? this.props.options?.cardType : "biggestCard"], }}>

          <div style={{
            fontSize: styles.fonts.fontSmall, marginTop: "-12px", marginBottom: "44px", position: "absolute",
            zIndex: "22", padding: "8px", borderRadius: "11px", color: styles.colors.color8,
            background: styles.colors.color1 + "e2"
          }}> Adding Media</div>

          <div style={{ ...styles.buttons.buttonClose, position: "absolute", right: 32 }}
            onClick={this.props.handleClose}>X</div>

          <div className='scroller2' style={{ ...styles[this.props.options?.cardContent ? this.props.options.cardContent : "cardContent"], marginTop: "22px", }}>
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
            <TabContent app={app} handleClose={this.props.handleClose} delClick={this.props.delClick} />

            <div style={ ///EXIT BUTTON
              styles.buttons.closeicon
            } onClick={this.props.handleClose}>x</div></div>
          <div className='scroller' style={{ ...styles[this.props.options?.cardContent ? this.props.options.cardContent : "cardContent"] }}>
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
      <div className='scroller' style={{ ...styles[this.props.options?.cardType ? this.props.options?.cardType : "biggestCard"] }}>
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

        <div style={{ ...styles[this.props.options?.cardContent ? this.props.options.cardContent : "cardContent"] }} className='scroller'>
          <MainContent app={app} />
        </div>
      </div>
    )
  }
}
