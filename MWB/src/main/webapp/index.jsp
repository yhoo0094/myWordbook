<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<% 
/**
 * @화면명: home"C:/Users/KimSangMin/OneDrive2/OneDrive/바탕 화면/index.html"
 * @작성자: KimSangMin
 * @생성일: 2023. 10. 20. 오후 1:20:18
 * @설명: home으로 리다이렉트
**/
 %>
<html>
<head>
<meta charset="UTF-8">

<meta property="og:type" content="website">
<meta property="og:url" content="<%=request.getContextPath()%>/home">	<!-- 공유시 이동 url -->
<meta property="og:title" content="My Wordbook!"> 						<!-- 타이틀 -->
<meta property="og:image" content="<%=request.getContextPath()%>/resources/images/title-logo/books.png"> 	<!-- 미리보기 될 이미지 -->
<meta property="og:description" content="나만의 작은 단어장."> 	<!-- URL 요약 --> 

<title>My Wordbook!</title>
</head>
<body>
<script>
	window.location.href ='/wordbook/wordbookView';
</script>
</body>
</html>