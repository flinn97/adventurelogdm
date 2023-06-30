import { Component } from 'react';
import "../App.css"
import RunButton from '../componentListNPM/componentForms/buttons/runButton';
import ParentFormComponent from '../componentListNPM/componentForms/parentFormComponent';
import Upload from './upload';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import placeholder from '../pics/placeholderEncounter.JPG';



export default class AddEncounter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      eid: 10,
    };
  }

async componentDidMount(){
  
  function randomFourDigitNumber() {
    let num = Math.floor(Math.random() * 9000) + 1000;
    while(num < 1000 || num > 9999) {
        num = Math.floor(Math.random() * 9000) + 1000;
    }
    return num;
}

  function getCampaignId() {
  const path = window.location.pathname;
  const parts = path.split('/');
  const id = parts.pop();
  return id;
}

  await this.props.app.dispatch({currentComponent: undefined});
  const currentDate = new Date();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const day = currentDate.getDate().toString().padStart(2, '0');
  const num = randomFourDigitNumber();
  const campId = getCampaignId();
  await this.props.app.dispatch({operate: "addencounter", operation: "cleanJsonPrepare", 
  object: {creationDate: "E"+num+month+day, campaignId: campId, }});
  this.setState({start:true})
}




  render() {

    function getCampaignId() {
      const path = window.location.pathname;
      const parts = path.split('/');
      const id = parts.pop();
      return id;
    }
    
    let campaignId = getCampaignId();
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles =state.styles;
    

    return (
      <div>
        {/* BACK BUTTON */}

        {/* <Link to={"/encountermanager/" + campaignId} style={{...styles.buttons.buttonAdd, 
        textDecoration:"none", fontStyle:"italic", background:styles.colors.color7+"aa",
        fontWeight:"bold", letterSpacing:".05rem", marginBottom:"2vh"}}
        >
          <img style={{width:".9rem", opacity:"98%", marginRight:".75rem"}}
          src={backarrow}
          />
          Encounters
        </Link> */}

      <div style={{...styles.backgroundContent,
      backgroundImage: 'url('+(this.state.pic||placeholder)+')',}}>
        <div style={{...styles.popupSmall, width:"100%"}}>
            <div style={{display: "flex", flexDirection: "row", justifyContent:"space-between", 
          backgroundColor:styles.backgrounds.backgroundColor+"99"}}>

            {this.state.start && app.state.currentComponent&& (<>
         <div style={{display: "flex", flexDirection: "column", width:"100%"}}>
              <Upload app={app}
              //ADD THIS TO ALL UPLOADS//
              changePic={(pic)=>{this.setState({pic:pic})}} 
              obj={app.state.currentComponent} text="Set Backdrop" style={{display:"flex",
              zIndex:"1", borderRadius:".1vmin", background:"",}} 
              update={true} skipUpdate={true}
              updateMap={(obj)=>{this.setState({completedPic: obj.getJson().picURL})}}
              />
              

              <ParentFormComponent app={app} name="name" label="Encounter Name"
              wrapperStyle={{margin: "5px", color:styles.colors.colorWhite, display:"flex",flexDirection:"column"}}
              theme={"adventureLog"} rows={1}
              maxLength={app.state.maxLengthShort}
              labelStyle={{marginBottom:"8px"}}
              inputStyle={{width:"58.1rem", padding:"4px 9px", color:styles.colors.colorBlack, height:"1.7rem", rows:"1",
              borderRadius:"4px",background:styles.colors.colorWhite+"aa", borderWidth:"0px",
              }}
              placeholder={"ie: Bandits of the Nanzobar"}/> 



              <ParentFormComponent app={app} name="description" label="Situation Description"
              wrapperStyle={{margin: "5px", color:styles.colors.colorWhite, display:"flex",flexDirection:"column"}}
              theme={"adventureLog"} rows={1}
              maxLength={210}
              labelStyle={{marginBottom:"8px"}}
              inputStyle={{width:"58.1rem", padding:"4px 9px", color:styles.colors.colorBlack, height:"1.7rem", rows:"1",
              borderRadius:"4px",background:styles.colors.colorWhite+"aa", borderWidth:"0px",
              }}
              placeholder={"ie: The bandits are lying in the vegetation"}/>



              <ParentFormComponent app={app} name="audio" label="Audio Link"
              
              wrapperStyle={{margin: "5px", color:styles.colors.colorWhite, display:"flex",flexDirection:"column"}}
              theme={"adventureLog"} rows={1}
              maxLength={110}
              labelStyle={{marginBottom:"8px",}}
              inputStyle={{width:"58.1rem", padding:"4px 9px", color:styles.colors.colorBlack, height:"1.7rem", rows:"1",
              borderRadius:"4px",background:styles.colors.colorWhite+"aa", borderWidth:"0px",
              }}
              placeholder={"ie: a link from YouTube or Spotify"}/> 
              
              <RunButton wrapperStyle={{...styles.buttons.buttonAdd,  padding:"8px", marginTop:"2vh"}}
              text={"Save"} app ={app} 
              // to= {"/encounter/" + app.state.currentComponent.getJson()._id} 
              callBack={()=>{
                dispatch({popUpSwitchcase: "encounter", currentComponent: undefined});
              }}
                  
             />
          </div>
          
          </>)}</div>


        </div>
      </div>
      </div>
    )
  }
}


