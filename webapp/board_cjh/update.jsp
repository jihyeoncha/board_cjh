<%@ page contentType="text/html; charset=utf-8" %>
<%@ include file="../init.jsp"%>


<%

int idx = Integer.parseInt(f.get("idx"));  

DataObject dao = new DataObject("jihyeon");
dao.item("title", f.get("subject"));
dao.item("content", f.get("content"));

dao.update("idx = " + idx);



//정보
DataSet info = dao.find("idx = " + idx);


while(info.next()) {
    info.put("regi_date_conv", m.time("yyyy/MM/dd HH:mm", info.s("regi_date")));
}    


//출력
p.setLayout("main");
p.setBody("board_cjh/read");
p.setVar(info);
p.setVar("board_modify_block", true);
p.display();

%>