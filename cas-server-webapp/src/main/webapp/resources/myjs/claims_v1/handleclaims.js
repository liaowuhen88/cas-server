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
        "ajaxUrl": window.base + "/claims/search/claimsapplyQuestion/list",
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

//提交结案
function clickBtnOkCal() {
    var ajaxOptions = {
        url: window.base + "/claims/handle/handleclaimsaccount/clickBtnOk",
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
                $("#saveInfo_ok").hide();

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
    clickMenu(window.base+'/claimsDoMenuPage', 'claimsDoMenuPage')
    //table.fnDraw();
}

//显示结案
function showCloseClaims(claimsid) {
    //$("#clickBtnOkCal1").attr("value", "理赔结案");
    //$("#clickBtnOkCal1").show();

    var ajaxOptions = {
        url: window.base + "/claims/handle/handleclaimsaccount/clickBtnSave",
        type: 'post',
        dataType: 'json',
        timeout: 100000,
        cache: false,
        success: function (responseJson) {
            $('.theme-popover-mask').fadeIn(100);
            $('#theme-popover').slideDown(200);
            selectClaimsAccountByClaimsid(claimsid);
        }
    };
    $("#saveFormok").ajaxSubmit(ajaxOptions);
}

function selectClaimsAccountByClaimsid(claimsid){
    var url = window.base + "/claims/search/selectClaimsAccountByClaimsid/" + claimsid;
    $.post(url, {}, function (result) {
        if (result.success) {
            var obj = eval(result.data);
            var msg = "";
            $(obj).each(function (index) {
                var val = obj[index];
                if (index == 0) {
                    $("#claimsAcntId").val(val.claimsacountid);
                }
                var money = val.emymoney
                if (money == null && val.amount == null) {
                    money = 0;
                } else {
                    money = val.amount;
                }
                msg += buildTableTR_TD(val.respbiliid, val.repname, money, index, val.claimsacountid,val.codename);
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
        + "  for='amountAll'><em>基础责任名称</em></label></td>"
        + "  <td style='width:25%'><label"
        + " for='amountAll'><em>余额</em></label></td>"
        + " <td style='width:25%'><label"
        + "  for='amountAll'><em>给付金额</em></label></td>"
        + "  </tr>";
}

function buildTableTR_TD(zrid, name, amount_, index, claimsacountid,codename) {
    var key = name + "#" + zrid + "#" + claimsacountid;
    return " <tr>" + "      <td style='width:25%'><label"
        + "  for='amountAll'><em>" + name + "</em></label> </td>"
        + "      <td style='width:25%'><label"
        + "  for='amountAll'><em>" + codename + "</em></label> </td>"
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
    if (updateStateAndConten(tp, 6)) {
        return true;
    }
    $("#theme-popover1").fadeOut(50);
    $("#theme-popover-mask").fadeOut(50);
}
//保存
function saveInfo(tp, statusid) {
    // alert(tp)
    //   updateStateAndConten(tp, statusid);
    loading();
    var ajaxOptions = {
        url: window.base + "/claims/handle/handleclaimsaccount/clickBtnSave",
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
    var url = window.base + "/claims/search/handleclaimsaccount/statisticsApply/" + uid;
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

function clickSelResatype(obj) {
    if ($(obj).val() == '5') {
        $("#cardTypeDiv").show();
    } else {
        $("#cardTypeDiv").hide();
    }
}
function updateStateAndConten(id, statusid) {
    loading();
    var content = $("#claimconclusion").val();
    var resType = '';
    var cardType = '';
    if (statusid == 6) {
        content = $("#claimsQueestContent").val();
        resType = $("#resatype").val();
        cardType = '';
        $("input[name='cardType']:checkbox").each(function () {
            if ($(this).attr("checked")) {
                cardType += $(this).val() + ","
            }
        })
        if (resType == 5 && (cardType == '' || cardType.length == 0)) {
            alert("请选择个人资料补全类型.");
            $(".loadingbox").remove();
            return true;
        }
        if (resType == 6) {
            cardType = "idcard,bank";
        }
    }
    var url = window.base + "/claims/handle/handleclaimsaccount/clickBtnOther/" + id + "/" + statusid;// + "?" + param;
    $.post(url, {"claimconclusion": content, "questiontype": 1, "resatype": resType, "cardType": cardType},
        function (result) {
            if (result.success) {
                alert("处理成功.");
                //if (statusid != 6) {
                    closeShowCloseClaims();
                //}
            }
            $(".loadingbox").remove();
        });

}
function closeBtn(popover1id) {
    $("#"+popover1id).fadeOut(50);
    $("#theme-popover-mask").fadeOut(50);
}
//发出问题
function sendClaimsImgMail(applyid) {
    if (confirm("您将发送当前理赔单相关影像件给保险公司。")) {
        $("#sendClaimsImgMailBtn").attr({"disabled": "disabled"});
        var url = window.base + "/claims/handle/sendClaimsImgMail/" + applyid;
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
function sendClaimsYWTXMail(applyid) {

    var toUrls = window.prompt('请输入邮箱地址(多个逗号分隔，如：qiumeng.ma@baodanyun-inc.com,sales-service@baodanyun-inc.com)', '');
    if (toUrls == "" || toUrls == '' || toUrls.length == 0) {
        toUrls = "qiumeng.ma@baodanyun-inc.com,sales-service@baodanyun-inc.com";
    }
    if (confirm("您将发送的邮件地址为：" + toUrls)) {
    $("#sendClaimsYWTXMail").attr({"disabled": "disabled"});
        var url = window.base + "/claims/handle/sendClaimsYWTXMail/" + applyid;
        $.post(url, {"toUrls":toUrls}, function (result) {
            if (result.success) {
                alert("发送提醒邮件成功.");
                $("#sendClaimsYWTXMail").removeAttr("disabled");//将按钮可用
            } else {
                alert(result.msg);
            }
        });
    }

}

function showZR_YY(useraccountid, pid, productid, companyId,dangertype,ecid) {
    $("#pid").val(pid);
    $("#ecid").val(ecid);
    $("#hid_productid").val(productid);
    $("#cmpid").val(companyId);
    $("#cxsxDiv").empty();
    compareCompany();
    var url = window.base + "/claims/search/findClaimsAccountInfoByPidUid/" + useraccountid + "/" + pid + "/" + productid + "/-1/"+$("#eappplyid").val();
    $.post(url, {}, function (result) {
        if (result.success) {
            var jsondata = result.data;
            myUtils.renderDiv("claimsAccountTpl", jsondata, "claimsAccountDiv");
            //去除重复责任原因
            var temp_array = new Array();
            $(jsondata).each(function (i) {
                if ($.inArray(jsondata[i].resreason, temp_array) == -1) {
                    temp_array.push(jsondata[i].resreason);
                }
            });
            var cxyy_array = [];
            $(temp_array).each(function (i) {
                var resreasonname = "";
                //1、意外2、疾病3、生育 4旅游险
                if (temp_array[i] == 1) {
                    resreasonname = "意外";
                } else if (temp_array[i] == 2) {
                    resreasonname = "疾病";
                } else if (temp_array[i] == 3) {
                    resreasonname = "生育";
                } else if (temp_array[i] == 4) {
                    resreasonname = "旅游险";
                } else {
                    resreasonname = "其他";
                }
                cxyy_array[i] = {"resreasonname": resreasonname, "resreason": temp_array[i]};
            });
            myUtils.renderDiv("cxyyTpl", cxyy_array, "cxyy");

            if(dangertype.length>0){
                //$("#dangertype"+dangertype).attr("checked",true);
                document.getElementById("dangertype"+dangertype).checked = true;
                showCX_SX(dangertype,$("#reporttype").val());
            }

        } else {
            alert(result.msg);
        }
    });
}
function showCX_SX(resReason,reporttype) {
    if (!isEmpty($("#pid").val()) && !isEmpty($("#applyuid").val())
        && !isEmpty($("#hid_productid").val())) {
        var url = window.base + "/claims/search/findClaimsAccountInfoByPidUid/"
            + $("#applyuid").val() + "/" + $("#pid").val() + "/" + $("#hid_productid").val() + "/" + resReason+"/"+$("#eappplyid").val();
        $.post(url, {}, function (result) {
            if (result.success) {
                var jsondata = result.data;
                var cxsx_array = [];
                //去除重复基础责任
                var temp_array = new Array();
                $(jsondata).each(function (i) {
                    if ($.inArray(jsondata[i].codename, temp_array) == -1) {
                        temp_array.push(jsondata[i].codename);
                        cxsx_array[i] = {"codename": jsondata[i].codename, "repbaseid": jsondata[i].repbaseid};
                    }
                });

                myUtils.renderDiv("cxsxTpl", cxsx_array, "cxsxDiv");
                if(reporttype.length>0){
                    var tmarr=reporttype.split(',')
                    $.each(tmarr,function(n,value){
                        //$("#reporttype"+value).attr("checked","checked");
                        document.getElementById("reporttype"+value).checked = true;
                    });
                }
            } else {
                alert(result.msg);
            }
        });
    }
}
function isEmpty(obj) {
    if (obj == null) return true;
    return obj.length === 0;
}
//提交审核通过按钮
function showSubmitClaims(userid,status){
    if (isEmpty($("#applyprice").val()) || $("#applyprice").val()=='0'
        ) {
        alert("申报金额为空或者金额为0");
        return true;
    }
    if (isEmpty($("#receipttotalnum").val()) || $("#receipttotalnum").val()=='0'
        || !checkCurrNumber($("#receipttotalnum").val())) {
        alert("请填写发票张数");
        return true;
    }
    if (isEmpty($("#openaccountname").val()) || $("#openaccountname").val()=='0') {
        alert("开户名不能为空");
        return true;
    }

    if (isEmpty($("#payaccount").val()) || $("#payaccount").val()=='0' || !checkCurrNumber($("#payaccount").val())) {
            alert("领款账号不能为空且必须为数字");
            return true;
    }
    var hospitalTR=$("#hospitalTR tr").length;//医院
    if(hospitalTR<1){
        alert("请至少录入一条医院信息");
        return true;
    }

    $("#show_nameinsurer").text($("#nameinsurer").val());
    $("#show_userMoble").text($("#userMoble").val());
    $("#show_comment").text($("#comment").val());
    //出现原因
    var currResReason= $("#currResReason_"+$('#cxyy input[name="currResReason"]:checked ').val()).text();
    $("#show_cxyy").text(currResReason);

    //出险事项
    var currResBases="";
    $("input:checked[name=currResBase]").each(function() {
        if ($(this).is(":checked")) {
            currResBases+="  ["+$("#currResBase_"+$(this).val()).text()+"]";
        }
    });
    var productId=$("#hid_productid").val();
    var applyPrice=$("#applyprice").val();
    if(applyPrice==null || applyPrice==''){
        applyPrice=0;
    }
    //理赔类型
    $.post(window.base+"/claims/search/isFastClaimsApplyProduct/"+productId+"/"+applyPrice,{},function(result){
        var flag=result.data;
        //flag=true;
        var updateStatus=status;
        if(flag){
            $("#isfastClaim").text("快速理赔");
            $("#isfastpay").val(1);
            updateStatus=10;//审核通过
            $("#SH_STATUS").text("审核初审通过 ");
        }else {

            $("#SH_STATUS").text("影像齐全 ");
            updateStatus=3;
            $("#isfastClaim").text("非快速理赔");
            $("#isfastpay").val(0);
        }

        //if (status == 3 || flag) {//如果为快赔件 或者已经是影像齐全状态 则直接显示资料齐全
        //    $("#SH_STATUS").text("资料齐全");
        //    updateStatus=4;
        //}else if ((flag==false) && (status < 3 || status==6 || status==7)) {
        //     $("#SH_STATUS").text("影像齐全 ");
        //    updateStatus=3;
        //}else{
        //    updateStatus= $("#handlestatus").val();
        //}
        $("#handlestatus").val(updateStatus);
        //$("#clickclaimsSHFormOK").attr("onclick","updateStateAndConten("+userid+","+updateStatus+")");
        $("#clickclaimsSHFormOK").attr("onclick","saveInfoSHOK("+userid+","+updateStatus+")");
    });

    //保险公司
    $.post(window.base+"/insurer/findInsurerByID/"+ $("#cmpid").val(),{},function(json){
        $("#show_cmpName").text(json.data.name);
    });

    $("#show_cxsx").text(currResBases);
    $('.theme-popover-mask').fadeIn(100);
    $('#theme-popover-showSubmitClaims').slideDown(200);
}

function saveInfoSHOK(userid,updateStatus){
    $("#clickclaimsSHFormOK").attr("disabled", "disabled").attr("style", "background: #B0B5B9;");
    loading();
    var ajaxOptions = {
        url: window.base + "/claims/handle/handleclaimsaccount/clickBtnSave",
        type: 'post',
        dataType: 'json',
        timeout: 100000,
        cache: false,
        success: function (responseJson) {
            if (responseJson.success) {
                sendDataToCompany(userid,updateStatus);
            }else{
                $(".loadingbox").remove();
                $("#clickclaimsSHFormOK").removeAttr("disabled").removeAttr("style");
            }
            //$("#clickclaimsSHFormOK").attr("onclick","saveInfoSHOK("+userid+","+updateStatus+")");
        },
        error: function () {
            $(".loadingbox").remove();
            $("#clickclaimsSHFormOK").removeAttr("disabled").removeAttr("style");
        }
    };
    $("#saveFormok").ajaxSubmit(ajaxOptions);
}

function editImgs(userid,updateStatus){
    //出险事项
    var flag=true;
    $("input:checked[name=currResBase]").each(function() {
        if ($(this).is(":checked")) {
            flag=false;
            return true;
        }
    });
    if(flag){
        alert("请选择出险事项");
        return true;
    }
    if (isEmpty($("#applyprice").val()) || $("#applyprice").val()=='0') {
        alert("申报金额为空或者金额为0");
        return true;
    }
    var ajaxOptions = {
        url: window.base + "/claims/handle/handleclaimsaccount/clickBtnSave",
        type: 'post',
        dataType: 'json',
        timeout: 100000,
        cache: false,
        success: function (responseJson) {}
    };
    $("#saveFormok").ajaxSubmit(ajaxOptions);
}
//发送数据调用接口（众安或者太保）
function sendDataToCompany(userid,updateStatus){
    var companyType_=$("#companyType_").val();
    var cmpid=$("#cmpid").val();
    var applyid=$("#eappplyid").val();
    var uid=$("#applyuid").val();
    var postparams=[];
    postparams.push({"name": "uid", "value": uid});
    postparams.push({"name": "cmpid", "value": cmpid});
    postparams.push({"name": "applyId", "value": applyid});
    if(companyType_=='CPIC'){//太保安联
        $('#cpic_code').find("input:checked").each(function(i,obj) {
            postparams.push({"name": "acctypes", "value": $(obj).val()});
        });
        postSendDataToCompany(userid,postparams,updateStatus);
    }else if(companyType_=='ZAZX') {//众安在线
        if($("#isfastpay").val()=='1'){//是快速理赔件则调用众安接口
            postSendDataToCompany(userid,postparams,updateStatus);
        }else{
            updateStateAndConten(userid,updateStatus);
        }
    }else{
        updateStateAndConten(userid,updateStatus);
    }
}
//发送数据调用接口（众安或者太保）
function postSendDataToCompany(userId,postParams,updateStatus){
    $.post(window.base+"/claims/handle/sendDataToCompany",postParams,function(resultobj){
        if(resultobj.success){
            if(resultobj.data[0]=='000' && isEmpty(resultobj.data[1])){
                updateStateAndConten(userId,updateStatus);
            }else{
                $(".loadingbox").remove();
                $("#clickclaimsSHFormOK").removeAttr("disabled").removeAttr("style");
                alert(resultobj.data[1]);
            }
        }else{
            alert("系统故障，请联系管理员");
        }
    });
}

function checkCurrNumber(dataNum){
    var reg=/^[-+]?\d*$/;
    return reg.test(dataNum)
}

function compareCompany() {
    $("#cpic_code").hide();
    $("#zazx_code").hide();
    var url = window.base + "/insurer/findInsurerByID/" + $("#cmpid").val();
    $.post(url, {}, function (result) {
        if (result.success) {
            if(result.data.name=='太保安联健康保险股份有限公司'){
                $("#cpic_code").show();
                $("#companyType_").val("CPIC");
            }else if(result.data.name=='众安在线财产保险股份有限公司'){
                $("#zazx_code").show();
                $("#companyType_").val("ZAZX");
            } else {
                $("#companyType_").val("");
            }
        }
    });
}


