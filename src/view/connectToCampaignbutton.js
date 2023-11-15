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
      <div className='hover-btn'
      style={{ ...styles.buttons.buttonAdd, padding:"4px 8px",  width:"200px",
      
      fontSize:styles.fonts.fontSmall, textAlign:"center",
      
      borderRadius:"11px", border:"2px solid "+styles.colors.color3}}
      onClick={()=>{
        dispatch({popupSwitch:"connectPlayer", object:obj, operation:"cleanPrepare", operate:"update"})
      }}>
        {/* {"Connect "+obj.getJson().name} */}
        Connect
      </div>

    )
  }
}
