import trash from '../pics/trashStill.png';
import DelItem from './deleteItem';


export default class DelIconItem extends DelItem {
  constructor(props){
    super(props);
  }


  render(){
    let cell = this.state.cell;
    let html = <img className={this.state.cell.class?this.state.cell.class:this.state.theme.MCDelImgItem} style={this.state.cell.style} onClick={this.del} src={cell.imgSrc?cell.imgSrc:trash} />
  return (
    <>
    {this.getHtml(html)}
    </>
  )}
}
