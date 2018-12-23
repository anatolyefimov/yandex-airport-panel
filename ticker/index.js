function Ticker() {
    this._i = 0
};

Ticker.prototype = {
    tick: function() {
        console.log(this._i++);
    }
};

var ticker = new Ticker();
setInterval(() => ticker.tick(), 1000);