var requestUrl = 'api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=7c3c28474c8587a6386ddc13bfd31f56&units=metric';
var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
var list = document.getElementsByTagName("H1")[0];
var requestUrl2 = 'http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=7c3c28474c8587a6386ddc13bfd31f56&units=metric'
var requestUrl3 = 'api.openweathermap.org/data/2.5/forecast?q=London,us&appid=7c3c28474c8587a6386ddc13bfd31f56&units=metric'
var requestUrl4 = 'api.openweathermap.org/data/2.5/forecast?q=München,DE&appid=7c3c28474c8587a6386ddc13bfd31f56&units=metric'

function getApi(requestUrlArg) {
  var temp
  fetch(proxyUrl + requestUrlArg).then(function (response) {
    //console.log(response);
    if (response.status === 200) {
      list.textContent = response.status;
    }
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    //console.log(data.cnt);
    temp = data.list[0].main.temp;
    console.log(temp);
  });
}

//getApi(requestUrl);
//getApi(requestUrl2);
getApi(requestUrl3);
//console.log(london);
//getApi(requestUrl4);
