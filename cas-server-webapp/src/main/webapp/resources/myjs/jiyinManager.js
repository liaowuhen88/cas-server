$('#successDate').datepicker({
    format: "yyyy-mm-dd",
    language: "zh-CN",
    weekStart: 1,
    autoclose: true
});
$('#successDate1').datepicker({
    format: "yyyy-mm-dd",
    language: "zh-CN",
    weekStart: 1,
    autoclose: true
});

var table = null;

var requestParams = [];


$(document).ready(function () {
    table = Tools.page({
        "tableId": "dataTables",
        "paramfrom": requestParams,
        "ajaxUrl": window.base + "/physicalExamination/selectJiYinData?rand=" + new Date().getTime(),
        "aoColumns": [
            {"sTitle": "序号", "aTargets": [0], "bSortable": false, "mData": "rownum"},
            {"sTitle": "筛查串号", "aTargets": [1], "bSortable": false, "mData": "screening_num"},
            {"sTitle": "基因套餐", "aTargets": [2], "bSortable": false, "mData": "packagename"},
            {"sTitle": "基因公司", "aTargets": [3], "bSortable": false, "mData": "companyname"},
            {"sTitle": "报告类型", "aTargets": [4], "bSortable": false, "mData": "reportname"},
            {"sTitle": "筛查人", "aTargets": [5], "bSortable": false, "mData": "screening_people"},
            {"sTitle": "筛查人手机号", "aTargets": [6], "bSortable": false, "mData": "screening_mobile"},
            {
                "sTitle": "创建时间", "aTargets": [7], "bSortable": false, "mData": function (obj) {
                return new Date().Format(new Date(obj.ct));
            }
            },
            {
                "sTitle": "查看pdf",
                "aTargets": [5],
                "bSortable": false,
                "mData": function (obj) {
                    var pdf = obj.pdf;
                    if (pdf != null && pdf != '') {
                        return "<a href='#' onclick=\"reportClick('" + pdf + "')\" > 查看/下载</a>"
                    } else {
                        return "";
                    }
                }
            },
            {
                "sTitle": "操作",
                "sWidth": "150",
                "aTargets": [6],
                "bSortable": false,
                'sClass': "text-center",
                "mData": function (obj) {
                    var pushst = "";
                    var pushjs = "";
                    var optHtml = "";
                    optHtml += "<a class=\"btn btn-xs btn-info\" style=\"float: none;\"  href=\"javascript:editClick('" + obj.id + "');\">";
                    optHtml += "<span class=\"glyphicon glyphicon-edit  icon-white\"></span>&nbsp;编辑";
                    optHtml += "</a>";
                    optHtml += "<a class=\"btn btn-xs btn-info\" style=\"float: none;\"  href=\"javascript:deleteClick('" + obj.id + "');\">";
                    optHtml += "<span class=\"glyphicon glyphicon-edit  icon-white\"></span>&nbsp;删除";
                    optHtml += "</a>";
                    if (obj.pushstatus == 1) {
                        pushst = "javascript:alert('push已发送')";
                        pushjs = "disabled";
                    } else {
                        pushst = "javascript:pushClick('" + obj.screening_mobile + "','" + obj.screening_people + "','" + obj.id + "')";
                        pushjs = "";
                    }
                    optHtml += "<a class=\"btn btn-xs btn-info\" style=\"float: none;\" " + pushjs + " href=" + pushst + ">";
                    optHtml += "<span class=\"glyphicon glyphicon-edit  icon-white\"></span>&nbsp;发送push";
                    optHtml += "</a>";
                    return Tools.renderOperate(optHtml);
                }
            }
        ]
    });


})

$("#searchButton").click(function () {
    requestParams.length = 0;
    var jy_code = $("#jy_code").val();
    var jy_order = $("#jy_order").val();
    var jy_company = $("#jy_company").val();
    var sc_ren = $("#sc_ren").val();
    var sc_mobile = $("#sc_mobile").val();


    if (jy_code != "") {
        requestParams.push({"name": "jy_code", "value": jy_code});
    }
    if (jy_order != "") {
        requestParams.push({"name": "jy_order", "value": jy_order});
    }
    if (jy_company != "") {
        requestParams.push({"name": "jy_company", "value": jy_company})
    }
    if (sc_ren != "") {
        requestParams.push({"name": "sc_ren", "value": sc_ren})
    }
    if (sc_mobile != "") {
        requestParams.push({"name": "sc_mobile", "value": sc_mobile})
    }
    table.fnDraw();
});
function initSelectData() {
    var url = window.base + '/physicalExamination/findJYInfo';
    $.post(url, {}, function (result) {
        if (result.success) {
            var list = result.data;
            console.log(list);
            var gene_package = $("#gene_package");
            gene_package.empty();
            var option = "<option></option>";
            if (list != null && list.length != 0) {
                for (var j = 0; j < list.length; j++) {
                    option += "<option  value='" + list[j].package_id + "'>  " + list[j].package_name + " </option>";
                }
                gene_package.append(option);
            }
        }
    });
}


