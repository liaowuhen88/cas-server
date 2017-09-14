function BigInteger(t, r, n) {
    null != t && ("number" == typeof t ? this.fromNumber(t, r, n) : null == r && "string" != typeof t ? this.fromString(t, 256) : this.fromString(t, r))
}
function nbi() {
    return new BigInteger(null)
}
function am1(t, r, n, i, e, o) {
    for (; --o >= 0;) {
        var s = r * this[t++] + n[i] + e;
        e = Math.floor(s / 67108864),
            n[i++] = 67108863 & s
    }
    return e
}
function am2(t, r, n, i, e, o) {
    for (var s = 32767 & r,
             p = r >> 15; --o >= 0;) {
        var h = 32767 & this[t],
            a = this[t++] >> 15,
            u = p * h + a * s;
        h = s * h + ((32767 & u) << 15) + n[i] + (1073741823 & e),
            e = (h >>> 30) + (u >>> 15) + p * a + (e >>> 30),
            n[i++] = 1073741823 & h
    }
    return e
}
function am3(t, r, n, i, e, o) {
    for (var s = 16383 & r,
             p = r >> 14; --o >= 0;) {
        var h = 16383 & this[t],
            a = this[t++] >> 14,
            u = p * h + a * s;
        h = s * h + ((16383 & u) << 14) + n[i] + e,
            e = (h >> 28) + (u >> 14) + p * a,
            n[i++] = 268435455 & h
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
    for (var r = this.t - 1; r >= 0; --r) t[r] = this[r];
    t.t = this.t,
        t.s = this.s
}
function bnpFromInt(t) {
    this.t = 1,
        this.s = 0 > t ? -1 : 0,
        t > 0 ? this[0] = t: -1 > t ? this[0] = t + this.DV: this.t = 0
}
function nbv(t) {
    var r = nbi();
    return r.fromInt(t),
        r
}
function bnpFromString(t, r) {
    var n;
    if (16 == r) n = 4;
    else if (8 == r) n = 3;
    else if (256 == r) n = 8;
    else if (2 == r) n = 1;
    else if (32 == r) n = 5;
    else {
        if (4 != r) return void this.fromRadix(t, r);
        n = 2
    }
    this.t = 0,
        this.s = 0;
    for (var i = t.length,
             e = !1,
             o = 0; --i >= 0;) {
        var s = 8 == n ? 255 & t[i] : intAt(t, i);
        0 > s ? "-" == t.charAt(i) && (e = !0) : (e = !1, 0 == o ? this[this.t++] = s: o + n > this.DB ? (this[this.t - 1] |= (s & (1 << this.DB - o) - 1) << o, this[this.t++] = s >> this.DB - o) : this[this.t - 1] |= s << o, o += n, o >= this.DB && (o -= this.DB))
    }
    8 == n && 0 != (128 & t[0]) && (this.s = -1, o > 0 && (this[this.t - 1] |= (1 << this.DB - o) - 1 << o)),
        this.clamp(),
    e && BigInteger.ZERO.subTo(this, this)
}
function bnpClamp() {
    for (var t = this.s & this.DM; this.t > 0 && this[this.t - 1] == t;)--this.t
}
function bnToString(t) {
    if (this.s < 0) return "-" + this.negate().toString(t);
    var r;
    if (16 == t) r = 4;
    else if (8 == t) r = 3;
    else if (2 == t) r = 1;
    else if (32 == t) r = 5;
    else {
        if (4 != t) return this.toRadix(t);
        r = 2
    }
    var n, i = (1 << r) - 1,
        e = !1,
        o = "",
        s = this.t,
        p = this.DB - s * this.DB % r;
    if (s-->0) for (p < this.DB && (n = this[s] >> p) > 0 && (e = !0, o = int2char(n)); s >= 0;) r > p ? (n = (this[s] & (1 << p) - 1) << r - p, n |= this[--s] >> (p += this.DB - r)) : (n = this[s] >> (p -= r) & i, 0 >= p && (p += this.DB, --s)),
    n > 0 && (e = !0),
    e && (o += int2char(n));
    return e ? o: "0"
}
function bnNegate() {
    var t = nbi();
    return BigInteger.ZERO.subTo(this, t),
        t
}
function bnAbs() {
    return this.s < 0 ? this.negate() : this
}
function bnCompareTo(t) {
    var r = this.s - t.s;
    if (0 != r) return r;
    var n = this.t;
    if (r = n - t.t, 0 != r) return this.s < 0 ? -r: r;
    for (; --n >= 0;) if (0 != (r = this[n] - t[n])) return r;
    return 0
}
function nbits(t) {
    var r, n = 1;
    return 0 != (r = t >>> 16) && (t = r, n += 16),
    0 != (r = t >> 8) && (t = r, n += 8),
    0 != (r = t >> 4) && (t = r, n += 4),
    0 != (r = t >> 2) && (t = r, n += 2),
    0 != (r = t >> 1) && (t = r, n += 1),
        n
}
function bnBitLength() {
    return this.t <= 0 ? 0 : this.DB * (this.t - 1) + nbits(this[this.t - 1] ^ this.s & this.DM)
}
function bnpDLShiftTo(t, r) {
    var n;
    for (n = this.t - 1; n >= 0; --n) r[n + t] = this[n];
    for (n = t - 1; n >= 0; --n) r[n] = 0;
    r.t = this.t + t,
        r.s = this.s
}
function bnpDRShiftTo(t, r) {
    for (var n = t; n < this.t; ++n) r[n - t] = this[n];
    r.t = Math.max(this.t - t, 0),
        r.s = this.s
}
function bnpLShiftTo(t, r) {
    var n, i = t % this.DB,
        e = this.DB - i,
        o = (1 << e) - 1,
        s = Math.floor(t / this.DB),
        p = this.s << i & this.DM;
    for (n = this.t - 1; n >= 0; --n) r[n + s + 1] = this[n] >> e | p,
        p = (this[n] & o) << i;
    for (n = s - 1; n >= 0; --n) r[n] = 0;
    r[s] = p,
        r.t = this.t + s + 1,
        r.s = this.s,
        r.clamp()
}
function bnpRShiftTo(t, r) {
    r.s = this.s;
    var n = Math.floor(t / this.DB);
    if (n >= this.t) return void(r.t = 0);
    var i = t % this.DB,
        e = this.DB - i,
        o = (1 << i) - 1;
    r[0] = this[n] >> i;
    for (var s = n + 1; s < this.t; ++s) r[s - n - 1] |= (this[s] & o) << e,
        r[s - n] = this[s] >> i;
    i > 0 && (r[this.t - n - 1] |= (this.s & o) << e),
        r.t = this.t - n,
        r.clamp()
}
function bnpSubTo(t, r) {
    for (var n = 0,
             i = 0,
             e = Math.min(t.t, this.t); e > n;) i += this[n] - t[n],
        r[n++] = i & this.DM,
        i >>= this.DB;
    if (t.t < this.t) {
        for (i -= t.s; n < this.t;) i += this[n],
            r[n++] = i & this.DM,
            i >>= this.DB;
        i += this.s
    } else {
        for (i += this.s; n < t.t;) i -= t[n],
            r[n++] = i & this.DM,
            i >>= this.DB;
        i -= t.s
    }
    r.s = 0 > i ? -1 : 0,
        -1 > i ? r[n++] = this.DV + i: i > 0 && (r[n++] = i),
        r.t = n,
        r.clamp()
}
function bnpMultiplyTo(t, r) {
    var n = this.abs(),
        i = t.abs(),
        e = n.t;
    for (r.t = e + i.t; --e >= 0;) r[e] = 0;
    for (e = 0; e < i.t; ++e) r[e + n.t] = n.am(0, i[e], r, e, 0, n.t);
    r.s = 0,
        r.clamp(),
    this.s != t.s && BigInteger.ZERO.subTo(r, r)
}
function bnpSquareTo(t) {
    for (var r = this.abs(), n = t.t = 2 * r.t; --n >= 0;) t[n] = 0;
    for (n = 0; n < r.t - 1; ++n) {
        var i = r.am(n, r[n], t, 2 * n, 0, 1); (t[n + r.t] += r.am(n + 1, 2 * r[n], t, 2 * n + 1, i, r.t - n - 1)) >= r.DV && (t[n + r.t] -= r.DV, t[n + r.t + 1] = 1)
    }
    t.t > 0 && (t[t.t - 1] += r.am(n, r[n], t, 2 * n, 0, 1)),
        t.s = 0,
        t.clamp()
}
function bnpDivRemTo(t, r, n) {
    var i = t.abs();
    if (! (i.t <= 0)) {
        var e = this.abs();
        if (e.t < i.t) return null != r && r.fromInt(0),
            void(null != n && this.copyTo(n));
        null == n && (n = nbi());
        var o = nbi(),
            s = this.s,
            p = t.s,
            h = this.DB - nbits(i[i.t - 1]);
        h > 0 ? (i.lShiftTo(h, o), e.lShiftTo(h, n)) : (i.copyTo(o), e.copyTo(n));
        var a = o.t,
            u = o[a - 1];
        if (0 != u) {
            var g = u * (1 << this.F1) + (a > 1 ? o[a - 2] >> this.F2: 0),
                f = this.FV / g,
                c = (1 << this.F1) / g,
                l = 1 << this.F2,
                b = n.t,
                v = b - a,
                y = null == r ? nbi() : r;
            for (o.dlShiftTo(v, y), n.compareTo(y) >= 0 && (n[n.t++] = 1, n.subTo(y, n)), BigInteger.ONE.dlShiftTo(a, y), y.subTo(o, o); o.t < a;) o[o.t++] = 0;
            for (; --v >= 0;) {
                var m = n[--b] == u ? this.DM: Math.floor(n[b] * f + (n[b - 1] + l) * c);
                if ((n[b] += o.am(0, m, n, v, 0, a)) < m) for (o.dlShiftTo(v, y), n.subTo(y, n); n[b] < --m;) n.subTo(y, n)
            }
            null != r && (n.drShiftTo(a, r), s != p && BigInteger.ZERO.subTo(r, r)),
                n.t = a,
                n.clamp(),
            h > 0 && n.rShiftTo(h, n),
            0 > s && BigInteger.ZERO.subTo(n, n)
        }
    }
}
function bnMod(t) {
    var r = nbi();
    return this.abs().divRemTo(t, null, r),
    this.s < 0 && r.compareTo(BigInteger.ZERO) > 0 && t.subTo(r, r),
        r
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
    t.multiplyTo(r, n),
        this.reduce(n)
}
function cSqrTo(t, r) {
    t.squareTo(r),
        this.reduce(r)
}
function bnpInvDigit() {
    if (this.t < 1) return 0;
    var t = this[0];
    if (0 == (1 & t)) return 0;
    var r = 3 & t;
    return r = r * (2 - (15 & t) * r) & 15,
        r = r * (2 - (255 & t) * r) & 255,
        r = r * (2 - ((65535 & t) * r & 65535)) & 65535,
        r = r * (2 - t * r % this.DV) % this.DV,
        r > 0 ? this.DV - r: -r
}
function Montgomery(t) {
    this.m = t,
        this.mp = t.invDigit(),
        this.mpl = 32767 & this.mp,
        this.mph = this.mp >> 15,
        this.um = (1 << t.DB - 15) - 1,
        this.mt2 = 2 * t.t
}
function montConvert(t) {
    var r = nbi();
    return t.abs().dlShiftTo(this.m.t, r),
        r.divRemTo(this.m, null, r),
    t.s < 0 && r.compareTo(BigInteger.ZERO) > 0 && this.m.subTo(r, r),
        r
}
function montRevert(t) {
    var r = nbi();
    return t.copyTo(r),
        this.reduce(r),
        r
}
function montReduce(t) {
    for (; t.t <= this.mt2;) t[t.t++] = 0;
    for (var r = 0; r < this.m.t; ++r) {
        var n = 32767 & t[r],
            i = n * this.mpl + ((n * this.mph + (t[r] >> 15) * this.mpl & this.um) << 15) & t.DM;
        for (n = r + this.m.t, t[n] += this.m.am(0, i, t, r, 0, this.m.t); t[n] >= t.DV;) t[n] -= t.DV,
            t[++n]++
    }
    t.clamp(),
        t.drShiftTo(this.m.t, t),
    t.compareTo(this.m) >= 0 && t.subTo(this.m, t)
}
function montSqrTo(t, r) {
    t.squareTo(r),
        this.reduce(r)
}
function montMulTo(t, r, n) {
    t.multiplyTo(r, n),
        this.reduce(n)
}
function bnpIsEven() {
    return 0 == (this.t > 0 ? 1 & this[0] : this.s)
}
function bnpExp(t, r) {
    if (t > 4294967295 || 1 > t) return BigInteger.ONE;
    var n = nbi(),
        i = nbi(),
        e = r.convert(this),
        o = nbits(t) - 1;
    for (e.copyTo(n); --o >= 0;) if (r.sqrTo(n, i), (t & 1 << o) > 0) r.mulTo(i, e, n);
    else {
        var s = n;
        n = i,
            i = s
    }
    return r.revert(n)
}
function bnModPowInt(t, r) {
    var n;
    return n = 256 > t || r.isEven() ? new Classic(r) : new Montgomery(r),
        this.exp(t, n)
}
function Arcfour() {
    this.i = 0,
        this.j = 0,
        this.S = new Array
}
function ARC4init(t) {
    var r, n, i;
    for (r = 0; 256 > r; ++r) this.S[r] = r;
    for (n = 0, r = 0; 256 > r; ++r) n = n + this.S[r] + t[r % t.length] & 255,
        i = this.S[r],
        this.S[r] = this.S[n],
        this.S[n] = i;
    this.i = 0,
        this.j = 0
}
function ARC4next() {
    var t;
    return this.i = this.i + 1 & 255,
        this.j = this.j + this.S[this.i] & 255,
        t = this.S[this.i],
        this.S[this.i] = this.S[this.j],
        this.S[this.j] = t,
        this.S[t + this.S[this.i] & 255]
}
function prng_newstate() {
    return new Arcfour
}
function rng_seed_int(t) {
    rng_pool[rng_pptr++] ^= 255 & t,
        rng_pool[rng_pptr++] ^= t >> 8 & 255,
        rng_pool[rng_pptr++] ^= t >> 16 & 255,
        rng_pool[rng_pptr++] ^= t >> 24 & 255,
    rng_pptr >= rng_psize && (rng_pptr -= rng_psize)
}
function rng_seed_time() {
    rng_seed_int((new Date).getTime())
}
function rng_get_byte() {
    if (null == rng_state) {
        for (rng_seed_time(), rng_state = prng_newstate(), rng_state.init(rng_pool), rng_pptr = 0; rng_pptr < rng_pool.length; ++rng_pptr) rng_pool[rng_pptr] = 0;
        rng_pptr = 0
    }
    return rng_state.next()
}
function rng_get_bytes(t) {
    var r;
    for (r = 0; r < t.length; ++r) t[r] = rng_get_byte()
}
function SecureRandom() {}
function parseBigInt(t, r) {
    return new BigInteger(t, r)
}
function linebrk(t, r) {
    for (var n = "",
             i = 0; i + r < t.length;) n += t.substring(i, i + r) + "\n",
        i += r;
    return n + t.substring(i, t.length)
}
function byte2Hex(t) {
    return 16 > t ? "0" + t.toString(16) : t.toString(16)
}
function pkcs1pad2(t, r) {
    if (r < t.length + 11) return alert("Message too long for RSA"),
        null;
    for (var n = new Array,
             i = t.length - 1; i >= 0 && r > 0;) {
        var e = t.charCodeAt(i--);
        128 > e ? n[--r] = e: e > 127 && 2048 > e ? (n[--r] = 63 & e | 128, n[--r] = e >> 6 | 192) : (n[--r] = 63 & e | 128, n[--r] = e >> 6 & 63 | 128, n[--r] = e >> 12 | 224)
    }
    n[--r] = 0;
    for (var o = new SecureRandom,
             s = new Array; r > 2;) {
        for (s[0] = 0; 0 == s[0];) o.nextBytes(s);
        n[--r] = s[0]
    }
    return n[--r] = 2,
        n[--r] = 0,
        new BigInteger(n)
}
function pkcs1pad2Uint8(t, r) {
    if (r < t.length + 11) return alert("Message too long for RSA"),
        null;
    for (var n = new Array,
             i = t.length - 1; i >= 0 && r > 0;) {
        var e = t[i--];
        n[--r] = e
    }
    n[--r] = 0;
    for (var o = new SecureRandom,
             s = new Array; r > 2;) {
        for (s[0] = 0; 0 == s[0];) o.nextBytes(s);
        n[--r] = s[0]
    }
    return n[--r] = 2,
        n[--r] = 0,
        new BigInteger(n)
}
function RSAKey() {
    this.n = null,
        this.e = 0,
        this.d = null,
        this.p = null,
        this.q = null,
        this.dmp1 = null,
        this.dmq1 = null,
        this.coeff = null
}
function RSASetPublic(t, r) {
    null != t && null != r && t.length > 0 && r.length > 0 ? (this.n = parseBigInt(t, 16), this.e = parseInt(r, 16)) : alert("Invalid RSA public key")
}
function RSADoPublic(t) {
    return t.modPowInt(this.e, this.n)
}
function RSAEncrypt(t) {
    var r = pkcs1pad2(t, this.n.bitLength() + 7 >> 3);
    if (null == r) return null;
    var n = this.doPublic(r);
    if (null == n) return null;
    var i = n.toString(16);
    return 0 == (1 & i.length) ? i: "0" + i
}
function RSAUint8ArrayEncrypt(t) {
    var r = pkcs1pad2Uint8(t, this.n.bitLength() + 7 >> 3);
    if (null == r) return null;
    var n = this.doPublic(r);
    if (null == n) return null;
    var i = n.toString(16);
    return 0 == (1 & i.length) ? i: "0" + i
}
function aesEncrypt(t, r) {
    var n = CryptoJS.enc.Hex.parse(r),
        i = CryptoJS.AES.encrypt(t, n);
    return i
}
function tripleDesEncrypt(t, r) {
    var n = CryptoJS.enc.Hex.parse(r),
        i = CryptoJS.TripleDES.encrypt(t, n, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
    return i
}
function rsaPubkeyEnc(t, r, n) {
    var i = new RSAKey;
    i.setPublic(t, r);
    var e = i.encrypt(n),
        o = anysign.hex.hexStrToUint8Array(e);
    return Base64.encodeUint8Array(o)
}
function rsaPubkeyUint8Enc(t, r, n) {
    var i = new RSAKey;
    i.setPublic(t, r);
    var e = i.encryptUint8(n),
        o = anysign.hex.hexStrToUint8Array(e);
    return Base64.encodeUint8Array(o)
}
function rsaPubkeyEncByDefault(t) {
    return rsaPubkeyEnc(pubN, pubE, t)
}
function rsaPubkeyUint8EncByDefault(t) {
    return rsaPubkeyUint8Enc(pubN, pubE, t)
}
var dbits, canary = 0xdeadbeefcafe,
    j_lm = 15715070 == (16777215 & canary);
j_lm && "Microsoft Internet Explorer" == navigator.appName ? (BigInteger.prototype.am = am2, dbits = 30) : j_lm && "Netscape" != navigator.appName ? (BigInteger.prototype.am = am1, dbits = 26) : (BigInteger.prototype.am = am3, dbits = 28),
    BigInteger.prototype.DB = dbits,
    BigInteger.prototype.DM = (1 << dbits) - 1,
    BigInteger.prototype.DV = 1 << dbits;
var BI_FP = 52;
BigInteger.prototype.FV = Math.pow(2, BI_FP),
    BigInteger.prototype.F1 = BI_FP - dbits,
    BigInteger.prototype.F2 = 2 * dbits - BI_FP;
var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz",
    BI_RC = new Array,
    rr, vv;
for (rr = "0".charCodeAt(0), vv = 0; 9 >= vv; ++vv) BI_RC[rr++] = vv;
for (rr = "a".charCodeAt(0), vv = 10; 36 > vv; ++vv) BI_RC[rr++] = vv;
for (rr = "A".charCodeAt(0), vv = 10; 36 > vv; ++vv) BI_RC[rr++] = vv;
Classic.prototype.convert = cConvert,
    Classic.prototype.revert = cRevert,
    Classic.prototype.reduce = cReduce,
    Classic.prototype.mulTo = cMulTo,
    Classic.prototype.sqrTo = cSqrTo,
    Montgomery.prototype.convert = montConvert,
    Montgomery.prototype.revert = montRevert,
    Montgomery.prototype.reduce = montReduce,
    Montgomery.prototype.mulTo = montMulTo,
    Montgomery.prototype.sqrTo = montSqrTo,
    BigInteger.prototype.copyTo = bnpCopyTo,
    BigInteger.prototype.fromInt = bnpFromInt,
    BigInteger.prototype.fromString = bnpFromString,
    BigInteger.prototype.clamp = bnpClamp,
    BigInteger.prototype.dlShiftTo = bnpDLShiftTo,
    BigInteger.prototype.drShiftTo = bnpDRShiftTo,
    BigInteger.prototype.lShiftTo = bnpLShiftTo,
    BigInteger.prototype.rShiftTo = bnpRShiftTo,
    BigInteger.prototype.subTo = bnpSubTo,
    BigInteger.prototype.multiplyTo = bnpMultiplyTo,
    BigInteger.prototype.squareTo = bnpSquareTo,
    BigInteger.prototype.divRemTo = bnpDivRemTo,
    BigInteger.prototype.invDigit = bnpInvDigit,
    BigInteger.prototype.isEven = bnpIsEven,
    BigInteger.prototype.exp = bnpExp,
    BigInteger.prototype.toString = bnToString,
    BigInteger.prototype.negate = bnNegate,
    BigInteger.prototype.abs = bnAbs,
    BigInteger.prototype.compareTo = bnCompareTo,
    BigInteger.prototype.bitLength = bnBitLength,
    BigInteger.prototype.mod = bnMod,
    BigInteger.prototype.modPowInt = bnModPowInt,
    BigInteger.ZERO = nbv(0),
    BigInteger.ONE = nbv(1),
    Arcfour.prototype.init = ARC4init,
    Arcfour.prototype.next = ARC4next;
var rng_psize = 256,
    rng_state, rng_pool, rng_pptr;
if (null == rng_pool) {
    rng_pool = new Array,
        rng_pptr = 0;
    var t;
    if (window.crypto && window.crypto.getRandomValues) {
        var ua = new Uint8Array(32);
        for (window.crypto.getRandomValues(ua), t = 0; 32 > t; ++t) rng_pool[rng_pptr++] = ua[t]
    }
    if ("Netscape" == navigator.appName && navigator.appVersion < "5" && window.crypto) {
        var z = window.crypto.random(32);
        for (t = 0; t < z.length; ++t) rng_pool[rng_pptr++] = 255 & z.charCodeAt(t)
    }
    for (; rng_psize > rng_pptr;) t = Math.floor(65536 * Math.random()),
        rng_pool[rng_pptr++] = t >>> 8,
        rng_pool[rng_pptr++] = 255 & t;
    rng_pptr = 0,
        rng_seed_time()
}
SecureRandom.prototype.nextBytes = rng_get_bytes,
    RSAKey.prototype.doPublic = RSADoPublic,
    RSAKey.prototype.setPublic = RSASetPublic,
    RSAKey.prototype.encrypt = RSAEncrypt,
    RSAKey.prototype.encryptUint8 = RSAUint8ArrayEncrypt;
var pubN = "a8e745832ad4792735a3113ab103f5622222449dfcb68c69008f9f3452943e555749a607a6147bb79db1779a645944caa1314a077e0ffc48dfd9c2a6b5fb121e7909d84b88c02e8019746dcbb9339c037ab31ab3620524f6c61bdedaf8d68277dc59a9b0bcf804757db40b7687d9b95a7b15504073fd87c58698441d577d4bab",
    pubE = "10001",
    encCertSN = "1021020000067221ed";
var Base64 = {
        _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        encodeUint8Array: function(r) {
            for (var t, e = 32768,
                     n = 0,
                     o = r.length,
                     a = "",
                     h = ""; o > n;) {
                t = r.subarray(n, Math.min(n + e, o));
                for (var i = 0,
                         f = t.length; f > i; i++) h += String.fromCharCode(t[i]);
                a += h,
                    n += e,
                    h = ""
            }
            return btoa(a)
        },
        decodeUint8ArrayB64: function(r) {
            return new Uint8Array(atob(r).split("").map(function(r) {
                return r.charCodeAt(0)
            }))
        },
        encode: function(r) {
            var t, e, n, o, a, h, i, f = "",
                c = 0;
            for (r = Base64._utf8_encode(r); c < r.length;) t = r.charCodeAt(c++),
                e = r.charCodeAt(c++),
                n = r.charCodeAt(c++),
                o = t >> 2,
                a = (3 & t) << 4 | e >> 4,
                h = (15 & e) << 2 | n >> 6,
                i = 63 & n,
                isNaN(e) ? h = i = 64 : isNaN(n) && (i = 64),
                f = f + this._keyStr.charAt(o) + this._keyStr.charAt(a) + this._keyStr.charAt(h) + this._keyStr.charAt(i);
            return f
        },
        decode: function(r) {
            var t, e, n, o, a, h, i, f = "",
                c = 0;
            for (r = r.replace(/[^A-Za-z0-9\+\/\=]/g, ""); c < r.length;) o = this._keyStr.indexOf(r.charAt(c++)),
                a = this._keyStr.indexOf(r.charAt(c++)),
                h = this._keyStr.indexOf(r.charAt(c++)),
                i = this._keyStr.indexOf(r.charAt(c++)),
                t = o << 2 | a >> 4,
                e = (15 & a) << 4 | h >> 2,
                n = (3 & h) << 6 | i,
                f += String.fromCharCode(t),
            64 != h && (f += String.fromCharCode(e)),
            64 != i && (f += String.fromCharCode(n));
            return f = Base64._utf8_decode(f)
        },
        _utf8_encode: function(r) {
            r = r.replace(/\r\n/g, "\n");
            for (var t = "",
                     e = 0; e < r.length; e++) {
                var n = r.charCodeAt(e);
                128 > n ? t += String.fromCharCode(n) : n > 127 && 2048 > n ? (t += String.fromCharCode(n >> 6 | 192), t += String.fromCharCode(63 & n | 128)) : (t += String.fromCharCode(n >> 12 | 224), t += String.fromCharCode(n >> 6 & 63 | 128), t += String.fromCharCode(63 & n | 128))
            }
            return t
        },
        _utf8_decode: function(r) {
            for (var t = "",
                     e = 0,
                     n = 0,
                     o = 0,
                     a = 0; e < r.length;) n = r.charCodeAt(e),
                128 > n ? (t += String.fromCharCode(n), e++) : n > 191 && 224 > n ? (o = r.charCodeAt(e + 1), t += String.fromCharCode((31 & n) << 6 | 63 & o), e += 2) : (o = r.charCodeAt(e + 1), a = r.charCodeAt(e + 2), t += String.fromCharCode((15 & n) << 12 | (63 & o) << 6 | 63 & a), e += 3);
            return t
        }
    },
    anysign = anysign || {
            binary: {
                uint32ArrayToUint8Array: function(r) {
                    if (!r) return null;
                    for (var t, e = new Uint8Array(4 * r.length), n = 0, o = r.length; o > n; n++) t = n << 2,
                        e[t] = r[n] >> 24 & 255,
                        e[t + 1] = r[n] >> 16 & 255,
                        e[t + 2] = r[n] >> 8 & 255,
                        e[t + 3] = 255 & r[n];
                    return e
                }
            },
            hex: {
                hexEncodeArray: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"],
                uint8ArrayToHexStr: function(r) {
                    if (!r) return null;
                    for (var t = "",
                             e = 0; e < r.length; e++) {
                        var n = r[e];
                        t += this.hexEncodeArray[n >>> 4],
                            t += this.hexEncodeArray[15 & n]
                    }
                    return t
                },
                hexStrToUint8Array: function(r) {
                    if (!r || r.length % 2 != 0) return null;
                    for (var t = [], e = 0; e < r.length; e += 2) t.push(parseInt("0x" + r.substr(e, 2), 16));
                    return new Uint8Array(t)
                }
            },
            charset: {
                strToUtf8ArrayUint8: function(r) {
                    for (var t = unescape(encodeURIComponent(r)), e = new Array(t.length), n = 0; n < t.length; n++) e[n] = t.charCodeAt(n);
                    return e
                },
                utf8ArrayUint8ToStr: function(r) {
                    for (var t = "",
                             e = 0; e < r.length; e++) t += String.fromCharCode(r[e]);
                    return decodeURIComponent(escape(t))
                },
                toUtf8str: function(r) {
                    return unescape(encodeURIComponent(r))
                },
                uint8ArrayToStr: function(r) {
                    for (var t = 0; t < r.length; t++);
                }
            }
        };
function toUInt(t) {
    return 0 > t ? t + 4294967296 : t
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
    for (var a = 1,
             n = 0,
             o = 0; e > o; o++) a = (a + t[r + o]) % 65521,
        n = (n + a) % 65521;
    return toUInt(n << 16 | a)
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
        for (var n, o = 0; 256 > o; o++) {
            n = o;
            for (var p = 0; 8 > p; p++) n = 1 & n ? 3988292384 ^ n >>> 1 : n >>> 1;
            a[o] = toUInt(n)
        }
        arguments.callee.crctable = a
    }
    for (var n = 4294967295,
             s = 0; e > s; s++) n = a[255 & (n ^ t[r + s])] ^ n >>> 8;
    return toUInt(4294967295 ^ n)
} !
    function() {
        function t(t, r) {
            return this.slice(t, r)
        }
        function r(t, r) {
            arguments.length < 2 && (r = 0);
            for (var e = 0,
                     a = t.length; a > e; ++e, ++r) this[r] = 255 & t[e]
        }
        function e(e) {
            var a;
            if ("number" == typeof e) {
                a = new Array(e);
                for (var n = 0; e > n; ++n) a[n] = 0
            } else a = e.slice(0);
            return a.subarray = t,
                a.buffer = a,
                a.byteLength = a.length,
                a.set = r,
            "object" == typeof e && e.buffer && (a.buffer = e.buffer),
                a
        }
        try {
            {
                new Uint8Array(1)
            }
            return
        } catch(a) {}
        window.Uint8Array = e,
            window.Uint32Array = e,
            window.Int32Array = e
    } (),
    function() {
        "response" in XMLHttpRequest.prototype || "mozResponseArrayBuffer" in XMLHttpRequest.prototype || "mozResponse" in XMLHttpRequest.prototype || "responseArrayBuffer" in XMLHttpRequest.prototype || Object.defineProperty(XMLHttpRequest.prototype, "response", {
            get: function() {
                return new Uint8Array(new VBArray(this.responseBody).toArray())
            }
        })
    } (),
    function() {
        if (! ("btoa" in window)) {
            var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
            window.btoa = function(r) {
                var e, a, n = "";
                for (e = 0, a = r.length; a > e; e += 3) {
                    var o = 255 & r.charCodeAt(e),
                        p = 255 & r.charCodeAt(e + 1),
                        s = 255 & r.charCodeAt(e + 2),
                        y = o >> 2,
                        u = (3 & o) << 4 | p >> 4,
                        i = a > e + 1 ? (15 & p) << 2 | s >> 6 : 64,
                        c = a > e + 2 ? 63 & s: 64;
                    n += t.charAt(y) + t.charAt(u) + t.charAt(i) + t.charAt(c)
                }
                return n
            }
        }
    } ();
var capabal = capabal || {
        crypto: {
            getRandomValues: function(t) {
                var r, e, a = t.length;
                if (a) for (; --a;) e = Math.floor(Math.random() * (a + 1)),
                    r = t[e],
                    t[e] = t[a],
                    t[a] = r;
                return t
            }
        }
    }; !
    function() {
        var t = function() {
                var t = Array.prototype.slice.call(this.getContext("2d").getImageData(0, 0, this.width, this.height).data),
                    r = this.width,
                    e = this.height,
                    a = [137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82];
                Array.prototype.push.apply(a, bytes32(r)),
                    Array.prototype.push.apply(a, bytes32(e)),
                    a.push(8, 6, 0, 0, 0),
                    Array.prototype.push.apply(a, bytes32(crc32(a, 12, 17)));
                for (var n = e * (4 * r + 1), o = 0; e > o; o++) t.splice(o * (4 * r + 1), 0, 0);
                var p = Math.ceil(n / 32768);
                Array.prototype.push.apply(a, bytes32(n + 5 * p + 6));
                var s = a.length,
                    y = n + 5 * p + 6 + 4;
                a.push(73, 68, 65, 84, 120, 1);
                for (var u = 0; p > u; u++) {
                    var i = Math.min(32768, n - 32768 * u);
                    a.push(u == p - 1 ? 1 : 0),
                        Array.prototype.push.apply(a, bytes16sw(i)),
                        Array.prototype.push.apply(a, bytes16sw(~i));
                    var c = t.slice(32768 * u, 32768 * u + i);
                    Array.prototype.push.apply(a, c)
                }
                return Array.prototype.push.apply(a, bytes32(adler32(t))),
                    Array.prototype.push.apply(a, bytes32(crc32(a, s, y))),
                    a.push(0, 0, 0, 0, 73, 69, 78, 68),
                    Array.prototype.push.apply(a, bytes32(crc32(a, a.length - 4, 4))),
                "data:image/png;base64," + btoa(a.map(function(t) {
                    return String.fromCharCode(t)
                }).join(""))
            },
            r = HTMLCanvasElement.prototype.toDataURL;
        HTMLCanvasElement.prototype.toDataURL = function() {
            var e = r.apply(this, arguments);
            return "data:," == e ? (HTMLCanvasElement.prototype.toDataURL = t, this.toDataURL()) : (HTMLCanvasElement.prototype.toDataURL = r, e)
        }
    } ();
function anysignWebImpl() {
    this._initAnySignApi = function(n, i) {
        return n && i ? (_resetVariables(), mCallback = n, mDatas[16] = i, !0) : !1
    },
        this._addDataObj = function(n, i) {
            return ! mIsInitialized && _isDataObj(n) ? (i.cid = n, mDataObjArray[n] = i, !0) : !1
        },
        this._addSignatureObj = function(n, i) {
            if (!mIsInitialized && i && _isSigObj(n)) {
                if (_isSingleSigObj(n));
                else if (!i.title && "undefined" != typeof i.title && 0 != i.title) return ! 1;
                return i.cid = n,
                    signObjArray[n] = i,
                    !0
            }
            return ! 1
        },
        this._addChachetObj = function() {
            return ! 1
        },
        this._addPhotoObj = function() {
            return ! 1
        },
        this._addMediaObj = function() {
            return ! 1
        },
        this._setTableData = function(n, i) {
            return mIsInitialized && _isTemplate(i) && (mDatas[i] = n),
                !1
        },
        this._setTID = function(n) {
            return mTid = n,
                !0
        },
        this._setData = function(n, i) {
            return _getDataObj(n) && i ? (mDatas[n] = i, _isTemplate(n) && (mTemplateSet = !0), !0) : !1
        },
        this._commitConfig = function() {
            return mIsInitialized = !0,
                !0
        },
        this._resetConfig = function() {
            return _resetVariables(),
                !0
        },
        this._showSignatureDialog = function(n) {
            if (mIsInitialized) {
                if (mTemplateSet) {
                    if (null == signObjArray[n]) return EC_WRONG_CONTEXT_ID; {
                        var i = signObjArray[n];
                        getWindowHeight(),
                            getWindowWidth()
                    }
                    if (_isSingleSigObj(n)) {
                        var e = document.getElementById("dialog");
                        e.style.display = "block";
                        var t = document.getElementById("anysign_title"),
                            a = i.title,
                            r = a.substring(i.titleSpanFromOffset, i.titleSpanToOffset + 1).big();
                        t.innerHTML = a.substring(0, i.titleSpanFromOffset) + r + a.substring(i.titleSpanToOffset + 1, a.length),
                            setSignResCallback(i,
                                function(n, e) {
                                    if (mCallback) {
                                        e ? (signData[n] = e, mCallback(i.cid, CALLBACK_TYPE_SIGNATURE, e)) : mCallback(i.cid, CALLBACK_TYPE_DIALOG_CANCEL, null),
                                            clear_canvas();
                                        var t = document.getElementById("dialog");
                                        t.style.display = "none",
                                            setIsAnysignInputDlgShown(!1)
                                    }
                                })
                    } else {
                        var e = document.getElementById("mass_dialog");
                        e.style.display = "block";
                        var t = document.getElementById("mass_anysign_title"),
                            a = i.comment;
                        t.innerHTML = a,
                            setSignResCallback(i,
                                function(n, e) {
                                    if (mCallback) {
                                        e ? (signData[n] = e, mCallback(i.cid, CALLBACK_TYPE_MASS_SIGNATURE, e)) : mCallback(i.cid, CALLBACK_TYPE_DIALOG_CANCEL, null),
                                            mass_clear_canvas();
                                        var t = document.getElementById("mass_dialog");
                                        t.style.display = "none",
                                            setIsAnysignInputDlgShown(!1)
                                    }
                                })
                    }
                    return setIsAnysignInputDlgShown(!0),
                        RESULT_OK
                }
                return EC_TEMPLATE_NOT_SET
            }
            return EC_API_NOT_INITED
        },
        this._takePicture = function() {
            return ! 1
        },
        this._picturePreview = function() {
            return ! 1
        },
        this._startMediaRecording = function() {
            return ! 1
        },
        this._audioPreview = function() {
            return ! 1
        },
        this._mediaPreview = function() {
            return ! 1
        },
        this._startMediaRecording = function() {
            return ! 1
        },
        this._finishMediaRecording = function() {
            return ! 1
        },
        this._isReadyToUpload = function() {
            if (!mIsInitialized) return ! 1;
            var n = !1;
            for (var i in signObjArray) {
                var e = signObjArray[i],
                    t = e.cid;
                if (null == signData[t] && signObjArray[t].isNecessary) return ! 1;
                null != signData[t] && _isSingleSigObj(t) && (n = !0)
            }
            if (!n) return ! 1;
            for (i in mDataObjArray) {
                var e = mDataObjArray[i];
                if (null == mDatas[e.cid] && e.nessesary) return ! 1
            }
            return ! 0
        },
        this._getEncodedSignData = function() {
            if (mIsInitialized) {
                var n = !1,
                    i = "<Data>";
                for (var e in signObjArray) {
                    var t = signObjArray[e],
                        a = t.cid;
                    if (null == signData[a] && signObjArray[a].isNecessary) return null;
                    null != signData[a] && _isSingleSigObj(a) && (n = !0),
                        i += '<Context ID="' + a + '">' + signData[a] + "</Context>"
                }
                if (!n) return null;
                for (e in mDataObjArray) {
                    var t = mDataObjArray[e],
                        a = t.cid;
                    if (null == mDatas[a] && t.nessesary) return null;
                    i += '<Context ID="' + a + '">' + mDatas[a] + "</Context>"
                }
                i += "</Data>";
                var r = new Uint8Array(24);
                void 0 != window.crypto ? window.crypto.getRandomValues(r) : void 0 != window.msCrypto ? window.msCrypto.getRandomValues(r) : capabal.crypto.getRandomValues(r);
                var s = '<?xml version="1.0" encoding="UTF-8"?>';
                return s += "<BJCAROOT>",
                    s += "<Version>1</Version>",
                    s += "<SignTID>" + mTid + "</SignTID>",
                    s += "<EncKey>" + rsaPubkeyUint8EncByDefault(r) + "</EncKey>",
                    s += "<Cert>",
                    s += "<EncCertSN>" + encCertSN + "</EncCertSN>",
                    s += "<EncCertKeyID>N/A</EncCertKeyID>",
                    s += "<EncAlg>1</EncAlg>",
                    s += "</Cert>",
                    s += "<EncData>" + tripleDesEncrypt(i, anysign.hex.uint8ArrayToHexStr(r)) + "</EncData>",
                    s += "<DeviceInfo><DeviceMF>" + navigator.appName + "</DeviceMF><DeivceOS>" + navigator.platform + "</DeivceOS><DeiviceSN>" + navigator.appVersion + "</DeiviceSN></DeviceInfo>",
                    s += "<SignCertSN>NA</SignCertSN>",
                    s += "<SignValue>NULL</SignValue>",
                    s += "</BJCAROOT>"
            }
            return null
        },
        this._getOSInfo = function() {
            if (isMobile.Android()) {
                var n = navigator.userAgent.toLowerCase(),
                    i = n.indexOf("android"),
                    e = n.indexOf(";", i);
                i += 8;
                var t = n.substring(i, e);
                return "android##" + t
            }
            if (isMobile.iOS()) {
                var i, e, t, n = navigator.userAgent;
                if ( - 1 != (i = n.indexOf("OS")) && -1 != (e = n.indexOf("like Mac OS"))) return t = n.substring(i + 3, e - 1),
                    t = t.replace(/_/g, "."),
                "ios##" + t
            }
            return "unknown"
        }
}
function _isSigObj(n) {
    return n >= 20 && 39 >= n || n >= 200 && 399 >= n ? !0 : !1
}
function _isSingleSigObj(n) {
    return n >= 20 && 29 >= n || n >= 200 && 299 >= n ? !0 : !1
}
function _isMassSigObj(n) {
    return n >= 30 && 39 >= n || n >= 300 && 399 >= n ? !0 : !1
}
function _getDataObj(n) {
    for (var i in mDataObjArray) {
        var e = mDataObjArray[i];
        if (e && e.cid == n) return e
    }
    return null
}
function _isDataObj(n) {
    return n >= 50 && 59 >= n || n >= 500 && 599 >= n || _isTemplate(n) ? !0 : !1
}
function _isTemplate(n) {
    return n >= 10 && 19 >= n ? !0 : !1
}
function _resetVariables() {
    isLock = !1,
        mCallback = null,
        mChannel = null,
        mIsInitialized = !1,
        mTemplateSet = !1,
        signData = [],
        signObjArray = [],
        mDatas = []
}
function onBridgeReady() {
    WeixinJSBridge.call("hideOptionMenu")
}
var CALLBACK_TYPE_SIGNATURE = 1,
    CALLBACK_TYPE_DIALOG_DISMISS = 2,
    CALLBACK_TYPE_DIALOG_CANCEL = 3,
    CALLBACK_TYPE_BUFFER_SAVED = 4,
    CALLBACK_TYPE_ON_PICTURE_TAKEN = 5,
    CALLBACK_TYPE_DATA_DELETED = 6,
    CALLBACK_TYPE_MASS_SIGNATURE = 11,
    CALLBACK_TYPE_START_RECORDING = 7,
    CALLBACK_TYPE_STOP_RECORDING = 8,
    CALLBACK_TYPE_ON_MEDIA_DATA = 9,
    CALLBACK_TYPE_ERROR = -1,
    CALLBACK_TYPE_ERROR_PICTURE = -2,
    CALLBACK_TYPE_OPERATION_CANCELED = -3,
    CALLBACK_TYPE_GETVERSION = 10,
    RESULT_OK = 0,
    RESULT_ERROR = -1,
    EC_API_NOT_INITED = 1,
    EC_WRONG_CONTEXT_ID = 2,
    EC_CAMERA_INIT_FAILED = 3,
    EC_NATIVE_EXCEPTION = 4,
    EC_DEVICE_NOT_SUPPORTED = 5,
    EC_TEMPLATE_NOT_SET = 6,
    isLock = !1,
    mCallback, mIsInitialized = !1,
    mTemplateSet = !1,
    mTid, signData = [],
    signObjArray = [],
    mDatas = [],
    mDataObjArray = [],
    isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i) ? !0 : !1
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i) ? !0 : !1
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? !0 : !1
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i) ? !0 : !1
        },
        any: function() {
            return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows()
        }
    };
