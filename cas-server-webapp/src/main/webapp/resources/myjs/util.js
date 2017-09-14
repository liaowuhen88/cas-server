/**
 * JS统一工具类
 */
Utils = (function () {
    var instance;
    //构造
    function Utils() {
        instance = this;
        return this;
    }

    /**
     * ajax send
     * @param link
     * @param async
     * @param callback
     * @param data
     * @returns {null|*|string}
     */
    Utils.prototype.load = function (link, type, callback, data) {
        var cur = this;
        return $.ajax({
            url: link,
            success: function (json) {
                if (isFunc(callback))
                    callback.call(cur, json);
            },
            data: data,
            type: type
        }).responseText;
    };

    Utils.prototype.renderDiv = function renderDiv(tplId, datas, renderDiv) {
        if (datas) {
            var commentTpl = $('#' + tplId).html();
            $("#" + renderDiv).empty();
            $.each(datas, function (i, item) {
                $(Mustache.to_html(commentTpl, item)).appendTo("#"+renderDiv);
            });
        }
    };

    Utils.prototype.renderDiv_ = function renderDiv_(tplId, data, renderDiv) {
        if (data) {
            $("#" + renderDiv).empty();
            var commentTpl = $('#' + tplId).html();
            $(Mustache.to_html(commentTpl, data)).appendTo("#"+renderDiv);
        }
    };

    Utils.prototype.findTpl = function findTpl(tplId, data) {
        if (data) {
            var commentTpl = $('#' + tplId).html();
            var currHtml='';
            $.each(data, function (i, item) {
                currHtml+=$(Mustache.to_html(commentTpl, item)).html();
            });
           return currHtml;
        }
    };

    Utils.prototype.findTpl_ = function findTpl_(tplId, data) {
        if (data) {
            var commentTpl = $('#' + tplId).html();
            var currHtml= $(Mustache.to_html(commentTpl, data)).html();
            return currHtml;
        }
    };

    /**
     * 将形如"2015-11-25 17:35:00"的字符串转换为Date对象
     */
    Utils.prototype.parseDate = function (s) {
        var re = /^(\d{4})-(\d\d)-(\d\d) (\d\d):(\d\d):(\d\d)$/;
        var m = re.exec(s);
        return m ? new Date(m[1], m[2] - 1, m[3], m[4], m[5], m[6]) : null;
    };

    /**
     * 格式化日期
     * @param date
     * @param fmt
     * @returns {*|string}
     */
    Utils.prototype.formatDate = function (date, fmt) {
        fmt = fmt || 'yyyy-MM-dd hh:mm:ss';
        var o = {
            "M+": date.getMonth() + 1,
            "d+": date.getDate(),
            "h+": date.getHours(),
            "m+": date.getMinutes(),
            "s+": date.getSeconds(),
            "q+": Math.floor((date.getMonth() + 3) / 3),
            "S": date.getMilliseconds()
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    };
    return Utils;
})();

window.myUtils = new Utils();

/**
 * 判断当前对象是否为空
 *
 * @method isEmpty
 * @param {Object}
 *            obj
 * @return {Boolean} empty 当为 null,undefined,"" 将返回true
 */
window.isEmpty = function (obj) {
    return (obj == null || typeof obj == "undefined" || obj.length == 0)
};


/**
 * 判断当前对象是否非空
 *
 * @method isNotEmpty
 * @param {Object}
 *            obj
 * @return {Boolean}
 */
window.isNotEmpty = function (obj) {
    return !isEmpty(obj);
};

/**
 * 判断是否为函数
 *
 * @method isFunc
 * @param {Object}
 *            fun
 * @return {Boolean}
 */
window.isFunc = function (fun) {
    return (fun != null && typeof fun == "function");
};

/**
 * 判断不是函数
 *
 * @method isNotFunc
 * @param {Object}
 *            fun
 * @return {Boolean}
 */
window.isNotFunc = function (fun) {
    return !isFunc(fun);
};

/**
 * 判断 cur 是否为 type 类型
 *
 * @method typeOf
 * @param {Object}
 *            cur
 * @param {String}
 *            type
 * @example typeOf("Hello","string");//将返回true
 * @return {Boolean}
 */
window.typeOf = function (cur, type) {
    if (typeof type != "string")
        return false;
    return typeof cur == type;
};

/**
 * 判断是否为数组
 *
 * @method isArray
 * @param {Object}
 *            array
 * @return {Boolean}
 */
window.isArray = function (array) {
    return isNotEmpty(array) && className(array) == "Array"
};

/**
 * 判断不是数组
 *
 * @method isNotArray
 * @param {Object}
 *            arr
 * @return {Boolean}
 */
window.isNotArray = function (arr) {
    return !isArray(arr);
};

window.console = window.console || {};
ConsoleUtils = (function () {
    var open = false;

    function ConsoleUtils(op) {
        open = op;
    }

    ConsoleUtils.prototype.toggle = function () {
        open = !open;
    };
    ConsoleUtils.prototype.open = function () {
        open = true;
    };
    ConsoleUtils.prototype.close = function () {
        open = false;
    };
    ConsoleUtils.prototype.log = function (msg) {
        if (open)
            console.log(msg);
    };
    //打印结构
    ConsoleUtils.prototype.dir = function (obj) {
        if (open)
            console.dir(obj);
    };
    return ConsoleUtils;
})();

Console = new ConsoleUtils(false);