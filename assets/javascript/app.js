var search = "cat";
var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=INLAjPbuAMOdQpudEZ8XlXrB3c3YPpL3&limit=5";
$.ajax({
  url: queryURL,
  method: "GET"
}).then(function (response) {

  //Response testing
  console.log(response);
  console.log(response.Runtime);

  // Create a new div element
  var body = $("#gifs");
  var item = $("<div>");

  //Loop to get multiple responses
  for (var i = 0; i < 10; i++) {
    //Variables
    var rating = response.data[i].rating;
    var gifResponseStill = response.data[i].images.original_still.url;
    var gifResponseLooping = response.data[i].images.original.url;
    //Output
    var output = "<div class='float-left' id='cats'>" + "<h5 id='ratings'>Rating: " + rating + "</h5>" + "<img height='300px' width='300px' src='" + gifResponseStill + "'/>";
    // Append and display
    item.append(output);
    body.append(item);
  }

  document.getElementById("cats").onclick = function () {
    var output2 = "<div class='float-left'>" + "<h5 id='ratings'>Rating: " + rating + "</h5>" + "<img height='300px' width='300px' src='" + gifResponseLooping + "'/>";
    // Append and display
    item.append(output2);
    body.append(item);

  };

});