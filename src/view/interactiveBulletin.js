import React, { Component } from 'react'; 
import "../App.css"
import Upload from './upload';
import Draggable from 'react-draggable';
import iconTest from '../pics/iconTest.svg';
import movePin from '../pics/movePin.png';
import editPin from '../pics/editPin.png';
import image1 from '../pics/iconTest.svg';
import image2 from '../pics/iconCapitol.svg';
import image4 from '../pics/iconCave.svg';
import image5 from '../pics/iconDiablo.svg';
import image6 from '../pics/iconIsland.svg';
import image7 from '../pics/iconKeep.svg';
import image8 from '../pics/iconMask.svg';
import image9 from '../pics/iconMoai.svg';
import image10 from '../pics/iconSheep.svg';
import image11 from '../pics/iconTree.svg';
import image12 from '../pics/iconWall.svg';
import image13 from '../pics/iconChest.svg';
import image14 from '../pics/iconGarg.svg';
import image15 from '../pics/iconSword.svg';
import image16 from '../pics/iconTavern.svg';
import ParentFormComponent from '../componentListNPM/componentForms/parentFormComponent';
import backarrow from '../pics/backArrow.webp';

export default class InteractiveBulletin extends Component {
  constructor(props) {
    super(props);
    this.parentRef = React.createRef();
    this.imgRef = React.createRef();
    this.divRef = React.createRef();
    this.startX = 0;
    this.startY = 0;
    this.isPanning = false;

    this.state = {
      pins:[],
      isGrabbing: false,
      mapHeight:"1200px",
      mapWidth:"1400px",
      start:false,
      isLoading: true,
    }}

  async componentDidMount(){
    this.divRef.current.addEventListener('contextmenu', this.preventContextMenu);
    this.divRef.current.addEventListener('mousedown', this.startPanning);
    this.divRef.current.addEventListener('mouseup', this.stopPanning);
    this.divRef.current.addEventListener('mousemove', this.pan);

    const delay = ms => new Promise(res => setTimeout(res, ms));
    await delay(1000);
    let mapHeight = this.imgRef?.current?.clientHeight;
    let mapWidth = this.imgRef.current?.clientWidth;
    this.setState({
      mapHeight:mapHeight,
      mapWidth:mapWidth,
    }, () => this.forceUpdate())
    ///assign pins to current mapId

    this.setState({isLoading: false});
  };

  async componentDidUpdate(prevProps, prevState) {
    if (this.imgRef?.current !== prevProps.imgRef?.current) {
      
      const delay = ms => new Promise(res => setTimeout(res, ms));
      await delay(1000);
      let mapHeight = this.imgRef?.current?.clientHeight;
      let mapWidth = this.imgRef?.current?.clientWidth;
      this.setState({
        mapHeight: mapHeight,
        mapWidth: mapWidth,
      }, () => this.forceUpdate());
      
    }
  }

  componentWillUnmount() {
    this.divRef.current.removeEventListener('contextmenu', this.preventContextMenu);
    this.divRef.current.removeEventListener('mousedown', this.startPanning);
    this.divRef.current.removeEventListener('mouseup', this.stopPanning);
    this.divRef.current.removeEventListener('mousemove', this.pan);
  }

  preventContextMenu = (e) => {
    e.preventDefault();
  }

  startPanning = (e) => {
    if (e.button === 2) { // Right mouse button
      this.isPanning = true;
      this.startX = e.clientX;
      this.startY = e.clientY;
      this.setState({ isGrabbing: true })
    }
  }

  stopPanning = () => {
    this.isPanning = false;
    // console.clear();
    this.setState({ isGrabbing: false })
  }

  pan = (e) => {
    if (this.isPanning) {
      const dx = e.clientX - this.startX;
      const dy = e.clientY - this.startY;
      this.divRef.current.scrollLeft -= dx;
      this.divRef.current.scrollTop -= dy;
      this.startX = e.clientX;
      this.startY = e.clientY;
    }
  }

