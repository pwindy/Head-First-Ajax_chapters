function addLoadEvent(func) {
    var oldOnload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    }else{
        window.onload = function() {
            oldOnload();
            func();
        }
    }
}

//获取请求对象
function requestObject() {
	var xml;
	if(window.XMLHttpRequest) {
		xml = new XMLHttpRequest();
	}else{
		try{xml = new ActiveXObject('Msxml2.XMLHTTP.6.0');}
		catch(e) {
			try{xml = new ActiveXObject('Msxml2.XMLHTTP.3.0');}
			catch(failed) {
				xml=null;
			}	
		}
	}
	return xml;
}
//事件函数，可以同时注册多个事件
function addEventHandler(obj,eventName,handler) {
	if(document.attachEvent) {//jianrongie8及以下版本
		obj.attachEvent('on' + eventName,handler);
	}else if(document.addEventListener){
		obj.addEventListener(eventName,handler,false);
	}
}
//获取事件对象
function getActivatedObject (e) {
	var obj;
	if(!e) {//ie5以下
		obj = window.event.srcElement;
	}else if(e.srcElement) {//ie7以下
		obj = e.srcElement;
	}else{//DOM level 2 浏览器
		obj = e.target;
	}
	return obj;
}
//监视器
function listener () {
	if(onoff_psd&&onoff_name){
		document.getElementById('register').disable = false;
	}else{
		document.getElementById('register').disable = true;
	}
}

//获取对象
function getStyle(obj,attr) {
	if(window.getComputedStyle){
		return getComputedStyle(obj)[attr];
	}else{
		return obj.currentStyle[attr];
	}
}