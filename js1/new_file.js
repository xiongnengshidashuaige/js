function $(id){
		return document.getElementById(id);
	}
function getStyle(obj,attr){
	if(obj.currentStyle){
		return obj. currentStyle[attr];
	}else{
		return getComputedStyle(obj)[attr]
	}
}
