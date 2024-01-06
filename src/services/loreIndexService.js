         

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
    }
    let changeLore = loreList.filter(l => l.getJson().index===changeIndex)[0];
    changeLore.setCompState({index:index});
    lore.setCompState({index:changeIndex});
    await opps.cleanPrepareRun({update:[changeLore, lore]});
    // this.reOrganizeLore(loreList, opps);

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
    }
    if(changeIndex<=0 &&loreList[0].getJson().index===1){
      changeIndex = loreList.length-1;

    }

    let changeLore = loreList.filter(l => l.getJson().index===changeIndex)[0];
    changeLore.setCompState({index:index});
    lore.setCompState({index:changeIndex});
    await opps.cleanPrepareRun({update:[changeLore, lore]});
  }

  /**
   * make sure lore has the right index at any time.
   * @param {*} loreList 
   * @param {*} opps 
   */
  async reOrganizeLore(loreList, opps){

    let i = 0;
    let checkTopLore= loreList.filter(lore => lore.getJson().parentLore ===true)[0];
    if(checkTopLore){
      checkTopLore.setCompState({index:0});
      i=1;
      loreList = loreList.filter(lore=> !lore.getJson().parentLore);
    }


    for(let lore of loreList){
      lore.setCompState({index:i});
      i++
      
    }
    if(checkTopLore){
      loreList.unshift(checkTopLore);
    }
    await opps.cleanPrepareRun({update:loreList})
  }

  async sortComponentList(componentList){
    await componentList.sortSelectedList("lore", "index");
  }

  };
  export default new LoreIndexService();