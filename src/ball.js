const spring = 0.003;
const gravity = 0.02;
const friction = -0.2;
const colors = {
  slow:{
    foresee:'rgba(249, 225, 237, 0.7)',
    click: 'rgba(220, 94, 145, 1)',
    siging: 'rgba(239, 196, 89, 0.7)',
    phrase: 'rgba(218, 247, 227, 0.7)',
    ball: 'rgba(217, 248, 255, 0.7)'
  },
  default:{
    foresee:'rgba(127, 147, 105, 0.5)',
    click: 'rgba(53, 203, 193, 1)',
    siging: 'rgba(53, 174, 201, 0.7)',
    phrase: 'rgba(250, 205, 75, 0.7)',
    ball: 'rgba(255, 212, 213, 0.7)'
  },
  fast:{
    foresee:'rgba(127, 152, 190, 0.5)',
    click: 'rgba(219, 60, 124, 1)',
    siging: 'rgba(140, 132, 213, 0.7)',
    phrase: 'rgba(67, 198, 193, 0.7)',
    ball: 'rgba(253, 243, 246, 0.7)'
  }
}
export class Ball {
  constructor(xin, yin, dia, ballCnt, others, char, phrase, chord) {
    this.x = xin;
    this.y = yin;
    this.vx = 0;
    this.vy = 0;
    this.diameter = dia;
    this.id = ballCnt;
    this.others = others;
    this.text = char.text;
    this.char = char;
    this.startTime = phrase.startTime;
    this.endTime = phrase.endTime;
    // '' because clear up function
    this.pos = char != '' ? char.parent.pos : 'NA';
    this.chord = chord;
    this.clicked = false;
  }

  collide(p5, length) {
    for (let i = 1; i < length; i++) {
      let dx = this.others[i].x - this.x;
      let dy = this.others[i].y - this.y;
      let distance = p5.sqrt(p5.pow(dx, 2) + p5.pow(dy, 2));
      let minDist = this.others[i].diameter / 2 + this.diameter / 2;
      if (distance < minDist) {
        let angle = p5.atan2(dy, dx);
        let ax = (p5.cos(angle) * minDist - dx) * spring;
        let ay = (p5.sin(angle) * minDist - dy) * spring;
        this.vx -= ax;
        this.vy -= ay;
        this.others[i].vx += ax;
        this.others[i].vy += ay;
      }
    }
  }

  move(width, height) {
    this.vy += gravity;
    this.x += this.vx;
    this.y += this.vy;
    let rad = this.diameter / 2;
    if(this.x + rad > width || 
      this.x - rad < 0
    ){
      this.x = this.x - rad < 0 ? rad : width - rad;
      this.vx *= friction;
    }
    if(this.y + rad > height || 
      this.y - rad < 0
    ){
      this.y = this.y - rad < 0 ? rad : height - rad;
      this.vy *= friction;
    }
  }

  display(p5, position, vaIndex) {
    let colorTone;
    if(vaIndex == 4){
      colorTone = colors.default;
    }else if(vaIndex < 4){
      colorTone = colors.slow;
    }else if(vaIndex > 4){
      colorTone = colors.fast;
    }
    let circleColor;
    let textColor = p5.color(150, 150, 150);
    let textSize = 16;
    let foresee = (position - this.char.startTime) < 0 ? (position - this.char.startTime - 800)*0.2 : 0;
    if(this.char.startTime - 800 <= position && this.char.endTime +95 >= position
      && this.chord == 1){
      p5.strokeWeight(1);
      p5.stroke(51);
      p5.fill(colorTone.foresee);
      // TODO: fix foresee ellipse late over lap
      p5.ellipse(this.x, this.y, this.diameter+foresee, this.diameter+foresee);
      circleColor = p5.color(colorTone.click);
      textColor = p5.color(0, 0 ,0);
      textSize = 32;
    }else if(this.char.startTime -150 <= position && this.char.endTime + 95 >= position){
      circleColor = p5.color(colorTone.siging);
      textColor = p5.color(0);
      textSize = 26;
    }else if(this.startTime -50 <= position && this.endTime + 50 >= position){
      circleColor = p5.color(colorTone.phrase);
      textColor = p5.color(0);
      textSize = 20;
    }else{
      circleColor = p5.color(colorTone.ball);
      textColor = p5.color('#65bfce');
    }
    if(this.clicked){
      circleColor = p5.color('#dd4a49');
      textColor = p5.color('white');
    }
    p5.noStroke();
    p5.fill(circleColor);
    p5.ellipse(this.x, this.y, this.diameter, this.diameter);
    p5.fill(textColor);
    p5.textSize(textSize);
    p5.text(this.text, this.x - textSize/2, this.y + textSize/3);
  }
}