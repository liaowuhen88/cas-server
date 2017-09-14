var table;
$(document).ready(function () {
    var requestParams = [];
    requestParams.push({"name": "type", "value": $("#type").val()});
    table = Tools.page({
        "tableId": "dataTables",
        "paramfrom": requestParams,
        "ajaxUrl": window.base + "/api/bisinf/list",
        "aoColumns": [
            {"aTargets": [0], "bVisible": false, 'sClass': "text-center", "bSortable": false, "mData": "id"},
            {"sTitle": "登记号", "aTargets": [2], "bSortable": false, 'sClass': "text-center", "mData": "businessId"},
            {"sTitle": "投保企业", "aTargets": [1], "bSortable": false, 'sClass': "text-center", "mData": "ename"},
            {"sTitle": "保单号", "aTargets": [2], "bSortable": false, 'sClass': "text-center", "mData": "code"},

            {
                "sTitle": "申请时间",
                "aTargets": [3],
                "bSortable": false,
                'sClass': "text-center",
                "mData": "ct"
            },
            {
                "sTitle": "保全类型",
                "aTargets": [3],
                "bSortable": false,
                'sClass': "text-center",
                "mData": "operatingstatusname"
            },
            {
                "sTitle": "已处理时间",
                "aTargets": [3],
                "bSortable": false,
                'sClass': "text-center",
                "mData": "time"
            },
            {
                "sTitle": "最近更新时间",
                "aTargets": [3],
                "bSortable": false,
                'sClass': "text-center",
                "mData": "ut"
            },
            {
                "sTitle": "费用", "aTargets": [7], "bSortable": false, 'sClass': "text-center", "mData": "truemoney"
            },
            {
                "sTitle": "处理状态",
                "aTargets": [7],
                "bSortable": false,
                'sClass': "text-center",
                "mData": function (obj) {

                    return getChseStatus(obj.status);
                }
            }, /*{
             "sTitle": "文件下载", "aTargets": [7], "bSortable": false, 'sClass': "text-center", "mData": "paymoney"
             },*/
            {
                "sTitle": "操作",
                "sWidth": "18%",
                "aTargets": [8],
                "bSortable": false,
                'sClass': "text-center",
                "mData": function (obj) {
                    var text = "";

                    var optHtml = "";
                    if (obj.isdone == 0) {
                        return "处理中!";
                    }

                    var v1 = "";
                    var v2 = "";
                    if ($("#type").val() == 1) {
                        v1 = "保全处理";
                        v2 = "保全确认";
                    } else {
                        v1 = "契约处理";
                        v2 = "契约确认";
                    }
                    var entityRM = window.base + "/api/bisinf/listSummary/" + obj.id + "/" + $("#type").val();

                    if (obj.isAdmin == 1) {
                        var optHtml = "";
                        optHtml += "<div class=\"btn-group\">";
                        optHtml += "<a class=\"btn btn-xs btn-info\"  href=\"javascript:clickMenu('" + entityRM + "','enterpriseBnsInfo" + $("#type").val() + "')\">";
                        optHtml += "查看";
                        optHtml += "</a>";
                        optHtml += "</div>";
                        return optHtml;
                    }
                    if (obj.status == 0) {
                        text = "认领";
                        optHtml += "<div class=\"btn-group\">";
                        optHtml += "<a class=\"btn btn-xs btn-info\"  onclick=\"sureClaimBns('" + obj.id + "')\">";
                        optHtml += "<span class=\"glyphicon icon-white\"></span>&nbsp;" + text;
                        optHtml += "</a>";
                        optHtml += "</div>";
                        return optHtml;
                    } else if (obj.status != 4 && obj.status != 5 && obj.status != 2) {
                        text = v1;
                        optHtml += "<div class=\"btn-group\">";
                        optHtml += "<a class=\"btn btn-xs btn-info\"   onclick=\"showModel('" + obj.businessId + "','" + obj.ct + "','" + obj.ct + "','" + obj.status + "','"
                            + obj.revokemsg + "','" + obj.sourceid + "','" + obj.enterpriseid + "','" + obj.contractid + "','" + obj.id + "','" + obj.operatingstatus + "','"
                            + obj.filepath + "','" + obj.contractname + "','" + obj.ename + "','" + obj.truemoney + "')\">";
                        optHtml += "<span class=\"glyphicon icon-white\"></span>&nbsp;" + text;
                        optHtml += "</a>";
                        optHtml += "</div>";

                        text = v2;
                        optHtml += "<div class=\"btn-group\">";
                        optHtml += "<a class=\"btn btn-xs btn-danger\"  onclick=\"makeSureBns('" + obj.id + "')\">";
                        optHtml += "<span class=\"glyphicon   icon-white\"></span>&nbsp;" + text;
                        optHtml += "</a>";
                        optHtml += "</div>";

                    }
                    optHtml += "<div class=\"btn-group\">";
                    optHtml += "<a class=\"btn btn-xs btn-info\"  href=\"javascript:clickMenu('" + entityRM + "','enterpriseBnsInfo" + $("#type").val() + "')\">";
                    optHtml += "查看";
                    optHtml += "</a>";
                    optHtml += "</div>";

                    return Tools.renderOperate(optHtml);
                }
            }
        ]
    });


    //查询
    $("#searchButton").click(function () {
        requestParams.length = 0;
        var searchValue = $("#searchValue").val();
        if (null != searchValue && searchValue != "") {
            requestParams.push({"name": $("#searchKey").val(), "value": searchValue});
        }
        requestParams.push({"name": "type", "value": $("#type").val()});
        table.fnDraw();
    });


    //文件上传
    $("input[name='uploadFileButton']").click(function () {
        if ($("#file1").val() == "" && $("#file2").val() == "") {
            alert("请上传名单！");
            return false;
        }

        $("input[name='uploadFileButton']").attr("disabled", true);
        $("input[name='uploadFileButton']").css("background", "");

        var businessId = $("#businessId").val();
        //var fileName = $("#file").val();
        //var name = fileName.split('\\');
        //var v = name[name.length - 1];
        /*  if (v.indexOf(businessId) < 0) {
         alert('请选择与当前业务向对应的文件！');
         return;
         }*/
        var id = $("#pk").val();
        var enterpriseId = $("#enterpriseId").val();
        var mainid = $("#contrcatid").val();
        var opera = $("#opera").val();
        var truemoney = $("#truemoney").val();
        var fileid = "file" + $("#type").val();
        $.ajaxFileUpload({
            url: window.base + "/bkf/enterpriseEmp/uploadFile",   //用于文件上传的服务器端请求地址
            secureuri: false,       //是否需要安全协议，一般设置为false
            fileElementId: fileid, //文件上传域的ID
            dataType: 'json',     //返回值类型 一般设置为json
            data: {
                "enterpriseId": enterpriseId,
                "contractId": mainid,
                "operatingstatus": opera,
                "businesspk": id,
                "truemoney": truemoney
            },
            success: function (data, status) {//服务器成功响应处理函数
                var json = JSON.parse(data);

                if (json.success) {
                    $('.theme-popover-mask').fadeOut(100);
                    $('.theme-popover').slideUp(200);
                    table.fnDraw();
                } else {
                    alert(json.msg);
                }
            },
            error: function (data, status, e) {//服务器响应失败处理函数
                // alert(status);
                //$("#result").append(data);
                //alert("解析Excel发生错误");
            }
        });

    });

//问题下发
    $("#wrongstatussubmit").click(
        function () {
            var wrongstatusvalue = $("#wrongstatusvalue").val();
            if ($.trim(wrongstatusvalue) == "" || $.trim(wrongstatusvalue).toLowerCase() == 'null') {
                alert("原因不能为空！");
                return false;
            }

            var text = $("#wrongstatusvalue").val();
            var pk = $("#pk").val();
            $.post(window.base + "/api/bisinf/updateWrongStatus", {"id": pk, "text": text}, function (data) {
                $('.theme-popover-mask').fadeOut(100);
                $('.theme-popover').slideUp(200);
                table.fnDraw();
            });
        }
    );
//撤销
    $("#revoke").click(
        function () {
            var wrongstatusvalue = $("#wrongstatusvalue").val();
            if ($.trim(wrongstatusvalue) == "" || $.trim(wrongstatusvalue).toLowerCase() == 'null') {
                alert("原因不能为空！");
                return false;
            }

            var text = $("#wrongstatusvalue").val();
            var pk = $("#pk").val();
            $.post(window.base + "/api/bisinf/revoke", {"id": pk, "text": text}, function (data) {
                $('.theme-popover-mask').fadeOut(100);
                $('.theme-popover').slideUp(200);
                table.fnDraw();
            });
        }
    );
    $('.theme-poptit .close').click(function () {
        //alert('aaa')
        $('.theme-popover-mask').fadeOut(100);
        $('.theme-popover').slideUp(200);
        return false
    });
})
;


