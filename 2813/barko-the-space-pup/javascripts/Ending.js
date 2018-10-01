// ================================================================================================ constructor

SI.Ending = function() {

	this.on = false;
	this.onFrame = 0;

	this.timer = 0;

	this.image = new Image();
	this.image.src = 'images/dogReal.png';

	this.topText = "YOU'RE";
	this.bottomText = "CONGRATULES!";
}

// ================================================================================================ draw

SI.Ending.prototype.draw = function(game) {

	if (this.on) {

		this.timer++;

		var s = Math.min(Math.max(0, this.timer / 60), 1);
		s = s * s * s * (s * (s * 6 - 15) + 10);

		// Draw rainbow background

		var steps = 30;
		var radius = 750;

		game.graphics.translate(500, 330);
		game.graphics.scale(Math.sqrt(s), Math.sqrt(s));
		game.graphics.rotate(this.timer * 0.01);

		for (var i = 0; i < steps; i++) {

			game.graphics.fillStyle = 'hsl(' + Math.floor((i / steps) * 360 * 4) + ', 100%, 75%)';
			game.graphics.beginPath();
			game.graphics.moveTo(0, 0);

			var a1 = ((i - 0.1) / steps) * (Math.PI * 2);
			var a2 = ((i + 1.1) / steps) * (Math.PI * 2);
			var r = radius + (((i % 2) == 0) ? 500 : 0);

			game.graphics.lineTo(Math.cos(a1) * r, Math.sin(a1) * r);
			game.graphics.lineTo(Math.cos(a2) * r, Math.sin(a2) * r);
			game.graphics.fill();
		}

		game.graphics.setTransform(1, 0, 0, 1, 0, 0);

		// Draw dog head and text

		var kerning = 70;

		game.graphics.translate(500, 330);
		game.graphics.scale(s, s);
		game.graphics.rotate(Math.cos(this.timer * 0.05) * 0.015);

		game.graphics.drawImage(this.image, -200, -180 + Math.sin(this.timer * 0.1) * 5, this.image.width, this.image.height);

		game.graphics.font = "bold italic 100px Arial";
		game.graphics.textAlign = "center";
		game.graphics.textBaseline = "middle";

		for (var i = 0; i < this.topText.length; i++) {

			var x = i * kerning - ((this.topText.length - 1) / 2) * kerning;
			var y = -225;

			x += Math.cos(i * 0.5 + this.timer * 0.1) * 8;
			y += Math.sin(i * 0.5 + this.timer * 0.1) * 12;

			game.graphics.fillStyle = '#0a1163';
			game.graphics.fillText(this.topText.charAt(i), x + 6, y + 8);
			game.graphics.fillStyle = 'white';
			game.graphics.fillText(this.topText.charAt(i), x, y);
		}

		for (var i = 0; i < this.bottomText.length; i++) {

			var x = i * kerning - ((this.bottomText.length - 1) / 2) * kerning;
			var y = 225;

			x += Math.cos(i * 0.5 + this.timer * 0.1) * 8;
			y += Math.sin(i * 0.5 + this.timer * 0.1) * 12;

			game.graphics.fillStyle = '#0a1163';
			game.graphics.fillText(this.bottomText.charAt(i), x + 6, y + 8);
			game.graphics.fillStyle = 'white';
			game.graphics.fillText(this.bottomText.charAt(i), x, y);
		}

		// Draw statistics

		var text = "you sheared BARKO in " + (this.onFrame / 60).toFixed(2) + " seconds   |   press X to retry";

		game.graphics.font = "bold 20px Arial";
		game.graphics.fillStyle = '#0a1163';
		game.graphics.fillText(text, 0, 313 + Math.cos(this.timer * 0.1 + 0.4) * 3);

		game.graphics.setTransform(1, 0, 0, 1, 0, 0);
	}
}