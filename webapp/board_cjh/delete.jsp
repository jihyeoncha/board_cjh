<%@ page contentType="text/html; charset=utf-8" %>
<%@ include file="../init.jsp"%>

<%

//기본키
int idx = m.ri("idx");

DataObject dao = new DataObject("jihyeon");
dao.delete("idx = " + idx);


response.sendRedirect("/board_cjh/list.jsp");

%>