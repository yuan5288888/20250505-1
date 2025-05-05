let video;
let poseNet;
let poses = [];
let img;

function preload() {
  // 載入圖片
  img = loadImage('UoKfhYw.png');
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);

  // 初始化 PoseNet
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', function(results) {
    poses = results;
  });

  video.hide();
}

function modelLoaded() {
  console.log('PoseNet 已載入');
}

function draw() {
  background(0);
  translate(video.width, 0); // 因為攝影機顯示的是反像的畫面，需要透過這兩條指令來做反轉
  scale(-1, 1); // 因為攝影機顯示的是反像的畫面，需要透過這兩條指令來做反轉
  image(video, 0, 0, width, height);

  // 繪製左耳圖片
  if (poses.length > 0) {
    let pose = poses[0].pose;
    let leftEar = pose.keypoints[3]; // 左耳的位置

    if (leftEar.score > 0.5) { // 確保偵測到左耳
      image(img, leftEar.position.x, leftEar.position.y, 50, 50); // 顯示圖片
    }
  }
}
