$(document).ready(function () {
    //套餐名自动完成,只查出套餐价格没有录入过的
    $("#packageName").autocomplete({
        items: 20,
        source: function (query, process) {
            $("#packageName").attr("real-value", "");
            var matchCount = 20;
            //返回结果集最大数量
            $.post(window.base + "/examinationProject/findPackageNameByInput", {
                "packageName": query,
                "matchCount": matchCount
            }, function (respData) {
                return process(respData.data);
            });
        },
        formatItem: function (item) {
            return item["name"];
        },
        setValue: function (item) {
            return {'data-value': item["name"], 'real-value': item["id"]};
        }
    });
    $("#packageName").change(function () {
        var packageName = $(this).val();
        var packageId = $(this).attr("real-value");
        console.log("packageId:" + packageId);
        if (null == packageName || $.trim(packageName) == "") {
            return;
        }
        if (!packageId) {
            return;
        }
        $("#name").text(packageName);
        $("#packageId").val(packageId);
    });
    $("#addButton").click(function () {
        validatorTjPackagePrice();
        var packageId = $("#packageId").val();
        if (null != packageId && packageId) {
            //根据packageId查出有哪些体检公司并动态创建元素展示在页面
            $.get(window.base + "/examinationProject/findPackagePriceByPackageId", {"packageId": packageId}, function (responseData) {
                console.log(responseData);
                if (responseData.success) {
                    $("#companyRef").empty();
                    var tjpackageCompanyRef = responseData.data != null ? responseData.data.tjPackageCompanyRefResponseList : null;
                    var html = "";
                    if (null != tjpackageCompanyRef && tjpackageCompanyRef.length > 0) {
                        for (var i = 0; i < tjpackageCompanyRef.length; i++) {
                            var companyId = tjpackageCompanyRef[i].companyId;
                            html += "<div class='row form-group'>";
                            html += "<span class='col-sm-2 control-label'>";
                            html += tjpackageCompanyRef[i].companyName;
                            html += "</span>";
                            html += "<div class='col-sm-6'>";
                            html += "<input type='text' class='form-control' name='tjPackageCompanyRefResponseList[" + i + "].purchasePrice' onkeyup='value=value.replace(/[^\\d.]/g," + "\"\"" + ")'><span class='text-danger hidden'></span>";
                            html += "<input type='text' class='hidden' value='" + packageId + "' name='tjPackageCompanyRefResponseList[" + i + "].packageId'>";
                            html += "<input type='text' class='hidden' value='" + companyId + "' name='tjPackageCompanyRefResponseList[" + i + "].companyId'>";
                            html += "</div></div>";
                        }
                        $("#companyRef").append(html);
                    } else {
                        alert("此套餐未关联体检公司！！");
                    }
                } else {
                    alert("服务器繁忙，请稍后重试！");
                }
            });
        } else {
            alert("请选择体检套餐！！");
        }
    });
    //创建套餐价格
    $("#submitBtn").click(function () {
        $(this).attr("disabled", "disabled").attr("style", "background: #B0B5B9;");
        var purchasePriceArry = $("#companyRef").find("input[name$='purchasePrice']");
        //var regex = /^[-\d]\d+\.?\d{0,2}$/;
        var regex = /^[+-]?\d*[.]?\d{0,2}$/;
        var flag = false;
        //下面的价格小于上面的
        $.each(purchasePriceArry, function (index, item) {
            if (!regex.test($(item).val())) {
                $(item).next("span").text("输入有误！");
                $(item).next("span").addClass("text-danger").removeClass("hidden");
                $(item).val("");
                $(item).focus();
                flag = true;
                return false;
            } else {
                $(item).next("span").addClass("hidden");
                return true;
            }
        });
        if (flag) {
            $(this).removeAttr("disabled").removeAttr("style");
            return;
        }
        if ($("#tjPackagePriceForm").valid()) {
            ajaxSubmitCommon("tjPackagePriceForm", "submitBtn", window.base + "/examinationProject/createTjPackagePrice", {}, function (responseJson) {
                if (responseJson.success) {
                    clickMenu(window.base + '/examinationProject/tjPackagePriceIndex', 'tjPackagePrice');
                    //alert("套餐价格创建成功！");
                } else {
                    $(this).removeAttr("disabled").removeAttr("style");
                    alert("套餐价格创建失败!");
                }
            }, function () {
                $(this).removeAttr("disabled").removeAttr("style");
                alert("套餐价格创建失败!");
            }, function () {
                $(this).removeAttr("disabled").removeAttr("style");
                alert("套餐价格创建失败!")
            })
        } else {
            $(this).removeAttr("disabled").removeAttr("style");
        }
    });
});
