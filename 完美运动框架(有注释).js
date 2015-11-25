/**
 * 获取对象的样式
 * @param obj  对象
 * @param name 样式名称
 */
function getStyle(obj, name) {
    if (obj.currentStyle) {
        return obj.currentStyle[name];
    } else {
        return getComputedStyle(obj, false)[name];
    }
}
/**
 * 完美运动框架实现了链式运动框架无法实现多属性同时运动的情况。如：width/height同时运动
 * @param obj
 * @param json 把要运动的属性通过json方式传入。如：{width:500,height:500}
 * @param fun 执行完动作后，需要调用的方法
 */
function startMove(obj, json, fun) {
    clearTimeout(obj.timer);
    obj.timer = setInterval(function () {
        var stop = true; //用来判断是否可以关闭定时器
        for (var item in json) {
            var cur;
            if (item == 'opacity') {
                cur = Math.round(parseFloat(getStyle(obj, item)) * 100);
            } else {
                cur = parseInt(getStyle(obj, item));
            }
            var speed = (json[item] - cur) / 6;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            if (cur != json[item]) {    //判断当前对象的值是否已经达到目标值
                stop = false;           //未达到目标值时，让stop为false。
            }
            if (item == 'opacity') {
                obj.style.filter = 'alpha(opacity:' + (cur + speed) + ')';
                obj.style.opacity = (cur + speed) / 100;//把范围重新缩小为0~1之间
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