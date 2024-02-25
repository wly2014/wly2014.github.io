var first = true;
document.onkeydown = function (event) {
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if (e && e.keyCode == 13) { // 按 Enter 
        //开始游戏
        startGame();
        if (first) {
            startGetMedia();
            first = false;
        }
    }else if (e && e.keyCode == 32) {
        // 空格键
        fly();
    }
}