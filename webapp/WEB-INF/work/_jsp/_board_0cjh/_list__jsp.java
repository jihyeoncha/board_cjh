/*
 * JSP generated by Resin Professional 4.0.66 (built Mon, 29 Nov 2021 04:23:00 PST)
 */

package _jsp._board_0cjh;
import javax.servlet.*;
import javax.servlet.jsp.*;
import javax.servlet.http.*;
import java.util.*;
import java.io.*;
import malgnsoft.db.*;
import malgnsoft.util.*;

public class _list__jsp extends com.caucho.jsp.JavaPage
{
  private static final java.util.HashMap<String,java.lang.reflect.Method> _jsp_functionMap = new java.util.HashMap<String,java.lang.reflect.Method>();
  private boolean _caucho_isDead;
  private boolean _caucho_isNotModified;
  private com.caucho.jsp.PageManager _jsp_pageManager;
  
  public void
  _jspService(javax.servlet.http.HttpServletRequest request,
              javax.servlet.http.HttpServletResponse response)
    throws java.io.IOException, javax.servlet.ServletException
  {
    javax.servlet.http.HttpSession session = request.getSession(true);
    com.caucho.server.webapp.WebApp _jsp_application = _caucho_getApplication();
    com.caucho.jsp.PageContextImpl pageContext = _jsp_pageManager.allocatePageContext(this, _jsp_application, request, response, null, session, 8192, true, false);

    TagState _jsp_state = null;

    try {
      _jspService(request, response, pageContext, _jsp_application, session, _jsp_state);
    } catch (java.lang.Throwable _jsp_e) {
      pageContext.handlePageException(_jsp_e);
    } finally {
      _jsp_pageManager.freePageContext(pageContext);
    }
  }
  
  private void
  _jspService(javax.servlet.http.HttpServletRequest request,
              javax.servlet.http.HttpServletResponse response,
              com.caucho.jsp.PageContextImpl pageContext,
              javax.servlet.ServletContext application,
              javax.servlet.http.HttpSession session,
              TagState _jsp_state)
    throws Throwable
  {
    javax.servlet.jsp.JspWriter out = pageContext.getOut();
    final javax.el.ELContext _jsp_env = pageContext.getELContext();
    javax.servlet.ServletConfig config = getServletConfig();
    javax.servlet.Servlet page = this;
    javax.servlet.jsp.tagext.JspTag _jsp_parent_tag = null;
    com.caucho.jsp.PageContextImpl _jsp_parentContext = pageContext;
    response.setContentType("text/html; charset=utf-8");

    out.write(_jsp_string0, 0, _jsp_string0.length);
    
    //root \ud3f4\ub354 \uacbd\ub85c\ub97c \uc9c0\uc815\ud558\ub294 \uacbd\uc6b0 \uc0ac\uc6a9\ud558\ub294 \uc804\uc5ed\ubcc0\uc218
    String docRoot = Config.getDocRoot();

    //db connection \uc124\uc815 \uc815\ubcf4\ub97c \uc800\uc7a5\ud558\ub294 \uc804\uc5ed\ubcc0\uc218
    String jndi = Config.getJndi();

    //\ub808\uc774\uc544\uc6c3 \ud398\uc774\uc9c0\uc758 \uacbd\ub85c\ub97c \uc9c0\uc815\ud560 \uacbd\uc6b0 \uc0ac\uc6a9\ud558\ub294 \uc804\uc5ed\ubcc0\uc218
    String tplRoot = Config.getDocRoot() + "/html";

    //\ud30c\uc77c \uc5c5\ub85c\ub4dc \uc9c0\uc815 \uacbd\ub85c \uc804\uc5ed \ubcc0\uc218
    String dataDir = Config.getDataDir();

    //\uc5c5\ub85c\ub4dc \ud30c\uc77c \uacbd\ub85c url \uc804\uc5ed \ubcc0\uc218
    String webUrl = Config.getWebUrl();

    //\uc6f9\ud3ec\ud2b8 \uc804\uc5ed \ubcc0\uc218
    int port = request.getServerPort();
    if(port != 80) webUrl += ":" + port;

    //\uc6f9 \uac1d\uccb4 \uc0dd\uc131
    Malgn m = new Malgn(request, response, out);

    //\ud3fc \uac1d\uccb4 \uc0dd\uc131
    Form f = new Form();
    f.setRequest(request);

    //\ud398\uc774\uc9c0 \uac1d\uccb4 \uc0dd\uc131
    Page p = new Page();
    p.setRequest(request);
    p.setPageContext(pageContext);
    p.setWriter(out);




    out.write(_jsp_string0, 0, _jsp_string0.length);
    
String ch = "main";

    DataObject dao = new DataObject("jihyeon");
    //select * from jihyeon \ucffc\ub9ac\uac00 \uc790\ub3d9 \uc2e4\ud589\ub428

    dao.setDebug(out);

    ListManager lm = new ListManager();
    lm.setRequest(request);
    lm.setListNum(10); //\ubaa9\ub85d \uac2f\uc218 \uc9c0\uc815
    lm.setTable("jihyeon");
    lm.setOrderBy("regi_date desc");
    
    DataSet list = lm.getDataSet(); //\ubaa9\ub85d \ub370\uc774\ud130

    int total = lm.getTotalNum(); //\uac80\uc0c9 \ub370\uc774\ud0c0 \uac2f\uc218
    
    //find \uba85\ub839\uc5b4\ub85c \uc790\ub3d9 \uc2e4\ud589\ub41c \ucffc\ub9ac \ub4a4\uc5d0 where \ubd99\uc5ec\uc11c \uc774\ud6c4 \ucffc\ub9ac \ud569\uccd0\uc11c \ub0a0\ub9bc
    //DataSet list = dao.find("1=1 order by regi_date desc");

    // -> select * from jihyeon where 1=1 order by regi_date desc


    while(list.next()) {
        list.put("regi_date_conv", m.time("yyyy/MM/dd HH:mm", list.s("regi_date")));
    }

    //m.p(list);

    //dao.item("title", "\uc548\ub155\ud558\uc138\uc694");
    //dao.item("content", "\ub098\ub294 \ucc28\uc9c0\ud604\uc785\ub2c8\ub2e4.");
    //dao.item("regi_date", m.time());
    //dao.insert();

    p.setLayout(ch);
    p.setBody("board_cjh/list");
    p.setLoop("body",list);
    p.setVar("pagebar", lm.getPaging());
    p.display();


  }

