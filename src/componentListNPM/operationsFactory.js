// import authService from "../services/auth.service";
export default class OppsFactory {
    componentUpdate=[];
    register;
    factory;
    constructor(componentListInterface){

        this.prepare=this.prepare.bind(this);
        this.prepareArray=this.prepareArray.bind(this);
        this.cleanPrepare=this.cleanPrepare.bind(this);
        this.cleanPrepareRun=this.cleanPrepareRun.bind(this);
        this.prepareRun=this.prepareRun.bind(this);
        this.run=this.run.bind(this);
        this.operationsFactoryListener=this.operationsFactoryListener.bind(this);
        this.isArray=this.isArray.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.cleanJsonPrepareRun= this.cleanJsonPrepareRun.bind(this);
        this.setRegister=this.setRegister.bind(this);
        this.jsonPrepare=this.jsonPrepare.bind(this);
        this.cleanJsonPrepare=this.cleanJsonPrepare.bind(this);
        this.componentUpdate=componentListInterface.getUpdater();
        this.factory= componentListInterface.getFactory();
        
    }
    setRegister(register){
        this.register= register;
    }
    getUpdater(register){
        let componentUpdate = this.componentUpdate;
        if(register){
            componentUpdate= this.componentUpdate.componentUpdate[register]
        }
        return componentUpdate;
    }
    getLastPrepare(){
        return this.componentUpdate.componentUpdate.lastChange;
    }
    clearUpdater(){
        this.componentUpdate.componentUpdate.add = [];
        this.componentUpdate.componentUpdate.update = [];
        this.componentUpdate.componentUpdate.del = [];

    }
    /**
     * Prepare one to may objects based upon json sent. Clean the registers before you prepare.
     * Params can be either {[operate]+[yourObject]: {your json}} or an array of multiple of those
     * @param {*} obj 
     */
    async cleanJsonPrepare(obj ){
        //set the updater values to be clean
        let prep = {add:[],update:[], del:[], lastChange:[]};
        for(const key in obj){
            //get key of register
            let splice = this.getSplice(key);
            //if it isn't already an array make it an array
            obj[key]=this.isArray(obj[key]);
            for(let i = 0; i<obj[key].length; i++){
                //create a component
                let comp = await this.factory.getComponent({component:key.substring(splice.length, key.length), json: obj[key][i]})
                //push to register
                prep[splice].push(comp);
                //include an ability to get this as the last change that happened to the registers
                prep.lastChange.push(comp);
            }
        }
        //set register with the updated information
        this.getUpdater().setJson(prep);
        //return what was updated.
        return prep;
    }
    removeFromRegister(obj){
     
  
        let reg = this.getUpdater();
        let add = [...reg.componentUpdate.add]
        let del = [...reg.componentUpdate.del]
        let update = [...reg.componentUpdate.update]
        let list = add.includes(obj)?add:update.includes(obj)?update:del.includes(obj)?del:undefined;
        let key =add.includes(obj)?'add':update.includes(obj)?'update':del.includes(obj)?'del':undefined;
        if(list!==undefined){
            let n = list.indexOf(obj);
           list.splice(n, 1);

           this.getUpdater().setSelectedRegister(key, list);
        }

        
    
    }
    /**
     * Prepare one to may objects based upon json sent.
     * Params can be either {[operate]+[yourObject]: {your json}} or an array of multiple of those
     * @param {*} obj 
     */
    async jsonPrepare(obj ){
        let prep = await this.getUpdater().getJson();
        prep.lastChange=[];
        for(const key in obj){
            //get key of register
            let splice = this.getSplice(key);
            //if it isn't already an array make it an array
            obj[key]=this.isArray(obj[key]);
            for(let i = 0; i<obj[key].length; i++){
                //create a component
                let comp = await this.factory.getComponent({component:key.substring(splice.length, key.length), json: obj[key][i]});
                //push to register
                prep[splice].push(comp);
                //include an ability to get this as the last change that happened to the registers
                prep.lastChange.push(comp);
            }
        }
        //set register with the updated information
        this.getUpdater().setJson(prep);
        //return what was updated.
        return prep;
    }
    
