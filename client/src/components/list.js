import Component from '@/lib/component.js';
import store from '@/store/index.js';

export default class List extends Component {
    constructor() {
        super({
            store,
            element: document.querySelector('.schedule')
        });
    }

    render() {
        for (let obj of store.state.schedule) {
            let text = obj.thread.title;
            let item = document.createElement('div');
            item.textContent = text;
            item.classList.add('schedulte-item');
            this.element.appendChild(item);
        }
    
    }
}