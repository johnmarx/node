var blessed = require('blessed'),
    contrib = require('blessed-contrib'),
    monitor = require("./monitor");  //dec

var aff = blessed.screen()
var pos = new contrib.grid({
    row: 12,
    cols: 12,
    screen: aff
})
//création graphique
var cpuLine = pos.set(0, 0, 4, 12, contrib.line, { //use cpu line 1 tab
    showNthLabel: 5,
    maxY: 100,
    label: 'CPU life',
    showLegend: true,
})

var ramLine = pos.set(4, 0, 4, 8, contrib.line, {  //ram
    showNthLabel: 5,
    maxY: 100,
    label: 'ram use',
    showLegend: true,
    legend: {
        width: 10
    }

})   //fin 1 tab

var memDonut = pos.set(4, 8, 2, 4, contrib.donut, { // les donuts
    radius: 8,
    arcWidth: 3,
    yPadding: 2,
    remainColor: 'black',
    label: 'space',
});

var swapDonut = pos.set(6, 8, 2, 4, contrib.donut, {
    radius: 8,
    arcWidth: 3,
    yPadding: 2,
    remainColor: 'black',
    label: 'use',
});

var netSpark = pos.set(8, 0, 2, 6, contrib.sparkline, {
    label: 'Network Usage',
    tags: true,
    style: {
        fg: 'blue'
    }
})

var diskDonut = pos.set(10, 0, 2, 6, contrib.donut, {
    radius: 8,
    arcWidth: 3,
    yPadding: 2,
    remainColor: 'Green',
    label: 'Disk usage',
})

var procTable = pos.set(8, 6, 4, 6, contrib.table, {
    keys: true,
    label: 'Processes',
    columnSpacing: 1,
    columnWidth: [7, 24, 7, 7]
})

procTable.focus()

screen.render();
screen.on('resize', function(a) {
    cpuLine.emit('attach');
    ramLine.emit('attach');
    memDonut.emit('attach');
    swapDonut.emit('attach');
    netSpark.emit('attach');
    diskDonut.emit('attach');
    procTable.emit('attach');
});

screen.key(['escape', 'q', 'C-c'], function(ch, key) {
    return process.exit(0);
});

function init() {                     //dec
    new monitor.Cpu(cpuLine);
    new monitor.Mem(memLine, memDonut, swapDonut);
    new monitor.Net(netSpark);
    new monitor.Disk(diskDonut);
    new monitor.Proc(procTable);
}


process.on('uncaughtException', function(err) {

});

module.exports = {
    init: init,
    monitor: monitor
};

