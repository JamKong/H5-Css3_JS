/**
 * ��ȡ�������ʽ
 * @param obj  ����
 * @param name ��ʽ����
 */
function getStyle(obj, name) {
    if (obj.currentStyle) {
        return obj.currentStyle[name];
    } else {
        return getComputedStyle(obj, false)[name];
    }
}
/**
 * �����˶����ʵ������ʽ�˶�����޷�ʵ�ֶ�����ͬʱ�˶���������磺width/heightͬʱ�˶�
 * @param obj
 * @param json ��Ҫ�˶�������ͨ��json��ʽ���롣�磺{width:500,height:500}
 * @param fun ִ���궯������Ҫ���õķ���
 */
function startMove(obj, json, fun) {
    clearTimeout(obj.timer);
    obj.timer = setInterval(function () {
        var stop = true; //�����ж��Ƿ���Թرն�ʱ��
        for (var item in json) {
            var cur;
            if (item == 'opacity') {
                cur = Math.round(parseFloat(getStyle(obj, item)) * 100);
            } else {
                cur = parseInt(getStyle(obj, item));
            }
            var speed = (json[item] - cur) / 6;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            if (cur != json[item]) {    //�жϵ�ǰ�����ֵ�Ƿ��Ѿ��ﵽĿ��ֵ
                stop = false;           //δ�ﵽĿ��ֵʱ����stopΪfalse��
            }
            if (item == 'opacity') {
                obj.style.filter = 'alpha(opacity:' + (cur + speed) + ')';
                obj.style.opacity = (cur + speed) / 100;//�ѷ�Χ������СΪ0~1֮��
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