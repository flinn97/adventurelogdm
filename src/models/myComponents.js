import BaseClass from "../componentListNPM/baseClass";
import authService from "../services/auth.js";
import moment from 'moment';
class componentBase extends BaseClass{
    constructor(opps){
        super(opps);

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
    
    
    

}

class User extends componentBase{
    constructor(opps){
        super(opps);
        this.getPicSrc=this.getPicSrc.bind(this);
        this.getDaysFromNow=this.getDaysFromNow.bind(this);
    }
    json= {
        ...this.userInfo, 
        role:"teacher",
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
        

    } 
    
    async getPicSrc(){
        let pic = await authService.downloadPics(this.json.pics);
        this.json.picURL=pic;
        
    }

}
class InteractiveMap extends componentBase{
    constructor(opps){
        super(opps);
        this.getPicSrc=this.getPicSrc.bind(this);
       
    }
    json= {
        
        _idMap: "",
        owner: "",
        type: "map",
        picURL: "",
        campaignOwner: "",
        pics: "",
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
       
    }
    json= {
        _idEncounter: "",
        name: "",
        description: "",
        audio: "",
        type: "encounter",
        picURL: "",
        picURLs: {}

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
        condition: "",
        

    }
    
        
    async getPicSrc(path){
        let pic = await authService.downloadPics(path);
        this.json.picURL=pic;
        
    }

}

function forFactory(){
    //camelCase laws plz. Make sure the TYPE is the same as the key value below
    return {user:User,pin:Pin,interactiveMap:InteractiveMap,campaign:Campaign,encounter:Encounter,monster:Monster}
}


export {forFactory}