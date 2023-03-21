import { Component } from 'react';
import "../App.css"
import CardPractice from './CardPrac';


export default class PopupPrac extends Component {
  constructor(props) {
    super(props);

    this.state = {
      popup1: false,
      popup2: false,
      popup3: false,
      popup4: false,
      popup5: false,
    }
  }
 


  render() {
    let app = this.props.app;


    return (
      <div><h1>Popups</h1>
     

      <div onClick={()=>{this.setState({popup1:true})}}>Popup1</div>
      <div onClick={()=>{this.setState({popup2:true})}}>Popup2</div>
      <div onClick={()=>{this.setState({popup3:true})}}>Popup3</div>
      <div onClick={()=>{this.setState({popup4:true})}}>Popup4</div>
      <div onClick={()=>{this.setState({popup5:true})}}>Popup5</div>
 {this.state.popup1 && (<CardPractice app={app} type={"biggestCardPopup"} handleClose={()=>{this.setState({popup1:false})}} />)}
      {this.state.popup2 && <CardPractice app={app} type={"biggestCardPopup"} handleClose={()=>{this.setState({popup2:false})}} />}
      {this.state.popup3 && <CardPractice app={app} type={"biggestCardPopup"} handleClose={()=>{this.setState({popup3:false})}} />}
      {this.state.popup4 && <CardPractice app={app} type={"biggestCardPopup"} handleClose={()=>{this.setState({popup4:false})}} />}
      {this.state.popup5 && <CardPractice app={app} type={"biggestCardPopup"} handleClose={()=>{this.setState({popup5:false})}} />}


      

      </div>

    )
  }
}

