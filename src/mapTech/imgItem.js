
import BaseClass from './baseClass';

//model
export default class ImgItem extends BaseClass {

  constructor(props) {
    super(props);

  }


  render() {
    var image = this.state.obj.getJson()[this.state.cell?.src ? this.state.cell?.src : "picURL"];
    var placeholder = this.state.cell.placeholder?this.state.cell.placeholder:undefined
    
    let html = <img style={{ userSelect:"none", pointerEvents:"none", ...this.state.cell?.style,}} alt='AVA' className={this.state.cell?.class ? this.state.cell?.class : this.state.theme.MCImgItem}
      src={image?image:placeholder} />


    return (
      <>
        {this.getHtml(html)}
      </>
    )
  }

}
