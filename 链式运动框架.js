/**
 * 获取计算后的样式
 * @param obj 对象
 * @param name 样式名称：width/height等
 * @returns {*}
 */
function getStyle(obj, name) {
    if (obj.currentStyle) {
        return obj.currentStyle[name];
    } else {
        return getComputedStyle(obj, false)[name];
    }
}

function startMove(obj, attr, iTarget, fun) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var cur;
        if (attr == 'opacity') {
            cur = Math.round(parseFloat(getStyle(obj, attr)) * 100);
        } else {
            cur = parseInt(getStyle(obj, attr));
        }
        var speed = (iTarget - cur) / 6;
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
        if (cur == iTarget) {
            clearInterval(obj.timer);
            if (fun) {
                fun();
            }
        } else {
            if (attr == 'opacity') {
                obj.style.filter = 'alpha(opacity:' + (cur + speed) + ')';
                obj.style.opacity = (cur + speed) / 100;//把范围重新缩小为0~1之间
            } else {
                obj.style[attr] = cur + speed + 'px';
            }
        }
    }, 30);
}