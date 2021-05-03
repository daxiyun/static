// 李云滨
// v2.0 2018年4月28日
// https://www.liyunbin.com/
// http://tool.css-js.com/ YUI compressor 压缩
// https://segmentfault.com/a/1190000004322487

var JSyb = {
    id:function(id) {
        return document.getElementById(id)
    },
    convert:function(obj, arr = [], idx = 0) {
        if (typeof obj === "object") {
            var result = Object.keys(obj).map(function (key) {
                return encodeURIComponent(key) + "=" + encodeURIComponent(obj[key])
            }).join("&")
            return result+"&_="+new Date().getTime()
        } else {
            return  alert("convert Object错误")
        }
    },
    fetch:function(url,method,options,callback) {
        if (arguments.length !== 4) return alert("fetch 参数错误")
        var initObj
        var searchStr = this.convert(options)
        if (method === "GET") {
            url += "?" + searchStr
            initObj = {
                method: "GET",
                credentials: "include", // 发送或接受cookie
            }
        }
        if (method === "POST") {
            initObj = {
                method: "POST",
                credentials: "include",
                headers: new Headers({
                    //"Accept": "application/json",
                    "Content-Type": "application/x-www-form-urlencoded"
                }),
                body: searchStr
            }
        }
        if (method === "FILE") {
            initObj = {
                method: "POST",
                credentials: "include",
                body: options
            }
        }
        fetch(url, initObj).then((data)=>{
            data.text().then((data)=>{
                callback(data)
            })
        })
    },
    css:function(path) {
        if (!path || path.length === 0) {
            return "CSS 文件不存在"
        }
        var head = document.getElementsByTagName("head")[0]
        var link = document.createElement("link")
        link.href = path
        link.rel = "stylesheet"
        link.type = "text/css"
        head.appendChild(link)
    },
    js:function(path) {
        if (!path || path.length === 0) {
            return "JS 文件不存在"
        }
        var head = document.getElementsByTagName("head")[0]
        var script = document.createElement("script")
        script.src = path
        script.type = "text/javascript"
        head.appendChild(script)
    },
}