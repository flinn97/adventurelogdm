import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { doc, getDocs, collection, getDoc, updateDoc, addDoc, where, query, setDoc, deleteDoc, onSnapshot, querySnapshot, Timestamp, serverTimestamp, orderBy } from "firebase/firestore";
import { db, storage, auth } from '../firbase.config.js';
import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged, getAuth, sendPasswordResetEmail, updateEmail, deleteUser } from "firebase/auth";

import spawnPic from "../pics/runesTest1/0green.png";
import spawnLogo from "../pics/runesTest1/1grey.png";
import likeheart from "../pics/runesTest1/0red.png";
import dragon from "../pics/runesTest1/1green.png";
import beholder from "../pics/runesTest1/0grey.png";
import celestial from "../pics/runesTest1/2green.png";
import keep from "../pics/runesTest1/2grey.png";
import kraken from "../pics/runesTest1/purple.png";


class Auth {
    urlEnpoint = "familyRecipe"

    async getCurrentUser() {
        return localStorage.getItem("user");
    }
    async setCurrentUser(student){
        await localStorage.setItem("user", JSON.stringify(student));
    }
    // getJsonDatabase(componentList){
    //     debugger
    //     let arr = [weapons];
    //     let arrnames=["weapon"];
    //     let data = []
    //     for(const key in arr){
    //         for(const key1 in arr[key].data){
    //             for(const key2 in arr[key].data[key1]){
    //                 arr[key].data[key1][key2].type= arrnames[key];
    //                 data.push(arr[key].data[key1][key2]);
    //             }
    //         }

    //     }
    //     for(const key in data);
    //     componentList.addComponents(data);

    // }

    async getKinstoneMaterial(componentList,) {
        let piclist = [spawnLogo, spawnPic, likeheart, kraken, dragon, beholder, keep, celestial]
        let list = ["obsidian", "petrified wood", "amethyst", "meteorites", "dragonstone", "shadowrock", "thunderstone", "way stone"]
        let i = 0;
        let rawData = [];
        for (let el of list) {
            rawData.push({ type: "element", title: el })
            rawData[i].picURL = piclist[i]
            i++
        }

        await componentList.addComponents(rawData, false);


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

    async firebaseGetter(value, componentList, attribute) {
        let list = componentList.getComponents();
        let IDlist = [];
        for (const key in list) {
            IDlist.push(list[key].getJson()._id)
        }
        let rawData = [];
        const components = await query(collection(db, this.urlEnpoint + "users", this.urlEnpoint + "APP", "components"), where(attribute, '==', value));
        let comps = await getDocs(components);
        for (const key in comps.docs) {
            let data = comps.docs[key].data()
            if (!IDlist.includes(data._id)) {
                rawData.push(data);
            }
        }
        await componentList.addComponents(rawData, false);
        return true;

    }
    async getuser(email, componentList, dispatch) {
        debugger
        dispatch({splash:true});
        let list = componentList.getComponents();
        let IDlist = [];
        for (const key in list) {
            IDlist.push(list[key].getJson()._id)
        }
        let rawData = [];
        let tryQueary = await query(collection(db, this.urlEnpoint + "users", this.urlEnpoint + "APP", "components"), where('email', '==', email));
        let tryComps = await getDocs(tryQueary);
        let student = undefined;
        if (tryComps.docs.length > 0) {
            
            if (!IDlist.includes(tryComps.docs[0].data()._id) && tryComps.docs[0].data().type === "student") {
                student = tryComps.docs[0].data();
                rawData.push(student);
            }
        }
        const components = student ? await query(collection(db, this.urlEnpoint + "users", this.urlEnpoint + "APP", "components"), where('studentID', '==', student._id), orderBy("date")) : query(collection(db, this.urlEnpoint + "users", this.urlEnpoint + "APP", "components"), where('owner', '==', email), orderBy("date"));
        let comps = await getDocs(components);
        for (const key in comps.docs) {
            let data = comps.docs[key].data()
            if (!IDlist.includes(data._id)) {
                rawData.push(data);
            }
        }
        if (student) {
            const coach = await query(collection(db, this.urlEnpoint + "users", this.urlEnpoint + "APP", "components"), where('_id', '==', student.owner));
            let coachcomps = await getDocs(coach);
            for (const key in coachcomps.docs) {
                let data = coachcomps.docs[key].data();
                if (!IDlist.includes(data._id)) {
                    rawData.push(data);
                }
            }
        }
        await componentList.addComponents(rawData, false);
        await componentList.sortSelectedList("assignedCard", "order");

       
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
        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                user = userCredential.user;
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage)
            });
        if (user) {
            let saveUser = user
            
            if(componentList !==undefined && dispatch!== undefined){
                await localStorage.setItem("user", JSON.stringify(saveUser));
                await this.getuser(email, componentList, dispatch);

            }
           
            


        }
        return user;
    }
    async registerStudent(obj, email) {
        await setDoc(doc(db, this.urlEnpoint+'users', email + "@dreammaker.com"), obj);

    }
    async registerStudentWithEmail(email, obj,) {

        await setDoc(doc(db, 'users', email), obj);

    }
    async getStudentsTeacher(email) {
        const docRef = doc(db, this.urlEnpoint+"users", email);
        const docSnap = await getDoc(docRef);
        return docSnap.data();

    }
    async register(email, password, addToCache) {

        let user;
        await createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            user = userCredential.user;
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
        })
        if (addToCache) {
            localStorage.setItem("user", JSON.stringify(user));

        }

        return user;
    }

    async logout() {
        await localStorage.clear();
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
    async uploadPics(pic, name) {
        const storageRef = ref(storage, name);
        await uploadBytes(storageRef, pic).then((snapshot) => {
            console.log('Uploaded a blob or file!');
        });
    }
    async downloadPics(name) {
        let src;
        await getDownloadURL(ref(storage, name)).then((url) => {

            src = url;
        })
        return src;
    }
    deletePics(name) {
        //debugger
        const delRef = ref(storage, name);
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
    async dispatch(obj, email, dispatch) {

        debugger
        for (const key in obj) {
            let operate = obj[key];
            for (let i = 0; i < operate.length; i++) {
                const delay = ms => new Promise(res => setTimeout(res, ms));
                await delay(1000);
                let component = key !== "del" ? operate[i].getJson() : operate[i];
                switch (key) {
                    case "add":
                        component.collection = email;
                        if (!component.owner) {
                            component.owner = email
                        }
                        component.date = await serverTimestamp();
                        await setDoc(doc(db, this.urlEnpoint + "users", this.urlEnpoint + "APP", "components", component._id), component);
                        break;
                    case "del":
                        await deleteDoc(doc(db, this.urlEnpoint + "users", this.urlEnpoint + "APP", "components", component));
                        break;
                    case "update":
                        component.date = await serverTimestamp();
                        await updateDoc(doc(db, this.urlEnpoint + "users", this.urlEnpoint + "APP", "components", component._id), component);
                        break;
                }

            }
        }
        if(dispatch){
            dispatch({dispatchComplete:true, data:obj})

        }
    }

}

export default new Auth();