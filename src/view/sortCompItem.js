import React, { Component } from 'react';

export default class SortCompItem extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }

  }
  componentDidMount(){
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let styles = state.styles;
    console.log(this.props.text)
    if(!state.sortText){
      dispatch({sortText:this.props.text})
    }
  }


  

  render() {
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let styles = state.styles;

    return (
      <div style={{ display: "flex", flexDirection: "row", width:"100px", height:"100px", color:"white"}} onClick={()=>{
        let sortText = state.sortText === this.props.text? this.props.text2: this.props.text
        dispatch({sortText:sortText})}}>
        {state.sortText||this.props.text}
        
      </div>
    )
  }
}

