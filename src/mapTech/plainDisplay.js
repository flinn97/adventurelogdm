import BaseClass from './baseClass';


//model
export default class PlainDisplay extends BaseClass {
  constructor(props){
    super(props);

  }


  render(){

    let html = <span style={this.state.cell.style} className={this.state.cell.class?this.state.cell.class:this.state.theme.MCAttributeItem}>{this.state.obj}</span>

  return (
    <>{this.getHtml(html)}</>
  )}
  
}
