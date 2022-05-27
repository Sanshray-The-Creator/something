status1 = "";
objects = [];
song = "";

function setup()
{
    canvas = createCanvas(380, 380);
    canvas.center();
    webcam = createCapture(VIDEO);
    webcam.hide();
    oneshot = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Detecting Objects";
}

function modelLoaded()
{
    console.log("Coco SSD Model is loaded!");
    status1 = true;
    oneshot.detect(webcam, gotResult);
}

function gotResult(error, results)
{
    if(error)
    {
      console.log(error);
    }
    else
    {
      console.log(results);
      objects = results;
    }
}

function preload()
{
    song = loadSound("babymissing.mp3");
    
}


function draw()
{
    image(webcam, 0, 0, 380, 380);
    if(status1 != "empty")
    {
        r = random(255);
        g = random(255);
        b = random(255);
        oneshot.detect(webcam, gotResult); 
       for(i = 0; i < objects.length; i++)
       {
       if (objects.length > 0)
       {             
        console.log(objects.length);
        document.getElementById("status").innerHTML = "Status : Object Detected";
        console.log("baby detected")
        document.getElementById("babyid").innerHTML = "Baby Is Detected :";
        fill(r,g,b);
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
        noFill();
        stroke(r,g,b);
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
       }
       else 
       {
        document.getElementById("babyid").innerHTML = "Baby Is Missing :";
        song.play();

       }
        
    }
       
    }
}
