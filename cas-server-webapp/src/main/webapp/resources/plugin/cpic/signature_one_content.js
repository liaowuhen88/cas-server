var apiInstance;
var branchid = getStorJson("branchId");
var pdfFilePath;
var user = getStorJson('user');
var policyInfo = getStorJson("policyInfo");
appcan.ready(function() {
    testAnySign(112321321);
    testSetTableData();
    testPopupDialog(20);
});

function sign_confirm_one() {
    $("#signdiv").show();
    sign_confirm();
    $("#app_btn").show();
}

function testPopupDialog(context_id) {
    switch (apiInstance.showSignatureDialog(context_id)) {
    case RESULT_OK:
        break;
    case EC_API_NOT_INITED:
        alert("信手书接口没有初始化");
        break;
    case EC_WRONG_CONTEXT_ID:
        alert("没有配置相应context_id的签字对象");
        break;
    }
}

if (policyInfo.sFrom == '3') {
    var pdfUrl = getStorJson("tempCxPDFPath");
    //产险
    var claimNo = getStorJson("cxClaimNo");
    //产险外部系统赔案号
    pdfFilePath = pdfUrl + branchid + "@" + claimNo + "@" + (new Date()).valueOf() + '.pdf';
} else {
    var pdfUrl = getStorJson("tempOtherPDFPath");
    //综意险
    var claimNo = getStorJson("claimNoSuccess");
    pdfFilePath = pdfUrl + 'A@' + branchid + claimNo + 'E010076' + (new Date()).valueOf() + '.pdf';
}
function testAnySign(channel) {

    var res;
    var callback = function(context_id, context_type, val) {
        if (context_type == CALLBACK_TYPE_START_RECORDING || context_type == CALLBACK_TYPE_STOP_RECORDING) {
            return;
        }

        if (context_type == CALLBACK_TYPE_SIGNATURE) {
            document.getElementById("xss_20").src = "data:image/gif;base64," + val;
        } else if (context_type == CALLBACK_TYPE_MASS_SIGNATURE) {
            document.getElementById("xss_30").src = "data:image/gif;base64," + val;
        } else if (context_type == CALLBACK_TYPE_ON_PICTURE_TAKEN) {
            document.getElementById("preview").src = "data:image/gif;base64," + val;
        } else if (context_type == CALLBACK_TYPE_ON_MEDIA_DATA) {
            var audio = document.createElement("audio");
            if (audio != null && audio.canPlayType && audio.canPlayType("audio/mpeg")) {
                audio.src = "data:image/gif;base64," + val;
                audio.play();
            }
        }
    };
    //测试回调，将回调数据显示

    apiInstance = new AnySignApi();

    res = apiInstance.initAnySignApi(callback, channel);

    if (!res) {
        alert("init error");
    } else {
        //      alert("init success");
    }

    //注册单字签字对象20
    res = testAddSignatureObj(20, true);
    if (!res) {
        alert("init error");
    } else {
        //      alert("init success");
    }

    apiInstance.addDataObj(13, new DataObj());
    //配置数据域13
    apiInstance.addDataObj(14, new DataObj());
    //配置数据域14
    apiInstance.addDataObj(15, new DataObj());
    //配置数据域15

    res = apiInstance.commitConfig();

    /*if(res){
     alert("Init ALL 初始化成功");
     }else{
     alert("Init ALL 初始化失败");
     }*/

}

function testAddSignatureObj(objId, necessary) {

    var context_id = objId;
    var signatureConfig = new SignatureConfig();
    signatureConfig.isNecessary = necessary;
    signatureConfig.title = "请被保人" + user.userName + "签字";
    var res = apiInstance.addSignatureObj(context_id, signatureConfig);
    if (res) {
        //            alert("addSignatureObj "+context_id+" success");
        return res;
    } else {
        alert("addSignatureObj " + context_id + " error");
        return res;
    }
}

family = JSON.parse(getStorJson('family'));
//索赔类型
var acctype = "";
if (family.length == 1) {
    acctype = family[0].list;
} else {
    for (var i = 0; i < family.length; i++) {
        acctype += family[i].list + " ";
    }
}

