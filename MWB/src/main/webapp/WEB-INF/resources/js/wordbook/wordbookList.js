/**
* @파일명: view.js
* @작성자: KimSangMin
* @생성일: 2024. 3. 29. 오전 10:25:02
* @설명: 단어장
*/
let wordbookSeq;
let wordbookNm;
	
$(()=>{
	//단어장 목록 조회
	selectWordbookList();
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
					let html = '<div class="wordbookItem" ' 
							 + ' data-seq="' + item.wordbookSeq + '"' 
							 + ' data-nm="' + item.wordbookNm
							 + '">' + item.wordbookNm + '</div>'
					result += html; 
				}
				if($util.isEmpty(result)){
					result = '<div class="">조회된 결과가 없습니다.</div>';
				}
				$('#wordbookList').html(result);
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
			$('.wordbookItem').removeClass('selected');
			$(this).addClass('selected');
			wordbookSeq = $(this).data('seq');
			wordbookNm = $(this).data('nm');
		}
	})
}

//단어장 삭제
function deleteWordbook(){
	if(!confirm('정말로 삭제하시겠습니까?')){
		return false;
	}
	
	$com.loadingStart();
    $.ajax({
        url: '/wordbook/deleteWordbook.do',
        type: 'POST',
        data: {'wordbookSeq': wordbookSeq},
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8', 
        dataType: 'json',
        success: function (result) {
            if (result.RESULT == Constant.RESULT_SUCCESS){
                alert("삭제되었습니다.");
                location.reload();
            } else {
				alert(result[Constant.OUT_RESULT_MSG])
			};
			$com.loadingEnd();
        },
        error: function(result){
			$com.loadingEnd();
		}
    });		
}