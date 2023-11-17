         

class TreeService {
    constructor() {
    }
    list = [];
    index = 0;
    campaign=false;
    /**
     * convert entire campaign to marketplace
     * @param {*} lore 
     * @param {*} componentList 
     * 
     * @param type if lore then => loreId, if campaign => campaignId
     */
    async convertToMarketplace(lore, componentList, type){
        if(!lore.getJson().purchasedItem){
            if(lore.getJson().type==="campaign"){
                this.campaign=true
            }
        //set preliminaries
        this.list=[];
        this.index=0;
        let opps = lore.getOperationsFactory()
        //create a new mpi from campaing
        let mpiJson = {...lore.getJson(), _id:undefined, type:"marketplaceItem", ogType: lore.getJson().type, ogId: lore.getJson()._id, parentId:""}
        await opps.cleanJsonPrepare({addmarketplaceItem:mpiJson})
        //get mpi from updater
        let mpi = opps.getUpdater("add")
        mpi = mpi[this.index]
        this.index++

        //create an mpi for every component that is associate with campaign but is not a lore
        this.copyAttachedItemsHelper(mpi, componentList, type);
       
        this.list.push(mpi);
       await this.recurseLoreTree(lore, componentList);
       opps.run();
    }

    }


    /**
     *  Recurse the tree and prepare marketplace items.
     * @param {*} lore 
     * @param {*} componentList 
     */
    async recurseLoreTree(lore, componentList,){
        //get all lores that are children of the lore passed in for the param.
        let loreList = componentList.getList("lore", lore.getJson()._id, "parentId");
       
         //take the original id of lore passed in as the param and find the marketplaceitem in this.list that as the attribute ogId as the id of that lore
         let parentMPitem = this.list.filter(obj => obj.getJson().ogId === lore.getJson()._id);
         parentMPitem = parentMPitem[0];
          //iterate the children and add marketplace items
        for(let l of loreList){
           
            //create the obj for a new market place item with ogId as l's id and parentId as parentMPitem id
            let json = {...l.getJson(), _id:undefined, type:"marketplaceItem", ogType: l.getJson().type, campaignId: this.list[0].getJson().campaignId, ogId:l.getJson()._id, parentId:parentMPitem.getJson()._id};
            await componentList.getOperationsFactory().jsonPrepare({addmarketplaceItem: json})
        //get it back from updater
        let mpi = componentList.getOperationsFactory().getUpdater("add")[this.index]
        //increment the index
        this.index++;
        //copy all assiociated items of this lore
        this.copyAttachedItemsHelper(mpi, componentList, "loreId");
        //add the item to list
        this.list.push(mpi);
       
        //recurse
        let kidList = componentList.getList("lore", l.getJson()._id, "parentId")
        if(kidList.length>0){
            this.recurseLoreTree(l, componentList);
        }
        

        }

    }

     /**
     *  Recurse the tree and prepare marketplace items.
     * @param {*} MPI 
     * @param {*} componentList 
     */
     async recurseMPITree(MPI, componentList){
        //get all MPI that are children of the MPI passed in for the param.
        let mpiList = componentList.getList("marketplaceItem", MPI.getJson()._id, "parentId");
       
         //take the original id of MPI passed in as the param and find the lore  in this.list that as the attribute ogId as the id of that MPI
         let parentLoreitem = this.list.filter(obj => obj.getJson().ogId === MPI.getJson()._id);
         parentLoreitem = parentLoreitem[0];
          //iterate the children and add Lore items
        for(let mpikid of mpiList){
           
            //create the obj for a newlore item with ogId as mpikid's id and parentId as parentLoreitem id
            let json = {...mpikid.getJson(), _id:undefined, type:mpikid.getJson().ogType, purchasedItem: true, campaignId: this.list[0].getJson().campaignId, ogId:mpikid.getJson()._id, parentId:parentLoreitem.getJson()._id};
            await componentList.getOperationsFactory().jsonPrepare({["add" + mpikid.getJson().ogType]: json})
        //get it back from updater
        let lore = componentList.getOperationsFactory().getUpdater("add")[this.index]
        //increment the index
        this.index++;
        //copy all assiociated items of this MPI
        this.copyAttachedItemsReverseHelper(lore, componentList, "loreId");
        //add the item to list
        this.list.push(lore);
       
        //recurse
        let kidList = componentList.getList("marketplaceItem", mpikid.getJson()._id, "parentId")
        if(kidList.length>0){
            this.recurseLoreTree(mpikid, componentList);
        }
        

        }

    }



