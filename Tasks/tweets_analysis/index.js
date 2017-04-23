'use strict';

const LineByLineReader = require('line-by-line'),
    lr = new LineByLineReader('./input/dataSet.csv');

const data = [];

// 2. Создаём карты с переменными?для дальнейшего анализа
let popularAutors = new Map();
let popularTweet = new Map();
let popularCity = new Map();

function main () {}

lr.on('error', function (err) {
    new Error("Кака та Oшибка");
});

lr.on('line', function (line) {
        //console.log(line)
        data.push(line);
        parseTweet(data);

    lr.pause();
    setTimeout(function () {
        lr.resume();
    }, 10);

setTimeout(function () {
analisDataAutors(popularAutors);
analisDataTweet(popularTweet);
analisDataTCity(popularCity);
}, 6000)

});
 
lr.on('end', function () {
    main();
    console.log("Вот и конец")
});

function parseTweet (dataTweet){
    return new Promise(function(resolve, reject) {
// Берём последнюю запись в масиве, передаём в переменную и удаляем её.

let parseLine = data.pop();
let masLine = parseLine.split(";");

            //собираем статистику по самым популярным авторам; самый популярный тот, у кого фолловеров больше
            if(+masLine[14] != NaN && masLine[4] != '' && masLine[4] != undefined && masLine[14] != undefined && !popularAutors.has(masLine[4])) {
                popularAutors.set(masLine[4], +masLine[14]);
                //console.log(popularAutors);
            } else if (popularAutors.has(masLine[4])){
                let countFollowers = popularAutors.get(masLine[4]) +  (+masLine[14]) ;
                popularAutors.set(masLine[4], countFollowers);
            };

            //собираем статистику по самым популярным твитам; самый популярный тот, у которого ретвитов больше;
            if(masLine[4] != undefined && masLine[8] != undefined &&  masLine[4] != '' && masLine[8] != '' && !popularTweet.has(masLine[4])){
                popularTweet.set(masLine[4], +masLine[8]);
                //console.log(popularTweet);
            } else if (popularTweet.has(masLine[4])){
                let countRetweet = popularTweet.get(masLine[4]) + (+masLine[8]);
                popularTweet.set(masLine[4], countRetweet);
            };

            //собираем статистику по самым активным городам; количество твитов, сделанных в одном городе
           if(masLine[11] != undefined && masLine[12] != undefined && masLine[12] != ";" && masLine[12] !="" && masLine[11] !="" && masLine[11] !=";" && !popularCity.has(masLine[12]))
           {
                popularCity.set(masLine[12],  1);
                //console.log(popularCity);
            } else if(popularCity.has(masLine[12])){
                let countTweet = popularCity.get(masLine[12]) + 1;
                popularCity.set(masLine[12], countTweet);
            }

    function errors () {
      reject(new Error("Кака та ошибка")); // Как эту фигню вызвать пока не разобрался, экспримент продолжается.
    };      

});}

function analisDataAutors (valAutors){
        let maxVal = 0;
        let keyMapAutors;
valAutors.forEach(function(value, key, valAutors) {
    if (value > maxVal){
        maxVal = value;
        keyMapAutors = key
  //console.log(key + " = " + value);
    }

})
console.log("Самый популярный пользователь Твиттера - " + keyMapAutors + "; за ним следят " + maxVal + " пользователей.");
}

function analisDataTweet (valTweet){
        let maxTwet = 0;
        let keyMapTwet;
valTweet.forEach(function(value, key, valTweet) {
    if (value > maxTwet){
        maxTwet = value;
        keyMapTwet = key
  //console.log(key + " = " + value);
    }

})
console.log("Самый популярный Твит - " + keyMapTwet + "; его перепостили " + maxTwet + " раз.");
}

function analisDataTCity (valCity){
        let maxCity = 0;
        let keyMapCity;
valCity.forEach(function(value, key, valCity) {
    if (value > maxCity){
        maxCity = value;
        keyMapCity = key
  //console.log(key + " = " + value);
    }

})
console.log("Самый твитящий город - " + keyMapCity  + " в этом городе твитят " + maxCity +" пользователей");
console.log();
}