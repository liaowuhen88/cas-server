$(document).ready(function () {
    var requestParams = [];
    var table = Tools.page({
        "tableId": "dataTables",
        "paramfrom": requestParams,
        "ajaxUrl": "api/product/list",
        "aoColumns": [
            {"aTargets": [0], "bVisible": false,'sClass': "text-center", "bSortable": false, "mData": "id"},
            {"sTitle": "名称", "aTargets": [1], "bSortable": false,'sClass': "text-center", "mData": "name"},
            {"sTitle": "公司", "aTargets": [2], "bSortable": false, 'sClass': "text-center","mData": "company"},
            {"sTitle": "类型", "aTargets": [3], "bSortable": false,'sClass': "text-center", "mData": "type"},
            {"sTitle": "设计类型", "aTargets": [4], "bSortable": false, 'sClass': "text-center","mData": "designtype"},
            {"sTitle": "特殊属性", "aTargets": [5], "bSortable": false, 'sClass': "text-center","mData": "specialattribute"},
            {"sTitle": "承保方式", "aTargets": [6], "bSortable": false, 'sClass': "text-center","mData": "underwritingway"},
            {"sTitle": "交费方式", "aTargets": [7], "bSortable": false, 'sClass': "text-center","mData": "paytype"},
            {"sTitle": "销售状态", "aTargets": [7], "bSortable": false, 'sClass': "text-center","mData": "salestatus"},
            {"sTitle": "到期日", "aTargets": [7], "bSortable": false, 'sClass': "text-center","mData": "saleendtime"},
            {"sTitle": "操作", "sWidth": "18%", "aTargets": [4], "bSortable": false,'sClass': "text-center", "mData":
                function (obj) {
                    var optHtml = Tools.JumpTo("../bkf/user", obj.id);
                    return Tools.renderOperate(optHtml);
                }
            }
        ]
    });

    $("#searchButton").click(function () {
        requestParams.length = 0;
        var searchValue = $("#searchValue").val();
        if (null != searchValue && searchValue != "") {
            requestParams.push({"name": $("#searchKey").val(), "value": searchValue});
        }
        table.fnDraw();
    });


});