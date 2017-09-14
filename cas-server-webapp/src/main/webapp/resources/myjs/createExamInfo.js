$(document).ready(function () {
    var index = 0;
    //validatorContract();
    //创建体检xiangm


    $("#createExamBut").click(function () {
        if ($("#examinForm").valid()) {
            ajaxSubmitCommon("examinForm", "createExamBut", window.base + "/physicalExamination/createExamin", {}, function (responseJson) {
                var msg = "创建成功"
                if (responseJson.success) {
                    alert(responseJson.data);
                    clickMenu('examinationReportIndex');
                } else {
                    alert("创建失败!");
                }
            }, function () {
                alert("创建失败!");
            }, function () {
                alert("创建失败!")
            })
        }
    });


    /*    // 移除元素
     $("#dataTables").on("click", 'input[name="removeButton"]', function () {
     var parentId = $(this).attr("f");
     $(this).parent().parent().remove();
     $("#dataTables td[name='child_rsb']").each(function () {
     if ($(this).attr("id") == 'child_' + parentId.split('_')[1]) {
     $(this).remove();
     }
     });
     });
     */


    //返回按钮
    $("#backButton").click(function () {
        clickMenu(window.base + '/examinationProject', 'examinationProject');
    });

});


$("#department").change(function () {
    var department = $("#department").val();
    var projecttype = $("#projecttype");
    projecttype.empty();
    if (department && department.length > 0) {
        var optionHtml = "";
        $.get(window.base + "/physicalExamination/findProjectType/" + department, {}, function (data) {
            var list = data.data;
            for (var i = 0; i < list.length; i++) {
                var d = list[i];
                optionHtml += "<option value='" + d.id + "'>" + d.tj_name + "</option>";
            }
            projecttype.append(optionHtml);
        })
    }
});