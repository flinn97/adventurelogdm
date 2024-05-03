
import ParentFormComponent from '../componentListNPM/componentForms/parentFormComponent';
import RichTextComponent from '../componentListNPM/componentForms/singleForms/RichTextComponent';
import BaseClass from './baseClass';


//model
export default class RichTextComponentItem extends BaseClass {
  constructor(props){
    super(props);


  }


  render() {
    let cell = this.state.cell
    let name = cell.name;
    if(!name){
      name = cell
    }
    // Create an object for dangerouslySetInnerHTML
    const createMarkup = (htmlString) => {
      return { __html: htmlString };
    };

    let html = (
       
      <span
        style={this.state.cell.style}
        className={this.state.cell.class ? this.state.cell.class : this.state.theme.MCTextItem}
        dangerouslySetInnerHTML={createMarkup(this.state.obj.getJson()[name])}
      ></span>
    //   <ParentFormComponent type={"richEditor"} app={this.props.app} name={name}
    //   theme={"adventureLog"}
    // inputStyle={{ ...cell.inputStyle}}
    // spellCheck={cell.spellCheck}
    // label={cell.label}
    // labelStyle={cell.labelStyle}
    // wrapperStyle={cell.wrapperStyle}
    // className={cell.class?this.state.cell.class:this.state.theme.MCAttributeItem}
    // placeholder={cell.placeholder}
    // style={this.state.cell.style}
    // minLength={cell.minLength}
    // maxLength={cell.maxLength}
    // ></ParentFormComponent>
    )

    return <>{this.getHtml(html)}</>;
  }
}
