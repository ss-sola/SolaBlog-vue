"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const encrypt = {
    _minBufferSize: 0,
    init: function (e, n) {
        e = this.words = e || [],
            this.sigBytes = n != undefined ? n : 4 * e.length;
        return {
            words: e,
            sigBytes: n
        }
    },
    toString: function (e) {
        for (var t = e.words, n = e.sigBytes, r = [], o = 0; o < n; o++) {
            var i = t[o >>> 2] >>> 24 - o % 4 * 8 & 255;
            r.push((i >>> 4).toString(16)),
                r.push((15 & i).toString(16))
        }
        return r.join("");
    },
    concat: function (e) {
        var t = this.words
            , n = e.words
            , r = this.sigBytes
            , o = e.sigBytes;
        if (this.clamp(),
            r % 4)
            for (var i = 0; i < o; i++) {
                var a = n[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                t[r + i >>> 2] |= a << 24 - (r + i) % 4 * 8
            }
        else
            for (var l = 0; l < o; l += 4)
                t[r + l >>> 2] = n[l >>> 2];
        return this.sigBytes += o,
            this
    },
    clamp: function () {
        var t = this.words
            , n = this.sigBytes;
        t[n >>> 2] &= 4294967295 << 32 - n % 4 * 8,
            t.length = Math.ceil(n / 4)
    },
    parse: function (e) {
        e = unescape(encodeURIComponent(e));
        for (var t = e.length, n = [], r = 0; r < t; r++)
            n[r >>> 2] |= (255 & e.charCodeAt(r)) << 24 - r % 4 * 8;
        return this.init(n, t)
    },
    finalize: function (e) {
        return e && this._append(e),
            this._doFinalize()
    },
    _append: function (e) {
        "string" == typeof e && (e = this.parse(e)),
            this._data = e,
            this._nDataBytes = e.sigBytes
    },
    _process: function (t) {
        var n, r = this._data, o = r.words, i = r.sigBytes, a = 16, l = i / (4 * a), u = (l = t ? Math.ceil(l) : Math.max((0 | l) - 0, 0)) * a, c = Math.min(4 * u, i);
        if (u) {
            for (var p = 0; p < u; p += a)
                this._doProcessBlock(o, p);
            n = o.splice(0, u),
                r.sigBytes -= c
        }

    },
    _doProcessBlock: function (e, t) {
        let a = [];
        for (var kt = 0; kt < 64; kt++)
            a[kt] = 4294967296 * Math.abs(Math.sin(kt + 1)) | 0;
        for (var n = 0; n < 16; n++) {
            var r = t + n
                , o = e[r];
            e[r] = 16711935 & (o << 8 | o >>> 24) | 4278255360 & (o << 24 | o >>> 8)
        }
        function s(e, t, n, r, o, i, a) {
            var l = e + (t & n | ~t & r) + o + a;
            return (l << i | l >>> 32 - i) + t
        }
        function u(e, t, n, r, o, i, a) {
            var l = e + (t & r | n & ~r) + o + a;
            return (l << i | l >>> 32 - i) + t
        }
        function c(e, t, n, r, o, i, a) {
            var l = e + (t ^ n ^ r) + o + a;
            return (l << i | l >>> 32 - i) + t
        }
        function p(e, t, n, r, o, i, a) {
            var l = e + (n ^ (t | ~r)) + o + a;
            return (l << i | l >>> 32 - i) + t
        }
        var i = this._hash.words
            , l = e[t + 0]
            , d = e[t + 1]
            , f = e[t + 2]
            , h = e[t + 3]
            , v = e[t + 4]
            , m = e[t + 5]
            , g = e[t + 6]
            , y = e[t + 7]
            , b = e[t + 8]
            , _ = e[t + 9]
            , w = e[t + 10]
            , k = e[t + 11]
            , x = e[t + 12]
            , C = e[t + 13]
            , S = e[t + 14]
            , O = e[t + 15]
            , j = i[0]
            , E = i[1]
            , T = i[2]
            , $ = i[3];
        j = s(j, E, T, $, l, 7, a[0]);
        $ = s($, j, E, T, d, 12, a[1]);
        T = s(T, $, j, E, f, 17, a[2]);
        E = s(E, T, $, j, h, 22, a[3]);
        j = s(j, E, T, $, v, 7, a[4]);
        $ = s($, j, E, T, m, 12, a[5]);
        T = s(T, $, j, E, g, 17, a[6]);
        E = s(E, T, $, j, y, 22, a[7]);
        j = s(j, E, T, $, b, 7, a[8]);
        $ = s($, j, E, T, _, 12, a[9]);
        T = s(T, $, j, E, w, 17, a[10]);
        E = s(E, T, $, j, k, 22, a[11]);
        j = s(j, E, T, $, x, 7, a[12]);
        $ = s($, j, E, T, C, 12, a[13]);
        T = s(T, $, j, E, S, 17, a[14]);
        j = u(j, E = s(E, T, $, j, O, 22, a[15]), T, $, d, 5, a[16]);
        $ = u($, j, E, T, g, 9, a[17]);
        T = u(T, $, j, E, k, 14, a[18]);
        E = u(E, T, $, j, l, 20, a[19]);
        j = u(j, E, T, $, m, 5, a[20]);
        $ = u($, j, E, T, w, 9, a[21]);
        T = u(T, $, j, E, O, 14, a[22]);
        E = u(E, T, $, j, v, 20, a[23]);
        j = u(j, E, T, $, _, 5, a[24]);
        $ = u($, j, E, T, S, 9, a[25]);
        T = u(T, $, j, E, h, 14, a[26]);
        E = u(E, T, $, j, b, 20, a[27]);
        j = u(j, E, T, $, C, 5, a[28]);
        $ = u($, j, E, T, f, 9, a[29]);
        T = u(T, $, j, E, y, 14, a[30]);
        j = c(j, E = u(E, T, $, j, x, 20, a[31]), T, $, m, 4, a[32]);
        $ = c($, j, E, T, b, 11, a[33]);
        T = c(T, $, j, E, k, 16, a[34]);
        E = c(E, T, $, j, S, 23, a[35]);
        j = c(j, E, T, $, d, 4, a[36]);
        $ = c($, j, E, T, v, 11, a[37]);
        T = c(T, $, j, E, y, 16, a[38]);
        E = c(E, T, $, j, w, 23, a[39]);
        j = c(j, E, T, $, C, 4, a[40]);
        $ = c($, j, E, T, l, 11, a[41]);
        T = c(T, $, j, E, h, 16, a[42]);
        E = c(E, T, $, j, g, 23, a[43]);
        j = c(j, E, T, $, _, 4, a[44]);
        $ = c($, j, E, T, x, 11, a[45]);
        T = c(T, $, j, E, O, 16, a[46]);
        j = p(j, E = c(E, T, $, j, f, 23, a[47]), T, $, l, 6, a[48]);
        $ = p($, j, E, T, y, 10, a[49]);
        T = p(T, $, j, E, S, 15, a[50]);
        E = p(E, T, $, j, m, 21, a[51]);
        j = p(j, E, T, $, x, 6, a[52]);
        $ = p($, j, E, T, h, 10, a[53]);
        T = p(T, $, j, E, w, 15, a[54]);
        E = p(E, T, $, j, d, 21, a[55]);
        j = p(j, E, T, $, b, 6, a[56]);
        $ = p($, j, E, T, O, 10, a[57]);
        T = p(T, $, j, E, g, 15, a[58]);
        E = p(E, T, $, j, C, 21, a[59]);
        j = p(j, E, T, $, v, 6, a[60]);
        $ = p($, j, E, T, k, 10, a[61]);
        T = p(T, $, j, E, f, 15, a[62]);
        E = p(E, T, $, j, _, 21, a[63]);
        i[0] = i[0] + j | 0;
        i[1] = i[1] + E | 0;
        i[2] = i[2] + T | 0;
        i[3] = i[3] + $ | 0;
    },
    _doFinalize: function () {
        var t = this._data
            , n = t.words
            , r = 8 * this._nDataBytes
            , o = 8 * t.sigBytes;
        n[o >>> 5] |= 128 << 24 - o % 32;
        var i = Math.floor(r / 4294967296)
            , a = r;
        n[15 + (o + 64 >>> 9 << 4)] = 16711935 & (i << 8 | i >>> 24) | 4278255360 & (i << 24 | i >>> 8),
            n[14 + (o + 64 >>> 9 << 4)] = 16711935 & (a << 8 | a >>> 24) | 4278255360 & (a << 24 | a >>> 8),
            t.sigBytes = 4 * (n.length + 1);

        this._hash = {
            words: [1732584193, 4023233417, 2562383102, 271733878],
            sigBytes: 16
        };
        this._process();
        for (var l = this._hash, s = l.words, u = 0; u < 4; u++) {
            var c = s[u];
            s[u] = 16711935 & (c << 8 | c >>> 24) | 4278255360 & (c << 24 | c >>> 8)
        }
        return "20240531." + this.toString(l)
    }

};
const headers = {
    "Accept": "application/json, text/plain, */*",
    "Content-Type": "application/json;charset=UTF-8",
    "origin": "https://tool.liumingye.cn",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
};
function formatSearchData(data) {
    return {
        id: data.id,
        title: data.name,
        url: data.url,
        quality: "128",
        artist: data.artist.map(artist => artist.name).join(","),
        hash: data.hash||data.id,
        duration: data.time,
        album:data.album?data.album.name:"",
        artwork:(data.album?data.album.pic:data.pic).replaceAll("{size}","500")
    }
}
async function searchMusic(query, page) {

    var body = {
        type: "YQD",
        text: query,
        page: page,
        v: "beta",
        _t: Date.now().toString()
    };
    const token = getToken(body);
    body.token = token;
    

    
    const res = await fetch("https://api.liumingye.cn/m/api/search", {
        "headers": headers,
        "body": JSON.stringify(body),
        "method": "POST"
    });
    
    const resData = await res.json();
    return {
        isEnd: true,
        data: resData.data.list.map(formatSearchData)
    }
}
async function getMediaSource(musicItem, quality) {
    
    if(musicItem.url) return {url: musicItem.url};
    const data = {
        id: musicItem.hash,
        quality: "128",
        _t: Date.now().toString()
    };
    const token = getToken(data);
    data.token = token;
    
    const url=`https://api.liumingye.cn/m/api/link?id=${data.id}&quality=${data.quality}&_t=${data._t}&token=${data.token}`;

    return {
        url: url,
    };
}
async function getLyric(musicItem) {
    const body={
        id: musicItem.hash,
        _t: Date.now().toString(),
        
    };
    const token = getToken(body);
    body.token = token;
    const resData =await (await fetch("https://api.liumingye.cn/m/api/lyric", {
        "headers":headers,
        "body": JSON.stringify(body),
        "method": "POST"
    })).json();
    return {
        rawLrc: resData.data.lrc,
        translation: resData.data.tlyric
    }
}

