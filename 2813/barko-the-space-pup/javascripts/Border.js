// ================================================================================================ constructor

SI.Border = function(size) {

	this.size = size;
}

// ================================================================================================ draw

SI.Border.prototype.draw = function(game) {

	var b = 100;
	var s = this.size;
	var w = game.graphics.canvas.width;
	var h = game.graphics.canvas.height;

	game.graphics.fillStyle = $('body').css('background-color');

	// Top

	game.graphics.beginPath();
	game.graphics.moveTo(-b, -b);
	game.graphics.lineTo(w + b, -b);
	game.graphics.lineTo(w + b, s);
	game.graphics.lineTo(game.ship.x, Math.min(game.ship.y, s));
	game.graphics.lineTo(-b, s);
	game.graphics.fill();

	// Right

	game.graphics.beginPath();
	game.graphics.moveTo(w - s, -b);
	game.graphics.lineTo(w + b, -b);
	game.graphics.lineTo(w + b, h + b);
	game.graphics.lineTo(w - s, h + b);
	game.graphics.lineTo(Math.max(game.ship.x, w - s), game.ship.y);
	game.graphics.fill();

	// Bottom

	game.graphics.beginPath();
	game.graphics.moveTo(-b, h - s);
	game.graphics.lineTo(game.ship.x, Math.max(game.ship.y, h - s));
	game.graphics.lineTo(w + b, h - s);
	game.graphics.lineTo(w + b, h + b);
	game.graphics.lineTo(-b, h + b);
	game.graphics.fill();

	// Left

	game.graphics.beginPath();
	game.graphics.moveTo(-b, -b);
	game.graphics.lineTo(s, -b);
	game.graphics.lineTo(Math.min(game.ship.x, s), game.ship.y);
	game.graphics.lineTo(s, h + b);
	game.graphics.lineTo(-b, h + b);
	game.graphics.fill();
}