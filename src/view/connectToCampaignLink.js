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


    return (
      <Link to={"/connecttoadventure/" + obj.getJson().campaignId}>
        link
      </Link>

    )
  }
}
