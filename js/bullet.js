class Bullet {

	constructor(x, y) {
		this.bulletSize = 10;
		this.bulletSpeed = 1;
		this.bulletSpeedDelta = 0.05;
		this.pos = createVector(x, y);
		this.alive = true;
	}

	update() {
		this.pos.y += this.bulletSpeed;
		this.bulletSpeed += this.bulletSpeedDelta;
		if (this.pos.y > sH) this.alive = false;
	}

	draw() {
		pg.strokeWeight(1);
		pg.stroke(0, 255, 0);
		pg.fill(random(127, 255), random(127, 255), 0);
		pg.push();
		pg.translate(this.pos.x, this.pos.y);
		pg.rotateZ(frameCount * 0.01);
		pg.square(0, 0, this.bulletSize);
		pg.pop();
	}

	run() {
		this.update();
		this.draw();
	}

}