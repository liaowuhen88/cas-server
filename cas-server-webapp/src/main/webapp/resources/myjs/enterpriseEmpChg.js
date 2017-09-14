$(document).ready(function () {
});
function uploadFile(enterpriseId, mainid, uploadId, operam, id) {

    $.ajaxFileUpload({
        url: "bkf/enterpriseEmp/uploadFile",   //用于文件上传的服务器端请求地址
        secureuri: false,       //是否需要安全协议，一般设置为false
        fileElementId: uploadId, //文件上传域的ID
        dataType: 'json',     //返回值类型 一般设置为json
        data: {"enterpriseId": enterpriseId, "contractId": mainid, "operatingstatus": opera, "businesspk": id},
        success: function (data, status) {//服务器成功响应处理函数
            //$("#result").append(data);
            alert("上传成功");
        },
        error: function (data, status, e) {//服务器响应失败处理函数
            //$("#result").append(data);
            alert("上传失败");
        }
    });
    return false;
}