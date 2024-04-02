<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

 <% 
/**
 * @화면명: 단어 관리 모달
 * @작성자: KimSangMin
 * @생성일: 2024. 4. 1. 오후 3:22:25
 * @설명: 단어를 등록/수정하는 화면
**/
 %>

<script src="<%=request.getContextPath()%>/resources/js/wordbook/wordEditModal.js"></script>

<div id="wordEditModal" class="modal">
	<form id="wordEditForm" method="post" style="margin: 10px 0px;">
		<input type="hidden" id="modalWordbookSeq" name="wordbookSeq">
		<input type="hidden" id="modalWordId" name="wordId">
		<table class="papang-table">
			<colgroup>
				<col style="width: 4rem">
				<col style="width: *">
			</colgroup>
			<tbody>
				<tr class="modalText">
					<td>단어: </td>
					<td><input type="text" id="modalWord" name="word" title="단어" maxlength="300" onkeypress="if(event.keyCode == 13){saveWordbook()}" required="allM1" style="margin: 12px; width: 100%;"></td>
				</tr>
				<tr class="modalText">
					<td>뜻: </td>
					<td><input type="text" id="modalMean" name="mean" title="뜻" maxlength="300" onkeypress="if(event.keyCode == 13){saveWordbook()}" required="allM1" style="margin: 12px; width: 100%;"></td>
				</tr>
				<tr class="tc">
					<td colspan="2">
						<button type="button" class="btn btn-dark optionBtn" onclick="saveWord()">저장</button>
						<button type="button" class="btn btn-dark optionBtn" onclick="modalClose()">취소</button>
					</td>
				</tr>
			</tbody>
		</table>
	</form>
</div>
