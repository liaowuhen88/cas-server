/**
 * @author Administrator
 */

//渠道商维护
function validatorChannel(base) {
    var verifics = $("#verifics");
    verifics.validate({
        rules: {
            "channelname": {
                required: true
            },
            "chlforshort": {
                required: true
            },
            "organizationcode": {
                required: true
            },
            "legalperson": {
                required: true,
                minlength: 2,
                maxlength: 8,
                chinese: true
            },
            "contact": {
                required: true,
                minlength: 2,
                maxlength: 8,
                chinese: true
            },
            "contacttel": {
                required: true,
                isPhone: true
            },
            "address": {
                companyName: true,
                minlength: 5
            },
            "tel": {
                required: true,
                minlength: 2,
                maxlength: 15
            },
            "leaguetime": {
                required: true
            }
        },
        //设置错误信息
        messages: {
            "channelname": {
                required: "请输入渠道商名称"
            },
            "chlforshort": {
                required: "请输入渠道商简称"
            },
            "organizationcode": {
                required: "请输入组织机构代码"
            },
            "legalperson": {
                required: "请输入法人（2-8个汉字）",
                minlength: "格式不正确（2-8个汉字）",
                maxlength: "格式不正确（2-8个汉字）",
                chinese: "格式不正确（2-8个汉字）"
            },
            "contact": {
                required: "请输入联系人（2-8个汉字）",
                minlength: "联系人格式不正确（2-8个汉字）",
                maxlength: "联系人格式不正确（2-8个汉字）",
                chinese: "联系人格式不正确（2-8个汉字）"
            },
            "contacttel": {
                required: "请输入联系电话",
                isPhone: "格式不正确 (例如：13*、14*、15*、17*、18*或 010-1234567)"
            },
            "address": {
                companyName: "联系地址格式不正确（至少输入5位汉字、字母、数字）",
                minlength: "联系地址格式不正确（至少输入5位汉字、字母、数字）"
            },
            "tel": {
                required: "请输入客户服务电话",
                minlength: "最少2位",
                maxlength: "最多15位"
            },
            "leaguetime": {
                required: "请选择加盟时间"
            }
        }
    });
}

//企业用户管理
function validatorEnterprise(base) {
    var createEnterpriseForm = $("#createEnterpriseForm");
    createEnterpriseForm.validate({
        rules: {
            "ename": {
                required: true,
                remote: {
                    url: window.base + "/api/enterprise/checkproperty",
                    type: "POST",
                    data: {
                        "property": "ename", "val": function () {
                            return $("#corpName").val()
                        }, "id": function () {
                            return $("#eid").val()
                        }
                    }
                },
                companyName: true,
                minlength: 4
            },
            "banner":{
                maxlength:8
            },
            "name": {
                required: true,
                remote: {
                    url: window.base + "/api/enterprise/checkproperty",
                    type: "POST",
                    data: {
                        "property": "name", "val": function () {
                            return $("#userName").val()
                        }, "id": function () {
                            return $("#eid").val()
                        }
                    }
                },
                userNameCheck: true,
                minlength: 6,
                maxlength: 12
            },
            "mobile": {
                required: true,
                remote: {
                    url: window.base + "/api/enterprise/checkproperty",
                    type: "POST",
                    data: {
                        "property": "mobile", "val": function () {
                            return $("#mobile").val()
                        }, "id": function () {
                            return $("#eid").val()
                        }
                    }
                },
                isPhone: true
            },
            "email": {
                isEmail: true
            },
            "receType": {
                required: true
            },
            "receHz": {
                required: true
            },
            "pwd": {
                required: true,
                minlength: 6,
                maxlength: 12
            },
            "contact": {
                chinese: true,
                minlength: 2
            },
            "aignPwd": {
                required: true,
                equalTo: "#passWord"
            },
            "channelid": {
                required: true
            },
            "customerServiceId": {
                required: true
            }
        },
        //设置错误信息
        messages: {
            "ename": {
                required: "公司名称不能为空",
                remote: "公司名称已经存在",
                companyName: "公司名称输入格式不正确（至少输入4位汉字、字母、数字）",
                minlength: "公司名称输入格式不正确（至少输入4位汉字、字母、数字）"
            },
            "receHz": {
                required: "收单频次不能为空"
            },
            "receType": {
                required: "收单方式不能为空"
            },
            "banner":{
                maxlength:"最多输入8个字符"
            },
            "name": {
                required: "登录名不能为空（只能输入6-12位字母、数字、下划线）",
                remote: "登录名已经存在",
                userNameCheck: "登录名输入格式不正确（只能输入6-12位字母、数字、下划线）",
                minlength: "登录名输入格式不正确（只能输入6-12位字母、数字、下划线）",
                maxlength: "登录名输入格式不正确（只能输入6-12位字母、数字、下划线）"
            },
            "mobile": {
                required: "电话不能为空 (例如：13*、14*、15*、17*、18*或 010-1234567)",
                remote: "电话已经存在",
                isPhone: "格式不正确 (例如：13*、14*、15*、17*、18*或 010-1234567)"
            },
            "email": {
                isEmail: "邮箱格式不正确（例如：web@163.com）"
            },
            "pwd": {
                required: "密码不能为空（6-12位）",
                minlength: "密码输入格式不正确（6-12位）",
                maxlength: "密码输入格式不正确（6-12位）"
            },
            "contact": {
                chinese: "联系人格式不正确（至少2位汉字）",
                minlength: "联系人格式不正确（至少2位汉字）"
            },
            "aignPwd": {
                required: "两次密码不一致",
                equalTo: "两次密码不一致"
            },
            "channelid": {
                required: "所属机构不能为空"
            },
            "customerServiceId": {
                required: "渠道业务员不能为空"
            }
        }
    });
}


