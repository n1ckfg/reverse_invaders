class Enemy {
	
	constructor(x, y) {
		this.w = sW/2;
		this.h = sH/2;
		this.origPosY = y;
		this.startPosY = y - 300;
		this.pos = createVector(x, this.startPosY);
		this.target = createVector(x, this.startPosY);
		
		this.ease = 0.05;
		this.bullets = [];
		this.alive = true;
		this.fireChance = 0.05;
		this.enemySize = 30;
	}

	update() {
		this.pos.y += sin(t/random(2.0)) * random(1.0, 2.0);
		this.pos.lerp(this.target, this.ease);

		if (this.pos.dist(this.target) < 1.0) {
			this.initTarget();
			this.fireBullet();
		} else {
			if (random(1.0) < this.fireChance) {
				this.fireBullet();
			}
		}

		for (let i=0; i<this.bullets.length; i++) {
			this.bullets[i].update();
		}

		for (let i=0; i<this.bullets.length; i++) {
			if (!this.bullets[i].alive) this.bullets.splice(i, 1);
		}
	}

	draw() {
		pg.strokeWeight(1);
		pg.stroke(0, 255, 0);
		pg.push();
		pg.translate(this.pos.x, this.pos.y);
		pg.fill(127, 255, 127);
		pg.triangle(-this.enemySize/2, -this.enemySize/2, 0, this.enemySize, this.enemySize/2, -this.enemySize/2);
		pg.fill(227, 255, 127);
		pg.circle(0, 0, 20);
		pg.pop();

		for (let i=0; i<this.bullets.length; i++) {
			this.bullets[i].draw();
		}
	}

	run() {
		this.update();
		this.draw();
	}

	initTarget() {
		this.target = createVector(random(-this.w, this.w), this.origPosY);
	}

	fireBullet() {
		this.bullets.push(new Bullet(this.pos.x, this.pos.y));
	}

}