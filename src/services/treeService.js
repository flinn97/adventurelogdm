         

class TreeService {
    constructor() {
    }
    list = [];
    index = 0;
    /**
     * convert entire campaign to marketplace
     * @param {*} lore 
     * @param {*} componentList 
     * 
     * @param type if lore then => loreId, if campaign => campaignId
     */
    async convertToMarketplace(lore, componentList, type){
        //set preliminaries
        this.list=[];
        let opps = lore.getOperationsFactory()
        //create a new mpi from campaing
        let mpiJson = {...lore.getJson(), _id:undefined, type:"marketplaceItem", ogType: lore.getJson().type, ogId: lore.getJson()._id, parentId:undefined}
        await cleanJsonPrepare({addmarketplaceItem:mpiJson})
        //get mpi from updater
        let mpi = opps.getUpdater("add")
        mpi = mpi[this.index]
        this.index++

        //create an mpi for every component that is associate with campaign but is not a lore
        this.copyAttachedItemsHelper(mpi, componentList, type);
       
        this.list.push(mpi);
        this.recurseLoreTree(lore, componentList);

    }

    /**
     *  Recurse the tree and prepare marketplace items.
     * @param {*} lore 
     * @param {*} componentList 
     */
    async recurseLoreTree(lore, componentList){
        //get all lores that are children of the lore passed in for the param.
        let loreList = componentList.getList("lore", lore.getJson()._id, "parentId");
        //iterate the children and add marketplace items
        for(let l of loreList){
            //take the original id of lore passed in as the param and find the marketplaceitem in this.list that as the attribute ogId as the id of that lore
            let parentMPitem = this.list.filter(data => data.getJson().ogId === lore.getJson()._id);
            parentMPitem = parentMPitem[0];
            //create the obj for a new market place item with ogId as l's id and parentId as parentMPitem id
            let json = {...l.getJson(), _id:undefined, type:"marketplaceItem", ogType: l.getJson().type, campaignId: l.getJson().campaignId, ogId:l.getJson()._id, parentId:parentMPitem.getJson()._id};
            await jsonPrepare({addmarketplaceItem:json})
            //get it back from updater
        let mpi = opps.getUpdater("add")
        mpi = marketplaceCampaign[this.index];
        //increment the index
        this.index++;
        //copy all assiociated items of this lore
        this.copyAttachedItemsHelper(mpi, componentList, "loreId");
        //add the item to list
        this.list.push(mpi);
       
        //recurse
        this.recurseLoreTree(l, componentList);

        }

    }

    /**
     * Convert associated items to mpilore
     * @param {*} mpilore 
     * @param {*} componentList 
     * @param {*} attribute 
     */
    async copyAttachedItemsHelper(mpilore, componentList, attribute){
        let filterKeyArr = ["encounter","image","map","pin"];
        let components = []
        let id = mpilore.getJson().ogId;

                //create master list from all the other lists
        for(const key of filterKeyArr){
            components =attribute==="campaignId"? 
            [...components,...componentList.getList(key,id,attribute).filter(data => (data.getJson().loreId === "" || data.getJson().loreId === undefined))]
            :[...components,...componentList.getList(key,id,attribute)]
        }
        for(let obj of components){
            let json = {...obj.getJson(), _id:undefined, type:"marketplaceItem", ogType: l.getJson().type, campaignId: obj.getJson().campaignId, parentId:mpilore.getJson()._id};
            await jsonPrepare({addmarketplaceItem:json})
            this.index++
        }

    }
    convertMarketplaceItemToLoreTree(){}
  };
  export default new TreeService();