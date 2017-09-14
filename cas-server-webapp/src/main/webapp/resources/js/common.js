//table tools
var Tools = {
    getContextPath: function () {
        return "/" + window.location.pathname.split("/")[1];
    },
    getServerContext: function () {
        var localObj = window.location;
        var serverContext = localObj.protocol + "//" + localObj.host + "/" + localObj.pathname.split("/")[1];
        return serverContext;
    },
    page: function (opt) {
        $("#dataTables").css({"width":"100%"});
        var table = $("#" + opt.tableId).dataTable({
            "oLanguage": {
                "sLengthMenu": "每页显示 _MENU_ 条记录",
                "sZeroRecords": "抱歉， 没有找到",
                "sInfo": "从 _START_ 到 _END_ /共 _TOTAL_ 条数据",
                "sInfoEmpty": "没有数据",
                "sInfoFiltered": "(从 _MAX_ 条数据中检索)",
                "sProcessing": "数据正在加载中，请等待",
                "oPaginate": {
                    "sFirst": "首页",
                    "sPrevious": "前一页",
                    "sNext": "后一页",
                    "sLast": "尾页"
                },
                "sZeroRecords": "没有检索到数据"
            },
            "bServerSide": true,
            "paging": opt.paging || true,
            "sAjaxSource": opt.ajaxUrl,
            "bStateSave": true,
            "sPaginationType": "full_numbers",
            "iDisplayLength": null != opt.iDisplayLength ? opt.iDisplayLength : 10,
            "bLengthChange": false,
            "bFilter": false,
            "bProcessing": true,
            "aoColumns": opt.aoColumns,
            "fnDrawCallback": function (oSettings) {
                if (null != opt.fnDraw && opt.fnDraw instanceof Function) {
                    opt.fnDraw();
                }
                if (null != opt.drawCallback && opt.drawCallback instanceof Function) {
                    var api = this.api();
                    opt.drawCallback(oSettings,api);
                }
            },
            "fnServerData": function (sSource, aoData, fnCallback) {
                if (opt.paramfrom != null && opt.paramfrom != "" && opt.paramfrom.length > 0) {
                    for (var i = 0; i < opt.paramfrom.length; i++) {
                        aoData.push(opt.paramfrom[i]);
                    }
                }
                $.ajax({
                    "dataType": 'json',
                    // "contentType": "application/json;charset=UTF-8",
                    "type": "post",
                    "data": aoData,
                    "url": sSource,
                    "success": fnCallback
                });
            },
            "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                //排除某列渲染
                if (opt.disableTitleCol != null && opt.disableTitleCol != 'undefined' && opt.disableTitleCol.length > 0) {
                    for (var i = 0; i < aData.length; i++) {
                        if (jQuery.inArray(i, opt.disableTitleCol) == -1) {
                            $('td:eq(' + i + ')', nRow).attr("title", aData[i]);
                        }
                    }
                }
                //return nRow;
            },
            "fnInitComplete": function (oSettings, json) {
                if (null != opt.multSelectColId && "undefined" != opt.multSelectColId) {
                    var selectAll = $("#" + opt.multSelectColId);
                    if (selectAll != null && selectAll != "undefined") {
                        selectAll.click(function () {
                            if (this.checked) {
                                $("#" + opt.tableId).children("tbody").find("input[type='checkbox']").each(function () {
                                    this.checked = true;
                                });
                            } else {
                                $("#" + opt.tableId).children("tbody").find("input[type='checkbox']").each(function () {
                                    this.checked = false;
                                });
                            }
                        });
                    }
                }
                if (null != opt.fnComplete && typeof opt.fnComplete == "function") {
                    opt.fnComplete();
                }
            }
        });
        return table;
    },
    JumpTo: function (controllerRM, id) {
        var entityRM = Tools.getServerContext() + "/" + controllerRM + "/" + id;
        //show
        var optHtml = "<div class=\"btn-group\">";
        optHtml += "<a class=\"btn btn-xs btn-info\" href=\"" + entityRM + "\">";
        optHtml += "<span class=\"glyphicon glyphicon-search icon-white\"></span>&nbsp;查看";
        optHtml += "</a>";
        optHtml += "</div>";
        //update
        optHtml += "<div class=\"btn-group\">";
        optHtml += "<a class=\"btn btn-xs btn-success\" href=\"javascript:editIt(" + id + ")\">";
        optHtml += "<span class=\"glyphicon glyphicon-edit icon-white\"></span>&nbsp;编辑";
        optHtml += "</a>";
        optHtml += "</div>";
        //delete
        optHtml += "<div class=\"btn-group\">";
        optHtml += "<form action=\"" + entityRM + "\" method=\"post\">";
        optHtml += "<input type=\"hidden\" name=\"_method\" value=\"DELETE\">";
        optHtml += "<button type=\"submit\" class=\"btn btn-xs btn-danger\" onclick=\"return confirm('是否禁用?');\">";
        optHtml += "<span class=\"glyphicon glyphicon-trash icon-white\"></span>&nbsp;禁用";
        optHtml += "</button>";
        optHtml += "</form>";
        optHtml += "</div>";
        return optHtml;
    },
    ajaxSend: function (controllerRM, id, status) {
        var entityRM = controllerRM + "?id=" + id;
        var rm = "enterpriseSearchMenuPage";
        //show
        var optHtml = "<div class=\"btn-group\">";
        optHtml += "<a class=\"btn btn-xs btn-info\"  href=\"javascript:clickMenu('" + entityRM + "','" + rm + "')\">";
        optHtml += "<span class=\"glyphicon glyphicon-search icon-white\"></span>&nbsp;查看";
        optHtml += "</a>";
        optHtml += "</div>";
        //update
        optHtml += "<div class=\"btn-group\">";
        optHtml += "<a class=\"btn btn-xs btn-success\" href=\"javascript:editIt(" + id + ")\">";
        optHtml += "<span class=\"glyphicon glyphicon-edit icon-white\"></span>&nbsp;编辑";
        optHtml += "</a>";
        optHtml += "</div>";
        //delete        optHtml += "<div class=\"btn-group\">";
        var text = "禁用";
        var v = 0;
        if (status == 0) {
            text = "启用";
            v = 1;
        }
        optHtml += "<a class=\"btn btn-xs btn-danger\" href=\"javascript:updateEmpStut(" + id + "," + v + ")\">";
        optHtml += "<span class=\"glyphicon glyphicon-edit icon-white\"></span>&nbsp;";
        optHtml += text;

        optHtml += "</a>";
        optHtml += "</div>";
        return optHtml;
    },
    renderOperate: function (optButtonHtml) {
        var htmlStr = "<div class=\"btn-toolbar\">";
        htmlStr += optButtonHtml;
        htmlStr += "</div>";
        return htmlStr;
    }
};

