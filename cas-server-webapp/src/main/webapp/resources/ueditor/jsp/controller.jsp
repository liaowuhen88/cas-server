<%@ page language="java" contentType="text/html; charset=UTF-8" import="com.baidu.ueditor.ActionEnter"
    pageEncoding="UTF-8"%>
<%@ page trimDirectiveWhitespaces="true" %>
<%
    request.setCharacterEncoding( "utf-8" );
	response.setHeader("Content-Type" , "text/html");
	String rootPath = application.getRealPath( "/" );
	ActionEnter actionEnter= new ActionEnter(request,rootPath);
	System.out.println("action="+request.getParameter("action"));
	String str=actionEnter.exec();
	out.write(str);
%>