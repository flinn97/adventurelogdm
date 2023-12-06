

class TreeService {
    constructor() {
    }
    list = [];
    campaign = false;
    /**
     * convert entire campaign to marketplace
     * @param {*} lore 
     * @param {*} componentList 
     * 
     * @param type if lore then => loreId, if campaign => campaignId
     */
    async convertToMarketplace(lore, componentList, type) {
        if (!lore.getJson().purchasedItem) {
            if (lore.getJson().type === "campaign") {
                this.campaign = true
            }
            //set preliminaries
            this.list = [];
            let opps = lore.getOperationsFactory()
            //create a new mpi from campaing
            let mpiJson = { ...lore.getJson(), _id: undefined, type: "marketplaceItem", ogType: lore.getJson().type, ogId: lore.getJson()._id, parentId: "" }
            await opps.cleanJsonPrepare({ addmarketplaceItem: mpiJson })
            //get mpi from updater
            let mpi = opps.getUpdater("add")
            mpi = mpi[mpi.length-1]

            //create an mpi for every component that is associate with campaign but is not a lore
            this.list.push(mpi);
            debugger
            await this.copyAttachedItemsHelper(mpi, componentList, "campaignId");
            await this.recurseLoreTree(lore, componentList,);

            for(let mpi of this.list.slice(1)){
                this.copyAttachedItemsHelper(mpi, componentList, "loreId");
            }
            // 
            opps.run();
        }

    }


    /**
     *  Recurse the tree and prepare marketplace items.
     * @param {*} lore 
     * @param {*} componentList 
     */
    async recurseLoreTree(lore, componentList,) {
        //get all lores that are children of the lore passed in for the param.
        let loreList = componentList.getList("lore", lore.getJson()._id, "parentId");

        //take the original id of lore passed in as the param and find the marketplaceitem in this.list that as the attribute ogId as the id of that lore
        let parentMPitem = this.list.filter(obj => obj.getJson().ogId === lore.getJson()._id);
        parentMPitem = parentMPitem[0];
        let mpi = undefined
        //iterate the children and add marketplace items
        for (let l of loreList) {

            //create the obj for a new market place item with ogId as l's id and parentId as parentMPitem id
            let json = { ...l.getJson(), _id: undefined, type: "marketplaceItem", ogType: l.getJson().type, campaignId: "", ogId: l.getJson()._id, parentId: parentMPitem.getJson()._id };
            await componentList.getOperationsFactory().jsonPrepare({ addmarketplaceItem: json })
            //get it back from updater
            let opList = componentList.getOperationsFactory().getUpdater("add")
            let mpi = opList[opList.length - 1];
            //copy all assiociated items of this lore

            //add the item to list
            this.list.push(mpi);

            this.recurseLoreTree(l, componentList,);



        }

        // this.copyAttachedItemsHelper(lastMPI, componentList, attribute);
    }

    /**
     *  Recurse the tree and prepare marketplace items.
     * @param {*} MPI 
     * @param {*} componentList 
     */
    async recurseMPITree(MPI, componentList) {
        //get all MPI that are children of the MPI passed in for the param.
        let mpiList = componentList.getList("marketplaceItem", MPI.getJson()._id, "parentId");

        //take the original id of MPI passed in as the param and find the lore  in this.list that as the attribute ogId as the id of that MPI
        let parentLoreitem = this.list.filter(obj => obj.getJson().ogId === MPI.getJson()._id);
        parentLoreitem = parentLoreitem[0];
        //iterate the children and add Lore items
        for (let mpikid of mpiList) {

            //create the obj for a newlore item with ogId as mpikid's id and parentId as parentLoreitem id
            let json = { ...mpikid.getJson(), _id: undefined, type: mpikid.getJson().ogType, purchasedItem: true, campaignId: this.list[0].getJson()._id, ogId: mpikid.getJson()._id, parentId: parentLoreitem.getJson()._id };
            await componentList.getOperationsFactory().jsonPrepare({ ["add" + mpikid.getJson().ogType]: json })
            //get it back from updater
            let opList = componentList.getOperationsFactory().getUpdater("add")
            let lore = opList[opList.length - 1]
            //add the item to list
            this.list.push(lore);

            //recurse
            let kidList = componentList.getList("marketplaceItem", mpikid.getJson()._id, "parentId")
            if (kidList.length > 0) {
                this.recurseMPITree(mpikid, componentList);
            }


        }

    }



    /**
     * Convert associated items to mpilore
     * @param {*} mpilore 
     * @param {*} componentList 
     * @param {*} attribute 
     */
    async copyAttachedItemsHelper(mpilore, componentList, attribute) {
        let filterKeyArr = ["encounter", "image", "map"]; //"map","pin",
        let components = [];
        let id = mpilore.getJson().ogId;

        //create master list from all the other lists
        for (const key of filterKeyArr) {
            components = attribute === "campaignId" ?
                [...components, ...componentList.getList(key, id, attribute).filter(data => (data.getJson().loreId === "" || data.getJson().loreId === undefined))]
                : [...components, ...componentList.getList(key, id, attribute)];

        }
        for (let obj of components) {
            //let individual classed create the mpi's.
            await obj.createMPI(mpilore, this.list[0].getJson()._id, componentList, undefined);
        }
    }

    /**
    * Convert associated items to mpilore
    * @param {*} lore 
    * @param {*} componentList 
    * @param {*} attribute 
    */
    async copyAttachedItemsReverseHelper(lore, componentList, attribute) {
        let id = lore.getJson().ogId;
        let components = attribute==="campaignId"?[...componentList.getList("marketplaceItem", id, attribute).filter(obj=>obj.getJson().loreId==="")]:[...componentList.getList("marketplaceItem", id, attribute)]
        for (let obj of components) {
            await obj.createFromMPI(lore, this.list[0].getJson()._id, componentList, undefined);
        }
    }



    /**
    * convert entire MPI to purchased campain or lore
    * @param {*} mpi 
    * @param {*} componentList 
    * 
    * @param type if lore then => loreId, if campaign => campaignId
    */
    async convertMarketplaceItemToLoreTree(mpi, componentList, type) {
        
        if (mpi.getJson().ogType === "campaign") {
            this.campaign = true
        }
        //set preliminaries
        this.list = [];
        let opps = mpi.getOperationsFactory()
        //create a new mpi from campaing
        let json = { ...mpi.getJson(), _id: undefined, type: mpi.getJson().ogType, purchasedItem: true, ogId: mpi.getJson()._id, parentId: "" }
        await opps.cleanJsonPrepare({ ["add" + mpi.getJson().ogType]: json })
        //get mpi from updater
        let obj = opps.getUpdater("add")
        obj = obj[obj.length-1];

        this.list.push(obj);
        
        await this.copyAttachedItemsReverseHelper(obj, componentList, "campaignId");

        //create an mpi for every component that is associate with campaign but is not a lore
        //    await this.copyAttachedItemsReverseHelper(obj, componentList, type);
        await this.recurseMPITree(mpi, componentList);
        debugger
        for(let lore of this.list.slice(1)){
           await this.copyAttachedItemsReverseHelper(lore, componentList, "loreId");
        }
        opps.run();
    }
};
export default new TreeService();