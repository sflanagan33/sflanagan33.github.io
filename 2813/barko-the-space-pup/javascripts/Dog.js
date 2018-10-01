// ================================================================================================ constructor

SI.Dog = function(x, y) {

	this.x = x;
	this.y = y;

	this.moveXCur = x;
	this.moveYCur = y;
	this.moveXGoal = x;
	this.moveYGoal = y;
	this.moveTimer = 0;
	this.moveHopTime = 50;
	this.moveHopHeight = 75;

	this.jiggle = 0;
	this.jiggleVel = 0;
	this.jiggleAccel = 0.15;
	this.jiggleDecel = 0.8;

	this.imageBottom = new Image();
	this.imageBottom.src = 'images/dogBottom.png';
	this.imageTop = new Image();
	this.imageTop.src = 'images/dogTop.png';
	this.imageFurA = new Image();
	this.imageFurA.src = 'images/dogFurA.png';
	this.imageFurB = new Image();
	this.imageFurB.src = 'images/dogFurB.png';

	this.fur = [[true, true, true],
				[true, true, true],
				[true, true, true],
				[true, true, true],
				[true, true, true],
				[true, true, true],
				[true, true, true]];

	this.furCutPrev = false;
	this.frame = 0;
}

// ================================================================================================ step function

SI.Dog.prototype.step = function(game) {

	// Move the dog

	var t = this.moveTimer++ / this.moveHopTime;

	this.x = this.moveXCur + t * (this.moveXGoal - this.moveXCur);
	this.y = this.moveYCur + t * (this.moveYGoal - this.moveYCur) - (t * (1 - t) * 4 * this.moveHopHeight);

	// If the dog just completed a hop, pick a new goal location and start over

	if (this.moveTimer == this.moveHopTime) {

		this.jiggleVel -= this.moveHopTime / 1500;

		this.moveTimer = 0;
		this.moveHopTime = 40 + Math.floor(Math.random() * 20);
		this.moveHopHeight = this.moveHopTime * 1.5;
		this.moveXCur = this.moveXGoal;
		this.moveYCur = this.moveYGoal;

		this.moveXGoal += (Math.random() * 200) - 100;
		this.moveYGoal += (Math.random() * 50) - 25;

		if (this.moveXGoal < 300)
			this.moveXGoal = 300;
		if (this.moveXGoal > 700)
			this.moveXGoal = 700;
		if (this.moveYGoal < 400)
			this.moveYGoal = 400;
		if (this.moveYGoal > 700)
			this.moveYGoal = 700;
	}

	// Update the jiggle

	this.jiggleVel -= this.jiggle * this.jiggleAccel;
	this.jiggleVel *= this.jiggleDecel;
	this.jiggle += this.jiggleVel;

	// If the game isn't over yet, update the fur state

	if (!game.ending.on) {

		var anyFur = false;
		var justCut = game.input[SI.Input.Cut] && !this.furCutPrev;
		this.furCutPrev = game.input[SI.Input.Cut];

		for (var x = 0; x < this.fur.length; x++) {
			for (var y = 0; y < this.fur[0].length; y++) {

				// If there's no fur at this spot, randomly regrow it

				if (!this.fur[x][y] && Math.random() < 0.0003)
					this.fur[x][y] = true;

				// If there's fur at this spot, check if the player just cut it

				if (this.fur[x][y] && justCut) {
					var t = this.furPosition(x, y);
					var a = game.ship.x - t[0];
					var b = game.ship.y - t[1];
					var dist = Math.sqrt(a * a + b * b);

					if (dist < 50)
						this.fur[x][y] = false;
				}

				// Keep track of any fur

				anyFur |= this.fur[x][y];
			}
		}

		// If no fur left, you won

		if (!anyFur) {
			game.ending.on = true;
			game.ending.onFrame = this.frame;
		} else {
			this.frame++;
		}
	}
}

SI.Dog.prototype.furPosition = function(x, y) {

	return [this.x - 120 + x * 40, this.y - 140 + y * 40];
}

// ================================================================================================ draw function

SI.Dog.prototype.draw = function(game) {

	// Dog bottom

	game.graphics.translate(this.x, this.y);
	game.graphics.scale(1 - this.jiggle, 1 + this.jiggle);
	game.graphics.translate(-300, -320);
	game.graphics.drawImage(this.imageBottom, 0, 0, this.imageBottom.width, this.imageBottom.height);
	game.graphics.setTransform(1, 0, 0, 1, 0, 0);

	// Dog fur

	for (var x = 0; x < this.fur.length; x++) {
		for (var y = 0; y < this.fur[0].length; y++) {
			if (this.fur[x][y]) {
				var p = this.furPosition(x, y);
				var img = y == 2 ? this.imageFurB : this.imageFurA;

				game.graphics.translate(p[0], p[1]);
				game.graphics.translate(-40, -40);
				game.graphics.drawImage(img, 0, 0, img.width, img.height);
				game.graphics.setTransform(1, 0, 0, 1, 0, 0);
			}
		}
	}

	// Dog top

	game.graphics.translate(this.x, this.y);
	game.graphics.scale(1 - this.jiggle, 1 + this.jiggle);
	game.graphics.translate(-300, -320);
	game.graphics.drawImage(this.imageTop, 0, 0, this.imageTop.width, this.imageTop.height);
	game.graphics.setTransform(1, 0, 0, 1, 0, 0);
}