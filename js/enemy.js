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
		this.fireChance = 0.01;
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

		if (this.hitCheck()) this.alive = false;
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
		// Don't fire offscreen
		if (this.pos.y >= this.origPosY) this.bullets.push(new EnemyBullet(this.pos.x, this.pos.y));
	}

	hitCheck() {
		for (let i=0; i<aliens.length; i++) {
			for (let j=0; j<aliens[i].bullets.length; j++) {
				if (aliens[i].bullets[j].pos.dist(this.pos) < this.enemySize) {
					return true;
				}
			}
		}

		return false;
	}

}


class EnemyBullet {

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
		if (this.pos.y > sH/2) this.alive = false;
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