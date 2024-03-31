/**
 * @작성자: KimSangMin
 * @생성일: 2023. 4. 20. 오후 8:04:50
 * @설명: 모든 페이지 로딩 후 공통으로 적용되는 js
**/
$(()=>{
	$('.forSearch').on({ 
		keydown: function(e) {
			//엔터 눌렀을 때 검색
			if(e.keyCode == 13 ){doSearch();}
		},
	});
	
	//사이드 메뉴 토글
	$('#menuBtn').on({
		click: function(e) {
			let sideMenu = $('#sideMenu');
			if (sideMenu[0].style.width != '0px') {
				sideMenu[0].style.width = '0px'; // 메뉴 닫기
			} else {
				sideMenu[0].style.width = '100%'; // 메뉴 열기
			}			
		},
	});
})

