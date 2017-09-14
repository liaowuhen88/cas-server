var table;
$(document).ready(function () {
    var requestParams = [];
    requestParams.push({"name": "summaryId", "value": $("#summaryId").val()});
    table = Tools.page({
        "tableId": "dataTables",
        "paramfrom": requestParams,
        "ajaxUrl": window.base + "/api/bisinf/listExpatiate",
        "aoColumns": [

            {"sTitle": "用户ID", "aTargets": [1], "bSortable": false, 'sClass': "text-center", "mData": "useraccountid"},
            {"sTitle": "被保险人属性", "aTargets": [1], "bSortable": false, 'sClass': "text-center", "mData": "attr"},

            {"sTitle": "个人名称", "aTargets": [1], "bSortable": false, 'sClass': "text-center", "mData": "pname"},
            {"sTitle": "证件类型", "aTargets": [2], "bSortable": false, 'sClass': "text-center", "mData": "idcardtype"},
            {
                "sTitle": "证件号码",
                "aTargets": [3],
                "bSortable": false,
                'sClass': "text-center",
                "mData": "idcard"
            },

            {
                "sTitle": "计划名称", "aTargets": [4], "bSortable": false, 'sClass': "text-center", "mData": "plainname"
            }, {
                "sTitle": "是否成功",
                "aTargets": [5],
                "bSortable": false,
                'sClass': "text-center",
                "mData": function (obj) {
                    var v = "";
                    if (obj.issuccess == 1) {
                        v = '<span class="label label-success">成功</span>';
                    }
                    if (obj.issuccess == 0) {
                        v = '<span class="label label-danger">失败</span>';
                    }
                    if (obj.issuccess == 2) {
                        v = '<span class="label label-warning">忽略</span>';
                    }
                    return v;

                }
            }, {
                "sTitle": "原因",
                "aTargets": [5],
                "bSortable": false,
                'sClass': "text-center",
                "mData": "errormsg"
            }, {
                "sTitle": "时间", "aTargets": [6], "bSortable": false, 'sClass': "text-center", "mData": "ct"
            }
        ]
    });


});