$(".subNav").click(function () {
    $(this).toggleClass("currentDd").siblings(".subNav").removeClass("currentDd");
    $(this).toggleClass("currentDt").siblings(".subNav").removeClass("currentDt");
    $(this).next(".navContent").slideToggle(300).siblings(".navContent").slideUp(300);
});

Date.prototype.Format = function (date, fmt) { //author: meizz
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

$(document).ready(function () {
    $('#cancelBtn').live('click', function () {
        $('.theme-popover-mask').fadeOut(100);
        $('.theme-popover').slideUp(200);
        $("label.error").text("");
        return false
    });

    $('.theme-poptit .close').live('click', function () {
        $('.theme-popover-mask').fadeOut(100);
        $('.theme-popover').slideUp(200);
        $("label.error").text("");
        return false
    });

    var subNavBox = $(".subNavBox");
    var subNavBox_packup = $(".subNavBox-packup");
    var subNavBox_men = $(".subNavBox-men");
    var contents = $(".content");
    subNavBox_packup.click(function(){
        subNavBox.animate({marginLeft:"-215px"});
        contents.animate({marginLeft:"0"});
        subNavBox_packup.hide();
        subNavBox_men.show();
    });

    subNavBox_men.click(function(){
        subNavBox.animate({marginLeft:"0"});
        contents.animate({marginLeft:"220px"});
        subNavBox_packup.show();
        subNavBox_men.hide();
    });
});

function clickMenu(id, menuId) {
    loadUrlToContainer(id);
    $(".subNavBox li").each(function () {
        $(this).removeClass("active");
    });
    if (menuId) {
        $("#" + menuId).parent().addClass("active");
    } else {
        $("#" + id).parent().addClass("active");
    }
}

function loadUrlToContainer(url) {
    var containerDiv = $("#container"),
        html = '<div class="loading"><div class="pic">请稍等....</div></div>';
    containerDiv.empty().append(html);
    containerDiv.load(url);
}

function ajaxSubmitCommon(formId, buttonId, url, data, successCallback, errorCallback, timeOut) {
    $("#" + buttonId).attr("disabled", "disabled").attr("style", "background: #B0B5B9;");
    var ajaxOptions = {
        url: url,
        type: 'post',
        data: data,
        dataType: 'json',
        timeout: 100000,
        cache: false,
        success: function (responseJson) {
            $("#" + buttonId).removeAttr("disabled").removeAttr("style");
            if (responseJson.success) {
                successCallback(responseJson);
            } else {
                errorCallback(responseJson);
            }
        },
        error: function () {
            $("#" + buttonId).removeAttr("disabled").removeAttr("style");
            timeOut();
        }
    };
    $("#" + formId).ajaxSubmit(ajaxOptions);
}

function confirmIt(title, content, url, data, flashTable) {
    $.messager.confirm(title, content, function () {
        $.ajax({
            type: 'post',
            url: url,
            data: JSON.stringify(data),
            contentType: "application/json",
            dataType: 'json',
            success: function (responseData) {
                if (responseData.success) {
                    table.fnDraw();
                } else {
                    $.messager.popup(responseData.msg);
                }
            },
            error: function () {
                $.messager.popup("error");
            }
        });
    });
}

function ajaxCommon(url, data, success, error) {
    $.ajax({
        url: url,
        type: 'post',
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: 'json',
        success: function (responseJson) {
            if (responseJson.success) {
                success(responseJson)
            } else {
                //$.messager.popup(responseJson.msg);
                error(responseJson);
            }

        },
        error: function () {
            //$.messager.popup("error");
            $.messager.popup("发生错误");
        }
    });
}

function renderDiv(url, data, containerIdDiv, callbackHtml) {
    $.get(url, data, function (msg) {
        $("#" + containerIdDiv).empty().append(callbackHtml(msg.data));
    })
}

function loading(){
    var loading = '<div class="loadingbox">' + '<div class="loadingimg">' + '<img src=' + window.base + '/resources/images/loading1.gif/>' + '</div></div>';
    $(document.body).append(loading);
}

$(document).keydown(function (e) {
    var e = e || event,
        keycode = e.which || e.keyCode;
    if (keycode == 13) {
        $("#searchButton").trigger("click");
        return false;
    }
});

$(document).keyup(function(e){
    var key = e.which;
    if(key == 27){
        $(".close").trigger("click");
    }
});

function version(){
    if(window.console){
        console.log('更新时间:2015-11-09');
    }
}

function isNotEmpty(currval){
    if(currval==''||currval==null || currval.length==0 ||currval=='0' || currval==undefined){
        return false;
    }
    return true;
}
//处理键盘事件 禁止后退键（Backspace）密码或单行、多行文本框除外
function banBackSpace(e){
    var ev = e || window.event;//获取event对象
    var obj = ev.target || ev.srcElement;//获取事件源
    var t = obj.type || obj.getAttribute('type');//获取事件源类型
    //获取作为判断条件的事件类型
    var vReadOnly = obj.getAttribute('readonly');
    //处理null值情况
    vReadOnly = (vReadOnly == "") ? false : vReadOnly;
    //当敲Backspace键时，事件源类型为密码或单行、多行文本的，
    //并且readonly属性为true或enabled属性为false的，则退格键失效
    var flag1=(ev.keyCode == 8 && (t=="password" || t=="text" || t=="textarea")
    && vReadOnly=="readonly")?true:false;
    //当敲Backspace键时，事件源类型非密码或单行、多行文本的，则退格键失效
    var flag2=(ev.keyCode == 8 && t != "password" && t != "text" && t != "textarea")
        ?true:false;

    //判断
    if(flag2){
        return false;
    }
    if(flag1){
        return false;
    }
}

window.onload=function(){
    //禁止后退键 作用于Firefox、Opera
    document.onkeypress=banBackSpace;
    //禁止后退键  作用于IE、Chrome
    document.onkeydown=banBackSpace;
}