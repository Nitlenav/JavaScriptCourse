'use strict';

const LineByLineReader = require('line-by-line'),
    lr = new LineByLineReader('./input/dataSet.csv');

const data = [];


lr.on('error', function (err) {
    // 'err' для вывода ошибок 
    console.log(err);
    lr.close();
});

lr.on('line', function (line) {
    // pause emitting of lines...
    //let flag = /(\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*)/g;
    //let  adres = flag.exec(line)
    let MapAutors = new Map();
    let autors = line.split(";");

 if (autors[4] != undefined){
     if (MapAutors.get(autors[4]))
     {
let countAutors = MapAutors.get(autors[4])
 ++countAutors
MapAutors.set(autors[4], countAutors)
     }
     else
     {
MapAutors.set(autors[4],1)
     }
 }


    lr.pause();
    // ...do your asynchronous line processing..
    setTimeout(function () {
        // ...and continue emitting lines.
        data.push(line);
        lr.resume();
    }, 100);
});

lr.on('end', function () {
    // All lines are read, file is closed now.
    main();
    console.log("End");
});

function main () {

}