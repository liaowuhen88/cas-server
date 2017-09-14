/**
 * jquery.validate相关扩展验证
 * @author Administrator
 */

//验证用户名       
//jQuery.validator.addMethod("userNameCheck", function(value, element) {
//    return this.optional(element) || /^[a-zA-Z]\w{6,16}$/.test(value);
//}, "请输入6-16位字母开头的字母或数字和下划线");

jQuery.validator.addMethod("userNameCheck", function(value, element) {
    return this.optional(element) || /^[0-9A-Za-z_]{6,15}$/.test(value);
}, "只能包括英文字母、数字和下划线");

//小数
jQuery.validator.addMethod("decimals", function(value, element) {
    var decimals = /^\d*((\.\d{1,2})?)+$/;
    return this.optional(element) || (decimals.test(value));
}, "格式不正确");


//字符验证       
jQuery.validator.addMethod("stringCheck", function(value, element) {       
    return this.optional(element) || /^[\u0391-\uFFE5\w]+$/.test(value);       
}, "只能包括中文字、英文字母、数字和下划线");

//邮政编码验证       
jQuery.validator.addMethod("isEmail", function(value, element) {       
    return this.optional(element) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/.test(value);     
}, "请正确填写邮箱格式");
		
//手机号码验证       
jQuery.validator.addMethod("isMobile", function(value, element) {       
    var length = value.length;   
    var mobile = /(^(13|14|15|17|18)\d{9}$)/;
    return this.optional(element) || (length == 11 && mobile.test(value));       
}, "请正确填写您的手机号码");

//支行名称
jQuery.validator.addMethod("branchname", function(value, element) {
    var length = value.length;
    var mobile = /^[\u4e00-\u9fa5]{0,20}|[a-zA-Z]{0,20}$/g;
    return this.optional(element) || (length == 11 && mobile.test(value));
}, "格式不对");

//电话号码验证       
jQuery.validator.addMethod("isTel", function(value, element) {       
    var tel = /^\d{3,4}-?\d{7,9}$/;    //电话号码格式010-12345678   
    return this.optional(element) || (tel.test(value));       
}, "请正确填写您的电话号码");   
  
//联系电话(手机/电话皆可)验证   
jQuery.validator.addMethod("isPhone", function(value,element) {   
    var length = value.length;   
    var mobile = /(^(13|14|15|17|18)\d{9}$)|(^\d{3,4}-?\d{7,9}$)/;
    var tel = /^\d{3,4}-?\d{7,9}$/;   
    return this.optional(element) || (tel.test(value) || mobile.test(value));   
  
}, "请正确填写您的联系电话");

//身份证
jQuery.validator.addMethod("idCard", function (value, element) {
    var isIDCard1=/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;//(15位)
    var isIDCard2=/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;//(18位)

    return this.optional(element) || (isIDCard1.test(value)) || (isIDCard2.test(value));
}, "格式不对");


//证件号
jQuery.validator.addMethod("userId", function (value, element) {
    var userId1=/^[A-Za-z0-9]+$/;
    return this.optional(element) || (userId1.test(value));
}, "格式不对");

//汉字
jQuery.validator.addMethod("chinese", function (value, element) {
    var chinese = /^[\u4E00-\u9FFF]+$/;
    return this.optional(element) || (chinese.test(value));
}, "格式不对");

//年龄
jQuery.validator.addMethod("age", function(value, element) {
    var age = /^(?:[1-9][0-9]?|1[01][0-9]|120)$/;
    return this.optional(element) || (age.test(value));
}, "不能超过120岁");

//验证用户名 /手机号码
jQuery.validator.addMethod("usertl", function(value, element) {
    var length = value.length;
    var mobile = /^1[3|4|5|7|8]\d{9}$/;
    var urse =/^[0-9A-Za-z_]{6,15}$/;
    return this.optional(element) || (urse.test(value)) || (mobile.test(value));
}, "格式不对");

//验证用户名 /手机号码/邮箱
jQuery.validator.addMethod("userTelEmail", function(value, element) {
    var length = value.length;
    var mobile = /^1[3|4|5|7|8]\d{9}$/;
    var urse =/^[0-9A-Za-z_]{6,15}$/;
    var email = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/;
    return this.optional(element) || (urse.test(value)) || (mobile.test(value))  || (email.test(value));
}, "格式不对");


//汉字/字母/数字
jQuery.validator.addMethod("companyName", function(value, element) {
    var length = value.length;
    var urse =/^[0-9A-Za-z\u4E00-\u9FFF]+$/;
    return this.optional(element) || (urse.test(value));
}, "格式不对");



//汉字/字母/数字/下划线/中划线
jQuery.validator.addMethod("contractame", function(value, element) {
    var length = value.length;
    var urse =/^[-0-9A-Za-z_\u4E00-\u9FFF]+$/;
    return this.optional(element) || (urse.test(value));
}, "格式不对");






//上传文件
$.validator.addMethod("filetype",function(value,element,param){
    var fileType = value.substring(value.lastIndexOf(".") + 1).toLowerCase();
    return this.optional(element) || $.inArray(fileType, param) != -1;
}, $.validator.format("invalid file type"));