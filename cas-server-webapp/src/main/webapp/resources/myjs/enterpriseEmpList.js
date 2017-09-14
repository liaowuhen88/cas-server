$(document).ready(function () {
    var requestParams = [];
    //企业编号
    var pk = $("#entId").val();
    requestParams.push({"name": "enterpriseId", "value": pk});
    var table = Tools.page({
        "tableId": "dataTables",
        "paramfrom": requestParams,
        "ajaxUrl": window.base + "/api/enterprise/listEmp",
        "aoColumns": [
            {"aTargets": [0], "bVisible": false, 'sClass': "text-center", "bSortable": false, "mData": "id"},
            {"sTitle": "唯一号", "aTargets": [1], "bSortable": false, 'sClass': "text-center", "mData": "id"},
            {"sTitle": "姓名", "aTargets": [2], "bSortable": false, 'sClass': "text-center", "mData": "pname"},
            {
                "sTitle": "证件号码",
                "aTargets": [4],
                "bSortable": false,
                'sClass': "text-center",
                "mData": "idcardInf"

            },

            {
                "sTitle": "手机号", "aTargets": [3], "bSortable": false, 'sClass': "text-center", "mData": "mobile"
            },
             {
             "sTitle": "保单号",
             "sWidth": "18%",
             "aTargets": [4],
             "bSortable": false,
             'sClass': "text-center",
             "mData": "policyCode"
             }
        ]
    });


    $.get(window.base + "/bkf/enterpriseEmp/productList/" + pk, {}, function (msg) {
        var list = msg.data;
        var searchKey = $("#searchKey");
        searchKey.empty().append("<option ></option>");
        if (list && list.length > 0) {
            var data;
            for (var i = 0; i < list.length; i++) {
                data = list[i];
                var option = "<option  value='" + data.id + "'>  " + data.name + " </option>";
                searchKey.append(option);
            }
        }
    });
    //查询
    $("#searchButton").click(function () {
        requestParams.length = 0;
        var pk = $("#entId").val();
        requestParams.push({"name": "enterpriseId", "value": pk});
        var search_idcard = $("#search_idcard").val();
        if (search_idcard) {
            requestParams.push({"name": "idcardCard", "value": search_idcard});
        }
        var search_mobile = $("#search_mobile").val();
        if (search_mobile) {
            requestParams.push({"name": "mobile", "value": search_mobile});
        }
        var search_pname = $("#search_pname").val();
        if (search_pname) {
            requestParams.push({"name": "pname", "value": search_pname});
        }
        table.fnDraw();
    })


});
$('.theme-poptit .close').click(function () {
    //alert('aaa')
    $('.theme-popover-mask').fadeOut(100);
    $('.theme-popover').slideUp(200);
    return false
});
