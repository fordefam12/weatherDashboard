var apiKey='0564078f2d64adbcca5196995d0e7688';
var savedSearches = [];
var searchHistoryList = function (cityName) {
    $('.past-search:contains("' + cityName + '")').remove();
    var searchHistoryEntry = $("<p>");
    searchHistoryEntry.addClass("past-search");
    searchHistoryEntry.text(cityName);

    var searchEntryContainer = $("<aside>");
    searchEntryContainer.addClass("past-search-container");
    searchEntryContainer.append(searchEntryContainer);

    var searchHistorycontainerE1 = $("#search-history-container");
    searchHistorycontainerE1.append(searchEntryContainer);
    if (savedSearches.length < 0){
        var previousSavedSearches = localStorage.getItem("#savedSearches");
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
    .then(function (data) {
        
        var cityLon = data.coord.lon;
        var cityLat = data.coord.lat;
console.log(data);
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${cityLat}&lon=${cityLon}&exclude=minutely,hourly,alerts&units=imperial&appid=${apiKey}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            console.log(response);
            searchHistoryList(cityName);
            console.log(cityName);
            var currentWeatherContainer = $("#current-weather-container");
            currentWeatherContainer.addClass("current-weather-container");

            var currentTitle = $("#current-title");
            var currentDay = moment().format("M/D/YYYY")
            currentTitle.text(`${cityName} (${currentDay})`);
            var currentIcon = $("#current-weather-icon");
            currentIcon.addClass("current-weather-icon");
            var currentIconCode = response.list[0].weather[0].icon;
            currentIcon.attr("src", `https://openweathermap.org/img/wn/${currentIconCode}@2x.png`);

            var currnetTemperature = $("current-tempature");
            currnetTemperature.text("Temperature: " + response.list[0].main.temp + " \u00b0f");

            var currentHumidity = $("#current-humidity");
            currentHumidity.text("Humidity: " + response.list[0].main.humidity + "%");
            
            var currentWindSpeed = $("#current-wind-speed");
            currentWindSpeed.text("Wind speed: " + response.list[3].wind.speed + "MPH")

            var currentHumidity = $("#current-uv-index");
            currentHumidity.text("Tempature: ");

            var currentNumber = $("#current-number");
            currentNumber.text(response.list[0].main.temp + "%");
            if (response.list[0].main.temp <= 350) {
            currentNumber.addClass("favorable");
        }else if (response.list[0].main.temp >= 400 && response.list[0].main.temp <= 700 ){
            currentNumber.addClass("moderate");
        }else {
            currentNumber.addClass("severe");
        }
        console.log(cityName);
        })
    })
    .catch(function (error) {
        $("#search-input").val("");
        alert("city not found, try again");

    });
}
var savedSearches = [];

var searchHistoryList = function (cityName) {
    $('.past-search:contains("' + cityName + '")').remove();
    var searchHistoryEntry = $("<p>");
    searchHistoryEntry.addClass("past-search");
    searchHistoryEntry.text(cityName);

    var searchHistorycontainerE1 = $("#search-history-container"); // Corrected variable name

    searchHistorycontainerE1.append(searchHistoryEntry); // Append the entry directly

    // ... rest of the function
};

var loadSearchHistory = function () {
    var savedSearchHistory = localStorage.getItem("savedSearches");
    if (savedSearchHistory) {
        savedSearches = JSON.parse(savedSearchHistory);
        for (let i = 0; i < savedSearches.length; i++) {
            searchHistoryList(savedSearches[i]);
        }
    }
};

$("#search-form").on("submit", function (event) {
    event.preventDefault();

    var cityName = $('#search-input').val();
    if (cityName === "" || cityName == null) {
        alert("Please enter a city name");
    } else {
        currentWeatherSection(cityName);
        fiveDayForcast(cityName);
    }
    searchHistoryList(cityName); // Save the search history on every search
    fiveDayForcast(cityName);
});

loadSearchHistory(); // Load search history when the page loads

    var fiveDayForcast = function(cityName) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`)
        .then(function (response) {
            return response.json();           
        })
        .then(function (response) {
            var cityLon = response.coord.lon;
            var cityLat = response.coord.lat;
            
            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${cityLat}&lon=${cityLon}&exclude=minutely,hourly,alerts&units=imperial&appid=${apiKey}`)
            .then(function (response2) {
                return response2.json();
            })
            .then(function (data2) {
                console.log(data2);
                
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
                    var futureIconCode = data2.list[i].weather[0].icon;
                    futureIcon.attr("src", `https://openweathermap.org/img/wn/${futureIconCode}@2x.png`);

                    var futureTemp = $("#future-temp-" + i );
                    futureTemp.text("temp:" +data2.list[i].main.temp + " \u00B0F");

                    var futureHumidity = $("#future-humidity-" + i);
                    futureHumidity.text("humidity: " + data2.list[i].main.humidity + "%");

                }
            })

        })
    };
    $("#search-form").on("submit", function (event) {
        event.preventDefault();

        var cityName = $('#search-input').val();
        if(cityName ==="" || cityName ==null) {
            alert("please enter city name");
            // event.preventDefault;
        }else currentWeatherSection(cityName);
        fiveDayForcast(cityName);
    })
    $("#search-history-container").on("click", "p", function () {
      var previousCityName = $(this).text();
      currentWeatherSection(previousCityName);
      fiveDayForcast(previousCityName);
      
      var previousCityClicked = $(this);
      previousCityClicked.remove();
    })
    loadSearchHistory();

 