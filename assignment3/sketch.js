let spiders = [];
let helpTimer = 0;

const groundY = 430;
const maryX = 250;
const maryY = 400;

function setup() {
  createCanvas(500, 500);

  // 기본 마우스 커서 숨기기
  noCursor();
}


// 간단한 고담시티 야경 그리기
function drawGothamBackground() {
  background(16, 23, 40);

  // 화면 양쪽을 채우는 큰 빌딩 두 개
  let buildings = [
    { x: 0, w: 170 },
    { x: 330, w: 170 }
  ];

  noStroke();
  fill(10, 16, 30);

  // 빌딩과 창문 그리기
  for (let i = 0; i < buildings.length; i = i + 1) {
    let building = buildings[i];

    rect(building.x, 0, building.w, groundY);

    // 창문 불빛
    for (let windowX = building.x + 24; windowX < building.x + building.w - 24; windowX = windowX + 42) {
      for (let windowY = 30; windowY < groundY - 18; windowY = windowY + 60) {
        fill(224, 178, 91);
        rect(windowX, windowY, 20, 28);
        fill(10, 16, 30);
      }
    }
  }

  // 빌딩 사이로 보이는 달과 별
  noStroke();

  fill(235, 225, 185);
  circle(250, 78, 42);

  // 달 위에 배경색 원을 겹쳐 초승달 만들기
  fill(16, 23, 40);
  circle(263, 66, 40);

  // 별
  fill(220, 225, 235);
  circle(200, 70, 3);
  circle(300, 125, 2);
  circle(220, 165, 2);

  // 도로와 인도 경계
  noStroke();
  fill(55, 61, 70);
  rect(0, groundY, width, height - groundY);

  stroke(105, 110, 115);
  strokeWeight(2);
  line(0, groundY, width, groundY);
}


function draw() {
  drawGothamBackground();

  // 마우스와 메리 제인 사이의 거리 구하기
  let distanceToMary = dist(mouseX, mouseY, maryX, maryY);

  // 마우스가 메리 제인 가까이에 있는지 확인하기
  let maryScared = false;

  if (distanceToMary < 55) {
    maryScared = true;
  }

  // 메리 제인 그리기
  drawMaryJane(maryScared);

  // HELP ME 말풍선 보여주기
  if (helpTimer > 0) {
    drawHelpBubble();
    helpTimer = helpTimer - 1;
  }

  // 배열에 있는 모든 스파이더맨 움직이기
  for (let i = spiders.length - 1; i >= 0; i = i - 1) {
    let spider = spiders[i];

    // R키를 눌렀다면 실의 길이를 조금씩 줄이기
    if (spider.goingUp == true) {
      spider.ropeLength = spider.ropeLength - 4;

      // 실이 거의 다 감기면 스파이더맨 삭제하기
      if (spider.ropeLength < 10) {
        spiders.splice(i, 1);
        continue;
      }
    }

    // 중력 적용하기
    spider.velocityY = spider.velocityY + spider.gravity;

    // 천장의 고정점과 스파이더맨 사이의 거리 구하기
    let dx = spider.x - spider.anchorX;
    let dy = spider.y - spider.anchorY;

    // 실제 실의 길이 구하기
    let distance = sqrt(dx * dx + dy * dy);

    // 실이 기본 길이보다 늘어났을 때
    if (distance > spider.ropeLength) {

      // 실이 얼마나 늘어났는지 구하기
      let stretch = distance - spider.ropeLength;

      // 실이 당기는 방향 구하기
      let directionX = dx / distance;
      let directionY = dy / distance;

      // 실의 탄성 적용하기
      spider.velocityX = spider.velocityX - directionX * stretch * spider.spring;
      spider.velocityY = spider.velocityY - directionY * stretch * spider.spring;
    }

    // 공기 저항으로 움직임을 조금씩 줄이기
    spider.velocityX = spider.velocityX * 0.992;
    spider.velocityY = spider.velocityY * 0.992;

    // 속도만큼 위치 이동하기
    spider.x = spider.x + spider.velocityX;
    spider.y = spider.y + spider.velocityY;

    // 스파이더맨 그리기
    drawSpider(spider);
  }

  // 그린 고블린 모양의 마우스 커서 그리기
  drawGoblinCursor();
}


