function anysignCommentCore(e, t, n, o) {
    function i() {
        if (h) {
            var e = document.createElement("canvas"), t = e.getContext("2d"), o = window.devicePixelRatio ? window.devicePixelRatio : 1;
            e.width = h.width / o, e.height = h.height / o;
            var i = 1;
            n.mass_word_width / n.mass_word_height <= e.width / e.height ? n.mass_word_width <= e.width && (i = n.mass_word_width / e.width) : n.singleHeight <= e.height && (i = n.mass_word_height / e.height), e.width *= i, e.height *= i, R = e.width, k = e.height, t.scale(1 / o * i, 1 / o * i);
            var r = document.createElement("canvas");
            return r.width = h.width, r.height = h.height, r.getContext("2d").putImageData(h, 0, 0), t.drawImage(r, 0, 0), e.toDataURL()
        }
        return null
    }

    function r() {
        if (!w)if (S <= 0) alert("Removed, please sign again！"), P = 0; else {
            var o = document.getElementById("img" + S);
            document.getElementById("signImage").removeChild(o), S--, W--;
            var i = document.getElementById("signTitle");
            n.isShowBgText && (i.innerHTML = J[S]), 0 == S ? (P = 0, W = 0) : W - 1 < 0 ? (W = t, $ > 0 && $--, P = 0) : P = W * n.mass_word_width;
            var r = document.getElementById("comment_title");
            r.innerHTML = e, r.style.color = "black", r.innerHTML = e.substring(0, S) + J[S].replace(J[S], '<font color="' + n.currentEditBarTextColor + '">$&</font>') + e.substring(S + 1, J.length)
        }
    }

    function l() {
        document.documentElement.style.overflow = "auto", signResCallback && signResCallback(n.cid, null, null, 0), c()
    }

    function a() {
        w || (S == J.length ? (s(), signResCallback && signResCallback(n.cid, A[0].substring(22, A[0].length), A[0].substring(22, A[0].length), E, B, g, m), c()) : custom_alert("Please sign your name", "confirm"))
    }

    function c() {
        document.getElementById("comment_dialog").style.display = "none", v = 9999, T = 9999, p = 0, _ = 0, document.body.parentNode.style.overflow = "scroll";
        document.getElementById("comment_sign");
        var e = document.getElementById("comment_title");
        e.innerHTML = "", e.style.color = "black", document.getElementById("signTitle").innerHTML = "";
        for (var t = 0; t < D.length; t++)Y.removeChild(D[t]);
        n = null
    }

    function s() {
        function t(e) {
            e < c ? (l >= n.mass_words_in_single_line && (a += n.mass_word_height, l = 0), i.drawImage(D[e], n.mass_word_width * l, a, n.mass_word_width, n.mass_word_height), l++, t(e + 1)) : A.push(o.toDataURL("image/png", 1))
        }

        var o = document.createElement("canvas"), i = o.getContext("2d"), r = n.mass_words_in_single_line;
        g = n.mass_word_width * r, m = n.mass_word_height * (e.length / n.mass_words_in_single_line + 1), o.width = g, o.height = m, i.rect(0, 0, o.width, o.height), i.fillStyle = "#fff", i.fill();
        var l = 0, a = 0, c = J.length;
        t(0)
    }

    var d, h, e, g, m, u = window.innerWidth >= 480 ? 15 : 10, f = !1, w = !1, v = 9999, T = 9999, p = 0, _ = 0, y = 0, I = 0, C = [], M = [], x = [], L = 0, E = "", B = 0, b = 0, H = 0, R = 0, k = 0, S = 0, D = new Array, N = null, P = 0, $ = 0, W = 0, J = e.replace(/(.)(?=[^$])/g, "$1,").split(","), U = document.getElementById("comment_canvas"), X = document.getElementById("comment_title"), Y = document.getElementById("signImage"), O = document.getElementById("comment_ok"), Q = document.getElementById("comment_back"), j = document.getElementById("comment_cancel");
    d = U.getContext("2d");
    var q = document.getElementById("signTitle");
    n.isShowBgText && (q.innerHTML = J[S]), X.innerHTML = J[0].replace(J[0], '<font color="' + n.currentEditBarTextColor + '">$&</font>') + e.substring(1, J.length);
    window.devicePixelRatio && window.devicePixelRatio;
    d.strokeStyle = n.penColor, d.lineWidth = u, d.lineCap = "round", d.lineJoin = "round", d.shadowBlur = 5, O.onclick = function () {
        a()
    }, Q.onclick = function () {
        r()
    }, j.onclick = function () {
        l()
    }, document.body.onselectstart = document.body.oncontextmenu = function () {
        return !1
    }, "ontouchstart" in document.documentElement ? (U.ontouchstart = function (e) {
            null != N && clearInterval(N), f = !0, w = !0
        }, U.ontouchmove = function (e) {
            if (f) {
                var t = JQuery_Capable.offset(e.target);
                void 0 !== e.targetTouches ? (y = Math.floor(e.targetTouches[0].pageX - t.left), I = Math.floor(e.targetTouches[0].pageY - t.top)) : (y = Math.floor(e.pageX - t.left), I = Math.floor(e.pageY - t.top));
                var n = e.timeStamp;
                0 !== B || isNaN(n) || (L = n), y > 0 && I <= U.height && (isNaN(n) ? E += y + "," + I + "," + u + ",0\n" : E += y + "," + I + "," + u + "," + (n - L) + "\n", B += 1, y > p && (p = y), y < v && (v = y), I > _ && (_ = I), I < T && (T = I), C.push({
                    x: y,
                    y: I
                }), z(), M.push({x: y, y: I}), y > 0 && I > 0 && x.push(y, I), b = y, H = I), preventDefault(e)
            }
        }, U.ontouchend = function (t) {
            if (f) {
                var r = t.timeStamp;
                isNaN(r) ? E += "0,0,-1,0\n" : E += "0,0,-1," + (r - L) + "\n", B += 1, x.push("-1", "0");
                var l = document.getElementById("comment_canvas");
                l.getContext("2d").drawImage(U, 0, 0);
                var a = document.getElementById("signTitle");
                S >= J.length ? (alert("已签署完毕！"), a.innerHTML = "", w = !1, d.clearRect(0, 0, U.width, U.height)) : M.length > 10 && (N = setInterval(function () {
                        if (x.push("-1", "-1"), n.isdistinguish && !checkText(J[S])) {
                            var t = function (t, r) {
                                if (closeWindow(), 0 == t) {
                                    if (r) {
                                        ++S == J.length ? (a.innerHTML = "", X.innerHTML = "已签署完毕！", X.style.color = "Red", clearInterval(N)) : (n.isShowBgText && (a.innerHTML = J[S]), X.innerHTML = e, X.innerHTML = e.substring(0, S) + J[S].replace(J[S], '<font color="' + n.currentEditBarTextColor + '">$&</font>') + e.substring(S + 1, J.length));
                                        var c = document.createElement("img");
                                        if (c.id = "img" + S, c.width = n.mass_word_width, c.height = n.mass_word_height, checkText(J[S - 1])) c.src = l.toDataURL("image/png"); else {
                                            var s, g = p - v, m = _ - T, u = (p + v) / 2, f = (_ + T) / 2;
                                            s = g < 20 && m < 20 ? n.mass_word_width : g > m ? g / 2 : m / 2, h = U.getContext("2d").getImageData(u - s - 10, f - s - 10, 2 * (s + 10), 2 * (s + 10));
                                            var w = i();
                                            c.src = w
                                        }
                                        D[S - 1] = c, Y.appendChild(c), Y.scrollTop = Y.scrollHeight, d.clearRect(0, 0, U.width, U.height), v = 9999, T = 9999, p = 0, _ = 0, x = [], null != N && clearInterval(N)
                                    }
                                } else d.clearRect(0, 0, U.width, U.height), v = 9999, T = 9999, p = 0, _ = 0, x = [], clearInterval(N);
                                null == o ? console.log("the identify callback is not definition") : "请求超时" != t && o(t)
                            };
                            showProgress("正在识别，请稍候。。。"), new OCRObj(n.ocrCapture).recognition(x, J[S], t), w = !1, clearInterval(N)
                        } else {
                            ++S == J.length ? (a.innerHTML = "", X.innerHTML = "已签署完毕！", X.style.color = "Red", clearInterval(N)) : (n.isShowBgText && (a.innerHTML = J[S]), X.innerHTML = e, X.innerHTML = e.substring(0, S) + J[S].replace(J[S], '<font color="' + n.currentEditBarTextColor + '">$&</font>') + e.substring(S + 1, J.length));
                            var r = document.createElement("img");
                            if (r.id = "img" + S, r.width = n.mass_word_width, r.height = n.mass_word_height, checkText(J[S - 1])) r.src = l.toDataURL("image/png"); else {
                                var c, s = p - v, g = _ - T, m = (p + v) / 2, u = (_ + T) / 2;
                                c = s < 20 && g < 20 ? n.mass_word_width : s > g ? s / 2 : g / 2, h = U.getContext("2d").getImageData(m - c - 10, u - c - 10, 2 * (c + 10), 2 * (c + 10));
                                var f = i();
                                r.src = f
                            }
                            D[S - 1] = r, Y.appendChild(r), Y.scrollTop = Y.scrollHeight, d.clearRect(0, 0, U.width, U.height), v = 9999, T = 9999, p = 0, _ = 0, f = null, w = !1, clearInterval(N)
                        }
                    }, 1e3))
            }
            f = !1, C = []
        }, U.ontouchcancel = U.ontouchend) : (U.onmousedown = function (e) {
            null != N && clearInterval(N), f = !0, w = !0
        }, U.onmousemove = function (e) {
            if (f) {
                var t = JQuery_Capable.offset(e.target), n = document.body.scrollTop | document.documentElement.scrollTop, o = document.body.scrollLeft | document.documentElement.scrollLeft;
                void 0 !== e.targetTouches ? (y = Math.floor(e.targetTouches[0].clientX - t.left), I = Math.floor(e.targetTouches[0].clientY - t.top)) : (y = Math.floor(e.clientX - t.left), I = Math.floor(e.clientY - t.top));
                var i = e.timeStamp;
                0 !== B || isNaN(i) || (L = i), y > 0 && (isNaN(i) ? E += y + "," + I + "," + u + ",0\n" : E += y + "," + I + "," + u + "," + (i - L) + "\n", B += 1, I += n, (y += o) > p && (p = y), y < v && (v = y), I > _ && (_ = I), I < T && (T = I), C.push({
                    x: y,
                    y: I
                }), z(), M.push({x: y, y: I}), y > 0 && I > 0 && x.push(y, I), b = y, H = I), preventDefault(e)
            }
        }, U.onmouseup = function (t) {
            if (f) {
                f = !1;
                var r = JQuery_Capable.offset(t.target);
                void 0 !== t.targetTouches ? (y = Math.floor(t.targetTouches[0].clientX - r.left), I = Math.floor(t.targetTouches[0].clientY - r.top)) : (y = Math.floor(t.clientX - r.left), I = Math.floor(t.clientY - r.top));
                var l = t.timeStamp;
                isNaN(l) ? E += "0,0,-1,0\n" : E += "0,0,-1," + (l - L) + "\n", B += 1, x.push("-1", "0");
                var a = document.getElementById("comment_canvas");
                a.getContext("2d").drawImage(U, 0, 0);
                var c = document.getElementById("signTitle");
                S >= J.length ? (alert("已签署完毕！"), c.innerHTML = "", d.clearRect(0, 0, U.width, U.height), w = !1) : M.length > 10 && (N = setInterval(function () {
                        if (x.push("-1", "-1"), n.isdistinguish && !checkText(J[S])) {
                            var t = function (t, r) {
                                if (closeWindow(), 0 == t) {
                                    if (r) {
                                        ++S == J.length ? (c.innerHTML = "", X.innerHTML = "已签署完毕！", X.style.color = "Red", clearInterval(N)) : (n.isShowBgText && (c.innerHTML = J[S]), X.innerHTML = e, X.innerHTML = e.substring(0, S) + J[S].replace(J[S], '<font color="' + n.currentEditBarTextColor + '">$&</font>') + e.substring(S + 1, J.length));
                                        var l = document.createElement("img");
                                        if (l.id = "img" + S, l.width = n.mass_word_width, l.height = n.mass_word_height, checkText(J[S - 1])) l.src = a.toDataURL("image/png"); else {
                                            var s, g = p - v, m = _ - T, u = (p + v) / 2, f = (_ + T) / 2;
                                            s = g < 20 && m < 20 ? n.mass_word_width : g > m ? g / 2 : m / 2, h = U.getContext("2d").getImageData(u - s - 10, f - s - 10, 2 * (s + 10), 2 * (s + 10));
                                            var w = i();
                                            l.src = w
                                        }
                                        D[S - 1] = l, Y.appendChild(l), Y.scrollTop = Y.scrollHeight, d.clearRect(0, 0, U.width, U.height), v = 9999, T = 9999, p = 0, _ = 0, x = [], null != N && clearInterval(N)
                                    }
                                } else d.clearRect(0, 0, U.width, U.height), v = 9999, T = 9999, p = 0, _ = 0, x = [], clearInterval(N);
                                null == o ? console.log("the identify callback is not definition") : "请求超时" != t && o(t)
                            };
                            showProgress("正在识别，请稍候。。。"), new OCRObj(n.ocrCapture).recognition(x, J[S], t), w = !1, clearInterval(N)
                        } else {
                            ++S == J.length ? (c.innerHTML = "", X.innerHTML = "已签署完毕！", X.style.color = "Red", clearInterval(N)) : (n.isShowBgText && (c.innerHTML = J[S]), X.innerHTML = e, X.innerHTML = e.substring(0, S) + J[S].replace(J[S], '<font color="' + n.currentEditBarTextColor + '">$&</font>') + e.substring(S + 1, J.length));
                            var r = document.createElement("img");
                            if (r.id = "img" + S, r.width = n.mass_word_width, r.height = n.mass_word_height, checkText(J[S - 1])) r.src = a.toDataURL("image/png"); else {
                                var l, s = p - v, g = _ - T, m = (p + v) / 2, u = (_ + T) / 2;
                                l = s < 20 && g < 20 ? n.mass_word_width : s > g ? s / 2 : g / 2, h = U.getContext("2d").getImageData(m - l - 10, u - l - 10, 2 * (l + 10), 2 * (l + 10));
                                var f = i();
                                r.src = f
                            }
                            D[S - 1] = r, Y.appendChild(r), Y.scrollTop = Y.scrollHeight, d.clearRect(0, 0, U.width, U.height), v = 9999, T = 9999, p = 0, _ = 0, f = null, w = !1, clearInterval(N)
                        }
                    }, 1e3)), f = !1, C = []
            }
        }, U.onmouseout = U.onmouseup);
    var z = function () {
        if (C.length < 3) {
            var e = C[0];
            return d.beginPath(), d.strokeStyle = n.penColor, d.fillStyle = n.penColor, d.arc(e.x, e.y, d.lineWidth / 2, 0, 2 * Math.PI, !0), d.fill(), void d.closePath()
        }
        d.clearRect(0, 0, d.width, d.height), d.beginPath(), d.strokeStyle = n.penColor, d.fillStyle = n.penColor, d.moveTo(C[0].x, C[0].y);
        for (var t = 1; t < C.length - 2; t++) {
            var o = (C[t].x + C[t + 1].x) / 2, i = (C[t].y + C[t + 1].y) / 2;
            d.quadraticCurveTo(C[t].x, C[t].y, o, i)
        }
        d.stroke()
    }, A = [];
    window.addEventListener("resize", function () {
        null != N && clearInterval(N);
        var t = document.getElementById("signTitle");
        X.innerHTML = e.substring(0, S) + J[S].replace(J[S], '<font color="' + n.currentEditBarTextColor + '">$&</font>') + e.substring(S + 1, J.length), n.isShowBgText && (S >= J.length ? t.innerHTML = "" : t.innerHTML = J[S]), d.strokeStyle = n.penColor, d.lineWidth = u, d.lineCap = "round", d.lineJoin = "round", d.shadowBlur = 5
    }), window.addEventListener("orientationchange", function () {
        null != N && clearInterval(N);
        document.getElementById("signTitle");
        X.innerHTML = e.substring(0, S) + J[S].replace(J[S], '<font color="' + n.currentEditBarTextColor + '">$&</font>') + e.substring(S + 1, J.length), d.strokeStyle = n.penColor, d.lineWidth = u, d.lineCap = "round", d.lineJoin = "round", d.shadowBlur = 5
    })
}
function BigInteger(t, r, n) {
    null != t && ("number" == typeof t ? this.fromNumber(t, r, n) : null == r && "string" != typeof t ? this.fromString(t, 256) : this.fromString(t, r))
}
function nbi() {
    return new BigInteger(null)
}
function am1(t, r, n, i, e, o) {
    for (; --o >= 0;) {
        var s = r * this[t++] + n[i] + e;
        e = Math.floor(s / 67108864), n[i++] = 67108863 & s
    }
    return e
}
function am2(t, r, n, i, e, o) {
    for (var s = 32767 & r, p = r >> 15; --o >= 0;) {
        var h = 32767 & this[t], a = this[t++] >> 15, u = p * h + a * s;
        e = ((h = s * h + ((32767 & u) << 15) + n[i] + (1073741823 & e)) >>> 30) + (u >>> 15) + p * a + (e >>> 30), n[i++] = 1073741823 & h
    }
    return e
}
function am3(t, r, n, i, e, o) {
    for (var s = 16383 & r, p = r >> 14; --o >= 0;) {
        var h = 16383 & this[t], a = this[t++] >> 14, u = p * h + a * s;
        e = ((h = s * h + ((16383 & u) << 14) + n[i] + e) >> 28) + (u >> 14) + p * a, n[i++] = 268435455 & h
    }
    return e
}
function int2char(t) {
    return BI_RM.charAt(t)
}
function intAt(t, r) {
    var n = BI_RC[t.charCodeAt(r)];
    return null == n ? -1 : n
}
function bnpCopyTo(t) {
    for (var r = this.t - 1; r >= 0; --r)t[r] = this[r];
    t.t = this.t, t.s = this.s
}
function bnpFromInt(t) {
    this.t = 1, this.s = t < 0 ? -1 : 0, t > 0 ? this[0] = t : t < -1 ? this[0] = t + this.DV : this.t = 0
}
function nbv(t) {
    var r = nbi();
    return r.fromInt(t), r
}
function bnpFromString(t, r) {
    var n;
    if (16 == r) n = 4; else if (8 == r) n = 3; else if (256 == r) n = 8; else if (2 == r) n = 1; else if (32 == r) n = 5; else {
        if (4 != r)return void this.fromRadix(t, r);
        n = 2
    }
    this.t = 0, this.s = 0;
    for (var i = t.length, e = !1, o = 0; --i >= 0;) {
        var s = 8 == n ? 255 & t[i] : intAt(t, i);
        s < 0 ? "-" == t.charAt(i) && (e = !0) : (e = !1, 0 == o ? this[this.t++] = s : o + n > this.DB ? (this[this.t - 1] |= (s & (1 << this.DB - o) - 1) << o, this[this.t++] = s >> this.DB - o) : this[this.t - 1] |= s << o, (o += n) >= this.DB && (o -= this.DB))
    }
    8 == n && 0 != (128 & t[0]) && (this.s = -1, o > 0 && (this[this.t - 1] |= (1 << this.DB - o) - 1 << o)), this.clamp(), e && BigInteger.ZERO.subTo(this, this)
}
function bnpClamp() {
    for (var t = this.s & this.DM; this.t > 0 && this[this.t - 1] == t;)--this.t
}
function bnToString(t) {
    if (this.s < 0)return "-" + this.negate().toString(t);
    var r;
    if (16 == t) r = 4; else if (8 == t) r = 3; else if (2 == t) r = 1; else if (32 == t) r = 5; else {
        if (4 != t)return this.toRadix(t);
        r = 2
    }
    var n, i = (1 << r) - 1, e = !1, o = "", s = this.t, p = this.DB - s * this.DB % r;
    if (s-- > 0)for (p < this.DB && (n = this[s] >> p) > 0 && (e = !0, o = int2char(n)); s >= 0;)p < r ? (n = (this[s] & (1 << p) - 1) << r - p, n |= this[--s] >> (p += this.DB - r)) : (n = this[s] >> (p -= r) & i, p <= 0 && (p += this.DB, --s)), n > 0 && (e = !0), e && (o += int2char(n));
    return e ? o : "0"
}
function bnNegate() {
    var t = nbi();
    return BigInteger.ZERO.subTo(this, t), t
}
function bnAbs() {
    return this.s < 0 ? this.negate() : this
}
function bnCompareTo(t) {
    var r = this.s - t.s;
    if (0 != r)return r;
    var n = this.t;
    if (0 != (r = n - t.t))return this.s < 0 ? -r : r;
    for (; --n >= 0;)if (0 != (r = this[n] - t[n]))return r;
    return 0
}
function nbits(t) {
    var r, n = 1;
    return 0 != (r = t >>> 16) && (t = r, n += 16), 0 != (r = t >> 8) && (t = r, n += 8), 0 != (r = t >> 4) && (t = r, n += 4), 0 != (r = t >> 2) && (t = r, n += 2), 0 != (r = t >> 1) && (t = r, n += 1), n
}
function bnBitLength() {
    return this.t <= 0 ? 0 : this.DB * (this.t - 1) + nbits(this[this.t - 1] ^ this.s & this.DM)
}
function bnpDLShiftTo(t, r) {
    var n;
    for (n = this.t - 1; n >= 0; --n)r[n + t] = this[n];
    for (n = t - 1; n >= 0; --n)r[n] = 0;
    r.t = this.t + t, r.s = this.s
}
function bnpDRShiftTo(t, r) {
    for (var n = t; n < this.t; ++n)r[n - t] = this[n];
    r.t = Math.max(this.t - t, 0), r.s = this.s
}
function bnpLShiftTo(t, r) {
    var n, i = t % this.DB, e = this.DB - i, o = (1 << e) - 1, s = Math.floor(t / this.DB), p = this.s << i & this.DM;
    for (n = this.t - 1; n >= 0; --n)r[n + s + 1] = this[n] >> e | p, p = (this[n] & o) << i;
    for (n = s - 1; n >= 0; --n)r[n] = 0;
    r[s] = p, r.t = this.t + s + 1, r.s = this.s, r.clamp()
}
function bnpRShiftTo(t, r) {
    r.s = this.s;
    var n = Math.floor(t / this.DB);
    if (n >= this.t) r.t = 0; else {
        var i = t % this.DB, e = this.DB - i, o = (1 << i) - 1;
        r[0] = this[n] >> i;
        for (var s = n + 1; s < this.t; ++s)r[s - n - 1] |= (this[s] & o) << e, r[s - n] = this[s] >> i;
        i > 0 && (r[this.t - n - 1] |= (this.s & o) << e), r.t = this.t - n, r.clamp()
    }
}
function bnpSubTo(t, r) {
    for (var n = 0, i = 0, e = Math.min(t.t, this.t); n < e;)i += this[n] - t[n], r[n++] = i & this.DM, i >>= this.DB;
    if (t.t < this.t) {
        for (i -= t.s; n < this.t;)i += this[n], r[n++] = i & this.DM, i >>= this.DB;
        i += this.s
    } else {
        for (i += this.s; n < t.t;)i -= t[n], r[n++] = i & this.DM, i >>= this.DB;
        i -= t.s
    }
    r.s = i < 0 ? -1 : 0, i < -1 ? r[n++] = this.DV + i : i > 0 && (r[n++] = i), r.t = n, r.clamp()
}
function bnpMultiplyTo(t, r) {
    var n = this.abs(), i = t.abs(), e = n.t;
    for (r.t = e + i.t; --e >= 0;)r[e] = 0;
    for (e = 0; e < i.t; ++e)r[e + n.t] = n.am(0, i[e], r, e, 0, n.t);
    r.s = 0, r.clamp(), this.s != t.s && BigInteger.ZERO.subTo(r, r)
}
function bnpSquareTo(t) {
    for (var r = this.abs(), n = t.t = 2 * r.t; --n >= 0;)t[n] = 0;
    for (n = 0; n < r.t - 1; ++n) {
        var i = r.am(n, r[n], t, 2 * n, 0, 1);
        (t[n + r.t] += r.am(n + 1, 2 * r[n], t, 2 * n + 1, i, r.t - n - 1)) >= r.DV && (t[n + r.t] -= r.DV, t[n + r.t + 1] = 1)
    }
    t.t > 0 && (t[t.t - 1] += r.am(n, r[n], t, 2 * n, 0, 1)), t.s = 0, t.clamp()
}
function bnpDivRemTo(t, r, n) {
    var i = t.abs();
    if (!(i.t <= 0)) {
        var e = this.abs();
        if (e.t < i.t)return null != r && r.fromInt(0), void(null != n && this.copyTo(n));
        null == n && (n = nbi());
        var o = nbi(), s = this.s, p = t.s, h = this.DB - nbits(i[i.t - 1]);
        h > 0 ? (i.lShiftTo(h, o), e.lShiftTo(h, n)) : (i.copyTo(o), e.copyTo(n));
        var a = o.t, u = o[a - 1];
        if (0 != u) {
            var g = u * (1 << this.F1) + (a > 1 ? o[a - 2] >> this.F2 : 0), f = this.FV / g, c = (1 << this.F1) / g, l = 1 << this.F2, b = n.t, y = b - a, v = null == r ? nbi() : r;
            for (o.dlShiftTo(y, v), n.compareTo(v) >= 0 && (n[n.t++] = 1, n.subTo(v, n)), BigInteger.ONE.dlShiftTo(a, v), v.subTo(o, o); o.t < a;)o[o.t++] = 0;
            for (; --y >= 0;) {
                var m = n[--b] == u ? this.DM : Math.floor(n[b] * f + (n[b - 1] + l) * c);
                if ((n[b] += o.am(0, m, n, y, 0, a)) < m)for (o.dlShiftTo(y, v), n.subTo(v, n); n[b] < --m;)n.subTo(v, n)
            }
            null != r && (n.drShiftTo(a, r), s != p && BigInteger.ZERO.subTo(r, r)), n.t = a, n.clamp(), h > 0 && n.rShiftTo(h, n), s < 0 && BigInteger.ZERO.subTo(n, n)
        }
    }
}
function bnMod(t) {
    var r = nbi();
    return this.abs().divRemTo(t, null, r), this.s < 0 && r.compareTo(BigInteger.ZERO) > 0 && t.subTo(r, r), r
}
function Classic(t) {
    this.m = t
}
function cConvert(t) {
    return t.s < 0 || t.compareTo(this.m) >= 0 ? t.mod(this.m) : t
}
function cRevert(t) {
    return t
}
function cReduce(t) {
    t.divRemTo(this.m, null, t)
}
function cMulTo(t, r, n) {
    t.multiplyTo(r, n), this.reduce(n)
}
function cSqrTo(t, r) {
    t.squareTo(r), this.reduce(r)
}
function bnpInvDigit() {
    if (this.t < 1)return 0;
    var t = this[0];
    if (0 == (1 & t))return 0;
    var r = 3 & t;
    return r = r * (2 - (15 & t) * r) & 15, r = r * (2 - (255 & t) * r) & 255, r = r * (2 - ((65535 & t) * r & 65535)) & 65535, r = r * (2 - t * r % this.DV) % this.DV, r > 0 ? this.DV - r : -r
}
function Montgomery(t) {
    this.m = t, this.mp = t.invDigit(), this.mpl = 32767 & this.mp, this.mph = this.mp >> 15, this.um = (1 << t.DB - 15) - 1, this.mt2 = 2 * t.t
}
function montConvert(t) {
    var r = nbi();
    return t.abs().dlShiftTo(this.m.t, r), r.divRemTo(this.m, null, r), t.s < 0 && r.compareTo(BigInteger.ZERO) > 0 && this.m.subTo(r, r), r
}
function montRevert(t) {
    var r = nbi();
    return t.copyTo(r), this.reduce(r), r
}
function montReduce(t) {
    for (; t.t <= this.mt2;)t[t.t++] = 0;
    for (var r = 0; r < this.m.t; ++r) {
        var n = 32767 & t[r], i = n * this.mpl + ((n * this.mph + (t[r] >> 15) * this.mpl & this.um) << 15) & t.DM;
        for (t[n = r + this.m.t] += this.m.am(0, i, t, r, 0, this.m.t); t[n] >= t.DV;)t[n] -= t.DV, t[++n]++
    }
    t.clamp(), t.drShiftTo(this.m.t, t), t.compareTo(this.m) >= 0 && t.subTo(this.m, t)
}
function montSqrTo(t, r) {
    t.squareTo(r), this.reduce(r)
}
function montMulTo(t, r, n) {
    t.multiplyTo(r, n), this.reduce(n)
}
function bnpIsEven() {
    return 0 == (this.t > 0 ? 1 & this[0] : this.s)
}
function bnpExp(t, r) {
    if (t > 4294967295 || t < 1)return BigInteger.ONE;
    var n = nbi(), i = nbi(), e = r.convert(this), o = nbits(t) - 1;
    for (e.copyTo(n); --o >= 0;)if (r.sqrTo(n, i), (t & 1 << o) > 0) r.mulTo(i, e, n); else {
        var s = n;
        n = i, i = s
    }
    return r.revert(n)
}
function bnModPowInt(t, r) {
    var n;
    return n = t < 256 || r.isEven() ? new Classic(r) : new Montgomery(r), this.exp(t, n)
}
function Arcfour() {
    this.i = 0, this.j = 0, this.S = new Array
}
function ARC4init(t) {
    var r, n, i;
    for (r = 0; r < 256; ++r)this.S[r] = r;
    for (n = 0, r = 0; r < 256; ++r)n = n + this.S[r] + t[r % t.length] & 255, i = this.S[r], this.S[r] = this.S[n], this.S[n] = i;
    this.i = 0, this.j = 0
}
function ARC4next() {
    var t;
    return this.i = this.i + 1 & 255, this.j = this.j + this.S[this.i] & 255, t = this.S[this.i], this.S[this.i] = this.S[this.j], this.S[this.j] = t, this.S[t + this.S[this.i] & 255]
}
function prng_newstate() {
    return new Arcfour
}
function rng_seed_int(t) {
    rng_pool[rng_pptr++] ^= 255 & t, rng_pool[rng_pptr++] ^= t >> 8 & 255, rng_pool[rng_pptr++] ^= t >> 16 & 255, rng_pool[rng_pptr++] ^= t >> 24 & 255, rng_pptr >= rng_psize && (rng_pptr -= rng_psize)
}
function rng_seed_time() {
    rng_seed_int((new Date).getTime())
}
function rng_get_byte() {
    if (null == rng_state) {
        for (rng_seed_time(), (rng_state = prng_newstate()).init(rng_pool), rng_pptr = 0; rng_pptr < rng_pool.length; ++rng_pptr)rng_pool[rng_pptr] = 0;
        rng_pptr = 0
    }
    return rng_state.next()
}
function rng_get_bytes(t) {
    var r;
    for (r = 0; r < t.length; ++r)t[r] = rng_get_byte()
}
function SecureRandom() {
}
function parseBigInt(t, r) {
    return new BigInteger(t, r)
}
function linebrk(t, r) {
    for (var n = "", i = 0; i + r < t.length;)n += t.substring(i, i + r) + "\n", i += r;
    return n + t.substring(i, t.length)
}
function byte2Hex(t) {
    return t < 16 ? "0" + t.toString(16) : t.toString(16)
}
function pkcs1pad2(t, r) {
    if (r < t.length + 11)return alert("Message too long for RSA"), null;
    for (var n = new Array, i = t.length - 1; i >= 0 && r > 0;) {
        var e = t.charCodeAt(i--);
        e < 128 ? n[--r] = e : e > 127 && e < 2048 ? (n[--r] = 63 & e | 128, n[--r] = e >> 6 | 192) : (n[--r] = 63 & e | 128, n[--r] = e >> 6 & 63 | 128, n[--r] = e >> 12 | 224)
    }
    n[--r] = 0;
    for (var o = new SecureRandom, s = new Array; r > 2;) {
        for (s[0] = 0; 0 == s[0];)o.nextBytes(s);
        n[--r] = s[0]
    }
    return n[--r] = 2, n[--r] = 0, new BigInteger(n)
}
function pkcs1pad2Uint8(t, r) {
    if (r < t.length + 11)return alert("Message too long for RSA"), null;
    for (var n = new Array, i = t.length - 1; i >= 0 && r > 0;) {
        var e = t[i--];
        n[--r] = e
    }
    n[--r] = 0;
    for (var o = new SecureRandom, s = new Array; r > 2;) {
        for (s[0] = 0; 0 == s[0];)o.nextBytes(s);
        n[--r] = s[0]
    }
    return n[--r] = 2, n[--r] = 0, new BigInteger(n)
}
function RSAKey() {
    this.n = null, this.e = 0, this.d = null, this.p = null, this.q = null, this.dmp1 = null, this.dmq1 = null, this.coeff = null
}
function RSASetPublic(t, r) {
    null != t && null != r && t.length > 0 && r.length > 0 ? (this.n = parseBigInt(t, 16), this.e = parseInt(r, 16)) : alert("Invalid RSA public key")
}
function RSADoPublic(t) {
    return t.modPowInt(this.e, this.n)
}
function RSAEncrypt(t) {
    var r = pkcs1pad2(t, this.n.bitLength() + 7 >> 3);
    if (null == r)return null;
    var n = this.doPublic(r);
    if (null == n)return null;
    var i = n.toString(16);
    return 0 == (1 & i.length) ? i : "0" + i
}
function RSAUint8ArrayEncrypt(t) {
    var r = pkcs1pad2Uint8(t, this.n.bitLength() + 7 >> 3);
    if (null == r)return null;
    var n = this.doPublic(r);
    if (null == n)return null;
    var i = n.toString(16);
    return 0 == (1 & i.length) ? i : "0" + i
}
function aesEncrypt(t, r) {
    var n = CryptoJS.enc.Hex.parse(r);
    return CryptoJS.AES.encrypt(t, n)
}
function tripleDesEncrypt(t, r) {
    var n = CryptoJS.enc.Hex.parse(r);
    return CryptoJS.TripleDES.encrypt(t, n, {mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7})
}
function tripleDesDecrypt(t, r) {
    var n = CryptoJS.enc.Hex.parse(r);
    return CryptoJS.TripleDES.decrypt(t, n, {mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7})
}
function sha1DigestBase64(t) {
    var Base64 = {encodeUint8Array: function (r) {
        for (var e, t = 0, n = r.length, o = "", a = ""; t < n;) {
            for (var i = 0, c = (e = r.subarray(t, Math.min(t + 32768, n))).length; i < c; i++)a += String.fromCharCode(e[i]);
            o += a, t += 32768, a = ""
        }
        return btoa(o)
    }}
    return Base64.encodeUint8Array(anysign.hex.hexStrToUint8Array(CryptoJS.SHA1(t) + ""))
}
function sha1Digest(t) {
    return CryptoJS.SHA1(t)
}
function md5Digest(t) {
    return CryptoJS.MD5(t)
}
function rsaPubkeyEnc(t, r, n) {
    var i = new RSAKey;
    i.setPublic(t, r);
    var e = i.encrypt(n), o = anysign.hex.hexStrToUint8Array(e);
    var Base64 = {encodeUint8Array: function (r) {
        for (var e, t = 0, n = r.length, o = "", a = ""; t < n;) {
            for (var i = 0, c = (e = r.subarray(t, Math.min(t + 32768, n))).length; i < c; i++)a += String.fromCharCode(e[i]);
            o += a, t += 32768, a = ""
        }
        return btoa(o)
    }}
    return Base64.encodeUint8Array(o)
}
function rsaPubkeyUint8Enc(t, r, n) {
    var i = new RSAKey;
    i.setPublic(t, r);
    var e = i.encryptUint8(n), o = anysign.hex.hexStrToUint8Array(e);
    var Base64 = {encodeUint8Array: function (r) {
        for (var e, t = 0, n = r.length, o = "", a = ""; t < n;) {
            for (var i = 0, c = (e = r.subarray(t, Math.min(t + 32768, n))).length; i < c; i++)a += String.fromCharCode(e[i]);
            o += a, t += 32768, a = ""
        }
        return btoa(o)
    }}
    return Base64.encodeUint8Array(o)
}
function rsaPubkeyEncByDefault(t) {
    return rsaPubkeyEnc(pubN, pubE, t)
}
function rsaPubkeyUint8EncByDefault(t) {
    return rsaPubkeyUint8Enc(pubN, pubE, t)
}
var dbits, canary = 0xdeadbeefcafe, j_lm = 15715070 == (16777215 & canary);
j_lm && "Microsoft Internet Explorer" == navigator.appName ? (BigInteger.prototype.am = am2, dbits = 30) : j_lm && "Netscape" != navigator.appName ? (BigInteger.prototype.am = am1, dbits = 26) : (BigInteger.prototype.am = am3, dbits = 28), BigInteger.prototype.DB = dbits, BigInteger.prototype.DM = (1 << dbits) - 1, BigInteger.prototype.DV = 1 << dbits;
var BI_FP = 52;
BigInteger.prototype.FV = Math.pow(2, BI_FP), BigInteger.prototype.F1 = BI_FP - dbits, BigInteger.prototype.F2 = 2 * dbits - BI_FP;
var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz", BI_RC = new Array, rr, vv;
for (rr = "0".charCodeAt(0), vv = 0; vv <= 9; ++vv)BI_RC[rr++] = vv;
for (rr = "a".charCodeAt(0), vv = 10; vv < 36; ++vv)BI_RC[rr++] = vv;
for (rr = "A".charCodeAt(0), vv = 10; vv < 36; ++vv)BI_RC[rr++] = vv;
Classic.prototype.convert = cConvert, Classic.prototype.revert = cRevert, Classic.prototype.reduce = cReduce, Classic.prototype.mulTo = cMulTo, Classic.prototype.sqrTo = cSqrTo, Montgomery.prototype.convert = montConvert, Montgomery.prototype.revert = montRevert, Montgomery.prototype.reduce = montReduce, Montgomery.prototype.mulTo = montMulTo, Montgomery.prototype.sqrTo = montSqrTo, BigInteger.prototype.copyTo = bnpCopyTo, BigInteger.prototype.fromInt = bnpFromInt, BigInteger.prototype.fromString = bnpFromString, BigInteger.prototype.clamp = bnpClamp, BigInteger.prototype.dlShiftTo = bnpDLShiftTo, BigInteger.prototype.drShiftTo = bnpDRShiftTo, BigInteger.prototype.lShiftTo = bnpLShiftTo, BigInteger.prototype.rShiftTo = bnpRShiftTo, BigInteger.prototype.subTo = bnpSubTo, BigInteger.prototype.multiplyTo = bnpMultiplyTo, BigInteger.prototype.squareTo = bnpSquareTo, BigInteger.prototype.divRemTo = bnpDivRemTo, BigInteger.prototype.invDigit = bnpInvDigit, BigInteger.prototype.isEven = bnpIsEven, BigInteger.prototype.exp = bnpExp, BigInteger.prototype.toString = bnToString, BigInteger.prototype.negate = bnNegate, BigInteger.prototype.abs = bnAbs, BigInteger.prototype.compareTo = bnCompareTo, BigInteger.prototype.bitLength = bnBitLength, BigInteger.prototype.mod = bnMod, BigInteger.prototype.modPowInt = bnModPowInt, BigInteger.ZERO = nbv(0), BigInteger.ONE = nbv(1), Arcfour.prototype.init = ARC4init, Arcfour.prototype.next = ARC4next;
var rng_psize = 256, rng_state, rng_pool, rng_pptr;
if (null == rng_pool) {
    rng_pool = new Array, rng_pptr = 0;
    var t;
    if (window.crypto && window.crypto.getRandomValues) {
        var ua = new Uint8Array(32);
        for (window.crypto.getRandomValues(ua), t = 0; t < 32; ++t)rng_pool[rng_pptr++] = ua[t]
    }
    if ("Netscape" == navigator.appName && navigator.appVersion < "5" && window.crypto) {
        var z = window.crypto.random(32);
        for (t = 0; t < z.length; ++t)rng_pool[rng_pptr++] = 255 & z.charCodeAt(t)
    }
    for (; rng_pptr < rng_psize;)t = Math.floor(65536 * Math.random()), rng_pool[rng_pptr++] = t >>> 8, rng_pool[rng_pptr++] = 255 & t;
    rng_pptr = 0, rng_seed_time()
}
SecureRandom.prototype.nextBytes = rng_get_bytes, RSAKey.prototype.doPublic = RSADoPublic, RSAKey.prototype.setPublic = RSASetPublic, RSAKey.prototype.encrypt = RSAEncrypt, RSAKey.prototype.encryptUint8 = RSAUint8ArrayEncrypt;
var pubN = "9d0eff07c47a27a898c18fc89fd25b21898885b5a97054e81684e22bf13cd8725e7ff03ba2f8c1ad8c998952a30a65ff61ecbdb042661b8813e7a936de3474a51eb8a05458f7b357d95bb4f55741380403c1148108dfab4399af45d351deebaabffff552c10c6cd1599bc87642d37af5d474138a37fb60cdb7dcb3dbb9872a29", pubE = "10001", encCertSN = "980990000019ecf6a";
var anysign = anysign && {
        logger: {
            openLog: !1, e: function (n) {
                anysign.logger.openLog && console.log("anysign error:" + n)
            }, w: function (n) {
                anysign.logger.openLog && console.log("anysign warning:" + n)
            }
        }
    };
