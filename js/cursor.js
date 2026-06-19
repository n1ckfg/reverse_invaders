class Cursor {

	constructor() {
		this.pos = createVector(0, 0);
		this.cursorSize = 10;
	}

	update() {
		this.pos.x = mouseX;
		this.pos.y = mouseY;
	}

	draw() {
		pg.noFill();
		pg.strokeWeight(1);
		pg.stroke(255);
		pg.push();
		pg.translate(this.pos.x, this.pos.y);
		pg.line(-this.cursorSize, 0, this.cursorSize, 0);
		pg.line(0, -this.cursorSize, 0, this.cursorSize);
		pg.pop();
	}

	run() {
		this.update();
		this.draw();
	}

}