//创建合同
function validatorContract(base) {
    var contractForm = $("#contractForm");
    contractForm.validate({
        rules: {
            "enterpriseUserBean.id": {
                required: true
            },
            "enterpriseContractRequestBean.name": {
                required: true,
                contractame: true,
                minlength: 2
            },
            "enterpriseContractRequestBean.channelId": {
                required: true
            },
            "sellerId": {
                required: true
            },
            "enterpriseContractRequestBean.personnum": {
                digits: true
            },
            "enterpriseContractRequestBean.money": {
                decimals: true
            },
            "enterpriseContractRequestBean.mianpnum": {
                digits: true
            },
            "enterpriseContractRequestBean.joinpnum": {
                digits: true
            },
            "sellerEctractRefRequestBean.sellerId": {
                required: true
            },
            "enterpriseContractRequestBean.paytype": {
                required: true
            },
            "enterpriseContractRequestBean.payment": {
                required: true
            },
            "enterpriseContractRequestBean.dispute": {
                required: true
            },
            "enterpriseContractRequestBean.effectivedate": {
                required: true
            },
            "enterpriseContractRequestBean.expirydate": {
                required: true
            },
            "enterpriseContractRequestBean.signaturedate": {
                required: true
            },
            "enterpriseContractRequestBean.toCompanyDate": {
                required: true
            },
            "enterpriseContractRequestBean.isOfficial": {
                required: true
            },
            "enterpriseContractRequestBean.enterpriseId": {
                required: true
            },
            "plain": {
                required: true
            },
            "payMoneyAccount.insurancename":{
                required: true
            }
        },
        //设置错误信息
        messages: {
            "enterpriseUserBean.id": {
                required: "单位名称不能为空"
            },
            "enterpriseContractRequestBean.name": {
                required: "公司名称不能为空（至少输入2位汉字、字母、数字、下划线、中划线）",
                contractame: "格式不正确（至少输入2位汉字、字母、数字、下划线、中划线）",
                minlength: "格式不正确（至少输入2位汉字、字母、数字、下划线、中划线）"
            },
            "enterpriseContractRequestBean.channelId": {
                required: "请选择渠道商"
            },
            "sellerId": {
                required: "请选择销售"
            },
            "enterpriseContractRequestBean.personnum": {
                digits: "格式不正确（只能输入整数）"
            },
            "enterpriseContractRequestBean.money": {
                decimals: "格式不正确（只能输入数字限制2位小数）"
            },
            "enterpriseContractRequestBean.mianpnum": {
                digits: "格式不正确（只能输入整数）"
            },
            "enterpriseContractRequestBean.joinpnum": {
                digits: "格式不正确（只能输入整数）"
            },
            "sellerEctractRefRequestBean.sellerId": {
                required: "请选择销售"
            },
            "enterpriseContractRequestBean.paytype": {
                required: "至少选择一个 "
            },
            "enterpriseContractRequestBean.payment": {
                required: "至少选择一个"
            },
            "enterpriseContractRequestBean.dispute": {
                required: "至少选择一个"
            },
            "enterpriseContractRequestBean.effectivedate": {
                required: "保险期间不能为空"
            },
            "enterpriseContractRequestBean.expirydate": {
                required: "到期日期不能为空"
            },
            "enterpriseContractRequestBean.signaturedate": {
                required: "投保日期不能为空"
            },
            "enterpriseContractRequestBean.toCompanyDate": {
                required: "资料转交保险公司日期不能为空"
            },
            "enterpriseContractRequestBean.isOfficial": {
                required: "至少选择一个"
            },
            "enterpriseContractRequestBean.enterpriseId": {
                required: "请选择保险公司"
            },
            "plain": {
                required: "请选择保险方案"
            },
            "payMoneyAccount.insurancename":{
                required: "险种名称不能为空"
            }
        }
    });
}

