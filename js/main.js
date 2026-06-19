"use strict";

let sW = 640;
let sH = 480;
let fps = 60;
let scaleFactor = 1;
let pg;

let bg, enemy;

function preload() {
    //shader = loadShader('shaders/basic.vert', 'shaders/effect.frag');
}

function setup() {
    scaleFactor = windowHeight / sH;
    let canvasW = sW * scaleFactor;
    let canvasH = sH * scaleFactor;
    createCanvas(canvasW, canvasH);
    pixelDensity(1);
    noCursor();
    frameRate(fps);
    noStroke();
    noSmooth();

    pg = createGraphics(sW, sH, WEBGL);
    pg.pixelDensity(1);
    pg.noStroke();

    bg = new Starfield(100);
    enemy = new Enemy(0, -pg.height/2.5);
}



function draw() {
    bg.run();
    enemy.run();

    image(pg, 0, 0, width, height);
}

function windowResized() {
    scaleFactor = windowHeight / sH;
    let canvasW = sW * scaleFactor;
    let canvasH = sH * scaleFactor;
    resizeCanvas(canvasW, canvasH);
}

function keyPressed() {

}

function mouseMoved() {

}

function mousePressed() {

}
