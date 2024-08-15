export default class ListTreeObserver {
  list = [];
  
  subscribe(f) {
    this.list.push(f);
  }

  unSubscribe(f) {
    this.list = this.list.filter(subscriber => subscriber !== f);
  }

  run(...args) {
    for (let f of this.list) {
      f(...args);
    }
  }
}