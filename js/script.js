var proxyUrl = 'https://cors-anywhere.herokuapp.com/';//gets accross cors
var day0 = document.getElementById('0')
var day1 = document.getElementById('1')
var day2 = document.getElementById('2')
var day3 = document.getElementById('3')
var day4 = document.getElementById('4')
var day5 = document.getElementById('5')//gets all the elements where the weather data will go
var apiKey = "7c3c28474c8587a6386ddc13bfd31f56"
var bool = false;
var search = document.getElementById('search');
var input = document.getElementById('name-input');
var list = document.getElementById('list')
var visitedPlaces = []

renderVisitedPlaces();

function renderVisitedPlaces(){
  var storedPlaces = JSON.parse(localStorage.getItem("visited"));
  if (!storedPlaces) {
    return;
  }
  visitedPlaces = storedPlaces;
  for (var i = 0; i < visitedPlaces.length; i++) { 
    var newList = document.createElement("li");
    newList.textContent = visitedPlaces[i];
    list.appendChild(newList);
  }
}//gets all the places previously visited and stores them to the page on startup

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
}//prints all the weather data to the html
function getApi(requestUrlArg) {
  fetch(proxyUrl + requestUrlArg).then(function (response) {
    if (response.status === 200) {
      bool = true;
    }else{
      bool = false
      return;
    }//fethes api
    return response.json();
  })
  .then(function (data) {
    var number = 0
    weatherData(data , 0, day0);
    weatherData(data , 8, day1);
    weatherData(data , 16, day2);
    weatherData(data , 24, day3);
    weatherData(data , 32, day4);
    weatherData(data , 39, day5);//gets the info for each day and use function to display to html
    if(bool && !ifVisited(data.city.name)){
      var newList = document.createElement("li");
      newList.textContent = data.city.name;
      visitedPlaces.push(data.city.name);
      list.appendChild(newList);
      //localStorage.setItem(""+data.city.name, data.city.name );
      localStorage.setItem("visited", JSON.stringify(visitedPlaces));
    }//checks if the place has already been searched or if its real and it will not add it to search history

  });
}
function ifVisited(current){
  hasVisited = false;
  for (var i = 0; i < visitedPlaces.length; i++) { 
    if(current == visitedPlaces[i]){
      hasVisited = true
    }
  }
  return hasVisited;
}//checks if a place has already been visited

function showResponse(event) {
  // Prevent default action
  event.preventDefault();
  var city2 = input.value;
  getApi('api.openweathermap.org/data/2.5/forecast?q='+city2+'&appid='+apiKey + '&units=metric');
  input.value = "";
}//when button pressed search for api with the input from user
  
// Add listener to submit element
search.addEventListener("click", showResponse);

function history(event) {
  var place = event.target.textContent
  getApi('api.openweathermap.org/data/2.5/forecast?q='+place+'&appid='+apiKey + '&units=metric');
}//if search history clicked it will get it and print it to page
list.addEventListener("click", history)


