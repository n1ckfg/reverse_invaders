class Bullet {

	constructor(x, y, s, ss) {
		this.bulletSize = s;
		this.bulletSpeed = ss;
		this.pos = createVector(x - this.bulletSize/2.0, y);
	}

	update() {
		this.pos.y += this.bulletSpeed;
		this.bulletSpeed += 0.8;
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