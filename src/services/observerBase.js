// Observer class implementation
export default class BaseObserver {
    constructor() {
        this.subscribers = [];
    }
    setList(l){
        this.subscribers=l;
    }

    // Subscribe a new function (callback) to this observer
    subscribe(callback) {
        if (typeof callback === "function") {
            this.subscribers.push(callback);
        } else {
            console.error("Subscriber must be a function.");
        }
    }

    // Unsubscribe an existing function from this observer
    unsubscribe(callback) {
        this.subscribers = this.subscribers.filter(subscriber => subscriber !== callback);
    }

    // Notify all subscribers with some data
    notify(data) {
        this.subscribers.forEach(subscriber => subscriber(data));
    }
}