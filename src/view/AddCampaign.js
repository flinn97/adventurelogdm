import { Component } from 'react';
import "../App.css"
import RunButton from '../componentListNPM/componentForms/buttons/runButton';
import ParentFormComponent from '../componentListNPM/componentForms/parentFormComponent';
import CardPractice from './CardPrac';
import Upload from './upload';
import placeholder from '../pics/placeholderCampaign.JPG';
import RichTextComponent from '../componentListNPM/componentForms/singleForms/RichTextComponent';
import { useNavigate  } from 'react-router-dom';
import React, { useEffect } from 'react';

export default class AddCampaign extends Component {
  constructor(props) {
    super(props);
    this.deleteCampaign = this.deleteCampaign.bind(this);
    this.state = {
      usage: 0,
    }
  }



  async deleteCampaign () {
    let state = this.props.app.state;
    let dispatch = this.props.app.dispatch;
    let currentCampaign = state.currentCampaign;
    state.opps.cleanPrepareRun({del:currentCampaign}).then(async ()=>{
      await dispatch({popupSwitch:"", currentDelObj:undefined});
      
      this.setState({navigate:true})


    })
    
  }

  render() {
                         
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles =state.styles;
    
    let campaignPlaceholder = "Campaign Name";
    let textSubmit = ""; let textNotReady ="";
    let isUpdate = (state.popUpSwitchcase === "updateCampaign");
    let isNotUpdate = (state.popUpSwitchcase !== "updateCampaign")

    if (state.currentComponent?.getJson().type === "campaign" && isUpdate)
                      { textSubmit ="Save";}
                      else {
                        textSubmit ="Create My Campaign";
                        };
    

    if (this.state.pic)
                      {textNotReady = state.currentComponent?.getJson().type != "campaign" && isNotUpdate ? "Loading..." : "Edit"}
                      else {
                        textNotReady = isNotUpdate? "Give your campaign an image and title!" : "Edit"
                        };
   

    return (
      <div>
        
      <div  style={{...styles.backgroundContent, 
      backgroundImage: state.currentComponent?.getJson().type === "campaign" && isUpdate ?
      'url('+(this.state.obj?.getJson().picURL||this.state.completedPic)+')'
      :
      'url('+(this.state.completedPic||placeholder)+')'
      , 
      
      zIndex:"20",
      backgroundRepeat: "no-repeat",  backgroundPosition: "50% 50%",  backgroundSize:"cover",}}
      
      >
            
          <div style={{minHeight:"224px", 
            ...styles.popupSmall,
            height: 'fit-content', 
            // backgroundColor: state.currentComponent?.getJson().type === "campaign" && state.popUpSwitchcase === "updateCampaign"?"#000000":styles.popupSmall.backgroundColor,
            }}>

              <div style={{display:"flex", flexDirection:"column", height:"fit-content", width:"fit-content", }}>

        {/* //DELETE CAMPAIGN */}
                    {isUpdate && 
                    (<div className='hover-btn'
                      style={{...styles.buttons.buttonClose, right:"3.5vw", borderRadius:"2vmin", fontSize:styles.fonts.fontSmall,
                    padding:"4px 10px",  pointer:"cursor", height:"fit-content", zIndex:"200", 
                    marginRight:"6%", background:styles.colors.colorBlack+"5b",marginTop:"4px", position:"absolute", 
                    // backgroundColor:"white",
                  }}
                    
                    onClick={()=>{
                      state.opps.cleanPrepareRun({del:state.currentComponent}).then(()=>{
                        this.deleteCampaign();
                      });
                      }}>
                      Delete This Campaign 
                      <div style={{color:styles.colors.color3, fontSize:".85rem", marginLeft:"10px", alignSelf:"center", }}> (permanent)</div>
                    </div>)}

            </div>

          {/* <img src={this.state.pic || placeholder} style={{position: 'sticky', minWidth: '100%', minHeight: '100%', 
            maxWidth: 'none', maxHeight: 'none', top: '50%', left: '50%', 
            transform: 'translate(-50%, -50%)', objectFit: 'cover', opacity: .89, zIndex: '-1', borderRadius:"2vmin" }}/> */}
         
              <div className='hover-btn' style={{ display:"flex", marginBottom:"20px", flexDirection:"row", width:"100%", justifyContent:"space-between", 
              verticalAlign:"center", alignItems:"center"}}>
                <Upload 
              //ADD THIS TO ALL UPLOADS//
              changePic={(pic)=>{this.setState({pic:pic})}} 
              obj={app.state.currentComponent} text="Set Backdrop" style={{display:"flex",
              zIndex:"1", borderRadius:".1vmin", background:"",}} 
              update={true} skipUpdate={true}
              updateMap={(obj)=>{this.setState({
                completedPic: obj.getJson().picURL, 
                // usage: obj.getJson().usage +1
                })}} app={app}/>
              
                  
                    {/* ///EXIT BUTTON */}
                    <div style={{...styles.buttons.buttonClose,}} 
                    onClick={()=>{dispatch({popUpSwitchcase: "", currentComponent: undefined})}}
                    
                    >X</div>
                    
              </div>

              {/* ///NAME OF CAMPAIGN */}
              <ParentFormComponent app={app} name="title" label="*Campaign Name: " 
                  wrapperStyle={{margin: "5px", color:styles.colors.colorWhite, display:"flex",flexDirection:"column"}}
                  theme={"adventureLog"} rows={1}
                  maxLength={app.state.maxLengthShort}
                  labelStyle={{marginBottom:"8px"}}
                  inputStyle={{width:"58.1rem", padding:"4px 9px", color:styles.colors.colorBlack, height:"1.7rem", rows:"1",
                  borderRadius:"4px",background:styles.colors.colorWhite+"aa", borderWidth:"0px",
                  }}
                  placeholder={campaignPlaceholder}
              />
              

              {/* ///Description */}
              {/* <ParentFormComponent app={app} name="description" label="Campaign Description: " 
                  theme={"adventureLog"} 
                  
                  maxLength={200} rows={5}
                  labelStyle={{marginBottom:"8px"}}
                  inputStyle={{width:"58.1rem", padding:"4px 9px", color:styles.colors.colorBlack, height:"fit-content",
                  borderRadius:"4px",background:styles.colors.colorWhite+"aa", borderWidth:"0px", marginBottom:"2vh" }}
                  type={"quill"}
                  placeholder={"Briefly describe your campaign. 200 Characters Max"}
                  
                  wrapperStyle={{margin:"5px", color:styles.colors.colorWhite, display:"flex",flexDirection:"column", justifyItems:"space-between"}}
                  
                  /> */}
              {/* <ParentFormComponent app={app} name="session" 
                  theme={"adventureLog"} 
                  labelStyle={{marginBottom:"8px"}}
                  inputStyle={{width:"3.1rem", padding:"4px 9px", color:styles.colors.colorBlack, 
                  borderRadius:"4px",background:styles.colors.colorWhite+"aa", borderWidth:"0px",}}
                  label="Session: " 
                  wrapperStyle={{margin: "5px", color:styles.colors.colorWhite, display:"flex",flexDirection:"column"}}
                  maxLength={4} 
                  placeholder={"#"}/>  */}

                  {isNotUpdate
                    ? <div style={{display:"flex", justifyContent:"center"}} className="hover-btn"> 
                        <RunButton app ={app} 
                          wrapperStyle={{...styles.buttons.buttonAdd, 
                            width:"45%",
                            display:"flex", transition:"all 1s easeOutQuart",
                          }}
                          text={textSubmit}
                          callBack={async (obj)=>{
                            
                            let newLore = {desc:"add new description", name:obj[0].getJson().title, 
                            campaignId: obj[0].getJson()._id, type:"lore", parentLore:true, topLevel:true, index:0,
                            parentId:  {[obj[0].getJson()._id]:obj[0].getJson().title}}
                            
                            await state.opps.jsonPrepareRun({addlore:newLore});
                            dispatch({popUpSwitchcase: "", currentComponent: undefined});
                          }}
                        />
                      </div>
                    : 
                      <div className='hover-btn' style={{display:"flex", justifyContent:"center", marginTop:"20px"}}>
                      <RunButton app ={app} 
                        wrapperStyle={{...styles.buttons.buttonAdd, 
                          width:"45%",
                          display:"flex", transition:"all 1s easeOutQuart",
                           }}
                        text={textSubmit}
                        callBack={async (comp)=>{
                          //
                          comp = comp[0]
                          let lores = componentList.getList("lore", comp.getJson()._id, "campaignId");
                          let parent = lores.find(lore=>lore.getJson().parentLore === true);
                          parent.setCompState({name:comp.getJson().title});
                          await state.opps.cleanPrepareRun({update:[comp,parent]});
                          dispatch({popUpSwitchcase: "", currentComponent: undefined});
                        }}
                      />
                    </div>
                  } 
                          {isNotUpdate
                          &&
                          <div style={{color:styles.colors.color5, fontSize:styles.fonts.fontSmallest, fontWeight:"200", width:"fit-content"}}>
                            * required, you can change this later
                            </div>
                          }
                  </div>
</div>
{this.state.navigate&&<URLcheck/>}
</div>


    )
  }
}


const URLcheck = () => {
  const nav = useNavigate ();

  useEffect(() => {
    nav("/campaign/"); // This will navigate up one level in the history stack
    // Send request to your server to increment page view count
});

  return (
    <div>
    </div>
  );
}