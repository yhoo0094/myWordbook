/**
* @파일명: view.js
* @작성자: KimSangMin
* @생성일: 2024. 3. 29. 오전 10:25:02
* @설명: 단어장
*/

let wordList;		//단어 목록
let wordIdx = 0;	//현재 단어 인덱스
	
$(()=>{
	setBtnEvent();			//버튼 이벤트
	selectChalWord();		//챌린지 단어 조회
})	

//설정창 토글
function settingBtn(){

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
function selectChalWord(){
	$com.loadingStart();
	
//	let schBookmarkYn;
//	if($('#schBookmarkYn').prop('checked')){
//		schBookmarkYn = 'Y';
//	}	
	
    $.ajax({
        url: '/challenge/selectChalWord.do',
        type: 'POST',
//        data: { wordbookSeq: $('#wordbookList').val()
//        	  , schBookmarkYn: schBookmarkYn},
        data: {},        	  
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8', 
        dataType: 'json',
        success: function (res, textStatus, jqXHR) {
			let result = '';
	        if (res.RESULT == Constant.RESULT_SUCCESS){
				debugger;
				wordList = res.OUT_DATA
				if(wordList.length > 0){
					//단어 조회
					wordIdx = 0;
					setWord()
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
					setWord();
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
	
	//설정창 토글
	$('#settingBtn').on({
		click: function(e) {
			let settingMenu = $('#settingMenu');
			if (settingMenu[0].style.width != '0px') {
				settingMenu[0].style.width = '0px'; // 메뉴 닫기
			} else {
				settingMenu[0].style.width = '100%'; // 메뉴 열기
			}			
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

//단어 뜻 세팅
function setWord(){
	if($('#reverseYn').prop('checked')){
		//뜻 먼저일 때
		$('#wordSpan').text(wordList[wordIdx].mean);
		$('#meanSpan').text(wordList[wordIdx].word);
	} else {
		$('#wordSpan').text(wordList[wordIdx].word);
		$('#meanSpan').text(wordList[wordIdx].mean);
	}
}