// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Real time Object Detection using YOLO and p5.js
=== */

let video;
let yolo;
let objects = [];
let width = 320;
let height = 240;

function setup() {
  createCanvas(width, height);
  video = createCapture(VIDEO);
  video.size(width, height);

  // Create a YOLO method
  // yolo = ml5.ObjectDetector('YOLO', video, startDetecting);
  yolo = ml5.YOLO(video, startDetecting);
  // Hide the original video
  video.hide();

}

function draw() {
  image(video, 0, 0, width, height);
  for (let i = 0; i < objects.length; i++) {
    noStroke();
    fill(0, 255, 0);
    text(objects[i].label, objects[i].normalized.x * width, objects[i].normalized.y * height - 5);
    noFill();
    strokeWeight(4);
    stroke(0, 255, 0);
    rect(objects[i].normalized.x * width, objects[i].normalized.y * height, objects[i].normalized.width * width, objects[i].normalized.height * height);
  }
}

function startDetecting() {
  console.log('Model loaded!');
  detect();
}

function detect() {
  yolo.detect(function(err, results) {
    objects = results;
    detect();
  });
}
