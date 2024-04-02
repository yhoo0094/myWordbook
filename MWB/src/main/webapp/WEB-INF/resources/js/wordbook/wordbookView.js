/**
* @파일명: view.js
* @작성자: KimSangMin
* @생성일: 2024. 3. 29. 오전 10:25:02
* @설명: 단어장
*/

let wordList;		//단어 목록
let wordIdx = 0;	//현재 단어 인덱스
	
$(()=>{
	setBtnEvent();			//사이드 메뉴 토글
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
				selectWordList();	//단어 목록 조회	
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

//단어 목록 조회
function selectWordList(){
	$com.loadingStart();
    $.ajax({
        url: '/wordbook/selectWordList.do',
        type: 'POST',
        data: {wordbookSeq : $('#wordbookList').val()},
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8', 
        dataType: 'json',
        success: function (res, textStatus, jqXHR) {
			let result = '';
	        if (res.RESULT == Constant.RESULT_SUCCESS){
				wordList = res.OUT_DATA
				if(wordList.length > 0){
					//단어 조회
					wordIdx = 0;
					$('#wordSpan').text(wordList[wordIdx].word);
					$('#meanSpan').text(wordList[wordIdx].mean);
					$('#prevBtn').show();
					$('#nextBtn').show();
					setBookmarkBtn();	//중요 단어 여부 버튼 활성화/비활성화
					
					//단어 목록 만들기
					let htmlArr = [];
					for(let item of wordList){
						let html = '<div class="wordbookItem" ' 
								 + ' data-id="' + item.wordId
								 + '">' + item.word + '</div>'
						htmlArr[item.rnum] = html 
					}
					if($util.isEmpty(htmlArr[0])){
						result = '<div class="wordbookItem">조회된 결과가 없습니다.</div>';
					} else {
						for(let html of htmlArr){
							result += html;							
						}
					}
					$('#wordListDiv').html(result);
					setClickAction();	//리스트 클릭 이벤트 부여						
				} else {
					$('#wordSpan').text('등록된 단어가 없습니다.');
					$('#meanSpan').text('등록된 단어가 없습니다.');
					$('#prevBtn').hide();
					$('#nextBtn').hide();
				}
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
			for(let i in wordList){
				if(wordList[i].wordId == $(this).data('id')){
					wordIdx = i;
					$('#wordSpan').text(wordList[wordIdx].word);
					$('#meanSpan').text(wordList[wordIdx].mean);
					
					$('#wordDiv').show();
					$('#meanDiv').show();
					$('#wordListDiv').hide();
					break;
				}
			}
			$('.wordbookItem').removeClass('selected');
			$(this).addClass('selected');
		}
	})
}

//버튼 이벤트
function setBtnEvent(){
	//이전 버튼
	$('#prevBtn').on({
		click: function(e) {
			$('#meanSpan').hide();
			$('#meanBlockImg').css('width', '50%');
			
			if(wordIdx == 0){
				wordIdx = wordList.length - 1; 
			} else {
				wordIdx--;
			}
			$('#wordSpan').text(wordList[wordIdx].word);
			$('#meanSpan').text(wordList[wordIdx].mean);
			setBookmarkBtn();	//중요 단어 여부 버튼 활성화/비활성화
		},
	});		
	
	//다음 버튼
	$('#nextBtn').on({
		click: function(e) {
			$('#meanSpan').hide();
			$('#meanBlockImg').css('width', '50%');
			
			if(wordIdx == wordList.length - 1){
				wordIdx = 0; 
			} else {
				wordIdx++;
			}
			$('#wordSpan').text(wordList[wordIdx].word);
			$('#meanSpan').text(wordList[wordIdx].mean);
			setBookmarkBtn();	//중요 단어 여부 버튼 활성화/비활성화
		},
	});		
		
	//뜻 영역 누르면 가림막 토글
	$('#meanDiv').on({
		click: function(e) {
			if($('#meanSpan').css('display') == 'none'){
				$('#meanSpan').show();
				$('#meanBlockImg').css('width', '0');	
			} else {
				$('#meanSpan').hide();
				$('#meanBlockImg').css('width', '50%');
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

//단어 삭제
function deleteWord(){
	if(!confirm('정말로 삭제하시겠습니까?')){
		return false;
	}
	
	$com.loadingStart();
    $.ajax({
        url: '/wordbook/deleteWord.do',
        type: 'POST',
        data: { wordbookSeq: wordList[wordIdx].wordbookSeq
        	  , wordId: wordList[wordIdx].wordId},
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

//단어 목록 조회
function showWordList(){
	if($('#wordDiv').css('display') == 'none'){
		$('#wordDiv').show();
		$('#meanDiv').show();
		$('#wordListDiv').hide();
	} else {
		$('#wordDiv').hide();
		$('#meanDiv').hide();
		$('#wordListDiv').show();
	}
}

//중요 단어 여부 변경
function updateBookmark(){
	$com.loadingStart();
	let bookmarkYn;
	if ($('#bookmarkBtn')[0].src.includes('bookmark_true')) {
		wordList[wordIdx].bookmarkYn = 'N'
		$('#bookmarkBtn')[0].src = $('#bookmarkBtn')[0].src.replace('bookmark_true', 'bookmark_false');
	} else {
		wordList[wordIdx].bookmarkYn = 'Y' 
		$('#bookmarkBtn')[0].src = $('#bookmarkBtn')[0].src.replace('bookmark_false', 'bookmark_true');
	}	
	
    $.ajax({
        url: '/wordbook/updateBookmark.do',
        type: 'POST',
        data: { wordbookSeq: wordList[wordIdx].wordbookSeq
        	  , wordId: wordList[wordIdx].wordId
        	  , bookmarkYn: wordList[wordIdx].bookmarkYn},
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8', 
        dataType: 'json',
        success: function (result) {
            if (result.RESULT == Constant.RESULT_SUCCESS){

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

//중요 단어 여부 버튼 활성화/비활성화
function setBookmarkBtn(){
	if(wordList[wordIdx].bookmarkYn == 'Y'){
		$('#bookmarkBtn')[0].src = $('#bookmarkBtn')[0].src.replace('bookmark_false', 'bookmark_true');
	} else {
		$('#bookmarkBtn')[0].src = $('#bookmarkBtn')[0].src.replace('bookmark_true', 'bookmark_false');
	}
}