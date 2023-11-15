import { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ConnectToCampaignLink extends Component {
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

    let styles =state.styles;

    return (
      <Link
      style={{...styles.buttons.buttonClear, width:"300px", padding:"5px 10px", 
      textDecoration:"underline 1px "+styles.colors.color9+"55",
      color:styles.colors.color9+"d9",
      borderRadius:"11px", border:"2px solid "+styles.colors.color3}}
      to={"/connecttoadventure/" + obj.getJson().campaignId}>
        Play
      </Link>

    )
  }
}
