setupDone=false
function setup() {
  preload()
  createCanvas(1400, 1400);
  a = width/2
  b = height/2
  c = 0
  ScoreIncrease = false
  Score = 0
  PlayerDead = false
  EnemyADead = false
  EnemyBDead = false
  c = 0
  rectMode(CENTER);
  imageMode(CENTER);
  frameRate(30);
  background(c);
  textSize(200);
  textAlign(CENTER);
    enemy = {
    enemyXCoord:[width + 50, width + 50, -50, -50],
    enemyYCoord:[-50, height + 50, -50, height + 50],
    enemyHP:[9, 9,9, 9],
    enemyMoveSpeed:[5,5,5,5],
    enemyImageUsed:[0,1,2, 3]
  }
   projectile = {
    projectileXCoord:[],
    projectileYCoord:[],
    projectileDX:[],
    projectileDY:[],
    projectileDamage:[],
  }
  setupDone=true
}
function preload(){
  enemy1= loadImage("./Images/Enemy1.png");
  enemy2= loadImage("./Images/Enemy2.png");
  enemy3= loadImage("./Images/Enemy3.png");
  enemy4= loadImage("./Images/Enemy4.png");
  playerImage = loadImage("./Images/Player.png")
  bullet=loadImage("./Images/Bullet.png")
  bossImage=loadImage("./Images/Boss.png")
  bossBulletImage=loadImage("./Images/BossBullet.png")
  reticle=loadImage("./Images/Reticle.png")
  ammoBar=loadImage("./Images/AmmoBar.png")
}


function draw() {
  //clear()
  background(c)
  textSize(20)
  text("Score: " + Score, 100, 100)
  textSize(200)
  limitToScreen()
  displayEnemy()
  enemyTrackPlayer()
 // image(enemy1, 300,300 )
  // if(second() % 100 === 0){
  // }
  x = x + dx / 3
  y = y + dy / 3
  

  r = random(0, 1)
  Character()
  // EdgeCheck(x, y, 1)
  // EdgeCheck(xi, yi, 2)
  // EdgeCheck(xii, yii, 3)
  projectileLogic()
  // killDetection(x, y, dy, dx, 1, enemyXCoord, enemyYCoord, 1)
  // killDetection(xi, yi, dyi, dxi, 2, enemyXCoord, enemyYCoord, 1)
  // killDetection(xii, yii, dyii, dxii, 3, enemyXCoord, enemyYCoord, 1)
  // killDetection(x, y, dy, dx, 1, cc, dd, 2)
  // killDetection(xi, yi, dyi, dxi, 2, cc, dd, 2)
  // killDetection(xii, yii, dyii, dxii, 3, cc, dd, 2)
  deathDetection()

  if (PlayerDead === false){
  if (Projectile1Active === true) {
    rect(x, y, 50, 50)
  }
  if (Projectile2Active === true) {
    rect(xi, yi, 50, 50)
  }
  if (Projectile3Active === true) {
    rect(xii, yii, 50, 50)
  }
}
}
function projectileLogic(){
  for(i=0;i<projectile.projectileXCoord.length;i++){
image(bullet,projectile.projectileXCoord[i],projectile.projectileYCoord[i]);
    if(projectile.projectileDX[i]!=0||projectile.projectileDY[i]!=0){projectile.projectileXCoord[i]=projectile.projectileXCoord[i] + projectile.projectileDX[i];
    projectile.projectileYCoord[i]=projectile.projectileYCoord[i] + projectile.projectileDY[i];
  }
  }
}
function mousePressed() {
  if(setupDone===true){
  if (mouseButton === LEFT) {
    projectile.projectileXCoord.push(a);
    projectile.projectileYCoord.push(b);
    projectile.projectileDX.push((mouseX-a)/10);
    projectile.projectileDY.push((mouseY-b)/10);
    projectile.projectileDamage.push(10);
    }
//     if (projectileCounter === 1) {
//       Projectile1Active = true
//       dy = (mouseY - b) / 10
//       dx = (mouseX - a) / 10
//       x = a
//       y = b
//     }
//     if (projectileCounter === 2) {
//       Projectile2Active = true
//       dyi = (mouseY - b) / 10
//       dxi = (mouseX - a) / 10
//       xi = a
//       yi = b
//     }
//     if (projectileCounter === 3) {
//       Projectile3Active = true
//       dyii = (mouseY - b) / 10
//       dxii = (mouseX - a) / 10
//       xii = a
//       yii = b
//     }
//   }

}
}
function EdgeCheck(X, Y, u) {
  if (X > width) {

    if (u === 1) {
      x = width + 100
      y = height + 100
    }
    if (u === 2) {
      xi = width + 100
      yi = height + 100
    }
    if (u === 3) {
      xii = width + 100
      yii = height + 100
    }
  }
  if (X < 0) {
    if (u === 1) {
      x = 0
      y = 0
    }
    if (u === 2) {
      xi = 0
      yi = 0
    }
    if (u === 3) {
      xii = 0
      yii = 0
    }
  }
  if (Y > width) {

    if (u === 1) {
      x = width + 100
      y = height + 100
    }
    if (u === 2) {
      xi = width + 100
      yi = height + 100
    }
    if (u === 3) {
      xii = width + 100
      yii = height + 100
    }
  }
  if (Y < 0) {

    if (u === 1) {
      x = 0
      y = 0
    }
    if (u === 2) {
      xi = 0
      yi = 0
    }
    if (u === 3) {
      xii = 0
      yii = 0
    }
  }
}

