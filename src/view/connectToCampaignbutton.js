import { Component } from 'react';


export default class ConnectToCampaignButton extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }
 


  render() {
    let app = this.props.app;
    let state = app.state;
    let dispatch= app.dispatch;
    let obj = this.props.obj


    return (
      <div onClick={()=>{
        dispatch({popupSwitch:"connectPlayer", object:obj, operation:"cleanPrepare", operate:"update"})
      }}>
        Connect To An Adventure
      </div>

    )
  }
}
