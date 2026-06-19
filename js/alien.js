class Alien {

	constructor(x, y) {
		this.pos = createVector(x, y);
		this.alienSize = 20;
		this.alienSpeed = 2;
	}

	update() {
		this.pos.x += sin(t/random(2.0)) * random(1.0, 2.0);
		this.pos.y -= this.alienSpeed;
	}

	draw() {
		pg.strokeWeight(1);
		pg.stroke(0, 127, 255);
		pg.fill(0, 0, 255);
		pg.push();
		pg.translate(this.pos.x, this.pos.y);
		pg.square(-this.alienSize / 2, -this.alienSize / 2, this.alienSize);
		pg.pop();
	}

	run() {
		this.update();
		this.draw();
	}

}