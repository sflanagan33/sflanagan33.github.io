// ================================================================================================ constructor

SI.Ship = function(x, y) {

	this.x = x;
	this.y = y;

	this.angle = Math.PI * -0.5;
	this.angularVelocity = 0;
	this.angularAcceleration = 0.015;
	this.angularDeceleration = 0.9;

	this.speedX = 0;
	this.speedY = 0;
	this.speedAcceleration = 0.225;
	this.speedDeceleration = 0.97;

	this.cutPrev = false;
	this.cutAcceleration = 1;
	this.borderAcceleration = 0.03;

	this.image = new Image();
	this.image.src = 'images/ship.png';
	this.image.width = this.image.height = 40;
	this.imageCut = new Image();
	this.imageCut.src = 'images/shipCut.png';
	this.imageCut.width = this.imageCut.height = 40;

	this.trailX = [];
	this.trailY = [];
}

// ================================================================================================ step function

SI.Ship.prototype.step = function(game) {

	// Angular velocity (player input)

	if (game.input[SI.Input.Left])
		this.angularVelocity -= this.angularAcceleration;
	if (game.input[SI.Input.Right])
		this.angularVelocity += this.angularAcceleration;

	this.angularVelocity *= this.angularDeceleration;
	this.angle += this.angularVelocity;

	// Speed - thrust (player input)

	if (game.input[SI.Input.Up]) {
		this.speedX += Math.cos(this.angle) * this.speedAcceleration;
		this.speedY += Math.sin(this.angle) * this.speedAcceleration;
	}

	// Speed - thrust (cutting)

	if (game.input[SI.Input.Cut] && !this.inputCut) {
		this.speedX += Math.cos(this.angle) * this.cutAcceleration;
		this.speedY += Math.sin(this.angle) * this.cutAcceleration;
	}

	this.inputCut = game.input[SI.Input.Cut];

	// Speed - accelerate when inside game border

	var xl = game.border.size - this.x;
	var xr = this.x - (game.graphics.canvas.width - game.border.size);
	var yt = game.border.size - this.y;
	var yb = this.y - (game.graphics.canvas.height - game.border.size);

	if (xl > 0)
		this.speedX += xl * this.borderAcceleration;
	if (xr > 0)
		this.speedX -= xr * this.borderAcceleration;
	if (yt > 0)
		this.speedY += yt * this.borderAcceleration;
	if (yb > 0)
		this.speedY -= yb * this.borderAcceleration;

	// Speed - deceleration

	this.speedX *= this.speedDeceleration;
	this.speedY *= this.speedDeceleration;

	// Store trail positions (but not too many)

	this.trailX.unshift(this.x);
	this.trailY.unshift(this.y);

	if (this.trailX.length > 50) {
		this.trailX.pop();
		this.trailY.pop();
	}

	// Move

	this.x += this.speedX;
	this.y += this.speedY;
}

// ================================================================================================ draw function

SI.Ship.prototype.draw = function(game) {

	// Trail

	game.graphics.lineWidth = 4;
	game.graphics.lineCap = 'round';
	game.graphics.strokeStyle = '#ffed97';

	game.graphics.beginPath();
	game.graphics.moveTo(this.trailX[0], this.trailY[0]);

	for (var i = 1; i < this.trailX.length; i++) {

		if ((i % 7) > 4)
			game.graphics.lineTo(this.trailX[i], this.trailY[i]);
		else
			game.graphics.moveTo(this.trailX[i], this.trailY[i]);
	}

	game.graphics.stroke();

	// Ship

	var img = game.input[SI.Input.Cut] ? this.imageCut : this.image;

	game.graphics.translate(this.x, this.y);
	game.graphics.rotate(this.angle);
	game.graphics.translate(img.width * -0.5, img.height * -0.5);
	game.graphics.drawImage(img, 0, 0, img.width, img.height);
	game.graphics.setTransform(1, 0, 0, 1, 0, 0);
}