function sureClaimBns(id) {
    confirmIt("确认!", "是否认领该业务？", window.base + "/api/bisinf/sureClaimBns/" + id, {}, table);
}

//保全确认
function makeSureBns(id) {
    confirmIt("确认!", "是否确认该业务已经完成？", window.base + "/api/bisinf/makeSureBns/" + id, {}, table);
}

function showModel(businessId, ct, ut, status, revokemsg, sourceid, enterpriseid, contractid, id, operatingstatus, filepath, contractname, ename, truemoney) {
    if ($("#type").val() == 1) {
        $(".theme-popover-mask").fadeIn(100);
        $(".theme-popover[name='claimBns']").slideDown(200);
    } else {
        //契约
        $(".theme-popover-mask").fadeIn(100);
        $(".theme-popover[name='f_claimBns']").slideDown(200);

    }
    $("input[name='uploadFileButton']").attr("disabled", false);
    $("input[name='uploadFileButton']").css("background", "#3276b1");

    $("#file1").val("");
    $("#file2").val("");

    $("#pk").val(id);
    $("#enterpriseId").val(enterpriseid);
    $("#contrcatid").val(contractid);
    $("#opera").val(operatingstatus);
    $("#businessId").val(businessId);


    $("#businessId").text(businessId);
    $("#ct").text(ct);
    $("#ut").text(ct);
    $("#chseStatus").text(getChseStatus(status));
    if (truemoney && truemoney != null && truemoney != 'null') {
        $("#truemoney").val(truemoney);
    }


    if (status == 5) {
        $("#revokemsg").text(revokemsg);
    } else {
        $("#revokemsg").remove();
    }

    $("#sourceid").empty().append("<a href=" + window.base + "'/api/bisinf/downLoad?filepath=" + filepath + "&contractname=" + contractname + "&ename=" + ename + "&businessId=" + businessId + "'>" + "人员清单下载" + "</a>");


}

function getChseStatus(status) {
    if (status == 0) {
        return "未处理";
    }
    if (status == 1) {
        return "已认领";
    }
    if (status == 2) {
        return "撤销-问题件";
    }
    if (status == 3) {
        return "处理中";
    }
    if (status == 4) {
        return "已完成";
    }
    if (status == 5) {
        return "撤销";
    }
    return "";
}


