function getStyle(obj, name) {
    if (obj.currentStyle) {
        return obj.currentStyle[name];
    } else {
        return getComputedStyle(obj, false)[name];
    }
}
function startMove(obj, json, fun) {
    clearTimeout(obj.timer);
    obj.timer = setInterval(function () {
        var stop = true;
        for (var item in json) {
            var cur;
            if (item == 'opacity') {
                cur = Math.round(parseFloat(getStyle(obj, item)) * 100);
            } else {
                cur = parseInt(getStyle(obj, item));
            }
            var speed = (json[item] - cur) / 6;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            if (cur != json[item]) {
                stop = false;
            }
            if (item == 'opacity') {
                obj.style.filter = 'alpha(opacity:' + (cur + speed) + ')';
                obj.style.opacity = (cur + speed) / 100;
            } else {
                obj.style[item] = cur + speed + 'px';
            }
            if(stop){
                clearInterval(obj.timer);
                if(fun){fun();}
            }
        }
    }, 30);
}