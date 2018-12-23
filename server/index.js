const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const app = express();

app.use(bodyParser.json());
app.use(cors())


const url = 'https://api.rasp.yandex.net/v3.0/schedule/?';
const apiKey = 'bfca7378-a8e8-4a15-b4e4-9c009b52f095';
const station = 's9600366';

const departure = 'https://pulkovoairport.ru/f/flights/cur/en_dep_1.js?0.6897419961966416';
const arrival = 'https://pulkovoairport.ru/f/flights/cur/en_arr_1.js?0.8934537615016768';

app.get('/schedule/:event', function(req, res) {
    console.log(req.params.event)
    let xhr = new XMLHttpRequest();
    let now = new Date();
    xhr.open('GET', (req.params.event === 'departure' ? departure : arrival) );
    xhr.send();
    xhr.onreadystatechange = function() { 
        if (xhr.readyState != 4) return;
      
        if (xhr.status != 200) {
          console.log(xhr.status + ': ' + xhr.statusText);
        } else {
            res.send(xhr.responseText);
        }
    }

});


app.listen(8081);