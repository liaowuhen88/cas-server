var setting = {
    check: {
        enable: true
        //,chkStyle: 'radio'
        //,radioType: "level"
    },
    data: {
        simpleData: {
            enable: true
        }
    }
};
var zNodes = [];
if(projects != null){
    for(var i=0;i<projects.length;i++){
        var currItem = projects[i];
        zNodes.push({id:currItem.id,pId:currItem.pId,name:currItem.name});
    }
}
$(document).ready(function () {
    $.fn.zTree.init($("#projectree"), setting,zNodes);
    var treeObj = $.fn.zTree.getZTreeObj("projectree");
    treeObj.checkAllNodes(true);
    treeObj.expandAll(true);
});