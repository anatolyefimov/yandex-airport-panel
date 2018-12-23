import List from '@/components/list.js';
import getSchedule from '@/services/getSchedule';
import store from '@/store/index';

document.querySelectorAll('.event').forEach(function(event, index) {
    event.addEventListener('click', function() {
        store.dispatch('eventToggle', index);
    });
});

store.dispatch('eventToggle', 0);
let list = new List();
list.render();