function Character() {
  if (keyIsDown(65)) {
    a = a - 10
  }
  if (keyIsDown(68)) {
    a = a + 10
  }
  if (keyIsDown(83)) {
    b = b + 10
  }
  if (keyIsDown(87)) {
    b = b - 10
  }
  if (PlayerDead === false) {
    image(playerImage, a,b);
  }

}


function deathDetection() {
  for(i=0;i<enemy.enemyXCoord.length;i++){
    xx=enemy.enemyXCoord[i]-50;
    yy=enemy.enemyYCoord[i]-50;
  if (PlayerDead === false) {
    for (j = 0; j < 100; j++) {
      if ((xx < a + 50) && (xx > a - 50)) {
        if ((yy < b + 50) && (yy > b - 50)) {
          PlayerDead = true
          
        }
      }
      xx = xx + 1
      yy = yy + 1
    }
  }
  }

  if (PlayerDead === true) {
    noLoop()
    clear()
    background(c)
    stroke(180, 20, 60)
    fill(150, 20, 40)
    text("You Died", width / 2, height / 2)
    
  }
}

function killDetection(X, Y, dY, dX, u, XX, YY, EnemyNo) {
  
  if ((EnemyADead === false) || (EnemyBDead === false)) {
    ss = XX - 50
 	 tt = YY - 50
    for (i = 0; i < 100; i++) {
      if ((ss < (X + 25)) && (ss > (X - 25))) {
        if ((tt < (Y + 25)) && (tt > (Y - 25))) {
          if ((dY < 0) && (dX < 0)) {
            if (u === 1) {
              dy = 0
              dx = 0
              x = 0
              y = 0
              Projectile1Active = false
              if (EnemyNo === 1) {
                EnemyADead = true
                topEnemiesRespawn()
                ScoreIncrease = true
              }
              if (EnemyNo === 2) {
                EnemyBDead = true
                sideEnemiesRespawn()
                ScoreIncrease = true
              }
            }
            if (u === 2) {
              dyi = 0
              dxi = 0
              xi = 0
              yi = 0
              Projectile2Active = false
              if (EnemyNo === 1) {
                EnemyADead = true
                topEnemiesRespawn()
                Score = Score + 1
              }
              if (EnemyNo === 2) {
                EnemyBDead = true
                sideEnemiesRespawn()
                ScoreIncrease = true
              }
            }
            if (u === 3) {
              dxii = 0
              dyii = 0
              xii = 0
              yii = 0
              Projectile3Active = false
              if (EnemyNo === 1) {
                EnemyADead = true
                topEnemiesRespawn()
                ScoreIncrease = true
              }
              if (EnemyNo === 2) {
                EnemyBDead = true
                sideEnemiesRespawn()
                ScoreIncrease = true
              }
            }
          }


          if ((dY > 0) && (dX < 0)) {
            if (u === 1) {
              dy = 0
              dx = 0
              x = 0
              y = 0
              Projectile1Active = false
              if (EnemyNo === 1) {
                EnemyADead = true
                topEnemiesRespawn()
                ScoreIncrease = true
              }
              if (EnemyNo === 2) {
                EnemyBDead = true
                sideEnemiesRespawn()
                ScoreIncrease = true
              }
            }
            if (u === 2) {
              dyi = 0
              dxi = 0
              xi = 0
              yi = 0
              Projectile2Active = false
              if (EnemyNo === 1) {
                EnemyADead = true
                topEnemiesRespawn()
                ScoreIncrease = true
              }
              if (EnemyNo === 2) {
                EnemyBDead = true
                sideEnemiesRespawn()
                ScoreIncrease = true
              }
            }
            if (u === 3) {
              dxii = 0
              dyii = 0
              xii = 0
              yii = 0
              Projectile3Active = false
              if (EnemyNo === 1) {
                EnemyADead = true
                topEnemiesRespawn()
                ScoreIncrease = true
              }
              if (EnemyNo === 2) {
                EnemyBDead = true
                sideEnemiesRespawn()
                ScoreIncrease = true
              }
            }
          }

          if ((dY > 0) && (dX > 0)) {
            if (u === 1) {
              dy = 0
              dx = 0
              x = 0
              y = 0
              Projectile1Active = false
              if (EnemyNo === 1) {
                EnemyADead = true
                topEnemiesRespawn()
                ScoreIncrease = true
              }
              if (EnemyNo === 2) {
                EnemyBDead = true
                sideEnemiesRespawn()
                ScoreIncrease = true
              }
            }
            if (u === 2) {
              dyi = 0
              dxi = 0
              xi = 0
              yi = 0
              Projectile2Active = false
              if (EnemyNo === 1) {
                EnemyADead = true
                topEnemiesRespawn()
                ScoreIncrease = true
              }
              if (EnemyNo === 2) {
                EnemyBDead = true
                sideEnemiesRespawn()
                ScoreIncrease = true
              }
            }
            if (u === 3) {
              dxii = 0
              dyii = 0
              xii = 0
              yii = 0
              Projectile3Active = false
              if (EnemyNo === 1) {
                EnemyADead = true
                topEnemiesRespawn()
                ScoreIncrease = true
              }
              if (EnemyNo === 2) {
                EnemyBDead = true
                sideEnemiesRespawn()
                ScoreIncrease = true
              }
            }
          }
          if ((dY < 0) && (dX > 0)) {
            if (u === 1) {
              dy = 0
              dx = 0
              x = 0
              y = 0
              Projectile1Active = false
              if (EnemyNo === 1) {
                EnemyADead = true
                topEnemiesRespawn()
                ScoreIncrease = true
              }
              if (EnemyNo === 2) {
                EnemyBDead = true
                sideEnemiesRespawn()
                ScoreIncrease = true
              }
            }
            if (u === 2) {
              dyi = 0
              dxi = 0
              xi = 0
              yi = 0
              Projectile2Active = false
              if (EnemyNo === 1) {
                EnemyADead = true
                topEnemiesRespawn()
                ScoreIncrease = true
              }
              if (EnemyNo === 2) {
                EnemyBDead = true
                sideEnemiesRespawn()
                ScoreIncrease = true
              }
            }
            if (u === 3) {
              dxii = 0
              dyii = 0
              xii = 0
              yii = 0
              Projectile3Active = false
              if (EnemyNo === 1) {
                EnemyADead = true
                topEnemiesRespawn()
                ScoreIncrease = true
              }
              if (EnemyNo === 2) {
                EnemyBDead = true
                sideEnemiesRespawn()
                ScoreIncrease = true
              }
            }
          }
        }
      }
      ss = ss + 1
      tt = tt + 1
    }
  }
  if (ScoreIncrease === true) {
    Score = Score + 1
    ScoreIncrease = false
  }
}
function limitToScreen(){
  x = constrain(x, -1, width + 1)
  y = constrain(y, -1, height + 1)
  a = constrain(a, 0, width)
  b = constrain(b, 0, height)
}
function keyPressed(){
  
}
function displayEnemy(){
  for(i=0;i<enemy.enemyXCoord.length;i++){
    enemy.enemyXCoord[i] = constrain(enemy.enemyXCoord[i], -50, height + 50)
    enemy.enemyYCoord[i] = constrain(enemy.enemyYCoord[i], -50, height + 50)
    if(enemy.enemyHP[i]>0){
      switch(enemy.enemyImageUsed[i]){
        case 0:
          image(enemy1, enemy.enemyXCoord[i],enemy.enemyYCoord[i], 100, 100);
          break;
        case 1:
          image(enemy2, enemy.enemyXCoord[i],enemy.enemyYCoord[i], 100, 100);
          break;
        case 3:
          image(enemy3, enemy.enemyXCoord[i],enemy.enemyYCoord[i], 100, 100);
          break;
        case 4:
          image(enemy4, enemy.enemyXCoord[i],enemy.enemyYCoord[i], 100, 100);
          break;
          default:
          image(enemy1, enemy.enemyXCoord[i],enemy.enemyYCoord[i], 100, 100);
          break;
    }
  }
}
}
function enemyTrackPlayer(){
  for(i=0;i<enemy.enemyXCoord.length;i++){
  if(enemy.enemyHP[i]>0){
    if (a < enemy.enemyXCoord[i]) {
    enemy.enemyXCoord[i] = enemy.enemyXCoord[i] - enemy.enemyMoveSpeed[i]
  }
    if (a > enemy.enemyXCoord[i]) {
    enemy.enemyXCoord[i] = enemy.enemyXCoord[i] + enemy.enemyMoveSpeed[i]
  }

    if (b < enemy.enemyYCoord[i]) {
    enemy.enemyYCoord[i] = enemy.enemyYCoord[i] - enemy.enemyMoveSpeed[i]
  }
    if (b > enemy.enemyYCoord[i]) {
    enemy.enemyYCoord[i] = enemy.enemyYCoord[i] + enemy.enemyMoveSpeed[i]
  }
  }
  }
}