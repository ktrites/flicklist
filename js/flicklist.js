

var model = {
  watchlistItems: [],
  browseItems: []
}

//var firstMovieTitle = model.watchlistItems[0].original_title.val();
//console.log(firstMovieTitle);

var api = {
  root: "https://api.themoviedb.org/3",
  token: "9998669cfab84d19ba8945ad0337207e" 
}


/**
 * Makes an AJAX request to themoviedb.org, asking for some movies
 * if successful, updates the model.browseItems appropriately, and then invokes
 * the callback function that was passed in
 */
 
function discoverMovies(callback) {
	$.ajax({
		url: api.root + "/discover/movie",
		data: {
			api_key: api.token
		},
		success: function(response) {
			console.log("Successful response from The Movie DB!");
			console.log(response);
			
			
			// update the model, setting its .browseItems property equal to the movies we recieved in the response
			// invoke the callback function that was passed in. 
			model.browseItems = response.results;
			console.log("Here are the model results:");
			console.log(model);
			
			callback();
		}	
	});
  
}


/**
 * re-renders the page with new content, based on the current state of the model
 */
function render() {
  // clear everything from both lists
  $("#section-watchlist ul").empty();
  $("#section-browse ul").empty();
  

  // for each movie on the user's watchlist, insert a list item into the <ul> in the watchlist section
  model.watchlistItems.forEach(function(movie) {
  	var listItem = $("<li></li>").text(movie.original_title);
  	$("#section-watchlist ul").append(listItem);
  });

  // for each movie on the current browse list, 
  // insert a list item into the <ul> in the browse section
	// the list item should include a button that says "Add to Watchlist"
	// when the button is clicked, this movie should be added to the model's watchlist and render() should be called
  
  model.browseItems.forEach(function(movie) {
			var title = $("<p></p>").text(movie.original_title);
			
			var button = $("<button></button").text("Add to Watchlist").click(function(){
				model.watchlistItems.push(movie);
				render();
			});
			
			var listItem = $("<li></li>").append(title).append(button);
			
			$("#section-browse ul").append(listItem);
		});
  
}


// When the HTML document is ready, we call the discoverMovies function,
// and pass the render function as its callback
$(document).ready(function() {
  discoverMovies(render);
});

