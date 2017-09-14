$(function () {
    //初始统计信息
    statisticsApply();
    initQuestionList();

});
var table
function initQuestionList() {
    var userclaimsapplyId = $("#eappplyid").val();
    var requestParams = [];
    requestParams.push({"name": "userclaimsapplyid", "value": userclaimsapplyId});
    table = Tools.page({
        "tableId": "dataTables",
        "paramfrom": requestParams,
        "ajaxUrl": window.base + "/claimsapplyQuestion/list",
        "aoColumns": [
            {"aTargets": [0], "bVisible": false, 'sClass': "text-center", "bSortable": false, "mData": "id"},
            {"sTitle": "问题内容", "aTargets": [1], "bSortable": false, 'sClass': "text-center", "mData": "content"},
            {
                "sTitle": "处理时间",
                "aTargets": [2],
                "bSortable": false,
                'sClass': "text-center",
                "mData": function (obj) {
                    return new Date().Format(new Date(obj.ct), "yyyy-MM-dd")
                }
            }
            //,
            //{
            //    "sTitle": "操作",
            //    "sWidth": "18%",
            //    "aTargets": [3],
            //    "bSortable": false,
            //    'sClass': "text-center",
            //    "mData": function (obj) {
            //        return obj.id;
            //    }
            //}
        ]
    });
}
function isEmpty(obj) {
    if (obj == null) return true;
    return obj.length === 0;
}
//提交结案
function clickBtnOkCal() {

    //if (($("#claimsType").val() != '5') && ($("#amountAll").val() == 'NaN' || isEmpty($("#amountAll").val()) || ($("#amountAll").val() == '0'))) {
    //    alert("结案金额不能为0或者空且必须为数字！");
    //    return true;
    //} else {
    //    var z = /^[0-9]*$/;
    //    if (!z.test($("#amountAll").val())) {
    //        alert("结案金额不能为空且必须为数字！");
    //        return true;
    //    }
    //}
    $("#closeClaimsBTN").attr({"disabled": "disabled"});
    var ajaxOptions = {
        url: window.base + "/handleclaimsaccount/clickBtnOk",
        type: 'post',
        dataType: 'json',
        timeout: 100000,
        cache: false,
        success: function (responseJson) {
            if (responseJson.success) {
                alert('提交结案成功.');
                $("#theme-popover").fadeOut(50);
                $("#theme-popover-mask").fadeOut(50);
                $("#closeClaims").hide();
                $("#saveInfo").hide();
                $("#sendQuestion").hide();

                // closeShowCloseClaims();
            }
        }
    };
    $("#claimsAccountInfoForm").ajaxSubmit(ajaxOptions);
}

function setBaseSubmitParam(key, obj, index) {
    var content = "";
    var moneys = 0;
    $("input[name=charge_moneynmae]").each(function (a, b) {
        //var id = $(b).attr("id");//获取id属性
        //var name = $(b).attr("name");//获取name属性
        if ($(b).val() == '' || $(b).val() == null) {
            moneys += 0;
        } else {
            moneys += parseFloat($(b).val());
        }
    });
    $("#amountAll").val(moneys);
    content += key + "#" + $(obj).val();
    $("#name_id_amount" + index).val(content);
}
function closeShowCloseClaims() {
    //window.location.reload();
    clickMenu('/claimsDoMenuPage', 'claimsDoMenuPage')
    //table.fnDraw();
}

//显示结案
function showCloseClaims(ecid, uid, jonid, respliids, pid, dangertype) {
    //$("#clickBtnOkCal1").attr("value", "理赔结案");
    //$("#clickBtnOkCal1").show();
    $('.theme-popover-mask').fadeIn(100);
    $('#theme-popover').slideDown(200);
    if (jonid == "" || jonid.length == 0) {
        jonid = "no";
    }
    var url = window.base + "/selectClaimsAccount/" + ecid + "/" + uid + "/" + jonid + "/" + respliids + "/" + pid + "/" + dangertype;
    $.post(url, {}, function (result) {
        if (result.success) {
            var obj = eval(result.data);
            var msg = "";
            $(obj).each(function (index) {
                var val = obj[index];
                if (index == 0) {
                    $("#claimsAcntId").val(val.claimsacountid);
                }
                msg += buildTableTR_TD(val.respbiliid, val.name, val.amount, index, val.claimsacountid);
            })

            var msg1 = " <table border='1' style='width:100%'>" + buildTableTitil() + msg + "</table>";
            $("#div_selectClaims").html(msg1);
        }
    });
}
//构建弹出层中责任表格头
function buildTableTitil() {
    return " <tr>" + "      <td style='width:25%'><label"
        + "  for='amountAll'><em>责任名称</em></label></td>"
        + "  <td style='width:25%'><label"
        + " for='amountAll'><em>余额</em></label></td>"
        + " <td style='width:25%'><label"
        + "  for='amountAll'><em>给付金额</em></label></td>"
        + "  </tr>";
}

function buildTableTR_TD(zrid, name, amount_, index, claimsacountid) {
    var key = name + "#" + zrid + "#" + claimsacountid;
    return " <tr>" + "      <td style='width:25%'><label"
        + "  for='amountAll'><em>" + name + "</em></label> </td>"
        + "  <td style='width:25%'><label"
        + " for='amountAll'><em>" + amount_ + "</em></label></td>"
        + " <td style='width:25%'><input type='hidden' value='3434' name='name_id_amount' id='name_id_amount" + index + "'>" +
        "<input id='charge_money0' name='charge_moneynmae' type='text' onblur=setBaseSubmitParam('" + key + "',this," + index + ")></td>"
        + "  </tr>";
}


