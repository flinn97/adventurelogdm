import DelItem from './deleteItem';


export default class DelTextItem extends DelItem {
  constructor(props){
    super(props);
  }


  render(){
    let html = <span  className={this.state.cell.class?this.state.cell.class:this.state.theme.MCDelItem} style={this.state.cell.style} onClick={this.del}>{this.props.delText?this.props.delText:"delete"}</span>
    
  return (
    <>
    {this.getHtml(html)}
    </>
  )}
}
