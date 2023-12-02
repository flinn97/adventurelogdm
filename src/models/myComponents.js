import BaseClass from "../componentListNPM/baseClass";
import authService from "../services/auth.js";
import moment from 'moment';


class componentBase extends BaseClass{
    constructor(opps){
        super(opps);
        this.createMPI = this.createMPI.bind(this)
        this.addConnectedItemsMPI = this.addConnectedItemsMPI.bind(this)
        this.createFromMPI=this.createFromMPI.bind(this);
        this.addConnectedItemsLore= this.addConnectedItemsLore.bind(this);
    }
    json;
    startobj={
        date: "",
        _id: "",
        description: "",
        title: "",
        owner: "",
        user: "",
        type: "",
        
        collection:"",
    }

    userInfo={
        about: "",
        picURL:"",
        email: "",
        firstName:"",
        lastName:"",
        password:"",
        phone: "",
        role: "",
        date: "",
        pics: "",
        
        collection:""
    }

    checksandtime={
        checked: {mon: false,tues: false,wed: false,thur: false,fri: false,sat: false,sun: false,},
        time:{mon: '0',tues:'0',wed: '0',thur: '0',fri: '0',sat: '0',sun: '0'},
    }

    /**
     * Have every class be able to make an mpi.
     * @param {*} mpiLore 
     */
    async createMPI(mpiLore, campaignId, componentList, obj){
        let json = {...this.json, _id:undefined, type:"marketplaceItem", ogType: this.json.type, campaignId:campaignId, loreId: mpiLore.getJson().ogType==="lore"?mpiLore.getJson()._id:"", ...obj};
        await this.operationsFactory.jsonPrepare({addmarketplaceItem:json});
        this.addConnectedItemsMPI(mpiLore, campaignId, componentList, obj)
    }
    /**
     * Add connected items to the mpi list
     */
    addConnectedItemsMPI(mpiLore, campaignId, componentList, obj){}

    /**
     * convert mpi back to lore
     * @param {*} lore 
     * @param {*} campaignId 
     * @param {*} componentList 
     * @param {*} obj 
     */
    async createFromMPI(lore, campaignId, componentList, obj){
        let json = { ...obj.getJson(), _id: undefined, type: obj.getJson().ogType, campaignId: campaignId, loreId: lore.getJson().type==="lore"?lore.getJson()._id:"", ...obj };
            await this.operationsFactory.jsonPrepare({ ["add" + obj.getJson().ogType]: json });
            this.addConnectedItemsLore(lore, campaignId, componentList, obj)
    }

    addConnectedItemsLore(mpiLore, campaignId, componentList, obj){
        if(this.json.ogType === "encounter"){
            //use the component list to get all the MPI's that are monsters that have encounter id.
            let monsters = componentList.getList("marketplaceItem", this.json._id , "encounterId")
            
            //get the last component (encounter) in the opps list. 
            let opList = componentList.getOperationsFactory().getUpdater("add")
            let encounter = opList[opList.length - 1]
            //for loop through each mpi and create a monster from the mpi and add the new encounter id
            /**
             *  let json = { ...obj.getJson(), _id: undefined, type: obj.getJson().ogType, campaignId: campaignId, loreId: lore.getJson().type==="lore"?lore.getJson()._id:"", ...obj };
            await this.operationsFactory.jsonPrepare({ ["add" + obj.getJson().ogType]: json });
             */
            for(let monster of monsters){
                let newEncounterId = encounter.getJson().encounterId
                obj = {encounterId:newEncounterId}
                monster.createfromMPI(mpiLore, campaignId, componentList, obj)
            }

        }
        if(this.json.ogType === "map"){
                        //use the component list to get all the MPI's that are monsters that have map id.
                        let monsters = componentList.getList("marketplaceItem", this.json._id, "mapId")
                        //get the last component (map) in the opps list. 
                        let opList = componentList.getOperationsFactory().getUpdater("add")
                        let map = opList[opList.length - 1]
                        //for loop through those like the encounter. Create pins with the the map id.
                        
                        //get the lore that it will be attached.

        }

    }

    

}

