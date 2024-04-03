/**
* @파일명: view.js
* @작성자: KimSangMin
* @생성일: 2024. 3. 29. 오전 10:25:02
* @설명: 단어장
*/

//단어장 관리 모달 열기
function chalEditModalOpen(mode){
	modalReset();	//모달 내용 초기화
	
	//C:등록, U:수정
	if(mode == 'C'){
		selectWordbookList();	//단어장 목록 조회	
	} else if(mode == 'U') {
//		$('#modalWordbookNm').val(wordbookNm);
//		$('#wordbookSeq').val(wordbookSeq);
	}
	
	$com.loadingEnd();
	
	$('#challengeEditModal').modal({
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

//단어장 목록 조회
function selectWordbookList(){
	$com.loadingStart();
    $.ajax({
        url: '/wordbook/selectWordbookList.do',
        type: 'POST',
        data: {'useYn': 'Y'},
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8', 
        dataType: 'json',
        success: function (res, textStatus, jqXHR) {
			let result = '';
	        if (res.RESULT == Constant.RESULT_SUCCESS){
				for(let item of res.OUT_DATA){
					let html = '<div class="wordbookItem" ' 
							 + ' data-seq="' + item.wordbookSeq + '"' 
							 + ' data-nm="' + item.wordbookNm
							 + '">' + item.wordbookNm + '</div>'
					result += html; 
				}
				if($util.isEmpty(result)){
					result = '<div class="">조회된 결과가 없습니다.</div>';
				}
				$('#modalWordbookList').html(result);
				setClickAction();	//리스트 클릭 이벤트 부여				
	        } else {
				alert(res[Constant.OUT_RESULT_MSG]);
			}
			$com.loadingEnd();
        },
        error: function(textStatus, jqXHR, thrownError){
			$com.loadingEnd();
		}
    });			
}

//리스트 클릭 이벤트 부여
function setClickAction(){
	$('.wordbookItem').on({
		click: function(){
			if($(this).hasClass('selected')){
				$(this).removeClass('selected');	
			} else {
				$(this).addClass('selected');	
			}
		}
	})
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