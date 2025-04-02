/**
 * Create a base class the defines some basic functions and data
 */
export default class BaseClass {
  operationsFactory;
  componentList;
  json;
  constructor(oppsFactory) {
    this.setJson = this.setJson.bind(this);
    this.getJson = this.getJson.bind(this);
    this.setCompState = this.setCompState.bind(this);
    this.copyComponent = this.copyComponent.bind(this);
    this.getOperationsFactory = this.getOperationsFactory.bind(this);
    this.createUUID = this.createUUID.bind(this);

    this.operationsFactory = oppsFactory;
  }
  getComponentList() {
    return this.componentList;
  }
  setComponentList(l) {
    this.componentList = l;
  }
  /**
   *
   * @param obj
   * @param callBack
   * Works exactly like setState in react only I include a function for a callback if needed
   */
  setCompState(obj, callBack) {
    this.json = { ...this.json, ...obj };
    if (callBack) {
      callBack();
    }
  }

  /**
   *
   * @returns operations factory for the class
   */
  getOperationsFactory() {
    return this.operationsFactory;
  }

  /**
   *
   * @param json
   * set the data
   */
  setJson(json) {
    this.json = json;
  }

  /**
   * get the data if to preserve private json var
   */
  getJson() {
    return this.json;
  }

  copyComponent(arr, valueList) {
    let newJson = { ...this.json, _id: "" };
    for (let key in arr) {
      newJson[arr[key]] = valueList[key];
    }
    return newJson;
  }

  updateObjInsideJson(key, obj) {
    this.json[key] = { ...this.json[key], ...obj };
  }

  removeObjInsideJson(key, keys) {
    let ob = {};
    for (const k in this.json[key]) {
      if (!keys.includes(k)) {
        ob[k] = this.json[key][k];
      }
    }

    this.json[key] = ob;
  }
  createUUID(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
