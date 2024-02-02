import React, { Component } from 'react';
import "../../App.css"
import DelButton from '../../componentListNPM/componentForms/buttons/deleteButton';
import ParentFormComponent from '../../componentListNPM/componentForms/parentFormComponent';
import RunButton from '../../componentListNPM/componentForms/buttons/runButton';
import randomTextService from '../../services/randomTextService';
import TokenImage from '../tokenImage';
import Upload from '../upload';
import colorService from '../../services/colorService';
import idService from '../../componentListNPM/idService';
import conditionService from '../../services/conditionService';



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
export default class AddPlayerCharacter extends Component {
  constructor(props) {
    super(props);
    

  }

  /**
   * 
   * OPTIONS
   */


  render() {
    let app = {...this.props.app};
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles =state.styles;
    
    
    if(this.props.theme){
      if(Object.prototype.toString.call(this.props.theme) === "[object String]"){
        styles = state.themeFactory.getThemeFactory()[this.props.theme];
      }
      else{
        styles= this.props.theme;
      }
    }
    app.state.styles=styles
    




    //********CARD ASSIGN********/

    let cards={

      card: <Card app={{...app, state:{...app.state, styles:styles} }} options={this.props.options} type={this.props.type}/>,
      cardWithTab: <CardWithTab app={{...app, state:{...app.state, styles:styles}}} options={this.props.options} type={this.props.type}/>,
      popup: <Popup app={{...app, state:{...app.state, styles:styles} }} handleClose={this.props.handleClose}  options={this.props.options} type={this.props.type} delClick={this.props.delClick}/>,
      popupWithTab: <PopupWithTab app={{...app, state:{...app.state, styles:styles}}} handleClose={this.props.handleClose} options={this.props.options} type={this.props.type}  delClick={this.props.delClick}/>
//popupType={this.props.popupType} popupTab={this.props.popupTab}
    
    }
    
    //*********CARD ASSIGN********/





    return (
      <div >
        
        {cards[this.props.type? this.props.type: "card"]}
        </div>

    )
  }
}



