class Alien {

	constructor(x, y) {
		this.w = sW/2;
		this.h = sH/2;
		this.origPosY = y;
		this.startPosY = sH + 300;
		this.pos = createVector(x, this.startPosY);
		this.target = createVector(x, y);

		this.alienSize = 20;
		this.alienSpeed = 2;
		this.alive = true;
		this.player = true;
		this.targetMode = true;
		this.ease = 0.05;
	}

	update() {
		this.pos.x += sin(t/random(2.0)) * random(1.0, 2.0);

		if (this.targetMode) {
			this.pos.lerp(this.target, this.ease);

			if (this.pos.dist(this.target) < 1.0) {
				this.targetMode = false;
			}
		} else {
			this.pos.y -= this.alienSpeed;
		}
		

		if (this.hitCheck() || this.pos.y < -this.w - this.alienSize) this.alive = false;
	}

	draw() {
		pg.strokeWeight(1);

		if (this.targetMode) {
			pg.stroke(127, 0, 0, 127);
			pg.line(this.pos.x, this.pos.y, this.target.x, this.target.y);
			pg.stroke(255, 127, 0, random(127, 255));
			pg.fill(255, 0, 0);
			pg.circle(this.target.x, this.target.y, 10);
		}

		pg.stroke(0, 127, 255);
		pg.fill(0, 0, 255);
		pg.push();
		pg.translate(this.pos.x, this.pos.y);
		pg.square(0, 0, this.alienSize);
		pg.pop();
	}

	run() {
		this.update();
		this.draw();
	}

	hitCheck() {
		let returns = false;

		return returns;
	}


}