<%@ page import="java.util.*,java.io.*,malgnsoft.db.*,malgnsoft.util.*" %>

<%
    //root 폴더 경로를 지정하는 경우 사용하는 전역변수
    String docRoot = Config.getDocRoot();

    //db connection 설정 정보를 저장하는 전역변수
    String jndi = Config.getJndi();

    //레이아웃 페이지의 경로를 지정할 경우 사용하는 전역변수
    String tplRoot = Config.getDocRoot() + "/html";

    //파일 업로드 지정 경로 전역 변수
    String dataDir = Config.getDataDir();

    //업로드 파일 경로 url 전역 변수
    String webUrl = Config.getWebUrl();

    //웹포트 전역 변수
    int port = request.getServerPort();
    if(port != 80) webUrl += ":" + port;

    //웹 객체 생성
    Malgn m = new Malgn(request, response, out);

    //폼 객체 생성
    Form f = new Form();
    f.setRequest(request);

    //페이지 객체 생성
    Page p = new Page();
    p.setRequest(request);
    p.setPageContext(pageContext);
    p.setWriter(out);



%>