var table;
$(document).ready(function () {
    $("input[name='date_packer']").datepicker({
        format: "yyyy-mm-dd",
        //dateFormat: "dd-mm-yy",
        changeMonth: true, changeYear: true,
        language: "zh-CN",
        weekStart: 1,
        autoclose: true
    });

    var requestParams = [];
    requestParams.push({"name": "euid", "value": euid});
    table = Tools.page({
        "tableId": "dataTables",
        "paramfrom": requestParams,
        "ajaxUrl": window.base + "/kf/tjContract/tjContractList",
        "aoColumns": [
            {"aTargets": [0], "bVisible": false, 'sClass': "text-center", "bSortable": false, "mData": "id"},
            {"sTitle": "合同名称", "aTargets": [1], "bSortable": false, "mData": "name"},
            {"sTitle": "合同编号", "aTargets": [2], "bSortable": false, "mData": "code"},
            {"sTitle": "渠道商", "aTargets": [3], "bSortable": false, "mData": "channelName"},
            {"sTitle": "销售员", "aTargets": [4], "bSortable": false, "mData": "sellName"},
            {"sTitle": "合同金额", "aTargets": [5], "bSortable": false, "mData": "money"},
            {
                "sTitle": "合同期间", "aTargets": [6], "bSortable": false, "mData": function (obj) {
                return (new Date().Format(new Date(obj.effectivedate), "yyyy-MM-dd") + "到" + new Date().Format(new Date(obj.expirydate), "yyyy-MM-dd"));
            }
            },
            {"sTitle": "总人数", "aTargets": [7], "bSortable": false, "mData": "personnum"},
            {
                "sTitle": "状态", "aTargets": [8], "bSortable": false, "mData": function (obj) {
                //var cla = "label-success";
                var status_show_msg = "";
                if (obj.status > 0) {
                    //cla = "label-warning";
                    status_show_msg = "有效";
                } else if (obj.status == 0) {
                    status_show_msg = "失效";
                }
                //return '<span class="label ' + cla + '">' + status_show_msg + '</span>';
                return status_show_msg;
            }
            },
            {
                "sTitle": "操作",
                "sWidth": "150",
                "aTargets": [9],
                "bSortable": false,
                'sClass': "text-center",
                "mData": function (obj) {
                    var optHtml = "";
                    optHtml += "<div class=\"btn-group\" style=\"float: none;\">";
                    optHtml += "<a class=\"btn btn-xs btn-info\" style=\"float: none;\" href=\"javascript:clickMenu('" + window.base + "/kf/tjContract/tjContractDetail/" + obj.id + "','enterprisePhysicalExamination')\">";
                    optHtml += "<span class=\"glyphicon glyphicon-search icon-white\"></span>&nbsp;";
                    optHtml += "查看合同";
                    optHtml += "</a>";
                    optHtml += "</div>";

                    optHtml += "<a class=\"btn btn-xs \" href=\"#\" style=\"float: none;\">";
                    optHtml += "<input id=\"uploadify" + obj.id + "\" name=\"file\" type=\"file\">";
                    optHtml += "<script type=\"text/javascript\">";
                    optHtml += "$('#uploadify" + obj.id + "').uploadify({ ";
                    optHtml += "'formData'     : { contractId:" + obj.id + ",";
                    optHtml += "   'timestamp' : '" + new Date() + "',";
                    optHtml += "   'session' : '<%=session.getId()%>'";
                    optHtml += "},";

                    optHtml += "    'swf'      : '" + window.base + "/resources/plugin/uploadify/uploadify.swf',";
                    optHtml += "    'uploader' : '" + window.base + "/file/upload/private/tjContract',";
                    optHtml += "    'width'    : 60,            ";
                    optHtml += "    'height'   : 25,           ";
                    optHtml += "    'buttonText' : '上传影像',           ";
                    optHtml += "    'multi'      : 'true',           ";

                    optHtml += "    'onSelect' : function(file) {";
                    optHtml += " this.addPostParam(\"fileName\",encodeURI(file.name)); ";
                    optHtml += "    }";
                    optHtml += "});";
                    optHtml += "<\/script>";
                    optHtml += "</a>";

                    return Tools.renderOperate(optHtml);
                }
            }
        ]
    });
    $('.uploadify').uploadify({
        'formData': {},
        'swf': 'uploadify.swf',
        'uploader': 'uploadify.php',
        'onSelect': function (file) {
            var dd = $(this).val();
            alert('The file ' + file.name + dd + '+ was added to the queue.');
        }
    });
});
$("#createBtn").click(function(){
    clickMenu(window.base+"/kf/tjContract/toCreateTjContract/"+euid,"enterprisePhysicalExamination");
});
