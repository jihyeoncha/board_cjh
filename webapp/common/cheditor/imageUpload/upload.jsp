<%@ page language="java" import="javazoom.upload.*,java.util.*,java.io.*" %>
<%@ page errorPage="exception.jsp" %>
<%@ include file="config.jsp" %>

<% boolean createsubfolders = true; %>
<% boolean allowresume = true; %>
<% boolean allowoverwrite = false; %>
<% String encoding = "UTF-8"; %>
<% boolean keepalive = false; %>

<jsp:useBean id="upBean" scope="page" class="javazoom.upload.UploadBean" >
  <jsp:setProperty name="upBean" property="folderstore" value="<%= SAVE_DIR %>" />
  <jsp:setProperty name="upBean" property="parser" value="<%= MultipartFormDataRequest.CFUPARSER %>"/>
  <jsp:setProperty name="upBean" property="parsertmpdir" value="<%= SAVE_DIR %>"/>
  <jsp:setProperty name="upBean" property="overwritepolicy" value="nametimestamp" />
  <jsp:setProperty name="upBean" property="filesizelimit" value="50000000"/>
  <jsp:setProperty name="upBean" property="overwrite" value="<%= allowoverwrite %>"/>
  <jsp:setProperty name="upBean" property="dump" value="true"/>
</jsp:useBean>

<%
    String method = request.getMethod();

    if (method.equalsIgnoreCase("head")) {
        String filename = request.getHeader("relativefilename");
        if (filename == null) filename = request.getHeader("filename");
        if (filename != null) {
            if (keepalive == false) response.setHeader("Connection","close");

            File fhead = new File(SAVE_DIR + filename);

            if (fhead.exists()) {
                response.setHeader("size", String.valueOf(fhead.length()));
                String checksum = request.getHeader("checksum");
                if ((checksum != null) && (checksum.equalsIgnoreCase("crc"))) {
                    long crc = upBean.computeCRC32(fhead,-1);
                    if (crc != -1)
                        response.setHeader("checksum", String.valueOf(crc));
                }
                else if ((checksum != null) && (checksum.equalsIgnoreCase("md5"))) {
                    String md5 = upBean.hexDump(upBean.computeMD5(fhead,-1)).toLowerCase();
                    if ((md5 != null) && (!md5.equals("")))
                        response.setHeader("checksum", md5);
                }
            }
            else
                response.sendError(HttpServletResponse.SC_NOT_FOUND);

            return;
        }
    }

    if (MultipartFormDataRequest.isMultipartFormData(request)) {
        MultipartFormDataRequest mrequest = null;

        try {
            mrequest = new MultipartFormDataRequest(request,
                null,
                -1,
                MultipartFormDataRequest.CFUPARSER,
                encoding,
                allowresume);
        }
        catch (Exception e) {}

        String todo = null;
        if (mrequest != null)
            todo = mrequest.getParameter("filesize");

        if ((todo != null)) {
            upBean.setFolderstore(SAVE_DIR);
            Hashtable files = mrequest.getFiles();

            if ((files != null) && (!files.isEmpty())) {
                UploadFile file = (UploadFile)files.get("file");
                String fileName = "";
                String origName = file.getFileName();

                for (int i=1; i<=8; i++) {
                    int rnd = 1 + (int)(Math.random() * 52);
                    rnd = (rnd > 26) ? rnd + 70 : rnd + 64;
                    fileName = fileName+(char)(rnd);
                }

                int pos = origName.lastIndexOf('.');
                if (pos != -1) {
                    String extension = origName.substring(pos).toLowerCase();
                    fileName = fileName + extension;
                }

                file.setFileName(fileName);
                File tmpFile = new File(SAVE_DIR + fileName);

                if (tmpFile.canRead()) {
                    fileName = upBean.loadOverwriteFilter().process(fileName);
                    file.setFileName(fileName);
                }

                String imageURL = SAVE_URL + fileName;

                if (file != null) {
					out.println("{ fileUrl:'" + imageURL + 
								"',filePath:'" + SAVE_DIR.replace("\\", "\\\\") + fileName +
								"',origName:'" + origName + 
								"',fileName:'" + fileName + 
								"',fileSize:'" + file.getFileSize() + "'}");
                }

                if (keepalive == false)
                    response.setHeader("Connection","close");

                String chunkidStr = mrequest.getParameter("chunkid");
                String chunkamountStr = mrequest.getParameter("chunkamount");
                String chunkbaseStr = mrequest.getParameter("chunkbase");

                if ((chunkidStr != null) && (chunkamountStr != null) && (chunkbaseStr != null)) {
                    upBean.setOverwrite(true);
                    upBean.store(mrequest, "file");
                    upBean.setOverwrite(allowoverwrite);
                    int chunkid = Integer.parseInt(chunkidStr);
                    int chunkamount = Integer.parseInt(chunkamountStr);

                    if (chunkid == chunkamount) {
                        String fname = upBean.getFolderstore()+java.io.File.separator+chunkbaseStr;
                        File fread = new File(fname);

                        if (fread.canRead() && (upBean.getOverwrite()==false))
                            fname = upBean.loadOverwriteFilter().process(fname);

                        FileOutputStream fout = new FileOutputStream(fname);
                        byte[] buffer = new byte[4096];

                        for (int c=1; c <= chunkamount; c++) {
                            File filein = new File(upBean.getFolderstore() +
                                            java.io.File.separator +
                                            chunkbaseStr +
                                            "." + c);

                            FileInputStream fin = new FileInputStream(filein);
                            int read = -1;

                            while ((read = fin.read(buffer)) > 0)
                                fout.write(buffer,0,read);

                            fin.close();
                            filein.delete();
                        }
                        fout.close();
                    }
                }
                else {
                    upBean.store(mrequest, "file");
                }

                upBean.setFolderstore(SAVE_DIR);
            }
            else {
                String emptydirectory = mrequest.getParameter("emptydirectory");
                if ((emptydirectory != null) && (!emptydirectory.equals(""))) {
                    File dir = new File(SAVE_DIR+emptydirectory);
                    dir.mkdirs();
                }
            }
        }
    }
%>
