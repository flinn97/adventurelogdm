import BaseClass from '../baseClass';


export default class EditItem extends BaseClass {
  constructor(props){
    super(props);
    this.edit = this.edit.bind(this);

  }

  /**
   * delete or send a popup dispatch according to user preference.
   */
  edit(){
    let app = this.props.app;
    app.dispatch({popupSwitch:"edit", currentComponent:this.obj})

  }


  render(){
    let html = <span className={this.state.cell.class?this.state.cell.class:this.state.theme.MCEditItem} style={this.state.cell.style} onClick={this.edit}>edit</span>
  return (
    <>
    {this.getHtml(html)}
    
    </>
  )}
}
