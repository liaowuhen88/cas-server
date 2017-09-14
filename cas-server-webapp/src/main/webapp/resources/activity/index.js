var table;

$(document).ready(function () {

    table = Tools.page({
        "tableId": "dataTables",
        "paramfrom": requestParams,
        "iDisplayLength": 10,
        "ajaxUrl": window.base + "/activity/list",
        "aoColumns": [
            {
                "sTitle": "活动ID",
                "aTargets": [2],
                "bSortable": false,
                'sClass': "text-center",
                "mData": "id"
            },
            {
                "sTitle": "活动名称",
                "aTargets": [1],
                "bSortable": false,
                'sClass': "text-center",
                "mData": function(obj){
                    var optHtml = obj.name;
                    if(obj.url){
                        optHtml = "<a target=\"_blank\" href=\"" + obj.url + "\">";
                        optHtml += obj.name;
                        optHtml += "</a>";
                    }
                    return optHtml;
                }
            },
            {
                "sTitle": "活动描述",
                "aTargets": [2],
                "bSortable": false,
                'sClass': "text-center",
                "mData": function(obj){
                    var optHtml = obj.summary;
                    if(obj.pic){
                        optHtml = "<a target=\"_blank\" href=\"" + obj.pic + "\">";
                        optHtml += obj.summary;
                        optHtml += "</a>";
                    }
                    return optHtml;
                }

            },
            {
                "sTitle": "活动类型",
                "aTargets": [3],
                "bSortable": false,
                'sClass': "text-center",
                "mData": function(obj){
                    if(obj.type == 1){
                        return '网站';
                    }else if(obj.type == 2){
                        return '微信二维码文本';
                    }else if(obj.type == 3){
                        return '红包';
                    }else if(obj.type == 4){
                        return '微信二维码图文';
                    }else{
                        return '其它';
                    }
                }
            },
            /*{
                "sTitle": "限参加次数",
                "aTargets": [2],
                "bSortable": false,
                'sClass': "text-center",
                "mData": "pnum"
            },*/
            /*{
                "sTitle": "状态",
                "aTargets": [2],
                "bSortable": false,
                'sClass': "text-center",
                "mData": "status"
            },*/
            {
                "sTitle": "生效时间",
                "aTargets": [3],
                "bSortable": false,
                'sClass': "text-center",
                "mData": function (obj) {
                    var result = '不限';
                    if (obj.st) {
                        result = new Date().Format(new Date(obj.st));
                    }
                    return result;
                }
            },
            {
                "sTitle": "截止时间",
                "aTargets": [3],
                "bSortable": false,
                'sClass': "text-center",
                "mData": function (obj) {
                    var result = '不限';
                    if (obj.et) {
                        result = new Date().Format(new Date(obj.et));
                    }
                    return result;
                }
            },
            {
                "sTitle": "备注",
                "aTargets": [3],
                "bSortable": false,
                'sClass': "text-center",
                "mData": function (obj) {

                    if(obj.qrUrl){
                        var  optHtml = "<img width='100' height='100' src=\""+obj.qrUrl+"\" title=\""+obj.name+"\">";
                        return optHtml;
                    }

                    return "-";
                }
            }


        ]
    });



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
    });

});







