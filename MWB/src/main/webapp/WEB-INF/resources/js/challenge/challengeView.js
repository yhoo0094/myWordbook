/**
* @파일명: view.js
* @작성자: KimSangMin
* @생성일: 2024. 3. 29. 오전 10:25:02
* @설명: 단어장
*/

let wordList;			//단어 목록
let wordIdx = 0;		//현재 단어 인덱스
let wordTotalCnt = 0;	//전체 단어 개수
	
$(()=>{
	setBtnEvent();			//버튼 이벤트
	selectchalList();		//챌린지 목록 조회
})	

//설정창 토글
function settingBtn(){

}

//챌린지 목록 조회
function selectchalList(){
	$com.loadingStart();
    $.ajax({
        url: '/challenge/selectchalList.do',
        type: 'POST',
        data: {'useYn': 'Y'},
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8', 
        dataType: 'json',
        success: function (res, textStatus, jqXHR) {
			let result = '';
	        if (res.RESULT == Constant.RESULT_SUCCESS){
				for(let item of res.OUT_DATA){
					let html = '<option value="' + item.chalSeq + '">' + item.chalNm + '</option>'
					result += html; 
				}
				$('#chalSeq').html(result);
				selectChalWordList();	//챌린지 단어 목록 조회
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

//챌린지 단어 목록 조회
function selectChalWordList(){
	$com.loadingStart();
	
	//단어 가림막
	$('#meanSpan').hide();
	$('#meanBlockImg').css('width', '50%');
	
	//맞춘 단어 제외 여부
	let successYn = '';
	if($('#successYn').prop('checked')){
		successYn = 'N';
	}	
	
    $.ajax({
        url: '/challenge/selectChalWordList.do',
        type: 'POST',
        data: { chalSeq: $('#chalSeq').val()
        	  , successYn: successYn},
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8', 
        dataType: 'json',
        success: function (res, textStatus, jqXHR) {
			let result = '';
	        if (res.RESULT == Constant.RESULT_SUCCESS){
				wordList = res.OUT_DATA
				if(wordList.length > 0){
					//단어 조회
					wordIdx = 0;
					setWord();
					$('#prevBtn').show();
					$('#nextBtn').show();
					
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
			setWord();
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
			setWord();
		},
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

//단어 뜻 세팅
function setWord(){
	//현재 단어/전체 단어
	wordTotalCnt = wordList.length;
	curIdx = wordIdx + 1;
	$('#curIdx').text(curIdx + '/' + wordTotalCnt);
	
	//정답일 경우 정답/오답 버튼 비활성화
	
	
	if($('#reverseYn').prop('checked')){
		//뜻 먼저일 때
		$('#wordSpan').text(wordList[wordIdx].mean);
		$('#meanSpan').text(wordList[wordIdx].word);
	} else {
		//단어 먼저일 때
		$('#wordSpan').text(wordList[wordIdx].word);
		$('#meanSpan').text(wordList[wordIdx].mean);
	}
}

//정답/오답 버튼
function updateCorrect(isCorrectYn){
	$com.loadingStart();
	let data = wordList[wordIdx];
	data.isCorrectYn = isCorrectYn;
	
    $.ajax({
        url: '/challenge/updateCorrect.do',
        type: 'POST',
        data: data,
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8', 
        dataType: 'json',
        success: function (res, textStatus, jqXHR) {
	        if (res.RESULT == Constant.RESULT_SUCCESS){
				$('#nextBtn').click();
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