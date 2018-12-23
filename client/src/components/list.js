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

            let status = obj.status;
            let timeBefore = document.createElement('div');
            timeBefore.classList.add('schedule--time');
            timeBefore.classList.add('delay-time');

            if (store.state.now >= obj.departure_time.offblock) {
                status = 'Departured';
            }
            
            if (status === 'Delayed') {
                timeBefore.textContent = (obj.departure_time.scheduled || obj.arrival_time.scheduled).slice(11, 16);
                time.textContent = (obj.departure_time.estimated ||  obj.arrival_time.estimated).slice(11, 16);
            } 
            else if (status === '') {
                let now = store.state.now;
                if (store.state.event === 'departure') {
                    let counterL = obj.counter.begin.plan || obj.counter.begin.actual;
                    let counterR = obj.counter.end.plan || obj.counter.end.actual;
                    let boardingL = obj.boarding.begin.plan || obj.boarding.begin.plan  ;
                    let boardingR = obj.boarding.end.plan || obj.boarding.end.plan;
                    if (now >= counterL && now <= counterR) {
                        status = 'Check-in';
                        time.textContent=obj.departure_time.estimated.slice(11, 16);
                    }
                    else if (now >= boardingL && now <= boardingR) {
                        status = 'Boarding';
                        time.textContent=obj.departure_time.estimated.slice(11, 16);
                    }
                    else  if (now > boardingR){
                        status = 'Boarding completed';
                        time.textContent=obj.departure_time.estimated.slice(11, 16);
                    }
                    else {
                        time.textContent=obj.departure_time.scheduled.slice(11, 16);
                    }
                }
                else {
                    if (obj.arrival_time.estimated > obj.arrival_time.scheduled) {
                        status = 'Delayed';
                        timeBefore.textContent = obj.arrival_time.scheduled.slice(11, 16);
                    }
                    time.textContent = obj.arrival_time.estimated.slice(11, 16);
                }
            }

            
            let statusMark = document.createElement('div');
            statusMark.classList.add('schedule--status');
            statusMark.textContent = status;

            console.log('test');
            row.appendChild(timeBefore);
            
            row.appendChild(time);
            row.appendChild(city);
            row.appendChild(numberFlight);
            row.appendChild(terminal);
            row.appendChild(statusMark);
            this.element.appendChild(row);
            console.log('test');
        }
    
    }
}