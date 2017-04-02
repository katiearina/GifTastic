//---------------------------------------------------------------------------
// VARIABLE DECLARATIONS!

var aussieButton;

// Instructions say to call this variable "topics" but that doesn't make sense
// to me, so I picked something else.
// Commented out the options that returned less-than-ideal results
var aussieFauna = [
	"Blobfish", 
	"Emu", 
	"Kangaroo", 
	"Koala", 
	"Cassowary", 
	"Platypus", 
	"Echidna", 
	"Wombat", 
	"Dingo",
	"Kookaburra",
	// "Gouldian Finch",
	// "Spotted Quoll",
	"Frilled Lizard",
	"Numbat",
	// "Black Swan",
	"Tawny Frogmouth",
	"Wallaby",
	"Crocodile",
	"Tree Kangaroo",
	// "Bandicoot",
	"Bilby",
	"Thorny Devil",
	// "Lyrebird",
	"Stonefish"
	];

//---------------------------------------------------------------------------
// FUNCTION DECLARATIONS!

// This function creates and displays buttons for GIF images
function renderButtons() {
	// Clears button array to start
	$("#button-array").empty();
	// Using all items in the array
	for (var i = 0; i < aussieFauna.length; i++) {
	// Creates a new button
	aussieButton = $("<button>");
	// Adds an attribute to identify specific button (not necessary, but called later and likely not bad practice)
	aussieButton.attr("aussie-animal", aussieFauna[i]);
	// Adds the button classes
	aussieButton.addClass("aussie-button btn btn-danger");
	// Adds the button text
	aussieButton.text(aussieFauna[i]);
	// Displays the buttons in the preexisting array
	$("#button-array").append(aussieButton);
	}
}

// This function creates and displays GIF images
function createImages() {
	// Clears GIF content div to start
	$("#gif-content").empty();
	// Sets this variable equal to the attribute of the button
	var animal = $(this).attr("aussie-animal");
	// Creates a query URL based on the button selected, limits results to 10 (max)
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";
		// AJAX call to interact with the Giphy API
		$.ajax({
			url: queryURL,
			method: "GET"
		})
		// When AJAX call is complete/a response is acquired
		.done(function(response) {
			// Sets this variable equal to the response information
			var results = response.data;
				// Cycles through the results (max 10)
				for (var i = 0; i < results.length; i++) {
					// Avoids images with R or PG-13 ratings
					if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
						// Sets this variable equal to a new image element
						var gifImage = $("<img>");
						// Sets this variable equal to the rating of the image
						var rating = results[i].rating.toUpperCase();
						// Creates an image source (still) to show initially
						gifImage.attr("src", results[i].images.fixed_height_still.url);
						// Sets initial "data-state" attribute of image to still
						gifImage.attr("data-state", "still");
						// Sets image URL at "data-still" attribute to still image URL
						gifImage.attr("data-still", results[i].images.fixed_height_still.url);
						// Sets image URL at "data-animate" attribute to moving image URL
						gifImage.attr("data-animate", results[i].images.fixed_height.url);
						// Appends image to GIF content div
						$("#gif-content").append(gifImage)
						// Appends rating information to GIF content div
						$("#gif-content").append("<p>Rating: " + rating + "</p>");
					}
				}
		});
}

// This function assigns image "data-state" attribute
function assignDataState() {
	// Sets this variable equal to the data state of the item clicked
	var state = $(this).attr("data-state");
		// If the "data-state" attribute is set to "still"
		if (state === "still") {
			// Then change the source to the moving image URL
			$(this).attr("src", $(this).attr("data-animate"));
			// And change the "data-state" attribute to "animate"
			$(this).attr("data-state", "animate");
		} 
		// If the "data-state" attribute is set to "animate"
		else if (state === "animate") {
			// Then change the source to the still image URL
			$(this).attr("src", $(this).attr("data-still"));
			// And change the "data-state" attribute to "still"
			$(this).attr("data-state", "still");
		}
}

// This function adds a new button
function addInputButton() {
	// Set this variable equal to the data entered in the input field
	var newButton = $("#add-button-input").val().trim();
	// Adds input value to the buttons array
	aussieFauna.push(newButton);
	// Clears the input field
	$("#add-button-input").val(" ");
	// Renders the buttons on the page
	renderButtons();
}


//---------------------------------------------------------------------------
// ACTUAL FUNCTIONAL BITS!

// When the document is ready
$(document).ready(function() {

// Renders buttons
renderButtons();

// On button click, display GIF images
$(document).on("click", "button", createImages);

// On GIF image click, assign data state
$(document).on("click", "img", assignDataState);

// On click of the Submit/"#add-button" button
$("#add-button").on("click", function(event) {
	// Prevent form submission/page reload
	event.preventDefault();
	// Add new button from user input
	addInputButton();
});

// End of document.ready function
});
