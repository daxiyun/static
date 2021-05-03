<?php
require_once 'sm.php';

$data = '无数万年来，修行者对凡人的欺凌与压迫从来不曾停歇过，景氏皇朝应该算是最好的时代，但依然无法解决这个问题，当然，凡人无力反抗，只要能够生存下去，表面上自然不敢对修行者有丝毫不敬，也不敢表露自己的敌意，但那些怒火并非不存在，而是藏在他们每个人的灵魂最深处，一旦修行者失去了自己的力量，这些怒火一定会爆发，成为一道拥有难以想象力量的洪流，摧毁你已经习惯的一切事物。';
$sm3 = sm3($data);
echo "SM3 字符串摘要<br>内容 <pre>$data</pre>结果 <pre>$sm3</pre>";

echo "SM3 文件摘要<br>内容 <img src='world-map.jpg' width='300px' /><pre>".sm3_file("world-map.jpg")."</pre>";

$key = "1234567890abcdef";
$encrypted_data = sm4($data, $key, "en");
$decrypted_data = sm4($encrypted_data, $key, "de");
echo "SM4 对称加密<br>内容 <pre>$data</pre>密码 <pre>$key</pre>结果 <pre>$encrypted_data</pre>解密 <pre>$decrypted_data</pre>";
