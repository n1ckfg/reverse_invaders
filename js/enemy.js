class Enemy {
	
	constructor(x, y) {
		this.w = pg.width/2;
		this.h = pg.height/2;
		this.pos = createVector(x, y);
		this.target = createVector(x, y);
		this.ease = 0.1;
		this.bullets = [];
	}

	update() {
		this.pos.lerp(this.target, this.ease);
		if (this.pos.dist(this.target) < 1.0) {
			this.initTarget();
			this.fireBullet();
		}

		for (let i=0; i<this.bullets.length; i++) {
			this.bullets[i].run();
		}
	}

	draw() {
		pg.strokeWeight(1);
		pg.stroke(0, 255, 0);
		pg.push();
		pg.translate(this.pos.x, this.pos.y,);
		pg.scale(0.5);
		pg.fill(127, 255, 127);
		pg.triangle(-20, -25, 0, 60, 20, -25);
		pg.fill(227, 255, 127);
		pg.circle(0, 0, 20);
		pg.pop();
	}

	run() {
		this.update();
		this.draw();
	}

	initTarget() {
		this.target = createVector(random(-this.w, this.w), this.pos.y);
	}

	fireBullet() {
		this.bullets.push(new Bullet(this.pos.x, this.pos.y + 15, 10, 2));
	}

}