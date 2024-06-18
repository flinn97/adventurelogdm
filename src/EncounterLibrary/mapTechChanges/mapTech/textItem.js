import BaseClass from './baseClass';


//model
export default class AttributeItem extends BaseClass {
  constructor(props){
    super(props);


  }


  render(){

    let name = this.state.cell.name;
    if(!name){
      name = this.cell
    }

    let html = <span style={this.state.cell.style} className={this.state.cell.class?this.state.cell.class:this.state.theme.MCTextItem}>{name}</span>
  return (
    <>
    {this.getHtml(html)}
    </>
  )}
  
}
