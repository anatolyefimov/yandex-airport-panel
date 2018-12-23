export default class Component {
    constructor(props = {}) {
        let self = this;
       
        this.render = this.render || function() {};

        props.store.events.subscribe('eventToggle', () => self.render());
        console.log(props.store.events.events);
        if(props.hasOwnProperty('element')) {
            this.element = props.element;
        }
    }
}
