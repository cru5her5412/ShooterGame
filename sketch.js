function setup() {
  createCanvas(1400, 1400);
  R = [1, 2]
  e = width/2
  b = height/2
  dy = 0
  dx = 0
  x = -100
  y = -100
  X = x
  Y = y
  c = 0
  aa = width + 50
  bb = -50
  cc = width + 50
  dd = height + 50
  ScoreIncrease = false
  Score = 0
  projectileCounter = 0
  PlayerDead = false
  EnemyADead = false
  EnemyBDead = false
  dy = 0
  dx = 0
  dyi = 0
  dxi = 0
  dyii = 0
  dxii = 0
  x = 0
  y = 0
  xi = 0
  yi = 0
  xii = 0
  yii = 0
  c = 0
  Projectile1Active = false
  Projectile2Active = false
  Projectile3Active = false
  rectMode(CENTER)
  frameRate(30)
  background(c)
  textSize(200)
  textAlign(CENTER)
  const enemy = {
    enemyXCoord:[9],
    enemyYCoord:[9],
    enemyHP:[9],
    enemyMoveSpeed:[7],
  }
}



function draw() {
  //clear()
  background(c)
  textSize(20)
  text("Score: " + Score, 100, 100)
  textSize(200)
  limitToScreen()
  x = constrain(x, -1, width + 1)
  y = constrain(y, -1, height + 1)
  e = constrain(e, 0, width)
  b = constrain(b, 0, height)
  aa = constrain(aa, -50, height + 50)
  bb = constrain(bb, -50, height + 50)
  cc = constrain(cc, -50, height + 50)
  dd = constrain(dd, -50, height + 50)
  if(second() % 100 === 0){
  }
  x = x + dx / 3
  y = y + dy / 3
  xi = xi + dxi / 3
  yi = yi + dyi / 3
  xii = xii + dxii / 3
  yii = yii + dyii / 3
  if (EnemyADead === false) {
    fill(255, 0, 0)
    rect(aa, bb, 100, 100)
    fill(255)
  }
  if (EnemyBDead === false) {
    fill(0, 255, 0)
    rect(cc, dd, 100, 100)
    fill(255)
  }

  if (EnemyBDead === true) {
    EnemyBDead = false
    
  }
  if (EnemyADead === true) {
    EnemyADead = false
    
  }

  r = random(0, 1)
  Character()
  EdgeCheck(x, y, 1)
  EdgeCheck(xi, yi, 2)
  EdgeCheck(xii, yii, 3)
  enemyTracking()
  killDetection(x, y, dy, dx, 1, aa, bb, 1)
  killDetection(xi, yi, dyi, dxi, 2, aa, bb, 1)
  killDetection(xii, yii, dyii, dxii, 3, aa, bb, 1)
  killDetection(x, y, dy, dx, 1, cc, dd, 2)
  killDetection(xi, yi, dyi, dxi, 2, cc, dd, 2)
  killDetection(xii, yii, dyii, dxii, 3, cc, dd, 2)
  deathDetection(e, b, aa, bb)
  deathDetection(e, b, cc, dd)
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

function mousePressed() {
  if (mouseButton === LEFT) {
    projectileCounter = projectileCounter + 1
    if (projectileCounter > 3) {
      projectileCounter = 1
    }
    if (projectileCounter === 1) {
      Projectile1Active = true
      dy = (mouseY - b) / 10
      dx = (mouseX - e) / 10
      x = e
      y = b
    }
    if (projectileCounter === 2) {
      Projectile2Active = true
      dyi = (mouseY - b) / 10
      dxi = (mouseX - e) / 10
      xi = e
      yi = b
    }
    if (projectileCounter === 3) {
      Projectile3Active = true
      dyii = (mouseY - b) / 10
      dxii = (mouseX - e) / 10
      xii = e
      yii = b
    }
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
    e = e - 10
  }
  if (keyIsDown(68)) {
    e = e + 10
  }
  if (keyIsDown(83)) {
    b = b + 10
  }
  if (keyIsDown(87)) {
    b = b - 10
  }
  if (PlayerDead === false) {
    fill(0, 100, 255)
    rect(e, b, 100, 100)
    fill(255)

  }

}



function sideEnemiesRespawn() {

  dd = random(-50, width + 50)
  if (r < 0.5){
  cc = -50
  }
  if (r > 0.5){
   cc = width + 50 
  }
  EnemyBDead = false
}


function topEnemiesRespawn() {

  aa = random(-50, width + 50)
  if (r < 0.5){
  bb = -50
  }
  if (r > 0.5){
   bb = height + 50 
  }
  
  EnemyADead = false
}


function enemyTracking() {
  if (e < aa) {
    aa = aa - random(1, 8)
  }
  if (e > aa) {
    aa = aa + random(1, 8)
  }
  if (b < bb) {
    bb = bb - random(1, 8)
  }
  if (b > bb) {
    bb = bb + random(1, 8)
  }
  if (e < cc) {
    cc = cc - random(1, 8)
  }
  if (e > cc) {
    cc = cc + random(1, 8)
  }
  if (b < dd) {
    dd = dd - random(1, 8)
  }
  if (b > dd) {
    dd = dd + random(1, 8)
  }

}

function deathDetection(X, Y, XX, YY) {
  zz = XX - 50
  yy = YY - 50

  if (PlayerDead === false) {
    for (i = 0; i < 100; i++) {
      if ((zz < X + 50) && (zz > X - 50)) {
        if ((yy < Y + 50) && (yy > Y - 50)) {
          PlayerDead = true
          
        }
      }
      zz = zz + 1
      yy = yy + 1
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
  e = constrain(e, 0, width)
  b = constrain(b, 0, height)
  aa = constrain(aa, -50, height + 50)
  bb = constrain(bb, -50, height + 50)
  cc = constrain(cc, -50, height + 50)
  dd = constrain(dd, -50, height + 50)
}