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
        console.log(store.state.schedule);
        for (let obj of store.state.schedule) {
           
            let row = document.createElement('div');
            row.classList.add('schedule--row');
            let city = document.createElement('div');
            city.classList.add('schedule--city');
            city.textContent = obj.airport;
            
            let time = document.createElement('div');
            time.classList.add('schedule--time');
            
            let ts = ((store.state.event === 'departure') ? obj.departure_time.offblock : obj.arrival_time.actual);
            

            time.textContent = ts ? ts.slice(11, 16) : '';
            
            let numberFlight = document.createElement('div');
            numberFlight.classList.add('schedule--number-flight');
            let suf = document.createElement('span');
            let prefSuf = obj.number.split(' ');
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
            console.log('test');
        }
    
    }
}