//addLoadEvent();按照顺序执行，不会产生覆盖问题
addLoadEvent(initPage);

var welcomeOnoff = true;

function initPage() {
	//顶部标签页
	var tab_a = document.getElementById('tabs').getElementsByTagName('a');	
	for(var i=0;i<tab_a.length;i++) {
		tab_a[i].onmouseenter = showContent;
		tab_a[i].onmouseleave = hideContent;
		tab_a[i].onclick = showclk;
	}
	//左边纵向按钮
	var btn_a = document.getElementById('navigation').getElementsByTagName('a');
	for(var j=0;j<btn_a.length;j++) {
		addEventHandler(btn_a[j],'mouseenter',showBtn);
		addEventHandler(btn_a[j],'mouseenter',showContent);
		// btn_a[j].onmouseenter = showBtn;
		// btn_a[j].onmouseenter = showContent;	
		addEventHandler(btn_a[j],'mouseleave',hideBtn);
		addEventHandler(btn_a[j],'mouseleave',hideContent);
		// btn_a[j].onmouseleave = hideBtn;
		// btn_a[j].onmouseleave = hideContent;
		btn_a[j].onclick = showclk;
	}
}

function showBtn (e) {
	var the_this = getActivatedObject (e);
	the_this.className = 'active';
}
function hideBtn (e) {
	var the_this = getActivatedObject (e);
	the_this.className = '';
}
function showContent(e) {
	if(!welcomeOnoff) {
		return;
		//当beginners、intermediate、advanced的点击事件发生时，tab滑入事件失效
	}
	var the_this = getActivatedObject (e);
	switch (the_this.title) {
		case 'beginners' : var hintText = "Just getting started? Come join us!";
		break;
		case 'intermediate' : var hintText = "Take your flexibility to the next level!";
		break;
		case 'advanced' : var hintText = "Perfectly join your body and mind with these intensive workouts.";
		break;
		default : var hintText = "Click a tab to display the course schedule for the selected class.";  
		break;
	}
	var con_obj = document.getElementById('content');
	con_obj.innerHTML = '<h3>' + hintText + '</h3>';
}

function hideContent (e) {
	//当welcome点击事件发生时，tab滑出事件依然有效
	if(welcomeOnoff) {
		var con_obj = document.getElementById('content');
		con_obj.innerHTML = '<h3>Click a tab to display the course schedule for the selected class.</h3>';
	}
}


function showclk (e) {
	var theTabTit = this.title;
	var con_obj = document.getElementById('content');
	if(theTabTit=='welcome') {
		con_obj.innerHTML = '<h3>Click a tab to display the course schedule for the selected class.</h3>';
		welcomeOnoff = true;
	}else{
		welcomeOnoff = false;
		//点击事件发生，tab的划入事件失效
	}
	var tab_aa = document.getElementById('tabs').getElementsByTagName('a');
	for(var i=0;i<tab_aa.length;i++) {
		var nowTab = tab_aa[i];
		if(nowTab.title==theTabTit) {
			nowTab.className = 'active';
		}else{
			nowTab.className = 'inactive';
		}
	}
	checkUsername(this.title,con_obj);	
}

function checkUsername(theTabTit,con_obj)  {
	//得到一个请求对象
	var xml = requestObject();
	if (xml == null) {
		alert("Unable to create request");
		return;
	}
	//配置请求，GET方式
	xml.open('GET',theTabTit + '.html',true);
	//设置回调函数
	xml.onreadystatechange = function() {
		if(xml.readyState==4 && xml.status==200) {
			var t_xml = xml.responseText;
			con_obj.innerHTML = t_xml;	
		}
	}
	//发送请求
	xml.send(null);
}