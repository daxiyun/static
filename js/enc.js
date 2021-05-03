function base64(method, data) {
    if (method === "en") {
        return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(data));
    }
    if (method === "de") {
        return CryptoJS.enc.Base64.parse(data).toString(CryptoJS.enc.Utf8);
    }
}

function md5(data, method = 32) {
    if (method === 32) {
        return CryptoJS.MD5(data).toString();
    }
    if (method === 16) {
        return CryptoJS.MD5(data).toString().substr(8, 16);
    }
}

function sm4(method, data, key) {
	// ECB
	var s4 = new SM4Util();
	s4.secretKey = md5(key)
	if (method === "en") {
		return s4.encryptData_ECB(data);
	}

	if (method === "de") {
		return s4.decryptData_ECB(data);
	}
}

function aes(method, key, data) {
    // CBC
    var key = md5(key);
    if (method === "en") {
        return CryptoJS.AES.encrypt(data, key).toString();
    }

    if (method === "de") {
        return CryptoJS.AES.decrypt(data, key).toString(CryptoJS.enc.Utf8);
    }
}

/////////////////////////////////////////////////////////
// 压缩工具 https://tool.css-js.com/

// http://www.jsons.cn/Style/js/pjs/aes.js
var CryptoJS=CryptoJS||function(a,b){var l,c={},d=c.lib={},e=d.Base=function(){function a(){}return{extend:function(b){a.prototype=this;var c=new a;return b&&c.mixIn(b),c.$super=this,c},create:function(){var a=this.extend();return a.init.apply(a,arguments),a},init:function(){},mixIn:function(a){for(var b in a)a.hasOwnProperty(b)&&(this[b]=a[b]);a.hasOwnProperty("toString")&&(this.toString=a.toString)},clone:function(){return this.$super.extend(this)}}}(),f=d.WordArray=e.extend({init:function(a,c){a=this.words=a||[],this.sigBytes=c!=b?c:4*a.length},toString:function(a){return(a||h).stringify(this)},concat:function(a){var e,b=this.words,c=a.words,d=this.sigBytes;if(a=a.sigBytes,this.clamp(),d%4)for(e=0;a>e;e++)b[d+e>>>2]|=(255&c[e>>>2]>>>24-8*(e%4))<<24-8*((d+e)%4);else if(65535<c.length)for(e=0;a>e;e+=4)b[d+e>>>2]=c[e>>>2];else b.push.apply(b,c);return this.sigBytes+=a,this},clamp:function(){var b=this.words,c=this.sigBytes;b[c>>>2]&=4294967295<<32-8*(c%4),b.length=a.ceil(c/4)},clone:function(){var a=e.clone.call(this);return a.words=this.words.slice(0),a},random:function(b){for(var c=[],d=0;b>d;d+=4)c.push(0|4294967296*a.random());return f.create(c,b)}}),g=c.enc={},h=g.Hex={stringify:function(a){var b,c,d,e;for(b=a.words,a=a.sigBytes,c=[],d=0;a>d;d++)e=255&b[d>>>2]>>>24-8*(d%4),c.push((e>>>4).toString(16)),c.push((15&e).toString(16));return c.join("")},parse:function(a){for(var b=a.length,c=[],d=0;b>d;d+=2)c[d>>>3]|=parseInt(a.substr(d,2),16)<<24-4*(d%8);return f.create(c,b/2)}},i=g.Latin1={stringify:function(a){for(var b=a.words,a=a.sigBytes,c=[],d=0;a>d;d++)c.push(String.fromCharCode(255&b[d>>>2]>>>24-8*(d%4)));return c.join("")},parse:function(a){for(var b=a.length,c=[],d=0;b>d;d++)c[d>>>2]|=(255&a.charCodeAt(d))<<24-8*(d%4);return f.create(c,b)}},j=g.Utf8={stringify:function(a){try{return decodeURIComponent(escape(i.stringify(a)))}catch(b){throw Error("Malformed UTF-8 data")}},parse:function(a){return i.parse(unescape(encodeURIComponent(a)))}},k=d.BufferedBlockAlgorithm=e.extend({reset:function(){this._data=f.create(),this._nDataBytes=0},_append:function(a){"string"==typeof a&&(a=j.parse(a)),this._data.concat(a),this._nDataBytes+=a.sigBytes},_process:function(b){var i,c=this._data,d=c.words,e=c.sigBytes,g=this.blockSize,h=e/(4*g);if(h=b?a.ceil(h):a.max((0|h)-this._minBufferSize,0),b=h*g,e=a.min(4*b,e),b){for(i=0;b>i;i+=g)this._doProcessBlock(d,i);i=d.splice(0,b),c.sigBytes-=e}return f.create(i,e)},clone:function(){var a=e.clone.call(this);return a._data=this._data.clone(),a},_minBufferSize:0});return d.Hasher=k.extend({init:function(){this.reset()},reset:function(){k.reset.call(this),this._doReset()},update:function(a){return this._append(a),this._process(),this},finalize:function(a){return a&&this._append(a),this._doFinalize(),this._hash},clone:function(){var a=k.clone.call(this);return a._hash=this._hash.clone(),a},blockSize:16,_createHelper:function(a){return function(b,c){return a.create(c).finalize(b)}},_createHmacHelper:function(a){return function(b,c){return l.HMAC.create(a,c).finalize(b)}}}),l=c.algo={},c}(Math);!function(){var a=CryptoJS,b=a.lib.WordArray;a.enc.Base64={stringify:function(a){var e,f,g,b=a.words,c=a.sigBytes,d=this._map;for(a.clamp(),a=[],e=0;c>e;e+=3)for(f=(255&b[e>>>2]>>>24-8*(e%4))<<16|(255&b[e+1>>>2]>>>24-8*((e+1)%4))<<8|255&b[e+2>>>2]>>>24-8*((e+2)%4),g=0;4>g&&c>e+.75*g;g++)a.push(d.charAt(63&f>>>6*(3-g)));if(b=d.charAt(64))for(;a.length%4;)a.push(b);return a.join("")},parse:function(a){var c,d,e,f,g,h,i;for(a=a.replace(/\s/g,""),c=a.length,d=this._map,e=d.charAt(64),e&&(e=a.indexOf(e),-1!=e&&(c=e)),e=[],f=0,g=0;c>g;g++)g%4&&(h=d.indexOf(a.charAt(g-1))<<2*(g%4),i=d.indexOf(a.charAt(g))>>>6-2*(g%4),e[f>>>2]|=(h|i)<<24-8*(f%4),f++);return b.create(e,f)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="}}(),function(a){function b(a,b,c,d,e,f,g){return a=a+(b&c|~b&d)+e+g,(a<<f|a>>>32-f)+b}function c(a,b,c,d,e,f,g){return a=a+(b&d|c&~d)+e+g,(a<<f|a>>>32-f)+b}function d(a,b,c,d,e,f,g){return a=a+(b^c^d)+e+g,(a<<f|a>>>32-f)+b}function e(a,b,c,d,e,f,g){return a=a+(c^(b|~d))+e+g,(a<<f|a>>>32-f)+b}var f=CryptoJS,g=f.lib,h=g.WordArray,g=g.Hasher,i=f.algo,j=[];!function(){for(var b=0;64>b;b++)j[b]=0|4294967296*a.abs(a.sin(b+1))}(),i=i.MD5=g.extend({_doReset:function(){this._hash=h.create([1732584193,4023233417,2562383102,271733878])},_doProcessBlock:function(a,f){var g,h,i,k,l,m;for(g=0;16>g;g++)h=f+g,i=a[h],a[h]=16711935&(i<<8|i>>>24)|4278255360&(i<<24|i>>>8);for(h=this._hash.words,i=h[0],k=h[1],l=h[2],m=h[3],g=0;64>g;g+=4)16>g?(i=b(i,k,l,m,a[f+g],7,j[g]),m=b(m,i,k,l,a[f+g+1],12,j[g+1]),l=b(l,m,i,k,a[f+g+2],17,j[g+2]),k=b(k,l,m,i,a[f+g+3],22,j[g+3])):32>g?(i=c(i,k,l,m,a[f+(g+1)%16],5,j[g]),m=c(m,i,k,l,a[f+(g+6)%16],9,j[g+1]),l=c(l,m,i,k,a[f+(g+11)%16],14,j[g+2]),k=c(k,l,m,i,a[f+g%16],20,j[g+3])):48>g?(i=d(i,k,l,m,a[f+(3*g+5)%16],4,j[g]),m=d(m,i,k,l,a[f+(3*g+8)%16],11,j[g+1]),l=d(l,m,i,k,a[f+(3*g+11)%16],16,j[g+2]),k=d(k,l,m,i,a[f+(3*g+14)%16],23,j[g+3])):(i=e(i,k,l,m,a[f+3*g%16],6,j[g]),m=e(m,i,k,l,a[f+(3*g+7)%16],10,j[g+1]),l=e(l,m,i,k,a[f+(3*g+14)%16],15,j[g+2]),k=e(k,l,m,i,a[f+(3*g+5)%16],21,j[g+3]));h[0]=0|h[0]+i,h[1]=0|h[1]+k,h[2]=0|h[2]+l,h[3]=0|h[3]+m},_doFinalize:function(){var a=this._data,b=a.words,c=8*this._nDataBytes,d=8*a.sigBytes;for(b[d>>>5]|=128<<24-d%32,b[(d+64>>>9<<4)+14]=16711935&(c<<8|c>>>24)|4278255360&(c<<24|c>>>8),a.sigBytes=4*(b.length+1),this._process(),a=this._hash.words,b=0;4>b;b++)c=a[b],a[b]=16711935&(c<<8|c>>>24)|4278255360&(c<<24|c>>>8)}}),f.MD5=g._createHelper(i),f.HmacMD5=g._createHmacHelper(i)}(Math),function(){var a=CryptoJS,b=a.lib,c=b.Base,d=b.WordArray,b=a.algo,e=b.EvpKDF=c.extend({cfg:c.extend({keySize:4,hasher:b.MD5,iterations:1}),init:function(a){this.cfg=this.cfg.extend(a)},compute:function(a,b){var c,e,f,g,h,i,j;for(c=this.cfg,e=c.hasher.create(),f=d.create(),g=f.words,h=c.keySize,c=c.iterations;g.length<h;){for(i&&e.update(i),i=e.update(a).finalize(b),e.reset(),j=1;c>j;j++)i=e.finalize(i),e.reset();f.concat(i)}return f.sigBytes=4*h,f}});a.EvpKDF=function(a,b,c){return e.create(c).compute(a,b)}}(),CryptoJS.lib.Cipher||function(a){var j,k,l,m,n,o,b=CryptoJS,c=b.lib,d=c.Base,e=c.WordArray,f=c.BufferedBlockAlgorithm,g=b.enc.Base64,h=b.algo.EvpKDF,i=c.Cipher=f.extend({cfg:d.extend(),createEncryptor:function(a,b){return this.create(this._ENC_XFORM_MODE,a,b)},createDecryptor:function(a,b){return this.create(this._DEC_XFORM_MODE,a,b)},init:function(a,b,c){this.cfg=this.cfg.extend(c),this._xformMode=a,this._key=b,this.reset()},reset:function(){f.reset.call(this),this._doReset()},process:function(a){return this._append(a),this._process()},finalize:function(a){return a&&this._append(a),this._doFinalize()},keySize:4,ivSize:4,_ENC_XFORM_MODE:1,_DEC_XFORM_MODE:2,_createHelper:function(){return function(a){return{encrypt:function(b,c,d){return("string"==typeof c?o:n).encrypt(a,b,c,d)},decrypt:function(b,c,d){return("string"==typeof c?o:n).decrypt(a,b,c,d)}}}}()});c.StreamCipher=i.extend({_doFinalize:function(){return this._process(!0)},blockSize:1}),j=b.mode={},k=c.BlockCipherMode=d.extend({createEncryptor:function(a,b){return this.Encryptor.create(a,b)},createDecryptor:function(a,b){return this.Decryptor.create(a,b)},init:function(a,b){this._cipher=a,this._iv=b}}),j=j.CBC=function(){function b(b,c,d){var f,e=this._iv;for(e?this._iv=a:e=this._prevBlock,f=0;d>f;f++)b[c+f]^=e[f]}var c=k.extend();return c.Encryptor=c.extend({processBlock:function(a,c){var d=this._cipher,e=d.blockSize;b.call(this,a,c,e),d.encryptBlock(a,c),this._prevBlock=a.slice(c,c+e)}}),c.Decryptor=c.extend({processBlock:function(a,c){var d=this._cipher,e=d.blockSize,f=a.slice(c,c+e);d.decryptBlock(a,c),b.call(this,a,c,e),this._prevBlock=f}}),c}(),l=(b.pad={}).Pkcs7={pad:function(a,b){for(var c=4*b,c=c-a.sigBytes%c,d=c<<24|c<<16|c<<8|c,f=[],g=0;c>g;g+=4)f.push(d);c=e.create(f,c),a.concat(c)},unpad:function(a){a.sigBytes-=255&a.words[a.sigBytes-1>>>2]}},c.BlockCipher=i.extend({cfg:i.cfg.extend({mode:j,padding:l}),reset:function(){var a,b,c;i.reset.call(this),a=this.cfg,b=a.iv,a=a.mode,this._xformMode==this._ENC_XFORM_MODE?c=a.createEncryptor:(c=a.createDecryptor,this._minBufferSize=1),this._mode=c.call(a,this,b&&b.words)},_doProcessBlock:function(a,b){this._mode.processBlock(a,b)},_doFinalize:function(){var b,a=this.cfg.padding;return this._xformMode==this._ENC_XFORM_MODE?(a.pad(this._data,this.blockSize),b=this._process(!0)):(b=this._process(!0),a.unpad(b)),b},blockSize:4}),m=c.CipherParams=d.extend({init:function(a){this.mixIn(a)},toString:function(a){return(a||this.formatter).stringify(this)}}),j=(b.format={}).OpenSSL={stringify:function(a){var b=a.ciphertext,a=a.salt,b=(a?e.create([1398893684,1701076831]).concat(a).concat(b):b).toString(g);return b=b.replace(/(.{64})/g,"$1\n")},parse:function(a){var b,c;return a=g.parse(a),b=a.words,1398893684==b[0]&&1701076831==b[1]&&(c=e.create(b.slice(2,4)),b.splice(0,4),a.sigBytes-=16),m.create({ciphertext:a,salt:c})}},n=c.SerializableCipher=d.extend({cfg:d.extend({format:j}),encrypt:function(a,b,c,d){var d=this.cfg.extend(d),e=a.createEncryptor(c,d),b=e.finalize(b),e=e.cfg;return m.create({ciphertext:b,key:c,iv:e.iv,algorithm:a,mode:e.mode,padding:e.padding,blockSize:a.blockSize,formatter:d.format})},decrypt:function(a,b,c,d){return d=this.cfg.extend(d),b=this._parse(b,d.format),a.createDecryptor(c,d).finalize(b.ciphertext)},_parse:function(a,b){return"string"==typeof a?b.parse(a):a}}),b=(b.kdf={}).OpenSSL={compute:function(a,b,c,d){return d||(d=e.random(8)),a=h.create({keySize:b+c}).compute(a,d),c=e.create(a.words.slice(b),4*c),a.sigBytes=4*b,m.create({key:a,iv:c,salt:d})}},o=c.PasswordBasedCipher=n.extend({cfg:n.cfg.extend({kdf:b}),encrypt:function(a,b,c,d){return d=this.cfg.extend(d),c=d.kdf.compute(c,a.keySize,a.ivSize),d.iv=c.iv,a=n.encrypt.call(this,a,b,c.key,d),a.mixIn(c),a},decrypt:function(a,b,c,d){return d=this.cfg.extend(d),b=this._parse(b,d.format),c=d.kdf.compute(c,a.keySize,a.ivSize,b.salt),d.iv=c.iv,n.decrypt.call(this,a,b,c.key,d)}})}(),function(){var n,a=CryptoJS,b=a.lib.BlockCipher,c=a.algo,d=[],e=[],f=[],g=[],h=[],i=[],j=[],k=[],l=[],m=[];!function(){var a,b,c,n,o,p,q,r,s;for(a=[],b=0;256>b;b++)a[b]=128>b?b<<1:283^b<<1;for(c=0,n=0,b=0;256>b;b++)o=n^n<<1^n<<2^n<<3^n<<4,o=99^(o>>>8^255&o),d[c]=o,e[o]=c,p=a[c],q=a[p],r=a[q],s=257*a[o]^16843008*o,f[c]=s<<24|s>>>8,g[c]=s<<16|s>>>16,h[c]=s<<8|s>>>24,i[c]=s,s=16843009*r^65537*q^257*p^16843008*c,j[o]=s<<24|s>>>8,k[o]=s<<16|s>>>16,l[o]=s<<8|s>>>24,m[o]=s,c?(c=p^a[a[a[r^p]]],n^=a[a[n]]):c=n=1}(),n=[0,1,2,4,8,16,32,64,128,27,54],c=c.AES=b.extend({_doReset:function(){var a,b,c,e,f,g;for(a=this._key,b=a.words,c=a.sigBytes/4,a=4*((this._nRounds=c+6)+1),e=this._keySchedule=[],f=0;a>f;f++)c>f?e[f]=b[f]:(g=e[f-1],f%c?c>6&&4==f%c&&(g=d[g>>>24]<<24|d[255&g>>>16]<<16|d[255&g>>>8]<<8|d[255&g]):(g=g<<8|g>>>24,g=d[g>>>24]<<24|d[255&g>>>16]<<16|d[255&g>>>8]<<8|d[255&g],g^=n[0|f/c]<<24),e[f]=e[f-c]^g);for(b=this._invKeySchedule=[],c=0;a>c;c++)f=a-c,g=c%4?e[f]:e[f-4],b[c]=4>c||4>=f?g:j[d[g>>>24]]^k[d[255&g>>>16]]^l[d[255&g>>>8]]^m[d[255&g]]},encryptBlock:function(a,b){this._doCryptBlock(a,b,this._keySchedule,f,g,h,i,d)},decryptBlock:function(a,b){var c=a[b+1];a[b+1]=a[b+3],a[b+3]=c,this._doCryptBlock(a,b,this._invKeySchedule,j,k,l,m,e),c=a[b+1],a[b+1]=a[b+3],a[b+3]=c},_doCryptBlock:function(a,b,c,d,e,f,g,h){var i,j,k,l,m,n,o,p,q,r;for(i=this._nRounds,j=a[b]^c[0],k=a[b+1]^c[1],l=a[b+2]^c[2],m=a[b+3]^c[3],n=4,o=1;i>o;o++)p=d[j>>>24]^e[255&k>>>16]^f[255&l>>>8]^g[255&m]^c[n++],q=d[k>>>24]^e[255&l>>>16]^f[255&m>>>8]^g[255&j]^c[n++],r=d[l>>>24]^e[255&m>>>16]^f[255&j>>>8]^g[255&k]^c[n++],m=d[m>>>24]^e[255&j>>>16]^f[255&k>>>8]^g[255&l]^c[n++],j=p,k=q,l=r;p=(h[j>>>24]<<24|h[255&k>>>16]<<16|h[255&l>>>8]<<8|h[255&m])^c[n++],q=(h[k>>>24]<<24|h[255&l>>>16]<<16|h[255&m>>>8]<<8|h[255&j])^c[n++],r=(h[l>>>24]<<24|h[255&m>>>16]<<16|h[255&j>>>8]<<8|h[255&k])^c[n++],m=(h[m>>>24]<<24|h[255&j>>>16]<<16|h[255&k>>>8]<<8|h[255&l])^c[n++],a[b]=p,a[b+1]=q,a[b+2]=r,a[b+3]=m},keySize:8}),a.AES=b._createHelper(c)}();

// https://github.com/yunlongn/SM3-SM4-js
function SM4Util(){this.secretKey="1234567890abcdef",this.iv="",this.hexString=!1,this.decryptData_ECB=function(a){var b=hexToBytes(a),c=this.stringToByte(this.secretKey),d=new SM4,e=d.decrypt_ecb(c,b);return Hex.bytesToUtf8Str(e)},this.encryptData_ECB=function(a){var b=this.stringToByte(a),c=this.stringToByte(this.secretKey),d=new SM4,e=d.encrypt_ecb(c,b),f=bytesToHex(e);return f},this.decryptData_CBC=function(a){var b=hexToBytes(a),c=this.stringToByte(this.secretKey),d=this.stringToByte(this.iv),e=new SM4,f=e.decrypt_cbc(c,d,b);return Hex.bytesToUtf8Str(f)},this.encryptData_CBC=function(a){var b=this.stringToByte(a),c=this.stringToByte(this.secretKey),d=this.stringToByte(this.iv),e=new SM4,f=e.encrypt_cbc(c,d,b),g=bytesToHex(f);return g},this.stringToByte=function(a){var d,e,b=new Array,c=a.length;for(e=0;c>e;e++)d=a.charCodeAt(e),d>=65536&&1114111>=d?(b.push(240|7&d>>18),b.push(128|63&d>>12),b.push(128|63&d>>6),b.push(128|63&d)):d>=2048&&65535>=d?(b.push(224|15&d>>12),b.push(128|63&d>>6),b.push(128|63&d)):d>=128&&2047>=d?(b.push(192|31&d>>6),b.push(128|63&d)):b.push(255&d);return b}}function SM4(){this.sbox=new Array(214,144,233,254,204,225,61,183,22,182,20,194,40,251,44,5,43,103,154,118,42,190,4,195,170,68,19,38,73,134,6,153,156,66,80,244,145,239,152,122,51,84,11,67,237,207,172,98,228,179,28,169,201,8,232,149,128,223,148,250,117,143,63,166,71,7,167,252,243,115,23,186,131,89,60,25,230,133,79,168,104,107,129,178,113,100,218,139,248,235,15,75,112,86,157,53,30,36,14,94,99,88,209,162,37,34,124,59,1,33,120,135,212,0,70,87,159,211,39,82,76,54,2,231,160,196,200,158,234,191,138,210,64,199,56,181,163,247,242,206,249,97,21,161,224,174,93,164,155,52,26,85,173,147,50,48,245,140,177,227,29,246,226,46,130,102,202,96,192,41,35,171,13,83,78,111,213,219,55,69,222,253,142,47,3,255,106,114,109,108,91,81,141,27,175,146,187,221,188,127,17,217,92,65,31,16,90,216,10,193,49,136,165,205,123,189,45,116,208,18,184,229,180,176,137,105,151,74,12,150,119,126,101,185,241,9,197,110,198,132,24,240,125,236,58,220,77,32,121,238,95,62,215,203,57,72),this.fk=new Array(2746333894,1453994832,1736282519,2993693404),this.ck=new Array(462357,472066609,943670861,1415275113,1886879365,2358483617,2830087869,3301692121,3773296373,4228057617,404694573,876298825,1347903077,1819507329,2291111581,2762715833,3234320085,3705924337,4177462797,337322537,808926789,1280531041,1752135293,2223739545,2695343797,3166948049,3638552301,4110090761,269950501,741554753,1213159005,1684763257)}function Hex(){}function bytesToHex(a){for(var b=[],c=0;c<a.length;c++)b.push((a[c]>>>4).toString(16)),b.push((15&a[c]).toString(16));return b.join("")}function hexToBytes(a){for(var b=[],c=0;c<a.length;c+=2)b.push(parseInt(a.substr(c,2),16));return b}function arrayCopy(a,b,c,d,e){var g,f=e;for(f=b+e>a.length&&d+e<=c.length?a.length-b:d+e>c.length&&b+e<=a.length?c.length-d:b+e<=a.length&&d+e<=c.length?e:c.length<a.length?c.length-d:a.length-d,g=0;f>g;g++)c[g+d]=a[g+b]}function longToByte(a){return new Array(0,0,0,0,255&a>>24,255&a>>16,255&a>>8,255&a)}function intToByte(a){return new Array(255&a>>24,255&a>>16,255&a>>8,255&a)}function intArrayToByteArray(a){var c,b=new Array(4*a.length);for(c=0;c<a.length;c++)arrayCopy(intToByte(a[c]),0,b,4*c,4);return b}function byteToInt(a,b){return b+3<a.length?a[b]<<24|a[b+1]<<16|a[b+2]<<8|a[b+3]:b+2<a.length?a[b+1]<<16|a[b+2]<<8|a[b+3]:b+1<a.length?a[b]<<8|a[b+1]:a[b]}function byteArrayToIntArray(a){var d,b=Math.ceil(a.length/4),c=new Array(b);for(d=0;d<a.length;d++)a[d]=255&a[d];for(d=0;d<c.length;d++)c[d]=byteToInt(a,4*d);return c}var debug=!1;SM4.prototype={expandKey:function(a){var d,e,b=new Array(36),c=byteArrayToIntArray(a);for(b[0]=c[0]^this.fk[0],b[1]=c[1]^this.fk[1],b[2]=c[2]^this.fk[2],b[3]=c[3]^this.fk[3],d=new Array(32),e=0;32>e;e++)b[e+4]=b[e]^this.T1(b[e+1]^b[e+2]^b[e+3]^this.ck[e]),d[e]=b[e+4];return d},T1:function(a){var e,b=0,c=new Array(4),d=intToByte(a);return c[0]=this.sbox[255&d[0]],c[1]=this.sbox[255&d[1]],c[2]=this.sbox[255&d[2]],c[3]=this.sbox[255&d[3]],e=byteToInt(c,0),b=e^(e<<13|e>>>19)^(e<<23|e>>>9)},one_encrypt:function(a,b){var d,e,f,c=new Array(36);for(c[0]=byteToInt(b,0),c[1]=byteToInt(b,4),c[2]=byteToInt(b,8),c[3]=byteToInt(b,12),d=0;32>d;d++)c[d+4]=c[d]^this.T0(c[d+1]^c[d+2]^c[d+3]^a[d]);for(e=new Array(4),d=35;d>=32;d--)e[35-d]=c[d];return f=intArrayToByteArray(e)},T0:function(a){var d,e,b=intToByte(a),c=new Array(4);return c[0]=this.sbox[255&b[0]],c[1]=this.sbox[255&b[1]],c[2]=this.sbox[255&b[2]],c[3]=this.sbox[255&b[3]],d=byteToInt(c,0),e=d^(d<<2|d>>>30)^(d<<10|d>>>22)^(d<<18|d>>>14)^(d<<24|d>>>8)},pkcs7padding:function(a,b){var c,d,e;if(null==a)return null;if(c=null,1==b)for(d=16-a.length%16,c=new Array(a.length+d),arrayCopy(a,0,c,0,a.length),e=0;d>e;e++)c[a.length+e]=d;else d=a[a.length-1],c=new Array(a.length-d),arrayCopy(a,0,c,0,a.length-d);return c},encrypt_ecb:function(a,b){var c,d,e,f,g,h,i,j,k;if(void 0==a||null==a||0!=a.length%16)return console.log("sm4 key is error!"),null;if(void 0==b||null==b||b.length<=0)return console.log("data is error!"),null;for(c=this.expandKey(a),d=16,e=parseInt(b.length/d),f=new Array((e+1)*d),g=new Array(d),h=null,i=0;e>i;i++)arrayCopy(b,i*d,g,0,d),h=this.one_encrypt(c,g),arrayCopy(h,0,f,i*d,d);return j=new Array(b.length%d),j.length>0&&arrayCopy(b,e*d,j,0,b.length%d),k=this.pkcs7padding(j,1),h=this.one_encrypt(c,k),arrayCopy(h,0,f,e*d,d),f},decrypt_ecb:function(a,b){var c,d,e,f,g,h,i,j,k;if(void 0==a||null==a||0!=a.length%16)return console.log("sm4 key is error!"),null;if(void 0==b||null==b||0!=b.length%16)return console.log("data is error!"),null;for(c=this.expandKey(a),d=new Array(32),e=0;e<c.length;e++)d[e]=c[32-e-1];for(f=16,g=b.length/f-1,h=new Array(f),i=null,j=null,arrayCopy(b,g*f,h,0,f),i=this.one_encrypt(d,h),k=this.pkcs7padding(i,0),j=new Array(g*f+k.length),arrayCopy(k,0,j,g*f,k.length),e=0;g>e;e++)arrayCopy(b,e*f,h,0,f),i=this.one_encrypt(d,h),arrayCopy(i,0,j,e*f,f);return j},encrypt_cbc:function(a,b,c){var d,e,f,g,h,j,k,l,m;if(void 0==a||null==a||0!=a.length%16)return console.log("sm4 key is error!"),null;if(void 0==c||null==c||c.length<=0)return console.log("data is error!"),null;if(void 0==b||null==b||0!=b.length%16)return console.log("iv is error!"),null;for(d=this.expandKey(a),e=16,f=parseInt(c.length/e),g=new Array((f+1)*e),h=new Array(e),j=0;f>j;j++){for(arrayCopy(c,j*e,h,0,e),k=0;e>k;k++)h[k]=h[k]^b[k];b=this.one_encrypt(d,h),arrayCopy(b,0,g,j*e,e)}for(l=new Array(c.length%e),l.length>0&&arrayCopy(c,f*e,l,0,c.length%e),m=this.pkcs7padding(l,1),j=0;e>j;j++)m[j]=m[j]^b[j];return b=this.one_encrypt(d,m),arrayCopy(b,0,g,f*e,e),g},decrypt_cbc:function(a,b,c){var d,e,f,g,h,i,j,k,l,m,n;if(void 0==a||null==a||0!=a.length%16)return console.log("sm4 key is error!"),null;if(void 0==c||null==c||0!=c.length%16)return console.log("data is error!"),null;if(void 0==b||null==b||0!=b.length%16)return console.log("iv is error!"),null;for(d=this.expandKey(a),e=new Array(32),f=0;f<d.length;f++)e[f]=d[32-f-1];for(g=16,h=c.length/g,i=new Array(g),j=null,k=null,k=new Array(c.length),f=0;h>f;f++){for(arrayCopy(c,f*g,i,0,g),j=this.one_encrypt(e,i),l=0;g>l;l++)j[l]=j[l]^b[l];arrayCopy(i,0,b,0,g),arrayCopy(j,0,k,f*g,g)}return m=this.pkcs7padding(j,0),n=new Array(k.length-g+m.length),arrayCopy(k,0,n,0,k.length-g),arrayCopy(m,0,n,k.length-g,m.length),n}},Hex.encode=function(a,b,c){var f,g,d=new Array(2*c),e=new Array("0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F");for(f=b,g=0;c+b>f;f++,g++)d[g]=e[(255&a[f])>>4],d[++g]=e[15&a[f]];return d.join("")},Hex.decode=function(a){var b,c,d,e;if(null==a||""==a)return null;if(0!=a.length%2)return null;for(b=a.length/2,c=this.toCharCodeArray(a),d=new Array(b),e=0;b>e;e++){if(c[2*e]>=48&&c[2*e]<=57)d[e]=c[2*e]-48<<4;else if(c[2*e]>=65&&c[2*e]<=70)d[e]=c[2*e]-65+10<<4;else{if(!(c[2*e]>=97&&c[2*e]<=102))return null;d[e]=c[2*e]-97+10<<4}if(c[2*e+1]>=48&&c[2*e+1]<=57)d[e]=d[e]|c[2*e+1]-48;else if(c[2*e+1]>=65&&c[2*e+1]<=70)d[e]=d[e]|c[2*e+1]-65+10;else{if(!(c[2*e+1]>=97&&c[2*e+1]<=102))return null;d[e]=d[e]|c[2*e+1]-97+10}}return d},Hex.utf8StrToHex=function(a){var f,b=encodeURIComponent(a),c=unescape(b),d=c.length,e=[];for(f=0;d>f;f++)e[f]=c.charCodeAt(f).toString(16);return e.join("")},Hex.utf8StrToBytes=function(a){var f,b=encodeURIComponent(a),c=unescape(b),d=c.length,e=[];for(f=0;d>f;f++)e[f]=c.charCodeAt(f);return e},Hex.hexToUtf8Str=function(a){var d,b=Hex.decode(a),c=[];for(d=0;d<b.length;d++)c.push(String.fromCharCode(b[d]));return decodeURIComponent(escape(c.join("")))},Hex.bytesToUtf8Str=function(a){var d,b=a,c=[];for(d=0;d<b.length;d++)c.push(String.fromCharCode(b[d]));return decodeURIComponent(escape(c.join("")))},Hex.toCharCodeArray=function(a){var c,b=new Array(a.length);for(c=0;c<a.length;c++)b[c]=a.charCodeAt(c);return b};
