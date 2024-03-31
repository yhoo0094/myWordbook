$(() => {
	createImgSlide();	//이미지 슬라이드 생성
	noticePop();		//공지사항 팝업 열기		
	selectPlay();		//놀이 조회
	selectEnterprise(); //기업장터 조회
})

//놀이 조회
function selectPlay(){
		$com.loadingStart();	
		$('#cardWrap').html('');	//기존 데이터 초기화
		
		$.ajax({
	        url: '/play/selectPlayHome.do',
	        type: 'POST',
	        data: {},
	        contentType: 'application/x-www-form-urlencoded; charset=UTF-8', 
	        dataType: 'json',
	        success: function (result) {

				//데이터 조회
				for (let data of result.OUT_DATA) {
				    let cardWrap = $('#cardWrap');
				    
				    let cardItem = $('<div class="cardItem"></div>');
				    
				    let cardImg = $('<div class="cardImg"></div>')
				    let thumbnailImg = $('<img class="thumbnailImg" alt="no image"/>');
				    let src = '/common/getImage.do?boardSeq=' + data.boardSeq;
				    thumbnailImg.attr('src',src);
				    thumbnailImg.attr('onClick','mvPlayView(' + data.boardSeq +')');
				    cardImg.append(thumbnailImg);
				    
				    let cardContent = $('<div class="cardContent"></div>');
				    
				    let cardBtn = $('<div class="cardBtn"></div>');
				    let searchBtn = $('<img src="/resources/images/etc/search.png" alt="no image" class="cardBtnImg"/>');
				    searchBtn.attr('onClick','mvPlayView(' + data.boardSeq +')');
		            let likeBtn = $('<img src="/resources/images/etc/like.png" alt="no image" class="cardBtnImg"/>');	
		            let cardTitle = $('<div class="cardTitle"></div>');
		            cardTitle.text(data.title);
		            let cardIntro = $('<div class="cardIntro"></div>');
		            let intro = $util.XssReverse(data.intro);
		            cardIntro.text(intro);
		            
				    cardBtn.append(searchBtn);
		            cardBtn.append(likeBtn);
		            cardContent.append(cardBtn);
		            cardContent.append(cardTitle);
		            cardContent.append(cardIntro);
		            
		            cardItem.append(cardImg);
				    cardItem.append(cardContent);
				    
				    cardWrap.append(cardItem);
				}
				thumbnailImgHeight();	//썸네일 이미지 높이 조정
				$com.loadingEnd();
	        },
	    error: function(textStatus, jqXHR, thrownError){
			$com.loadingEnd();
		} 
	        
	    });
}

//기압징터 조회
function selectEnterprise(){
		$com.loadingStart();	
		$('#gridCardWrap').html('');	//기존 데이터 초기화
		
		let colCnt = 4;	//한 줄에 표시하는 상품 개수
	
		$.ajax({
	        url: '/enterprise/selectEnterpriseHome.do',
	        type: 'POST',
	        data: { useYn : 'Y'
	        	  , colCnt : colCnt	
	        	  },
	        contentType: 'application/x-www-form-urlencoded; charset=UTF-8', 
	        dataType: 'json',
	        success: function (result) {

				//데이터 조회
				let index = 0;
				let gridCardWrap = $('#gridCardWrap');
				let row;
				for (let data of result.OUT_DATA) {
					if(index % colCnt == 0){
						row = $('<div class="row card-deck"></div>');	
					}
					
					let col = $('<div class="col"></div>');
				    let card = $('<div class="card"><div>');
				    card.attr('title', data.proName);
				    card.attr('onClick', 'mvEnterpriseView(' + data.entMarketSeq + ')');
				    
				    let gridCardImg = $('<img src="" class="gridCardImg card-img-top" alt="...">');
				    let src = '/common/images/enterprise/' + data.thumbnail;
				    gridCardImg.attr('src',src);
				    
				    let gridCardBody = $('<div class="gridCardBody"></div>');
				    
				    let proName = $('<p class="card-title"></p>');
				    proName.text(data.proName);
				    
				    let price = $('<p class="card-text"></p>');
				    price.text(data.price.toLocaleString() + '원');
				    
				    card.append(gridCardImg);
				    gridCardBody.append(proName);
				    gridCardBody.append(price);
				    card.append(gridCardBody);
				    col.append(card);
				    row.append(col);
				    
				    if(index % colCnt == colCnt - 1){
						gridCardWrap.append(row);	
					} else if(result.OUT_DATA.length - 1 == index) {
						//마지막 데이터 출력
						gridCardWrap.append(row);	
					}
					
					index++;
				}
				$com.loadingEnd();
	        },
	    error: function(textStatus, jqXHR, thrownError){
			$com.loadingEnd();
		} 
	        
	    });
}

//놀이 조회 화면 이동
function mvEnterpriseView(entMarketSeq){
	window.location.href = '/market/enterprise/enterpriseView?entMarketSeq=' + entMarketSeq;
}

//썸네일 이미지 높이 조정
function thumbnailImgHeight() {
	let thumbnailImgList = $('.thumbnailImg')
	for(let thumbnailImg of thumbnailImgList){
		let width = $(thumbnailImg).width();
		$(thumbnailImg).height(width);
	}
}

//놀이 조회 화면 이동
function mvPlayView(boardSeq){
	 // form 태그 생성
    var $form = $('<form></form>')
        .attr("action", "/active/play/playView")
        .attr("method", "post");

    // input 태그 생성 및 form 태그에 추가
    $('<input>').attr({
        type: "hidden",
        name: "param",
        value: boardSeq
    }).appendTo($form);

    // form 태그를 body에 추가하고 제출
    $form.appendTo('body').submit();
}

//공지사항 팝업 열기
function noticePop(){
	$.ajax({
        url: '/notice/selectNotice.do',
        type: 'POST',
        data: { periodToggle: true
        	  , popYn: 'Y'
        	  },
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8', 
        dataType: 'json',
        success: function (result) {
			var noticePopX = $util.getCookie('noticePopX');
			if(noticePopX == null){
				$util.setCookie('noticePopX', '');
				noticePopX = $util.getCookie('noticePopX');
			}
			for (var i in result.OUT_DATA){
				if(!noticePopX.split(',').includes(result.OUT_DATA[i].boardSeq)){	//하루 동안 표시하지 않음 대상이 아닌 경우
					window.open("popup.do?view_nm=noticePop&boardSeq=" + result.OUT_DATA[i].boardSeq, result.OUT_DATA[i].title, "width=1000,height=800");	
				}
			}
        }
    });	
}

//이미지 슬라이드 생성
function createImgSlide(){
	new Swiper('.swiper', {
		effect: "coverflow",
		grabCursor: true,
		centeredSlides: true,
		slidesPerView: "auto",
		coverflowEffect: {
			rotate: 50,
			stretch: 0,
			depth: 100,
			modifier: 1,
			slideShadows: true,
		},
		autoplay: {
			delay: 2500,
			disableOnInteraction: true,
		},
		pagination: {
			el: '.swiper-pagination',
		},
	});
}

