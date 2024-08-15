import { Component } from 'react';
import "../App.css"

import MapComponent from '../componentListNPM/mapTech/mapComponent';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
// https://www.npmjs.com/package/react-lazyload;

import ExpandTreeArrow from './expandTreeArrow';
import ListTreeInner from './listTreeInner';
import ListTreeLink from './listTreeLink';
import ListTreeObserver from './listTreeObserver';


export default class ListTree extends Component {
  constructor(props) {
    
    super(props);
    
    this.listTreeObserver = new ListTreeObserver();

    this.expanse=0;
    this.state = {
      obj: undefined,
      pic: undefined,
      usage: 0,
    }
    
  }
  async componentDidMount(){
    let app = this.props.app;
    let dispatch = app.dispatch
    let state = app.state;
    let prevUrl = undefined;
// setInterval(async() => {
//   const currUrl = window.location.href;
//   if (currUrl !== prevUrl) {
//     if(!currUrl.includes("-")){
//       dispatch({currentLore:undefined});
//     }
//     else{
//       let list = currUrl.split("/");
//       let id = list[list.length-1].split("-")[1]
//       let lore = state.componentList.getComponent("lore", id, "_id");
//       await dispatch({currentLore:undefined})
//       dispatch({currentLore:lore});
//     }
//     // URL changed
//     prevUrl = currUrl;
//     //console.log(`URL changed to : ${currUrl}`);
    
//   }
// }, 60);
await state.componentList.sortSelectedList("lore", "index");
this.setState({})

  }

  setExpanse(arr){
    this.expanse=[...arr]
  }

 


  render() {
    
    let app = this.props.app;
    let dispatch = app.dispatch
    let state = app.state;
    
    let styles = state.styles;
    const _id = this.props._id;
    let name =  this.props.name;
    let attribute = this.props.attribute;
    
    let path = window.location.pathname;
    let parts = path.split('/');
    let idSegment = parts.pop();
    let idParts = idSegment.split('-');
    
    let campId =  idParts[0];
    let CC = state.currentCampaign;

    let count = this.props.count;
    
    let bord = "solid 1px "+styles.colors.color3+"54";
    let bord1 = (this.props.count===0)?"expandingTree":"expandingTreeColorless";
    

    let cells=  
  
    [
      {custom: ListTreeLink, props:{app:app, c:count+1,
        name:"name",
      }},
      {custom:ExpandTreeArrow, props:{app:app, c:count, listTreeObserver: this.listTreeObserver
        
      }},
    {custom:ListTreeInner, props:{app:app, listTreeObserver: this.listTreeObserver, c:count, setExpanse:this.props.setExpanse?this.props.setExpanse:this.setExpanse.bind(this), expanse:this.props.expanse?this.props.expanse:this.expanse,  
        
      }
    }
    ,
      
    ]

    const isHidden = state.currentExpanse && state.currentExpanse.includes(_id);
    if(state.currentExpanse===undefined || state.currentExpanse?.length===0){
      this.expanse=1;
      

    }
    // console.log(isHidden)


    return (<div style={{}}>
      
             <div style={{flexDirection:"row", display:"flex", textDecoration:"none"}} >
             
             <div  style={{flexDirection:"column", display:"flex",textDecoration:"none",
             alignItems:"left"}} >

                          {!isHidden &&this.expanse===1 &&
                          <Link to={/campaign/+CC.getJson()._id}
                          className="hover-btn-highlight" 
                          style={{...styles.buttons.buttonAdd, marginBottom:"15px", padding:"2px", fontSize:styles.fonts.fontNormal, background:"", boxShadow:"",
                                                textDecoration:"underline 1px "+styles.colors.color8+"48", textUnderlineOffset:"3px", color:styles.colors.color8,
                                                marginTop:"5px", border:""}}>

                            {CC.getJson().title}
                          </Link>}
                    {/* {!isHidden && (
                      <div className="hover-btn" style={{...styles.buttons.buttonAdd, marginBottom:"15px", 
                      marginTop:"5px", paddingLeft:"13px",  paddingRight:"13px", 
                      
                      padding:"4px", borderRadius:"9px", fontSize:styles.fonts.fontSmallest }}
                      onClick={()=>{
                        dispatch(
                          {operate:"addlore", operation:"cleanJsonPrepareRun",
                          //                                      CHANGE NAME later
                          object:{ parentId:{[_id]:"New Lore"}, type:"lore", name:"New Lore", campaignId:campId}}
                        )
                      }}
                      >+ New Top Level Lore</div>)} */}


{/* //ADD IMAGE HERE// */}
                      <div style={{flexDirection:"column", display:"flex",textDecoration:"none", 
                      width:"100%",
                       maxHeight:"87.5vh", alignItems:"left", background:styles.colors.color8+"03", padding:"2px", borderRadius:"4px",                  
                    }}>
                        <MapComponent app={app}  theme={bord1}
                                             
                        name={name} 
                        
                        cells={cells}

                        filter={{search: _id, attribute: attribute}}  filterFunc={(obj)=>{
                          let reference = obj.getJson().reference;
                          let firstReference = obj.getJson().firstReference;
                          let bool  = false;
                          if(!reference){
                            bool = true;
                          }
                          if(firstReference){
                            bool = true;
                          }
                          return bool}}/>
                      </div>
              </div>
            </div>
            
            
        </div>
        
    )
  }
}