"undefined" == typeof WeixinJSBridge ? document.addEventListener ? document.addEventListener("WeixinJSBridgeReady", onBridgeReady, !1) : document.attachEvent && (document.attachEvent("WeixinJSBridgeReady", onBridgeReady), document.attachEvent("onWeixinJSBridgeReady", onBridgeReady)) : onBridgeReady();
function onload_massSignScrollAction() {
    function t() {
        a -= r,
            a > i ? (setTimeout(t, l), o.scrollTop = a) : (a = i, o.scrollTop = a)
    }
    function e() {
        a += r,
            i > a ? (o.scrollTop = a, setTimeout(e, l)) : (a = i, o.scrollTop = a)
    }
    var n = 0,
        a = 0,
        i = 0,
        o = document.getElementById("mass_container");
    o.addEventListener("scroll",
        function() {
            a = o.scrollTop
        });
    var s = document.getElementById("mass_scrollbar_up");
    s.addEventListener("click",
        function() {
            {
                var e = o.clientHeight;
                o.scrollHeight
            }
            n = 2 * e / 3,
                i = a - n >= 0 ? a - n: 0,
                t()
        });
    var c = document.getElementById("mass_scrollbar_down");
    c.addEventListener("click",
        function() {
            var t = o.clientHeight,
                s = o.scrollHeight;
            n = 2 * t / 3,
                i = a + n >= s - t ? s - t: a + n,
                e()
        });
    var m = document.getElementById("mass_scrollbar_top");
    m.addEventListener("click",
        function() {
            o.scrollTop = 0
        });
    var d = document.getElementById("mass_scrollbar_bottom");
    d.addEventListener("click",
        function() {
            var t = o.clientHeight,
                e = o.scrollHeight;
            o.scrollTop = e - t
        });
    var l = 50,
        r = 20
}
function onload_singleSignCanvas() {
    if (document.getElementById("anysignCanvas")) {
        var t = document.getElementById("anysignCanvas"),
            e = t.getContext("2d"),
            n = getWindowHeight(),
            a = getWindowWidth();
        t.width = a,
            t.height = .7 * n;
        var i = document.getElementById("anysign_title");
        i.style.height = .1 * n;
        var o = document.getElementById("btnContainerOuter");
        o.style.height = .2 * n;
        var s = window.devicePixelRatio ? window.devicePixelRatio: 1,
            c = t.width * t.height / 142560;
        base_stroke_width = s * c * 1.5;
        var m = document.getElementById("container");
        tmp_canvas = document.createElement("canvas"),
            tmp_ctx = tmp_canvas.getContext("2d"),
            tmp_canvas.id = "tmp_canvas",
            tmp_canvas.width = t.width,
            tmp_canvas.height = t.height,
            m.appendChild(tmp_canvas),
            "ontouchstart" in document.documentElement ? (tmp_canvas.ontouchstart = function(t) {
                return isCopyingImg ? !1 : (t.preventDefault(), isDown = !0, t.touches && (t = t.touches[0]), !1)
            },
                tmp_canvas.ontouchmove = function(t) {
                    if (isDown && !isCopyingImg) {
                        var e = JQuery_Capable.offset(t.target);
                        "undefined" != typeof t.targetTouches ? (curX = Math.floor(t.targetTouches[0].pageX - e.left), curY = Math.floor(t.targetTouches[0].pageY - e.top)) : (curX = Math.floor(t.pageX - e.left), curY = Math.floor(t.pageY - e.top)),
                        curX > maxX && (maxX = curX),
                        minX > curX && (minX = curX),
                        curY > maxY && (maxY = curY),
                        minY > curY && (minY = curY),
                            points.push({
                                x: curX,
                                y: curY
                            }),
                            onPaint(),
                            lastX = curX,
                            lastY = curY,
                            preventDefault(t)
                    }
                },
                tmp_canvas.ontouchend = function() {
                    isCopyingImg = !0,
                        isDown = !1;
                    var t = document.getElementById("anysignCanvas"),
                        e = t.getContext("2d");
                    e.drawImage(tmp_canvas, 0, 0),
                        tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height),
                        points = [],
                        isCopyingImg = !1
                },
                tmp_canvas.ontouchcancel = tmp_canvas.ontouchend) : (tmp_canvas.onmousedown = function() {
                isDown = !0
            },
                tmp_canvas.onmousemove = function(t) {
                    if (isDown) {
                        var e = JQuery_Capable.offset(t.target),
                            n = document.body.scrollTop | document.documentElement.scrollTop,
                            a = document.body.scrollLeft | document.documentElement.scrollLeft;
                        "undefined" != typeof t.targetTouches ? (curX = Math.floor(t.targetTouches[0].clientX - e.left), curY = Math.floor(t.targetTouches[0].clientY - e.top)) : (curX = Math.floor(t.clientX - e.left), curY = Math.floor(t.clientY - e.top)),
                            curY += n,
                            curX += a,
                        curX > maxX && (maxX = curX),
                        minX > curX && (minX = curX),
                        curY > maxY && (maxY = curY),
                        minY > curY && (minY = curY),
                            points.push({
                                x: curX,
                                y: curY
                            }),
                            onPaint(),
                            preventDefault(t)
                    }
                },
                tmp_canvas.onmouseup = function() {
                    isDown = !1;
                    var t = document.getElementById("anysignCanvas"),
                        e = t.getContext("2d");
                    e.drawImage(tmp_canvas, 0, 0),
                        tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height),
                        points = []
                },
                tmp_canvas.onmouseout = tmp_canvas.onmouseup); {
            window.devicePixelRatio ? window.devicePixelRatio: 1
        }
        e.strokeStyle = "black",
            e.lineWidth = base_stroke_width,
            e.lineCap = "round",
            e.lineJoin = "round",
            e.shadowBlur = 5,
            tmp_ctx.strokeStyle = "black",
            tmp_ctx.lineWidth = base_stroke_width,
            tmp_ctx.lineCap = "round",
            tmp_ctx.lineJoin = "round",
            tmp_ctx.shadowBlur = 5
    } else alert("你的浏览器不支持canvas标签,请使用firefox和chrome浏览器")
}
function onload_massSignCanvas() {
    if (document.getElementById("mass_anysignCanvas")) {
        var t = document.getElementById("mass_anysignCanvas"),
            e = t.getContext("2d"),
            n = getWindowHeight() - 6,
            a = getWindowWidth() - 6;
        t.width = a;
        var i = document.getElementById("mass_dialog");
        i.style.width = a,
            i.style.height = n;
        var o = document.getElementById("mass_anysign_title");
        o.style.height = .1 * n;
        var s = document.getElementById("mass_btnContainerOuter");
        s.style.height = .2 * n;
        var c = document.getElementById("mass_container");
        c.style.height = .7 * n,
            c.style.width = a - .1;
        var m = document.getElementById("mass_scrollbar");
        m.style.top = n * (.1 + .35) - 90,
            mass_tmp_canvas = document.createElement("canvas"),
            mass_tmp_ctx = mass_tmp_canvas.getContext("2d"),
            mass_tmp_canvas.id = "mass_tmp_canvas",
            mass_tmp_canvas.width = t.width,
            mass_tmp_canvas.height = t.height,
            c.appendChild(mass_tmp_canvas),
            "ontouchstart" in document.documentElement ? (mass_tmp_canvas.ontouchstart = function(t) {
                return isCopyingImg ? !1 : (t.preventDefault(), isDown = !0, t.touches && (t = t.touches[0]), !1)
            },
                mass_tmp_canvas.ontouchmove = function(t) {
                    if (isDown && !isCopyingImg) {
                        var e = JQuery_Capable.offset(t.target);
                        "undefined" != typeof t.targetTouches ? (curX = Math.floor(t.targetTouches[0].pageX - e.left), curY = Math.floor(t.targetTouches[0].pageY - e.top)) : (curX = Math.floor(t.pageX - e.left), curY = Math.floor(t.pageY - e.top)),
                        curX > maxX && (maxX = curX),
                        minX > curX && (minX = curX),
                        curY > maxY && (maxY = curY),
                        minY > curY && (minY = curY),
                            points.push({
                                x: curX,
                                y: curY
                            }),
                            mass_onPaint(),
                            lastX = curX,
                            lastY = curY,
                            preventDefault(t)
                    }
                },
                mass_tmp_canvas.ontouchend = function() {
                    isCopyingImg = !0,
                        isDown = !1;
                    var t = document.getElementById("mass_anysignCanvas"),
                        e = t.getContext("2d");
                    e.drawImage(mass_tmp_canvas, 0, 0),
                        mass_tmp_ctx.clearRect(0, 0, mass_tmp_canvas.width, mass_tmp_canvas.height),
                        points = [],
                        isCopyingImg = !1
                },
                mass_tmp_canvas.ontouchcancel = mass_tmp_canvas.ontouchend) : (mass_tmp_canvas.onmousedown = function() {
                isDown = !0
            },
                mass_tmp_canvas.onmousemove = function(t) {
                    if (isDown) {
                        var e = JQuery_Capable.offset(t.target),
                            n = document.body.scrollTop | document.documentElement.scrollTop,
                            a = document.body.scrollLeft | document.documentElement.scrollLeft;
                        "undefined" != typeof t.targetTouches ? (curX = Math.floor(t.targetTouches[0].clientX - e.left), curY = Math.floor(t.targetTouches[0].clientY - e.top)) : (curX = Math.floor(t.clientX - e.left), curY = Math.floor(t.clientY - e.top)),
                            curY += n,
                            curX += a,
                        curX > maxX && (maxX = curX),
                        minX > curX && (minX = curX),
                        curY > maxY && (maxY = curY),
                        minY > curY && (minY = curY),
                            points.push({
                                x: curX,
                                y: curY
                            }),
                            mass_onPaint(),
                            preventDefault(t)
                    }
                },
                mass_tmp_canvas.onmouseup = function() {
                    isDown = !1;
                    var t = document.getElementById("mass_anysignCanvas"),
                        e = t.getContext("2d");
                    e.drawImage(mass_tmp_canvas, 0, 0),
                        mass_tmp_ctx.clearRect(0, 0, mass_tmp_canvas.width, mass_tmp_canvas.height),
                        points = []
                },
                mass_tmp_canvas.onmouseout = mass_tmp_canvas.onmouseup),
            e.strokeStyle = "black",
            e.lineWidth = base_stroke_width,
            e.lineCap = "round",
            e.lineJoin = "round",
            e.shadowBlur = 5,
            mass_tmp_ctx.strokeStyle = "black",
            mass_tmp_ctx.lineWidth = base_stroke_width,
            mass_tmp_ctx.lineCap = "round",
            mass_tmp_ctx.lineJoin = "round",
            mass_tmp_ctx.shadowBlur = 5
    }
}
function clear_canvas() {
    var t = document.getElementById("anysignCanvas"),
        e = t.getContext("2d");
    e.clearRect(0, 0, t.width, t.height),
        e.closePath();
    var n = t.width,
        a = t.height;
    t.width = t.height = 0,
        t.width = n,
        t.height = a,
        points = [],
        minX = 9999,
        minY = 9999,
        maxX = 0,
        maxY = 0,
        imageDataTmp = null,
        isDrawn = !1
}
function sign_confirm() {

    if (!isDrawn) return void custom_alert("请手写签名", "确认");
    var t = document.getElementById("anysignCanvas"),
        e = t.getContext("2d"),
        n = maxX - minX + paste_padding + paste_padding,
        a = maxY - minY + paste_padding + paste_padding;
    if (imageDataTmp = e.getImageData(minX - paste_padding, minY - paste_padding, n + paste_padding, a + paste_padding), signResCallback) {
        var i = getSigData();
        signResCallback(signObjTmp.cid, i.substr(22, i.length))
    }
    document.body.parentNode.style.overflow = "scroll"
}
function cancelSign() {
    var t = document.getElementById("dialog");
    t.style.display = "none",
        document.body.scroll = "yes",
        signResCallback ? signResCallback(signObjTmp.cid, null) : (clear_canvas(), setIsAnysignInputDlgShown(!1))
}
function mass_clear_canvas() {
    var t = document.getElementById("mass_anysignCanvas"),
        e = t.getContext("2d");
    e.clearRect(0, 0, t.width, t.height),
        e.closePath();
    var n = t.width,
        a = t.height;
    t.width = t.height = 0,
        t.width = n,
        t.height = a,
        points = [],
        minX = 9999,
        minY = 9999,
        maxX = 0,
        maxY = 0,
        imageDataTmp = null,
        isDrawn = !1
}
function mass_sign_confirm() {
    if (!isDrawn) return void custom_alert("请手写签名", "确认");
    var t = document.getElementById("mass_anysignCanvas"),
        e = t.getContext("2d"),
        n = maxX - minX + paste_padding + paste_padding,
        a = maxY - minY + paste_padding + paste_padding;
    if (imageDataTmp = e.getImageData(minX - paste_padding, minY - paste_padding, n + paste_padding, a + paste_padding), signResCallback) {
        var i = getSigData();
        signResCallback(signObjTmp.cid, i.substr(22, i.length))
    }
    document.body.parentNode.style.overflow = "scroll"
}
function mass_cancelSign() {
    var t = document.getElementById("mass_dialog");
    t.style.display = "none",
        document.body.scroll = "yes",
        signResCallback ? signResCallback(signObjTmp.cid, null) : (mass_clear_canvas(), setIsAnysignInputDlgShown(!1))
}
function setSignResCallback(t, e) {
    signObjTmp = t,
        signResCallback = e
}
function setCanvasHeight(t) {
    var e = document.getElementById("anysignCanvas");
    t > 0 && (e.height = t, tmp_canvas && (tmp_canvas.height = t))
}
function getSigData() {
    if (imageDataTmp) {
        var t = document.createElement("canvas"),
            e = t.getContext("2d"),
            n = window.devicePixelRatio ? window.devicePixelRatio: 1;
        t.width = imageDataTmp.width / n,
            t.height = imageDataTmp.height / n;
        var a = 1;
        signObjTmp.singleWidth / signObjTmp.singleHeight <= t.width / t.height ? signObjTmp.singleWidth <= t.width && (a = signObjTmp.singleWidth / t.width) : signObjTmp.singleHeight <= t.height && (a = signObjTmp.singleHeight / t.height),
            t.width *= a,
            t.height *= a,
            e.scale(1 / n * a, 1 / n * a);
        var i = document.createElement("canvas");
        return i.width = imageDataTmp.width,
            i.height = imageDataTmp.height,
            i.getContext("2d").putImageData(imageDataTmp, 0, 0),
            e.drawImage(i, 0, 0),
            t.toDataURL()
    }
    return null
}
function getSigHeight() {
    return imageDataTmp ? void 0 !== window.devicePixelRatio ? imageDataTmp.height / window.devicePixelRatio: imageDataTmp.height: 0
}
function getSigWidth() {
    return imageDataTmp ? void 0 !== window.devicePixelRatio ? imageDataTmp.width / window.devicePixelRatio: imageDataTmp.width: 0
}
function setIsAnysignInputDlgShown(t) {
    isAnysignInputDlgShown = t
}
function testGetImageData() {}
function custom_alert(t) {
    showMsgDialog(t)
}
function preventDefault(t) {
    t = t || window.event,
    t.preventDefault && t.preventDefault(),
        t.returnValue = !1
}
function setSelectState(t) {
    for (var e = document.getElementsByTagName("select"), n = 0; n < e.length; n++) e[n].style.visibility = t
}
function showMessageBox2(t, e) {
    closeWindow();
    var n = getWindowHeight(),
        a = getWindowWidth();
    isIe && setSelectState("hidden");
    var i = document.createElement("div");
    i.id = "back";
    var o = "font-size:15pt; text-align:center; z-index:7;top:0px;left:0px;position:fixed;background:#666;width:" + a + "px;height:" + n + "px;";
    o += isIe ? "filter:alpha(opacity=0);": "opacity:0;",
        i.style.cssText = o;
    var s = document.createElement("div");
    s.id = "mesWindow",
        s.className = "mesWindow",
        s.innerHTML = "<div class='mesWindowContent' id='mesWindowContent'>" + e + "</div><div style='text-align: center;' class='mesWindowBottom'><input class='dlgButton' id='mesWindowBtnOk' type='button' onclick='closeWindow();'value='确认' /></div>",
        o = "margin:" + .2 * n + " auto; width:" + .8 * a + ";",
        s.style.cssText = o,
        i.appendChild(s),
        document.body.appendChild(i),
        showBackground(i, 80),
        "ontouchstart" in document.documentElement ? (i.ontouchstart = function(t) {
            return "mesWindowBtnOk" !== t.target.id ? (preventDefault(t), !1) : !0
        },
            i.ontouchmove = function(t) {
                preventDefault(t)
            }) : (i.onmousedown = function(t) {
            "mesWindowBtnOk" !== t.target.id && preventDefault(t)
        },
            i.onmousemove = function(t) {
                preventDefault(t)
            })
}
function showBackground(t, e) {
    if (isIe) t.filters.alpha.opacity += 1,
    t.filters.alpha.opacity < e && setTimeout(function() {
            showBackground(t, e)
        },
        5);
    else {
        var n = parseFloat(t.style.opacity);
        n += .01,
            t.style.opacity = n,
        e / 100 > n && setTimeout(function() {
                showBackground(t, e)
            },
            5)
    }
}
function closeWindow() {
    null != document.getElementById("back") && document.getElementById("back").parentNode.removeChild(document.getElementById("back")),
    null != document.getElementById("mesWindow") && document.getElementById("mesWindow").parentNode.removeChild(document.getElementById("mesWindow")),
    isIe && setSelectState("")
}
function showMsgDialog(t) {
    messContent = "<div style='padding:20px 0 20px 0;text-align:center; font-size: 10pt'>" + t + "</div>",
        showMessageBox2("修改小结内容", messContent, null, 350)
}
function getWindowWidth() {
    var t = 630,
        e = 460;
    return document.body && document.body.offsetWidth && (t = document.body.offsetWidth, e = document.body.offsetHeight),
    "CSS1Compat" == document.compatMode && document.documentElement && document.documentElement.offsetWidth && (t = document.documentElement.offsetWidth, e = document.documentElement.offsetHeight),
    window.innerWidth && window.innerHeight && (t = window.innerWidth, e = window.innerHeight),
        t
}
function getWindowHeight() {
    var t = 630,
        e = 460;
    return document.body && document.body.offsetWidth && (t = document.body.offsetWidth, e = document.body.offsetHeight),
    "CSS1Compat" == document.compatMode && document.documentElement && document.documentElement.offsetWidth && (t = document.documentElement.offsetWidth, e = document.documentElement.offsetHeight),
    window.innerWidth && window.innerHeight && (t = window.innerWidth, e = window.innerHeight),
        e
}
var points = [],
    minX = 9999,
    minY = 9999,
    maxX = 0,
    maxY = 0,
    curX = 0,
    curY = 0,
    lastX = 0,
    lastY = 0,
    paste_padding = 10,
    imageDataTmp,
    isDown = !1,
    isDrawn = !1,
    isCopyingImg = !1,
    isAnysignInputDlgShown = !1,
    base_stroke_width = getWindowWidth() >= 480 ? 5 : 2.5,
    tmp_canvas,
    tmp_ctx,
    signResCallback,
    signObjTmp,
    mass_tmp_canvas,
    mass_tmp_ctx;
