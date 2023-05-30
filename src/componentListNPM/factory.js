

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
            const currentDate = new Date();
            const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
            const day = currentDate.getDate().toString().padStart(2, '0');
            comp.setJson({...comp.getJson(), ...obj.json, _id: obj.json?._id? obj.json?._id: Math.floor(Math.random()*100000).toString()+month+day});
            return comp;     
        }
        
        
        
        
    }
}
export default Factory;