<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<% 
/**
 * @화면명: 단어장
 * @작성자: KimSangMin
 * @생성일: 2024. 3. 29. 오전 10:22:34
 * @설명:
**/
 %>
 
<div class="page-header align-items-center">
	<img src="${pageContext.request.contextPath}\resources\images\etc\btn_menu.png" id="menuBtn" class="menuBtn"/>
	<div class="title-div">단어장 관리</div>
	<img src="${pageContext.request.contextPath}\resources\images\etc\edit.png" id="" class="menuBtn hidden-item"/>
</div>
<div id="wordbookList" class="page-body tl list-div"></div>
<div class="button-div tr">
	<button id="createBtn" class="btn btn-dark optionBtn" type="button" onclick="wordbookEditModalOpen('C')">등록</button>
	<button class="btn btn-dark optionBtn" type="button" onclick="wordbookEditModalOpen('U')">수정</button>
	<button class="btn btn-danger optionBtn" type="button" onclick="deleteWordbook()">삭제</button>
</div>

<%@ include file="/WEB-INF/views/wordbook/wordbookEditModal.jsp" %><!-- 단어장 관리 모달  -->
