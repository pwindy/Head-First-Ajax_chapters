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
//addLoadEvent();按照顺序执行，不会产生覆盖问题
addLoadEvent(initPage);

function initPage() {
	var img_obj = document.getElementById('thumbnailPane').getElementsByTagName('img');
	var show_img = document.getElementById('itemDetail');
	for(var i=0;i<img_obj.length;i++) {
		img_obj[i].onclick = function() {
			var con_src = 'images/'+this.title+'-detail.jpg';
			show_img.src = con_src;
			getDetails(this.title);
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


function getDetails(idName) {
	//得到一个请求对象
	var xml = requestObject();
	if (xml == null) {
		alert("Unable to create request");
		return;
	}

	// PHP是5.1以及更早版本
	// var  url = 'getDetailsJSONdown.php?ImageID=' + escape(idName);
	
	// PHP是5.2以及以上版本
	var  url = 'getDetailsJSONup.php?ImageID=' + escape(idName);
	
	//配置请求，GET方式
	xml.open('GET',url,true);
	//设置回调函数
	xml.onreadystatechange = function() {
		if(xml.readyState==4 && xml.status==200) {
			var show_text = document.getElementById('description');

			//去掉之前显示的内容
			for(var i=show_text.childNodes.length;i>0;i--) {
				show_text.removeChild(show_text.childNodes[i-1]);
			}
				
			var items = JSON.parse( xml.responseText );
			//JSON.parse()把字符串转变成对象

			for(var attr in items) {
				if( !isArray(items[attr]) ) {
					var itemsName = document.createElement('p');
					var itemNameValue = document.createTextNode(attr.toLocaleUpperCase() + ' : ' +items[attr]);
					itemsName.appendChild( itemNameValue );
					show_text.appendChild( itemsName );
				}else{
					var itemsh4 = document.createElement('h4');
					itemsh4.appendChild( document.createTextNode(attr.toLocaleUpperCase() + ' : ') );
					show_text.appendChild( itemsh4 );
					var itemsDiv = document.createElement('div');
					for(var i=0;i<items[attr].length;i++) {
						var itemsA = document.createElement('a');
						itemsA.setAttribute('href', items[attr][i]);
						itemsA.setAttribute('target', '_blank');
						itemsA.appendChild( document.createTextNode(items[attr][i]) );
						itemsDiv.appendChild( itemsA );
					}
					show_text.appendChild( itemsDiv );
				}
			}
		
		}
	}
	//发送请求
	xml.send(null);
}



function isArray(arg) {
	if (typeof arg == 'object') {
		var criteria = arg.constructor.toString().match(/array/i);
		return (criteria != null);
	}
	return false;
}
