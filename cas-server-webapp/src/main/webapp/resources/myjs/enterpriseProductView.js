var table;
$(document).ready(function () {

    var requestParams = [];
    var enterpriseId = $("#enterpriseid").val();
    requestParams.push({"name": "id", "value": enterpriseId});
    table = Tools.page({
        "paging": false,
        "tableId": "dataTables",
        "paramfrom": requestParams,
        "ajaxUrl": window.base +"/bkf/enterpriseEmp/productListViewList/",
        "aoColumns": [
            {"aTargets": [0], "bVisible": false, 'sClass': "text-center", "bSortable": false, "mData": "mainid"},
            {"sTitle": "保险名称", "aTargets": [2], "bSortable": false, 'sClass': "text-center", "mData": "name"},

            {"sTitle": "计划名称", "aTargets": [2], "bSortable": false, 'sClass': "text-center", "mData": "plainNam"},


            {
                "sTitle": "保险期间",
                "aTargets": [4],
                "bSortable": false,
                'sClass': "text-center",
                "mData": function (obj) {
                    var start = new Date().Format(new Date(obj.effectiveDate));
                    var end = new Date().Format(new Date(obj.expiryDate));
                    return start + '   To   ' + end;

                }
            },
            {
                "sTitle": "参保人数", "aTargets": [3], "bSortable": false, 'sClass': "text-center", "mData": "num"
            }/*,

            {
                "sTitle": "操作",
                "sWidth": "18%",
                "aTargets": [4],
                "bSortable": false,
                'sClass': "text-center",
                "mData": function (obj) {

                    var rm = "enterpriseSearchMenuPage";
                    var entityRM = "bkf/enterpriseEmp/productViewDetailPage/" + enterpriseId + "/" + obj.mainid;
                    var optHtml = "<div class=\"btn-group\">";
                    optHtml += "<a class=\"btn btn-xs btn-info\"  href=\"javascript:clickMenu('" + entityRM + "','" + rm + "')\">";
                    optHtml += "<span class=\"glyphicon glyphicon-search icon-white\"></span>&nbsp;详细";
                    optHtml += "</a>";
                    optHtml += "</div>";
                    return Tools.renderOperate(optHtml);
                }
            }*/
        ]
    });

    $("#addProduct").click(
        function () {
            $("#plainCompany").empty().append("<option></option>");
            //获取保险公司
            renderDiv(window.base +"/bkf/enterpriseEmp/productListView/ListItem", {"type": "PRODUCT_CMP"}, "cmpList", function (list) {
                var html = "";
                for (var i = 0; i < list.length; i++) {
                    var d = list[i];
                    html += "<option value='" + d.key + "'>    " + d.val + "   </option>"
                }

                $("#plainCompany").append(html);
            });
            //获取支付类型
            renderDiv(window.base +"/bkf/enterpriseEmp/productListView/ListItem", {"type": "PAY_TYP"}, "cmpList", function (list) {
                var html = "";
                for (var i = 0; i < list.length; i++) {
                    var d = list[i];
                    html += "<option value='" + d.key + "'>    " + d.val + "   </option>"
                }
                $("#paytype").append(html);
            });
            $("#createContract input").val("");
            $("tr[name='param']").remove();
            $("#plain").empty();
            $("#responsibilityInfos").empty();
            $(".theme-popover-mask[name='contract']").fadeIn(100);
            $(".theme-popover[name='contract']").slideDown(200);
        }
    )
//获取计划
    $("#plainCompany").change(function () {
        $("#plain").empty();
        $.get(window.base +"/bkf/enterpriseEmp/plainList", {"plainCompany": $("#plainCompany").val()}, function (msg) {
            var list = msg.data;
            for (var i = 0; i < list.length; i++) {
                var d = list[i];
                var html = "<label> <input type='checkbox'/ name=\"plainid\"  value=\"" + d.id + "\"  > " + d.name + "</label>";
                if (i % 2 != 0) {
                    html += "<br/>";
                }
                $("#plain").append(html);
            }
        });

    });
    // 获取责任
    $("#chosebilibutton").click(function () {
        var plainids = "";

        $("#plain input:checked").each(
            function () {
                plainids += $(this).val();
                plainids += ",";

            }
        )
        plainids = plainids.substring(0, plainids.length - 1);
        $.get(window.base +"/bkf/enterpriseContract/listPlainProductBilitInfo", {"plainids": plainids}, function (data) {
            $("#responsibilityInfos").empty();
            var list = data.data;

            for (var i = 0; i < list.length; i++) {
                $("#responsibilityInfos").append("<input type='hidden' name='plainProductBilitInfos[" + i + "].plainid' value='" + list[i].plainid + "'> ");
                $("#responsibilityInfos").append("<h5>" + list[i].plainname + "</h5>");
                //  $("#responsibilityInfos").append(list[i].plainname);
                $("#responsibilityInfos").append("<br/>");

                var product = list[i].productBilitInfos;
                for (var j = 0; j < product.length; j++) {
                    $("#responsibilityInfos").append("<input type='hidden' name='plainProductBilitInfos[" + i + "].productBilitInfos[" + j + "].productid' value='" + product[j].productid + "'> ");
                    $("#responsibilityInfos").append(product[j].productname);
                    $("#responsibilityInfos").append("<br/>");

                    var bili = product[j].bilitInfos;
                    for (var k = 0; k < bili.length; k++) {
                        $("#responsibilityInfos").append("<span>");
                        $("#responsibilityInfos").append("<h6>" + bili[k].biliname + "</h6>");
                        $("#responsibilityInfos").append(" <input type='checkbox'  value='1'  name='plainProductBilitInfos[" + i + "].productBilitInfos[" + j + "].bilitInfos[" + k + "].isChecked'> ");
                        $("#responsibilityInfos").append("</span>");
                        $("#responsibilityInfos").append("<br/>");
                        $("#responsibilityInfos").append("保额<input type='text'    name='plainProductBilitInfos[" + i + "].productBilitInfos[" + j + "].bilitInfos[" + k + "].coverage'> ");
                        $("#responsibilityInfos").append("<br/>");
                        $("#responsibilityInfos").append("赔付比例<input type='text'    name='plainProductBilitInfos[" + i + "].productBilitInfos[" + j + "].bilitInfos[" + k + "].proratedbenefit'> ");
                        $("#responsibilityInfos").append("<br/>");
                        $("#responsibilityInfos").append("观察期<input type='text'     name='plainProductBilitInfos[" + i + "].productBilitInfos[" + j + "].bilitInfos[" + k + "].eyeperiod'> ");
                        $("#responsibilityInfos").append("<br/>");
                        $("#responsibilityInfos").append("免赔额<input type='text'   name='plainProductBilitInfos[" + i + "].productBilitInfos[" + j + "].bilitInfos[" + k + "].deductible'> ");
                        $("#responsibilityInfos").append("<input type='hidden'  value='" + bili[k].biliid + "'  name='plainProductBilitInfos[" + i + "].productBilitInfos[" + j + "].bilitInfos[" + k + "].biliid'> ");
                        $("#responsibilityInfos").append("<br/>");
                    }
                }


            }
        })

    })


    $("#createMainContract").click(function () {
        var enterpriseId = $("#enterpriseid").val();

        var ajaxOptions = {
            url: window.base +"/bkf/enterpriseContract/createMainContract/" + enterpriseId,
            type: 'post',
            dataType: 'json',
            timeout: 100000,
            cache: false,
            success: function (responseJson) {
                if (responseJson.success) {
                    $("#mainid").val(responseJson.data);
                    $(".theme-popover-mask[name='contract']").fadeOut(100);
                    $(".theme-popover[name='contract']").slideUp(200);
                    $(".theme-popover-mask[name='empchg']").fadeIn(100);
                    $(".theme-popover[name='empchg']").slideDown(200);
                    //  table.fnDraw();
                }

            }
        };

        $("#createContract").ajaxSubmit(ajaxOptions);
    });
    /*
     $("#uploadButton").click(
     function () {
     var mainid = $("#mainid").val();
     var enterpriseId = $("#enterpriseid").val();
     var opera = "2";
     $.ajaxFileUpload({
     url: "bkf/enterpriseEmp/uploadFile",   //用于文件上传的服务器端请求地址
     secureuri: false,       //是否需要安全协议，一般设置为false
     fileElementId: 'file', //文件上传域的ID
     dataType: 'json',     //返回值类型 一般设置为json
     data: {"enterpriseId": enterpriseId, "contractId": mainid, "operatingstatus": opera},
     success: function (data, status) {//服务器成功响应处理函数
     //$("#result").append(data);
     alert("上传成功");
     },
     error: function (data, status, e) {//服务器响应失败处理函数
     //$("#result").append(data);
     alert("上传失败");
     }
     });
     }
     )*/

    $('.theme-poptit .close').click(function () {
        //alert('aaa')
        $(".theme-popover-mask").fadeOut(100);
        $(".theme-popover").slideUp(200);
        return false
    });


    $('.form_datetime').datetimepicker({ //日历的插件
        language: 'zh-CNzh-CN',
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        forceParse: 0,
        showMeridian: 1
    })
    $('.form_date').datetimepicker({
        language: 'zh-CN',
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0
    });
    $('.form_time').datetimepicker({
        language: 'zh-CN',
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 1,
        minView: 0,
        maxView: 1,
        forceParse: 0
    });

});

function uploadFile() {
    var enterpriseId = $("#enterpriseid").val();
    var mainid = $("#mainid").val();
    //契约
    var opera = "2";
    $.ajaxFileUpload({
        url: window.base +"/bkf/enterpriseEmp/firstUploadFile",   //用于文件上传的服务器端请求地址
        secureuri: false,       //是否需要安全协议，一般设置为false
        fileElementId: 'file', //文件上传域的ID
        dataType: 'json',     //返回值类型 一般设置为json
        data: {"enterpriseId": enterpriseId, "contractId": mainid, "operatingstatus": opera},
        success: function (data, status) {//服务器成功响应处理函数
            //$("#result").append(data);
            //   alert("上传成功");
            $(".theme-popover-mask[name='empchg']").fadeOut(100);
            $(".theme-popover[name='empchg']").slideUp(200);
        },
        error: function (data, status, e) {//服务器响应失败处理函数
            //$("#result").append(data);
            alert("上传失败");
        }
    });
}