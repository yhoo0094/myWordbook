/**
 * @화면명: 단어 관리 모달
 * @작성자: KimSangMin
 * @생성일: 2024. 4. 1. 오후 3:22:25
 * @설명: 단어를 등록/수정하는 화면
**/

//모달 열기
function wordEditModalOpen(mode){
	modalReset();	//모달 내용 초기화
	
	//C:등록, U:수정
	if(mode == 'C'){
			
	} else if(mode == 'U') {
		$('#modalWordbookNm').val(wordbookNm);
		$('#wordbookSeq').val(wordbookSeq);
	}
	
	$com.loadingEnd();
	
	$('#wordEditModal').modal({
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
	var el = $('#wordEditModal');
	$util.inputTypeEmpty(el, 'text');
	$util.inputTypeEmpty(el, 'hidden');
}

//저장
function saveWord(){
	//필수입력 검증
	if(!$util.checkRequired({group:["allM1"]})){return;};	
	
	let formData = new FormData($("#wordEditForm")[0]);
	let formObject = {};
	formData.forEach(function(value, key) {
	    formObject[key] = value;
	});
	formObject.wordbookSeq = $('#wordbookList').val();
	
	$com.loadingStart();	
	
	let url;
	if($util.isEmpty($('#modalWord').val())){
		url = '/wordbook/insertWord.do'
	} else {
		url = '/wordbook/updateWord.do'
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