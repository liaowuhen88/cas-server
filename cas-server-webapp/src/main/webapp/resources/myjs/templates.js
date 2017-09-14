var table;
var requestParams = [];
var bizId = document.getElementById("bizId").value;
//var serviceText = $(".breadcrumb>li:eq(0)").text();
//var bizId ;
//if(serviceText.indexOf("理赔")>=0){
//    bizId = 1;
//    //bizId = "<%= Constant.MSG_BIZ_IN_ID%>";
//}else if(serviceText.indexOf("保全")>=0){
//    bizId = 2;
//}else if(serviceText.indexOf("保险")>=0){
//    bizId = 3;
//}else if(serviceText.indexOf("体检")>=0){
//    bizId = 4;
//}
if(bizId){
    requestParams.push({"name": "bizId", "value": bizId});
}
$(document).ready(function () {
    //initArticleCategory();

    table = Tools.page({
        "tableId": "dataTables",
        "paramfrom": requestParams,
        "ajaxUrl": window.base + "/api/template/list",
        "aoColumns": [
            {"aTargets": [0], "bVisible": false, 'sClass': "text-center", "bSortable": false, "mData": "id"},
            {"sTitle": "模板类型", "aTargets": [2], "bSortable": false, 'sClass': "text-center", "mData": function(obj){
                if(obj.type == 1){
                    return "<span class=\"label label-info\">" + "短信" + "</span>";
                }else if(obj.type == 2){
                    return "<span class=\"label label-success\">" + "邮件" + "</span>";
                }else if(obj.type == 3){
                    return "<span class=\"label label-primary\">" + "站内信" + "</span>";
                }else if(obj.type == 4){
                    return "<span class=\"label label-success\">" + "微信" + "</span>";
                }else{
                    return "<span class=\"label label-danger\">" + "未知" + "</span>";
                }/*danger,default,warning*/
            }},
            /*{"sTitle": "分类", "aTargets": [1], "bSortable": false, 'sClass': "text-center", "mData": "kind"},*/
            {"sTitle": "编码"  , "aTargets": [1], "bSortable": false, 'sClass': "text-center", "mData": "code"},
            {"sTitle": "模板名", "aTargets": [1], "bSortable": false, 'sClass': "text-center", "mData": "name"},
            /*{"sTitle": "状态", "aTargets": [1], "bSortable": false, 'sClass': "text-center", "mData":  function(obj){
                if(obj.status == 0){
                    return '待发送';
                }else if(obj.status == 1){
                    return '已发送';
                }else if(obj.status == 2){
                    return '成功';
                }else if(obj.status == -1){
                    return '失败';
                }else{
                    return '未知';
                }
            }},*/
            {
                "sTitle": "创建时间", "aTargets": [3], "bSortable": false, 'sClass': "text-center", "mData": function (obj) {
                    if(obj.ct){
                        return new Date().Format(new Date(obj.ct))
                    }else{
                        return '--'
                    }
                }
            },

            {
                "sTitle": "业务编码", "aTargets": [3], "bSortable": false, 'sClass': "text-center", "mData": function (obj) {
                    if(obj.bizId){
                        return obj.bizId;
                    }else{
                        return '--'
                    }
                }
            },

            /*{
                "sTitle": "最后更新", "aTargets": [4], "bSortable": false, 'sClass': "text-center", "mData": function (obj) {
                    if(obj.updateTime){
                        return new Date().Format(new Date(obj.updateTime));
                    }else{
                        return '-';
                    }
                }
            },*/

            {
                "sTitle": "操作", "sWidth": "18%", "aTargets": [6], "bSortable": false, 'sClass': "text-center", "mData": function (obj) {
                    var optHtml = "<div class=\"btn-group\">";
                    optHtml += "<a class=\"btn btn-xs btn-info\" href=\"javascript:showIt(" + obj.id + ")\">";
                    optHtml += "<span class=\"glyphicon glyphicon-search icon-white\"></span>&nbsp;查看";
                    optHtml += "</a>";

                    optHtml += "<a class=\"btn btn-xs btn-warning\" href=\"javascript:editIt(" + obj.id + ")\">";
                    optHtml += "<span class=\"glyphicon glyphicon-edit icon-white\"></span>&nbsp;编辑";
                    optHtml += "</a>";

                    return optHtml;
                }
            }
        ]
    });

    $("#searchButton").click(function () {
        requestParams.length = 0;

        var searchKey = $("#searchKey").val();
        if (null != searchKey && searchKey != "") {
            requestParams.push({"name": "type", "value": searchKey});
        }

        var searchValue = $("#searchValue").val();
        if (null != searchValue && searchValue != "") {
            requestParams.push({"name": "content", "value": searchValue});
        }
        if(bizId){
            requestParams.push({"name": "bizId", "value": bizId});
        }
        table.fnDraw();
    });

    //创建
    $('#createBtn').click(function () {
        if(bizId){
            loadUrlToContainer(window.base + "/template/createTpl?bizId="+bizId);
        }else{
            loadUrlToContainer(window.base + "/template/createTpl");
        }
    });

    $("#clickCustomerService").click(function () {
        ajaxSubmitCommon("customerServiceInfoForm", "clickCustomerService", "api/customerService/save", {}, function (responseJson) {
            $('.theme-popover-mask').fadeOut(100);
            $('.theme-popover').slideUp(200);
            table.fnDraw();
        }, function (responseJson) {
            $("#errorTip").show();
            $("#errorContent").html(responseJson.msg);
        }, function () {
            $("#errorTip").show();
            $("#errorContent").html("提交超时");
        });
    });
});




function showIt(id) {
    $.get("api/template/show?id=" + id, {}, function (data) {

        if(data.success){
            $("#permissionList").empty().append(data.data.content);

            $('.theme-popover-mask').fadeIn(100);
            $('.theme-popover').slideDown(200);
        }


    })
}

function editIt(id) {
    loadUrlToContainer(window.base + "/template/createTpl?id="+id);
}

function disableIt(id) {
    confirmIt("警告! 禁用此用客服后,用户将不能进行客服系统登录.", "是否要禁用此客服？", "api/customerService/update", {"id": id, "status": "0"}, table);
}

function enableIt(id) {
    confirmIt("提示.", "是否要禁用此客服？", "api/customerService/update", {"id": id, "status": "1"}, table);
}




function radioDisable() {
    $(':input:radio').each(function () {
        $(this).attr("disabled", "disabled");
    });
}

function radioAble() {
    $(':input:radio').each(function () {
        $(this).removeAttr("disabled", "disabled");
    });
}

