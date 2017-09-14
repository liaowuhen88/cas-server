var table;

$(document).ready(function () {
    table = null;
    var requestParams = [];

    $("#showEditMobile").click(function () {
        $('.theme-popover-mask').fadeIn(100);
        $('.theme-popover').slideDown(200);
    });

    $("#editMobileBtn").click(function () {
        $.messager.confirm("警告!您正在修改用户的手机号码.", "是否要修改此手机号码？", function () {

            var oldMobile = $("#oldMobile").val();
            var newMobile = $("#newMobile").val();
            if (!oldMobile || !newMobile) {
                alert("请填写对应的手机号码");
                return false;
            }
            ajaxSubmitCommon("editMobileForm", "editMobileBtn", window.base + "/api/personal/updateMobile", {oldMobile: oldMobile, newMobile: newMobile}, function (data) {
                alert("修改号码成功")
            }, function (errorData) {
                alert(errorData.msg)
            }, function () {
                alert("网络异常")
            })
        });
        $('.theme-popover-mask').fadeOut(100);
        $('.theme-popover').slideUp(200);
    });

    $("#searchButton").click(function () {
        requestParams.length = 0;
        var searchValue = $("#searchValue").val();
        if (null != searchValue && searchValue != "") {
            //$("#dataTables").empty();
            requestParams.push({"name": $("#searchKey").val(), "value": searchValue});
            if (!table) {
                table = Tools.page({
                    "tableId": "dataTables",
                    "paramfrom": requestParams,
                    "ajaxUrl": "api/userManagement/userlist",
                    "aoColumns": [
                        {
                            "sTitle": "用户姓名",
                            "aTargets": [1],
                            "bSortable": false,
                            'sClass': "text-center",
                            "mData": "personnames"
                        },
                        {
                            "sTitle": "昵称",
                            "aTargets": [1],
                            "bSortable": false,
                            'sClass': "text-center",
                            "mData": "nickname"
                        },
                        {
                            "sTitle": "联系电话",
                            "aTargets": [2],
                            "bSortable": false,
                            'sClass': "text-center",
                            "mData": "mobiles"
                        },
                        {
                            "sTitle": "是否为邀请用户",
                            "aTargets": [2],
                            "bSortable": false,
                            'sClass': "text-center",
                            "mData": function (obj) {
                                if (obj.inviteUser == 1) {
                                    return "是"
                                } else {
                                    return "否"
                                }
                            }
                        },
                        {
                            "sTitle": "是否登录过",
                            "aTargets": [2],
                            "bSortable": false,
                            'sClass': "text-center",
                            "mData": function (obj) {
                                if (obj.isfirstlogin == "0") {
                                    return "是"
                                } else {
                                    return "否"
                                }
                            }
                        },
                        {
                            "sTitle": "登录时间",
                            "aTargets": [2],
                            "bSortable": false,
                            'sClass': "text-center",
                            "mData": function (obj) {
                                if (obj.loginTime) {
                                    return new Date().Format(new Date(obj.loginTime))
                                } else {
                                    return ""
                                }

                            }
                        },
                        {
                            "sTitle": "最后登录IP",
                            "aTargets": [3],
                            "bSortable": false,
                            'sClass': "text-center",
                            "mData": "loginIpStr"
                        }
                        ,
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
                            "sTitle": "所在单位",
                            "aTargets": [4],
                            "bSortable": false,
                            'sClass': "text-center",
                            "mData": "ename"
                        },
                        {
                            "sTitle": "当前状态",
                            "aTargets": [3],
                            "bSortable": false,
                            'sClass': "text-center",
                            "mData": function (obj) {
                                var cla = "label-success";
                                var status_show_msg = "启用";
                                if (obj.status == 0 || obj.status == "" || obj.status == null) {
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
                                //show
                                var optHtml = "<div class=\"btn-group\">";
                                optHtml += "<a class=\"btn btn-xs btn-info\" href=\"javascript:clickMenu('bkf/user/" + obj.id + "','personalMenuPage')\">";
                                optHtml += "<span class=\"glyphicon glyphicon-search icon-white\"></span>&nbsp;详情";
                                optHtml += "</a> &nbsp;&nbsp;";

                                optHtml += "<a class=\"btn btn-xs btn-danger\" href=\"javascript:disableUser('" + obj.id + "')\">";
                                optHtml += "<span class=\"glyphicon glyphicon-remove icon-white\"></span>&nbsp;禁用";
                                optHtml += "</a>&nbsp;&nbsp;";

                                optHtml += "<a class=\"btn btn-xs btn-success\" href=\"javascript:enableUser('" + obj.id + "')\">";
                                optHtml += "<span class=\"glyphicon glyphicon-ok icon-white\"></span>&nbsp;启用";
                                optHtml += "</a>";

                                optHtml += "<a class=\"btn btn-xs btn-danger\" href=\"javascript:sendRedPack('" + obj.id + "')\">";
                                optHtml += "<span class=\"glyphicon glyphicon-remove icon-white\"></span>&nbsp;发红包";
                                optHtml += "</a>&nbsp;&nbsp;";

                                optHtml += "</div>";
                                return optHtml;
                            }
                        }
                    ]
                });
            }
            table.fnDraw();
        } else {
            alert("输入查询值不能为空");
        }
        //table.fnDraw();
    });
});
function disableUser(id) {
    confirmIt("警告!禁用此用户后,用户将不能登录.", "是否要禁用此用户？", "api/userManagement/update/" + id + "/0", {}, table);
}
function enableUser(id) {
    confirmIt("提示", "是否要启用此用户", "api/userManagement/update/" + id + "/1", {}, table);
}

function sendRedPack(uId){
    $.post(window.base + "/api/redpack/send", {"uId":uId}, function (data) {
        if (data.success) {
            alert("发送成功!");
        } else {
            alert(data.msg);
        }
    });
}

