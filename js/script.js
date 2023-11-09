var requestUrl = 'api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=7c3c28474c8587a6386ddc13bfd31f56&units=metric';
var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
var header = document.getElementsByTagName("H1")[0];
var requestUrl2 = 'http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=7c3c28474c8587a6386ddc13bfd31f56&units=metric'
var requestUrl3 = 'api.openweathermap.org/data/2.5/forecast?q=London,us&appid=7c3c28474c8587a6386ddc13bfd31f56&units=metric'
var requestUrl4 = 'api.openweathermap.org/data/2.5/forecast?q=München,DE&appid=7c3c28474c8587a6386ddc13bfd31f56&units=metric'
var day0 = document.getElementById('0')
var day1 = document.getElementById('1')
var day2 = document.getElementById('2')
var day3 = document.getElementById('3')
var day4 = document.getElementById('4')
var day5 = document.getElementById('5')
var apiKey = "7c3c28474c8587a6386ddc13bfd31f56"
var city;
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
//console.log(test);
function weatherData(data , day , whichDay){
  var name = data.city.name;
  var date = data.list[day].dt_txt;
  var icon = data.list[day].weather[0].icon;
  var temp = data.list[day].main.temp;
  var windSpeed = data.list[day].wind.speed;
  var humidity = data.list[day].main.humidity;

  whichDay.children[1].src = 'https://openweathermap.org/img/wn/' +icon + '@2x.png';
  whichDay.children[0].textContent = name +" "+ date;
  whichDay.children[2].textContent = "Temp: " + temp +"°C";
  whichDay.children[3].textContent = "Wind Speed: " + windSpeed +"m/s";
  whichDay.children[4].textContent = "Humidity: " + humidity +"%";
}
function getApi(requestUrlArg) {
  fetch(proxyUrl + requestUrlArg).then(function (response) {
    //console.log(response);
    if (response.status === 200) {
      header.textContent = response.status;
      bool = true;
    }else{
      bool = false
      console.log('hello');
      return;
    }
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    //console.log(data.cnt);
    var number = 0
    weatherData(data , 0, day0);
    weatherData(data , 9, day1);
    weatherData(data , 17, day2);
    weatherData(data , 25, day3);
    weatherData(data , 33, day4);
    weatherData(data , 39, day5);
    if(bool){
      var newList = document.createElement("li");
      newList.textContent = data.city.name;
      list.appendChild(newList);
    }

  });
}

//getApi(requestUrl);
//getApi(requestUrl2);
//getApi(requestUrl3);
//console.log(london);
//getApi(requestUrl4);
var bool = false;
var search = document.getElementById('search');
var input = document.getElementById('name-input');
var list = document.getElementById('list')
function showResponse(event) {
  // Prevent default action
  event.preventDefault();
  var city2 = input.value;
  getApi('api.openweathermap.org/data/2.5/forecast?q='+city2+'&appid='+apiKey);
  // if(bool){
  //   var newList = document.createElement("li");
  //   newList.textContent = city2
  //   list.appendChild(newList);
  // }
  // var newList = document.createElement("li");
  // newList.textContent = city2
  // list.appendChild(newList);
  //console.log(input.value)
}
  
// Add listener to submit element
search.addEventListener("click", showResponse);

