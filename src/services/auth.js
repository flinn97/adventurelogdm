import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { doc, getDocs, collection, getDoc, updateDoc, addDoc, writeBatch, where, query, setDoc, deleteDoc, onSnapshot, querySnapshot, Timestamp, serverTimestamp, orderBy, limit, getCountFromServer } from "firebase/firestore";
import { db, storage, auth } from '../firbase.config.js';
import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged, getAuth, sendPasswordResetEmail, updateEmail, deleteUser } from "firebase/auth";
import Compressor from "compressorjs";
import weapons from "../models/weapons.js";
import PlayerHome from "../view/pages/playerHome.js";
import Campaign from '../view/pages/campaign';
import Note from '../view/pages/note';
import AdminUser from '../view/admin/adminUser';
import Library from "../view/pages/library.js";


let imageQuality = .5;
class Auth {
    urlEnpoint = "GMS"
    sendForgotPasswordChange(email) {
        const auth = getAuth();
        sendPasswordResetEmail(auth, email)
            .then(() => {
                // Password reset email sent!
                // ..
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    }
    checkIfLoggedIn(){
        
        onAuthStateChanged(auth, async (user)=>{
            if(user){
                return
            }
            else{
                await localStorage.setItem("user", null);
                await localStorage.clear();
                localStorage.setItem("user", undefined);
                let logouser;
                await onAuthStateChanged(auth, (user) => {
                    if (user) {
                        // User is signed in, see docs for a list of available properties
                        // https://firebase.google.com/docs/reference/js/firebase.User
                        logouser = user.uid;
                        // ...
                    }
                })
                if (logouser) {
                    await signOut(auth);
        
                }
                window.location.reload();
            }
        })
    }
    async getCurrentUser() {
        
        let item = localStorage.getItem("user");
        return item;
    }
    async setCurrentUser(student) {
        await localStorage.setItem("user", JSON.stringify(student));
    }
    getJsonDatabase(componentList) {

        let arr = [weapons];
        let arrnames = ["weapon"];
        let data = []
        for (const key in arr) {
            for (const key1 in arr[key].data) {
                for (const key2 in arr[key].data[key1]) {
                    arr[key].data[key1][key2].type = arrnames[key];
                    data.push(arr[key].data[key1][key2]);
                }
            }

        }
        for (const key in data);
        componentList.addComponents(data);

    }

    

    async createInitialStages(componentList,) {
        let list = ["Not Started", "First Email", "Second Email", "Follow up", "Nurture", "Not Interested",]
        let rawData = [];
        let i = 0;
        for (let el of list) {

            rawData.push({ type: "tag", order: i, name: el, _id: Math.floor(Math.random() * 10000).toString() })
            i++

        }

        await componentList.addComponents(rawData, false);


    }

    async getMonsters(componentList, campaignId){
        const components = await query(collection(db, this.urlEnpoint + "users", this.urlEnpoint + "APP", "components"), where("type", '==', "monster"),  where("campaignId"==campaignId));
        let comps = await getDocs(components);
        let rawData1=[]
        for (const key in comps.docs) {
            let data = comps.docs[key].data()
                rawData1.push(data);
        }
        await componentList.addComponents(rawData1, false);
        let monsters = componentList.getList("monster");
        return monsters
    }
    async getMPItems(componentList, userId){
        const components = await query(collection(db, this.urlEnpoint + "users", this.urlEnpoint + "APP", "components"), where("type", '==', "mpItem"),  where("owner" , "==", userId));
        let comps = await getDocs(components);
        let rawData1=[]
        for (const key in comps.docs) {
            let data = comps.docs[key].data()
                rawData1.push(data);
        }
        await componentList.addComponents(rawData1, false);
        let mpItems = componentList.getList("mpItem");
        return mpItems
    }

    async getAllofTypeByUser(componentList, userId, type){
        const components = await query(collection(db, this.urlEnpoint + "users", this.urlEnpoint + "APP", "components"), where("type", '==', type),  where("owner" , "==", userId));
        let comps = await getDocs(components);
        let rawData1=[]
        for (const key in comps.docs) {
            let data = comps.docs[key].data()
                rawData1.push(data);
        }
        await componentList.addComponents(rawData1, false);
        let images = componentList.getList(type);
        return images
    }

    async getCountByCampaingId(id, type){
        let countQuery = await query(collection(db, this.urlEnpoint + "users", this.urlEnpoint + "APP", "components"), where("type",'==',type), where("campaignId", "==", id))
        let count = await getCountFromServer(countQuery)
        return count.data().count
    }

    async deleteAllConditoins(componentList, email){
        
        const components = await query(collection(db, this.urlEnpoint + "users", this.urlEnpoint + "APP", "components"), where("type", '==', "condition"),  where("owner", "==", email));
        let list = await getDocs(components);
        let rawData = [];
        for (const key in list.docs) {
            let data = await list.docs[key].data()
            rawData.push(data);
        }
        await componentList.addComponents(rawData, false);
        let conditions = componentList.getList("condition");
        componentList.getOperationsFactory().cleanPrepareRun({del:conditions})
            
        
    }

    async getByCampaign(componentList, campaignId, attribute, value){
        const components = await query(collection(db, this.urlEnpoint + "users", this.urlEnpoint + "APP", "components"), where("type", '==', "post"),  where("campaignId"==campaignId));
        let comps = await getDocs(components);
        let rawData1=[]
        for (const key in comps.docs) {
            let data = comps.docs[key].data()
                rawData1.push(data);
        }
        await componentList.addComponents(rawData1, false);
        let posts = componentList.getList("post");
        return posts
    }

    //Value = value pair (key value) example: string such as "1231454891"
    //ComponentList = adding to the componentList
    //Attribute = attribute pair always a string "campaignID" or "_id"
    //Type = OPTIONAL this RETURNS the getList, string "monster",
    async firebaseGetter(value, componentList, attribute, type, dispatch, disclude) {
        debugger
        let list = componentList.getComponents();
        let IDlist = [];
        for (const key in list) {
            IDlist.push(list[key].getJson()?._id)
        }
        let rawData1 = [];
        let components = await query(collection(db, this.urlEnpoint + "users", this.urlEnpoint + "APP", "components"), where(attribute, '==', value), orderBy("date"));
        if(disclude){
            components = await query(collection(db, this.urlEnpoint + "users", this.urlEnpoint + "APP", "components"), where(attribute, '==', value), where(disclude.attribute, "!=", disclude.value), orderBy('type'), orderBy("date") );
        }

        if(type){
            let comps = await getDocs(components);
            for (const key in comps.docs) {
                let data = comps.docs[key].data()
                if (!IDlist.includes(data._id)) {
                    rawData1.push(data);
                }
            }
            await componentList.addComponents(rawData1, false);

        }
        else{
            
            let comps1 = await onSnapshot(components, async (querySnapshot) => {
                //
                
                rawData1 = [];
    
    
    
                for (const key in querySnapshot.docs) {
    
                    let data = querySnapshot.docs[key].data()
                    rawData1.push(data);
                }
    
                await componentList.addComponents(rawData1, false);
    
                    if (dispatch) {
                        await dispatch({ rerenderFirebase: true });
                    } 
    
                
    
    
    
    
            });
        }
        


        if (type) {
            if (dispatch) {
                await dispatch({ rerenderFirebase: true });
            } 
            return componentList.getList(type, value, attribute)
        }
        else {
            return true;

        }

    }

    async getPosts(value, componentList, dispatch){
        const components = await query(collection(db, this.urlEnpoint + "users", this.urlEnpoint + "APP", "components"), where("type", '==', "post"), where("campaignId", "==", value), orderBy("date"));
        let comps1 = await onSnapshot(components, async (querySnapshot) => {
            let rawData1 = [];
            for (const key in querySnapshot.docs) {
                let data = querySnapshot.docs[key].data()
                rawData1.push(data);
            }
            await componentList.addComponents(rawData1, false);
                if (dispatch) {
                    await dispatch({ rerenderFirebase: true });
                } 
    })}

    async getuser(email, componentList, dispatch) {
        
        let list = componentList.getComponents();
        let IDlist = [];
        for (const key in list) {
            IDlist.push(list[key].getJson()._id)
        }
        let rawData = [];
        let player = false

        // const components = await query(collection(db, this.urlEnpoint + "users", this.urlEnpoint + "APP", "components"), where('owner', '==', email), orderBy("date"));
        const components = await query(collection(db, this.urlEnpoint + "users", this.urlEnpoint + "APP", "components"), where('_id', '==', email), orderBy("date"));
        let comps = await getDocs(components);
        for (const key in comps.docs) {
            let data = comps.docs[key].data()
            if (!IDlist.includes(data._id)) {
                rawData.push(data);
                if(data.role==="player"){
                    player = true
                }
            }
        }

        const components1 =player?await query(collection(db, this.urlEnpoint + "users", this.urlEnpoint + "APP", "components"), where('owner', '==', email), orderBy("date"))
        : await query(collection(db, this.urlEnpoint + "users", this.urlEnpoint + "APP", "components"), where('type', '==', "campaign"), where('owner', '==', email), orderBy("date"));
        let comps1 = await getDocs(components1);
        for (const key in comps1.docs) {
            let data = comps1.docs[key].data()
            if (!IDlist.includes(data._id)) {
                rawData.push(data);
            }
        }
        const components2 =  await query(collection(db, this.urlEnpoint + "users", this.urlEnpoint + "APP", "components"), where('type', '==', "newNote"), where('owner', '==', email), orderBy("date"));
        let comps2 = await getDocs(components2);
        for (const key in comps2.docs) {
            let data = comps2.docs[key].data()
            if (!IDlist.includes(data._id)) {
                rawData.push(data);
            }
        }

        await componentList.addComponents(rawData, false);
        let user = componentList.getComponent("user");
        if (user) {

            dispatch({ user: user, email: email, start:true });
            //admin@arcanevaultassembly.com
            if(user.getJson()._id==="admin@arcanevaultassembly.com"){
                dispatch({
                    switchCase:[
                        {path:"/", comp:Campaign, name: "Campaigns" },
                        ///Added Notes
                        {path: "/notes", comp:Note, name: "Notes"},
                        ///Added Marketplace
                        {path: "/admin/user", comp:AdminUser, name: "Admin"},
                        {path: "/library", comp:Library, name: "Library"},
                    ]
                })
            }
            if (user.getJson().role !== "GM") {
                dispatch({
                    switchCase: [
                        { path: "/", comp: PlayerHome, name: "Home" },


                    ]
                })
                
            }
        }
    }

    async getCardsInRoutine(id, componentList,) {
        // 

        let list = componentList.getComponents();
        let IDlist = [];
        for (const key in list) {
            IDlist.push(list[key]?.getJson()?._id)
        }
        let rawData = [];
        const components = await query(collection(db, this.urlEnpoint + "users", this.urlEnpoint + "APP", "components"), where('routineID', '==', id), orderBy("date"));
        let comps = await getDocs(components);
        for (const key in comps.docs) {
            let data = comps.docs[key].data()
            if (!IDlist.includes(data._id)) {
                rawData.push(data);
            }
        }
        await componentList.addComponents(rawData, false);

    }

    async GetAllData(email, componentList, dispatch) {

        let rawData = [];
        const components = await query(collection(db, "users"));
        // let comps= await getDocs(components);

        let comps = await getDocs(components);


        rawData = [];
        let emails = [];


        for (const key in comps.docs) {

            let data = comps.docs[key].data()
            if (!emails.includes(data.email)) {
                rawData.push(data);
                emails.push(data.email)

            }
        }
        for (const key in emails) {
            const components1 = await query(collection(db, "users", emails[key], "components"));

            let rawData1 = [];

            // let comps= await getDocs(components);
            let comps1 = await onSnapshot(components1, async (querySnapshot) => {


                rawData1 = [];



                for (const key in querySnapshot.docs) {

                    let data = querySnapshot.docs[key].data()
                    rawData1.push(data);
                }

                await componentList.addComponents(rawData1, false);
                if (emails[key] === emails[emails.length - 1]) {
                    await localStorage.setItem("email", JSON.stringify(email));

                    await dispatch({ email: email, login: false });
                }




            });


        }



    }

    async login(email, password, componentList, dispatch) {

        let user;
        let e;

        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                user = userCredential.user;
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                let errorMessage = error.message;
                let eL = errorMessage.length-1;
                let newString = errorMessage.slice(9,eL);
                
                
                e = {error:newString};
                console.log(e);
            });
        if (user) {
            let saveUser = user;
            dispatch({start:false});

            if (componentList !== undefined && dispatch !== undefined) {
                await localStorage.setItem("user", JSON.stringify(saveUser));
                await this.getuser(email, componentList, dispatch);
            

            }


        }else{
            
            user = e;
        }
        return user;
    }
    async registerStudent(obj, email) {
        await setDoc(doc(db, this.urlEnpoint + 'users', email + "@dreammaker.com"), obj);

    }
    async registerStudentWithEmail(email, obj,) {

        await setDoc(doc(db, 'users', email), obj);

    }
    async getStudentsTeacher(email) {
        const docRef = doc(db, this.urlEnpoint + "users", email);
        const docSnap = await getDoc(docRef);
        return docSnap.data();

    }

   
    
    
    async register(email, password, addToCache) {

        let user;
        await createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            user = userCredential.user;
        }).catch((error) => {
            const errorCode = error.code;
            let errorMessage = error.message;
            let eL = errorMessage.length-1;
            let newString = errorMessage.slice(9,eL);
            
            user = {error:newString};
        })
        if (addToCache) {
            localStorage.setItem("user", JSON.stringify(user));

        }

        return user;
    }

    async logout() {
        await localStorage.clear();
        localStorage.setItem("user", undefined);
        let logouser;
        await onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                logouser = user.uid;
                // ...
            }
        })
        if (logouser) {
            await signOut(auth);

        }
        await localStorage.setItem("user", null);
        window.location.href ="/"
    }
    async uploadPics(file, name, dispatch, quality) {

        new Compressor(file, {
            quality: quality?quality:imageQuality,
            success: async (result) => {
                const storageRef = ref(storage, name);
                await uploadBytes(storageRef, result).then((snapshot) => {
                    if (dispatch) {
                        dispatch({ uploaded: true });

                    }
                    console.log('Uploaded a file!');
                });
            },
            error: (err) => {
                //console.log(err.message);
            },
        });
    }

    async uploadPicsWithoutCompression(file, name) {

       
                const storageRef = ref(storage, name);
                await uploadBytes(storageRef, file).then((snapshot) => {
                   
                    console.log('Uploaded a file!');
             
    })
}

    async downloadPics(newName) {
        let src;
        await getDownloadURL(ref(storage, newName)).then((url) => {

            src = url;
        })
        return src;
    }

    deletePics(newName) {
        //
        const delRef = ref(storage, newName);
        // Delete the file
        deleteObject(delRef).then(() => {
            // File deleted successfully
        }).catch((error) => {
            // Uh-oh, an error occurred!
        });
    }
    /**
         * 
         * @param {*} role 
         * @param {*} id 
         * @param {*} changeData 
         * @returns change any data I want.
         */
    async dispatch(obj, email, dispatch, backendReloader) {
        
        for (const key in obj) {
            let operate = obj[key];
            for (let i = 0; i < operate.length; i++) {
                const delay = ms => new Promise(res => setTimeout(res, ms));
                await delay(1000);
                let component = key !== "del" ? { ...operate[i].getJson() } : operate[i];

                for (const key in component) {

                    if (component[key] === undefined) {
                        component[key] = "";
                    }
                    if(Array.isArray(component[key])){
                        component[key] =""
                    }
                }

                try {
                    if(component.type==="mpItem"){
                        return
                    }

                    switch (key) {
                        case "add":
                            if (email === undefined) {
                                email = component.owner
                            }
                            component.collection = email;
                            if (!component.owner) {
                                component.owner = email
                            }
                            if(component.type ==="user"){
                                component._id = email;
                            }
                            component.date = await serverTimestamp();
                            await setDoc(doc(db, this.urlEnpoint + "users", this.urlEnpoint + "APP", "components", component._id), component);
                            break;
                        case "del":


                            await deleteDoc(doc(db, this.urlEnpoint + "users", this.urlEnpoint + "APP", "components", component));
                            break;
                        case "update":
                            if(component.type !=="post"){
                                component.date = await serverTimestamp();

                            }

                            await updateDoc(doc(db, this.urlEnpoint + "users", this.urlEnpoint + "APP", "components", component._id), component);
                            break;
                    }
                } catch (error) {
                    console.log(error);
                    console.log(component)
                }

            }
        }
        
        if (dispatch) {
            

            dispatch({ dispatchComplete: true, data: obj })

        }
        if(backendReloader){
            window.location.reload();
        }
    }

}

export default new Auth();