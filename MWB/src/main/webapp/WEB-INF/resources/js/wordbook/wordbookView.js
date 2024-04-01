/**
* @파일명: view.js
* @작성자: KimSangMin
* @생성일: 2024. 3. 29. 오전 10:25:02
* @설명: 단어장
*/
	
$(()=>{
	bookmarkBtn();			//사이드 메뉴 토글
	editBtn();				//단어장 수정 화면 이동
	selectWordbookList();	//단어장 목록 조회
})	

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
					let html = '<option value="' + item.wordbookSeq + '">' + item.wordbookNm + '</option>'
					result += html; 
				}
				$('#wordbookList').html(result);
				setChangeAction();	//단어장 선택 이벤트 부여			
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

//단어장 선택 이벤트 부여	
function setChangeAction(){
	$('#wordbookList').on({
		change: function(){
			//단어 조회
		}
	})	
}

//사이드 메뉴 토글
function bookmarkBtn(){
	$('#bookmarkBtn').on({
		click: function(e) {
			if ($(this)[0].src.includes('bookmark_true')) {
				$(this)[0].src = $(this)[0].src.replace('bookmark_true', 'bookmark_false');
			} else {
				$(this)[0].src = $(this)[0].src.replace('bookmark_false', 'bookmark_true');
			}			
		},
	});	
}

//단어장 수정 화면 이동
function editBtn(){
	$('#editBtn').on({
		click: function(e) {
			window.location.href = "/wordbook/wordbookList";		
		},
	});	
}