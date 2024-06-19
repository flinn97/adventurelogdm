import { Component } from "react";
import TokenImage from "../../../view/tokenImage";
import toolService from "../../../services/toolService";
import bookCursor from '../../../pics/bookmarklet.png';
// import { Link } from "react-router-dom";

export default class StatBlockLinking extends Component {
    constructor(props){
      super(props);
  
  
    }
  

  
    render(){
      let app= this.props.app
      let obj = this.props.obj;

      let stat = toolService.convertStringToLink(obj?.getJson().statBlockLink)

      return(
       
      <div style={{width:"fit-content", marginLeft:"10.25vw", bottom:"20px", position:"absolute"}} title={stat}>
        <a target="_blank" rel="noopener noreferrer" href={stat}>
        <img src={bookCursor} className="tiny-ico" style={{cursor:"pointer", padding:"2px"}}/>
        </a>
        </div>)
      }
  }
  