"use strict";

class Enemy {
	
	constructor(x, y) {
		this.w = sW/2;
		this.h = sH/2;
		this.origPosY = y;
		this.startPosY = y - 300;
		this.pos = createVector(x, this.startPosY);
		this.target = createVector(x, this.startPosY);
		
		this.ease = 0.05;
		this.alive = true;
		this.fireChance = 0.1;
		this.enemySize = 30;
		this.emptyScreen = true;
	}

	update() {
		this.emptyScreen === true
		for (let i=0; i<alienSquadrons.length; i++) {
			if (alienSquadrons[i].aliens.length != 0) {
				this.emptyScreen = false;
				break;
			}
		}

		this.pos.y += sin(t/random(2.0)) * random(1.0, 2.0);
		this.pos.lerp(this.target, this.ease);

		if (this.pos.dist(this.target) < 20.0) {
			if (random(1.0) < this.fireChance) this.fireBullet();
			if (this.pos.dist(this.target) < 2.0) this.initTarget();
		}

		if (this.hitCheck()) this.alive = false;
	}

	draw() {
		pg.strokeWeight(1);
		if (this.alive) {
			pg.stroke(0, 255, 0);
			pg.push();
			pg.translate(this.pos.x, this.pos.y);
			pg.fill(127, 255, 127);
			pg.triangle(-this.enemySize/2, -this.enemySize/2, 0, this.enemySize, this.enemySize/2, -this.enemySize/2);
			pg.fill(227, 255, 127);
			pg.circle(0, 0, 20);
			pg.pop();
		} else {
			pg.noStroke();
			pg.fill(255);
			pg.push();
			pg.translate(this.pos.x, this.pos.y);
			pg.circle(0, 0, this.enemySize * random(2, 4));
			pg.pop();	
		}
	}

	run() {
		this.update();
		this.draw();
	}

	initTarget() {
		if (this.emptyScreen) {
			this.target = createVector(random(-this.w, this.w), this.origPosY);
		} else {
			let posArrayX = [];
			for (let i=0; i<alienSquadrons.length; i++) {
				for (let j=0; j<alienSquadrons[i].aliens.length; j++) {
					posArrayX.push(alienSquadrons[i].aliens[j].pos.x);
				}
			}
			posArrayX.sort();
			//console.log(posArrayX.length + " " + posArrayX);

			this.target = createVector(posArrayX[posArrayX.length -1], this.origPosY);
		}
	}

	fireBullet() {
		// Don't fire offscreen
		if (this.pos.y >= this.origPosY) enemyBullets.push(new EnemyBullet(this.pos.x, this.pos.y));
	}

	hitCheck() {
		for (let i=0; i<alienBullets.length; i++) {
			if (alienBullets[i].pos.dist(this.pos) < this.enemySize/2) {
				alienBullets[i].alive = false;
				return true;
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
		this.rotSpeed = 0.01;
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
		pg.rotateZ(frameCount * this.rotSpeed);
		pg.square(0, 0, this.bulletSize);
		pg.pop();
	}

	run() {
		this.update();
		this.draw();
	}

}