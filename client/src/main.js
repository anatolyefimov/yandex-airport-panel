import List from '@/components/list.js';
import getSchedule from '@/services/getSchedule';
import store from '@/store/index';

let schedule = document.querySelector('.schedule');
let input = document.getElementsByTagName('input')[0];
let form = document.getElementsByTagName('form')[0];
let noexist = document.querySelector('.noexist');
let loading = document.querySelector('.loading');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    loading.style.display = 'none';
    let number = input.value.trim();
    number = number.replace(' ', '');
    number = number.toUpperCase();
    let exist = false;
    schedule.childNodes.forEach(function(item, index) {
        let current = item.children[2].textContent;
        current= current.replace(' ', '');
        if (number === current || number === '') {
            item.style.display = 'flex';
            exist = true;
        }
        else {
            item.style.display = 'none';
        }
    });
    console.log(exist);
    if (exist === true) {
        noexist.style.display='none';
    }
    else {
        noexist.style.display='block';
    }
});

document.querySelectorAll('.event').forEach(function(event, index, arr) {
    event.addEventListener('click', function() {
        if (event.classList.contains('current')) {
            return;
        }
        loading.style.display = 'block';
        schedule.innerHTML = '';
        arr[index].classList.add('current');
        arr[(index + 1) % 2].classList.remove('current') ;
        store.dispatch('eventToggle', index);
    });
});


document.querySelectorAll('.event')[0].classList.add('current');
store.dispatch('eventToggle', 0);
let list = new List();
list.render();
