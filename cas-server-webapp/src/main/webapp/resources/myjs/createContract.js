$(document).ready(function () {
    var index = 0;
    //validatorContract();
    //创建合同

    $("#createContract").click(function () {
        var enterprise = $("#enterprise");
        if (!enterprise.attr("real-value")) {
            enterprise.focus();
            alert("单位名称必须选择!");

            return false;
        }
        if ($("#payaccount").is(':checked')) {
            var publicName = $("#publicaccountname");
            var publicMoney = $("#publicaccountmoney");
            var personalMoney = $("#personalaccountmoney");
            var initialCharge = $("#initialcharge");
            if (publicName.val() != "") {
                if (publicMoney.val() == "" || $.trim(publicMoney.val()) == '') {
                    publicMoney.next().text("公共账户金额不能为空").show();
                    return false;
                } else {
                    publicMoney.next().text(" ").hide();
                }
                if (personalMoney.val() == "" || $.trim(personalMoney.val()) == '') {
                    personalMoney.next().text("个人账户金额不能为空").show();
                    return false;
                } else {
                    personalMoney.next().text(" ").hide();
                }

                if (initialCharge.val() == "" || $.trim(initialCharge.val()) == '') {
                    initialCharge.next().text("初始费用不能为空").show();
                    return false;
                } else {
                    if ($.trim(initialCharge.val()) > 0) {
                        initialCharge.next().text("初始费用不能为负").show();
                        return false;
                    } else {
                        initialCharge.next().text(" ").hide();
                    }
                }
            }
        }
        if ($("#contractForm").valid()) {
            /*if ($("#dataTables").find("tr").length == 0) {
             $(".mistakes").text("至少添加一个层级").show();
             return;
             }*/
            if ($("#dataTables").find("tr").length <= 1) {
                $("#addplain").next("label.mistakes").text("至少添加一个层级").show();
                return;
            }
            var commonMoneyArray = [];
            $("#commonMoneyTbl .commonMoney_key").each(function () {
                commonMoneyArray.push($(this).val());
            });
            if (!checkCommonMoney(commonMoneyArray)) {
                alert("共用保额或共用限额代码不存在!");
                return;
            }
            //险种保费至少选中一个，且选中的必须填写佣金比例和险种保费
            var producteFee = $("#productFeeTable tbody input[type=checkbox]");
            if(producteFee.length>0){
                /*if (!producteFee.is(":checked")) {
                 alert("险种保费-保险产品至少选择一个");
                 return;
                 }*/
                var flag = true;
                $(producteFee).each(function () {
                    if ($(this).is(":checked")) {
                        $.each($(this).parent("td").siblings(), function (index, item) {
                            var itemval = $(item).children("input").val();
                            if (index == 0 && (null == $.trim(itemval) || $.trim(itemval) == "")) {
                                //alert("险种保费-佣金比例不能为空");
                                $(item).children("input").next("span").removeClass("hidden").text("佣金比例不能为空");
                                flag = false;
                                return false;
                            } else if (index == 1 && (null == $.trim(itemval) || $.trim(itemval) == "")) {
                                //alert("险种保费-险种保费不能为空");
                                $(item).children("input").next("span").removeClass("hidden").text("险种保费不能为空");
                                flag = false;
                                return false;
                            } else {
                                $(item).children("input").next("span").addClass("hidden");
                                return true;
                            }
                        });
                    }
                });
            }
            if (!flag) {
                return;
            }
            $("#enterpriseId").val($("#enterprise").attr("real-value"));
            ajaxSubmitCommon("contractForm", "createContract", window.base + "/kf/contractmanager/createEnContract", {}, function (responseJson) {
                if (responseJson.success) {
                    $("#contractId").val(responseJson.data.contractId);
                    clickMenu('contractManager');
                } else {
                    alert("创建合同失败!");
                }
            }, function () {
                alert("创建合同失败!");
            }, function () {
                alert("创建合同失败!")
            })
        }
    });

    //公司切换时触发 填充计划
    $("#company").change(function () {
        $("#bom").empty();
        $("#product").empty();
        $("#productFeeTable tbody").empty();
        var company = $("#company").val();
        var plain = $("#plain");
        plain.empty();
        if (company && company.length > 0) {
            var optionHtml = "<option value=''></option>";
            $.get(window.base + "/kf/contractmanager/plainitem/" + company, {}, function (data) {
                var list = data.data;
                for (var i = 0; i < list.length; i++) {
                    var d = list[i];
                    optionHtml += "<option value='" + d.id + "'>" + d.name + "</option>";
                }
                plain.append(optionHtml);
            })
        }
    });

    //方案切换时触发，填充产品
    $("#plain").change(function () {
        var product = $("#bom");
        var productFeeTbody = $("#productFeeTable tbody");
        var plainid = $("#plain").val();
        var realValue = $("#enterprise").attr("real-value");
        product.empty();
        productFeeTbody.empty();
        if (plainid && plainid.length > 0) {
            var optionHtml = "";
            var tbodyHtml = "";
            $.get(window.base + "/kf/contractmanager/productitem", {
                "plain": plainid,
                "enterpriseId": realValue || -1,
                "company": $("#company").val()
            }, function (data) {
                var list = data.data;
                for (var i = 0; i < list.length; i++) {
                    var d = list[i];
                    optionHtml += "<label style='margin-right: 20px'><input type='checkbox' checked name='productCheck' value='" + d.id + "'onclick='changeProductFee(this)'>" + d.name + "</label>";
                    tbodyHtml += "<tr><td><input type='hidden' name='econtractProductRefRequestBeans[" + i + "].productId' value='" + d.id + "'><input type='checkbox' checked onclick='changeStatus(this)'>" + d.name + "</td>";
                    tbodyHtml += "<td><input type='text' size='5' class='bfhnum' name='econtractProductRefRequestBeans[" + i + "].commissionRate'><span class='hidden text-danger'></span></td>";
                    tbodyHtml += "<td><input type='text' size='5' name='econtractProductRefRequestBeans[" + i + "].productSumFee'><span class='hidden text-danger'></span></td>";
                }
                product.append(optionHtml);
                productFeeTbody.append(tbodyHtml);
            })
        }
    });

    //添加层级
    $("#addplain").click(function () {
        var plain = $("#plain");
        var plainid = plain.val();
        var plainname = plain.find("option:selected").text();
        var levl = $("#levlName");
        var levlName = levl.val();
        var levlMoney = $("#levlMoney");
        var lvlProductIds = "";

        var producteV = $("#bom input[type=checkbox]");
        //验证部分
        var company = $("#company");
        if (company.val() == "") {
            company.parent().children().last().text("请选择保险公司").show();
            return;
        }
        if (plain.val() == "") {
            plain.parent().children().last().text("请选择保险方案").show();
            return;
        }

        if (levlName == "" && $.trim(levlName) == "") {
            levl.parent().children().last().text("层级名称不能为空").show();
            return;
        }

        if (levlMoney.val() == "" && $.trim(levlMoney.val()) == "") {
            levlMoney.parent().children().last().text("层级保费不能为空").show();
            return;
        }

        if (!producteV.is(":checked")) {
            $(this).next().text("保险产品至少选择一个").show();
            return;
        } else {
            $(this).next().text("").show();
        }

        $("#bom input[name='productCheck']:checked").each(function () {
            lvlProductIds += $(this).val() + ",";
        });

        // parent_+"id"
        var parentId = 'parent_' + index;
        var tr = "<tr><input type='hidden' value='" + levlName + "' name='levlRequestBeans[" + index + "].levlName'>"
        tr += "<input type='hidden' value='" + levlMoney.val() + "' name='levlRequestBeans[" + index + "].levlMoney'>"
            + "<input type='hidden' value='" + plainid + "' name='levlRequestBeans[" + index + "].planid'> " +
            "<td><input type='radio'  name='lvlName' id='" + parentId + "' lvlProductIds='" + lvlProductIds + "' plainId='" + plain.val() + "'></td><td><label for='" + parentId + "'>" + plainname + "</label></td><td>" + levlName + "</td><td>" + levlMoney.val() + "</td><td><input type='button' f='" + parentId + "' value='移除' name='removeButton' class='btn btn-default' /></td></tr>";
        $("#dataTables").append(tr);
        // 选中 当前的tr。 隐藏同级其他tr
        $("#dataTables input[type='radio']").each(function () {
            if ($(this).attr("id") == parentId) {
                $(this).attr("checked", "checked");
            } else {
                $(this).removeAttr("checked");
            }
        });

        $.get(window.base + "/kf/contractmanager/listproductrespbili", {
            "products": lvlProductIds,
            "plainid": plain.val()
        }, function (data) {
            var tr = "";
            var list = data.data;
            for (var i = 0; i < list.length; i++) {
                var d = list[i];
                var bilitInfos = d.bilitInfos;
                for (var j = 0; j < bilitInfos.length; j++) {
                    tr += "<tr>" + "<input type='hidden' value='" + d.productid +
                        "' name='levlRequestBeans[" + index + "].productBilitInfo[" + i + "].productid'>";
                    var bility = bilitInfos[j];
                    tr += "<td> " + d.productname + "</td>" + "<input type='hidden' value='" + bility.biliid + "' name='levlRequestBeans[" + index + "].productBilitInfo[" + i + "].bilitInfos[" + j + "].biliid'>" +
                        "<td>" + (bility.biliname || '') + "<input type='hidden' value='" + bility.biliid + "' name='levlRequestBeans[" + index + "].productBilitInfo[" + i + "].bilitInfos[" + j + "].biliid'>" + "</td>" +
                            //保额、次免赔额、年免赔额、赔付比例、观察期、次限额、保费
                        "<td><input size='5' type='text' name='levlRequestBeans[" + index + "].productBilitInfo[" + i + "].bilitInfos[" + j + "].coverage'></td>" +
                        "<td><input  size='5' type='text' name='levlRequestBeans[" + index + "].productBilitInfo[" + i + "].bilitInfos[" + j + "].deductible'></td>" +
                        "<td><input   size='5' type='text' name='levlRequestBeans[" + index + "].productBilitInfo[" + i + "].bilitInfos[" + j + "].yeardeductible'></td>" +
                        "<td><input  size='5' class='bfhnum' type='text' name='levlRequestBeans[" + index + "].productBilitInfo[" + i + "].bilitInfos[" + j + "].proratedbenefit'></td>" +
                        "<td><input  size='5' type='text' name='levlRequestBeans[" + index + "].productBilitInfo[" + i + "].bilitInfos[" + j + "].eyeperiod'></td>" +
                        "<td><input size='5' type='text' name='levlRequestBeans[" + index + "].productBilitInfo[" + i + "].bilitInfos[" + j + "].cxenum'></td>" +
                        "<td><input  size='5' type='text' name='levlRequestBeans[" + index + "].productBilitInfo[" + i + "].bilitInfos[" + j + "].premium'></td>" +
                        "<td><input  size='10' class='commonMoney____' type='text' name='levlRequestBeans[" + index + "].productBilitInfo[" + i + "].bilitInfos[" + j + "].commonCoverage'></td>" +
                        "<td><input  size='10' type='text' class='commonMoney____' name='levlRequestBeans[" + index + "].productBilitInfo[" + i + "].bilitInfos[" + j + "].commonXiane'></td>" +
                        "<td><input type='button' class='btn btn-default' value='移除' name='removeBilityButton' onclick='removeBility(this)'/></td>" +
                        " </tr>";
                }
            }
            // child_+"id"
            var childId = 'child_' + index;
            $("#dataTables").append(getTableHtml(childId, tr));
            //显示当前新加的元素，隐藏同级的其他元素
            $("#dataTables td[name='child_rsb']").each(function () {
                if ($(this).attr("id") == childId) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            });
            index++;
        });


        $("#levlName").val("");
        $("#levlMoney").val("");
    });

    // 移除元素
    $("#dataTables").on("click", 'input[name="removeButton"]', function () {
        var parentId = $(this).attr("f");
        $(this).parent().parent().remove();
        $("#dataTables td[name='child_rsb']").each(function () {
            if ($(this).attr("id") == 'child_' + parentId.split('_')[1]) {
                $(this).remove();
            }
        });
    });

    //选择不同的层级
    $("#dataTables").on('click', 'input[name="lvlName"]', function () {
        $("#dataTables input[name='lvlName']:checked").each(function () {
            var parentId = $(this).attr("id");
            $("#dataTables td[name='child_rsb']").each(function () {
                if ($(this).attr("id") == 'child_' + parentId.split('_')[1]) {
                    $(this).fadeIn("fast");
                } else {
                    $(this).fadeOut("fast");
                }
            });
        });
    });
    var commonMoneyIndex = 0;
    $("#addCommonMoney").click(function () {
        var tr = "<tr><td> <input class='commonMoney_key' type='text'  name='commonMoneys[" + commonMoneyIndex
            + "].key'/></td><td><input name='commonMoneys[" + commonMoneyIndex + "].money'/></td><td><input type='button' value='移除' class='btn btn-default' name='removeCommonMoneyButton'/></td></tr>"
        $("#commonMoneyTbl").append(tr);
        commonMoneyIndex++
    });
    $("#commonMoneyTbl").on('click', 'input[name="removeCommonMoneyButton"]', function () {
        $(this).parent().parent().remove();
    });

    //返回按钮
    $("#backButton").click(function () {
        clickMenu(window.base + '/contractManager', 'contractManager');
    });

});

