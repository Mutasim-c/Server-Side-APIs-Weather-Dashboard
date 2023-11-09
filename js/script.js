var requestUrl = 'api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=7c3c28474c8587a6386ddc13bfd31f56&units=metric';
var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
var list = document.getElementsByTagName("H1")[0];
var requestUrl2 = 'http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=7c3c28474c8587a6386ddc13bfd31f56&units=metric'
var requestUrl3 = 'api.openweathermap.org/data/2.5/forecast?q=London,us&appid=7c3c28474c8587a6386ddc13bfd31f56&units=metric'
var requestUrl4 = 'api.openweathermap.org/data/2.5/forecast?q=München,DE&appid=7c3c28474c8587a6386ddc13bfd31f56&units=metric'
var test = document.getElementById('jolly')
var apiKey = "7c3c28474c8587a6386ddc13bfd31f56"
var city;
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
//console.log(test);
function getApi(requestUrlArg) {
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
    var name = data.city.name;
    var date = data.list[0].dt_txt;
    var icon = data.list[0].weather[0].icon;
    var temp = data.list[0].main.temp;
    var windSpeed = data.list[0].wind.speed;
    var humidity = data.list[0].main.humidity;

    test.children[1].src = 'https://openweathermap.org/img/wn/' +icon + '@2x.png';
    test.children[0].textContent = name +" "+ date;
    test.children[2].textContent = "Temp: " + temp +"°C";
    test.children[3].textContent = "Wind Speed: " + windSpeed +"m/s";
    test.children[4].textContent = "Humidity: " + humidity +"%";

  });
}

//getApi(requestUrl);
//getApi(requestUrl2);
getApi(requestUrl3);
//console.log(london);
//getApi(requestUrl4);
