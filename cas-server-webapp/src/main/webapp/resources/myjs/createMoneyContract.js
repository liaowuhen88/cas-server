$(document).ready(function () {
    var date = new Date;
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    $("#endingyear").val(year);
    $("#endingmonth").val(month);
    var contract = $("#contractNumId");
    var costtype = $("#costtype");
    var money = $("#money");
    var index = 0;
    //validatorContract();
    //创建合同
    $("#createContract").click(function () {
        if (contract.val() == "" || $.trim(contract.val()) == '') {
            contract.next().text("请选择合同").show();
            return false;
        } else {
            contract.next().text(" ").hide();
        }
        if (costtype.val() == "" || $.trim(costtype.val()) == '') {
            costtype.next().text("请选择费用类型").show();
            return false;
        } else {
            costtype.next().text(" ").hide();
        }
        if (money.val() == "" || $.trim(money.val()) == '') {
            money.next().text("金额不能为空").show();
            return false;
        } else {
            debugger;
            if (( $.trim(costtype.val()) == 0 || $.trim(costtype.val()) == 2) && $.trim(money.val()) > 0) {
                money.next().text("理赔/管理费为负").show();
                return false;
            } else {
                money.next().text(" ").hide();
            }
        }

        if ($("#contractForm").valid()) {

            $("#enterpriseId").val($("#enterprise").attr("real-value"));
            ajaxSubmitCommon("contractForm", "createContract", window.base + "/kf/contractmanager/createcostmanagement", {}, function (responseJson) {
                if (responseJson.success) {
                    alert("添加成功");
                    clickMenu('contractMoneyManager');
                } else {
                    alert("添加失败!");
                }
            }, function () {
                alert("添加失败!");
            }, function () {
                alert("添加失败!")
            })
        }
    });
    //返回按钮
    $("#backButton").click(function () {
        clickMenu(window.base + '/contractManager', 'contractManager');
    });

});
var companyV = $("#company");
companyV.blur(function () {
    $(this).parent().children().last().text("").show();
});