//方案管理
function validateCreateNewScheme(base) {
    var plainForm = $("#plainForm");
    plainForm.validate({
        rules: {
            "cmnt": {
                maxlength: 1000
            }
        },
        messages: {
            "cmnt": {
                maxlength: "最多可以输入1000个字"
            }
        }
    })
}
//体检预约
function validatorReservation(base) {
    var createOrderForm = $("#createOrderForm");
    createOrderForm.validate({
        onkeyup: false,
        rules: {
            "tjpname": {
                required: true,
                chinese: true,
                minlength: 2,
                maxlength: 8
            },
            "tjidcard": {
                required: true,
                userId: true,
                minlength: 5,
                maxlength: 25
            },
            "tjmobile": {
                required: true,
                isMobile: true
            },
            "tjemail": {
                required: true,
                email: true
            }
            ,
            "tjDatePicker": {
                required: true
            }
        },
        //设置错误信息
        messages: {
            "tjpname": {
                required: "体检人姓名（只能输入2-8个汉字）",
                chinese: "体检人姓名格式不正确（只能输入2-8个汉字）",
                minlength: "体检人姓名格式不正确（只能输入2-8个汉字）",
                maxlength: "体检人姓名格式不正确（只能输入2-8个汉字）"
            },
            "tjidcard": {
                required: "体检人证件（只能输入5-25个数字或字母）",
                userId: "体检人证件格式不正确（只能输入5-25个数字或字母）",
                minlength: "体检人证件格式不正确（只能输入5-25个数字或字母）",
                maxlength: "体检人证件格式不正确（只能输入5-25个数字或字母）"
            },
            "tjmobile": {
                required: "请输入体检人手机（例如：13*、14*、15*、17*、18*）",
                isMobile: "体检人手机格式不正确（例如：13*、14*、15*、17*、18*）"
            },
            "tjemail": {
                required: "请输入邮箱",
                email: "邮箱格式不正确（例如：web@163.com）"
            },
            "tjDatePicker": {
                required: "预约时间不能为空"
            }
        }
    });
}
//体检预约 个人信息修改
function validatorEditOrder(base) {
    var editOrderForm = $("#editOrderForm");
    editOrderForm.validate({
        onkeyup: false,
        rules: {
            "idCard": {
                required: true,
                idCard: true
            },
            "mobile": {
                required: true,
                isMobile: true
            },
            "email": {
                required: true,
                email: true
            }
        },
        //设置错误信息
        messages: {
            "idCard": {
                required: "请输入身份证号",
                idCard: "身份证号格式不正确（只能输入15位或18位）"
            },
            "mobile": {
                required: "请输入手机号码（例如：13*、14*、15*、17*、18*）",
                isMobile: "手机号码格式不正确（例如：13*、14*、15*、17*、18*）"
            },
            "email": {
                required: "请输入邮箱",
                email: "邮箱格式不正确（例如：web@163.com）"
            }
        }
    });
}
//体检中心管理
function validatorMedicalCenter(base) {
    var createTJCompanyForm = $("#createTJCompanyForm");
    createTJCompanyForm.validate({
        onkeyup: false,
        rules: {
            "name": {
                required: true,
                companyName: true,
                minlength: 4
            },
            "contacts": {
                required: true,
                chinese: true,
                minlength: 2,
                maxlength: 8
            },
            "contactnum": {
                required: true,
                isPhone: true
            },
            "email": {
                required: true,
                isEmail: true
            }
        },
        //设置错误信息
        messages: {
            "name": {
                required: "公司名称不能为空（至少输入4位汉字、字母、数字）",
                companyName: "公司名称输入格式不正确（至少输入4位汉字、字母、数字）",
                minlength: "公司名称输入格式不正确（至少输入4位汉字、字母、数字）"
            },
            "contacts": {
                required: "联系人不能为空（只能输入2-8个汉字）",
                chinese: "联系人格式不正确（只能输入2-8个汉字）",
                minlength: "联系人格式不正确（只能输入2-8个汉字）",
                maxlength: "联系人格式不正确（只能输入2-8个汉字）"
            },
            "contactnum": {
                required: "联系电话不能为空 (例如：13*、14*、15*、17*、18*或 010-1234567)",
                isPhone: "格式不正确 (例如：13*、14*、15*、17*、18*或 010-1234567)"
            },
            "email": {
                required: "电子邮箱不能为空（例如：web@163.com）",
                isEmail: "电子邮箱格式不正确（例如：web@163.com）"
            }
        }
    });
}
//公司详细-门店管理
function validatorStore(base) {
    var createTJStorefrontForm = $("#createTJStorefrontForm");
    createTJStorefrontForm.validate({
        onkeyup: false,
        rules: {
            "name": {
                required: true,
                stringCheck: true,
                minlength: 4
            },
            "dailylimit": {
                required: true,
                digits: true
            }
        },
        //设置错误信息
        messages: {
            "name": {
                required: "公司名称不能为空（至少输入4位汉字、字母、数字、下划线）",
                stringCheck: "公司名称输入格式不正确（至少输入4位汉字、字母、数字、下划线）",
                minlength: "公司名称输入格式不正确（至少输入4位汉字、字母、数字、下划线）"
            },
            "dailylimit": {
                required: "每日限额不能为空（只能输入数字）",
                digits: "每日限额输入格式不正确（只能输入数字）"
            }
        }
    });
}
//体检套餐-体检项目维护
function validatorExaminationProject(base) {
    var contractForm = $("#editExaminationProjectForm");
    contractForm.validate({
        rules: {
            "programName": {
                //体检项目名称
                required: true
            },
            "gender": {
                //性别
                required: true
            }
        },
        //设置错误信息
        messages: {
            "programName": {
                required: "名称不能为空"
            },
            "gender": {
                required: "请选择性别"
            }
        }
    });
}
//体检套餐-体检套餐维护
function validatorTJProgram(base) {
    var contractForm = $("#editTJProgramForm");
    contractForm.validate({
        rules: {
            "programName":{
                //套餐名
                required: true
            },
            "type": {
                //套餐标签
                maxlength: 5
            },
            /*"gender": {
                //性别
            },*/
            "tjcompany": {
                //体检公司
                required: true
            },
            "examinationdata":{
                required:true
            }
        },
        //设置错误信息
        messages: {
            "programName": {
                required: "请输入套餐名"
            },
            "type": {
                maxlength:"长度最多5个字符"
            },
            "tjcompany": {
                required: "请选择体检公司"
            },
            "examinationdata":{
                required: "套餐项目不能为空"
            }
        }
    });
}
//体检套餐价格页面
function validatorTjPackagePrice(base) {
    var tjPackagePriceForm = $("#tjPackagePriceForm");
    tjPackagePriceForm.validate({
        rules: {
            "price":{
                required: true,
                decimals:true
            }
        },
        //设置错误信息
        messages: {
            "price":{
                required: "请输入销售价格",
                decimals: "格式不正确（只能输入数字限制2位小数）"
            }
        }
    });
}
//体检合同创建
function validatorTjContract(base) {
    var tjContractForm = $("#tjContractForm");
    tjContractForm.validate({
        rules: {
            "channelId":{
                required: true
            },
            "sellerId":{
                required: true
            },
            "payment":{
                required: true
            },
            "contractDisputeMode":{
                required: true
            },
            "name":{
                required: true
            },
            "code":{
                required: true
            },
            "money":{
                required: true
            },
            "personnum":{
                required: true
            },
            "effectivedate":{
                required: true
            },
            "expirydate":{
                required: true
            }
        },
        //设置错误信息
        messages: {
            "channelId":{
                required: "请选择渠道商"
            },
            "sellerId":{
                required: "请选择销售员"
            },
            "payment":{
                required: "请选择支付方式"
            },
            "contractDisputeMode":{
                required: "请选择争议处理方式"
            },
            "name":{
                required: "请输入合同名称"
            },
            "code":{
                required: "请输入合同编号"
            },
            "money":{
                required: "请输入销售价格"
            },
            "personnum":{
                required: "请输入销售价格"
            },
            "effectivedate":{
                required: "请选择生效日期"
            },
            "expirydate":{
                required: "请选择失效日期"
            }
        }
    });
}