window.onresize = function() {
    var t, e, n, a, i, o = document.getElementById("anysignCanvas"),
        s = o.getContext("2d");
    if (isDrawn) {
        t = document.createElement("canvas"),
            e = t.getContext("2d");
        var c, m, d, l, r = paste_padding,
            u = r,
            g = r,
            p = r,
            h = r; (c = minX - r) < 0 && (u = minX, c = 0),
        (m = minY - r) < 0 && (g = minY, m = 0),
        (d = maxX + r) > o.width && (p = 0, d = o.width),
        (l = maxY + r) > o.height && (h = 0, l = o.height),
            n = maxX - minX + u + p,
            a = maxY - minY + g + h,
            i = s.getImageData(c, m, d - c, l - m),
            t.width = n,
            t.height = a
    }
    var _ = getWindowHeight(),
        v = getWindowWidth(),
        w = document.getElementById("dialog");
    w.style.height = _,
        w.style.width = v,
        o.width = v,
        o.height = _,
        o.height = .7 * o.height;
    var f = document.getElementById("btnContainerOuter"),
        y = document.getElementById("anysign_title");
    y.style.height = .1 * _;
    var f = document.getElementById("btnContainerOuter");
    f.style.height = .2 * _,
    null != tmp_canvas && (tmp_canvas.width = o.width, tmp_canvas.height = o.height);
    var x = window.devicePixelRatio ? window.devicePixelRatio: 1,
        C = o.width * o.height / 142560;
    if (base_stroke_width = x * C * 1.5, s.strokeStyle = "black", s.lineWidth = base_stroke_width, s.lineCap = "round", s.lineJoin = "round", s.shadowBlur = 5, tmp_ctx.strokeStyle = "black", tmp_ctx.lineWidth = base_stroke_width, tmp_ctx.lineCap = "round", tmp_ctx.lineJoin = "round", tmp_ctx.shadowBlur = 5, !isDrawn) return void tmp_canvas.getContext("2d").clearRect(0, 0, o.width, o.height);
    var b;
    b = o.width >= n ? o.height >= a ? 1 : o.height / a: o.width / o.height > n / a ? o.height / a: o.width / n,
        e.putImageData(i, 0, 0);
    var X = document.createElement("canvas"),
        Y = X.getContext("2d");
    X.width = n * b,
        X.height = a * b,
        Y.scale(b, b),
        Y.drawImage(t, 0, 0),
        s.clearRect(0, 0, o.width, o.height),
        s.drawImage(X, 0, 0),
        minX = 0,
        minY = 0,
        maxX *= b,
        maxY *= b,
        tmp_canvas.getContext("2d").clearRect(0, 0, o.width, o.height)
},
    window.addEventListener("load",
        function() {
            onload_singleSignCanvas(),
                onload_massSignCanvas(),
                onload_massSignScrollAction()
        });
