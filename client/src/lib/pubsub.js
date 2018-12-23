export default class PubSub {
    constructor() {
        this.events = [];
    }

    subscribe(event, callback) {
        if (!this.events.hasOwnProperty[event]) {
            this.events[event] = [];
        }
        console.log('event is subs!');
        this.events[event].push(callback);
        console.log(this.events[event]);
    }

    publish(event, data={}) {
        console.log(this.events[event]);
        
        this.events[event].forEach(callback => callback(data));
    }
}