function checkCommonMoney(commonMoneyArray) {
    var v = 0;
    console.log(commonMoneyArray);
    $("#dataTables table .commonMoney____").each(function () {
        var val = $(this).val();
        if (val && jQuery.inArray(val, commonMoneyArray) == -1) {
            v++;
        }
    });
    return v == 0;
}


var companyV = $("#company");
var plainV = $("#plain");
var levlNameV = $("#levlName");
var levlMoney = $("#levlMoney");
var producteV = $("#product input[type=checkbox]");

companyV.blur(function () {
    $(this).parent().children().last().text("").show();
});

plainV.blur(function () {
    $(this).parent().children().last().text("").show();
});

levlNameV.blur(function () {
    $(this).parent().children().last().text("").show();
});

levlMoney.blur(function () {
    $(this).parent().children().last().text("").show();
});

producteV.click(function () {
    if ($(this).is(":checked")) {
        $(this).parent().parent().parent().children().last().text("").show();
    }
});

$('.form_datetime').datepicker({ //日历的插件
    format: 'yyyy-mm-dd',
    language: "zh-CN",
    weekStart: 1,
    autoclose: true
});

$('.form_date').datepicker({
    format: 'yyyy-mm-dd',
    language: "zh-CN",
    weekStart: 1,
    autoclose: true
});

