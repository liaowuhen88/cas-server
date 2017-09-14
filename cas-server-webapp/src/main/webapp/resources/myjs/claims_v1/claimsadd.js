function closeShowCloseClaims() {
    clickMenu('/claimsDoMenuPage', 'claimsDoMenuPage')
}
function initSearchPidInfo(claimsid, useraccountid, pid, productid, companyId, dangertype) {
    $("#eappplyid").val(claimsid);
    if (productid == '' || productid == null) {
        productid = "-1";
    }
    $("#radiobox_pid_" + productid).attr("checked", true);
    showZR_YY(useraccountid, pid, productid, companyId, dangertype, '');
}

//展示合同信息
function seeContract() {
    $("#theme-popover5").fadeIn(50);
    $('.theme-popover-mask').fadeIn(100);
}

/* <!-- 申报处理状态    1、未认领 2、 已认领 处理中   3、影像齐全   4、资料齐全   5、完结 0 撤销 -->*/
//保存
function saveInfo() {
    //出险事项
    var flag=true;
    $("input:checked[name=currResBase]").each(function() {
        if ($(this).is(":checked")) {
            flag=false;
            return true;
        }
    });
    if(flag){
        alert("请选择出险事项");
        return true;
    }

    loading();
    var ajaxOptions = {
        url: window.base + "/claims/add/clickBtnSave",
        type: 'post',
        dataType: 'json',
        timeout: 100000,
        cache: false,
        success: function (responseJson) {
            if (responseJson.success) {
                var obj=responseJson.data;
                cheeckSignData(obj.id,obj.cmpid);
            }
            $(".loadingbox").remove();
        }
    };
    $("#saveFormok").ajaxSubmit(ajaxOptions);

}

function  cheeckSignData(applyid,cmpid){
    var url = window.base + "/insurer/findInsurerByID/" + cmpid;
    $.post(url, {}, function (result) {
        if (result.success) {
            console.log("nmae:"+result.data.name);
            if(result.data.name=='太保安联健康保险股份有限公司'){
                var a = document.createElement("a");
                a.setAttribute("href", window.base+"/fastClaims/view/claims/sig?applyId="+applyid);
                a.setAttribute("target", "_blank");
                a.click();
                //window.open(window.base+"/fastClaims/view/claims/sig?applyId="+applyid);
            }else{
                alert("新增报案成功！");
            }
            closeShowCloseClaims();
        }else{
            closeShowCloseClaims();
        }
    });
}
function clickSelResatype(obj) {
    if ($(obj).val() == '5') {
        $("#cardTypeDiv").show();
    } else {
        $("#cardTypeDiv").hide();
    }
}

function closeBtn(popover1id) {
    $("#"+popover1id).fadeOut(50);
    $("#theme-popover-mask").fadeOut(50);
}
function showZR_YY(useraccountid, pid, productid, companyId,dangertype,ecid) {
    $("#pid").val(pid);
    $("#ecid").val(ecid);
    $("#hid_productid").val(productid);
    $("#cmpid").val(companyId);
    $("#cxsxDiv").empty();
    //compareCompany();
    var url = window.base + "/claims/search/findClaimsAccountInfoByPidUid/" + useraccountid + "/" + pid + "/" + productid + "/-1/"+$("#eappplyid").val();
    $.post(url, {}, function (result) {
        if (result.success) {
            var jsondata = result.data;
            myUtils.renderDiv("claimsAccountTpl", jsondata, "claimsAccountDiv");
            var temp_array = new Array();
            $(jsondata).each(function (i) {
                if ($.inArray(jsondata[i].resreason, temp_array) == -1) {
                    temp_array.push(jsondata[i].resreason);
                }
            });
            var cxyy_array = [];
            $(temp_array).each(function (i) {
                var resreasonname = "";
                //1、意外2、疾病3、生育 4旅游险
                if (temp_array[i] == 1) {
                    resreasonname = "意外";
                } else if (temp_array[i] == 2) {
                    resreasonname = "疾病";
                } else if (temp_array[i] == 3) {
                    resreasonname = "生育";
                } else if (temp_array[i] == 4) {
                    resreasonname = "旅游险";
                } else {
                    resreasonname = "其他";
                }
                cxyy_array[i] = {"resreasonname": resreasonname, "resreason": temp_array[i]};
            });
            myUtils.renderDiv("cxyyTpl", cxyy_array, "cxyy");

            if(dangertype.length>0){
                $("#dangertype"+dangertype).attr("checked",true);
                showCX_SX(dangertype,$("#reporttype").val());
            }

        } else {
            alert(result.msg);
        }
    });
}
function showCX_SX(resReason,reporttype) {
    if (!isEmpty($("#pid").val()) && !isEmpty($("#applyuid").val())
        && !isEmpty($("#hid_productid").val())) {
        var url = window.base + "/claims/search/findClaimsAccountInfoByPidUid/"
            + $("#applyuid").val() + "/" + $("#pid").val() + "/" + $("#hid_productid").val() + "/" + resReason+"/"+$("#eappplyid").val();
        $.post(url, {}, function (result) {
            if (result.success) {
                var jsondata = result.data;
                myUtils.renderDiv("cxsxTpl", jsondata, "cxsxDiv");
                if(reporttype.length>0){
                    var tmarr=reporttype.split(',')
                    $.each(tmarr,function(n,value){
                        $("#reporttype"+value).attr("checked","checked");
                    });
                }
            } else {
                alert(result.msg);
            }
        });
    }
}

function upLoadImg(){
    loading();
    var ajaxOptions = {
        url: window.base + "/claims/add/upload",
        type: 'post',
        dataType: 'json',
        timeout: 100000,
        cache: false,
        success: function (responseJson) {

            $(".loadingbox").remove();
        }
    };
    $("#uploadForm").ajaxSubmit(ajaxOptions);
}
function ajaxFileUploadPic() {
    loading();
    $('.theme-popover-mask').fadeIn(100);
    $.ajaxFileUpload({
        url : window.base + "/claims/add/upload", //用于文件上传的服务器端请求地址
        secureuri : false, //一般设置为false
        fileElementId : 'file', //文件上传空间的id属性  <input type="file" id="file" name="file" />
        type : 'post',
        dataType : 'json', //返回值类型 一般设置为json
        success : function(data) //服务器成功响应处理函数
        {
            console.info("============"+data);
            var json = JSON.parse(data);
            var tempArray=[];
            if (json.success) {
                $(json.data).each(function(i,value){
                    tempArray[i]={"index":i,"imgurl":window.base+"/upload/down/"+value[1]};
                });
            }
            //console.info(i+"============"+value);
            //$("#showYLImgDIV").text(myUtils.findTpl("showYLImgTPL",tempArray));
            myUtils.renderDiv("showYLImgTPL",tempArray,"showYLImgDIV");
            console.info("========33===="+tempArray);
            $(".loadingbox").remove();
            $('.theme-popover-mask').fadeOut(50)

        },
        error : function(data)//服务器响应失败处理函数
        {
             console.log(data.msg);
        }
    });
    return false;
}

function showImg() {
    $("#theme-popover-img").fadeIn(50);
    $('.theme-popover-mask').fadeIn(100);
}