var Base64 = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encodeUint8Array: function (r) {
        for (var e, t = 0, n = r.length, o = "", a = ""; t < n;) {
            for (var i = 0, c = (e = r.subarray(t, Math.min(t + 32768, n))).length; i < c; i++)a += String.fromCharCode(e[i]);
            o += a, t += 32768, a = ""
        }
        return btoa(o)
    },
    decodeUint8ArrayB64: function (r) {
        return new Uint8Array(atob(r).split("").map(function (r) {
            return r.charCodeAt(0)
        }))
    },
    encode: function (r) {
        var e, t, n, o, a, i, c, f = "", u = 0;
        for (r = Base64._utf8_encode(r); u < r.length;)o = (e = r.charCodeAt(u++)) >> 2, a = (3 & e) << 4 | (t = r.charCodeAt(u++)) >> 4, i = (15 & t) << 2 | (n = r.charCodeAt(u++)) >> 6, c = 63 & n, isNaN(t) ? i = c = 64 : isNaN(n) && (c = 64), f = f + this._keyStr.charAt(o) + this._keyStr.charAt(a) + this._keyStr.charAt(i) + this._keyStr.charAt(c);
        return f
    },
    decode: function (r) {
        var e, t, n, o, a, i, c = "", f = 0;
        for (r = r.replace(/[^A-Za-z0-9\+\/\=]/g, ""); f < r.length;)e = this._keyStr.indexOf(r.charAt(f++)) << 2 | (o = this._keyStr.indexOf(r.charAt(f++))) >> 4, t = (15 & o) << 4 | (a = this._keyStr.indexOf(r.charAt(f++))) >> 2, n = (3 & a) << 6 | (i = this._keyStr.indexOf(r.charAt(f++))), c += String.fromCharCode(e), 64 != a && (c += String.fromCharCode(t)), 64 != i && (c += String.fromCharCode(n));
        return c = Base64._utf8_decode(c)
    },
    _utf8_encode: function (r) {
        r = r.replace(/\r\n/g, "\n");
        for (var e = "", t = 0; t < r.length; t++) {
            var n = r.charCodeAt(t);
            n < 128 ? e += String.fromCharCode(n) : n > 127 && n < 2048 ? (e += String.fromCharCode(n >> 6 | 192), e += String.fromCharCode(63 & n | 128)) : (e += String.fromCharCode(n >> 12 | 224), e += String.fromCharCode(n >> 6 & 63 | 128), e += String.fromCharCode(63 & n | 128))
        }
        return e
    },
    _utf8_decode: function (r) {
        for (var e = "", t = 0, n = 0, o = 0, a = 0; t < r.length;)(n = r.charCodeAt(t)) < 128 ? (e += String.fromCharCode(n), t++) : n > 191 && n < 224 ? (o = r.charCodeAt(t + 1), e += String.fromCharCode((31 & n) << 6 | 63 & o), t += 2) : (o = r.charCodeAt(t + 1), a = r.charCodeAt(t + 2), e += String.fromCharCode((15 & n) << 12 | (63 & o) << 6 | 63 & a), t += 3);
        return e
    }
}, anysign = anysign || {
        binary: {
            uint32ArrayToUint8Array: function (r) {
                if (!r)return null;
                for (var e, t = new Uint8Array(4 * r.length), n = 0, o = r.length; n < o; n++)t[e = n << 2] = r[n] >> 24 & 255, t[e + 1] = r[n] >> 16 & 255, t[e + 2] = r[n] >> 8 & 255, t[e + 3] = 255 & r[n];
                return t
            }
        },
        hex: {
            hexEncodeArray: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"],
            uint8ArrayToHexStr: function (r) {
                if (!r)return null;
                for (var e = "", t = 0; t < r.length; t++) {
                    var n = r[t];
                    e += this.hexEncodeArray[n >>> 4], e += this.hexEncodeArray[15 & n]
                }
                return e
            },
            hexStrToUint8Array: function (r) {
                if (!r || r.length % 2 != 0)return null;
                for (var e = [], t = 0; t < r.length; t += 2)e.push(parseInt("0x" + r.substr(t, 2), 16));
                return new Uint8Array(e)
            },
            hexStrToUint8Str: function (r) {
                if (!r || r.length % 2 != 0)return null;
                for (var e = "", t = 0; t < r.length; t += 2)e += String.fromCharCode(parseInt("0x" + r.substr(t, 2), 16));
                return decodeURIComponent(escape(e))
            }
        },
        charset: {
            strToUtf8ArrayUint8: function (r) {
                for (var e = unescape(encodeURIComponent(r)), t = new Uint8Array(e.length), n = 0; n < e.length; n++)t[n] = e.charCodeAt(n);
                return t
            }, utf8ArrayUint8ToStr: function (r) {
                for (var e = "", t = 0; t < r.length; t++)e += String.fromCharCode(r[t]);
                return decodeURIComponent(escape(e))
            }, toUtf8str: function (r) {
                return unescape(encodeURIComponent(r))
            }, uint8ArrayAscIIToStr: function (r) {
                return String.fromCharCode.apply(null, r)
            }, strToUint8ArrayAscII: function (r) {
                for (var e = new Uint8Array(r.length), t = 0, n = r.length; t < n; ++t)e[t] = r.charCodeAt(t);
                return e
            }
        },
        zip: {
            compressToB64: function (r) {
                var e = new Zlib.Deflate(r).compress();
                if (e instanceof Array) {
                    for (var t = new Uint8Array(e.length), n = 0, o = t.length; n < o; ++n)t[n] = e[n];
                    e = t
                }
                var Base64 = {encodeUint8Array: function (r) {
                    for (var e, t = 0, n = r.length, o = "", a = ""; t < n;) {
                        for (var i = 0, c = (e = r.subarray(t, Math.min(t + 32768, n))).length; i < c; i++)a += String.fromCharCode(e[i]);
                        o += a, t += 32768, a = ""
                    }
                    return btoa(o)
                }}
                return Base64.encodeUint8Array(e)
            }
        },
        json: {
            stringify: function (r) {
                return JSON.stringify(r)
            }, stringToObj: function (r) {
                return JSON.parse(r)
            }
        },
        digest: {
            crc32: function (r) {
                var e = [];
                if (window.crcTable) e = window.crcTable; else {
                    for (var t, n = 0; n < 256; n++) {
                        t = n;
                        for (var o = 0; o < 8; o++)t = 1 & t ? 3988292384 ^ t >>> 1 : t >>> 1;
                        e[n] = t
                    }
                    window.crcTable = e
                }
                for (var a = -1, i = 0; i < r.length; i++)a = a >>> 8 ^ e[255 & (a ^ r.charCodeAt(i))];
                return (-1 ^ a) >>> 0
            }
        }
    };
