import { Component } from 'react';
import "../App.css"
import RunButton from '../componentListNPM/componentForms/buttons/runButton';
import ParentFormComponent from '../componentListNPM/componentForms/parentFormComponent';
import CardPractice from './CardPrac';
import Upload from './upload';
import placeholder from '../pics/placeholderCampaign.JPG';

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
    console.log(styles);

    return (
      <div style={{}}>
      <div style={{display: "flex",marginTop:"1vmin", flexDirection: 'column', borderRadius:radius, justifyContent:"space-evenly",
      width: '100%', height: '100%',  backgroundImage: 'url('+(this.state.pic||placeholder)+')', zIndex:"20",
      backgroundRepeat: "no-repeat",  backgroundPosition: "50% 50%",  backgroundSize:"cover",}}>
        
      <div style={{opacity:"100%", backgroundColor:"#ffffff55", padding:"10px", borderRadius:radius, borderStyle:"solid",}}>
          
          {/* ///EXIT BUTTON */}
          <div styles={{}} onClick={()=>{dispatch({popUpSwitchcase: ""})}}
          >X</div>
          
      {/* <img src={this.state.pic || placeholder} style={{position: 'sticky', minWidth: '100%', minHeight: '100%', 
        maxWidth: 'none', maxHeight: 'none', top: '50%', left: '50%', 
        transform: 'translate(-50%, -50%)', objectFit: 'cover', opacity: .89, zIndex: '-1', borderRadius:"2vmin" }}/> */}
    
          <Upload 
          //ADD THIS TO ALL UPLOADS//
          changePic={(pic)=>{this.setState({pic:pic})}} 
          obj={app.state.currentComponent} text="Set Background" style={{display:"flex",color:"white",
          zIndex:"1", borderRadius:".1vmin", background:"grey", padding:"11px"}} 
          update={true} skipUpdate={true} 
          updateMap={(obj)=>{this.setState({completedPic: obj.getJson().picURL})}} app={app}/>
          
          <ParentFormComponent app={app} name="title" label="Campaign Name: " wrapperStyle={{margin:"5px"}}
          theme={"adventureLog"}
           inputStyle={{padding:"4px 9px", color:styles.colors.colorBlack, borderRadius:"4px", 
           width:"55%", background:styles.colors.colorWhite+"88", borderWidth:"0px"}}
           maxLength={110} placeholder={"What's the name of your campaign?"}
           /> 
          <ParentFormComponent app={app} name="description" label="Campaign Description: " wrapperStyle={{margin: "5px"}}/>
          <ParentFormComponent app={app} name="session" label="Session #: " wrapperStyle={{margin: "5px"}}/> 
          <div style={{display:"flex", justifyContent:"center"}}>
          <RunButton app ={app} 
          wrapperStyle={{...styles.buttons.buttonAdd, 
            width:"45%", backgroundColor:styles.colors.color2+"99", 
            display:"flex",
          }}
          text="Create"
          callBack={()=>{
            debugger
            dispatch({popUpSwitchcase: "", currentComponent: undefined});
            dispatch({popUpSwitchcase: ""});
            }}
            /></div>
      </div>
</div>
</div>

    )
  }
}


