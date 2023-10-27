import { Component } from 'react';
import Upload from './upload';

export default class GalleryViewer extends Component {
  constructor(props) {
    super(props);
    this.getId = this.getId.bind(this);  
    this.state = {
      imagesToShow: 7,
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

    return (
      <div style={{width:"100%", minHeight:"200px",}}>
        <div className="image-grid" style={{display:"flex", justifyContent:"center", 
                  flexDirection:"row", justifyItems:"space-around", flexWrap:"wrap",
                  }}>
              {
                imageList
                .slice(0, this.state.imagesToShow)
                .map((img, index) => (
                  <div className="hover-img" key={index}>
                    <img onClick={()=>{
                          
                          dispatch({currentPic:img, popupSwitch:"viewPic"})
                        }}  draggable="false" src={img.getJson().picURL} 
                    style={{
                      maxWidth: "180px", minWidth:"100px", height:"fit-content",
                       margin:"9px", cursor:"pointer", borderRadius:"10px"
                    }}
                    alt={`img-${index}`} />
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
                        <div>
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

            <div style={{display:"flex", justifyContent:"center", justifyItems:"center", marginTop:"8px",}}>

                <Upload text="+ Upload" 
                      // changePic={ async (pic)=>{
                      //   await state.opps.cleanJsonPrepareRun({
                      //     "addimage":{
                      //       loreId: this.getId(), 
                      //       picURL: pic,
                      //       campaignId: this.getId()}});
                      //       console.log(pic);
                            
                      // }} 

                      prepareOnChange={{
                        name:"image", json:{
                          loreId: this.getId(1) ? this.getId(1):this.getId(0),
                          campaignId: this.getId(0)}
                      }}

                      obj={app.state.currentComponent}
                      update={true} skipUpdate={true}
                      
                        app={app} 
                        className="indent-on-click"
                //   onClick={() => {
                //  state.opps.cleanJsonPrepareRun({
                //   "addimage":{loreId: state.currentComponent.getJson()._id, 
                //     campaignId: id}})
                // }}
                />
                
        </div>
      </div>

    )
  }
}

