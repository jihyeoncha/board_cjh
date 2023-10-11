<%@ page contentType="text/html; charset=utf-8" %>
<%@ include file="../init.jsp"%>


<%

//기본키
int idx = m.ri("idx");

DataObject dao = new DataObject("jihyeon");
//select * from jihyeon 쿼리가 자동 실행됨

dao.setDebug(out);

//정보
DataSet info = dao.find("idx = " + idx);

while(info.next()) {
    info.put("regi_date_conv", m.time("yyyy/MM/dd HH:mm", info.s("regi_date")));
}    


//출력
p.setLayout("main");
p.setBody("board_cjh/modify");
p.setVar(info);
p.display();

%>