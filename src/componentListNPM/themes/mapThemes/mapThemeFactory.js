import DefaultMap from "./default";
import LegatoMap from './legatoStudentList'


class MapThemeFactory {
    operationsFactory; 

    factory ={
       default: DefaultMap.getMapTheme(),
       LegatoMap: LegatoMap.getMapTheme(),

    }

    registerComponents(register){
        this.factory[register.name]= register.component;
    }
    getMapThemeFactory(){
        return this.factory;
    }

   
}
export default MapThemeFactory;