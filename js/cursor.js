"use strict";

class Cursor {

	constructor() {
		this.orig_pos = createVector(0, 0);
		this.pos = createVector(0, 0);
		this.cursorSize = 10;
	}

	update() {
		this.orig_pos.x = mouseX / scaleFactor - sW / 2;
		this.orig_pos.y = mouseY / scaleFactor - sH / 2;

		this.pos.x = this.orig_pos.x;

		if (this.orig_pos.y < 0) {
			this.pos.y = 0;
		} else {
			this.pos.y = this.orig_pos.y;
		}
	}

	draw() {
		pg.noFill();
	
		pg.strokeWeight(2);
		pg.stroke(127, 127);

		pg.push();
		pg.translate(this.pos.x, this.pos.y);
		pg.line(0, -this.cursorSize, 0, this.cursorSize);
		pg.line(-this.cursorSize, 0, this.cursorSize, 0);
		pg.pop();

		if (mouseIsPressed) {
			pg.strokeWeight(2);
			pg.stroke(255, 127, 0);
		} else {
			pg.strokeWeight(1);
			pg.stroke(255);
		}
		
		pg.push();
		pg.translate(this.orig_pos.x, this.orig_pos.y);
		pg.line(0, -this.cursorSize, 0, this.cursorSize);
		pg.line(-this.cursorSize, 0, this.cursorSize, 0);
		pg.pop();
	}

	run() {
		this.update();
		this.draw();
	}

}