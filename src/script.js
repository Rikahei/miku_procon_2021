import { Player } from "textalive-app-api";
import p5 from "p5";
import { Ball } from './ball.js';

let isVideoLoaded = false;
let vaIndex = 4;
let gameStart = false;
let gameFinish = false;

const player = new Player({
  app: {
    appAuthor: "TextAlive",
    appName: "p5.js example",
  },
    mediaElement: document.querySelector("#media"),
    PlayerBannerPosition: 'top',
    valenceArousalEnabled: true,
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
    player.volume = 70;
    let va = player.getMedianValenceArousal();
    vaIndex = Math.round((va.v + va.a) * 10);
  },

  onTimerReady: () => {
    isVideoLoaded = true;
    let videoBorderColor = "5px solid rgba(115, 173, 33, 1)";
    let borderColor = "2px solid rgba(255, 234, 0, 1)";
    if(vaIndex > 4){
      videoBorderColor = "5px solid rgba(53, 203, 193, 1)";
      borderColor = "2px solid rgba(101, 191, 206, 1)";
    }else if(vaIndex < 4){
      videoBorderColor = "5px solid rgba(60, 97, 176, 1)";
      borderColor = "2px solid rgba(123, 114, 224, 1)";
    }
    document.getElementById("media").style.border = videoBorderColor;
    document.body.style.border = borderColor;
    console.log("player.onTimerReady");
  },

  onPlay: () => {
    console.log("player.onPlay");
    if(gameStart && gameFinish){
      gameFinish = false;
      playerScore = 0;
      balls = [];
    }
  },

  onPause: () => {
    console.log("player.onPause");
  },

  onSeek: () => {
    console.log("player.onSeek");
  },

  onStop: () => {
    console.log("player.onStop");
    gameFinish = true;
  }
})

let demoforesee = 120;
let balls = [];
let ballCnt = 0;
let injectX = 50;
let soundFile;
let clickedArr = [];
let chordIndex = 0;

let position = 0;

const spliceGood = 140;
const spliceNice = 200;
const spliceJust = 280;
let playerScore = 0;

