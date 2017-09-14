/*
var table;
$(document).ready(function () {
        var requestParams = [];
        table = Tools.page({
            "tableId": "dataTables",
            "paramfrom": requestParams,
            "ajaxUrl": window.base + "/api/baoquanfilemsg/find",
            "aoColumns": [
                {"aTargets": [0], "bVisible": false, 'sClass': "text-center", "bSortable": false, "mData": "id"},
                {"sTitle": "业务编号", "aTargets": [1], "bSortable": false, 'sClass': "text-center", "mData": "businessId"},
                {"sTitle": "企业名称", "aTargets": [1], "bSortable": false, 'sClass': "text-center", "mData": "ename"},
                {
                    "sTitle": "合同名称",
                    "aTargets": [1],
                    "bSortable": false,
                    'sClass': "text-center",
                    "mData": "contractname"
                },
                {
                    "sTitle": "增减员",
                    "aTargets": [2],
                    "bSortable": false,
                    'sClass': "text-center",
                    "mData": "operatingstatus"
                },
                {
                    "sTitle": "时间",
                    "aTargets": [3],
                    "bSortable": false,
                    'sClass': "text-center",
                    "mData": function (obj) {
                        return new Date().Format(new Date(obj.ct))
                    }
                },
                {
                    "sTitle": "状态",
                    "aTargets": [3],
                    "bSortable": false,
                    'sClass': "text-center",
                    "mData": function (obj) {
                        if (obj.status == 0) {
                            return '未处理';
                        } else {
                            return '已提交';
                        }
                    }
                },
                {
                    "sTitle": "文件下载",
                    "aTargets": [4],
                    "bSortable": false,
                    'sClass': "text-center",
                    "mData": function (obj) {
                        return "<a href='" + obj.sourceid + "'>下载</a>";
                    }
                },
                {
                    "sTitle": "操作",
                    "sWidth": "18%",
                    "aTargets": [5],
                    "bSortable": false,
                    'sClass': "text-center",
                    "mData": function (obj) {

                        var url = "/api/baoquanfilemsg/notRemind/" + obj.id;
                        var url2 = "/api/baoquanfilemsg/status/" + obj.id + "/" + 1;
                        var optHtml = "";
                        if (obj.remindstatus == 1) {
                            optHtml = "<div class=\"btn-group\">";
                            optHtml += "<a class=\"btn btn-xs btn-info\"  href=\"javascript:updateRemindeStatus('" + url + "')\">";
                            optHtml += "<span class=\"glyphicon glyphicon-search icon-white\"></span>&nbsp;关闭提醒";
                            optHtml += "</a>";
                            optHtml += "</div>";
                        }
                        if (obj.status == 0) {
                            optHtml += "<div class=\"btn-group\">";
                            optHtml += "<a class=\"btn btn-xs btn-danger\"  href=\"javascript:updateStatus('" + url2 + "')\">";
                            optHtml += "<span class=\"glyphicon glyphicon-search icon-white\"></span>&nbsp;提交";
                            optHtml += "</a>";
                            optHtml += "</div>";
                        }
                        return Tools.renderOperate(optHtml);
                    }
                }
            ]
        });

        //企业上传文件的提醒
        $("#searchButton").click(
            function () {
                requestParams.length = 0;
                requestParams.push({"name": "ename", "value": $("#name").val()});
                requestParams.push({"name": "date", "value": $("#ut").val()});
                requestParams.push({"name": "status", "value": $("#status").val()});
                table.fnDraw();
            }
        );
    }
);

function updateStatus(url) {
    confirmIt("确认提交! ", "确认已经提交保险公司?", url, {}, table);
}

function updateRemindeStatus(url) {
    confirmIt("确认不再提醒! ", "确认不再提醒?", url, {}, table);
}


*/
