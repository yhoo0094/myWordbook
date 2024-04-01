/**
 * @화면명: 비밀번호 변경 모달 
 * @작성자: KimSangMin
 * @생성일: 2024. 1. 18. 오전 10:33:18
 * @설명: 비밀번호 변경 모달
**/

//비밀번호 변경 모달 열기
function wordbookEditModalOpen(mode){
	modalReset();	//모달 내용 초기화
	
	//C:등록, U:수정
	if(mode == 'C'){
			
	} else if(mode == 'U') {
		$('#modalWordbookNm').val(wordbookNm);
		$('#wordbookSeq').val(wordbookSeq);
	}
	
	$com.loadingEnd();
	
	$('#wordbookEditModal').modal({
		clickClose: false,
	});		
}	

//모달 닫기
function modalClose(){
	modalReset();	//모달 내용 초기화
	$.modal.close();
}

//모달 내용 초기화
function modalReset(){
	var el = $('#wordbookEditModal');
	$util.inputTypeEmpty(el, 'text');
	$util.inputTypeEmpty(el, 'hidden');
}

//저장
function saveWordbook(){
	//필수입력 검증
	if(!$util.checkRequired({group:["allM1"]})){return;};	
	
	let formData = new FormData($("#wordbookEditForm")[0]);
	let formObject = {};
	formData.forEach(function(value, key) {
	    formObject[key] = value;
	});
	
	$com.loadingStart();	
	
	let url;
	if($util.isEmpty($('#wordbookSeq').val())){
		url = '/wordbook/insertWordbook.do'
	} else {
		url = '/wordbook/updateWordbook.do'
	}
	
    $.ajax({
        url: url,
        type: 'POST',
        data: formObject,
        dataType: 'json',
        success: function (result) {
            if (result.RESULT == Constant.RESULT_SUCCESS){
                alert("저장되었습니다.");
                location.reload();
            } else {
				alert(result[Constant.OUT_RESULT_MSG])
			};
			$com.loadingEnd();
        }
    });	
}