// 메리 제인 그리기
function drawMaryJane(scared) {

  // 놀랐을 때 좌우로 흔들리기
  let shakeX = 0;

  if (scared == true) {
    shakeX = random(-3, 3);
  }

  // 흔들림을 적용한 메리 제인의 위치
  let drawX = maryX + shakeX;
  let drawY = maryY;

  // 긴 붉은 머리
  noStroke();
  fill(170, 65, 40);
  ellipse(drawX, drawY - 25, 65, 85);

  // 몸
  fill(30);
  ellipse(drawX, drawY + 25, 55, 70);

  // 얼굴
  fill(245, 195, 165);
  ellipse(drawX, drawY - 25, 45, 55);

  // 앞머리
  fill(170, 65, 40);
  arc(drawX, drawY - 40, 48, 35, PI, TWO_PI);

  // 놀랐을 때 표정
  if (scared == true) {

    // 크게 뜬 눈
    stroke(20);
    strokeWeight(1.5);
    fill(255);
    ellipse(drawX - 9, drawY - 25, 9, 12);
    ellipse(drawX + 9, drawY - 25, 9, 12);

    // 눈동자
    noStroke();
    fill(20);
    circle(drawX - 9, drawY - 25, 4);
    circle(drawX + 9, drawY - 25, 4);

    // 놀라서 벌어진 입
    stroke(180, 60, 70);
    strokeWeight(2);
    fill(80, 20, 30);
    ellipse(drawX, drawY - 10, 10, 14);
  }

  // 평소 표정
  else {

    // 눈
    noStroke();
    fill(20);
    circle(drawX - 9, drawY - 25, 4);
    circle(drawX + 9, drawY - 25, 4);

    // 입
    stroke(180, 60, 70);
    strokeWeight(2);
    line(drawX - 6, drawY - 10, drawX + 6, drawY - 10);
  }
}


// HELP ME 말풍선 그리기
function drawHelpBubble() {

  // 흰색 말풍선
  fill(255);
  noStroke();
  rect(maryX - 48, maryY - 110, 96, 38, 12);

  // 말풍선 아래쪽 꼬리
  triangle(
    maryX - 6, maryY - 72,
    maryX + 6, maryY - 72,
    maryX, maryY - 62
  );

  // HELP ME 글씨
  fill(20);
  textAlign(CENTER, CENTER);
  textSize(17);
  text("HELP ME", maryX, maryY - 91);
}


// 스파이더맨 그리기
function drawSpider(spider) {

  // 스파이더맨의 좌우 속도에 따라 실이 휘어지는 정도 정하기
  let curveX = spider.velocityX * 2;

  // 실을 곡선으로 그리기
  noFill();
  stroke(255);
  strokeWeight(3);

  bezier(
    spider.anchorX, spider.anchorY,
    spider.anchorX + curveX, spider.y * 0.3,
    spider.x - curveX, spider.y * 0.7,
    spider.x, spider.y
  );

  // 좌우 속도에 따라 몸이 기울어지는 각도 정하기
  let tilt = spider.velocityX * 0.06;

  // 너무 많이 기울어지지 않도록 제한하기
  tilt = constrain(tilt, -PI / 6, PI / 6);

  // 현재 그림 설정 저장하기
  push();

  // 스파이더맨 위치로 이동하기
  translate(spider.x, spider.y);

  // 움직이는 방향에 따라 몸 기울이기
  rotate(tilt);

  // 흰색 고치
  fill(255);
  noStroke();
  ellipse(0, 0, 50, 60);

  // 스파이더맨 얼굴 위치와 크기
  let faceX = 0;
  let faceY = 39;
  let faceRadius = 27;

  // 빨간색 얼굴
  stroke(15);
  strokeWeight(1.5);
  fill(205, 35, 45);
  circle(faceX, faceY, faceRadius * 2);

  // 얼굴 가운데에서 퍼지는 거미줄
  stroke(15);
  strokeWeight(1);

  for (let angle = 0; angle < TWO_PI; angle = angle + PI / 4) {
    let endX = faceX + cos(angle) * (faceRadius - 3);
    let endY = faceY + sin(angle) * (faceRadius - 3);

    line(faceX, faceY, endX, endY);
  }

  // 얼굴의 둥근 거미줄
  noFill();
  circle(faceX, faceY, 18);
  circle(faceX, faceY, 34);
  circle(faceX, faceY, 48);

  // 스파이더맨 눈
  drawSpiderEye(faceX - 13, faceY, -PI / 5);
  drawSpiderEye(faceX + 13, faceY, PI / 5);

  // 원래 그림 설정으로 돌아가기
  pop();
}


