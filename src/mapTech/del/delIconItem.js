import trash from '../pics/trashStill.png';
import DelItem from './deleteItem';


export default class DelIconItem extends DelItem {
  constructor(props){
    super(props);
  }


  render(){
    let cell = this.state.cell;
    let title = this.state.cell.title;
    let html = <img title={title} className={this.state.cell.class?this.state.cell.class:this.state.theme.MCDelImgItem} style={this.state.cell.style} onClick={this.del} src={cell.imgSrc?cell.imgSrc:trash} />
  return (
    <>
    {this.getHtml(html)}
    </>
  )}
}