function testSetTableData() {
    var info2 = getStorJson('applicatInfo2');
    var info1 = getStorJson('applicatInfo1');
    var info = getStorJson('applicatInfo');
    var payeeprovince = info2.payeeprovince;
    //领款人开户行省
    var payeecity = info2.payeecity;
    //领款人开户行市
    var policyno = policyInfo.sPolicyno;

    var insuredname = user.userName.replace(/\s/g, "");
    var insuredphone = user.phone;
    var cardType = user.cardType;
    var insuredidno = user.pid;

    var applicantname = info.applicant.replace(/\s/g, "");
    var applicantmobile = info.telPhone;
    var applicantidtype = checkidtype(info.cardTypeId);
    var applicantid = info.cardNum;
    var applicantrelation = info.relateInsured;
    var applicantmail = info.email;
    var applicantaddress = info.contactAddrDetail;

    var claimType = acctype;
    var accidentcode = info1.danger;
    var invoiceNumber = info2.countMoney;
    //发票总金额

    var accidentInformation = "";

    //数组
    var accno;
    var applicatTime = info1.date1;
    var hosipital = "";
    var accidentprog = "";
    if (applicatTime != "" || hosipital != "" || accidentprog != "") {
        accno = "1";
    } else {
        accno = "";
    }

    var isFlag = "";
    var choseType = info2.getMoneyWord;
    if (choseType == "0") {
        isFlag = "是";
    } else if (choseType == "1") {
        isFlag = "否";
    }
    var amount = info2.getMoney;

    var payeebank = info2.bankName;
    var payeeinfo;
    if (payeeprovince!="") {
        if (payeecity!="") {
            payeeinfo = payeeprovince + payeecity;
        } else {
            payeeinfo = payeeprovince;
        }
    } else {
        payeeinfo = "";
    }

    var payeebankname = info2.moneyPeople;
    //账户名
    var payeeacct = info2.bankNum;
    var date = new Date();
    var signDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    //var signDate="2015-10-19";

    var formData = "{\"policyno\":\"" + policyno + "\",\"insuredname\":\"" + insuredname + "\",\"insuredphone\":\"" + insuredphone + "\",\"cardType\":\"" + cardType + "\",\"insuredidno\":\"" + insuredidno + "\",\"applicantname\":\"" + applicantname + "\",\"applicantmobile\":\"" + applicantmobile + "\",\"applicantidtype\":\"" + applicantidtype + "\",\"applicantid\":\"" + applicantid + "\",\"applicantrelation\":\"" + applicantrelation + "\",\"applicantmail\":\"" + applicantmail + "\",\"applicantaddress\":\"" + applicantaddress + "\",\"claimType\":\"" + claimType + "\",\"accidentcode\":\"" + accidentcode + "\",\"invoiceNumber\":\"" + invoiceNumber + "\",\"accidentInformation\":[{\"accno\":\"" + accno + "\",\"applicatTime\":\"" + applicatTime + "\",\"hosipital\":\"" + hosipital + "\",\"accidentprog\":\"" + accidentprog + "\"}],\"isFlag\":\"" + isFlag + "\",\"amount\":\"" + amount + "\",\"payeebank\":\"" + payeebank + "\",\"payeeinfo\":\"" + payeeinfo + "\",\"payeebankname\":\"" + payeebankname + "\",\"payeeacct\":\"" + payeeacct + "\",\"signDate\":\"" + signDate + "\"}";

    var username = insuredname;
    var identitycardnbr = insuredidno;
    var signer = "{\"bjcaxssrequest\":{\"submitinfo\":[{\"username\":\"" + username + "\",\"identitycardnbr\":\"" + identitycardnbr + "\"}]}}";
    //签名人信息
    var tid = "11";
    var charset = "utf-8";
    var businessId = "719314ea7b88304004c8ff498";

    var template_serial = "1#4000";
    var channel = "10010";

    var res = apiInstance.setData(13, formData);

    res = apiInstance.setData(14, signer);

    res = apiInstance.setData(15, "hash");

    apiInstance.setTID("5070");

    if (res) {
        //alert("setTableData success");
        alert(formData);
        alert(signer);
        return res;
    } else {
        alert("setTableData error");
        return res;
    }
}

function checkidtype(idtype) {
    if (idtype == 'a') {
        idtype = "身份证";
    } else if (idtype == 'c') {
        idtype = "护照";
    } else if (idtype == 'd') {
        idtype = "军官证";
    } else if (idtype == 'j') {
        idtype = "港澳台护照";
    } else if (idtype == 'l') {
        idtype = "台湾居民通行证";
    } else {
        idtype = "";
    }
    return idtype;
}

function commit() {
    alert(apiInstance.isReadyToUpload());
    if (apiInstance.isReadyToUpload()) {
        alert(apiInstance.getEncodedSignData());
        alert(pdfFilePath);
        alert("branchid"+branchid);
        var casginInfo = [{
            encData : apiInstance.getEncodedSignData(), //加密报文
            pdfFilePath : pdfFilePath, //PDF存储路径,A@14位机构代码+15位主索引+3位资料类型代码+1位外包标识+1位有无实物标识+2位来源系统标识+其他信息+. 扩展名
            signWays : 0, //签名方式，0代表基于模板方式签名，1代表基于PDF原文签名，不能为空。（“码上保”系统赋值为0）
            ticketID : 330, //投保资料类型编码   CA通过这个标示判断是否为电子回执模板
            insuranceType : '', //投保单类型
            otherType : 0, //扩充类型： 0：当前模版类型 >0：以后扩充需要   （0 --  全司公用模板 1 --  山东模板 2 – 厦门模板）
            tipType : '', //提示书类型
            extNote : '' //扩展信息
        }];
        //CA的信息
        var eupCasignInfos = JSON.stringify(casginInfo).replace(/\<\//g, "\<\\\/");

        //ajax提交
        $.ajax({
            url : httpIp+"/claimServer/completeSignature.do",
            type : "post",
            timeout : 180000,
            data : {
                eupCasignInfos : eupCasignInfos
            },
            success : function(data) {
                if (data == '1') {
                    alertX("提交失败，请重试！");
                } else if (data == '0') {
                    alert("okok");
                    //window.location.href = "../claimServer/toClaimSuccess.do";
                }
            },
            error : function() {
                return;
            }
        });
    }
}
function cancel(){
    evalScript('signature_one','mm()');
}



