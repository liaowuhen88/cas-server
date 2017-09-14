<%@ page import="com.bm.insurance.cloud.util.Constant" %>
<%@ taglib prefix="tf" uri="/authentication" %>
<%@ taglib prefix="m" uri="/menu" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="subNavBox">
    <div class="subNavBox-infor">

        <%--<m:menu page="claimsManage">
            <div class="subNav"><a href="javascript:void(0)"><i class="iconfont">&#xe604;</i>理赔管理</a></div>
            <ul class="navContent">
                <tf:role modelPage="claimsPage">
                    <li>
                        <a href="javascript:clickMenu('<%=request.getContextPath()%>/claimsSearchMenuPage','claimsSearchMenuPage')"
                           id="claimsSearchMenuPage">理赔查询</a></li>
                </tf:role>
            </ul>
        </m:menu>--%>
        <m:menu page="claimsManage">
            <div class="subNav"><a href="javascript:void(0)"><i class="iconfont">&#xe604;</i>用户管理</a></div>
            <ul class="navContent">
                <tf:role modelPage="claimsPage">
                    <li>
                        <a href="javascript:clickMenu('<%=request.getContextPath()%>/messages','messages')"
                           id="messages">Push查询</a></li>
                </tf:role>
                    <%--  <tf:role modelPage="claimsPage">
                          <li>
                              <a href="javascript:clickMenu('<%=request.getContextPath()%>/createPersonAccount','createPersonAccount')"
                                 id="createPersonAccount">创建个人客户</a>
                          </li>
                      </tf:role>--%>
                <tf:role modelPage="claimsPage">
                    <li>
                        <a href="javascript:clickMenu('<%=request.getContextPath()%>/personalMenuPage','personalMenuPage')"
                           id="personalMenuPage">用户查询</a>
                    </li>
                </tf:role>
            </ul>
        </m:menu>
        <m:menu page="claimsManage">
            <div class="subNav"><a href="javascript:void(0)"><i class="iconfont">&#xe604;</i>理赔管理</a></div>
            <ul class="navContent">
                <tf:role modelPage="claimsPage">
                    <li>
                        <a href="javascript:clickMenu('<%=request.getContextPath()%>/claimsSearchMenuPage','claimsSearchMenuPage')"
                           id="claimsSearchMenuPage">理赔查询</a></li>
                </tf:role>
                <tf:role modelPage="claimsPage">
                    <li>
                        <a href="javascript:clickMenu('<%=request.getContextPath()%>/claimsDoMenuPage','claimsDoMenuPage')"
                           id="claimsDoMenuPage">理赔处理</a></li>
                </tf:role>
                <tf:role modelPage="claimsPage">
                    <li>
                        <a href="javascript:clickMenu('<%=request.getContextPath()%>/claimsImgPage','claimsImgPage')"
                           id="claimsImgPage">理赔单据配置</a></li>
                </tf:role>
                <li>
                    <a href="javascript:clickMenu('<%=request.getContextPath()%>/claimsAddPage','claimsAddPage')"
                       id="claimsAddPage">新增报案</a>
                </li>
                <li>
                    <a href="javascript:clickMenu('<%=request.getContextPath()%>/claimsBxIPage','claimsBxIPage')"
                       id="claimsBxIPage">接口日志查询</a>
                </li>
                <li>
                    <a href="<%=request.getContextPath()%>/templates/<%=Constant.MSG_BIZ_IN_CLA%>"
                       id="claimTemplates">模板管理</a>
                </li>
            </ul>
        </m:menu>

        <m:menu page="baoquanManage">
            <div class="subNav"><a href="javascript:void(0)"><i class="iconfont">&#xe603;</i>保全管理</a></div>
            <ul class="navContent">
                <tf:role modelPage="baoquanPage">
                    <li>
                        <a href="javascript:clickMenu('<%=request.getContextPath()%>/api/bisinf/pageSelect/1','enterpriseBnsInfo1')"
                           id="enterpriseBnsInfo1">保全办理</a></li>
                </tf:role>
                <tf:role modelPage="baoquanPage">
                    <li>
                        <a href="javascript:clickMenu('<%=request.getContextPath()%>/haiNiaoWoBaoQuan','haiNiaoWoBaoQuan')"
                           id="haiNiaoWoBaoQuan">合作公司保全办理</a></li>
                </tf:role>
                    <%-- <li>
                         <a href="javascript:clickMenu('<%=request.getContextPath()%>/baoquanTemplates','baoquanTemplates')"
                            id="baoquanTemplates">模板管理</a>
                     </li>--%>
                <li>
                    <a href="<%=request.getContextPath()%>/templates/<%=Constant.MSG_BIZ_IN_BAOQUAN%>"
                       id="baoquanTemplates">模板管理</a>
                </li>
                <li>
                    <a href="javascript:clickMenu('<%=request.getContextPath()%>/checheOrder','checheOrder')"
                       id="checheOrder">车车订单</a>
                </li>
                <li>
                    <a href="javascript:clickMenu('<%=request.getContextPath()%>/pingAnPage','pingAnPage')"
                       id="pingAnPage">平安</a>
                </li>
            </ul>
        </m:menu>

        <m:menu page="contractManage">
            <div class="subNav"><a href="javascript:void(0)"><i class="iconfont">&#xe601;</i>合同管理</a></div>
            <ul class="navContent">
                <tf:role modelPage="enterprisePage">
                    <li>
                        <a href="javascript:clickMenu('<%=request.getContextPath()%>/enterpriseSearchMenuPage','enterpriseSearchMenuPage')"
                           id="enterpriseSearchMenuPage">企业用户管理</a></li>
                </tf:role>
                <tf:role modelPage="contractPage">
                    <li>
                        <a href="javascript:clickMenu('<%=request.getContextPath()%>/contractManager','contractManager')"
                           id="contractManager">合同管理</a></li>
                </tf:role>
                <tf:role modelPage="qiyuePage">
                    <li>
                        <a href="javascript:clickMenu('<%=request.getContextPath()%>/api/bisinf/pageSelect/2','enterpriseBnsInfo2')"
                           id="enterpriseBnsInfo2">契约管理</a></li>
                </tf:role>

                <li>
                    <a href="javascript:clickMenu('<%=request.getContextPath()%>/contractMoneyManager','contractMoneyManager')"
                       id="contractMoneyManager">合同费用利息管理</a></li>

            </ul>
        </m:menu>

        <m:menu page="policyManage">
            <div class="subNav"><a href="javascript:void(0)"><i class="iconfont">&#xe602;</i>保险管理</a></div>
            <ul class="navContent">
                <tf:role modelPage="planPage">
                    <li><a href="javascript:clickMenu('<%=request.getContextPath()%>/schemeManager','schemeManager')"
                           id="schemeManager">方案管理</a></li>
                </tf:role>
                <li><a href="javascript:clickMenu('<%=request.getContextPath()%>/porductMenuPage','porductMenuPage')"
                       id="porductMenuPage">产品管理</a></li>
                <li>
                    <a href="javascript:clickMenu('<%=request.getContextPath()%>/responsibilityinfo','responsibilityinfo')"
                       id="responsibilityinfo">责任管理</a></li>
                    <%--<li>
                        <a href="javascript:clickMenu('<%=request.getContextPath()%>/policyTemplates','policyTemplates')"
                           id="policyTemplates">模板管理</a>
                    </li>--%>
                <li>
                    <a href="javascript:clickMenu('<%=request.getContextPath()%>/insurerMenupage','insurerMenupage')"
                       id="insurerMenupage">保险公司管理</a>
                </li>
                <li>
                    <a href="<%=request.getContextPath()%>/templates/<%=Constant.MSG_BIZ_IN%>"
                       id="policyTemplates">模板管理</a>
                </li>
            </ul>
        </m:menu>
        <m:menu page="tjManage">
            <div class="subNav"><a href="javascript:void(0)"><i class="iconfont">&#xe606;</i>体检管理</a></div>
            <ul class="navContent">
                <li>
                    <a href="javascript:clickMenu('<%=request.getContextPath()%>/physicalExamination/enterprisePhysicalExamination','enterprisePhysicalExamination')"
                       id="enterprisePhysicalExamination">企业体检管理</a></li>
                <li>
                <li>
                    <a href="javascript:clickMenu('<%=request.getContextPath()%>/examinationProject/packages','tjProgram')"
                       id="tjProgram">体检套餐管理</a>
                </li>
                <tf:role modelPage="tjPackagePricePage">
                    <li>
                        <a href="javascript:clickMenu('<%=request.getContextPath()%>/examinationProject/tjPackagePriceIndex','tjPackagePrice')"
                           id="tjPackagePrice">套餐价格管理</a></li>
                </tf:role>
                <li>
                    <a href="javascript:clickMenu('<%=request.getContextPath()%>/physicalExamination/reservationQuery','reservationQuery')"
                       id="reservationQuery">预约/查询</a>
                </li>
                <li>
                    <a href="javascript:clickMenu('<%=request.getContextPath()%>/physicalExamination/tjCheckedManagement','tjCheckedManagement')"
                       id="tjCheckedManagement">体检核心</a>
                </li>

                <li>
                    <a href="javascript:clickMenu('<%=request.getContextPath()%>/physicalExamination/physicalExaminationReportInput','physicalExaminationReportInput')"
                       id="physicalExaminationReportInput">体检报告管理</a>
                </li>

                <li>
                    <a href="javascript:clickMenu('<%=request.getContextPath()%>/physicalExamination/reportQuery','reportQuery')"
                       id="reportQuery">报告查询</a>
                </li>
                <li>
                    <a href="javascript:clickMenu('<%=request.getContextPath()%>/physicalExamination/medicalCenter','medicalCenter')"
                       id="medicalCenter">体检中心管理</a>
                </li>
                <li>
                    <a href="javascript:clickMenu('<%=request.getContextPath()%>/examinationInfo','examinationInfo')"
                       id="examinationInfo">体检到期提醒</a>
                </li>

                    <%--<li>--%>
                    <%--<a href="javascript:clickMenu('<%=request.getContextPath()%>/examinationProject/toExaminationProject','toExaminationProject')"--%>
                    <%--id="toExaminationProject">体检项目维护</a>--%>
                    <%--</li>--%>
                <li>
                    <a href="javascript:clickMenu('<%=request.getContextPath()%>/examinationReportIndex','examinationReportIndex')"
                       id="examinationReportIndex">体检项目字典</a>
                </li>
                <li>
                    <a href="<%=request.getContextPath()%>/templates/<%=Constant.MSG_BIZ_HE_PE%>"
                       id="physicalTemplates">模板管理</a>
                </li>
            </ul>


            <div class="subNav"><a href="javascript:void(0)"><i class="iconfont">&#xe602;</i>报告管理</a></div>
            <ul class="navContent">
                <li>
                    <a href="javascript:clickMenu('<%=request.getContextPath()%>/jiyinManager','jiyinManager')"
                       id="jiyinManager">基因筛查管理</a>
                </li>
                <li>
                    <a href="javascript:clickMenu('<%=request.getContextPath()%>/otherReportManager','otherReportManager')"
                       id="otherReportManager">其他健康报告</a>
                </li>
            </ul>
        </m:menu>
        <m:menu page="qudaoManage">
            <div class="subNav"><a href="javascript:void(0)"><i class="iconfont">&#xe606;</i>渠道商专区</a></div>
            <ul class="navContent">
                <tf:role modelPage="c_qudaoweihuPage">
                    <li>
                        <a href="javascript:clickMenu('<%=request.getContextPath()%>/channel/channelHtml','channelManage')"
                           id="channelManage">渠道商维护</a></li>
                </tf:role>
                <tf:role modelPage="c_infoPage">
                    <li><a href="javascript:clickMenu('<%=request.getContextPath()%>/channel/infoHtml','infoManage')"
                           id="infoManage">我司信息</a></li>
                </tf:role>
                <tf:role modelPage="c_tuijianPage">
                    <li>
                        <a href="javascript:clickMenu('<%=request.getContextPath()%>/channel/tuijianHtml','tuijianManage')"
                           id="tuijianManage">我司推荐</a></li>
                </tf:role>
            </ul>
        </m:menu>

        <div class="subNav"><a href="javascript:void(0)"><i class="iconfont">&#xe601;</i>日志查询</a></div>
        <ul class="navContent">
            <li>
                <a href="javascript:clickMenu('<%=request.getContextPath()%>/logSearch','logSearch')" id="logSearch">日志查询</a>
            </li>
            <li>
                <a href="javascript:clickMenu('<%=request.getContextPath()%>/repair','repairAiKuangData')"
                   id="repairAiKuangData">修复爱康数据</a>
            </li>
        </ul>
        <div class="subNav"><a href="javascript:void(0)"><i class="iconfont">&#xe602;</i>有赞</a></div>
        <ul class="navContent">
            <li>
                <a href="javascript:clickMenu('<%=request.getContextPath()%>/youzanView','youzanManager')"
                   id="youzanManager">有赞管理</a>
            </li>
            <li>
                <a href="javascript:clickMenu('<%=request.getContextPath()%>/orderManagement/ordermanage','ordermanage')"
                   id="ordermanage">宏康订单管理</a>
            </li>
            <li>
                <a href="javascript:clickMenu('<%=request.getContextPath()%>/youzan/youzanordermanage','youzanordermanage')"
                   id="youzanordermanage">有赞订单管理</a>
            </li>
        </ul>


            <div class="subNav"><a href="javascript:void(0)"><i class="iconfont">&#xe626;</i>活动</a></div>
        <ul class="navContent">
            <%--<li>
                <a href="javascript:clickMenu('<%=request.getContextPath()%>/activity/listView','activityListView')" id="activityListView">活动列表</a>
            </li>--%>
            <li>
                <a href="javascript:clickMenu('${base}/activity/index','activityIndex')" id="activityIndex">活动列表</a>
            </li>
            <li>
                <a href="javascript:clickMenu('${base}/activity/data/view','activityData')" id="activityData">活动数据</a>
            </li>
        </ul>
        <div class="subNav"><a href="javascript:void(0)"><i class="iconfont">&#xe604;</i>微信公众号</a></div>
        <ul class="navContent">
            <li>
                <a href="javascript:clickMenu('${base}/wechat/view/fans','wechatFans')" id="wechatFans">关注列表</a>
            </li>
        </ul>
    </div>
    <div class="subNavBox-packup"><img src="<%=request.getContextPath()%>/resources/images/hide.png"/></div>
    <div class="subNavBox-men"><img src="<%=request.getContextPath()%>/resources/images/show.png"/></div>
</div>
<script src="<%=request.getContextPath()%>/resources/js/jquery.js"></script>
<script>
    $("div.subNavBox").on('click', '#claimTemplates,#baoquanTemplates,#policyTemplates,#physicalTemplates', function (e) {
        e.preventDefault();
        var url = $(this).attr('href');
        loadUrlToContainer(url);
    });
</script>
