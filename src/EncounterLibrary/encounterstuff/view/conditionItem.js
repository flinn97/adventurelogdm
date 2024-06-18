import { Component } from "react";
import BaseClass from "../mapTech/baseClass";

export default class ConditionItem extends BaseClass {
    constructor(props){
      super(props);
  
  
    }
  
  
    render(){
      debugger
      let name = this.state.cell.name;
      if(!name){
        name = this.cell
      }
      let obj = this.state.cell.component;
      let html = <span style={this.state.cell.style} className={this.state.cell.class?this.state.cell.class:this.state.theme.MCTextItem}>{name}</span>
      if(obj.getJson()[name]!==undefined &&obj.getJson()[name]!==""){
      html = <div>{html}<div>{obj.getJson()[name]}</div></div>

      }
    return (
      <>
      {this.getHtml(html)}
      </>
    )}
  }
  