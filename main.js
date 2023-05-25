var sond= "";
var img = "";
var myStatus = "";
var object = [];
var tocando = false;

function preload(){
 sond = loadSound("87675427.mp3")
}

function setup(){
  canvas = createCanvas(380,380)
  canvas.center()

 video = createCapture(VIDEO)
 video.hide()

}

function start(){
  objectDetector = ml5.objectDetector('cocossd',modelLoaded)
}

function modelLoaded(){
  console.log("modelo carregado")
  myStatus = true
  objectDetector.detect(video,gotResult)
}

function gotResult(error,results){
  if(error){
    console.error(error)
  }
  else{
    console.log(results)
    object = results;
  }
}

function draw(){
  image(video,0,0,380,380)

  if(myStatus !=""){
    r = random(255)
    g = random(255)
    b = random(255)

    //objectDetector.detect(video,gotResult)
    let temPessoa = false;
    document.getElementById("number_of_objects").innerhtml = "quantidade de objetos detectados" + object.length
    
    for(var i =0; i<object.length ; i++){ 
       if(object[i].label === "person"){  
        temPessoa = true;
        fill(r,g,b);
        percent = floor(object[i].confidence*100)
        text(object[i].label+" "+percent+"%",object[i].x,object[i].y)
        noFill()
        stroke(r,g,b)
        rect(object[i].x,object[i].y,object[i].width,object[i].height)
      }     
    }

    if(temPessoa) {
      document.getElementById("status").innerHTML = "Bebê detectado";
      sond.stop()
      tocando = false
    } else {
      document.getElementById("status").innerHTML = "Bebê não detectado";
      if (!tocando) {
       sond.play()
       tocando = true
      }
    }
  }
}