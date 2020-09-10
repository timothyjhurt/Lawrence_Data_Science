let video;
let features;
let knn;
let labelP;
let ready = false;
let x;
let y;
let label = 'nothing';

function setup() {
  createCanvas(320, 240);
  video = createCapture(VIDEO);
  video.size(320, 240);
  video.style("transform","scale(-1,1)");
  features = ml5.featureExtractor('MobileNet', modelReady);
  knn = ml5.KNNClassifier();
  labelP = createP('need training data');
  labelP.style('font-size', '32pt');
  x = width / 2;
  y = height / 2;
}

function goClassify() {
  const logits = features.infer(video);
  knn.classify(logits, function(error, result) {
    if (error) {
      console.error(error);
    } else {
      label = result.label;

      goClassify();
    }
  });
}

function keyPressed() {
  const logits = features.infer(video);
  if (key == 'l') {
    knn.addExample(logits, 'left');
    console.log('left');
  } else if (key == 'r') {
    knn.addExample(logits, 'right');
    console.log('right');
  } else if (key == 'u') {
    knn.addExample(logits, 'up');
    console.log('up');
  } else if (key == 'd') {
    knn.addExample(logits, 'down');
    console.log('down');
  } else if (key == 's') {
    knn.save('knn_model.json');
  } else if (key == 'n') {
    knn.addExample(logits, 'nothing');
    console.log('nothing');
  } else if (key == 'k') {
    knn.load('knn_model.json', function() {
      console.log('knn loaded');
    });
  }
}

function modelReady() {
  console.log('model ready!');
}

function draw() {
  background(0);
  fill(255);
  ellipse(x, y, 24);

  if (label == 'left' || label == 1) {
    x--;
    labelP.html("Left");
  } else if (label == 'right' || label == 2) {
    x++;
    labelP.html("Right");
  } else if (label == 'up' || label ==3) {
    y--;
    labelP.html("Up");
  } else if (label == 'down' || label ==0) {
    y++;
    labelP.html("Down");
  }
   x = constrain(x, 0, width);
   y = constrain(y, 0, height);

  if (!ready && knn.getNumLabels() > 0) {
    goClassify();
    ready = true;
  }
}
