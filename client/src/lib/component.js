export default class Component {
    constructor(props = {}) {
        if(props.hasOwnProperty('element')) {
            this.element = props.element;
        }
    }
}
