import defaultStyles from "./defaultStyles";
import LegatoStyles from "./legatoStyles";
import SpawnStyles from "./spawnStyles";
import dreamMakerStyles from "./dreamMakerStyles";
import adventureLogStyles from "./adventureLogStyles";

class ThemeFactory {
    operationsFactory;

    factory ={
       legato: LegatoStyles.getStylesByScreenSize(),
       spawn: SpawnStyles.getStylesByScreenSize(),
       default: defaultStyles.getStylesByScreenSize(),
       dreamMaker: dreamMakerStyles.getStylesByScreenSize(),
       adventure: adventureLogStyles.getStylesByScreenSize(),

    }
    registerComponents(register){
        this.factory[register.name]= register.component;
    }
    getThemeFactory(){
        return this.factory;
    }

    getComponent(obj){
        //
        if(Object.keys(this.factory).includes(obj.component)){
            let key = Object.keys(this.factory).includes(obj.component)? obj.component:"legato";
            let comp = new this.factory[key](this.operationsFactory);
            comp.setJson({...comp.getJson(), ...obj.json});
            return comp;     
        }
        
        
        
        
    }
}
export default ThemeFactory;