//选择不同的结案类型
function selectClaimsType(obj) {
    var se_index = $(obj).val();
    if (se_index == 5) {
        $("#hide").hide();
        $("#causeID").show();
    } else {
        $("#hide").show();
        $("#causeID").hide();
    }
}

/* <!-- 申报处理状态    1、未认领 2、 已认领 处理中   3、影像齐全   4、资料齐全   5、完结 0 撤销 -->*/

//影像齐全
function imageOK(tp) {
    updateStateAndConten(tp, 3);
}
//资料齐全
function allDataOK(tp) {
    updateStateAndConten(tp, 4);
}
//发出问题
function sendQuestion(tp) {
    //$("#clickclaimsQuestion").attr("value", "理赔结案");
    //$("#clickclaimsQuestion").show();
    $('.theme-popover-mask').fadeIn(100);
    $('#theme-popover1').slideDown(200);
}
//查看理赔情况
function seeClaimsDetail() {
    $('.theme-popover-mask').fadeIn(100);
    $('#theme-popover2').slideDown(200);
}
//查看理赔结论
function seeClaimsJL() {
    $('.theme-popover-mask').fadeIn(100);
    $('#theme-popover3').slideDown(200);
}
//查看问题列表
function seeClaimsQuestionList() {
    $('.theme-popover-mask').fadeIn(100);
    $('#theme-popover4').slideDown(200);
}
//查看发送邮件记录列表
function seeClaimsEmailImgList() {
    $('.theme-popover-mask').fadeIn(100);
    $('#seeClaimsEmailImgList').slideDown(200);
}
function clickclaimsQuestionT(tp) {
    updateStateAndConten(tp, 6);
    $("#theme-popover1").fadeOut(50);
    $("#theme-popover-mask").fadeOut(50);
}
//保存
function saveInfo(tp, statusid) {
    // alert(tp)
    //   updateStateAndConten(tp, statusid);
    loading();
    var ajaxOptions = {
        url: window.base + "/handleclaimsaccount/clickBtnSave",
        type: 'post',
        dataType: 'json',
        timeout: 100000,
        cache: false,
        success: function (responseJson) {
            if (responseJson.success) {
                alert("保存成功");
                closeShowCloseClaims();
            }
            $(".loadingbox").remove();
        }
    };
    $("#saveFormok").ajaxSubmit(ajaxOptions);

}
//查询责任对应的金额统计信息
function statisticsApply() {
    var ecid = $("#ecid").val();
    var uid = $("#applyuid").val();
    var url = window.base + "/handleclaimsaccount/statisticsApply/" + ecid + "/" + uid;
    $.post(url, {}, function (result) {
        if (result.success) {
            var obj = eval(result.data);
            var msg = "";
            var chargeMoneySum = '';
            $(obj).each(function (index) {
                var val = obj[index];
                if (val.chargeMoneySum == null) {
                    chargeMoneySum = 0;
                } else {
                    chargeMoneySum = val.chargeMoneySum;
                }
                msg += buildstatisticsAppTd(val.reportname, val.initialamount, chargeMoneySum);

            });
            if (msg == "" || msg == null) {
                msg = "<tr class='odd'><td colspan='3' class='dataTables_empty'>没有检索到数据</td></tr>"
            }
            msg = "<table id='dataTables1' class='display dataTable no-footer'" +
                " role='grid' aria-describedby='dataTables_info'>"
                + buildstatisticsApplyTitle() + "<tbody>" + msg + "</tbody></table>";
            $("#statisticsApply").html(msg);
        }
    });
}
//构建统计表td
function buildstatisticsAppTd(reportname, initialamount, chargeMoneySum) {
    return "<tr role='row' class='odd'>"
        + " <td class='text-center sorting_1'>" + reportname + "</td>"
        + " <td class=' text-center'>" + initialamount + "</td>"
        + " <td class=' text-center'>" + chargeMoneySum + "</td>"
        + " </tr>";
}
//构建统计表格头
function buildstatisticsApplyTitle() {
    return "<thead>"
        + " <tr role='row'>"
        + " <th class='text-center sorting_asc' aria-label='给付项' " +
        "style='width: 40px;'>给付项</th>"
        + " <th class='text-center sorting_disabled'  aria-label='初始总金额'" +
        " style='width: 40px;'>保额</th>"
        + " <th class='text-center sorting_disabled' aria-label=给付总金额' " +
        "style='width: 53px;'>累计给付金额</th>"
        + "</tr>"
        + " </thead>";
}


function updateStateAndConten(id, statusid) {
    loading();
    var content = $("#claimconclusion").val();
    var resatype = '';
    if (statusid == 6) {
        content = $("#claimsQueestContent").val();
        resatype = $("#resatype").val();
    }
    var url = window.base + "/handleclaimsaccount/clickBtnOther/" + id + "/" + statusid;// + "?" + param;
    $.post(url, {"claimconclusion": content, "questiontype": 1, "resatype": resatype}, function (result) {
        if (result.success) {
            alert("处理成功.");
            if (statusid != 6) {
                closeShowCloseClaims();
            }

        }
        $(".loadingbox").remove();
    });

}

function closeBtn() {
    $("#theme-popover1").fadeOut(50);
    $("#theme-popover-mask").fadeOut(50);
}

//发出问题
function sendClaimsImgMail(applyid) {
    if (confirm("您将发送当前理赔单相关影像件给保险公司。")) {
        $("#sendClaimsImgMailBtn").attr({"disabled": "disabled"});
        var url = window.base + "/sendClaimsImgMail/" + applyid;
        $.post(url, {}, function (result) {
            if (result.success) {
                alert("发送影像件成功.");
                $("#sendClaimsImgMailBtn").removeAttr("disabled");//将按钮可用
            } else {
                alert(result.msg);
            }
        });
    }

}