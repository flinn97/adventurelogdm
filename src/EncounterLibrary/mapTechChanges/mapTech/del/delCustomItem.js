import DelItem from './deleteItem';


export default class DelCustomItem extends DelItem {
  constructor(props){
    super(props);
  }


  render(){
    let html = <span className={this.state.cell.class?this.state.cell.class:this.state.theme.MCCustomDelItem} style={this.state.cell.style} onClick={this.del}>{this.state.cell.custom}</span>
  return (
    <>
    {this.getHtml(html)}
    </>
  )}
}
