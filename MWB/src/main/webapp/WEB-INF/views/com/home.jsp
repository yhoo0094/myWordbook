<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
	
<!-- Swiper -->
<div class="swiper mySwiper">
	<div class="swiper-wrapper">
		<div class="swiper-slide">
			<img class="slideImg" src="${pageContext.request.contextPath}\resources\images\image-slide\img1.jpg" />
		</div>
		<div class="swiper-slide">
			<img class="slideImg" src="${pageContext.request.contextPath}\resources\images\image-slide\img2.jpg" />
		</div>
		<div class="swiper-slide">
			<img class="slideImg" src="${pageContext.request.contextPath}\resources\images\etc\father-and-son.jpg" />
		</div>
	</div>
	<div class="swiper-pagination"></div>
</div>
<!-- Swiper -->

<div class="homeBox">
	<p class="homeTitle">Hello Papang 서비스를 소개합니다</p>

    <!-- Marketing Icons Section -->
	<div class="row">
		<!-- 게시판 -->
		<div class="col-lg-4 mb-4 fadein" align="center">
			<figure class="snip1200" onclick="window.location.href = '${pageContext.request.contextPath}/board/freeBoard'">
				<img src="${pageContext.request.contextPath}/resources/images/etc/main_boardMenu.jpg" />
				<figcaption>
					<p>
						궁금한 것이 있을 때. <br /> 
						공유하고 싶은 이야기가 있을 때. <br /> 
						<span class="color-hpp">Hello Papang</span>에서 <br />
						자유롭게 이야기 하세요!
					</p>
					<div class="heading">
						<h2>
							즐거운 <span>소통 공간</span>
						</h2>
					</div>
				</figcaption>
			</figure>
		</div>		
		
		<!-- 장터 -->
		<div class="col-lg-4 mb-4 fadein" align="center">
			<figure class="snip1200" onclick="window.location.href = '${pageContext.request.contextPath}/market/enterprise'">
				<img src="${pageContext.request.contextPath}/resources/images/etc/main_shopMenu.jpg" />
				<figcaption>
					<p>
						부모의 마음으로, <br /> 
						아이가 안전한 세상을 꿈꿉니다. <br /> 
						100% 순면제작, 무형광 제품 <br />
						<span class="color-hpp">Hello Papang</span>에서 만나보세요
					</p>
					<div class="heading">
						<h2>
							Papang<span> SHOP</span>
						</h2>
					</div>
				</figcaption>
			</figure>
		</div>		
		
		<!-- 활동 -->
		<div class="col-lg-4 mb-4 fadein" align="center">
			<figure class="snip1200" onclick="window.location.href = '${pageContext.request.contextPath}/active/play'">
				<img src="${pageContext.request.contextPath}/resources/images/etc/main_activeMenu.jpg" />
				<figcaption>
					<p>
						새로운 육아 아이디어가 필요할 때. <br />
						신나게 놀면서 육아하고 싶을 때.<br />
						<span class="color-hpp">Hello Papang</span>에서 <br />
						다양한 활동을 경험하세요! 
					</p>
					<div class="heading">
						<h2>
							육아대디<span> 첫 걸음</span>
						</h2>
					</div>
				</figcaption>
			</figure>
		</div>		
		
	</div>
	<!-- /.row -->
	<hr />
	
	<p class="homeTitle display-inb">Papang ACTIVE</p>
	<p class="moreClass" onclick="window.location.href = '${pageContext.request.contextPath}/active/play'">더보기 ></p>
	<div id="cardWrap" class="cardWrap"></div>
	<hr />
	
	<!-- Portfolio Section -->
	<p class="homeTitle display-inb">Papang SHOP</p>
	<p class="moreClass" onclick="window.location.href = '${pageContext.request.contextPath}/market/enterprise'">더보기 ></p>
	<div id="gridCardWrap" class="entCardWrap"></div>
	<hr />
	
	<!-- Features Section -->
	<div class="row introDiv">
		<div class="col-lg-6">
			<p class="homeTitle display-inb">Hello Papang</p>
			<ul>
				<p class="fs1-2">주요 서비스</p>
				<li>
					<a href="${pageContext.request.contextPath}/board/freeBoard" class="remove-a">게시판 - 육아 대디들의 자유로운 소통 공간</a>
				</li>
				<li>
					<a href="${pageContext.request.contextPath}/market/enterprise" class="remove-a">장터 - 세상에 있는 육아 꿀템 여기에 다 모았다!</a>
				</li>
				<li>
					<a href="${pageContext.request.contextPath}/active/play" class="remove-a">활동 - 고된 육아에 지친 당신을 위한 놀면서 육아하는 백만가지 방법</a>
				</li>
			</ul>
			<p>Hello Papang은 고객님의 편리를 위해 항상 노력하겠습니다.</p>
		</div>
		<div class="col-lg-6">
			<img class="img-fluid rounded famImage"
				src="${pageContext.request.contextPath}/resources/images/etc/team_papang_ai.png">
		</div>
	</div>
	<!-- /.row -->
	<hr>

	<div>
		<a href="#" class="f-right"><img class="topnav" src="${pageContext.request.contextPath}/resources/images/etc/topnav.png" /></a>
	</div>
			
</div>