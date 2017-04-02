//---------------------------------------------------------------------------
// VARIABLE DECLARATIONS!

var aussieButton;

// Instructions say to call this variable "topics" but that doesn't make sense
// to me, so I picked something else.
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
	"Gouldian Finch",
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
	"Lyrebird",
	"Stonefish"
	];

//---------------------------------------------------------------------------
// FUNCTION DECLARATIONS!

function renderButtons() {
	$("#button-array").empty();

	for (var i = 0; i < aussieFauna.length; i++) {
	aussieButton = $("<button>");

	aussieButton.attr("aussie-animal", aussieFauna[i]);

	aussieButton.addClass("aussie-button btn btn-danger");

	aussieButton.text(aussieFauna[i]);

	$("#button-array").append(aussieButton);
	
	}
}

function createImages() {

	$("#gif-content").empty();

	var animal = $(this).attr("aussie-animal");

	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";

		$.ajax({
			url: queryURL,
			method: "GET"
		})

		.done(function(response) {

			var results = response.data;

				for (var i = 0; i < results.length; i++) {

					if (results[i].rating !== "r" && results[i].rating !== "pg-13") {

						// console.log(queryURL);
						// console.log(results);
						// console.log(results[i].images.fixed_height.url);
						var gifImage = $("<img>");

						var rating = results[i].rating.toUpperCase();

						gifImage.attr("src", results[i].images.fixed_height_still.url);
						
						gifImage.attr("data-state", "still");
						
						gifImage.attr("data-still", results[i].images.fixed_height_still.url);
						
						gifImage.attr("data-animate", results[i].images.fixed_height.url);

						$("#gif-content").append(gifImage)
						
						$("#gif-content").append("<p>Rating: " + rating + "</p>");

					}
				}
		});

}

function assignDataState() {
	var state = $(this).attr("data-state");

		if (state === "still") {
			$(this).attr("src", $(this).attr("data-animate"));
			$(this).attr("data-state", "animate");
		} 
		else {
			$(this).attr("src", $(this).attr("data-still"));
			$(this).attr("data-state", "still");
		}
}

function addInputButton() {
	var newButton = $("#add-button-input").val().trim();
	aussieFauna.push(newButton);
	renderButtons();
}


//---------------------------------------------------------------------------
// ACTUAL FUNCTIONAL BITS!

renderButtons();

$(document).on("click", "button", createImages);

$(document).on("click", "img", assignDataState);

$("#add-button").on("click", function(event) {
	event.preventDefault();
	addInputButton();
});
