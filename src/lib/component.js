import Store from '@/store/store.js';

export default class Component {
    constructor(props = {}) {
        let self = this;

        if(props.store instanceof Store) {
            props.store.events.subscribe('stateChange', () => self.render());
        }
        
        if(props.hasOwnProperty('element')) {
            this.element = props.element;
        }
    }
}
