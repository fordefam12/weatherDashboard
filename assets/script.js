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


 