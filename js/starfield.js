"use strict";

class Starfield {

	constructor(n) {
		this.stars = [];
		this.w = pg.width/2;
		this.h = pg.height/2;
		this.starSize = 2;
		this.starSpeed = 2;

		for (let i=0; i<n; i++) {
			this.makeNewStar(true);
		}
	}

	makeNewStar(first) {
		let w = random(-this.w, this.w);
		let s = random(this.starSize/2.0, this.starSize);
		let ss = random(this.starSpeed/2.0, this.starSpeed);

		if (first) {
			this.stars.push(new Star(w, random(-this.h, this.h), s, ss));
		} else {
			this.stars.push(new Star(w, this.h + this.starSize, s, ss));		
		}
	}

	run() {
	    pg.background(127);
	
		for (let i=0; i<this.stars.length; i++) {
			this.stars[i].run();
		}

		for (let i=0; i<this.stars.length; i++) {
			if (this.stars[i].pos.y < -this.h - this.starSize) {
				this.stars.splice(i, 1);
				this.makeNewStar(false);
			}
		}
	}

}


class Star {

	constructor(w, h, s, ss) {
		this.pos = createVector(w, h);
		this.starSize = s;
		this.starSpeed = ss;
	}
	update() {
		this.pos.y -= this.starSpeed;
	}

	draw() {
		pg.stroke(255);
		pg.strokeWeight(this.starSize);
		pg.point(this.pos.x, this.pos.y);
	}

	run() {
		this.update();
		this.draw();
	}

}