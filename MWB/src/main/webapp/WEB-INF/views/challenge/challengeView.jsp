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
 
<div id="page-header" class="page-header align-items-center">
	<img src="${pageContext.request.contextPath}\resources\images\etc\btn_menu.png" id="menuBtn" class="menuBtn"/>
	<div class="title-div">
		<select id="chalSeq" name="chalSeq" class="title-select form-select" onChange="selectChalWordList()"></select>
	</div>
	<img src="${pageContext.request.contextPath}\resources\images\etc\setting.png" id="settingBtn" class="editBtn" title="설정"/>
</div>
<div class="page-option">
	<div class="option-div">
		<div class="form-check form-switch">
			<label for="successYn" class="form-check-label"><b>맞춘 단어 제외</b></label>
			<input type="checkbox" id="successYn" name="successYn" class="form-check-input" onChange="javascript:selectChalWordList()" checked="checked">
		</div>
		&nbsp;&nbsp;
		<div class="form-check form-switch">
			<label for="reverseYn" class="form-check-label"><b>뜻 먼저</b></label>
			<input type="checkbox" id="reverseYn" name="reverseYn" class="form-check-input" onChange="javascript:selectChalWordList()">
		</div>
	</div>
</div>
<div class="page-body">
	<div id="wordDiv" class="body-div align-items-center">
		<img src="${pageContext.request.contextPath}\resources\images\etc\prev-button.png" id="prevBtn" class="prev-button"/>
		<span id="wordSpan" class="word-span"></span>
		<img src="${pageContext.request.contextPath}\resources\images\etc\next-button.png" id="nextBtn" class="next-button"/>
	</div>
	<div id="meanDiv" class="body-div align-items-center" style="position: relative;">
		<span id="meanSpan" class="mean-span"></span>
		<img src="${pageContext.request.contextPath}\resources\images\etc\question-mark.png" id="meanBlockImg" class=""/>
		<div class="tr curIdxBox"><b id="curIdx"></b></div>
	</div>
	<div id="wordListDiv" class="page-body tl list-div"></div>
</div>
<div class="chal-button-div tr">
	<button class="btn btn-primary chalOptionBtn chal-button" type="button" onClick="updateCorrect('Y')">정답</button>
	<button class="btn btn-danger chalOptionBtn chal-button" type="button" onClick="updateCorrect('N')">오답</button>
	<div class="btn btn-secondary chalOptionBtn chal-button-blocker">맞춘 단어</div>
</div>

<div id="settingMenu" class="side-menu tl">
	<!-- 메뉴 내용 -->
	<div onClick="chalEditModalOpen('C')">신규</div>
	<div onClick="chalEditModalOpen('U')">수정</div>
	<div onClick="deleteChal()">삭제</div>
	<div onClick="selectChalList()">목록</div>		
</div>	

<%@ include file="/WEB-INF/views/challenge/challengeEditModal.jsp" %><!-- 단어 관리 모달  -->