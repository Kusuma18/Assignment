(function (angular) {
    'use strict';
    angular.module('invoice2',[])
    .factory('currencyConverter', ['$http', function ($http, $timeout) {
        
        var Currencies = [];
        var Rates = [];
        var usdToForeignRates = {};
        
        
        //var usdtocon = {
        //    'EUR': 1,
        //    'USD': 2,
        //    'INR': 3
        //};
        
        
        //var Convert = function (amount, InCurr, outcurr) {
        //    //if (ID = '') {
        //    //    return amount * t[outcurr] / idrates[InCurr].rate;
        //    //}
            
        //    ////
        //};
        
        var i;
        var ID;
        var rate;
        var ratesjsonarray = [];
        var refresh = function refresh() {
            var url = 'https://api.coinmarketcap.com/v1/ticker/?limit=10';
            debugger;
            return $http.get(url).then(function (response) {
                usdToForeignRates = response.data;//json
                
                var stringedjson = JSON.stringify(usdToForeignRates);//string
                var t = JSON.parse(stringedjson);//array
                
                
                    
                for (i = 0; i < t.length; i++) {
                    
                    ratesjsonarray.push({
                        ID: t[i].id,
                        rate: t[i].percent_change_1h
                    });

                };
                abc();
                ced();

                
                
            });
                
        };
        var getData = function () {
            var url = 'https://api.coinmarketcap.com/v1/ticker/?limit=10';
            $http.get(url).then(function (response) {
                usdToForeignRates = response.data;//json

                var stringedjson = JSON.stringify(usdToForeignRates);//string
                var t = JSON.parse(stringedjson);//array



                for (i = 0; i < t.length; i++) {

                    ratesjsonarray.push({
                        ID: t[i].id,
                        rate: t[i].percent_change_1h
                    });

                };
                abc();
                ced();



            });
        };

        // Function to replicate setInterval using $timeout service.
        var intervalFunction = function () {
            $timeout(function () {
                getData();
                intervalFunction();
            }, 300000)
        };

        // Kick off the interval
        intervalFunction();
        
        var abc = function abc() {
            var k;
            for (k = 0; k < ratesjsonarray.length; k++) {
                Currencies.push(ratesjsonarray[k].ID);
            }
        };
        var ced = function ced() {
            var k;
            for (k = 0; k < ratesjsonarray.length; k++) {
                Rates.push(ratesjsonarray[k].rate);
            }
        };
        debugger;
        //refresh();
        
        //this.oneh_rate = this.usdt.percent_change_1h;
        
        
        return {
            Currencies: Currencies,
            Convert: Convert,
            Rates: ratesjsonarray
        };
    }]);
})(window.angular);