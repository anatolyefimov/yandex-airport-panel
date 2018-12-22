const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const app = express();

app.use(bodyParser.json());
app.use(cors())


const url = 'https://api.rasp.yandex.net/v3.0/schedule/?';
const apiKey = 'bfca7378-a8e8-4a15-b4e4-9c009b52f095';
const station = 's9600213';

app.get('/schedule', function(req, res) {
    console.log('test')
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url + 'apikey=' + apiKey + '&station=' + station);
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