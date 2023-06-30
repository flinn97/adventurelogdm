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
    let app = this.props.app;
    let obj = this.props.obj;
   
    let state = app.state;
    let dispatch = app.dispatch;
    let componentList = state.componentList;
    let styles =state.styles;

    let initiativeBonus = parseInt(obj.getJson().initiative)
    this.setState({initiative: randomNumber + initiativeBonus });
    let encounterList = app.state.encounterList? app.state.encounterList: [];
    encounterList.push(obj);
    
    await app.state.componentList.setSelectedList("encounterList", encounterList)
    await app.dispatch({encounterList: encounterList})
  }


  render() {
    let app = this.props.app;
    let obj = this.props.obj;
   
    let state = app.state;
    let dispatch = app.dispatch;
    let componentList = state.componentList;
    let styles =state.styles;
  return(
    <div>{this.state.initiative?(<>{this.state.initiative}</>):
    (<div style={{color:styles.colors.colorWhite, fontSize:styles.fonts.fontSmallest, cursor:"pointer"}}
      onClick={this.handleAddition}>Roll Initiative</div>)}</div>
  )
  }
}


