<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
 
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
  
  </head>
  
  <body>
     <br>
  </body>
 
    <script type="text/javascript" src="./game/js/commun.js?v=6"></script>
  
  <script type="text/javascript">
 
   
  	var shareId = getJsonDataLocal(SESSION_KEY.SHARE_ID);
	var uId =  getJsonDataLocal(SESSION_KEY.SHARE_USER_ID);
	var device = getJsonDataLocal(SESSION_KEY.DEVICE_ID);
	//alert("the shareId is " + shareId);
	//alert("the uId is " + uId);
	location.href = "hzsfopenurl://?uid="+uId+"&shareid="+shareId+"&deviceId="+device;
     

  </script>
  
  
</html>
