import React, {Component} from "react";
import BaseClass from "../../../mapTech/baseClass";


export default class MonsterListWrapper extends BaseClass {
    constructor(props){
      super(props);
  
  
    }
  
    render(){
     
        let props = this.props
        let list = props.list
        let cells = props.cells;
        let factory = props.interface.getFactory();
        let themeFactory = props.interface.getThemeFactory();
        let theme = props.theme? props.theme: "defaultColumn";
        let currentEncounter = props.app.state.currentEncounter
        let currentParticipant = currentEncounter.getJson().currentParticipant
        theme = themeFactory.getComponent(theme)
       
    
      return (
        <div className= {props.mapContainerClass? props.mapContainerClass: theme.MCMapContainer} style={{...this.props.mapContainerStyle}} >
            {list.map((obj, index)=>
            <div className={props.mapSectionClass? props.mapSectionClass: theme.MCMapSection+(currentParticipant === obj.getJson()._id ?" gradient-animation":"")} 
            style={{...this.props.mapSectionStyle, border:currentParticipant === obj.getJson()._id && "2px solid #1E90FF33", boxShadow:currentParticipant === obj.getJson()._id && "-2px -0px 1px #1E90FF88"}} key = {index}>
              
                {cells.map((cell, i)=>{
                 let type = cell.type
                
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
      )
      
    }
  }
  