const sketch = (p5) => {
  let width = p5.windowWidth - 20;
  let height = p5.windowHeight - 20;
  let ballsMax = width < 768 ? 40 : 100;
  let lastIndex = 0;

  p5.preload = () => {
    soundFile = document.querySelector('#sound');
  }

  p5.setup = () => {
    p5.createCanvas(width, height);
  }
  p5.draw = () => {
    if (!player || !player.video || !isVideoLoaded) {
      p5.textSize(50);
      p5.text('Loading...', width/2 - 150, height/2);  
      return;
    }
    //Set frameRate and transparent
    p5.frameRate(60);
    if(!gameStart && player.video && isVideoLoaded){
      p5.clear();
      p5.background('rgba(253,253,253, 0.8)');

      demoforesee -= 2;
      p5.stroke(1);
      p5.strokeWeight(1);
      p5.fill('rgba(127, 147, 105, 0.5)');
      p5.ellipse(width/2, height/2, 120+demoforesee, 120+demoforesee);
      if(demoforesee < -10){
        demoforesee = 120;
      }
      p5.noStroke();
      p5.fill('rgba(53, 203, 193, 1)');
      p5.ellipse(width/2, height/2, 120, 120);
      p5.fill(0);
      let clickText = 26;
      if(demoforesee < 20){
        clickText = 32
      }
      p5.textSize(clickText);
      p5.text('Start', width/2 - clickText, height/2 + clickText/3);
      return;
    }
    p5.clear();
    p5.background('rgba(255,255,255, 0.5)');
    // The Play/Pause button
    p5.noStroke();
    p5.fill('#222222');
    if(!player.isPlaying){
      p5.triangle(10, 60, 10, 10, 60, 35);
    }else{
      p5.rect(10, 10, 10, 40);
      p5.rect(30, 10, 10, 40);
    }
    // Max balls
    if(balls.length > ballsMax){
      balls.splice(0, ballsMax*0.15);
    }
    p5.textSize(20);
    p5.text('Score: ' + playerScore, width - 120, 20);

    position = player.timer.position;
    let forePosition = position + 3000;
    let char = player.video.findChar(forePosition, { loose: true });
    let phrase = player.video.findPhrase(forePosition, { loose: true });
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
        ball.display(p5, position, vaIndex);
      });
    }
    if(clickedArr.length > 0){
      clickEffect(p5, clickedArr, position);
    }
  }
  p5.touchStarted = () => {
    // Start the game
    if(gameStart == false){
      player.requestPlay();
      gameStart = true;
      
      return false;
    }
    let spliceTiming;
    balls.forEach((ball)=>{
      if (
        p5.mouseX > ball.x - ball.diameter/2 &&
        p5.mouseX < ball.x + ball.diameter/2 &&
        p5.mouseY > ball.y - ball.diameter/2 &&
        p5.mouseY < ball.y + ball.diameter/2 &&
        ball.chord == 1 &&
        ball.char.startTime - 1000 <= position && ball.char.endTime + 300 >= position 
      ) {
        soundFile.play();
        ball.clicked = true;
        // Get user click timing
        let clickTiming = Math.abs(ball.char.startTime - position);
        if(clickTiming <= 150){
          spliceTiming = spliceJust;
          console.log('Just!', clickTiming);
          playerScore += 50;
        }else if(clickTiming <= 300){
          spliceTiming = spliceNice;
          console.log('Nice!', clickTiming);
          playerScore += 30;
        }else{
          spliceTiming = spliceGood;
          console.log('Good!', clickTiming);
          playerScore += 10;
        }
        ball.spliceTiming = spliceTiming;
        clickedArr.push(ball);
        balls.splice(balls.indexOf(ball), 1);
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
    // Prevent any default behavior for touchStart function
    return false;
  }
  p5.windowResized = () => {
    width = p5.windowWidth - 20;
    height = p5.windowHeight - 20;
    p5.resizeCanvas(width, height);
  }
}

function clickEffect(p5, clickedArr, position){
  let nearBalls = [];
  let effectColor = p5.stroke('rgba(0, 177, 204, 0.8)');
  p5.strokeWeight(4);
  p5.fill(255,255,255, 0.2);
  clickedArr.forEach(ball => {
    let effectTime = position - ball.char.startTime;
    if(ball.spliceTiming >= spliceJust){
      effectColor = p5.stroke('rgba(0, 48, 71, 0.8)');
      p5.ellipse(ball.x, ball.y, 10 + effectTime * 0.2, 10 + effectTime * 0.2);
      p5.ellipse(ball.x, ball.y, 50 + effectTime * 0.2, 50 + effectTime * 0.2);
    }
    else if(ball.spliceTiming >= spliceNice){
      effectColor = p5.stroke('rgba(1, 105, 143, 0.8)');
      p5.ellipse(ball.x, ball.y, 50 + effectTime * 0.2, 50 + effectTime * 0.2);
    }
    p5.ellipse(ball.x, ball.y, 90 + effectTime * 0.2, 90 + effectTime * 0.2);
    // Remove clicked ball
    if(90 + effectTime * 0.2 > ball.spliceTiming){
      clickedArr.splice(clickedArr.indexOf(ball), 1);
    }
    for(let bi = 0; bi < ball.others.length; bi++){
      if(
        p5.sqrt(p5.pow(Math.abs(ball.others[bi].x - ball.x), 2) + p5.pow(Math.abs(ball.others[bi].y - ball.y), 2)) < 45+effectTime*0.2 &&
        (ball.others[bi].chord == 0 || position - ball.others[bi].char.endTime > 0)
      ){
        nearBalls.push(ball.others[bi]);
      }
    };
    for(let ni = 0; ni < nearBalls.length; ni++){
      let ballIndex = balls.indexOf(nearBalls[ni]);
      balls.splice(ballIndex, 1);
    }
  });
}

const p5sketch = new p5(sketch);