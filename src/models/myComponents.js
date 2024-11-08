import { collection } from "firebase/firestore";
import BaseClass from "../componentListNPM/baseClass";
import auth from "../services/auth.js";
import authService from "../services/auth.js";
import moment from 'moment';
import toolService from "../services/toolService.js";
import idService from "../componentListNPM/idService.js";


class componentBase extends BaseClass {
    constructor(opps) {
        super(opps);
        this.createMPI = this.createMPI.bind(this)
        this.addConnectedItemsMPI = this.addConnectedItemsMPI.bind(this)
        this.createFromMPI = this.createFromMPI.bind(this);
        this.addConnectedItemsLore = this.addConnectedItemsLore.bind(this);
        this.createUUID=this.createUUID.bind(this);
    }
    json;
    startobj = {
        date: "",
        _id: "",
        description: "",
        title: "",
        owner: "",
        user: "",
        type: "",

        collection: "",
    }

    userInfo = {
        about: "",
        picURL: "",
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        phone: "",
        role: "",
        date: "",
        pics: "",

        collection: ""
    }

    checksandtime = {
        checked: { mon: false, tues: false, wed: false, thur: false, fri: false, sat: false, sun: false, },
        time: { mon: '0', tues: '0', wed: '0', thur: '0', fri: '0', sat: '0', sun: '0' },
    }

    createUUID(length){
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789';
        var charactersLength = characters.length;
        for(var i =0; i<length; i++){
            result +=characters.charAt(Math.floor(Math.random()*charactersLength));
        }
        return result;
    }

    /**
     * Have every class be able to make an mpi.
     * @param {*} mpiLore 
     */
    async createMPI(mpiLore, campaignId, componentList, obj) {
        let json = { ...this.json, _id: undefined, type: "marketplaceItem", ogType: this.json.type, campaignId: campaignId, loreId: mpiLore.getJson().ogType === "lore" ? mpiLore.getJson()._id : "", ...obj };
        await this.operationsFactory.jsonPrepare({ addmarketplaceItem: json });
        this.addConnectedItemsMPI(mpiLore, campaignId, componentList, obj)
    }
    /**
     * Add connected items to the mpi list
     */
    addConnectedItemsMPI(mpiLore, campaignId, componentList, obj) { }

    /**
     * convert mpi back to lore
     * @param {*} lore 
     * @param {*} campaignId 
     * @param {*} componentList 
     * @param {*} obj 
     */
    async createFromMPI(lore, campaignId, componentList, obj) {
        let json = { ...this.json, _id: undefined, type: this.json.ogType, campaignId: campaignId, loreId: lore.getJson().type === "lore" ? lore.getJson()._id : "", ...obj };
        await this.operationsFactory.jsonPrepare({ ["add" + this.json.ogType]: json });
        this.addConnectedItemsLore(lore, campaignId, componentList, obj)
    }

    async addConnectedItemsLore(mpiLore, campaignId, componentList, obj) {
        if (this.json.ogType === "encounter") {
            //use the component list to get all the MPI's that are monsters that have encounter id.
            let monsters = componentList.getList("marketplaceItem", this.json._id, "encounterId")
            //get the last component (encounter) in the opps list. 
            let opList = componentList.getOperationsFactory().getUpdater("add")
            let encounter = opList[opList.length - 1]
            //for loop through each mpi and create a monster from the mpi and add the new encounter id
            /**
             *  let json = { ...obj.getJson(), _id: undefined, type: obj.getJson().ogType, campaignId: campaignId, loreId: lore.getJson().type==="lore"?lore.getJson()._id:"", ...obj };
            await this.operationsFactory.jsonPrepare({ ["add" + obj.getJson().ogType]: json });
             */
            for (let monster of monsters) {
                let newEncounterId = encounter.getJson()._id
                obj = { encounterId: newEncounterId }
                await monster.createfromMPI(mpiLore, campaignId, componentList, obj)
            }

        }
        if (this.json.ogType === "map") {

            //use the component list to get all the MPI's that are monsters that have map id.
            let marketPlacePins = componentList.getList("marketplaceItem", this.json._id, "mapId");
            //get the last component (map) in the opps list. 
            let opList = componentList.getOperationsFactory().getUpdater("add")
            let map = opList[opList.length - 1];
            //for loop through those like the encounter. Create pins with the the map id.
            for (let pin of marketPlacePins) {
                let lores = opList.filter(obj => obj.getJson().ogId === pin.getJson().loreId);
                let lore = lores[0];
                let newMapId = map.getJson()._id;
                let loreId = lore.getJson()._id;
                obj = { mapId: newMapId, loreId: loreId }
                //
                await pin.createFromMPI(mpiLore, campaignId, componentList, obj)

            }


        }

    }



}

