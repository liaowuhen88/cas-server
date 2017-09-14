$(document).ready(function () {
    var requestParams = [];

    var table = Tools.page({
        "tableId": "dataTables",
        "paramfrom": requestParams,
        "iDisplayLength": 15,
        "ajaxUrl": window.base + "/wechat/api/fans",
        "aoColumns": [
            {
                "sTitle": "头像",
                "aTargets": [3],
                "bSortable": false,
                'sClass': "text-center",
                "mData": function (obj) {
                    if(obj.headimgurl){
                        var  optHtml = "<img width='100' height='100' src=\""+obj.headimgurl+"\" title=\""+obj.nickname+"\">";
                        return optHtml;
                    }
                    return "-";
                }
            },
            {
                "sTitle": "openId",
                "aTargets": [1],
                "bSortable": false,
                'sClass': "text-center",
                "mData": "openid"
            },
            {
                "sTitle": "昵称",
                "aTargets": [1],
                "bSortable": false,
                'sClass': "text-center",
                "mData": "nickname"
            },
            {
                "sTitle": "性别",
                "aTargets": [2],
                "bSortable": false,
                'sClass': "text-center",
                "mData": function(obj){
                    if(obj.sex == 1){
                        return "<span class=\"label label-info\">男</span>";
                    }else if(obj.sex == 2){
                        return "<span class=\"label label-success\">女</span>";
                    }else{
                        return "<span class=\"label label-warning\">未知</span>";
                    }
                }
            },
            {
                "sTitle": "国家",
                "aTargets": [1],
                "bSortable": false,
                'sClass': "text-center",
                "mData": "country"
            },
            {
                "sTitle": "省",
                "aTargets": [1],
                "bSortable": false,
                'sClass': "text-center",
                "mData": "province"
            },
            {
                "sTitle": "市/区",
                "aTargets": [1],
                "bSortable": false,
                'sClass': "text-center",
                "mData": "city"
            },
            {
                "sTitle": "用户ID",
                "aTargets": [1],
                "bSortable": false,
                'sClass': "text-center",
                "mData": function(obj){
                    if(obj.uId){
                        return "<span class=\"label label-success\">" + obj.uId + "</span>";
                    }else{
                        return "<span class=\"label label-warning\">未绑定</span>";
                    }
                }
            },
            {
                "sTitle": "unionid",
                "aTargets": [1],
                "bSortable": false,
                'sClass': "text-center",
                "mData": "unionid"
            },
            {
                "sTitle": "关注时间",
                "aTargets": [2],
                "bSortable": false,
                'sClass': "text-center",
                "mData": function (obj) {
                    if (obj.creattime) {
                        return new Date().Format(new Date(obj.creattime));
                    }else{
                        return '--';
                    }
                }
            },
            {
                "sTitle": "状态",
                "aTargets": [2],
                "bSortable": false,
                'sClass': "text-center",
                "mData": function(obj){

                    if(obj.sex == 1){

                    }else if(obj.sex == 2){

                    }else{

                    }

                    if(obj.status == 1){
                        return "<span class=\"label label-success\">已关注</span>";
                    }else if(obj.status == -1){
                        return "<span class=\"label label-warning\">取消关注</span>";
                    }else{
                        return "<span class=\"label label-warning\">未关注</span>";
                    }
                }
            },
            {
                "sTitle": "操作",
                "sWidth": "166",
                "aTargets": [6],
                "bSortable": false,
                'sClass': "text-center",
                "mData": function (obj) {
                    var optHtml = "<div class=\"btn-group\">";

                    optHtml += "<a class=\"btn btn-xs btn-warning\" href=\"javascript:noticeScore('" + obj.openid + "')\">";
                    optHtml += "<span class=\"glyphicon glyphicon-edit icon-white\"></span>&nbsp;积分提醒";
                    optHtml += "</a>";

                    return optHtml;
                }
            }
        ]
    });

    $("#searchButton").click(function () {
        requestParams.length = 0;
        var sex = $("#sexSelect").val();
        if (null != sex && sex != "") {
            requestParams.push({"name": "sex", "value": sex});
        }

        var bind = $("#bindSelect").val();
        if (null != bind && bind != "") {
            if(bind == 1){
                requestParams.push({"name": "isBind", "value": true});
            }else{
                requestParams.push({"name": "isBind", "value": false});
            }
        }

        var status = $("#statusSelect").val();
        if (null != status && status != "") {
            requestParams.push({"name": "status", "value": status});
        }

        var search = $("#searchValue").val();
        var condition = $("#conditionSelect").val();
        if (null != condition && condition != "") {
            if (null != search && search != "") {
                if(condition == 1){
                    requestParams.push({"name": "uId", "value": search});
                }else if(condition == 2){
                    requestParams.push({"name": "openid", "value": search})
                }else if(condition == 3){
                    requestParams.push({"name": "nickname", "value": search})
                }else if(condition == 4){
                    requestParams.push({"name": "pname", "value": search})
                }
            }
        }
        table.fnDraw();
    });



    $("#noticeSubmit").click(function () {
        var openId = $("#openId").val();
        var description = $("#description").val();
        var score = $("#score").val();
        var dateTime = $("#dateTime").val();
        var remark = $("#remark").val();
        var param = {
            "openId":openId,
            "description":description,
            "score":score,
            "dateTime":dateTime,
            "remark":remark
        };
        $.post(window.base + "/wechat/api/notice/score",param , function (rep) {
            if(rep.success){
                $('.theme-popover-mask').fadeOut(100);
                $('.theme-popover').slideUp(200);
                alert("发送成功");
            }else{
                alert(rep.msg);
            }
        });
    });



});

function noticeScore(openId) {
    loading();
    $.post(window.base + "/wechat/api/fan/" + openId, {}, function (rep) {
        if(rep.success){

            $("#headUrl").attr('src',rep.data.headimgurl);
            $("#nickName").val(rep.data.nickname);
            $("#openId").val(rep.data.openid);
            $('.theme-popover-mask').fadeIn(100);
            $('.theme-popover').slideDown(200);
        }else{
            alert(rep.msg);
        }
        $(".loadingbox").remove();
    });
}