  render() {
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles =state.styles;
    let headerH = 60;
    let remainderH = 1310-[headerH]-11;

    const images = [image1,image2,image4,image5,image6,image7,image8,image9,image10,image11,image12,image13,image14,image15,image16,
            "#F4F5F8",
            "#ecd23abb","#0f141cf3", "#1E90FFbb", "#5F0C0Cae" ];

    const heightY = this.state.mapHeight;

    // if (this.state.isLoading) {
    return (
                      //ALWAYS 100% 100% DONT CHANGE THIS, change the PARENT div
      <div 
      ref={this.divRef} 
      style={{width:"100%", minHeight:"100%", maxHeight:"100%",
      cursor: this.state.isGrabbing!==true? "":"grabbing", 
      overflow: 'auto', borderRadius:"20px", border:this.props.color?"solid "+this.props.color+"55":"solid "+styles.colors.color7,
      }}>
       

{/* HEADER */}
      <div style={{
        // border:"1px solid yellow", 
        display:"flex", 
        flexDirection:"row", 
        justifyContent:"space-between",
        color:"#ffdead",  
        height:"0px", 
        width:"100%", 
        alignItems:"center", 
        paddingLeft:"10px", 
        position:"sticky", 
        top: 30, left:10,
        zIndex: 99, // to ensure it stays on top
        }}>

      {/* BUTTONS IN HEADER */}

        <div className="hover-btn" style={{...styles.buttons.buttonAdd, padding:"0px", paddingLeft:"10px", borderColor:styles.colors.color3, 
        backgroundColor:styles.colors.colorBlack+"dd", color:styles.colors.colorWhite+"dd",  }}
        onClick={async (e)=>{
          let scrollLeft = this.divRef.current.scrollLeft;
            let scrollTop = this.divRef.current.scrollTop;
            let x = (scrollLeft + 80).toString();
            let y = (scrollTop + 80).toString();

            await state.opps.cleanJsonPrepareRun({
              addpin: {
                type: "pin",
                iconImage: iconTest,
                loreId: "",
                mapId: this.props.obj?.getJson()._id,
                x: x,
                y: y,
                name: "New Lore",
                campaignId: this.props.obj?.getJson().campaignId,
              },
            });
          dispatch({});


        }}
        >
          + Lore Point
          <img src={iconTest} style={{width:"40px", height:"40px", marginLeft:"15px", marginRight:"10px", marginTop:"1px", }}></img>
        </div>

        

      </div>

      
      <div style={{ position:"relative", width:"100%", height:"100%",}}>

        {this.state.mapWidth && (this.state.mapWidth !== "") &&

      <img ref={this.imgRef} 
   src={this.props.obj?.getJson().picURL} 
  style={{ position:"absolute", top:0, left:0,  borderRadius:"17px", }}/>}
  
  
  {/* {this.state.start && */}
  
  <div ref={this.parentRef}  style={{position:"absolute", top:0, left:0,
   width: this.state.mapWidth, 
   height:this.state.mapHeight 
   }}>
    
    {/* PINS PINS PINS */}
  {state.componentList.getList("pin", this.props.obj?.getJson()._id, "mapId").map((pin,index)=>
  <Draggable 
  defaultPosition={{x: parseInt(pin.getJson().x, 10), y: parseInt(pin.getJson().y, 10)}}
   grid={[1,1]}
  bounds="parent"
  handle=".draghere"

  onStart={(data)=>{
    this.setState({ isGrabbing: true });
}}
  onStop={(item, data)=>{
    // let pinId = item.target.attributes.pinId?.value;

    let parentRect = this.parentRef.current.getBoundingClientRect();
    let x = Math.min(Math.max(data.x, 1), parentRect.width - 1);
    let y = Math.min(Math.max(data.y, 1), parentRect.height - 1);

    let comp = pin;
    // state.componentList.getComponent("pin",pinId);

    comp.setCompState({
      x: x.toString(), 
      y: y.toString()
    });
   
      state.opps.cleanPrepareRun({update:comp});
      this.setState({ isGrabbing: false });
  }}


  >
    
      <div className='hover-container' 
      
      style={{
        display:"flex", flexDirection:"column", alignItems:"center",cursor:"pointer", 
        // backgroundColor:pin.getJson().colorOverlay,
        position:"absolute",
        
        borderRadius:"50%",
        
      }} 
    
      pinId={pin.getJson()._id} >
        {/* pin.getJson()._id */}

        
          <div className="indent-on-click" style={{borderRadius:"50%", width:"44px", height:"44px", paddingTop:"2px", zIndex:100, 
           
                background:styles.colors.colorBlack+"88",}}

                onClick={()=>{
                  if(pin.getJson().loreId!=="" && pin.getJson().loreId!==undefined){
                    let lore = componentList.getComponent("lore", pin.getJson().loreId, "_id");
                    dispatch({operate:'update', operation:"cleanPrepare", object:lore, popupSwitch: "popupLore"})
                  }
      
                  else{
                   
                    const newId = state.currentLore ? state.currentLore.getJson()._id: this.props.obj?.getJson().campaignId;
                  dispatch({
                    operate:"addlore",
                    operation:"cleanJsonPrepare",
                    object:{
                      campaignId: this.props.obj?.getJson().campaignId, 
                      parentId: 
                      {[newId]:"Unnamed"}
                    },
                    currentPin: pin,
                    popupSwitch: "popupLore"
      
                  })
                }
                 }}

              title="Click to Open">
         

                  <img
                draggable="false" src={pin.getJson().iconImage} 

                style={{width:"44px", height:"44px", objectFit:"contain", justifySelf:"center", 
                alignSelf:"center", verticalAlign:"center", 
                borderRadius:"50%",

                backgroundColor:pin.getJson().colorOverlay, 
                filter:pin.getJson().colorFilter,
                }}></img>
 
          </div>

          
              <div 
              className='hover-div'style={{zIndex:101, width:"20px", height:"fit-content", position:"absolute", marginLeft:"35px", marginTop:"-8px" }}>

            <img className="draghere" draggable="false" style={{ position:"absolute", marginTop:"35px",marginLeft:"0px",width:"25px",
            objectFit:"fill",
            
            cursor: this.state.isGrabbing!==true? "grab":"grabbing", overflow:"visible"

          }} src={movePin} title="Move"
            ></img>
            
            {this.state.isGrabbing!==true &&
            <>
          <div className="hover-containerInt" style={{position:"absolute", marginTop:"10px",marginLeft:"0px",width:"fit-content", 
          objectFit:"fill", cursor: "pointer", overflow:"visible",}}
          >
                      <img  draggable="false" 
                      style={{ width:"22px", marginTop:"-3px",
                        objectFit:"fill", 
                        cursor: "pointer", overflow:"visible",
                        
                      }} 
                      src={editPin} title="Change"                        />

   {/* LIST OF IMAGE OPTION       */}
                        <div className='hover-divInt'
                        style={{width:"160px",height:"150px",
                        justifyContent:"space-between", borderRadius:"11px",
                        marginLeft:"20px", marginTop:"-122px", display: 'flex', flexDirection: 'row', flexWrap: 'wrap'  }}>
                        
                        {images.map((imgSrc, index) => (
                          <div style={{display:"flex", flexDirection:"row", backgroundColor:styles.colors.color1+"7d", position:"sticky", zIndex:"50",  }}>

                {(typeof imgSrc === 'string' && !imgSrc.startsWith('#')) &&
                              <img 
                              style={{margin:"2px", height: '28px',  width:"28px", position:"relative", 
                              backgroundColor:pin.getJson().colorOverlay, 
                              filter:pin.getJson().colorFilter,
                              borderRadius:"50%"}}
                              className='hover-divInt'
                              key={index}
                              src={imgSrc}
                              onClick={(item, data)=>{                                
                                let comp = pin;
                                comp.setCompState({
                                    iconImage: imgSrc
                                });
                                  state.opps.cleanPrepareRun({update:comp});
                              }}></img>}

                {(typeof imgSrc === 'string' && imgSrc.startsWith('#')) &&
                              <div
                              style={{margin:"2px",  height: '28px', width:"28px", position:"relative", backgroundColor: imgSrc, borderRadius:"50%",}}
                              className='hover-divInt'
                              key={index}
                              onClick={(item, data)=>{                                
                                let comp = pin;
                                let colorNew = imgSrc;
                                let filterNew = ""

                                if (imgSrc == "#5F0C0C88"){
                                  colorNew = "#5F0C0C22";
                                  
                                }

                                if (imgSrc == "#F4F5F8"){
                                  colorNew = "#00000055";
                                  filterNew = "invert(98%)"
                                }

                                comp.setCompState({
                                    colorOverlay: colorNew,
                                    colorFilter: filterNew
                                });
                                  state.opps.cleanPrepareRun({update:comp});
                              }}></div>}

                          </div>
                              ))}

                        </div>

                       
                        
                        </div>
                         <div style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "flex-end",
                          marginTop: "44px",
                          marginLeft: "-110px",
                          width: "200px",
                          zIndex: "20",
                          
                          height: "32px",
                        }}>
                          <ParentFormComponent
                            app={app}
                            name="name"
                            prepareRun={true}
                            obj={pin}
                            inputStyle={{
                              padding: "0px", padding:"2px",
                              color: styles.colors.colorWhite,
                              borderRadius: "4px",
                              background: styles.colors.colorBlack + "88",
                              borderWidth: "0px",
                              textAlign: 'center',
                              width: "200px",
                              overflowX: "clip",
                              overflowY: "auto",
                              fontSize: styles.fonts.fontSmallest
                            }}
                          />
                        </div></>
                        }
                         
              </div>

             
      </div>

  </Draggable>
  )}
  </div> 
  
  {/* } */}
  </div>

      </div>
      ) 
    // }else{
    //   return (
    //     <div>Loading...</div>
    //   )
    // }
  }
}

