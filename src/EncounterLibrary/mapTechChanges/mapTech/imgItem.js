
import BaseClass from './baseClass';

//model
export default class ImgItem extends BaseClass {

  constructor(props) {
    super(props);

  }


  render() {
    let html = <img style={this.state.cell?.style} className={this.state.cell?.class ? this.state.cell?.class : this.state.theme.MCImgItem}
      src={this.state.obj.getJson()[this.state.cell?.src ? this.state.cell?.src : "picURL"]} />


    return (
      <>
        {this.getHtml(html)}
      </>
    )
  }

}
