import { Player } from "textalive-app-api";
import p5 from "p5";
import { Ball } from './ball.js';

const player = new Player({
  app: {
    appAuthor: "TextAlive",
    appName: "p5.js example",
  },
    mediaElement: document.querySelector("#media"),
    // valenceArousalEnabled: true,
});
player.addListener({
  onAppReady(app) {
    if (app.managed) {
      document.querySelector("#control").className = "disabled";
    }
    if (!app.songUrl) {
      document.querySelector("#media").className = "disabled";

      player.createFromSongUrl("https://piapro.jp/t/FDb1/20210213190029", {
        video: {
          beatId: 3953882,
          repetitiveSegmentId: 2099561,
          lyricId: 52065,
          lyricDiffId: 5093,
        },
      });
    }
  },
  onVideoReady: () => {
    console.log("player.onVideoReady");
    player.volume = 50;
  },

  onPlay: () => {
    console.log("player.onPlay");
  },

  onPause: () => {
    console.log("player.onPause");
  },

  onSeek: () => {
    console.log("player.onSeek");
  },

  onStop: () => {
    console.log("player.onStop");
  }
})

var balls = [];
var ballCnt = 0;
let injectX = 20;
const width = window.innerWidth-20;
const height = window.innerHeight-20;
let ballsMax = width < 768 ? 50 : 100;
let soundFile;
let clickedArr = [];
let chordIndex = 0;

let position = 0;

const sketch = (p5) => {
  let lastIndex = 0;
  p5.preload = () => {
    soundFile = document.querySelector('#sound');
  }

  p5.setup = () => {
    p5.createCanvas(width, height);
  }
  p5.draw = () => {
    if (!player || !player.video) {
      return;
    }
    p5.clear();
    p5.frameRate(60);
    p5.fill('#222222');
    p5.triangle(10, 60, 10, 10, 60, 35);
    if(balls.length > ballsMax){
      balls.splice(0, ballsMax*0.15);
    }
    position = player.timer.position;
    let forePosition = position + 2000;
    p5.background('rgba(255,255,255, 0.5)');
    let char = player.video.findChar(forePosition, { loose: true });
    let phrase = player.video.findPhrase(forePosition, { loose: true });
    // let beat = player.findBeat(forePosition);
    let chord = player.findChord(forePosition);
    let charIndex = player.video.findIndex(char);
    if(char != null && player.isPlaying && lastIndex != charIndex){
      lastIndex = charIndex;
      let ballChar = new Ball(
        width/2 + (p5.random(-injectX, injectX)), // ball width
        p5.random(40, 50), // ball height
        chordIndex != chord.index ? 90 : p5.random(60, 70), // ball diameter
        ballCnt, // ball id
        balls, // ball class
        char,
        phrase,
        chordIndex != chord.index ? 1 : 0
      )
      chordIndex = chord.index;
      balls.push(ballChar);
      ballCnt++;
    }

    if(balls.length > 0){
      balls.forEach(ball => {
        ball.collide(p5, balls.length);
        ball.move(width, height);
        ball.display(p5, position);
      });
    }
    if(clickedArr.length > 0){
      p5.strokeWeight(4);
      p5.stroke(51);
      p5.fill(255,255,255, 0.2);
      clickedArr.forEach(ball => {
        let effectTime = position - ball.char.startTime;
        p5.ellipse(ball.x, ball.y, 90 + effectTime * 0.2, 90 + effectTime * 0.2);
        p5.ellipse(ball.x, ball.y, 50 + effectTime * 0.21, 50 + effectTime * 0.21);
        p5.ellipse(ball.x, ball.y, 10 + effectTime * 0.22, 10 + effectTime * 0.22);
        if(90 + effectTime * 0.2 > 250){
          clickedArr.splice(clickedArr.indexOf(ball), 1);
        }
      });
    }
  }
  p5.mousePressed = () => {
    // May change in mobile view
    const spliceGood = 90;
    const spliceNice = 120;
    const spliceJust = 160;
    let nearBalls = [];
    let spliceTiming;
    balls.forEach((ball)=>{
      if (
        p5.mouseX > ball.x - ball.diameter/2 &&
        p5.mouseX < ball.x + ball.diameter/2 &&
        p5.mouseY > ball.y - ball.diameter/2 &&
        p5.mouseY < ball.y + ball.diameter/2 &&
        ball.chord == 1 &&
        ball.char.startTime - 800 <= position && ball.char.endTime + 500 >= position 
      ) {
        soundFile.play();
        ball.clicked = true;
        // Get user click timing
        let clickTiming = Math.abs(ball.char.startTime - position);
        if(clickTiming <= 150){
          spliceTiming = spliceJust;
          console.log('Just!', clickTiming);
        }else if(clickTiming <= 350){
          spliceTiming = spliceNice;
          console.log('Nice!', clickTiming);
        }else{
          spliceTiming = spliceGood;
          console.log('Good!', clickTiming);
        }
        clickedArr.push(ball);
        balls.splice(balls.indexOf(ball), 1);
        for(let bi = 0; bi < ball.others.length; bi++){
          if(
            Math.abs(ball.others[bi].x - ball.x) < 45+spliceJust/2 &&
            Math.abs(ball.others[bi].y - ball.y) < 45+spliceJust/2 &&
            (ball.others[bi].chord == 0 || position - ball.others[bi].char.endTime > 0)
          ){
            nearBalls.push(ball.others[bi]);
          }
        };
        for(let ni = 0; ni < nearBalls.length; ni++){
          let ballIndex = balls.indexOf(nearBalls[ni]);
          balls.splice(ballIndex, 1);
        }
      }
    })
    // Play button
    if(p5.mouseX > 10 &&
      p5.mouseX < 60 &&
      p5.mouseY > 10 &&
      p5.mouseY < 60) 
      {
        if(player.isPlaying){
          player.requestPause();
        }else{
          player.requestPlay();
        }
    }
  }
}

const p5sketch = new p5(sketch);