$('.form_time').datepicker({
    format: 'yyyy-mm-dd',
    language: "zh-CN",
    weekStart: 1,
    autoclose: true
});

function removeTable(o) {
    $(o).parent().parent().parent().parent().remove();
}

function getTableHtml(id, content) {
    var html = '<tr><td colspan="5" style="background: #f4f4f4;display: none" name="child_rsb"id="' + id + '"><table class="display dataTable" aria-describedby="dataTables_info"><tr><th>产品名称</th><th>保险责任</th><th>保额</th><th>次免赔额</th><th>年免赔额</th><th>赔付比例</th><th>观察期</th><th>次限额</th><th>保费</th><th>共用保额代码</th><th>共用限额代码</th><th>操作</th></tr>' + content + '</table></td></tr>';
    return html;
}


$("#payaccount").click(function () {
    if ($("#payaccount").is(':checked')) {
        $("#pay").show();
    } else {
        $("#pay").hide();
    }
});
function removeBility(ob) {
    $(ob).parent().parent().remove();
}
//险种保费里的产品同步上面层级创建的选中的产品
function changeProductFee(item) {
    var productId = $(item).val();
    var productFeeTbody = $("#productFeeTable tbody");
    if ($(item).is(":checked")) {
        //对应的下面的也会被选中
        $(productFeeTbody.children("tr")).each(function () {
            var hiddenProductId = $(this).find("input:hidden");
            if (hiddenProductId.val() == productId) {
                hiddenProductId.removeAttr("disabled");
                //hiddenProductId.next("input").attr("checked","checked").trigger("click");
                //待完善，应该是下面的必须选中，
                hiddenProductId.next("input").trigger("click");

                /*$(hiddenProductId.parent("td").siblings()).each(function (index,item) {
                 $(item).children("input").removeAttr("disabled");
                 });*/
            }
        });
    } else {
        //对应的下面也会不被选中
        $(productFeeTbody.children("tr")).each(function () {
            var hiddenProductId = $(this).find("input:hidden");
            if (hiddenProductId.val() == productId) {
                //hiddenProductId.next("input").attr("checked",false).trigger("click");
                hiddenProductId.next("input").trigger("click");
                //hiddenProductId.next("input").removeAttr("checked");
                hiddenProductId.attr("disabled", "disabled");
            }
        });
    }
}
function changeStatus(item) {
    var tds = $(item).parent("td").siblings();
    if ($(item).is(":checked")) {
        $(item).prev("input").removeAttr("disabled");
        $(tds).each(function () {
            $(this).children("input").removeAttr("disabled");
        });
    } else {
        $(item).prev("input").attr("disabled", "disabled");
        $(tds).each(function () {
            $(this).children("input").attr("disabled", "disabled");
        });
    }
}