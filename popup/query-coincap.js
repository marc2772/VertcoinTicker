'use strict'

var currency;

window.onload = function () {
    getCurrency();
};

//Get the currency
function getCurrency() {
    var getting = browser.storage.local.get("currency");
    getting.then(onGot, onError);

    function onError(error) {
        console.log(`Error: ${error}`);
    };

    function onGot(result) {
        currency = result.currency;
        if(currency === undefined)
            currency = "USD";
            
        if (currency === "USD") {
            httpGetAsync("https://api.coinmarketcap.com/v1/ticker/vertcoin/", parseData);
        }
        else {
            httpGetAsync("https://api.coinmarketcap.com/v1/ticker/vertcoin/?convert=" + currency, parseData);
        }
    };
};

//Get the data
function httpGetAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

function parseData(data) {
    var dataObject = JSON.parse(data)[0];

    var priceCurrency = parseFloat(dataObject["price_" + currency.toLowerCase()]).toFixed(2);
    var percentCurrency = parseFloat(dataObject["percent_change_24h"]).toFixed(2);

    var priceBTC = dataObject["price_btc"];

    document.getElementById("priceCurrency").innerText = priceCurrency + " $" + currency;
    document.getElementById("priceBitcoin").innerText = priceBTC + " BTC";

    var percentCurrencyHTML = document.getElementById("percentCurrency");
    percentCurrencyHTML.innerText = " (" + percentCurrency + "%)";
    if (percentCurrency < 0)
        percentCurrencyHTML.style.color = "red";
    else
        percentCurrencyHTML.style.color = "green";
}
