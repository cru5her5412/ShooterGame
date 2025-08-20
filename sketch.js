setupDone = false;
function setup() {
  preload();
  createCanvas(1400, 1400);
  a = width / 2;
  b = height / 2;
  c = 0;
  ScoreIncrease = false;
  Score = 0;
  PlayerDead = false;
  EnemyADead = false;
  EnemyBDead = false;
  c = 0;
  rectMode(CENTER);
  imageMode(CENTER);
  frameRate(30);
  background(c);
  textSize(200);
  textAlign(CENTER);
  enemy = {
    enemyXCoord: [width + 50, width + 50, -50, -50],
    enemyYCoord: [-50, height + 50, -50, height + 50],
    enemyHP: [9, 9, 9, 9],
    enemyMoveSpeed: [5, 5, 5, 5],
    enemyImageUsed: [0, 1, 2, 3],
  };
  projectile = {
    projectileXCoord: [],
    projectileYCoord: [],
    projectileDX: [],
    projectileDY: [],
    projectileDamage: [],
  };
  setupDone = true;
}
function preload() {
  enemy1 = loadImage("./Images/Enemy1.png");
  enemy2 = loadImage("./Images/Enemy2.png");
  enemy3 = loadImage("./Images/Enemy3.png");
  enemy4 = loadImage("./Images/Enemy4.png");
  playerImage = loadImage("./Images/Player.png");
  bullet = loadImage("./Images/Bullet.png");
  bossImage = loadImage("./Images/Boss.png");
  bossBulletImage = loadImage("./Images/BossBullet.png");
  reticle = loadImage("./Images/Reticle.png");
  ammoBar = loadImage("./Images/AmmoBar.png");
}

function draw() {
  background(c);
  textSize(20);
  text("Score: " + Score, 100, 100);
  textSize(200);
  limitToScreen();
  displayEnemy();
  enemyTrackPlayer();
  Character();
  projectileLogic();
  deathDetection();
}
function projectileLogic() {
  for (i = 0; i < projectile.projectileXCoord.length; i++) {
    if (PlayerDead === false) {
      image(
        bullet,
        projectile.projectileXCoord[i],
        projectile.projectileYCoord[i]
      );
      if (projectile.projectileDX[i] != 0 || projectile.projectileDY[i] != 0) {
        projectile.projectileXCoord[i] =
          projectile.projectileXCoord[i] + projectile.projectileDX[i];
        projectile.projectileYCoord[i] =
          projectile.projectileYCoord[i] + projectile.projectileDY[i];
      }
    }
  }
}
function mousePressed() {
  if (setupDone === true) {
    if (mouseButton === LEFT) {
      projectile.projectileXCoord.push(a);
      projectile.projectileYCoord.push(b);
      projectile.projectileDX.push((mouseX - a) / 10);
      projectile.projectileDY.push((mouseY - b) / 10);
      projectile.projectileDamage.push(10);
    }
  }
}
function EdgeCheck() {
  for (i = 0; i < projectile.projectileDX.length; i++) {
    if (projectile.projectileXCoord[i] - 50 > width - 400) {
      projectile.projectileXCoord[i].splice(i, 1);
      projectile.projectileYCoord[i].splice(i, 1);
    }
    if (projectile.projectileXCoord[i] + 50 < 400) {
      projectile.projectileXCoord[i].splice(i, 1);
      projectile.projectileYCoord[i].splice(i, 1);
    }
    if (projectile.projectileYCoord[i] - 50 > width - 400) {
      projectile.projectileXCoord[i].splice(i, 1);
      projectile.projectileYCoord[i].splice(i, 1);
    }
    if (projectile.projectileYCoord[i] + 50 < 400) {
      projectile.projectileXCoord[i].splice(i, 1);
      projectile.projectileYCoord[i].splice(i, 1);
    }
  }
}
function Character() {
  if (keyIsDown(65)) {
    a = a - 10;
  }
  if (keyIsDown(68)) {
    a = a + 10;
  }
  if (keyIsDown(83)) {
    b = b + 10;
  }
  if (keyIsDown(87)) {
    b = b - 10;
  }
  if (PlayerDead === false) {
    image(playerImage, a, b);
  }
}

