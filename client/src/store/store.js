import PubSub from '@/lib/PubSub';
import getSchedule from '@/services/getSchedule';

export default class Store {
    constructor(params) {
        this.actions = {};
        this.mutations = {};
        this.state = {};
        this.events = new PubSub();

        if (params.hasOwnProperty('actions')) {
            this.actions = params.actions;
        }

        if (params.hasOwnProperty('mutations')) {
            this.mutations = params.mutations; 
        }
        
        let self = this;
        self.state = new Proxy((params.state || {}), {
            set: function(state, key, value) {
                console.log('state change');
                if (key === 'event') {
                    if (value !== state[key]) {
                        getSchedule(value).then(
                            function(result) {
                                state['schedule'] = result.schedule;
                                self.events.publish('eventToggle');
                            }
                        );
                         
                    }
                    state[key] = value;
                }
                
                return true;
            }
        });
        

    }

    dispatch(actionKey, payload) {
  
        let self = this;
    
        if(typeof self.actions[actionKey] !== 'function') {
            console.log(`Action "${actionKey} doesn't exist.`);
            return false;
        }
        
        console.log (`ACTION: ${actionKey}`);

        self.status = 'action';
        self.actions[actionKey](self, payload);



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