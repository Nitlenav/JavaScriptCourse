'use strict';

const LineByLineReader = require('line-by-line'),
lr = new LineByLineReader('./input/dataSet.csv');

    function Place(country, city) {
        this.country = country;
        this.city = city;
        this.placeIndex = 0;
    };

    function PopularUser(nickName, followers) {
        this.nickName = nickName;
        this.followers = followers;
    };

    function PopularTweet(nickName, tweetContent, rts) {
        this.nickName = nickName;
        this.tweetContent = tweetContent;
        this.retweets = rts;
    };

const data = [];
const citysMap = new Map();
const authorsMap = new Map();
const tweetsMap = new Map();

function main () {}

lr.on('error', function (err) {
    // 'err' для вывода ошибок 
    console.log(err);
    lr.close();
});

lr.on('line', function (line) {

lr.pause();
        data.push(line.split(";"));
        for(let i = 2; i< data.length; i++){
            let proxyLine = data[i];
            if(proxyLine[4] != undefined && proxyLine[14] != undefined && !authorsMap.has(proxyLine[4])) {
                let author = new PopularUser(proxyLine[4], proxyLine[14] );
                authorsMap.set(proxyLine[4], author);
            };

            if(!tweetsMap.has(proxyLine[6])){
                let tweet = new PopularTweet(proxyLine[4], proxyLine[6], proxyLine[8]);
                tweetsMap.set(proxyLine[6], tweet);
            };

            if(citysMap.has(proxyLine[12])){
                citysMap.get(proxyLine[12]).placeIndex = citysMap.get(proxyLine[12]).placeIndex +1;
            }else if(proxyLine[11] != undefined && proxyLine[12] != undefined && proxyLine[12] != ";" && proxyLine[12] !="" && proxyLine[11] !="" && proxyLine[11] !=";"){
                let place = new Place(proxyLine[11], proxyLine[12]);
                citysMap.set(proxyLine[12], place)
            }
        }

        setTimeout(function () {
                                lr.resume();
        }, 100);

        setTimeout(function () {
                                analytics(authorsMap, tweetsMap)
        }, 5000)
    });

lr.on('end', function () {
    main();
    console.log("End");
});

function analytics(authorsCollections, tweetsCollection) {

        let maxU = 0;
        let maxyMan;

        for(let user of authorsCollections.values()) {
            if(user.followers*1 > maxU*1){
                maxyMan = user;
                maxU = maxyMan.followers;
            }
        };

        let maxT = 0;
        let maxyTweet;
        for(let tweet of tweetsCollection.values()) {
            if(tweet.retweets*1 >maxT*1){
                maxyTweet = tweet;
                maxT = maxyTweet.retweets;
            }
        };

        let maxI = 0;
        let maxyCity;
        for(let city of citysMap.values()) {
            if(city.placeIndex*1 >maxI*1){
                maxI = city.placeIndex*1;
                maxyCity = city;
            }
        };

        console.log("Один из популярных пользователей Твиттера - " + maxyMan.nickName + "; за ним следят " + maxyMan.followers + " пользователей.");
        console.log("Самый популярный Твит - " + maxyTweet.tweetContent + "; его перепостили " + maxyTweet.retweets + " раз.");
        console.log("Самый твитящий город - " + maxyCity.city + " из " + maxyCity.country +"; в 'этом городе твитят " + maxyCity.placeIndex +" пользователей");
        console.log();
};