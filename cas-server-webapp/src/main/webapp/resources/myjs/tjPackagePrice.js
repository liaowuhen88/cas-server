var table;
$(document).ready(function () {
    var requestParams = [];
    table = Tools.page({
        "tableId": "dataTables",
        "paramfrom": requestParams,
        "ajaxUrl": window.base + "/examinationProject/packagePriceList",
        "aoColumns": [
            {"aTargets": [0], "bVisible": false, 'sClass': "text-center", "bSortable": false, "mData": "packageId"},
            {"sTitle": "套餐名称", "aTargets": [1], "bSortable": false, 'sClass': "text-center", "mData": "packageName"},
            {"sTitle": "销售价格", "aTargets": [2], "bSortable": false, 'sClass': "text-center", "mData": "price"},
            {"sTitle": "体检公司", "aTargets": [3], "bSortable": false, 'sClass': "text-center", "mData": "companyName"},
            {"sTitle": "采购价格", "aTargets": [4], "bSortable": false, 'sClass': "text-center", "mData": "purchasePrice"}
            //{"sTitle": "频率", "aTargets": [4], "bSortable": false, 'sClass': "text-center", "mData": "frequency"}
        ]
        /*"drawCallback": function (settings, api) {
            var rows = api.rows({page: 'current'}).nodes();
            var last = null;
            var tr = null;
            api.column(1, {page: 'current'}).data().each(function (group, i) {
                tr = $(rows[i]);
                if (last !== group) {
                    $("td:first", tr).attr("rowspan", $("td:last", tr).text());
                    $("td:first", tr).text(group);
                    $('td:eq(1)', tr).attr("rowspan", $("td:last", tr).text());
                    $('td:eq(1)', tr).text($('td:eq(1)', tr).text());
                    last = group;
                } else {
                    $("td:lt(2)", tr).remove();
                }
                $("td:last", tr).remove();
            });
            $("#dataTables th:last").hide();
        }*/
        /* "createdRow": function (nRow, aData, iDataIndex) {
         console.log(nRow);
         console.log(aData);
         console.log(iDataIndex);
         var temp = aData.tjPackageCompanyRefResponseList;
         $('td:eq(0)', nRow).attr("rowspan", temp.length);
         $('td:eq(1)', nRow).attr("rowspan", temp.length);
         for (var i = 0; i < temp.length; i++) {
         var html = "";
         if (i >= 1) {
         html += "<tr role='row'><td class='text-center'>" + temp[i].companyName + "</td><td class='text-center'>" + temp[i].purchasePrice + "</td></tr>";
         $(nRow).after(html);
         } else if (i == 0) {
         $('td:eq(2)', nRow).text(temp[0].companyName);
         $('td:eq(3)', nRow).text(temp[0].purchasePrice);
         }
         }

         }*/
    });
    //体检套餐价格list
    $("#searchButton").click(function () {
        requestParams.length = 0;
        var packageName = $("#packageName").val();
        if (null != packageName && packageName != "") {
            requestParams.push({"name": "packageName", "value": packageName});
        }
        table.fnDraw();
    });

});

//新增套餐价格
$('#addPackagePrice').click(function () {
    clickMenu(window.base + '/examinationProject/toCreateTjPackagePrice', 'tjPackagePrice');
});
