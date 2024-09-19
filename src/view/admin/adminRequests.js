import { Component } from 'react';
import { Link } from 'react-router-dom';
import AdminRequestCard from './adminRequestCard';

//this is for partner request lists
export default class AdminRequests extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }



  render() {
    let app = this.props.app;
    let state = app.state;
    let styles =state.styles;
    const linkStyle = {fontFamily:"inria", fontWeight:"600", color:styles.colors.color3, 
      textDecoration:"none", padding:"6px 10px", borderRadius:"11px", backgroundColor:styles.colors.color2}

    return (
      <div style={{height:"100%", marginBottom:"14vmin", display:"flex", flexDirection:"column", justifyContent:"center", width:"100%"}} >
        <div style={{
        display:"flex", flexDirection:"row", 
        justifyContent:"space-around", color:styles.colors.colorWhite, width:"60%", 
      marginBottom:"2px", 
      background: "linear-gradient(to right, "+styles.colors.color1+"82, "+styles.colors.color2+" )", borderRadius:"11px"
      }}>
          <Link style={linkStyle} to="../admin/users">Users</Link>
          <Link style={linkStyle} to="../admin/partners">Partners</Link>
          <Link style={{...linkStyle, backgroundColor:styles.colors.color8+"78", color:"white"}} to="../admin/requests">Requests</Link>
          <Link style={linkStyle} to="../admin/submissions">Submissions</Link>
        </div>
        <AdminRequestCard app={app} type="cardWithTab" options={{tabType:"bigCardBorderless", cardType:"biggestCard"}} />
     
     
     
    
      </div>

    )
  }
}

