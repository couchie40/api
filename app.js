var movies = ["Aladdin",
       "Bambi",
       "Beauty and the Beast",
       "Cinderella",
       "Dumbo",
       "Fantasia",
       "Hercules",
       "Lady and the Tramp",
       "Lilo and Stitch",
       "Peter Pan",
       "Pinocchio",
       "Pocahontas",
       "Sleeping Beauty",
       "Snow White",
       "Steamboat Willie",
       "The Aristocats",
       "The Fox and the Hound",
       "The Lion King",
       "The Little Mermaid",
       "Treasure Planet",];

var apiKey = "6dCV6nkmtwc771wwbT7JLFtjMZ4uPYQr"

 function renderButtons() {

        // Deletes the movies prior to adding new movies
        // (this is necessary to avoid repeat buttons)
        $("#buttons-view").empty();
        // Loops through movies array 
        for (var i = 0; i < movies.length; i++) {

          // Then dynamicaly generates buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adds a class of movies to our button
          a.addClass("movie");
          // Added a data-attribute
          a.attr("data-name", movies[i]);
          // Provided the initial button text
          a.text(movies[i]);
          // Added the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      }

renderButtons();

// This function handles events where the add movie button is clicked
      $("#add-mov").on("click", function(event) {
        event.preventDefault();
        // This line of code will grab the input from the textbox
        var movie = $("#mov-input").val().trim();

        // The movie from the textbox is then added to our array
        movies.push(movie);

        // Calling renderButtons which handles the processing of our shows array
        renderButtons();
      });

      // Adding click event listeners to all elements with a class of "movie"
      $(document).on("click", ".movie", displayMovieInfo);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();

function displayMovieInfo() {

        var movie = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=" + apiKey + "&limit=10&rating=pg";

        // Creates AJAX call for the specific movie button clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {

          // Creates a div to hold movie
          $("#mov-view").empty();
          // Retrieves the Rating Data
          console.log(response);

          for (var i = 0; i < response.data.length; i++) {
            var movShowImage = $("<img src= '" + response.data[i].images.fixed_width_still.url + "'>")
            .attr("data-stillImage", response.data[i].images.fixed_width_still.url)
            .attr("data-moveImage", response.data[i].images.fixed_width.url)
            .attr("data-state", "still")
            .click(function(){
              if ($(this).attr("data-state")=="still") {
                $(this).attr("src", $(this).attr("data-moveImage"));
                $(this).attr("data-state", "moving");
              }
              else {
                $(this).attr("src", $(this).attr("data-stillImage"));
                $(this).attr("data-state", "still");
              }
            })
            var movShow = $("<span>")
            // Retrieves the Rating Data
            .append("<p>Rating: " + response.data[i].rating + "</p>")
            .append(movShowImage);

            

            $("#mov-view").append(movShow);
          }
         
        });

      }


