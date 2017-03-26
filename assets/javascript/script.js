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


//---------------------------------------------------------------------------
// ACTUAL FUNCTIONAL BITS!

for (var i = 0; i < aussieFauna.length; i++) {
	aussieButton = $("<button>");

	aussieButton.attr("aussie-animal", aussieFauna[i]);

	aussieButton.addClass("aussie-button btn btn-danger");

	aussieButton.text(aussieFauna[i]);

	$("#button-array").append(aussieButton);
}

$("button").on("click", function() {

	var animal = $(this).attr("aussie-animal");

	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";

		$.ajax({
			url: queryURL,
			method: "GET"
		})

		.done(function(response) {
			console.log(queryURL);
			console.log(response);
		});

});