  private com.caucho.make.DependencyContainer _caucho_depends
    = new com.caucho.make.DependencyContainer();

  public java.util.ArrayList<com.caucho.vfs.Dependency> _caucho_getDependList()
  {
    return _caucho_depends.getDependencies();
  }

  public void _caucho_addDepend(com.caucho.vfs.PersistentDependency depend)
  {
    super._caucho_addDepend(depend);
    _caucho_depends.add(depend);
  }

  protected void _caucho_setNeverModified(boolean isNotModified)
  {
    _caucho_isNotModified = true;
  }

  public boolean _caucho_isModified()
  {
    if (_caucho_isDead)
      return true;

    if (_caucho_isNotModified)
      return false;

    if (com.caucho.server.util.CauchoSystem.getVersionId() != -8439189455271529488L)
      return true;

    return _caucho_depends.isModified();
  }

  public long _caucho_lastModified()
  {
    return 0;
  }

  public void destroy()
  {
      _caucho_isDead = true;
      super.destroy();
    TagState tagState;
  }

  public void init(com.caucho.vfs.Path appDir)
    throws javax.servlet.ServletException
  {
    com.caucho.vfs.Path resinHome = com.caucho.server.util.CauchoSystem.getResinHome();
    com.caucho.vfs.MergePath mergePath = new com.caucho.vfs.MergePath();
    mergePath.addMergePath(appDir);
    mergePath.addMergePath(resinHome);
    com.caucho.loader.DynamicClassLoader loader;
    loader = (com.caucho.loader.DynamicClassLoader) getClass().getClassLoader();
    String resourcePath = loader.getResourcePathSpecificFirst();
    mergePath.addClassPath(resourcePath);
    com.caucho.vfs.Depend depend;
    depend = new com.caucho.vfs.Depend(appDir.lookup("board_cjh/list.jsp"), 5103689195487400842L, false);
    _caucho_depends.add(depend);
    loader.addDependency(depend);
    depend = new com.caucho.vfs.Depend(appDir.lookup("init.jsp"), 1072411392911731118L, false);
    _caucho_depends.add(depend);
    loader.addDependency(depend);
  }

  final static class TagState {

    void release()
    {
    }
  }

  public java.util.HashMap<String,java.lang.reflect.Method> _caucho_getFunctionMap()
  {
    return _jsp_functionMap;
  }

  public void caucho_init(ServletConfig config)
  {
    try {
      com.caucho.server.webapp.WebApp webApp
        = (com.caucho.server.webapp.WebApp) config.getServletContext();
      init(config);
      if (com.caucho.jsp.JspManager.getCheckInterval() >= 0)
        _caucho_depends.setCheckInterval(com.caucho.jsp.JspManager.getCheckInterval());
      _jsp_pageManager = webApp.getJspApplicationContext().getPageManager();
      com.caucho.jsp.TaglibManager manager = webApp.getJspApplicationContext().getTaglibManager();
      com.caucho.jsp.PageContextImpl pageContext = new com.caucho.jsp.InitPageContextImpl(webApp, this);
    } catch (Exception e) {
      throw com.caucho.config.ConfigException.create(e);
    }
  }

  private final static char []_jsp_string0;
  static {
    _jsp_string0 = "\r\n\r\n\r\n".toCharArray();
  }
}