!function (r) {
    function e() {
        for (var e, t = !0, n = l, o = s.length; n < o && t;)if (void 0 !== (e = s[n]) && null !== e) {
            if ("string" == typeof e) {
                var a = h.cloneNode(!1);
                a.text = e, d.parentNode.insertBefore(a, d)
            } else e.apply(r);
            s[e = n] = null, l = e + 1, n += 1
        } else t = !1
    }

    function t() {
        if (s.length) {
            var e, n = s.pop();
            "string" == typeof n ? (e = h.cloneNode(!0), e.type = "text/javascript", e.async = !0, e.src = n, e.onload = e.onreadystatechange = function () {
                    e.readyState && !/loaded|complete/.test(e.readyState) || (e.onload = e.onreadystatechange = null, e = void 0, t())
                }, d.parentNode.insertBefore(e, d)) : (n.apply(r), t())
        }
    }

    function n(r, t) {
        return function () {
            s[t] = r.responseText, e(), r = void 0
        }
    }

    function o() {
        var r, t, o = arguments.length;
        for (r = 0; r < o; r += 1)"string" == typeof arguments[r] ? (t = i(arguments[r]), t.onload = n(t, s.length), s[s.length] = null, t.send()) : (s[s.length] = arguments[r], e())
    }

    function a() {
        s.push(Array.prototype.slice.call(arguments, 0).reverse()), t()
    }

    var i, c, f, u = r.document, h = u.createElement("script"), d = u.getElementsByTagName("script")[0], s = [], l = 0;
    r.XMLHttpRequest && (c = new r.XMLHttpRequest, "withCredentials" in c ? f = function (e) {
            return (c = new r.XMLHttpRequest).open("get", e, !0), c
        } : r.XDomainRequest && (f = function (e) {
            return (c = new r.XDomainRequest).open("get", e), c
        })), i = f, r.JcorsLoader = {load: i ? o : a}
}(window);
function ismobile(e) {
    var t = navigator.userAgent;
    navigator.appVersion;
    if (!/AppleWebKit.*Mobile/i.test(navigator.userAgent) && !/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent))return t.indexOf("iPad") > -1 ? "0" : "1";
    if (window.location.href.indexOf("?mobile") < 0)try {
        return /iPhone|mac|iPod|iPad/i.test(navigator.userAgent) ? "0" : "1"
    } catch (e) {
    }
}
function getWindowWidth() {
    var e = 630;
    return document.body && document.body.offsetWidth && (e = document.body.offsetWidth, document.body.offsetHeight), "CSS1Compat" == document.compatMode && document.documentElement && document.documentElement.offsetWidth && (e = document.documentElement.offsetWidth, document.documentElement.offsetHeight), window.innerWidth && window.innerHeight && (e = window.innerWidth, window.innerHeight), .99 * e
}
function getWindowHeight() {
    var e = 460;
    return document.body && document.body.offsetWidth && (document.body.offsetWidth, e = document.body.offsetHeight), "CSS1Compat" == document.compatMode && document.documentElement && document.documentElement.offsetWidth && (document.documentElement.offsetWidth, e = document.documentElement.offsetHeight), window.innerWidth && window.innerHeight && (window.innerWidth, e = window.innerHeight), .99 * e
}
function isSignOrCom(e) {
    return e >= 20 && e <= 29 || (e >= 200 && e <= 299 || !(e >= 30 && e <= 39) && (!(e >= 300 && e <= 399) && null))
}
function checkText(e) {
    if (/[\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]/.test(e))return !0;
    for (var t = [",", ".", "'", '"', ";", ":", "?", "/", "", "\\", "", "[", "]", "{", "}", "<", ">", "|", "(", ")"], n = 0; n < t.length; n++)if (e == t[n])return !0, !0;
    return !1
}
function hideURLbar() {
    window.scrollTo(0, 1)
}
var AnySignRoot = function () {
    this.Version = "4.7", this.EncCertSN = null, this.EncKey = null, this.TermSrc = "PAD", this.Digest = null, this.EncData = null
}, Digest = function () {
    this.Alg = null, this.Value = null
}, FormInfo = function () {
    this.WONo = null, this.WOHash = null, this.IsSync = !1, this.IsUnit = !1, this.EncAlg = "SM2", this.FlowID = null, this.Channel = null, this.USignArray = [], this.DataArray = [], this.CachetArray = [], this.ExtInfo = null
}, SaveFormInfo = function () {
    this.WONo = null, this.WOHash = null, this.Channel = null, this.EncAlg = "RSA", this.USignObjs = [], this.USignConfigs = [], this.DataObjs = [], this.DataConfigs = [], this.CachetArray = []
}, ExtInfo = function () {
}, PlainData = function () {
    this.P10Data = null, this.CertOID = null
}, P10Data = function () {
    this.RawHash = null, this.Hash = null, this.Value = null, this.ValueType = null, this.P10SignValue = null, this.Hashalg = null, this.Dn = null, this.IDType = null, this.IDNumber = null, this.Templname = "3", this.Channel = "10000"
}, CertOID = function () {
    this.Version = "3.2", this.IDType = null, this.IDNumber = null, this.RawHash = null, this.BioFeature = null, this.ClientOS = null
}, BioFeature = function () {
    this.PhotoArray = [], this.SoundArray = [], this.Script = null
}, Script = function () {
    this.Format = "zip", this.Width = "180", this.Color = null, this.Count = null, this.Data = null, this.Device = null, this.RefHeight = 99999, this.RefWidth = 99999, this.Geoloca = null
}, Device = function () {
    this.DeviceName = "ANDROID_PAD_" + navigator.appName, this.SampleRate = "1024", this.PressMax = "1024", this.Width = 99999, this.Height = 99999, this.DriverVer = "v1.0", this.DeviceID = navigator.appVersion, this.CertInfo = null
}, ClientOS = function () {
    this.Name = "WeiXin_" + navigator.platform, this.Edition = navigator.appCodeName, this.ServicePack = "None", this.Version = navigator.appVersion, this.OSArch = "32/64", this.DeviceID = navigator.appVersion
}, ImageSize = function (i, t) {
    this.Width = i, this.Height = t, this.Unit = "dp"
}, SignatureObj = function () {
    this.Cid = 0, this.SignRule = null, this.Signer = null, this.Image = null, this.ImageSize = null, this.IsTSS = !1, this.Points = null, this.ImageFMT = DataFormat.IMAGE_PNG, this.TimeTag = null
}, MassSignObj = function () {
    this.Cid = 0, this.SignRule = null, this.Signer = null, this.Image = null, this.ImageSize = null, this.IsTSS = !1, this.ImageFMT = DataFormat.IMAGE_PNG
}, PhotoEvidence = function () {
    this.Format = null, this.Hash = null, this.BioType = null
}, SoundEvidence = function () {
    this.Format = null, this.Hash = null, this.BioType = null
}, DataObj = function () {
    this.Cid = 0, this.OwnerCid = 0, this.PointHash = null, this.Data = null, this.Name = null, this.Format = null, this.PDFCrdRule = null
}, PDFCrdRule = function () {
    this.DocCrdTid = null, this.DocFormat = null, this.DocStyleTid = null
}, HWRRoot = function () {
    this.version = "", this.transID = null, this.encKey = null, this.userID = null, this.serviceID = null, this.hwrInfo = null
}, HWRInfo = function () {
    this.type = null, this.lang = Language.CHS, this.similar = 100, this.strokes = [], this.text = "", this.hwrNum = null
}, HWRResult = function () {
    this.transID = null, this.result = [], this.errCode = null
};
function anysignWebImpl() {
    function n() {
        C = !1, s = null, c = null, f = !1, D = !1, E = [], T = [], S = [], O = []
    }

    function t(n) {
        for (var t in A) {
            var e = A[t];
            if (e && e.cid == n)return e
        }
        return null
    }

    function e(n, t, e, i, r, a) {
        n.Points || (n.Points = new PlainData), n.Points.P10Data || (n.Points.P10Data = new P10Data), n.Points.CertOID || (n.Points.CertOID = new CertOID), n.Points.CertOID.BioFeature || (n.Points.CertOID.BioFeature = new BioFeature), n.Points.CertOID.IDNumber = n.Signer.IDNumber, n.Points.CertOID.IDType = n.Signer.IDType, n.Points.CertOID.BioFeature.Script = new Script, n.Points.CertOID.ClientOS = new ClientOS;
        var o = n.Points.CertOID.BioFeature.Script;
        o.Color = parseInt("0x" + t.substr(1)) + "", o.Data = anysign.zip.compressToB64(anysign.charset.strToUint8ArrayAscII(e)), o.Count = i + "", o.Device = new Device, o.Device.Width = 99999, o.Device.Height = 99999, o.RefWidth = r, o.RefHeight = a
    }

    function i(n) {
        return d.FORMDATA_XML <= n && n <= d.FORMDATA_PRESERVED
    }

    function r(n) {
        return n >= 20 && n <= 29 || n >= 200 && n <= 299
    }

    function a(n) {
        return n >= 30 && n <= 39 || n >= 300 && n <= 399
    }

    function o(n) {
        return !!(n >= 50 && n <= 59 || n >= 500 && n <= 599 || i(n))
    }

    var s, u, g, l, c, _, d = {
        FORMDATA_XML: 10,
        FORMDATA_HTML: 11,
        FORMDATA_PDF: 12,
        FORMDATA_JSON: 13,
        FORMDATA_PRESERVED: 19
    }, C = !1, f = !1, D = !1, E = [], T = [], S = [], A = [], O = [];
    this._initAnySignApi = function (t, e) {
        return !(!t || !e) && (n(), s = t, c = e, !0)
    }, this._addDataObj = function (n, t) {
        if (!f && o(n)) {
            t.cid = n, A[n] = t;
            var e = new DataObj;
            return e.Format = t.format, e.Name = t.name, e.Cid = n, S[n] = e, !0
        }
        return !1
    }, this._addSignatureObj = function (n, t) {
        if (!f && t && r(n)) {
            t.cid = n, T[n] = t;
            var e = new SignatureObj;
            return e.Cid = n, e.Signer = t.signer, e.SignRule = t.signRule, e.IsTSS = t.isTSS, e.TimeTag = t.timeTag, E[n] = e, !0
        }
        return !1
    }, this._addCommentObj = function (n, t) {
        if (!f && t && a(n)) {
            t.cid = n, T[n] = t;
            var e = new MassSignObj;
            return e.Cid = n, e.Signer = t.signer, e.SignRule = t.signRule, e.IsTSS = t.isTSS, E[n] = e, !0
        }
        return !1
    }, this._addEvidence = function (n, t, e, i, r) {
        var a = E[n];
        if (a.Points || (a.Points = new PlainData), a.Points.P10Data || (a.Points.P10Data = new P10Data), a.Points.CertOID || (a.Points.CertOID = new CertOID), a.Points.CertOID.BioFeature || (a.Points.CertOID.BioFeature = new BioFeature), a.Points.CertOID.BioFeature.Script)return !1;
        if (i == BioType.PHOTO_SIGNER_IDENTITY_CARD_BACK || i == BioType.PHOTO_SIGNER_IDENTITY_CARD_FRONT) {
            var o = new PhotoEvidence;
            o.Format = e;
            var s = sha1Digest(t);
            return o.Hash = "BS64:" + s.toString().toUpperCase(), o.BioType = i, a.Points.CertOID.BioFeature.PhotoArray[r] = o, !0
        }
        if (i == BioType.SOUND_SIGNER_RETELL || i == BioType.SOUND_SIGNER_OTHER) {
            var u = new SoundEvidence;
            u.Format = e;
            var g = sha1Digest(t);
            return u.Hash = "BS64:" + g.toString().toUpperCase(), u.BioType = i, a.Points.CertOID.BioFeature.SoundArray[r] = u, !0
        }
        return !1
    }, this._addEvidenceV2 = function (n, t, e, i) {
        var r = E[n];
        if (r.Points || (r.Points = new PlainData), r.Points.P10Data || (r.Points.P10Data = new P10Data), r.Points.CertOID || (r.Points.CertOID = new CertOID), r.Points.CertOID.BioFeature || (r.Points.CertOID.BioFeature = new BioFeature), r.Points.CertOID.BioFeature.Script)return !1;
        if (e == BioType.PHOTO_SIGNER_IDENTITY_CARD_BACK || e == BioType.PHOTO_SIGNER_IDENTITY_CARD_FRONT) {
            var a = new PhotoEvidence;
            a.Format = DataFormat.IMAGE_JPEG;
            var o = sha1Digest(t);
            return a.Hash = "BS64:" + o.toString().toUpperCase(), a.BioType = e, r.Points.CertOID.BioFeature.PhotoArray[i] = a, !0
        }
        if (e == BioType.SOUND_SIGNER_RETELL || e == BioType.SOUND_SIGNER_OTHER) {
            var s = new SoundEvidence;
            s.Format = DataFormat.MEDIA_3GP;
            var u = sha1Digest(t);
            return s.Hash = "BS64:" + u.toString().toUpperCase(), s.BioType = e, r.Points.CertOID.BioFeature.SoundArray[i] = s, !0
        }
        return !1
    }, this._addChachetObj = function (n) {
        return !(f || !n) && (O.push(n), !0)
    }, this._addPhotoObj = function (n, t, e) {
        return !1
    }, this._addMediaObj = function (n, t, e) {
        return !1
    }, this._setTemplate = function (n, t, e, r) {
        if (!D && i(n)) {
            if (null == t || 0 === t.length)return anysign.logger.e("contentUtf8Str must not be null or empty"), !1;
            if (null == e || 0 === e.length)return anysign.logger.e("businessId must not be null or empty"), !1;
            if (null == r || 0 === r.length)return anysign.logger.e("template_serial must not be null or empty"), !1;
            g = e, l = sha1DigestBase64(e) + "";
            var a = new DataObj;
            if (a.Cid = n, a.Data = t, d.FORMDATA_XML === n || d.FORMDATA_JSON === n) {
                var o = new PDFCrdRule;
                o.DocFormat = n, o.DocStyleTid = r, a.PDFCrdRule = o
            }
            var s = new DataConfig;
            return s.cid = n, s.nessesary = !0, S[n] = a, A[n] = s, D = !0, !0
        }
        return !1
    }, this._setTID = function (n) {
        return u = n, !0
    }, this._setData = function (n, e) {
        if (t(n) && e) {
            var Base64 = {encodeUint8Array: function (r) {
                for (var e, t = 0, n = r.length, o = "", a = ""; t < n;) {
                    for (var i = 0, c = (e = r.subarray(t, Math.min(t + 32768, n))).length; i < c; i++)a += String.fromCharCode(e[i]);
                    o += a, t += 32768, a = ""
                }
                return btoa(o)
            }}
            if ("string" == typeof e) (i = S[n]).Data = Base64.encodeUint8Array(anysign.charset.strToUtf8ArrayUint8(e)); else if (e instanceof Uint8Array) {
                var i = S[n];
                i.Data = Base64.encodeUint8Array(e)
            }
            return !0
        }
        return !1
    }, this._commitConfig = function () {
        return f = !0, !0
    }, this._resetConfig = function () {
        return n(), !0
    }, this._showSignatureDialog = function (n) {
        if (f) {
            if (D) {
                if (null == T[n])return EC_WRONG_CONTEXT_ID;
                onloadAnysignView(!0, _);
                var t = T[n], i = getWindowHeight(), r = getWindowWidth(), a = document.getElementById("dialog");
                a.style.height = i, a.style.width = r, a.style.display = "block";
                var o = document.getElementById("anysign_title"), u = t.title, g = u.substring(t.titleSpanFromOffset, t.titleSpanToOffset + 1).big();
                return o.innerHTML = u.substring(0, t.titleSpanFromOffset) + g + u.substring(t.titleSpanToOffset + 1, u.length), setSignResCallback(t, function (n, i, r, a, o, u, g) {
                    if (s) {
                        if (r) {
                            if (sameTrajectory) {
                                for (var index in signCounts) {
                                    var l = E[signCounts[index]];
                                    if (e(l, t.penColor, a, o, u, g), l.ImageSize = new ImageSize(calculatedSigWidth, calculatedSigHeight), l.Image = i, l.SignRule && l.SignRule instanceof SignRule_XYZ) {
                                        var c = l.SignRule.XYZRule;
                                        "dp" === c.Unit ? l.SignRule.XYZRule = {
                                                Left: c.Left,
                                                Top: c.Top,
                                                Right: c.Left + calculatedSigWidth,
                                                Bottom: c.Top - calculatedSigHeight,
                                                Pageno: c.Pageno,
                                                Unit: c.Unit
                                            } : "pt" === c.Unit && (l.SignRule.XYZRule = {
                                                Left: c.Left,
                                                Top: c.Top,
                                                Right: c.Left + .45 * calculatedSigWidth,
                                                Bottom: c.Top - .45 * calculatedSigHeight,
                                                Pageno: c.Pageno,
                                                Unit: c.Unit
                                            })
                                    }
                                    s(t.cid, CALLBACK_TYPE_SIGNATURE, r)
                                }
                            } else {
                                var l = E[n];
                                if (e(l, t.penColor, a, o, u, g), l.ImageSize = new ImageSize(calculatedSigWidth, calculatedSigHeight), l.Image = i, l.SignRule && l.SignRule instanceof SignRule_XYZ) {
                                    var c = l.SignRule.XYZRule;
                                    "dp" === c.Unit ? l.SignRule.XYZRule = {
                                            Left: c.Left,
                                            Top: c.Top,
                                            Right: c.Left + calculatedSigWidth,
                                            Bottom: c.Top - calculatedSigHeight,
                                            Pageno: c.Pageno,
                                            Unit: c.Unit
                                        } : "pt" === c.Unit && (l.SignRule.XYZRule = {
                                            Left: c.Left,
                                            Top: c.Top,
                                            Right: c.Left + .45 * calculatedSigWidth,
                                            Bottom: c.Top - .45 * calculatedSigHeight,
                                            Pageno: c.Pageno,
                                            Unit: c.Unit
                                        })
                                }
                                s(t.cid, CALLBACK_TYPE_SIGNATURE, r)
                            }
                        } else s(t.cid, CALLBACK_TYPE_DIALOG_CANCEL, null);
                        clear_canvas(), document.getElementById("dialog").style.display = "none", setIsAnysignInputDlgShown(!1)
                    }
                }), setIsAnysignInputDlgShown(!0), RESULT_OK
            }
            return EC_TEMPLATE_NOT_SET
        }
        return EC_API_NOT_INITED
    }, this._showCommentDialog = function (n) {
        if (f) {
            if (D) {
                if (null == T[n])return EC_WRONG_CONTEXT_ID;
                if (isCommentShow)return EC_COMMENT_ALREADY_SHOW;
                var t = T[n];
                return setSignResCallback(t, function (n, e, i, r, a, o, u) {
                    if (s) {
                        if (i) {
                            var g = E[n];
                            if (g.ImageSize = new ImageSize(o, u), g.Image = e, g.SignRule && g.SignRule instanceof SignRule_XYZ) {
                                var l = g.SignRule.XYZRule;
                                "dp" === l.Unit ? g.SignRule.XYZRule = {
                                        Left: l.Left,
                                        Top: l.Top,
                                        Right: l.Left + o,
                                        Bottom: l.Top - u,
                                        Pageno: l.Pageno,
                                        Unit: l.Unit
                                    } : "pt" === l.Unit && (g.SignRule.XYZRule = {
                                        Left: l.Left,
                                        Top: l.Top,
                                        Right: l.Left + .45 * o,
                                        Bottom: l.Top - .45 * u,
                                        Pageno: l.Pageno,
                                        Unit: l.Unit
                                    })
                            }
                            s(t.cid, CALLBACK_TYPE_COMMENTSIGN, i)
                        } else s(t.cid, CALLBACK_TYPE_DIALOG_CANCEL, null);
                        clear_canvas(), document.getElementById("dialog").style.display = "none", setIsAnysignInputDlgShown(!1)
                    }
                }), (new anysignCommentUI).onload_commentSignCanvas(t, _), setIsAnysignInputDlgShown(!0), RESULT_OK
            }
            return EC_TEMPLATE_NOT_SET
        }
        return EC_API_NOT_INITED
    }, this._setIdentifyCallBack = function (n) {
        _ = n
    }, this._startOCR = function (n) {
        (new OCRObj).setOCRCapture(n)
    }, this._takePicture = function (n) {
        return !1
    }, this._picturePreview = function (n) {
        return !1
    }, this._startMediaRecording = function (n) {
        return !1
    }, this._audioPreview = function (n) {
        return !1
    }, this._mediaPreview = function (n) {
        return !1
    }, this._startMediaRecording = function (n) {
        return !1
    }, this._finishMediaRecording = function (n) {
        return !1
    }, this._isReadyToUpload = function () {
        if (!f || !D)return !1;
        for (var n in T) {
            var t = (i = T[n]).cid;
            if (i.nessesary) {
                var e = E[t];
                if (null == e || null == e.Points || null == e.Points.CertOID || null == e.Points.CertOID.BioFeature || null == e.Points.CertOID.BioFeature.Script)return !1
            }
        }
        for (n in A) {
            var i = A[n], r = S[i.cid];
            if ((null == r || null == r.Data) && i.nessesary)return !1
        }
        return !0
    }, this._saveBusinessSession = function (n) {
        n = (n = md5Digest("424A4341" + n) + "").substring(0, 24);
        var t = new SaveFormInfo;
        t.WONo = g, t.WOHash = l, t.Channel = c;
        var e;
        for (var i in T)e = T[i], t.USignConfigs.push(e), t.USignObjs.push(E[e.cid]);
        for (i in A)e = A[i], t.DataConfigs.push(e), t.DataObjs.push(S[e.cid]);
        t.CachetArray = O, t.EncAlg = EncAlgType.EncAlg;
        var r = anysign.json.stringify(t);
        return tripleDesEncrypt(r, n) + ""
    }, this._restoreBusinessSession = function (n, t) {
        t = (t = md5Digest("424A4341" + t) + "").substring(0, 24);
        var e = tripleDesDecrypt(n, t) + "", i = anysign.hex.hexStrToUint8Str(e), r = anysign.json.stringToObj(i);
        g = r.WONo, l = r.WOHash, c = r.Channel, EncAlgType.EncAlg = r.EncAlg;
        var a, o;
        for (var s in r.USignConfigs) {
            a = r.USignConfigs[s].cid;
            for (var u in r.USignObjs)a == (o = r.USignObjs[u].Cid) && (T[a] = r.USignConfigs[s], E[o] = r.USignObjs[u])
        }
        for (var s in r.DataConfigs) {
            a = r.DataConfigs[s].cid;
            for (var u in r.DataObjs)a == (o = r.DataObjs[u].Cid) && (A[a] = r.DataConfigs[s], S[o] = r.DataObjs[u])
        }
        return O = r.CachetArray, f = !0, D = !0, !0
    }, this._getUploadDataGram = function (_s) {
        if (f && this._isReadyToUpload() && D) {
            var n = new AnySignRoot, t = new FormInfo, e = new Uint8Array(24);
            void 0 != window.crypto ? window.crypto.getRandomValues(e) : void 0 != window.msCrypto ? window.msCrypto.getRandomValues(e) : capabal.crypto.getRandomValues(e), n.EncKey = rsaPubkeyUint8EncByDefault(e), n.EncCertSN = encCertSN;
            var i, r = [];
            for (var a in T)i = T[a], "" != E[i.cid].Image && null != E[i.cid].Image && r.push(E[i.cid]);
            var o = [];
            for (a in A)i = A[a], o.push(S[i.cid]);
            t.WONo = g, t.WOHash = l, t.Channel = c, null != O && O.length > 0 && (t.IsUnit = !0), t.USignArray = r, t.DataArray = o, t.CachetArray = O, t.ExtInfo = new ExtInfo, t.EncAlg = EncAlgType.EncAlg;
            var s = anysign.json.stringify(t);
            n.EncData = tripleDesEncrypt(s, anysign.hex.uint8ArrayToHexStr(e)) + "", n.Digest = new Digest, n.Digest.Alg = "CRC32", n.Digest.Value = anysign.digest.crc32(n.EncData).toString(16).toUpperCase();
            if (_s) {
                var returnArray = new Array;
                var _d;
                if (Array.isArray(pdfKey)) {
                    _d = pdfKey.join("|")
                }
                returnArray.push("ESIGN_VERSION_1.0");
                returnArray.push(Base64.encode(_d));
                returnArray.push(Base64.encode(signKey));
                returnArray.push(Base64.encode(anysign.json.stringify(n)));
                returnArray.push(Base64.encode(String(signCounts.length)));
                return returnArray.join("|")
            }
            return anysign.json.stringify(n)
        }
        return null
    }, this._getOSInfo = function () {
        if (isMobile.Android()) {
            var n = navigator.userAgent.toLowerCase();
            alert(n);
            var t = n.indexOf("android"), e = n.indexOf(";", t);
            return t += 8, "android##" + (i = n.substring(t, e))
        }
        if (isMobile.iOS()) {
            var i;
            if (-1 != (t = (n = navigator.userAgent).indexOf("OS")) && -1 != (e = n.indexOf("like Mac OS")))return i = n.substring(t + 3, e - 1), "ios##" + (i = i.replace(/_/g, "."))
        }
        return "unknown"
    }
}
function onBridgeReady() {
    WeixinJSBridge.call("hideOptionMenu")
}
var CALLBACK_TYPE_SIGNATURE = 1, CALLBACK_TYPE_DIALOG_DISMISS = 2, CALLBACK_TYPE_DIALOG_CANCEL = 3, CALLBACK_TYPE_BUFFER_SAVED = 4, CALLBACK_TYPE_ON_PICTURE_TAKEN = 5, CALLBACK_TYPE_DATA_DELETED = 6, CALLBACK_TYPE_START_RECORDING = 7, CALLBACK_TYPE_STOP_RECORDING = 8, CALLBACK_TYPE_ON_MEDIA_DATA = 9, CALLBACK_TYPE_COMMENTSIGN = 10, CALLBACK_TYPE_ERROR = -1, CALLBACK_TYPE_ERROR_PICTURE = -2, CALLBACK_TYPE_OPERATION_CANCELED = -3, CALLBACK_TYPE_GETVERSION = 10, RESULT_OK = 0, RESULT_ERROR = -1, EC_API_NOT_INITED = 1, EC_WRONG_CONTEXT_ID = 2, EC_CAMERA_INIT_FAILED = 3, EC_NATIVE_EXCEPTION = 4, EC_DEVICE_NOT_SUPPORTED = 5, EC_TEMPLATE_NOT_SET = 6, EC_COMMENT_ALREADY_SHOW = 7, isCommentShow = !1, isMobile = {
    Android: function () {
        return !!navigator.userAgent.match(/Android/i)
    }, BlackBerry: function () {
        return !!navigator.userAgent.match(/BlackBerry/i)
    }, iOS: function () {
        return !!navigator.userAgent.match(/iPhone|iPad|iPod/i)
    }, Windows: function () {
        return !!navigator.userAgent.match(/IEMobile/i)
    }, any: function () {
        return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows()
    }
};
"undefined" == typeof WeixinJSBridge ? document.addEventListener ? document.addEventListener("WeixinJSBridgeReady", onBridgeReady, !1) : document.attachEvent && (document.attachEvent("WeixinJSBridgeReady", onBridgeReady), document.attachEvent("onWeixinJSBridgeReady", onBridgeReady)) : onBridgeReady();
function onloadAnysignView(t, e) {
    this.isSign = t, this.identify_callback = e, onload_singleSignCanvas(), onload_singleSingScrollAction()
}
function onload_singleSignCanvas() {
    if (document.getElementById("anysignCanvas")) {
        var t = document.getElementById("anysignCanvas"), e = t.getContext("2d"), n = getWindowHeight(), i = getWindowWidth();
        t.width < 10 && (t.width = i * t.width * .99), t.width < i && (t.width = .99 * i), (a = document.getElementById("container")).style.overflowX = "scroll", a.style.overflowY = "hidden", t.height = .7 * n, document.getElementById("anysign_title").style.height = .1 * n + "px", document.getElementById("single_scrollbar").style.height = .1 * n + "px", (a = document.getElementById("btnContainerOuter")).style.height = .1 * n + "px";
        window.devicePixelRatio && window.devicePixelRatio, t.height;
        var a = document.getElementById("container");
        tmp_canvas = document.createElement("canvas"), tmp_ctx = tmp_canvas.getContext("2d"), tmp_canvas.id = "tmp_canvas", tmp_canvas.width = t.width, tmp_canvas.height = t.height, a.appendChild(tmp_canvas), "ontouchstart" in document.documentElement ? (tmp_canvas.ontouchstart = function (t) {
                return !isCopyingImg && (t.preventDefault(), isDown = !0, t.touches && (t = t.touches[0]), !1)
            }, tmp_canvas.ontouchmove = function (e) {
                if (isDown && !isCopyingImg) {
                    var n = JQuery_Capable.offset(e.target);
                    void 0 !== e.targetTouches ? (curX = Math.floor(e.targetTouches[0].pageX - n.left), curY = Math.floor(e.targetTouches[0].pageY - n.top)) : (curX = Math.floor(e.pageX - n.left), curY = Math.floor(e.pageY - n.top));
                    var i = e.timeStamp;
                    0 !== signTrachPointCount || isNaN(i) || (firstPointTime = i), curX > 0 && curY <= t.height && (isNaN(i) ? signTrack += curX + "," + curY + "," + base_stroke_width + ",0\n" : signTrack += curX + "," + curY + "," + base_stroke_width + "," + (i - firstPointTime) + "\n", signTrachPointCount += 1, curX > maxX && (maxX = curX), curX < minX && (minX = curX), curY > maxY && (maxY = curY), curY < minY && (minY = curY), points.push({
                        x: curX,
                        y: curY
                    }), onPaint(), curX > 0 && curY > 0 && sbuilder.push(curX, curY), lastX = curX, lastY = curY), preventDefault(e)
                }
            }, tmp_canvas.ontouchend = function (t) {
                var e = t.timeStamp;
                isNaN(e) ? signTrack += "0,0,-1,0\n" : signTrack += "0,0,-1," + (e - firstPointTime) + "\n", signTrachPointCount += 1, sbuilder.push("-1", "0"), isCopyingImg = !0, isDown = !1, document.getElementById("anysignCanvas").getContext("2d").drawImage(tmp_canvas, 0, 0), tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height), points = [], isCopyingImg = !1
            }, tmp_canvas.ontouchcancel = tmp_canvas.ontouchend) : (tmp_canvas.onmousedown = function (t) {
                isDown = !0
            }, tmp_canvas.onmousemove = function (t) {
                if (isDown) {
                    var e = JQuery_Capable.offset(t.target), n = document.body.scrollTop | document.documentElement.scrollTop, i = document.body.scrollLeft | document.documentElement.scrollLeft;
                    void 0 !== t.targetTouches ? (curX = Math.floor(t.targetTouches[0].clientX - e.left), curY = Math.floor(t.targetTouches[0].clientY - e.top)) : (curX = Math.floor(t.clientX - e.left), curY = Math.floor(t.clientY - e.top));
                    var a = t.timeStamp;
                    0 !== signTrachPointCount || isNaN(a) || (firstPointTime = a), curX > 0 && (isNaN(a) ? signTrack += curX + "," + curY + "," + base_stroke_width + ",0\n" : signTrack += curX + "," + curY + "," + base_stroke_width + "," + (a - firstPointTime) + "\n", signTrachPointCount += 1, curY += n, (curX += i) > maxX && (maxX = curX), curX < minX && (minX = curX), curY > maxY && (maxY = curY), curY < minY && (minY = curY), points.push({
                        x: curX,
                        y: curY
                    }), onPaint(), curX > 0 && curY > 0 && sbuilder.push(curX, curY), lastX = curX, lastY = curY), preventDefault(t)
                }
            }, tmp_canvas.onmouseup = function (t) {
                var e = JQuery_Capable.offset(t.target);
                void 0 !== t.targetTouches ? (curX = Math.floor(t.targetTouches[0].clientX - e.left), curY = Math.floor(t.targetTouches[0].clientY - e.top)) : (curX = Math.floor(t.clientX - e.left), curY = Math.floor(t.clientY - e.top));
                var n = t.timeStamp;
                isNaN(n) ? signTrack += "0,0,-1,0\n" : signTrack += "0,0,-1," + (n - firstPointTime) + "\n", signTrachPointCount += 1, isDown && sbuilder.push("-1", "0"), isDown = !1, document.getElementById("anysignCanvas").getContext("2d").drawImage(tmp_canvas, 0, 0), tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height), points = []
            }, tmp_canvas.onmouseout = tmp_canvas.onmouseup);
        window.devicePixelRatio && window.devicePixelRatio;
        e.strokeStyle = signObjTmp ? signObjTmp.penColor : "black", e.lineWidth = base_stroke_width, e.lineCap = "round", e.lineJoin = "round", e.shadowBlur = 5, tmp_ctx.strokeStyle = signObjTmp ? signObjTmp.penColor : "black", tmp_ctx.lineWidth = base_stroke_width, tmp_ctx.lineCap = "round", tmp_ctx.lineJoin = "round", tmp_ctx.shadowBlur = 5
    } else alert("获取签名控件失败,请使用safari和chrome浏览器进行签名。\n\n当前浏览器详情如下：" + navigator.userAgent)
}
function onload_singleSingScrollAction() {
    function t() {
        (i -= c) > a ? (setTimeout(t, s), o.scrollLeft = i) : (i = a, o.scrollLeft = i), i <= 0 && (o.style.borderColor = "#FF0000", setTimeout(function () {
            o.style.borderColor = "gray"
        }, 1e3))
    }

    function e() {
        (i += c) < a ? (o.scrollLeft = i, setTimeout(e, s)) : (i = a, o.scrollLeft = i), i >= o.scrollWidth - o.clientWidth && (o.style.borderColor = "#FF0000", setTimeout(function () {
            o.style.borderColor = "gray"
        }, 1e3))
    }

    var n = 0, i = 0, a = 0, o = document.getElementById("container");
   
    var s = 50, c = 20
}
function clear_canvas() {
    var t = document.getElementById("anysignCanvas"), e = t.getContext("2d");
    e.clearRect(0, 0, t.width, t.height), e.closePath();
    var n = t.width, i = t.height;
    t.width = t.height = 0, t.width = n, t.height = i, calculatedSigWidth = 0, calculatedSigHeight = 0, signTrack = "", signTrachPointCount = 0, firstPointTime = 0, points = [], sbuilder = [], minX = 9999, minY = 9999, maxX = 0, maxY = 0, imageDataTmp = null, isDrawn = !1
}