var onPaint = function() {
        if (points.length < 3) {
            var t = points[0];
            return tmp_ctx.beginPath(),
                tmp_ctx.arc(t.x, t.y, tmp_ctx.lineWidth / 2, 0, 2 * Math.PI, !0),
                tmp_ctx.fill(),
                void tmp_ctx.closePath()
        }
        tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height),
            tmp_ctx.beginPath(),
            tmp_ctx.moveTo(points[0].x, points[0].y);
        for (var e = 1; e < points.length - 2; e++) {
            var n = (points[e].x + points[e + 1].x) / 2,
                a = (points[e].y + points[e + 1].y) / 2;
            tmp_ctx.quadraticCurveTo(points[e].x, points[e].y, n, a)
        }
        tmp_ctx.quadraticCurveTo(points[e].x, points[e].y, points[e + 1].x, points[e + 1].y),
            tmp_ctx.stroke(),
            isDrawn = !0
    },
    mass_onPaint = function() {
        if (points.length < 3) {
            var t = points[0];
            return mass_tmp_ctx.beginPath(),
                mass_tmp_ctx.arc(t.x, t.y, mass_tmp_ctx.lineWidth / 2, 0, 2 * Math.PI, !0),
                mass_tmp_ctx.fill(),
                void mass_tmp_ctx.closePath()
        }
        mass_tmp_ctx.clearRect(0, 0, mass_tmp_canvas.width, mass_tmp_canvas.height),
            mass_tmp_ctx.beginPath(),
            mass_tmp_ctx.moveTo(points[0].x, points[0].y);
        for (var e = 1; e < points.length - 2; e++) {
            var n = (points[e].x + points[e + 1].x) / 2,
                a = (points[e].y + points[e + 1].y) / 2;
            mass_tmp_ctx.quadraticCurveTo(points[e].x, points[e].y, n, a)
        }
        mass_tmp_ctx.quadraticCurveTo(points[e].x, points[e].y, points[e + 1].x, points[e + 1].y),
            mass_tmp_ctx.stroke(),
            isDrawn = !0
    },
    JQuery_Capable = {
        offset: function(t) {
            var e, n, a = "undefined",
                i = {
                    top: 0,
                    left: 0
                },
                o = t,
                s = o && o.ownerDocument;
            return s ? (e = s.documentElement, typeof o.getBoundingClientRect !== a && (i = o.getBoundingClientRect()), n = JQuery_Capable.getWindow(s), {
                top: i.top + (n.pageYOffset || e.scrollTop) - (e.clientTop || 0),
                left: i.left + (n.pageXOffset || e.scrollLeft) - (e.clientLeft || 0)
            }) : void 0
        },
        getWindow: function(t) {
            return JQuery_Capable.isWindow(t) ? t: 9 === t.nodeType ? t.defaultView || t.parentWindow: !1
        },
        isWindow: function(t) {
            return null != t && t == t.window
        }
    },
    isIe = document.all ? !0 : !1,
    messContent;
