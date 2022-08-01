Status = "";
tv_image = "";
objects = [];

function preload() {
    tv_image = loadImage("tv.jpeg");
}

function setup() {
    canvas = createCanvas(550,350);
    canvas.center()
    canvas.position(520,255);
    object_detector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
    console.log("Model is Loaded!");
    Status = true;
    object_detector.detect(tv_image, gotResult);
}

function gotResult(error,results) {
    if(error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw() {
    image(tv_image,0,0,550,350);
    if (Status != "") {
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            fill("#7c31f5");
            percent = floor(objects[i].confidence*100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#7c31f5");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}