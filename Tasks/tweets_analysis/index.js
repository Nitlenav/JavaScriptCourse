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
    let countLine = 0;       //при финальной сдаче нужно удалить
    while (countLine > 500){ //при финальной сдаче нужно удалить
    lr.pause();
    setTimeout(function () {
        data.push(line);
        lr.resume();
    }, 10);
countLine++}                //при финальной сдаче нужно удалить
});

lr.on('end', function () {
    // All lines are read, file is closed now.
    main();
    console.log("End");
});

function main () {}
function asinc (){
    for(let word in data)
{
    console.log(word)
}
}
/*
function mass(dataMas){
return new Promise((resolve, reject)=>{
    if (dataMas == undefined){
        reject(new Error('Данные в масиве отсутствубют'))
    }
else{
let mapTweet = new Map();
for (let lines in dataMas) {
console.log(lines)
resolve(lines)
}
}
resolve(lines)
})
}
mass(data)
.then((result) => console.log(result))
.catch((error) => console.log(error)); 
*/



/*

function tweet( function (masline) { // 10 наиболее часто встречающихся слов в Tweet
    let MaTweet = new Map();
    let tweet = line.split(";");
        console.log(line)
        if (tweet[7] !== undefined){
    let masTweet = tweet[7].split(" ");
    console.log(line)
for(let word in masTweet){

}}
    lr.pause();
    // ...do your asynchronous line processing..
    setTimeout(function () {
        // ...and continue emitting lines.
        data.push(line);
        lr.resume();
    }, 10);
}, );


/**
     let MapAutors = new Map();
    let autors = line.split(";");
 if (autors[4] != undefined){

     let autor = autors[4]
     if (MapAutors.get(autor) !== undefined)
     {
let countAutors = MapAutors.get(autor)
 ++countAutors
MapAutors.set(autor, countAutors)
     }
     else
     {
MapAutors.set(autor,1)
console.log(MapAutors)
     }
 }
 */