function sign_confirm() {
    if (isDrawn)if (signObjTmp.isdistinguish) {
        sbuilder.push("-1", "-1");
        var t = function (t, e) {
            if (closeWindow(), 0 == t) {
                var n = (s = document.getElementById("anysignCanvas")).getContext("2d"), i = maxX - minX + paste_padding + paste_padding, a = maxY - minY + paste_padding + paste_padding;
                if (imageDataTmp = n.getImageData(minX - paste_padding, minY - paste_padding, i + paste_padding, a + paste_padding), signResCallback) {
                    var o = getSigData(), s = document.getElementById("anysignCanvas");
                    signResCallback(signObjTmp.cid, o[0].substr(22, o[0].length), o[1].substr(22, o[1].length), signTrack, signTrachPointCount, s.width, s.height)
                }
                document.body.parentNode.style.overflow = "scroll", isSign = !1
            } else"请求超时" == t ? (closeWindow(), clear_canvas()) : (null == identify_callback ? console.log("the identify callback is not definition") : identify_callback(t), clear_canvas())
        };
        showProgress("正在识别，请稍候。。。"), new OCRObj(signObjTmp.ocrCapture).recognition(sbuilder, signObjTmp.signer.UName, t), sbuilder = []
    } else {
        var e = (o = document.getElementById("anysignCanvas")).getContext("2d"),
         n = maxX - minX + paste_padding + paste_padding, i = maxY - minY + paste_padding + paste_padding;
        if (imageDataTmp = e.getImageData(minX - paste_padding, minY - paste_padding, n + paste_padding, i + paste_padding), signResCallback) {
            var a = getSigData(), o = document.getElementById("anysignCanvas");
            signResCallback(signObjTmp.cid, 
                a[0].substr(22, a[0].length), a[1].substr(22, a[1].length), signTrack, signTrachPointCount, o.width, o.height)
        }
        document.body.parentNode.style.overflow = "scroll", isSign = !1
    } else custom_alert("Please sign your name in writing", "confirm")
}
function setSignResCallback(t, e) {
    if (isSignOrCom(t.cid)) signObjTmp = t, signResCallback = e, (i = (n = document.getElementById("anysignCanvas")).getContext("2d")).strokeStyle = signObjTmp ? signObjTmp.penColor : "black"; else {
        commentObjTmp = t, signResCallback = e;
        var n = document.getElementById("comment_canvas"), i = n.getContext("2d");
        i.strokeStyle = commentObjTmp ? commentObjTmp.penColor : "black", comment_canvas.strokeStyle = commentObjTmp ? commentObjTmp.penColor : "black"
    }
}
function setCanvasHeight(t) {
    var e = document.getElementById("anysignCanvas");
    t > 0 && (e.height = t, tmp_canvas && (tmp_canvas.height = t))
}
function getSigData() {
    var t = new Array;
    if (imageDataTmp) {
        var e = document.createElement("canvas"), n = e.getContext("2d"), i = window.devicePixelRatio ? window.devicePixelRatio : 1;
        e.width = imageDataTmp.width / i, e.height = imageDataTmp.height / i;
        var a = 1;
        signObjTmp.singleWidth / signObjTmp.singleHeight <= e.width / e.height ? signObjTmp.singleWidth <= e.width && (a = signObjTmp.singleWidth / e.width) : signObjTmp.singleHeight <= e.height && (a = signObjTmp.singleHeight / e.height), e.width *= a, e.height *= a, calculatedSigWidth = e.width, calculatedSigHeight = e.height, n.scale(1 / i * a, 1 / i * a);
        var o = document.createElement("canvas");
        o.width = imageDataTmp.width, o.height = imageDataTmp.height, o.getContext("2d").putImageData(imageDataTmp, 0, 0), n.drawImage(o, 0, 0);
        var s = 1 / i * a * signObjTmp.signatureImgRatio, c = document.createElement("canvas"), d = c.getContext("2d");
        s < 1 ? (c.width = imageDataTmp.width * s, c.height = imageDataTmp.height * s, d.scale(s, s)) : (c.width = imageDataTmp.width, c.height = imageDataTmp.height);
        var l = document.createElement("canvas");
        return l.width = imageDataTmp.width, l.height = imageDataTmp.height, l.getContext("2d").putImageData(imageDataTmp, 0, 0), d.drawImage(l, 0, 0), t[0] = c.toDataURL(), t[1] = e.toDataURL(), t
    }
    return null
}
function getRawSigHeight() {
    return imageDataTmp ? void 0 !== window.devicePixelRatio ? imageDataTmp.height / window.devicePixelRatio : imageDataTmp.height : 0
}
function getRawSigWidth() {
    return imageDataTmp ? void 0 !== window.devicePixelRatio ? imageDataTmp.width / window.devicePixelRatio : imageDataTmp.width : 0
}
function cancelSign() {
    clear_canvas(), document.getElementById("dialog").style.display = "none", document.body.scroll = "yes", isSign = !1, signResCallback && signResCallback(signObjTmp.cid, null, null, 0)
}
function setIsAnysignInputDlgShown(t) {
    isAnysignInputDlgShown = t
}
function testGetImageData() {
}
function testEnc() {
    var t = tripleDesEncrypt("abcdefg", "000102030405060708090a0b0c0d0e0f");
    document.getElementById("result").value = t
}
function testEncAndDec() {
    var t = "abdfdsafdasfcdef132432432432g你好吗,,,fdafdas", e = tripleDesEncrypt(t, "133434") + "", n = tripleDesDecrypt(e, "133434") + "", i = t + "\n";
    i += e + "\n", i += anysign.hex.hexStrToUint8Str(n) + "\n";
    anysign.json.stringToObj('{"Alg":"111","Value":"2222"}');
    document.getElementById("result").value = i
}
function custom_alert(t, e) {
    showMsgDialog(t)
}
function preventDefault(t) {
    (t = t || window.event).preventDefault && t.preventDefault(), t.returnValue = !1
}
function setSelectState(t) {
    for (var e = document.getElementsByTagName("select"), n = 0; n < e.length; n++)e[n].style.visibility = t
}
function showMessageBox2(t, e, n, i) {
    closeWindow();
    var a = getWindowHeight(), o = getWindowWidth();
    isIe && setSelectState("hidden");
    var s = document.createElement("div");
    s.id = "back";
    var c = "font-size:15pt; text-align:center; z-index:7;top:0px;left:0px;position:fixed;background:#666;width:" + o + "px;height:" + a + "px;";
    c += isIe ? "filter:alpha(opacity=0);" : "opacity:0;", s.style.cssText = c;
    var d = document.createElement("div");
    d.id = "mesWindow", d.innerHTML = "<div id='mesWindowContent'>" + e + "</div><div id='mesWindowBottom'><input id='mesWindowBtnOk' type='button' onclick='closeWindow();'value='confirm' /></div>", s.appendChild(d), document.body.appendChild(s), showBackground(s, 80), "ontouchstart" in document.documentElement ? (s.ontouchstart = function (t) {
            return "mesWindowBtnOk" === t.target.id || (preventDefault(t), !1)
        }, s.ontouchmove = function (t) {
            preventDefault(t)
        }) : (s.onmousedown = function (t) {
            "mesWindowBtnOk" !== t.target.id && preventDefault(t)
        }, s.onmousemove = function (t) {
            preventDefault(t)
        })
}
function showBackground(t, e) {
    if (isIe) t.filters.alpha.opacity += 1, t.filters.alpha.opacity < e && setTimeout(function () {
        showBackground(t, e)
    }, 5); else {
        var n = parseFloat(t.style.opacity);
        n += .01, t.style.opacity = n, n < e / 100 && setTimeout(function () {
            showBackground(t, e)
        }, 5)
    }
}
function closeWindow() {
    null != document.getElementById("back") && document.getElementById("back").parentNode.removeChild(document.getElementById("back")), null != document.getElementById("mesWindow") && document.getElementById("mesWindow").parentNode.removeChild(document.getElementById("mesWindow")), isIe && setSelectState("")
}
function showMsgDialog(t) {
    showMessageBox2("修改小结内容", t, null, 350)
}
function showProgress(t) {
    showMsgProgress("修改小结内容", t, null, 350)
}
function showMsgProgress(t, e, n, i) {
    closeWindow();
    var a = getWindowHeight() / .99, o = getWindowWidth() / .99;
    isIe && setSelectState("hidden");
    var s = document.createElement("div");
    s.id = "back";
    var c = "font-size:15pt; text-align:center; z-index:7;top:0px;left:0px;position:fixed;background:#666;width:" + o + "px;height:" + a + "px;";
    c += isIe ? "filter:alpha(opacity=0);" : "opacity:0;", s.style.cssText = c;
    var d = document.createElement("div");
    d.id = "mesWindow", d.innerHTML = "<div id='mesWindowContent'>" + e + "</div>", s.appendChild(d), document.body.appendChild(s), showBackground(s, 80)
}
var points = [], firstPointTime = 0, signTrack = "", signTrachPointCount = 0, calculatedSigWidth = 0, calculatedSigHeight = 0, minX = 9999, minY = 9999, maxX = 0, maxY = 0, curX = 0, curY = 0, lastX = 0, lastY = 0, paste_padding = 10, imageDataTmp, isDown = !1, isDrawn = !1, isAnysignInputDlgShown = !1, isCopyingImg = !1, base_stroke_width = window.innerWidth >= 480 ? 7.5 : 5, tmp_canvas, tmp_ctx, signResCallback, signObjTmp, bh_temp = getWindowHeight(), bw_temp = getWindowWidth(), isSign, sbuilder = [], identify_callback, fresh = function () {
    if (isSign) {
        var t = ismobile(1);
        if (1 == t) {
            p = (u = document.getElementById("anysignCanvas")).getContext("2d");
            if (isDrawn) {
                r = (l = document.createElement("canvas")).getContext("2d");
                var e = _ = paste_padding, n = _, i = _, a = _;
                (w = minX - _) < 0 && (e = minX, w = 0), (v = minY - _) < 0 && (n = minY, v = 0), (f = maxX + _) > u.width && (i = 0, f = u.width), (y = maxY + _) > u.height && (a = 0, y = u.height), g = maxX - minX + e + i, m = maxY - minY + n + a, h = p.getImageData(w, v, f - w, y - v), l.width = g, l.height = m
            }
            var o = getWindowHeight(), s = getWindowWidth();
            (x = document.getElementById("dialog")).style.height = o + "px", x.style.width = s + "px", u.width < 10 && (u.width = s * u.width), u.width < s && (u.width = s), u.height = .65 * o, (b = document.getElementById("container")).style.overflowX = "scroll", b.style.overflowY = "hidden", b.style.height = .65 * o + "px", (T = document.getElementById("anysign_title")).style.height = .1 * o + "px", document.getElementById("single_scrollbar").style.height = .1 * o + "px", (C = document.getElementById("btnContainerOuter")).style.height = .1 * o + "px"
        } else if (0 == t) {
            if (0 == window.orientation || 180 == window.orientation) o = .9 * getWindowHeight(), s = getWindowWidth(); else {
                if (getWindowWidth() < 569) c = .75 * getWindowHeight(); else var c = getWindowHeight();
                var d = getWindowWidth();
                o = c, s = d
            }
            var l, r, g, m, h, u = document.getElementById("anysignCanvas"), p = u.getContext("2d");
            if (isDrawn) {
                r = (l = document.createElement("canvas")).getContext("2d");
                var w, v, f, y, _ = paste_padding, e = _, n = _, i = _, a = _;
                (w = minX - _) < 0 && (e = minX, w = 0), (v = minY - _) < 0 && (n = minY, v = 0), (f = maxX + _) > u.width && (i = 0, f = u.width), (y = maxY + _) > u.height && (a = 0, y = u.height), g = maxX - minX + e + i, m = maxY - minY + n + a, h = p.getImageData(w, v, f - w, y - v), l.width = g, l.height = m
            }
            var x = document.getElementById("dialog");
            if (x.style.height = o + "px", x.style.width = s + "px", u.height = o, u.width < 10 && (u.width = s * u.width), u.width < s && (u.width = s), 0 == window.orientation || 180 == window.orientation) u.height = .7 * u.height, (b = document.getElementById("container")).style.overflowX = "scroll", b.style.overflowY = "hidden", b.style.height = .7 * o + "px", (T = document.getElementById("anysign_title")).style.height = .1 * o + "px", (C = document.getElementById("btnContainerOuter")).style.height = .2 * o + "px", (I = document.getElementById("btnContainerInner")).style.marginBottom = 0; else {
                u.height = .6 * u.height;
                var b = document.getElementById("container");
                b.style.overflowX = "scroll", b.style.overflowY = "hidden", b.style.height = .6 * o + "px";
                var T = document.getElementById("anysign_title");
                T.style.height = .1 * o + "px";
                var C = document.getElementById("btnContainerOuter");
                C.style.height = .3 * o + "px";
                var I = document.getElementById("btnContainerInner");
                I.style.marginBottom = C.style.height
            }
        }
        null != tmp_canvas && (tmp_canvas.width = u.width, tmp_canvas.height = u.height);
        window.devicePixelRatio && window.devicePixelRatio, u.height;
        if (p.strokeStyle = signObjTmp ? signObjTmp.penColor : "black", p.lineWidth = base_stroke_width, p.lineCap = "round", p.lineJoin = "round", p.shadowBlur = 5, tmp_ctx.strokeStyle = signObjTmp ? signObjTmp.penColor : "black", tmp_ctx.lineWidth = base_stroke_width, tmp_ctx.lineCap = "round", tmp_ctx.lineJoin = "round", tmp_ctx.shadowBlur = 5, !isDrawn)return void tmp_canvas.getContext("2d").clearRect(0, 0, u.width, u.height);
        var X;
        X = u.width > g ? u.height >= m ? 1 : u.height / m : u.width / u.height > g / m ? u.height / m : u.width / g, r.putImageData(h, 0, 0);
        var Y = document.createElement("canvas"), D = Y.getContext("2d");
        Y.width = g * X, Y.height = m * X, D.scale(X, X), D.drawImage(l, 0, 0), p.clearRect(0, 0, u.width, u.height), p.drawImage(Y, 0, 0), minX = 0, minY = 0, maxX *= X, maxY *= X, tmp_canvas.getContext("2d").clearRect(0, 0, u.width, u.height)
    }
};
window.addEventListener("orientationchange", fresh), window.addEventListener("resize", fresh);
var onPaint = function () {
    if (points.length < 3) {
        var t = points[0];
        return tmp_ctx.beginPath(), tmp_ctx.strokeStyle = signObjTmp.penColor, tmp_ctx.fillStyle = signObjTmp.penColor, tmp_ctx.arc(t.x, t.y, tmp_ctx.lineWidth / 2, 0, 2 * Math.PI, !0), tmp_ctx.fill(), void tmp_ctx.closePath()
    }
    tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height), tmp_ctx.beginPath(), tmp_ctx.strokeStyle = signObjTmp.penColor, tmp_ctx.fillStyle = signObjTmp.penColor, tmp_ctx.moveTo(points[0].x, points[0].y);
    for (var e = 1; e < points.length - 2; e++) {
        var n = (points[e].x + points[e + 1].x) / 2, i = (points[e].y + points[e + 1].y) / 2;
        tmp_ctx.quadraticCurveTo(points[e].x, points[e].y, n, i)
    }
    tmp_ctx.quadraticCurveTo(points[e].x, points[e].y, points[e + 1].x, points[e + 1].y), tmp_ctx.stroke(), isDrawn = !0
}, JQuery_Capable = {
    offset: function (t) {
        var e, n, i = {top: 0, left: 0}, a = t, o = a && a.ownerDocument;
        if (o)return e = o.documentElement, void 0 !== a.getBoundingClientRect && (i = a.getBoundingClientRect()), n = JQuery_Capable.getWindow(o), {
            top: i.top + (n.pageYOffset || e.scrollTop) - (e.clientTop || 0),
            left: i.left + (n.pageXOffset || e.scrollLeft) - (e.clientLeft || 0)
        }
    }, getWindow: function (t) {
        return JQuery_Capable.isWindow(t) ? t : 9 === t.nodeType && (t.defaultView || t.parentWindow)
    }, isWindow: function (t) {
        return null != t && t == t.window
    }
}, isIe = !!document.all, messContent;
function toUInt(t) {
    return t < 0 ? t + 4294967296 : t
}
function bytes32(t) {
    return [t >>> 24 & 255, t >>> 16 & 255, t >>> 8 & 255, 255 & t]
}
function bytes16sw(t) {
    return [255 & t, t >>> 8 & 255]
}
function adler32(t, r, e) {
    switch (arguments.length) {
        case 1:
            r = 0;
        case 2:
            e = t.length - r
    }
    for (var a = 1, o = 0, n = 0; n < e; n++)o = (o + (a = (a + t[r + n]) % 65521)) % 65521;
    return toUInt(o << 16 | a)
}
function crc32(t, r, e) {
    switch (arguments.length) {
        case 1:
            r = 0;
        case 2:
            e = t.length - r
    }
    var a = arguments.callee.crctable;
    if (!a) {
        a = [];
        for (var o = 0; o < 256; o++) {
            p = o;
            for (var n = 0; n < 8; n++)p = 1 & p ? 3988292384 ^ p >>> 1 : p >>> 1;
            a[o] = toUInt(p)
        }
        arguments.callee.crctable = a
    }
    for (var p = 4294967295, s = 0; s < e; s++)p = a[255 & (p ^ t[r + s])] ^ p >>> 8;
    return toUInt(4294967295 ^ p)
}
!function () {
    function t(t, r) {
        return this.slice(t, r)
    }

    function r(t, r) {
        arguments.length < 2 && (r = 0);
        for (var e = 0, a = t.length; e < a; ++e, ++r)this[r] = 255 & t[e]
    }

    function e(e) {
        var a;
        if ("number" == typeof e) {
            a = new Array(e);
            for (var o = 0; o < e; ++o)a[o] = 0
        } else a = e.slice(0);
        return a.subarray = t, a.buffer = a, a.byteLength = a.length, a.set = r, "object" == typeof e && e.buffer && (a.buffer = e.buffer), a
    }

    try {
        new Uint8Array(1);
        return
    } catch (t) {
    }
    window.Uint8Array = e, window.Uint32Array = e, window.Int32Array = e
}(), function () {
    "response" in XMLHttpRequest.prototype || "mozResponseArrayBuffer" in XMLHttpRequest.prototype || "mozResponse" in XMLHttpRequest.prototype || "responseArrayBuffer" in XMLHttpRequest.prototype || Object.defineProperty(XMLHttpRequest.prototype, "response", {
        get: function () {
            return new Uint8Array(new VBArray(this.responseBody).toArray())
        }
    })
}(), function () {
    if (!("btoa" in window)) {
        var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        window.btoa = function (r) {
            var e, a, o = "";
            for (e = 0, a = r.length; e < a; e += 3) {
                var n = 255 & r.charCodeAt(e), p = 255 & r.charCodeAt(e + 1), s = 255 & r.charCodeAt(e + 2), y = n >> 2, i = (3 & n) << 4 | p >> 4, u = e + 1 < a ? (15 & p) << 2 | s >> 6 : 64, c = e + 2 < a ? 63 & s : 64;
                o += t.charAt(y) + t.charAt(i) + t.charAt(u) + t.charAt(c)
            }
            return o
        }
    }
}();
var capabal = capabal || {
        crypto: {
            getRandomValues: function (t) {
                var r, e, a = t.length;
                if (a)for (; --a;)r = t[e = Math.floor(Math.random() * (a + 1))], t[e] = t[a], t[a] = r;
                return t
            }
        }
    };
