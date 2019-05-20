$(document).ready(function(){

// -----Function to start app and populate tag buttons-----
$(function(){
    populateButtons(searchArray, "searchButton", "#buttonTags");
    console.log("Page Loaded");
}) 

// -----Dynamic array of tags, starter tags hard-coded-----
var searchArray = ["star wars", "battlestar galactica", "andromeda", "star trek", "the abyss"];

// -----Pre-Populate tag buttons-----
function populateButtons(searchArray, classToAdd, areaToAddTo) {
  $(areaToAddTo).empty();
  for(var i=0; i<searchArray.length; i++){
    var a = $("<button>");
    a.addClass(classToAdd);
    a.attr("data-type", searchArray[i]);
    a.text(searchArray[i]); 
    $(areaToAddTo).append(a);
  }
}

// -----Search for Gifs when a tag is clicked-----
$(document).on("click",".searchButton",function() {  
  $("#searches").empty();
  var searchTag = $(this).data("type");
  console.log(searchTag);
  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + searchTag + "&api_key=INLAjPbuAMOdQpudEZ8XlXrB3c3YPpL3&limit=5";
  $.ajax({url:queryURL, method:"GET"})
    .done(function(response) {
      // console.log(response);
      for(var i=0; i<response.data.length; i++) {
        var searchDiv = $('<div class="searchItem">');
        var rating = response.data[i].rating;
        var p = $("<p>").text("Rating: " + rating);
        var animatedGif = response.data[i].images.fixed_height.url;
        var stillGif = response.data[i].images.fixed_height_still.url;
        var image = $("<img>");
        image.attr("src", stillGif);
        image.attr("data-still", stillGif);
        image.attr("data-animated", animatedGif);
        image.attr("data-state", "stillGIF");
        image.addClass("searchImage");
        searchDiv.append(p);
        searchDiv.append(image);
        $("#searches").append(searchDiv);
      };
    });
});

// -----Clicking Gif will animate & stop animation-----
$(document).on("click", ".searchImage", function(){
  var state = $(this).attr("data-state");
  if(state == "still"){
      $(this).attr("src", $(this).data("animated"));
      $(this).attr("data-state", "animated");
  } else {
      $(this).attr("src",$(this).data("still"));
      $(this).attr("data-state", "still");
  };
});

// -----Add tag buttons to search with-----
$("#addSearchTag").on("click", function(){
  // event.stopImmediatePropagation();
  // event.preventDefault();
  var validation = document.getElementById("searchInput").value;
  if (validation == "") {
    alert("Please fill out the search");
    return false;
  } else {
  var newTag = $("input").val();
  searchArray.push(newTag);
  console.log(searchArray);
  populateButtons(searchArray, "searchButton", "#buttonTags");
  return false;
  }
});


});