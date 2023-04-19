/**
 * Create a base class the defines some basic functions and data
 */
export default class BaseClass {
    operationsFactory;
    json;
    constructor(oppsFactory){
        this.setJson=this.setJson.bind(this);
        this.getJson=this.getJson.bind(this);
        this.setCompState=this.setCompState.bind(this);
        this.getOperationsFactory=this.getOperationsFactory.bind(this)
        this.operationsFactory=oppsFactory;
    }
  /**
     * 
     * @param obj 
     * @param callBack 
     * Works exactly like setState in react only I include a function for a callback if needed
     */
    setCompState(obj, callBack){
    this.json={...this.json, ...obj};
    if(callBack){
        callBack();
    }
    }

    /**
     * 
     * @returns operations factory for the class
     */
    getOperationsFactory(){
        return this.operationsFactory;
    }

     /**
     * 
     * @param json 
     * set the data
     */
    setJson(json){
        this.json=json;
    }

     /**
     * get the data if to preserve private json var
     */
    getJson(){
        return this.json
    }
}