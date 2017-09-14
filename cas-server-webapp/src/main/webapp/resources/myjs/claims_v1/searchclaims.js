function searchButtonInitParam(currpage) {
    var date = new Date();
    date.setTime(date.getTime() + (1 * 60 * 1000));
    //sort colunm
    buildTitleArrayData(currpage);
    var applycode_1 = $("#applycode_1").val();
    if (isNotEmpty(applycode_1)) {
        $.cookie('applycode'+currpage, applycode_1, {expires: date});
        requestParams.push({"name": "applycode", "value": applycode_1});
    }
    var code_1 = $("#code_1").val();
    if (isNotEmpty(code_1)) {
        $.cookie('code_1'+currpage, code_1, {expires: date});
        requestParams.push({"name": 'code', "value": code_1});
    }
    var userMobile_1 = $("#userMobile_1").val();
    if (isNotEmpty(userMobile_1)) {
        $.cookie('userMobile_1'+currpage, userMobile_1, {expires: date});
        requestParams.push({"name": 'userMoble', "value": userMobile_1});
    }
    var mobile_1 = $("#mobile_1").val();
    if (isNotEmpty(mobile_1)) {
        $.cookie('mobile_1'+currpage, mobile_1, {expires: date});
        requestParams.push({"name": 'mobile', "value": mobile_1});
    }
    var idnum_1 = $("#idnum_1").val();
    if (isNotEmpty(idnum_1)) {
        $.cookie('idnum_1'+currpage, idnum_1, {expires: date});
        requestParams.push({"name": 'idnum', "value": idnum_1});
    }
    var userName = $("#nameinsurer").val();
    if (isNotEmpty(userName)) {
        $.cookie('nameinsurer'+currpage, userName, {expires: date});
        requestParams.push({"name": 'nameinsurer', "value": userName});
    }
    var isfastpay = $("#isfastpay").val();
    if (isNotEmpty(isfastpay)) {
        $.cookie('isfastpay'+currpage, isfastpay, {expires: date});
        requestParams.push({"name": 'isfastpay', "value": isfastpay});
    } else {
        requestParams.push({"name": 'isfastpay', "value": -1});
    }
    var handlestatus = $("#handlestatus").val();
    if (isNotEmpty(handlestatus)) {
        $.cookie('handlestatus'+currpage, handlestatus, {expires: date});
        requestParams.push({"name": 'handlestatus', "value": handlestatus});
    }
    var applydateStart = $("#applydateStart").val();
    if (isNotEmpty(applydateStart)) {
        $.cookie('applydateStart'+currpage, applydateStart, {expires: date});
        requestParams.push({"name": 'applydateStart', "value": applydateStart});
    }
    var applydateEnd = $("#applydateEnd").val();
    if (isNotEmpty(applydateEnd)) {
        $.cookie('applydateEnd'+currpage, applydateEnd, {expires: date});
        requestParams.push({"name": 'applydateEnd', "value": applydateEnd});
    }
    var cmp = $("#cmp").val();
    if (isNotEmpty(cmp)) {
        $.cookie('cmp'+currpage, cmp, {expires: date});
        requestParams.push({"name": 'cmp', "value": cmp});
    }
    var ename = $("#ename").val();
    if (isNotEmpty(ename)) {
        $.cookie('ename'+currpage, ename, {expires: date});
        requestParams.push({"name": 'ename', "value": ename});
    }
}

function buildTitleArrayData(currpage){
    var orderDatas=['applycode','code','cmp','ename','nameinsurer','idnum','applydate','','donetime','donetime'];
    if(currpage=='taskClaims'){
        orderDatas=['applycode','code','cmp','ename','nameinsurer','idnum','applydate','','donetime','donetime'];
    }
    requestParams.push({"name": 'orderDatas', "value": orderDatas });
}

function initRequestParams(currpage) {
    buildTitleArrayData(currpage);
    if (isNotEmpty($.cookie('applycode'+currpage))) {
        $("#applycode_1").val($.cookie('applycode'+currpage))
        requestParams.push({"name": "applycode", "value": $.cookie('applycode'+currpage)});
    }
    if (isNotEmpty($.cookie('code_1'+currpage))) {
        $("#code_1").val($.cookie('code_1'+currpage));
        requestParams.push({"name": 'code', "value": $.cookie('code_1'+currpage)});
    }
    if (isNotEmpty($.cookie('userMobile_1'+currpage))) {
        $("#userMobile_1").val($.cookie('userMobile_1'+currpage));
        requestParams.push({"name": 'userMoble', "value": $.cookie('userMobile_1'+currpage)});
    }
    if (isNotEmpty($.cookie('mobile_1'+currpage))) {
        $("#mobile_1").val($.cookie('mobile_1'+currpage))
        requestParams.push({"name": 'mobile', "value": $.cookie('mobile_1'+currpage)});
    }
    if (isNotEmpty($.cookie('nameinsurer'+currpage))) {
        $("#nameinsurer").val($.cookie('nameinsurer'+currpage));
        requestParams.push({"name": 'nameinsurer', "value": $.cookie('nameinsurer'+currpage)});
    }
    if (isNotEmpty($.cookie('isfastpay'+currpage))) {
        $("#isfastpay").val($.cookie('isfastpay'+currpage));
        requestParams.push({"name": 'isfastpay', "value": $.cookie('isfastpay'+currpage)});
    } else {
        requestParams.push({"name": 'isfastpay', "value": -1});
    }
    if (isNotEmpty($.cookie('handlestatus'+currpage))) {
        $("#handlestatus").val($.cookie('handlestatus'+currpage));
        requestParams.push({"name": 'handlestatus', "value": $.cookie('handlestatus'+currpage)});
    }
    if (isNotEmpty($.cookie('applydateStart'+currpage))) {
        $("#applydateStart").val($.cookie('applydateStart'+currpage));
        requestParams.push({"name": 'applydateStart', "value": $.cookie('applydateStart'+currpage)});
    }
    if (isNotEmpty($.cookie('applydateEnd'+currpage))) {
        $("#applydateEnd").val($.cookie('applydateEnd'+currpage));
        requestParams.push({"name": 'applydateEnd', "value": $.cookie('applydateEnd'+currpage)});
    }
    if (isNotEmpty($.cookie('cmp'+currpage))) {
        $("#cmp").val($.cookie('cmp'+currpage));
        requestParams.push({"name": 'cmp', "value": $.cookie('cmp'+currpage)});
    }
    if (isNotEmpty($.cookie('ename'+currpage))) {
        $("#ename").val($.cookie('ename'+currpage));
        requestParams.push({"name": 'ename', "value": $.cookie('ename'+currpage)});
    }



}
function cleanAttr(currpage) {
    var inputs = $("#searchAll").find("input");
    for (var i = 0; i < inputs.length; i++) {
        var input = $(inputs[i]);
        $(input).val('');
    }
    $("#isfastpay").val('-1');
    $("#handlestatus").val('');
    $.cookie('applycode'+currpage,null);
    $.cookie('code_1'+currpage,null);
    $.cookie('userMobile_1'+currpage,null);
    $.cookie('mobile_1'+currpage,null)
    $.cookie('userName'+currpage,null);
    $.cookie('isfastpay'+currpage,null);
    $.cookie('handlestatus'+currpage,null);
    $.cookie('applydateStart'+currpage,null);
    $.cookie('applydateEnd'+currpage,null);
    $.cookie('cmp'+currpage,null);
    $.cookie('ename'+currpage,null);
}


function isNotEmpty(currval) {
    if (currval == '' || currval == null || currval.length == 0 || currval == 'undefined') {
        return false;
    }
    return true;
}