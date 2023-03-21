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

    setCompState(obj, callBack){
    this.json={...this.json, ...obj};
    if(callBack){
        callBack();
    }
    }

    getOperationsFactory(){
        return this.operationsFactory;
    }
    setJson(json){
        this.json=json;
    }
    getJson(){
        return this.json
    }
}