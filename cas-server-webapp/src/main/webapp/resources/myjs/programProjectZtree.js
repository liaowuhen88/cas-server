var setting = {
    async: {
        enable: true,
        url: window.base + "/examinationProject/getExaminationProjectList/list",
        dataFilter: ajaxDataFilter
    },
    view: {
        addHoverDom: addHoverDom,
        removeHoverDom: removeHoverDom,
        //selectedMulti: false
    },
    check: {
        enable: false
        //,chkStyle: 'radio'
        //,radioType: "level"
    },
    data: {
        simpleData: {
            enable: true
        }
    },
    edit: {
        enable: true,
        editNameSelectAll: false,
        showRemoveBtn: showRemoveBtn
        //showRenameBtn: showRenameBtn
    },
    callback: {
        beforeDrag: beforeDrag,
        beforeEditName: beforeEditName,
        beforeRemove: beforeRemove,
        beforeClick:zTreeBeforeClick
        //beforeRename: beforeRename
    }
};
function ajaxDataFilter(treeId, parentNode, responseData) {
    var zNodes = [];
    var openFlag = false;
    if (!responseData) return null;
    if (responseData) {
        for (var i = 0; i < responseData.length; i++) {
            //默认展开2级树，如果pId<2 ,open设置为true
            var currItme = responseData[i];
            if(currItme.pId == 0){
                //根节点不可删除
            }
            if (currItme.pId < 2) {
                openFlag = true;
            }
            zNodes.push({"id": currItme.id, "pId": currItme.pId, "name": currItme.name, "open": openFlag});
        }
    }
    return zNodes;
};
//根节点没有删除按钮
function showRemoveBtn(treeId, treeNode) {
    //return !treeNode.isFirstNode;
    return treeNode.pId != null;
}
//不是最后一个节点有编辑按钮
function showRenameBtn(treeId, treeNode) {
    return !treeNode.isLastNode;
}
//拖拽
function beforeDrag(treeId, treeNodes) {
    return false;
}

function beforeEditName(treeId, treeNode) {
    //弹出模态框展示项目编辑页面,根据id查询出套餐信息回显
    showTJPlanDiv(treeNode.id);
    return false;
    //var zTree = $.fn.zTree.getZTreeObj("projectree");
    //return (treeNode.id !== treeId);
    //zTree.selectNode(treeNode);
    //return confirm("进入节点 -- " + treeNode.name + " 的编辑状态吗？");
}
function beforeRemove(treeId, treeNode) {
    //loadUrlToContainer(window.base + "/examinationProject/toExaminationProject");
    //var zTree = $.fn.zTree.getZTreeObj("projectree");
    //var zTree = $.fn.zTree.getZTreeObj(treeId);
    //zTree.selectNode(treeNode);
    //return confirm("确认删除 节点 -- " + treeNode.name + " 吗？");
    var ids = [];
    ids.push(treeNode.id);
    ids = getAllChildrenNodes(treeNode,ids);
    var url = window.base +"/examinationProject/delExaminationProjectBat";
    $.messager.confirm("警告！", "删除此节点将删除其所有子节点,是否继续删除", function () {
        console.info(ids);
        $.ajax({
            type: 'post',
            url: url,
            data: {"ids":ids},
            //contentType: "application/json",
            dataType: 'json',
            success: function (responseData) {
                if (responseData.success) {
                    loadUrlToContainer(window.base + "/examinationProject/toExaminationProject");
                } else {
                    $.messager.popup(responseData.msg);
                }
            },
            error: function () {
                $.messager.popup("error");
            }
        });
    });
    return false;
}

function getAllChildrenNodes(treeNode,ids){
    //ids.push(treeNode.id);
    if (treeNode.isParent) {
        var childrenNodes = treeNode.children;
        if (childrenNodes) {
            for (var i = 0; i < childrenNodes.length; i++) {
                ids.push(childrenNodes[i].id);
                getAllChildrenNodes(childrenNodes[i], ids);
            }
        }
    }
    return ids;
}

function beforeRename(treeId, treeNode, newName, isCancel) {
    if (newName.length == 0) {
        alert("节点名称不能为空.");
        var zTree = $.fn.zTree.getZTreeObj("projectree");
        setTimeout(function () {
            zTree.editName(treeNode)
        }, 10);
        return false;
    }
    return true;
}

$(document).ready(function () {
    validatorExaminationProject();
    $.fn.zTree.init($("#projectree"), setting);
});