class User extends componentBase{
    constructor(opps){
        super(opps);
        this.getPicSrc=this.getPicSrc.bind(this);
        this.getDaysFromNow=this.getDaysFromNow.bind(this);
    }
    json= {
        ...this.userInfo, 
        role:"GM",
        type: "user",
        signUpDate: moment().format('L'),
        paidCustomer: false,

    }
    getDaysFromNow(){
        
        if(this.json.paidCustomer){
            return false;
        }
        else{
            let now = new Date(moment().format('L'));
            let then = new Date(this.json.signUpDate);
            var Difference_In_Time = now.getTime() - then.getTime();
            var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
            let needsToPay = true;
            if(Difference_In_Days<30){
                needsToPay = false;
            }
        
            return needsToPay;
        }
        
        
    }
    async getPicSrc(){
        let pic = await authService.downloadPics(this.json.pics);
        this.json.picURL=pic;
        
    }

}




class Pin extends componentBase{
    constructor(opps){
        super(opps);
        this.getPicSrc=this.getPicSrc.bind(this);
       
    }
    json= {
        
        title: "",
        type: "pin",
        x:"",
        y:"",
        mapId:"",
        loreId:"",
        colorOverlay:"#5F0C0Cae",
        colorFilter:""
        
    } 
    
    async getPicSrc(){
        let pic = await authService.downloadPics(this.json.pics);
        this.json.picURL=pic;
        
    }

}

class Image extends componentBase{
    constructor(opps){
        super(opps);
        this.getPicSrc=this.getPicSrc.bind(this);
        
       
    }
    json= {
        
        name: "",
        type: "image",
        campaignId:"",
        loreId:"",
        picURL: "",
    } 
    
    async getPicSrc(path){
        let pic = await authService.downloadPics(path);
        this.json.picURL=pic;
        
    }
}

class Post extends componentBase{
    constructor(opps){
        super(opps);
        this.getPicSrc=this.getPicSrc.bind(this);
       
    }
    json= {
        
        type: "post",
        campaignId:"",
        picURL: "",
    } 
    
    async getPicSrc(path){
        let pic = await authService.downloadPics(path);
        this.json.picURL=pic;
        
    }
}

class Lore extends componentBase{
    constructor(opps){
        super(opps);
        this.getPicSrc=this.getPicSrc.bind(this);
        this.assign = this.assign.bind(this);
    }

    json= {  
        _id:"",
        type: "lore",
        campaignId:"",
        parentId:{},
        name:"",
        desc:"",
    } 
    
    async getPicSrc(){
        let pic = await authService.downloadPics(this.json.pics);
        this.json.picURL=pic;
        
    }

    async assign(comp){
        comp.setCompState({
            loreId:this.json._id   
        });
        this.operationsFactory.cleanJsonPrepareRun();
    }

}

class InteractiveMap extends componentBase{
    constructor(opps){
        super(opps);
        this.getPicSrc=this.getPicSrc.bind(this);
       
    }
    json= {
        
        mapOwner:"",
        owner: "", //user
        type: "map",
        picURL: "",
        campaignId: "", //campaign
        pics: "",
        loreId:""
    }
    
        
    
    


}

class Map extends componentBase{
    constructor(opps){
        super(opps);
        this.getPicSrc=this.getPicSrc.bind(this);
       
    }
    json= {
        
        title: "",
        type: "map",
        owner:"",
        mapOwner:"",
        picURL: "",
        campaignId: "", //campaign
        pics: "",
        loreId:""
    
    } 
    /**
     * Add connected items to the mpi list OVERIDE
     */
    addConnectedItemsMPI(mpiLore, campaignId, componentList, obj){
        
        let opList = componentList.getOperationsFactory().getUpdater("add")
        let mapMPI = opList[opList.length-1];
        let pins = componentList.getList("pin", this.json._id, "mapId");

        for(let pin of pins){
            
            let mapId = mapMPI.getJson()._id;
            let newMPILore = opList.filter(obj => obj.getJson().ogId===pin.getJson().loreId);
            let loreId = newMPILore[0].getJson()._id;
            let obj = {mapId:mapId, loreId: loreId};
            pin.createMPI(mpiLore, campaignId, componentList, obj)
        }
    }
    
    async getPicSrc(name){
        let pic = await authService.downloadPics(name);
        this.json.picURL=pic;
        
    }

}
class Campaign extends componentBase{
    constructor(opps){
        super(opps);
        this.getPicSrc=this.getPicSrc.bind(this);
       
    }
    json= {
        
        title: "",
        type: "campaign",
        description: "",
        session: "",
        characters: {},
        encounters: {},
        rules: {},
        _id: "",
    }
    
        
    
