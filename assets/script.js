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
        $(".humidity").text("humidity: " + CityHum + "%");
        $(".windSpeed").text("wind speed: " + cityWind +"mph");
        $("#date1").text(day1);
        $("#date2").text(day2);
        $("#date3").text(day3);
        $("#date4").text(day4);
        $("#date5").text(day5);
        
        getUV(response.coord.lat, response.coord.lon);
    }).fail(funtion () {
        alert("could not find data ");
    });
    function getUV(lat, lon) {
        $.ajax({
            var url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat +"&lon=" + lon + "&exclude=minutely,hourly" +  "&units=imperial&appid=4910a1ed2efe6e5a111856cd7c08b4de"
            method: "GET",
        }).THEN(function (response) {
            var uvIndex = response.current.uvi;
            $(".uvIndex").text("UV index: " +" " + uvIndex)
            if (uvIndex>=8){
                $(.uvIndex).css("color", "red");
            }else if (uvIndex > 4 && uvIndex < 8) {
                $(".uvIndex").css("color", "yellow");
            } else {
                $(.uvIndex).css("color", "green")
            } 
            var cityHigh = response.daily[0].temp.max;
            $(".high").text("expected high (F): " + "" +cityHigh);
            var day1temp = response.daily[1].temp.max;
            var day2temp = response.daily[2].temp.max;
            var day3temp = response.daily[3].temp.max;
            var day4temp = response.daily[4].temp.max;
            var day5temp = response.daily[5].temp.max;
            
            var day1hum = response.daily[1].humidity;
            var day2hum = response.daily[2].humidity;
            var day3hum = response.daily[3].humidity;
            var day4hum = response.daily[4].humidity;
            var day5hum = response.daily[5].humidity;

            $("#temp1").text("Temp(F): " + "" + day1temp.toFIxed(1));
            $("#temp2").text("Temp(F): " + "" + day2temp.toFIxed(1));
            $("#temp3").text("Temp(F): " + "" + day3temp.toFIxed(1));
            $("#temp4").text("Temp(F): " + "" + day4temp.toFIxed(1));
            $("#temp5").text("Temp(F): " + "" + day5temp.toFIxed(1));

            $("#hum1").text("Hum: " + "" + day1hum +"%");
            $("#hum2").text("Hum: " + "" + day2hum +"%");
            $("#hum3").text("Hum: " + "" + day3hum +"%");
            $("#hum4").text("Hum: " + "" + day4hum +"%");
            $("#hum5").text("Hum: " + "" + day5hum +"%");
        })
    }
  };
