

class Factory {
    operationsFactory;

    factory ={
       

    }
    registerComponents(register){
        this.factory[register.name]= register.component;
    }
    setOperationsFactory(operationsFactory){
        this.operationsFactory= operationsFactory
    }

    getComponent(obj){
        //debugger
        if(Object.keys(this.factory).includes(obj.component)){
            let key = Object.keys(this.factory).includes(obj.component)? obj.component:"baseClass"
            let comp = new this.factory[key](this.operationsFactory);
            comp.setJson({...comp.getJson(), ...obj.json});
            return comp;     
        }
        
        
        
        
    }
}
export default Factory;