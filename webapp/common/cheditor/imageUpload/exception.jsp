<%@ page isErrorPage="true" import="java.io.*" %>
<% response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, exception.toString()); %>
<% response.setHeader("customerror", exception.toString()); %>
<html>
<head><title></title></head>
<body>

</body>
</html>
