// ================================================================================================ setup

var SI = {};

SI.Input = {
	Left: 37,
	Up: 38,
	Right: 39,
	Cut: 90
}

// ================================================================================================ constructor

SI.Game = function() {

	// Instructions

	confirm("\n~~~~~~~~ BARKO THE SPACE PUP ~~~~~~~~"
		  + "\n\nThe fur of the venerable BARKO is too long! His scintillating coat must be trimmed in the name of justice. However, he is very bad at sitting still."
		  + "\n\nLEFT and RIGHT ARROWS to steer"
		  + "\nUP ARROW for thrust"
		  + "\nZ to snip");

	// Initialize the canvas

	var canvas = $('#gameview');
	this.graphics = canvas[0].getContext('2d');
	this.graphics.canvas.width = canvas.width();
	this.graphics.canvas.height = canvas.height();

	// Initialize input

	this.input = [];

	var self = this;
	$(document).keydown(function (e) { self.input[e.which] = true; });
	$(document).keyup(function (e) { self.input[e.which] = false; });

	// Initialize the game elements

	this.border = new SI.Border(75);
	this.ending = new SI.Ending();
	this.dog = new SI.Dog(500, 450);
	this.ship = new SI.Ship(500, 550);

	// Step and draw at 60FPS forever

	var self = this;
	this.clock = setInterval(function () {

		self.ship.step(self);
		self.dog.step(self);

		self.graphics.clearRect(0, 0, self.graphics.canvas.width, self.graphics.canvas.height);

		self.border.draw(self);
		self.dog.draw(self);
		self.ship.draw(self);
		self.ending.draw(self);

	}, 1000 / 60);
}