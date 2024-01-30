         

class LoreIndexService {
    
   /**
    * Change lore selected to go up in the list. 
    * @param {*} lore 
    * @param {*} loreList 
    * @param {*} opps 
    */
  async moveUp(lore, loreList, opps){
    
    let index  =  lore.getJson().index;
    let changeIndex = index +1;
    let sendToFront = false
    for(let i = changeIndex; i<loreList.length; i++){
      let lore = loreList[i];
      if(lore.getJson().reference===true){
        changeIndex++;
      }
      else{
        break;
      }
    }
    if(changeIndex===loreList.length){
      changeIndex = 0;
      sendToFront = true;
    }
    //if arrow up was clicked on the end lore. else update as normal
    if(sendToFront){
      lore.setCompState({index:changeIndex});
      let changeIndexes = loreList.filter(obj => obj!== lore);
      for(let l of changeIndexes){
        l.setCompState({index: l.getJson().index+1});
      }

      await opps.cleanPrepareRun({update:[lore, ...loreList]});
    }
    else{
      let changeLore = loreList.filter(l => l.getJson().index===changeIndex)[0];
      await changeLore.setCompState({index:index});
      await lore.setCompState({index:changeIndex});
      await opps.cleanPrepareRun({update:[changeLore, lore]});
      return loreList
    }
  }
  
  /**
   * change order of lore selected to go down the list.
   * @param {*} lore 
   * @param {*} loreList 
   * @param {*} opps 
   */
  async moveDown(lore, loreList, opps){
    
    let index  =  lore.getJson().index;
    let changeIndex = index -1;
    let sendToBack = false;
    for(let i = changeIndex; i<loreList.length; i--){
      if(i<0){
        break;
      }
      let lore = loreList[i];
      if(lore.getJson().reference===true){
        changeIndex--;
      }
      else{
        break;
      }
    }
    if(changeIndex<0){

        changeIndex = loreList.length-1;
        sendToBack = true;
    }
    if(changeIndex<=0 &&loreList[0].getJson().index===1){
      changeIndex = loreList.length-1;
      sendToBack = true;

    }
    if(sendToBack){
      lore.setCompState({index:changeIndex});
      let changeIndexes = loreList.filter(obj=> obj!==lore);
      for(let l of changeIndexes){
        l.setCompState({index: l.getJson().index-1})
      }
      await opps.cleanPrepareRun({update:[lore, ...loreList]});
    }
    else{
      let changeLore = loreList.filter(l => l.getJson().index===changeIndex)[0];
      await changeLore.setCompState({index:index});
      await lore.setCompState({index:changeIndex});
      debugger
      await opps.cleanPrepareRun({update:[changeLore, lore]});
      // return loreList
    }


  }

  async insertAtBeginning(lore, loreList, run){
    //
    loreList = loreList.filter(obj => obj!==lore);
    let opps = lore.getOperationsFactory();
    let parentLore = loreList.find(parent=>parent.getJson().parentLore===true);
    lore.setCompState({index:parentLore?1:0});
    for(let l of loreList){
    if(l!==parentLore){
      l.setCompState({index: l.getJson().index+1});
    }
    }
    loreList.splice(parentLore?1:0, 0, lore);

    this.reOrganizeLore(loreList, opps, run);
    
  }

  /**
   * make sure lore has the right index at any time.
   * @param {*} loreList 
   * @param {*} opps 
   */
  async reOrganizeLore(loreList, opps, run){

    let i = 0;
    let checkTopLore= loreList.filter(lore => lore.getJson().parentLore ===true)[0];
    if(checkTopLore){
      checkTopLore.setCompState({index:0});
      i=1;
      loreList = loreList.filter(lore=> !lore.getJson().parentLore);
    }
    loreList = loreList.sort((a, b)=>a.getJson().index - b.getJson().index)

    for(let lore of loreList){


      await lore.setCompState({index:i});
      i++;
      
    }
    if(checkTopLore){
      loreList.unshift(checkTopLore);
    }

      if (!run){
      await opps.cleanPrepareRun({update:loreList})
    }else{
      await opps.prepare({update:loreList})
    }

  }

  async sortComponentList(componentList){
    await componentList.sortSelectedList("lore", "index");
  }

  };
  export default new LoreIndexService();