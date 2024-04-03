<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<% 
/**
 * @화면명: 챌린지 관리 모달
 * @작성자: KimSangMin
 * @생성일: 2024. 4. 3. 오후 5:19:27
 * @설명: 챌린지를 등록/수정하는 화면
**/
 %>
 
<script src="<%=request.getContextPath()%>/resources/js/challenge\challengeEditModal.js"></script>

<div id="challengeEditModal" class="modal">
	<form id="wordbookEditForm" method="post" style="margin: 10px 0px;">
		<input type="hidden" id="wordbookSeq" name="wordbookSeq">
		<table class="papang-table">
			<colgroup>
				<col style="width: 5rem">
				<col style="width: *">
			</colgroup>
			<tbody>
				<tr class="modalText">
					<td>이름: </td>
					<td><input type="text" id="modalWordbookNm" class="tableInput" name="wordbookNm" title="이름" maxlength="300" onkeypress="if(event.keyCode == 13){saveWordbook()}" required="allM1"></td>
				</tr>
				<tr class="modalText">
					<td style="vertical-align: baseline;">단어장: </td>
					<td>
						<div id="modalWordbookList" class="border-box"></div>
					</td>
				</tr>
				<tr class="modalText">
					<td>개수: </td>
					<td><input type="text" id="modalWordbookNm" class="tableInput" name="wordbookNm" title="이름" maxlength="300" onkeypress="if(event.keyCode == 13){saveWordbook()}" required="allM1"></td>
				</tr>
				<tr class="tc">
					<td colspan="2">
						<button type="button" class="btn btn-dark optionBtn" onclick="saveWordbook()">저장</button>
						<button type="button" class="btn btn-dark optionBtn" onclick="modalClose()">취소</button>
					</td>
				</tr>
			</tbody>
		</table>
	</form>
</div>