class User extends componentBase {
    constructor(opps) {
        super(opps);
        this.getPicSrc = this.getPicSrc.bind(this);
        this.getDaysFromNow = this.getDaysFromNow.bind(this);
    }
    json = {
        ...this.userInfo,
        role: "GM",
        type: "user",
        handle:"",
        signUpDate: moment().format('L'),
        paidCustomer: false,
        firstTime:true

    }
    getDaysFromNow() {

        if (this.json.paidCustomer) {
            return false;
        }
        else {
            let now = new Date(moment().format('L'));
            let then = new Date(this.json.signUpDate);
            var Difference_In_Time = now.getTime() - then.getTime();
            var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
            let needsToPay = true;
            if (Difference_In_Days < 30) {
                needsToPay = false;
            }

            return needsToPay;
        }


    }
    async getPicSrc() {
        let pic = await authService.downloadPics(this.json.pics);
        this.json.picURL = pic;

    }

}




class Pin extends componentBase {
    constructor(opps) {
        super(opps);
        this.getPicSrc = this.getPicSrc.bind(this);
        this.pushIcon = this.pushIcon.bind(this);

    }
    json = {

        title: "",
        type: "pin",
        x: "",
        y: "",
        mapId: "",
        loreId: "",
        referencePin: false,
        colorOverlay: "#5F0C0Cae",
        colorFilter: "",
        
    }

    async getPicSrc(path, state) {
        let pic = await authService.downloadPics(path);
        this.json.picURL = pic;
        this.json.iconImage = pic;
//
        await this.pushIcon(state, this.json.picURL, this.json.campaignId )
    }

    async pushIcon(state, imgSrc, id) {
        
        const compList = await state.componentList.getList("icon", id, "campaignId");
        
        let pic = imgSrc;
        let json = {...this.json, picURL:pic, type: "icon", color:"", date:"", referencePin:"", _id:undefined};

    /// I ran through // and everything looked fine
        if (compList.length > 29) {
            // Delete the first item in the array
            // keeps recent uploads to a min
            await this.operationsFactory.cleanPrepareRun({ del: state.componentList.getList("icon", id, "campaignId")[0] });
            
        }
        this.operationsFactory.cleanJsonPrepareRun({"addicon": {...json, }})
    }

}

class Image extends componentBase {
    constructor(opps) {
        super(opps);
        this.getPicSrc = this.getPicSrc.bind(this);


    }
    json = {

        name: "",
        type: "image",
        campaignId: "",
        loreId: "",
        picURL: "",
    }

    async getPicSrc(path) {
        let pic = await authService.downloadPics(path);
        this.json.picURL = pic;

    }
}

class Post extends componentBase {
    constructor(opps) {
        super(opps);
        this.getPicSrc = this.getPicSrc.bind(this);

    }
    json = {

        type: "post",
        campaignId: "",
        picURL: "",
    }

    async getPicSrc(path) {
        let pic = await authService.downloadPics(path);
        this.json.picURL = pic;

    }
}

class Lore extends componentBase {
    constructor(opps) {
        super(opps);
        this.getPicSrc = this.getPicSrc.bind(this);
        this.assign = this.assign.bind(this);
    }

    json = {
        _id: "",
        type: "lore",
        campaignId: "",
        parentId: {},
        topLevel: false,
        reference: false,
        ogId: "",
        name: "",
        desc: "",
        handoutText: "",
    }

    async getPicSrc() {
        let pic = await authService.downloadPics(this.json.pics);
        this.json.picURL = pic;

    }

    async assign(comp) {
        comp.setCompState({
            loreId: this.json._id
        });
        this.operationsFactory.cleanJsonPrepareRun();
    }

}

class InteractiveMap extends componentBase {
    constructor(opps) {
        super(opps);
        this.getPicSrc = this.getPicSrc.bind(this);

    }
    json = {

        mapOwner: "",
        owner: "", //user
        type: "map",
        picURL: "",
        campaignId: "", //campaign
        pics: "",
        loreId: ""
    }






}

