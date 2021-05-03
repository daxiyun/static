// 李云滨
// v1.0 2016年12月30日
// https://www.liyunbin.com/post/9.html
// http://tool.css-js.com/ YUI compressor 压缩
// https://segmentfault.com/a/1190000004322487
var JSyb = {
    id: function(id) {
        return document.getElementById(id);
    },
    ajax: function() {
        var type = arguments[0].type || "POST";
        var url = arguments[0].url;
        var async = arguments[0].async || "true";
        var data = arguments[0].data || null;
        var contentType = arguments[0].contentType || "application/x-www-form-urlencoded";
        var callback = arguments[0].callback || function() {};
        var xhr = new XMLHttpRequest();
        if (type == "GET") {
            url = url + "?" + this.convert(data)
        }
        xhr.open(type, url, async);
        xhr.setRequestHeader("Content-Type", contentType);
        if (type == "POST") {
            xhr.send(this.convert(data))
        } else {
            xhr.send()
        }
        xhr.onload = function(e) {
            if (xhr.status >= 200 && xhr.status < 300) {
                callback(xhr.response)
            } else {
                callback(xhr.status)
            }
        }
    },
    convert: function(data) {
        if (typeof data === "object") {
            var result = "";
            for (var c in data) {
                result += c + "=" + encodeURIComponent(data[c]) + "&"
            }
            var nowTime = new Date().getTime();
            result = result.substring(0, result.length - 1) + "&_=" + nowTime;
            return result
        } else {
            return data
        }
    }
};
var $ = JSyb;