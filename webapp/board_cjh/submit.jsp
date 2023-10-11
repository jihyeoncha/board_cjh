<%@ page contentType="text/html; charset=utf-8" %>
<%@ include file="../init.jsp"%>


<%

DataObject dao = new DataObject("jihyeon");

dao.item("title", f.get("subject"));
dao.item("content",f.get("content") );
dao.item("regi_date", m.time());
dao.insert();


response.sendRedirect("/board_cjh/list.jsp");

%>