    async getPicSrc(path){
        let pic = await authService.downloadPics(path);
        this.json.picURL=pic;
        
    }

}
class Encounter extends componentBase{
    constructor(opps){
        super(opps);
        this.getPicSrc=this.getPicSrc.bind(this);
        this.copyEncounter=this.copyEncounter.bind(this);
    }
    json= {
        
        name: "",
        description: "",
        audio: "",
        type: "encounter",
        currentTurn: "99999",
        picURL: "",
        picURLs: {},
        loreId: "",

    }
    
        
    async getPicSrc(path){
        let pic = await authService.downloadPics(path);
        this.json.picURL=pic; 
    }

    async copyEncounter(componentList){
        let newEnc = this.copyComponent(["name"],["Copy of "+ this.getJson().name]);
        let comps = componentList.getList("monster",this.json._id,"encounterId");
        let enc = await this.operationsFactory.cleanJsonPrepare({"addencounter":newEnc});
        enc = enc.add[0];
        for (let obj of comps)
            {
                let monsterJson = obj.copyComponent(["encounterId"],[enc.getJson()._id]); 
                await this.operationsFactory.jsonPrepare({"addmonster":monsterJson});
            };
            this.operationsFactory.run();
            return enc;
    }
   

    /**
     * Add connected items to the mpi list OVERIDE
     */
    addConnectedItemsMPI(mpiLore, campaignId, componentList, obj){
        let opList = componentList.getOperationsFactory().getUpdater("add")
        let encounterMPI = opList[opList.length-1];
        let monsters = componentList.getList("monster", this.json._id, "encounterId").filter(monster=> monster.getJson().role==="monster");

        for(let monster of monsters){
            let obj = {encounterId: encounterMPI.getJson()._id, }
            monster.createMPI(mpiLore, campaignId, componentList, obj)
        }
    }
    
}

class NewNote extends componentBase{
    currentDate = new Date();
    formattedDate = `${this.currentDate.getMonth() + 1}/${this.currentDate.getDate()}/${this.currentDate.getFullYear().toString().slice(-2)}`;
    json= {
        text:"New Note " + this.formattedDate,
        title:"New Note",
        type:"newNote",
    }
}

class Condition extends componentBase{
    json= {
        _id:"",
        monsterId:"",
        name:"",
        description:"",
        icon:"",
        type:"condition",
        roundsActive:"1",
    }
}
class MarketplaceItem extends componentBase{
     constructor(opps){
        super(opps);
        this.getPicSrc=this.getPicSrc.bind(this);
       
    }
    json= {
        type: "marketplaceItem",
        id: "",
    }
    async getPicSrc(path){
        let pic = await authService.downloadPics(path);
        this.json.picURL=pic;
        
    }
}
class Monster extends componentBase{
    constructor(opps){
        super(opps);
        this.getPicSrc=this.getPicSrc.bind(this);
       
    }
    json= {
        name: "",
        initiative: "",
        ac: "",
        currenthp: "",
        maxhp: "",
        statBlockLink: "",
        type: "monster",
        notes: "",
        picURLs: {},
        color: {},
        // primaryColor: "#000000",
        // color0: "blue",
        // color1: "red",
        conditions: {},
        parentId: "",
        otherRounds:0,
        role:"monster",
        campaignId:"",

    }

    setColor(input){
        let keys = Object.keys(this.json.color); // ["selectedInput_1", "selectedInput_2", "selectedInput_3"]
        let newKey = "color_" + keys.length; //selectedInput_4
        this.json.color[newKey] = input;
    }

    getColorList(){
        let con = this.json.color;
        let list = Object.values(con); // ["#000000", "#ffffff", "#44fead"]
        return list;
    }
    
        
    async getPicSrc(path){
        let pic = await authService.downloadPics(path);
        this.json.picURL=pic;
        
    }

}

function forFactory(){
    //camelCase laws plz. Make sure the TYPE is the same as the key value below
    return {user:User,pin:Pin,campaign:Campaign,
        encounter:Encounter,monster:Monster,
        newNote:NewNote,map:Map, post:Post,
        marketplaceItem:MarketplaceItem,
        condition:Condition,
        lore:Lore,image:Image}
}


export {forFactory}