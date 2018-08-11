addLoadEvent(initPage);
addLoadEvent(submitBtn);


var frequencyTable = new Array(
	"a", "a", "a", "a", "a", "a", "a", "a", "b", "c", "c", "c", "d", "d", "d",
	"e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "f", "f", "g",
	"g", "h", "h", "h", "h", "h", "h", "i", "i", "i", "i", "i", "i", "i", "j",
	"k", "l", "l", "l", "l", "m", "m", "n", "n", "n", "n", "n", "n", "o", "o",
	"o", "o", "o", "o", "o", "o", "p", "p", "q", "q", "q", "q", "q", "q", "r",
	"r", "r", "r", "r", "r", "s", "s", "s", "s", "s", "s", "s", "s", "t", "t",
	"t", "u", "u", "v", "v", "w", "x", "y","y", "z"
);

function initPage () {
	//显示单词面板
	showWords();
	
}
function showWords () {
	var letterbox = document.getElementById('letterbox');
	a_word = letterbox.getElementsByTagName('a');
	for(var i=0;i<a_word.length;i++) {
		var index = Math.floor( Math.random()*100 );
		var randomWord = frequencyTable[index];
		var classname0 = a_word[i].className.split(' ')[0];
		var classname1 = a_word[i].className.split(' ')[1];
		var newClassName = classname0 + ' ' + classname1 + ' l' + randomWord;
		a_word[i].className = newClassName;	
		a_word[i].onclick = clickWord;
	}
}

var currentWord = document.getElementById('currentWord');
var wordListBg = document.getElementById('wordListBg');
//点击单词事件
function clickWord () {
	var word = this.className.split(' ')[2].substr(1,1);
	
	if(currentWord.childNodes.length==0) {	
		var p = document.createElement('p');
		var text = document.createTextNode(word);
		p.appendChild(text);
		currentWord.appendChild(p);
	}else{
		currentWord.firstChild.firstChild.nodeValue += word;
	}

	//禁用已经点击的贴块
	this.className += ' disabled';
	//已经点击的贴块，点击事件为空
	this.onclick = '';
}

function submitBtn () {
	var submit_a = document.getElementById('submit').getElementsByTagName('a')[0];	
		submit_a.onclick = subFun;
}

function subFun () {
	if(currentWord.childNodes.length==0) {
		alert('请在左侧选择单词后，在点击提交按钮');
	}else{

		//更新左边单词区域
		showWords();

		//去掉点击按钮上面区域中的内容
		var cur_p = currentWord.firstChild;
		var cur_word = currentWord.firstChild.firstChild.nodeValue;
		currentWord.removeChild(cur_p);	

		//ajax
		var word_score = requestObject();
		if (word_score == null) {
			alert('不能获取ajax对象');
			return;
		}
		var url = "lookup-word.php?word=" + escape(cur_word);
		word_score.open('GET',url,true);
		word_score.onreadystatechange = function() {
			if(word_score.readyState==4 && word_score.status==200){
				var response = word_score.responseText;
				if(response=='-1'){
					alert('请输入合法单词');
				}else{
					//点击按钮上面区域中的内容 挪到 点击按钮下面区域
					var crt_p = document.createElement('p');
					crt_p.appendChild( document.createTextNode(cur_word) );
					var wordList = document.getElementById('wordList');
					wordList.appendChild(crt_p);

					//积分累加
					var response_score = Number( response.substring(7) );
					var score_div =  document.getElementById('score');
					var score = Number( score_div.firstChild.nodeValue.split(' ')[1] );
					score += response_score;
					score_div.firstChild.nodeValue = 'Score: ' + score;
				}
			}
		} 
		word_score.send(null);	
		
	}
	
}
