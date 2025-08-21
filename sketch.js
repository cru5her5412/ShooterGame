setupDone = false;
function setup() {
  preload();
  //doc = document.querySelector("html"); //selects whole document
  createCanvas(2000, 1000);
  frameCount = 0;
  a = width / 2;
  b = height / 2;
  ScoreIncrease = false;
  Score = 0;
  PlayerDead = false;
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
  scoreText();
  limitToScreen();
  Character();
  projectileLogic();
  EdgeCheck();
  killDetection();
  //deathDetection();
  enemyFunctions();
}
function scoreText() {
  textSize(20);
  text(`Score: ${Score}`, 100, 100);
  textSize(200);
}
function enemyFunctions() {
  enemyRespawn();
  enemyTrackPlayer();
  displayEnemy();
  enemyDie();
}
function projectileLogic() {
  for (i = 0; i < projectile.projectileXCoord.length; i++) {
    if (PlayerDead === false) {
      image(
        bullet,
        projectile.projectileXCoord[i],
        projectile.projectileYCoord[i],
        50,
        50
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
      // projectile.projectileDX.push((mouseX - a) / 10);
      // projectile.projectileDY.push((mouseY - b) / 10);
      X = mouseX - a;
      Y = mouseY - b;
      if (Y <= 0 && X <= 0) {
        angle = acos(X / sqrt(X ** 2 + Y ** 2));
      } else {
        angle = acos(X / sqrt(X ** 2 + Y ** 2));
      }
      if (X > 0) {
        dx = 10 * cos(angle);
      } else if (X < 0) {
        dx = 10 * cos(angle);
      }
      if (Y > 0) {
        dy = 10 * sin(angle);
      } else if (Y < 0) {
        dy = -10 * sin(angle);
      }
      projectile.projectileDX.push(dx);
      projectile.projectileDY.push(dy);
      // proj.dx.push(dx)
      // proj.dy.push(dy)
      projectile.projectileDamage.push(10);
    }
  }
}
function EdgeCheck() {
  for (i = 0; i < projectile.projectileDX.length; i++) {
    if (projectile.projectileXCoord[i] - 50 > width) {
      projectile.projectileXCoord.splice(i, 1);
      projectile.projectileYCoord.splice(i, 1);
      projectile.projectileDX.splice(i, 1);
      projectile.projectileDY.splice(i, 1);
      projectile.projectileDamage.splice(i, 1);
    }
    if (projectile.projectileXCoord[i] + 50 < 0) {
      projectile.projectileXCoord.splice(i, 1);
      projectile.projectileYCoord.splice(i, 1);
      projectile.projectileDX.splice(i, 1);
      projectile.projectileDY.splice(i, 1);
      projectile.projectileDamage.splice(i, 1);
    }
    if (projectile.projectileYCoord[i] - 50 > width) {
      projectile.projectileXCoord.splice(i, 1);
      projectile.projectileYCoord.splice(i, 1);
      projectile.projectileDX.splice(i, 1);
      projectile.projectileDY.splice(i, 1);
      projectile.projectileDamage.splice(i, 1);
    }
    if (projectile.projectileYCoord[i] + 50 < 0) {
      projectile.projectileXCoord.splice(i, 1);
      projectile.projectileYCoord.splice(i, 1);
      projectile.projectileDX.splice(i, 1);
      projectile.projectileDY.splice(i, 1);
      projectile.projectileDamage.splice(i, 1);
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
    if (enemy.enemyHP[i] > 0) {
      x = enemy.enemyXCoord[i] - 50;
      y = enemy.enemyYCoord[i] - 50;
      for (counter = 0; counter < 100; counter++) {
        for (j = 0; j < projectile.projectileXCoord.length; j++) {
          if (
            x < projectile.projectileXCoord[j] + 25 &&
            x > projectile.projectileXCoord[j] - 25
          ) {
            if (
              y < projectile.projectileYCoord[j] + 25 &&
              y > projectile.projectileYCoord[j] - 25
            ) {
              projectile.projectileXCoord.splice(j, 1);
              projectile.projectileYCoord.splice(j, 1);
              projectile.projectileDX.splice(j, 1);
              projectile.projectileDY.splice(j, 1);
              projectile.projectileDamage.splice(j, 1);
              enemy.enemyHP[i] =
                enemy.enemyHP[i] - projectile.projectileDamage[j];

              ScoreIncrease = true;
            }
          }
          if (ScoreIncrease === true) {
            Score = Score + 1;
            ScoreIncrease = false;
          }
        }
        x = x + 1;
        y = y + 1;
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
    // enemy.enemyXCoord[i] = constrain(enemy.enemyXCoord[i], -50, height + 50);
    // enemy.enemyYCoord[i] = constrain(enemy.enemyYCoord[i], -50, height + 50);
    if (enemy.enemyHP[i] > 0 && PlayerDead === false) {
      switch (enemy.enemyImageUsed[i]) {
        case 0:
          image(enemy1, enemy.enemyXCoord[i], enemy.enemyYCoord[i], 100, 100);
          break;
        case 1:
          image(enemy2, enemy.enemyXCoord[i], enemy.enemyYCoord[i], 100, 100);
          break;
        case 2:
          image(enemy3, enemy.enemyXCoord[i], enemy.enemyYCoord[i], 100, 100);
          break;
        case 3:
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
function enemyRespawn() {
  LorR = random(0, 1);
  if (LorR <= 0.5) {
    newX = -50;
  } else if (LorR > 0.5) {
    newX = width + 50;
  }
  UorD = random(0, 1);
  if (UorD <= 0.5) {
    newY = -50;
  } else if (UorD > 0.5) {
    newY = height + 50;
  }

  if (frameCount % 300 === 0) {
    enemy.enemyXCoord.push(newX);
    enemy.enemyYCoord.push(newY);
    enemy.enemyHP.push(9);
    enemy.enemyMoveSpeed.push(7);
    enemy.enemyImageUsed.push(floor(random(0, 4)));
  }
}
function enemyDie() {
  enemy.enemyHP.forEach(function (HP, index) {
    if (HP <= 0) {
      enemy.enemyXCoord.splice(index, 1);
      enemy.enemyYCoord.splice(index, 1);
      enemy.enemyHP.splice(index, 1);
      enemy.enemyMoveSpeed.splice(index, 1);
      enemy.enemyImageUsed.splice(index, 1);
    }
  });
  //
  // for (i = 0; i < enemy.enemyHP.length; i++) {
  //     enemy.enemyXCoord.splice(i, 1);
  //     enemy.enemyYCoord.splice(i, 1);
  //     enemy.enemyHP.splice(i, 1);
  //     enemy.enemyMoveSpeed.splice(i, 1);
  //   }
}
