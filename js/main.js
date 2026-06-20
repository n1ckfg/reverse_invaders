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
let firstRun = true;

function preload() {
    //shader = loadShader('shaders/basic.vert', 'shaders/effect.frag');
}

function setup() {
    scaleFactor = windowHeight / sH;
    let canvasW = sW * scaleFactor;
    let canvasH = sH * scaleFactor;
    createCanvas(canvasW, canvasH);
    frameRate(fps);
    noCursor();

    noSmooth();
    pixelDensity(1);
    rectMode(CENTER);
    ellipseMode(CENTER);
    imageMode(CENTER);

    pg = createGraphics(sW, sH, WEBGL);
    pg.noSmooth();
    pg.pixelDensity(1);
    pg.rectMode(CENTER);
    pg.ellipseMode(CENTER);
    pg.imageMode(CENTER);

    cursor = new Cursor();

    bg = new Starfield();
    enemies.push(new Enemy(0, enemyHeight));
}



function draw() {
    let bulletsCount = 0;

    t = millis();
    cursor.update();

    bg.run();
    
    if (enemies.length < maxEnemies && t > enemySpawnedLast + enemySpawnInterval) {
        enemySpawnedLast = t;
        enemies.push(new Enemy(0, enemyHeight));
    }

    for (let i=0; i<enemies.length; i++) {
        enemies[i].run();
        bulletsCount += enemies[i].bullets.length;
    }

    for (let i=0; i<aliens.length; i++) {
        aliens[i].run();
    }

    for (let i=0; i<aliens.length; i++) {
        if (!aliens[i].alive) aliens.splice(i, 1);
    }

    if (!firstRun) cursor.draw();

    image(pg, width/2, height/2, width, height);

    //console.log("Aliens: " + aliens.length + "   Enemies: " + enemies.length + "   Bullets: " + bulletsCount);
}

function windowResized() {
    scaleFactor = windowHeight / sH;
    let canvasW = sW * scaleFactor;
    let canvasH = sH * scaleFactor;
    resizeCanvas(canvasW, canvasH);
}

function keyPressed() {
    if (keyCode == LEFT_ARROW) {
        console.log("!!!");
    } else if (keyCode == RIGHT_ARROW) {
        console.log("!!!");
    }
}

function mouseMoved() {
    firstRun = false;
}

function mousePressed() {
    if (!firstRun) aliens.push(new Alien(cursor.pos.x, cursor.pos.y));
}
