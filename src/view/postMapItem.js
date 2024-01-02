import { Component } from 'react';
import "../App.css";
import LoreLogComponent from './pages/LogComponents/loreLogComponent';
import ImageLogComponent from './pages/LogComponents/imageLogComponent';
import MessageLogComponent from './pages/LogComponents/messageLogComponent';
import RollLogComponent from './pages/LogComponents/rollLogComponent';
import InitiativeLogComponent from './pages/LogComponents/initLogComponent';
import DelButton from '../componentListNPM/componentForms/buttons/deleteButton';
import TokenImage from './tokenImage';
import placeholderGM from '../pics/addPlayer.png';



export default class PostMapItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      obj: this.props.obj,
      user: "", user2:""
    }

    this.componentMap = {
      'image': ImageLogComponent,
      'lore': LoreLogComponent,
      'message': MessageLogComponent,
      'diceroll': RollLogComponent,
      'encounter': InitiativeLogComponent,
      // ... add other mappings ...
    };
  }
 
 whichUser(obj){
    let app = this.props.app;
    let dispatch = app.dispatch
    let state = app.state;
    let user =  state.user.getJson()?._id;
    let objUser =  obj.getJson()?.senderId;
        if (user === objUser){
          return true
        }else{
          return false
        }

  };


  render() {
    let app = this.props.app;
    let dispatch = app.dispatch
    let state = app.state;
    let styles = state.styles;
    let obj = this.props.obj;
    let index = this.props.index;
    const isYou = this.whichUser(obj);
    let sender = this.props.obj?.getJson().sender;
    const marginUser = isYou?"180px":"0px";
    let tLevel = "44";
    let chatItemColor = styles.colors.colorBlack;


    const backgroundUser = isYou?
    "linear-gradient(to right, "+chatItemColor+tLevel+", "+chatItemColor+"99)"
    :
    "linear-gradient(to left, "+chatItemColor+"99, "+chatItemColor+tLevel+")";     

    let pType = obj?.getJson().postType;
    let choiceColor = styles.colors.color9+"55";
    let w = "590px";
    
    let oColors =  obj.getJson().colors ? obj.getJson()?.colors[0]+"66":choiceColor;

    const LogComponent = this.componentMap[pType];

    let hasPic = obj.getJson().userPic?obj.getJson().userPic:placeholderGM;

    return (
      
      <div className='hover-container' style={{ display: "flex",
                  flexDirection: "row", width:w,
                  maxWidth:w, justifyContent:"center",
                  borderBottom: sender==="GM"?"solid 3px "+styles.colors.color3+"66":"solid 1px "+styles.colors.colorWhite+"55", 
                  borderTop: sender==="GM"?"solid 1px "+styles.colors.color3+"66":"solid 1px "+styles.colors.color8+"22",
                    
                  borderRadius:"11px", padding:"1px 5px",
                  fontSize: styles.fonts.fontNormal,
                  
                  background: backgroundUser,                
                  marginLeft: marginUser, 
      }}>
          

                          {!isYou && <div  style={{ display:"flex",flexDirection:"row", marginTop:"1.2%", marginBottom:"1.2%", position:"sticky", left:"2"}}>
          <div style={{ display:"flex",
            width:"2px", backgroundColor: styles.colors.color6,
            }}>

             

            </div>
             <div style={{ display:"flex",
             width:"1px", backgroundColor: choiceColor, marginLeft:"-11px", marginLeft:"2px",
             }}>
 
               </div>
               </div>}

               {hasPic && !obj?.getJson().isToken && (
                <div style={{display:"flex", position:"absolute", width:"fit-content", right:-45, zIndex:800, top:-8}}
                 title={obj?.getJson().name?obj?.getJson().name:"GM"}
                >
             <TokenImage app={app} pic={hasPic} width={44} colors={obj?.getJson().colors} />
             </div>
              )}

{/* COMPONENT */}
                  {LogComponent ? (<LogComponent {...this.props} isYou={isYou} w={w}/>) : null}
                    

                  {isYou && obj.getJson().postType!=="encounter" && 
                  <div  style={{ display:"flex",flexDirection:"row", marginTop:"1.2%", marginBottom:"1.2%", position:"sticky", marginLeft:"13px"}}>
          
             <div style={{ display:"flex",
             width:"1px", backgroundColor: oColors, marginRight:"2px",
             }}> 
 
               </div>
               <div style={{ display:"flex",
            width:"2px", backgroundColor: choiceColor, marginRight:"11px",
            }}>
             {/* {this.state.user} and  {this.state.user2} */}
            </div>
            

            
               </div>}
      </div>


      
    )
  }
}


