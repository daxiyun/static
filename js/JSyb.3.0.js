// 夏仁南
// v3.0 2021年5月3日
// https://www.liyunbin.com/
// https://www.css-js.com/ YUI compressor 压缩
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
    sm3:function(data, method = 64) {
        /*
         * JavaScript SM3
         * https://github.com/jiaxingzheng/JavaScript-SM3
         *
         * Copyright 2017, Zheng Jiaxing
         *
         * Licensed under the MIT license:
         * http://www.opensource.org/licenses/MIT
         *
         * Refer to
         * http://www.oscca.gov.cn/UpFile/20101222141857786.pdf
         */

        // 左补0到指定长度
        function leftPad(str, totalLength) {
          var len = str.length;
          return Array(totalLength > len ? totalLength - len + 1 : 0).join(0) + str;
        }

        // 二进制转化为十六进制
        function binary2hex(binary) {
          var binaryLength = 8;
          var hex = '';
          for (var i = 0; i < binary.length / binaryLength; i += 1) {
            hex += leftPad(parseInt(binary.substr(i * binaryLength, binaryLength), 2).toString(16), 2);
          }
          return hex;
        }

        // 十六进制转化为二进制
        function hex2binary(hex) {
          var hexLength = 2;
          var binary = '';
          for (var i = 0; i < hex.length / hexLength; i += 1) {
            binary += leftPad(parseInt(hex.substr(i * hexLength, hexLength), 16).toString(2), 8);
          }
          return binary;
        }

        // utf16码点值转化为utf8二进制
        function utf16CodePoint2utf8Binary(ch) {
          var utf8Arr = [];
          var codePoint = ch.codePointAt(0);

          if (codePoint >= 0x00 && codePoint <= 0x7f) {
            utf8Arr.push(codePoint);
          } else if (codePoint >= 0x80 && codePoint <= 0x7ff) {
            utf8Arr.push(192 | 31 & codePoint >> 6);
            utf8Arr.push(128 | 63 & codePoint);
          } else if (codePoint >= 0x800 && codePoint <= 0xd7ff || codePoint >= 0xe000 && codePoint <= 0xffff) {
            utf8Arr.push(224 | 15 & codePoint >> 12);
            utf8Arr.push(128 | 63 & codePoint >> 6);
            utf8Arr.push(128 | 63 & codePoint);
          } else if (codePoint >= 0x10000 && codePoint <= 0x10ffff) {
            utf8Arr.push(240 | 7 & codePoint >> 18);
            utf8Arr.push(128 | 63 & codePoint >> 12);
            utf8Arr.push(128 | 63 & codePoint >> 6);
            utf8Arr.push(128 | 63 & codePoint);
          }

          var binary = '';
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = utf8Arr[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var utf8Code = _step.value;

              var b = utf8Code.toString(2);
              binary += leftPad(b, Math.ceil(b.length / 8) * 8);
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          return binary;
        }

        // 普通字符串转化为二进制
        function str2binary(str) {
          var binary = '';
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = str[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var ch = _step2.value;

              binary += utf16CodePoint2utf8Binary(ch);
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }

          return binary;
        }

        // 循环左移
        function rol(str, n) {
          return str.substring(n % str.length) + str.substr(0, n % str.length);
        }

        // 二进制运算
        function binaryCal(x, y, method) {
          var a = x || '';
          var b = y || '';
          var result = [];
          var prevResult = void 0;
          // for (let i = 0; i < a.length; i += 1) { // 小端
          for (var i = a.length - 1; i >= 0; i -= 1) {
            // 大端
            prevResult = method(a[i], b[i], prevResult);
            result[i] = prevResult[0];
          }
          // console.log(`x     :${x}\ny     :${y}\nresult:${result.join('')}\n`);
          return result.join('');
        }

        // 二进制异或运算
        function xor(x, y) {
          return binaryCal(x, y, function (a, b) {
            return [a === b ? '0' : '1'];
          });
        }

        // 二进制与运算
        function and(x, y) {
          return binaryCal(x, y, function (a, b) {
            return [a === '1' && b === '1' ? '1' : '0'];
          });
        }

        // 二进制或运算
        function or(x, y) {
          return binaryCal(x, y, function (a, b) {
            return [a === '1' || b === '1' ? '1' : '0'];
          }); // a === '0' && b === '0' ? '0' : '1'
        }

        // 二进制与运算
        function add(x, y) {
          var result = binaryCal(x, y, function (a, b, prevResult) {
            var carry = prevResult ? prevResult[1] : '0' || '0';
            if (a !== b) return [carry === '0' ? '1' : '0', carry]; // a,b不等时,carry不变，结果与carry相反
            // a,b相等时，结果等于原carry，新carry等于a
            return [carry, a];
          });
          // console.log('x: ' + x + '\ny: ' + y + '\n=  ' + result + '\n');
          return result;
        }

        // 二进制非运算
        function not(x) {
          return binaryCal(x, undefined, function (a) {
            return [a === '1' ? '0' : '1'];
          });
        }

        function calMulti(method) {
          return function () {
            for (var _len = arguments.length, arr = Array(_len), _key = 0; _key < _len; _key++) {
              arr[_key] = arguments[_key];
            }

            return arr.reduce(function (prev, curr) {
              return method(prev, curr);
            });
          };
        }

        // function xorMulti(...arr) {
        //   return arr.reduce((prev, curr) => xor(prev, curr));
        // }

        // 压缩函数中的置换函数 P1(X) = X xor (X <<< 9) xor (X <<< 17)
        function P0(X) {
          return calMulti(xor)(X, rol(X, 9), rol(X, 17));
        }

        // 消息扩展中的置换函数 P1(X) = X xor (X <<< 15) xor (X <<< 23)
        function P1(X) {
          return calMulti(xor)(X, rol(X, 15), rol(X, 23));
        }

        // 布尔函数，随j的变化取不同的表达式
        function FF(X, Y, Z, j) {
          return j >= 0 && j <= 15 ? calMulti(xor)(X, Y, Z) : calMulti(or)(and(X, Y), and(X, Z), and(Y, Z));
        }

        // 布尔函数，随j的变化取不同的表达式
        function GG(X, Y, Z, j) {
          return j >= 0 && j <= 15 ? calMulti(xor)(X, Y, Z) : or(and(X, Y), and(not(X), Z));
        }

        // 常量，随j的变化取不同的值
        function T(j) {
          return j >= 0 && j <= 15 ? hex2binary('79cc4519') : hex2binary('7a879d8a');
        }

        // 压缩函数
        function CF(V, Bi) {
          // 消息扩展
          var wordLength = 32;
          var W = [];
          var M = []; // W'

          // 将消息分组B划分为16个字W0， W1，…… ，W15 （字为长度为32的比特串）
          for (var i = 0; i < 16; i += 1) {
            W.push(Bi.substr(i * wordLength, wordLength));
          }

          // W[j] <- P1(W[j−16] xor W[j−9] xor (W[j−3] <<< 15)) xor (W[j−13] <<< 7) xor W[j−6]
          for (var j = 16; j < 68; j += 1) {
            W.push(calMulti(xor)(P1(calMulti(xor)(W[j - 16], W[j - 9], rol(W[j - 3], 15))), rol(W[j - 13], 7), W[j - 6]));
          }

          // W′[j] = W[j] xor W[j+4]
          for (var _j = 0; _j < 64; _j += 1) {
            M.push(xor(W[_j], W[_j + 4]));
          }

          // 压缩
          var wordRegister = []; // 字寄存器
          for (var _j2 = 0; _j2 < 8; _j2 += 1) {
            wordRegister.push(V.substr(_j2 * wordLength, wordLength));
          }

          var A = wordRegister[0];
          var B = wordRegister[1];
          var C = wordRegister[2];
          var D = wordRegister[3];
          var E = wordRegister[4];
          var F = wordRegister[5];
          var G = wordRegister[6];
          var H = wordRegister[7];

          // 中间变量
          var SS1 = void 0;
          var SS2 = void 0;
          var TT1 = void 0;
          var TT2 = void 0;
          for (var _j3 = 0; _j3 < 64; _j3 += 1) {
            SS1 = rol(calMulti(add)(rol(A, 12), E, rol(T(_j3), _j3)), 7);
            SS2 = xor(SS1, rol(A, 12));

            TT1 = calMulti(add)(FF(A, B, C, _j3), D, SS2, M[_j3]);
            TT2 = calMulti(add)(GG(E, F, G, _j3), H, SS1, W[_j3]);

            D = C;
            C = rol(B, 9);
            B = A;
            A = TT1;
            H = G;
            G = rol(F, 19);
            F = E;
            E = P0(TT2);
          }

          return xor(Array(A, B, C, D, E, F, G, H).join(''), V);
        }

        // sm3 hash算法 http://www.oscca.gov.cn/News/201012/News_1199.htm
        //function sm3(str) {
          var binary = str2binary(data);
          // 填充
          var len = binary.length;
          // k是满足len + 1 + k = 448mod512的最小的非负整数
          var k = len % 512;
          // 如果 448 <= (512 % len) < 512，需要多补充 (len % 448) 比特'0'以满足总比特长度为512的倍数
          k = k >= 448 ? 512 - k % 448 - 1 : 448 - k - 1;
          var m = (binary + '1' + leftPad('', k) + leftPad(len.toString(2), 64)).toString(); // k个0

          // 迭代压缩
          var n = (len + k + 65) / 512;

          var V = hex2binary('7380166f4914b2b9172442d7da8a0600a96f30bc163138aae38dee4db0fb0e4e');
          for (var i = 0; i <= n - 1; i += 1) {
            var B = m.substr(512 * i, 512);
            V = CF(V, B);
          }
          
          if (method === 16) return binary2hex(V).slice(0, 16);
          if (method === 32) return binary2hex(V).slice(0, 32);
          if (method === 64) return binary2hex(V);
        //}

        //module.exports = sm3;
    },
    sm4:function(method, key, data) {
        /*
         * sm4-1.0.js
         *
         * https://github.com/yunlongn/SM3-SM4-js
         *
         * Copyright (c) 2019 RuXing Liang
         * @name sm4-1.0.js
         * @author RuXing Liang
         * @version 1.0.0 (2019-04-19)
         */
        function SM4Util() {
            this.secretKey = "1234567890abcdef";
            this.iv = "";
            this.hexString = false;

            this.decryptData_ECB = function(data) {
                var byteEcb = hexToBytes(data)
                // 字符串转换成byte
                var key = this.stringToByte(this.secretKey);
                var sm4 = new SM4();
                // 进行sm
                var plain = sm4.decrypt_ecb(key, byteEcb);
                // console.log(plain)
                // 这里可以不转字符串可以转16进制 方法为Hex.encode
                return Hex.bytesToUtf8Str(plain);
            }

            // 返回字符串
            this.encryptData_ECB = function(data) {

                // 可能会出问题的地方 这里没有进行编码
                var inputBytes = this.stringToByte(data);

                var key = this.stringToByte(this.secretKey);
                var sm4 = new SM4();
                var cipher = sm4.encrypt_ecb(key, inputBytes);
                // byte流转16进制字符串。
                var cipherText = bytesToHex(cipher);
                return cipherText;
            }

            // 返回字符串
            this.decryptData_CBC = function(data) {
                var inputBytes = hexToBytes(data);
                var key = this.stringToByte(this.secretKey);
                var iv = this.stringToByte(this.iv);
                var sm4 = new SM4();
                var plain = sm4.decrypt_cbc(key, iv, inputBytes);
                // 这里可以不转字符串可以转16进制 方法为Hex.encode
                return Hex.bytesToUtf8Str(plain);
            }

            // 返回字符串
            this.encryptData_CBC = function(data) {
                var inputBytes = this.stringToByte(data);
                var key = this.stringToByte(this.secretKey);
                var iv = this.stringToByte(this.iv);
                var sm4 = new SM4();
                var cipher = sm4.encrypt_cbc(key, iv, inputBytes);
                // byte流转16进制字符串。
                var cipherText = bytesToHex(cipher);
                return cipherText;
            }

            this.stringToByte = function(str) {
                var bytes = new Array();
                var len, c;
                len = str.length;
                for (var i = 0; i < len; i++) {
                    c = str.charCodeAt(i);
                    if (c >= 0x010000 && c <= 0x10FFFF) {
                        bytes.push(((c >> 18) & 0x07) | 0xF0);
                        bytes.push(((c >> 12) & 0x3F) | 0x80);
                        bytes.push(((c >> 6) & 0x3F) | 0x80);
                        bytes.push((c & 0x3F) | 0x80);
                    } else if (c >= 0x000800 && c <= 0x00FFFF) {
                        bytes.push(((c >> 12) & 0x0F) | 0xE0);
                        bytes.push(((c >> 6) & 0x3F) | 0x80);
                        bytes.push((c & 0x3F) | 0x80);
                    } else if (c >= 0x000080 && c <= 0x0007FF) {
                        bytes.push(((c >> 6) & 0x1F) | 0xC0);
                        bytes.push((c & 0x3F) | 0x80);
                    } else {
                        bytes.push(c & 0xFF);
                    }
                }
                return bytes;
            }

        }
        function SM4() {

            this.sbox = new Array(0xd6, 0x90, 0xe9, 0xfe, 0xcc, 0xe1, 0x3d, 0xb7, 0x16, 0xb6, 0x14, 0xc2, 0x28, 0xfb, 0x2c, 0x05, 0x2b, 0x67, 0x9a, 0x76, 0x2a, 0xbe, 0x04, 0xc3, 0xaa, 0x44, 0x13, 0x26, 0x49, 0x86, 0x06, 0x99, 0x9c, 0x42, 0x50, 0xf4, 0x91, 0xef, 0x98, 0x7a, 0x33, 0x54, 0x0b, 0x43, 0xed, 0xcf, 0xac, 0x62, 0xe4, 0xb3, 0x1c, 0xa9, 0xc9, 0x08, 0xe8, 0x95, 0x80, 0xdf, 0x94, 0xfa, 0x75, 0x8f, 0x3f, 0xa6, 0x47, 0x07, 0xa7, 0xfc, 0xf3, 0x73, 0x17, 0xba, 0x83, 0x59, 0x3c, 0x19, 0xe6, 0x85, 0x4f, 0xa8, 0x68, 0x6b, 0x81, 0xb2, 0x71, 0x64, 0xda, 0x8b, 0xf8, 0xeb, 0x0f, 0x4b, 0x70, 0x56, 0x9d, 0x35, 0x1e, 0x24, 0x0e, 0x5e, 0x63, 0x58, 0xd1, 0xa2, 0x25, 0x22, 0x7c, 0x3b, 0x01, 0x21, 0x78, 0x87, 0xd4, 0x00, 0x46, 0x57, 0x9f, 0xd3, 0x27, 0x52, 0x4c, 0x36, 0x02, 0xe7, 0xa0, 0xc4, 0xc8, 0x9e, 0xea, 0xbf, 0x8a, 0xd2, 0x40, 0xc7, 0x38, 0xb5, 0xa3, 0xf7, 0xf2, 0xce, 0xf9, 0x61, 0x15, 0xa1, 0xe0, 0xae, 0x5d, 0xa4, 0x9b, 0x34, 0x1a, 0x55, 0xad, 0x93, 0x32, 0x30, 0xf5, 0x8c, 0xb1, 0xe3, 0x1d, 0xf6, 0xe2, 0x2e, 0x82, 0x66, 0xca, 0x60, 0xc0, 0x29, 0x23, 0xab, 0x0d, 0x53, 0x4e, 0x6f, 0xd5, 0xdb, 0x37, 0x45, 0xde, 0xfd, 0x8e, 0x2f, 0x03, 0xff, 0x6a, 0x72, 0x6d, 0x6c, 0x5b, 0x51, 0x8d, 0x1b, 0xaf, 0x92, 0xbb, 0xdd, 0xbc, 0x7f, 0x11, 0xd9, 0x5c, 0x41, 0x1f, 0x10, 0x5a, 0xd8, 0x0a, 0xc1, 0x31, 0x88, 0xa5, 0xcd, 0x7b, 0xbd, 0x2d, 0x74, 0xd0, 0x12, 0xb8, 0xe5, 0xb4, 0xb0, 0x89, 0x69, 0x97, 0x4a, 0x0c, 0x96, 0x77, 0x7e, 0x65, 0xb9, 0xf1, 0x09, 0xc5, 0x6e, 0xc6, 0x84, 0x18, 0xf0, 0x7d, 0xec, 0x3a, 0xdc, 0x4d, 0x20, 0x79, 0xee, 0x5f, 0x3e, 0xd7, 0xcb, 0x39, 0x48);

            this.fk = new Array(0xa3b1bac6, 0x56aa3350, 0x677d9197, 0xb27022dc);
            this.ck = new Array(0x00070e15, 0x1c232a31, 0x383f464d, 0x545b6269, 0x70777e85, 0x8c939aa1, 0xa8afb6bd, 0xc4cbd2d9, 0xe0e7eef5, 0xfc030a11, 0x181f262d, 0x343b4249, 0x50575e65, 0x6c737a81, 0x888f969d, 0xa4abb2b9, 0xc0c7ced5, 0xdce3eaf1, 0xf8ff060d, 0x141b2229, 0x30373e45, 0x4c535a61, 0x686f767d, 0x848b9299, 0xa0a7aeb5, 0xbcc3cad1, 0xd8dfe6ed, 0xf4fb0209, 0x10171e25, 0x2c333a41, 0x484f565d, 0x646b7279);
        }

        SM4.prototype = {
            expandKey: function(key) {
                var k = new Array(36);
                var mk = byteArrayToIntArray(key);
                k[0] = mk[0] ^ this.fk[0];
                k[1] = mk[1] ^ this.fk[1];
                k[2] = mk[2] ^ this.fk[2];
                k[3] = mk[3] ^ this.fk[3];
                var rk = new Array(32);
                for (var i = 0; i < 32; i++) {
                    k[(i + 4)] = (k[i] ^ this.T1(k[(i + 1)] ^ k[(i + 2)] ^ k[(i + 3)] ^ this.ck[i]));
                    rk[i] = k[(i + 4)];
                }
                return rk;
            },
            T1: function(ta) {
                var rk = 0;
                var b = new Array(4);
                var a = intToByte(ta);
                b[0] = this.sbox[a[0] & 0xFF];
                b[1] = this.sbox[a[1] & 0xFF];
                b[2] = this.sbox[a[2] & 0xFF];
                b[3] = this.sbox[a[3] & 0xFF];
                var bint = byteToInt(b, 0);
                var rk = bint ^ (bint << 13 | (bint >>> (32 - 13))) ^ (bint << 23 | (bint >>> (32 - 23)));
                return rk;
            },
            one_encrypt: function(rk, data) {
                var x = new Array(36);
                x[0] = byteToInt(data, 0);
                x[1] = byteToInt(data, 4);
                x[2] = byteToInt(data, 8);
                x[3] = byteToInt(data, 12);
                for (var i = 0; i < 32; i++) {
                    x[(i + 4)] = x[i] ^ this.T0(x[(i + 1)] ^ x[(i + 2)] ^ x[(i + 3)] ^ rk[i]);
                }
                var tmpx = new Array(4);
                for (var i = 35; i >= 32; i--) {
                    tmpx[35 - i] = x[i];
                }
                var xbyte = intArrayToByteArray(tmpx);

                return xbyte;
            },
            T0: function(ta) {
                var a = intToByte(ta);
                var b = new Array(4);
                b[0] = this.sbox[a[0] & 0xFF];
                b[1] = this.sbox[a[1] & 0xFF];
                b[2] = this.sbox[a[2] & 0xFF];
                b[3] = this.sbox[a[3] & 0xFF];
                var bint = byteToInt(b, 0);
                var c = bint ^ (bint << 2 | (bint >>> (32 - 2))) ^ (bint << 10 | (bint >>> (32 - 10))) ^ (bint << 18 | (bint >>> (32 - 18))) ^ (bint << 24 | (bint >>> (32 - 24)));
                return c;
            },
            pkcs7padding: function(input, mode) {
                if (input == null) {
                    return null;
                }

                var ret = null;
                if (mode == 1) //填充
                {
                    var p = 16 - input.length % 16;
                    ret = new Array(input.length + p);
                    arrayCopy(input, 0, ret, 0, input.length);
                    for (var i = 0; i < p; i++) {
                        ret[input.length + i] = p;
                    }
                } else //去除填充
                {
                    var p = input[input.length - 1];
                    ret = new Array(input.length - p);
                    arrayCopy(input, 0, ret, 0, input.length - p);
                }
                return ret;
            },
            encrypt_ecb: function(key, data) {
                if (key == undefined || key == null || key.length % 16 != 0) {
                    console.log("sm4 key is error!");
                    return null;
                }
                if (data == undefined || data == null || data.length <= 0) {
                    console.log("data is error!");
                    return null;
                }
                var rk = this.expandKey(key);
                /*if(debug){
                    var rkb = intArrayToByteArray(rk);
                    console.log(Hex.encode(rkb,0,rkb.length));
                }*/

                var blockLen = 16;
                var loop = parseInt(data.length / blockLen); //注意不能整除会有小数，要取整
                var cipher = new Array((loop + 1) * blockLen);
                var tmp = new Array(blockLen);
                var oneCipher = null;

                for (var i = 0; i < loop; i++) {
                    arrayCopy(data, i * blockLen, tmp, 0, blockLen);
                    oneCipher = this.one_encrypt(rk, tmp);
                    arrayCopy(oneCipher, 0, cipher, i * blockLen, blockLen);
                }

                var lessData = new Array(data.length % blockLen);
                if (lessData.length > 0) {
                    arrayCopy(data, loop * blockLen, lessData, 0, data.length % blockLen);
                }
                var padding = this.pkcs7padding(lessData, 1);
                oneCipher = this.one_encrypt(rk, padding);
                arrayCopy(oneCipher, 0, cipher, loop * blockLen, blockLen);

                return cipher;
            },
            decrypt_ecb: function(key, data) {
                if (key == undefined || key == null || key.length % 16 != 0) {
                    console.log("sm4 key is error!");
                    return null;
                }
                if (data == undefined || data == null || data.length % 16 != 0) {
                    console.log("data is error!");
                    return null;
                }
                var rk = this.expandKey(key);
                var nrk = new Array(32);
                for (var i = 0; i < rk.length; i++) {
                    nrk[i] = rk[32 - i - 1];
                }
                /*if(debug){
                    var rkb = intArrayToByteArray(rk);
                    console.log(Hex.encode(rkb,0,rkb.length));
                }*/
                var blockLen = 16;
                var loop = data.length / blockLen - 1;
                var tmp = new Array(blockLen);
                var onePlain = null;
                var plain = null;
                //先解密最后一部分，确定数据长度
                arrayCopy(data, loop * blockLen, tmp, 0, blockLen);
                onePlain = this.one_encrypt(nrk, tmp);
                var lastPart = this.pkcs7padding(onePlain, 0);

                plain = new Array(loop * blockLen + lastPart.length);
                arrayCopy(lastPart, 0, plain, loop * blockLen, lastPart.length);

                //解密剩下部分数据
                for (var i = 0; i < loop; i++) {
                    arrayCopy(data, i * blockLen, tmp, 0, blockLen);
                    onePlain = this.one_encrypt(nrk, tmp);
                    arrayCopy(onePlain, 0, plain, i * blockLen, blockLen);
                }

                return plain;
            },
            encrypt_cbc: function(key, iv, data) {
                if (key == undefined || key == null || key.length % 16 != 0) {
                    console.log("sm4 key is error!");
                    return null;
                }
                if (data == undefined || data == null || data.length <= 0) {
                    console.log("data is error!");
                    return null;
                }
                if (iv == undefined || iv == null || iv.length % 16 != 0) {
                    console.log("iv is error!");
                    return null;
                }
                var rk = this.expandKey(key);
                /*if(debug){
                    var rkb = intArrayToByteArray(rk);
                    console.log(Hex.encode(rkb,0,rkb.length));
                }*/

                var blockLen = 16;
                var loop = parseInt(data.length / blockLen); //注意不能整除会有小数，要取整
                var cipher = new Array((loop + 1) * blockLen);
                var tmp = new Array(blockLen);
                var oneCipher = null;

                for (var i = 0; i < loop; i++) {
                    arrayCopy(data, i * blockLen, tmp, 0, blockLen);
                    for (var j = 0; j < blockLen; j++) {
                        tmp[j] = tmp[j] ^ iv[j];
                    }
                    iv = this.one_encrypt(rk, tmp);
                    arrayCopy(iv, 0, cipher, i * blockLen, blockLen);
                }

                var lessData = new Array(data.length % blockLen);
                if (lessData.length > 0) {
                    arrayCopy(data, loop * blockLen, lessData, 0, data.length % blockLen);
                }
                var padding = this.pkcs7padding(lessData, 1);
                for (var i = 0; i < blockLen; i++) {
                    padding[i] = padding[i] ^ iv[i];
                }
                iv = this.one_encrypt(rk, padding);
                arrayCopy(iv, 0, cipher, loop * blockLen, blockLen);

                return cipher;
            },
            decrypt_cbc: function(key, iv, data) {
                if (key == undefined || key == null || key.length % 16 != 0) {
                    console.log("sm4 key is error!");
                    return null;
                }
                if (data == undefined || data == null || data.length % 16 != 0) {
                    console.log("data is error!");
                    return null;
                }
                if (iv == undefined || iv == null || iv.length % 16 != 0) {
                    console.log("iv is error!");
                    return null;
                }
                var rk = this.expandKey(key);
                var nrk = new Array(32);
                for (var i = 0; i < rk.length; i++) {
                    nrk[i] = rk[32 - i - 1];
                }
                /*if(debug){
                    var rkb = intArrayToByteArray(rk);
                    console.log(Hex.encode(rkb,0,rkb.length));
                }*/
                var blockLen = 16;
                var loop = data.length / blockLen;
                var tmp = new Array(blockLen);
                var onePlain = null;
                var plain = null;

                //解密
                plain = new Array(data.length);
                for (var i = 0; i < loop; i++) {
                    arrayCopy(data, i * blockLen, tmp, 0, blockLen);
                    onePlain = this.one_encrypt(nrk, tmp);
                    for (var j = 0; j < blockLen; j++) {
                        onePlain[j] = onePlain[j] ^ iv[j];
                    }
                    arrayCopy(tmp, 0, iv, 0, blockLen);
                    arrayCopy(onePlain, 0, plain, i * blockLen, blockLen);
                }

                //去填充，确定数据长度
                //arrayCopy(data,data.length-blockLen,tmp,0,blockLen);
                var lastPart = this.pkcs7padding(onePlain, 0);

                var realPlain = new Array(plain.length - blockLen + lastPart.length);
                arrayCopy(plain, 0, realPlain, 0, plain.length - blockLen);
                arrayCopy(lastPart, 0, realPlain, plain.length - blockLen, lastPart.length);

                //先解密最后一部分，确定数据长度
                /*arrayCopy(data,loop*blockLen,tmp,0,blockLen);
                onePlain = this.one_encrypt(nrk,tmp);
                for(var i = 0;i<blockLen;i++){
                    onePlain[i] = onePlain[i] ^ iv[i];
                }
                var lastPart = this.pkcs7padding(onePlain,0);
                plain = new Array(loop*blockLen+lastPart.length);
                arrayCopy(lastPart,0,plain,loop*blockLen,lastPart.length);
                //解密剩下部分数据
                for(var i = 0;i<loop;i++){
                    arrayCopy(data,i*blockLen,tmp,0,blockLen);
                    onePlain = this.one_encrypt(nrk,tmp);
                    arrayCopy(onePlain,0,plain,i*blockLen,blockLen);
                }*/

                return realPlain;
            }
        }
        function Hex() {

        }

        Hex.encode = function(b, pos, len) {
            var hexCh = new Array(len * 2);
            var hexCode = new Array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F');

            for (var i = pos,
            j = 0; i < len + pos; i++, j++) {
                hexCh[j] = hexCode[(b[i] & 0xFF) >> 4];
                hexCh[++j] = hexCode[(b[i] & 0x0F)];
            }

            return hexCh.join('');
        }

        Hex.decode = function(hex) {

            if (hex == null || hex == '') {
                return null;
            }
            if (hex.length % 2 != 0) {
                return null;
            }

            var ascLen = hex.length / 2;
            var hexCh = this.toCharCodeArray(hex);
            var asc = new Array(ascLen);

            for (var i = 0; i < ascLen; i++) {

                if (hexCh[2 * i] >= 0x30 && hexCh[2 * i] <= 0x39) {
                    asc[i] = ((hexCh[2 * i] - 0x30) << 4);
                } else if (hexCh[2 * i] >= 0x41 && hexCh[2 * i] <= 0x46) { //A-F : 0x41-0x46
                    asc[i] = ((hexCh[2 * i] - 0x41 + 10) << 4);
                } else if (hexCh[2 * i] >= 0x61 && hexCh[2 * i] <= 0x66) { //a-f  : 0x61-0x66
                    asc[i] = ((hexCh[2 * i] - 0x61 + 10) << 4);
                } else {
                    return null;
                }

                if (hexCh[2 * i + 1] >= 0x30 && hexCh[2 * i + 1] <= 0x39) {
                    asc[i] = (asc[i] | (hexCh[2 * i + 1] - 0x30));
                } else if (hexCh[2 * i + 1] >= 0x41 && hexCh[2 * i + 1] <= 0x46) {
                    asc[i] = (asc[i] | (hexCh[2 * i + 1] - 0x41 + 10));
                } else if (hexCh[2 * i + 1] >= 0x61 && hexCh[2 * i + 1] <= 0x66) {
                    asc[i] = (asc[i] | (hexCh[2 * i + 1] - 0x61 + 10));
                } else {
                    return null;
                }

            }

            return asc;
        }

        Hex.utf8StrToHex = function(utf8Str) {
            var ens = encodeURIComponent(utf8Str);
            var es = unescape(ens);

            var esLen = es.length;

            // Convert
            var words = [];
            for (var i = 0; i < esLen; i++) {
                words[i] = (es.charCodeAt(i).toString(16));
            }
            return words.join('');
        }

        Hex.utf8StrToBytes = function(utf8Str) {
            var ens = encodeURIComponent(utf8Str);
            var es = unescape(ens);

            var esLen = es.length;

            // Convert
            var words = [];
            for (var i = 0; i < esLen; i++) {
                words[i] = es.charCodeAt(i);
            }
            return words;
        }

        Hex.hexToUtf8Str = function(utf8Str) {

            var utf8Byte = Hex.decode(utf8Str);
            var latin1Chars = [];
            for (var i = 0; i < utf8Byte.length; i++) {
                latin1Chars.push(String.fromCharCode(utf8Byte[i]));
            }
            return decodeURIComponent(escape(latin1Chars.join('')));
        }

        Hex.bytesToUtf8Str = function(bytesArray) {

            var utf8Byte = bytesArray;
            var latin1Chars = [];
            for (var i = 0; i < utf8Byte.length; i++) {
                latin1Chars.push(String.fromCharCode(utf8Byte[i]));
            }
            return decodeURIComponent(escape(latin1Chars.join('')));
        }

        Hex.toCharCodeArray = function(chs) {
            var chArr = new Array(chs.length);
            for (var i = 0; i < chs.length; i++) {
                chArr[i] = chs.charCodeAt(i);
            }
            return chArr;
        }
        /*
        *
        * 字节流转换工具js
        *
        */

        // bytes[] 转 hex
        function bytesToHex(bytes) {
            for (var hex = [], i = 0; i < bytes.length; i++) {
                hex.push((bytes[i] >>> 4).toString(16));
                hex.push((bytes[i] & 0xF).toString(16));
            }
            return hex.join("");
        }

        // hex 转 bytes[]
        function hexToBytes(hex) {
            for (var bytes = [], c = 0; c < hex.length; c += 2) bytes.push(parseInt(hex.substr(c, 2), 16));
            return bytes;
        }

        /*
         * 数组复制
         */
        function arrayCopy(src, pos1, dest, pos2, len) {
            var realLen = len;
            if (pos1 + len > src.length && pos2 + len <= dest.length) {
                realLen = src.length - pos1;
            } else if (pos2 + len > dest.length && pos1 + len <= src.length) {
                realLen = dest.length - pos2;
            } else if (pos1 + len <= src.length && pos2 + len <= dest.length) {
                realLen = len;
            } else if (dest.length < src.length) {
                realLen = dest.length - pos2;
            } else {
                realLen = src.length - pos2;
            }

            for (var i = 0; i < realLen; i++) {
                dest[i + pos2] = src[i + pos1];
            }
        }

        /*
         * 长整型转成字节，一个长整型为8字节
         * 返回：字节数组
         */
        function longToByte(num) {
            //TODO 这里目前只转换了低四字节，因为js没有长整型，得要封装
            return new Array(0, 0, 0, 0, (num >> 24) & 0x000000FF, (num >> 16) & 0x000000FF, (num >> 8) & 0x000000FF, (num) & 0x000000FF);
        }

        /*
         * int数转成byte数组
         * 事实上只不过转成byte大小的数，实际占用空间还是4字节
         * 返回：字节数组
         */
        function intToByte(num) {
            return new Array((num >> 24) & 0x000000FF, (num >> 16) & 0x000000FF, (num >> 8) & 0x000000FF, (num) & 0x000000FF);
        }

        /*
         * int数组转成byte数组，一个int数值转成四个byte
         * 返回:byte数组
         */
        function intArrayToByteArray(nums) {
            var b = new Array(nums.length * 4);

            for (var i = 0; i < nums.length; i++) {
                arrayCopy(intToByte(nums[i]), 0, b, i * 4, 4);
            }

            return b;
        }

        /*
         * byte数组转成int数值
         * 返回：int数值
         */
        function byteToInt(b, pos) {
            if (pos + 3 < b.length) {
                return ((b[pos]) << 24) | ((b[pos + 1]) << 16) | ((b[pos + 2]) << 8) | ((b[pos + 3]));
            } else if (pos + 2 < b.length) {
                return ((b[pos + 1]) << 16) | ((b[pos + 2]) << 8) | ((b[pos + 3]));
            } else if (pos + 1 < b.length) {
                return ((b[pos]) << 8) | ((b[pos + 1]));
            } else {
                return ((b[pos]));
            }
        }

        /*
         * byte数组转成int数组,每四个字节转成一个int数值
         *
         */
        function byteArrayToIntArray(b) {
            // var arrLen = b.length%4==0 ? b.length/4:b.length/4+1;
            var arrLen = Math.ceil(b.length / 4); //向上取整
            var out = new Array(arrLen);
            for (var i = 0; i < b.length; i++) {
                b[i] = b[i] & 0xFF; //避免负数造成影响
            }
            for (var i = 0; i < out.length; i++) {
                out[i] = byteToInt(b, i * 4);
            }
            return out;
        }
        
        // ECB
        var s4 = new SM4Util();
        s4.secretKey = this.sm3(key, 16)
        if (method === "en") {
            return s4.encryptData_ECB(data);
        }

        if (method === "de") {
            return s4.decryptData_ECB(data);
        }
    }
}
