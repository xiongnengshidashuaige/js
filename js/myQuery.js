function $(id) {
	return document.getElementById(id);
}

//获取元素样式的方法
function getStyle(obj, attr) {
	if(obj.currentStyle) {
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj)[attr];
	}
}

function Go(obj, attr, direct, target,speed,endFn) {
	clearInterval(obj.timer);
	obj.timer = setInterval(function() {
		//为什么要写成obj.timer,为了解决多个元素的动画相互之间影响的问题
		var Distance = parseInt(getStyle(obj, attr)) + direct;
		if(Distance >= target && direct > 0 || Distance < target && direct < 0) { //与运算的优先级大于或运算
			Distance = target;
		}
		//			1+2*3
		obj.style[attr] = Distance + 'px';
		//				obj.style.marginLeft
		if(Distance == target) {
			clearInterval(obj.timer);
			if(endFn) { //这个if判断是为了解决我们不需要传入endFn参数时的报错问题
				endFn(); //实际调用Go函数的时候，我们有可能需要再Go函数执行完毕之后去做其他事情，这件事就通过回调函数endFn来实现
			}
		}

	}, speed)
}

function Opacity(obj, state,endFn) {
	obj.changeOpacity = setInterval(function() {
		var opa = parseFloat(getStyle(obj, 'opacity')) + state;
		if(opa <= 0 || opa >= 1) {
			state > 0 ? opa = 1 : opa = 0; //判断元素是需要影藏还是显示
			if(opa==0){
				obj.style.display='none';
			}
			clearInterval(obj.changeOpacity);
			if(endFn){
				endFn();
			}
		}
		obj.style.opacity = opa;
	}, 50)
}

function shake(obj, attr, endFn) {
//	if(obj.s){
		obj.s=false;
		var posL = parseInt(getStyle(obj, attr));
		var arr = [];
		for(var i = 20; i >= 0; i -= 2) {
			arr.push(i, -i);
		}
		var num = 0;
		obj.shaker = setInterval(function() {
			obj.style[attr] = posL + arr[num] + 'px';
			num++;
			if(num >= arr.length) {
				clearInterval(obj.shaker);
				obj.s=true;
				if(endFn) {
					endFn();
				}
			}    
		}, 40)
//	}
}