function deathDetection() {
  for (i = 0; i < enemy.enemyXCoord.length; i++) {
    xx = enemy.enemyXCoord[i] - 50;
    yy = enemy.enemyYCoord[i] - 50;
    if (PlayerDead === false) {
      for (j = 0; j < 100; j++) {
        if (xx < a + 50 && xx > a - 50) {
          if (yy < b + 50 && yy > b - 50) {
            PlayerDead = true;
          }
        }
        xx = xx + 1;
        yy = yy + 1;
      }
    }
  }

  if (PlayerDead === true) {
    noLoop();
    clear();
    background(c);
    stroke(180, 20, 60);
    fill(150, 20, 40);
    text(`You Died`, width / 2, height / 2);
  }
}

function killDetection() {
  for (i = 0; i < enemy.enemyXCoord.length; i++) {
    if (enemy.enemyHP[i] === false) {
      x = enemy.enemyXCoord[i] - 50;
      y = enemy.enemyYCoord[i] - 50;
      for (counter = 0; counter < 100; counter++) {
        for (j = 0; j < projectile.projectileXCoord.length; j++)
          if (
            x < projectile.projectileXCoord[j] + 25 &&
            x > projectile.projectileXCoord[j] - 25
          ) {
            if (
              y < projectile.projectileYCoord[j] + 25 &&
              y > projectile.projectileYCoord[j] - 25
            ) {
              projectile.projectileXCoord[j].splice(j, 1);
              projectile.projectileYCoord[j].splice(j, 1);
              enemy.enemyHP[i] =
                enemy.enemyHP[i] - projectile.projectileDamage[j];
              enemyRespawn();
              ScoreIncrease = true;

              x = x + 1;
              y = y + 1;
            }
          }
        if (ScoreIncrease === true) {
          Score = Score + 1;
          ScoreIncrease = false;
        }
      }
    }
  }
}
function limitToScreen() {
  a = constrain(a, 0, width);
  b = constrain(b, 0, height);
}

function keyPressed() {
  if (key === "r") {
    setup();
    loop();
  }
}

function displayEnemy() {
  for (i = 0; i < enemy.enemyXCoord.length; i++) {
    enemy.enemyXCoord[i] = constrain(enemy.enemyXCoord[i], -50, height + 50);
    enemy.enemyYCoord[i] = constrain(enemy.enemyYCoord[i], -50, height + 50);
    if (enemy.enemyHP[i] > 0) {
      switch (enemy.enemyImageUsed[i]) {
        case 0:
          image(enemy1, enemy.enemyXCoord[i], enemy.enemyYCoord[i], 100, 100);
          break;
        case 1:
          image(enemy2, enemy.enemyXCoord[i], enemy.enemyYCoord[i], 100, 100);
          break;
        case 3:
          image(enemy3, enemy.enemyXCoord[i], enemy.enemyYCoord[i], 100, 100);
          break;
        case 4:
          image(enemy4, enemy.enemyXCoord[i], enemy.enemyYCoord[i], 100, 100);
          break;
        default:
          image(enemy1, enemy.enemyXCoord[i], enemy.enemyYCoord[i], 100, 100);
          break;
      }
    }
  }
}

function enemyTrackPlayer() {
  for (i = 0; i < enemy.enemyXCoord.length; i++) {
    if (enemy.enemyHP[i] > 0) {
      if (a < enemy.enemyXCoord[i]) {
        enemy.enemyXCoord[i] = enemy.enemyXCoord[i] - enemy.enemyMoveSpeed[i];
      }
      if (a > enemy.enemyXCoord[i]) {
        enemy.enemyXCoord[i] = enemy.enemyXCoord[i] + enemy.enemyMoveSpeed[i];
      }

      if (b < enemy.enemyYCoord[i]) {
        enemy.enemyYCoord[i] = enemy.enemyYCoord[i] - enemy.enemyMoveSpeed[i];
      }
      if (b > enemy.enemyYCoord[i]) {
        enemy.enemyYCoord[i] = enemy.enemyYCoord[i] + enemy.enemyMoveSpeed[i];
      }
    }
  }
}
function enemyRespawn() {}
