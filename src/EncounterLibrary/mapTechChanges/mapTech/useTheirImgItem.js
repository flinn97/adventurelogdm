
import ImgItem from './imgItem';

//model
export default class UseTheirImgItem extends ImgItem {

    constructor(props){
      super(props);
    }
  
  
    render(){
      let html = <img style={this.state.cell.style} className={this.state.cell.class?this.state.cell.class:this.state.theme.MCImgItem} src={this.state.cell.src}/>
      

    return (
      <>
      {this.getHtml(html)}
      </>
    )}
    
  }
  