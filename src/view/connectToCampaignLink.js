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
      style={{...styles.buttons.buttonClear, width:"300px"}}
      to={"/connecttoadventure/" + obj.getJson().campaignId}>
        Adventure Log
      </Link>

    )
  }
}
