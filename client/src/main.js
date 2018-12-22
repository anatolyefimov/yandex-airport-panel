import List from '@/components/list.js';
import getSchedule from '@/services/getSchedule';
import store from '@/store/index';

getSchedule('departure').then(
    function(result) {
        store.state.schedule = result.schedule;
        let list = new List();

        list.render();
    }
);


