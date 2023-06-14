import { Component } from 'react';
import "../App.css"
import RunButton from '../componentListNPM/componentForms/buttons/runButton';
import ParentFormComponent from '../componentListNPM/componentForms/parentFormComponent';
import CardPractice from './CardPrac';
import Upload from './upload';
import placeholder from '../pics/placeholderCampaign.JPG';
import RichTextComponent from '../componentListNPM/componentForms/singleForms/RichTextComponent';

export default class AddCampaign extends Component {
  constructor(props) {
    super(props);

    this.state = {
      
    }
  }

  

  render() {
                         
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles =state.styles;
    let radius = "2vmin";
    let campaignPlaceholder = "Campaign Name";
    let textSubmit = ""; let textNotReady ="";

    if (state.currentComponent?.getJson().type === "campaign" && state.popUpSwitchcase === "updateCampaign")
                      {textSubmit ="Edit"}
                      else {
                        textSubmit ="Create My Campaign";
                        };
    console.log(styles);

    if (this.state.pic)
                      {textNotReady ="Loading..."}
                      else {
                        textNotReady ="Give your campaign an image and title!";
                        };
   

    return (
      <div>
        
      <div style={{display: "flex", marginTop:"1vmin", flexDirection: 'column', borderRadius:radius, justifyContent:"space-evenly", 
      transition:"all 2s ease-in-out",
      width: '100%', height: 'fit-content',  backgroundImage: 'url('+(this.state.pic||placeholder)+')', zIndex:"20",
      backgroundRepeat: "no-repeat",  backgroundPosition: "50% 50%",  backgroundSize:"cover",}}
      
      >
            
          <div style={{...styles.popupSmall}}>
              <div style={{display:"flex",justifyContent:"flex-end"}}>
              {/* ///EXIT BUTTON */}
              <div style={{...styles.buttons.buttonClose, marginBottom:".5rem"}} 
              onClick={()=>{dispatch({popUpSwitchcase: "",})}}
              
              >X</div>
              </div>
          {/* <img src={this.state.pic || placeholder} style={{position: 'sticky', minWidth: '100%', minHeight: '100%', 
            maxWidth: 'none', maxHeight: 'none', top: '50%', left: '50%', 
            transform: 'translate(-50%, -50%)', objectFit: 'cover', opacity: .89, zIndex: '-1', borderRadius:"2vmin" }}/> */}
        
              <div style={{ marginBottom:"20px"}}><Upload 
              //ADD THIS TO ALL UPLOADS//
              changePic={(pic)=>{this.setState({pic:pic})}} 
              obj={app.state.currentComponent} text="Set Background" style={{display:"flex",
              zIndex:"1", borderRadius:".1vmin", background:"",}} 
              update={true} skipUpdate={true} 
              updateMap={(obj)=>{this.setState({completedPic: obj.getJson().picURL})}} app={app}/>
              
              </div>

              {/* ///NAME OF CAMPAIGN */}
              <ParentFormComponent app={app} name="title" label="*Campaign Name: " 
                  wrapperStyle={{margin: "5px", color:styles.colors.colorWhite, display:"flex",flexDirection:"column"}}
                  theme={"adventureLog"} rows={1}
                  maxLength={110} required
                  labelStyle={{marginBottom:"8px"}}
                  inputStyle={{width:"58.1rem", padding:"4px 9px", color:styles.colors.colorBlack, height:"1.7rem", rows:"1",
                  borderRadius:"4px",background:styles.colors.colorWhite+"aa", borderWidth:"0px",
                  }}
                  placeholder={campaignPlaceholder}
              />
              

              {/* ///Description */}
              <ParentFormComponent app={app}
                  theme={"adventureLog"}
                  maxLength={200} rows={5}
                  labelStyle={{marginBottom:"8px"}}
                  inputStyle={{width:"58.1rem", padding:"4px 9px", color:styles.colors.colorBlack, height:"fit-content",
                  borderRadius:"4px",background:styles.colors.colorWhite+"aa", borderWidth:"0px", marginBottom:"2vh" }}
                  type={"richEditor"}
                  placeholder={"Briefly describe your campaign. 200 Characters Max"}
                  name="description" label="Campaign Description: " 
                  wrapperStyle={{margin:"5px", color:styles.colors.colorWhite, display:"flex",flexDirection:"column", justifyItems:"space-between"}}
                  
                  />
              {/* <ParentFormComponent app={app} name="session" 
                  theme={"adventureLog"} 
                  labelStyle={{marginBottom:"8px"}}
                  inputStyle={{width:"3.1rem", padding:"4px 9px", color:styles.colors.colorBlack, 
                  borderRadius:"4px",background:styles.colors.colorWhite+"aa", borderWidth:"0px",}}
                  label="Session: " 
                  wrapperStyle={{margin: "5px", color:styles.colors.colorWhite, display:"flex",flexDirection:"column"}}
                  maxLength={4} 
                  placeholder={"#"}/>  */}

                  {this.state.completedPic 
                    ? <div style={{display:"flex", justifyContent:"center"}}>
                        <RunButton app ={app} 
                          wrapperStyle={{...styles.buttons.buttonAdd, 
                            width:"45%",
                            display:"flex", transition:"all 1s easeOutQuart",
                          }}
                          text={textSubmit}
                          callBack={()=>{
                            dispatch({popUpSwitchcase: "", currentComponent: undefined});
                          }}
                        />
                      </div>
                    : 
                      
                      <div style={{display:"flex", justifyContent:"center"}}>
                      <RunButton app ={app} 
                        wrapperStyle={{...styles.buttons.buttonAdd, cursor:"wait", 
                          width:"35%", transition:"all 1s ease-out", borderRadius:"21%",
                          display:"flex", color:styles.colors.color6, background:styles.colors.colorWhite+"88", fontWeight:"600", borderColor:styles.colors.color6
                        }}
                        text={textNotReady}
                        callBack={()=>{
                          dispatch({popUpSwitchcase: "", currentComponent: undefined});
                        }}
                      />
                    </div>
                  } <div style={{color:styles.colors.color5, fontSize:styles.fonts.fontSmall, fontWeight:"200"}}>* required, you can change this later</div>
            </div>
</div>
</div>

    )
  }
}


