import { Component } from 'react';
import "../App.css"
import ParentFormComponent from '../componentListNPM/componentForms/parentFormComponent';
import TextBoxComponent from '../componentListNPM/componentForms/singleForms/TextBoxComponent';
import d20 from '../pics/d20.png';


export default class Roll extends Component {
  constructor(props) {
    super(props);

    this.handleAddition = this.handleAddition.bind(this);
    this.clearInitiative = this.clearInitiative.bind(this);  
    this.setNewInit = this.setNewInit.bind(this);  

    this.state = {
      
      fontsize:undefined,
    };
  }



  // // Clear method to delete the specific initiative
  clearInitiative() {
    let obj = this.props.obj;

    if ((obj.getJson().lastInit !== undefined && obj.getJson().lastInit !== "")) {
     this.setState({initiative: undefined});
     obj.setCompState({lastInit:undefined});
     
    }
  }


  componentDidMount(){
    let obj = this.props.obj;
    
    if ((obj.getJson().lastInit !== undefined && obj.getJson().lastInit !== "")) {
      let jsonObj = obj.getJson();
      debugger
    this.setState({initiative: jsonObj.lastInit});
    }
  }

  async handleAddition() {
     // Generate an array of 10 random numbers
  const randomNumbers = Array.from({length: (Math.floor(Math.random() * 20) + 1)}, () => Math.floor(Math.random() * 20) + 1);
  // Select a random number from the array
  const randomNumber = randomNumbers[Math.floor(Math.random() * randomNumbers.length)];

  let app = this.props.app;
  let obj = this.props.obj;
  const monsterId = obj?.name+obj?._id;

   let state = app.state;

   let initiativeBonus = parseInt(obj.getJson().initiative);
   let totalInitiative = randomNumber + initiativeBonus;
   this.setState({initiative: totalInitiative });
   
   obj.setCompState({lastInit: totalInitiative.toString()});
   console.log(obj.getJson().lastInit)

  let encounterList = app.state.encounterList? app.state.encounterList: [];
  encounterList.push(obj);
  
  await app.state.componentList.setSelectedList("encounterList", encounterList)
  await app.dispatch({encounterList: encounterList})

  state.opps.cleanPrepareRun({update:obj});
 
}

async setNewInit(e){
  let obj = this.props.obj;
  const value = e.target.value === '' ? undefined : e.target.value;
  await obj.setCompState({lastInit: value});
  this.setState({ initiative: value});
  console.log(obj.getJson().lastInit)
}


render() {
  let app = this.props.app;
  let obj = this.props.obj;
  let fontSize = this.props.fontSize;
  let state = app.state;
  let dispatch = app.dispatch;
  let componentList = state.componentList;
  let styles =state.styles;

  return(
    <div style={{color:styles.colors.colorWhite, width:"32px",}}>
      {obj.getJson().lastInit ? (<div style={{fontSize:this.props.fontSize[0], width:"32px", position:"absolute", top:"40%", left:"11%", }}>{obj.getJson().lastInit}
      
        {/* <ParentFormComponent
    app={app} 
    name="init"
    wrapperStyle={{margin: "5px", color:styles.colors.colorWhite, display:"flex",flexDirection:"column"}}
    theme={"adventureLog"}
    maxLength={3} type={"text"}
    value={obj.getJson().lastInit}
    inputStyle={{width:"50px", padding:"1px 5px", color:styles.colors.colorWhite, minHeight:this.props.fontSize[0],
    borderRadius:"4px",background:styles.colors.colorWhite+"11", borderWidth:"0px", fontSize:this.props.fontSize[0],
    }}
    placeholder={obj.getJson().lastInit}
    handleChange={(e) => {
      
      console.log('Form changed');
      this.setNewInit(e);
  }}
/> */}
      
      </div> ) 
:(<div>
      <div style={{color:styles.colors.colorWhite, fontSize:this.props.fontSize[0], cursor:"pointer", width:"32px",}}
          onClick={
          this.handleAddition
        } 
            >
          <img src={d20} style={{width:"32px"}}/>
          
      </div>
      {/* <ParentFormComponent
    app={app} 
    name="init"
    wrapperStyle={{margin: "5px", color:styles.colors.colorWhite, display:"flex",flexDirection:"column"}}
    theme={"adventureLog"}
    maxLength={3} type={"text"}
    value={obj.getJson().lastInit}
    inputStyle={{width:"50px", padding:"1px 5px", color:styles.colors.colorWhite, minHeight:this.props.fontSize[0],
    borderRadius:"4px",background:styles.colors.colorWhite+"11", borderWidth:"0px", fontSize:this.props.fontSize[0],
    }}
    placeholder={obj.getJson().lastInit}
    handleChange={(e) => {
      this.setState({ initiative: e.target.value }, () => {
        this.setNewInit(e)})
    }}
/> */}
 </div>)
}

     {/* {(obj.getJson().lastInit !== undefined && obj.getJson().lastInit !== "") &&
      <div style={{color:styles.colors.colorWhite, fontSize:this.props.fontSize[0], cursor:"pointer"}} 
      onClick={
        this.clearInitiative}
        >Clear</div>} */}
    </div>
  );
}
}


