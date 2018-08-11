<?php
	$word = $_GET['word'];
	var request = new XMLHttpRequest(); 
	request.open("GET","dictionary.php"); 
	request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	var str="word="+url; 
	request.send(str);
?>