var table;

$(document).ready(function () {
    var requestParams = [];

    table = Tools.page({
        "tableId": "dataTables",
        "paramfrom": requestParams,
        "iDisplayLength": 15,
        "ajaxUrl": window.base + "/activity/data/list",
        "aoColumns": [
            {
                "sTitle": "活动名称",
                "aTargets": [1],
                "bSortable": false,
                'sClass': "text-center",
                "mData": "activityName"
            },
            {
                "sTitle": "姓名",
                "aTargets": [1],
                "bSortable": false,
                'sClass': "text-center",
                "mData": "name"
            },
            {
                "sTitle": "手机",
                "aTargets": [2],
                "bSortable": false,
                'sClass': "text-center",
                "mData": "mobile"
            },
            {
                "sTitle": "预约金额",
                "aTargets": [3],
                "bSortable": false,
                'sClass': "text-center",
                "mData": "bookVal"
            },
            {
                "sTitle": "产品期限",
                "aTargets": [2],
                "bSortable": false,
                'sClass': "text-center",
                "mData": "duration"
            },
            {
                "sTitle": "openId",
                "aTargets": [2],
                "bSortable": false,
                'sClass': "text-center",
                "mData": "openId"
            },
            {
                "sTitle": "推荐人",
                "aTargets": [2],
                "bSortable": false,
                'sClass': "text-center",
                "mData": "sourceOpenId"
            },
            {
                "sTitle": "创建时间",
                "aTargets": [3],
                "bSortable": false,
                'sClass': "text-center",
                "mData": function (obj) {
                    if (obj.ct) {
                        return new Date().Format(new Date(obj.ct));
                    }else{
                        return '--';
                    }
                }
            },
            {
                "sTitle": "更新时间",
                "aTargets": [4],
                "bSortable": false,
                'sClass': "text-center",
                "mData": function (obj) {
                    if (obj.ut) {
                        return new Date().Format(new Date(obj.ut));
                    } else {
                        return '--';
                    }
                }
            }
        ]
    });

    $("#searchButton").click(function () {
        requestParams.length = 0;
        var id = $("#idSelect").val();
        if (null != id && id != "") {
            requestParams.push({"name": "aId", "value": id});
        }
        var search = $("#searchValue").val();
        if (null != search && search != "") {
            requestParams.push({"name": "status", "value": search});
        }
        table.fnDraw();
    });




    $("#exportButton").click(function () {
        var url = window.base + "/activity/data/export";
        var aId = $("#idSelect").val();
        if (null != aId && aId != "") {
           url += "?aId=" + aId;
        }
        window.location.href = url;
    });

});







