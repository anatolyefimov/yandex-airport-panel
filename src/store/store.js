import PubSub from '@/lib/PubSub'

export default class Store {
    constructor(params) {
        this.actions = {};
        this.mutations = {};
        this.state = {};
        this.events = new PubSub();
        this.status = 'resting';

        if (params.hasOwnProperty('actions')) {
            this.actions = params.actions;
        }

        if (params.hasOwnProperty('mutations')) {
            this.mutations = params.mutations; 
        }
        
        let self = this;
        this.state = new Proxy(params.state, {
            set: function(state, key, value) {
                state[key] = value;
                self.events.publish('stateChange', this.state);
                self.status = 'resting';
            }
        })
    }
}