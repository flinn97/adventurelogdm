import { Component } from 'react';
import "../App.css"
import { Link } from 'react-router-dom';
import leftAr from '../pics/leftarrow.png'


export default class IndexLoreHierarchy extends Component {
  constructor(props) {
    
    super(props);
    this.state = {
      obj: undefined,
      pic: undefined,
      usage: 0,
    }
    
  }
  


  render() {
    let app = this.props.app;
    let dispatch = app.dispatch
    let state = app.state;
    
    let styles = state.styles;
    const _id = this.props._id;
   
    let attribute = this.props.attribute;
    
    let lore = this.props.currentLore;
    let CC = state.currentCampaign;

    let parent = lore.getJson().parentId;
    let pId = Object.keys(parent)[0];
    let parentItem = state.componentList.getComponent("lore", pId, "_id");

    let n = lore ? lore.getJson().name : "";
    if (n.length > 25) {
        n = n.substring(0, 22) + "...";
    }

    const s = {cursor:"pointer",flexDirection:"row", display:"flex", borderRadius:"11px", 
    padding:"2px 8px", background:styles.colors.color1, width:"fit-content",
    textDecoration:"underline", textDecorationThickness:"1px", textUnderlineOffset:"3px", 
    textDecorationColor:styles.colors.color2, minWidth:"fit-content", maxHeight:"1.4rem",
    color:this.props.color?this.props.color:styles.colors.colorWhite+"e9", fontSize:styles.fonts.fontSmall }
    

    const arrow = <img src={leftAr} style={{width:"20px", marginRight:"2px", opacity:"80%", objectFit:"scale-down", rotate:"180deg"}}/>
    return (<div style={{flexDirection:"row", display:"flex", minWidth:"fit-content",}}>

          {(parentItem && this.props.count<5 ) &&
                (<IndexLoreHierarchy app={app} currentLore={parentItem} count={this.props.count+1}/>)
            }
        {(!parentItem || this.props.count===5) &&
            (<Link draggable={false} to={/campaign/+CC.getJson()._id} className='hover-btn' style={s} >{CC.getJson().title}</Link>)
        }
      {lore &&
      <div style={{flexDirection:"row", display:"flex", color:styles.colors.colorWhite+"55", fontSize:styles.fonts.fontSmall}}>

            {(this.props.count!==5) &&
            (<div>
                  {arrow}
            </div>)
            } 
            {(this.props.count===5) &&
              <div>
                  ...
            </div>
            } 

             <Link className='hover-btn' draggable={false}
             to={/campaign/+CC.getJson()._id+"-"+lore.getJson()._id}  style={s} >
              {n?n:lore.getJson().title}
              
             
            </Link>
            </div>
            }
            
        </div>
        
    )
  }
}


