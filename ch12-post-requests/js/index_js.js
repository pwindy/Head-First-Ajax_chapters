//addLoadEvent();按照顺序执行，不会产生覆盖问题
addLoadEvent(initPage);
var onoff_name;
var onoff_psd;

function initPage() {
	document.getElementById('register').disable = true;
	document.getElementById('username').onblur = checkUsername;//失去焦点
	document.getElementById('password2').onblur = checkPassword;//失去焦点
	document.getElementById('register').onclick = registerUser;//按钮点击事件	
}

function checkUsername()  {
	document.getElementById('username').className = 'thinking';
	//得到一个请求对象
	var xml_name = requestObject();
	if (xml_name == null) {
		alert("Unable to create request");
		return;
	}
	var userName = document.getElementById('username').value;
	var url = 'checkName.php?username=' + escape(userName);

	//配置请求，GET方式
	xml_name.open('GET',url,true);

	//设置回调函数
	xml_name.onreadystatechange = function() {
		if(xml_name.readyState==4 && xml_name.status==200) {
			var t_xml = xml_name.responseText;
			if(t_xml=='okay') {
				document.getElementById('username').className = 'approved';
				onoff_name = true;
			}else{
				document.getElementById('username').className = 'denied';
				document.getElementById('username').focus();//input获得焦点
				document.getElementById('username').select();//input文本内容被选中
				onoff_name = false;
			}
			listener();		
		}
	}
	//发送请求
	xml_name.send(null);
}

function checkPassword () {
	var psd1 = document.getElementById('password1');
	var psd2 = document.getElementById('password2');
	psd1.className = 'thinking';
	
	if((psd1.value=='') || (psd1.value!=psd2.value)){
		return;
	}
	
	//得到一个请求对象
	var xml_Password = requestObject();
	if (xml_Password == null) {
		alert("Unable to create request");
		return;
	}
	var psd1_val = document.getElementById('password1').value;
	var url = 'checkPass.php?password=' + escape(psd1_val);

	//配置请求，GET方式
	xml_Password.open('GET',url,true);
	//设置回调函数
	xml_Password.onreadystatechange = function() {
		if(xml_Password.readyState==4 && xml_Password.status==200) {
			var t_xml = xml_Password.responseText;
			if(t_xml=='okay') {
				document.getElementById('password1').className = 'approved';
				onoff_psd = true;				
			}else if(t_xml=='denied'){
				document.getElementById('password1').className = 'denied';
				document.getElementById('password1').focus();//input获得焦点
				document.getElementById('password1').select();//input文本内容被选中
				onoff_psd = false;
			}
			listener ();		
		}
	}
	//发送请求
	xml_Password.send(null);
}

function registerUser () {
	t = setInterval(scrollImages, 50);
	// if(!document.getElementById) {return false;}
	// if(!document.getElementById('box')) {return false;}
	// box = document.getElementById('box');
	// scrollImage(box,'left',-176);
	document.getElementById('register').value = '提交中...';
	//得到一个请求对象
	var xml_Register = requestObject();
	if (xml_Register == null) {
		alert("Unable to create request");
		return;
	}

	// var url = 'register.php';
	var url = 'register-feedback.php';
	var xml_data = 'username=' + document.getElementById('username').value
					+ '&password=' + document.getElementById('password1').value
					+ '&firstname=' + document.getElementById('firstname').value
					+ '&lastname=' + document.getElementById('lastname').value
					+ '&email=' + document.getElementById('email').value
					+ '&genre=' + document.getElementById('genre').value
					+ '&favorite=' + document.getElementById('favorite').value
					+ '&tastes=' + document.getElementById('tastes').value;
	console.log(xml_data);

	//配置请求，POST方式
	xml_Register.open('POST',url,true);
	//设置回调函数
	xml_Register.onreadystatechange = function() {
		if(xml_Register.readyState==4 && xml_Register.status==200) {
			// cancelAnimationFrame(timer);//服务器响应成功，清除定时器
			var t_xml = xml_Register.responseText;
			var wrapper = document.getElementById('wrapper');
			//清空页面内容
			while (wrapper.hasChildNodes()) {
				wrapper.removeChild(wrapper.lastChild);
			}
			//清空页面内容后，放入服务器响应回来的新内容
			wrapper.innerHTML = t_xml;
		}
	}

	//请求头，告诉web服务器post方式的数据是什么类型，方便服务器解码数据
	xml_Register.setRequestHeader('Content-Type','application/x-www-form-urlencoded');

	//发送请求
	xml_Register.send(xml_data);
}
function scrollImages() {
  var coverBarDiv = document.getElementById("coverBar");
  var images = coverBarDiv.getElementsByTagName("img");
  for (var i = 0; i < images.length; i++) {
    var left = images[i].style.left.substr(0, images[i].style.left.length - 2);
    if (left <=  -82) {
      left = 532;
    }

    images[i].style.left = (left - 1) + "px";
  }
}

