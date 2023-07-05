$(document).ready(function () {
  var APIkey = "4910a1ed2efe6e5a111856cd7c08b4de";
  var city;
  var now = moment().format("1");
  var day1 = moment().add(1, "days").format("1");
  var day2 = moment().add(2, "days").format("1");
  var day3 = moment().add(3, "days").format("1");
  var day4 = moment().add(4, "days").format("1");
  var day5 = moment().add(5, "days").format("1");
  var cities;

  function MostRecent() {
    var lastSearch = localStorage.getItem("mosrRecent");
    if (lastSearch) {
      city = lastSearch;
      search();
    } else {
      city = "seatle";
      search();
    }
  }
  MostRecent();

  function loadRecentCities() {
    var recentCities = JSON.parse(localStorage.getItem("cities"));
    if (recentCities) {
        cities = recentCities;
    }
    else {
        cities = [];
    }
  }
  loadRecentCities()
  $(".submit").on("click", (e) => {
    e.preventDefault();
    getCity();
    search();
    $("cityInput").val("");
    listCities();

  })
  function search() {
    var url= "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=4910a1ed2efe6e5a111856cd7c08b4de";
    var coords =[];
    $.ajax({
        method: "GET",
    }).then(function(response){

        coords.push(response.coord.lat);
        coords.push(response.coord.lon);

        var cityName =response.name;
        var cityCond = response.weather[0].description.toUpperCase();
        var cityTemp = response.main.temp;
        var CityHum = response.wind.speed;
        var icon = reponse.weather [0].icon;

        $(".cityName").html(cityName + "" + "(" + now + ")");
        $(".cityCond").text("Current Conditions: " + cityCond);
        $(".temp").text("Current Temp (F): " + cityTemp.toFixed(1));
        $(".humidity").text
  }
});
