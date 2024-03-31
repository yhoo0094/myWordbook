<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<% 
/**
 * @화면명: 로그인
 * @작성자: KimSangMin
 * @생성일: 2024. 3. 28. 오후 8:11:06
 * @설명: 로그인 화면
**/
 %>

<form id="loginForm" class="login-form">
	<div class="loginDiv">
		<input type="text" id="userId" name="userId" class="gray-input" placeholder="아이디" title="아이디" autocomplete="userId" required="all1" onkeypress="if(event.keyCode == 13){login()}"> 
		<input type="password" id="userPw" name="userPw" class="gray-input" placeholder="비밀번호" title="비밀번호" autocomplete="userPw" required="all1" onkeypress="if(event.keyCode == 13){login()}">
		<div class="checkbox-group tr">	
			<input type="checkbox" id="remember-me" hidden> 
			<label class="align-items-center" for="remember-me">
				<span style="flex:1"></span>
				<img src="${pageContext.request.contextPath}\resources\images\etc\check_false.png" id="imgCheckbox" class="img_checkbox"/>저장
			</label>
		</div>
		<button type="button" id="login-button" onClick="javascript:login()">로그인</button>
	</div>
</form>