//********CONTENTS********/
class MainContent extends Component{
  constructor(props) {
    super(props);
    this.state = {
     colors:{}
    }
  }
  render(){
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles =state.styles;
    let obj = state.currentComponent;
    let phone = window.innerWidth < 800;
    let { colors } = this.state;
    let placeholderName = randomTextService.pickCharacterName();

    return(
      <div style={{
        display:"flex", width:"100%", flexDirection:"column", justifyContent:phone?"":"center",
        minHeight:"fit-content", maxHeight:"825px", minWidth: phone?"":"855px", maxWidth:"100%",
        alignContent:"center", alignItems:"center", height:"100%",
        paddingTop:phone?"31px":"31px", fontFamily:"serif", fontSize:phone?"2rem":styles.fonts.fontSubheader1, color:styles.colors.color3}}>
New Character:


           {/* FORMS */}
           <div style={{ display: "flex", width:phone?"":"45%", height:phone?"150px":"",
           flexDirection:phone?"column":"row", alignItems:"center", justifyContent:phone?"space-between":"" }}>

    <TokenImage pic={this.state.pic} app={app} width={110} colors={colors}/>

              <Upload
            text={"Choose an image"}
            update={true}
            obj={app.state.currentComponent}
            skipUpdate={true}
            colors={this.state.colors}
            changePic={async (pic) => {
              await this.setState({ pic: pic });
              
              let colors = colorService.updateColors(pic, (palette) => {
                this.setState({ colors: palette }, () => {
                                 
                    let con = palette;
                    app.state.currentComponent.setCompState({colors: con})
                    this.setState({colors: con})
                    

                });
                
              });
            }}
            
            updateMap={async (obj) => {
              const pic = obj?.getJson().pic;
              await this.setState({ completedPic: pic });
              await colorService.updateColors(pic, palette => {
                this.setState({ colors: palette }, () => {

                    let con = palette;
                    app.state.currentComponent.setCompState({colors: con})
                    this.setState({colors: con})
                    
            obj.setCompState({color:con, colors: con});
            
                    

                });
              });
            }}
            app={app}
          />
       
</div>
    <div style={{width:"100%", justifyContent:'center', alignContent:"center",justifyItems:"center", marginTop:"25px", marginBottom:"25px"}}> 

   
  
    <ParentFormComponent app={app} name="name" obj={obj}
              placeholder={"ie: "+placeholderName}
              label={"Name Your Character"}
              labelStyle={{color:styles.colors.color9,fontSize: phone?"1.2rem":styles.fonts.fontNormal, }}
              inputStyle={{ width:"100%", padding:"4px 9px", color:styles.colors.colorWhite, marginTop:"8px",
              color:styles.colors.colorBlack, height:"1.7rem", rows:"1", fontSize: phone?"1.2rem":styles.fonts.fontNormal,
              borderRadius:"4px",background:styles.colors.colorWhite+"9c", borderWidth:"0px",}}/>

              <div style={{display:"flex", flexDirection:"row", width:phone?"102%":"100%",  
              justifyContent:phone?"flex-start":"space-around", marginTop:"25px", marginBottom:"25px", }}>

                  <ParentFormComponent app={app}  obj={obj}
                  name="initiative" label="Initiative Bonus" wrapperStyle={{margin: "5px", color:styles.colors.colorWhite, display:"flex",flexDirection:"column"}}
                          theme={"adventureLog"} rows={1}
                          maxLength={2}
                          labelStyle={{color:styles.colors.color9, marginBottom:"8px", fontSize: phone?"1rem":styles.fonts.fontNormal,}}
                          inputStyle={{width:"7.1rem", padding:"4px 9px", color:styles.colors.colorBlack, height:"1.7rem", rows:"1",
                          borderRadius:"4px",background:styles.colors.colorWhite+"9c", borderWidth:"0px",fontSize: phone?"1.2rem":styles.fonts.fontNormal,
                          }}
                          placeholder={"ie: 3"}
                          />

                  <ParentFormComponent app={app} name="ac" label="Armor Class" obj={obj}
                  wrapperStyle={{margin: "5px", color:styles.colors.colorWhite, display:"flex",flexDirection:"column"}}
                          theme={"adventureLog"} rows={1}
                          maxLength={2}
                          labelStyle={{color:styles.colors.color9, marginBottom:"8px", fontSize: phone?"1rem":styles.fonts.fontNormal,}}
                          inputStyle={{width:"7.1rem", padding:"4px 9px", color:styles.colors.colorBlack, height:"1.7rem", rows:"1",
                          borderRadius:"4px",background:styles.colors.colorWhite+"9c", borderWidth:"0px",fontSize: phone?"1.2rem":styles.fonts.fontNormal,
                          }}
                          placeholder={"ie: 13"}
                          />

                  <ParentFormComponent app={app} name="hp" label="Max HP" obj={obj}
                        wrapperStyle={{margin: "5px", color:styles.colors.colorWhite, display:"flex", flexDirection:"column"}}
                                theme={"adventureLog"} rows={1}
                                maxLength={5}
                                labelStyle={{color:styles.colors.color9, marginBottom:"8px",fontSize: phone?"1rem":styles.fonts.fontNormal,}}
                                inputStyle={{width:"7.1rem", padding:"4px 9px", color:styles.colors.colorBlack, height:"1.7rem", rows:"1",
                                borderRadius:"4px",background:styles.colors.colorWhite+"9c", borderWidth:"0px",fontSize: phone?"1.2rem":styles.fonts.fontNormal,
                                }}
                                placeholder={"ie: 44"}
                                /> 
              </div>

              <ParentFormComponent app={app} name="statBlockLink" obj={obj}
              placeholder={"optional"}
              label={"Link to Character Sheet"}
              labelStyle={{color:styles.colors.color9, fontSize: phone?"1.2rem":styles.fonts.fontNormal,}}
              inputStyle={{ width:"100%", padding:"4px 9px", color:styles.colors.colorWhite, marginTop:"8px",
              color:styles.colors.colorBlack, height:"1.7rem", rows:"1", fontSize: phone?"1.2rem":styles.fonts.fontNormal,
              borderRadius:"4px",background:styles.colors.colorWhite+"9c", borderWidth:"0px",}}/>
              
     </div>
      <div style={{ display:"flex", flexDirection: "column", width:"100%", alignItems:"center", marginTop:"7%", alignSelf:"flex-end"}}>
          <RunButton className="hover-btn" app={app} text="Create" 
          callBack={ async (arr) => {
            
            
            let conditions = conditionService.getConditions();
            let id = await arr[0].getJson()?._id;

            for(let condition of conditions)
            {
              condition.monsterId = id;
              condition.roundsActive = "0";
              condition._id = arr[0].getJson()?._id+idService.createId()
              await state.opps.jsonPrepare({addcondition: condition});
            }
            
            await state.opps.run();
            await dispatch({
              popUpSwitchcase: "",
              currentComponent: undefined,
            });
          }}/></div>
    </div>
    )
  }
}

