import defaultStyles from "./defaultStyles";
// defaultSylesPhone
import LegatoStyles from "./legatoStyles";
import SpawnStyles from "./spawnStyles";


class ThemeFactory {
    operationsFactory;

    factory ={
       legato: LegatoStyles.getStylesByScreenSize(),
       spawn: SpawnStyles.getStylesByScreenSize(),
       default: defaultStyles.getStylesByScreenSize(),
       //phone: defaultSylesPhone


    }
    registerComponents(register){
        this.factory[register.name]= register.component;
    }
    getThemeFactory(){
        return this.factory;
    }
    getComponent(obj){
        //debugger
        if(Object.keys(this.factory).includes(obj.component)){
            let key = Object.keys(this.factory).includes(obj.component)? obj.component:"legato";
            let comp = new this.factory[key](this.operationsFactory);
            comp.setJson({...comp.getJson(), ...obj.json});
            return comp;     
        }
        
        
        
        
    }
}
export default ThemeFactory;