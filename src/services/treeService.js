import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { doc, getDocs, collection, getDoc, updateDoc, addDoc, where, query, setDoc, deleteDoc, onSnapshot, querySnapshot, Timestamp, serverTimestamp, orderBy, limit, writeBatch } from "firebase/firestore";
import { db, storage, auth } from '../firbase.config.js';
import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged, getAuth, sendPasswordResetEmail, updateEmail, deleteUser } from "firebase/auth";

class TreeService {
    constructor() {
    }
   

    /**
    * convert entire campaign to marketplace
    * @param {*} lore 
    * @param {*} componentList 
    * 
    * @param type if lore then => loreId, if campaign => campaignId
    */
    async convertToMarketplace2(lore, owner) {

        if (!lore.purchasedItem) {
            //set preliminaries
            let list = [];
            //create a new mpi from campaing
            let mpiJson = { ...lore, _id: Math.floor(Math.random() * 10000000).toString(), purchasedItem: true, owner: owner, ogRef: lore._id, campaignId: "", parentId: "", topItem: true, library: true }
            //get mpi from updater
            list.push(mpiJson);
            const components = await query(collection(db, "GMSusers", "GMSAPP", "components"), where("type", '==', "lore"), where("campaignId", "==", lore._id));
            let comps = await getDocs(components);
            let allLoreList = comps.docs.map(doc => doc.data());
            let refList = [];
            /**
     *  Recurse the tree and prepare marketplace items.
     * @param {*} child 
     * @param {*} componentList 
     */
            const recurseLoreTree2 = async (child) => {
                //get all lores that are children of the lore passed in for the param. from the backend
                let loreList = allLoreList.filter(obj => Object.keys(obj.parentId)[0] === child._id);
                //iterate the children and add marketplace items
                for (let l of loreList) {
                    let parentMPitem = list.find(obj => obj.ogRef === Object.keys(l.parentId)[0]);
                    //create the obj for a new market place item with ogId as l's id and parentId as parentMPitem id
                    let json = { ...l, _id: Math.floor(Math.random() * 10000000).toString(), campaignId: list[0]._id, ogRef: l._id, parentId: { [parentMPitem._id]: parentMPitem.name ? parentMPitem.name : parentMPitem.title ? parentMPitem.title : "" }, owner: owner, purchasedItem: true, };
                    //add the item to list
                    if (!json.reference) {
                        list.push(json);
                    }
                    else {
                        refList.push(json)
                    }


                    recurseLoreTree2(l);
                }
            }

            await recurseLoreTree2(lore);
            for (let l of refList) {
                let newOgId = list.find(lo => lo.ogRef === l.ogId)._id;
                l.ogId = newOgId;
                list.push(l);
            }


            /**
             * get the rest of the items.
             */
            const copyOtherItems = async (type, config) => {
                //could refactor so that we get the whole list instead but keep it here for now
                const itemcomponents = await query(collection(db, "GMSusers", "GMSAPP", "components"), where("type", '==', type), where("campaignId", "==", lore._id));
                let itemcomps = await getDocs(itemcomponents);
                let itemList = itemcomps.docs.map(doc => doc.data());
                for (let item of itemList) {
                    let obj = {};
                    for (let c of config) {
                        obj[c] = list.find(listItem => listItem.ogRef === item[c])._id;

                    }
                    let itemJson = { ...item, _id: Math.floor(Math.random() * 100000).toString(), campaignId: list[0]._id, ogRef: item._id, owner: owner, purchasedItem: true, ...obj }
                    list.push(itemJson);
                }


            }


            //get images relationships: lore, 
            await copyOtherItems("image", ["loreId"]);
            //get maps relationships: lore, 
            await copyOtherItems("map", ["loreId"]);
            //get pins relationhips: lore, maps
            await copyOtherItems("pin", ["mapId", "loreId"]);
            //get encounters relationships: lore
            await copyOtherItems("encounter", ["loreId"]);
            //get monsters relationshipis: 
            
            await copyOtherItems("participant", ["encounterId"]);

            let count = list.length;
            let increment = 450;
            let start = 0;
            let name= 1;
            let listobj={}
            while(count>0){
              let arr = list.slice(start, start+increment);
              start+=increment;
              listobj["batch_"+name]= arr;
              name++;
              count-= increment;

            }
            
            for (let key in listobj) {
                const batch = await writeBatch(db);
                for (let comp of listobj[key]) {
                    const compRef = await doc(db, "GMSusers", "GMSAPP", "components", comp._id);
                    await batch.set(compRef, comp);
                }
                await batch.commit();
            }




        }

    }




};
export default new TreeService();