class TabContent extends Component{
  constructor(props) {
    super(props);
  }
  render(){
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles =state.styles;

    return(
    <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
      <div style={{...styles.buttons.buttonClose}}
      onClick={this.props.handleClose}
      >
        X
      </div>
    </div>
    )
  }
}

/**Popups */
class Popup extends Component{
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
  
  render(){
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles =state.styles;
    
    return(
      <div className="popup-box" style={{ zIndex: "1010" }}>
      <div ref={this.wrapperRef}  className="popupCard" 
      style={{ zIndex: "1010", ...styles[this.props.options?.cardType? this.props.options?.cardType:"biggestCard"] }}>
      <div style={{...styles.buttons.buttonClose, position:"absolute", right:"1vw"}}
      onClick={this.props.handleClose}>X</div>
          
          <div className='scroller' style={{...styles[this.props.options?.cardContent? this.props.options.cardContent: "cardContent"]}}>
        <MainContent app={app}  delClick={this.props.delClick} />
        </div>
          
      
      </div>



      </div>
    )
  }
}
class PopupWithTab extends Component{
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
  render(){
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles =state.styles;
    
    return(
      <div  className="popup-box" style={{ zIndex: "1010" }}>
      <div ref={this.wrapperRef}  className="popupCard" style={{ zIndex: "1010", ...styles[this.props.options?.cardType? this.props.options?.cardType:"biggestCard"]  }}>
      
      <div style={{...styles[this.props.options?.tabType?this.props.options?.tabType: "colorTab1"]}}> 
        <TabContent app={app} handleClose={this.props.handleClose}  delClick={this.props.delClick}/> <div style={ ///EXIT BUTTON
                      styles.buttons.closeicon
                  } onClick={this.props.handleClose}>x</div></div>   
      <div className='scroller' style={{...styles[this.props.options?.cardContent? this.props.options.cardContent: "cardContent"]}}>
        <MainContent app={app} handleClose={this.props.handleClose}  delClick={this.props.delClick}/>
        </div>
        </div>
        



      </div>
    )
  }
}
  




//********CARDs********/
class Card extends Component{
  constructor(props) {
    super(props);
  }
  render(){
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles =state.styles;

    return(
      <div className='scroller'  style={{ ...styles[this.props.options?.cardType?this.props.options?.cardType:"biggestCard"] }}>   
            <div style={{...styles[this.props.options?.cardContent? this.props.options.cardContent: "cardContent"]}}>
              <MainContent app={app} />
            </div>
      </div>
    )
  }
}

class CardWithTab extends Component{
  constructor(props) {
    super(props);
  }
  render(){
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles =state.styles;

    return(
      <div  style={{...styles[this.props.type?this.props.type:"biggestCard"] }}>   
      <div style={{...styles[this.props.options?.tabType?this.props.options?.tabType: "colorTab1"]}}> <TabContent app={app} /></div>   
      <div style={{...styles[this.props.options?.cardContent? this.props.options.cardContent: "cardContent"]}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
