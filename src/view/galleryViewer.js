import { Component } from 'react';
import Upload from './upload';
import trash from '../pics/trash.gif';

export default class GalleryViewer extends Component {
  constructor(props) {
    super(props);
    this.getId = this.getId.bind(this);  
    this.state = {
      imagesToShow: 14,
    }
  }
 
    
  getId(val) {
    const path = window.location.pathname;
  const parts = path.split('/');
  const idSegment = parts.pop();
  const idParts = idSegment.split('-');
  
  return idParts[val]
  }

  render() {
    let app = this.props.app;
    let state = app.state;
    let dispatch = app.dispatch;
    let componentList = state.componentList;
    let styles =state.styles;
    
    let imageList = state.currentLore==undefined? state.componentList.getList("image", this.getId(0), "campaignId"):
    state.componentList.getList("image", state.currentLore.getJson()._id, "loreId");
    let list =[];
    let filteredImgList = []
    for(let image of imageList){
      if(!list.includes(image.getJson().picURL) && !list.includes(image.getJson().isDuplicate) ){
        list.push(image.getJson().picURL);
        filteredImgList.push(image);
      }
      ///PREVENTS FROM SEEING DUPs
    }
    imageList = filteredImgList;


    return (
      <div style={{width:"100%", minHeight:"200px",}}>

<div style={{display:"flex", justifyContent:"flexStart", justifyItems:"center", marginBottom:"18px", flexDirection:"column"}}>

                <Upload text="+ Upload" 
                         className="indent-on-click"
                      
                      buttonStyle={{...styles.buttons.buttonAdd, marginTop:"5px", backgroundColor:styles.colors.colorBlack+"99",
                      paddingLeft:"29px",  paddingRight:"29px", alignSelf:"flex-start", justifyItems:"center",  height:"36px", position:"relative",
                      borderRadius:"9px", fontSize:"21px",}}

                      prepareOnChange={{
                        name:"image", json:{
                          loreId: this.getId(1) ? this.getId(1):this.getId(0),
                          campaignId: this.getId(0)}
                      }}

                      obj={app.state.currentComponent}
                      update={true} skipUpdate={true}
                      
                        app={app} 
                     
               
                />
  {state.currentLore!==undefined &&
                <div onClick={()=>{dispatch({popupSwitch:"seeLibrary"})}} style={{...styles.buttons.buttonAdd, marginTop:"25px", backgroundColor:styles.colors.colorBlack+"99",
                      paddingLeft:"29px",  paddingRight:"29px", alignSelf:"flex-start", justifyItems:"center",  height:"36px",
                      borderRadius:"9px", fontSize:"21px",}}>+ From Library</div>}

        </div>

        <div className="image-grid" style={{display:"flex", justifyContent:"center", 
                  flexDirection:"row", justifyItems:"space-around", flexWrap:"wrap",
                  }}>
              {
                imageList
                .slice(0, this.state.imagesToShow)
                .map((img, index) => (
                  <div className="hover-img" key={index}>
                    <div className='hover-container' style={{maxWidth: "180px", minWidth:"180px", margin:"9px"}}>
                    <img title= {"Open"} onClick={()=>{
                          
                          dispatch({currentPic:img, popupSwitch:"viewPic"})
                        }}  draggable="false" src={img.getJson().picURL} 
                    style={{
                      maxWidth: "180px", minWidth:"100px", height:"fit-content", maxHeight: "180px",
                       margin:"9px", cursor:"pointer", borderRadius:"10px", zIndex:109, objectFit:"scale-down"
                    }}
                    alt={`img-${index}`} />

                    <div className='hover-div' title={"Delete from Gallery"}
                        style={{ ...styles.buttons.buttonAdd, background:"", width:"35px", padding:"", marginLeft:"170px",
                          color:'red', width:"fit-content", border:"", alignSelf:"flex-end",
                            }}  
                            ><div className='hover-containerInt' style={{width:"30px", padding:"2px"}}>
                                    <img className='hover-btn' src={trash} 
                                                    draggable="false"
                                    onClick={()=>{
                                    state.opps.cleanPrepareRun({del:img});
                                    }}

                                    style={{width:"30px", background:styles.colors.color1, borderRadius:"11px", zIndex:129,
                                    padding:"2px"}}/>

                                        <div className='hover-divInt' 
                                        onClick={()=>{ dispatch({currentPic:img, popupSwitch:"viewPic"})}}
                                        style={{background:styles.colors.color6, width:"180px", height: "180px", borderRadius:"10px", 
                                        opacity:"24%", position:"absolute", top:0, margin:"9px",
                                         zIndex:-9, left:-170}}
                                         >
                                        </div></div></div>
                                  </div>
                                  
                  </div>
                ))
              }
              {
                imageList.length > this.state.imagesToShow &&
                <div className="hover-img" 
                onClick={() =>
                  this.setState(prevState => ({ imagesToShow: prevState.imagesToShow + 7 }))} 
                  style={{maxHeight: "210px", cursor:"pointer", textAlign:"center", padding:"8px",
                    maxWidth: "210px", display:"flex", alignItems:"center", justifyContent:"center",
                     fontSize: "24px", borderRadius:"20px", marginBottom:"3vh",
                    color:styles.colors.colorWhite, border:""+styles.colors.colorWhite+"55 solid"
                  }}>
                    <div 
                    style={{display:"flex", position:"relative",}}>
                  +{imageList.length - this.state.imagesToShow} more
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', 
                  }}>
                    {
                      imageList
                      .slice(this.state.imagesToShow, this.state.imagesToShow+9)
                      .map((img, index) => (
                        <div >
                          
                        <img  draggable="false" key={index} src={img.getJson().picURL} 
                        style={{
                          maxWidth: "20px", margin:"2px", opacity:"40%"
                        }}
                        alt={``} />

                        
                        </div>
                      ))
                    }
                  </div>
                </div>
              }
            </div>

            
      </div>

    )
  }
}

