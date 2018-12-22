let url = 'https://api.rasp.yandex.net/v3.0/schedule/';
let apiKey = 'bfca7378-a8e8-4a15-b4e4-9c009b52f095';
let station = 's9600213';

export default async function getSchedule(event) {
    let schedule = await fetch('http://localhost:8081/schedule/' + event, {mode: 'cors'});
    schedule  = await schedule.json()
    return schedule;
}