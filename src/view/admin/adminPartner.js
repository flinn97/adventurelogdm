import { Component } from 'react';
import { Link } from 'react-router-dom';
import AdminPartnerCard from './adminPartnerCard';

// This is for partner list
export default class AdminPartner extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }



  render() {
    let app = this.props.app;
    let state = app.state;
    let styles =state.styles;
   

    return (
      <div style={{height:"100%", marginBottom:"14vmin", display:"flex", flexDirection:"column", justifyContent:"center", width:"100%"}} >
      <div style={{display:"flex", flexDirection:"row",}}>
          <Link to="../admin/users">Users</Link>
          <Link to="../admin/partners">Partners</Link>
          <Link to="../admin/requests">Requests</Link>
          <Link to="../admin/submissions">Submissions</Link>
        </div>
        <AdminPartnerCard app={app} type="cardWithTab" options={{tabType:"bigCardBorderless", cardType:"biggestCard"}} />
     
     
     
    
      </div>

    )
  }
}

