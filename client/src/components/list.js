import Component from '@/lib/component.js';
import store from '@/store/index.js';
import { strictEqual } from 'assert';

export default class List extends Component {
    constructor() {
        super({
            store,
            element: document.querySelector('.schedule')
        });
    }

    render() {
        console.log('rerender list')
        this.element.innerHTML = '';
        for (let obj of store.state.schedule) {
            let item = document.createElement('div');
            item.textContent = obj.thread.title;
            item.classList.add('schedulte-item');
            this.element.appendChild(item);
        }
    
    }
}