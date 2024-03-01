import BaseClass from '../baseClass';
//model
export default class AddComponentButton extends BaseClass {
  constructor(props){
    super(props);
    this.createObjType = this.createObjType.bind(this);


  }

  createObjType(){
    
    let componentList = this.interface.getComponentList();
    let opps = componentList.getOperationsFactory();
    let type = this.props.addType;
    opps.cleanJsonPrepareRun({["add"+type]:{type:type, mapId:this.props.mapId}});
  }


  render(){
    
  return (
    <div onClick={this.createObjType} style={this.props.style} className={this.p?.class?this.p?.class:this.state.theme.MCAddButton}>
      {this.props.text? (<>{this.props.text}</>):(<>+ Add Item </>)}
    </div>
  )}
}