function AnySignApi() {
    this.CALLBACK_TYPE_SIGNATURE = 1,
        this.CALLBACK_TYPE_DIALOG_DISMISS = 2,
        this.CALLBACK_TYPE_DIALOG_CANCEL = 3,
        this.CALLBACK_TYPE_BUFFER_SAVED = 4,
        this.CALLBACK_TYPE_ON_PICTURE_TAKEN = 5,
        this.CALLBACK_TYPE_DATA_DELETED = 6,
        this.CALLBACK_TYPE_START_RECORDING = 7,
        this.CALLBACK_TYPE_STOP_RECORDING = 8,
        this.CALLBACK_TYPE_ON_MEDIA_DATA = 9,
        this.CALLBACK_TYPE_ERROR = -1,
        this.CALLBACK_TYPE_ERROR_PICTURE = -2,
        this.CALLBACK_TYPE_OPERATION_CANCELED = -3,
        this.CALLBACK_TYPE_GETVERSION = 10,
        this.RESULT_OK = 0,
        this.RESULT_ERROR = -1,
        this.EC_API_NOT_INITED = 1,
        this.EC_WRONG_CONTEXT_ID = 2,
        this.EC_CAMERA_INIT_FAILED = 3,
        this.EC_NATIVE_EXCEPTION = 4,
        this.EC_DEVICE_NOT_SUPPORTED = 5,
        this.EC_TEMPLATE_NOT_SET = 6,
        this.initAnySignApi = function(t, i) {
            return t && t instanceof Function && t.length >= 3 ? (core = new anysignWebImpl, core._initAnySignApi(t, i), !0) : !1
        },
        this.addDataObj = function(t, i) {
            return ! i instanceof DataObj ? !1 : core._addDataObj(t, i)
        },
        this.addSignatureObj = function(t, i) {
            return ! i instanceof SignatureConfig ? !1 : core._addSignatureObj(t, i)
        },
        this.addChachetObj = function() {
            return ! 0
        },
        this.addPhotoObj = function(t, i) {
            return ! i instanceof PhotoConfig || !t instanceof Array || 0 == t.length ? !1 : !0
        },
        this.addMediaObj = function(t, i) {
            return ! i instanceof MediaConfig || !t instanceof Array || 0 == t.length ? !1 : !0
        },
        this.setTableData = function(t, i, e, s, n) {
            return t && i && e && n ? !0 : !1
        },
        this.setTID = function(t) {
            return core._setTID(t)
        },
        this.setData = function(t, i) {
            return core._setData(t, i)
        },
        this.showSignatureDialog = function(t) {
            return core._showSignatureDialog(t)
        },
        this.takePicture = function() {
            return ! 1
        },
        this.startMediaRecording = function() {
            return ! 1
        },
        this.finishMediaRecording = function() {
            return ! 1
        },
        this.commitConfig = function() {
            return core._commitConfig()
        },
        this.resetConfig = function() {
            return core._resetConfig()
        },
        this.isReadyToUpload = function() {
            return core._isReadyToUpload()
        },
        this.getEncodedSignData = function() {
            return core._getEncodedSignData()
        },
        this.getVersion = function() {
            return "anysign web v1.0"
        },
        this.getOSInfo = function() {
            return core._getOSInfo()
        }
}
function DataObj() {
    this.cid = 0,
        this.nessesary = !0
}
function PhotoConfig() {
    this.cid = 0,
        this.width = 640,
        this.height = 480,
        this.median = !1,
        this.mono = !0,
        this.quality = 85,
        this.openFromGallery = !1,
        this.applyConfigOnGalleryPic = !0
}
function SignatureConfig() {
    this.comment = "本人已阅读保险条款、产品说明书和投保提示书，了解本产品的特点和保单利益的不确定性。",
        this.cid = 0,
        this.title = "请在下方空白处签名",
        this.titleSpanFromOffset = -1,
        this.titleSpanToOffset = -1,
        this.isNecessary = !0,
        this.dlgXoffset = 0,
        this.dlgYoffset = 0,
        this.antialias = !0,
        this.singleWidth = 200,
        this.singleHeight = 160,
        this.penColor = "#ff000000",
        this.ruleType = "0",
        this.keyWord = "keyword",
        this.KWAlignMethod = "0",
        this.KWOffset = 10,
        this.xyz_Left = 10,
        this.xyz_Top = 10,
        this.xyz_Right = 10,
        this.xyz_Bottom = 10,
        this.xyz_Pageno = 1,
        this.server_configName = "8800",
        this.signerName = "张",
        this.signerIDNumber = "34324324"
}
function MediaConfig() {
    this.cid = 0,
        this.mediaType = "audio",
        this.mediaFormat = "wav",
        this.duration = 10,
        this.useBuiltInUI = !0
}
/*document.write('<link href="css/canvas_css.css" rel="stylesheet">'),
    document.write('<link href="css/sp.css" rel="stylesheet">'),
    document.write('<link media="screen and (max-width: 480px)" href="css/mw480Portrait.css" rel="stylesheet">'),
    document.write('<link media="screen and (min-width: 480px) and (max-width: 1024px)" href="css/mw480Portrait.css" rel="stylesheet">'),
    document.write('<link media="screen and (min-width: 1024px)" href="css/sw1024.css" rel="stylesheet">'),
    document.write('<script language=javascript src="CryptoJS v3.1.2/rollups/tripledes.js" charset="utf-8"></script>'),
    document.write('<script language=javascript src="CryptoJS v3.1.2/components/mode-ecb.js" charset="utf-8"></script>');*/
var core;