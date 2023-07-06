var APIKey= "4910a1ed2efe6e5a111856cd7c08b4de";
var savevdSearches = [];
var searchHistoryList = function (cityname) {
    $('.past-search:contains("' + cityName + '")').remove();
    var searchHistoryEntry = $("<p>");
    searchHistoryEntry.addClass("past-search");
    searchHistoryEntry.text(cityName);

    var searchEntryContainer = $("<aside>");
    searchEntryContainer.addClass("past-search-container");
    searchEntryContainer.append(searchEntryContainer);

    var searchHistorycontainerE1 = $("#search-history-container");
    searchHistorycontainerE1.append(searchEntryContainer);
    if (savevdSearches.length > 0){
        var previousSavedSearches = localStorage.getItem("savedSearches");
        savedSearches = JSON.parse(previousSavedSearches);
    }
    savedSearches.push(cityName);
    localStorage.setItem("savedSearches", JSON.stringify(savedSearches));

    $("#search-input").val("");

};

var currentWeatherSection = function (cityName) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`)
    .then(function (response) {
        return response.json();

    })
    .then(function (response) {
        var cityLon = response.coord.lon;
        var cityLat = response.coord.cityLat;

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&exclude=minutely,hourly,alerts&units=imperial&appid=${apiKey}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            searchHistoryList(cityName);
            
            var currentWeatherContainer = $("#current-weatehr-container");
            currentWeatherContainer.addClass("current-weqatehr-container");

            var currentTitle = $("#current-title");
            var currentDay = moment().format("M/D/YYYY")
            currentTitle.text('$cityName) (${currentDay})');
            var currentIcon = $("#current-weather-icon");
            currentIcon.addClass("current-weather-icon");
            var currentIconCode = response.current.weather[0].icon;
            currentIcon.attr("src", `https://openweathermap.org/img/wn/${currentIconCode}@2x.png`);

            var currnetTemperature = $("current-tempature");
            currnetTemperature.text("Temperature: " + response.current.temp + " \u00b0f");

            var currentHumidity = $("#current-humidity");
            currentHumidity.text("humidity: " + response.current.humidity + "%");
            
            var currentWindSpeed = $("#current-wind-speed");
            currentWindSpeed.text("wind speed: " + response.current.wind_speed + "MPH")

            var currentUvIndex = $("#current-uv-index");
            currentUvIndex.text("uv Index: ");

            var currentNumber = $("#current-number");
            currentNumber.text(response.current.uvi);

            if (response.current.uvi <= 2) {
            currentNumber.addClass("favorable");
        }else if (response.current.uvi >= 3 && response.current.uvi <= 7 ){
            currentNumber.addClass("moderate");
        }else {
            currentNumber.addClass("severe");
        }
        })
    })
    .catch(function (err) {
        $("#search-input").val("");
        alert("city not found, try again");

    });
    var loadSearchHistory = function () {
        var savevdSearchHistory = localStorage.getItem("savedSearches");
        if (!savevdSearchHistory) {
            return false;
        }
        savevdSearchHistory = JSON.parse(savevdSearchHistory);
        for (let i = 0; i < savevdSearchHistory.length; i++) {
            searchHistoryList(savevdSearchHistory[i]);
            
        }
    };
    var fiveDayForcast = function(cityName) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`)
        .then(function (response) {
            return response.json();           
        })
        .then(function (response) {
            var cityLon = response.coord.lon;
            var cityLat = response.coord.lat;
            
            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&exclude=minutely,hourly,alerts&units=imperial&appid=${apiKey}`)
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {
                console.log(response);
                
                var futureForcastTitle = $("#future-forcast-title");
                futureForcastTitle.text("5-Day Forcast")

                for (var i = 1; i <= 5; i++) {
                    var futureCard = $(".future-card");
                    futureCard.addClass("future-card-details");

                    var futureDate = $("#future-date-" + i);
                    date = moment().add(i, "d").format("M/D/YYYY");
                    futureDate.text(date);
                    
                    var futureIcon = $ ("#future-Icon-" + i);
                    futureIcon.addClass("future-Icon");
                    var futureIconCode = response.daily[i].weatehr[0].icon;
                    futureIcon.attr("src", `https://openweathermap.org/img/wn/${futureIconCode}@2x.png`);

                    var futureTemp = $("#future-temp-" + i );
                    futureTemp.text("temp:" +response.daily[i].temp.day + " \u00B0F");

                    var futureHumidity = $("#future-humidity-" + i);
                    futureHumidity.text("humidity: " + response.daily[i].humidity + "%");

                }
            })

        })
    };
    $("#search-form").on("submit", function (event) {
        event.preventDefault();

        var cityName = $('#search-input').val();
        if(cityName ==="" || cityName ==null) {
            alert("please enter city name");
            event.preventDefault;
        }else currentWeatherSection(cityName);
        fiveDayForcast(cityName);
    })
    
}
 