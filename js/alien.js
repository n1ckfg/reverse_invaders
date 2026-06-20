class Alien {

	constructor(x, y) {
		this.w = sW/2;
		this.h = sH/2;
		this.origPosY = y;
		this.startPosY = sH + 300;
		this.goalPosY = enemyHeight;
		this.pos = createVector(x, this.startPosY);
		this.target = createVector(x, y);

		this.alienSize = 20;
		this.alienSpeed = 2;
		this.alive = true;
		this.player = true;
		this.targetMode = true;
		this.ease = 0.05;
		this.fired = false;
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
		
		if (this.hitCheck()) {
			this.alive = false;
		} else if (this.pos.y < this.goalPosY && !this.fired) {
			this.fireBullet();
			this.fired = true;
			this.alive = false;
		}
	}

	draw() {
		pg.strokeWeight(1);

		if (this.alive) {
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
		} else {
			pg.noStroke();
			pg.fill(255);
			pg.push();
			pg.translate(this.pos.x, this.pos.y);
			pg.circle(0, 0, this.alienSize * random(2, 4));
			pg.pop();			
		}

	}

	run() {
		this.update();
		this.draw();
	}

	hitCheck() {
		for (let i=0; i<enemyBullets.length; i++) {
			if (enemyBullets[i].pos.dist(this.pos) < this.alienSize) {
				enemyBullets[i].alive = false;
				return true;
			}
		}

		return false;
	}

	fireBullet() {
		alienBullets.push(new AlienBullet(this.pos.x, this.pos.y, true));
		alienBullets.push(new AlienBullet(this.pos.x, this.pos.y, false));
	}

}


class AlienBullet {

	constructor(x, y, left) {
		this.bulletSize = 10;
		this.bulletSpeed = 1;
		this.bulletSpeedDelta = 0.05;
		this.pos = createVector(x, y);
		this.alive = true;
		this.isLeft = left;
		this.rotSpeed = 0.1;
	}

	update() {
		if (this.isLeft) {
			this.pos.x -= this.bulletSpeed;
			if (this.pos.x < -sW/2) this.alive = false;
		} else {
			this.pos.x += this.bulletSpeed;		
			if (this.pos.x > sW/2) this.alive = false;
		}
		this.bulletSpeed += this.bulletSpeedDelta;
	}

	draw() {
		if (this.alive) {
			pg.strokeWeight(1);
			pg.stroke(0, 0, 255);
			pg.fill(0, random(127, 255), random(127, 255));
			pg.push();
			pg.translate(this.pos.x, this.pos.y);
			if (this.isLeft) {
				pg.rotateZ(frameCount * -this.rotSpeed);
			} else {
				pg.rotateZ(frameCount * this.rotSpeed);			
			}
			pg.square(0, 0, this.bulletSize);
			pg.pop();
		} else {
			pg.noStroke();
			pg.fill(255);
			pg.circle(this.pos.x, this.pos.y, random(this.bulletSize, this.bulletSize*2));
		}
	}

	run() {
		this.update();
		this.draw();
	}

}