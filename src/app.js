var CryptoJS = require('crypto-js');
var $ = require('jquery');

var KEYS = require('../keys.js');

var PUBLIC_KEY = KEYS.public;
var PRIV_KEY =   KEYS.private;

function getMarvelResponse() {

    // you need a new ts every request
    var ts = new Date().getTime();
    var hash = CryptoJS.MD5(ts + PRIV_KEY + PUBLIC_KEY).toString();

    // the api deals a lot in ids rather than just the strings you want to use
    var characterId = '1009718'; // wolverine

    var url = 'http://gateway.marvel.com:80/v1/public/comics';

    $.getJSON(url, {
            ts: ts,
            apikey: PUBLIC_KEY,
            hash: hash,
            characters: characterId
        })
        .done(function (data) {
            // sort of a long dump you will need to sort through
            console.log(data);
        })
        .fail(function (err) {
            // the error codes are listed on the dev site
            console.log(err);
        });
};

getMarvelResponse();