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
	<div class="title-div">
		<select id="wordbookList" class="title-select form-select"></select>
	</div>
	<img src="${pageContext.request.contextPath}\resources\images\etc\edit.png" id="editBtn" class="editBtn"/>
</div>
<div class="page-option">
	<div class="option-div">
		<div class="form-check form-switch">
			<label for="bookmarkToggle" class="form-check-label"><b>중요 단어만</b></label>
			<input type="checkbox" id="bookmarkToggle" name="bookmarkToggle" class="form-check-input" onChange="javascript:doSearch()">
		</div>
		&nbsp;&nbsp;
		<div class="form-check form-switch">
			<label for="reverseToggle" class="form-check-label"><b>뜻 먼저</b></label>
			<input type="checkbox" id="reverseToggle" name="reverseToggle" class="form-check-input" onChange="javascript:doSearch()">
		</div>
	</div>
	<img src="${pageContext.request.contextPath}\resources\images\etc\bookmark_true.png" id="bookmarkBtn" class="bookmarkBtn"/>
</div>
<div class="page-body">
	<div class="body-div align-items-center">
		<img src="${pageContext.request.contextPath}\resources\images\etc\prev-button.png" id="" class="prev-button"/>
		<span class="word-span">word</span>
		<img src="${pageContext.request.contextPath}\resources\images\etc\next-button.png" id="" class="next-button"/>
	</div>
	<div class="body-div align-items-center">mean</div>
</div>
<div class="button-div tr">
	<button class="btn btn-dark optionBtn" type="button">목록</button>
	<button class="btn btn-dark optionBtn" type="button" onClick="wordEditModalOpen('C')">등록</button>
	<button class="btn btn-dark optionBtn" type="button">수정</button>
	<button class="btn btn-danger optionBtn" type="button">삭제</button>
</div>

<%@ include file="/WEB-INF/views/wordbook/wordEditModal.jsp" %><!-- 단어 관리 모달  -->