//  根据基因套餐查找 基因公司和套餐类型
function showOtherInfo() {
    var package_id = $("#gene_package").val();
    var url = window.base + '/physicalExamination/findOtherInfo/' + package_id;
    $.post(url, {}, function (result) {
        if (result.success) {
            var list = result.data;
            var gene_company = $("#gene_company");
            var report_type = $("#report_type");
            if (list != null) {
                gene_company.val(list.cmp_name);
                $("#cmp_id").val(list.cmp_id);
                report_type.val(list.report_name);
                $("#report_id").val(list.report_id);
            }
        }
    });
}

// 编辑
function editClick(id) {
    $('.theme-popover-mask').fadeIn(100);
    $('#theme-popover2').slideDown(200);
    $.get(window.base + "/physicalExamination/selectPdfInfo", {'id': id}, function (msg) {
        var url = window.base + '/physicalExamination/findJYInfo'
        // 初始化套餐下拉框
        $.post(url, {}, function (result) {
            if (result.success) {
                var list = result.data;
                var gene_package = $("#gene_package");
                gene_package.empty();
                var option = "<option></option>";
                if (list != null && list.length != 0) {
                    for (var j = 0; j < list.length; j++) {
                        if (data1.gene_package == list[j].package_id) {
                            option += "<option selected  checked value='" + list[j].package_id + "'>  " + list[j].package_name + " </option>";
                        } else {
                            option += "<option  value='" + list[j].package_id + "'>  " + list[j].package_name + " </option>";
                        }
                    }
                    gene_package.append(option);
                }
            }
        });
        var data1 = msg.data;
        $("#screening_people").val(data1.screening_people);
        $("#screening_mobile").val(data1.screening_mobile);
        $("#screening_mobile").attr({"disabled": true});
        $("#screening_num").attr({"disabled": true});
        $("#gene_company").val(data1.companyname);
        $("#gene_company").attr({"disabled": true});
        $("#screening_num").val(data1.screening_num);
        $("#report_type").val(data1.reportname);
        $("#report_type").attr({"disabled": true});
        $("#pdf").show();
        $("#result_up").show();
        $("#pdf").val(data1.pdf);
        $("#id").val(id);
    });
}

//删除
function deleteClick(id) {
    if (id) {
        var url = window.base + "/physicalExamination/deleteJiYin/" + id;
        confirmIt("提示", "确定要删除吗", url, {}, table)
    }
}

//新增
$("#addButton").click(function () {
    ( $("#editOrderForm"))[0].reset();
    $("#report_type").attr({"disabled": true});
    $("#gene_company").attr({"disabled": true});
    $("#screening_num").attr({"disabled": false});
    $("#screening_mobile").attr({"disabled": false});
    $("#result_up").hide();
    $("#id").val("");//id
    $("#pdf").val("");//pdf
    initSelectData();
    $('.theme-popover-mask').fadeIn(100);
    $('#theme-popover2').slideDown(200);

});

//保存
$("#editOrderBtn").click(function () {
    var screening_mobile = $("#screening_mobile").val();//筛查人电话
    var screening_people = $("#screening_people").val();//筛查人
    var screening_mobile = $("#screening_mobile").val();//筛查人电话
    var gene_company = $("#gene_company").val();//基因公司
    var screening_num = $("#screening_num").val();//筛查盒串号
    var gene_package = $("#gene_package").val();//基因套餐
    var report_type = $("#report_type").val();//套餐类型
    var cmp_id = $("#cmp_id").val();
    var report_id = $("#report_id").val();
    var id = $("#id").val();//id
    var pdf = $("#pdf").val();//pdf


    if (screening_num == "") {
        alert("筛查号不为空");
    } else if (screening_people == "") {
        alert("筛查人不为空");
    } else if (screening_mobile == "") {
        alert("筛查人电话不能为空");
    } else if (gene_package == "") {
        alert("基因套餐不为空");
    } else if (pdf == "") {
        alert("请上传PDF");
    } else if (!checkPhone()) {
        return false;
    } else {
        $.get(window.base + "/physicalExamination/isMobile", {'mobile': screening_mobile}, function (msg) {
            if (msg.data != null) {
                insertJy();
            } else {
                var r = confirm("此手机未注册,是否创建账号,建立新账号即可查看报告");
                if (r == true) {
                    $.get(window.base + "/physicalExamination/createMobile", {'mobile': screening_mobile}, function (msg) {
                        alert("注册成功");
                        /*  if (msg.data != null) {
                         insertJy();
                         }*/
                    });
                }
                /* else {
                 $('.theme-popover-mask').fadeOut(100);
                 $('#theme-popover2').slideUp(200);
                 table.fnDraw();
                 }*/
            }
        });


    }

});

