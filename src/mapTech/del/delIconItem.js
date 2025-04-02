import trash from '../pics/trashStill.png';
import DelItem from './deleteItem';


export default class DelIconItem extends DelItem {
  constructor(props){
    super(props);
  }


  render(){

   
    let cell = this.state.cell;
    let html = <img draggable="false"
    title={cell.title||"Delete"}
    className={cell.class?cell.class:this.state.theme.MCDelImgItem} 
    style={cell.style} 
    onClick={this.del} 
    src={cell.imgSrc||trash} />
  return (
    <>
    {this.getHtml(html)}
    </>
  )}
}
