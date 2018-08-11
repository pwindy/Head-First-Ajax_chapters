<?php

$word = $_GET['word'];

//Check dictionary to see if this is a real word
include "dictionary.php";


if ($result == "-1") {
  // echo $result;
  return;
}

$vowels = array('a', 'e', 'i', 'o', 'u');

$score = 0;
for ($i=0; $i<strlen($word); $i++) {
  if (in_array($word[$i], $vowels))
    $score += 1;
  else
    $score += 2;
}

echo $score;

?>
