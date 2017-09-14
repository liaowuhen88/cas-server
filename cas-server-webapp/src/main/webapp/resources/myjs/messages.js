var table;

$(document).ready(function () {
    table = null;
    var requestParams = [];
    $("#searchButton").click(function () {
        requestParams.length = 0;
        var searchKey = $("#searchKey").val();
        if (null != searchKey && searchKey != "") {
            requestParams.push({"name": "type", "value": searchKey});
        }
        var status = $("#statusSelect").val();
        if (null != status && status != "") {
            requestParams.push({"name": "status", "value": status});
        }
        var searchValue = $("#searchValue").val();
        if (null != searchValue && searchValue != "") {
            requestParams.push({"name": "content", "value": searchValue});
            if(!table){
                table = Tools.page({
                    "tableId": "dataTables",
                    "paramfrom": requestParams,
                    "iDisplayLength": 20,
                    "ajaxUrl": window.base + "/api/userManagement/messagelist",
                    "aoColumns": [
                        {"aTargets": [0], "bVisible": true, 'sClass': "text-center", "bSortable": false, "mData": "id"},
                        {
                            "sTitle": "类型",
                            "aTargets": [2],
                            "bSortable": false,
                            'sClass': "text-center",
                            "mData": function (obj) {
                                if (obj.type == 1) {
                                    return "<span class=\"label label-info\">" + "短信" + "</span>";
                                } else if (obj.type == 2) {
                                    return "<span class=\"label label-success\">" + "邮件" + "</span>";
                                } else if (obj.type == 3) {
                                    return "<span class=\"label label-success\">" + "站内信" + "</span>";
                                } else if (obj.type == 4) {
                                    return "<span class=\"label label-success\">" + "微信" + "</span>";
                                } else {
                                    return "<span class=\"label label-warning\">" + "未知" + "</span>";
                                }
                            }
                        },
                        /*{"sTitle": "分类", "aTargets": [1], "bSortable": false, 'sClass': "text-center", "mData": "kind"},*/
                        {
                            "sTitle": "手机/邮箱/OPENID",
                            "aTargets": [1],
                            "bSortable": false,
                            'sClass': "text-center",
                            "mData": function (obj) {
                                if (obj.type == 1) {
                                    return obj.mobile;
                                } else if (obj.type == 2) {
                                    return obj.email;
                                } else if (obj.type == 4) {
                                    return obj.receiver;
                                } else {
                                    return '--';
                                }
                            }
                        },
                        {
                            "sTitle": "状态",
                            "aTargets": [1],
                            "bSortable": false,
                            'sClass': "text-center",
                            "mData": function (obj) {
                                if (obj.status == 0) {
                                    return "<span class=\"label label-info\">" + "待发送" + "</span>";
                                } else if (obj.status == 1) {
                                    return "<span class=\"label label-info\">" + "已发送" + "</span>";
                                } else if (obj.status == 2) {
                                    return "<span class=\"label label-success\">" + "成功" + "</span>";
                                } else if (obj.status == -1) {
                                    return "<span class=\"label label-warning\">" + "失败" + "</span>";
                                } else {
                                    return "<span class=\"label label-warning\">" + "未知" + "</span>";
                                }
                            }
                        },
                        {
                            "sTitle": "短信内容/邮件主题",
                            "aTargets": [2],
                            "bSortable": false,
                            'sClass': "text-center",
                            "mData": function (obj) {
                                if (obj.type == 1) {
                                    return obj.content;
                                } else if (obj.type == 2) {
                                    return "<a class=\"btn btn-xs \" href=\"javascript:showIt(" + obj.id + ")\">" + obj.title + "</a>";
                                } else {
                                    return "<a class=\"btn btn-xs \" href=\"javascript:showIt(" + obj.id + ")\">查看" + "</a>";
                                }
                            }
                        },
                        {
                            "sTitle": "备注",
                            "aTargets": [1],
                            "bSortable": false,
                            'sClass': "text-center",
                            "mData": "remark"
                        },
                        {
                            "sTitle": "创建时间",
                            "aTargets": [3],
                            "bSortable": false,
                            'sClass': "text-center",
                            "mData": function (obj) {
                                if (obj.submitTime) {
                                    return new Date().Format(new Date(obj.submitTime))
                                }
                            }
                        },
                        {
                            "sTitle": "最后更新",
                            "aTargets": [4],
                            "bSortable": false,
                            'sClass': "text-center",
                            "mData": function (obj) {
                                if (obj.updateTime) {
                                    return new Date().Format(new Date(obj.updateTime));
                                } else {
                                    return '-';
                                }
                            }
                        },
                        {
                            "sTitle": "渠道",
                            "aTargets": [1],
                            "bSortable": false,
                            'sClass': "text-center",
                            "mData": function (obj) {
                                if (obj.type == 1) {
                                    return obj.channel;
                                } else {
                                    return "";
                                }
                            }
                        },
                        {
                            "sTitle": "操作",
                            "sWidth": "18%",
                            "aTargets": [6],
                            "bSortable": false,
                            'sClass': "text-center",
                            "mData": function (obj) {
                                var optHtml = "";
                                if (obj.pId) {
                                    optHtml = "补发-" + obj.pId;
                                } else if (obj.status == 1) {
                                    optHtml = "<div class=\"btn-group\">";
                                    optHtml += "<a class=\"btn btn-xs btn-info\" href=\"javascript:reSend(" + obj.id + ")\">";
                                    optHtml += "<span class=\"glyphicon glyphicon-search icon-white\"></span>&nbsp;标记失败";
                                    optHtml += "</a> &nbsp;&nbsp;";
                                } else {
                                    optHtml = "<div class=\"btn-group\">";
                                    optHtml += "<a class=\"btn btn-xs btn-info\" href=\"javascript:reSend(" + obj.id + ")\">";
                                    optHtml += "<span class=\"glyphicon glyphicon-search icon-white\"></span>&nbsp;重发";
                                    optHtml += "</a> &nbsp;&nbsp;";
                                }
                                return optHtml;
                            }
                        }
                    ]
                });
            }
            table.fnDraw();
        } else {
            alert("请输入查询值");
        }
    });

    //创建
    $('#createBtn').click(function () {
        loadUrlToContainer(window.base + "/message/createMessage");
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
    $.get(window.base + "/api/message/show?id=" + id, {}, function (data) {
        if (data.success) {
            $("#contentDiv").empty().append(data.data.content);
            $('#content-theme-popover').fadeIn(100);
            //$('.theme-popover').slideDown(200);
        } else {
            alert("error");
        }
    })
}

function reSend(id) {
    confirmIt("提示!", "是否要重发编号为" + id + "消息吗？", window.base + "/api/userManagement/reSend?id=" + id, {"id": id}, table);
}






