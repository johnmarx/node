var si = require('systeminformation'),
    utili = require('../utils');

var colors = utili.colors;

function Disk(donut) {
    this.donut = donut;

    si.FSize(data => {
        this.updateData(data);
    })
    this.interval = setInterval(() => {
        si.FSize(data => {
            this.updateData(data);
        })

    }, 10000);
}

Disk.prototype.updateData = function(data) {
    var disk = data[0];
    var label = utili.humanFSize(disk.used, true) +
        ' of ' +
        utili.humanFSize(data.size, true);

    this.donut.setData([{
        percent: disk.use / 100,
        label: label,
        'color' : colors[5]
    }, ]);
};

module.exports = Disk;
