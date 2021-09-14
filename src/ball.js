const spring = 0.003;
const gravity = 0.02;
const friction = -0.2;
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
  
    display(p5, position) {
      let circleColor;
      let textColor = p5.color(150, 150, 150);
      let textSize = 16;
      let foresee = (position - this.char.startTime) < 0 ? (position - this.char.startTime - 800)*0.2 : 0;
      if(this.char.startTime - 800 <= position && this.char.endTime >= position
        && this.chord == 1){
        p5.strokeWeight(1);
        p5.stroke(51);
        p5.fill('#f9e1ed');
        // TODO: fix foresee ellipse late over lap
        p5.ellipse(this.x, this.y, this.diameter+foresee, this.diameter+foresee);
        circleColor = p5.color('#dc5e91');
        textColor = p5.color(0, 0 ,0);
        textSize = 32;
      }else if(this.char.startTime -150 <= position && this.char.endTime + 95 >= position){
        circleColor = p5.color('#efc459');
        textColor = p5.color(0);
        textSize = 26;
      }else if(this.startTime -50 <= position && this.endTime + 50 >= position){
        circleColor = p5.color('#daf7e3');
        textColor = p5.color('#57ad6b');
        textSize = 20;
      }else{
        circleColor = p5.color('#d9f8ff');
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
  