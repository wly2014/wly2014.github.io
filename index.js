var first = true;
document.onkeydown = function (event) {
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if (e && e.keyCode == 13) { // 按 Enter 
        //开始游戏
        startGame();
        if (first) {
            first = false;
            try {
                startGetMedia();
            } catch (e) {
                console.log("可能没开启麦克风")
                console.log(e)
            }
        }
    }else if (e && e.keyCode == 32 && !first) {
        // 空格键
        fly();
    }
}

function startButton(){
    //开始游戏
    startGame();
    if (first) {
        first = false;
        try {
            startGetMedia();
        } catch (e) {
            console.log("可能没开启麦克风")
            console.log(e)
        }
    }
}