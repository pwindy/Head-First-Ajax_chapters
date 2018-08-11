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
addLoadEvent(initPage);


function initPage (argument) {
	obj_td = document.getElementById('puzzleGrid').getElementsByTagName('td');
	obj_img = document.getElementById('puzzleGrid').getElementsByTagName('img');
	for(var i=0;i<obj_td.length;i++) {
		obj_td[i].onclick = clickFun;
	}
}

function clickFun () {
	var img = this.firstElementChild;
	var img_src = img.getAttribute('src');
	if(img_src=='images/empty.png') {
		alert("请点击数字区域");
		return;
	}
	var line = this.id.substr(4,1);
	var row = this.id.substr(5,1);
	//向上运动
	if(line>1) {
		var newLine = Number(line) - 1;
		var thatCellId = 'cell' + newLine + row ;
		var thatTD = document.getElementById(thatCellId);
		if( emptyOrNot(thatTD) ) {
			move (this,thatTD);
			return;
		}
	}
	//向下运动
	if(line<4) {
		var newLine = Number(line) + 1;
		var thatCellId = 'cell' + newLine + row ;
		var thatTD = document.getElementById(thatCellId);
		if( emptyOrNot(thatTD) ) {
			move (this,thatTD);
			return;
		}
	}
	//向左运动
	if(row>1) {
		var newRow = Number(row) - 1;
		var thatCellId = 'cell' + line + newRow;
		var thatTD = document.getElementById(thatCellId);
		if( emptyOrNot(thatTD) ) {
			move (this,thatTD);
			return;
		}
	}
	//向右运动
	if(row<4) {
		var newRow = Number(row) + 1;
		var thatCellId = 'cell' + line + newRow;
		var thatTD = document.getElementById(thatCellId);
		if( emptyOrNot(thatTD) ) {
			move (this,thatTD);
			return;
		}
	}
	//当点击的地方不是临近空白区域时
	alert('请点击空白区域旁边的数字区域');
}

//交换td对象
function move (thisTd,thatTd) {
	var thisImg = thisTd.firstElementChild;
	// thisImg = thisTd.firstChild;
	// while (thisImg.nodeName == "#text") {
	// 	thisImg = thisImg.nextSibling;
	// }
	var thatImg = thatTd.firstElementChild;
	thisTd.appendChild(thatImg);
	thatTd.appendChild(thisImg);

	//游戏完成后
	var allStr = '';
	for(var j=0;j<obj_img.length;j++) {
		var num = obj_img[j].getAttribute('src').substr(7,2);
		if(num=='em'){continue;}
		allStr += num;
	}
	if(allStr=='010203040506070809101112131415'){
		document.getElementById('puzzleGrid').className = 'win';
		alert('恭喜你，你赢了！');
	}
}

//判断td对象下面的img标签是不是空图片
function emptyOrNot (tdObj) {
	var imgObj = tdObj.firstElementChild;
	var src = imgObj.getAttribute('src');
	if(src =='images/empty.png'){
		return true;
	}else{
		return false;
	}
}


