song="";
leftWristX=0;
leftWristy=0;
rightWristX=0;
rightWristy=0;
function setup(){
    canvas=createCanvas(600,500);
    canvas.position(650,400);
    video=createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}
function modelLoaded(){
    console.log('Posenet is Initialized');
}
function preload(){
    song=loadSound("music.mp3");
}
function draw(){
    image(video,0,0,600,500);
    fill("#FF0000");
    stroke("#FF0000");
   circle(rightWristX,rightWristy,20);
   if(rightWristy>0 && rightWristy<=100)
   {
    document.getElementById("speed").innerHTML="Speed=0.5x";
    song.rate(0.5);
   }
  else if(rightWristy>100 && rightWristy<=200)
   {
    document.getElementById("speed").innerHTML="Speed=1x";
    song.rate(1);
   }
   else if(rightWristy>200 && rightWristy<=300)
   {
    document.getElementById("speed").innerHTML="Speed=1.5x";
    song.rate(1.5);
   }
  else if(rightWristy>300 && rightWristy<=400)
   {
    document.getElementById("speed").innerHTML="Speed=2x";
    song.rate(2);
   }
   else if(rightWristy>400 && rightWristy<=500)
   {
    document.getElementById("speed").innerHTML="Speed=2x";
    song.rate(2);
   }
    circle(leftWristX,leftWristy,20);
    intleftWristy=Number(leftWristy);
    remove_decimals=floor(intleftWristy);
    volume=remove_decimals/500;
    document.getElementById("egg").innerHTML="Volume = "+volume;
    song.setVolume(volume);
    
}
function idk(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function gotPoses(results){
    if(results.length>0){
        scoreRightWrist=results[0].pose.keypoints[10].score;
        scoreLeftWrist=results[0].pose.keypoints[9].score;
        console.log(results);
        leftWristX=results[0].pose.leftWrist.x;
        leftWristy=results[0].pose.leftWrist.y;
        rightWristX=results[0].pose.rightWrist.x;
        rightWristy=results[0].pose.rightWrist.y;
    }
}