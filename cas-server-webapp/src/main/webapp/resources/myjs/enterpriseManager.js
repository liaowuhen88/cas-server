var table;
$(document).ready(function () {
    var requestParams = [];
    table = Tools.page({
        "tableId": "dataTables",
        "paramfrom": requestParams,
        "ajaxUrl": window.base +"/api/enterprise/list",
        "aoColumns": [
            {"aTargets": [0], "bVisible": false, 'sClass': "text-center", "bSortable": false, "mData": "id"},
            {"sTitle": "企业名称", "aTargets": [1], "bSortable": false, 'sClass': "text-center", "mData": "ename"},
            {"sTitle": "联系电话", "aTargets": [2], "bSortable": false, 'sClass': "text-center", "mData": "mobile"},
            {
                "sTitle": "创建日期",
                "aTargets": [4],
                "bSortable": false,
                'sClass': "text-center",
                "mData": function (obj) {
                    return new Date().Format(new Date(obj.ct))
                }
            },
            {
                "sTitle": "更新日期",
                "aTargets": [4],
                "bSortable": false,
                'sClass': "text-center",
                "mData": function (obj) {
                    return new Date().Format(new Date(obj.ct))
                }
            },
            {
                "sTitle": "状态", "aTargets": [3], "bSortable": false, 'sClass': "text-center", "mData": function (obj) {
                var cla = "label-success";
                var status_show_msg = "启用";

                if (obj.status == 0) {
                    cla = "label-warning";
                    status_show_msg = "禁用";
                }
                return "<span class=\"label " + cla + "\">" + status_show_msg + "</span>";
            }
            },
            {
                "sTitle": "操作",
                "sWidth": "18%",
                "aTargets": [4],
                "bSortable": false,
                'sClass': "text-center",
                "mData": function (obj) {
                    var optHtml = Tools.ajaxSend("bkf/enterpriseEmp/list", obj.id, obj.status);
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
        table.fnDraw();
    });

    $('.theme-login').click(function () {
        $.get(window.base +"/api/customerService/allService", {}, function (msg) {
            var list = msg.data;
            if (list && list.length > 0) {
                for (var i = 0; i < list.length; i++) {
                    var d = list[i];
                    var html = "<option value='" + d.id + "'>    " + d.cname + "   </option>";
                    $("#customerServiceId").append(html);

                }


            }


        });


        $('.theme-popover-mask').fadeIn(100);
        $('.theme-popover').slideDown(200);
        //return false
    });

    $('.theme-poptit .close').click(function () {
        //alert('aaa')
        $('.theme-popover-mask').fadeOut(100);
        $('.theme-popover').slideUp(200);
        return false
    })
    ;

    $("#createEnterprise").click(function () {
        if(checkdata()==true){
            return true;
        }
        var ajaxOptions = {
            url: window.base +"/api/enterprise/create",
            type: 'post',
            dataType: 'json',
            timeout: 100000,
            cache: false,
            success: function (responseJson) {
                if (responseJson.success) {
                    $('.theme-popover-mask').fadeOut(100);
                    $('.theme-popover').slideUp(200);
                    table.fnDraw();

                }
                alert(responseJson.msg);
            }
        };
        $("#createEnterpriseForm").ajaxSubmit(ajaxOptions);
    });


});


function checkdata(){
    var flag = false;
    var corpName = $("#corpName").val();
    if($.trim(corpName) == "" ||  $.trim(corpName).toLowerCase()=='null'){
        alert("公司名称不能为空！");
        flag=true;
        return flag;
    }

    var flag=false;
    var userName = $("#userName").val();
    if($.trim(userName) == "" ||  $.trim(userName).toLowerCase()=='null'){
        alert("登录名不能为空！");
        flag=true;
        return flag;
    }

    if($("#passWord").val()==null || $("#passWord").val() == '' || $("#passWord").val().toLowerCase()=='null'){
        alert("密码不能为空！");
        flag=true;
        return flag;
    }

    if($("#passWord").val() != $("#passWordAgain").val()){
        alert("两次密码不一致！");
        flag=true;
        return flag;
    }
    return flag;
}

function updateEmpStut(id, status){

    confirmIt("警告!","是否禁用该用户？", window.base +"/api/enterprise/updateEmpStut/" + id + "/" + status, {}, table);

}

function editIt(id) {

    var customerServiceId;

    $.get("api/enterprise/" + id, {}, function (data) {

        customerServiceId = data.customerServiceId;
        $("#passWordAgain").hide();
        $("#passWord").hide();
        $("#m_title").html("编辑企业信息");
        $("#id").val(id);
        $("#corpName").val(data.ename);
        $("#userName").val(data.name).attr("readOnly", "readOnly");
        $("#email").val(data.email);
        $("#mobile").val(data.mobile);
        $("#contact").val(data.contact);
        $("#agnPwdTxt").hide();
        $("#pwdTxt").hide();
        //   $("#customerServiceId").val(data.id);
        $('.theme-popover-mask').fadeIn(100);
        $('.theme-popover').slideDown(200);
    });

    $.get(window.base +"/api/customerService/allService", {}, function (msg) {

        var list = msg.data;

        $("#customerServiceId").empty();
        var a = "<option ></option>";
        $("#searchKey").append(a);
        if (list && list.length > 0) {
            var data;
            for (var i = 0; i < list.length; i++) {
                data = list[i];

                if (data.id == customerServiceId) {

                    var option = "<option  value='" + data.id + "' selected>  " + data.name + " </option>";

                } else {

                    var option = "<option  value='" + data.id + "'>  " + data.name + " </option>";

                }

                $("#customerServiceId").append(option);
            }
        }

    });


}


