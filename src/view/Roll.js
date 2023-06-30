import { Component } from 'react';
import "../App.css"


export default class Roll extends Component {
  constructor(props) {
    super(props);

    this.handleAddition = this.handleAddition.bind(this);
    // this.clearInitiative = this.clearInitiative.bind(this);  
    // Load the initiative roll from local storage with monster's name
    // const storedInitiative = JSON.parse(localStorage.getItem(`initiative-${this.props.obj.name}`));

    this.state = {
      // initiative: storedInitiative || null,
    };
  }



  // // Clear method to delete the specific initiative
  // clearInitiative() {
  //   const monsterName = this.props.obj.name;
  //   localStorage.removeItem(`initiative-${monsterName}`);
  //   this.setState({initiative: null});
  // }


  async handleAddition() {
     // Generate an array of 10 random numbers
  const randomNumbers = Array.from({length: (Math.floor(Math.random() * 20) + 1)}, () => Math.floor(Math.random() * 20) + 1);

  // Select a random number from the array
  const randomNumber = randomNumbers[Math.floor(Math.random() * randomNumbers.length)];

  let app = this.props.app;
  let obj = this.props.obj;

  // Assume obj has a unique id field
  const monsterId = obj?.name+obj?._id;

   let state = app.state;
  let dispatch = app.dispatch;
  let componentList = state.componentList;
  let styles =state.styles;

   let initiativeBonus = parseInt(obj.getJson().initiative);
   let totalInitiative = randomNumber + initiativeBonus;
   this.setState({initiative: totalInitiative });

  //  // Save the initiative roll in local storage with monster's id
  //  localStorage.setItem(`initiative-${monsterId}`, JSON.stringify(totalInitiative));


  let encounterList = app.state.encounterList? app.state.encounterList: [];
  encounterList.push(obj);
  
  await app.state.componentList.setSelectedList("encounterList", encounterList)
  await app.dispatch({encounterList: encounterList})

  dispatch({operate: "setRoll", operation: "JsonPrepare", obj:"monster"})
}


render() {
  let app = this.props.app;
  let obj = this.props.obj;
 
  let state = app.state;
  let dispatch = app.dispatch;
  let componentList = state.componentList;
  let styles =state.styles;

  return(
    <div>
      {this.state.initiative ? (<>{this.state.initiative}</>) :
      (<div style={{color:styles.colors.colorWhite, fontSize:styles.fonts.fontSmallest, cursor:"pointer"}}
        onClick={this.handleAddition}>
          Roll Initiative
      </div>)}
      {/* Add the clear button */}
      {/* <div style={{cursor:"pointer"}} onClick={this.clearInitiative}>Clear Initiative</div> */}
    </div>
  );
}
}


