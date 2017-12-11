(function (angular) {
    'use strict';
    angular.module('invoice', ['invoice2','chart.js'])
      .controller('InvoiceController', ['currencyConverter' , function InvoiceController(currencyConverter) {
          this.qty = 1;
          this.cost = 2;
          this.InCurr;
          var k;
          this.currencies = [];
          var ratesGot = [];
          var Ratesgot = function Ratesgot() {
              var kk;
              for (kk = 0; kk < currencyConverter.Rates.length; kk++) {

                  ratesGot.push(currencyConverter.Rates[kk].rate);
              }
          };
          this.currencyCalling = function currencyCalling() {
              for (k = 0; k < currencyConverter.Currencies.length; k++) {

                  this.currencies.push(currencyConverter.Currencies[k]);

              };
              debugger;
              Ratesgot();
          };
          this.rates = function rates(abc) {
              var i;
              for (i = 0; i < currencyConverter.Rates.length; i++) {
                  if (abc === currencyConverter.Rates[i].ID)
                      return currencyConverter.Rates[i].rate;
              }


          };
          
          
          
          this.total = function total(outcurr) {
              return currencyConverter.Convert(this.qty * this.cost, this.InCurr, outcurr);
          };
          
          this.payAmount = function payAmount() {
              window.alert("Thanks!");
          };
          
          var labels;
          var datasets;
          var scales;
          var legend;
          var title;
          var ctx = document.getElementById("myChart").getContext('2d');
          var myChart = new Chart(ctx, {
              type: 'bar',
              data: {
                  labels: this.currencies,
                  datasets: [{
                      label: 'Exchange Rates',
                      data: ratesGot,
                      backgroundColor: [
                          'rgba(255, 99, 132, 0.2)',
                          'rgba(54, 162, 235, 0.2)',
                          'rgba(255, 206, 86, 0.2)',
                          'rgba(75, 192, 192, 0.2)',
                          'rgba(153, 102, 255, 0.2)',
                          'rgba(255, 159, 64, 0.2)'
                      ],
                      borderColor: [
                          'rgba(255,99,132,1)',
                          'rgba(54, 162, 235, 1)',
                          'rgba(255, 206, 86, 1)',
                          'rgba(75, 192, 192, 1)',
                          'rgba(153, 102, 255, 1)',
                          'rgba(255, 159, 64, 1)'
                      ],
                      borderWidth: 1
                  }]
              },
              options: {
                  scales: {
                      yAxes: [{
                          ticks: {
                              beginAtZero: true
                          }
                      }]
                  }
              }
          });
      }]);
})(window.angular);