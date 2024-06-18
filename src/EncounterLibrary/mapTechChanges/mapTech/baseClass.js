import { Component } from 'react';
import { Link } from 'react-router-dom';


export default class BaseClass extends Component {
  constructor(props){
    super(props);
    
    this.getHtml = this.getHtml.bind(this);
    
    this.cell = props.cell;
    this.obj = props.obj;
    this.interface= props.interface;
    this.themeFactory = this.interface.getThemeFactory();
    if(this.cell){
      if(this.obj.getJson){
        this.useId = this.cell.useId===false?"":this.cell.useId===undefined?this.obj.getJson()._id: this.obj.getJson()[this.cell.useId];
      }
    }
    let theme = props.theme? this.themeFactory.getComponent(props.theme):this.themeFactory.getComponent("defaultColumn") 
   
    this.state={
      theme: theme,
      cell:this.cell,
      obj:this.obj,
      useId:this.useId,
      
    }
  }


/**
 * update props if they change
 * @param {*} props 
 * @param {*} state 
 */
  componentDidUpdate(props,state){
    if(props!==this.props){
      
      
      this.cell = this.props.cell;
      this.obj = this.props.obj;
      if(this.cell){
        if(this.obj.getJson){
        this.useId = this.cell.useId===false?"":this.cell.useId===undefined?this.obj.getJson()._id: this.obj.getJson()[this.cell.useId];
        }
      }
      this.setState({...this.state, cell:this.cell, obj:this.obj, useId:this.useId })
    }
  }


  getHtml(option){
    let clicks = undefined
    if(this.cell.func){
      clicks = this.cell.func
    }
    let cellStyle = clicks? {...this.props.cellStyle, cursor:"pointer"}: this.props.cellStyle;
    let linkClass = this.props.linkClass?this.props.linkClass:this.state.theme?.MCLink;
    let cellClass = this.props.cellClass?this.props.cellClass:this.state.theme?.MCCell;

    return <>{this.cell.hasLink?(<Link style={this.props.linkStyle} className={linkClass} to={this.cell.to + this.useId}>{option}</Link>
    ):(<span style={cellStyle} className={cellClass} onClick={()=>{
      if(clicks){
        clicks(this.state.obj)
      }}}>{option}</span>)}</>

  }

  


  render(){
  return (
    <>
    </>
  )}
}
