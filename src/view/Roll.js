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

      fontsize: undefined,
    };
  }


  // // Clear method to delete the specific initiative
  async clearInitiative() {
    let obj = this.props.obj;
    if ((obj.getJson().lastInit !== undefined && obj.getJson().lastInit !== "")) {
      await obj.setCompState({ lastInit: "" });
      this.setState({ initiative: "" });
    }
  }


  async componentDidMount() {
    let obj = this.props.obj;

    if ((obj.getJson().lastInit !== undefined && obj.getJson().lastInit !== "")) {
      let jsonObj = obj.getJson();
      // 
      this.setState({ initiative: jsonObj.lastInit });
    }
  }

  async handleAddition() {
    // Generate an array of 10 random numbers
    const randomNumbers = Array.from({ length: (Math.floor(Math.random() * 20) + 1) }, () => Math.floor(Math.random() * 20) + 1);
    // Select a random number from the array
    const randomNumber = randomNumbers[Math.floor(Math.random() * randomNumbers.length)];

    let app = this.props.app;
    let obj = this.props.obj;
    const monsterId = obj?.name + obj?._id;

    let state = app.state;

    let initiativeBonus = obj.getJson().initiative ? parseInt(obj.getJson().initiative) : 0;
    let totalInitiative = randomNumber + initiativeBonus;
    this.setState({ initiative: totalInitiative });

    obj.setCompState({ lastInit: totalInitiative.toString() });

    // let encounterList = app.state.encounterList? app.state.encounterList: [];
    // encounterList.push(obj);

    // await app.state.componentList.setSelectedList("encounterList", encounterList)
    // await app.dispatch({encounterList: encounterList})

    state.opps.cleanPrepareRun({ update: obj });

  }

  async setNewInit(e) {
    let obj = this.props.obj;
    const value = e.target.value === '' ? undefined : e.target.value;
    await obj.setCompState({ lastInit: value });
    this.setState({ initiative: value });
  }


  render() {
    let app = this.props.app;
    let obj = this.props.obj;
    let fontSize = this.props.fontSize;
    let state = app.state;
    let dispatch = app.dispatch;
    let componentList = state.componentList;
    let styles = state.styles;

    return (
      <div style={{ color: styles.colors.colorWhite, width: "32px", transition: "none" }}>
        {obj.getJson().lastInit ? (<div style={{
          display: "flex",
          height: "fit-content",
          width: "fit-content",
          alignSelf: "center",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          textAlign: "center", borderRadius: "15px",
          background: styles.colors.color1 + "aa",
        }}>

          <img src={d20} style={{ width: "22px", position: "absolute", marginTop: "35px", marginLeft: "-1px" }} alt="Clear" title="Clear" />

          <ParentFormComponent obj={this.props.obj} name="lastInit"
            prepareRun={true} maxLength={2}
            onFocus={(e) => e.target.select()}
            inputStyle={{
              width: "2.2rem", color: styles.colors.colorWhite, height: "1.7rem", rows: "1",
              borderRadius: "4px", background: "#00000000", borderWidth: "0px", alignItems: "center", textAlign: "center", justifyContent: "center",
            }}
            style={{ alignSelf: "center", fontSize: fontSize[1], }} />

          {(obj.getJson().lastInit !== undefined && obj.getJson().lastInit !== "") &&
            <div style={{
              ...styles.buttons.buttonClose, color: styles.colors.color5, fontSize: this.props.fontSize[0],
              zIndex: 2, cursor: "pointer", marginTop: "2px", background: styles.colors.colorBlack + "bb", padding: "6px",
            }} title="Clear"
              onClick={
                this.clearInitiative}
            >x</div>}
        </div>
        )
          : (<div>
            <div style={{ color: styles.colors.colorWhite, fontSize: this.props.fontSize[0], cursor: "pointer", width: "32px", }}
              onClick={
                this.handleAddition
              }
            >
              <img src={d20} style={{ width: "32px" }} />

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


      </div>
    );
  }
}


