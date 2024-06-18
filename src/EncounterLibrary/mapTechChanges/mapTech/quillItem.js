import ParentFormComponent from '../componentListNPM/componentForms/parentFormComponent';
import BaseClass from './baseClass';


//model
export default class AttributeItem extends BaseClass {
  constructor(props){
    super(props);

  }


  render(){
    let cell = this.state.cell
    let name = cell.name;
    if(!name){
      name = cell
    }
    let html = <ParentFormComponent type={"quill"} 
    style={this.state.cell.style} 
    className={this.state.cell.class?this.state.cell.class:this.state.theme.MCAttributeItem}/>

  return (
    <>{this.getHtml(html)}</>
  )}
  
}

