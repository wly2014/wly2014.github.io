var audioContext;
var analyser;
var mic;
var audioCanvas = document.getElementById("audio");
var ctx = audioCanvas.getContext("2d");
var HEIGHT = 200;
var WIDTH = 30;
var toggle = 4000;

audioCanvas.addEventListener("click", function (evt) {
    var mousePos = getMousePos(audioCanvas, evt);
    // alert(mousePos.x + ',' + mousePos.y);
    toggle = (HEIGHT - mousePos.y) * 50;
}, false);


//Get Mouse Position 
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left * (canvas.width / rect.width),
        y: evt.clientY - rect.top * (canvas.height / rect.height)
    }
}

// 音频相关
navigator.getMedia = (navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia);

// 开始获取声音的分贝
navigator.getMedia({ audio: true }, function (stream) {
    audioContext = new (window.AudioContext || window.webkitAudioContext);
    //返回一个多媒体流
    mic = audioContext.createMediaStreamSource(stream);
    //creates an AnalyserNode 创建一个分析节点
    analyser = audioContext.createAnalyser();
    //fftsize默认值2048，是快速傅立叶变换用于频域分析的值，必须为2的幂，而我们得到的数据通常为其的一半，下面会说道
    analyser.fftSize = 256;
    mic.connect(analyser);

}, function () { });

var isStart = false;
function startGetMedia() {
    isStart = true;
    //调用刷新函数
    drawSpectrum();
}

//刷新函数
function drawSpectrum() {

    //长度为128无符号数组用于保存getByteFrequencyData返回的频域数据
    var array = new Uint8Array(128);
    analyser.getByteFrequencyData(array);

    let allValue = 0;
    let maxValue = 0;
    for (var i = 0; i < (array.length); i++) {
        var value = array[i];
        allValue += value;
    }
    if (maxValue < allValue) {
        maxValue = allValue;
    }
    // console.log(maxValue);
    // console.log(allValue);
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.fillStyle = "#000";
    if (allValue > toggle) {
        ctx.fillRect(0, HEIGHT - allValue / 50 - 3, WIDTH, 3);
    } else {
        ctx.fillRect(0, HEIGHT - toggle / 50 - 3, WIDTH, 3);
    }
    ctx.fillStyle = "#0000aa";
    ctx.fillRect(0, HEIGHT - allValue / 50, WIDTH, allValue);
    // 声音足够大时就fly
    if (allValue > toggle) {
        fly();
    }

    //
    requestAnimationFrame(drawSpectrum);
};