!function () {
    var t = function () {
        var t = Array.prototype.slice.call(this.getContext("2d").getImageData(0, 0, this.width, this.height).data), r = this.width, e = this.height, a = [137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82];
        Array.prototype.push.apply(a, bytes32(r)), Array.prototype.push.apply(a, bytes32(e)), a.push(8, 6, 0, 0, 0), Array.prototype.push.apply(a, bytes32(crc32(a, 12, 17)));
        for (var o = e * (4 * r + 1), n = 0; n < e; n++)t.splice(n * (4 * r + 1), 0, 0);
        var p = Math.ceil(o / 32768);
        Array.prototype.push.apply(a, bytes32(o + 5 * p + 6));
        var s = a.length, y = o + 5 * p + 6 + 4;
        a.push(73, 68, 65, 84, 120, 1);
        for (var i = 0; i < p; i++) {
            var u = Math.min(32768, o - 32768 * i);
            a.push(i == p - 1 ? 1 : 0), Array.prototype.push.apply(a, bytes16sw(u)), Array.prototype.push.apply(a, bytes16sw(~u));
            var c = t.slice(32768 * i, 32768 * i + u);
            Array.prototype.push.apply(a, c)
        }
        return Array.prototype.push.apply(a, bytes32(adler32(t))), Array.prototype.push.apply(a, bytes32(crc32(a, s, y))), a.push(0, 0, 0, 0, 73, 69, 78, 68), Array.prototype.push.apply(a, bytes32(crc32(a, a.length - 4, 4))), "data:image/png;base64," + btoa(a.map(function (t) {
            return String.fromCharCode(t)
        }).join(""))
    }, r = HTMLCanvasElement.prototype.toDataURL;
    HTMLCanvasElement.prototype.toDataURL = function (e) {
        var a = r.apply(this, arguments);
        return "data:," == a ? (HTMLCanvasElement.prototype.toDataURL = t, this.toDataURL()) : (HTMLCanvasElement.prototype.toDataURL = r, a)
    }
}();
!function (e, t) {
    function n() {
        if (!v.isReady) {
            try {
                T.documentElement.doScroll("left")
            } catch (e) {
                return void setTimeout(n, 1)
            }
            v.ready()
        }
    }

    function r(e, t) {
        t.src ? v.ajax({
                url: t.src,
                async: !1,
                dataType: "script"
            }) : v.globalEval(t.text || t.textContent || t.innerHTML || ""), t.parentNode && t.parentNode.removeChild(t)
    }

    function i(e, n, r, o, a, s) {
        var l = e.length;
        if ("object" == typeof n) {
            for (var c in n)i(e, c, n[c], o, a, r);
            return e
        }
        if (r !== t) {
            for (o = !s && o && v.isFunction(r), c = 0; c < l; c++)a(e[c], n, o ? r.call(e[c], c, a(e[c], n)) : r, s);
            return e
        }
        return l ? a(e[0], n) : t
    }

    function o() {
        return (new Date).getTime()
    }

    function a() {
        return !1
    }

    function s() {
        return !0
    }

    function l(e, t, n) {
        return n[0].type = e, v.event.handle.apply(t, n)
    }

    function c(e) {
        var t, n, r, i, o, a, s, l = [], c = [], u = arguments;
        if (r = v.data(this, "events"), e.liveFired !== this && r && r.live && (!e.button || "click" !== e.type)) {
            e.liveFired = this;
            var f = r.live.slice(0);
            for (o = 0; o < f.length; o++)(r = f[o]).origType.replace(U, "") === e.type ? c.push(r.selector) : f.splice(o--, 1);
            for (a = 0, s = (n = v(e.target).closest(c, e.currentTarget)).length; a < s; a++)for (o = 0; o < f.length; o++)r = f[o], n[a].selector === r.selector && (i = n[a].elem, c = null, "mouseenter" !== r.preType && "mouseleave" !== r.preType || (c = v(e.relatedTarget).closest(r.selector)[0]), c && c === i || l.push({
                elem: i,
                handleObj: r
            }));
            for (a = 0, s = l.length; a < s; a++)if (n = l[a], e.currentTarget = n.elem, e.data = n.handleObj.data, e.handleObj = n.handleObj, !1 === n.handleObj.origHandler.apply(n.elem, u)) {
                t = !1;
                break
            }
            return t
        }
    }

    function u(e, t) {
        return "live." + (e && "*" !== e ? e + "." : "") + t.replace(/\./g, "`").replace(/ /g, "&")
    }

    function f(e) {
        return !e || !e.parentNode || 11 === e.parentNode.nodeType
    }

    function d(e, t) {
        var n = 0;
        t.each(function () {
            if (this.nodeName === (e[n] && e[n].nodeName)) {
                var t = v.data(e[n++]), r = v.data(this, t);
                if (t = t && t.events) {
                    delete r.handle, r.events = {};
                    for (var i in t)for (var o in t[i])v.event.add(this, i, t[i][o], t[i][o].data)
                }
            }
        })
    }

    function p(e, t, n) {
        var r, i, o;
        return t = t && t[0] ? t[0].ownerDocument || t[0] : T, 1 === e.length && "string" == typeof e[0] && e[0].length < 512 && t === T && !pe.test(e[0]) && (v.support.checkClone || !he.test(e[0])) && (i = !0, (o = v.fragments[e[0]]) && 1 !== o && (r = o)), r || (r = t.createDocumentFragment(), v.clean(e, t, r, n)), i && (v.fragments[e[0]] = o ? r : 1), {
            fragment: r,
            cacheable: i
        }
    }

    function h(e, t) {
        var n = {};
        return v.each(Xe.concat.apply([], Xe.slice(0, t)), function () {
            n[this] = e
        }), n
    }

    function m(e) {
        return "scrollTo" in e && e.document ? e : 9 === e.nodeType && (e.defaultView || e.parentWindow)
    }

    var g, y, v = function (e, t) {
        return new v.fn.init(e, t)
    }, b = e.jQuery, x = e.$, T = e.document, w = /^[^<]*(<[\w\W]+>)[^>]*$|^#([\w-]+)$/, N = /^.[^:#\[\.,]*$/, S = /\S/, E = /^(\s|\u00A0)+|(\s|\u00A0)+$/g, C = /^<(\w+)\s*\/?>(?:<\/\1>)?$/, A = navigator.userAgent, F = !1, j = [], L = Object.prototype.toString, D = Object.prototype.hasOwnProperty, k = Array.prototype.push, O = Array.prototype.slice, M = Array.prototype.indexOf;
    v.fn = v.prototype = {
        init: function (e, n) {
            var r, i;
            if (!e)return this;
            if (e.nodeType)return this.context = this[0] = e, this.length = 1, this;
            if ("body" === e && !n)return this.context = T, this[0] = T.body, this.selector = "body", this.length = 1, this;
            if ("string" == typeof e) {
                if (!(r = w.exec(e)) || !r[1] && n)return !n && /^\w+$/.test(e) ? (this.selector = e, this.context = T, e = T.getElementsByTagName(e), v.merge(this, e)) : !n || n.jquery ? (n || g).find(e) : v(n).find(e);
                if (r[1])return i = n ? n.ownerDocument || n : T, (e = C.exec(e)) ? v.isPlainObject(n) ? (e = [T.createElement(e[1])], v.fn.attr.call(e, n, !0)) : e = [i.createElement(e[1])] : e = ((e = p([r[1]], [i])).cacheable ? e.fragment.cloneNode(!0) : e.fragment).childNodes, v.merge(this, e);
                if (n = T.getElementById(r[2])) {
                    if (n.id !== r[2])return g.find(e);
                    this.length = 1, this[0] = n
                }
                return this.context = T, this.selector = e, this
            }
            return v.isFunction(e) ? g.ready(e) : (e.selector !== t && (this.selector = e.selector, this.context = e.context), v.makeArray(e, this))
        }, selector: "", jquery: "1.4.2", length: 0, size: function () {
            return this.length
        }, toArray: function () {
            return O.call(this, 0)
        }, get: function (e) {
            return null == e ? this.toArray() : e < 0 ? this.slice(e)[0] : this[e]
        }, pushStack: function (e, t, n) {
            var r = v();
            return v.isArray(e) ? k.apply(r, e) : v.merge(r, e), r.prevObject = this, r.context = this.context, "find" === t ? r.selector = this.selector + (this.selector ? " " : "") + n : t && (r.selector = this.selector + "." + t + "(" + n + ")"), r
        }, each: function (e, t) {
            return v.each(this, e, t)
        }, ready: function (e) {
            return v.bindReady(), v.isReady ? e.call(T, v) : j && j.push(e), this
        }, eq: function (e) {
            return -1 === e ? this.slice(e) : this.slice(e, +e + 1)
        }, first: function () {
            return this.eq(0)
        }, last: function () {
            return this.eq(-1)
        }, slice: function () {
            return this.pushStack(O.apply(this, arguments), "slice", O.call(arguments).join(","))
        }, map: function (e) {
            return this.pushStack(v.map(this, function (t, n) {
                return e.call(t, n, t)
            }))
        }, end: function () {
            return this.prevObject || v(null)
        }, push: k, sort: [].sort, splice: [].splice
    }, v.fn.init.prototype = v.fn, v.extend = v.fn.extend = function () {
        var e, n, r, i, o = arguments[0] || {}, a = 1, s = arguments.length, l = !1;
        for ("boolean" == typeof o && (l = o, o = arguments[1] || {}, a = 2), "object" == typeof o || v.isFunction(o) || (o = {}), s === a && (o = this, --a); a < s; a++)if (null != (e = arguments[a]))for (n in e)r = o[n], o !== (i = e[n]) && (l && i && (v.isPlainObject(i) || v.isArray(i)) ? (r = r && (v.isPlainObject(r) || v.isArray(r)) ? r : v.isArray(i) ? [] : {}, o[n] = v.extend(l, r, i)) : i !== t && (o[n] = i));
        return o
    }, v.extend({
        noConflict: function (t) {
            return e.$ = x, t && (e.jQuery = b), v
        }, isReady: !1, ready: function () {
            if (!v.isReady) {
                if (!T.body)return setTimeout(v.ready, 13);
                if (v.isReady = !0, j) {
                    for (var e, t = 0; e = j[t++];)e.call(T, v);
                    j = null
                }
                v.fn.triggerHandler && v(T).triggerHandler("ready")
            }
        }, bindReady: function () {
            if (!F) {
                if (F = !0, "complete" === T.readyState)return v.ready();
                if (T.addEventListener) T.addEventListener("DOMContentLoaded", y, !1), e.addEventListener("load", v.ready, !1); else if (T.attachEvent) {
                    T.attachEvent("onreadystatechange", y), e.attachEvent("onload", v.ready);
                    var t = !1;
                    try {
                        t = null == e.frameElement
                    } catch (e) {
                    }
                    T.documentElement.doScroll && t && n()
                }
            }
        }, isFunction: function (e) {
            return "[object Function]" === L.call(e)
        }, isArray: function (e) {
            return "[object Array]" === L.call(e)
        }, isPlainObject: function (e) {
            if (!e || "[object Object]" !== L.call(e) || e.nodeType || e.setInterval)return !1;
            if (e.constructor && !D.call(e, "constructor") && !D.call(e.constructor.prototype, "isPrototypeOf"))return !1;
            var n;
            for (n in e);
            return n === t || D.call(e, n)
        }, isEmptyObject: function (e) {
            for (var t in e)return !1;
            return !0
        }, error: function (e) {
            throw e
        }, parseJSON: function (t) {
            return "string" == typeof t && t ? (t = v.trim(t), /^[\],:{}\s]*$/.test(t.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, "")) ? e.JSON && e.JSON.parse ? e.JSON.parse(t) : new Function("return " + t)() : void v.error("Invalid JSON: " + t)) : null
        }, noop: function () {
        }, globalEval: function (e) {
            if (e && S.test(e)) {
                var t = T.getElementsByTagName("head")[0] || T.documentElement, n = T.createElement("script");
                n.type = "text/javascript", v.support.scriptEval ? n.appendChild(T.createTextNode(e)) : n.text = e, t.insertBefore(n, t.firstChild), t.removeChild(n)
            }
        }, nodeName: function (e, t) {
            return e.nodeName && e.nodeName.toUpperCase() === t.toUpperCase()
        }, each: function (e, n, r) {
            var i, o = 0, a = e.length, s = a === t || v.isFunction(e);
            if (r)if (s) {
                for (i in e)if (!1 === n.apply(e[i], r))break
            } else for (; o < a && !1 !== n.apply(e[o++], r);); else if (s) {
                for (i in e)if (!1 === n.call(e[i], i, e[i]))break
            } else for (r = e[0]; o < a && !1 !== n.call(r, o, r); r = e[++o]);
            return e
        }, trim: function (e) {
            return (e || "").replace(E, "")
        }, makeArray: function (e, t) {
            return t = t || [], null != e && (null == e.length || "string" == typeof e || v.isFunction(e) || "function" != typeof e && e.setInterval ? k.call(t, e) : v.merge(t, e)), t
        }, inArray: function (e, t) {
            if (t.indexOf)return t.indexOf(e);
            for (var n = 0, r = t.length; n < r; n++)if (t[n] === e)return n;
            return -1
        }, merge: function (e, n) {
            var r = e.length, i = 0;
            if ("number" == typeof n.length)for (var o = n.length; i < o; i++)e[r++] = n[i]; else for (; n[i] !== t;)e[r++] = n[i++];
            return e.length = r, e
        }, grep: function (e, t, n) {
            for (var r = [], i = 0, o = e.length; i < o; i++)!n != !t(e[i], i) && r.push(e[i]);
            return r
        }, map: function (e, t, n) {
            for (var r, i = [], o = 0, a = e.length; o < a; o++)null != (r = t(e[o], o, n)) && (i[i.length] = r);
            return i.concat.apply([], i)
        }, guid: 1, proxy: function (e, n, r) {
            return 2 === arguments.length && ("string" == typeof n ? (e = (r = e)[n], n = t) : n && !v.isFunction(n) && (r = n, n = t)), !n && e && (n = function () {
                return e.apply(r || this, arguments)
            }), e && (n.guid = e.guid = e.guid || n.guid || v.guid++), n
        }, uaMatch: function (e) {
            return e = e.toLowerCase(), e = /(webkit)[ \/]([\w.]+)/.exec(e) || /(opera)(?:.*version)?[ \/]([\w.]+)/.exec(e) || /(msie) ([\w.]+)/.exec(e) || !/compatible/.test(e) && /(mozilla)(?:.*? rv:([\w.]+))?/.exec(e) || [], {
                browser: e[1] || "",
                version: e[2] || "0"
            }
        }, browser: {}
    }), (A = v.uaMatch(A)).browser && (v.browser[A.browser] = !0, v.browser.version = A.version), v.browser.webkit && (v.browser.safari = !0), M && (v.inArray = function (e, t) {
        return M.call(t, e)
    }), g = v(T), T.addEventListener ? y = function () {
            T.removeEventListener("DOMContentLoaded", y, !1), v.ready()
        } : T.attachEvent && (y = function () {
            "complete" === T.readyState && (T.detachEvent("onreadystatechange", y), v.ready())
        }), function () {
        v.support = {};
        var t = T.documentElement, n = T.createElement("script"), r = T.createElement("div"), i = "script" + o();
        r.style.display = "none", r.innerHTML = "   <link/><table></table><a href='/a' style='color:red;float:left;opacity:.55;'>a</a><input type='checkbox'/>";
        var a = r.getElementsByTagName("*"), s = r.getElementsByTagName("a")[0];
        if (a && a.length && s) {
            v.support = {
                leadingWhitespace: 3 === r.firstChild.nodeType,
                tbody: !r.getElementsByTagName("tbody").length,
                htmlSerialize: !!r.getElementsByTagName("link").length,
                style: /red/.test(s.getAttribute("style")),
                hrefNormalized: "/a" === s.getAttribute("href"),
                opacity: /^0.55$/.test(s.style.opacity),
                cssFloat: !!s.style.cssFloat,
                checkOn: "on" === r.getElementsByTagName("input")[0].value,
                optSelected: T.createElement("select").appendChild(T.createElement("option")).selected,
                parentNode: null === r.removeChild(r.appendChild(T.createElement("div"))).parentNode,
                deleteExpando: !0,
                checkClone: !1,
                scriptEval: !1,
                noCloneEvent: !0,
                boxModel: null
            }, n.type = "text/javascript";
            try {
                n.appendChild(T.createTextNode("window." + i + "=1;"))
            } catch (e) {
            }
            t.insertBefore(n, t.firstChild), e[i] && (v.support.scriptEval = !0, delete e[i]);
            try {
                delete n.test
            } catch (e) {
                v.support.deleteExpando = !1
            }
            t.removeChild(n), r.attachEvent && r.fireEvent && (r.attachEvent("onclick", function e() {
                v.support.noCloneEvent = !1, r.detachEvent("onclick", e)
            }), r.cloneNode(!0).fireEvent("onclick")), (r = T.createElement("div")).innerHTML = "<input type='radio' name='radiotest' checked='checked'/>", (t = T.createDocumentFragment()).appendChild(r.firstChild), v.support.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked, v(function () {
                var e = T.createElement("div");
                e.style.width = e.style.paddingLeft = "1px", T.body.appendChild(e), v.boxModel = v.support.boxModel = 2 === e.offsetWidth, T.body.removeChild(e).style.display = "none"
            }), t = function (e) {
                var t = T.createElement("div"), n = (e = "on" + e) in t;
                return n || (t.setAttribute(e, "return;"), n = "function" == typeof t[e]), n
            }, v.support.submitBubbles = t("submit"), v.support.changeBubbles = t("change"), t = n = r = a = s = null
        }
    }(), v.props = {
        for: "htmlFor",
        class: "className",
        readonly: "readOnly",
        maxlength: "maxLength",
        cellspacing: "cellSpacing",
        rowspan: "rowSpan",
        colspan: "colSpan",
        tabindex: "tabIndex",
        usemap: "useMap",
        frameborder: "frameBorder"
    };
    var B = "jQuery" + o(), I = 0, P = {};
    v.extend({
        cache: {}, expando: B, noData: {embed: !0, object: !0, applet: !0}, data: function (n, r, i) {
            if (!n.nodeName || !v.noData[n.nodeName.toLowerCase()]) {
                var o = (n = n == e ? P : n)[B], a = v.cache;
                return o || "string" != typeof r || i !== t ? (o || (o = ++I), "object" == typeof r ? (n[B] = o, a[o] = v.extend(!0, {}, r)) : a[o] || (n[B] = o, a[o] = {}), n = a[o], i !== t && (n[r] = i), "string" == typeof r ? n[r] : n) : null
            }
        }, removeData: function (t, n) {
            if (!t.nodeName || !v.noData[t.nodeName.toLowerCase()]) {
                var r = (t = t == e ? P : t)[B], i = v.cache, o = i[r];
                n ? o && (delete o[n], v.isEmptyObject(o) && v.removeData(t)) : (v.support.deleteExpando ? delete t[v.expando] : t.removeAttribute && t.removeAttribute(v.expando), delete i[r])
            }
        }
    }), v.fn.extend({
        data: function (e, n) {
            if (void 0 === e && this.length)return v.data(this[0]);
            if ("object" == typeof e)return this.each(function () {
                v.data(this, e)
            });
            var r = e.split(".");
            if (r[1] = r[1] ? "." + r[1] : "", n === t) {
                var i = this.triggerHandler("getData" + r[1] + "!", [r[0]]);
                return i === t && this.length && (i = v.data(this[0], e)), i === t && r[1] ? this.data(r[0]) : i
            }
            return this.trigger("setData" + r[1] + "!", [r[0], n]).each(function () {
                v.data(this, e, n)
            })
        }, removeData: function (e) {
            return this.each(function () {
                v.removeData(this, e)
            })
        }
    }), v.extend({
        queue: function (e, t, n) {
            if (e) {
                t = (t || "fx") + "queue";
                var r = v.data(e, t);
                return n ? (!r || v.isArray(n) ? r = v.data(e, t, v.makeArray(n)) : r.push(n), r) : r || []
            }
        }, dequeue: function (e, t) {
            t = t || "fx";
            var n = v.queue(e, t), r = n.shift();
            "inprogress" === r && (r = n.shift()), r && ("fx" === t && n.unshift("inprogress"), r.call(e, function () {
                v.dequeue(e, t)
            }))
        }
    }), v.fn.extend({
        queue: function (e, n) {
            return "string" != typeof e && (n = e, e = "fx"), n === t ? v.queue(this[0], e) : this.each(function () {
                    var t = v.queue(this, e, n);
                    "fx" === e && "inprogress" !== t[0] && v.dequeue(this, e)
                })
        }, dequeue: function (e) {
            return this.each(function () {
                v.dequeue(this, e)
            })
        }, delay: function (e, t) {
            return e = v.fx ? v.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function () {
                var n = this;
                setTimeout(function () {
                    v.dequeue(n, t)
                }, e)
            })
        }, clearQueue: function (e) {
            return this.queue(e || "fx", [])
        }
    });
    var q = /[\n\t]/g, H = /\s+/, R = /\r/g, $ = /href|src|style/, _ = /(button|input)/i, z = /(button|input|object|select|textarea)/i, W = /^(a|area)$/i, X = /radio|checkbox/;
    v.fn.extend({
        attr: function (e, t) {
            return i(this, e, t, !0, v.attr)
        }, removeAttr: function (e) {
            return this.each(function () {
                v.attr(this, e, ""), 1 === this.nodeType && this.removeAttribute(e)
            })
        }, addClass: function (e) {
            if (v.isFunction(e))return this.each(function (t) {
                var n = v(this);
                n.addClass(e.call(this, t, n.attr("class")))
            });
            if (e && "string" == typeof e)for (var t = (e || "").split(H), n = 0, r = this.length; n < r; n++) {
                var i = this[n];
                if (1 === i.nodeType)if (i.className) {
                    for (var o = " " + i.className + " ", a = i.className, s = 0, l = t.length; s < l; s++)o.indexOf(" " + t[s] + " ") < 0 && (a += " " + t[s]);
                    i.className = v.trim(a)
                } else i.className = e
            }
            return this
        }, removeClass: function (e) {
            if (v.isFunction(e))return this.each(function (t) {
                var n = v(this);
                n.removeClass(e.call(this, t, n.attr("class")))
            });
            if (e && "string" == typeof e || e === t)for (var n = (e || "").split(H), r = 0, i = this.length; r < i; r++) {
                var o = this[r];
                if (1 === o.nodeType && o.className)if (e) {
                    for (var a = (" " + o.className + " ").replace(q, " "), s = 0, l = n.length; s < l; s++)a = a.replace(" " + n[s] + " ", " ");
                    o.className = v.trim(a)
                } else o.className = ""
            }
            return this
        }, toggleClass: function (e, t) {
            var n = typeof e, r = "boolean" == typeof t;
            return v.isFunction(e) ? this.each(function (n) {
                    var r = v(this);
                    r.toggleClass(e.call(this, n, r.attr("class"), t), t)
                }) : this.each(function () {
                    if ("string" === n)for (var i, o = 0, a = v(this), s = t, l = e.split(H); i = l[o++];)a[(s = r ? s : !a.hasClass(i)) ? "addClass" : "removeClass"](i); else"undefined" !== n && "boolean" !== n || (this.className && v.data(this, "__className__", this.className), this.className = this.className || !1 === e ? "" : v.data(this, "__className__") || "")
                })
        }, hasClass: function (e) {
            e = " " + e + " ";
            for (var t = 0, n = this.length; t < n; t++)if ((" " + this[t].className + " ").replace(q, " ").indexOf(e) > -1)return !0;
            return !1
        }, val: function (e) {
            if (e === t) {
                var n = this[0];
                if (n) {
                    if (v.nodeName(n, "option"))return (n.attributes.value || {}).specified ? n.value : n.text;
                    if (v.nodeName(n, "select")) {
                        var r = n.selectedIndex, i = [], o = n.options;
                        if (n = "select-one" === n.type, r < 0)return null;
                        var a = n ? r : 0;
                        for (r = n ? r + 1 : o.length; a < r; a++) {
                            var s = o[a];
                            if (s.selected) {
                                if (e = v(s).val(), n)return e;
                                i.push(e)
                            }
                        }
                        return i
                    }
                    return X.test(n.type) && !v.support.checkOn ? null === n.getAttribute("value") ? "on" : n.value : (n.value || "").replace(R, "")
                }
                return t
            }
            var l = v.isFunction(e);
            return this.each(function (t) {
                var n = v(this), r = e;
                if (1 === this.nodeType)if (l && (r = e.call(this, t, n.val())), "number" == typeof r && (r += ""), v.isArray(r) && X.test(this.type)) this.checked = v.inArray(n.val(), r) >= 0; else if (v.nodeName(this, "select")) {
                    var i = v.makeArray(r);
                    v("option", this).each(function () {
                        this.selected = v.inArray(v(this).val(), i) >= 0
                    }), i.length || (this.selectedIndex = -1)
                } else this.value = r
            })
        }
    }), v.extend({
        attrFn: {val: !0, css: !0, html: !0, text: !0, data: !0, width: !0, height: !0, offset: !0},
        attr: function (e, n, r, i) {
            if (!e || 3 === e.nodeType || 8 === e.nodeType)return t;
            if (i && n in v.attrFn)return v(e)[n](r);
            i = 1 !== e.nodeType || !v.isXMLDoc(e);
            var o = r !== t;
            if (n = i && v.props[n] || n, 1 === e.nodeType) {
                var a = $.test(n);
                return n in e && i && !a ? (o && ("type" === n && _.test(e.nodeName) && e.parentNode && v.error("type property can't be changed"), e[n] = r), v.nodeName(e, "form") && e.getAttributeNode(n) ? e.getAttributeNode(n).nodeValue : "tabIndex" === n ? (n = e.getAttributeNode("tabIndex")) && n.specified ? n.value : z.test(e.nodeName) || W.test(e.nodeName) && e.href ? 0 : t : e[n]) : !v.support.style && i && "style" === n ? (o && (e.style.cssText = "" + r), e.style.cssText) : (o && e.setAttribute(n, "" + r), e = !v.support.hrefNormalized && i && a ? e.getAttribute(n, 2) : e.getAttribute(n), null === e ? t : e)
            }
            return v.style(e, n, r)
        }
    });
    var U = /\.(.*)$/, V = function (e) {
        return e.replace(/[^\w\s\.\|`]/g, function (e) {
            return "\\" + e
        })
    };
    v.event = {
        add: function (n, r, i, o) {
            if (3 !== n.nodeType && 8 !== n.nodeType) {
                n.setInterval && n !== e && !n.frameElement && (n = e);
                var a, s;
                if (i.handler && (i = (a = i).handler), i.guid || (i.guid = v.guid++), s = v.data(n)) {
                    var l = s.events = s.events || {}, c = s.handle;
                    c || (s.handle = c = function () {
                        return void 0 === v || v.event.triggered ? t : v.event.handle.apply(c.elem, arguments)
                    }), c.elem = n, r = r.split(" ");
                    for (var u, f, d = 0; u = r[d++];) {
                        s = a ? v.extend({}, a) : {
                                handler: i,
                                data: o
                            }, u.indexOf(".") > -1 ? (u = (f = u.split(".")).shift(), s.namespace = f.slice(0).sort().join(".")) : (f = [], s.namespace = ""), s.type = u, s.guid = i.guid;
                        var p = l[u], h = v.event.special[u] || {};
                        p || (p = l[u] = [], h.setup && !1 !== h.setup.call(n, o, f, c) || (n.addEventListener ? n.addEventListener(u, c, !1) : n.attachEvent && n.attachEvent("on" + u, c))), h.add && (h.add.call(n, s), s.handler.guid || (s.handler.guid = i.guid)), p.push(s), v.event.global[u] = !0
                    }
                    n = null
                }
            }
        },
        global: {},
        remove: function (e, t, n, r) {
            if (3 !== e.nodeType && 8 !== e.nodeType) {
                var i, o, a, s, l, c, u, f = 0, d = v.data(e), p = d && d.events;
                if (d && p)if (t && t.type && (n = t.handler, t = t.type), !t || "string" == typeof t && "." === t.charAt(0)) {
                    t = t || "";
                    for (i in p)v.event.remove(e, i + t)
                } else {
                    for (t = t.split(" "); i = t[f++];)if (l = i, o = i.indexOf(".") < 0, a = [], o || (i = (a = i.split(".")).shift(), s = new RegExp("(^|\\.)" + v.map(a.slice(0).sort(), V).join("\\.(?:.*\\.)?") + "(\\.|$)")), c = p[i])if (n) {
                        for (l = v.event.special[i] || {}, h = r || 0; h < c.length && (u = c[h], n.guid !== u.guid || ((o || s.test(u.namespace)) && (null == r && c.splice(h--, 1), l.remove && l.remove.call(e, u)), null == r)); h++);
                        (0 === c.length || null != r && 1 === c.length) && (l.teardown && !1 !== l.teardown.call(e, a) || G(e, i, d.handle), delete p[i])
                    } else for (var h = 0; h < c.length; h++)u = c[h], (o || s.test(u.namespace)) && (v.event.remove(e, l, u.handler, h), c.splice(h--, 1));
                    v.isEmptyObject(p) && ((t = d.handle) && (t.elem = null), delete d.events, delete d.handle, v.isEmptyObject(d) && v.removeData(e))
                }
            }
        },
        trigger: function (e, n, r, i) {
            var o = e.type || e;
            if (!i) {
                if (e = "object" == typeof e ? e[B] ? e : v.extend(v.Event(o), e) : v.Event(o), o.indexOf("!") >= 0 && (e.type = o = o.slice(0, -1), e.exclusive = !0), r || (e.stopPropagation(), v.event.global[o] && v.each(v.cache, function () {
                        this.events && this.events[o] && v.event.trigger(e, n, this.handle.elem)
                    })), !r || 3 === r.nodeType || 8 === r.nodeType)return t;
                e.result = t, e.target = r, (n = v.makeArray(n)).unshift(e)
            }
            e.currentTarget = r, (i = v.data(r, "handle")) && i.apply(r, n), i = r.parentNode || r.ownerDocument;
            try {
                r && r.nodeName && v.noData[r.nodeName.toLowerCase()] || r["on" + o] && !1 === r["on" + o].apply(r, n) && (e.result = !1)
            } catch (e) {
            }
            if (!e.isPropagationStopped() && i) v.event.trigger(e, n, i, !0); else if (!e.isDefaultPrevented()) {
                i = e.target;
                var a, s = v.nodeName(i, "a") && "click" === o, l = v.event.special[o] || {};
                if (!(l._default && !1 !== l._default.call(r, e) || s || i && i.nodeName && v.noData[i.nodeName.toLowerCase()])) {
                    try {
                        i[o] && ((a = i["on" + o]) && (i["on" + o] = null), v.event.triggered = !0, i[o]())
                    } catch (e) {
                    }
                    a && (i["on" + o] = a), v.event.triggered = !1
                }
            }
        },
        handle: function (n) {
            var r, i, o, a;
            if (n = arguments[0] = v.event.fix(n || e.event), n.currentTarget = this, (r = n.type.indexOf(".") < 0 && !n.exclusive) || (i = n.type.split("."), n.type = i.shift(), o = new RegExp("(^|\\.)" + i.slice(0).sort().join("\\.(?:.*\\.)?") + "(\\.|$)")), a = v.data(this, "events"), i = a[n.type], a && i) {
                a = 0;
                for (var s = (i = i.slice(0)).length; a < s; a++) {
                    var l = i[a];
                    if ((r || o.test(l.namespace)) && (n.handler = l.handler, n.data = l.data, n.handleObj = l, (l = l.handler.apply(this, arguments)) !== t && (n.result = l, !1 === l && (n.preventDefault(), n.stopPropagation())), n.isImmediatePropagationStopped()))break
                }
            }
            return n.result
        },
        props: "altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),
        fix: function (e) {
            if (e[B])return e;
            var n = e;
            e = v.Event(n);
            for (var r, i = this.props.length; i;)e[r = this.props[--i]] = n[r];
            return e.target || (e.target = e.srcElement || T), 3 === e.target.nodeType && (e.target = e.target.parentNode), !e.relatedTarget && e.fromElement && (e.relatedTarget = e.fromElement === e.target ? e.toElement : e.fromElement), null == e.pageX && null != e.clientX && (n = T.documentElement, i = T.body, e.pageX = e.clientX + (n && n.scrollLeft || i && i.scrollLeft || 0) - (n && n.clientLeft || i && i.clientLeft || 0), e.pageY = e.clientY + (n && n.scrollTop || i && i.scrollTop || 0) - (n && n.clientTop || i && i.clientTop || 0)), !e.which && (e.charCode || 0 === e.charCode ? e.charCode : e.keyCode) && (e.which = e.charCode || e.keyCode), !e.metaKey && e.ctrlKey && (e.metaKey = e.ctrlKey), e.which || e.button === t || (e.which = 1 & e.button ? 1 : 2 & e.button ? 3 : 4 & e.button ? 2 : 0), e
        },
        guid: 1e8,
        proxy: v.proxy,
        special: {
            ready: {setup: v.bindReady, teardown: v.noop}, live: {
                add: function (e) {
                    v.event.add(this, e.origType, v.extend({}, e, {handler: c}))
                }, remove: function (e) {
                    var t = !0, n = e.origType.replace(U, "");
                    v.each(v.data(this, "events").live || [], function () {
                        if (n === this.origType.replace(U, ""))return t = !1
                    }), t && v.event.remove(this, e.origType, c)
                }
            }, beforeunload: {
                setup: function (e, t, n) {
                    return this.setInterval && (this.onbeforeunload = n), !1
                }, teardown: function (e, t) {
                    this.onbeforeunload === t && (this.onbeforeunload = null)
                }
            }
        }
    };
    var G = T.removeEventListener ? function (e, t, n) {
            e.removeEventListener(t, n, !1)
        } : function (e, t, n) {
            e.detachEvent("on" + t, n)
        };
    v.Event = function (e) {
        if (!this.preventDefault)return new v.Event(e);
        e && e.type ? (this.originalEvent = e, this.type = e.type) : this.type = e, this.timeStamp = o(), this[B] = !0
    }, v.Event.prototype = {
        preventDefault: function () {
            this.isDefaultPrevented = s;
            var e = this.originalEvent;
            e && (e.preventDefault && e.preventDefault(), e.returnValue = !1)
        }, stopPropagation: function () {
            this.isPropagationStopped = s;
            var e = this.originalEvent;
            e && (e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0)
        }, stopImmediatePropagation: function () {
            this.isImmediatePropagationStopped = s, this.stopPropagation()
        }, isDefaultPrevented: a, isPropagationStopped: a, isImmediatePropagationStopped: a
    };
    var Y = function (e) {
        var t = e.relatedTarget;
        try {
            for (; t && t !== this;)t = t.parentNode;
            t !== this && (e.type = e.data, v.event.handle.apply(this, arguments))
        } catch (e) {
        }
    }, K = function (e) {
        e.type = e.data, v.event.handle.apply(this, arguments)
    };
    if (v.each({mouseenter: "mouseover", mouseleave: "mouseout"}, function (e, t) {
            v.event.special[e] = {
                setup: function (n) {
                    v.event.add(this, t, n && n.selector ? K : Y, e)
                }, teardown: function (e) {
                    v.event.remove(this, t, e && e.selector ? K : Y)
                }
            }
        }), v.support.submitBubbles || (v.event.special.submit = {
            setup: function () {
                if ("form" === this.nodeName.toLowerCase())return !1;
                v.event.add(this, "click.specialSubmit", function (e) {
                    var t = e.target, n = t.type;
                    if (("submit" === n || "image" === n) && v(t).closest("form").length)return l("submit", this, arguments)
                }), v.event.add(this, "keypress.specialSubmit", function (e) {
                    var t = e.target, n = t.type;
                    if (("text" === n || "password" === n) && v(t).closest("form").length && 13 === e.keyCode)return l("submit", this, arguments)
                })
            }, teardown: function () {
                v.event.remove(this, ".specialSubmit")
            }
        }), !v.support.changeBubbles) {
        var J, Q = /textarea|input|select/i, Z = function (e) {
            var t = e.type, n = e.value;
            return "radio" === t || "checkbox" === t ? n = e.checked : "select-multiple" === t ? n = e.selectedIndex > -1 ? v.map(e.options, function (e) {
                            return e.selected
                        }).join("-") : "" : "select" === e.nodeName.toLowerCase() && (n = e.selectedIndex), n
        }, ee = function (e, n) {
            var r, i, o = e.target;
            if (Q.test(o.nodeName) && !o.readOnly && (r = v.data(o, "_change_data"), i = Z(o), "focusout" === e.type && "radio" === o.type || v.data(o, "_change_data", i), r !== t && i !== r && (null != r || i)))return e.type = "change", v.event.trigger(e, n, o)
        };
        v.event.special.change = {
            filters: {
                focusout: ee, click: function (e) {
                    var t = e.target, n = t.type;
                    if ("radio" === n || "checkbox" === n || "select" === t.nodeName.toLowerCase())return ee.call(this, e)
                }, keydown: function (e) {
                    var t = e.target, n = t.type;
                    if (13 === e.keyCode && "textarea" !== t.nodeName.toLowerCase() || 32 === e.keyCode && ("checkbox" === n || "radio" === n) || "select-multiple" === n)return ee.call(this, e)
                }, beforeactivate: function (e) {
                    e = e.target, v.data(e, "_change_data", Z(e))
                }
            }, setup: function () {
                if ("file" === this.type)return !1;
                for (var e in J)v.event.add(this, e + ".specialChange", J[e]);
                return Q.test(this.nodeName)
            }, teardown: function () {
                return v.event.remove(this, ".specialChange"), Q.test(this.nodeName)
            }
        }, J = v.event.special.change.filters
    }
    T.addEventListener && v.each({focus: "focusin", blur: "focusout"}, function (e, t) {
        function n(e) {
            return e = v.event.fix(e), e.type = t, v.event.handle.call(this, e)
        }

        v.event.special[t] = {
            setup: function () {
                this.addEventListener(e, n, !0)
            }, teardown: function () {
                this.removeEventListener(e, n, !0)
            }
        }
    }), v.each(["bind", "one"], function (e, n) {
        v.fn[n] = function (e, r, i) {
            if ("object" == typeof e) {
                for (var o in e)this[n](o, r, e[o], i);
                return this
            }
            v.isFunction(r) && (i = r, r = t);
            var a = "one" === n ? v.proxy(i, function (e) {
                    return v(this).unbind(e, a), i.apply(this, arguments)
                }) : i;
            if ("unload" === e && "one" !== n) this.one(e, r, i); else {
                o = 0;
                for (var s = this.length; o < s; o++)v.event.add(this[o], e, a, r)
            }
            return this
        }
    }), v.fn.extend({
        unbind: function (e, t) {
            if ("object" != typeof e || e.preventDefault) {
                r = 0;
                for (var n = this.length; r < n; r++)v.event.remove(this[r], e, t)
            } else for (var r in e)this.unbind(r, e[r]);
            return this
        }, delegate: function (e, t, n, r) {
            return this.live(t, n, r, e)
        }, undelegate: function (e, t, n) {
            return 0 === arguments.length ? this.unbind("live") : this.die(t, null, n, e)
        }, trigger: function (e, t) {
            return this.each(function () {
                v.event.trigger(e, t, this)
            })
        }, triggerHandler: function (e, t) {
            if (this[0])return (e = v.Event(e)).preventDefault(), e.stopPropagation(), v.event.trigger(e, t, this[0]), e.result
        }, toggle: function (e) {
            for (var t = arguments, n = 1; n < t.length;)v.proxy(e, t[n++]);
            return this.click(v.proxy(e, function (r) {
                var i = (v.data(this, "lastToggle" + e.guid) || 0) % n;
                return v.data(this, "lastToggle" + e.guid, i + 1), r.preventDefault(), t[i].apply(this, arguments) || !1
            }))
        }, hover: function (e, t) {
            return this.mouseenter(e).mouseleave(t || e)
        }
    });
    var te = {focus: "focusin", blur: "focusout", mouseenter: "mouseover", mouseleave: "mouseout"};
    v.each(["live", "die"], function (e, n) {
        v.fn[n] = function (e, r, i, o) {
            var a, s, l, c = 0, f = o || this.selector, d = o ? this : v(this.context);
            for (v.isFunction(r) && (i = r, r = t), e = (e || "").split(" "); null != (a = e[c++]);)s = "", (o = U.exec(a)) && (s = o[0], a = a.replace(U, "")), "hover" === a ? e.push("mouseenter" + s, "mouseleave" + s) : (l = a, "focus" === a || "blur" === a ? (e.push(te[a] + s), a += s) : a = (te[a] || a) + s, "live" === n ? d.each(function () {
                        v.event.add(this, u(a, f), {
                            data: r,
                            selector: f,
                            handler: i,
                            origType: a,
                            origHandler: i,
                            preType: l
                        })
                    }) : d.unbind(u(a, f), i));
            return this
        }
    }), v.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error".split(" "), function (e, t) {
        v.fn[t] = function (e) {
            return e ? this.bind(t, e) : this.trigger(t)
        }, v.attrFn && (v.attrFn[t] = !0)
    }), e.attachEvent && !e.addEventListener && e.attachEvent("onunload", function () {
        for (var e in v.cache)if (v.cache[e].handle)try {
            v.event.remove(v.cache[e].handle.elem)
        } catch (e) {
        }
    }), function () {
        function e(t) {
            for (var n, r = "", i = 0; t[i]; i++)3 === (n = t[i]).nodeType || 4 === n.nodeType ? r += n.nodeValue : 8 !== n.nodeType && (r += e(n.childNodes));
            return r
        }

        function n(e, t, n, r, i, o) {
            i = 0;
            for (var a = r.length; i < a; i++) {
                var s = r[i];
                if (s) {
                    s = s[e];
                    for (var l = !1; s;) {
                        if (s.sizcache === n) {
                            l = r[s.sizset];
                            break
                        }
                        if (1 !== s.nodeType || o || (s.sizcache = n, s.sizset = i), s.nodeName.toLowerCase() === t) {
                            l = s;
                            break
                        }
                        s = s[e]
                    }
                    r[i] = l
                }
            }
        }

        function r(e, t, n, r, i, o) {
            i = 0;
            for (var a = r.length; i < a; i++) {
                var s = r[i];
                if (s) {
                    s = s[e];
                    for (var l = !1; s;) {
                        if (s.sizcache === n) {
                            l = r[s.sizset];
                            break
                        }
                        if (1 === s.nodeType)if (o || (s.sizcache = n, s.sizset = i), "string" != typeof t) {
                            if (s === t) {
                                l = !0;
                                break
                            }
                        } else if (c.filter(t, [s]).length > 0) {
                            l = s;
                            break
                        }
                        s = s[e]
                    }
                    r[i] = l
                }
            }
        }

        var i = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g, o = 0, a = Object.prototype.toString, s = !1, l = !0;
        [0, 0].sort(function () {
            return l = !1, 0
        });
        var c = function (e, t, n, r) {
            n = n || [];
            var o = t = t || T;
            if (1 !== t.nodeType && 9 !== t.nodeType)return [];
            if (!e || "string" != typeof e)return n;
            for (var s, l, d, h, v = [], b = !0, x = g(t), w = e; null !== (i.exec(""), s = i.exec(w));)if (w = s[3], v.push(s[1]), s[2]) {
                h = s[3];
                break
            }
            if (v.length > 1 && f.exec(e))if (2 === v.length && u.relative[v[0]]) l = y(v[0] + v[1], t); else for (l = u.relative[v[0]] ? [t] : c(v.shift(), t); v.length;)e = v.shift(), u.relative[e] && (e += v.shift()), l = y(e, l); else if (!r && v.length > 1 && 9 === t.nodeType && !x && u.match.ID.test(v[0]) && !u.match.ID.test(v[v.length - 1]) && (t = (s = c.find(v.shift(), t, x)).expr ? c.filter(s.expr, s.set)[0] : s.set[0]), t)for (l = (s = r ? {
                    expr: v.pop(),
                    set: p(r)
                } : c.find(v.pop(), 1 !== v.length || "~" !== v[0] && "+" !== v[0] || !t.parentNode ? t : t.parentNode, x)).expr ? c.filter(s.expr, s.set) : s.set, v.length > 0 ? d = p(l) : b = !1; v.length;) {
                var N = v.pop();
                s = N, u.relative[N] ? s = v.pop() : N = "", null == s && (s = t), u.relative[N](d, s, x)
            } else d = [];
            if (d || (d = l), d || c.error(N || e), "[object Array]" === a.call(d))if (b)if (t && 1 === t.nodeType)for (e = 0; null != d[e]; e++)d[e] && (!0 === d[e] || 1 === d[e].nodeType && m(t, d[e])) && n.push(l[e]); else for (e = 0; null != d[e]; e++)d[e] && 1 === d[e].nodeType && n.push(l[e]); else n.push.apply(n, d); else p(d, n);
            return h && (c(h, o, n, r), c.uniqueSort(n)), n
        };
        c.uniqueSort = function (e) {
            if (h && (s = l, e.sort(h), s))for (var t = 1; t < e.length; t++)e[t] === e[t - 1] && e.splice(t--, 1);
            return e
        }, c.matches = function (e, t) {
            return c(e, null, null, t)
        }, c.find = function (e, t, n) {
            var r, i;
            if (!e)return [];
            for (var o = 0, a = u.order.length; o < a; o++) {
                var s = u.order[o];
                if (i = u.leftMatch[s].exec(e)) {
                    var l = i[1];
                    if (i.splice(1, 1), "\\" !== l.substr(l.length - 1) && (i[1] = (i[1] || "").replace(/\\/g, ""), null != (r = u.find[s](i, t, n)))) {
                        e = e.replace(u.match[s], "");
                        break
                    }
                }
            }
            return r || (r = t.getElementsByTagName("*")), {set: r, expr: e}
        }, c.filter = function (e, n, r, i) {
            for (var o, a, s = e, l = [], f = n, d = n && n[0] && g(n[0]); e && n.length;) {
                for (var p in u.filter)if (null != (o = u.leftMatch[p].exec(e)) && o[2]) {
                    var h, m, y = u.filter[p];
                    if (m = o[1], a = !1, o.splice(1, 1), "\\" !== m.substr(m.length - 1)) {
                        if (f === l && (l = []), u.preFilter[p])if (o = u.preFilter[p](o, f, r, l, i, d)) {
                            if (!0 === o)continue
                        } else a = h = !0;
                        if (o)for (var v = 0; null != (m = f[v]); v++)if (m) {
                            var b = i ^ !!(h = y(m, o, v, f));
                            r && null != h ? b ? a = !0 : f[v] = !1 : b && (l.push(m), a = !0)
                        }
                        if (h !== t) {
                            if (r || (f = l), e = e.replace(u.match[p], ""), !a)return [];
                            break
                        }
                    }
                }
                if (e === s) {
                    if (null != a)break;
                    c.error(e)
                }
                s = e
            }
            return f
        }, c.error = function (e) {
            throw"Syntax error, unrecognized expression: " + e
        };
        var u = c.selectors = {
            order: ["ID", "NAME", "TAG"],
            match: {
                ID: /#((?:[\w\u00c0-\uFFFF-]|\\.)+)/,
                CLASS: /\.((?:[\w\u00c0-\uFFFF-]|\\.)+)/,
                NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF-]|\\.)+)['"]*\]/,
                ATTR: /\[\s*((?:[\w\u00c0-\uFFFF-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,
                TAG: /^((?:[\w\u00c0-\uFFFF\*-]|\\.)+)/,
                CHILD: /:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,
                POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,
                PSEUDO: /:((?:[\w\u00c0-\uFFFF-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
            },
            leftMatch: {},
            attrMap: {class: "className", for: "htmlFor"},
            attrHandle: {
                href: function (e) {
                    return e.getAttribute("href")
                }
            },
            relative: {
                "+": function (e, t) {
                    var n = "string" == typeof t, r = n && !/\W/.test(t);
                    n = n && !r, r && (t = t.toLowerCase()), r = 0;
                    for (var i, o = e.length; r < o; r++)if (i = e[r]) {
                        for (; (i = i.previousSibling) && 1 !== i.nodeType;);
                        e[r] = n || i && i.nodeName.toLowerCase() === t ? i || !1 : i === t
                    }
                    n && c.filter(t, e, !0)
                }, ">": function (e, t) {
                    var n = "string" == typeof t;
                    if (n && !/\W/.test(t)) {
                        t = t.toLowerCase();
                        for (var r = 0, i = e.length; r < i; r++) {
                            var o = e[r];
                            o && (n = o.parentNode, e[r] = n.nodeName.toLowerCase() === t && n)
                        }
                    } else {
                        for (r = 0, i = e.length; r < i; r++)(o = e[r]) && (e[r] = n ? o.parentNode : o.parentNode === t);
                        n && c.filter(t, e, !0)
                    }
                }, "": function (e, t, i) {
                    var a = o++, s = r;
                    if ("string" == typeof t && !/\W/.test(t)) {
                        var l = t = t.toLowerCase();
                        s = n
                    }
                    s("parentNode", t, a, e, l, i)
                }, "~": function (e, t, i) {
                    var a = o++, s = r;
                    if ("string" == typeof t && !/\W/.test(t)) {
                        var l = t = t.toLowerCase();
                        s = n
                    }
                    s("previousSibling", t, a, e, l, i)
                }
            },
            find: {
                ID: function (e, t, n) {
                    if (void 0 !== t.getElementById && !n)return (e = t.getElementById(e[1])) ? [e] : []
                }, NAME: function (e, t) {
                    if (void 0 !== t.getElementsByName) {
                        for (var n = [], r = 0, i = (t = t.getElementsByName(e[1])).length; r < i; r++)t[r].getAttribute("name") === e[1] && n.push(t[r]);
                        return 0 === n.length ? null : n
                    }
                }, TAG: function (e, t) {
                    return t.getElementsByTagName(e[1])
                }
            },
            preFilter: {
                CLASS: function (e, t, n, r, i, o) {
                    if (e = " " + e[1].replace(/\\/g, "") + " ", o)return e;
                    o = 0;
                    for (var a; null != (a = t[o]); o++)a && (i ^ (a.className && (" " + a.className + " ").replace(/[\t\n]/g, " ").indexOf(e) >= 0) ? n || r.push(a) : n && (t[o] = !1));
                    return !1
                }, ID: function (e) {
                    return e[1].replace(/\\/g, "")
                }, TAG: function (e) {
                    return e[1].toLowerCase()
                }, CHILD: function (e) {
                    if ("nth" === e[1]) {
                        var t = /(-?)(\d*)n((?:\+|-)?\d*)/.exec("even" === e[2] && "2n" || "odd" === e[2] && "2n+1" || !/\D/.test(e[2]) && "0n+" + e[2] || e[2]);
                        e[2] = t[1] + (t[2] || 1) - 0, e[3] = t[3] - 0
                    }
                    return e[0] = o++, e
                }, ATTR: function (e, t, n, r, i, o) {
                    return t = e[1].replace(/\\/g, ""), !o && u.attrMap[t] && (e[1] = u.attrMap[t]), "~=" === e[2] && (e[4] = " " + e[4] + " "), e
                }, PSEUDO: function (e, t, n, r, o) {
                    if ("not" === e[1]) {
                        if (!((i.exec(e[3]) || "").length > 1 || /^\w/.test(e[3])))return e = c.filter(e[3], t, n, !0 ^ o), n || r.push.apply(r, e), !1;
                        e[3] = c(e[3], null, null, t)
                    } else if (u.match.POS.test(e[0]) || u.match.CHILD.test(e[0]))return !0;
                    return e
                }, POS: function (e) {
                    return e.unshift(!0), e
                }
            },
            filters: {
                enabled: function (e) {
                    return !1 === e.disabled && "hidden" !== e.type
                }, disabled: function (e) {
                    return !0 === e.disabled
                }, checked: function (e) {
                    return !0 === e.checked
                }, selected: function (e) {
                    return !0 === e.selected
                }, parent: function (e) {
                    return !!e.firstChild
                }, empty: function (e) {
                    return !e.firstChild
                }, has: function (e, t, n) {
                    return !!c(n[3], e).length
                }, header: function (e) {
                    return /h\d/i.test(e.nodeName)
                }, text: function (e) {
                    return "text" === e.type
                }, radio: function (e) {
                    return "radio" === e.type
                }, checkbox: function (e) {
                    return "checkbox" === e.type
                }, file: function (e) {
                    return "file" === e.type
                }, password: function (e) {
                    return "password" === e.type
                }, submit: function (e) {
                    return "submit" === e.type
                }, image: function (e) {
                    return "image" === e.type
                }, reset: function (e) {
                    return "reset" === e.type
                }, button: function (e) {
                    return "button" === e.type || "button" === e.nodeName.toLowerCase()
                }, input: function (e) {
                    return /input|select|textarea|button/i.test(e.nodeName)
                }
            },
            setFilters: {
                first: function (e, t) {
                    return 0 === t
                }, last: function (e, t, n, r) {
                    return t === r.length - 1
                }, even: function (e, t) {
                    return t % 2 == 0
                }, odd: function (e, t) {
                    return t % 2 == 1
                }, lt: function (e, t, n) {
                    return t < n[3] - 0
                }, gt: function (e, t, n) {
                    return t > n[3] - 0
                }, nth: function (e, t, n) {
                    return n[3] - 0 === t
                }, eq: function (e, t, n) {
                    return n[3] - 0 === t
                }
            },
            filter: {
                PSEUDO: function (t, n, r, i) {
                    var o = n[1], a = u.filters[o];
                    if (a)return a(t, r, n, i);
                    if ("contains" === o)return (t.textContent || t.innerText || e([t]) || "").indexOf(n[3]) >= 0;
                    if ("not" === o) {
                        for (r = 0, i = (n = n[3]).length; r < i; r++)if (n[r] === t)return !1;
                        return !0
                    }
                    c.error("Syntax error, unrecognized expression: " + o)
                }, CHILD: function (e, t) {
                    var n = t[1], r = e;
                    switch (n) {
                        case"only":
                        case"first":
                            for (; r = r.previousSibling;)if (1 === r.nodeType)return !1;
                            if ("first" === n)return !0;
                            r = e;
                        case"last":
                            for (; r = r.nextSibling;)if (1 === r.nodeType)return !1;
                            return !0;
                        case"nth":
                            n = t[2];
                            var i = t[3];
                            if (1 === n && 0 === i)return !0;
                            t = t[0];
                            var o = e.parentNode;
                            if (o && (o.sizcache !== t || !e.nodeIndex)) {
                                var a = 0;
                                for (r = o.firstChild; r; r = r.nextSibling)1 === r.nodeType && (r.nodeIndex = ++a);
                                o.sizcache = t
                            }
                            return e = e.nodeIndex - i, 0 === n ? 0 === e : e % n == 0 && e / n >= 0
                    }
                }, ID: function (e, t) {
                    return 1 === e.nodeType && e.getAttribute("id") === t
                }, TAG: function (e, t) {
                    return "*" === t && 1 === e.nodeType || e.nodeName.toLowerCase() === t
                }, CLASS: function (e, t) {
                    return (" " + (e.className || e.getAttribute("class")) + " ").indexOf(t) > -1
                }, ATTR: function (e, t) {
                    var n = t[1];
                    n = (e = u.attrHandle[n] ? u.attrHandle[n](e) : null != e[n] ? e[n] : e.getAttribute(n)) + "";
                    var r = t[2];
                    return t = t[4], null == e ? "!=" === r : "=" === r ? n === t : "*=" === r ? n.indexOf(t) >= 0 : "~=" === r ? (" " + n + " ").indexOf(t) >= 0 : t ? "!=" === r ? n !== t : "^=" === r ? 0 === n.indexOf(t) : "$=" === r ? n.substr(n.length - t.length) === t : "|=" === r && (n === t || n.substr(0, t.length + 1) === t + "-") : n && !1 !== e
                }, POS: function (e, t, n, r) {
                    var i = u.setFilters[t[2]];
                    if (i)return i(e, n, t, r)
                }
            }
        }, f = u.match.POS;
        for (var d in u.match)u.match[d] = new RegExp(u.match[d].source + /(?![^\[]*\])(?![^\(]*\))/.source), u.leftMatch[d] = new RegExp(/(^(?:.|\r|\n)*?)/.source + u.match[d].source.replace(/\\(\d+)/g, function (e, t) {
                return "\\" + (t - 0 + 1)
            }));
        var p = function (e, t) {
            return e = Array.prototype.slice.call(e, 0), t ? (t.push.apply(t, e), t) : e
        };
        try {
            Array.prototype.slice.call(T.documentElement.childNodes, 0)
        } catch (e) {
            p = function (e, t) {
                if (t = t || [], "[object Array]" === a.call(e)) Array.prototype.push.apply(t, e); else if ("number" == typeof e.length)for (var n = 0, r = e.length; n < r; n++)t.push(e[n]); else for (n = 0; e[n]; n++)t.push(e[n]);
                return t
            }
        }
        var h;
        T.documentElement.compareDocumentPosition ? h = function (e, t) {
                return e.compareDocumentPosition && t.compareDocumentPosition ? (0 === (e = 4 & e.compareDocumentPosition(t) ? -1 : e === t ? 0 : 1) && (s = !0), e) : (e == t && (s = !0), e.compareDocumentPosition ? -1 : 1)
            } : "sourceIndex" in T.documentElement ? h = function (e, t) {
                    return e.sourceIndex && t.sourceIndex ? (0 === (e = e.sourceIndex - t.sourceIndex) && (s = !0), e) : (e == t && (s = !0), e.sourceIndex ? -1 : 1)
                } : T.createRange && (h = function (e, t) {
                    if (!e.ownerDocument || !t.ownerDocument)return e == t && (s = !0), e.ownerDocument ? -1 : 1;
                    var n = e.ownerDocument.createRange(), r = t.ownerDocument.createRange();
                    return n.setStart(e, 0), n.setEnd(e, 0), r.setStart(t, 0), r.setEnd(t, 0), 0 === (e = n.compareBoundaryPoints(Range.START_TO_END, r)) && (s = !0), e
                }), function () {
            var e = T.createElement("div"), n = "script" + (new Date).getTime();
            e.innerHTML = "<a name='" + n + "'/>";
            var r = T.documentElement;
            r.insertBefore(e, r.firstChild), T.getElementById(n) && (u.find.ID = function (e, n, r) {
                if (void 0 !== n.getElementById && !r)return (n = n.getElementById(e[1])) ? n.id === e[1] || void 0 !== n.getAttributeNode && n.getAttributeNode("id").nodeValue === e[1] ? [n] : t : []
            }, u.filter.ID = function (e, t) {
                var n = void 0 !== e.getAttributeNode && e.getAttributeNode("id");
                return 1 === e.nodeType && n && n.nodeValue === t
            }), r.removeChild(e), r = e = null
        }(), function () {
            var e = T.createElement("div");
            e.appendChild(T.createComment("")), e.getElementsByTagName("*").length > 0 && (u.find.TAG = function (e, t) {
                if (t = t.getElementsByTagName(e[1]), "*" === e[1]) {
                    e = [];
                    for (var n = 0; t[n]; n++)1 === t[n].nodeType && e.push(t[n]);
                    t = e
                }
                return t
            }), e.innerHTML = "<a href='#'></a>", e.firstChild && void 0 !== e.firstChild.getAttribute && "#" !== e.firstChild.getAttribute("href") && (u.attrHandle.href = function (e) {
                return e.getAttribute("href", 2)
            }), e = null
        }(), T.querySelectorAll && function () {
            var e = c, t = T.createElement("div");
            if (t.innerHTML = "<p class='TEST'></p>", !t.querySelectorAll || 0 !== t.querySelectorAll(".TEST").length) {
                c = function (t, n, r, i) {
                    if (n = n || T, !i && 9 === n.nodeType && !g(n))try {
                        return p(n.querySelectorAll(t), r)
                    } catch (e) {
                    }
                    return e(t, n, r, i)
                };
                for (var n in e)c[n] = e[n];
                t = null
            }
        }(), function () {
            var e = T.createElement("div");
            e.innerHTML = "<div class='test e'></div><div class='test'></div>", e.getElementsByClassName && 0 !== e.getElementsByClassName("e").length && (e.lastChild.className = "e", 1 !== e.getElementsByClassName("e").length && (u.order.splice(1, 0, "CLASS"), u.find.CLASS = function (e, t, n) {
                if (void 0 !== t.getElementsByClassName && !n)return t.getElementsByClassName(e[1])
            }, e = null))
        }();
        var m = T.compareDocumentPosition ? function (e, t) {
                return !!(16 & e.compareDocumentPosition(t))
            } : function (e, t) {
                return e !== t && (!e.contains || e.contains(t))
            }, g = function (e) {
            return !!(e = (e ? e.ownerDocument || e : 0).documentElement) && "HTML" !== e.nodeName
        }, y = function (e, t) {
            var n, r = [], i = "";
            for (t = t.nodeType ? [t] : t; n = u.match.PSEUDO.exec(e);)i += n[0], e = e.replace(u.match.PSEUDO, "");
            e = u.relative[e] ? e + "*" : e, n = 0;
            for (var o = t.length; n < o; n++)c(e, t[n], r);
            return c.filter(i, r)
        };
        v.find = c, v.expr = c.selectors, v.expr[":"] = v.expr.filters, v.unique = c.uniqueSort, v.text = e, v.isXMLDoc = g, v.contains = m
    }();
    var ne = /Until$/, re = /^(?:parents|prevUntil|prevAll)/, ie = /,/;
    O = Array.prototype.slice;
    var oe = function (e, t, n) {
        if (v.isFunction(t))return v.grep(e, function (e, r) {
            return !!t.call(e, r, e) === n
        });
        if (t.nodeType)return v.grep(e, function (e) {
            return e === t === n
        });
        if ("string" == typeof t) {
            var r = v.grep(e, function (e) {
                return 1 === e.nodeType
            });
            if (N.test(t))return v.filter(t, r, !n);
            t = v.filter(t, r)
        }
        return v.grep(e, function (e) {
            return v.inArray(e, t) >= 0 === n
        })
    };
    v.fn.extend({
        find: function (e) {
            for (var t = this.pushStack("", "find", e), n = 0, r = 0, i = this.length; r < i; r++)if (n = t.length, v.find(e, this[r], t), r > 0)for (var o = n; o < t.length; o++)for (var a = 0; a < n; a++)if (t[a] === t[o]) {
                t.splice(o--, 1);
                break
            }
            return t
        }, has: function (e) {
            var t = v(e);
            return this.filter(function () {
                for (var e = 0, n = t.length; e < n; e++)if (v.contains(this, t[e]))return !0
            })
        }, not: function (e) {
            return this.pushStack(oe(this, e, !1), "not", e)
        }, filter: function (e) {
            return this.pushStack(oe(this, e, !0), "filter", e)
        }, is: function (e) {
            return !!e && v.filter(e, this).length > 0
        }, closest: function (e, t) {
            if (v.isArray(e)) {
                var n, r, i = [], o = this[0], a = {};
                if (o && e.length) {
                    n = 0;
                    for (var s = e.length; n < s; n++)a[r = e[n]] || (a[r] = v.expr.match.POS.test(r) ? v(r, t || this.context) : r);
                    for (; o && o.ownerDocument && o !== t;) {
                        for (r in a)((n = a[r]).jquery ? n.index(o) > -1 : v(o).is(n)) && (i.push({
                            selector: r,
                            elem: o
                        }), delete a[r]);
                        o = o.parentNode
                    }
                }
                return i
            }
            var l = v.expr.match.POS.test(e) ? v(e, t || this.context) : null;
            return this.map(function (n, r) {
                for (; r && r.ownerDocument && r !== t;) {
                    if (l ? l.index(r) > -1 : v(r).is(e))return r;
                    r = r.parentNode
                }
                return null
            })
        }, index: function (e) {
            return e && "string" != typeof e ? v.inArray(e.jquery ? e[0] : e, this) : v.inArray(this[0], e ? v(e) : this.parent().children())
        }, add: function (e, t) {
            return e = "string" == typeof e ? v(e, t || this.context) : v.makeArray(e), t = v.merge(this.get(), e), this.pushStack(f(e[0]) || f(t[0]) ? t : v.unique(t))
        }, andSelf: function () {
            return this.add(this.prevObject)
        }
    }), v.each({
        parent: function (e) {
            return (e = e.parentNode) && 11 !== e.nodeType ? e : null
        }, parents: function (e) {
            return v.dir(e, "parentNode")
        }, parentsUntil: function (e, t, n) {
            return v.dir(e, "parentNode", n)
        }, next: function (e) {
            return v.nth(e, 2, "nextSibling")
        }, prev: function (e) {
            return v.nth(e, 2, "previousSibling")
        }, nextAll: function (e) {
            return v.dir(e, "nextSibling")
        }, prevAll: function (e) {
            return v.dir(e, "previousSibling")
        }, nextUntil: function (e, t, n) {
            return v.dir(e, "nextSibling", n)
        }, prevUntil: function (e, t, n) {
            return v.dir(e, "previousSibling", n)
        }, siblings: function (e) {
            return v.sibling(e.parentNode.firstChild, e)
        }, children: function (e) {
            return v.sibling(e.firstChild)
        }, contents: function (e) {
            return v.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : v.makeArray(e.childNodes)
        }
    }, function (e, t) {
        v.fn[e] = function (n, r) {
            var i = v.map(this, t, n);
            return ne.test(e) || (r = n), r && "string" == typeof r && (i = v.filter(r, i)), i = this.length > 1 ? v.unique(i) : i, (this.length > 1 || ie.test(r)) && re.test(e) && (i = i.reverse()), this.pushStack(i, e, O.call(arguments).join(","))
        }
    }), v.extend({
        filter: function (e, t, n) {
            return n && (e = ":not(" + e + ")"), v.find.matches(e, t)
        }, dir: function (e, n, r) {
            var i = [];
            for (e = e[n]; e && 9 !== e.nodeType && (r === t || 1 !== e.nodeType || !v(e).is(r));)1 === e.nodeType && i.push(e), e = e[n];
            return i
        }, nth: function (e, t, n) {
            t = t || 1;
            for (var r = 0; e && (1 !== e.nodeType || ++r !== t); e = e[n]);
            return e
        }, sibling: function (e, t) {
            for (var n = []; e; e = e.nextSibling)1 === e.nodeType && e !== t && n.push(e);
            return n
        }
    });
    var ae = / jQuery\d+="(?:\d+|null)"/g, se = /^\s+/, le = /(<([\w:]+)[^>]*?)\/>/g, ce = /^(?:area|br|col|embed|hr|img|input|link|meta|param)$/i, ue = /<([\w:]+)/, fe = /<tbody/i, de = /<|&#?\w+;/, pe = /<script|<object|<embed|<option|<style/i, he = /checked\s*(?:[^=]|=\s*.checked.)/i, me = function (e, t, n) {
        return ce.test(n) ? e : t + "></" + n + ">"
    }, ge = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        legend: [1, "<fieldset>", "</fieldset>"],
        thead: [1, "<table>", "</table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
        area: [1, "<map>", "</map>"],
        _default: [0, "", ""]
    };
    ge.optgroup = ge.option, ge.tbody = ge.tfoot = ge.colgroup = ge.caption = ge.thead, ge.th = ge.td, v.support.htmlSerialize || (ge._default = [1, "div<div>", "</div>"]), v.fn.extend({
        text: function (e) {
            return v.isFunction(e) ? this.each(function (t) {
                    var n = v(this);
                    n.text(e.call(this, t, n.text()))
                }) : "object" != typeof e && e !== t ? this.empty().append((this[0] && this[0].ownerDocument || T).createTextNode(e)) : v.text(this)
        }, wrapAll: function (e) {
            if (v.isFunction(e))return this.each(function (t) {
                v(this).wrapAll(e.call(this, t))
            });
            if (this[0]) {
                var t = v(e, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && t.insertBefore(this[0]), t.map(function () {
                    for (var e = this; e.firstChild && 1 === e.firstChild.nodeType;)e = e.firstChild;
                    return e
                }).append(this)
            }
            return this
        }, wrapInner: function (e) {
            return v.isFunction(e) ? this.each(function (t) {
                    v(this).wrapInner(e.call(this, t))
                }) : this.each(function () {
                    var t = v(this), n = t.contents();
                    n.length ? n.wrapAll(e) : t.append(e)
                })
        }, wrap: function (e) {
            return this.each(function () {
                v(this).wrapAll(e)
            })
        }, unwrap: function () {
            return this.parent().each(function () {
                v.nodeName(this, "body") || v(this).replaceWith(this.childNodes)
            }).end()
        }, append: function () {
            return this.domManip(arguments, !0, function (e) {
                1 === this.nodeType && this.appendChild(e)
            })
        }, prepend: function () {
            return this.domManip(arguments, !0, function (e) {
                1 === this.nodeType && this.insertBefore(e, this.firstChild)
            })
        }, before: function () {
            if (this[0] && this[0].parentNode)return this.domManip(arguments, !1, function (e) {
                this.parentNode.insertBefore(e, this)
            });
            if (arguments.length) {
                var e = v(arguments[0]);
                return e.push.apply(e, this.toArray()), this.pushStack(e, "before", arguments)
            }
        }, after: function () {
            if (this[0] && this[0].parentNode)return this.domManip(arguments, !1, function (e) {
                this.parentNode.insertBefore(e, this.nextSibling)
            });
            if (arguments.length) {
                var e = this.pushStack(this, "after", arguments);
                return e.push.apply(e, v(arguments[0]).toArray()), e
            }
        }, remove: function (e, t) {
            for (var n, r = 0; null != (n = this[r]); r++)e && !v.filter(e, [n]).length || (t || 1 !== n.nodeType || (v.cleanData(n.getElementsByTagName("*")), v.cleanData([n])), n.parentNode && n.parentNode.removeChild(n));
            return this
        }, empty: function () {
            for (var e, t = 0; null != (e = this[t]); t++)for (1 === e.nodeType && v.cleanData(e.getElementsByTagName("*")); e.firstChild;)e.removeChild(e.firstChild);
            return this
        }, clone: function (e) {
            var t = this.map(function () {
                if (v.support.noCloneEvent || v.isXMLDoc(this))return this.cloneNode(!0);
                var e = this.outerHTML, t = this.ownerDocument;
                return e || ((e = t.createElement("div")).appendChild(this.cloneNode(!0)), e = e.innerHTML), v.clean([e.replace(ae, "").replace(/=([^="'>\s]+\/)>/g, '="$1">').replace(se, "")], t)[0]
            });
            return !0 === e && (d(this, t), d(this.find("*"), t.find("*"))), t
        }, html: function (e) {
            if (e === t)return this[0] && 1 === this[0].nodeType ? this[0].innerHTML.replace(ae, "") : null;
            if ("string" != typeof e || pe.test(e) || !v.support.leadingWhitespace && se.test(e) || ge[(ue.exec(e) || ["", ""])[1].toLowerCase()]) v.isFunction(e) ? this.each(function (t) {
                    var n = v(this), r = n.html();
                    n.empty().append(function () {
                        return e.call(this, t, r)
                    })
                }) : this.empty().append(e); else {
                e = e.replace(le, me);
                try {
                    for (var n = 0, r = this.length; n < r; n++)1 === this[n].nodeType && (v.cleanData(this[n].getElementsByTagName("*")), this[n].innerHTML = e)
                } catch (t) {
                    this.empty().append(e)
                }
            }
            return this
        }, replaceWith: function (e) {
            return this[0] && this[0].parentNode ? v.isFunction(e) ? this.each(function (t) {
                        var n = v(this), r = n.html();
                        n.replaceWith(e.call(this, t, r))
                    }) : ("string" != typeof e && (e = v(e).detach()), this.each(function () {
                        var t = this.nextSibling, n = this.parentNode;
                        v(this).remove(), t ? v(t).before(e) : v(n).append(e)
                    })) : this.pushStack(v(v.isFunction(e) ? e() : e), "replaceWith", e)
        }, detach: function (e) {
            return this.remove(e, !0)
        }, domManip: function (e, n, i) {
            var o, a, s, l = e[0], c = [];
            if (!v.support.checkClone && 3 === arguments.length && "string" == typeof l && he.test(l))return this.each(function () {
                v(this).domManip(e, n, i, !0)
            });
            if (v.isFunction(l))return this.each(function (r) {
                var o = v(this);
                e[0] = l.call(this, r, n ? o.html() : t), o.domManip(e, n, i)
            });
            if (this[0]) {
                if (o = l && l.parentNode, o = v.support.parentNode && o && 11 === o.nodeType && o.childNodes.length === this.length ? {fragment: o} : p(e, this, c), s = o.fragment, a = 1 === s.childNodes.length ? s = s.firstChild : s.firstChild) {
                    n = n && v.nodeName(a, "tr");
                    for (var u = 0, f = this.length; u < f; u++)i.call(n ? function (e) {
                            return v.nodeName(e, "table") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
                        }(this[u]) : this[u], u > 0 || o.cacheable || this.length > 1 ? s.cloneNode(!0) : s)
                }
                c.length && v.each(c, r)
            }
            return this
        }
    }), v.fragments = {}, v.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function (e, t) {
        v.fn[e] = function (n) {
            var r = [];
            n = v(n);
            var i = 1 === this.length && this[0].parentNode;
            if (i && 11 === i.nodeType && 1 === i.childNodes.length && 1 === n.length)return n[t](this[0]), this;
            i = 0;
            for (var o = n.length; i < o; i++) {
                var a = (i > 0 ? this.clone(!0) : this).get();
                v.fn[t].apply(v(n[i]), a), r = r.concat(a)
            }
            return this.pushStack(r, e, n.selector)
        }
    }), v.extend({
        clean: function (e, t, n, r) {
            void 0 === (t = t || T).createElement && (t = t.ownerDocument || t[0] && t[0].ownerDocument || T);
            for (var i, o = [], a = 0; null != (i = e[a]); a++)if ("number" == typeof i && (i += ""), i) {
                if ("string" != typeof i || de.test(i)) {
                    if ("string" == typeof i) {
                        i = i.replace(le, me);
                        var s = (ue.exec(i) || ["", ""])[1].toLowerCase(), l = ge[s] || ge._default, c = l[0], u = t.createElement("div");
                        for (u.innerHTML = l[1] + i + l[2]; c--;)u = u.lastChild;
                        if (!v.support.tbody)for (c = fe.test(i), l = (s = "table" !== s || c ? "<table>" !== l[1] || c ? [] : u.childNodes : u.firstChild && u.firstChild.childNodes).length - 1; l >= 0; --l)v.nodeName(s[l], "tbody") && !s[l].childNodes.length && s[l].parentNode.removeChild(s[l]);
                        !v.support.leadingWhitespace && se.test(i) && u.insertBefore(t.createTextNode(se.exec(i)[0]), u.firstChild), i = u.childNodes
                    }
                } else i = t.createTextNode(i);
                i.nodeType ? o.push(i) : o = v.merge(o, i)
            }
            if (n)for (a = 0; o[a]; a++)!r || !v.nodeName(o[a], "script") || o[a].type && "text/javascript" !== o[a].type.toLowerCase() ? (1 === o[a].nodeType && o.splice.apply(o, [a + 1, 0].concat(v.makeArray(o[a].getElementsByTagName("script")))), n.appendChild(o[a])) : r.push(o[a].parentNode ? o[a].parentNode.removeChild(o[a]) : o[a]);
            return o
        }, cleanData: function (e) {
            for (var t, n, r, i = v.cache, o = v.event.special, a = v.support.deleteExpando, s = 0; null != (r = e[s]); s++)if (n = r[v.expando]) {
                if ((t = i[n]).events)for (var l in t.events)o[l] ? v.event.remove(r, l) : G(r, l, t.handle);
                a ? delete r[v.expando] : r.removeAttribute && r.removeAttribute(v.expando), delete i[n]
            }
        }
    });
    var ye = /z-?index|font-?weight|opacity|zoom|line-?height/i, ve = /alpha\([^)]*\)/, be = /opacity=([^)]*)/, xe = /float/i, Te = /-([a-z])/gi, we = /([A-Z])/g, Ne = /^-?\d+(?:px)?$/i, Se = /^-?\d/, Ee = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }, Ce = ["Left", "Right"], Ae = ["Top", "Bottom"], Fe = T.defaultView && T.defaultView.getComputedStyle, je = v.support.cssFloat ? "cssFloat" : "styleFloat", Le = function (e, t) {
        return t.toUpperCase()
    };
    v.fn.css = function (e, n) {
        return i(this, e, n, !0, function (e, n, r) {
            if (r === t)return v.curCSS(e, n);
            "number" != typeof r || ye.test(n) || (r += "px"), v.style(e, n, r)
        })
    }, v.extend({
        style: function (e, n, r) {
            if (!e || 3 === e.nodeType || 8 === e.nodeType)return t;
            ("width" === n || "height" === n) && parseFloat(r) < 0 && (r = t);
            var i = e.style || e, o = r !== t;
            return v.support.opacity || "opacity" !== n ? (xe.test(n) && (n = je), n = n.replace(Te, Le), o && (i[n] = r), i[n]) : (o && (i.zoom = 1, n = parseInt(r, 10) + "" == "NaN" ? "" : "alpha(opacity=" + 100 * r + ")", e = i.filter || v.curCSS(e, "filter") || "", i.filter = ve.test(e) ? e.replace(ve, n) : n), i.filter && i.filter.indexOf("opacity=") >= 0 ? parseFloat(be.exec(i.filter)[1]) / 100 + "" : "")
        }, css: function (e, t, n, r) {
            function i() {
                o = "width" === t ? e.offsetWidth : e.offsetHeight, "border" !== r && v.each(a, function () {
                    r || (o -= parseFloat(v.curCSS(e, "padding" + this, !0)) || 0), "margin" === r ? o += parseFloat(v.curCSS(e, "margin" + this, !0)) || 0 : o -= parseFloat(v.curCSS(e, "border" + this + "Width", !0)) || 0
                })
            }

            if ("width" === t || "height" === t) {
                var o, a = "width" === t ? Ce : Ae;
                return 0 !== e.offsetWidth ? i() : v.swap(e, Ee, i), Math.max(0, Math.round(o))
            }
            return v.curCSS(e, t, n)
        }, curCSS: function (e, t, n) {
            var r, i = e.style;
            if (!v.support.opacity && "opacity" === t && e.currentStyle)return r = be.test(e.currentStyle.filter || "") ? parseFloat(RegExp.$1) / 100 + "" : "", "" === r ? "1" : r;
            if (xe.test(t) && (t = je), !n && i && i[t]) r = i[t]; else if (Fe) {
                if (xe.test(t) && (t = "float"), t = t.replace(we, "-$1").toLowerCase(), !(i = e.ownerDocument.defaultView))return null;
                (e = i.getComputedStyle(e, null)) && (r = e.getPropertyValue(t)), "opacity" === t && "" === r && (r = "1")
            } else if (e.currentStyle && (n = t.replace(Te, Le), r = e.currentStyle[t] || e.currentStyle[n], !Ne.test(r) && Se.test(r))) {
                t = i.left;
                var o = e.runtimeStyle.left;
                e.runtimeStyle.left = e.currentStyle.left, i.left = "fontSize" === n ? "1em" : r || 0, r = i.pixelLeft + "px", i.left = t, e.runtimeStyle.left = o
            }
            return r
        }, swap: function (e, t, n) {
            var r = {};
            for (var i in t)r[i] = e.style[i], e.style[i] = t[i];
            n.call(e);
            for (i in t)e.style[i] = r[i]
        }
    }), v.expr && v.expr.filters && (v.expr.filters.hidden = function (e) {
        var t = e.offsetWidth, n = e.offsetHeight, r = "tr" === e.nodeName.toLowerCase();
        return 0 === t && 0 === n && !r || !(t > 0 && n > 0 && !r) && "none" === v.curCSS(e, "display")
    }, v.expr.filters.visible = function (e) {
        return !v.expr.filters.hidden(e)
    });
    var De = o(), ke = /<script(.|\s)*?\/script>/gi, Oe = /select|textarea/i, Me = /color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week/i, Be = /=\?(&|$)/, Ie = /\?/, Pe = /(\?|&)_=.*?(&|$)/, qe = /^(\w+:)?\/\/([^\/?#]+)/, He = /%20/g, Re = v.fn.load;
    v.fn.extend({
        load: function (e, t, n) {
            if ("string" != typeof e)return Re.call(this, e);
            if (!this.length)return this;
            var r = e.indexOf(" ");
            if (r >= 0) {
                var i = e.slice(r, e.length);
                e = e.slice(0, r)
            }
            r = "GET", t && (v.isFunction(t) ? (n = t, t = null) : "object" == typeof t && (t = v.param(t, v.ajaxSettings.traditional), r = "POST"));
            var o = this;
            return v.ajax({
                url: e, type: r, dataType: "html", data: t, complete: function (e, t) {
                    "success" !== t && "notmodified" !== t || o.html(i ? v("<div />").append(e.responseText.replace(ke, "")).find(i) : e.responseText), n && o.each(n, [e.responseText, t, e])
                }
            }), this
        }, serialize: function () {
            return v.param(this.serializeArray())
        }, serializeArray: function () {
            return this.map(function () {
                return this.elements ? v.makeArray(this.elements) : this
            }).filter(function () {
                return this.name && !this.disabled && (this.checked || Oe.test(this.nodeName) || Me.test(this.type))
            }).map(function (e, t) {
                return e = v(this).val(), null == e ? null : v.isArray(e) ? v.map(e, function (e) {
                            return {name: t.name, value: e}
                        }) : {name: t.name, value: e}
            }).get()
        }
    }), v.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function (e, t) {
        v.fn[t] = function (e) {
            return this.bind(t, e)
        }
    }), v.extend({
        get: function (e, t, n, r) {
            return v.isFunction(t) && (r = r || n, n = t, t = null), v.ajax({
                type: "GET",
                url: e,
                data: t,
                success: n,
                dataType: r
            })
        },
        getScript: function (e, t) {
            return v.get(e, null, t, "script")
        },
        getJSON: function (e, t, n) {
            return v.get(e, t, n, "json")
        },
        post: function (e, t, n, r) {
            return v.isFunction(t) && (r = r || n, n = t, t = {}), v.ajax({
                type: "POST",
                url: e,
                data: t,
                success: n,
                dataType: r
            })
        },
        ajaxSetup: function (e) {
            v.extend(v.ajaxSettings, e)
        },
        ajaxSettings: {
            url: location.href,
            global: !0,
            type: "GET",
            contentType: "application/x-www-form-urlencoded",
            processData: !0,
            async: !0,
            xhr: !e.XMLHttpRequest || "file:" === e.location.protocol && e.ActiveXObject ? function () {
                    try {
                        return new e.ActiveXObject("Microsoft.XMLHTTP")
                    } catch (e) {
                    }
                } : function () {
                    return new e.XMLHttpRequest
                },
            accepts: {
                xml: "application/xml, text/xml",
                html: "text/html",
                script: "text/javascript, application/javascript",
                json: "application/json, text/javascript",
                text: "text/plain",
                _default: "*/*"
            }
        },
        lastModified: {},
        etag: {},
        ajax: function (n) {
            function r() {
                u.success && u.success.call(f, c, l, x), u.global && a("ajaxSuccess", [x, u])
            }

            function i() {
                u.complete && u.complete.call(f, x, l), u.global && a("ajaxComplete", [x, u]), u.global && !--v.active && v.event.trigger("ajaxStop")
            }

            function a(e, t) {
                (u.context ? v(u.context) : v.event).trigger(e, t)
            }

            var s, l, c, u = v.extend(!0, {}, v.ajaxSettings, n), f = n && n.context || u, d = u.type.toUpperCase();
            if (u.data && u.processData && "string" != typeof u.data && (u.data = v.param(u.data, u.traditional)), "jsonp" === u.dataType && ("GET" === d ? Be.test(u.url) || (u.url += (Ie.test(u.url) ? "&" : "?") + (u.jsonp || "callback") + "=?") : u.data && Be.test(u.data) || (u.data = (u.data ? u.data + "&" : "") + (u.jsonp || "callback") + "=?"), u.dataType = "json"), "json" === u.dataType && (u.data && Be.test(u.data) || Be.test(u.url)) && (s = u.jsonpCallback || "jsonp" + De++, u.data && (u.data = (u.data + "").replace(Be, "=" + s + "$1")), u.url = u.url.replace(Be, "=" + s + "$1"), u.dataType = "script", e[s] = e[s] || function (n) {
                        c = n, r(), i(), e[s] = t;
                        try {
                            delete e[s]
                        } catch (e) {
                        }
                        m && m.removeChild(g)
                    }), "script" === u.dataType && null === u.cache && (u.cache = !1), !1 === u.cache && "GET" === d) {
                var p = o(), h = u.url.replace(Pe, "$1_=" + p + "$2");
                u.url = h + (h === u.url ? (Ie.test(u.url) ? "&" : "?") + "_=" + p : "")
            }
            if (u.data && "GET" === d && (u.url += (Ie.test(u.url) ? "&" : "?") + u.data), u.global && !v.active++ && v.event.trigger("ajaxStart"), p = (p = qe.exec(u.url)) && (p[1] && p[1] !== location.protocol || p[2] !== location.host), "script" === u.dataType && "GET" === d && p) {
                var m = T.getElementsByTagName("head")[0] || T.documentElement, g = T.createElement("script");
                if (g.src = u.url, u.scriptCharset && (g.charset = u.scriptCharset), !s) {
                    var y = !1;
                    g.onload = g.onreadystatechange = function () {
                        y || this.readyState && "loaded" !== this.readyState && "complete" !== this.readyState || (y = !0, r(), i(), g.onload = g.onreadystatechange = null, m && g.parentNode && m.removeChild(g))
                    }
                }
                return m.insertBefore(g, m.firstChild), t
            }
            var b = !1, x = u.xhr();
            if (x) {
                u.username ? x.open(d, u.url, u.async, u.username, u.password) : x.open(d, u.url, u.async);
                try {
                    (u.data || n && n.contentType) && x.setRequestHeader("Content-Type", u.contentType), u.ifModified && (v.lastModified[u.url] && x.setRequestHeader("If-Modified-Since", v.lastModified[u.url]), v.etag[u.url] && x.setRequestHeader("If-None-Match", v.etag[u.url])), p || x.setRequestHeader("X-Requested-With", "XMLHttpRequest"), x.setRequestHeader("Accept", u.dataType && u.accepts[u.dataType] ? u.accepts[u.dataType] + ", */*" : u.accepts._default)
                } catch (e) {
                }
                if (u.beforeSend && !1 === u.beforeSend.call(f, x, u))return u.global && !--v.active && v.event.trigger("ajaxStop"), x.abort(), !1;
                u.global && a("ajaxSend", [x, u]);
                var w = x.onreadystatechange = function (e) {
                    if (x && 0 !== x.readyState && "abort" !== e) {
                        if (!b && x && (4 === x.readyState || "timeout" === e)) {
                            b = !0, x.onreadystatechange = v.noop;
                            var t;
                            if ("success" === (l = "timeout" === e ? "timeout" : v.httpSuccess(x) ? u.ifModified && v.httpNotModified(x, u.url) ? "notmodified" : "success" : "error"))try {
                                c = v.httpData(x, u.dataType, u)
                            } catch (e) {
                                l = "parsererror", t = e
                            }
                            "success" === l || "notmodified" === l ? s || r() : v.handleError(u, x, l, t), i(), "timeout" === e && x.abort(), u.async && (x = null)
                        }
                    } else b || i(), b = !0, x && (x.onreadystatechange = v.noop)
                };
                try {
                    var N = x.abort;
                    x.abort = function () {
                        x && N.call(x), w("abort")
                    }
                } catch (e) {
                }
                u.async && u.timeout > 0 && setTimeout(function () {
                    x && !b && w("timeout")
                }, u.timeout);
                try {
                    x.send("POST" === d || "PUT" === d || "DELETE" === d ? u.data : null)
                } catch (e) {
                    v.handleError(u, x, null, e), i()
                }
                return u.async || w(), x
            }
        },
        handleError: function (e, t, n, r) {
            e.error && e.error.call(e.context || e, t, n, r), e.global && (e.context ? v(e.context) : v.event).trigger("ajaxError", [t, e, r])
        },
        active: 0,
        httpSuccess: function (e) {
            try {
                return !e.status && "file:" === location.protocol || e.status >= 200 && e.status < 300 || 304 === e.status || 1223 === e.status || 0 === e.status
            } catch (e) {
            }
            return !1
        },
        httpNotModified: function (e, t) {
            var n = e.getResponseHeader("Last-Modified"), r = e.getResponseHeader("Etag");
            return n && (v.lastModified[t] = n), r && (v.etag[t] = r), 304 === e.status || 0 === e.status
        },
        httpData: function (e, t, n) {
            var r = e.getResponseHeader("content-type") || "", i = "xml" === t || !t && r.indexOf("xml") >= 0;
            return e = i ? e.responseXML : e.responseText, i && "parsererror" === e.documentElement.nodeName && v.error("parsererror"), n && n.dataFilter && (e = n.dataFilter(e, t)), "string" == typeof e && ("json" === t || !t && r.indexOf("json") >= 0 ? e = v.parseJSON(e) : ("script" === t || !t && r.indexOf("javascript") >= 0) && v.globalEval(e)), e
        },
        param: function (e, n) {
            function r(e, t) {
                v.isArray(t) ? v.each(t, function (t, o) {
                        n || /\[\]$/.test(e) ? i(e, o) : r(e + "[" + ("object" == typeof o || v.isArray(o) ? t : "") + "]", o)
                    }) : n || null == t || "object" != typeof t ? i(e, t) : v.each(t, function (t, n) {
                            r(e + "[" + t + "]", n)
                        })
            }

            function i(e, t) {
                t = v.isFunction(t) ? t() : t, o[o.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
            }

            var o = [];
            if (n === t && (n = v.ajaxSettings.traditional), v.isArray(e) || e.jquery) v.each(e, function () {
                i(this.name, this.value)
            }); else for (var a in e)r(a, e[a]);
            return o.join("&").replace(He, "+")
        }
    });
    var $e, _e = {}, ze = /toggle|show|hide/, We = /^([+-]=)?([\d+-.]+)(.*)$/, Xe = [["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"], ["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"], ["opacity"]];
    v.fn.extend({
        show: function (e, t) {
            if (e || 0 === e)return this.animate(h("show", 3), e, t);
            for (e = 0, t = this.length; e < t; e++) {
                var n = v.data(this[e], "olddisplay");
                if (this[e].style.display = n || "", "none" === v.css(this[e], "display")) {
                    n = this[e].nodeName;
                    var r;
                    if (_e[n]) r = _e[n]; else {
                        var i = v("<" + n + " />").appendTo("body");
                        "none" === (r = i.css("display")) && (r = "block"), i.remove(), _e[n] = r
                    }
                    v.data(this[e], "olddisplay", r)
                }
            }
            for (e = 0, t = this.length; e < t; e++)this[e].style.display = v.data(this[e], "olddisplay") || "";
            return this
        }, hide: function (e, t) {
            if (e || 0 === e)return this.animate(h("hide", 3), e, t);
            for (e = 0, t = this.length; e < t; e++) {
                var n = v.data(this[e], "olddisplay");
                !n && "none" !== n && v.data(this[e], "olddisplay", v.css(this[e], "display"))
            }
            for (e = 0, t = this.length; e < t; e++)this[e].style.display = "none";
            return this
        }, _toggle: v.fn.toggle, toggle: function (e, t) {
            var n = "boolean" == typeof e;
            return v.isFunction(e) && v.isFunction(t) ? this._toggle.apply(this, arguments) : null == e || n ? this.each(function () {
                        var t = n ? e : v(this).is(":hidden");
                        v(this)[t ? "show" : "hide"]()
                    }) : this.animate(h("toggle", 3), e, t), this
        }, fadeTo: function (e, t, n) {
            return this.filter(":hidden").css("opacity", 0).show().end().animate({opacity: t}, e, n)
        }, animate: function (e, t, n, r) {
            var i = v.speed(t, n, r);
            return v.isEmptyObject(e) ? this.each(i.complete) : this[!1 === i.queue ? "each" : "queue"](function () {
                    var t, n = v.extend({}, i), r = 1 === this.nodeType && v(this).is(":hidden"), o = this;
                    for (t in e) {
                        var a = t.replace(Te, Le);
                        if (t !== a && (e[a] = e[t], delete e[t], t = a), "hide" === e[t] && r || "show" === e[t] && !r)return n.complete.call(this);
                        "height" !== t && "width" !== t || !this.style || (n.display = v.css(this, "display"), n.overflow = this.style.overflow), v.isArray(e[t]) && ((n.specialEasing = n.specialEasing || {})[t] = e[t][1], e[t] = e[t][0])
                    }
                    return null != n.overflow && (this.style.overflow = "hidden"), n.curAnim = v.extend({}, e), v.each(e, function (t, i) {
                        var a = new v.fx(o, n, t);
                        if (ze.test(i)) a["toggle" === i ? r ? "show" : "hide" : i](e); else {
                            var s = We.exec(i), l = a.cur(!0) || 0;
                            if (s) {
                                i = parseFloat(s[2]);
                                var c = s[3] || "px";
                                "px" !== c && (o.style[t] = (i || 1) + c, l = (i || 1) / a.cur(!0) * l, o.style[t] = l + c), s[1] && (i = ("-=" === s[1] ? -1 : 1) * i + l), a.custom(l, i, c)
                            } else a.custom(l, i, "")
                        }
                    }), !0
                })
        }, stop: function (e, t) {
            var n = v.timers;
            return e && this.queue([]), this.each(function () {
                for (var e = n.length - 1; e >= 0; e--)n[e].elem === this && (t && n[e](!0), n.splice(e, 1))
            }), t || this.dequeue(), this
        }
    }), v.each({
        slideDown: h("show", 1),
        slideUp: h("hide", 1),
        slideToggle: h("toggle", 1),
        fadeIn: {opacity: "show"},
        fadeOut: {opacity: "hide"}
    }, function (e, t) {
        v.fn[e] = function (e, n) {
            return this.animate(t, e, n)
        }
    }), v.extend({
        speed: function (e, t, n) {
            var r = e && "object" == typeof e ? e : {
                    complete: n || !n && t || v.isFunction(e) && e,
                    duration: e,
                    easing: n && t || t && !v.isFunction(t) && t
                };
            return r.duration = v.fx.off ? 0 : "number" == typeof r.duration ? r.duration : v.fx.speeds[r.duration] || v.fx.speeds._default, r.old = r.complete, r.complete = function () {
                !1 !== r.queue && v(this).dequeue(), v.isFunction(r.old) && r.old.call(this)
            }, r
        }, easing: {
            linear: function (e, t, n, r) {
                return n + r * e
            }, swing: function (e, t, n, r) {
                return (-Math.cos(e * Math.PI) / 2 + .5) * r + n
            }
        }, timers: [], fx: function (e, t, n) {
            this.options = t, this.elem = e, this.prop = n, t.orig || (t.orig = {})
        }
    }), v.fx.prototype = {
        update: function () {
            this.options.step && this.options.step.call(this.elem, this.now, this), (v.fx.step[this.prop] || v.fx.step._default)(this), "height" !== this.prop && "width" !== this.prop || !this.elem.style || (this.elem.style.display = "block")
        }, cur: function (e) {
            return null == this.elem[this.prop] || this.elem.style && null != this.elem.style[this.prop] ? (e = parseFloat(v.css(this.elem, this.prop, e))) && e > -1e4 ? e : parseFloat(v.curCSS(this.elem, this.prop)) || 0 : this.elem[this.prop]
        }, custom: function (e, t, n) {
            function r(e) {
                return i.step(e)
            }

            this.startTime = o(), this.start = e, this.end = t, this.unit = n || this.unit || "px", this.now = this.start, this.pos = this.state = 0;
            var i = this;
            r.elem = this.elem, r() && v.timers.push(r) && !$e && ($e = setInterval(v.fx.tick, 13))
        }, show: function () {
            this.options.orig[this.prop] = v.style(this.elem, this.prop), this.options.show = !0, this.custom("width" === this.prop || "height" === this.prop ? 1 : 0, this.cur()), v(this.elem).show()
        }, hide: function () {
            this.options.orig[this.prop] = v.style(this.elem, this.prop), this.options.hide = !0, this.custom(this.cur(), 0)
        }, step: function (e) {
            var t = o(), n = !0;
            if (e || t >= this.options.duration + this.startTime) {
                this.now = this.end, this.pos = this.state = 1, this.update(), this.options.curAnim[this.prop] = !0;
                for (var r in this.options.curAnim)!0 !== this.options.curAnim[r] && (n = !1);
                if (n) {
                    if (null != this.options.display && (this.elem.style.overflow = this.options.overflow, e = v.data(this.elem, "olddisplay"), this.elem.style.display = e || this.options.display, "none" === v.css(this.elem, "display") && (this.elem.style.display = "block")), this.options.hide && v(this.elem).hide(), this.options.hide || this.options.show)for (var i in this.options.curAnim)v.style(this.elem, i, this.options.orig[i]);
                    this.options.complete.call(this.elem)
                }
                return !1
            }
            return i = t - this.startTime, this.state = i / this.options.duration, e = this.options.easing || (v.easing.swing ? "swing" : "linear"), this.pos = v.easing[this.options.specialEasing && this.options.specialEasing[this.prop] || e](this.state, i, 0, 1, this.options.duration), this.now = this.start + (this.end - this.start) * this.pos, this.update(), !0
        }
    }, v.extend(v.fx, {
        tick: function () {
            for (var e = v.timers, t = 0; t < e.length; t++)e[t]() || e.splice(t--, 1);
            e.length || v.fx.stop()
        }, stop: function () {
            clearInterval($e), $e = null
        }, speeds: {slow: 600, fast: 200, _default: 400}, step: {
            opacity: function (e) {
                v.style(e.elem, "opacity", e.now)
            }, _default: function (e) {
                e.elem.style && null != e.elem.style[e.prop] ? e.elem.style[e.prop] = ("width" === e.prop || "height" === e.prop ? Math.max(0, e.now) : e.now) + e.unit : e.elem[e.prop] = e.now
            }
        }
    }), v.expr && v.expr.filters && (v.expr.filters.animated = function (e) {
        return v.grep(v.timers, function (t) {
            return e === t.elem
        }).length
    }), v.fn.offset = "getBoundingClientRect" in T.documentElement ? function (e) {
            var t = this[0];
            if (e)return this.each(function (t) {
                v.offset.setOffset(this, e, t)
            });
            if (!t || !t.ownerDocument)return null;
            if (t === t.ownerDocument.body)return v.offset.bodyOffset(t);
            var n = t.getBoundingClientRect(), r = t.ownerDocument;
            return t = r.body, r = r.documentElement, {
                top: n.top + (self.pageYOffset || v.support.boxModel && r.scrollTop || t.scrollTop) - (r.clientTop || t.clientTop || 0),
                left: n.left + (self.pageXOffset || v.support.boxModel && r.scrollLeft || t.scrollLeft) - (r.clientLeft || t.clientLeft || 0)
            }
        } : function (e) {
            var t = this[0];
            if (e)return this.each(function (t) {
                v.offset.setOffset(this, e, t)
            });
            if (!t || !t.ownerDocument)return null;
            if (t === t.ownerDocument.body)return v.offset.bodyOffset(t);
            v.offset.initialize();
            var n, r = t.offsetParent, i = t, o = t.ownerDocument, a = o.documentElement, s = o.body;
            i = (o = o.defaultView) ? o.getComputedStyle(t, null) : t.currentStyle;
            for (var l = t.offsetTop, c = t.offsetLeft; (t = t.parentNode) && t !== s && t !== a && (!v.offset.supportsFixedPosition || "fixed" !== i.position);)n = o ? o.getComputedStyle(t, null) : t.currentStyle, l -= t.scrollTop, c -= t.scrollLeft, t === r && (l += t.offsetTop, c += t.offsetLeft, !v.offset.doesNotAddBorder || v.offset.doesAddBorderForTableAndCells && /^t(able|d|h)$/i.test(t.nodeName) || (l += parseFloat(n.borderTopWidth) || 0, c += parseFloat(n.borderLeftWidth) || 0), i = r, r = t.offsetParent), v.offset.subtractsBorderForOverflowNotVisible && "visible" !== n.overflow && (l += parseFloat(n.borderTopWidth) || 0, c += parseFloat(n.borderLeftWidth) || 0), i = n;
            return "relative" !== i.position && "static" !== i.position || (l += s.offsetTop, c += s.offsetLeft), v.offset.supportsFixedPosition && "fixed" === i.position && (l += Math.max(a.scrollTop, s.scrollTop), c += Math.max(a.scrollLeft, s.scrollLeft)), {
                top: l,
                left: c
            }
        }, v.offset = {
        initialize: function () {
            var e, t, n, r = T.body, i = T.createElement("div"), o = parseFloat(v.curCSS(r, "marginTop", !0)) || 0;
            v.extend(i.style, {
                position: "absolute",
                top: 0,
                left: 0,
                margin: 0,
                border: 0,
                width: "1px",
                height: "1px",
                visibility: "hidden"
            }), i.innerHTML = "<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>", r.insertBefore(i, r.firstChild), t = (e = i.firstChild).firstChild, n = e.nextSibling.firstChild.firstChild, this.doesNotAddBorder = 5 !== t.offsetTop, this.doesAddBorderForTableAndCells = 5 === n.offsetTop, t.style.position = "fixed", t.style.top = "20px", this.supportsFixedPosition = 20 === t.offsetTop || 15 === t.offsetTop, t.style.position = t.style.top = "", e.style.overflow = "hidden", e.style.position = "relative", this.subtractsBorderForOverflowNotVisible = -5 === t.offsetTop, this.doesNotIncludeMarginInBodyOffset = r.offsetTop !== o, r.removeChild(i), v.offset.initialize = v.noop
        }, bodyOffset: function (e) {
            var t = e.offsetTop, n = e.offsetLeft;
            return v.offset.initialize(), v.offset.doesNotIncludeMarginInBodyOffset && (t += parseFloat(v.curCSS(e, "marginTop", !0)) || 0, n += parseFloat(v.curCSS(e, "marginLeft", !0)) || 0), {
                top: t,
                left: n
            }
        }, setOffset: function (e, t, n) {
            /static/.test(v.curCSS(e, "position")) && (e.style.position = "relative");
            var r = v(e), i = r.offset(), o = parseInt(v.curCSS(e, "top", !0), 10) || 0, a = parseInt(v.curCSS(e, "left", !0), 10) || 0;
            v.isFunction(t) && (t = t.call(e, n, i)), n = {
                top: t.top - i.top + o,
                left: t.left - i.left + a
            }, "using" in t ? t.using.call(e, n) : r.css(n)
        }
    }, v.fn.extend({
        position: function () {
            if (!this[0])return null;
            var e = this[0], t = this.offsetParent(), n = this.offset(), r = /^body|html$/i.test(t[0].nodeName) ? {
                    top: 0,
                    left: 0
                } : t.offset();
            return n.top -= parseFloat(v.curCSS(e, "marginTop", !0)) || 0, n.left -= parseFloat(v.curCSS(e, "marginLeft", !0)) || 0, r.top += parseFloat(v.curCSS(t[0], "borderTopWidth", !0)) || 0, r.left += parseFloat(v.curCSS(t[0], "borderLeftWidth", !0)) || 0, {
                top: n.top - r.top,
                left: n.left - r.left
            }
        }, offsetParent: function () {
            return this.map(function () {
                for (var e = this.offsetParent || T.body; e && !/^body|html$/i.test(e.nodeName) && "static" === v.css(e, "position");)e = e.offsetParent;
                return e
            })
        }
    }), v.each(["Left", "Top"], function (e, n) {
        var r = "scroll" + n;
        v.fn[r] = function (n) {
            var i, o = this[0];
            return o ? n !== t ? this.each(function () {
                        (i = m(this)) ? i.scrollTo(e ? v(i).scrollLeft() : n, e ? n : v(i).scrollTop()) : this[r] = n
                    }) : (i = m(o)) ? "pageXOffset" in i ? i[e ? "pageYOffset" : "pageXOffset"] : v.support.boxModel && i.document.documentElement[r] || i.document.body[r] : o[r] : null
        }
    }), v.each(["Height", "Width"], function (e, n) {
        var r = n.toLowerCase();
        v.fn["inner" + n] = function () {
            return this[0] ? v.css(this[0], r, !1, "padding") : null
        }, v.fn["outer" + n] = function (e) {
            return this[0] ? v.css(this[0], r, !1, e ? "margin" : "border") : null
        }, v.fn[r] = function (e) {
            var i = this[0];
            return i ? v.isFunction(e) ? this.each(function (t) {
                        var n = v(this);
                        n[r](e.call(this, t, n[r]()))
                    }) : "scrollTo" in i && i.document ? "CSS1Compat" === i.document.compatMode && i.document.documentElement["client" + n] || i.document.body["client" + n] : 9 === i.nodeType ? Math.max(i.documentElement["client" + n], i.body["scroll" + n], i.documentElement["scroll" + n], i.body["offset" + n], i.documentElement["offset" + n]) : e === t ? v.css(i, r) : this.css(r, "string" == typeof e ? e : e + "px") : null == e ? null : this
        }
    }), e.jQuery = e.$ = v
}(window);
function OCRObj(e) {
    var r, t, n, o, a = !1;
    r = null == e ? new OCRCapture : e, t = new HWRRoot, n = new HWRInfo, t.version = "1.0", t.transID = UUID(), t.encKey = "encKey", null != r.appID && "" != r.appID && void 0 != r.appID ? (t.userID = r.appID, null != r.serviceID && "" != r.serviceID && void 0 != r.serviceID ? (t.serviceID = r.serviceID, n.type = 1, r.language == Language.CHS ? n.lang = "1" : r.language == Language.CHT && (n.lang = "2"), n.similar = r.resolution, n.text = r.text, n.hwrNum = r.count, t.hwrInfo = n, this.recognition = function (e, s, i) {
                return null == e || "" == e || void 0 == e ? "Identification parameter is empty" : e.length < 10 ? "too few coordinates" : (o = i, OCRObj(), null != n && (n.strokes = e, n.hwrNum = r.count, t.hwrInfo = n), void(null != r.IPAdress && "" != r.IPAdress && void 0 != r.IPAdress ? jQuery.ajax({
                                type: "POST",
                                data: JSON.stringify(t),
                                dataType: "JSONP",
                                contentType:"application/json",
                                timeout: window.ocrTimeOut,
                                url: r.IPAdress,
                                success: function (e) {
                                    if (null == e || "undefined" == e || "" == e) o("Link server exception, please check the network！", a); else {
                                        var r = JSON.parse(e);
                                        if (null == r || void 0 === r) alert("The server connection failed. Please try again later"); else if ("0" == r.errCode)for (var t = r.result, n = "", i = 0; i < t.length; i++)if ("0" == t[i]) {
                                            if (s == n) {
                                                a = !0;
                                                break
                                            }
                                            n = ""
                                        } else n += String.fromCharCode(t[i]);
                                        0 != r.errCode || a ? o(r.errCode, a) : o("-1", a)
                                    }
                                },
                                error: function (e, r, t) {
                                    o("request timeout", a);
                                    {
                                        if ("timeout" != r) {
                                            alert("Connect server exception: " + r + "；status code：" + e.status + "；state：" + e.readyState);
                                            var n = document.getElementById("comment_canvas");
                                            return n.getContext("2d").clearRect(0, 0, n.width, n.height), !1
                                        }
                                        alert("Request timeout, please try again later")
                                    }
                                }
                            }) : o("The server address is empty!", a)))
            }) : console.log("ocrCapture.serviceID is null")) : console.log("ocrCapture.appID is null")
}
function UUID() {
    for (var e = [], r = 0; r < 36; r++)e[r] = "0123456789abcdef".substr(Math.floor(16 * Math.random()), 1);
    return e[14] = "4", e[19] = "0123456789abcdef".substr(3 & e[19] | 8, 1), e[8] = e[13] = e[18] = e[23] = "-", e.join("")
}
function stringToBytes(e) {
    for (var r, t, n = [], o = 0; o < e.length; o++) {
        r = e.charCodeAt(o), t = [];
        do {
            t.push(255 & r), r >>= 8
        } while (r);
        n = n.concat(t.reverse())
    }
    return n
}
function anysignplugin() {
    function e() {
        document.getElementById("takePic_dialog").style.display = "none", document.getElementById("safe").style.display = "none", document.getElementById("takePic_title").style.display = "block", document.body.scroll = "yes", l = 1, i && (i.destroy(), i = null)
    }

    function t(e) {
        if (e.length) {
            var t = e[0], n = new FileReader;
            n.onload = function () {
                n.result;
                var Base64 = {encodeUint8Array: function (r) {
                    for (var e, t = 0, n = r.length, o = "", a = ""; t < n;) {
                        for (var i = 0, c = (e = r.subarray(t, Math.min(t + 32768, n))).length; i < c; i++)a += String.fromCharCode(e[i]);
                        o += a, t += 32768, a = ""
                    }
                    return btoa(o)
                }}
                var e = new Uint8Array(n.result), t = Base64.encodeUint8Array(e);
                o(t)
            }, n.readAsArrayBuffer(t)
        }
    }

    function n(e) {
        return e % 2 == 0
    }

    var o, i, a, s, l = 1;
    document.getElementById("safe").onclick = function () {
        o(a), e()
    }, document.getElementById("cancel").onclick = function () {
        e()
    }, this._initAnyPluginApi = function (e) {
        return !!(e && e instanceof Function) && (o = e, !0)
    }, this._takePicture = function () {
        if (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia)return document.getElementById("takePic_dialog").style.display = "block", s = document.getElementById("mycamera"), null != i && "" != i && void 0 !== i ? (alert("Can't find Photobooth!"), !1) : (i = new Photobooth(s), i.isSupported ? i.onImage = function (e, t) {
                    if (t) {
                        if (a = e.substring(22, e.length), n(l)) i.resume(), (o = document.getElementById("safe")).style.display = "none", (s = document.getElementById("takePic_title")).style.display = "block"; else {
                            i.pause();
                            var o = document.getElementById("safe");
                            o.style.display = "block";
                            var s = document.getElementById("takePic_title");
                            s.style.display = "none"
                        }
                        l += 1
                    }
                } : alert("HTML5 mycamera is not supported by your browser!"), !0);
        alert("HTML5 mycamera is not supported by your browser!")
    }, this._takePhonePic = function (e) {
        t(e)
    }, this._resize = function (e, t) {
        i.resize(e, t)
    }, this._pause = function () {
        i.pause()
    }, this._resumeCamera = function () {
        i.resume()
    }
}
function goPAGE() {
    return !!navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
}
window.onload = function () {
    document.getElementById("safe") && (document.getElementById("safe").style.display = "none", goPAGE() ? $(".inputstyle").show() : $(".inputstyle").hide())
};