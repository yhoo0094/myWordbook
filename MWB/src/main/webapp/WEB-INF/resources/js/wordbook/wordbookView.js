/**
* @파일명: view.js
* @작성자: KimSangMin
* @생성일: 2024. 3. 29. 오전 10:25:02
* @설명: 단어장
*/
	
$(()=>{
	//사이드 메뉴 토글
	$('#bookmarkBtn').on({
		click: function(e) {
			if ($(this)[0].src.includes('bookmark_true')) {
				$(this)[0].src = $(this)[0].src.replace('bookmark_true', 'bookmark_false');
			} else {
				$(this)[0].src = $(this)[0].src.replace('bookmark_false', 'bookmark_true');
			}			
		},
	});
})	