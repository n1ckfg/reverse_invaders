"use strict";

const sW = 640;
const sH = 480;
const fps = 60;

const enemySpawnInterval = 10000;
const enemyHeight = -sH/2.5;
const maxEnemies = 10;

let scaleFactor = 1;
let pg;
let bg;
let enemies = [];
let enemySpawnedLast = 0;
let aliens = [];
let cursor;
let t;

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

    cursor = new Cursor();

    bg = new Starfield(100);
    enemies.push(new Enemy(0, enemyHeight));
}



function draw() {
    t = millis();
    cursor.update();

    bg.run();
    
    if (enemies.length < maxEnemies && t > enemySpawnedLast + enemySpawnInterval) {
        enemySpawnedLast = t;
        enemies.push(new Enemy(0, enemyHeight));
    }

    for (let i=0; i<enemies.length; i++) {
        enemies[i].run();
    }

    for (let i=0; i<aliens.length; i++) {
        aliens[i].run();
    }

    cursor.draw();

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
    aliens.push(new Alien(cursor.pos.x, cursor.pos.y));
}