    /**
     * Convert associated items to mpilore
     * @param {*} mpilore 
     * @param {*} componentList 
     * @param {*} attribute 
     */
    async copyAttachedItemsHelper(mpilore, componentList, attribute){
        let filterKeyArr = ["encounter","image","map","pin",];
        let components = []
        let id = mpilore.getJson().ogId;

                //create master list from all the other lists
        for(const key of filterKeyArr){
            components =attribute==="campaignId"? 
            [...components,...componentList.getList(key,id,attribute).filter(data => (data.getJson().loreId === "" || data.getJson().loreId === undefined))]
            :[...components,...componentList.getList(key,id,attribute)];
            
        }
        for(let obj of components){
            let json = {...obj.getJson(), _id:undefined, type:"marketplaceItem", ogType: obj.getJson().type, campaignId:this.list[0].getJson()._id, [attribute]: mpilore.getJson()._id,  };
            await componentList.getOperationsFactory().jsonPrepare({addmarketplaceItem:json})
            if(obj.getJson().type==="encounter"){
                let mpiencounter= componentList.getOperationsFactory().getUpdater("add")[componentList.getOperationsFactory().getUpdater("add").length-1];
                let monsters = componentList.getList("monster", obj.getJson()._id, "encounterId");
                for(let monster in monsters){
                    let monsterJson = {...monster.getJson(), _id:undefined, type:"marketplaceItem", ogType: "monster", campaignId:this.campaign?this.list[0].getJson()._id:"", [attribute]: mpilore.getJson()._id, encounterId:mpiencounter.getJson()._id };
                    await componentList.getOperationsFactory().jsonPrepare({addmarketplaceItem:monsterJson})
                    this.index++;
                }



            }
            this.index++
        }

    }

     /**
     * Convert associated items to mpilore
     * @param {*} lore 
     * @param {*} componentList 
     * @param {*} attribute 
     */
     async copyAttachedItemsReverseHelper(lore, componentList, attribute){
        let id = lore.getJson().ogId;
        let components = [...componentList.getList("marketplaceItem",id,attribute)]
        for(let obj of components){
            let json = {...obj.getJson(), _id:undefined, type:obj.getJson().ogType, campaignId:this.list[0].getJson()._id, [attribute]: lore.getJson()._id };
            await componentList.getOperationsFactory().jsonPrepare({["add" + obj.getJson().ogType]:json});
            if(!this.campaign && obj.getJson().ogType==="encounter"){
                let monsterMPI = componentList.getList("marketplaceItem", obj.getJson()._id, "ecounterId");
                for(let monster of monsterMPI){
                    let monsterjson = {...monster.getJson(), _id:undefined, type:"monster", campaignId:this.list[0].getJson()._id, [attribute]: lore.getJson()._id };
                    await componentList.getOperationsFactory().jsonPrepare({addmonster:monsterjson});
                    this.index++;
                }
            }
            this.index++
        }
    }

    

     /**
     * convert entire MPI to purchased campain or lore
     * @param {*} mpi 
     * @param {*} componentList 
     * 
     * @param type if lore then => loreId, if campaign => campaignId
     */
   async convertMarketplaceItemToLoreTree(mpi, componentList, type){
    if(mpi.getJson().ogType==="campaign"){
        this.campaign=true
    }
        //set preliminaries
        this.list=[];
        this.index=0;
        let opps = mpi.getOperationsFactory()
        //create a new mpi from campaing
        let json = {...mpi.getJson(), _id:undefined, type:mpi.getJson().ogType, purchasedItem:true, ogId: mpi.getJson()._id, parentId:""}
        await opps.cleanJsonPrepare({["add"+mpi.getJson().ogType]:json})
        //get mpi from updater
        let obj = opps.getUpdater("add")
        obj = obj[this.index]
        this.index++

        //create an mpi for every component that is associate with campaign but is not a lore
        this.copyAttachedItemsReverseHelper(obj, componentList, type);
       
        this.list.push(obj);
        this.recurseMPITree(mpi, componentList);
        opps.run();
    }
  };
  export default new TreeService();