class Map extends componentBase {
    constructor(opps) {
        super(opps);
        this.getPicSrc = this.getPicSrc.bind(this);

    }
    json = {

        title: "",
        type: "map",
        owner: "",
        mapOwner: "",
        picURL: "",
        campaignId: "", //campaign
        pics: "",
        loreId: ""

    }
    /**
     * Add connected items to the mpi list OVERIDE
     */
    addConnectedItemsMPI(mpiLore, campaignId, componentList, obj) {

        let opList = componentList.getOperationsFactory().getUpdater("add")
        let mapMPI = opList[opList.length - 1];
        let pins = componentList.getList("pin", this.json._id, "mapId");

        for (let pin of pins) {

            let mapId = mapMPI.getJson()._id;
            let newMPILore = opList.filter(obj => obj.getJson().ogId === pin.getJson().loreId);
            let loreId = newMPILore[0].getJson()._id;
            let obj = { mapId: mapId, loreId: loreId };
            pin.createMPI(mpiLore, campaignId, componentList, obj)
        }
    }

    async getPicSrc(name) {
        let pic = await authService.downloadPics(name);
        this.json.picURL = pic;

    }

}
class Campaign extends componentBase {
    constructor(opps) {
        super(opps);
        this.getPicSrc = this.getPicSrc.bind(this);

    }
    json = {

        title: "",
        type: "campaign",
        description: "",
        session: "",
        characters: {},
        encounters: {},
        rules: {},
        _id: "",
    }



    async getPicSrc(path) {
        let pic = await authService.downloadPics(path);
        this.json.picURL = pic;

    }

    async getPlayers(compList, dispatch) {
        
        let monsters = compList.getList("participant");
        let pcs = monsters.filter(
            (monster) => {
                return monster.getJson().role === "player"
            })
            dispatch({
                campaignPlayers: pcs,
              })
        return pcs
    }

}
class Encounter extends componentBase {
    constructor(opps) {
        super(opps);
        this.getPicSrc = this.getPicSrc.bind(this);
        this.copyEncounter = this.copyEncounter.bind(this);
        this.getParticipantInitHtml= this.getParticipantInitHtml.bind(this);
    }
    json = {

        name: "",
        description: "",
        audio: "",
        type: "encounter",
        currentTurn: "99999",
        picURL: "",
        picURLs: {},
        loreId: "",
        audioLink: "",
        currentParticipant: "",
        ruleset: "5e",

    }

    /**
     * get html to display for the encounter intitiative
     * @param {*} componentList 
     */
    async getParticipantInitHtml(componentList){
       await componentList.sortSelectedList("participant","initiative",true);

        let pList = componentList.getList("participant", this.json._id, "encounterId");
        let html ="";
        //build html from the participant list
        for(let p of pList){
            let init = p.getJson().initiative;
            if(parseInt(init)!==999){
                html += `<p>${p.getJson().name}: ${init}</p><br>`
            }
            
        }
        return html
        


    }


    async getPicSrc(path) {
        let pic = await authService.downloadPics(path);
        this.json.picURL = pic;
    }

    async copyEncounter(componentList, loreId, campaignId, owner) {
        
        let id = loreId ? loreId : "";
        campaignId = campaignId||""
        let newEnc = await this.copyComponent(["name", "loreId", "campaignId", "owner"], ["Copy of " + this.getJson().name, id, campaignId, owner]);
        let comps = await componentList.getList("participant", this.json._id, "encounterId");
        if(this.json.campaignId!==campaignId){
            comps = await auth.firebaseGetter(this.json._id, componentList, "encounterId", "participant");
        }
        let enc = await this.operationsFactory.cleanJsonPrepare({ "addencounter": newEnc });
        enc = enc.add[0];
        for (let obj of comps) {
            let monsterJson = await obj.copyComponent(["encounterId", "campaignId"], [enc.getJson()._id, campaignId]);
            await this.operationsFactory.jsonPrepare({ "addparticipant": monsterJson });
        };
        await this.operationsFactory.run();
        return enc;
    }

    // async addCampaignPlayers(playerList, id) {

    //     let comps = await playerList;
    //     let encPlayer = []

    //     if (comps) {
    //         for (let obj of comps) {
    //             ///TAYLOR help me get this right
    //             let monsterJson = await obj.copyComponent(["encounterId", "role",], [id, "",],);
    //             await this.operationsFactory.jsonPrepare({ "": monsterJson });
    //             let p = await this.operationsFactory.getUpdater("add")[0];
    //             encPlayer.push(p);
    //             // await this.operationsFactory.run();
    //         };
    //     }
    //     return encPlayer
    // }
    async addCampaignPlayers(playerList,) {

        let comps = playerList;
        let encPlayer = [];

        if (comps) {
            for (let obj of comps) {
                let monsterJson = await obj.copyComponent(["encounterId", "role",], [this.json._id, "",],);
                await this.operationsFactory.jsonPrepare({ "addparticipant": monsterJson });
                let p = await this.operationsFactory.getUpdater("add")[0];
                encPlayer.push(p);
                await this.operationsFactory.run();
            };
        }
        return encPlayer
    }

