import { doc, getDocs, collection, where, query, setDoc, serverTimestamp, } from "firebase/firestore";
import { db } from '../firbase.config.js';





/**
     * convert entire campaign to marketplace
     * @param {*} lore 
     * @param {*} componentList 
     * 
     * @param type if lore then => loreId, if campaign => campaignId
     */
async function convertToMarketplace2(lore, owner) {
    
    if (!lore.purchasedItem) {
        //create a new mpi from campaing
        let mpiJson = { ...lore, _id: Math.floor(Math.random() * 1000000).toString(), purchasedItem: true, owner: owner, ogId: lore._id, parentId: "" }
        mpiJson.date = await serverTimestamp();
        await setDoc(doc(db, "GMSusers", "GMSAPP", "components", mpiJson._id), mpiJson);
        await recurseLoreTree2(lore, owner, lore._id, mpiJson._id, mpiJson._id).then(async response => {
            //fix for top level don't have to wait for this one either.
            await copyType("image", lore._id, mpiJson._id, owner, ["loreId"]);
            //fix for top level 
            await copyType("map", lore._id, mpiJson._id, owner, ["loreId"]);
            //fix for top level 
            await copyType("encounter", lore._id, mpiJson._id, owner, ["loreId"]);
            
            //these two don't have to wait for each other ba
            debugger
            await copyType("monster", lore._id, mpiJson._id, owner, ["encounterId"]);
            
            await copyType("pin", lore._id, mpiJson._id, owner, ["mapId", "loreId"]);
            
        })




    }

}


/**
 *  Recurse the tree and prepare marketplace items.
 * @param {*} lore 
 * @param {*} componentList 
 */
async function recurseLoreTree2(lore, owner, topLevelId, newTopLevelId, parentId) {
    //get all lores that are children of the lore passed in for the param.
    let loreList = [];
    const components = await query(collection(db, "GMSusers", "GMSAPP", "components"), where("type", '==', "lore"), where("campaignId", "==", topLevelId));
    let comps = await getDocs(components);
    for (const key in comps.docs) {
        let data = comps.docs[key].data()
        loreList.push(data);
    }
    loreList = loreList.filter(obj => Object.keys(obj.parentId).includes(lore._id));
    //iterate the children and add marketplace items
    for (let l of loreList) {

        //create the obj for a new market place item with ogId as l's id and parentId as parentMPitem id
        let json = { ...l, _id: Math.floor(Math.random() * 1000000).toString(), campaignId: newTopLevelId, ogId: l._id, parentId: { [parentId]: "" }, owner: owner };
        json.date = await serverTimestamp();
        await setDoc(doc(db, "GMSusers", "GMSAPP", "components", json._id), json);
        await recurseLoreTree2(l, owner, topLevelId, newTopLevelId, json._id);
    }
}


/**
 * 
 * @param {*} type of object you are making copies for
 * @param {*} campaignId the campaign the object belongs to
 * @param {*} newCampaignId the new campaign id to apply
 * @param {*} owner new ownership
 * @param {*} attribute if the objects are connected to other objects we can get the objects this way.
 */
async function copyType(type, campaignId, newCampaignId, owner, attributes) {
    //get the list of all the items of that type such as map
    const components = await query(collection(db, "GMSusers", "GMSAPP", "components"), where("type", '==', type), where("campaignId", "==", campaignId));
    let comps = await getDocs(components);
    for (const key in comps.docs) {
        let data = comps.docs[key].data();
        //create a new data json from the json of every item
        data = { ...data, _id: Math.floor(Math.random() * 1000000).toString(), campaignId: newCampaignId, ogId: data._id, owner: owner };
        if(data.role!=="player"){
        //if there is an attribute sent in get the item that this particular map is connected to.
        if (attributes.length>0) {
            for(let attribute of attributes){
                const connectedComp = await query(collection(db, "GMSusers", "GMSAPP", "components"), where("type", '==', attribute.slice(0, -2)), where("ogId", "==", data[attribute]));
                let connectedComps = await getDocs(connectedComp);
                let connectedData = connectedComps.docs[0]
                if(connectedData){
                    connectedData = connectedData.data();
                }
                //change the attribute in data.
                data[attribute] = connectedData._id
            }
            
        }
        //update the timestamp and set the doc.
        data.date = await serverTimestamp();
        await setDoc(doc(db, "GMSusers", "GMSAPP", "components", data._id), data);
    }}
}

export { convertToMarketplace2 }
