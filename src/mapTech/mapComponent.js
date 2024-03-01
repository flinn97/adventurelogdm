import BaseClass from './baseClass';


//this could be updated to use the baseclass getHtml
export default class MapComponentItem extends BaseClass {
  constructor(props){
    super(props);


    this.state={

    }
  }


  render(){
    let props = this.props
    let list = props.list
    let cells = props.cells;
    let factory = props.interface.getFactory();
    let themeFactory = props.interface.getThemeFactory();
    let theme = props.theme? props.theme: "defaultColumn"
    theme = themeFactory.getComponent(theme)
   

  return (
    <div className= {props.mapContainerClass? props.mapContainerClass: theme.MCMapContainer} style={{...this.props.mapContainerStyle}} >
        {list.map((obj, index)=>
        <div className={props.mapSectionClass? props.mapSectionClass: theme.MCMapSection} style={{...this.props.mapSectionStyle}} key = {index}>
            {cells.map((cell, i)=>{
             let type = cell.type
            console.log(type);
             if(!type){
                let arr = ["del", "edit", "img"]

                 type=arr[arr.indexOf(cell)]
                 if(!type){
                    type = "attribute";
                    let attribute = obj.getJson&& obj?.getJson()[cell];
                    if(!attribute){
                        type="text"
                     }

                 }
                 
             }

             let p = {obj:obj, ...props, interface: this.interface, cell:cell, theme:props.theme};
             
            return <>{factory.getComponent(type, p)}</>}
            )}
            </div>
        )}
    </div>
  )}
}


