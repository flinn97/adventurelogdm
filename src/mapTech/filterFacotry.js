
/**
 * factory for getting different items for the map component
 */
export default class FilterFactory {
    factory = {
        text: textAttributeFilter,
        tag: filterByTag,
        bool: filterByBool,
        plain: textFilter,
        textAndTag: filterByTextThenTitle,
        textObject: textObjectAttributeFilter,
        textAttributeList:consistentlyFilterByTextAttributeList





    }

    /**
     * get a map item
     * @param {*} type 
     * @param {*} obj 
     * @returns a react item for the map
     */
    getFilter(type) {
        if (type) {
            return this.factory[type];
        }

    }

    /**
     * register a new map component.
     * @param {*} type 
     * @param {*} comp 
     */
    registerFilter(type, filter) {
        this.factory[type] = filter
    }


}


function filterByTag(json) {
    let { list, attribute, tagList } = json;
    if (list.length > 0) {
        list = list.filter(obj => {
            let bool = tagList.find(tag => {
                let tagConnect = !attribute ? tag.getJson().connectedId : tag.getJson()[attribute];
                return tagConnect === obj.getJson()._id
            });
            if (bool) {
                return true;
            }
            else {
                return false
            }
        })
    } return list


}

function filterByTextThenTitle(json) {
    let { list, attribute, tagList, attribute2, attributeTag, search } = json;
    let nameList = textAttributeFilter({ ...json, attribute: attribute });
    let newTagList = filterByTag({ ...json, attribute: attributeTag });
    let promoList = textAttributeFilter({ ...json, attribute: attribute2 });
    list = [...nameList, ...newTagList, ...promoList]
    let newList = filterRemoveDupes(list);
    return newList
}

//Better function than the one above for a more pluggable multi filter with attributes.
function consistentlyFilterByTextAttributeList(json) {
    
    let {  attributeList } = json;
    let newList = [];
    for(let attribute of attributeList){
        newList = [...newList, ...textAttributeFilter({...json, attribute:attribute})]
    }
    newList = filterRemoveDupes(newList);
    return newList
}

function filterRemoveDupes(list){
    const uniqueItems = new Map();

    list.forEach(item => {
      const itemJson = item.getJson();
      const itemId = itemJson._id;
      if (!uniqueItems.has(itemId)) {
        uniqueItems.set(itemId, item);
      }
    });
  
    return Array.from(uniqueItems.values());
}

function textAttributeFilter(json) {

    let { list, attribute, search } = json;
    if (search && search.length > 0) {
        list = list.filter(obj => obj.getJson()[attribute]?.toLowerCase().includes(search?.toLowerCase()));
    }
    return list;
}
function textObjectAttributeFilter(json) {
    
    
    let { list, attribute, search } = json;

    if (search !== undefined) {
        let key = attribute !== undefined ? attribute : "owner"
        list = list.filter((data) => {
            if (typeof data.getJson()[key] === 'object') {

                return Object.keys(data.getJson()[key]).includes(search)

            } else {

                return data.getJson()[key] === search;
            }
        }
        );
    }
    return list;
}

function textFilter(json) {
    let { list, attribute, search } = json;
    if (search && search.length > 0) {
        list = list.filter(obj => obj[attribute]?.toLowerCase().includes(search?.toLowerCase()));
    }
    return list;
}
function filterByBool(json) {
    let { list, attribute, search } = json;
    list = list.filter(obj=> obj.getJson()[attribute]===search)
    return list;
}