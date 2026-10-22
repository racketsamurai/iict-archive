function setup() {
  createCanvas(400, 400);
}

function draw() {
  background('skyblue');
  fill(90,150,100);
  stroke('white');
  strokeWeight(4);
  quad(100, 100, 300, 100, 400, 400, 0, 400);
  //테니스 코트
  strokeWeight(1);
  stroke('black');
  line(50, 250, 50, 180);
  line(350, 250, 350, 180);
  line(50, 180, 350, 180);
  line(50, 250, 350, 250);
  // 테니스 네트 테두리
  strokeWeight(4);
  stroke('white');
  line(130, 100, 40, 400);
  line(270, 100, 360, 400);
  line(113, 160, 287, 160);
  line(200, 160, 200, 250);
  line(200, 250, 200, 370);
  line(50, 370, 350, 370);
  // 테니스 코트 라인
  strokeWeight(1);
  stroke('black');  
  line(60, 180, 60, 250);
  line(70, 180, 70, 250);
  line(80, 180, 80, 250);
  line(90, 180, 90, 250);
  line(100, 180, 100, 250);
  line(110, 180, 110, 250);
  line(120, 180, 120, 250);
  line(130, 180, 130, 250);
  line(140, 180, 140, 250);
  line(150, 180, 150, 250);
  line(160, 180, 160, 250);
  line(170, 180, 170, 250);
  line(180, 180, 180, 250);
  line(190, 180, 190, 250);
  line(200, 180, 200, 250);
  line(210, 180, 210, 250);
  line(220, 180, 220, 250);
  line(230, 180, 230, 250);
  line(240, 180, 240, 250);
  line(250, 180, 250, 250);
  line(260, 180, 260, 250);
  line(270, 180, 270, 250);
  line(280, 180, 280, 250);
  line(290, 180, 290, 250);
  line(300, 180, 300, 250);
  line(310, 180, 310, 250);
  line(320, 180, 320, 250);
  line(330, 180, 330, 250);
  line(340, 180, 340, 250);
  line(50, 190, 350, 190);
  line(50, 200, 350, 200);
  line(50, 210, 350, 210);
  line(50, 220, 350, 220);
  line(50, 230, 350, 230);
  line(50, 240, 350, 240);
  // 테니스 그물망
  fill(0, 100, 0);
  rect(40, 180, 10, 70);
  rect(350, 180, 10, 70);
  fill(255);
  rect(50, 180, 300, 5);
  // 기둥, 네트 윗부분
  noStroke();
  fill('orange');
  ellipse(200, 37, 50, 50);
  push();
  translate(170,60)
  rotate(10)
  ellipse(0, 10, 60, 15);
  pop();
  push();
  translate(230,60)
  rotate(-10)
  ellipse(0, 10, 60, 15);
  pop();
  push();
  translate(190,100)
  rotate(20);
  rect(-13, -15, 17, 45);
  pop();
  push();
  translate(200,100)
  rotate(-20);
  rect(0, 0, 17, 45);
  pop();
  rect(185, 60, 30, 40);
  push();
  translate(160,100);
  rotate(-10);
  ellipse(2, -2, 10, 30);
  pop();
  push();
  translate(240, 100);
  rotate(10);
  ellipse(-10, 0, 10, 30);
  pop();
  //이긴 사람
  noStroke();
  fill('black');
  ellipse(80, 350, 40, 40);
  rect(78, 360, 20, 50);
  push();
  translate(75, 380);
  rotate(10);
  ellipse(0, 0, 10, 30);
  pop();
  //진 사람
  function drawRacket(x, y) {
  push();
  translate(x, y);
  rotate(radians(frameCount*15-35));
  stroke('yellow');
  strokeWeight(1);
  line(-9, -28, 9, -28);
  line(-12, -20, 12, -20);
  line(-12, -12, 12, -12);
  line(-9, -5, 9, -5);
  line(-7, -34, -7, -2);
  line(0, -36, 0, 0);
  line(7, -34, 7, -2);
  //스트링
  noFill();
  stroke('black');
  strokeWeight(4);
  ellipse(0, -18, 26, 36);
  //라켓 테두리
  stroke('black');
  strokeWeight(7);
  line(0, 0, 0, 22);
  //라켓 손잡이
  pop();
}
noCursor();
drawRacket(mouseX, mouseY);
}

