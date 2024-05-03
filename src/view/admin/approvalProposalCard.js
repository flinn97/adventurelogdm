import React, { Component } from 'react';
import "../../App.css"

import auth from '../../services/auth';
import ParentFormComponent from '../../componentListNPM/componentForms/parentFormComponent';
import Upload from '../upload';
import UploadComponent from './uploadComponent';
import TagCreate from './tagCreator';
import { MapComponent } from '../../mapTech/mapComponentInterface';
import toolService from '../../services/toolService';

/**
 * condensed version of the cards.
 * Works with themes.
 * props
 * theme
 * type
 * app
 * options
 * options can include cardType, cardContent, tabType, 
 */
export default class ApprovalProposalCard extends Component {
  constructor(props) {
    super(props);


  }

  /**
   * 
   * OPTIONS
   */


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
      popup: <Popup app={{ ...app, state: { ...app.state, styles: styles } }} handleClose={this.props.handleClose} options={this.props.options} type={this.props.type} />,
      popupWithTab: <PopupWithTab app={{ ...app, state: { ...app.state, styles: styles } }} handleClose={this.props.handleClose} options={this.props.options} type={this.props.type} />
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
      start: false,
      pic: this.props.app.state.currentApproval.getJson().picURL
    }
  }
  async componentDidMount() {

  }

  render() {
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles = state.styles;


    return (

      <div style={{ height: "100%", width: "98%", margin: "20px", marginTop: "-44px" }} >
        <div style={{ marginTop: "8px", background: " linear-gradient(" + styles.colors.color2 + "44, " + styles.colors.color1 + "00)", padding: "30px", borderRadius: "11px" }}>
          <ParentFormComponent app={app} obj={state.currentApproval} name="title" label="Marketplace Title"
            wrapperStyle={{ margin: "5px", color: styles.colors.colorWhite, display: "flex", flexDirection: "column", marginBottom: "18px", }}
            theme={"adventureLog"} rows={1}
            maxLength={110}
            labelStyle={{ marginBottom: "8px", fontSize: "1.4rem" }}
            inputStyle={{
              width: "58.1rem", padding: "4px 9px", color: styles.colors.colorBlack, height: "1.7rem", rows: "1", marginLeft: "20px",
              borderRadius: "4px", background: styles.colors.colorWhite + "9c", borderWidth: "0px",
            }}
            placeholder={"Title"}
          />
          <div style={{ marginTop: "18px", margin: "5px", color: styles.colors.colorWhite, display: "flex", flexDirection: "column", fontSize: "1.4rem" }}>Long Description</div>
          <ParentFormComponent app={app} obj={state.currentApproval} name="description" label="title" type="quill" connectLore={false}
            wrapperStyle={{ margin: "5px", color: styles.colors.colorWhite, display: "flex", flexDirection: "column", marginBottom: "28px", marginLeft: "20px" }} />



          <div style={{ marginTop: "18px", margin: "5px", color: styles.colors.colorWhite, display: "flex", flexDirection: "column", fontSize: "1.4rem" }}>Short Promotional Description</div>
          <ParentFormComponent app={app} obj={state.currentApproval} name="promotional" label="title" type="quill" connectLore={false}
            wrapperStyle={{ margin: "5px", color: styles.colors.colorWhite, display: "flex", flexDirection: "column", marginBottom: "18px", marginLeft: "20px" }} />


        <div style={{ marginTop: "18px", margin: "5px", color: styles.colors.colorWhite, display: "flex", flexDirection: "column", fontSize: "1.4rem" }}>Type</div>
        <ParentFormComponent app={app} obj={state.currentApproval} name="mptype"
          wrapperStyle={{ margin: "5px", color: styles.colors.colorWhite, display: "flex", flexDirection: "column", marginBottom: "28px" }}
          theme={"adventureLog"} rows={1}
          maxLength={110}
          labelStyle={{ marginBottom: "8px", fontSize: "1.4rem" }}
          inputStyle={{
            width: "18.1rem", padding: "4px 9px", color: styles.colors.colorBlack, height: "1.7rem", rows: "1",
            borderRadius: "4px", background: styles.colors.colorWhite + "9c", borderWidth: "0px", marginLeft: "20px",
          }}
          type="select"
          textOptions={["Campaign", "Image", "Lore", "Encounter", "Map"]}
          selectOptions={["mpCampaign", "mpImage", "mpLore", "mpEncounter", "mpMap"]} />
</div>


        <div style={{ marginTop: "0px", background: " linear-gradient(" + styles.colors.color2 + "44, " + styles.colors.color1 + "00)", padding: "30px", borderRadius: "11px" }}>
          <div style={{ color: styles.colors.colorWhite, fontSize: "1.4rem", marginLeft: "5px", marginBottom: "8px" }}>Marketplace Banner</div>
          <img src={this.state.pic} style={{
            marginLeft: "20px", objectFit: "cover", width: "440px", borderRadius: "9px",
            maxHeight: "200px",
            minHeight: "200px",
          }} />
          <div style={{ marginLeft: "20px", marginBottom: "28px", marginTop: "22px" }}>
            <Upload
              //ADD THIS TO ALL UPLOADS//
              changePic={(pic) => { this.setState({ pic: pic }) }}
              obj={app.state.currentApproval} text="Upload Banner" style={{
                display: "flex",
                zIndex: "1", borderRadius: ".1vmin", background: "",
              }}
              update={true}
              app={app} />
          </div></div>



        <UploadComponent app={app} obj={state.currentApproval} />
        {/* TAYLOR */}
        {/* THIS SEEMS TO upload the media multiple times? */}

        <div style={{ marginTop: "8px", background: " linear-gradient(" + styles.colors.color2 + "44, " + styles.colors.color1 + "00)", padding: "30px", borderRadius: "11px" }}>
          <div style={{ marginTop: "8px", background: " linear-gradient(" + styles.colors.color2 + "44, " + styles.colors.color1 + "00)", padding: "30px", borderRadius: "11px", paddingLeft: "0px" }}>
            <ParentFormComponent app={app} obj={state.currentApproval} name="price" label="Price" type="price"
              wrapperStyle={{
                margin: "5px", color: styles.colors.colorWhite, display: "flex",
                flexDirection: "column", marginBottom: "2px",
              }}
              theme={"adventureLog"} rows={1}
              placeholder={"USD"}
              maxLength={110}
              unitStyle={{ marginLeft: "17px", opacity: "30%", marginRight: "5px" }}
              labelStyle={{ marginBottom: "8px", fontSize: "1.4rem" }}
              inputStyle={{
                width: "18.1rem", padding: "4px 9px", color: styles.colors.colorBlack, height: "1.7rem", rows: "1",
                borderRadius: "4px", background: styles.colors.colorWhite + "9c", borderWidth: "0px",
              }} />
            <div style={{ color: styles.colors.color8 + "88", fontSize: "1.1rem", margin: "5px" }}>0.00 is a free listing</div>
          </div>



          <div style={{ marginTop: "18px", margin: "5px", color: styles.colors.colorWhite, display: "flex", flexDirection: "column", fontSize: "1.4rem" }}>Tags</div>
          <TagCreate app={app} obj={state.currentApproval} />



          <div style={{ marginTop: "18px", margin: "5px", color: styles.colors.colorWhite, display: "flex", flexDirection: "column", fontSize: "1.4rem" }}>System</div>
          <ParentFormComponent app={app} obj={state.currentApproval} name="gameSystem" type="select"
            wrapperStyle={{ margin: "5px", color: styles.colors.colorWhite, display: "flex", flexDirection: "column", marginBottom: "28px" }}
            theme={"adventureLog"} rows={1}
            maxLength={110}
            labelStyle={{ marginBottom: "8px", }}
            inputStyle={{
              width: "18.1rem", padding: "4px 9px", color: styles.colors.colorBlack, height: "1.7rem", rows: "1",
              borderRadius: "4px", background: styles.colors.colorWhite + "9c", borderWidth: "0px", marginLeft: "35px",
            }}

            selectOptions={["", "5e", "pathfinder", "3.5e", "other"]}
            textOptions={["No System", "D&D 5e", "D&D Pathfinder", "D&D 3.5e", "Other"]} /></div>

        <div style={{ ...styles.buttons.buttonAdd, width: "600px", justifySelf: "center", alignSelf: "center", display: "flex", marginTop: "100px", marginLeft: "38px" }} onClick={async () => {
          
          let number = state.currentApproval.getJson().price;
          number = number.replace('.', '');

          await state.currentApproval.setCompState({ readyForDistribution: true, stripePrice:number });
          state.opps.cleanPrepareRun({ update: state.currentApproval });
          this.setState({proposalSent:true})
          
          setTimeout(() => {
            
            dispatch({popupSwitch: "approvalSubmitted",})
          }, 20)
          setTimeout(() => {
            
            toolService.navigateToLink("../")
          }, 3000)
        }}>{this.state.proposalSent?"Proposal Sent":"Send Proposal"}</div>






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
      <div>

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
      //Whole card content
      <div style={{ ...styles[this.props.options?.cardType ? this.props.options?.cardType : "biggestCardBorderless"], }}>
        {/* //Tab content  */}
        <div style={{ ...styles[this.props.options?.tabType ? this.props.options?.tabType : "colorTab1"] }}> <TabContent app={app} /></div>
        {/* //Main card content  */}
        <div style={{ ...styles[this.props.options?.cardContent ? this.props.options.cardContent : "cardContent"] }}>
          <MainContent app={app} />
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
        <div ref={this.wrapperRef} className="popupCard" style={{ zIndex: "1010", ...styles[this.props.options?.cardType ? this.props.options?.cardType : "biggestCard"] }}>
          <div style={ ///EXIT BUTTON
            styles.buttons.closeicon
          } onClick={this.props.handleClose}>x</div>

          <div className='scroller' style={{ ...styles[this.props.options?.cardContent ? this.props.options.cardContent : "cardContent"] }}>
            <MainContent app={app} />
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

          <div style={{ ...styles[this.props.options?.tabType ? this.props.options?.tabType : "colorTab1"] }}> <TabContent app={app} /> <div style={ ///EXIT BUTTON
            styles.buttons.closeicon
          } onClick={this.props.handleClose}>X</div></div>
          <div className='scroller' style={{ ...styles[this.props.options?.cardContent ? this.props.options.cardContent : "cardContent"] }}>
            <MainContent app={app} />
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
