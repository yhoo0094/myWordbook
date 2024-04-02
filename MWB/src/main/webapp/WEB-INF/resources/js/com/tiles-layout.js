/**
 * @작성자: KimSangMin
 * @생성일: 2023. 4. 20. 오후 8:04:50
 * @설명: 모든 페이지 로딩 후 공통으로 적용되는 js
**/
$(()=>{
	forSearch()	//엔터 누르면 검색
	menuBtn();	//사이드 메뉴 토글
	resizeWindow();	//화면 사이즈 조정
	$(window).resize();
})

//엔터 누르면 검색
function forSearch(){
	$('.forSearch').on({ 
		keydown: function(e) {
			//엔터 눌렀을 때 검색
			if(e.keyCode == 13 ){doSearch();}
		},
	});	
}

//사이드 메뉴 토글
function menuBtn(){
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
}

//화면 사이즈 조정
function resizeWindow(){
	$(window).on('resize', function() {
		// 화면의 너비와 높이를 가져옵니다.
		const width = window.innerWidth;
		const height = window.innerHeight;

//		alert('width: ' + width + ' height: ' + height);

		// 너비가 높이의 60% 이상인지 확인합니다.
		if (width >= height * 0.6) {
			$('.wrap').css('border', '2px solid black');
		}
		
		if (width <= height * 0.7) {
			$('body').css('font-size','40px');
			$('html').css('font-size','40px');
		} else if (width <= height * 0.8) {
			$('body').css('font-size','35px');
			$('html').css('font-size','35px');
		} else if (width <= height * 0.9) {
			$('body').css('font-size','30px');
			$('html').css('font-size','30px');
		} else if (width <= height * 1.0) {
			$('body').css('font-size','25px');
			$('html').css('font-size','25px');
		} else if (width <= height * 1.4) {
			$('body').css('font-size','20px');
			$('html').css('font-size','20px');
		} else if (width > height * 1.4) {
			$('body').css('font-size','15px');
			$('html').css('font-size','15px');
		}
	})
}

