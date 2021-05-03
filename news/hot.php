<?php
date_default_timezone_set('PRC');
header("Content-type: text/html; charset=utf-8");
include 'function.php';
$html = '<html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
<meta name="referrer" content="no-referrer">
<title>热点新闻</title>
<style>
body{margin: 0;padding: 0;color: #333;background-color: #f7f7f7;}
a{color: #333;line-height: 35px;text-decoration: none;}
a:hover{color: #ff6e00;text-decoration: underline;}
#data{margin: auto;padding: 10px 45px;width: 1060px;background-color: #fcfcfc;}
ul{overflow: hidden;}
li{list-style-type: none;width: 340px;height: 35px;float: left;}
h3{margin: 35px 0;text-align: center;}
h3 a:hover{color: #ff6e00;background-color: #fcfcfc;}
center{height: 100px;line-height: 100px;}
small{display: inline-block;min-width: 20px;color: #aaa;}
small a{margin-left: 5px;color: #aaa;}
.sogou:hover, .zhihu:hover{opacity: 1;}
.sogou{display: inline-block;width: 14px;height: 14px;margin: 0 3px;opacity: 0.3;background-image:url("data:image/ico;base64,AAABAAEADg4AAAEAIABwAwAAFgAAACgAAAAOAAAAHAAAAAEAIAAAAAAASAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQZv0kDWL+igtg/tQKXf3xCFv+8QZY/tQFV/6LBVf9IgNU/lsCVP4mAAAAAAAAAAAWbf4DFGr+YBFo/eQQZv61DmT+YA5j/ToMYf47Cl7+YAha/rQGWP2GBFb+mAJT/tUDVf0mAAAAABhw/mAWbf7oFGv9XhNq/gYAAAAAAAAAAAAAAAAAAAAAC1/+BQld/QgIXP4NBVf+lwVX/VgbdP4kGnP+5Bhx/l8Wbv0YFWz9XhNq/Y8SaP2sEGb9rA5k/ZINYf1PC1/9Bwpe/QkIW/2KB1r9Ih55/oscd/61GnP+CBly/tEYcP7kFm7+yhRs/bETav7CEWf+9g9l/v8OYv2fDGH+Bgpe/rUJXP2LIX3/1R96/mAAAAAAHHb+KBpz/hwYcf4CAAAAABZu/iUUa/7REmj+/xBm/e4PZP4IDWL+YAtg/dQkgf7xIX3+OgAAAAAAAAAAHHf+Ixt1/n0ac/7EGHH+7BZu/v4VbP3+E2r9kgAAAAAQZv07DmP98SeE//EjgP46AAAAACF9/mYge//5Hnn//x13/vYbdP/eGXL+oRdw/kEVbf0BAAAAABNq/joRZ/3xKYj/1SeF/2AAAAAAJIH+0CN///8hff/lHnn+Rxx3/gobdf4CGnP+Gxhw/hYAAAAAFW3+YBNq/dQri/+LKon/tSeF/wYnhP6EJYL//SSA//chff7BIHv+rh55/scdd//jG3X+nRpz/gYYcP61F2/+iiyL/iUtjf7mKon+XyeF/gUnhf5CJoT+jCSB/qsjf/6pIX3+kB97/l0deP4UHHb+Xhp0/uQadP4jAAAAAC6O/2Iujv/pK4r+XyiG/wYAAAAAAAAAAAAAAAAAAAAAIX3+BiB7/l8fev/oHXj+YAAAAAAAAAAALIz/Ay6P/2Mvj/7lLY3/tSqK/2Aohv47JoP/OiWD/2Akgv61I4D+5CF9/mAeef4DAAAAAAAAAAAAAAAAAAAAAC2N/iQvj/6LLo/+1SyM/vEriv7xKYj+1CeE/ooif/4kAAAAAAAAAAAAAAAA4AQAAIAAAACHgAAAAAAAAAAAAAAiAAAAMBAAACAQAAAgEAAAAAAAAAAAAACHhAAAgAQAAOAcAAA=");}
.zhihu{display: inline-block;width: 14px;height: 14px;margin: 0 3px;opacity: 0.3;background-image:url("data:image/ico;base64,AAABAAEADg4AAAEAIABwAwAAFgAAACgAAAAOAAAAHAAAAAEAIAAAAAAASAMAAAAAAAAAAAAAAAAAAAAAAADphgvR64gO/+uIDv/qhw3+64gO/+uIDv/qhw3+64gO/+uIDv/riA7/6ocN/uuIDv/riA7/6YYL0euIDv/rixb/76BB/+yPHv7riA7/64gO/+qHDf7riA7/64kR/+uJEP/qhw3+64gO/+uIDv/qhw3+64gO/+uKFP/1xZD/+d/D/uuNG//riA7/76NN/uuIDv/unj3/9s6i/+yRJP7riA7/64gO/+qHDf7qhw3+6ocN/uuKFP743cD+87p4/u+jSv7538f+7Zcx/v338P720Kj+++za/v306v7vo0b+6ocN/uuIDv/riA7/64gO/++iR/7769r/+uHJ/++jSf7tmDP/+uHC/+uIDv/qhw3+99Kk//ClSv/qhw3+64gO/+uIDv/riA7/64wX/vrk0P/wqVf/64gP/u2YM//64cL/64gO/+qHDf730qT/8KVK/+qHDf7qhw3+640a/vK2bP7zvHr+++nY/vbKlP7zu3f+8K1e/vnhwv7qhw3+6ocN/vfSpP7vpUr+6ocN/uuIDv/riBD/8bBg//O8d/765Mr/9s6e//O8d/7wqFX/+uHC/+uIDv/qhw3+99Kk//ClSv/qhw3+64gO/+uMGv/voET/64gQ/vbOnf/xrF7/6ocN/u2YM//64cL/64gO/+qHDf730qT/8KVK/+qHDf7riA7/64kS//jYtv/vokr+9suZ//GwZv/qiBD+7Zgz//rhwv/riA7/6ocN/vfSpP/wpUr/6ocN/uqHDf7qhw3+8bFn/v338P799On+/PLm/vzv4P7vpFL+/fXs/vzw4P788OD+/fTq/u+jRv7qhw3+64gO/+uIDv/skCL/+Ny//uuKFP/riA7/6ocN/uuIDv/riA7/64gO/+qHDf7riA7/64gO/+qHDf7riA7/64gO/+uIDv/tlSz+64sW/+uIDv/qhw3+64gO/+uIDv/riA7/6ocN/uuIDv/riA7/6ocN/umGC9Hqhw3+6ocN/uqHDf7qhw3+6ocN/uqHDf7qhw3+6ocN/uqHDf7qhw3+6ocN/uqHDf7phgvRAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=");}
</style>
</head><body><div id="data">'.PHP_EOL;
$html .= '<h3><a target="_blank" href="https://www.baidu.com/">百度 · 实时热点</a></h3><ul>'.PHP_EOL;
$data = http_get("http://top.baidu.com/buzz?b=1&c=513&fr=topbuzz_b42_c513");
$data = iconv('gb18030', 'utf-8//IGNORE', $data);
$data = getSubstr($data, '<tbody>', '</tbody>');
preg_match_all('/<a class="list-title" target="_blank" href="(.*)">(.*)<\/a>/' , $data , $matches);
for ($x=0; $x<50; $x++) {
    $str = $matches[2][$x];
    if ($str) {
        $html .= '<li><a target="_blank" href="https://www.sogou.com/sogou?ie=utf8&interation=1728053249&query='.urlencode($str).'">'.$str.'</a><a target="_blank" href="https://www.sogou.com/web?ie=utf8&query='.urlencode($str).'+site%3Awww.zhihu.com"><span class="zhihu"></span></a></li>'.PHP_EOL;
    }
}

$html .= '</ul><h3><a target="_blank" href="https://s.weibo.com/top/summary?cate=realtimehot">新浪微博 · 热搜榜</a></h3><ul>'.PHP_EOL;
$data = http_get("https://s.weibo.com/top/summary?cate=realtimehot");
$data = getSubstr($data, '<tbody>', '</tbody>');
preg_match_all('/weibo\?q=(.*)&Refer/' , $data , $matches);
for ($x=0; $x<50; $x++) {
    $str = urldecode($matches[1][$x]);
    $str = str_replace("#","",$str);
    $str = str_replace("&topic_ad=1","",$str);
    if ($str) {
        $html .= '<li><a target="_blank" href="https://s.weibo.com/weibo?q='.urlencode($str).'&Refer=top" title="使用 新浪微博 搜索">'.$str.'</a><a target="_blank" href="https://www.sogou.com/sogou?ie=utf8&interation=1728053249&query='.urlencode($str).'"><span class="sogou"></span></a><a target="_blank" href="https://www.sogou.com/web?ie=utf8&query='.urlencode($str).'+site%3Awww.zhihu.com"><span class="zhihu"></span></a></li>'.PHP_EOL;
    }
}

$html .= '</ul><h3><a target="_blank" href="https://www.zhihu.com/topsearch">知乎 · 热搜</a></h3><ul>'.PHP_EOL;
$data = http_get("https://www.zhihu.com/topsearch");
if (strstr($data, 'TopSearch-itemTitle') === false) {
    $key = "TopSearchMain-title";
} else {
    $key = "TopSearch-itemTitle";
}
preg_match_all('/<div class="'.$key.'">(.*)<\/div>/iU' , $data , $matches);
for ($x=0; $x<30; $x++) {
    $str = urldecode($matches[1][$x]);
    if ($str) {
        $html .= '<li><a target="_blank" href="https://www.zhihu.com/search?q='.$str.'&utm_content=search_hot&type=content" title="使用 知乎 搜索">'.$str.'</a><a target="_blank" href="https://www.sogou.com/sogou?ie=utf8&interation=1728053249&query='.$str.'"><span class="sogou"></span></a></li>'.PHP_EOL;
    }
}

/*
$html .= '</ul><h3><a target="_blank" href="https://www.sogou.com/">搜狗 · 今日热词</a></h3><ul>'.PHP_EOL;
$data = http_get("https://www.sogou.com/suggnew/hotwords");
$data = iconv('gb18030', 'utf-8//IGNORE', $data);
$matches = getSubstr($data, 'var sogou_top_words=[\"', '\"]');
$matches = explode('","',$matches);
for ($x=0; $x<10; $x++) {
    $str = urldecode($matches[$x]);
    if ($str) {
        $html .= '<li><a target="_blank" href="https://www.sogou.com/sogou?ie=utf8&interation=1728053249&query='.urlencode($str).'">'.$str.'</a><a target="_blank" href="https://www.zhihu.com/search?type=content&q='.urlencode($str).'"><span class="zhihu"></span></a></li>'.PHP_EOL;
    }
}
*/

$html .= '</ul><center><small>五分钟更新一次，最后更新时间：'.date('Y-m-d H:i:s').'</small></center></div></body></html>';

file_put_contents('../index.html', $html);

echo date('Y-m-d H:i:s');