//var newCount = 1;
//鼠标hover
function addHoverDom(treeId, treeNode) {
    var sObj = $("#" + treeNode.tId + "_span");
    //处于编辑状态或选中状态不触发hover事件（addHoverDom）
    if (treeNode.editNameFlag || $("#addBtn_" + treeNode.tId).length > 0) return;
    var addStr = "<span class='button add' id='addBtn_" + treeNode.tId
        + "' title='add node' onfocus='this.blur();'></span>";
    sObj.after(addStr);
    var btn = $("#addBtn_" + treeNode.tId);
    if (btn) btn.bind("click", function () {
        cleanTJPlanDiv();
        //将pId带过去
        $("#projectPid").val(treeNode.id);
        $('.theme-popover-mask').fadeIn(100);
        $('.theme-popover').slideDown(200);
        return false;
        //var zTree = $.fn.zTree.getZTreeObj("projectree");
        //var zTree = $.fn.zTree.getZTreeObj(treeId);
        //zTree.addNodes(treeNode, {id: (100 + newCount), pId: treeNode.id, name: "new node" + (newCount++)});
    });
};
//展示体检项目详情
function zTreeBeforeClick(treeId, treeNode, clickFlag){
    //获取当前单击节点id值
    $(".panel.panel-success ").removeClass("hidden");
    var url = window.base + "/examinationProject/toEditExaminationProject";
    $.get(url, {"id": treeNode.id}, function (response) {
        var data = response.data;
        if (response.success) {
            $('#programName2').val(data.name);
            var genderAttr = $('[name="gender2"]');
            for (var i = 0; i < genderAttr.length; i++) {
                if (genderAttr[i].value == data.gender) {
                    genderAttr[i].checked = true;
                } else {
                    genderAttr[i].checked = false;
                }
            }
            if (data.defaultTemp != null && data.defaultTemp == 1) {
                $('[name="defaultTemp2"]').attr("checked", true);
            } else {
                $('[name="defaultTemp2"]').attr("checked", false);
            }
            $("#dist2").val(data.dist);
        } else {
            alert(response.msg);
        }
    });
    return true;//onClick 事件不会被触发
}
function removeHoverDom(treeId, treeNode) {
    $("#addBtn_" + treeNode.tId).unbind().remove();
};
//模态框相关
function hideTJPlanDiv() {
    $('.theme-popover-mask').fadeOut(100);
    $('.theme-popover').slideUp(200);
}
//清空，即初始化
function cleanTJPlanDiv() {
    $('#programName').val('');
    $('[name="gender"]').removeAttr("checked");
    $('[name="defaultTemp"]').attr("checked", false);
    $("#dist").val('');
    $("#projectId").val(null);
    $("#projectPid").val(null);
}
function showTJPlanDiv(id) {
    //loading();
    cleanTJPlanDiv();
    var url = window.base + "/examinationProject/toEditExaminationProject";
    $.get(url, {"id": id}, function (response) {
        var data = response.data;
        if (response.success) {
            $('#programName').val(data.name);
            var genderAttr = $('[name="gender"]');
            for (var i = 0; i < genderAttr.length; i++) {
                if (genderAttr[i].value == data.gender) {
                    genderAttr[i].checked = true;
                } else {
                    genderAttr[i].checked = false;
                }
            }
            if (data.defaultTemp != null && data.defaultTemp == 1) {
                $('[name="defaultTemp"]').attr("checked", true);
            } else {
                $('[name="defaultTemp"]').attr("checked", false);
            }
            $("#dist").val(data.dist);
            $("#projectId").val(data.id);
            $("#projectPid").val(data.pId);
            $('.theme-popover-mask').fadeIn(100);
            $('.theme-popover').slideDown(200);
        } else {
            alert(response.msg);
        }
    });
}
//关闭弹出层
$('.theme-poptit .close').click(function () {
    hideTJPlanDiv();
    return false
});
$('#cancelTJPlan').click(function () {
    hideTJPlanDiv();
    return false
});

//确认
$("#confirmForm").click(function () {
    var ajaxOptions = {
        url: window.base + "/examinationProject/editExaminationProject",
        type: 'post',
        dataType: 'json',
        timeout: 100000,
        cache: false,
        success: function (responseJson) {
            if (responseJson.success) {
                hideTJPlanDiv();
                loadUrlToContainer(window.base + "/examinationProject/toExaminationProject");
            }
            $("#confirmForm").removeAttr("disabled").removeAttr("style");
        },
        error: function () {
            $("#confirmForm").removeAttr("disabled").removeAttr("style");
            alert("编辑体检项目失败");
        }
    };
    if ($("#editExaminationProjectForm").valid()) {
        $(this).attr("disabled", "disabled").attr("style", "background: #B0B5B9;");
        $("#editExaminationProjectForm").ajaxSubmit(ajaxOptions);
    }
});