// 스파이더맨 눈 그리기
function drawSpiderEye(x, y, angle) {

  // 현재 그림 설정 저장하기
  push();

  // 눈을 그릴 위치로 이동하고 기울이기
  translate(x, y);
  rotate(angle);

  // 흰색 눈
  stroke(15);
  strokeWeight(3);
  fill(255);
  arc(0, 0, 25, 29, PI, TWO_PI, CHORD);

  // 원래 그림 설정으로 돌아가기
  pop();
}


// 그린 고블린 모양의 마우스 커서 그리기
function drawGoblinCursor() {

  // 현재 그림 설정 저장하기
  push();

  // 마우스 위치로 이동하기
  translate(mouseX, mouseY);

  // 긴 초록색 얼굴
  stroke(20);
  strokeWeight(2);
  fill(70, 130, 80);
  ellipse(0, -6, 36, 50);

  // 왼쪽 귀
  triangle(-18, -10, -28, -28, -20, 5);

  // 오른쪽 귀
  triangle(18, -10, 28, -28, 20, 5);

  // 왼쪽 눈
  fill(250, 200, 40);
  stroke(20);
  strokeWeight(2);
  triangle(-18, -13, -4, -7, -10, -2);

  // 오른쪽 눈
  triangle(18, -13, 4, -7, 10, -2);

  // 입
  fill(20);
  triangle(-6, 9, 6, 9, 0, 16);

  // 원래 그림 설정으로 돌아가기
  pop();
}


// 마우스를 클릭했을 때
function mousePressed() {

  // 마우스와 메리 제인 사이의 거리 구하기
  let distanceToMary = dist(mouseX, mouseY, maryX, maryY);

  // 메리 제인을 클릭했을 때
  if (distanceToMary < 55) {

    // 천장에서 실이 시작될 위치
    let newAnchorX = random(60, width - 60);

    // 새로운 스파이더맨 만들기
    spiders.push({
      x: newAnchorX,
      y: -80,
      anchorX: newAnchorX,
      anchorY: 0,
      velocityX: random(-2.5, 2.5),
      velocityY: 0,
      gravity: 0.25,
      spring: 0.04,
      ropeLength: random(groundY - 170, groundY - 70),
      goingUp: false
    });

    // HELP ME 말풍선을 100프레임 동안 보여주기
    helpTimer = 100;
  }

  // 화면에 있는 스파이더맨 클릭 확인하기
  for (let spider of spiders) {
    let distanceToSpider = dist(mouseX, mouseY, spider.x, spider.y + 20);

    // 스파이더맨을 클릭하면 다시 흔들리게 하기
    if (distanceToSpider < 45) {

      // 좌우 방향으로 힘 주기
      spider.velocityX = spider.velocityX + random(-6, 6);

      // 아래 방향으로 힘 주기
      spider.velocityY = spider.velocityY + 5;
    }
  }
}


// 키보드를 눌렀을 때
function keyPressed() {

  // R키를 누르면 모든 스파이더맨의 실을 감아 올리기
  if (key == "r" || key == "R") {
    for (let spider of spiders) {
      spider.goingUp = true;
    }
  }
}