//保存方法
function insertJy() {
    var url = window.base + "/physicalExamination/saveuploadpdf";
    var screening_people = $("#screening_people").val();//筛查人
    var screening_mobile = $("#screening_mobile").val();//筛查人电话
    var gene_company = $("#gene_company").val();//基因公司
    var screening_num = $("#screening_num").val();//筛查盒串号
    var gene_package = $("#gene_package").val();//基因套餐
    var report_type = $("#report_type").val();//套餐类型
    var cmp_id = $("#cmp_id").val();
    var report_id = $("#report_id").val();
    var id = $("#id").val();//id
    var pdf = $("#pdf").val();//pdf
    $.post(url, {
        'screening_people': screening_people,
        'screening_mobile': screening_mobile,
        'gene_company': cmp_id,
        'screening_num': screening_num,
        'gene_package': gene_package,
        'report_type': report_id,
        'id': id,
        'pdf': pdf
    }, function (result) {
        if (result.success) {
            $('.theme-popover-mask').fadeOut(100);
            $('#theme-popover2').slideUp(200);
            alert(result.msg);
            table.fnDraw();
            $("#pdf").hide();
            $("#result_up").hide();
        }
    });
}

//验证手机号是否存在
function isMobile(mobile) {
    var accoutId = true;
    $.get(window.base + "/physicalExamination/isMobile", {'mobile': mobile}, function (msg) {
        if (msg.accoutId != null) {
            accoutId = msg.accoutId;
        }
    });
}
//PDF显示
function reportClick(pdf) {
    window.open(pdf);
}
//pdf文件上传
$("#uploadButton").click(function () {
    if ($("#file").val() == "" || $("#file").val() == null) {
        alert("请上传文件！");
        return false;
    }
    var uploadButton = $("#uploadButton");
    uploadButton.attr("disabled", true);
    uploadButton.css("background", "");

    $.ajaxFileUpload({
        url: window.base + "/physicalExamination/uploadReportPDF", //用于文件上传的服务器端请求地址
        secureuri: false, //是否需要安全协议，一般设置为false
        fileElementId: "file", //文件上传域的ID
        dataType: 'json', //返回值类型 一般设置为json
        data: {},
        success: function (responseData) {//服务器成功响应处理函数
            var json = JSON.parse(responseData);
            if (json.success) {
                //上传成功
                uploadButton.attr("disabled", false);
                console.log(json.data);
                $("#pdf").show();
                $("#pdf").val(json.data);
                $("#result_up").show();
            } else {
                uploadButton.attr("disabled", false);
                $("#result_up").hide();
                alert(json.msg);
            }
        },
        error: function (responseData, status, e) {//服务器响应失败处理函数
            uploadButton.attr("disabled", false);
            alert("未知错误!,请稍后重试");
        }

    });
});


function pushClick(mobile, name, id) {
    var r = confirm("确定要发送吗");
    if (r == true) {
        var url = window.base + "/physicalExamination/sendReportPush/" + mobile + "/" + name + "/" + id + "/1";

        $.ajax({
            type: 'post',
            url: url,
            data: {},
            dataType: 'json',
            success: function (responseData) {
                if (responseData.success) {
                    alert("发送成功");
                    location.href = "javascript:clickMenu('" + window.base + "/jiyinManager','jiyinManager')"
                    id = "otherReportManager";
                } else {
                    $.messager.popup(responseData.msg);
                }
            },
            error: function () {
                $.messager.popup("error");
            }
        });
    }
}


function isScreening_num() {
    var screening_num = $("#screening_num").val();
    $.get(window.base + "/physicalExamination/isScreening_num", {'screening_num': screening_num}, function (msg) {
        if (msg.data != null) {
            disableBtnOk('筛查号已存在');
        } else {
            removedisableBtnOk('');
        }
    });
}


function checkPhone() {
    var screening_mobile = $("#screening_mobile").val();
    if (!(/^1[3|5|7|8]\d{9}$/.test(screening_mobile))) {
        alert("手机号码有误，请重填");
        return false;
    }
    return true;
}
function disableBtnOk(msg) {
    $("#num_error").text(msg);
    $("#editOrderBtn").attr({"class": " btn btn-inverse"});
    $("#editOrderBtn").attr({"disabled": "disabled"});
}
function removedisableBtnOk(msg) {
    $("#num_error").text(msg);
    $("#editOrderBtn").attr({"class": "plains_btn"});
    $("#editOrderBtn").removeAttr("disabled");
}
// 取消
$("#cancelOrder").click(function () {
    $(".close").click();
});
