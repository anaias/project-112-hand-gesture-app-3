prediction_1="";

Webcam.set({
    width:350, height:300, image_format:'png',png_quality:100
});

camera=document.getElementById("camera");
Webcam.attach("#camera");

function take_snap(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id = "cap_img" src = "'+data_uri + '"/>';
    })
}

console.log("ml5 version", ml5.version);

classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/K85CuZmKH/model.json', modelLoaded);

function modelLoaded(){
    console.log("The model has loaded!! YAYA")
}

function speak(){
    var synth=window.speechSynthesis;
    speak_data = "The prediction is" + prediction_1;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}

function check(){
    img=document.getElementById('cap_img');
    classifier.classify(img, gotResults);
}

function gotResults(error, results){
    if(error){
        console.error(error);
    }
else{
    console.log(results);
    document.getElementById("result_gesture_name").innerHTML = results[0].label;
    prediction_1 = results[0].label;
    speak();
}

if(results[0].label == "thumbs up"){
    document.getElementById("update_emoji").innerHTML = "&#128077;";
}

if(results[0].label == "peace"){
    document.getElementById("update_emoji").innerHTML = "&#9774;";
}

if(results[0].label == "amazing"){
    document.getElementById("update_emoji").innerHTML = "&#128076;";
}

if(results[0].label == "hearteu"){
    document.getElementById("update_emoji").innerHTML = "&#128156;";
}

}