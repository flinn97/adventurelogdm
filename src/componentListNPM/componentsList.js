
export default class Opps {
    /**
     * Set components 
     * Add an easy way to access lists of components
     */
    components=[];
    dispatch;
    backArray={};
    operationsFactory;
    componentListInterface;
    componentsList={};
    constructor(componentListInterface){
        this.register=this.register.bind(this);
        this.add=this.add.bind(this);
        this.setSelectedList=this.setSelectedList.bind(this);
        this.update=this.update.bind(this);
        this.del=this.del.bind(this);
        this.getComponents=this.getComponents.bind(this);
        this.getComponent=this.getComponent.bind(this);
        this.getOperationsFactory=this.getOperationsFactory.bind(this);
        this.check=this.check.bind(this);
        this.operationsFactory=componentListInterface.getOperationsFactory();
        this.operationsFactory.setRegister(this.register);
        this.sortSelectedList=this.sortSelectedList.bind(this)
        this.componentListInterface=componentListInterface;
        this.dispatch=componentListInterface.dispatch;
        
    }

        /**
     * 
     * @returns all the components inside the tech
     */
    getComponents(){
        return this.components
    }
    async register(obj){
        
        let operate={
            add: this.add,
            update: this.update,
            del: this.del
        }
        ////debugger
        for(const key in obj){
            if(key!=="lastChange" ){
                
           
            if(obj[key].length!==0){
                //debugger
                let backarr = {...this.backArray}
                let backadd = await operate[key](obj[key])
                backarr[key]=backadd;
                this.backArray=backarr;
            }
        }
        }
        ////debugger
        await this.dispatch({ backend:true, backendUpdate:this.backArray});
        this.backArray={}
    }


    /**
     * 
     * @param arr of components to add
     * add one to many components into the list
     * 
     */
    async add(arr){
        for(const key in arr){
            let comp = [...this.components];
           
            await comp.push(arr[key]);
            this.components=comp;
        }
        await this.setComponentsList();
        return arr;
    }


    /**
     * 
     * @param arr of components to update
     * update one to many components into the list
     * 
     */
    async update(arr){
        for(const key in arr){
            if(arr[key][0]){
            let json= arr[key][0].getJson();
                arr[key][0].setJson({...json, ...arr[key][1]})
            }
        }
        return arr
    }


    /**
     * 
     * @param arr of components to add
     * delete one to many components into the list
     * 
     */
    async del(arr){
        let backArr=[];
        for(const key in arr){
            let id = arr[key].getJson()._id;
            this.components = await this.components.filter(data => data.getJson()._id !== id);
            await backArr.push(id);
        }
        await this.setComponentsList();
        return backArr;
    }

 /**
     * 
     * @param arr 
     *  add any amount of raw data as a component into the list.
     */
    async addComponents(arr, backend){
        this.backend=backend;
        let prep = []
        for(const key in arr){
           
            let bool = this.check(arr[key]);
            if(bool){
                
                let comp = await this.componentListInterface.getFactory().getComponent({component:arr[key].type, json: arr[key]});
                if(comp){
                    prep.push(comp);

                }
            }
            else{
                let comp = this.getComponent(arr[key].type, arr[key]._id);
                comp.setJson(arr[key]);
            }
            
        }
        this.components= [...this.components, ...prep];
        await this.setComponentsList();
        if(this.backend){
            this.dispatch({backend: true, backendUpdate:prep });
        }
        this.backArray=true;
    } 

    check(obj){
        let check = this.getComponent(obj.type, obj._id);
        let continue1 =true;
        if(check){
            let c = check.getJson();
            if(Object.keys(c).length !== Object.keys(obj)){
                continue1 = false;
            }
            else if(Object.keys(c).length === Object.keys(obj)){
                for(const key in Object.keys(c)){
                    if(Object.keys(c)[key]!==Object.keys(obj)[key]){
                        continue1 = false;
                    }
                }
            }
            
            else{
                for(const key in c){
                    if(c[key]!==obj[key]){
                        continue1=false;
                    }
                }
            }
            
        }
        return continue1;
    }
    

    getOperationsFactory(){
        return this.operationsFactory;
    }
/**
     * if this is a new type of component that has never been added before add a new array.
     * Otherwise add it to the current array
     */
    setComponentsList(){
        let comps = [...this.components];
        let tempcomps={};
        for(const key in comps){
            let type = comps[key].getJson().type
            if(Object.keys(tempcomps).includes(type)){
                tempcomps[type]=[...tempcomps[type], comps[key]];
            }
            else{
                tempcomps[type]=[comps[key]]
            }
        }
        this.componentsList = tempcomps;
    }

    /**
     * 
     * @param list 
     * @param id 
     * @param filterKey 
     * @returns a filtered list of what was asked for with the default being the full list.
     */
    getList(list, id, filterKey, ){
        let temp = [];
        if(this.componentsList[list]!==undefined){
            temp = [...this.componentsList[list]];
        }
        if(id!==undefined ){
            let key = filterKey!==undefined ? filterKey: "owner"
            temp = temp.filter(data => data.getJson()[key] === id);
        }
        return temp;
    }

    /**
     * 
     * @param list 
     * @param id 
     * @param filterKey 
     * @returns a component of what was asked for with the default being the the first component in the list.
     */
    getComponent(list, id, filterKey, ){
        let temp = [];
        if(this.componentsList[list]!==undefined){
            temp = [...this.componentsList[list]];
        }
        if(id!==undefined ){
            let key = filterKey!==undefined ? filterKey: "_id"
            temp = temp.filter(data => data.getJson()[key] === id);
        }
        return temp[0];
    }
    async setPopup(obj){
        let comp = await this.operationsFactory().operationsFactoryListener({operate: obj.operate, object: obj.object, operation: obj.operation});
        this.dispatch({popupSwitch:obj.popupSwitch, currentComponent:comp})
    }
    async setPopupMulti(obj){
        let comps = [];
        for(const key in obj.object){
            let comp = await this.operationsFactory().operationsFactoryListener({operate: obj.operate, object: obj.object[key], operation: obj.operation});
            comps.push(comp);
        }
        this.dispatch({popupSwitch:obj.popupSwitch, currentComponents:comps})
    }

    clearList( ){
        this.components= [];
        this.componentsList={}; 
    }
    clearSelectedList(id, filterKey,){
        let temp = [...this.components];
        let arr = []
        for(const key in temp){
            if(temp[key].getJson()[filterKey]!==id){
                arr.push(temp[key]);
            }
        }
       
        this.components= [...arr];
        this.setComponentsList(); 
    }

    setSelectedList(type, list){
        this.componentsList[type] = list;
       
    }
    sortSelectedList(type, filterKey, ){
        if(!filterKey){
            return
        }
        if(this.componentsList[type]){
            let list  = [...this.componentsList[type]];
            list = list.sort(function(a, b){return a.getJson()[filterKey] - b.getJson()[filterKey]});
            this.setSelectedList(type, list);
        }
      
        
    }

    
}
