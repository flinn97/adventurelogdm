

/**
 * Create a factory that can add all the components
 */
class Factory {
    operationsFactory;

    factory ={
       

    }
        /**
     * 
     * @param register 
     * register any component to the factory
     */
    registerComponents(register){
        this.factory[register.name]= register.component;
    }
    /**
     * 
     * @param {*} operationsFactory 
     * allow the factory to have an operationsFactory
     */
    setOperationsFactory(operationsFactory){
        this.operationsFactory= operationsFactory
    }
 /**
     * 
     * @param obj 
     * @returns a new component from the data
     * Used to create raw data into class components to be used.
     */
    getComponent(obj){
        //debugger
        if(Object.keys(this.factory).includes(obj.component)){
            let key = obj.component;
            let comp = new this.factory[key](this.operationsFactory);
            comp.setJson({...comp.getJson(), ...obj.json, _id: obj.json?._id? obj.json?._id: Math.floor(Math.random()*100000).toString()});
            return comp;     
        }
        
        
        
        
    }
}
export default Factory;