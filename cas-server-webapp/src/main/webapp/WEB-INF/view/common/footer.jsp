<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<style>
    .footer {
        background-color: #666 !important;
        color: #fff;
        z-index: 9999;
    }

    .main {
        margin: 0 15px 50px !important;
    }
</style>
<div class="footer">版权所有 © 北京众信易保科技有限公司 美好生活一起包<c:if test="${version != null}">Version-${version}</c:if></div>