    /**
     * Prepare one to may objects based upon json sent.
     * Params can be either {[operate]+[yourObject]: int} || {[operate]+[yourObject]: classObject} || an array of multiple of those
     * @param {*} obj 
     * @param {*} obj 
     */
    async prepare(obj){
        //get the updater
        let prep = await this.componentUpdate.getJson();
        //prepare for lastChange resiter to include the last change.
        prep.lastChange=[];
        //Prepare object to be an array of new class objects in needed
        let preparation = await this.prepareArray(obj);
        
        //update register withh new array
        for(const key in prep){
            if(key!=='lastChange'){
                if(preparation[key].length!==0){
                    prep[key]=[...prep[key], ...preparation[key]];
                    prep.lastChange=[...prep.lastChange, ...preparation[key]];
                    
                }
            }
            
        }
        //return the update to the register
        return preparation;
        
    }
    /**
     * Prepare one to may objects based upon json sent.
     * Params can be either {[operate]+[yourObject]: int} || {[operate]+[yourObject]: classObject} || an array of multiple of those
     * @param {*} obj 
     * @param {*} obj 
     */
    async cleanPrepare(obj){
        //get the updater
        let prep = await this.componentUpdate.getJson();
        //prepare for lastChange resiter to include the last change.
        prep.lastChange=[]
         //Prepare object to be an array of new class objects in needed
        let preparation = await this.prepareArray(obj);
        //update register with new array and clean the register before you do.
        for(const key in prep){
            if(key!=='lastChange'){
                prep[key]=[...preparation[key]];
                prep.lastChange=[...prep.lastChange, ...preparation[key]];
            }
                
        }
        //return the update to the register
        return preparation;
        
    }
    async prepareRun(obj){
        await this.prepare(obj);
        await this.run(); 
    }
    async jsonPrepareRun(obj){
        await this.jsonPrepare(obj);
        await this.run(); 
    }
    async cleanJsonPrepareRun(obj){
        //
        await this.cleanJsonPrepare(obj);
        await this.run(); 
    }
    async cleanPrepareRun(obj){
        await this.cleanPrepare(obj);
        await this.run(); 
    }
    async run(option, clean){
        //
        if(option !==undefined && !option.pageX){
            let obj={
                clean: this.cleanPrepareRun,
                notClean: this.prepareRun
            }
            await obj[clean===true?"clean":"notClean"](option);
        }
        let comps= {...this.componentUpdate.getJson()}
        this.componentUpdate.setJson({add:[], update:[], del:[]});
        await this.register(comps);  
        
    }

    async prepareArray(obj){
        let newObj={add:[],update:[],del:[]};
            for (const key in obj){
            let updateArr=[];
            let getSplice = await this.getSplice(key);
            let i = obj[key];
            let bool =Number.isInteger(i)
            updateArr=bool?updateArr:[...this.isArray(i)];
            if(bool){
                updateArr = [...newObj[getSplice]];
                for(let j=0; j<i; j++){
                    let component = key.substring(getSplice.length, key.length);
                    let comp = await this.factory.getComponent({component:component})
                    updateArr.push(comp);
                    newObj[getSplice]=updateArr;
                } 
            }
            else {
                newObj[getSplice]=updateArr;
            }
    }
        return newObj
    }

    getSplice(word){
        if( word.includes("add")){
            word="add";
        }
        else if(word.includes("update")){
            word="update";
        }
        else if(word.includes("del")){
            word="del";
        }
        return word;
    }


    handleChange = (event) => {
        
        let update = this.getUpdater().getJson();
        let { name, value } = event.target;
        let key = this.getSplice(name);
        let valueupdate = name.substring(key.length, name.length);
        if (value==="false"){
            value = false;
        }
        if (value === "true"){
            value  = true;
        }
        update[key][0].getJson()[valueupdate]=value;
    }
    componentDispatch(obj){
        //
        let newObj={};
        let objkey;
        for(const key in obj){
            objkey = this.getSplice(key);
            let valueupdate = key.substring(objkey.length, key.length)
            newObj[valueupdate]=obj[key];
        }
        
        let update = this.getUpdater().getJson();
        update[objkey][0].setJson({...update[objkey][0].getJson(), ...newObj});
    }



    isArray(obj){
        let arr;
        if(Number.isInteger(obj)){
            arr = obj;
        }
        else{
            arr = Array.isArray(obj)? obj: [obj];
        }
        return arr
    }
    


    async operationsFactoryListener(obj){
        // 
        let updater = this.getUpdater().getJson();
        if(obj.operation!=="run"){
            let operation= obj.operation!== undefined? this[obj.operation]: this.cleanPrepare;
            let operate =(!obj.operate.includes("add") &&!obj.operate.includes("del") && !obj.operate.includes("update"))? "add"+obj.operate :obj.operate;
            let object = 1;
            object =obj.object!==undefined?  obj.object: object;
            await operation({[operate]: object});
            updater = this.getUpdater().getJson();
        }
        else{
            this[obj.operation]();
        }
        return updater;
    }
}
