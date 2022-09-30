<%@ page contentType="text/html"%>
<%@ page import="javax.xml.parsers.DocumentBuilderFactory,javax.xml.parsers.DocumentBuilder,org.w3c.dom.*"
%>
<html>
<body><center>


<%
DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
DocumentBuilder db = dbf.newDocumentBuilder();
Document doc = db.parse("webapps\\ROOT\\users.xml");
int i=0;
NodeList nl= doc.getElementsByTagName("username");
NodeList n2= doc.getElementsByTagName("password");
for(int k=0;k<n2.getLength();k++)
{
String user =nl.item(k).getFirstChild().getNodeValue();
String pass =n2.item(k).getFirstChild().getNodeValue();

String user1 = request.getParameter("username");
String pass1 = request.getParameter("password");
session.setAttribute("usrname",user1);
%>
<%if(user.equals("admin")&&pass.equals(pass1))
{
	i++;
response.sendRedirect("index.html");
}


}
if(i==0){
	response.setContentType("text/html");
 out.println("<h2><font color='red'>Incorrect Login or Password</font></h2>");
}
%> 
</center>
</body>
</html>
