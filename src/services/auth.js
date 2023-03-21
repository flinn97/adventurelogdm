import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { doc, getDocs, collection, getDoc, updateDoc, addDoc, where, query, setDoc, deleteDoc, onSnapshot, querySnapshot, Timestamp, serverTimestamp, orderBy } from "firebase/firestore";
import { db, storage, auth } from '../firbase.config.js';
import weapons from "../models/weapons.js"; 
import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged, getAuth,sendPasswordResetEmail, updateEmail, deleteUser } from "firebase/auth";
class Auth {

    async getCurrentUser() {
        return localStorage.getItem("user");
    }
    getJsonDatabase(componentList){
        debugger
        let arr = [weapons];
        let arrnames=["weapon"];
        let data = []
        for(const key in arr){
            for(const key1 in arr[key].data){
                for(const key2 in arr[key].data[key1]){
                    arr[key].data[key1][key2].type= arrnames[key];
                    data.push(arr[key].data[key1][key2]);
                }
            }
            
        }
        for(const key in data);
        componentList.addComponents(data);

    }

    async GetAllData(email, componentList, dispatch) {
        
        let rawData = [];
        const components = await query(collection(db, "users"));
        // let comps= await getDocs(components);

        let comps = await getDocs(components);

            
            rawData = [];
            let emails=[];


            for (const key in comps.docs) {

                let data = comps.docs[key].data()
                if(!emails.includes(data.email)){
                    rawData.push(data);
                    emails.push(data.email)

                }
            }
            for(const key in emails){
                const components1 = await query(collection(db, "users", emails[key], "components"));

                let rawData1 = [];

                // let comps= await getDocs(components);
                let comps1 = await onSnapshot(components1, async (querySnapshot) => {
        
                    
                    rawData1 = [];
        
                    
        
                    for (const key in querySnapshot.docs) {
        
                        let data = querySnapshot.docs[key].data()
                        rawData1.push(data);
                    }
                    debugger
                    await componentList.addComponents(rawData1, false);
                        if(emails[key] === emails[emails.length-1]){
                            await localStorage.setItem("email", JSON.stringify(email));

                            await dispatch({ email: email,login:false });
                        }
                        
                    
                    
        
                });
        

            }
            

       
    }
   
    async login(email, password, componentList, dispatch) {
        if(email!=="taylor@flinnapps.com"){
            return
        }
        // debugger
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
            if(user){
                let saveUser =  user
                await this.GetAllData(email, componentList, dispatch);
                
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
    async dispatch(obj, email) {

        //debugger
        for (const key in obj) {
            let operate = obj[key];
            for (let i = 0; i < operate.length; i++) {
                const delay = ms => new Promise(res => setTimeout(res, ms));
                await delay(1000);
                let component = key !== "del" ? operate[i].getJson() : operate[i];
                switch (key) {
                    case "add":
                        component.collection = email;
                        await setDoc(doc(db, 'DNDusers', "DNDAPP", 'components', component._id), component);
                        break;
                    case "del":
                        await deleteDoc(doc(db, 'DNDusers', "DNDAPP", 'components', component));
                        break;
                    case "update":
                        await updateDoc(doc(db, 'DNDusers', "DNDAPP", 'components', component._id), component);
                        break;
                }

            }
        }
    }

}
export default new Auth();