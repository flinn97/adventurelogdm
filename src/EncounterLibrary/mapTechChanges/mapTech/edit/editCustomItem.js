import EditItem from "./editItem";


export default class EditCustomItem extends EditItem {
  constructor(props){
    super(props);
  }



  render(){
    let html = <span className={this.state.cell.class?this.state.cell.class:this.state.theme.MCCustomEditItem} style={this.state.cell.style} onClick={this.edit}>{this.cell.custom}</span>
  return (
    <>
    {this.getHtml(html)}
    
    </>
  )}
}
