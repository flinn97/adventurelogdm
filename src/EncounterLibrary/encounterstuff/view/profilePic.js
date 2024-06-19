import { Component } from "react";
import TokenImage from "../../../view/tokenImage";
import colorService from '../../../services/colorService';

export default class ProfilePic extends Component {
  constructor(props) {
    super(props);


  }




render() {
  let app = this.props.app
  let obj = this.props.obj;


  let allColors = obj.getJson().colors;
  let colors;
  if (allColors) {
    colors = Object.values(allColors);
  } else {
    colors = colorService.randomDarkColors();
    obj.setCompState({colors: colors});
  }



  return (
    // DELETE ALL OF THIS PLACEHOLDER
    <div style={{ marginLeft: "-3vw", width: "fit-content", marginRight: "-1vw", }}>


      <TokenImage pic={this.props.obj.getJson().picURL} app={app} width={96} colors={colors ? colors : ["#ffdead", "#11221122"]} />
  
    </div>)
}
}
