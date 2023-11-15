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
    let obj = this.props.obj;
    let styles = state.styles;


    return (
      <div 
      style={{...styles.buttons.buttonAdd,padding:"2px 3px",fontSize:styles.fonts.fontSmall}}
      onClick={()=>{
        dispatch({popupSwitch:"connectPlayer", object:obj, operation:"cleanPrepare", operate:"update"})
      }}>
        {"Add "+obj.getJson().name+" to an Adventure"}
      </div>

    )
  }
}
