Classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/AyiF7GrSc/model.json ', ModelLoaded)


Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach('#camera')

function takeimg() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="' + data_uri + '"/>';
    })
}

console.log('ml5 version', ml5.version);

function ModelLoaded()
{
    console.log("Model is Loaded!")
}

var prediction_1 = "";
var prediction_2 = "";


function speak() {
    var synth = window.speechSynthesis;
    speak_data_1 = "The First Prediction is " + prediction_1;
    speak_data_2 = "The second Prediction is " + prediction_2;
    var utterthis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterthis)
}

function snap() {
    img = document.getElementById('captured_image');
    Classifier.classify(img, gotResult);
}

function gotResult(error, results) 
{
    if (error) {
        console.error(error)
    } else {
        console.log(results)
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();
        if (results[0].label == "GREAT")
        {
            document.getElementById("update_emoji").innerHTML = "👍";
        }
        if (results[0].label == "OK")
        {
            document.getElementById("update_emoji").innerHTML = "👌";
        }
        if (results[0].label == "HIGH FIVE")
        {
            document.getElementById("update_emoji").innerHTML = "🖐";
        }
        if (results[0].label == "PUNCH")
        {
            document.getElementById("update_emoji").innerHTML = "👊"
        }


        if (results[1].label == "GREAT")
        {
            document.getElementById("update_emoji2").innerHTML = "👍";
        }
        if (results[1].label == "OK")
        {
            document.getElementById("update_emoji2").innerHTML = "👌";
        }
        if (results[1].label == "HIGH FIVE")
        {
            document.getElementById("update_emoji2").innerHTML = "🖐";
        }
        if (results[1].label == "PUNCH")
        {
            document.getElementById("update_emoji2").innerHTML = "👊";
        }
    }
}
