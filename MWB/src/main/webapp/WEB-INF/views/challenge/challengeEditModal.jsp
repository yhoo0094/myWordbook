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
 
<script src="<%=request.getContextPath()%>/resources/js/challenge/challengeEditModal.js"></script>

<div id="challengeEditModal" class="modal">
	<form id="challengeEditForm" method="post" style="margin: 10px 0px;">
		<table class="papang-table">
			<colgroup>
				<col style="width: 5rem">
				<col style="width: *">
			</colgroup>
			<tbody>
				<tr id="modalChalNmTr" class="modalText">
					<td>이름: </td>
					<td><input type="text" id="modalChalNm" class="tableInput" name="chalNm" title="이름" maxlength="300" onkeypress="if(event.keyCode == 13){saveChal()}" required="allM1"></td>
				</tr>
				<tr id="modalWordbookListTr" class="modalText">
					<td style="vertical-align: baseline;">단어장: </td>
					<td>
						<div id="modalWordbookList" class="border-box"></div>
					</td>
				</tr>
				<tr id="modalChalCntTr" class="modalText">
					<td>개수: </td>
					<td><input type="text" id="modalChalCnt" class="tableInput" name="chalCnt" title="개수" value="100" maxlength="300" onkeypress="if(event.keyCode == 13){saveChal()}" required="allM1"></td>
				</tr>
				<tr class="tc">
					<td colspan="2">
						<button type="button" class="btn btn-dark optionBtn" onclick="saveChal()">저장</button>
						<button type="button" class="btn btn-dark optionBtn" onclick="modalClose()">취소</button>
					</td>
				</tr>
			</tbody>
		</table>
	</form>
</div>