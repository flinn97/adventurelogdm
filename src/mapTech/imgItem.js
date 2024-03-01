
import BaseClass from './baseClass';

//model
export default class ImgItem extends BaseClass {

  constructor(props) {
    super(props);

  }


  render() {
    let html = <img style={{ userSelect:"none", pointerEvents:"none", ...this.state.cell?.style,}} alt='AVA' className={this.state.cell?.class ? this.state.cell?.class : this.state.theme.MCImgItem}
      src={this.state.obj.getJson()[this.state.cell?.src ? this.state.cell?.src : "picURL"]} />


    return (
      <>
        {this.getHtml(html)}
      </>
    )
  }

}
