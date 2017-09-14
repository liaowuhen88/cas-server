function initData() {

    $("input[type!='checkbox']").attr("value", "");
    $("#refereename").val("0##无");
    $("#clientname").val("0##无");
    $("#cancelBtn").val("取消");
    $("#button").val("确定");
}

function submitForm() {
    if ($("#verifics").valid()) {
        var clientname = $("#clientname").val();
        var channelClientRefid = $("#channelClientRefid").val();
        var saveorupdate = $("#saveorupdate").val();
        if (saveorupdate == 'update' && channelClientRefid == clientname) {
            //委托客户专员不被更改时不需新增关系表
            $("#channelClientRefid").val('');
        } else {
            $("#channelClientRefid").val('insertRef');
        }
        var customers = '';
        $("#clientname input[name='customer']:checked").each(function (index) {
            customers += $(this).val() + ',';
        });
        $("#customers").val(customers);
        ajaxSubmitCommon("verifics", "button", window.base + "/channel/saveChannelInfo", {},
            function (responseJson) {
                if (responseJson.success) {
                    if (saveorupdate == 'update') {
                        alert("更新成功");
                    } else {
                        alert('保存成功');
                    }
                    clickMenu(window.base + '/channel/channelHtml', 'channelManage');
                }
            }, function (responseJson) {

            }, function () {
            }
        );
    }
}
//弹出渠道商窗口 编辑
function edit_channel(id) {
    loading();
    initData();
    $("#titleTip").text("编辑渠道商");
    $(".close").next().text("编辑渠道商");
    var url = window.base + "/channel/getChannelInfo/" + id;
    $.post(url, {}, function (result) {
        $(".loadingbox").remove();
        if (result.success) {
            var obj = result.data.doubaoChannel;
            $("#channelname").val(obj.channelname);
            $("#chlforshort").val(obj.chlforshort);
            $("#organizationcode").val(obj.organizationcode);
            $("#legalperson").val(obj.legalperson);
            $("#contact").val(obj.contact);
            $("#contacttel").val(obj.contacttel);
            $("#address").val(obj.address);
            $("#tel").val(obj.tel);
            $("#jam_date").val(new Date().Format(new Date(obj.leaguetime), "yyyy-MM-dd"));
            $("#black_date").val(new Date().Format(new Date(obj.exittime), "yyyy-MM-dd"));
            var refereename = obj.refereeid + "##" + obj.refereename;
            setRefereename(id, refereename);
            setClientname(result.data.clientCustomers);
            var clientname = obj.clientid + "##" + obj.clientname;
            $("#clientname").val(clientname);
            $("#channelClientRefid").val(clientname);//保存原始值 已被更新时确认是否客服专员委托更改
            if (parseFloat(obj.num) == 1) {
                $("#ywnum").attr("checked", "checked");
            } else {
                $("#ywnum").attr("checked", false);
            }
            $('.theme-popover-mask').fadeIn(100);
            $('.theme-popover').slideDown(200);
        }
    });
    $("#saveorupdate").val("update");
    $("#channelid").val(id);
}

/**
 * 构建操作按钮
 * @param id
 * @param btnclass
 * @param status_show_msg
 * @param hrefurl
 * @returns {string}
 */
function build_action_btn(id, btnclass, status_show_msg, hrefurl) {
    var optHtml = "<div class=\"btn-group\">";
    optHtml += "<a id='" + id + "' class=\"" + btnclass + "\"" + hrefurl + ">";
    optHtml += status_show_msg;
    optHtml += "</a>";
    optHtml += "</div>&nbsp;";
    return optHtml;
}

/**
 * 设置渠道商状态 0、终止1、合作
 * @param id
 * @param status
 */
function setChannelInfoStatus(id, status) {
    var url = window.base + "/channel/setChannelInfoStatus/" + id + "/" + status;
    $.post(url, {}, function (result) {
        if (result.success) {
            alert("更改状态成功");
            clickMenu(window.base + '/channel/channelHtml', 'channelManage');
        } else {
            alert("更改状态失败");
        }
    });
}

function setRefereename(channelid, curval) {
    var url = window.base + "/channel/getChannelInfoKV/" + channelid;
    $("#refereename").find("option").remove();
    $.post(url, {}, function (result) {
        if (result.success) {
            var obj = eval(result.data);
            var msg = "<option value=\"0##无\">无</option>";
            $(obj).each(function (index) {
                var valdata = obj[index];
                var vl = valdata.id + "##" + valdata.chlforshort;
                msg += ("<option  value=\"" + vl + "\">" + valdata.chlforshort + "</option>");
            });
            $("#refereename").append(msg);

            if (curval != null && curval != "") {
                $("#refereename").val(curval);
            }
        }
    });
}

function setClientname(array) {
    var url = window.base + "/channel/getClientInfoKV";
    $.post(url, {}, function (result) {
        if (result.success) {
            var obj = eval(result.data);
            var msg = "";
            $(obj).each(function (index) {
                var valdata = obj[index];
                msg += '<lable>';
                if (array && $.inArray(valdata.id, array)>=0) {
                    msg += "<input type='checkbox' name='customer' value='" + valdata.id + "' checked>" + valdata.cname;
                } else {
                    msg += "<input type='checkbox' name='customer' value='" + valdata.id + "'>" + valdata.cname;
                }
                msg += '</lable>';
            });
            $("#clientname").empty().append(msg);
        }
    });
}

