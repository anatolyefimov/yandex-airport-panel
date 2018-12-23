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
        console.log('rerender list');
        this.element.innerHTML = '';
        for (let obj of store.state.schedule) {
            let row = document.createElement('div');
            row.classList.add('schedule--row');
            let city = document.createElement('div');
            city.classList.add('schedule--city');

            let name = obj.thread['title'].split(' — ');
            let i = (store.state.event === 'departure') ? 1 : 0;
            city.textContent = name[i];

            let time = document.createElement('div');
            time.classList.add('schedule--time');
            let ts = obj.arrival || obj.departure;
            let ms = Date.parse(ts);
            let date = new Date(ms);
            time.textContent = Math.floor(date.getHours() / 10) + '' +  date.getHours() % 10 + ':' + Math.floor(date.getMinutes() / 10) + '' + date.getMinutes() % 10;
            
            let numberFlight = document.createElement('div');
            numberFlight.classList.add('schedule--number-flight');
            let suf = document.createElement('span');
            let prefSuf = obj.thread.number.split(' ');
            numberFlight.textContent = prefSuf[0] + ' ';
            suf.textContent = prefSuf[1];
            suf.style.fontWeight = 'bold';
            numberFlight.appendChild(suf);

            let terminal = document.createElement('div');
            terminal.classList.add('schedule--terminal');
            terminal.textContent = obj.terminal;

            row.appendChild(time);
            row.appendChild(city);
            row.appendChild(numberFlight);
            row.appendChild(terminal);
            this.element.appendChild(row);
        }
    
    }
}