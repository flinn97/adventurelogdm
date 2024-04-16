import Factory from "./factory";
import OppsFactory from "./operationsFactory";
import Opps from "./componentsList";
import Updater from "./updater";

export default class ComponentListInterface{
    factory;
    updater;
    operationsFactory;
    dispatch;
    constructor(dispatch){
        debugger
        this.getFactory= this.getFactory.bind(this);
        this.createComponentList= this.createComponentList.bind(this);
        this.getOperationsFactory= this.getOperationsFactory.bind(this);
        this.getUpdater= this.getUpdater.bind(this);

        this.dispatch=dispatch;
        
    }

    getFactory(){
        debugger
        if(this.factory===undefined){
            this.factory= new Factory(this);
        }
        return this.factory;
    }
    createComponentList(){
        debugger
        return new Opps(this)
    }
    getOperationsFactory(){
        debugger
        if(this.operationsFactory===undefined){
            this.operationsFactory= new OppsFactory(this);
            
            this.factory.setOperationsFactory(this.operationsFactory);
        }
        return this.operationsFactory;
    }
    getNewOperationsFactory(){
        debugger
            let opps= new OppsFactory(this);

        return opps;
    }
    getUpdater(){
        debugger
        if(this.updater===undefined){
            this.updater =new Updater();
        }
        return this.updater;

    }

}