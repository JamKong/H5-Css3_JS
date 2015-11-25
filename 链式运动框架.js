/**
 * ��ȡ��������ʽ
 * @param obj ����
 * @param name ��ʽ���ƣ�width/height��
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
                obj.style.opacity = (cur + speed) / 100;//�ѷ�Χ������СΪ0~1֮��
            } else {
                obj.style[attr] = cur + speed + 'px';
            }
        }
    }, 30);
}