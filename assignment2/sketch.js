function setup() {
  createCanvas(400, 400);
  background(200, 69, 12);
  stroke('white');
  strokeWeight(7);
  line(0,350,330,350);
  line(330,350,330,0);
  line(260, 0, 260, 350)
  line(0, 120, 260, 120);
  line(30, 120, 30, 0);
}

let clickCount = 0;
let lastBallMark = null;

//공 자국 & 발자국, 슬라이딩 조건
function mousePressed() {
  clickCount = clickCount + 1;

  if (clickCount % 2 === 1) {
    lastBallMark = {
      x: random(0, 330),
      y: random(40, 250)
    };

    fill(170, 69, 12, random(200, 250));
    noStroke();
    circle(lastBallMark.x, lastBallMark.y, random(10, 12));
    return;
  }

  if (lastBallMark.x >= 280 && lastBallMark.x <= 330) {
    drawSlidingMark();
  } else {
    drawFootprint();
  }
}

//발자국
function drawFootprint() {
  fill(170, 69, 12, random(200, 250));
  noStroke();
  const footprintX = random(0, 200);
  const footprintY = random(250, 400);
  push();
  translate(footprintX, footprintY);
  rotate(radians(random(5, 30)));
  ellipse(0, 0, 20, 40);
  pop();
}

//슬라이딩
function drawSlidingMark() {
  fill(170, 69, 12, random(200, 250));
  noStroke();
  const slidingX = random(250, 400);
  const slidingY = random(250, 400);
  push();
  translate(slidingX, slidingY);
  rotate(radians(random(30, 70)));
  rectMode(CENTER);
  rect(0, 0, 20, 100, 10);
  pop();
}
// 화면 초기화 (아무거나 누르면)
function resetCanvas() {
 clickCount = 0;
 lastBallMark = null;
 background(200, 69,12);
stroke('white');
  strokeWeight(7);
  line(0,350,330,350);
  line(330,350,330,0);
  line(260, 0, 260, 350)
  line(0, 120, 260, 120);
  line(30, 120, 30, 0);
 }

function keyPressed(){
  if(key =='S'){
    saveCanvas('myCanvas', 'png')
  }
}

function keyPressed() {
  if (key === 's' || key === 'S') {
    saveCanvas('tennis-court', 'png');
  }

  if (key === 'r' || key === 'R') {
    resetCanvas();
  }
}