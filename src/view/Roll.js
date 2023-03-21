import { Component } from 'react';
import "../App.css"


export default class Roll extends Component {
  constructor(props) {
    super(props);

    this.handleAddition= this.handleAddition.bind(this)
    this.state = {
      
    }
  }

  async handleAddition() {
    const randomNumber = Math.floor(Math.random() * 20) + 1;
    let app = this.props.app
    let obj = this.props.obj

    let initiativeBonus = parseInt(obj.getJson().initiative)
    this.setState({initiative: randomNumber + initiativeBonus });
    let encounterList = app.state.encounterList? app.state.encounterList: [];
    encounterList.push(obj);
    
    await app.state.componentList.setSelectedList("encounterList", encounterList)
    await app.dispatch({encounterList: encounterList})
  }


  render() {
  return(
    <div>{this.state.initiative?(<>{this.state.initiative}</>):(<div onClick={this.handleAddition}>roll</div>)}</div>
  )
  }
}