    getNextNextP(sortedParticipants, index) {
        let participant = undefined;
        for (let i = index + 2; i < sortedParticipants.length; i++) {
            if (sortedParticipants[i].getJson().rollState) {
                participant = sortedParticipants[i];
                break;
            }
        }
        return participant;
    }
    getNextP(sortedParticipants, firstTime, componentList) {
        //use the find method to find index of the currentParticipant id in the participant list
        let p = sortedParticipants.find((obj) => { return obj.getJson()._id === this.json.currentParticipant })
        let index = sortedParticipants.indexOf(p);
        let participant = sortedParticipants[index + 1];
        if (!participant.getJson().rollState) {

            participant = this.getNextNextP(sortedParticipants, index);

            if (!participant) {
                this.json.currentParticipant = "";
                if (!firstTime) {
                    this.getHighestParticipant(componentList);
                    return
                }

            }

        }
        return participant.getJson()._id
    }

    getHighestParticipant(componentList) {

        let participants = componentList.getList("participant", this.json._id, "encounterId")
        //use the .sort method to organize the participants by the highest initiative first
        let sortedParticipants = participants.sort((a, b) => {

            let initiativeA = parseInt(a.getJson().initiative);
            let initiativeB = parseInt(b.getJson().initiative);

            // Check if either initiative is not a number
            if (isNaN(initiativeA)) initiativeA = Number.MAX_SAFE_INTEGER; // Treat non-numeric values as maximum
            if (isNaN(initiativeB)) initiativeB = Number.MAX_SAFE_INTEGER;

            return initiativeB - initiativeA; // Sort descending
        })
        //let participant id = the list of participants first element
        let participantId = sortedParticipants[0].getJson()._id

        //if this.json.currentParticipant != ""
        if (this.json.currentParticipant !== "" && sortedParticipants[sortedParticipants.length - 1].getJson()._id !== this.json.currentParticipant) {

            participantId = this.getNextP(sortedParticipants, false, componentList)

        }
        if (!sortedParticipants.find(obj => obj.getJson()._id === participantId)?.getJson().rollState) {
            this.json.currentParticipant = participantId;
            participantId = this.getNextP(sortedParticipants, true, componentList);

        }


        if (sortedParticipants.find(obj => obj.getJson()._id === participantId)?.getJson().rollState) {
            //set json currentParticipant with the participant id var
            this.json.currentParticipant = participantId
            //this.operationsFactory.cleanPrepareRun(update: this) 
            this.operationsFactory.cleanPrepareRun({ update: this });
            let p = componentList.getComponent("participant", participantId, "_id");
            return p

        }



    }
    clearParticipant() {
        this.json.currentParticipant = ""
        this.json.inSession=false;
        this.operationsFactory.cleanPrepareRun({ update: this })
    }

   

}

class NewNote extends componentBase {
    currentDate = new Date();
    formattedDate = `${this.currentDate.getMonth() + 1}/${this.currentDate.getDate()}/${this.currentDate.getFullYear().toString().slice(-2)}`;
    json = {
        text: "New Note " + this.formattedDate,
        title: "New Note",
        type: "newNote",
    }
}

class Condition extends componentBase {

    json = {
        _id: "",
        monsterId: "",
        name: "",
        description: "",
        icon: "",
        type: "condition",
        roundsActive: "1",
    }
}




class Approval extends componentBase{
    json={
        campaignId: "",
        title: "",
        description: "",
        promotional: "",
        price: "",
        selector:"",
        mptype:"mpCampaign",
        tags:"",
        type: "approval",
        gameSystem: "",
        indexes: {},
        readyForDistribution:false
    }

    async getPicSrc(path) {
        let pic = await authService.downloadPics(path);
        this.json.picURL = pic;

    }

    deleteByIndex(index){
        let id = this.json.indexes["index"+index];
        let obj ={};
        for(let key in this.json.picURLs){
            if(key!==id){
                obj[key]=this.json.picURLs[key];
            }

        }
        this.json.picURLs = obj;
        let indexes= {}
        
        for(let key in this.json.indexes){
            let i = key[key.length - 1];
            if(parseInt(i)>parseInt(index)){
                let str = "index"+(parseInt(i)-1);
                indexes[str]=this.json.indexes[key];
            }
            else if(parseInt(i)!==parseInt(index)){
                indexes[key] = this.json.indexes[key];
            }
        }
        this.json.indexes=indexes

    }

