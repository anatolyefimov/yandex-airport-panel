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
                return true;
            }
        })
    }

    dispatch(actionKey, payload) {
  
        let self = this;
        
        
        if(typeof self.actions[actionKey] !== 'function') {
          console.error(`Action "${actionKey} doesn't exist.`);
          return false;
        }
        
        console.groupCollapsed(`ACTION: ${actionKey}`);

        self.status = 'action';
        self.actions[actionKey](self, payload);

        console.groupEnd();

        return true;
    }

    commit(mutationKey, payload) {
        let self = this;
        
        if(typeof self.mutations[mutationKey] !== 'function') {
            console.log(`Mutation "${mutationKey}" doesn't exist`);
            return false;
        }
        
        self.status = 'mutation';
        let newState = self.mutations[mutationKey](self.state, payload);
        self.state = Object.assign(self.state, newState);

        return true;
    }
}