async function importMusicSheet(code) {
    const body={
        id: code.id||code,
        _t:code._t||Date.now().toString()
    };
    const token = getToken(body);
    body.token = token;
    const resData =await (await fetch("https://api.liumingye.cn/m/api/playlist/info", {
        "headers":headers,
        "body": JSON.stringify(body),
        "method": "POST"
    })).json();
    
    return resData.data.list.map(formatSearchData);
}

function getToken(data) {
    const key = "4b9qrOXu305U5Ex5U1yYv69jZO5EbznZq9nWaY5e5NW2GImw27aEBjL4OgW01Tpy";
    const miwen = encodeURIComponent(JSON["stringify"](data));

    let arr = [];
    
    for (let i = 0; i < miwen.length; i++) {
        const item = miwen.charCodeAt(i) ^ key.charCodeAt(i % key.length);
        arr.push(item);
    }
    
    const Os = "hQxDsS6geBiG1MTOPZzoHkt8Wyf4AnLU7FqJbp+0N=udc2j/VY9aICrmX3Rvl5KwE";
    let index = 0;
    let h = "";
    while (index < arr.length) {
        let s = arr[index++];
        let o = arr[index++];
        let i = arr[index++];
        let d = s << 16 | o << 8 | i;
        let a = d >> 18 & 63;
        let l = d >> 12 & 63;
        let r = d >> 6 & 63;
        let c = d & 63;
        h += Os[a] + Os[l] + Os[r] + Os[c];
    }
    
    if(arr.length%3!=0){
        h = h.slice(0, arr.length%3-3);
        for( let i=0;i<3-arr.length%3;i++){
            h+='=';
        }
    }
    const token = encrypt.finalize(h);
    return token;
}

module.exports = {
    platform: "MyFreeMp3",
    version: "0.1.1",
    author: 'MetaSola',
    appVersion: ">0.1.0-alpha.0",
    srcUrl: "https://blog.metasola.cn/MyFreeMp3.js",
    cacheControl: "no-cache",
    description: "",
    primaryKey: ["id", "hash"],
    hints: {
        importMusicSheet: [
            "仅支持歌单ID导入",
            "导入时间和歌单大小有关，请耐心等待",
        ],
    },
    supportedSearchType: ["music"],
    async search(query, page, type) {
        if (type === "music") {
            return await searchMusic(query, page);
        }
    },
    getMediaSource,
    getLyric,
    importMusicSheet
}