    async getPicSrcMedia(path, index){
        
        let obj={};
        let indexes = {}
        for(const key in path){
            let pic = await auth.downloadPics(path[key]);
            let id = "media"+this.createUUID(3)
            obj[id]= pic;
            indexes["index"+index] = id;

        }
        obj = {...obj, ...this.json.picURLs}
        indexes= {...indexes, ...this.json.indexes};
        this.json.indexes = indexes
        
        this.json.picURLs = obj
        
    }
}

class Monster extends componentBase {
    constructor(opps) {
        super(opps);
        this.getPicSrc = this.getPicSrc.bind(this);

    }
    json = {
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
        otherRounds: 0,
        role: "monster",
        campaignId: "",

    }

    setColor(input) {
        let keys = Object.keys(this.json.color); // ["selectedInput_1", "selectedInput_2", "selectedInput_3"]
        let newKey = "color_" + keys.length; //selectedInput_4
        this.json.color[newKey] = input;
    }

    getColorList() {
        let con = this.json.color;
        let list = Object.values(con); // ["#000000", "#ffffff", "#44fead"]
        return list;
    }


    async getPicSrc(path) {
        let pic = await authService.downloadPics(path);
        this.json.picURL = pic;

    }

}
class Participant extends componentBase {
    constructor(opps) {
        super(opps);
        this.getPicSrc = this.getPicSrc.bind(this);
        this.updateConditions=this.updateConditions.bind(this);

    }

    json = {
        type: "participant",
        name: "",
        initiative: "",
        armor: "",
        hitPoints: "",
        statBlockLink: "",
        note: "",
        encounterId: "",
        role:"monster",
        _id: "",
    }

    updateConditions(ruleset) {
        //get the list of conditions from the ruleset save in conditionList var
        let conditionList =ruleset.getJson().conditionList.split(',');
        //do Object.keys(this.json) save in a variable called jsonList
        let jsonList = Object.keys(this.json)
        //for everything in the ruleset conditionList:
        for (let condition of conditionList) {
            //if jsonList.includes(something from the ruleset) and its not undefined nor ""
            if (jsonList.includes(condition)) {
                if (this.json[condition] !== "" && this.json[condition] !== undefined) {
                    //increment the value on that condition
                    this.json[condition] = (parseInt(this.json[condition])+1).toString()
                }



            }
        }
        //after the for loop update the participant.
        
        this.operationsFactory.cleanPrepareRun({ update: this })
    }

    async getPicSrc(path) {
        let pic = await authService.downloadPics(path);
        this.json.picURL = pic;

    }
}
class Ruleset extends componentBase {
    json = {
        type: "ruleset",
        conditionList: "Blinded,Burning,Concentration,Charmed,Deafened,Exhaustion,Frightened,Grappled,Incapacitated,Invisible,Paralyzed,Petrified,Poisoned,Prone,Restrained,Stunned,Unconcious,Dead",
        name: "5e",


    }
}

class Icon extends componentBase {
    constructor(opps) {
        super(opps);
        this.getPicSrc = this.getPicSrc.bind(this);

    }
    json = {   
        type: "icon",
        picURL:"",
        campaignId: "",
    }

    async getPicSrc(path) {
        let pic = await authService.downloadPics(path);
        this.json.picURL = pic;

    }

    }

class Partner extends componentBase{
    json={
        type: "partner",
        name: "",
        email:"",
        userId:"",
        description:"",
    }
}

class PartnerRequest extends componentBase{
    json={
        type: "partnerRequest",
        name: "",
        email:"",
        userId:"",
        description:"",
    }
}
class MarketplaceItem extends componentBase {
    constructor(opps) {
        super(opps);
        this.getPicSrc = this.getPicSrc.bind(this);

    }
    json = {
        type: "mpItem",
        id: "",
    }
    async getPicSrc(path) {
        let pic = await authService.downloadPics(path);
        this.json.picURL = pic;

    }
}
class Viewer extends componentBase{
    json={
        type:"viewer",
        html:"",
        campaignId:""
    }
}
class Compendium extends Campaign{
    json={
        ...this.json,
        type:"compendium",
    }
}
function forFactory() {
    //camelCase laws plz. Make sure the TYPE is the same as the key value below
    return {user:User,pin:Pin,campaign:Campaign,
        encounter:Encounter,monster:Monster,
        newNote:NewNote,map:Map, post:Post,
        marketplaceItem:MarketplaceItem, viewer:Viewer,
        condition:Condition, icon:Icon,         compendium:Compendium,
        lore:Lore,image:Image, approval:Approval, partner:Partner, partnerRequest:PartnerRequest, mpItem: MarketplaceItem, participant: Participant, ruleset: Ruleset}
}


export { forFactory }