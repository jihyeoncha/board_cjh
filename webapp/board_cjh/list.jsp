<%@ page contentType="text/html; charset=utf-8" %>
<%@ include file="../init.jsp"%>


<%
String ch = "main";

    DataObject dao = new DataObject("jihyeon");
    //select * from jihyeon 쿼리가 자동 실행됨

    dao.setDebug(out);

    ListManager lm = new ListManager();
    lm.setRequest(request);
    lm.setListNum(10); //목록 갯수 지정
    lm.setTable("jihyeon");
    lm.setOrderBy("regi_date desc");
    
    DataSet list = lm.getDataSet(); //목록 데이터

    int total = lm.getTotalNum(); //검색 데이타 갯수
    
    //find 명령어로 자동 실행된 쿼리 뒤에 where 붙여서 이후 쿼리 합쳐서 날림
    //DataSet list = dao.find("1=1 order by regi_date desc");

    // -> select * from jihyeon where 1=1 order by regi_date desc


    while(list.next()) {
        list.put("regi_date_conv", m.time("yyyy/MM/dd HH:mm", list.s("regi_date")));
    }

    //m.p(list);

    //dao.item("title", "안녕하세요");
    //dao.item("content", "나는 차지현입니다.");
    //dao.item("regi_date", m.time());
    //dao.insert();

    p.setLayout(ch);
    p.setBody("board_cjh/list");
    p.setLoop("body",list);
    p.setVar("pagebar", lm.getPaging());
    p.display();

%>