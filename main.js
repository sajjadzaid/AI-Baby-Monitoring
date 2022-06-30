status="";
object=[];
function preload(){
img=loadImage("dog_cat.jpg");
}

function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    video= createCapture(VIDEO);
    video.hide();
    video.size(380, 380)
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status:Detecting Object"
}

function modelLoaded(){
    console.log("CocoSSD is initialized");
    status=true;
    

}

function gotresult(error,result){
    if(error){
        console.log(error)
    }
    else{
        console.log(result)
        object=result;
    }
}


function draw(){
    image(video,0,0,380,380)
    /*fill('red')
    text("dog",45,75)
    noFill()
    stroke('red')
    rect(30,60,450,350)

    fill("red")
    text("cat",320,120)
    noFill()
    stroke("red")
    rect(300,90,270,320)*/

    if(status!=""){
        objectDetector.detect(video, gotresult);
        r=random(255);
        g=random(255);
        b=random(255);
        for(i=0; i<object.length; i++){
            document.getElementById("status").innerHTML="Status = Object Detected";
            fill(r,g,b);
            percent= floor(object[i].confidence*100);
            text(object[i].label + " " + percent +"%", object[i].x, object[i].y);
            noFill();
            stroke(r,g,b);
            rect(object[i].x,object[i].y, object[i].width, object[i].height);
            if(object[i].label=="person"){
                document.getElementById("number_of_objects").innerHTML="baby found"
                song.stop();
            }
            else{
                document.getElementById("number_of_objects").innerHTML="baby not found"
                song.play();
            }

        }

        
    }

}
    
