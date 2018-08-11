addLoadEvent(initPage);

function initPage () {
	//全局变量
	firstname = document.getElementById('firstname');
	lastname = document.getElementById('lastname');
	email = document.getElementById('email');
	enroll = document.getElementById('enroll')
	//当输入为空的情况
	addEventHandler( firstname,'blur',isEmpty );
	addEventHandler( lastname,'blur',isEmpty );
	addEventHandler( email,'blur',isEmpty );

	//当输入不为空的情况
	addEventHandler( firstname,'blur',isFilled );	
	addEventHandler( lastname,'blur',isFilled );	
	addEventHandler( email,'blur',emailFilled );
}

//是否为空
function isEmpty (e) {
	var obj_this = getActivatedObject (e);
	if (obj_this.value=='') {
		warn(obj_this,'empty');
	}
}

//是否填写正确内容
function isFilled (e) {
	var obj_this = getActivatedObject (e); 
	if ( /[^a-zA-Z]/.test(obj_this.value)&&obj_this.value!='' ) {
		//输入的非空内容不符合要求
		warn(obj_this,'yesFormat');
	}else if( /[a-zA-Z]/.test(obj_this.value)&&obj_this.value!='' ) {
		//输入的非空内容符合要求
		noWarn(obj_this,'yesFormat','empty');
	}
}

//邮箱格式是否正确
function emailFilled (e) {
	var obj_this = getActivatedObject (e);
	// console.log( /[\w\.-_\+]+@[\w-]+(\.\w{2,4})+$/.test(obj_this.value) );
	if( ! /[\w\.-_\+]+@[\w-]+(\.\w{2,4})+$/.test(obj_this.value)&&obj_this.value!=''  ){
		//输入的非空内容不符合要求
		warn(obj_this,'yesFormat');
	}else if(/[\w\.-_\+]+@[\w-]+(\.\w{2,4})+$/.test(obj_this.value)&&obj_this.value!='') {
		//输入的非空内容符合要求		
		noWarn(obj_this,'yesFormat','empty');
	}
}
var warnings = {
	'firstname':{
		'empty' :'请填写内容',
		'yesFormat' :'请填写正确格式'
	},
	'lastname':{
		'empty' :'请填写内容',
		'yesFormat' :'请填写正确格式'
	},
	'email':{
		'empty' :'请填写内容',
		'yesFormat' :'请填写正确格式'
	}
};

function warn(field,warnType) {
	var filed_parent = field.parentNode;
	var warns = eval( 'warnings.' + field.id + '.' + warnType );
	if( filed_parent.getElementsByTagName('p').length==0 ) {
		var p = document.createElement('p');
		p.appendChild( document.createTextNode(warns) );
		filed_parent.appendChild( p );
	}else{
		var p = filed_parent.getElementsByTagName('p')[0];
		p.childNodes[0].nodeValue = warns ;
	}
	enroll.disabled = true;
}

function noWarn(field,warnType1,warnType2) {
	var filed_parent = field.parentNode;
	var warns1 = eval( 'warnings.' + field.id + '.' + warnType1 );
	var warns2 = eval( 'warnings.' + field.id + '.' + warnType2 );
	if(filed_parent.getElementsByTagName('p').length>0){
		var p = filed_parent.getElementsByTagName('p')[0];
		if(p.childNodes[0].nodeValue==warns1||p.childNodes[0].nodeValue==warns2) {
			filed_parent.removeChild( p );
		}
	}
	
	//当所有的输入框下面没有警告框的时候，按钮才有效
	var fieldset = document.getElementsByTagName('fieldset');
	for(var i=0;i<fieldset.length;i++) {
		var p_length = fieldset[i].getElementsByTagName('p').length;
		if(p_length>0) {
			enroll.disabled = true;
			return;
		}
	}
	

	//当必填的三项都是合法数据时,提交按钮才生效
	if(firstname.value&&lastname.value&&email.value) {
		enroll.disabled = false;
	}else{
		enroll.disabled = true;
	}
}