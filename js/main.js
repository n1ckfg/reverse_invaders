"use strict";

const sW = 640;
const sH = 480;
const fps = 60;

const enemySpawnInterval = 10000;
const noEnemySpawnInterval = 2000;
const enemyHeight = -sH/2.5;
const maxEnemies = 10;

let scaleFactor = 1;
let pg;
let bg;
let enemies = [];
let enemyBullets = [];
let enemySpawnedLast = 0;
let alienSquadrons = [];
let alienBullets = [];
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

    alienSquadrons.push(new AlienSquadron());
}

function draw() {
    t = millis();
    cursor.update();

    bg.run();
    
    if ((enemies.length < maxEnemies && t > enemySpawnedLast + enemySpawnInterval) || enemies.length === 0 && t > enemySpawnedLast + noEnemySpawnInterval) {
        enemySpawnedLast = t;
        enemies.push(new Enemy(0, enemyHeight));
    }

    // update
    for (let i=0; i<enemyBullets.length; i++) {
        enemyBullets[i].update();
    }

    for (let i=0; i<alienBullets.length; i++) {
        alienBullets[i].update();
    }

    for (let i=0; i<enemies.length; i++) {
        enemies[i].run();
    }

    if (keyIsPressed) {
        if (keyCode == LEFT_ARROW) {
            alienSquadrons[alienSquadrons.length-1].move(true);
        } else if (keyCode == RIGHT_ARROW) {
            alienSquadrons[alienSquadrons.length-1].move(false);
        }        
    }

    for (let i=0; i<alienSquadrons.length; i++) {
        alienSquadrons[i].run();
    }

    // draw
    for (let i=0; i<enemyBullets.length; i++) {
        enemyBullets[i].draw();
    }

    for (let i=0; i<alienBullets.length; i++) {
        alienBullets[i].draw();
    }

    if (!firstRun) cursor.draw();

    image(pg, width/2, height/2, width, height);

    // cleanup
    for (let i=0; i<enemyBullets.length; i++) {
        if (!enemyBullets[i].alive) enemyBullets.splice(i, 1);
    }

    for (let i=0; i<enemies.length; i++) {
        if (!enemies[i].alive) enemies.splice(i, 1);
    }

    for (let i=0; i<alienBullets.length; i++) {
        if (!alienBullets[i].alive) alienBullets.splice(i, 1);
    }

    for (let i=0; i<alienSquadrons.length; i++) {
        if (!alienSquadrons[i].alive) alienSquadrons.splice(i, 1);
        if (alienSquadrons.length === 0) alienSquadrons.push(new AlienSquadron());
    }

    //console.log("Squadrons: " + alienSquadrons.length + ", Bullets: " + alienBullets.length + "\nEnemies: " + enemies.length + ", Bullets: " + enemyBullets.length);
}

function windowResized() {
    scaleFactor = windowHeight / sH;
    let canvasW = sW * scaleFactor;
    let canvasH = sH * scaleFactor;
    resizeCanvas(canvasW, canvasH);
}

/*
function keyPressed() {
    if (keyCode == LEFT_ARROW) {
        alienSquadrons[alienSquadrons.length-1].move(true);
    } else if (keyCode == RIGHT_ARROW) {
        alienSquadrons[alienSquadrons.length-1].move(false);
    }
}
*/

function mouseMoved() {
    firstRun = false;
}

function mousePressed() {
    if (alienSquadrons[alienSquadrons.length-1].complete) {
        for (let i=0; i<alienSquadrons.length; i++) {
            alienSquadrons[i].controllable = false;
        }
        alienSquadrons.push(new AlienSquadron());
    }
    if (!firstRun) alienSquadrons[alienSquadrons.length-1].addAlien();
}
